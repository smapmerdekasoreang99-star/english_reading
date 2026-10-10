/* English Reading — masuk siswa (NISN + kode akses) dan sinkron kemajuan ke server (10 Okt 2026).
   Tampilan dan fasilitas meniru halaman siswa Matematika Dasar: layar sambutan + 3 langkah + kartu masuk, tautan
   "Masuk guru", jam sisa sesi kelas di bilah atas, tombol Keluar, dan pengawasan keluar halaman saat sesi kelas
   (alarm bunyi + getar, layar peringatan, klik kanan dan salin dicegah, kunci dengan kode buka).
   Alur: token tersimpan → er_lanjut; bila tidak ada → layar masuk → er_masuk. Kemajuan dari server ditulis ke
   localStorage (kunci er_skor, er_paham, er_sub, er_dengar, er_dek, er_sub_cek) lalu app.js dimuat; app.js tetap
   membaca/menulis localStorage, dan setiap tulisan ke kunci itu dijadwalkan terkirim (er_simpan).
   Kemajuan lama di perangkat (sebelum ada login) dipindahkan ke akun yang pertama kali masuk di perangkat itu.
   Uji coba guru (Tahapan Level → Coba): index.html#coba=<id level> — tanpa akun, data di sessionStorage, tidak dikirim. */
