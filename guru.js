/* English Reading — halaman guru / pengawas (10 Okt 2026), meniru Matematika Dasar.
   Masuk dengan PIN pribadi guru (sama dengan Tryout/Matdas) atau PIN admin. Menu: Sesi Kegiatan (buka sesi rombel
   + kode akses + QR), Perkembangan (rekap rombel), Analisis Siswa, Pengaturan & Tahapan (Umum + Tahapan Khusus yang
   dipasang ke rombel/siswa), dan Admin (tarik guru Bahasa Inggris dari Data Induk).
   Fungsi server: er_* (lihat database_tryout/kontrak/english_reading.sql). Struktur sub level di bawah harus selaras
   dengan app.js (daftarSub). */
(function () {
  'use strict';
  const SB = window.TKA_SUPABASE;
  const layar = document.getElementById('layar');
  const $ = (s, el) => (el || document).querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ssGet = k => { try { return sessionStorage.getItem(k); } catch (e) { return null; } };
  const ssSet = (k, v) => { try { if (v == null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, v); } catch (e) { /* abaikan */ } };
  const TUNTAS = 80;

  async function rpc(fn, args) {
    if (!SB) throw new Error('Server belum diatur (config.js belum ada).');
    let r, t;
    try {
      r = await fetch(`${SB.url}/rest/v1/rpc/${fn}`, { method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: SB.key, Authorization: 'Bearer ' + SB.key }, body: JSON.stringify(args || {}) });
      t = await r.text();
    } catch (e) { throw new Error('Tidak tersambung ke server. Periksa internet lalu coba lagi.'); }
    let j = null;
    try { j = t ? JSON.parse(t) : null; } catch (e) { /* bukan JSON */ }
    if (!r.ok) throw new Error((j && (j.message || j.hint)) || t || ('Galat ' + r.status));
    return j;
  }
  function toast(teks, galat) {
    let el = $('#g-toast');
    if (!el) { el = document.createElement('div'); el.id = 'g-toast'; el.className = 'g-toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = teks; el.classList.toggle('galat', !!galat); el.classList.add('tampil');
    clearTimeout(el._w); el._w = setTimeout(() => el.classList.remove('tampil'), galat ? 4200 : 2200);
  }
  const jam = t => new Date(t).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const tanggal = t => new Date(t).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const lalu = t => {
    if (!t) return '—';
    const d = (Date.now() - new Date(t)) / 60000;
    return d < 2 ? 'baru saja' : d < 60 ? `${Math.round(d)} menit lalu` : d < 1440 ? `${Math.round(d / 60)} jam lalu` : `${Math.round(d / 1440)} hari lalu`;
  };

  // ---------- Model materi (selaras app.js) ----------
  const SUB = [['Kenali', '👀'], ['Dengar', '👂'], ['Situasi', '💬'], ['Lengkapi & susun', '🧩'], ['Ucapkan', '🎤']];
  const SUB_POLA = [['Pilih bentuk', '☝️'], ['Benar atau salah', '⚖️'], ['Lengkapi', '✏️'], ['Susun kalimat', '🧩'], ['Terjemahkan & ucapkan', '🎤']];
  const SUB_BACAAN = [['Kosakata bacaan', '📚'], ['Dengar & pahami', '👂'], ['Urutkan', '🔢'], ['Pemahaman', '📝']];
  const SUB_UJIAN = [['Rincian & rujukan', '🔎'], ['Makna kata', '📖'], ['Inferensi & sikap penulis', '🧠']];
  const soalDari = b => (window.SOAL && window.SOAL[b.id]) || null;
  const punyaPola = b => !!(b && b.pola && window.POLA_GEN && window.POLA_GEN[b.id]);
  const punyaBacaan = b => !!(b && !b.kosakata && !b.pola && window.KATA_BACAAN && window.KATA_BACAAN[b.id] && soalDari(b));
  const punyaSub = b => !!(b && ((b.kosakata && b.situasi) || punyaPola(b) || punyaBacaan(b)));
  const daftarSub = b => {
    if (b.pola) return SUB_POLA;
    if (b.kosakata) return SUB;
    const dasar = [...SUB_BACAAN, b.tahap <= 2 ? ['Baca kalimat', '🎤'] : ['Rumpang teks', '✏️']];
    if (b.tahap < 2) return dasar;
    return [...dasar, b.tahap <= 3 ? ['Ide pokok & struktur teks', '💡'] : ['Ide pokok & organisasi', '💡'], ...SUB_UJIAN,
      b.tahap >= 5 ? ['Simulasi UTBK/SNBT', '⏱️'] : b.tahap === 4 ? ['Simulasi TKA', '⏱️'] : ['Uji siap naik tahap', '🚀']];
  };
  const jenisLevel = b => (b.kosakata ? { kunci: 'kosakata', nama: 'Kosakata' } : b.pola ? { kunci: 'pola', nama: 'Pola kalimat' } : { kunci: 'bacaan', nama: 'Bacaan' });
  const levelDari = id => window.BACAAN.find(b => b.id === id);
  const nomorLevel = b => window.BACAAN.filter(x => x.tahap === b.tahap).indexOf(b) + 1;
  const labelLevel = b => (b ? `T${b.tahap}·L${nomorLevel(b)} ${b.judul}` : '');

  // Tahapan khusus: m = { tahap, level, sub } yang dimatikan; null = Umum.
  const tahapOn = (m, t) => !m || !(m.tahap || []).includes(t);
  const levelOnDasar = (m, b) => tahapOn(m, b.tahap) && !(m && (m.level || []).includes(b.id));
  const subOn = (m, b, n) => levelOnDasar(m, b) && !(m && ((m.sub || {})[b.id] || []).includes(n));
  const subDipakaiM = (m, b) => daftarSub(b).map((_, i) => i + 1).filter(n => subOn(m, b, n));
  const levelOn = (m, b) => levelOnDasar(m, b) && (!punyaSub(b) || subDipakaiM(m, b).length > 0);

  // Ringkasan kemajuan satu siswa (aturan tuntas sama dengan app.js).
  function ringkasKemajuan(k, m) {
    k = k || {};
    const skor = k.skor || {}, paham = k.paham || {}, sub = k.sub || {};
    const lulus = (b, n) => { const d = sub[b.id]; return !!d && (!!d.lama || (d.s || [])[n - 1] >= TUNTAS); };
    const r = { level: 0, levelTuntas: 0, subTotal: 0, subLulus: 0, tahap: {}, tahapSekarang: null, mulai: false };
    window.BACAAN.forEach(b => {
      if (!levelOn(m, b)) return;
      r.level++;
      const t = r.tahap[b.tahap] || (r.tahap[b.tahap] = { level: 0, tuntas: 0 });
      t.level++;
      let ok;
      if (punyaSub(b)) {
        const d = subDipakaiM(m, b), nl = d.filter(n => lulus(b, n)).length;
        r.subTotal += d.length; r.subLulus += nl; ok = nl === d.length;
        if (nl || (sub[b.id] && (sub[b.id].s || []).some(x => x != null))) r.mulai = true;
      } else {
        const ps = soalDari(b);
        ok = ps ? (skor[b.id] >= TUNTAS || b.tahap > 2) && paham[b.id] >= TUNTAS : skor[b.id] >= TUNTAS;
      }
      if (skor[b.id] != null) r.mulai = true;
      if (ok) { r.levelTuntas++; t.tuntas++; }
    });
    const belum = window.BACAAN.find(b => levelOn(m, b) && !(r.tahap[b.tahap] && r.tahap[b.tahap].tuntas === r.tahap[b.tahap].level));
    r.tahapSekarang = belum ? belum.tahap : null;
    return r;
  }

  // ---------- Masuk ----------
  let PIN = ssGet('er_pin'), AKUN = null, TAB = ssGet('er_tab') || 'sesi', segar = null;
  function tampilPin(pesan) {
    clearInterval(segar);
    layar.innerHTML = `<section class="er-masuk g-pin">
      <div class="er-masuk-kepala"><img src="assets/logo.png" alt="" width="64" height="64"><div><span class="er-alis">English Reading</span><h1>Guru / pengawas</h1>
        <p>Masuk dengan PIN pribadi Anda (sama dengan Asesmen Merdeka/Tryout dan Matdas).</p></div></div>
      ${pesan ? `<p class="er-info">${esc(pesan)}</p>` : ''}
      <form id="g-form" class="er-form"><label class="er-isian"><span>PIN</span>
        <input id="g-pin" type="password" inputmode="numeric" autocomplete="current-password" placeholder="PIN guru" maxlength="20"></label>
        <p class="er-galat" id="g-galat" role="alert"></p>
        <button class="tombol utama er-tombol-masuk" id="g-tombol">Masuk</button></form>
      <a class="er-guru" href="index.html">← Halaman siswa</a></section>`;
    $('#g-pin').focus();
    $('#g-form').onsubmit = async e => {
      e.preventDefault();
      const pin = $('#g-pin').value.trim();
      if (!pin) return;
      $('#g-tombol').disabled = true; $('#g-tombol').textContent = 'Memeriksa…';
      try { await masuk(pin); } catch (er) { $('#g-galat').textContent = er.message; $('#g-tombol').disabled = false; $('#g-tombol').textContent = 'Masuk'; }
    };
  }
  async function masuk(pin) {
    AKUN = await rpc('er_guru_masuk', { p_pin: pin });
    PIN = pin; ssSet('er_pin', pin);
    kerangka();
  }
  function keluar() { ssSet('er_pin', null); PIN = null; AKUN = null; tampilPin(); }

  const TABS = [['sesi', '🏫', 'Sesi Kegiatan'], ['kembang', '📈', 'Perkembangan'], ['analisis', '🔍', 'Analisis Siswa'],
    ['tahapan', '🎯', 'Pengaturan & Tahapan'], ['admin', '🛠️', 'Admin']];
  function kerangka() {
    const admin = AKUN.peran === 'admin';
    if (TAB === 'admin' && !admin) TAB = 'sesi';
    layar.innerHTML = `<header class="g-kepala"><div class="g-merek"><img src="assets/logo.png" alt="" width="40" height="40">
        <div><b>English Reading</b><small>Halaman guru</small></div></div>
      <div class="g-akun"><span><b>${esc(AKUN.nama)}</b><small>${admin ? 'Admin · semua rombel' : `Guru Bahasa Inggris · ${AKUN.rombel.length} rombel`}${AKUN.sementara ? ' · PIN sementara' : ''}</small></span>
        <button class="tombol kecil" id="g-keluar">Keluar</button></div></header>
      ${AKUN.sementara ? '<p class="er-info g-info">Anda masuk dengan ID guru. Minta admin membuatkan PIN pribadi (menu Admin → Guru dan PIN di Matdas/Tryout); PIN yang sama berlaku di semua aplikasi.</p>' : ''}
      <nav class="g-tab" role="tablist" aria-label="Menu guru">${TABS.filter(t => t[0] !== 'admin' || admin).map(([k, i, n]) =>
        `<button role="tab" data-tab="${k}" aria-selected="${k === TAB}" class="${k === TAB ? 'aktif' : ''}"><span aria-hidden="true">${i}</span> ${n}</button>`).join('')}</nav>
      <div id="g-isi"></div>`;
    $('#g-keluar').onclick = keluar;
    layar.querySelector('.g-tab').onclick = e => { const b = e.target.closest('[data-tab]'); if (b) { TAB = b.dataset.tab; ssSet('er_tab', TAB); kerangka(); } };
    clearInterval(segar);
    ({ sesi: tabSesi, kembang: tabKembang, analisis: tabAnalisis, tahapan: tabTahapan, admin: tabAdmin }[TAB])();
  }
  const isi = () => $('#g-isi');
  const kartuGalat = e => `<div class="at-kosong"><span aria-hidden="true">⚠️</span><b>Gagal memuat</b><p>${esc(e.message)}</p></div>`;
  const pilihRombel = (id, nilai) => `<select id="${id}" class="g-pilih">${AKUN.rombel.map(r => `<option value="${esc(r.kelas)}"${r.kelas === nilai ? ' selected' : ''}>${esc(r.kelas)} · ${r.siswa} siswa</option>`).join('')}</select>`;
  let rombelPilih = ssGet('er_rombel') || null;
  const rombelSekarang = () => (AKUN.rombel.some(r => r.kelas === rombelPilih) ? rombelPilih : (AKUN.rombel[0] || {}).kelas);

  // ---------- Sesi Kegiatan ----------
  let bukaSiswa = null;
  async function segarkanSesi() {
    try { AKUN.rombel = await rpc('er_buka_daftar', { p_pin: PIN }); gambarSesi(); } catch (e) { /* coba lagi nanti */ }
  }
  function tabSesi() {
    gambarSesi();
    segar = setInterval(segarkanSesi, 20000);
  }
  function gambarSesi() {
    const R = AKUN.rombel, jalan = R.filter(r => r.sesi);
    isi().innerHTML = `<section class="g-seksi-kepala"><div><h1>Sesi Kegiatan</h1>
        <p>Buka sesi untuk rombel yang sedang belajar. Siswa masuk dengan NISN dan <b>kode akses</b>; di luar sesi siswa tetap boleh latihan mandiri.</p></div>
        <div class="g-ringkas"><span><b>${jalan.length}</b> sesi berjalan</span><span><b>${R.reduce((a, r) => a + r.aktif, 0)}</b> siswa aktif</span>
          <span class="${R.some(r => r.terkunci) ? 'merah' : ''}"><b>${R.reduce((a, r) => a + r.terkunci, 0)}</b> terkunci</span></div></section>
      ${R.length ? `<div class="g-rombel-daftar">${R.map(kartuRombel).join('')}</div>` : '<div class="at-kosong"><b>Belum ada rombel</b><p>Admin perlu menarik guru Bahasa Inggris dari Data Induk (menu Admin).</p></div>'}`;
    isi().onclick = klikSesi;
    if (bukaSiswa) muatSiswaSesi(bukaSiswa);
  }
  function kartuRombel(r) {
    const s = r.sesi;
    return `<article class="g-rombel${s ? ' jalan' : ''}" data-kelas="${esc(r.kelas)}">
      <div class="g-rombel-kepala"><h2>${esc(r.kelas)}</h2><span class="g-pil ${s ? 'hijau' : ''}">${s ? '● Sesi berjalan' : 'Tidak ada sesi'}</span></div>
      <div class="g-rombel-info"><span>👥 ${r.siswa} siswa</span><span>🟢 ${r.aktif} aktif</span>${r.terkunci ? `<span class="merah">🔒 ${r.terkunci} terkunci</span>` : ''}
        <span>🎯 ${r.profil ? esc(r.profil.nama) : 'Tahapan umum'}</span></div>
      ${s ? `<div class="g-kode"><div><small>Kode akses</small><b>${esc(s.kode)}</b><small>sampai pukul ${jam(s.sampai)}</small></div>
          <div class="g-kode-aksi"><button class="tombol utama kecil" data-aksi="layar">📺 Tampilkan + QR</button>
          <button class="tombol kecil" data-aksi="tambah">+15 menit</button><button class="tombol kecil at-hapus" data-aksi="tutup">Tutup sesi</button></div></div>`
        : `<div class="g-buka"><label>Lama sesi <select data-menit>${[30, 45, 60, 90, 120].map(m => `<option value="${m}"${m === 90 ? ' selected' : ''}>${m} menit</option>`).join('')}</select></label>
          <button class="tombol utama kecil" data-aksi="buka">▶ Buka sesi</button></div>`}
      <button class="g-lihat" data-aksi="siswa" aria-expanded="${bukaSiswa === r.kelas}">${bukaSiswa === r.kelas ? 'Tutup daftar siswa ▴' : 'Lihat siswa ▾'}</button>
      ${bukaSiswa === r.kelas ? '<div class="g-siswa-sesi" data-siswa>Memuat…</div>' : ''}
    </article>`;
  }
  async function klikSesi(e) {
    const t = e.target.closest('[data-aksi]'); if (!t) return;
    const kartu = t.closest('[data-kelas]'), kelas = kartu && kartu.dataset.kelas, aksi = t.dataset.aksi;
    try {
      if (aksi === 'buka') { AKUN.rombel = await rpc('er_buka_kelas', { p_pin: PIN, p_kelas: [kelas], p_menit: +kartu.querySelector('[data-menit]').value }); gambarSesi(); toast(`Sesi ${kelas} dibuka`); layarKode(kelas); }
      else if (aksi === 'tambah') { AKUN.rombel = await rpc('er_buka_kelas', { p_pin: PIN, p_kelas: [kelas], p_menit: 15 }); gambarSesi(); toast('Sesi diperpanjang 15 menit'); }
      else if (aksi === 'tutup') {
        if (t.dataset.yakin !== '1') { t.dataset.yakin = '1'; t.textContent = 'Yakin? Tekan lagi'; return; }
        AKUN.rombel = await rpc('er_tutup_kelas', { p_pin: PIN, p_kelas: [kelas] }); gambarSesi(); toast(`Sesi ${kelas} ditutup`);
      } else if (aksi === 'layar') layarKode(kelas);
      else if (aksi === 'siswa') { bukaSiswa = bukaSiswa === kelas ? null : kelas; gambarSesi(); }
      else if (aksi === 'kunci') { await rpc('er_buka_kunci_guru', { p_pin: PIN, p_nisn: t.dataset.nisn }); toast('Kunci dibuka'); muatSiswaSesi(kelas); }
      else if (aksi === 'analisis') { analisisNisn = t.dataset.nisn; rombelPilih = kelas; ssSet('er_rombel', kelas); TAB = 'analisis'; ssSet('er_tab', TAB); kerangka(); }
    } catch (er) { toast(er.message, true); }
  }
  async function muatSiswaSesi(kelas) {
    const el = layar.querySelector(`[data-kelas="${CSS.escape(kelas)}"] [data-siswa]`);
    if (!el) return;
    try {
      const rows = await rpc('er_rekap', { p_pin: PIN, p_kelas: kelas });
      const urut = rows.slice().sort((a, b) => (b.sesi && b.sesi.online ? 1 : 0) - (a.sesi && a.sesi.online ? 1 : 0) || a.nama.localeCompare(b.nama));
      el.innerHTML = `<table class="g-tabel"><thead><tr><th>Siswa</th><th>Status</th><th>Keluar halaman</th><th></th></tr></thead><tbody>${urut.map(s => {
        const ss = s.sesi || {};
        return `<tr><td><button class="g-nama" data-aksi="analisis" data-nisn="${esc(s.nisn)}">${esc(s.nama)}</button></td>
          <td>${ss.terkunci && ss.online !== false ? '<span class="g-pil merah">🔒 Terkunci</span>' : ss.online ? `<span class="g-pil hijau">● ${ss.mode === 'kelas' ? 'Di sesi' : 'Mandiri'}</span>` : `<span class="g-redup">${lalu(ss.terakhir)}</span>`}</td>
          <td>${ss.keluar ? ss.keluar + '×' : '—'}</td>
          <td>${ss.terkunci ? `<button class="tombol kecil" data-aksi="kunci" data-nisn="${esc(s.nisn)}">Buka kunci</button>` : ''}</td></tr>`;
      }).join('')}</tbody></table>`;
    } catch (er) { el.innerHTML = kartuGalat(er); }
  }
  // Layar penuh: kode akses besar + QR menuju halaman siswa dengan kode terisi.
  function layarKode(kelas) {
    const r = AKUN.rombel.find(x => x.kelas === kelas);
    if (!r || !r.sesi) return;
    const url = location.href.replace(/guru\.html.*$/, 'index.html') + '#kode=' + r.sesi.kode;
    const el = document.createElement('div');
    el.className = 'g-layar-kode';
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    el.innerHTML = `<div class="g-lk-isi"><div class="g-lk-qr" id="g-qr" aria-label="QR halaman siswa beserta kode akses"></div>
      <div class="g-lk-teks"><span>English Reading · ${esc(kelas)}</span><small>Kode akses</small><b>${esc(r.sesi.kode)}</b>
        <small>Berlaku sampai pukul ${jam(r.sesi.sampai)}</small><small class="g-lk-url">${esc(url.replace(/#.*/, ''))}</small>
        <button class="tombol" id="g-lk-tutup">✕ Tutup</button></div></div>`;
    document.body.appendChild(el);
    const tutup = () => { el.remove(); document.removeEventListener('keydown', esc1); };
    const esc1 = e => { if (e.key === 'Escape') tutup(); };
    document.addEventListener('keydown', esc1);
    $('#g-lk-tutup', el).onclick = tutup;
    const qr = () => { try { new window.QRCode($('#g-qr', el), { text: url, width: 320, height: 320, correctLevel: window.QRCode.CorrectLevel.M }); $('#g-qr', el).removeAttribute('title'); } catch (e) { $('#g-qr', el).hidden = true; } };
    if (window.QRCode) qr();
    else {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
      s.onload = qr; s.onerror = () => { $('#g-qr', el).hidden = true; };
      document.head.appendChild(s);
    }
  }

  // ---------- Perkembangan ----------
  let urutKembang = 'nama';
  async function tabKembang() {
    const kelas = rombelSekarang();
    isi().innerHTML = `<section class="g-seksi-kepala"><div><h1>Perkembangan Siswa</h1><p>Kemajuan tiap siswa dihitung dari level dan sub level yang dipakai (tahapan khusus bila terpasang).</p></div>
      <label class="g-label">Rombel ${pilihRombel('g-rombel', kelas)}</label></section><div id="g-kembang">Memuat…</div>`;
    $('#g-rombel').onchange = e => { rombelPilih = e.target.value; ssSet('er_rombel', rombelPilih); tabKembang(); };
    if (!kelas) { $('#g-kembang').innerHTML = '<div class="at-kosong"><b>Belum ada rombel</b></div>'; return; }
    try {
      const [rows, profil] = await Promise.all([rpc('er_rekap', { p_pin: PIN, p_kelas: kelas }), rpc('er_profil_daftar', { p_pin: PIN })]);
      const rk = AKUN.rombel.find(r => r.kelas === kelas), pk = rk && rk.profil ? profil.find(p => p.id === rk.profil.id) : null;
      const data = rows.map(s => {
        const ps = s.profil ? profil.find(p => p.id === s.profil.id) : pk;
        return { ...s, r: ringkasKemajuan(s.kemajuan, ps ? ps.mati : null), tahapan: ps ? ps.nama : 'Umum' };
      });
      const mulai = data.filter(d => d.r.mulai).length, aktif7 = data.filter(d => d.hasil7 > 0).length;
      const rata = data.length ? Math.round(data.reduce((a, d) => a + (d.r.level ? d.r.levelTuntas / d.r.level : 0), 0) * 100 / data.length) : 0;
      const urut = data.slice().sort(urutKembang === 'maju' ? (a, b) => b.r.levelTuntas - a.r.levelTuntas : urutKembang === 'aktif' ? (a, b) => (new Date(b.terakhir || 0)) - (new Date(a.terakhir || 0)) : (a, b) => a.nama.localeCompare(b.nama));
      $('#g-kembang').innerHTML = `<div class="g-stat"><div><b>${data.length}</b><small>siswa</small></div><div><b>${mulai}</b><small>sudah mulai</small></div>
          <div><b>${aktif7}</b><small>aktif 7 hari</small></div><div><b>${rata}%</b><small>rata-rata level tuntas</small></div></div>
        <div class="g-alat-tabel"><span>Urutkan:</span>${[['nama', 'Nama'], ['maju', 'Kemajuan'], ['aktif', 'Terakhir aktif']].map(([k, n]) => `<button class="g-chip${k === urutKembang ? ' aktif' : ''}" data-urut="${k}">${n}</button>`).join('')}</div>
        <div class="g-gulir"><table class="g-tabel g-tabel-kembang"><thead><tr><th>No</th><th>Siswa</th><th>Tahap</th><th>Level tuntas</th><th>Sub level</th><th>7 hari</th><th>Terakhir aktif</th><th>Tahapan</th></tr></thead>
        <tbody>${urut.map((d, i) => {
          const pr = d.r.level ? Math.round(d.r.levelTuntas * 100 / d.r.level) : 0;
          return `<tr><td>${i + 1}</td><td><button class="g-nama" data-nisn="${esc(d.nisn)}">${esc(d.nama)}</button>${d.sesi && d.sesi.terkunci ? ' 🔒' : ''}</td>
            <td>${!d.r.mulai ? '<span class="g-redup">belum mulai</span>' : d.r.tahapSekarang == null ? '🏆 tamat' : 'Tahap ' + d.r.tahapSekarang}</td>
            <td><div class="g-batang" title="${pr}%"><span style="width:${pr}%"></span></div><small>${d.r.levelTuntas}/${d.r.level}</small></td>
            <td>${d.r.subLulus}/${d.r.subTotal}</td><td>${d.hasil7 ? `${d.hasil7} hasil${d.rata7 != null ? ` · rata ${d.rata7}%` : ''}` : '—'}</td>
            <td>${d.sesi && d.sesi.online ? '<span class="g-pil hijau">● sekarang</span>' : lalu(d.terakhir || (d.sesi && d.sesi.terakhir))}</td><td>${esc(d.tahapan)}</td></tr>`;
        }).join('')}</tbody></table></div>`;
      $('#g-kembang').onclick = e => {
        const u = e.target.closest('[data-urut]'); if (u) { urutKembang = u.dataset.urut; tabKembang(); return; }
        const n = e.target.closest('[data-nisn]'); if (n) { analisisNisn = n.dataset.nisn; TAB = 'analisis'; ssSet('er_tab', TAB); kerangka(); }
      };
    } catch (er) { $('#g-kembang').innerHTML = kartuGalat(er); }
  }

  // ---------- Analisis Siswa ----------
  let analisisNisn = null, rekapCache = {};
  async function tabAnalisis() {
    const kelas = rombelSekarang();
    isi().innerHTML = `<section class="g-seksi-kepala"><div><h1>Analisis Siswa</h1><p>Kemajuan per tahap, hasil terakhir, dan bagian yang perlu dilatih lagi.</p></div>
      <div class="g-pilih-baris"><label class="g-label">Rombel ${pilihRombel('g-rombel', kelas)}</label><label class="g-label">Siswa <select id="g-siswa" class="g-pilih"><option>Memuat…</option></select></label></div></section>
      <div id="g-analisis"></div>`;
    $('#g-rombel').onchange = e => { rombelPilih = e.target.value; ssSet('er_rombel', rombelPilih); analisisNisn = null; tabAnalisis(); };
    if (!kelas) return;
    try {
      const rows = rekapCache[kelas] = await rpc('er_rekap', { p_pin: PIN, p_kelas: kelas });
      if (!rows.some(s => s.nisn === analisisNisn)) analisisNisn = (rows[0] || {}).nisn || null;
      $('#g-siswa').innerHTML = rows.map(s => `<option value="${esc(s.nisn)}"${s.nisn === analisisNisn ? ' selected' : ''}>${esc(s.nama)}</option>`).join('');
      $('#g-siswa').onchange = e => { analisisNisn = e.target.value; muatAnalisis(); };
      muatAnalisis();
    } catch (er) { $('#g-analisis').innerHTML = kartuGalat(er); }
  }
  async function muatAnalisis() {
    const el = $('#g-analisis');
    if (!analisisNisn) { el.innerHTML = '<div class="at-kosong"><b>Belum ada siswa</b></div>'; return; }
    el.innerHTML = '<p class="g-redup">Memuat…</p>';
    try {
      const [d, profil] = await Promise.all([rpc('er_detail', { p_pin: PIN, p_nisn: analisisNisn }), rpc('er_profil_daftar', { p_pin: PIN })]);
      const p = d.atur && d.atur.profil, m = p ? p.mati : null, r = ringkasKemajuan(d.kemajuan, m);
      const hasil = d.hasil || [], baca = hasil.filter(h => h.jenis === 'baca'), sub = hasil.filter(h => h.jenis === 'sub');
      const rataBaca = baca.length ? Math.round(baca.slice(0, 10).reduce((a, h) => a + h.nilai, 0) / Math.min(10, baca.length)) : null;
      // Perlu perhatian: sub level yang belum lulus padahal sudah dicoba ≥ 2 kali.
      const coba = {};
      sub.forEach(h => { const k = h.level + '|' + h.sub; (coba[k] = coba[k] || []).push(h.nilai); });
      const perhatian = Object.entries(coba).filter(([, v]) => v.length >= 2 && Math.max(...v) < TUNTAS)
        .map(([k, v]) => { const [lv, n] = k.split('|'); const b = levelDari(lv); return { b, n: +n, v }; }).filter(x => x.b).slice(0, 8);
      const terakhir = d.sesi && d.sesi[0];
      const namaSub = (b, n) => { const s = b && daftarSub(b)[n - 1]; return s ? `${s[1]} ${s[0]}` : `Sub level ${n}`; };
      el.innerHTML = `<section class="g-profil-siswa"><div><h2>${esc(d.siswa.nama)}</h2><p>NISN ${esc(d.siswa.nisn)} · ${esc(d.siswa.kelas)} ·
          ${terakhir ? `terakhir masuk ${lalu(terakhir.terakhir)} (${terakhir.mode === 'kelas' ? 'sesi kelas' : 'mandiri'})` : 'belum pernah masuk'}</p></div>
          ${terakhir && terakhir.terkunci && new Date(terakhir.berakhir) > new Date() ? '<button class="tombol kecil" data-aksi="kunci">🔓 Buka kunci</button>' : ''}</section>
        <div class="g-stat"><div><b>${r.levelTuntas}/${r.level}</b><small>level tuntas</small></div><div><b>${r.subLulus}/${r.subTotal}</b><small>sub level lulus</small></div>
          <div><b>${rataBaca == null ? '—' : rataBaca + '%'}</b><small>akurasi membaca (10 terakhir)</small></div>
          <div><b>${hasil.filter(h => Date.now() - new Date(h.waktu) < 7 * 864e5).length}</b><small>hasil 7 hari</small></div></div>
        <section class="at-kartu"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">🗺️</span><div><h2>Kemajuan per tahap</h2>
          <p>Memakai ${p ? `tahapan khusus <b>${esc(p.nama)}</b> (${p.asal === 'siswa' ? 'khusus siswa ini' : 'tahapan rombel'})` : 'tahapan umum'}.</p></div></div>
          <div class="g-tahap-batang">${window.TAHAP.filter(t => r.tahap[t.no]).map(t => { const x = r.tahap[t.no], pr = Math.round(x.tuntas * 100 / x.level);
            return `<div><span>Tahap ${t.no} · ${esc(t.nama)}</span><div class="g-batang besar"><span style="width:${pr}%"></span></div><small>${x.tuntas}/${x.level} level</small></div>`; }).join('')}</div></section>
        <section class="at-kartu"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">🩺</span><div><h2>Perlu perhatian</h2><p>Sub level yang sudah dicoba dua kali atau lebih tetapi belum mencapai ${TUNTAS}%.</p></div></div>
          ${perhatian.length ? `<ul class="g-daftar">${perhatian.map(x => `<li><b>${esc(labelLevel(x.b))}</b> · ${esc(namaSub(x.b, x.n))}<small>${x.v.length}× dicoba, terbaik ${Math.max(...x.v)}%</small></li>`).join('')}</ul>`
            : '<p class="g-redup">Tidak ada. 👍</p>'}</section>
        <section class="at-kartu"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">🕘</span><div><h2>Hasil terakhir</h2><p>Sub level, Baca &amp; Koreksi, dengar sampai selesai, dan soal pemahaman.</p></div></div>
          ${hasil.length ? `<div class="g-gulir"><table class="g-tabel"><thead><tr><th>Waktu</th><th>Level</th><th>Kegiatan</th><th>Nilai</th></tr></thead><tbody>${hasil.slice(0, 40).map(h => {
            const b = levelDari(h.level);
            const kg = h.jenis === 'sub' ? namaSub(b, h.sub) : h.jenis === 'baca' ? '🎤 Baca & Koreksi' : h.jenis === 'dengar' ? '🎧 Dengar sampai selesai' : '📝 Soal pemahaman';
            return `<tr><td>${tanggal(h.waktu)}</td><td>${esc(b ? labelLevel(b) : h.level)}</td><td>${esc(kg)}</td><td><b class="${h.nilai >= TUNTAS ? 'hijau' : h.nilai >= 60 ? '' : 'merah'}">${h.nilai == null ? '—' : h.nilai + '%'}</b></td></tr>`;
          }).join('')}</tbody></table></div>` : '<p class="g-redup">Belum ada hasil.</p>'}</section>
        <section class="at-kartu"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">🎯</span><div><h2>Tahapan khusus siswa ini</h2>
          <p>Mengalahkan tahapan rombel. Pilih "Ikut rombel" untuk kembali.</p></div></div>
          <div class="g-baris-aksi"><select id="g-profil-siswa" class="g-pilih"><option value="">Ikut rombel</option>${profil.map(x => `<option value="${esc(x.id)}"${p && p.asal === 'siswa' && p.id === x.id ? ' selected' : ''}>${esc(x.nama)}</option>`).join('')}</select>
            <button class="tombol kecil utama" data-aksi="pasang">Simpan</button></div></section>
        <section class="at-kartu g-bahaya"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">🗑️</span><div><h2>Hapus data latihan</h2>
          <p>Menghapus kemajuan, riwayat hasil, dan sesi siswa ini (mis. setelah uji coba). Tidak bisa dibatalkan.</p></div></div>
          <button class="tombol kecil at-hapus" data-aksi="hapus">Hapus data latihan ${esc(d.siswa.nama)}</button></section>`;
      el.onclick = async e => {
        const t = e.target.closest('[data-aksi]'); if (!t) return;
        try {
          if (t.dataset.aksi === 'kunci') { await rpc('er_buka_kunci_guru', { p_pin: PIN, p_nisn: analisisNisn }); toast('Kunci dibuka'); muatAnalisis(); }
          if (t.dataset.aksi === 'pasang') { await rpc('er_pasang_siswa', { p_pin: PIN, p_nisn: [analisisNisn], p_profil: $('#g-profil-siswa').value || null }); toast('Tahapan siswa disimpan'); muatAnalisis(); }
          if (t.dataset.aksi === 'hapus') {
            if (t.dataset.yakin !== '1') { t.dataset.yakin = '1'; t.textContent = 'Yakin hapus? Tekan lagi'; return; }
            await rpc('er_hapus_latihan', { p_pin: PIN, p_nisn: analisisNisn }); toast('Data latihan dihapus'); muatAnalisis();
          }
        } catch (er) { toast(er.message, true); }
      };
    } catch (er) { el.innerHTML = kartuGalat(er); }
  }

  // ---------- Pengaturan & Tahapan ----------
  const DEF_ATUR = { jumlahSoal: 10, harusDengar: true, harusBaca: true, syaratBaca: 75, tampilJawaban: true, bilaSalah: 'akhir', batasSalah: 0,
    mandiri: true, maks_keluar: 0, toleransi_keluar: 10 };
  const PILIHAN = {
    jumlahSoal: ['Jumlah soal per sub level', [10, 15, 20, 25, 30, 40].map(v => [v, `${v} soal`])],
    harusDengar: ['Mendengar teks sebelum sub level 1', [[true, 'Harus Dengar'], [false, 'Tanpa Dengar']]],
    harusBaca: ['Membaca teks sebelum sub level 1', [[true, 'Harus Baca'], [false, 'Tanpa Baca']]],
    syaratBaca: ['Akurasi membaca minimal', [50, 60, 70, 75, 80, 85, 90].map(v => [v, `${v}%`])],
    tampilJawaban: ['Jawaban benar dan penjelasannya', [[true, 'Ditampilkan'], [false, 'Tidak ditampilkan']]],
    bilaSalah: ['Soal yang dijawab salah', [['akhir', 'Diulang di akhir sesi'], ['ulang', 'Diulang di nomor itu sampai benar'], ['lanjut', 'Maju terus, tidak diulang']]],
    batasSalah: ['Batas salah dalam satu sub level', [0, 3, 5, 8, 10].map(v => [v, v ? `lebih dari ${v} kali, mulai lagi` : 'Tanpa batas'])],
    mandiri: ['Latihan mandiri di luar sesi kelas', [[true, 'Boleh (dengan NISN)'], [false, 'Tidak, hanya saat sesi']]],
    maks_keluar: ['Batas keluar halaman saat sesi kelas', [0, 1, 2, 3, 5].map(v => [v, v ? `${v} kali → latihan dikunci` : 'Tanpa batas (hanya dicatat)'])],
    toleransi_keluar: ['Keluar halaman yang dihitung', [5, 10, 20, 30].map(v => [v, `≥ ${v} detik`])]
  };
  const KUNCI_PROFIL = ['jumlahSoal', 'harusDengar', 'harusBaca', 'syaratBaca', 'tampilJawaban', 'bilaSalah', 'batasSalah'];
  const teksNilai = (k, v) => ((PILIHAN[k][1].find(([x]) => x === v) || [null, String(v)])[1]);
  const nilaiKetik = (k, s) => (s === '' ? null : typeof DEF_ATUR[k] === 'boolean' ? s === 'true' : typeof DEF_ATUR[k] === 'number' ? +s : s);
  const umum = k => (AKUN.umum[k] == null ? DEF_ATUR[k] : AKUN.umum[k]);
  function barisAtur(k, nilai, profil, kunci) {
    const [label, opsi] = PILIHAN[k];
    const semua = (profil ? [['', `Ikut umum (${teksNilai(k, umum(k))})`]] : []).concat(opsi.map(([v, t]) => [String(v), t]));
    const pilih = nilai == null ? '' : String(nilai);
    return `<label class="at-baris" data-baris="${k}"><span class="at-baris-label">${label}</span>
      <select data-atur="${k}"${kunci ? ' disabled' : ''}>${semua.map(([v, t]) => `<option value="${v}"${v === pilih ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select></label>`;
  }
  function ringkasTahapan(m) {
    let tahap = 0, level = 0, sub = 0;
    window.TAHAP.forEach(t => {
      let ada = false;
      window.BACAAN.filter(b => b.tahap === t.no).forEach(b => { if (!levelOn(m, b)) return; level++; ada = true; if (punyaSub(b)) sub += subDipakaiM(m, b).length; });
      if (ada) tahap++;
    });
    return { tahap, level, sub };
  }
  const teksRingkas = r => `${r.tahap} tahap · ${r.level} level · ${r.sub} sub level`;
  function matiKecuali(tahapDipakai, subMati) {
    const m = { tahap: window.TAHAP.map(t => t.no).filter(n => !tahapDipakai.includes(n)), level: [], sub: {} };
    if (subMati) window.BACAAN.filter(b => tahapDipakai.includes(b.tahap) && punyaSub(b) && daftarSub(b).length >= 10).forEach(b => { m.sub[b.id] = subMati.slice(); });
    return m;
  }
  const CONTOH = [
    { kode: 'tka', ikon: '🎓', nama: 'Persiapan TKA', ket: 'Level TKA saja, sub level 6–10 sesuai kisi-kisi ujian, 20 soal per sub level.', buat: () => ({ setelan: { jumlahSoal: 20 }, mati: matiKecuali([4], [1, 2, 3, 4, 5]) }) },
    { kode: 'utbk', ikon: '🏛️', nama: 'Persiapan UTBK/SNBT', ket: 'Level UTBK/SNBT saja, sub level 6–10, 20 soal per sub level.', buat: () => ({ setelan: { jumlahSoal: 20 }, mati: matiKecuali([5], [1, 2, 3, 4, 5]) }) },
    { kode: 'fondasi', ikon: '🌱', nama: 'Fondasi', ket: 'Kosakata dasar dan kalimat sederhana (Tahap 0–1).', buat: () => ({ setelan: {}, mati: matiKecuali([0, 1]) }) },
    { kode: 'genre', ikon: '📚', nama: 'Teks Fungsional & Genre', ket: 'Tahap 2–3: teks pendek dan genre teks.', buat: () => ({ setelan: {}, mati: matiKecuali([2, 3]) }) }
  ];
  let PROFIL = [], draf = null;
  async function tabTahapan() {
    isi().innerHTML = '<p class="g-redup">Memuat…</p>';
    try { PROFIL = await rpc('er_profil_daftar', { p_pin: PIN }); } catch (er) { isi().innerHTML = kartuGalat(er); return; }
    const admin = AKUN.peran === 'admin';
    isi().innerHTML = `<section class="g-seksi-kepala"><div><h1>Pengaturan &amp; Tahapan</h1>
        <p><b>Umum</b> berlaku untuk semua siswa. <b>Tahapan khusus</b> dipasang ke rombel atau siswa tertentu; aturan yang diisi di tahapan khusus mengalahkan Umum, satu per satu. Urutan: siswa → rombel → umum.</p></div></section>
      <section class="at-kartu"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">🌐</span><div><h2>Pengaturan Umum</h2>
        <p>${admin ? 'Berlaku untuk semua siswa yang tidak diberi aturan lain.' : 'Diatur admin. Untuk aturan berbeda di rombel Anda, buat tahapan khusus.'}</p></div></div>
        <div class="at-baris-daftar">${Object.keys(PILIHAN).map(k => barisAtur(k, umum(k), false, !admin)).join('')}</div>
        ${admin ? '<label class="at-baris"><span class="at-baris-label">Kode buka kunci (kosong = kode akses sesi atau PIN guru)</span><input id="g-kode-buka" class="g-pilih" maxlength="12" value="' + esc(AKUN.umum.kode_buka || '') + '"></label>' : ''}</section>
      <section class="at-kartu"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">🏫</span><div><h2>Tahapan untuk rombel</h2><p>Pilih tahapan yang dipakai tiap rombel. Siswa yang diberi tahapan sendiri (menu Analisis Siswa) tidak terpengaruh.</p></div></div>
        <div class="g-gulir"><table class="g-tabel"><thead><tr><th>Rombel</th><th>Tahapan</th></tr></thead><tbody>${AKUN.rombel.map(r => `<tr><td><b>${esc(r.kelas)}</b></td>
          <td><select class="g-pilih" data-pasang="${esc(r.kelas)}"><option value="">Tahapan umum</option>${PROFIL.map(p => `<option value="${esc(p.id)}"${r.profil && r.profil.id === p.id ? ' selected' : ''}>${esc(p.nama)}</option>`).join('')}</select></td></tr>`).join('')}</tbody></table></div></section>
      <section class="at-kartu at-buat"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">✨</span><div><h2>Tahapan khusus</h2>
        <p>Pilih tahap, level, sampai sub level yang dipakai, dan aturan yang berbeda dari Umum. Untuk remedial, pengayaan, atau persiapan ujian.</p></div></div>
        <div class="at-contoh"><button class="at-contoh-kartu at-contoh-baru" data-buat="baru"><span aria-hidden="true">＋</span><b>Buat dari awal</b><small>Semua materi dicentang, lalu pilih sendiri.</small></button>
          ${CONTOH.map(c => `<button class="at-contoh-kartu" data-buat="${c.kode}"><span aria-hidden="true">${c.ikon}</span><b>${c.nama}</b><small>${c.ket}</small></button>`).join('')}</div></section>
      ${PROFIL.length ? `<div class="at-profil-daftar">${PROFIL.map(kartuProfil).join('')}</div>` : '<div class="at-kosong"><span aria-hidden="true">🗂️</span><b>Belum ada tahapan khusus</b><p>Buat dari awal atau mulai dari contoh di atas.</p></div>'}`;
    const el = isi();
    el.querySelectorAll('select[data-atur]').forEach(s => {
      s.onchange = async () => {
        try { AKUN.umum = await rpc('er_set_umum', { p_pin: PIN, p_v: { [s.dataset.atur]: nilaiKetik(s.dataset.atur, s.value) } }); toast('✓ Pengaturan Umum tersimpan'); }
        catch (er) { toast(er.message, true); }
      };
    });
    const kb = $('#g-kode-buka');
    if (kb) kb.onchange = async () => { try { AKUN.umum = await rpc('er_set_umum', { p_pin: PIN, p_v: { kode_buka: kb.value } }); toast('✓ Kode buka tersimpan'); } catch (er) { toast(er.message, true); } };
    el.querySelectorAll('select[data-pasang]').forEach(s => {
      s.onchange = async () => {
        try { AKUN.rombel = await rpc('er_pasang_kelas', { p_pin: PIN, p_kelas: s.dataset.pasang, p_profil: s.value || null }); toast(`✓ Tahapan ${s.dataset.pasang} disimpan`); tabTahapan(); }
        catch (er) { toast(er.message, true); }
      };
    });
    el.onclick = async e => {
      const b = e.target.closest('[data-buat]');
      if (b) { bukaEditor(null, b.dataset.buat); return; }
      const t = e.target.closest('[data-aksi]'); if (!t) return;
      const p = PROFIL.find(x => x.id === t.closest('[data-id]').dataset.id);
      try {
        if (t.dataset.aksi === 'ubah') bukaEditor(p);
        if (t.dataset.aksi === 'salin') bukaEditor({ ...p, id: null, nama: p.nama + ' (salinan)', milik: true });
        if (t.dataset.aksi === 'hapus') {
          if (t.dataset.yakin !== '1') { t.dataset.yakin = '1'; t.textContent = 'Yakin? Tekan lagi'; return; }
          await rpc('er_profil_hapus', { p_pin: PIN, p_id: p.id }); toast('Tahapan dihapus');
          AKUN.rombel = await rpc('er_buka_daftar', { p_pin: PIN }); tabTahapan();
        }
      } catch (er) { toast(er.message, true); }
    };
  }
  function kartuProfil(p) {
    const r = ringkasTahapan(p.mati);
    const aturan = Object.entries(p.setelan || {}).filter(([k, v]) => v != null && PILIHAN[k]);
    return `<article class="at-profil" data-id="${esc(p.id)}">
      <div class="at-profil-kepala"><div><h3>${esc(p.nama)}</h3>${p.catatan ? `<p>${esc(p.catatan)}</p>` : ''}<p class="g-redup">Dibuat ${esc(p.pemilik_nama || '—')} · diubah ${tanggal(p.diubah)}</p></div></div>
      <div class="at-chip-baris"><span class="at-chip">🗺️ ${teksRingkas(r)}</span>
        ${aturan.length ? aturan.map(([k, v]) => `<span class="at-chip at-chip-atur">${PILIHAN[k][0].split(' ').slice(0, 2).join(' ')}: ${esc(teksNilai(k, v))}</span>`).join('') : '<span class="at-chip at-chip-redup">Aturan ikut Umum</span>'}
        ${p.kelas.length ? `<span class="at-chip g-chip-hijau">🏫 ${p.kelas.map(esc).join(', ')}</span>` : ''}${p.siswa ? `<span class="at-chip g-chip-hijau">👤 ${p.siswa} siswa</span>` : ''}</div>
      <div class="at-profil-aksi">${p.milik !== false ? '<button class="tombol kecil" data-aksi="ubah">✏️ Ubah</button>' : ''}<button class="tombol kecil" data-aksi="salin">⧉ Salin</button>
        ${p.milik !== false ? '<button class="tombol kecil at-hapus" data-aksi="hapus">Hapus</button>' : ''}</div></article>`;
  }

  // Editor tahapan khusus (sama dengan editor di app.js, disimpan ke server).
  function bukaEditor(p, kode) {
    const contoh = CONTOH.find(c => c.kode === kode);
    const dasar = p ? JSON.parse(JSON.stringify(p)) : { nama: contoh ? contoh.nama : '', catatan: contoh ? contoh.ket : '', ...(contoh ? contoh.buat() : { setelan: {}, mati: {} }) };
    draf = { id: p ? p.id : null, nama: dasar.nama, catatan: dasar.catatan || '', setelan: dasar.setelan || {},
      mati: Object.assign({ tahap: [], level: [], sub: {} }, dasar.mati), buka: new Set(contoh ? window.TAHAP.map(t => t.no).filter(n => tahapOn(dasar.mati, n)) : []), bukaLevel: new Set() };
    clearInterval(segar);
    isi().innerHTML = `<button class="kembali g-kembali" id="ed-kembali">← Pengaturan &amp; Tahapan</button>
      <header class="at-kepala"><span class="at-alis">Tahapan khusus</span><h1>${draf.id ? 'Ubah tahapan khusus' : 'Tahapan khusus baru'}</h1></header>
      <section class="at-kartu"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">🏷️</span><div><h2>Nama</h2><p>Nama ini dilihat siswa di halaman depan.</p></div></div>
        <div class="at-isian-daftar"><label class="at-isian"><span>Nama tahapan</span><input id="ed-nama" maxlength="60" value="${esc(draf.nama)}" placeholder="mis. Remedial X-2" autocomplete="off"></label>
          <label class="at-isian"><span>Catatan <small>(opsional)</small></span><textarea id="ed-catatan" rows="2" maxlength="200">${esc(draf.catatan)}</textarea></label>
          <p class="at-galat" id="ed-galat" role="alert" hidden></p></div></section>
      <section class="at-kartu"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">⚙️</span><div><h2>Aturan</h2><p>Biarkan <b>Ikut umum</b> untuk memakai Pengaturan Umum.</p></div></div>
        <div class="at-baris-daftar">${KUNCI_PROFIL.map(k => barisAtur(k, draf.setelan[k], true, false)).join('')}</div></section>
      <section class="at-kartu"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">🗺️</span><div><h2>Tahapan</h2><p>Centang materi yang dipakai. Mematikan <b>tahap</b> ikut mematikan levelnya; mematikan <b>level</b> ikut mematikan sub levelnya.</p></div></div>
        <div class="at-alat"><button class="tombol kecil" data-aksi="semua-on">✓ Pakai semua</button><button class="tombol kecil" data-aksi="semua-off">Matikan semua</button>
          <button class="tombol kecil" data-aksi="buka-semua">Buka semua tahap</button><button class="tombol kecil" data-aksi="tutup-semua">Tutup semua</button></div>
        <div class="at-legenda"><span><i class="lg-on"></i>dipakai</span><span><i class="lg-sebagian"></i>sebagian</span><span><i class="lg-off"></i>tidak dipakai</span></div>
        <div class="at-pohon" id="ed-pohon"></div></section>
      <div class="at-simpan g-simpan"><span class="at-simpan-ringkas" id="ed-ringkas"></span>
        <div class="at-simpan-aksi"><button class="tombol kecil" id="ed-batal">Batal</button><button class="tombol utama kecil" id="ed-simpan">Simpan</button></div></div>`;
    window.scrollTo(0, 0);
    gambarPohon();
    $('#ed-kembali').onclick = $('#ed-batal').onclick = () => tabTahapan();
    $('#ed-nama').oninput = () => { $('#ed-galat').hidden = true; };
    isi().querySelector('.at-alat').onclick = e => {
      const a = e.target.closest('[data-aksi]'); if (!a) return;
      if (a.dataset.aksi === 'semua-on') draf.mati = { tahap: [], level: [], sub: {} };
      if (a.dataset.aksi === 'semua-off') draf.mati = { tahap: window.TAHAP.map(t => t.no), level: [], sub: {} };
      if (a.dataset.aksi === 'buka-semua') window.TAHAP.forEach(t => draf.buka.add(t.no));
      if (a.dataset.aksi === 'tutup-semua') { draf.buka.clear(); draf.bukaLevel.clear(); }
      gambarPohon();
    };
    const tog = (arr, v, nyala) => { const i = arr.indexOf(v); if (nyala && i >= 0) arr.splice(i, 1); else if (!nyala && i < 0) arr.push(v); };
    const pohon = $('#ed-pohon');
    pohon.onchange = e => {
      const x = e.target, mt = draf.mati;
      if (x.dataset.tahap != null) { const t = +x.dataset.tahap; tog(mt.tahap, t, x.checked); if (x.checked) draf.buka.add(t); }
      else if (x.dataset.level) tog(mt.level, x.dataset.level, x.checked);
      else if (x.dataset.sub) { const arr = mt.sub[x.dataset.sub] || (mt.sub[x.dataset.sub] = []); tog(arr, +x.dataset.n, x.checked); if (!arr.length) delete mt.sub[x.dataset.sub]; }
      gambarPohon();
    };
    pohon.onclick = e => {
      const a = e.target.closest('[data-aksi]'); if (!a) return;
      const mt = draf.mati;
      if (a.dataset.aksi === 'buka-tahap') { const t = +a.dataset.t; draf.buka.has(t) ? draf.buka.delete(t) : draf.buka.add(t); }
      else if (a.dataset.aksi === 'buka-level') { const l = a.dataset.l; draf.bukaLevel.has(l) ? draf.bukaLevel.delete(l) : draf.bukaLevel.add(l); }
      else if (a.dataset.aksi === 'massal') {
        const t = +a.dataset.t, n = +a.dataset.n;
        const L = window.BACAAN.filter(b => b.tahap === t && punyaSub(b) && daftarSub(b).length >= n && levelOnDasar(mt, b));
        const nyalakan = statusMassal(mt, L, n) !== 'on';
        L.forEach(b => { const arr = mt.sub[b.id] || (mt.sub[b.id] = []); tog(arr, n, nyalakan); if (!arr.length) delete mt.sub[b.id]; });
      } else return;
      gambarPohon();
    };
    $('#ed-simpan').onclick = async () => {
      const nama = $('#ed-nama').value.trim(), galat = $('#ed-galat');
      const g = t => { galat.textContent = t; galat.hidden = false; galat.scrollIntoView({ block: 'center', behavior: 'smooth' }); };
      if (!nama) { g('Isi nama tahapan dulu.'); $('#ed-nama').focus(); return; }
      if (!ringkasTahapan(draf.mati).level) { g('Pilih minimal satu level di bagian Tahapan.'); return; }
      const setel = {};
      isi().querySelectorAll('select[data-atur]').forEach(s => { const v = nilaiKetik(s.dataset.atur, s.value); if (v != null) setel[s.dataset.atur] = v; });
      try {
        await rpc('er_profil_simpan', { p_pin: PIN, p_p: { id: draf.id, nama, catatan: $('#ed-catatan').value.trim(), setelan: setel, mati: draf.mati } });
        toast('✓ Tahapan disimpan'); tabTahapan();
      } catch (er) { g(er.message); }
    };
  }
  function statusMassal(m, L, n) {
    const ada = L.filter(b => punyaSub(b) && daftarSub(b).length >= n && levelOnDasar(m, b));
    if (!ada.length) return 'kosong';
    const on = ada.filter(b => subOn(m, b, n)).length;
    return on === ada.length ? 'on' : on ? 'sebagian' : 'off';
  }
  function barisLevel(m, b, nomor, tahapNyala) {
    const centang = !(m.level || []).includes(b.id), on = tahapNyala && centang;
    const subs = punyaSub(b) ? daftarSub(b) : [];
    const nSub = subs.length && on ? subDipakaiM(m, b).length : 0;
    const buka = on && draf.bukaLevel.has(b.id), jenis = jenisLevel(b), sebagian = on && subs.length && nSub < subs.length;
    return `<div class="at-level${on ? (sebagian ? ' sebagian' : '') : ' mati'}">
      <div class="at-level-kepala"><label class="at-cek kecil"><input type="checkbox" data-level="${esc(b.id)}" aria-label="${esc(b.judul)}"${centang ? ' checked' : ''}${tahapNyala ? '' : ' disabled'}${sebagian ? ' data-sebagian="1"' : ''}><span></span></label>
        <span class="at-level-judul"><b>${nomor}. ${esc(b.judul)}</b><small><span class="jenis jenis-${jenis.kunci}">${jenis.nama}</span>${subs.length ? ` ${nSub}/${subs.length} sub level` : ''}</small></span>
        ${subs.length ? `<button class="at-level-buka" data-aksi="buka-level" data-l="${esc(b.id)}" aria-expanded="${buka}"${on ? '' : ' disabled'}>Sub level <span class="at-panah" aria-hidden="true">▾</span></button>` : ''}</div>
      ${buka ? `<div class="at-subs">${subs.map(([nama, ikon], k) => { const n = k + 1, nyala = !(((m.sub || {})[b.id]) || []).includes(n);
        return `<label class="at-sub${nyala ? ' on' : ''}"><input type="checkbox" data-sub="${esc(b.id)}" data-n="${n}"${nyala ? ' checked' : ''}><span class="at-sub-no">${n}</span><span class="at-sub-nama">${ikon} ${esc(nama)}</span></label>`; }).join('')}</div>` : ''}
    </div>`;
  }
  function gambarPohon() {
    const m = draf.mati;
    $('#ed-pohon').innerHTML = window.TAHAP.map(t => {
      const L = window.BACAAN.filter(b => b.tahap === t.no), on = tahapOn(m, t.no), buka = draf.buka.has(t.no);
      const nOn = on ? L.filter(b => levelOn(m, b)).length : 0;
      const sebagian = on && (nOn < L.length || L.some(b => levelOn(m, b) && punyaSub(b) && subDipakaiM(m, b).length < daftarSub(b).length));
      const maxSub = Math.max(0, ...L.filter(punyaSub).map(b => daftarSub(b).length));
      return `<div class="at-tahap${on ? (sebagian ? ' sebagian' : '') : ' mati'}${buka ? ' buka' : ''}">
        <div class="at-tahap-kepala"><label class="at-cek"><input type="checkbox" data-tahap="${t.no}" aria-label="Tahap ${t.no}"${on ? ' checked' : ''}${sebagian ? ' data-sebagian="1"' : ''}><span></span></label>
          <button class="at-tahap-judul" data-aksi="buka-tahap" data-t="${t.no}" aria-expanded="${buka}"><span class="tahap-no">${t.no}</span>
            <span class="at-tahap-teks"><b>${esc(t.nama)}</b><small>${on ? `${nOn}/${L.length} level dipakai` : 'Tidak dipakai'} · ${esc(t.setara)}</small></span><span class="at-panah" aria-hidden="true">▾</span></button></div>
        ${buka ? `<div class="at-tahap-isi">${maxSub && on ? `<div class="at-massal"><span>Sub level di semua level tahap ini</span><div>${Array.from({ length: maxSub }, (_, i) => i + 1).map(n =>
          `<button class="at-massal-sub ${statusMassal(m, L, n)}" data-aksi="massal" data-t="${t.no}" data-n="${n}" aria-label="Sub level ${n} untuk semua level">${n}</button>`).join('')}</div></div>` : ''}
          ${L.map((b, i) => barisLevel(m, b, i + 1, on)).join('')}</div>` : ''}</div>`;
    }).join('');
    $('#ed-pohon').querySelectorAll('input[data-sebagian]').forEach(x => { x.indeterminate = true; });
    const r = ringkasTahapan(m);
    $('#ed-ringkas').innerHTML = `Dipakai <b>${r.tahap}</b> tahap · <b>${r.level}</b> level · <b>${r.sub}</b> sub level`;
  }

  // ---------- Admin ----------
  async function tabAdmin() {
    isi().innerHTML = `<section class="g-seksi-kepala"><div><h1>Admin</h1><p>Guru Bahasa Inggris dan rombelnya diambil dari jadwal KBM di Data Induk.</p></div></section>
      <section class="at-kartu"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">⬇️</span><div><h2>Tarik guru dari Data Induk</h2>
        <p>Mengambil guru yang mengajar mapel Bahasa Inggris (termasuk Bahasa Inggris TL) beserta rombelnya untuk tahun ajaran aktif. Ulangi bila jadwal KBM berubah.</p></div></div>
        <button class="tombol utama kecil" id="g-tarik">⬇️ Tarik guru dari Data Induk</button><p id="g-tarik-hasil" class="g-redup"></p></section>
      <section class="at-kartu"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">🔑</span><div><h2>Guru dan PIN</h2>
        <p>PIN pribadi guru sama dengan Asesmen Merdeka (Tryout) dan Matdas, dibuat di menu Admin → Guru dan PIN di Matdas atau admin Tryout. Guru tanpa PIN bisa masuk sementara dengan ID gurunya.</p></div></div>
        <div id="g-guru">Memuat…</div></section>`;
    $('#g-tarik').onclick = async () => {
      const h = $('#g-tarik-hasil'); h.textContent = 'Mengambil…';
      try {
        const I = await rpc('er_induk_ambil', { p_pin: PIN });
        if (!I.url || !I.key || !I.pin) throw new Error('Alamat Data Induk belum tersimpan. Simpan dulu lewat admin Aplikasi Tryout (Data siswa → Tarik dari data induk).');
        const r = await fetch(`${I.url}/rest/v1/rpc/guru_ekspor`, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: I.key, Authorization: 'Bearer ' + I.key }, body: JSON.stringify({ p_pin: I.pin }) });
        const j = await r.json();
        if (!r.ok) throw new Error(j.message || 'Data Induk menolak permintaan');
        const s = await rpc('er_sinkron_guru', { p_pin: PIN, p_rows: j });
        h.textContent = `✓ ${s.guru} guru Bahasa Inggris, ${s.rombel} rombel${s.guru_baru ? ` (${s.guru_baru} guru baru ditambahkan)` : ''}.`;
        AKUN.rombel = await rpc('er_buka_daftar', { p_pin: PIN });
        muatGuru();
      } catch (er) { h.textContent = '⚠ ' + er.message; }
    };
    muatGuru();
  }
  async function muatGuru() {
    try {
      const g = await rpc('er_guru_daftar', { p_pin: PIN });
      $('#g-guru').innerHTML = g.length ? `<table class="g-tabel"><thead><tr><th>Guru</th><th>Rombel Bahasa Inggris</th><th>PIN</th></tr></thead><tbody>${g.map(x =>
        `<tr><td><b>${esc(x.nama)}</b><br><small class="g-redup">${esc(x.id)}</small></td><td>${(x.kelas || []).map(esc).join(', ')}</td>
          <td>${x.punya_pin ? '<span class="g-pil hijau">✓ PIN pribadi</span>' : '<span class="g-pil">Sementara: ID guru</span>'}</td></tr>`).join('')}</tbody></table>`
        : '<p class="g-redup">Belum ada. Tekan "Tarik guru dari Data Induk".</p>';
    } catch (er) { $('#g-guru').innerHTML = kartuGalat(er); }
  }

  // ---------- Mulai ----------
  if (PIN) masuk(PIN).catch(e => { ssSet('er_pin', null); tampilPin(e.message); });
  else tampilPin();
})();
