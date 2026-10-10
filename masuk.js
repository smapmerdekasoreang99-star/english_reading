/* English Reading — masuk siswa (NISN + kode akses) dan sinkron kemajuan ke server (10 Okt 2026).
   Meniru Matematika Dasar: data siswa dari tka_siswa (project Tryout), fungsi er_* di server.
   Alur: token tersimpan → er_lanjut; bila tidak ada → layar masuk → er_masuk. Kemajuan dari server ditulis ke
   localStorage (kunci er_skor, er_paham, er_sub, er_dengar, er_dek, er_sub_cek) lalu app.js dimuat; app.js tetap
   membaca/menulis localStorage, dan setiap tulisan ke kunci itu dijadwalkan terkirim (er_simpan).
   Kemajuan lama di perangkat (sebelum ada login) dipindahkan ke akun yang pertama kali masuk di perangkat itu. */
(function () {
  'use strict';
  const SB = window.TKA_SUPABASE;
  const layar = document.getElementById('layar');
  const skrip = document.currentScript;
  const KUNCI = { er_skor: 'skor', er_paham: 'paham', er_sub: 'sub', er_dengar: 'dengar', er_dek: 'dek', er_sub_cek: 'sub_cek' };
  const baca = (k, a) => { try { const v = localStorage.getItem(k); return v === null ? a : JSON.parse(v); } catch (e) { return a; } };
  const tulis = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* abaikan */ } };
  const hapus = k => { try { localStorage.removeItem(k); } catch (e) { /* abaikan */ } };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  async function rpc(fn, args, opsi) {
    if (!SB) throw new Error('Server belum diatur (config.js belum ada).');
    let r, t;
    try {
      r = await fetch(`${SB.url}/rest/v1/rpc/${fn}`, {
        method: 'POST', keepalive: !!(opsi && opsi.keepalive),
        headers: { 'Content-Type': 'application/json', apikey: SB.key, Authorization: 'Bearer ' + SB.key },
        body: JSON.stringify(args || {})
      });
      t = await r.text();
    } catch (e) { const g = new Error('Tidak tersambung ke server. Periksa internet lalu coba lagi.'); g.jaringan = true; throw g; }
    let j = null;
    try { j = t ? JSON.parse(t) : null; } catch (e) { /* bukan JSON */ }
    if (!r.ok) {
      const g = new Error((j && (j.message || j.hint)) || t || ('Galat ' + r.status));
      if (r.status >= 502 || (r.status >= 500 && !j)) g.jaringan = true;
      throw g;
    }
    return j;
  }

  // ---------- Kemajuan: gabungan sama dengan er_gabung di server ----------
  function gabung(a, b) {
    a = a || {}; b = b || {};
    const o = x => (x && typeof x === 'object' && !Array.isArray(x) ? x : {});
    const maks = (x, y) => { const h = { ...o(x) }; Object.entries(o(y)).forEach(([k, v]) => { if (typeof v === 'number' && !(h[k] >= v)) h[k] = v; }); return h; };
    const sub = {};
    new Set([...Object.keys(o(a.sub)), ...Object.keys(o(b.sub))]).forEach(id => {
      const sa = (o(a.sub)[id] || {}).s || [], sb = (o(b.sub)[id] || {}).s || [];
      const s = Array.from({ length: Math.max(sa.length, sb.length) }, (_, i) => {
        const x = sa[i], y = sb[i];
        return typeof x === 'number' && typeof y === 'number' ? Math.max(x, y) : typeof x === 'number' ? x : typeof y === 'number' ? y : null;
      });
      sub[id] = (o(a.sub)[id] || {}).lama || (o(b.sub)[id] || {}).lama ? { s, lama: true } : { s };
    });
    return { skor: maks(a.skor, b.skor), paham: maks(a.paham, b.paham), sub, dengar: { ...o(a.dengar), ...o(b.dengar) },
      dek: { ...o(a.dek), ...o(b.dek) }, sub_cek: [...new Set([...(a.sub_cek || []), ...(b.sub_cek || [])])] };
  }
  const dataLokal = () => { const d = {}; Object.entries(KUNCI).forEach(([k, n]) => { d[n] = baca(k, n === 'sub_cek' ? [] : {}); }); return d; };
  const adaIsi = d => Object.entries(d).some(([, v]) => (Array.isArray(v) ? v.length : Object.keys(v || {}).length));
  const tulisLokal = d => Object.entries(KUNCI).forEach(([k, n]) => tulis(k, d[n] || (n === 'sub_cek' ? [] : {})));

  // ---------- Sinkron ----------
  let akun = null, jadwal = null, antre = baca('er_antre', []), sedang = false, coba = 0;
  async function kirim(keepalive) {
    if (!akun || sedang) return;
    sedang = true;
    const hasil = antre.slice(0, 50);
    try {
      const r = await rpc('er_simpan', { p_token: akun.token, p_data: dataLokal(), p_hasil: hasil }, { keepalive });
      antre = antre.slice(hasil.length); tulis('er_antre', antre);
      coba = 0;
      tandaSinkron('ok');
      if (r && r.terkunci) tampilKunci();
      else if (antre.length) setTimeout(kirim, 300);
    } catch (e) {
      if (e.jaringan) { tandaSinkron('tertunda'); coba++; clearTimeout(jadwal); jadwal = setTimeout(kirim, Math.min(60000, 5000 * coba)); }
      else if (/berakhir|masuk lagi/i.test(e.message)) { sesiHabis(); }
      else tandaSinkron('galat');
    } finally { sedang = false; }
  }
  function jadwalKirim() { clearTimeout(jadwal); tandaSinkron('menunggu'); jadwal = setTimeout(kirim, 1500); }
  function tandaSinkron(s) {
    const el = document.getElementById('er-sinkron');
    if (!el) return;
    el.dataset.s = s;
    el.textContent = { ok: '✓ Tersimpan', menunggu: 'Menyimpan…', tertunda: '⚠ Belum tersimpan (menunggu internet)', galat: '⚠ Gagal menyimpan' }[s] || '';
  }
  window.addEventListener('pagehide', () => { if (akun && (jadwal || antre.length)) { clearTimeout(jadwal); kirim(true); } });
  window.addEventListener('online', () => { if (akun) kirim(); });

  // Antarmuka untuk app.js
  window.ER_SINKRON = {
    kunci: KUNCI,
    jadwal: jadwalKirim,
    catat(h) { if (!akun || !h || !h.level) return; antre.push(h); tulis('er_antre', antre.slice(-200)); jadwalKirim(); },
    async keluar() {
      clearTimeout(jadwal);
      try { await kirim(); } catch (e) { /* abaikan */ }
      try { await rpc('er_keluar', { p_token: akun.token }); } catch (e) { /* abaikan */ }
      hapus('er_token');
      location.hash = '';
      location.reload();
    }
  };

  // ---------- Kunci (pengawasan keluar halaman di sesi kelas) ----------
  function tampilKunci() {
    if (document.getElementById('er-kunci')) return;
    const el = document.createElement('div');
    el.id = 'er-kunci';
    el.className = 'er-kunci';
    el.innerHTML = `<div class="er-kunci-kartu" role="alertdialog" aria-modal="true" aria-labelledby="er-kunci-judul">
      <span class="er-kunci-ikon" aria-hidden="true">🔒</span><h2 id="er-kunci-judul">Latihan dikunci</h2>
      <p>Kamu terlalu sering keluar dari halaman selama sesi kelas. Minta guru membuka kunci dengan kode buka.</p>
      <form id="er-kunci-form"><input id="er-kunci-kode" autocomplete="off" placeholder="Kode buka dari guru" aria-label="Kode buka">
        <button class="tombol utama">Buka</button></form><p class="er-galat" id="er-kunci-galat" role="alert"></p></div>`;
    document.body.appendChild(el);
    el.querySelector('#er-kunci-form').onsubmit = async e => {
      e.preventDefault();
      try {
        const p = await rpc('er_buka_kunci', { p_token: akun.token, p_kode_buka: el.querySelector('#er-kunci-kode').value });
        if (!p.terkunci) { el.remove(); kirim(); }
      } catch (er) { el.querySelector('#er-kunci-galat').textContent = er.message; }
    };
  }
  function sesiHabis() {
    hapus('er_token');
    akun = null;
    layar.innerHTML = '';
    tampilMasuk('Sesimu sudah berakhir. Masuk lagi untuk melanjutkan; kemajuanmu di perangkat ini tetap aman.');
  }

  // ---------- Setelah masuk ----------
  function siapkan(p, pertama) {
    const nisn = p.siswa.nisn, milik = baca('er_milik', null);
    let lokal = dataLokal(), pindah = false;
    if (milik && milik !== nisn) { lokal = {}; antre = []; tulis('er_antre', antre); }   // perangkat dipakai siswa lain
    else if (!milik && adaIsi(lokal)) pindah = true;                                     // kemajuan sebelum ada login
    const gab = gabung(p.kemajuan, milik === nisn || pindah ? lokal : {});
    tulisLokal(gab);
    tulis('er_milik', nisn);
    tulis('er_token', p.token);
    akun = p;
    window.ER_AKUN = { siswa: p.siswa, mode: p.mode, berakhir: p.berakhir, atur: p.atur || {}, pindah, pertama };
    if (pindah || antre.length || milik === nisn) kirim();
    if (p.terkunci) tampilKunci();
    pasangPengawasan();
    muatAplikasi();
  }
  // Sesi kelas: lama keluar halaman dilaporkan saat kembali; server menghitung (toleransi) dan mengunci bila melewati batas.
  let pergi = null;
  function pasangPengawasan() {
    if (window.__erAwas) return;
    window.__erAwas = true;
    document.addEventListener('visibilitychange', async () => {
      if (!akun || akun.mode !== 'kelas') { pergi = null; return; }
      if (document.hidden) { pergi = Date.now(); return; }
      if (pergi == null) return;
      const detik = Math.round((Date.now() - pergi) / 1000);
      pergi = null;
      try {
        const r = await rpc('er_lapor_keluar', { p_token: akun.token, p_detik: detik });
        if (r && r.terkunci) tampilKunci();
      } catch (e) { /* luring: abaikan */ }
    });
  }
  function muatAplikasi() {
    if (window.__erDimuat) return;
    window.__erDimuat = true;
    const s = document.createElement('script');
    s.src = skrip.dataset.app;
    document.body.appendChild(s);
  }

  // ---------- Layar masuk ----------
  function tampilMasuk(pesan) {
    const kodeUrl = (location.hash.match(/^#kode=([A-Za-z0-9]+)/) || [])[1] || '';
    if (kodeUrl) history.replaceState(null, '', location.pathname + location.search);
    layar.innerHTML = `<section class="er-masuk">
      <div class="er-masuk-kepala"><img src="assets/logo.png" alt="" width="64" height="64"><div><span class="er-alis">SMA Plus Merdeka Soreang</span><h1>📖 English Reading</h1>
        <p>Dengarkan, baca, dan latih bahasa Inggrismu. Masuk dengan NISN.</p></div></div>
      ${pesan ? `<p class="er-info">${esc(pesan)}</p>` : ''}
      <form id="er-form" class="er-form" novalidate>
        <label class="er-isian"><span>NISN</span><input id="er-nisn" inputmode="numeric" autocomplete="username" placeholder="mis. 0012345678" maxlength="20" value="${esc(baca('er_nisn_terakhir', '') || '')}"></label>
        <label class="er-isian" id="er-kode-baris"${kodeUrl ? '' : ' hidden'}><span>Kode akses <small>(dari guru, saat sesi kelas)</small></span>
          <input id="er-kode" autocomplete="off" autocapitalize="characters" placeholder="mis. 4821" maxlength="12" value="${esc(kodeUrl)}"></label>
        <p class="er-galat" id="er-galat" role="alert"></p>
        <button class="tombol utama er-tombol-masuk" id="er-tombol">Masuk</button>
        <button type="button" class="tautan" id="er-punya-kode"${kodeUrl ? ' hidden' : ''}>Punya kode akses dari guru?</button>
      </form>
      <p class="er-catatan">Di luar pelajaran kamu boleh berlatih mandiri. Saat guru membuka sesi kelas, masukkan juga kode akses yang diberikan guru.</p>
      <a class="er-guru" href="guru.html">Guru / pengawas →</a>
    </section>`;
    const f = document.getElementById('er-form'), galat = document.getElementById('er-galat'), tombol = document.getElementById('er-tombol');
    const bukaKode = () => { document.getElementById('er-kode-baris').hidden = false; document.getElementById('er-punya-kode').hidden = true; document.getElementById('er-kode').focus(); };
    document.getElementById('er-punya-kode').onclick = bukaKode;
    f.onsubmit = async e => {
      e.preventDefault();
      const nisn = document.getElementById('er-nisn').value.trim(), kode = document.getElementById('er-kode').value.trim();
      if (!nisn) { galat.textContent = 'Masukkan NISN.'; return; }
      galat.textContent = ''; tombol.disabled = true; tombol.textContent = 'Memeriksa…';
      try {
        const p = await rpc('er_masuk', { p_nisn: nisn, p_kode_akses: kode || null });
        tulis('er_nisn_terakhir', p.siswa.nisn);
        layar.innerHTML = '';
        siapkan(p, true);
      } catch (er) {
        galat.textContent = er.message;
        if (/kode akses/i.test(er.message)) bukaKode();
        tombol.disabled = false; tombol.textContent = 'Masuk';
      }
    };
    if (!kodeUrl && !document.getElementById('er-nisn').value) document.getElementById('er-nisn').focus();
  }

  // ---------- Mulai ----------
  (async function () {
    const token = baca('er_token', null);
    if (!token) { tampilMasuk(); return; }
    layar.innerHTML = '<p class="er-memuat">Memuat…</p>';
    try { siapkan(await rpc('er_lanjut', { p_token: token }), false); }
    catch (e) {
      if (e.jaringan && baca('er_milik', null)) {
        // Tanpa internet: tetap bisa berlatih dengan data di perangkat; dikirim setelah tersambung.
        akun = { token, siswa: { nisn: baca('er_milik', ''), nama: '', kelas: '' }, mode: 'mandiri', atur: {} };
        window.ER_AKUN = { siswa: akun.siswa, mode: 'mandiri', atur: {}, luring: true };
        muatAplikasi();
        setTimeout(() => tandaSinkron('tertunda'), 500);
      } else { hapus('er_token'); tampilMasuk(e.jaringan ? e.message : 'Sesimu sudah berakhir. Silakan masuk lagi.'); }
    }
  })();
})();