(function () {
  'use strict';
  const SB = window.TKA_SUPABASE;
  const layar = document.getElementById('layar');
  const skrip = document.currentScript;
  const $ = id => document.getElementById(id);
  const KUNCI = { er_skor: 'skor', er_paham: 'paham', er_sub: 'sub', er_dengar: 'dengar', er_dek: 'dek', er_sub_cek: 'sub_cek' };
  const baca = (k, a) => { try { const v = localStorage.getItem(k); return v === null ? a : JSON.parse(v); } catch (e) { return a; } };
  const tulis = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* abaikan */ } };
  const hapus = k => { try { localStorage.removeItem(k); } catch (e) { /* abaikan */ } };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function toast(m) { const t = $('er-toast'); if (!t) return; t.textContent = m; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2600); }

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
  // Kiriman sebagian (10 Okt 2026): hanya isian kemajuan yang belum diketahui server yang dikirim.
  // `dasar` = sidik salinan server (dari er_masuk/er_lanjut) atau kiriman terakhir yang berhasil. Server
  // menggabungkan (nilai terbaik/gabungan), jadi isian yang tidak dikirim tetap utuh di server. Bila kiriman
  // gagal, dasar tidak berubah dan isian itu ikut lagi berikutnya; muat ulang halaman = dasar dari server lagi.
  let dasar = {};
  // Urutan kunci dibakukan: jsonb di server menyusun ulang kunci objek, jadi bandingkan isinya, bukan urutannya.
  const baku = x => Array.isArray(x) ? x.map(baku)
    : x && typeof x === 'object' ? Object.keys(x).sort().reduce((o, k) => { o[k] = baku(x[k]); return o; }, {}) : x;
  const tera = x => JSON.stringify(baku(x));
  const sidik = d => {
    const o = {};
    Object.entries(d || {}).forEach(([n, v]) => {
      o[n] = Array.isArray(v) ? new Set(v.map(String))
        : Object.fromEntries(Object.entries(v && typeof v === 'object' ? v : {}).map(([k, x]) => [k, tera(x)]));
    });
    return o;
  };
  function selisih(d) {
    const h = {};
    Object.entries(d).forEach(([n, v]) => {
      const b = dasar[n];
      if (Array.isArray(v)) { const baru = v.filter(x => !(b instanceof Set && b.has(String(x)))); if (baru.length) h[n] = baru; return; }
      const o = {};
      Object.entries(v && typeof v === 'object' ? v : {}).forEach(([k, x]) => { if (!b || b instanceof Set || b[k] !== tera(x)) o[k] = x; });
      if (Object.keys(o).length) h[n] = o;
    });
    return h;
  }
  let akun = null, jadwal = null, antre = baca('er_antre', []), sedang = false, coba = 0;
  async function kirim(keepalive) {
    if (!akun || akun.coba || sedang) return;
    sedang = true;
    const hasil = antre.slice(0, 50), semua = dataLokal();
    try {
      const r = await rpc('er_simpan', { p_token: akun.token, p_data: selisih(semua), p_hasil: hasil }, { keepalive });
      dasar = sidik(semua);
      antre = antre.slice(hasil.length); tulis('er_antre', antre);
      coba = 0;
      tandaSinkron('ok');
      if (r && r.terkunci) { akun.terkunci = true; tampilKunci(); }
      else if (antre.length) setTimeout(kirim, 300);
    } catch (e) {
      if (e.jaringan) { tandaSinkron('tertunda'); coba++; clearTimeout(jadwal); jadwal = setTimeout(kirim, Math.min(60000, 5000 * coba)); }
      else if (/berakhir|masuk lagi/i.test(e.message)) { sesiHabis(); }
      else tandaSinkron('galat');
    } finally { sedang = false; }
  }
  function jadwalKirim() { if (!akun || akun.coba) return; clearTimeout(jadwal); tandaSinkron('menunggu'); jadwal = setTimeout(kirim, 1500); }
  function tandaSinkron(s) {
    const el = $('er-sinkron');
    if (!el) return;
    el.dataset.s = s;
    el.textContent = { ok: '✓ Tersimpan', menunggu: 'Menyimpan…', tertunda: '⚠ Belum tersimpan (menunggu internet)', galat: '⚠ Gagal menyimpan' }[s] || '';
  }
  window.addEventListener('pagehide', () => { if (akun && !akun.coba && (jadwal || antre.length)) { clearTimeout(jadwal); kirim(true); } });
  window.addEventListener('online', () => { if (akun) kirim(); });

  // Antarmuka untuk app.js
  async function keluar() {
    clearTimeout(jadwal);
    if (akun && akun.coba) { try { sessionStorage.clear(); } catch (e) { /* abaikan */ } window.close(); location.replace(location.pathname); return; }
    try { await kirim(); } catch (e) { /* abaikan */ }
    try { await rpc('er_keluar', { p_token: akun.token }); } catch (e) { /* abaikan */ }
    hapus('er_token');
    location.replace(location.pathname);
  }
  window.ER_SINKRON = {
    kunci: KUNCI,
    jadwal: jadwalKirim,
    catat(h) { if (!akun || akun.coba || !h || !h.level) return; antre.push(h); tulis('er_antre', antre.slice(-200)); jadwalKirim(); },
    keluar
  };

  // ---------- Bilah atas: nama, jam sisa sesi kelas, Keluar ----------
  let jamT = null;
  function pasangKepala() {
    const s = akun.siswa || {};
    $('hd-sub').textContent = akun.coba ? 'Uji coba guru · tidak masuk rekap' : [s.nama, s.kelas, akun.mode === 'kelas' ? 'Sesi kelas' : 'Latihan mandiri'].filter(Boolean).join(' · ');
    if (!akun.coba && akun.mode === 'mandiri') $('uji-pita-wadah').innerHTML = '<div class="uji-pita" role="note"><b>Latihan mandiri</b> · kemajuan di sini terpisah dari kemajuan resmi. Kemajuan resmi hanya bertambah saat sesi kelas bersama guru.</div>';
    $('btn-keluar').hidden = false;
    clearInterval(jamT);
    const jam = $('jam');
    jam.hidden = akun.mode !== 'kelas' || !akun.berakhir;
    if (jam.hidden) return;
    const detak = () => {
      const sisa = Math.max(0, Math.round((new Date(akun.berakhir) - Date.now()) / 1000));
      jam.textContent = `${Math.floor(sisa / 60)}:${String(sisa % 60).padStart(2, '0')}`;
      jam.classList.toggle('hampir', sisa <= 60);
      if (sisa <= 0) { clearInterval(jamT); kirim().finally(() => sesiHabis('Waktu sesi kelas sudah habis. Kemajuanmu tersimpan. Masuk lagi untuk berlatih mandiri.')); }
    };
    detak(); jamT = setInterval(detak, 1000);
  }
  $('btn-keluar').onclick = () => {
    diamPantau = true;
    const ya = confirm(akun && akun.coba ? 'Akhiri uji coba?' : 'Keluar sekarang? Kemajuanmu tersimpan; masuk lagi dengan NISN untuk melanjutkan.');
    diamPantau = false; pergiPada = 0;
    if (ya) keluar();
  };

  // ---------- Pengawasan keluar halaman (sesi kelas) — sama dengan Matdas & Tryout ----------
  const ALARM_DETIK = 2, PESAN_KELUAR = 'Dilarang keras, keluar halaman ini selama latihan !!!';
  let ALARM_CTX = null, ALARM_NODE = null, pergiPada = 0, diamPantau = false;
  function siapAlarm() {
    try {
      if (!ALARM_CTX) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; ALARM_CTX = new AC(); }
      if (ALARM_CTX.state === 'suspended') ALARM_CTX.resume().catch(() => {});
    } catch (e) { /* tanpa suara */ }
  }
  function bunyiAlarm() {
    if (ALARM_CTX) {
      hentiAlarm();
      try {
        const c = ALARM_CTX, o = c.createOscillator(), g = c.createGain(), t = c.currentTime;
        o.type = 'square'; g.gain.value = 0.35; o.connect(g); g.connect(c.destination);
        const n = Math.ceil(ALARM_DETIK / 0.5);
        for (let i = 0; i < n; i++) o.frequency.setValueAtTime(i % 2 ? 660 : 990, t + i * 0.5);
        o.start(t); o.stop(t + n * 0.5); ALARM_NODE = o;
        o.onended = () => { if (ALARM_NODE === o) ALARM_NODE = null; };
      } catch (e) { /* tanpa suara */ }
    }
    try { if (navigator.vibrate) navigator.vibrate([500, 250, 500, 250, 500]); } catch (e) { /* tanpa getar */ }
  }
  function hentiAlarm() { if (ALARM_NODE) { try { ALARM_NODE.stop(); } catch (e) { /* sudah berhenti */ } ALARM_NODE = null; } }
  const diawasi = () => !!(akun && !akun.coba && akun.mode === 'kelas' && akun.token);
  function pergi() { if (diamPantau || pergiPada || !diawasi()) return; pergiPada = Date.now(); bunyiAlarm(); }
  async function kembali() {
    if (!pergiPada) return;
    const d = Math.round((Date.now() - pergiPada) / 1000);
    pergiPada = 0;
    if (!diawasi()) return;
    try {
      const r = await rpc('er_lapor_keluar', { p_token: akun.token, p_detik: d });
      akun.keluar = r.keluar; akun.terkunci = r.terkunci;
      if (!r.dihitung) return tampilSekejap(d, r);
      bunyiAlarm();
      if (r.terkunci) return tampilKunci();
      tampilPeringatan(r, d);
    } catch (e) { if (/berakhir/i.test(e.message)) sesiHabis(); }
  }
  ['pointerdown', 'keydown', 'touchstart'].forEach(ev => document.addEventListener(ev, siapAlarm, { passive: true }));
  document.addEventListener('visibilitychange', () => (document.hidden ? pergi() : kembali()));
  window.addEventListener('blur', pergi);
  window.addEventListener('focus', kembali);
  window.addEventListener('pagehide', pergi);
  document.addEventListener('contextmenu', e => { if (diawasi()) e.preventDefault(); });
  document.addEventListener('copy', e => { if (diawasi()) e.preventDefault(); });

  function tirai(kunci, ikon, judul, isi, aksi) {
    let el = $('er-tirai');
    if (!el) {
      el = document.createElement('div'); el.id = 'er-tirai'; el.className = 'er-tirai'; el.setAttribute('role', 'alertdialog'); el.setAttribute('aria-modal', 'true');
      el.innerHTML = '<div class="kotak-tirai"><div class="ikon-tirai" id="t-ikon" aria-hidden="true"></div><h2 id="t-judul"></h2><p id="t-isi"></p><div id="t-aksi"></div></div>';
      document.body.appendChild(el);
    }
    el.classList.toggle('kunci', kunci); el.hidden = false;
    $('t-ikon').textContent = ikon; $('t-judul').textContent = judul; $('t-isi').innerHTML = isi; $('t-aksi').innerHTML = aksi;
  }
  const tutupTirai = () => { const el = $('er-tirai'); if (el) el.hidden = true; };
  function tombolMengerti() { $('t-ok').onclick = () => { hentiAlarm(); tutupTirai(); }; $('t-ok').focus(); }
  function tampilSekejap(d, r) {
    tirai(false, '⚠', PESAN_KELUAR, `Kamu keluar ${d} detik — kali ini <b>tidak dihitung</b>. Keluar ${r && r.toleransi ? `${r.toleransi} detik atau lebih` : 'lebih lama'} akan dicatat dan dihitung.`,
      '<button id="t-ok">Saya mengerti, lanjutkan</button>');
    tombolMengerti();
  }
  function tampilPeringatan(r, d) {
    const sisa = r.batas > 0 ? Math.max(0, r.batas - r.sejak_buka) : 0;
    tirai(false, '⚠', PESAN_KELUAR,
      `Tercatat <b>${r.keluar} kali</b>${d ? ` (terakhir ${d} detik)` : ''}` +
      (r.batas > 0 ? ` — batas <b>${r.batas}</b>${r.keluar !== r.sejak_buka ? ' sejak dibuka guru' : ''}. ` +
        (sisa <= 1 ? '<b>Sekali lagi keluar, latihan dikunci</b> dan kamu harus memanggil guru.' : 'Pada batas itu latihan akan dikunci.') : '.') +
      ' Tetap di halaman ini sampai selesai.',
      '<button id="t-ok">Saya mengerti, lanjutkan</button>');
    tombolMengerti();
  }
  function tampilKunci() {
    tirai(true, '🔒', 'Latihan dikunci',
      `<b>${PESAN_KELUAR}</b><br>Kamu meninggalkan halaman latihan${akun && akun.keluar ? ` <b>${akun.keluar} kali</b>` : ''}. ` +
      'Panggil guru untuk memasukkan <b>kode buka</b>. Waktu sesi tetap berjalan.',
      '<input type="text" id="t-kode" autocomplete="off" placeholder="Kode buka dari guru" aria-label="Kode buka">' +
      '<button id="t-buka">Buka kunci</button>' +
      '<button class="tautan-tirai" id="t-periksa">Sudah dibuka guru dari halamannya? Periksa lagi</button>');
    const buka = async (fn, args) => {
      try {
        const p = await rpc(fn, args);
        akun.terkunci = !!p.terkunci;
        if (akun.terkunci) return toast('Latihan masih dikunci.');
        hentiAlarm(); tutupTirai(); toast('Kunci dibuka — lanjutkan latihan'); kirim();
      } catch (e) { if (/berakhir/i.test(e.message)) return sesiHabis(); toast(e.message); }
    };
    $('t-buka').onclick = () => buka('er_buka_kunci', { p_token: akun.token, p_kode_buka: $('t-kode').value.trim() });
    $('t-periksa').onclick = () => buka('er_lanjut', { p_token: akun.token });
    $('t-kode').addEventListener('keydown', e => { if (e.key === 'Enter') { e.stopPropagation(); $('t-buka').click(); } });
  }
  function sesiHabis(pesan) {
    hapus('er_token');
    akun = null; clearInterval(jamT); hentiAlarm(); tutupTirai();
    location.replace(location.pathname + '#habis=' + encodeURIComponent(pesan || 'Sesimu sudah berakhir. Masuk lagi untuk melanjutkan; kemajuanmu tetap tersimpan.'));
    location.reload();
  }

  // ---------- Setelah masuk ----------
  // Kemajuan resmi (sesi kelas) dan kemajuan latihan mandiri terpisah: data di perangkat diberi tanda mode-nya
  // (er_mode_lokal), dan hanya digabung ke server bila siswa dan mode-nya sama.
  function siapkan(p, pertama) {
    const nisn = p.siswa.nisn, milik = baca('er_milik', null), modeLokal = baca('er_mode_lokal', null);
    let lokal = dataLokal(), pindah = false;
    const sama = milik === nisn && (modeLokal || 'kelas') === p.mode;
    if (milik && !sama) { lokal = {}; antre = []; tulis('er_antre', antre); }          // siswa lain, atau mode lain
    else if (!milik && adaIsi(lokal)) pindah = true;                                     // kemajuan sebelum ada login
    const gab = gabung(p.kemajuan, sama || pindah ? lokal : {});
    tulisLokal(gab);
    dasar = sidik(p.kemajuan);          // yang sudah ada di server: tidak perlu dikirim lagi
    tulis('er_milik', nisn);
    tulis('er_mode_lokal', p.mode);
    tulis('er_token', p.token);
    akun = p;
    window.ER_AKUN = { siswa: p.siswa, mode: p.mode, berakhir: p.berakhir, atur: p.atur || {}, pindah, pertama };
    if (pindah || antre.length || sama) kirim();
    pasangKepala();
    if (p.terkunci) tampilKunci();
    muatAplikasi();
  }
  function muatAplikasi() {
    if (window.__erDimuat) return;
    window.__erDimuat = true;
    const s = document.createElement('script');
    s.src = skrip.dataset.app;
    document.body.appendChild(s);
  }

  // ---------- Layar masuk (seperti Matdas) ----------
  function tampilMasuk(pesan) {
    const kodeUrl = (location.hash.match(/kode=([A-Za-z0-9]{1,16})/) || [])[1] || '';
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    $('hd-sub').textContent = 'SMA Plus Merdeka Soreang'; $('btn-keluar').hidden = true; $('jam').hidden = true;
    layar.innerHTML = `<section id="v-masuk">
      <div class="er-sambut">
        <div class="simbol" aria-hidden="true"><span style="left:8%;top:14%">A</span><span style="right:10%;top:20%">b</span><span style="left:13%;bottom:16%">?</span><span style="right:16%;bottom:28%">“ ”</span><span style="left:46%;top:6%;font-size:20px">Aa</span></div>
        <div class="sek">SMA Plus Merdeka Soreang</div>
        <h1>English Reading</h1>
        <p>Latihan membaca bahasa Inggris bertahap. Dengarkan, baca, lalu tuntaskan setiap sub level untuk naik level.</p>
      </div>
      <ol class="er-langkah" aria-label="Cara berlatih">
        <li><span class="ik">👂</span><strong>Dengarkan</strong>teks dibacakan</li>
        <li><span class="ik">🎤</span><strong>Baca</strong>dan lihat koreksinya</li>
        <li><span class="ik">▲</span><strong>Tuntaskan</strong>sub level, naik level</li>
      </ol>
      <div class="er-form-kartu">
        <form id="f-siswa" novalidate>
          <h2>Masuk untuk berlatih</h2>
          <p class="redup">Ketik NISN-mu. Saat guru membuka sesi kelas, isi juga kode akses yang ditulis guru.</p>
          <label class="isian" for="er-nisn">NISN</label>
          <input type="text" id="er-nisn" inputmode="numeric" autocomplete="off" maxlength="20">
          <div id="er-kode-baris"${kodeUrl ? '' : ' hidden'}>
            <label class="isian" for="er-kode">Kode akses</label>
            <input type="text" id="er-kode" inputmode="numeric" autocomplete="off" maxlength="16" style="text-transform:uppercase" value="${esc(kodeUrl.toUpperCase())}">
            <div class="er-qr-ok"${kodeUrl ? '' : ' hidden'}>✓ Kode akses dari QR sudah terisi. Tinggal ketik NISN-mu.</div>
          </div>
          ${pesan ? `<div class="er-pesan info" role="status">${esc(pesan)}</div>` : ''}
          <div id="er-galat" class="er-pesan" role="alert" hidden></div>
          <button class="er-tombol-masuk" id="er-tombol">Mulai latihan →</button>
          <div class="er-catatan-simpan"><span aria-hidden="true">💾</span><span>Kemajuanmu tersimpan otomatis di server, jadi bisa dilanjutkan di HP atau komputer mana pun dengan NISN yang sama.</span></div>
        </form>
        <form id="f-guru" hidden novalidate>
          <h2>Masuk ruang guru</h2>
          <p class="redup">Gunakan PIN pribadi Anda (sama dengan Asesmen Merdeka dan Matematika Dasar).</p>
          <label class="isian" for="er-pin">PIN</label>
          <input type="password" id="er-pin" autocomplete="off" placeholder="••••••">
          <div id="er-galat-guru" class="er-pesan" role="alert" hidden></div>
          <button class="er-tombol-masuk" id="er-tombol-guru">Masuk ruang guru →</button>
          <p class="er-kaki-link"><a href="#" id="lnk-siswa" style="color:var(--tinta-2)">‹ Kembali ke masuk siswa</a></p>
        </form>
      </div>
      <div class="er-kaki" id="kaki-guru"><a href="guru.html" id="lnk-guru" class="staf-link"><svg class="ik" viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><span>Masuk guru</span><svg class="pnh" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a></div>
    </section>`;
    const galat = $('er-galat'), tombol = $('er-tombol');
    const salah = (el, t) => { el.textContent = t; el.hidden = !t; };
    const bukaKode = () => { $('er-kode-baris').hidden = false; $('er-kode').focus(); };
    $('f-siswa').onsubmit = async e => {
      e.preventDefault();
      const nisn = $('er-nisn').value.trim(), kode = $('er-kode').value.trim();
      salah(galat, '');
      if (!nisn) { salah(galat, 'Isi NISN dulu.'); $('er-nisn').focus(); return; }
      tombol.disabled = true;
      try {
        const p = await rpc('er_masuk', { p_nisn: nisn, p_kode_akses: kode || null });
        layar.innerHTML = '';
        siapkan(p, true);
      } catch (er) {
        salah(galat, er.message);
        if (/kode akses/i.test(er.message)) bukaKode();
      } finally { tombol.disabled = false; }
    };
    // Masuk guru (seperti Matdas): tautan di bawah formulir menukar formulir NISN dengan formulir PIN
    const tampilGuru = guru => { $('f-siswa').hidden = guru; $('f-guru').hidden = !guru; $('kaki-guru').hidden = guru; (guru ? $('er-pin') : $('er-nisn')).focus(); };
    $('lnk-guru').onclick = e => { e.preventDefault(); tampilGuru(true); };
    $('lnk-siswa').onclick = e => { e.preventDefault(); tampilGuru(false); };
    $('f-guru').onsubmit = async e => {
      e.preventDefault();
      const pin = $('er-pin').value.trim(), g = $('er-galat-guru');
      salah(g, '');
      if (!pin) { salah(g, 'Masukkan PIN.'); return; }
      $('er-tombol-guru').disabled = true;
      try { await rpc('er_guru_masuk', { p_pin: pin }); try { sessionStorage.setItem('er_pin', JSON.stringify(pin)); } catch (x) { /* abaikan */ } location.href = 'guru.html'; }
      catch (er) { salah(g, er.message); $('er-tombol-guru').disabled = false; }
    };
    if (!kodeUrl) $('er-nisn').focus(); else $('er-nisn').focus();
  }

  // ---------- Uji coba guru ----------
  function mulaiCoba(levelId) {
    akun = { coba: true, token: null, mode: 'coba', siswa: { nama: 'Uji coba guru', kelas: '' } };
    window.ER_AKUN = { siswa: akun.siswa, mode: 'coba', atur: {}, luring: true, coba: true };
    pasangKepala();
    $('uji-pita-wadah').innerHTML = '<div class="uji-pita" role="note"><b>Uji coba guru</b> · kemajuan hanya tersimpan di tab ini dan tidak masuk rekap siswa. Tutup tab ini bila selesai.</div>';
    if (levelId) history.replaceState(null, '', location.pathname + '#baca/' + encodeURIComponent(levelId));
    muatAplikasi();
  }

  // ---------- Mulai ----------
  (async function () {
    // NISN tidak diingat (seperti Matdas): satu perangkat bisa dipakai bergantian.
    hapus('er_nisn_terakhir');
    const coba = location.hash.match(/^#coba=([^&]+)/);
    let sesiCoba = false;
    try { sesiCoba = sessionStorage.getItem('er_coba') === '1'; } catch (e) { /* abaikan */ }
    if (coba || sesiCoba) {
      try { sessionStorage.setItem('er_coba', '1'); } catch (e) { /* abaikan */ }
      mulaiCoba(coba ? decodeURIComponent(coba[1]) : null);
      return;
    }
    const habis = location.hash.match(/^#habis=(.*)$/);
    const token = baca('er_token', null);
    if (!token) { tampilMasuk(habis ? decodeURIComponent(habis[1]) : ''); return; }
    layar.innerHTML = '<p class="er-memuat">Memuat…</p>';
    try { siapkan(await rpc('er_lanjut', { p_token: token }), false); }
    catch (e) {
      if (e.jaringan && baca('er_milik', null)) {
        // Tanpa internet: tetap bisa berlatih dengan data di perangkat; dikirim setelah tersambung.
        akun = { token, siswa: { nisn: baca('er_milik', ''), nama: '', kelas: '' }, mode: 'mandiri', atur: {} };
        window.ER_AKUN = { siswa: akun.siswa, mode: 'mandiri', atur: {}, luring: true };
        pasangKepala();
        muatAplikasi();
        setTimeout(() => tandaSinkron('tertunda'), 500);
      } else { hapus('er_token'); tampilMasuk(e.jaringan ? e.message : 'Sesimu sudah berakhir. Silakan masuk lagi.'); }
    }
  })();
})();
