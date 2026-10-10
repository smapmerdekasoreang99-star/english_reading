/* English Reading — dengarkan paragraf, lalu baca sendiri dan dikoreksi per kata.
   Suara: speechSynthesis (bawaan browser). Koreksi: SpeechRecognition (Chrome),
   hasil pengenalan dicocokkan dengan teks per kata (penyelarasan lokal berulang,
   sehingga kalimat sebelumnya boleh dibaca ulang). Grafik suara
   memakai getUserMedia + AnalyserNode, terpisah dari pengenal suara. */
(function () {
  'use strict';

  const $ = (s, el) => (el || document).querySelector(s);
  const layar = $('#layar');
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const bisaSuara = 'speechSynthesis' in window;
  const ua = navigator.userAgent;
  const android = /Android/i.test(ua);
  const ios = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  // Browser di dalam aplikasi (WA, IG, FB, TikTok, WebView Android); di iOS tanpa token "Safari/".
  const dalamAplikasi = /FBAN|FBAV|FB_IAB|Instagram|WhatsApp|Line\/|MicroMessenger|TikTok|musical_ly|Snapchat|Twitter|; wv\)/i.test(ua) ||
    (ios && !/Safari\//.test(ua));
  const brave = !!navigator.brave;
  const browserSaran = ios ? 'Safari' : 'Google Chrome';
  const TUNTAS = 80;           // skor terbaik minimal agar satu level dianggap tuntas
  const LAJU = [[0.6, 'Sangat pelan'], [0.75, 'Pelan'], [0.9, 'Sedang'], [1, 'Normal']];
  const RE_KALIMAT = /[^.!?]+[.!?]+["'”’]?|[^.!?]+$/g;

  // Uji coba guru (index.html#coba=…): semua data di sessionStorage tab itu, tidak menyentuh kemajuan siswa di perangkat.
  const simpanan = () => (window.ER_AKUN && window.ER_AKUN.coba ? sessionStorage : localStorage);
  function baca(kunci, awal) {
    try { const v = simpanan().getItem(kunci); return v === null ? awal : JSON.parse(v); } catch (e) { return awal; }
  }
  function tulis(kunci, nilai) {
    try { simpanan().setItem(kunci, JSON.stringify(nilai)); } catch (e) { /* abaikan */ }
    if (window.ER_SINKRON && window.ER_SINKRON.kunci[kunci]) window.ER_SINKRON.jadwal();
  }
  // Catat hasil untuk perkembangan siswa di halaman guru (masuk.js mengirimnya ke er_hasil).
  const catatHasil = h => { if (window.ER_SINKRON) window.ER_SINKRON.catat(h); };
  const setelan = Object.assign({ suara: '', laju: 0.9, tampilArti: false, tanpaGrafik: false, syaratBaca: 75, harusBaca: true, harusDengar: true,
    tampilJawaban: true, bilaSalah: 'akhir', batasSalah: 0 },
    baca('er_setelan', {}));
  delete setelan.arti;          // pengaturan lama (terjemahan tampil); diganti tampilArti
  // Pengaturan lama "Tanpa syarat" (syaratBaca 0) menjadi Tanpa Baca.
  if (setelan.syaratBaca === 0) { setelan.harusBaca = false; setelan.syaratBaca = 75; }
  // Kecepatan suara bawaan Pelan untuk yang sedang belajar (10 Okt 2026); pilihan siswa sendiri tetap dipakai.
  if (!setelan.lajuDipilih) setelan.laju = 0.75;
  const simpanSetelan = () => tulis('er_setelan', setelan);

  // Pengaturan & Tahapan Khusus (10 Okt 2026): profil yang sedang dipakai menimpa Pengaturan Umum (setelan).
  const khusus = Object.assign({ aktif: null, daftar: [] }, baca('er_khusus', {}));
  const simpanKhusus = () => tulis('er_khusus', khusus);
  // Siswa yang masuk lewat masuk.js: aturan Umum dan tahapan khusus berasal dari server (diatur guru), bukan perangkat.
  const AKUN = window.ER_AKUN || null;
  const PILIHAN_SOAL_MANDIRI = [10, 15, 20, 25];   // harus termasuk PILIHAN_JUMLAH (jumlah soal yang didukung latihan)
  if (AKUN && AKUN.atur && !AKUN.luring) {
    const u = AKUN.atur.umum || {};
    ['jumlahSoal', 'tampilJawaban', 'bilaSalah', 'batasSalah', 'harusDengar', 'harusBaca', 'syaratBaca'].forEach(k => { if (u[k] != null) setelan[k] = u[k]; });
    // Profil aturan dari guru (rombel, lalu siswa) mengalahkan Pengaturan Umum, isian demi isian.
    const ai = (AKUN.atur.aturan && AKUN.atur.aturan.isi) || {};
    ['jumlahSoal', 'tampilJawaban', 'bilaSalah', 'batasSalah', 'harusDengar', 'harusBaca', 'syaratBaca'].forEach(k => { if (ai[k] != null) setelan[k] = ai[k]; });
    // Latihan mandiri (di luar sesi): siswa memilih sendiri jumlah soal dan tampil jawaban (disimpan di perangkat),
    // dan boleh melepas saran tahapan dari guru untuk memilih materi apa saja.
    if (AKUN.mode === 'mandiri') {
      const ps = baca('er_pilihan_mandiri', {});
      if (PILIHAN_SOAL_MANDIRI.includes(ps.jumlahSoal)) setelan.jumlahSoal = ps.jumlahSoal;
      if (typeof ps.tampilJawaban === 'boolean') setelan.tampilJawaban = ps.tampilJawaban;
    }
    const p = AKUN.atur.profil;
    khusus.daftar = p ? [{ id: p.id, nama: p.nama, catatan: p.catatan || '', setelan: p.setelan || {}, mati: p.mati || {}, asal: p.asal, saran: !!p.saran }] : [];
    khusus.aktif = p && !(p.saran && baca('er_saran_lepas', false)) ? p.id : null;
  }
  const profilAktif = () => khusus.daftar.find(p => p.id === khusus.aktif) || null;
  // atur.x = aturan yang berlaku: dari tahapan khusus yang dipakai bila diisi, selain itu Umum.
  const atur = {};
  ['jumlahSoal', 'tampilJawaban', 'bilaSalah', 'batasSalah', 'harusDengar', 'harusBaca', 'syaratBaca'].forEach(k => Object.defineProperty(atur, k, {
    get() { const p = profilAktif(); return p && p.setelan && p.setelan[k] != null ? p.setelan[k] : setelan[k]; }
  }));
  const skorTerbaik = baca('er_skor', {});   // pelafalan terbaik per level
  const skorPaham = baca('er_paham', {});     // soal pemahaman terbaik per level
  const dengarSelesai = baca('er_dengar', {}); // level yang teksnya sudah didengar sampai selesai

  function esc(s) {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }
  function norm(w) {
    return w.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9']/g, '').replace(/^'+|'+$/g, '');
  }
  // Buang tanda baca; spasi dipertahankan untuk frasa ("good morning").
  const bersihKata = w => w.replace(/[^A-Za-z0-9'’ -]/g, '').trim();

  // ---------- Suara (text to speech) ----------
  let suaraInggris = [];
  function muatSuara() {
    suaraInggris = speechSynthesis.getVoices().filter(v => /^en([-_]|$)/i.test(v.lang));
    const sel = $('#pilih-suara');
    if (sel) isiPilihSuara(sel);
  }
  if (bisaSuara) { muatSuara(); speechSynthesis.addEventListener('voiceschanged', muatSuara); }

  function suaraTerpilih() {
    return suaraInggris.find(v => v.voiceURI === setelan.suara) ||
      suaraInggris.find(v => /en[-_]US/i.test(v.lang) && /Google|Natural|Online/i.test(v.name)) ||
      suaraInggris.find(v => /en[-_]US/i.test(v.lang)) || suaraInggris[0] || null;
  }
  function isiPilihSuara(sel) {
    const kini = suaraTerpilih();
    sel.innerHTML = suaraInggris.length
      ? suaraInggris.map(v => `<option value="${esc(v.voiceURI)}"${kini && v.voiceURI === kini.voiceURI ? ' selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')
      : '<option value="">Suara bawaan</option>';
  }
  function ucapan(teks, laju) {
    const u = new SpeechSynthesisUtterance(teks);
    const v = suaraTerpilih();
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-US';
    u.rate = laju || setelan.laju;
    return u;
  }

  // ---------- Pemecahan teks ----------
  // Kata bertanda hubung ("single-use") dipecah dua agar cocok dengan hasil pengenal suara.
  function pecah(teks, arti) {
    const kata = [];
    const daftarArti = (arti.match(RE_KALIMAT) || []).map(s => s.trim()).filter(Boolean);
    // Baris kosong sebelum kalimat = awal paragraf baru.
    const mentah = (teks.match(RE_KALIMAT) || []).filter(x => x.trim());
    const kalimat = mentah.map(x => x.trim()).map((s, k) => {
      const daftar = [];
      const re = /[^\s-]+-?|-/g;
      let m;
      while ((m = re.exec(s))) {
        const w = { asli: m[0], norm: norm(m[0]), posisi: m.index, k: k, i: -1 };
        if (w.norm) { w.i = kata.length; kata.push(w); }
        daftar.push(w);
      }
      return { teks: s, kata: daftar, arti: '', paragrafBaru: k > 0 && /^\s*\n\s*\n/.test(mentah[k]) };
    });
    // Terjemahan per kalimat hanya bila jumlah kalimatnya sama; selain itu tampil utuh di bawah paragraf.
    const sejajar = daftarArti.length === kalimat.length;
    if (sejajar) kalimat.forEach((kal, k) => { kal.arti = daftarArti[k]; });
    return { kalimat, kata, sejajar };
  }

  // ---------- Pencocokan bacaan ----------
  const ANGKA = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  // Pengenal suara menuliskan bilangan sebagai angka ("1,000,000", "21st", "7:30"); diubah ke kata
  // agar cocok dengan teks yang menulis bilangan dengan huruf (10 Okt 2026, level angka dan jam).
  const PULUHAN = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  function angkaKata(n) {
    if (n <= 20) return ANGKA[n];
    if (n < 100) return PULUHAN[Math.floor(n / 10)] + (n % 10 ? ' ' + ANGKA[n % 10] : '');
    if (n < 1000) return ANGKA[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + angkaKata(n % 100) : '');
    for (const [b, nama] of [[1e9, 'billion'], [1e6, 'million'], [1e3, 'thousand']]) {
      if (n >= b) return angkaKata(Math.floor(n / b)) + ' ' + nama + (n % b ? ' ' + angkaKata(n % b) : '');
    }
    return String(n);
  }
  const ORDINAL = { one: 'first', two: 'second', three: 'third', five: 'fifth', eight: 'eighth', nine: 'ninth', twelve: 'twelfth' };
  function ordinalKata(n) {
    const k = angkaKata(n).split(' ');
    const a = k.pop();
    return [...k, ORDINAL[a] || (a.endsWith('y') ? a.slice(0, -1) + 'ieth' : a + 'th')].join(' ');
  }
  // Jam ditulis seperti di teks (gaya past/to): 7:00 seven o'clock, 6:30 half past six, 8:45 quarter to nine.
  function jamKata(h, m) {
    const j = h % 12 || 12, b = j % 12 + 1;
    if (m === 0) return `${angkaKata(j)} o'clock`;
    if (m === 15) return `quarter past ${angkaKata(j)}`;
    if (m === 30) return `half past ${angkaKata(j)}`;
    if (m === 45) return `quarter to ${angkaKata(b)}`;
    return m < 30 ? `${angkaKata(m)} minutes past ${angkaKata(j)}` : `${angkaKata(60 - m)} minutes to ${angkaKata(b)}`;
  }
  const bilanganKeKata = t => t
    .replace(/\b(\d{1,2})[:.](\d{2})\b(?!\d)/g, (x, h, m) => (+h <= 24 && +m < 60 ? jamKata(+h, +m) : x))
    .replace(/(rp\.?|\$)\s?(?=\d)/gi, '')
    .replace(/(\d)[,.](?=\d{3}(\D|$))/g, '$1')
    .replace(/\b(\d+)(st|nd|rd|th)\b/gi, (x, d) => (+d < 1e9 ? ordinalKata(+d) : x))
    // Tahun dibaca berpasangan: 1983 nineteen eighty-three, 2022 twenty twenty-two (2000–2009 tetap two thousand …).
    .replace(/\b(19\d\d|20[1-9]\d)\b/g, d => ` ${angkaKata(+d.slice(0, 2))} ${+d.slice(2) ? (+d.slice(2) < 10 ? 'oh ' : '') + angkaKata(+d.slice(2)) : 'hundred'} `)
    .replace(/\d+/g, d => (+d < 1e12 ? ' ' + angkaKata(+d) + ' ' : d));
  // segmen: [{ teks, yakin }] → [{ w, yakin }]; yakin 0 = tidak diketahui.
  function kataUcapan(segmen) {
    const hasil = [];
    for (const s of segmen) {
      for (let w of bilanganKeKata(s.teks).replace(/-/g, ' ').split(/\s+/)) {
        w = norm(w);
        if (!w) continue;
        if (/^\d+$/.test(w) && ANGKA[+w]) w = ANGKA[+w];
        hasil.push({ w, yakin: s.yakin || 0 });
      }
    }
    return hasil;
  }
  // Bentuk yang setara bagi pengenal suara (mis. "cannot" kadang ditulis "can't").
  const SETARA = { cannot: "can't" };
  const kanon = w => (SETARA[w] || w).replace(/'/g, '');
  function sama(a, b) {
    return a === b || kanon(a) === kanon(b);
  }
  // Frasa → kata-kata ternormalisasi dipisah spasi ("Good morning" → "good morning").
  const normFrasa = teks => kataUcapan([{ teks }]).map(x => x.w).join(' ');
  // Penyelarasan lokal berulang (Smith-Waterman): untuk tiap kata teks, indeks kata ucapan
  // pasangannya (-1 bila tidak ada). Putaran pertama menemukan bacaan utama; sisa ucapan lalu
  // diselaraskan lagi ke bagian mana pun, sehingga siswa boleh kembali membaca ulang kalimat
  // sebelumnya (mis. sudah di kalimat 6, lalu mengulang kalimat 2). Putaran berikutnya baru
  // diterima bila paling sedikit dua kata berurutan cocok, agar kata lepas tidak salah tempat.
  function cocokkan(target, ucap) {
    const n = target.length;
    const pasangan = new Array(n).fill(-1);
    const kt = target.map(kanon), ku = ucap.map(kanon);   // sama() tanpa regex di tiap sel
    const terpakai = new Uint8Array(ucap.length);
    for (let putaran = 0; putaran < 12; putaran++) {
      const idx = [];
      for (let j = 0; j < ucap.length; j++) if (!terpakai[j]) idx.push(j);
      const m = idx.length, lebar = m + 1;
      if (!m || !n) break;
      const H = new Int32Array((n + 1) * lebar);
      let terbaik = 0, bi = 0, bj = 0;
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
          const v = Math.max(0,
            H[(i - 1) * lebar + j - 1] + (kt[i - 1] === ku[idx[j - 1]] ? 2 : -1),
            H[(i - 1) * lebar + j] - 1,
            H[i * lebar + j - 1] - 1);
          H[i * lebar + j] = v;
          if (v > terbaik) { terbaik = v; bi = i; bj = j; }
        }
      }
      if (terbaik < (putaran ? 4 : 2)) break;
      // Bila skornya sama, kata teks yang dilewati ditaruh sedekat mungkin ke akhir agar
      // pasangan menempel ke kalimat yang sedang dibaca. Kata ucapan sisipan (tidak
      // berpasangan) tidak dipakai: bisa jadi itu bacaan ulang untuk putaran berikutnya.
      let i = bi, j = bj;
      while (i > 0 && j > 0 && H[i * lebar + j] > 0) {
        const v = H[i * lebar + j], cocok = kt[i - 1] === ku[idx[j - 1]];
        const diag = H[(i - 1) * lebar + j - 1];
        if (v === H[(i - 1) * lebar + j] - 1) i--;
        else if (v === diag + (cocok ? 2 : -1)) {
          if (cocok && pasangan[i - 1] < 0) pasangan[i - 1] = idx[j - 1];
          terpakai[idx[j - 1]] = 1;
          i--; j--;
        } else j--;
      }
    }
    return pasangan;
  }
  function kemiripan(a, b) {
    a = a.replace(/'/g, ''); b = b.replace(/'/g, '');
    if (!a || !b) return 0;
    let lalu = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      const kini = [i];
      for (let j = 1; j <= b.length; j++) {
        kini[j] = Math.min(lalu[j] + 1, kini[j - 1] + 1, lalu[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      lalu = kini;
    }
    return 1 - lalu[b.length] / Math.max(a.length, b.length);
  }
  // Perkiraan akurasi per kata (0–100), null = belum dibaca.
  // Kata yang dikenali: keyakinan pengenal suara (paling rendah 60).
  // Kata yang tidak dikenali: kemiripan dengan kata yang terdengar di celah yang sama (paling tinggi 84).
  function nilaiKata(target, ucap, pasangan) {
    const akhir = pasangan.reduce((a, j, i) => (j >= 0 ? i : a), -1);
    return target.map((t, i) => {
      if (pasangan[i] >= 0) {
        const y = ucap[pasangan[i]].yakin;
        return y > 0 ? Math.max(60, Math.round(y * 100)) : 100;
      }
      if (i > akhir) return null;
      let kiri = -1, kanan = ucap.length;
      for (let x = i - 1; x >= 0; x--) if (pasangan[x] >= 0) { kiri = pasangan[x]; break; }
      for (let x = i + 1; x < target.length; x++) if (pasangan[x] >= 0) { kanan = pasangan[x]; break; }
      let terbaik = 0;
      for (let j = kiri + 1; j < kanan; j++) terbaik = Math.max(terbaik, kemiripan(t, ucap[j].w));
      return Math.min(84, Math.round(terbaik * 100));
    });
  }

  // ---------- Keadaan halaman baca ----------
  let kini = null;            // { b, kalimat, kata, pilihK, sejajar }
  const putar = { token: 0 };
  let kataAktif = null;
  let rekam = null;           // { aktif, rec, sesiLalu, sesiIni, galat }

  function sorotKalimat(k) {
    if (!kini) return;
    kini.kalimat.forEach((x, i) => x.el.classList.toggle('dibaca', i === k));
    if (k >= 0) kini.kalimat[k].el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  function sorotKata(w) {
    if (kataAktif) kataAktif.el.classList.remove('aktif');
    kataAktif = w && w.el ? w : null;
    if (kataAktif) kataAktif.el.classList.add('aktif');
  }
  function tombolPutar(jalan) {
    const p = $('#t-putar'), h = $('#t-henti');
    if (p) p.hidden = jalan;
    if (h) h.hidden = !jalan;
  }

  function hentikanSuara() {
    putar.token++;
    if (bisaSuara) speechSynthesis.cancel();
    sorotKalimat(-1);
    sorotKata(null);
    tombolPutar(false);
  }

  function mulaiPutar(k) {
    if (!bisaSuara) return;
    hentikanSuara();
    const token = ++putar.token;
    tombolPutar(true);
    ucapKalimat(k, token);
  }
  function ucapKalimat(k, token) {
    if (token !== putar.token) return;
    if (k >= kini.kalimat.length) { hentikanSuara(); return; }
    const kal = kini.kalimat[k];
    const u = ucapan(kal.teks);
    u.onstart = () => { if (token === putar.token) sorotKalimat(k); };
    // Sorotan per kata hanya muncul bila suara mengirim batas kata (tidak semua suara).
    u.onboundary = e => {
      if (token !== putar.token || (e.name && e.name !== 'word')) return;
      let pilih = null;
      for (const w of kal.kata) if (w.i >= 0 && w.posisi <= e.charIndex) pilih = w;
      sorotKata(pilih);
    };
    u.onend = () => { if (token === putar.token) { sorotKata(null); tandaiDengar(k); ucapKalimat(k + 1, token); } };
    u.onerror = e => { if (token === putar.token && e.error !== 'interrupted' && e.error !== 'canceled') hentikanSuara(); };
    speechSynthesis.speak(u);
  }

  // Syarat Harus Dengar: tiap kalimat yang selesai dibacakan dicatat; bila semua kalimat sudah
  // terdengar (boleh dalam beberapa kali putar), level dicatat "sudah didengar" (er_dengar).
  function tandaiDengar(k) {
    if (!kini || dengarSelesai[kini.b.id]) return;
    kini.didengar.add(k);
    if (kini.didengar.size < kini.kalimat.length) return;
    const terbuka = punyaSub(kini.b) && !siapSub(kini.b);
    dengarSelesai[kini.b.id] = 1;
    catatHasil({ level: kini.b.id, jenis: 'dengar', nilai: 100 });
    tulis('er_dengar', dengarSelesai);
    const el = layar.querySelector('.sub-level');
    if (el) el.outerHTML = subHTML(kini.b);
    const pt = $('#petunjuk');
    if (pt && terbuka) pt.textContent = siapSub(kini.b) ? '🎧 Kamu sudah mendengarkan seluruh teks. Latihan bertahap sub level 1 sudah terbuka.'
      : '🎧 Kamu sudah mendengarkan seluruh teks. Sekarang baca dengan 🎤 Baca & Koreksi.';
  }

  function ucapKata(teks, w) {
    if (!bisaSuara) return;
    hentikanSuara();
    const token = putar.token;
    const u = ucapan(bersihKata(teks), Math.min(setelan.laju, 0.8));
    if (w) sorotKata(w);
    u.onend = () => { if (token === putar.token) sorotKata(null); };
    speechSynthesis.speak(u);
  }

  function pilihKalimat(k) {
    kini.pilihK = k;
    const p = $('#t-putar');
    if (p) p.textContent = k > 0 ? `▶ Dengarkan dari kalimat ${k + 1}` : '▶ Dengarkan';
  }

  // ---------- Grafik suara ----------
  let grafik = null;          // { stream, ac, an, buf, raf, level, waktu }
  const warna = {};

  function statusGrafik(teks) {
    const el = $('#status-grafik');
    if (el) el.textContent = teks;
  }

  async function mulaiGrafik() {
    const kotak = $('#kotak-grafik');
    kotak.hidden = false;
    statusGrafik('Menyiapkan mikrofon…');
    const AC = window.AudioContext || window.webkitAudioContext;
    if (setelan.tanpaGrafik || !AC || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      statusGrafik('Grafik suara tidak tersedia di perangkat ini.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      const ac = new AC();
      if (ac.state === 'suspended') ac.resume().catch(() => {});
      const an = ac.createAnalyser();
      an.fftSize = 1024;
      ac.createMediaStreamSource(stream).connect(an);
      const css = getComputedStyle(document.documentElement);
      warna.suara = css.getPropertyValue('--biru').trim();
      warna.pelan = css.getPropertyValue('--garis-2').trim();
      grafik = { stream, ac, an, buf: new Float32Array(an.fftSize), raf: 0, level: [], waktu: 0 };
      langkahGrafik();
    } catch (e) {
      statusGrafik('Grafik suara tidak bisa dinyalakan; koreksi tetap berjalan.');
    }
  }
  function langkahGrafik(t) {
    if (!grafik) return;
    grafik.raf = requestAnimationFrame(langkahGrafik);
    if (t && t - grafik.waktu < 50) return;
    grafik.waktu = t || 0;
    grafik.an.getFloatTimeDomainData(grafik.buf);
    let jumlah = 0;
    for (const v of grafik.buf) jumlah += v * v;
    const rms = Math.sqrt(jumlah / grafik.buf.length);
    grafik.level.push(Math.min(1, Math.sqrt(rms) * 2.2));
    if (grafik.level.length > 600) grafik.level.shift();
    gambarGrafik(grafik.level);
    const baru = grafik.level.slice(-30);
    const puncak = Math.max(...baru);
    statusGrafik(puncak >= 0.35 ? '🎙️ Suara tertangkap dengan baik'
      : puncak >= 0.15 ? '🔉 Suara agak pelan, bacalah lebih keras' : '… Belum ada suara');
  }
  function gambarGrafik(level) {
    const cv = $('#grafik');
    if (!cv) return;
    const dpr = window.devicePixelRatio || 1;
    const w = cv.clientWidth, h = cv.clientHeight;
    if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
    const g = cv.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, w, h);
    const lebar = 4;
    const data = level.slice(-Math.floor(w / lebar));
    data.forEach((v, i) => {
      const tinggi = Math.max(2, v * h * 0.95);
      g.fillStyle = v >= 0.15 ? warna.suara : warna.pelan;
      g.fillRect(w - (data.length - i) * lebar, (h - tinggi) / 2, lebar - 1, tinggi);
    });
  }
  // Grafik terakhir dibiarkan tampil (beku) sebagai catatan bacaan.
  function hentikanGrafik() {
    if (!grafik) return;
    cancelAnimationFrame(grafik.raf);
    grafik.stream.getTracks().forEach(t => t.stop());
    grafik.ac.close().catch(() => {});
    grafik = null;
  }

  // ---------- Koreksi bacaan ----------
  function bersihkanKoreksi() {
    if (!kini) return;
    kini.kata.forEach(w => {
      w.el.classList.remove('benar', 'sedang', 'salah', 'lewat');
      w.el.querySelector('.k-skor').textContent = '';
    });
    $('#teks').classList.remove('dinilai');
    $('#hasil').innerHTML = '';
    $('#legenda').hidden = true;
    $('#kotak-grafik').hidden = true;
  }
  const petunjukAwal = b => (punyaPola(b)
    ? 'Ketuk kata untuk mendengar. Pahami polanya dan dengarkan contoh kalimatnya, lalu kerjakan Latihan bertahap di bawah. Kalimat latihannya dirakit acak dari pola ini. Baca & Koreksi tetap bisa dipakai untuk berlatih.'
    : punyaBacaan(b)
    ? 'Ketuk kata untuk mendengar. Dengarkan dan baca teksnya sampai paham, lalu kerjakan Latihan bertahap di bawah. Baca & Koreksi tetap bisa dipakai untuk berlatih membaca seluruh teks.'
    : punyaSub(b)
    ? 'Ketuk kata untuk mendengar. Dengarkan kata dan contoh kalimatnya, lalu kerjakan Latihan bertahap di bawah. Baca & Koreksi tetap bisa dipakai untuk berlatih.'
    : b && b.kosakata
    ? 'Ketuk kata untuk mendengar. Dengarkan kata dan contoh kalimatnya, lalu tekan Baca & Koreksi dan bacakan semuanya.'
    : 'Ketuk sebuah kata untuk mendengar cara membacanya.');

  function tombolRekam(aktif) {
    const t = $('#t-rekam');
    if (t) {
      t.classList.toggle('aktif', aktif);
      t.textContent = aktif ? '⏹ Selesai membaca' : '🎤 Baca & Koreksi';
    }
    const p = $('#t-putar');
    if (p) p.disabled = aktif;
    const ptj = $('#petunjuk');
    if (ptj) {
      ptj.classList.toggle('rekam', aktif);
      ptj.textContent = aktif
        ? 'Mendengarkan… Bacalah paragraf dengan suara jelas. Kata yang dikenali berubah hijau. Tekan "Selesai membaca" bila sudah.'
        : petunjukAwal(kini && kini.b);
    }
  }

  async function mulaiRekam() {
    if (!SR) {
      $('#hasil').innerHTML = `<div class="pesan">Koreksi bacaan membutuhkan pengenal suara. Buka tautan ini di <b>${browserSaran}</b> dan pastikan tersambung ke internet.</div>`;
      return;
    }
    hentikanSuara();
    batalUlang();
    bersihkanKoreksi();
    const r = { aktif: true, rec: null, sesiLalu: [], sesiIni: [], galat: '' };
    rekam = r;
    tombolRekam(true);
    await mulaiGrafik();
    if (rekam !== r) { hentikanGrafik(); return; }
    if (!r.aktif) { selesaiRekam(); return; }
    jalankanPengenal();
  }

  // Pengenal suara berhenti sendiri saat hening; selama siswa belum menekan
  // "Selesai", dinyalakan lagi dan transkripnya disambung.
  function jalankanPengenal() {
    const r = new SR();
    r.lang = 'en-US';
    // Chrome Android mengulang hasil bila continuous; pakai sesi pendek yang disambung.
    r.continuous = !android;
    r.interimResults = true;
    r.maxAlternatives = 1;
    rekam.rec = r;
    rekam.sesiIni = [];
    r.onresult = e => {
      if (!rekam || rekam.rec !== r) return;
      const seg = [];
      for (let i = 0; i < e.results.length; i++) {
        const h = e.results[i];
        seg.push({ teks: h[0].transcript, yakin: h.isFinal ? h[0].confidence : 0 });
      }
      rekam.sesiIni = seg;
      tandaiLangsung();
    };
    r.onerror = e => {
      if (!rekam || rekam.rec !== r) return;
      if (e.error === 'no-speech' || e.error === 'aborted') return;
      // Sebagian HP tidak bisa memakai mikrofon untuk grafik dan pengenal suara sekaligus:
      // matikan grafik (dan ingat), lalu pengenal dinyalakan ulang di onend.
      if (e.error === 'audio-capture' && grafik) {
        hentikanGrafik();
        setelan.tanpaGrafik = true;
        simpanSetelan();
        statusGrafik('Grafik suara dimatikan agar mikrofon bisa dipakai pengenal suara.');
        return;
      }
      rekam.galat = e.error;
    };
    r.onend = () => {
      if (!rekam || rekam.rec !== r) return;
      rekam.sesiLalu.push(...rekam.sesiIni);
      rekam.sesiIni = [];
      if (rekam.aktif && !rekam.galat) {
        try { jalankanPengenal(); return; } catch (err) { rekam.galat = 'gagal-mulai'; }
      }
      selesaiRekam();
    };
    try { r.start(); } catch (err) { rekam.galat = 'gagal-mulai'; selesaiRekam(); }
  }

  const segmenRekam = r => r.sesiLalu.concat(r.sesiIni);

  function tandaiLangsung() {
    const pasangan = cocokkan(kini.kata.map(w => w.norm), kataUcapan(segmenRekam(rekam)).map(x => x.w));
    kini.kata.forEach((w, i) => w.el.classList.toggle('benar', pasangan[i] >= 0));
  }

  function hentikanRekam() {
    if (!rekam) return;
    rekam.aktif = false;
    if (!rekam.rec) return;   // grafik masih disiapkan; mulaiRekam yang menutup
    try { rekam.rec.stop(); } catch (e) { selesaiRekam(); }
  }
  function batalkanRekam() {
    hentikanGrafik();
    if (!rekam) return;
    const r = rekam;
    rekam = null;
    try { if (r.rec) r.rec.abort(); } catch (e) { /* abaikan */ }
    tombolRekam(false);
  }

  const PESAN_GALAT = {
    'not-allowed': 'Izin mikrofon ditolak. Izinkan mikrofon untuk halaman ini (ikon gembok di samping alamat), lalu coba lagi.',
    'service-not-allowed': ios
      ? 'Pengenal suara tidak aktif. Di iPhone: Pengaturan → Umum → Papan Ketik → nyalakan Aktifkan Dikte, lalu buka halaman ini di Safari.'
      : 'Pengenal suara tidak diizinkan di browser ini. Gunakan Google Chrome.',
    'audio-capture': 'Mikrofon tidak ditemukan. Periksa mikrofon atau headset.',
    'network': 'Pengenal suara membutuhkan internet. Periksa sambungan (atau matikan VPN), lalu coba lagi.',
    'language-not-supported': 'Bahasa Inggris tidak didukung pengenal suara di perangkat ini.',
    'gagal-mulai': 'Pengenal suara gagal dinyalakan. Muat ulang halaman, lalu coba lagi.'
  };

  // Syarat tuntas: kosakata & pola = pelafalan; bacaan Tahap 1–2 = pelafalan + pemahaman;
  // bacaan Tahap 3–4 = pemahaman saja (fokus TKA), pelafalan menjadi latihan tambahan.
  // Kosakata dengan latihan bertahap = kelima sub level lulus (Baca & Koreksi jadi latihan).
  const soalDari = b => (window.SOAL && window.SOAL[b.id]) || null;
  function syaratLevel(b) {
    if (punyaSub(b)) return { ucap: false, paham: false, sub: true };
    const paham = !!soalDari(b);
    return { ucap: !paham || b.tahap <= 2, paham };
  }
  function tuntas(b) {
    const s = syaratLevel(b);
    if (s.sub) return jumlahLulusSub(b) === subDipakai(b).length;
    return (!s.ucap || skorTerbaik[b.id] >= TUNTAS) && (!s.paham || skorPaham[b.id] >= TUNTAS);
  }

  // Status level: tombol lanjut bila tuntas, atau syarat yang belum terpenuhi.
  function statusLevelHTML(b) {
    b = b || kini.b;
    const p = posisiLevel(b);
    if (tuntas(b)) {
      if (!p.sesudah) return '<p class="lanjut">🏆 Kamu sudah sampai level terakhir. Hebat!</p>';
      const naik = p.sesudah.tahap !== b.tahap;
      return `<p class="lanjut">${naik ? `🎉 Tahap ${b.tahap} selesai! ` : ''}Level ini tuntas.</p>
        <a class="tombol utama" href="#baca/${encodeURIComponent(p.sesudah.id)}">Lanjut: ${labelLevel(p.sesudah)} →</a>`;
    }
    const s = syaratLevel(b);
    const kurang = [];
    if (s.sub && !sudahDengar(b)) kurang.push('🎧 dengarkan teksnya dengan ▶ Dengarkan sampai selesai');
    if (s.sub && !sudahBaca(b)) kurang.push(`🎤 baca teksnya dengan Baca & Koreksi sampai selesai, akurasi ≥ ${syaratBaca()}%`);
    if (s.sub) kurang.push(`🧩 lulus ${subDipakai(b).length} sub level Latihan bertahap (sudah ${jumlahLulusSub(b)})`);
    if (s.ucap && !(skorTerbaik[b.id] >= TUNTAS)) {
      kurang.push(`🎤 pelafalan ≥ ${TUNTAS}%${skorTerbaik[b.id] != null ? ` (terbaikmu ${skorTerbaik[b.id]}%)` : ''}`);
    }
    if (s.paham && !(skorPaham[b.id] >= TUNTAS)) {
      kurang.push(`📝 soal pemahaman ≥ ${TUNTAS}%${skorPaham[b.id] != null ? ` (terbaikmu ${skorPaham[b.id]}%)` : ''}`);
    }
    return `<p class="lanjut">Untuk menuntaskan level ini: ${kurang.join(' dan ')}.</p>`;
  }

  // ---------- Soal pemahaman ----------
  // Urutan pilihan diacak tiap kali ditampilkan agar posisi jawaban tidak bisa ditebak.
  function acak(n) {
    const a = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function soalHTML(b) {
    const daftar = soalDari(b);
    // Bagian lama ini hanya untuk pilihan ganda biasa; bentuk TKA/SNBT lain hanya di Latihan bertahap.
    if (!daftar || daftar.some(q => q.bs || Array.isArray(q.j))) return '';
    kini.urutan = daftar.map(q => acak(q.p.length));
    const s = syaratLevel(b);
    return `<section class="paham" id="paham">
      <h2>📝 Soal pemahaman</h2>
      <p class="petunjuk">Jawab berdasarkan bacaan di atas.${s.ucap ? '' : ' Di tahap ini yang dinilai untuk naik level adalah pemahaman; membaca keras tetap bagus untuk latihan.'}
        ${skorPaham[b.id] != null ? ` Skor terbaikmu: <b>${skorPaham[b.id]}%</b>.` : ''}</p>
      <ol class="soal-daftar">${daftar.map((q, i) => `<li class="soal" data-i="${i}">
        <p class="soal-teks">${esc(q.t)}</p>
        <div class="pilihan">${kini.urutan[i].map((asli, posisi) => `<label class="opsi">
          <input type="radio" name="s${i}" value="${asli}"><span class="opsi-huruf">${'ABCDE'[posisi]}</span><span>${esc(q.p[asli])}</span></label>`).join('')}</div>
        <div class="bahas" hidden></div></li>`).join('')}</ol>
      <div class="paham-aksi"><button class="tombol utama" id="t-periksa">Periksa jawaban</button></div>
      <div id="hasil-paham"></div>
    </section>`;
  }
  function pasangSoal() {
    const t = $('#t-periksa');
    if (t) t.onclick = periksaSoal;
  }
  function periksaSoal() {
    const b = kini.b;
    const daftar = soalDari(b);
    const el = $('#paham');
    const jawab = daftar.map((q, i) => {
      const r = el.querySelector(`input[name="s${i}"]:checked`);
      return r ? +r.value : -1;
    });
    const kosong = jawab.filter(j => j < 0).length;
    if (kosong) {
      $('#hasil-paham').innerHTML = `<p class="pesan">Masih ada ${kosong} soal yang belum dijawab.</p>`;
      return;
    }
    let benar = 0;
    daftar.forEach((q, i) => {
      const li = el.querySelector(`.soal[data-i="${i}"]`);
      const ok = jawab[i] === q.j;
      if (ok) benar++;
      li.classList.add(ok ? 'soal-benar' : 'soal-salah');
      li.querySelectorAll('.opsi').forEach(o => {
        const input = o.querySelector('input');
        const v = +input.value;
        o.classList.toggle('opsi-kunci', v === q.j);
        o.classList.toggle('opsi-keliru', v === jawab[i] && !ok);
        input.disabled = true;
      });
      const hurufKunci = 'ABCDE'[kini.urutan[i].indexOf(q.j)];
      const bh = li.querySelector('.bahas');
      bh.hidden = false;
      bh.innerHTML = `<b>${ok ? '✓ Benar.' : `✗ Kurang tepat. Jawaban: ${hurufKunci}.`}</b> ${esc(q.b)}`;
    });
    const persen = Math.round(benar * 100 / daftar.length);
    catatHasil({ level: b.id, jenis: 'paham', nilai: persen, rincian: { benar, soal: daftar.length } });
    let rekor = false;
    if (skorPaham[b.id] == null || persen > skorPaham[b.id]) {
      skorPaham[b.id] = persen;
      tulis('er_paham', skorPaham);
      rekor = true;
    }
    const kelas = persen >= 85 ? 'baik' : persen >= 60 ? 'sedang' : 'kurang';
    $('#t-periksa').hidden = true;
    $('#hasil-paham').innerHTML = `<div class="hasil">
      <h2>Hasil pemahaman</h2>
      <div class="skor ${kelas}"><b>${persen}%</b><span>${benar} dari ${daftar.length} soal benar${rekor ? ' · 🏅 skor terbaik baru' : ''}</span></div>
      ${statusLevelHTML()}
      <button class="tombol" id="t-ulang-soal">↻ Ulangi soal</button>
    </div>`;
    $('#t-ulang-soal').onclick = () => {
      el.outerHTML = soalHTML(b);
      pasangSoal();
      $('#paham').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  }

  const kelasNilai = n => (n >= 85 ? 'benar' : n >= 60 ? 'sedang' : 'salah');

  // ---------- Latihan ulang per kata ----------
  // Penilaian satu kata dari beberapa alternatif pengenal suara: cocok di alternatif
  // pertama = keyakinan pengenal (paling rendah 60); cocok di alternatif lain = 70
  // (pengenal lebih condong ke kata lain); tidak cocok = kemiripan (paling tinggi 84).
  // Target boleh frasa ("good morning"): harus muncul berurutan di ucapan.
  function nilaiSatuKata(target, alternatif) {
    const t = target.split(' ').filter(Boolean);
    const gabung = t.join('');
    let terbaik = 0;
    for (let a = 0; a < alternatif.length; a++) {
      const kata = kataUcapan([alternatif[a]]).map(x => x.w);
      let cocok = false;
      for (let j = 0; j + t.length <= kata.length && !cocok; j++) cocok = t.every((x, k) => sama(x, kata[j + k]));
      if (cocok) {
        const y = alternatif[a].yakin;
        return a === 0 ? (y > 0 ? Math.max(60, Math.round(y * 100)) : 100) : 70;
      }
      // Kemiripan dengan rangkaian kata yang panjangnya mendekati target.
      for (let j = 0; j < kata.length; j++) {
        for (let L = Math.max(1, t.length - 1); L <= t.length + 1 && j + L <= kata.length; L++) {
          terbaik = Math.max(terbaik, kemiripan(gabung, kata.slice(j, j + L).join('')));
        }
      }
    }
    return Math.min(84, Math.round(terbaik * 100));
  }

  // ---------- Ulang kosakata (pengulangan terjadwal, sistem kotak) ----------
  // Kata baru masuk kotak 1. Diucapkan baik (≥ 85%) saat jatuh tempo → naik kotak,
  // jeda sampai diulang lagi makin panjang. Belum tepat → kembali ke kotak 1, diulang besok.
  const JEDA = [0, 1, 2, 4, 7, 14];           // hari, per kotak 1–5
  const dek = baca('er_dek', {});              // normFrasa → { kata, contoh, kotak, tempo }
  const simpanDek = () => tulis('er_dek', dek);
  function tanggal(tambahHari) {
    const d = new Date();
    d.setDate(d.getDate() + tambahHari);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  // gagal = kata yang baru saja keliru: bila sudah ada di dek, dikembalikan ke kotak 1.
  function tambahDek(kata, contoh, gagal) {
    const n = normFrasa(kata);
    if (!n) return;
    const ada = dek[n];
    if (ada && !gagal) return;
    dek[n] = { kata: kata.trim(), contoh: (ada && ada.contoh) || contoh || '', kotak: 1, tempo: tanggal(1) };
  }
  const jatuhTempo = () => Object.entries(dek).filter(([, e]) => e.tempo <= tanggal(0)).sort((a, b) => a[1].kotak - b[1].kotak);
  function perbaruiDek(n, nilai) {
    const e = dek[n];
    if (!e) return '';
    if (e.tempo > tanggal(0)) return `Sudah dinilai · diulang lagi ${e.tempo}`;
    if (nilai >= 85) {
      e.kotak = Math.min(5, e.kotak + 1);
      e.tempo = tanggal(JEDA[e.kotak]);
      simpanDek();
      return `Naik ke kotak ${e.kotak} · diulang ${JEDA[e.kotak]} hari lagi`;
    }
    e.kotak = 1;
    e.tempo = tanggal(1);
    simpanDek();
    return 'Kembali ke kotak 1 · diulang besok';
  }

  // Satu baris latihan kata: dengar contoh, ucapkan, dinilai ulang.
  function barisLatih(o) {
    return `<div class="latih-baris" data-norm="${esc(o.norm)}"${o.dek ? ' data-dek="1"' : ''}>
      <span class="latih-kata">${esc(o.kata)}</span>
      <span class="latih-awal ${o.kelas || ''}">${esc(o.label)}</span>
      <button class="tombol kecil" data-ucap="${esc(o.kata)}" aria-label="Dengarkan contoh">🔊</button>
      <button class="tombol kecil rekam" data-ulang>🎤 Ucapkan</button>
      ${o.contoh ? `<span class="latih-contoh">${esc(o.contoh)}</span>` : ''}
      <span class="latih-baru"></span>
    </div>`;
  }
  function klikLatih(e) {
    const c = e.target.closest('[data-ucap]');
    if (c) { batalUlang(); ucapKata(c.dataset.ucap); return; }
    const u = e.target.closest('[data-ulang]');
    if (u) ulangKata(u.closest('.latih-baris'));
  }

  let ulang = null;           // { rec, baris, batas }
  function aturTombolUlang(baris, aktif) {
    const t = baris.querySelector('[data-ulang]');
    t.classList.toggle('aktif', aktif);
    t.textContent = aktif ? '● Ucapkan sekarang…' : '🎤 Ucapkan lagi';
  }
  function batalUlang() {
    if (!ulang) return;
    const u = ulang;
    ulang = null;
    clearTimeout(u.batas);
    try { u.rec.abort(); } catch (e) { /* abaikan */ }
    if (u.baris.isConnected) aturTombolUlang(u.baris, false);
  }

  function ulangKata(baris) {
    if (!SR || rekam) return;
    const sebelumnya = ulang && ulang.baris;
    batalUlang();
    if (sebelumnya === baris) return;   // tekan lagi = batal
    hentikanSuara();
    const target = baris.dataset.norm;
    const keluaran = baris.querySelector('.latih-baru');
    const r = new SR();
    r.lang = 'en-US';
    r.continuous = false;
    r.interimResults = false;
    r.maxAlternatives = 5;
    const u = { rec: r, baris, batas: 0 };
    ulang = u;
    aturTombolUlang(baris, true);
    keluaran.textContent = '';
    let alternatif = null, galat = '';
    r.onresult = e => {
      const h = e.results[e.results.length - 1];
      alternatif = Array.from(h, a => ({ teks: a.transcript, yakin: a.confidence }));
    };
    r.onerror = e => { galat = e.error; };
    r.onend = () => {
      if (ulang !== u) return;
      ulang = null;
      clearTimeout(u.batas);
      aturTombolUlang(baris, false);
      if (!alternatif || !alternatif.length) {
        keluaran.innerHTML = `<small class="latih-pesan">${esc(PESAN_GALAT[galat] || 'Tidak terdengar. Tekan 🎤 lalu ucapkan katanya dengan jelas.')}</small>`;
        return;
      }
      const n = nilaiSatuKata(target, alternatif);
      const terbaik = Math.max(n, +(baris.dataset.terbaik || 0));
      baris.dataset.terbaik = terbaik;
      baris.classList.toggle('lulus', terbaik >= 85);
      const infoDek = baris.dataset.dek ? perbaruiDek(target, n) : '';
      keluaran.innerHTML = `<b class="latih-nilai ${kelasNilai(n)}">${n}%</b>${n >= 85 ? ' ✓ Bagus!' : ''}
        <small>terdengar: “${esc(alternatif[0].teks.trim())}”${terbaik > n ? ` · terbaik ${terbaik}%` : ''}</small>
        ${infoDek ? `<small class="latih-dek">${esc(infoDek)}</small>` : ''}`;
    };
    // Pengaman: hentikan bila tidak ada suara dalam beberapa detik.
    u.batas = setTimeout(() => { try { r.stop(); } catch (e) { /* abaikan */ } }, 6000);
    try { r.start(); } catch (e) { batalUlang(); }
  }

  function selesaiRekam() {
    if (!rekam) return;
    const r = rekam;
    rekam = null;
    hentikanGrafik();
    statusGrafik('Rekaman suara bacaanmu');
    tombolRekam(false);
    const hasilEl = $('#hasil');
    const segmen = segmenRekam(r);
    const teksUcap = segmen.map(s => s.teks).join(' ').replace(/\s+/g, ' ').trim();
    const ucap = kataUcapan(segmen);
    if (!ucap.length) {
      kini.kata.forEach(w => w.el.classList.remove('benar'));
      hasilEl.innerHTML = `<div class="pesan">${esc(PESAN_GALAT[r.galat] || (r.galat ? 'Pengenal suara berhenti (' + r.galat + '). Coba lagi.' : 'Tidak ada suara yang terdengar. Dekatkan mikrofon dan bacalah lebih keras.'))}</div>`;
      return;
    }

    const target = kini.kata.map(w => w.norm);
    const pasangan = cocokkan(target, ucap.map(x => x.w));
    const nilai = nilaiKata(target, ucap, pasangan);
    let tepat = 0, dibaca = 0, jumlah = 0;
    const latih = [];
    kini.kata.forEach((w, i) => {
      const n = nilai[i];
      w.el.classList.remove('benar', 'sedang', 'salah', 'lewat');
      w.el.classList.add(n == null ? 'lewat' : kelasNilai(n));
      w.el.querySelector('.k-skor').textContent = n == null ? '' : n + '%';
      if (n == null) return;
      dibaca++;
      jumlah += n;
      if (pasangan[i] >= 0) tepat++;
      if (n < 85 && !latih.some(x => x.w.norm === w.norm)) latih.push({ w, n });
    });
    latih.sort((a, b) => a.n - b.n);
    latih.splice(10);   // cukup 10 kata terlemah agar latihan tidak terlalu panjang
    $('#teks').classList.add('dinilai');

    const total = kini.kata.length;
    const sisa = total - dibaca;
    const persen = dibaca ? Math.round(jumlah / dibaca) : 0;
    // Skor terbaik hanya dicatat bila paragraf dibaca (hampir) sampai akhir.
    const lengkap = sisa <= Math.max(2, Math.round(total * 0.05));
    let rekor = false;
    const bacaSebelum = sudahBaca(kini.b);
    if (lengkap) catatHasil({ level: kini.b.id, jenis: 'baca', nilai: persen, rincian: { tepat, dibaca } });
    if (lengkap && (skorTerbaik[kini.b.id] == null || persen > skorTerbaik[kini.b.id])) {
      skorTerbaik[kini.b.id] = persen;
      tulis('er_skor', skorTerbaik);
      rekor = true;
    }
    // Masukkan ke kotak ulang: semua kosakata level ini (bila dibaca utuh) dan kata yang
    // masih keliru (< 60%, selain kata sangat pendek seperti "of", "a").
    if (lengkap && kini.b.kosakata) kini.b.kosakata.forEach(([k, , c]) => tambahDek(k, c, false));
    latih.filter(x => x.n < 60 && x.w.norm.length > 2)
      .forEach(x => tambahDek(bersihKata(x.w.asli), kini.kalimat[x.w.k].teks, true));
    simpanDek();
    const kelas = persen >= 85 ? 'baik' : persen >= 60 ? 'sedang' : 'kurang';
    const pujian = persen >= 95 ? 'Excellent! 🎉' : persen >= 85 ? 'Great job! 👍' : persen >= 60 ? 'Good, keep practicing!' : 'Keep trying, you can do it!';

    const baruTerbuka = punyaSub(kini.b) && !bacaSebelum && sudahBaca(kini.b);
    const elSub = layar.querySelector('.sub-level');
    if (elSub) elSub.outerHTML = subHTML(kini.b);
    const pesanSyarat = !punyaSub(kini.b) || bacaSebelum ? ''
      : !baruTerbuka ? `<p class="lanjut">Latihan bertahap terbuka setelah kamu membaca sampai selesai dengan akurasi minimal ${syaratBaca()}%.${lengkap ? ' Dengarkan contohnya, latih kata yang masih merah, lalu coba lagi.' : ''}</p>`
      : sudahDengar(kini.b) ? `<p class="lanjut">🔓 Latihan bertahap sudah terbuka. <a href="#latih/${encodeURIComponent(kini.b.id)}/1">Mulai sub level 1 →</a></p>`
      : '<p class="lanjut">✓ Syarat membaca terpenuhi. Tinggal 🎧 dengarkan teksnya dengan ▶ Dengarkan sampai selesai, lalu sub level 1 terbuka.</p>';

    $('#legenda').hidden = false;
    hasilEl.innerHTML = `<div class="hasil">
      <h2>Akurasi pelafalan</h2>
      <div class="skor ${kelas}"><b>${persen}%</b><span>${pujian}</span></div>
      <p>${tepat} dari ${dibaca} kata yang kamu baca dikenali dengan tepat.${sisa > 0 ? ` <b>${sisa} kata di akhir belum dibaca.</b>` : ''}${rekor ? ' 🏅 Skor terbaik baru!' : ''}</p>
      ${latih.length ? `<p>Latih kata berikut: tekan 🔊 untuk mendengar contoh, lalu 🎤 untuk mengucapkannya dan dinilai ulang.</p>
        <div class="latih-daftar">${latih.map(x => barisLatih({
          norm: x.w.norm, kata: bersihKata(x.w.asli), label: x.n + '%', kelas: kelasNilai(x.n)
        })).join('')}</div>`
        : (dibaca ? '<p>Semua kata yang kamu baca terdengar tepat. 👏</p>' : '')}
      ${pesanSyarat}
      ${lengkap ? (baruTerbuka ? '' : statusLevelHTML()) : '<p class="lanjut">Baca sampai akhir agar skormu tercatat.</p>'}
      <details><summary>Yang terdengar oleh aplikasi</summary><p>${esc(teksUcap)}</p></details>
      <p class="catatan">Angka di bawah tiap kata adalah perkiraan dari pengenal suara otomatis: kata yang dikenali memakai
        tingkat keyakinan pengenal, kata yang tidak dikenali memakai kemiripan dengan kata yang terdengar. Belum menilai tekanan
        dan intonasi. Dengarkan contohnya lalu coba lagi.</p>
    </div>`;
  }

  // ---------- Latihan bertahap (sub level kosakata) ----------
  // Aktif di level kosakata yang punya data situasi (semua 17 kelompok Tahap 0), level pola
  // kalimat yang punya perakit di pola.js (lihat "Soal pola kalimat"), dan bacaan yang punya
  // KATA_BACAAN di soal.js (lihat "Soal bacaan"). Soal dibuat
  // acak dari kata, arti, contoh kalimat (+ contohLain) dan situasi: arah soal, pengecoh,
  // kalimat, dan urutan selalu berganti. Tiap sesi 10 soal (satu per kata; sub level
  // Situasi 10 situasi acak). Jawaban salah diulang di akhir sesi dengan soal baru untuk
  // kata yang sama. Lulus = ≥ 80% benar pada percobaan pertama; sub level berikutnya baru
  // terbuka sesudahnya, dan level tuntas bila kelima sub level lulus.
  const SUB = [
    { nama: 'Kenali', ikon: '👀', ket: 'Kata ↔ arti' },
    { nama: 'Dengar', ikon: '👂', ket: 'Pilih yang kamu dengar' },
    { nama: 'Situasi', ikon: '💬', ket: 'Kata yang tepat untuk situasinya' },
    { nama: 'Lengkapi & susun', ikon: '🧩', ket: 'Kalimat rumpang, susun kata' },
    { nama: 'Ucapkan', ikon: '🎤', ket: 'Ingat dan ucapkan sendiri' }
  ];
  // Level Pola kalimat: kalimat dirakit pola.js (POLA_GEN), dengan lima bentuk latihan sendiri.
  const SUB_POLA = [
    { nama: 'Pilih bentuk', ikon: '☝️', ket: 'Bentuk yang tepat untuk kalimatnya' },
    { nama: 'Benar atau salah', ikon: '⚖️', ket: 'Periksa kalimatnya' },
    { nama: 'Lengkapi', ikon: '✏️', ket: 'Ketik bentuk yang tepat' },
    { nama: 'Susun kalimat', ikon: '🧩', ket: 'Urutkan kata-katanya' },
    { nama: 'Terjemahkan & ucapkan', ikon: '🎤', ket: 'Dari bahasa Indonesia ke bahasa Inggris' }
  ];
  // Level Bacaan: teks tetap; soal dari kata penting (KATA_BACAAN), kalimat teks dan
  // terjemahannya, serta bank soal (SOAL + SOAL_BS di soal.js).
  const SUB_BACAAN = [
    { nama: 'Kosakata bacaan', ikon: '📚', ket: 'Kata penting dari teks' },
    { nama: 'Dengar & pahami', ikon: '👂', ket: 'Kalimat dibacakan, pilih artinya' },
    { nama: 'Urutkan', ikon: '🔢', ket: 'Susun kalimat sesuai urutan teks' },
    { nama: 'Pemahaman', ikon: '📝', ket: 'Pilihan ganda dan benar/salah' }
  ];
  // Sub level 5: Tahap 1–2 membaca kalimat keras-keras (perlu pengenal suara); Tahap 3–4 atau
  // browser tanpa pengenal suara melengkapi kalimat rumpang dari teks.
  const bacaSuara = b => b.tahap <= 2 && !!SR;
  const SUB5_BACA = { nama: 'Baca kalimat', ikon: '🎤', ket: 'Baca kalimat dari teks, dinilai per kata' };
  const SUB5_RUMPANG = { nama: 'Rumpang teks', ikon: '✏️', ket: 'Lengkapi kalimat dari teks' };
  const punyaPola = b => !!(b && b.pola && window.POLA_GEN && window.POLA_GEN[b.id]);
  const punyaBacaan = b => !!(b && !b.kosakata && !b.pola && window.KATA_BACAAN && window.KATA_BACAAN[b.id] && soalDari(b));
  const punyaSub = b => !!(b && ((b.kosakata && b.situasi) || punyaPola(b) || punyaBacaan(b)));
  // Bacaan Tahap 2–5 (Teks Fungsional Pendek, Genre Teks, TKA, UTBK/SNBT): lima sub level tambahan menurut
  // kisi-kisi ujian (10 Okt 2026). Tahap 2–3 (teks satu paragraf): sub level 6 = struktur teks, bukan ide pokok paragraf.
  const punyaUjian = b => !b.kosakata && !b.pola && b.tahap >= 2;
  const SUB_UJIAN = [
    { nama: 'Ide pokok & organisasi', ikon: '💡', ket: 'Ide pokok paragraf, judul, susunan teks' },
    { nama: 'Rincian & rujukan', ikon: '🔎', ket: 'Informasi tersurat dan kata rujukan' },
    { nama: 'Makna kata', ikon: '📖', ket: 'Arti kata sesuai konteks (sinonim)' },
    { nama: 'Inferensi & sikap penulis', ikon: '🧠', ket: 'Kesimpulan, tujuan, sikap, menilai argumen' }
  ];
  const SUB6_STRUKTUR = { nama: 'Ide pokok & struktur teks', ikon: '💡', ket: 'Topik, tujuan, jenis teks, dan bagian-bagiannya' };
  const subSimulasi = b => (b.tahap >= 5 ? { nama: 'Simulasi UTBK/SNBT', ikon: '⏱️', ket: 'Campuran semua jenis soal ujian' }
    : b.tahap === 4 ? { nama: 'Simulasi TKA', ikon: '⏱️', ket: 'Campuran semua jenis soal ujian' }
    : { nama: 'Uji siap naik tahap', ikon: '🚀', ket: `Campuran semua jenis soal, bekal ke Tahap ${b.tahap + 1}` });
  const daftarSub = b => (b.pola ? SUB_POLA : b.kosakata ? SUB
    : [...SUB_BACAAN, bacaSuara(b) ? SUB5_BACA : SUB5_RUMPANG,
      ...(punyaUjian(b) ? [b.tahap <= 3 ? SUB6_STRUKTUR : SUB_UJIAN[0], ...SUB_UJIAN.slice(1), subSimulasi(b)] : [])]);
  const skorSub = baca('er_sub', {});          // id → { s: [skor terbaik sub 1–5], lama }
  const simpanSub = () => tulis('er_sub', skorSub);
  const dataSub = b => skorSub[b.id] || (skorSub[b.id] = { s: [] });
  const lulusSub = (b, n) => { const d = skorSub[b.id]; return !!d && (!!d.lama || d.s[n - 1] >= TUNTAS); };
  const jumlahLulusSub = b => subDipakai(b).filter(n => lulusSub(b, n)).length;
  // Sebelum sub level 1 (diatur di Pengaturan halaman utama, tersimpan per perangkat):
  // - Harus Dengar (10 Okt 2026): seluruh teks level didengarkan dengan ▶ Dengarkan sampai selesai.
  // - Harus Baca (9 Okt 2026): teks dibaca dengan Baca & Koreksi sampai selesai, akurasi ≥ syaratBaca()
  //   (bawaan 75%).
  // Dikecualikan: browser tanpa suara/pengenal suara (tidak bisa dicatat/dinilai), level yang tuntas
  // sebelumnya, dan siswa yang sudah mulai mengerjakan sub level sebelum aturan ini.
  const PILIHAN_SYARAT_BACA = [50, 60, 70, 75, 80, 85, 90];
  const syaratBaca = () => (PILIHAN_SYARAT_BACA.includes(atur.syaratBaca) ? atur.syaratBaca : 75);
  const sudahMulaiSub = b => !!(skorSub[b.id] && (skorSub[b.id].lama || skorSub[b.id].s.some(x => x != null)));
  const sudahBaca = b => !SR || !atur.harusBaca || skorTerbaik[b.id] >= syaratBaca() || sudahMulaiSub(b);
  const sudahDengar = b => !bisaSuara || !atur.harusDengar || !!dengarSelesai[b.id] || sudahMulaiSub(b);
  const siapSub = b => sudahDengar(b) && sudahBaca(b);
  // Tahapan khusus: m = { tahap: [nomor dimatikan], level: [id dimatikan], sub: { id: [nomor dimatikan] } }; null = Umum.
  // Tahap mati → levelnya mati; level mati → sub levelnya mati; level tanpa sub level yang dipakai dianggap tidak dipakai.
  const tahapOn = (m, t) => !m || !(m.tahap || []).includes(t);
  const levelOnDasar = (m, b) => tahapOn(m, b.tahap) && !(m && (m.level || []).includes(b.id));
  const subOn = (m, b, n) => levelOnDasar(m, b) && !(m && ((m.sub || {})[b.id] || []).includes(n));
  const subDipakaiM = (m, b) => daftarSub(b).map((_, i) => i + 1).filter(n => subOn(m, b, n));
  const levelOn = (m, b) => levelOnDasar(m, b) && (!punyaSub(b) || subDipakaiM(m, b).length > 0);
  // Tanpa tahapan khusus: tahapan umum, tanpa tahap/level/sub level yang ditutup admin (Tahapan Level di halaman guru).
  // Latihan mandiri: semua materi boleh dipilih siswa, jadi tahap/level yang ditutup admin untuk tahapan umum tidak berlaku.
  const matiUmum = (AKUN && !AKUN.luring && AKUN.mode !== 'mandiri' && AKUN.atur && AKUN.atur.umum && AKUN.atur.umum.mati) || null;
  const matiAktif = () => { const p = profilAktif(); return p ? p.mati : matiUmum; };
  const levelAktif = b => levelOn(matiAktif(), b);
  const subDipakai = b => subDipakaiM(matiAktif(), b);
  // Sub level terbuka bila sub level dipakai sebelumnya lulus; yang pertama setelah syarat dengar/baca.
  const terbukaSub = (b, n) => { const d = subDipakai(b), i = d.indexOf(n); return i === 0 ? siapSub(b) : i > 0 && lulusSub(b, d[i - 1]); };
  // Level yang sudah tuntas lewat Baca & Koreksi sebelum sub level dipasang dianggap lulus semua.
  (function () {
    const cek = baca('er_sub_cek', []);
    let ubah = false;
    window.BACAAN.forEach(b => {
      if (!punyaSub(b) || cek.includes(b.id)) return;
      const ucapOk = skorTerbaik[b.id] >= TUNTAS;
      const lamaTuntas = b.kosakata || b.pola ? ucapOk : (b.tahap > 2 || ucapOk) && skorPaham[b.id] >= TUNTAS;
      if (lamaTuntas) dataSub(b).lama = true;
      cek.push(b.id);
      ubah = true;
    });
    if (ubah) { tulis('er_sub_cek', cek); simpanSub(); }
  })();

  // Kata sebunyi: pengenal suara bisa menuliskan salah satunya (mis. "to" → "two").
  const HOMOFON = {
    'i': ['eye', 'aye'], 'to': ['two', 'too'], 'two': ['to', 'too'], 'four': ['for'], 'one': ['won'], 'eight': ['ate'],
    'our': ['hour', 'are'], 'hour': ['our'], 'right': ['write'], 'write': ['right'], 'see': ['sea'], 'know': ['no'],
    'son': ['sun'], 'in': ['inn'], 'or': ['oar', 'ore'], 'so': ['sew', 'sow'], 'we': ['wee'], 'you': ['u'], 'tea': ['tee'],
    'new': ['knew'], 'week': ['weak'], 'whose': ["who's"], 'which': ['witch'], 'where': ['wear'], 'hear': ['here'],
    'red': ['read'], 'read': ['red', 'reed'], 'night': ['knight'], 'aunt': ['ant'], 'cannot': ['can not'], 'then': ['than'],
    'bread': ['bred'], 'do': ['due', 'dew']
  };
  const terimaUcap = daftar => [...new Set(daftar.flatMap(t => [t, ...(HOMOFON[normFrasa(t)] || [])]))];
  // Kata yang terjemahannya sama (mis. he/she = "dia") tidak saling menjadi pengecoh kalimat rumpang.
  const miripDengan = (b, k) => ((b.mirip || []).find(m => m.includes(k)) || []).filter(x => x !== k);
  const ambil = a => a[Math.floor(Math.random() * a.length)];
  const kocok = a => acak(a.length).map(i => a[i]);
  const huruf1 = s => s.charAt(0).toUpperCase() + s.slice(1);
  // Pilihan ganda: kunci + pengecoh unik (berbeda teksnya), urutan acak.
  function pilihan(kunci, calon, n) {
    const lain = [];
    for (const c of kocok(calon)) {
      if (lain.length >= (n || 4) - 1) break;
      if (c !== kunci && !lain.includes(c)) lain.push(c);
    }
    const p = kocok([kunci, ...lain]);
    return { p, j: p.indexOf(kunci) };
  }
  const contohKata = (b, k) => [[k[2], k[3]], ...((b.contohLain && b.contohLain[k[0]]) || [])];
  const semuaContoh = b => b.kosakata.flatMap(k => contohKata(b, k).map(([en, id]) => ({ en, id, kata: k[0] })));
  // Kalimat dengan kata/frasa dihilangkan; null bila tidak ditemukan utuh.
  function rumpang(kal, frasa) {
    const re = new RegExp('\\b' + frasa.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
    return re.test(kal) ? kal.replace(re, '_____') : null;
  }

  // ---------- Soal pola kalimat ----------
  const kalimatPola = (...x) => x.filter(Boolean).join(' ').replace(/ ([.?!,])/g, '$1');
  // Bentuk singkat diuraikan agar "don't" sama dengan "do not" saat dinilai.
  const SINGKAT = {
    "don't": 'do not', "doesn't": 'does not', "didn't": 'did not', "isn't": 'is not', "aren't": 'are not', "wasn't": 'was not',
    "weren't": 'were not', "won't": 'will not', "can't": 'cannot', "mustn't": 'must not', "shouldn't": 'should not', "i'm": 'i am',
    "you're": 'you are', "we're": 'we are', "they're": 'they are', "he's": 'he is', "she's": 'she is', "it's": 'it is',
    "there's": 'there is', "i'll": 'i will', "you'll": 'you will', "we'll": 'we will', "they'll": 'they will', "he'll": 'he will',
    "she'll": 'she will', "let's": 'let us'
  };
  function urai(teks) {
    const w = kataUcapan([{ teks }]).flatMap(x => (SINGKAT[x.w] || x.w).split(' '));
    const hasil = [];
    w.forEach(x => { if (x === 'not' && hasil[hasil.length - 1] === 'can') hasil[hasil.length - 1] = 'cannot'; else hasil.push(x); });
    return hasil;
  }
  // Kalimat yang diucapkan/diketik: kata dicocokkan seperti Baca & Koreksi. Lulus bila bagian
  // yang diuji (fokus) cocok dan kata yang meleset paling banyak 20% (minimal 1 boleh meleset).
  function nilaiKalimat(q, alternatif) {
    const target = [{ en: q.target, fokus: q.fokus, pos: q.fokusPos }, ...(q.alt || [])];
    let terbaik = { ok: false, persen: 0 };
    for (const t of target) {
      const tt = urai(t.en), ft = urai(t.fokus);
      let pos = t.pos;
      if (pos == null) { pos = tt.findIndex((_, i) => ft.every((x, k) => tt[i + k] === x)); if (pos < 0) pos = 0; }
      for (const a of alternatif) {
        const pas = cocokkan(tt, urai(a.teks));
        const cocok = pas.filter(j => j >= 0).length;
        const fokusOk = ft.every((_, k) => pas[pos + k] >= 0);
        const ok = fokusOk && tt.length - cocok <= Math.max(1, Math.round(tt.length * 0.2));
        const persen = Math.round(cocok * 100 / tt.length);
        if ((ok && !terbaik.ok) || (ok === terbaik.ok && persen > terbaik.persen)) terbaik = { ok, persen, fokusOk };
      }
    }
    return terbaik;
  }
  // ---------- Jumlah soal dan bentuk soal bergilir (10 Okt 2026) ----------
  // Satu sesi berisi jumlahSoal() soal (Pengaturan, bawaan 10). Bila unitnya (kata, situasi, kalimat,
  // bank soal) lebih sedikit, unit diulang dalam putaran acak berikutnya. Tiap sub level punya beberapa
  // bentuk soal; untuk unit yang sama, bentuk yang belum dipakai di sesi itu didahulukan, sehingga unit
  // yang muncul lagi (putaran berikut atau ulangan jawaban keliru) tampil dengan bentuk lain.
  const PILIHAN_JUMLAH = [10, 15, 20, 25, 30, 40];
  const PILIHAN_BATAS_SALAH = [0, 3, 5, 8, 10];
  const batasSalah = () => (PILIHAN_BATAS_SALAH.includes(atur.batasSalah) ? atur.batasSalah : 0);
  const jumlahSoal = () => (PILIHAN_JUMLAH.includes(atur.jumlahSoal) ? atur.jumlahSoal : 10);
  function isiSampai(kolam, N) {
    const hasil = [];
    while (hasil.length < N && kolam.length) {
      const putaran = kocok(kolam);
      if (hasil.length && putaran.length > 1 && putaran[0] === hasil[hasil.length - 1]) putaran.push(putaran.shift());
      hasil.push(...putaran);
    }
    return hasil.slice(0, N);
  }
  let varianDipakai = {};
  function varian(n, w, daftar) {
    const kunci = n + '|' + (typeof w === 'object' ? JSON.stringify(w) : w);
    const pakai = varianDipakai[kunci] || (varianDipakai[kunci] = []);
    let calon = daftar.filter(v => !pakai.includes(v));
    if (!calon.length) { pakai.length = 0; calon = daftar; }
    const v = ambil(calon);
    pakai.push(v);
    return v;
  }
  const petunjukHuruf = k => `Petunjuk: diawali “${k.charAt(0)}”, ${k.replace(/ /g, '').length} huruf${k.includes(' ') ? ` (${k.split(' ').length} kata)` : ''}.`;
  const BS = ['Benar', 'Salah'];

  function buatSoalPola(b, n, w) {
    const it = window.POLA_GEN[b.id]();
    const en = kalimatPola(it.pre, it.kunci, it.post);
    const kosong = kalimatPola(it.pre, '_____', it.post);
    const keliru = s => kalimatPola(it.pre, s, it.post);
    const dasar = { w, sesudah: en, alasan: it.alasan, suaraKunci: en };
    const ketik = () => ({ ...dasar, jenis: 'ketik', tanya: 'Ketik bentuk yang tepat.', kalimat: kosong, kecil: it.id,
      petunjukKetik: `Petunjuk: ${it.dasar}`, target: it.kunci, terima: [it.kunci], persis: true });
    const banyakSalah = it.salah.length >= 2;
    if (n === 1) {
      return varian(n, w, ['pilih', 'kalimatBenar']) === 'pilih'
        ? { ...dasar, jenis: 'pilih', tanya: 'Pilih bentuk yang tepat.', kalimat: kosong, kecil: it.id,
          ...pilihan(it.kunci, it.salah, Math.min(4, it.salah.length + 1)) }
        : { ...dasar, jenis: 'pilih', tanya: 'Kalimat mana yang benar?', kecil: it.id,
          ...pilihan(en, it.salah.map(keliru), Math.min(4, it.salah.length + 1)) };
    }
    if (n === 2) {
      if (banyakSalah && varian(n, w, ['bs', 'perbaiki']) === 'perbaiki') {
        const s = ambil(it.salah);
        return { ...dasar, jenis: 'pilih', tanya: `Kalimat ini keliru. Apa pengganti “${s}” yang tepat?`, kalimat: keliru(s), kecil: it.id,
          ...pilihan(it.kunci, it.salah.filter(x => x !== s), Math.min(4, it.salah.length)) };
      }
      const salah = Math.random() < 0.5;
      return { ...dasar, jenis: 'pilih', tanya: 'Apakah kalimat ini benar?', kalimat: salah ? keliru(ambil(it.salah)) : en,
        kecil: it.id, p: BS, j: salah ? 1 : 0 };
    }
    if (n === 3) {
      if (varian(n, w, ['ketik', 'perbaikiKetik']) === 'ketik') return ketik();
      const s = ambil(it.salah);
      return { ...dasar, jenis: 'ketik', tanya: `Kalimat ini keliru. Ketik bentuk yang benar untuk mengganti “${s}”.`, kalimat: keliru(s),
        kecil: it.id, petunjukKetik: `Petunjuk: ${it.dasar}`, target: it.kunci, terima: [it.kunci], persis: true };
    }
    if (n === 4) {
      const token = en.split(/\s+/);
      if (token.length > 14) return ketik();
      return varian(n, w, ['susun', 'dengarSusun']) === 'susun'
        ? { ...dasar, jenis: 'susun', tanya: 'Susun kata-kata ini menjadi kalimat.', kecil: it.id, token }
        : { ...dasar, jenis: 'susun', tanya: 'Dengarkan, lalu susun kalimat yang kamu dengar.', putar: en, token };
    }
    return varian(n, w, ['ucapArti', 'ucapRumpang']) === 'ucapArti'
      ? { ...dasar, jenis: 'ucapK', tanya: 'Ucapkan dalam bahasa Inggris:', kalimat: it.id, target: en, fokus: it.kunci,
        fokusPos: urai(it.pre || '').length, alt: it.alt || [] }
      : { ...dasar, jenis: 'ucapK', tanya: 'Ucapkan kalimat lengkapnya (isi bagian yang kosong):', kalimat: kosong,
        kecil: `${it.id} · Petunjuk: ${it.dasar}`, target: en, fokus: it.kunci, fokusPos: urai(it.pre || '').length, alt: [] };
  }

  // ---------- Soal bacaan ----------
  const kalimatBacaan = b => b._kal || (b._kal = pecah(b.teks, b.arti).kalimat.map(k => ({ en: k.teks, id: k.arti })));
  const cukupPanjang = k => k.en.split(/\s+/).length >= 3;
  const reKata = k => new RegExp('\\b' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
  const kalimatDenganKata = (b, kata) => kalimatBacaan(b).find(k => reKata(kata).test(k.en));
  const bankBacaan = b => [...soalDari(b).map(q => ({ pg: q })), ...((window.SOAL_BS || {})[b.id] || []).map(x => ({ bs: x }))];
  // Daftar "unit" satu sesi (w) per sub level.
  function urutBacaan(b, n, N) {
    if (n >= 6) return urutUjian(b, n, N);
    const G = window.KATA_BACAAN[b.id], K = kalimatBacaan(b);
    const panjang = K.map((k, i) => i).filter(i => cukupPanjang(K[i]));
    if (n === 1) return isiSampai(G.map((_, i) => i), N);
    if (n === 2 || (n === 5 && bacaSuara(b))) return isiSampai(panjang, N);
    if (n === 3) return isiSampai(K.map((_, i) => i), N);
    if (n === 4) return urutPemahaman(b, N);
    return isiSampai(G.map((_, i) => i).filter(i => kalimatDenganKata(b, G[i][0])), N);
  }
  // Sub level Pemahaman: bank soal (SOAL + SOAL_BS) ditambah soal turunan dari bank: "apakah jawaban ini
  // tepat?" dari soal pilihan ganda, tabel benar/salah dan "pilih semua yang benar" dari SOAL_BS acak.
  // Paling sedikit 20% soal turunan; bila sesi lebih panjang dari bank, sisanya juga turunan.
  function urutPemahaman(b, N) {
    const bank = bankBacaan(b).map((_, i) => i);
    const gen = [];
    soalDari(b).forEach((q, i) => { if (!q.bs && !Array.isArray(q.j)) gen.push({ g: 'cocok', i }); });
    if (((window.SOAL_BS || {})[b.id] || []).length >= 4) gen.push({ g: 'tabel' }, { g: 'semua' });
    const nGen = gen.length ? Math.min(N, Math.max(Math.round(N * 0.2), N - bank.length)) : 0;
    return kocok([...isiSampai(bank, N - nGen), ...isiSampai(gen, nGen)]);
  }
  function soalTurunan(b, w) {
    const daftarBS = (window.SOAL_BS || {})[b.id] || [];
    if (w.g === 'cocok') {
      const q = soalDari(b)[w.i];
      const tepat = Math.random() < 0.5;
      const opsi = tepat ? q.p[q.j] : ambil(q.p.filter((_, i) => i !== q.j));
      return { w, jenis: 'pilih', tanya: 'Apakah jawaban ini tepat untuk pertanyaannya?', kalimat: `${q.t} → ${opsi}`, p: BS, j: tepat ? 0 : 1,
        alasan: `Jawaban yang tepat: ${q.p[q.j]}. ${q.b}`, bahasSelalu: true };
    }
    if (w.g === 'tabel') {
      const baris = kocok(daftarBS).slice(0, 4);
      return { w, jenis: 'tabel', tanya: 'Tentukan benar atau salah menurut bacaan.', baris: baris.map(x => [x[0], x[1]]),
        alasan: baris.filter(x => !x[1] && x[2]).map(x => x[2]).join(' · '), bahasSelalu: true };
    }
    let pilih = kocok(daftarBS).slice(0, 5);
    for (let c = 0; c < 20 && (pilih.every(x => x[1]) || pilih.every(x => !x[1])); c++) pilih = kocok(daftarBS).slice(0, 5);
    return { w, jenis: 'multi', tanya: 'Pilih semua pernyataan yang BENAR menurut bacaan.', p: pilih.map(x => x[0]),
      jj: pilih.map((x, i) => (x[1] ? i : -1)).filter(i => i >= 0), alasan: pilih.filter(x => !x[1] && x[2]).map(x => x[2]).join(' · '), bahasSelalu: true };
  }
  // ---------- Sub level 6–10 bacaan TKA/UTBK (10 Okt 2026) ----------
  // Sumber: bank soal (SOAL + SOAL_BS) yang dikelompokkan menurut jenis kisi-kisi, ditambah soal yang
  // dibuat dari IDE_POKOK (ide pokok tiap paragraf), RUJUKAN (kata rujukan), dan SINONIM (makna kata) di soal.js.
  // Opsi pilihan ganda: 4 untuk TKA (Tahap 4), 5 untuk UTBK/SNBT (Tahap 5).
  const opsiUjian = b => (b.tahap >= 5 ? 5 : 4);
  const paragrafBacaan = b => b.teks.split(/\n\s*\n/);
  const idePokok = b => (window.IDE_POKOK || {})[b.id] || [];
  // Nomor paragraf isi: paragraf yang ide pokoknya null (salam, penutup surat) tidak dinomori.
  function nomorParagraf(b, p) {
    const ide = idePokok(b);
    if (!ide.length) return p + 1;
    if (!ide[p]) return 0;
    return ide.slice(0, p + 1).filter(Boolean).length;
  }
  // Jenis soal bank menurut kisi-kisi; boleh ditulis langsung sebagai q.k di soal.js.
  function kategoriSoal(q) {
    if (q.k) return q.k;
    const t = q.t || '';
    if (/refers? to/i.test(t)) return 'rujukan';
    if (/closest in meaning|^The word .* means|"\w+" .* means/i.test(t)) return 'kata';
    if (/main idea|mainly about|main topic|main argument|best title|type of text/i.test(t)) return 'ide';
    if (/organi[sz]ed|relationship between|Which paragraph|climax/i.test(t)) return 'organisasi';
    if (/purpose|Why does the (author|writer) (mention|compare|describe)|function of/i.test(t)) return 'tujuan';
    if (/attitude|tone|position|feel about/i.test(t)) return 'sikap';
    if (/strengthen|weaken|agree with|best (fit|reflect)|proverb/i.test(t)) return 'evaluasi';
    if (/infer|most likely|suggest|imply|moral|lesson|probably/i.test(t)) return 'inferensi';
    return 'rinci';
  }
  const KAT_SUB = { 6: ['ide', 'organisasi'], 7: ['rinci', 'rujukan'], 8: ['kata'], 9: ['inferensi', 'sikap', 'tujuan', 'evaluasi'] };
  function urutUjian(b, n, N) {
    const bank = bankBacaan(b), ide = idePokok(b);
    const R = (window.RUJUKAN || {})[b.id] || [], S = (window.SINONIM || {})[b.id] || [];
    const kat = bank.map(x => (x.bs ? 'rinci' : kategoriSoal(x.pg)));
    const dariBank = ks => bank.map((_, i) => i).filter(i => !ks || ks.includes(kat[i])).map(i => ({ g: 'bank', i }));
    const gIde = ide.map((t, p) => (t ? { g: 'ide', p } : null)).filter(Boolean);
    const gRujuk = R.map((_, i) => ({ g: 'rujuk', i }));
    const gSin = S.map((_, i) => ({ g: 'sinonim', i }));
    const gBS = ((window.SOAL_BS || {})[b.id] || []).length >= 4 ? [{ g: 'tabel' }, { g: 'semua' }] : [];
    // Struktur teks (Tahap 2): satu unit per kalimat yang punya bagian di BAGIAN.
    const gBagian = (((window.BAGIAN || {})[b.id] || {}).bagian || []).flatMap(([, , ks]) => ks.map(k => ({ g: 'bagian', k })));
    let kolam = n === 6 ? [...gIde, ...gBagian, ...dariBank(KAT_SUB[6])]
      : n === 7 ? [...dariBank(KAT_SUB[7]), ...gRujuk, ...gBS]
      : n === 8 ? [...gSin, ...dariBank(KAT_SUB[8])]
      : n === 9 ? dariBank(KAT_SUB[9])
      : [...dariBank(), ...gIde, ...gBagian, ...gRujuk, ...gSin];
    if (!kolam.length) kolam = dariBank();
    return isiSampai(kolam, N);
  }
  function soalUjian(b, n, w) {
    const nOpsi = opsiUjian(b);
    if (w.g === 'bank') return soalBank(b, w.i, w);
    if (w.g === 'tabel' || w.g === 'semua' || w.g === 'cocok') return soalTurunan(b, w);
    if (w.g === 'bagian') {
      // Pengecoh: nama bagian dari jenis teks lain (BAGIAN_SEMUA), sehingga siswa perlu mengenali jenis teksnya.
      const B = window.BAGIAN[b.id], K = kalimatBacaan(b);
      const [nama, arti] = B.bagian.find(([, , ks]) => ks.includes(w.k));
      const milik = B.bagian.map(x => x[0]);
      const p = kocok([...milik, ...kocok((window.BAGIAN_SEMUA || []).filter(x => !milik.includes(x))).slice(0, Math.max(0, nOpsi - milik.length))]);
      return { w, jenis: 'pilih', tanya: `This sentence comes from a ${B.jenis}. Which part of the text is it?`, kalimat: K[w.k].en, kecil: K[w.k].id,
        p, j: p.indexOf(nama), alasan: `Kalimat ini termasuk bagian ${nama}: ${arti}.`, bahasSelalu: true };
    }
    if (w.g === 'ide') {
      const ide = idePokok(b), isi = ide.map((t, p) => ({ t, p })).filter(x => x.t);
      const no = nomorParagraf(b, w.p), kunci = ide[w.p];
      const alasan = `Paragraf ${no} membahas: ${kunci}`;
      if (varian(n, w, ['ide', 'mana']) === 'ide') {
        return { w, jenis: 'pilih', tanya: `What is the main idea of paragraph ${no}?`, ...pilihan(kunci, isi.map(x => x.t), Math.min(nOpsi, isi.length)), alasan, bahasSelalu: true };
      }
      const p = isi.map(x => `Paragraph ${nomorParagraf(b, x.p)}`);
      return { w, jenis: 'pilih', tanya: 'Which paragraph mainly discusses this idea?', kalimat: kunci, p, j: p.indexOf(`Paragraph ${no}`), alasan, bahasSelalu: true };
    }
    if (w.g === 'rujuk') {
      const [kata, potongan, benar, pengecoh] = window.RUJUKAN[b.id][w.i];
      return { w, jenis: 'pilih', tanya: `In this part of the text, “${kata}” refers to …`, kalimat: `“… ${potongan} …”`,
        ...pilihan(benar, pengecoh, Math.min(nOpsi, pengecoh.length + 1)), alasan: `“${kata}” merujuk pada ${benar}.`, bahasSelalu: true };
    }
    // Sinonim: kata dalam kalimat teks → padanannya, atau sebaliknya.
    const S = window.SINONIM[b.id], [kata, sin, pengecoh] = S[w.i];
    const c = kalimatDenganKata(b, kata);
    const alasan = `“${kata}” di sini bermakna “${sin}”.`;
    if (!c || varian(n, w, ['sin', 'balik']) === 'balik') {
      return { w, jenis: 'pilih', tanya: `Which word from the text is closest in meaning to “${sin}”?`, ...pilihan(kata, S.map(x => x[0]), nOpsi), alasan, bahasSelalu: true };
    }
    return { w, jenis: 'pilih', tanya: `The word “${kata}” in the sentence below is closest in meaning to …`, kalimat: c.en,
      ...pilihan(sin, pengecoh, Math.min(nOpsi, pengecoh.length + 1)), alasan, bahasSelalu: true };
  }
  // Satu soal dari bank (SOAL + SOAL_BS) bacaan, indeks i.
  function soalBank(b, i, w) {
    const x = bankBacaan(b)[i];
      // Bentuk soal TKA/SNBT: pilihan ganda (4–5 opsi), pilihan ganda kompleks (j = daftar indeks,
      // jawaban benar lebih dari satu), dan benar/salah per pernyataan (bs = [[pernyataan, benar?], ...]).
      if (x.pg && x.pg.bs) return { w, jenis: 'tabel', tanya: x.pg.t, baris: kocok(x.pg.bs), alasan: x.pg.b, bahasSelalu: true };
      if (x.pg && Array.isArray(x.pg.j)) {
        const u = kocok(x.pg.p.map((_, i) => i));
        return { w, jenis: 'multi', tanya: x.pg.t, p: u.map(i => x.pg.p[i]), jj: u.map((i, k) => (x.pg.j.includes(i) ? k : -1)).filter(k => k >= 0),
          alasan: x.pg.b, bahasSelalu: true };
      }
      if (x.pg) return { w, jenis: 'pilih', tanya: x.pg.t, ...pilihan(x.pg.p[x.pg.j], x.pg.p, x.pg.p.length), alasan: x.pg.b, bahasSelalu: true };
      return { w, jenis: 'pilih', tanya: 'Benar atau salah menurut bacaan?', kalimat: x.bs[0], p: BS, j: x.bs[1] ? 0 : 1,
        alasan: x.bs[2] || '', bahasSelalu: true };
  }
  function buatSoalBacaan(b, n, w) {
    const G = window.KATA_BACAAN[b.id], K = kalimatBacaan(b);
    if (n === 1) {
      const [kata, arti] = G[w];
      const c = kalimatDenganKata(b, kata);
      const v = varian(n, w, ['kataArti', 'artiKata', 'pasangan', 'dengarArti', ...(c ? ['rumpang'] : [])]);
      if (v === 'kataArti') return { w, jenis: 'pilih', tanya: 'Apa arti kata ini dalam bacaan?', besar: kata, suara: kata, kecil: c ? `“${c.en}”` : '', ...pilihan(arti, G.map(x => x[1])) };
      if (v === 'artiKata') return { w, jenis: 'pilih', tanya: 'Apa bahasa Inggrisnya dalam bacaan?', besar: arti, suaraKunci: kata, ...pilihan(kata, G.map(x => x[0])) };
      if (v === 'dengarArti') return { w, jenis: 'pilih', tanya: 'Dengarkan kata dari bacaan. Apa artinya?', putar: kata, tulisSesudah: kata, ...pilihan(arti, G.map(x => x[1])) };
      if (v === 'rumpang') {
        return { w, jenis: 'pilih', tanya: 'Kata apa yang hilang dari kalimat bacaan ini?', kalimat: c.en.replace(reKata(kata), '_____'), kecil: c.id,
          suaraKunci: c.en, sesudah: c.en, ...pilihan(kata, G.map(x => x[0])) };
      }
      const cocok = Math.random() < 0.5;
      const tampil = cocok ? arti : ambil(G.filter(x => x[1] !== arti).map(x => x[1]));
      return { w, jenis: 'pilih', tanya: 'Benar atau salah?', kalimat: `“${kata}” artinya “${tampil}”.`, kecil: c ? `“${c.en}”` : '', p: BS, j: cocok ? 0 : 1,
        alasan: `“${kata}” artinya “${arti}”.`, suaraKunci: kata };
    }
    if (n === 2) {
      const k = K[w];
      const lain = K.filter(x => x !== k && cukupPanjang(x));
      const ada = G.filter(x => reKata(x[0]).test(k.en)), tiada = G.filter(x => !reKata(x[0]).test(k.en));
      const v = varian(n, w, ['dengarArti', 'artiInggris', 'dengarTulis', ...(ada.length && tiada.length >= 3 ? ['dengarKata'] : [])]);
      if (v === 'dengarArti') return { w, jenis: 'pilih', tanya: 'Dengarkan kalimat dari bacaan. Apa artinya?', putar: k.en, tulisSesudah: k.en, ...pilihan(k.id, lain.map(x => x.id)) };
      if (v === 'artiInggris') return { w, jenis: 'pilih', tanya: 'Kalimat bacaan mana yang artinya seperti ini?', kalimat: k.id, suaraKunci: k.en, ...pilihan(k.en, lain.map(x => x.en)) };
      if (v === 'dengarTulis') return { w, jenis: 'pilih', tanya: 'Dengarkan. Kalimat mana yang kamu dengar?', putar: k.en, ...pilihan(k.en, lain.map(x => x.en)) };
      const kunci = ambil(ada)[0];
      return { w, jenis: 'pilih', tanya: 'Dengarkan kalimatnya. Kata mana yang ada di kalimat itu?', putar: k.en, tulisSesudah: k.en,
        ...pilihan(kunci, tiada.map(x => x[0])) };
    }
    if (n === 3) {
      const daftar = ['urut', ...(w < K.length - 1 ? ['sesudah'] : []), ...(w > 0 ? ['sebelum'] : [])];
      const v = varian(n, w, daftar);
      if (v === 'urut') {
        const L = Math.min(K.length, b.tahap >= 4 ? 3 : 4);
        const s = Math.floor(Math.random() * (K.length - L + 1));
        return { w, jenis: 'susun', urutKalimat: true, tanya: 'Urutkan kalimat-kalimat ini sesuai bacaan.', token: K.slice(s, s + L).map(x => x.en) };
      }
      const kunci = K[v === 'sesudah' ? w + 1 : w - 1];
      return { w, jenis: 'pilih', tanya: v === 'sesudah' ? 'Dalam bacaan, kalimat mana yang tepat SESUDAH kalimat ini?' : 'Dalam bacaan, kalimat mana yang tepat SEBELUM kalimat ini?',
        kalimat: K[w].en, kecil: K[w].id, sesudah: v === 'sesudah' ? `${K[w].en} ${kunci.en}` : `${kunci.en} ${K[w].en}`,
        ...pilihan(kunci.en, K.filter(x => x !== K[w] && x !== kunci).map(x => x.en)) };
    }
    if (n >= 6) return soalUjian(b, n, w);
    if (n === 4) return typeof w === 'object' ? soalTurunan(b, w) : soalBank(b, w, w);
    if (bacaSuara(b)) {
      const k = K[w];
      const dengar = varian(n, w, ['baca', 'dengarBaca']) === 'dengarBaca';
      return { w, jenis: 'ucapK', tanya: dengar ? 'Dengarkan dulu, lalu bacalah kalimat ini dengan suara jelas:' : 'Bacalah kalimat dari bacaan ini dengan suara jelas:',
        putar: dengar ? k.en : '', kalimat: k.en, kecil: k.id, target: k.en, fokus: '', fokusPos: 0, suaraKunci: k.en, bacaTeks: true };
    }
    const [kata] = G[w];
    const c = kalimatDenganKata(b, kata);
    const kosong = c.en.replace(reKata(kata), '_____');
    return varian(n, w, ['pilih', 'ketik']) === 'pilih'
      ? { w, jenis: 'pilih', tanya: 'Lengkapi kalimat dari bacaan.', kalimat: kosong, kecil: c.id, suaraKunci: c.en, sesudah: c.en, ...pilihan(kata, G.map(x => x[0])) }
      : { w, jenis: 'ketik', tanya: 'Ketik kata yang hilang dari kalimat bacaan ini.', kalimat: kosong, kecil: c.id, suaraKunci: c.en,
        sesudah: c.en, petunjukKetik: petunjukHuruf(kata), target: kata, terima: [kata] };
  }

  // Satu soal untuk kata ke-w (sub level 3: situasi ke-w).
  function buatSoal(b, n, w) {
    if (b.pola) return buatSoalPola(b, n, w);
    if (!b.kosakata) return buatSoalBacaan(b, n, w);
    const kk = b.kosakata, k = kk[w];
    const kata = kk.map(x => x[0]), arti = kk.map(x => x[1]);
    if (n === 3) {
      const s = b.situasi[w];
      const lainSit = b.situasi.filter(x => x.j !== s.j && !(x.juga || []).includes(s.j) && !(s.juga || []).includes(x.j));
      if (lainSit.length >= 2 && varian(n, w, ['situasiKata', 'kataSituasi']) === 'kataSituasi') {
        return { w, jenis: 'pilih', tanya: `Kapan ungkapan “${s.j}” paling tepat diucapkan?`, suaraKunci: s.j, ...pilihan(s.s, lainSit.map(x => x.s)) };
      }
      const calon = kata.filter(x => x !== s.j && !(s.juga || []).includes(x));
      return { w, jenis: 'pilih', tanya: s.s, suaraKunci: s.j, ...pilihan(s.j, calon) };
    }
    // Contoh kalimat acak untuk kata ini, beserta versi rumpangnya (null bila kata tidak tertulis utuh).
    const contoh = kocok(contohKata(b, k));
    const cR = contoh.find(c => rumpang(c[0], k[0])) || null;
    const r = cR && rumpang(cR[0], k[0]);
    const c = contoh[0];
    const kalimatLain = semuaContoh(b).filter(x => x.kata !== k[0]);
    const tidakMirip = kata.filter(x => !miripDengan(b, k[0]).includes(x));
    if (n === 1) {
      const v = varian(n, w, ['kataArti', 'artiKata', 'pasangan', ...(cR ? ['konteks'] : [])]);
      if (v === 'kataArti') return { w, jenis: 'pilih', tanya: 'Apa arti kata ini?', besar: k[0], suara: k[0], ...pilihan(k[1], arti) };
      if (v === 'artiKata') return { w, jenis: 'pilih', tanya: 'Apa bahasa Inggrisnya?', besar: k[1], suaraKunci: k[0], ...pilihan(k[0], kata) };
      if (v === 'konteks') {
        return { w, jenis: 'pilih', tanya: `Apa arti “${k[0]}” dalam kalimat ini?`, kalimat: cR[0], suaraKunci: cR[0], tulisSesudah: cR[0],
          ...pilihan(k[1], arti) };
      }
      const cocok = Math.random() < 0.5;
      const tampil = cocok ? k[1] : ambil(kk.filter(x => x[1] !== k[1]).map(x => x[1]));
      return { w, jenis: 'pilih', tanya: 'Benar atau salah?', kalimat: `“${k[0]}” artinya “${tampil}”.`, p: BS, j: cocok ? 0 : 1,
        alasan: `“${k[0]}” artinya “${k[1]}”.`, suaraKunci: k[0] };
    }
    if (n === 2) {
      const v = varian(n, w, ['dengarKata', 'dengarKalimatArti', 'dengarKataArti', 'dengarKalimatTulis']);
      if (v === 'dengarKata') return { w, jenis: 'pilih', tanya: 'Dengarkan. Kata apa yang kamu dengar?', putar: k[0], ...pilihan(k[0], kata) };
      if (v === 'dengarKataArti') return { w, jenis: 'pilih', tanya: 'Dengarkan katanya. Apa artinya?', putar: k[0], tulisSesudah: k[0], ...pilihan(k[1], arti) };
      if (v === 'dengarKalimatTulis') return { w, jenis: 'pilih', tanya: 'Dengarkan. Kalimat mana yang kamu dengar?', putar: c[0], ...pilihan(c[0], kalimatLain.map(x => x.en)) };
      return { w, jenis: 'pilih', tanya: 'Dengarkan kalimatnya. Apa artinya?', putar: c[0], tulisSesudah: c[0], ...pilihan(c[1], kalimatLain.map(x => x.id)) };
    }
    if (n === 4) {
      const token = c[0].split(/\s+/);
      const bisaSusun = token.length >= 3 && token.length <= 8;
      const v = varian(n, w, [...(cR ? ['rumpangPilih', 'rumpangKetik'] : []), ...(bisaSusun ? ['susun'] : []), 'terjemah']);
      if (v === 'rumpangPilih') return { w, jenis: 'pilih', tanya: 'Lengkapi kalimatnya.', besar: r, kecil: cR[1], suaraKunci: cR[0], ...pilihan(k[0], tidakMirip) };
      if (v === 'rumpangKetik') {
        return { w, jenis: 'ketik', tanya: 'Ketik kata yang hilang.', kalimat: r, kecil: cR[1], suaraKunci: cR[0], sesudah: cR[0],
          petunjukKetik: petunjukHuruf(k[0]), target: k[0], terima: [k[0]] };
      }
      if (v === 'susun') return { w, jenis: 'susun', tanya: 'Susun kata-kata ini menjadi kalimat.', kecil: c[1], token, suaraKunci: c[0] };
      return { w, jenis: 'pilih', tanya: 'Pilih kalimat bahasa Inggris yang artinya:', kalimat: c[1], suaraKunci: c[0], ...pilihan(c[0], kalimatLain.map(x => x.en)) };
    }
    // Sub level 5 (Ucapkan): ungkapan lain yang juga pantas (juga) ikut diterima pada soal situasi.
    const sit = b.situasi.filter(s => s.j === k[0]);
    const v = varian(n, w, ['arti', ...(sit.length ? ['situasi'] : []), ...(cR ? ['rumpang'] : [])]);
    if (v === 'situasi') {
      const s = ambil(sit);
      return { w, jenis: 'ucap', tanya: s.s, target: k[0], terima: terimaUcap([k[0], ...(s.juga || [])]), petunjuk: 'Ucapkan kata yang tepat dalam bahasa Inggris.' };
    }
    if (v === 'rumpang') {
      return { w, jenis: 'ucap', tanya: 'Ucapkan kata yang hilang dari kalimat ini:', kalimat: r, kecil: cR[1], target: k[0], terima: terimaUcap([k[0]]), suaraKunci: cR[0] };
    }
    return { w, jenis: 'ucap', tanya: 'Ucapkan dalam bahasa Inggris:', besar: k[1], target: k[0], terima: terimaUcap([k[0]]) };
  }

  let latih = null;   // { b, n, antre: [soal], i, benar, awal, sudah, rec }
  function mulaiLatih(b, n) {
    const N = jumlahSoal();
    varianDipakai = {};
    const urut = b.pola ? Array.from({ length: N }, (_, i) => i) : !b.kosakata ? urutBacaan(b, n, N)
      : isiSampai((n === 3 ? b.situasi : b.kosakata).map((_, i) => i), N);
    latih = { b, n, antre: urut.map((w, i) => ({ ...buatSoal(b, n, w), no: i + 1 })), i: 0, benar: 0, salah: 0, awal: urut.length, sudah: false, rec: null };
  }
  function batalLatih() {
    if (latih && latih.rec) { try { latih.rec.abort(); } catch (e) { /* abaikan */ } latih.rec = null; }
    latih = null;
  }
  function ucapLatih(teks) {
    if (!bisaSuara || !teks) return;
    speechSynthesis.cancel();
    speechSynthesis.speak(ucapan(teks, Math.min(setelan.laju, 0.85)));
  }

  function tampilLatih(b, n) {
    kini = null;
    batalLatih();
    mulaiLatih(b, n);
    const sub = daftarSub(b)[n - 1];
    layar.innerHTML = `
      <div class="bar-atas"><a href="#baca/${encodeURIComponent(b.id)}" class="kembali">← ${esc(b.judul)}</a><span class="label-tingkat">Sub level ${n}/${daftarSub(b).length}</span></div>
      <h1 class="judul-bacaan">${sub.ikon} ${esc(sub.nama)}</h1>
      ${!b.kosakata && !b.pola && ((n === 4 && b.tahap >= 4) || n >= 6) ?`<details class="lt-teks"${n === 10 ? ' open' : ''}><summary>📄 Lihat teks bacaan</summary>
        ${paragrafBacaan(b).map((x, p) => `<p>${nomorParagraf(b, p) ? `<b class="lt-no-par">${nomorParagraf(b, p)}</b> ` : ''}${esc(x.trim())}</p>`).join('')}</details>` : ''}
      <div class="lt-jalur"><span id="lt-isi"></span></div>
      <div id="lt-kotak"></div>`;
    gambarSoal();
  }

  function gambarSoal() {
    const L = latih;
    if (L.i >= L.antre.length) { selesaiLatih(); return; }
    const q = L.antre[L.i];
    L.sudah = false;
    const ulangan = !!q.ulang;
    $('#lt-isi').style.width = `${Math.min(100, (L.i / L.antre.length) * 100)}%`;
    let isi = `<p class="lt-nomor">${ulangan ? `🔁 Ulangi soal ${q.no} dengan soal lain` : `Soal ${q.no} dari ${L.awal}`}${batasSalah() ? ` · <span class="lt-salah">salah ${L.salah}/${batasSalah()}</span>` : ''}</p>
      <p class="lt-tanya">${esc(q.tanya)}</p>`;
    if (q.putar) isi += '<button class="tombol lt-putar" data-putar>🔊 Putar lagi</button>';
    if (q.besar) isi += `<p class="lt-besar">${esc(q.besar)}${q.suara ? ' <button class="tombol kecil" data-dengar aria-label="Dengarkan">🔊</button>' : ''}</p>`;
    if (q.kalimat) isi += `<p class="lt-kalimat">${esc(q.kalimat)}</p>`;
    if (q.kecil) isi += `<p class="lt-kecil">${esc(q.kecil)}</p>`;
    if (q.jenis === 'ketik') {
      isi += `<form class="lt-ketik" id="lt-ketik"><input id="lt-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Ketik jawabanmu" aria-label="Jawaban">
          <button class="tombol utama">Periksa</button></form>${q.petunjukKetik ? `<p class="lt-kecil">${esc(q.petunjukKetik)}</p>` : ''}`;
    } else if (q.jenis === 'pilih') {
      isi += `<div class="lt-pilihan">${q.p.map((x, i) => `<button class="lt-opsi" data-i="${i}"><span class="opsi-huruf">${'ABCDE'[i]}</span><span>${esc(x)}</span></button>`).join('')}</div>`;
    } else if (q.jenis === 'multi') {
      isi += `<p class="lt-kecil">Pilih semua jawaban yang benar (bisa lebih dari satu), lalu tekan Periksa.</p>
        <div class="lt-pilihan">${q.p.map((x, i) => `<button class="lt-opsi" data-i="${i}" aria-pressed="false"><span class="opsi-huruf">${'ABCDE'[i]}</span><span>${esc(x)}</span></button>`).join('')}</div>
        <div class="kendali"><button class="tombol utama" id="lt-cek-m" disabled>Periksa</button></div>`;
    } else if (q.jenis === 'tabel') {
      q.isi = q.baris.map(() => null);
      isi += `<p class="lt-kecil">Tentukan Benar atau Salah untuk tiap pernyataan, lalu tekan Periksa.</p>
        <div class="lt-tabel">${q.baris.map(([s], r) => `<div class="lt-baris" data-baris="${r}"><span class="lt-pernyataan">${esc(s)}</span>
          <span class="lt-bs"><button class="lt-bs-tombol" data-r="${r}" data-v="1">Benar</button><button class="lt-bs-tombol" data-r="${r}" data-v="0">Salah</button></span></div>`).join('')}</div>
        <div class="kendali"><button class="tombol utama" id="lt-cek-t" disabled>Periksa</button></div>`;
    } else if (q.jenis === 'susun') {
      q.urut = kocok(q.token.map((_, i) => i));
      q.pilih = [];
      isi += `<div class="lt-susun${q.urutKalimat ? ' lt-ubin-kal' : ''}" id="lt-hasil" aria-label="Kalimatmu"></div>
        <div class="lt-ubin${q.urutKalimat ? ' lt-ubin-kal' : ''}" id="lt-ubin">${q.urut.map(i => `<button class="lt-kata" data-t="${i}">${esc(q.token[i])}</button>`).join('')}</div>
        <div class="kendali"><button class="tombol utama" id="lt-cek" disabled>Periksa</button></div>`;
    } else {
      if (q.petunjuk) isi += `<p class="lt-kecil">${esc(q.petunjuk)}</p>`;
      if (SR && q.jenis === 'ucap' && q.target.length <= 4) isi += '<p class="lt-kecil">Kata pendek lebih mudah dikenali bila diucapkan dalam kalimat, mis. “I can swim”.</p>';
      isi += SR
        ? '<div class="kendali"><button class="tombol rekam" id="lt-rekam">🎤 Ucapkan</button></div><p class="lt-dengar" id="lt-dengar"></p>'
        : `<form class="lt-ketik" id="lt-ketik"><input id="lt-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Ketik dalam bahasa Inggris" aria-label="Jawaban">
            <button class="tombol utama">Periksa</button></form>
            <p class="lt-kecil">Pengenal suara tidak tersedia di browser ini, jadi jawabannya diketik. Untuk berlatih mengucapkan, buka di ${browserSaran}.</p>`;
    }
    isi += '<div id="lt-umpan"></div>';
    const kotak = $('#lt-kotak');
    kotak.innerHTML = `<div class="lt-kartu">${isi}</div>`;
    kotak.onclick = klikSoal;
    const f = $('#lt-ketik');
    if (f) f.onsubmit = e => { e.preventDefault(); jawabKetik(); };
    if (q.jenis === 'ketik' && !('ontouchstart' in window)) $('#lt-input').focus();
    if (q.putar) ucapLatih(q.putar);
  }

  function klikSoal(e) {
    const L = latih, q = L && L.antre[L.i];
    if (!q) return;
    if (e.target.closest('[data-putar]')) { ucapLatih(q.putar); return; }
    if (e.target.closest('[data-dengar]')) { ucapLatih(q.suara); return; }
    if (e.target.closest('#lt-lanjut')) {
      if (L.dariAwal) { tampilLatih(L.b, L.n); window.scrollTo(0, 0); return; }
      L.i++; gambarSoal(); window.scrollTo(0, 0); return;
    }
    if (e.target.closest('#lt-suara-kunci')) { ucapLatih(L.dengar); return; }
    if (L.sudah) return;
    const kotak = $('#lt-kotak');
    if (q.jenis === 'multi') {
      const opsi = [...kotak.querySelectorAll('.lt-opsi')];
      const om = e.target.closest('.lt-opsi');
      if (om) {
        om.classList.toggle('dipilih');
        om.setAttribute('aria-pressed', om.classList.contains('dipilih'));
        $('#lt-cek-m').disabled = !opsi.some(x => x.classList.contains('dipilih'));
        return;
      }
      if (!e.target.closest('#lt-cek-m')) return;
      // Dinilai benar hanya bila semua jawaban benar dipilih dan tidak ada yang keliru (seperti TKA).
      const pilih = opsi.map((x, i) => (x.classList.contains('dipilih') ? i : -1)).filter(i => i >= 0);
      const ok = pilih.length === q.jj.length && pilih.every(i => q.jj.includes(i));
      opsi.forEach((x, i) => {
        x.disabled = true;
        x.classList.toggle('kunci', (ok || atur.tampilJawaban) && q.jj.includes(i));
        x.classList.toggle('keliru', atur.tampilJawaban && pilih.includes(i) && !q.jj.includes(i));
        x.classList.toggle('dipilih', !atur.tampilJawaban && !ok && pilih.includes(i));
      });
      $('#lt-cek-m').disabled = true;
      nilaiSoal(ok, ok ? '' : `Jawaban yang tepat: ${q.jj.map(i => `<b>${'ABCDE'[i]}</b>`).join(', ')}.`);
      return;
    }
    if (q.jenis === 'tabel') {
      const tb = e.target.closest('.lt-bs-tombol');
      if (tb) {
        const r = +tb.dataset.r;
        q.isi[r] = tb.dataset.v === '1';
        kotak.querySelectorAll(`.lt-bs-tombol[data-r="${r}"]`).forEach(x => x.classList.toggle('dipilih', x === tb));
        $('#lt-cek-t').disabled = q.isi.some(v => v === null);
        return;
      }
      if (!e.target.closest('#lt-cek-t')) return;
      const salah = q.baris.map(([, v], r) => (q.isi[r] === v ? -1 : r)).filter(r => r >= 0);
      kotak.querySelectorAll('.lt-bs-tombol').forEach(x => { x.disabled = true; });
      kotak.querySelectorAll('.lt-baris').forEach((el, r) => {
        if (!atur.tampilJawaban && salah.length) return;
        el.classList.add(salah.includes(r) ? 'keliru' : 'benar');
        if (salah.includes(r)) el.insertAdjacentHTML('beforeend', `<span class="lt-bs-kunci">Seharusnya: ${q.baris[r][1] ? 'Benar' : 'Salah'}</span>`);
      });
      $('#lt-cek-t').disabled = true;
      nilaiSoal(!salah.length, salah.length ? `${salah.length} dari ${q.baris.length} pernyataan belum tepat.` : '');
      return;
    }
    const o = e.target.closest('.lt-opsi');
    if (o) {
      const pilih = +o.dataset.i;
      $('#lt-kotak').querySelectorAll('.lt-opsi').forEach((x, i) => {
        x.disabled = true;
        x.classList.toggle('kunci', i === q.j && (pilih === q.j || atur.tampilJawaban));
        x.classList.toggle('keliru', i === pilih && pilih !== q.j);
      });
      nilaiSoal(pilih === q.j, pilih === q.j ? '' : `Jawaban yang tepat: <b>${esc(q.p[q.j])}</b>`);
      return;
    }
    const t = e.target.closest('.lt-kata');
    if (t && q.jenis === 'susun') {
      const id = +t.dataset.t;
      if (t.closest('#lt-hasil')) q.pilih.splice(q.pilih.indexOf(id), 1);
      else q.pilih.push(id);
      $('#lt-hasil').innerHTML = q.pilih.map(i => `<button class="lt-kata" data-t="${i}">${esc(q.token[i])}</button>`).join('');
      $('#lt-ubin').querySelectorAll('.lt-kata').forEach(x => { x.hidden = q.pilih.includes(+x.dataset.t); });
      $('#lt-cek').disabled = q.pilih.length !== q.token.length;
      return;
    }
    if (e.target.closest('#lt-cek')) {
      // Kata yang sama boleh bertukar tempat: dibandingkan teksnya, bukan urutan ubinnya.
      const ok = q.pilih.map(i => norm(q.token[i])).join(' ') === q.token.map(norm).join(' ');
      $('#lt-cek').disabled = true;
      $('#lt-kotak').querySelectorAll('.lt-kata').forEach(x => { x.disabled = true; });
      $('#lt-hasil').classList.add(ok ? 'benar' : 'keliru');
      nilaiSoal(ok, ok ? '' : q.urutKalimat ? `Urutan yang tepat:<ol class="lt-urutan">${q.token.map(t => `<li>${esc(t)}</li>`).join('')}</ol>`
        : `Kalimat yang tepat: <b>${esc(q.token.join(' '))}</b>`);
      return;
    }
    if (e.target.closest('#lt-rekam')) rekamLatih();
  }

  function rekamLatih() {
    const L = latih, q = L.antre[L.i];
    const tombol = $('#lt-rekam');
    if (L.rec) { try { L.rec.stop(); } catch (e) { /* abaikan */ } return; }
    if (bisaSuara) speechSynthesis.cancel();
    const r = new SR();
    r.lang = 'en-US'; r.continuous = false; r.interimResults = false; r.maxAlternatives = 5;
    L.rec = r;
    tombol.classList.add('aktif'); tombol.textContent = '● Ucapkan sekarang…';
    let alternatif = null, galat = '';
    const batas = setTimeout(() => { try { r.stop(); } catch (e) { /* abaikan */ } }, q.jenis === 'ucapK' ? 12000 : 6000);
    r.onresult = e => { const h = e.results[e.results.length - 1]; alternatif = Array.from(h, a => ({ teks: a.transcript, yakin: a.confidence })); };
    r.onerror = e => { galat = e.error; };
    r.onend = () => {
      clearTimeout(batas);
      if (latih !== L || L.rec !== r) return;
      L.rec = null;
      tombol.classList.remove('aktif'); tombol.textContent = '🎤 Ucapkan lagi';
      if (!alternatif || !alternatif.length) {
        // Tidak terdengar: belum dihitung, boleh mencoba lagi.
        $('#lt-dengar').textContent = PESAN_GALAT[galat] || 'Tidak terdengar. Tekan 🎤 lalu ucapkan dengan jelas.';
        return;
      }
      tombol.hidden = true;
      if (q.jenis === 'ucapK') { nilaiUcapKalimat(q, alternatif); return; }
      const nilai = Math.max(...q.terima.map(t => nilaiSatuKata(normFrasa(t), alternatif)));
      $('#lt-dengar').innerHTML = `Terdengar: “${esc(alternatif[0].teks.trim())}” · <b class="latih-nilai ${kelasNilai(nilai)}">${nilai}%</b>`;
      nilaiSoal(nilai >= 70, nilai >= 70 ? '' : `Yang tepat: <b>${esc(huruf1(q.target))}</b>`);
    };
    try { r.start(); } catch (e) { L.rec = null; tombol.classList.remove('aktif'); tombol.textContent = '🎤 Ucapkan'; }
  }
  function nilaiUcapKalimat(q, alternatif) {
    const h = nilaiKalimat(q, alternatif);
    const el = $('#lt-dengar');
    if (el) el.innerHTML = `Terdengar: “${esc(alternatif[0].teks.trim())}” · <b class="latih-nilai ${kelasNilai(h.persen)}">${h.persen}%</b>`;
    nilaiSoal(h.ok, h.ok ? '' : h.persen >= 60 && !h.fokusOk ? `Bagian “${esc(q.fokus)}” belum tepat.`
      : q.bacaTeks ? 'Masih ada beberapa kata yang belum terdengar tepat. Dengarkan contohnya, lalu coba lagi nanti.' : 'Masih banyak kata yang belum tepat.');
  }
  function jawabKetik() {
    const L = latih, q = L.antre[L.i];
    if (L.sudah) return;
    const mentah = ($('#lt-input').value || '').trim();
    if (q.jenis === 'ucapK') { if (!mentah) return; $('#lt-input').disabled = true; nilaiUcapKalimat(q, [{ teks: mentah, yakin: 0 }]); return; }
    const v = normFrasa(mentah);
    if (!v) return;
    if (q.persis) {
      const ok = urai(mentah).join(' ') === urai(q.target).join(' ');
      $('#lt-input').disabled = true;
      nilaiSoal(ok, ok ? '' : `Yang tepat: <b>${esc(q.target)}</b>`);
      return;
    }
    const boleh = q.terima.filter(x => !Object.values(HOMOFON).flat().includes(x) || x === q.target).map(normFrasa);
    const t = boleh.find(x => x === v) || boleh.find(x => kemiripan(v.replace(/ /g, ''), x.replace(/ /g, '')) >= 0.85);
    const ok = !!t;
    $('#lt-input').disabled = true;
    nilaiSoal(ok, ok ? (v === t ? '' : `Hampir tepat. Tulisannya: <b>${esc(t)}</b>`) : `Yang tepat: <b>${esc(huruf1(q.target))}</b>`);
  }

  function nilaiSoal(ok, keterangan) {
    const L = latih, q = L.antre[L.i];
    L.sudah = true;
    if (!q.ulang && ok) L.benar++;
    // Bila salah (Pengaturan): diulang di akhir sesi, diulang di nomor itu sampai benar, atau lanjut;
    // soal pengulangan selalu soal baru untuk kata/kalimat yang sama. Salah melebihi batasSalah()
    // mengulang sub level dari nomor 1 dengan soal baru.
    if (!ok) {
      L.salah++;
      const baru = { ...buatSoal(L.b, L.n, q.w), no: q.no, ulang: true };
      if (atur.bilaSalah === 'ulang') L.antre.splice(L.i + 1, 0, baru);
      else if (atur.bilaSalah !== 'lanjut') L.antre.push(baru);
      if (L.b.kosakata && L.n === SUB.length) tambahDek(L.b.kosakata[q.w][0], L.b.kosakata[q.w][2], true);
    }
    // Jawaban benar dan penjelasannya hanya ditampilkan (dan diperdengarkan) bila Pengaturan mengizinkan.
    const buka = ok || atur.tampilJawaban;
    L.dengar = buka ? q.suaraKunci || q.target || q.tulisSesudah || q.putar || '' : '';
    L.dariAwal = !ok && batasSalah() > 0 && L.salah > batasSalah();
    const lanjutan = ok ? '' : L.dariAwal ? `<p class="lt-batas">Sudah ${L.salah} kali salah (batas ${batasSalah()}). Sub level ini dimulai lagi dari nomor 1 dengan soal yang berbeda.</p>`
      : atur.bilaSalah === 'ulang' ? '<p class="lt-kecil">Nomor ini diulang dengan soal lain.</p>'
      : atur.bilaSalah === 'lanjut' ? '' : '<p class="lt-kecil">Soal ini diulang di akhir sesi dengan soal lain.</p>';
    $('#lt-umpan').innerHTML = `<div class="lt-umpan ${ok ? 'benar' : 'keliru'}">
        <p><b>${ok ? ambil(['✓ Benar!', '✓ Tepat!', '✓ Bagus!']) : '✗ Belum tepat.'}</b> ${buka ? keterangan || '' : ''}</p>
        ${q.tulisSesudah && buka ? `<p class="lt-kecil">Kalimatnya: “${esc(q.tulisSesudah)}”</p>` : ''}
        ${buka && q.sesudah && (!ok || q.p && q.p[0] === 'Benar') && q.jenis !== 'susun' ? `<p>Kalimat yang benar: <b>${esc(q.sesudah)}</b></p>` : ''}
        ${buka && q.alasan && (!ok || q.bahasSelalu) ? `<p class="lt-kecil">${esc(q.alasan)}</p>` : ''}
        ${lanjutan}
        <div class="lt-umpan-aksi">${L.dengar ? '<button class="tombol kecil" id="lt-suara-kunci">🔊 Dengarkan</button>' : ''}
        <button class="tombol utama kecil" id="lt-lanjut">${L.dariAwal ? '↻ Mulai lagi dari nomor 1' : 'Lanjut →'}</button></div></div>`;
    // Jawaban yang benar langsung diperdengarkan saat keliru, agar bentuk yang tepat yang diingat.
    if (!ok && buka && q.jenis !== 'ucap' && q.jenis !== 'ucapK') ucapLatih(L.dengar);
    $('#lt-lanjut').focus({ preventScroll: true });
    $('#lt-umpan').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function selesaiLatih() {
    const L = latih, b = L.b, n = L.n;
    const persen = Math.round(L.benar * 100 / L.awal);
    const d = dataSub(b);
    const rekor = !(d.s[n - 1] >= persen);
    catatHasil({ level: b.id, sub: n, jenis: 'sub', nilai: persen, rincian: { benar: L.benar, soal: L.awal, salah: L.salah, jawab: !!atur.tampilJawaban } });
    if (rekor) { d.s[n - 1] = persen; simpanSub(); }
    const lulus = persen >= TUNTAS;
    const SB = daftarSub(b);
    if (b.kosakata && n === SB.length) {
      if (lulus) b.kosakata.forEach(([k, , c]) => tambahDek(k, c, false));
      simpanDek();
    }
    const kelas = persen >= 85 ? 'baik' : persen >= 60 ? 'sedang' : 'kurang';
    const dipakai = subDipakai(b), berikut = lulusSub(b, n) ? (dipakai[dipakai.indexOf(n) + 1] || 0) : 0;
    $('#lt-isi').style.width = '100%';
    $('#lt-kotak').onclick = null;
    $('#lt-kotak').innerHTML = `<div class="hasil">
      <h2>Hasil sub level ${n}</h2>
      <div class="skor ${kelas}"><b>${persen}%</b><span>${L.benar} dari ${L.awal} benar pada percobaan pertama${rekor ? ' · 🏅 skor terbaik' : ''}</span></div>
      <p>${lulus ? (berikut ? `🎉 Lulus! Sub level ${berikut} sudah terbuka.` : b.kosakata && n === SB.length ? '🎉 Lulus! Semua kata level ini masuk Ulang kosakata.' : '🎉 Lulus!') : `Perlu ${TUNTAS}% untuk lulus. Soalnya akan berbeda saat diulang.`}</p>
      ${!berikut && tuntas(b) ? statusLevelHTML(b) : ''}
      <div class="kendali">
        ${berikut ? `<a class="tombol utama" href="#latih/${encodeURIComponent(b.id)}/${berikut}">Lanjut: ${SB[berikut - 1].ikon} ${esc(SB[berikut - 1].nama)} →</a>` : ''}
        <button class="tombol${lulus ? '' : ' utama'}" id="lt-ulangi">↻ Ulangi sub level ini</button>
        <a class="tombol" href="#baca/${encodeURIComponent(b.id)}">Kembali ke ${esc(b.judul)}</a>
      </div></div>`;
    $('#lt-ulangi').onclick = () => { tampilLatih(b, n); window.scrollTo(0, 0); };
  }

  // Bagian "Latihan bertahap" di halaman level.
  function subHTML(b) {
    if (!punyaSub(b)) return '';
    const d = skorSub[b.id] || { s: [] };
    const SB = daftarSub(b), dipakai = subDipakai(b), p = profilAktif();
    if (!dipakai.length) {
      return `<section class="sub-level"><h2>🧩 Latihan bertahap</h2>
        <p class="at-info-sub">🎯 Level ini tidak termasuk tahapan khusus <b>${esc(p ? p.nama : '')}</b>. <a href="#pengaturan/khusus">Atur tahapan</a></p></section>`;
    }
    return `<section class="sub-level">
      <h2>🧩 Latihan bertahap</h2>
      <p class="petunjuk">Pelajari ${b.pola ? 'polanya dan contoh kalimatnya' : b.kosakata ? 'kata-katanya' : 'teksnya (dengarkan dan baca)'} di atas, lalu kerjakan ${dipakai.length} sub level secara berurutan (${jumlahSoal()} soal per sub level). Tiap sub level lulus bila
        ≥ ${TUNTAS}% benar; soalnya diacak sehingga berbeda tiap kali dikerjakan.${d.lama ? ' Level ini sudah kamu tuntaskan sebelumnya, jadi semua sub level terbuka untuk mengulang.' : ''}</p>
      ${dipakai.length < SB.length ? `<p class="at-info-sub">🎯 Tahapan khusus <b>${esc(p.nama)}</b> memakai ${dipakai.length} dari ${SB.length} sub level di level ini.</p>` : ''}
      ${siapSub(b) ? '' : syaratSubHTML(b)}
      <div class="sub-daftar">${dipakai.map((n, idx) => {
        const sub = SB[n - 1], buka = terbukaSub(b, n), sk = d.s[n - 1], ok = sk >= TUNTAS;
        const isi = `<span class="sub-no">${ok ? '✓' : buka ? n : '🔒'}</span>
          <span class="kartu-isi"><span class="sub-nama">${sub.ikon} ${esc(sub.nama)}</span>
          <span class="kartu-info">${esc(sub.ket)}${sk != null ? ` · terbaik <b>${sk}%</b>` : ''}</span></span>`;
        return buka
          ? `<a class="sub-kartu${ok ? ' lulus' : ''}" href="#latih/${encodeURIComponent(b.id)}/${n}">${isi}</a>`
          : `<span class="sub-kartu kunci" title="${idx === 0 ? 'Penuhi syarat di atas dulu' : `Luluskan sub level ${dipakai[idx - 1]} dulu`}">${isi}</span>`;
      }).join('')}</div>
    </section>`;
  }
  // Daftar syarat sebelum sub level 1 (yang aktif di Pengaturan), dengan tanda yang sudah terpenuhi.
  function syaratSubHTML(b) {
    const isi = b.kosakata ? 'semua kata dan contohnya' : b.pola ? 'contoh kalimatnya' : 'teksnya';
    const daftar = [];
    if (bisaSuara && atur.harusDengar) {
      daftar.push(`<li class="${sudahDengar(b) ? 'ok' : ''}">${sudahDengar(b) ? '✓' : '🎧'} Dengarkan ${isi} dengan <b>▶ Dengarkan</b> sampai selesai.</li>`);
    }
    if (SR && atur.harusBaca) {
      daftar.push(`<li class="${sudahBaca(b) ? 'ok' : ''}">${sudahBaca(b) ? '✓' : '🎤'} Baca ${isi} dengan <b>🎤 Baca &amp; Koreksi</b> sampai selesai, akurasi minimal
        <b>${syaratBaca()}%</b>.${skorTerbaik[b.id] != null && !sudahBaca(b) ? ` Akurasi terbaikmu sekarang ${skorTerbaik[b.id]}%.` : ''}</li>`);
    }
    return `<div class="sub-syarat">🔒 Sebelum sub level 1 terbuka:<ol>${daftar.join('')}</ol></div>`;
  }

  // ---------- Saran browser ----------
  // Tampil di atas halaman bila koreksi suara tidak akan berjalan di browser ini.
  function saranBrowser() {
    let judul, isi;
    if (dalamAplikasi) {
      judul = 'Buka di ' + browserSaran + ' agar koreksi suara berjalan';
      isi = ios
        ? 'Halaman ini terbuka di dalam aplikasi (WA, IG, dll.). Ketuk ikon <b>⋯</b> atau <b>Bagikan</b>, lalu pilih <b>Buka di Safari</b>. Bisa juga salin tautan lalu tempel di Safari.'
        : 'Halaman ini terbuka di dalam aplikasi (WA, IG, dll.). Ketuk <b>⋮</b> di pojok kanan atas, lalu pilih <b>Buka di Chrome</b> atau <b>Buka di browser</b>.';
    } else if (brave) {
      judul = 'Brave memblokir pengenal suara';
      isi = 'Fitur Dengarkan tetap bisa dipakai, tetapi Baca &amp; Koreksi tidak berjalan di Brave. Buka tautan ini di <b>' + browserSaran + '</b>.';
    } else if (!SR) {
      judul = 'Browser ini belum mendukung koreksi suara';
      isi = 'Fitur Dengarkan tetap bisa dipakai. Untuk Baca &amp; Koreksi, buka tautan ini di <b>' + browserSaran + '</b>.';
    } else return;
    try { if (sessionStorage.getItem('er_tutup_saran')) return; } catch (e) { /* abaikan */ }

    const url = location.origin + location.pathname;
    const el = document.createElement('div');
    el.className = 'saran-browser';
    el.setAttribute('role', 'note');
    el.innerHTML = `<b class="saran-judul">⚠️ ${judul}</b><p>${isi}</p><div class="saran-tombol">
      ${android && dalamAplikasi ? `<a class="tombol kecil utama" href="intent://${location.host}${location.pathname}#Intent;scheme=https;package=com.android.chrome;end">Buka di Chrome</a>` : ''}
      <button class="tombol kecil" data-aksi="salin">📋 Salin tautan</button>
      <button class="tombol kecil" data-aksi="tutup">Tutup</button></div>`;
    el.onclick = e => {
      const a = e.target.closest('[data-aksi]');
      if (!a) return;
      if (a.dataset.aksi === 'tutup') {
        el.remove();
        try { sessionStorage.setItem('er_tutup_saran', '1'); } catch (er) { /* abaikan */ }
      } else {
        salinTeks(url).then(ok => { a.textContent = ok ? '✓ Tautan tersalin' : url; });
      }
    };
    layar.before(el);
  }
  function salinTeks(t) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t).then(() => true, () => salinLama(t));
    return Promise.resolve(salinLama(t));
  }
  function salinLama(t) {
    const ta = document.createElement('textarea');
    ta.value = t;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { /* abaikan */ }
    ta.remove();
    return ok;
  }

  // ---------- Tampilan ----------
  // Level = urutan bacaan di dalam tahapnya.
  function posisiLevel(b) {
    const isi = window.BACAAN.filter(x => x.tahap === b.tahap);
    const i = isi.indexOf(b);
    const semua = window.BACAAN.filter(x => x === b || levelAktif(x));
    const j = semua.indexOf(b);
    return { level: i + 1, jumlah: isi.length, sebelum: semua[j - 1] || null, sesudah: semua[j + 1] || null };
  }
  const labelLevel = b => `Tahap ${b.tahap} · Level ${posisiLevel(b).level}`;

  // Kartu "Latihan mandiri" di halaman depan: pilihan siswa sendiri (jumlah soal, tampil jawaban) dan saran guru.
  function kartuMandiri() {
    if (!AKUN || AKUN.mode !== 'mandiri' || AKUN.luring || AKUN.coba) return '';
    const p = AKUN.atur && AKUN.atur.profil, lepas = baca('er_saran_lepas', false);
    return `<section class="er-mandiri" aria-label="Pilihan latihan mandiri"><div class="er-mandiri-kepala"><span aria-hidden="true">🏠</span>
        <div><b>Latihan mandiri</b><small>Pilih sendiri materi yang ingin dilatih. Kemajuan di sini terpisah dari kemajuan resmi di kelas.</small></div></div>
      ${p && p.saran ? `<div class="er-mandiri-saran"><span>Saran guru: <b>${esc(p.nama)}</b></span>
        <button class="tombol kecil" id="er-saran-ubah">${lepas ? 'Pakai saran guru' : 'Lihat semua materi'}</button></div>` : ''}
      <div class="er-mandiri-pilih"><label>Jumlah soal per sub level <select id="er-pm-soal">${PILIHAN_SOAL_MANDIRI.map(n => `<option value="${n}"${atur.jumlahSoal === n ? ' selected' : ''}>${n} soal</option>`).join('')}</select></label>
        <label>Bila salah, jawaban benar <select id="er-pm-jawab"><option value="1"${atur.tampilJawaban ? ' selected' : ''}>ditampilkan</option><option value="0"${atur.tampilJawaban ? '' : ' selected'}>tidak ditampilkan</option></select></label></div>
    </section>`;
  }
  function ikatMandiri() {
    const simpanPilihan = () => { tulis('er_pilihan_mandiri', { jumlahSoal: +$('#er-pm-soal').value, tampilJawaban: $('#er-pm-jawab').value === '1' }); location.reload(); };
    if ($('#er-pm-soal')) { $('#er-pm-soal').onchange = simpanPilihan; $('#er-pm-jawab').onchange = simpanPilihan; }
    if ($('#er-saran-ubah')) $('#er-saran-ubah').onclick = () => { tulis('er_saran_lepas', !baca('er_saran_lepas', false)); location.reload(); };
  }
  function tampilDaftar() {
    kini = null;
    const p = profilAktif();
    layar.innerHTML = (AKUN ? `<div class="er-akun"><span class="er-akun-ikon" aria-hidden="true">👤</span>
        <span class="er-akun-isi"><b>${esc(AKUN.siswa.nama || AKUN.siswa.nisn)}</b>
          <small>${esc(AKUN.siswa.kelas || '')}${AKUN.siswa.kelas ? ' · ' : ''}${AKUN.coba ? '🧪 Uji coba guru' : AKUN.mode === 'kelas' ? '🏫 Sesi kelas' : '🏠 Latihan mandiri'}</small></span>
        <span class="er-sinkron" id="er-sinkron" role="status"></span></div>` : '') + `<header class="judul-app"><h1>📖 English Reading</h1>
        <p>Dengarkan bacaan, lalu baca sendiri dan lihat koreksinya. Mulai dari tahap yang sesuai, tuntaskan tiap level
          (skor terbaik ≥ ${TUNTAS}%), lalu naik ke tahap berikutnya.</p></header>` +
      (p ? `<a class="at-banner" href="#pengaturan/khusus"><span class="at-banner-ikon" aria-hidden="true">🎯</span>
        <span class="at-banner-isi"><small>${p.saran ? 'Saran latihan dari guru' : 'Sedang memakai tahapan khusus'}</small><b>${esc(p.nama)}</b>
          <span>${teksRingkas(ringkasTahapan(p.mati))}${p.catatan ? ' · ' + esc(p.catatan) : ''}</span></span>
        <span class="at-banner-aksi">Atur ›</span></a>` : '') + kartuMandiri() + kartuUlang() +
      window.TAHAP.map(t => {
        const semua = window.BACAAN.filter(b => b.tahap === t.no);
        const isi = semua.filter(levelAktif);
        if (!isi.length) return '';
        const jumlahTuntas = isi.filter(tuntas).length;
        return `<section class="tahap${jumlahTuntas === isi.length ? ' selesai' : ''}">
          <div class="tahap-kepala"><span class="tahap-no">${t.no}</span>
            <div><h2>${esc(t.nama)}</h2><span class="tahap-setara">${esc(t.setara)}</span></div>
            <span class="tahap-progres">${jumlahTuntas}/${isi.length} tuntas</span></div>
          <p class="tahap-fokus">${esc(t.fokus)}</p>
          <div class="daftar">${isi.map(b => {
            const i = semua.indexOf(b);
            const s = skorTerbaik[b.id];
            const jenis = jenisLevel(b);
            const ukuran = b.kosakata ? `${b.kosakata.length} kata · ${esc(b.kelompok)}` : `${(b.teks.match(/\S+/g) || []).length} kata`;
            const ok = tuntas(b);
            const sp = skorPaham[b.id];
            return `<a class="kartu${ok ? ' tuntas' : ''}" href="#baca/${encodeURIComponent(b.id)}">
              <span class="kartu-level">${ok ? '✓' : i + 1}</span>
              <span class="kartu-isi"><span class="kartu-judul">${esc(b.judul)}</span>
              <span class="kartu-info"><span class="jenis jenis-${jenis.kunci}">${jenis.nama}</span> Level ${i + 1} · ${ukuran}${punyaSub(b) ? ` · 🧩 <b>${jumlahLulusSub(b)}/${subDipakai(b).length}</b> sub level` : ''}${s != null ? ` · 🎤 <b>${s}%</b>` : ''}${sp != null ? ` · 📝 <b>${sp}%</b>` : ''}${soalDari(b) && sp == null && !punyaSub(b) ? ` · ${soalDari(b).length} soal` : ''}</span></span></a>`;
          }).join('')}</div></section>`;
      }).join('') +
      (bisaSuara ? '' : '<div class="pesan">Browser ini tidak bisa membacakan teks. Gunakan Google Chrome versi terbaru.</div>') +
      `<a class="at-pintu" href="#pengaturan"><span class="at-ikon" aria-hidden="true">⚙️</span>
        <span class="at-pintu-isi"><b>${AKUN ? 'Aturan &amp; Tahapan latihanmu' : 'Pengaturan &amp; Tahapan'}</b><small>${AKUN ? 'Diatur guru: jumlah soal, syarat dengar/baca, bila jawaban salah, dan tahapan' : `Jumlah soal, syarat dengar/baca, bila jawaban salah, dan tahapan khusus${khusus.daftar.length ? ` · ${khusus.daftar.length} tersimpan` : ''}`}</small></span>
        <span class="at-panah-kanan" aria-hidden="true">›</span></a>`;
    ikatMandiri();
  }

  const jenisLevel = b => (b.kosakata ? { kunci: 'kosakata', nama: 'Kosakata' }
    : b.pola ? { kunci: 'pola', nama: 'Pola kalimat' } : { kunci: 'bacaan', nama: 'Bacaan' });

  function kartuUlang() {
    const total = Object.keys(dek).length;
    if (!total) return '<p class="info-ulang">🔁 Kata yang sudah kamu pelajari akan masuk <b>Ulang kosakata</b> untuk diulang secara terjadwal.</p>';
    const n = jatuhTempo().length;
    const berikut = Object.values(dek).map(e => e.tempo).sort()[0];
    return `<a class="kartu-ulang${n ? ' ada' : ''}" href="#ulang"><span class="ulang-ikon">🔁</span>
      <span><b>Ulang kosakata</b><br><small>${n ? `${n} kata perlu diulang hari ini` : `Tidak ada untuk hari ini · berikutnya ${berikut}`} · ${total} kata di kotak ulang</small></span></a>`;
  }

  function tampilUlang() {
    kini = null;
    const daftar = jatuhTempo().slice(0, 15);
    layar.innerHTML = `
      <div class="bar-atas"><a href="#" class="kembali">← Daftar bacaan</a><span class="label-tingkat">${Object.keys(dek).length} kata</span></div>
      <h1 class="judul-bacaan">🔁 Ulang kosakata</h1>
      <p class="petunjuk">Tekan 🔊 untuk mendengar, lalu 🎤 dan ucapkan katanya. Ucapan ≥ 85% menaikkan kata ke kotak berikutnya
        sehingga diulang makin jarang (1, 2, 4, 7, lalu 14 hari). Yang belum tepat kembali ke kotak 1 dan diulang besok.</p>
      ${daftar.length
        ? `<div class="latih-daftar" id="daftar-ulang">${daftar.map(([n, e]) => barisLatih({ norm: n, kata: e.kata, label: 'kotak ' + e.kotak, contoh: e.contoh, dek: true })).join('')}</div>`
        : '<div class="hasil"><p>Tidak ada kata yang perlu diulang hari ini. 👍 Lanjutkan belajar level berikutnya.</p></div>'}`;
    const el = $('#daftar-ulang');
    if (el) el.onclick = klikLatih;
  }

  function navLevel(b) {
    const p = posisiLevel(b);
    return (p.sebelum ? `<a href="#baca/${encodeURIComponent(p.sebelum.id)}">← ${labelLevel(p.sebelum)}</a>` : '<span></span>') +
      (p.sesudah ? `<a href="#baca/${encodeURIComponent(p.sesudah.id)}">${labelLevel(p.sesudah)} →</a>` : '<span></span>');
  }

  function terapkanArti() {
    $('#teks').classList.toggle('tanpa-arti', !setelan.tampilArti);
    $('#t-arti').textContent = setelan.tampilArti ? 'Sembunyikan terjemahan' : 'Tampilkan terjemahan';
  }

  // ---------- Ilustrasi level (10 Okt 2026) ----------
  // Level dengan `ilustrasi` di bacaan.js mendapat gambar bantu di atas teksnya. 'jam': muka jam
  // dengan sebutan tiap 5 menit (sisi kanan past, sisi kiri to) dan tabel contoh satu jam. Ketuk
  // sebutan atau contoh: jarum jam bergerak dan kalimatnya dibacakan.
  const KATA_MENIT = { 5: 'five', 10: 'ten', 15: 'a quarter', 20: 'twenty', 25: 'twenty-five' };
  const LABEL_MENIT = { 0: "o'clock", 30: 'half past', 15: 'quarter past', 45: 'quarter to' };
  const labelMenit = m => LABEL_MENIT[m] || (m < 30 ? `${KATA_MENIT[m]} past` : `${KATA_MENIT[60 - m]} to`);
  const NAMA_JAM = ANGKA.slice(0, 13);
  function kalimatJam(h, m) {
    const j = NAMA_JAM[h], b = NAMA_JAM[h % 12 + 1];
    if (m === 0) return `It's ${j} o'clock.`;
    if (m === 30) return `It's half past ${j}.`;
    return m < 30 ? `It's ${KATA_MENIT[m]} past ${j}.` : `It's ${KATA_MENIT[60 - m]} to ${b}.`;
  }
  const digitalJam = (h, m) => `${h}:${String(m).padStart(2, '0')}`;
  function ilustrasiHTML(b) {
    if (b.ilustrasi !== 'jam') return ilustrasiLainHTML(b);
    const cx = 260, cy = 190, R = 105;
    const titik = (r, m) => [cx + r * Math.sin(m * Math.PI / 30), cy - r * Math.cos(m * Math.PI / 30)];
    let svg = `<circle class="jam-muka" cx="${cx}" cy="${cy}" r="${R}"/>
      <path class="jam-past" d="M${cx} ${cy - R} A${R} ${R} 0 0 1 ${cx} ${cy + R} Z"/>
      <path class="jam-to" d="M${cx} ${cy + R} A${R} ${R} 0 0 1 ${cx} ${cy - R} Z"/>
      <circle class="jam-bingkai" cx="${cx}" cy="${cy}" r="${R}"/>`;
    for (let i = 0; i < 60; i++) {
      const [x1, y1] = titik(R - (i % 5 ? 5 : 10), i), [x2, y2] = titik(R - 1, i);
      svg += `<line class="jam-garis${i % 5 ? '' : ' tebal'}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
    }
    for (let h = 1; h <= 12; h++) {
      const [x, y] = titik(R - 24, h * 5);
      svg += `<text class="jam-angka" x="${x.toFixed(1)}" y="${(y + 6).toFixed(1)}">${h}</text>`;
    }
    for (let m = 0; m < 60; m += 5) {
      const [x, y] = titik(R + 22, m);
      const jangkar = m === 0 || m === 30 ? 'middle' : m < 30 ? 'start' : 'end';
      const geser = m === 0 ? -6 : m === 30 ? 14 : 5;
      const [hx, hy] = titik(R - 1, m);
      svg += `<g class="jam-pilih" data-m="${m}" role="button" tabindex="0" aria-label="${labelMenit(m)}">
        <circle class="jam-sentuh" cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="13"/>
        <text class="jam-label ${m === 0 ? '' : m <= 30 ? 'l-past' : 'l-to'}" x="${x.toFixed(1)}" y="${(y + geser).toFixed(1)}" text-anchor="${jangkar}">${labelMenit(m)}</text></g>`;
    }
    svg += `<line class="jam-jarum-jam" id="jarum-jam" x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 55}"/>
      <line class="jam-jarum-menit" id="jarum-menit" x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 88}"/>
      <circle class="jam-poros" cx="${cx}" cy="${cy}" r="5"/>`;
    return `<section class="ilustrasi" id="ilustrasi-jam">
      <h2>🕒 Cara membaca jam</h2>
      <p class="ilus-ket"><span class="ket-past">past = lewat</span> (menit 1–30, sisi kanan, jam yang sekarang) ·
        <span class="ket-to">to = kurang</span> (menit 31–59, sisi kiri, jam <b>berikutnya</b>) ·
        quarter = 15 menit · half = 30 menit · “minutes” boleh disebut: ten (minutes) past two.</p>
      <svg class="jam-svg" viewBox="40 40 452 306" role="img" aria-label="Muka jam dengan sebutan tiap lima menit">${svg}</svg>
      <div class="jam-sekarang"><b id="jam-digital"></b> <span id="jam-kalimat"></span>
        <button class="tombol kecil" id="jam-putar" aria-label="Dengarkan">🔊</button></div>
      <div class="jam-atur">Contoh untuk jam <button class="tombol kecil" id="jam-kurang" aria-label="Jam sebelumnya">◀</button>
        <b id="jam-pilihan"></b> <button class="tombol kecil" id="jam-tambah" aria-label="Jam berikutnya">▶</button></div>
      <div class="jam-contoh" id="jam-contoh"></div>
      <p class="ilus-ket">Ketuk sebutan di sekeliling jam atau salah satu contoh: jarumnya bergerak dan kalimatnya dibacakan.</p>
    </section>`;
  }
  function pasangIlustrasi(b) {
    const el = $('#ilustrasi-jam');
    if (!el) { pasangIlustrasiLain(b); return; }
    const st = { h: 2, m: 0 };
    const tampil = (bicara) => {
      $('#jarum-menit').style.transform = `rotate(${st.m * 6}deg)`;
      $('#jarum-jam').style.transform = `rotate(${(st.h % 12) * 30 + st.m / 2}deg)`;
      $('#jam-digital').textContent = digitalJam(st.h, st.m);
      $('#jam-kalimat').textContent = kalimatJam(st.h, st.m);
      $('#jam-pilihan').textContent = st.h;
      el.querySelectorAll('.jam-pilih').forEach(g => g.classList.toggle('aktif', +g.dataset.m === st.m));
      el.querySelectorAll('.jam-baris').forEach(x => x.classList.toggle('aktif', +x.dataset.m === st.m));
      if (bicara) ucapLatih(kalimatJam(st.h, st.m));
    };
    const isiContoh = () => {
      $('#jam-contoh').innerHTML = Array.from({ length: 12 }, (_, i) => i * 5).map(m =>
        `<button class="jam-baris" data-m="${m}"><b>${digitalJam(st.h, m)}</b> <span>${esc(kalimatJam(st.h, m))}</span></button>`).join('');
    };
    const pilih = m => { st.m = m; tampil(true); };
    el.onclick = e => {
      const p = e.target.closest('[data-m]');
      if (p) { pilih(+p.dataset.m); return; }
      if (e.target.closest('#jam-putar')) tampil(true);
      else if (e.target.closest('#jam-kurang') || e.target.closest('#jam-tambah')) {
        st.h = (st.h + (e.target.closest('#jam-tambah') ? 0 : 10)) % 12 + 1;
        isiContoh();
        tampil(false);
      }
    };
    el.onkeydown = e => {
      const p = e.target.closest('.jam-pilih');
      if (p && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pilih(+p.dataset.m); }
    };
    isiContoh();
    tampil(false);
  }

  // Ilustrasi lain (10 Okt 2026). Tiap jenis: judul, html(b), pasang(b, el). Ketuk bagian gambar:
  // kalimatnya tampil di kotak #ilus-ucap dan dibacakan dengan kecepatan dari Pengaturan suara.
  const kataDi = b => b.kosakata.map(k => k[0]);
  const entri = (b, w) => b.kosakata.find(k => k[0] === w);
  // "twenty one" → "twenty-one" untuk tulisan (angkaKata memakai spasi agar cocok dengan pengenal suara).
  const tulisAngka = n => angkaKata(n).replace(/\b(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety) (one|two|three|four|five|six|seven|eight|nine)\b/g, '$1-$2');
  const tulisOrdinal = n => ordinalKata(n).replace(/\b(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety) (\w+)$/, '$1-$2');
  const rpTulis = n => 'Rp' + n.toLocaleString('id-ID');
  function ucapIlus(teks, arti) {
    const el = $('#ilus-ucap');
    if (el) { el.classList.remove('kosong'); el.innerHTML = `${esc(teks)}${arti ? ` <small>(${esc(arti)})</small>` : ''}`; }
    ucapLatih(teks);
  }
  const tandaiIlus = (wadah, el) => { wadah.querySelectorAll('.aktif').forEach(x => x.classList.remove('aktif')); if (el) el.classList.add('aktif'); };
  // Elemen SVG yang bisa diketuk juga bisa dipilih dengan Enter/Spasi.
  function ketukSvg(svg, sel, fn) {
    svg.onclick = e => { const g = e.target.closest(sel); if (g) fn(g); };
    svg.onkeydown = e => { const g = e.target.closest(sel); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); fn(g); } };
  }
  const HARI_EN = [['Monday', 'Senin'], ['Tuesday', 'Selasa'], ['Wednesday', 'Rabu'], ['Thursday', 'Kamis'], ['Friday', 'Jumat'], ['Saturday', 'Sabtu'], ['Sunday', 'Minggu']];
  const BULAN_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const BULAN_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const HARI_BESAR = { '0-1': 'New Year', '3-21': 'Kartini Day', '4-1': 'Labour Day', '5-1': 'Pancasila Day', '7-17': 'Independence Day',
    '9-28': 'Youth Pledge Day', '10-25': "Teachers' Day", '11-25': 'Christmas' };

  const ILUS = {
    pekan: {
      judul: '📅 Hari dalam sepekan',
      html: () => `<div class="il-pekan" id="il-pekan"></div>
        <p class="ilus-ket">Hari ini ditandai emas. Sabtu–Minggu (hijau) = <b>weekend</b>; Senin–Jumat = <b>weekday</b>.</p>`,
      pasang(b, el) {
        const w = $('#il-pekan'), ini = (new Date().getDay() + 6) % 7;
        const rel = i => (i === ini ? 'today' : i === (ini + 6) % 7 ? 'yesterday' : i === (ini + 1) % 7 ? 'tomorrow' : '');
        w.innerHTML = HARI_EN.map(([en, id], i) => `<button class="il-hari${i >= 5 ? ' libur' : ''}${i === ini ? ' ini' : ''}" data-i="${i}">
          <span class="il-tanda">${rel(i)}</span><b>${en.slice(0, 3)}</b><small>${id}</small></button>`).join('');
        w.onclick = e => {
          const t = e.target.closest('.il-hari'); if (!t) return;
          const i = +t.dataset.i, en = HARI_EN[i][0], r = rel(i);
          tandaiIlus(w, t);
          ucapIlus((r === 'today' ? `Today is ${en}.` : r === 'yesterday' ? `Yesterday was ${en}.` : r === 'tomorrow' ? `Tomorrow is ${en}.`
            : `${en} is the ${ordinalKata(i + 1)} day of the week.`) + (i >= 5 ? ' It is the weekend.' : ''), HARI_EN[i][1]);
        };
      }
    },
    kalender: {
      judul: '🗓️ Kalender',
      html: () => `<div class="il-pita" id="il-pita"></div><div class="il-kal" id="il-kal"></div>
        <p class="ilus-ket">Ketuk bulan atau tanggal. Tanggal dibaca dengan bilangan bertingkat: <b>the seventeenth of August</b>. Tanggal bertanda merah muda = hari besar.</p>`,
      pasang() {
        const kini = new Date(), th = kini.getFullYear();
        let bln = kini.getMonth();
        const pita = $('#il-pita'), kal = $('#il-kal');
        const gambar = () => {
          pita.innerHTML = BULAN_EN.map((en, i) => `<button data-b="${i}" class="${i === bln ? 'aktif' : ''}">${en.slice(0, 3)}</button>`).join('');
          const awal = (new Date(th, bln, 1).getDay() + 6) % 7, jml = new Date(th, bln + 1, 0).getDate();
          let h = HARI_EN.map(([en]) => `<span class="il-nama">${en.slice(0, 3)}</span>`).join('') + '<span></span>'.repeat(awal);
          for (let d = 1; d <= jml; d++) {
            const k = [bln === kini.getMonth() && d === kini.getDate() ? 'hariini' : '', (awal + d - 1) % 7 === 6 ? 'minggu' : '', HARI_BESAR[bln + '-' + d] ? 'besar' : ''].join(' ');
            h += `<button class="${k}" data-d="${d}">${d}</button>`;
          }
          kal.innerHTML = h;
        };
        pita.onclick = e => {
          const t = e.target.closest('[data-b]'); if (!t) return;
          bln = +t.dataset.b; gambar();
          ucapIlus(`${BULAN_EN[bln]} is the ${ordinalKata(bln + 1)} month of the year.`, BULAN_ID[bln]);
        };
        kal.onclick = e => {
          const t = e.target.closest('[data-d]'); if (!t) return;
          const d = +t.dataset.d, hari = HARI_EN[(new Date(th, bln, d).getDay() + 6) % 7][0], besar = HARI_BESAR[bln + '-' + d];
          tandaiIlus(kal, t);
          ucapIlus(`It's ${hari}, the ${tulisOrdinal(d)} of ${BULAN_EN[bln]}.` + (besar ? ` It is ${besar}.` : ''), `${d} ${BULAN_ID[bln]}`);
        };
        gambar();
      }
    },
    belanja: {
      judul: '🛒 Toko sekolah',
      html: () => `<div class="il-toko"><div class="il-rak" id="il-rak"></div><div class="il-struk" id="il-struk"></div></div>
        <p class="ilus-ket">Ketuk barang untuk bertanya harganya dan memasukkannya ke struk, lalu bayar untuk melihat kembaliannya (<b>change</b>).</p>`,
      pasang() {
        const BARANG = [['📒', 'notebook', 5000], ['✏️', 'pencil', 2000], ['📏', 'ruler', 3000], ['🍞', 'bread', 8000],
          ['🥤', 'bottle of water', 4000], ['🍦', 'ice cream', 10000], ['🎒', 'bag', 150000], ['👟', 'pair of shoes', 250000]];
        const rak = $('#il-rak'), struk = $('#il-struk');
        let isi = [];
        const total = () => isi.reduce((a, i) => a + BARANG[i][2], 0);
        rak.innerHTML = BARANG.map(([e, n, h], i) => `<button class="il-barang" data-i="${i}"><span class="il-em">${e}</span><b>${n}</b><span class="il-harga">${rpTulis(h)}</span></button>`).join('');
        const gambar = bayar => {
          struk.innerHTML = `<h4>TOKO SEKOLAH</h4>${isi.length ? isi.map(i => `<div class="il-baris"><span>${BARANG[i][1]}</span><span>${BARANG[i][2].toLocaleString('id-ID')}</span></div>`).join('') : '<div class="il-baris"><span>(kosong)</span></div>'}
            <hr><div class="il-baris"><b>TOTAL</b><b>${total().toLocaleString('id-ID')}</b></div>
            ${bayar ? `<div class="il-baris"><span>PAY</span><span>${bayar.toLocaleString('id-ID')}</span></div><div class="il-baris"><b>CHANGE</b><b>${(bayar - total()).toLocaleString('id-ID')}</b></div>` : ''}
            <div class="il-aksi">${[50000, 100000, 500000].map(v => `<button data-bayar="${v}">Pay ${rpTulis(v)}</button>`).join('')}<button data-hapus>Clear</button></div>`;
        };
        rak.onclick = e => {
          const t = e.target.closest('.il-barang'); if (!t) return;
          const [, n, h] = BARANG[+t.dataset.i];
          isi.push(+t.dataset.i); gambar();
          ucapIlus(`How much is the ${n}? It costs ${tulisAngka(h)} rupiah.`, rpTulis(h));
        };
        struk.onclick = e => {
          if (e.target.closest('[data-hapus]')) { isi = []; gambar(); return; }
          const t = e.target.closest('[data-bayar]'); if (!t) return;
          const tot = total(), bayar = +t.dataset.bayar;
          if (!tot) { ucapIlus('Please choose something to buy first.', 'pilih barang dulu'); return; }
          if (bayar < tot) { gambar(); ucapIlus(`Sorry, the total is ${tulisAngka(tot)} rupiah. ${huruf1(tulisAngka(bayar))} rupiah is not enough.`, 'uangnya kurang'); return; }
          gambar(bayar);
          ucapIlus(`The total is ${tulisAngka(tot)} rupiah. Here is your change: ${tulisAngka(bayar - tot)} rupiah.`, `kembalian ${rpTulis(bayar - tot)}`);
        };
        gambar();
      }
    },
    tubuh: {
      judul: '🧍 Anggota tubuh',
      // [kata, titik x, y, label x, y, rata]
      LABEL: [['head', 200, 30, 330, 22, 'end'], ['eye', 212, 55, 330, 52, 'end'], ['nose', 199, 66, 330, 80, 'end'], ['mouth', 205, 79, 330, 108, 'end'],
        ['stomach', 215, 160, 330, 160, 'end'], ['foot', 230, 268, 330, 276, 'end'], ['ear', 166, 60, 70, 52, 'start'], ['arm', 152, 148, 70, 128, 'start'],
        ['hand', 132, 192, 70, 200, 'start'], ['leg', 178, 232, 70, 244, 'start']],
      html(b) {
        const ada = kataDi(b);
        return `<svg class="il-svg" viewBox="0 0 400 290" id="il-tubuh" role="img" aria-label="Gambar tubuh dengan label">
          <rect class="il-baju" x="168" y="102" width="64" height="88" rx="16"/>
          <path class="il-kulit" d="M170 112 L132 178 L142 184 L178 124 Z"/><path class="il-kulit" d="M230 112 L268 178 L258 184 L222 124 Z"/>
          <circle class="il-kulit" cx="136" cy="188" r="11"/><circle class="il-kulit" cx="264" cy="188" r="11"/>
          <rect class="il-celana" x="172" y="186" width="24" height="76" rx="8"/><rect class="il-celana" x="204" y="186" width="24" height="76" rx="8"/>
          <ellipse class="il-tinta" cx="180" cy="268" rx="18" ry="8"/><ellipse class="il-tinta" cx="220" cy="268" rx="18" ry="8"/>
          <rect class="il-kulit" x="190" y="88" width="20" height="18" rx="4"/>
          <ellipse class="il-kulit" cx="168" cy="58" rx="7" ry="11"/><ellipse class="il-kulit" cx="232" cy="58" rx="7" ry="11"/>
          <circle class="il-kulit" cx="200" cy="56" r="33"/>
          <path class="il-tinta" d="M168 46 Q200 8 232 46 Q216 30 200 32 Q184 30 168 46 Z"/>
          <circle class="il-tinta" cx="188" cy="55" r="3.5"/><circle class="il-tinta" cx="212" cy="55" r="3.5"/>
          <path class="il-garis" d="M200 58 L196 68 L202 69"/><path class="il-garis" d="M189 76 Q200 84 211 76"/>
          ${this.LABEL.filter(l => ada.includes(l[0])).map(([k, x, y, lx, ly, r]) => `<g class="il-ketuk" data-k="${esc(k)}" tabindex="0" role="button" aria-label="${esc(k)}">
            <line class="il-garis-label" x1="${x}" y1="${y}" x2="${r === 'end' ? lx - 46 : lx + 40}" y2="${ly - 5}"/>
            <circle class="il-titik" cx="${x}" cy="${y}" r="4"/>
            <text class="il-label" x="${r === 'end' ? lx + 54 : lx - 52}" y="${ly}" text-anchor="${r}">${esc(k)}</text></g>`).join('')}</svg>`;
      },
      pasang(b) {
        const s = $('#il-tubuh');
        ketukSvg(s, '.il-ketuk', g => { const k = entri(b, g.dataset.k); tandaiIlus(s, g); ucapIlus(`This is my ${k[0]}.`, k[1]); });
      }
    },
    kisi: {
      judul: '👆 Ketuk gambarnya',
      html: b => `<div class="il-kisi" id="il-kisi">${b.kosakata.filter(k => (b.ikon || {})[k[0]]).map(k =>
        `<button class="il-ikon" data-k="${esc(k[0])}"><span class="il-em" aria-hidden="true">${b.ikon[k[0]]}</span><b>${esc(k[0])}</b></button>`).join('')}</div>
        ${b.catatanIlus ? `<p class="ilus-ket">${esc(b.catatanIlus)}</p>` : ''}`,
      pasang(b) {
        const w = $('#il-kisi');
        w.onclick = e => { const t = e.target.closest('.il-ikon'); if (!t) return; const k = entri(b, t.dataset.k); tandaiIlus(w, t); ucapIlus(k[2], `${k[0]} = ${k[1]}`); };
      }
    },
    denah: {
      judul: '🏠 Denah rumah',
      RUANG: { 'garden': [10, 10, 80, 240, '🌳'], 'terrace': [90, 10, 90, 70, '🪑'], 'study room': [90, 80, 90, 90, '📚'], 'bedroom': [90, 170, 90, 80, '🛏️'],
        'living room': [180, 10, 130, 110, '🛋️'], 'dining room': [180, 120, 130, 70, '🍽️'], 'kitchen': [180, 190, 70, 60, '🍳'], 'bathroom': [250, 190, 60, 60, '🛁'],
        'garage': [310, 10, 80, 110, '🚗'], 'prayer room': [310, 120, 80, 130, '🕌'] },
      html(b) {
        return `<svg class="il-svg" viewBox="0 0 400 260" id="il-denah" role="img" aria-label="Denah rumah">${kataDi(b).filter(k => this.RUANG[k]).map(k => {
          const [x, y, w, h, e] = this.RUANG[k];
          return `<g class="il-ruang il-ketuk" data-k="${esc(k)}" tabindex="0" role="button" aria-label="${esc(k)}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/>
            <text class="il-em-svg" x="${x + w / 2}" y="${y + h / 2 + 2}" text-anchor="middle">${e}</text>
            <text class="il-label kecil" x="${x + w / 2}" y="${y + h / 2 + 22}" text-anchor="middle">${esc(k)}</text></g>`;
        }).join('')}</svg>`;
      },
      pasang(b) {
        const s = $('#il-denah');
        ketukSvg(s, '.il-ruang', g => { const k = entri(b, g.dataset.k); tandaiIlus(s, g); ucapIlus(`This is the ${k[0]}. ${k[2]}`, k[1]); });
      }
    },
    preposisi: {
      judul: '📦 Di mana bolanya?',
      POS: { 'in': [214, 104, 18], 'on': [214, 62, 22], 'under': [200, 190, 22], 'next to': [320, 168, 22], 'behind': [238, 78, 22], 'in front of': [200, 192, 26], 'between': [214, 168, 22] },
      html(b) {
        const kotak = id => `<g id="${id}"><path class="il-kotak-atas" d="M150 110 L180 85 L280 85 L250 110 Z"/><path class="il-kotak-dalam" d="M160 106 L183 89 L270 89 L247 106 Z"/>
          <path class="il-kotak" d="M250 110 L280 85 L280 165 L250 190 Z"/><rect class="il-kotak" x="150" y="110" width="100" height="80"/></g>`;
        return `<div class="il-pilih" id="il-prep">${kataDi(b).filter(k => this.POS[k]).map(k => `<button data-k="${esc(k)}">${esc(k)}</button>`).join('')}</div>
          <svg class="il-svg" viewBox="0 0 400 220" id="il-prep-svg" role="img" aria-label="Bola dan kotak">
            <line class="il-lantai" x1="10" y1="212" x2="390" y2="212"/><g id="il-blk"></g>${kotak('il-k1')}<g id="il-k2wadah" style="display:none">${kotak('il-k2')}</g>
            <g id="il-dpn"><circle class="il-bola" id="il-bola" cx="0" cy="0" r="22" style="transform: translate(320px, 168px)"/></g><g id="il-tutup"></g></svg>`;
      },
      pasang(b) {
        const P = this.POS, s = $('#il-prep-svg'), w = $('#il-prep'), bola = $('#il-bola');
        w.onclick = e => {
          const t = e.target.closest('[data-k]'); if (!t) return;
          const k = t.dataset.k, [x, y, r] = P[k], dua = k === 'between';
          $('#il-k1').setAttribute('transform', dua ? 'translate(-95 0)' : '');
          $('#il-k2wadah').style.display = dua ? '' : 'none';
          $('#il-k2').setAttribute('transform', 'translate(95 0)');
          bola.style.display = k === 'under' ? 'none' : '';
          bola.setAttribute('r', r);
          $(k === 'behind' ? '#il-blk' : '#il-dpn').appendChild(bola);
          bola.style.transform = `translate(${x}px, ${y}px)`;
          // "in": sisi depan kotak digambar ulang di atas bola agar bola tampak di dalam.
          $('#il-tutup').innerHTML = k === 'in' ? '<rect class="il-kotak" x="150" y="110" width="100" height="80"/>' : '';
          tandaiIlus(w, t);
          const kal = k === 'between' ? 'The ball is between the boxes.' : `The ball is ${k} the box.`;
          ucapIlus(kal + (k === 'under' ? ' We cannot see it.' : ''), entri(b, k)[1]);
        };
      }
    },
    warna: {
      judul: '🎨 Palet warna',
      WARNA: { red: ['#E53935', '🍎'], blue: ['#1E73D8', '🌊'], green: ['#2E9E5B', '🍃'], yellow: ['#F7C51E', '🍌'], black: ['#1B1B1B', '🐈‍⬛'], white: ['#FFFFFF', '🥛'],
        orange: ['#F57C1F', '🍊'], purple: ['#8E44AD', '🍇'], brown: ['#8D5524', '🍫'], pink: ['#F48FB1', '🌸'] },
      html(b) {
        return `<div class="il-palet" id="il-palet">${kataDi(b).filter(k => this.WARNA[k]).map(k => `<button class="il-warna" data-k="${k}">
          <i style="background:${this.WARNA[k][0]}"></i><b>${k} ${this.WARNA[k][1]}</b></button>`).join('')}</div>`;
      },
      pasang(b) {
        const w = $('#il-palet');
        w.onclick = e => { const t = e.target.closest('.il-warna'); if (!t) return; const k = entri(b, t.dataset.k); tandaiIlus(w, t); ucapIlus(`This is ${k[0]}. ${k[2]}`, k[1]); };
      }
    },
    keluarga: {
      judul: '👪 Pohon keluarga',
      // [kata, x, y, emoji, kalimat]
      ORANG: [['grandfather', 190, 34, '👴'], ['grandmother', 300, 34, '👵'], ['father', 70, 130, '👨'], ['mother', 165, 130, '👩'], ['uncle', 335, 130, '🧔'], ['aunt', 430, 130, '👩‍🦱'],
        ['brother', 50, 228, '👦'], ['me', 145, 228, '🧑'], ['sister', 240, 228, '👧'], ['son', 335, 228, '👦'], ['daughter', 430, 228, '👧']],
      html() {
        return `<svg class="il-svg" viewBox="0 0 480 262" id="il-pohon" role="img" aria-label="Pohon keluarga">
          <path class="il-garis-kel" d="M233 34 H257 M113 130 H122 M378 130 H387 M245 34 V84 H70 V104 M245 84 H335 V104 M117 130 V178 H50 V202 M117 178 H240 V202 M145 178 V202 M382 130 V178 H335 V202 M382 178 H430 V202"/>
          ${this.ORANG.map(([n, x, y, e]) => `<g class="il-orang il-ketuk${n === 'me' ? ' aku' : ''}" data-k="${n}" tabindex="0" role="button" aria-label="${n}">
            <rect x="${x - 43}" y="${y - 26}" width="86" height="56" rx="12"/><text class="il-em-svg" x="${x}" y="${y + 2}" text-anchor="middle">${e}</text>
            <text class="il-label kecil" x="${x}" y="${y + 22}" text-anchor="middle">${n}</text></g>`).join('')}</svg>
          <p class="ilus-ket"><b>son</b> dan <b>daughter</b> di sini adalah anak paman dan bibi (sepupu “aku”).</p>`;
      },
      pasang(b) {
        const s = $('#il-pohon');
        const KAL = { me: ['This is me!', 'aku'], son: ["This is my uncle's son.", 'anak laki-laki paman'], daughter: ["This is my uncle's daughter.", 'anak perempuan paman'] };
        ketukSvg(s, '.il-orang', g => {
          const n = g.dataset.k, k = entri(b, n);
          tandaiIlus(s, g);
          const [kal, arti] = KAL[n] || [`This is my ${n}.`, k ? k[1] : ''];
          ucapIlus(kal, arti);
        });
      }
    },
    peta: {
      judul: '🗺️ Peta kecil',
      // [kata, x, y, emoji, rute, kalimat]
      TEMPAT: [['home', 60, 200, '🏠', '', 'This is my home.'],
        ['school', 200, 140, '🏫', 'M60 200 H200 V160', 'Go straight, then turn left. The school is on your right. It is near.'],
        ['mosque', 330, 225, '🕌', 'M60 200 H310', 'Go straight. The mosque is on your right, near the corner.'],
        ['market', 270, 45, '🏪', 'M60 200 H200 V70 H250', 'Go straight, turn left, then turn right. The market is on your left.'],
        ['hospital', 360, 130, '🏥', 'M60 200 H330 V150', 'Go straight, then turn left at the second corner. The hospital is on your right. It is far.'],
        ['library', 120, 45, '📚', 'M60 200 H200 V70 H140', 'Go straight, turn left, then turn left again. The library is on your right.']],
      html() {
        return `<svg class="il-svg" viewBox="0 0 400 285" id="il-peta" role="img" aria-label="Peta kecil">
          <path class="il-jalan" d="M20 200 H380 M200 200 V70 M20 70 H380 M330 200 V70"/><path class="il-jalan-garis" d="M20 200 H380 M200 200 V70 M20 70 H380 M330 200 V70"/>
          <path class="il-rute" id="il-rute" d=""/>
          ${this.TEMPAT.map(([n, x, y, e]) => `<g class="il-tempat il-ketuk" data-k="${n}" tabindex="0" role="button" aria-label="${n}">
            <circle cx="${x}" cy="${y}" r="22"/><text class="il-em-svg" x="${x}" y="${y + 9}" text-anchor="middle">${e}</text>
            <text class="il-label kecil" x="${x}" y="${y + 38}" text-anchor="middle">${n}</text></g>`).join('')}</svg>
          <p class="ilus-ket">Ketuk tujuan untuk melihat rute dari rumah: <b>turn left</b> (belok kiri), <b>turn right</b> (belok kanan), <b>near</b> (dekat), <b>far</b> (jauh).</p>`;
      },
      pasang(b) {
        const s = $('#il-peta'), T = this.TEMPAT;
        ketukSvg(s, '.il-tempat', g => {
          const t = T.find(x => x[0] === g.dataset.k), k = entri(b, t[0]);
          $('#il-rute').setAttribute('d', t[4]);
          tandaiIlus(s, g);
          ucapIlus(t[5], k ? `ke ${k[1]}` : '');
        });
      }
    }
  };
  function ilustrasiLainHTML(b) {
    const f = ILUS[b.ilustrasi];
    if (!f) return '';
    return `<section class="ilustrasi" id="ilustrasi"><h2>${f.judul}</h2>${f.html(b)}
      <div class="ilus-ucap kosong" id="ilus-ucap">Ketuk bagian gambar untuk mendengar kalimatnya.</div></section>`;
  }
  function pasangIlustrasiLain(b) {
    const f = ILUS[b.ilustrasi];
    if (f && $('#ilustrasi')) f.pasang(b, $('#ilustrasi'));
  }

  function tampilBaca(b) {
    const p = pecah(b.teks, b.arti);
    kini = { b, kalimat: p.kalimat, kata: p.kata, pilihK: 0, sejajar: p.sejajar, didengar: new Set() };
    // Kosakata: kalimat genap = kata (titik akhirnya disembunyikan, arti selalu tampil), ganjil = contoh.
    const kalHTML = (kal, k, kata) => `<div class="kal${kata ? ' kal-kata' : ''}${kal.paragrafBaru ? ' paragraf-baru' : ''}" data-k="${k}"><div class="kal-en">` +
      kal.kata.map((w, j) => {
        const tampil = kata && j === kal.kata.length - 1 ? w.asli.replace(/\.$/, '') : w.asli;
        const isi = w.i >= 0 ? `<span class="kata" data-w="${w.i}"><span class="k-teks">${esc(tampil)}</span><span class="k-skor"></span></span>` : esc(tampil);
        const jeda = j < kal.kata.length - 1 && !w.asli.endsWith('-') ? ' ' : '';
        return isi + jeda;
      }).join('') + `</div>${kal.arti ? `<div class="kal-id${kata ? ' arti-kata' : ''}">${esc(kata ? kal.arti.replace(/\.$/, '') : kal.arti)}</div>` : ''}</div>`;
    let teksHTML;
    if (b.kosakata && p.sejajar) {
      teksHTML = '';
      for (let k = 0; k < p.kalimat.length; k += 2) {
        teksHTML += `<div class="kartu-kosa">${kalHTML(p.kalimat[k], k, true)}${p.kalimat[k + 1] ? kalHTML(p.kalimat[k + 1], k + 1, false) : ''}</div>`;
      }
    } else {
      teksHTML = p.kalimat.map((kal, k) => kalHTML(kal, k, false)).join('') +
        (p.sejajar ? '' : `<div class="kal-id arti-utuh">${esc(b.arti)}</div>`);
    }
    const petunjuk = esc(petunjukAwal(b));

    layar.innerHTML = `
      <div class="bar-atas"><a href="#" class="kembali">← Daftar bacaan</a><span class="label-tingkat">${labelLevel(b)}</span></div>
      <h1 class="judul-bacaan">${esc(b.judul)}</h1>
      ${b.kelompok ? `<p class="sub-judul">Kosakata · ${esc(b.kelompok)}</p>` : ''}
      ${ilustrasiHTML(b)}
      ${b.pola ? `<div class="kotak-pola"><span class="pola-label">Pola</span><div class="pola-rumus">${esc(b.pola)}</div><p>${esc(b.catatan || '')}</p></div>` : ''}
      <div class="kendali">
        <button id="t-putar" class="tombol utama"${bisaSuara ? '' : ' disabled'}>▶ Dengarkan</button>
        <button id="t-henti" class="tombol" hidden>⏹ Berhenti</button>
        <button id="t-rekam" class="tombol rekam">🎤 Baca &amp; Koreksi</button>
      </div>
      <div class="setelan">
        <label>Kecepatan <select id="pilih-laju">${LAJU.map(([v, t]) => `<option value="${v}"${v === setelan.laju ? ' selected' : ''}>${t}</option>`).join('')}</select></label>
        <label>Suara <select id="pilih-suara"></select></label>
        <button id="t-arti" class="tautan"></button>
      </div>
      <p class="petunjuk" id="petunjuk">${petunjuk}</p>
      <div class="kotak-grafik" id="kotak-grafik" hidden>
        <canvas id="grafik" aria-label="Grafik suara yang tertangkap mikrofon"></canvas>
        <div class="status-grafik" id="status-grafik"></div>
      </div>
      <div class="teks${b.kosakata ? ' mode-kosakata' : ''}" id="teks">${teksHTML}</div>
      <div class="legenda" id="legenda" hidden><span class="l-benar">≥ 85% baik</span><span class="l-sedang">60–84% cukup</span><span class="l-salah">&lt; 60% perlu dilatih</span><span class="l-lewat">belum dibaca</span></div>
      <div id="hasil"></div>
      ${subHTML(b)}
      ${punyaSub(b) ? '' : soalHTML(b)}
      <nav class="nav-level">${navLevel(b)}</nav>`;

    p.kalimat.forEach((kal, k) => { kal.el = layar.querySelector(`.kal[data-k="${k}"]`); });
    p.kata.forEach(w => { w.el = layar.querySelector(`.kata[data-w="${w.i}"]`); });
    if (bisaSuara) isiPilihSuara($('#pilih-suara'));
    else $('#pilih-suara').closest('label').hidden = true;
    terapkanArti();

    $('#t-putar').onclick = () => mulaiPutar(kini.pilihK);
    $('#t-henti').onclick = hentikanSuara;
    $('#t-rekam').onclick = () => (rekam ? hentikanRekam() : mulaiRekam());
    $('#t-arti').onclick = () => { setelan.tampilArti = !setelan.tampilArti; simpanSetelan(); terapkanArti(); };
    $('#pilih-laju').onchange = e => { setelan.laju = +e.target.value; setelan.lajuDipilih = true; simpanSetelan(); };
    $('#pilih-suara').onchange = e => { setelan.suara = e.target.value; simpanSetelan(); };
    $('#teks').onclick = e => {
      const el = e.target.closest('.kata');
      if (!el || rekam) return;
      const w = kini.kata[+el.dataset.w];
      pilihKalimat(w.k);
      ucapKata(w.asli, w);
    };
    $('#hasil').onclick = klikLatih;
    pasangSoal();
    pasangIlustrasi(b);
  }

  // ---------- Pengaturan & Tahapan (10 Okt 2026) ----------
  // Meniru Matdas. Umum: aturan bawaan perangkat, semua tahap/level/sub level dipakai. Khusus: profil bernama;
  // aturan yang diisi menimpa Umum satu per satu, dan centang tahap → level → sub level menentukan materi yang dipakai.
  // Tanpa database: profil disimpan di perangkat (er_khusus) dan dibagikan guru sebagai tautan #khusus=<kode>.
  const DEF_ATUR = { jumlahSoal: 10, harusDengar: true, harusBaca: true, syaratBaca: 75, tampilJawaban: true, bilaSalah: 'akhir', batasSalah: 0 };
  const umum = k => (setelan[k] == null ? DEF_ATUR[k] : setelan[k]);
  const PILIHAN_ATUR = {
    jumlahSoal: { label: 'Jumlah soal per sub level', pendek: 'Soal', opsi: () => PILIHAN_JUMLAH.map(v => [v, `${v} soal`]) },
    harusDengar: { label: 'Mendengar teks sebelum sub level 1', pendek: 'Dengar', opsi: () => [[true, 'Harus Dengar'], [false, 'Tanpa Dengar']] },
    harusBaca: { label: 'Membaca teks sebelum sub level 1', pendek: 'Baca', opsi: () => [[true, 'Harus Baca'], [false, 'Tanpa Baca']] },
    syaratBaca: { label: 'Akurasi membaca minimal', pendek: 'Akurasi', opsi: () => PILIHAN_SYARAT_BACA.map(v => [v, `${v}%`]) },
    tampilJawaban: { label: 'Jawaban benar dan penjelasannya', pendek: 'Jawaban', opsi: () => [[true, 'Ditampilkan'], [false, 'Tidak ditampilkan']] },
    bilaSalah: { label: 'Soal yang dijawab salah', pendek: 'Bila salah', opsi: () => [['akhir', 'Diulang di akhir sesi'], ['ulang', 'Diulang di nomor itu sampai benar'], ['lanjut', 'Maju terus, tidak diulang']] },
    batasSalah: { label: 'Batas salah dalam satu sub level', pendek: 'Batas salah', opsi: () => PILIHAN_BATAS_SALAH.map(v => [v, v ? `lebih dari ${v} kali, mulai lagi` : 'Tanpa batas']) }
  };
  const KELOMPOK_ATUR = [
    { ikon: '🧩', judul: 'Latihan bertahap', ket: 'Makin banyak soal, makin yakin penguasaannya. Kata dan kalimat yang sama muncul lagi dalam bentuk soal lain.', kunci: ['jumlahSoal'] },
    { ikon: '🔐', judul: 'Syarat sebelum sub level 1', ket: 'Teks level didengarkan dan/atau dibaca dulu. Level yang sub levelnya sudah mulai dikerjakan tidak terkunci lagi.', kunci: ['harusDengar', 'harusBaca', 'syaratBaca'] },
    { ikon: '🔁', judul: 'Bila jawaban salah', ket: 'Pengulangan selalu memakai soal baru. Nilai lulus dihitung dari percobaan pertama tiap nomor.', kunci: ['tampilJawaban', 'bilaSalah', 'batasSalah'] }
  ];
  const teksNilai = (k, v) => ((PILIHAN_ATUR[k].opsi().find(([x]) => x === v) || [null, String(v)])[1]);
  const nilaiKetik = (k, s) => (s === '' ? null : typeof DEF_ATUR[k] === 'boolean' ? s === 'true' : typeof DEF_ATUR[k] === 'number' ? +s : s);
  const tog = (arr, v, nyala) => { const i = arr.indexOf(v); if (nyala && i >= 0) arr.splice(i, 1); else if (!nyala && i < 0) arr.push(v); };

  // Ringkasan materi yang dipakai oleh sekumpulan "mati" (null = Umum).
  function ringkasTahapan(m) {
    let tahap = 0, level = 0, sub = 0;
    window.TAHAP.forEach(t => {
      let ada = false;
      window.BACAAN.filter(b => b.tahap === t.no).forEach(b => {
        if (!levelOn(m, b)) return;
        level++; ada = true;
        if (punyaSub(b)) sub += subDipakaiM(m, b).length;
      });
      if (ada) tahap++;
    });
    return { tahap, level, sub };
  }
  const teksRingkas = r => `${r.tahap} tahap · ${r.level} level · ${r.sub} sub level`;
  const chipAturan = p => {
    const isi = Object.entries(p.setelan || {}).filter(([k, v]) => v != null && PILIHAN_ATUR[k]);
    return isi.length ? isi.map(([k, v]) => `<span class="at-chip at-chip-atur">${PILIHAN_ATUR[k].pendek}: ${esc(teksNilai(k, v))}</span>`).join('')
      : '<span class="at-chip at-chip-redup">Aturan ikut Umum</span>';
  };

  // Kode tautan: JSON ringkas → base64url (aman untuk huruf non-ASCII).
  function kodeProfil(p) {
    const m = p.mati || {};
    const o = { v: 1, id: p.id, n: p.nama, c: p.catatan || '', s: p.setelan || {},
      m: { t: m.tahap || [], l: m.level || [], s: Object.fromEntries(Object.entries(m.sub || {}).filter(([, x]) => x.length)) } };
    return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function bukaKode(kode) {
    const o = JSON.parse(decodeURIComponent(escape(atob(kode.replace(/-/g, '+').replace(/_/g, '/')))));
    if (!o || o.v !== 1 || !o.id || !o.n) return null;
    const s = {};
    Object.keys(PILIHAN_ATUR).forEach(k => { if (o.s && o.s[k] != null) s[k] = o.s[k]; });
    return { id: String(o.id), nama: String(o.n).slice(0, 60), catatan: String(o.c || '').slice(0, 200), setelan: s,
      mati: { tahap: (o.m && o.m.t) || [], level: (o.m && o.m.l) || [], sub: (o.m && o.m.s) || {} } };
  }
  const tautanProfil = p => `${location.origin}${location.pathname}#khusus=${kodeProfil(p)}`;

  // Contoh siap pakai sebagai titik awal.
  function matiKecuali(tahapDipakai, subMati) {
    const m = { tahap: window.TAHAP.map(t => t.no).filter(n => !tahapDipakai.includes(n)), level: [], sub: {} };
    if (subMati) window.BACAAN.filter(b => tahapDipakai.includes(b.tahap) && punyaSub(b) && daftarSub(b).length >= 10).forEach(b => { m.sub[b.id] = subMati.slice(); });
    return m;
  }
  const CONTOH = [
    { kode: 'tka', ikon: '🎓', nama: 'Persiapan TKA', ket: 'Level TKA saja, sub level 6–10 sesuai kisi-kisi ujian, 20 soal per sub level.',
      buat: () => ({ setelan: { jumlahSoal: 20 }, mati: matiKecuali([4], [1, 2, 3, 4, 5]) }) },
    { kode: 'utbk', ikon: '🏛️', nama: 'Persiapan UTBK/SNBT', ket: 'Level UTBK/SNBT saja, sub level 6–10, 20 soal per sub level.',
      buat: () => ({ setelan: { jumlahSoal: 20 }, mati: matiKecuali([5], [1, 2, 3, 4, 5]) }) },
    { kode: 'fondasi', ikon: '🌱', nama: 'Fondasi', ket: 'Kosakata dasar dan kalimat sederhana (Tahap 0–1) untuk siswa yang baru mulai.',
      buat: () => ({ setelan: {}, mati: matiKecuali([0, 1]) }) },
    { kode: 'genre', ikon: '📚', nama: 'Teks Fungsional & Genre', ket: 'Tahap 2–3: teks pendek dan genre teks, bekal ke Level TKA.',
      buat: () => ({ setelan: {}, mati: matiKecuali([2, 3]) }) }
  ];

  function kepalaAtur(tab) {
    const p = profilAktif(), r = ringkasTahapan(p ? p.mati : null);
    return `<div class="bar-atas"><a href="#" class="kembali">← Daftar bacaan</a><span class="label-tingkat">Pengaturan</span></div>
      <header class="at-kepala"><span class="at-alis">${AKUN ? 'Diatur guru' : 'Berlaku di perangkat ini'}</span><h1>${AKUN ? 'Aturan &amp; Tahapan Latihanmu' : 'Pengaturan &amp; Tahapan'}</h1>
        <p>${AKUN ? 'Aturan latihan dan materi yang dipakai diatur gurumu. Halaman ini menampilkan yang berlaku untukmu.'
          : 'Atur cara latihan dan materi yang dipakai. <b>Umum</b> berlaku selama tidak ada tahapan khusus yang dipakai.'}</p></header>
      <section class="at-berlaku${p ? ' khusus' : ''}" aria-live="polite">
        <span class="at-berlaku-ikon" aria-hidden="true">${p ? '🎯' : '🌐'}</span>
        <div class="at-berlaku-isi"><small>Yang berlaku sekarang</small><b>${p ? esc(p.nama) : 'Pengaturan &amp; Tahapan Umum'}</b>
          <span>${teksRingkas(r)}</span></div>
        ${AKUN ? '' : p ? '<button class="tombol kecil" data-aksi="pakai-umum">Kembali ke Umum</button>'
          : khusus.daftar.length && tab !== 'khusus' ? '<a class="tombol kecil" href="#pengaturan/khusus">Pakai tahapan khusus</a>' : ''}
      </section>
      <nav class="at-tab" role="tablist" aria-label="Jenis pengaturan">
        <a role="tab" href="#pengaturan" class="${tab === 'umum' ? 'aktif' : ''}" aria-selected="${tab === 'umum'}"><span aria-hidden="true">🌐</span> Umum</a>
        <a role="tab" href="#pengaturan/khusus" class="${tab === 'khusus' ? 'aktif' : ''}" aria-selected="${tab === 'khusus'}"><span aria-hidden="true">🎯</span> Khusus <span class="at-hit">${khusus.daftar.length}</span></a>
      </nav>`;
  }
  function pasangKepalaAtur() {
    const t = layar.querySelector('[data-aksi="pakai-umum"]');
    if (t) t.onclick = () => { khusus.aktif = null; simpanKhusus(); rute(); };
  }
  function barisAtur(k, nilai, profil) {
    const d = PILIHAN_ATUR[k];
    const opsi = (profil ? [['', `Ikut umum (${teksNilai(k, umum(k))})`]] : []).concat(d.opsi().map(([v, t]) => [String(v), t]));
    const pilih = nilai == null ? '' : String(nilai);
    return `<label class="at-baris" data-baris="${k}"><span class="at-baris-label">${d.label}</span>
      <select data-atur="${k}">${opsi.map(([v, t]) => `<option value="${v}"${v === pilih ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select></label>`;
  }
  function kartuAtur(g, isi) {
    return `<section class="at-kartu"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">${g.ikon}</span>
      <div><h2>${g.judul}</h2><p>${g.ket}</p></div></div><div class="at-baris-daftar">${isi}</div></section>`;
  }

  function tampilAturUmum() {
    kini = null;
    const lapis = `<section class="at-kartu at-lapis"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">🧭</span>
        <div><h2>Cara aturan dipilih</h2><p>Dua lapis. Yang lebih atas menang.</p></div></div>
      <ol class="at-lapis-daftar">
        <li><span class="at-no">1</span><div><b>Tahapan khusus yang sedang dipakai</b><small>Aturan yang diisi, dan tahap/level/sub level yang dicentang</small></div></li>
        <li><span class="at-no">2</span><div><b>Pengaturan &amp; Tahapan Umum</b><small>Halaman ini · semua materi dipakai berurutan</small></div></li></ol>
      <p class="at-catatan">Aturan yang tidak diisi tahapan khusus ikut Umum, satu per satu. Contoh: tahapan khusus yang hanya mengubah jumlah soal tetap memakai syarat dengar/baca dari Umum.</p></section>`;
    const tahapan = `<section class="at-kartu"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">🗺️</span>
        <div><h2>Tahapan umum</h2><p>Semua tahap, level, dan sub level dipakai berurutan. Untuk memakai sebagian saja, buat <a href="#pengaturan/khusus">tahapan khusus</a>.</p></div></div>
      <div class="at-ringkas-tahap">${window.TAHAP.map(t => {
        const L = window.BACAAN.filter(b => b.tahap === t.no);
        const ns = L.reduce((a, b) => a + (punyaSub(b) ? daftarSub(b).length : 0), 0);
        return `<div class="at-rt"><span class="tahap-no">${t.no}</span><div><b>${esc(t.nama)}</b><small>${L.length} level · ${ns} sub level</small></div></div>`;
      }).join('')}</div></section>`;
    layar.innerHTML = kepalaAtur('umum') + lapis +
      KELOMPOK_ATUR.map(g => kartuAtur(g, g.kunci.map(k => barisAtur(k, umum(k), false)).join(''))).join('') + tahapan +
      '<p class="at-tersimpan" id="at-tersimpan" role="status"></p>';
    pasangKepalaAtur();
    const atur1 = () => { const r = layar.querySelector('[data-baris="syaratBaca"]'); if (r) r.hidden = !umum('harusBaca'); };
    if (AKUN) layar.querySelectorAll('select[data-atur]').forEach(x => { x.disabled = true; });
    atur1();
    layar.querySelectorAll('select[data-atur]').forEach(s => {
      s.onchange = () => {
        setelan[s.dataset.atur] = nilaiKetik(s.dataset.atur, s.value);
        simpanSetelan();
        atur1();
        const t = $('#at-tersimpan');
        t.textContent = '✓ Tersimpan'; t.classList.add('tampil');
        clearTimeout(t._w); t._w = setTimeout(() => t.classList.remove('tampil'), 1600);
      };
    });
  }

  function kartuProfil(p, aktif, bagikan) {
    const url = bagikan ? tautanProfil(p) : '';
    return `<article class="at-profil${aktif ? ' aktif' : ''}" data-id="${esc(p.id)}">
      <div class="at-profil-kepala"><div><h3>${esc(p.nama)}</h3>${p.catatan ? `<p>${esc(p.catatan)}</p>` : ''}</div>
        ${aktif ? '<span class="at-pil">Sedang dipakai</span>' : ''}</div>
      <div class="at-chip-baris"><span class="at-chip">🗺️ ${teksRingkas(ringkasTahapan(p.mati))}</span>${chipAturan(p)}</div>
      <div class="at-profil-aksi">
        ${aktif ? '<button class="tombol kecil" data-aksi="berhenti">Berhenti memakai</button>' : '<button class="tombol utama kecil" data-aksi="pakai">Pakai</button>'}
        <a class="tombol kecil" href="#pengaturan/ubah/${encodeURIComponent(p.id)}">✏️ Ubah</a>
        <button class="tombol kecil" data-aksi="bagikan" aria-expanded="${bagikan}">🔗 Bagikan</button>
        <button class="tombol kecil at-hapus" data-aksi="hapus">Hapus</button></div>
      <div class="at-konfirmasi" hidden>Hapus <b>${esc(p.nama)}</b> dari perangkat ini?
        <button class="tombol kecil at-hapus-ya" data-aksi="hapus-ya">Ya, hapus</button><button class="tombol kecil" data-aksi="hapus-batal">Batal</button></div>
      ${bagikan ? `<div class="at-bagikan"><p>Kirim tautan ini ke siswa. Saat dibuka, tahapan khusus <b>${esc(p.nama)}</b> terpasang dan langsung dipakai di perangkat mereka.
          Kemajuan belajar siswa tidak berubah.</p>
        <div class="at-tautan"><input readonly value="${esc(url)}" aria-label="Tautan tahapan khusus"><button class="tombol kecil utama" data-aksi="salin">📋 Salin</button></div>
        <a class="tombol kecil at-wa" href="https://wa.me/?text=${encodeURIComponent(`Tahapan khusus English Reading: ${p.nama}\n${url}`)}" target="_blank" rel="noopener">Kirim lewat WhatsApp</a></div>` : ''}
    </article>`;
  }
  let bagikanId = null;
  function tampilAturKhusus() {
    kini = null;
    if (AKUN) {
      const p = profilAktif();
      layar.innerHTML = kepalaAtur('khusus') + (p
        ? `<div class="at-profil-daftar">${kartuProfil(p, true, false).replace(/<div class="at-profil-aksi">[\s\S]*?<\/div>/, '')}</div>
           <p class="at-catatan">Tahapan ini dipasang gurumu ${p.asal === 'siswa' ? 'khusus untukmu' : 'untuk kelasmu'}.</p>`
        : '<div class="at-kosong"><span aria-hidden="true">🗺️</span><b>Memakai tahapan umum</b><p>Gurumu belum memasang tahapan khusus. Semua materi bisa kamu latih berurutan.</p></div>');
      return;
    }
    layar.innerHTML = kepalaAtur('khusus') + `
      <section class="at-kartu at-buat"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">✨</span>
        <div><h2>Buat tahapan khusus</h2><p>Pilih tahap, level, sampai sub level yang dipakai, dan aturan yang berbeda dari Umum.
          Cocok untuk remedial, pengayaan, atau persiapan ujian.</p></div></div>
        <div class="at-contoh">
          <a class="at-contoh-kartu at-contoh-baru" href="#pengaturan/ubah/baru"><span aria-hidden="true">＋</span><b>Buat dari awal</b><small>Semua materi dicentang, lalu pilih sendiri.</small></a>
          ${CONTOH.map(c => `<a class="at-contoh-kartu" href="#pengaturan/ubah/contoh-${c.kode}"><span aria-hidden="true">${c.ikon}</span><b>${c.nama}</b><small>${c.ket}</small></a>`).join('')}
        </div></section>
      ${khusus.daftar.length
        ? `<h2 class="at-judul-daftar">Tahapan khusus di perangkat ini</h2><div class="at-profil-daftar" id="at-profil">${khusus.daftar.map(p => kartuProfil(p, p.id === khusus.aktif, p.id === bagikanId)).join('')}</div>`
        : '<div class="at-kosong"><span aria-hidden="true">🗂️</span><b>Belum ada tahapan khusus</b><p>Buat dari awal, mulai dari contoh di atas, atau buka tautan tahapan khusus dari guru.</p></div>'}`;
    pasangKepalaAtur();
    const w = $('#at-profil');
    if (!w) return;
    w.onclick = e => {
      const t = e.target.closest('[data-aksi]'); if (!t) return;
      const kartu = t.closest('.at-profil'), id = kartu.dataset.id, p = khusus.daftar.find(x => x.id === id);
      const aksi = t.dataset.aksi;
      if (aksi === 'pakai') { khusus.aktif = id; simpanKhusus(); tampilAturKhusus(); }
      else if (aksi === 'berhenti') { khusus.aktif = null; simpanKhusus(); tampilAturKhusus(); }
      else if (aksi === 'bagikan') { bagikanId = bagikanId === id ? null : id; tampilAturKhusus(); }
      else if (aksi === 'salin') salinTeks(tautanProfil(p)).then(ok => { t.textContent = ok ? '✓ Tersalin' : 'Salin manual'; });
      else if (aksi === 'hapus') kartu.querySelector('.at-konfirmasi').hidden = false;
      else if (aksi === 'hapus-batal') kartu.querySelector('.at-konfirmasi').hidden = true;
      else if (aksi === 'hapus-ya') {
        khusus.daftar = khusus.daftar.filter(x => x.id !== id);
        if (khusus.aktif === id) khusus.aktif = null;
        simpanKhusus(); tampilAturKhusus();
      }
    };
  }

  // ---------- Editor tahapan khusus ----------
  let draf = null;
  function tampilEditor(kunci) {
    kini = null;
    if (AKUN) { location.replace('#pengaturan/khusus'); return; }
    const lama = khusus.daftar.find(p => p.id === kunci);
    const contoh = CONTOH.find(c => 'contoh-' + c.kode === kunci);
    if (!lama && !contoh && kunci !== 'baru') { location.replace('#pengaturan/khusus'); return; }
    const dasar = lama ? JSON.parse(JSON.stringify(lama)) : { nama: contoh ? contoh.nama : '', catatan: contoh ? contoh.ket : '',
      ...(contoh ? contoh.buat() : { setelan: {}, mati: {} }) };
    draf = { id: lama ? lama.id : 'k' + Date.now().toString(36), baru: !lama, nama: dasar.nama, catatan: dasar.catatan || '',
      setelan: dasar.setelan || {}, mati: Object.assign({ tahap: [], level: [], sub: {} }, dasar.mati),
      buka: new Set(contoh ? window.TAHAP.map(t => t.no).filter(n => tahapOn(dasar.mati, n)) : []), bukaLevel: new Set() };
    layar.innerHTML = `
      <div class="bar-atas"><a href="#pengaturan/khusus" class="kembali">← Tahapan khusus</a><span class="label-tingkat">${lama ? 'Ubah' : 'Baru'}</span></div>
      <header class="at-kepala"><span class="at-alis">Pengaturan &amp; Tahapan Khusus</span><h1>${lama ? 'Ubah tahapan khusus' : 'Tahapan khusus baru'}</h1>
        <p>Isi nama, pilih aturan yang berbeda dari Umum, lalu centang materi yang dipakai.</p></header>
      <section class="at-kartu"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">🏷️</span>
        <div><h2>Nama</h2><p>Nama ini dilihat siswa di halaman depan, mis. "Remedial X-2" atau "Persiapan TKA".</p></div></div>
        <div class="at-isian-daftar">
          <label class="at-isian"><span>Nama tahapan</span><input id="ed-nama" maxlength="60" value="${esc(draf.nama)}" placeholder="mis. Persiapan TKA kelas 12" autocomplete="off"></label>
          <label class="at-isian"><span>Catatan <small>(opsional)</small></span><textarea id="ed-catatan" rows="2" maxlength="200" placeholder="Tujuan atau petunjuk singkat untuk siswa">${esc(draf.catatan)}</textarea></label>
          <p class="at-galat" id="ed-galat" role="alert" hidden></p></div></section>
      ${kartuAtur({ ikon: '⚙️', judul: 'Aturan', ket: 'Biarkan <b>Ikut umum</b> untuk memakai Pengaturan Umum di perangkat siswa.' },
        Object.keys(PILIHAN_ATUR).map(k => barisAtur(k, draf.setelan[k], true)).join(''))}
      <section class="at-kartu"><div class="at-kartu-kepala"><span class="at-ikon" aria-hidden="true">🗺️</span>
        <div><h2>Tahapan</h2><p>Centang materi yang dipakai. Mematikan <b>tahap</b> ikut mematikan levelnya; mematikan <b>level</b> ikut mematikan sub levelnya.</p></div></div>
        <div class="at-alat"><button class="tombol kecil" data-aksi="semua-on">✓ Pakai semua</button><button class="tombol kecil" data-aksi="semua-off">Matikan semua</button>
          <button class="tombol kecil" data-aksi="buka-semua">Buka semua tahap</button><button class="tombol kecil" data-aksi="tutup-semua">Tutup semua</button></div>
        <div class="at-legenda"><span><i class="lg-on"></i>dipakai</span><span><i class="lg-sebagian"></i>sebagian</span><span><i class="lg-off"></i>tidak dipakai</span></div>
        <div class="at-pohon" id="ed-pohon"></div></section>
      <div class="at-simpan"><span class="at-simpan-ringkas" id="ed-ringkas"></span>
        <div class="at-simpan-aksi"><a class="tombol kecil" href="#pengaturan/khusus">Batal</a><button class="tombol kecil" id="ed-simpan">Simpan</button>
          <button class="tombol utama kecil" id="ed-pakai">Simpan &amp; pakai</button></div></div>`;
    gambarPohon();
    const pohon = $('#ed-pohon'), m = draf.mati;
    const sec = layar.querySelector('.at-alat');
    sec.onclick = e => {
      const a = e.target.closest('[data-aksi]'); if (!a) return;
      if (a.dataset.aksi === 'semua-on') draf.mati = { tahap: [], level: [], sub: {} };
      if (a.dataset.aksi === 'semua-off') draf.mati = { tahap: window.TAHAP.map(t => t.no), level: [], sub: {} };
      if (a.dataset.aksi === 'buka-semua') window.TAHAP.forEach(t => draf.buka.add(t.no));
      if (a.dataset.aksi === 'tutup-semua') { draf.buka.clear(); draf.bukaLevel.clear(); }
      gambarPohon();
    };
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
    $('#ed-simpan').onclick = () => simpanDraf(false);
    $('#ed-pakai').onclick = () => simpanDraf(true);
    $('#ed-nama').oninput = () => { $('#ed-galat').hidden = true; };
    if (!draf.nama) $('#ed-nama').focus();
    void m;
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
    const buka = on && draf.bukaLevel.has(b.id);
    const jenis = jenisLevel(b);
    const sebagian = on && subs.length && nSub < subs.length;
    return `<div class="at-level${on ? (sebagian ? ' sebagian' : '') : ' mati'}">
      <div class="at-level-kepala">
        <label class="at-cek kecil" title="${centang ? 'Matikan level ini' : 'Pakai level ini'}"><input type="checkbox" data-level="${esc(b.id)}" aria-label="${esc(b.judul)}"${centang ? ' checked' : ''}${tahapNyala ? '' : ' disabled'}${sebagian ? ' data-sebagian="1"' : ''}><span></span></label>
        <span class="at-level-judul"><b>${nomor}. ${esc(b.judul)}</b><small><span class="jenis jenis-${jenis.kunci}">${jenis.nama}</span>${subs.length ? ` ${nSub}/${subs.length} sub level` : ''}</small></span>
        ${subs.length ? `<button class="at-level-buka" data-aksi="buka-level" data-l="${esc(b.id)}" aria-expanded="${buka}"${on ? '' : ' disabled'}>Sub level <span class="at-panah" aria-hidden="true">▾</span></button>` : ''}
      </div>
      ${buka ? `<div class="at-subs">${subs.map((s, k) => {
        const n = k + 1, nyala = !(((m.sub || {})[b.id]) || []).includes(n);
        return `<label class="at-sub${nyala ? ' on' : ''}"><input type="checkbox" data-sub="${esc(b.id)}" data-n="${n}"${nyala ? ' checked' : ''}><span class="at-sub-no">${n}</span><span class="at-sub-nama">${s.ikon} ${esc(s.nama)}</span></label>`;
      }).join('')}</div>` : ''}
    </div>`;
  }
  function gambarPohon() {
    const m = draf.mati;
    $('#ed-pohon').innerHTML = window.TAHAP.map(t => {
      const L = window.BACAAN.filter(b => b.tahap === t.no);
      const on = tahapOn(m, t.no), buka = draf.buka.has(t.no);
      const nOn = on ? L.filter(b => levelOn(m, b)).length : 0;
      const sebagian = on && (nOn < L.length || L.some(b => levelOn(m, b) && punyaSub(b) && subDipakaiM(m, b).length < daftarSub(b).length));
      const maxSub = Math.max(0, ...L.filter(punyaSub).map(b => daftarSub(b).length));
      return `<div class="at-tahap${on ? (sebagian ? ' sebagian' : '') : ' mati'}${buka ? ' buka' : ''}">
        <div class="at-tahap-kepala">
          <label class="at-cek" title="${on ? 'Matikan tahap ini' : 'Pakai tahap ini'}"><input type="checkbox" data-tahap="${t.no}" aria-label="Tahap ${t.no} ${esc(t.nama)}"${on ? ' checked' : ''}${sebagian ? ' data-sebagian="1"' : ''}><span></span></label>
          <button class="at-tahap-judul" data-aksi="buka-tahap" data-t="${t.no}" aria-expanded="${buka}">
            <span class="tahap-no">${t.no}</span><span class="at-tahap-teks"><b>${esc(t.nama)}</b><small>${on ? `${nOn}/${L.length} level dipakai` : 'Tidak dipakai'} · ${esc(t.setara)}</small></span>
            <span class="at-panah" aria-hidden="true">▾</span></button>
        </div>
        ${buka ? `<div class="at-tahap-isi">
          ${maxSub && on ? `<div class="at-massal"><span>Sub level di semua level tahap ini</span><div>${Array.from({ length: maxSub }, (_, i) => i + 1).map(n =>
            `<button class="at-massal-sub ${statusMassal(m, L, n)}" data-aksi="massal" data-t="${t.no}" data-n="${n}" aria-label="Sub level ${n} untuk semua level">${n}</button>`).join('')}</div></div>` : ''}
          ${L.map((b, i) => barisLevel(m, b, i + 1, on)).join('')}</div>` : ''}
      </div>`;
    }).join('');
    $('#ed-pohon').querySelectorAll('input[data-sebagian]').forEach(x => { x.indeterminate = true; });
    const r = ringkasTahapan(m);
    $('#ed-ringkas').innerHTML = `Dipakai <b>${r.tahap}</b> tahap · <b>${r.level}</b> level · <b>${r.sub}</b> sub level`;
  }
  function simpanDraf(pakai) {
    const nama = $('#ed-nama').value.trim(), galat = $('#ed-galat');
    const tampilGalat = t => { galat.textContent = t; galat.hidden = false; galat.scrollIntoView({ block: 'center', behavior: 'smooth' }); };
    if (!nama) { tampilGalat('Isi nama tahapan dulu.'); $('#ed-nama').focus(); return; }
    if (!ringkasTahapan(draf.mati).level) { tampilGalat('Pilih minimal satu level di bagian Tahapan.'); return; }
    const setel = {};
    layar.querySelectorAll('select[data-atur]').forEach(s => { const v = nilaiKetik(s.dataset.atur, s.value); if (v != null) setel[s.dataset.atur] = v; });
    const p = { id: draf.id, nama, catatan: $('#ed-catatan').value.trim(), setelan: setel, mati: draf.mati };
    const i = khusus.daftar.findIndex(x => x.id === p.id);
    if (i >= 0) khusus.daftar[i] = p; else khusus.daftar.push(p);
    if (pakai) khusus.aktif = p.id;
    simpanKhusus();
    location.hash = '#pengaturan/khusus';
  }

  // ---------- Memasang tahapan khusus dari tautan guru ----------
  function tampilImpor(kode) {
    kini = null;
    if (AKUN) { location.replace('#pengaturan/khusus'); return; }
    let p = null;
    try { p = bukaKode(kode); } catch (e) { p = null; }
    const bar = '<div class="bar-atas"><a href="#" class="kembali">← Daftar bacaan</a></div>';
    if (!p) {
      layar.innerHTML = bar + '<div class="at-kosong"><span aria-hidden="true">⚠️</span><b>Tautan tidak bisa dibaca</b><p>Tautan tahapan khusus ini rusak atau terpotong. Minta tautan baru kepada guru.</p><a class="tombol" href="#">Ke daftar bacaan</a></div>';
      return;
    }
    const ada = khusus.daftar.find(x => x.id === p.id);
    layar.innerHTML = bar + `<section class="at-impor"><span class="at-impor-ikon" aria-hidden="true">🎯</span><small>Tahapan khusus dari guru</small>
        <h1>${esc(p.nama)}</h1>${p.catatan ? `<p>${esc(p.catatan)}</p>` : ''}
        <div class="at-chip-baris"><span class="at-chip">🗺️ ${teksRingkas(ringkasTahapan(p.mati))}</span>${chipAturan(p)}</div>
        <p class="at-catatan">${ada ? 'Tahapan ini sudah ada di perangkat ini; versi dari tautan akan menggantikannya.' : 'Tahapan ini disimpan di perangkat ini dan langsung dipakai.'}
          Kemajuan belajarmu tidak berubah, dan kamu bisa kembali ke Umum kapan saja di Pengaturan.</p>
        <div class="kendali"><button class="tombol utama" id="impor-ya">Pasang dan pakai</button><a class="tombol" href="#">Nanti saja</a></div></section>`;
    $('#impor-ya').onclick = () => {
      const i = khusus.daftar.findIndex(x => x.id === p.id);
      if (i >= 0) khusus.daftar[i] = p; else khusus.daftar.push(p);
      khusus.aktif = p.id;
      simpanKhusus();
      location.hash = '#';
    };
  }

  function rute() {
    hentikanSuara();
    batalkanRekam();
    batalUlang();
    batalLatih();
    const h = location.hash;
    if (h.startsWith('#khusus=')) { tampilImpor(h.slice(8)); window.scrollTo(0, 0); return; }
    if (h === '#pengaturan' || h === '#pengaturan/khusus' || h.startsWith('#pengaturan/ubah/')) {
      if (h === '#pengaturan') tampilAturUmum();
      else if (h === '#pengaturan/khusus') tampilAturKhusus();
      else tampilEditor(decodeURIComponent(h.slice(17)));
      window.scrollTo(0, 0);
      return;
    }
    const ml = location.hash.match(/^#latih\/([^/]+)\/(\d+)$/);
    if (ml) {
      const bl = window.BACAAN.find(x => x.id === decodeURIComponent(ml[1]));
      const n = +ml[2];
      if (punyaSub(bl) && n >= 1 && n <= daftarSub(bl).length) {
        if (terbukaSub(bl, n)) tampilLatih(bl, n);
        else location.replace(`#baca/${encodeURIComponent(bl.id)}`);
        window.scrollTo(0, 0);
        return;
      }
    }
    const m = location.hash.match(/^#baca\/(.+)$/);
    const id = m ? decodeURIComponent(m[1]) : '';
    const b = window.BACAAN.find(x => x.id === id);
    if (b) tampilBaca(b); else if (location.hash === '#ulang') tampilUlang(); else tampilDaftar();
    window.scrollTo(0, 0);
  }
  // Level kosakata: teks = "kata. contoh kalimat." berurutan; arti mengikuti pola yang sama.
  window.BACAAN.forEach(b => {
    if (!b.kosakata) return;
    b.teks = b.kosakata.map(([k, , c]) => `${k}. ${c}`).join(' ');
    b.arti = b.kosakata.map(([, a, , ca]) => `${a}. ${ca}`).join(' ');
  });
  window.addEventListener('hashchange', rute);
  saranBrowser();
  // Chrome kadang tetap bersuara setelah halaman ditinggalkan.
  window.addEventListener('pagehide', () => { if (bisaSuara) speechSynthesis.cancel(); });
  rute();
})();
