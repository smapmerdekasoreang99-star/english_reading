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

  function baca(kunci, awal) {
    try { const v = localStorage.getItem(kunci); return v === null ? awal : JSON.parse(v); } catch (e) { return awal; }
  }
  function tulis(kunci, nilai) {
    try { localStorage.setItem(kunci, JSON.stringify(nilai)); } catch (e) { /* abaikan */ }
  }
  const setelan = Object.assign({ suara: '', laju: 0.9, tampilArti: false, tanpaGrafik: false }, baca('er_setelan', {}));
  delete setelan.arti;          // pengaturan lama (terjemahan tampil); diganti tampilArti
  const simpanSetelan = () => tulis('er_setelan', setelan);
  const skorTerbaik = baca('er_skor', {});   // pelafalan terbaik per level
  const skorPaham = baca('er_paham', {});     // soal pemahaman terbaik per level

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
  // segmen: [{ teks, yakin }] → [{ w, yakin }]; yakin 0 = tidak diketahui.
  function kataUcapan(segmen) {
    const hasil = [];
    for (const s of segmen) {
      for (let w of s.teks.replace(/-/g, ' ').split(/\s+/)) {
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
    u.onend = () => { if (token === putar.token) { sorotKata(null); ucapKalimat(k + 1, token); } };
    u.onerror = e => { if (token === putar.token && e.error !== 'interrupted' && e.error !== 'canceled') hentikanSuara(); };
    speechSynthesis.speak(u);
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
    if (s.sub) return jumlahLulusSub(b) === SUB.length;
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
    if (s.sub) kurang.push(`🧩 lulus ${SUB.length} sub level Latihan bertahap (sudah ${jumlahLulusSub(b)})`);
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
    if (!daftar) return '';
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
      ${lengkap ? statusLevelHTML() : '<p class="lanjut">Baca sampai akhir agar skormu tercatat.</p>'}
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
  const daftarSub = b => (b.pola ? SUB_POLA : b.kosakata ? SUB : [...SUB_BACAAN, bacaSuara(b) ? SUB5_BACA : SUB5_RUMPANG]);
  const skorSub = baca('er_sub', {});          // id → { s: [skor terbaik sub 1–5], lama }
  const simpanSub = () => tulis('er_sub', skorSub);
  const dataSub = b => skorSub[b.id] || (skorSub[b.id] = { s: [] });
  const lulusSub = (b, n) => { const d = skorSub[b.id]; return !!d && (!!d.lama || d.s[n - 1] >= TUNTAS); };
  const jumlahLulusSub = b => SUB.filter((_, i) => lulusSub(b, i + 1)).length;
  const terbukaSub = (b, n) => n === 1 || lulusSub(b, n - 1);
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
  function buatSoalPola(b, n, w) {
    const it = window.POLA_GEN[b.id]();
    const en = kalimatPola(it.pre, it.kunci, it.post);
    const kosong = kalimatPola(it.pre, '_____', it.post);
    const dasar = { w, sesudah: en, alasan: it.alasan, suaraKunci: en };
    const ketik = () => ({ ...dasar, jenis: 'ketik', tanya: 'Ketik bentuk yang tepat.', kalimat: kosong, kecil: it.id,
      petunjukKetik: `Petunjuk: ${it.dasar}`, target: it.kunci, terima: [it.kunci], persis: true });
    if (n === 1) {
      return { ...dasar, jenis: 'pilih', tanya: 'Pilih bentuk yang tepat.', kalimat: kosong, kecil: it.id,
        ...pilihan(it.kunci, it.salah, Math.min(4, it.salah.length + 1)) };
    }
    if (n === 2) {
      const keliru = Math.random() < 0.5;
      return { ...dasar, jenis: 'pilih', tanya: 'Apakah kalimat ini benar?', kalimat: keliru ? kalimatPola(it.pre, ambil(it.salah), it.post) : en,
        kecil: it.id, p: ['Benar', 'Salah'], j: keliru ? 1 : 0 };
    }
    if (n === 3) return ketik();
    if (n === 4) {
      const token = en.split(/\s+/);
      return token.length <= 14 ? { ...dasar, jenis: 'susun', tanya: 'Susun kata-kata ini menjadi kalimat.', kecil: it.id, token } : ketik();
    }
    return { ...dasar, jenis: 'ucapK', tanya: 'Ucapkan dalam bahasa Inggris:', kalimat: it.id, target: en, fokus: it.kunci,
      fokusPos: urai(it.pre || '').length, alt: it.alt || [] };
  }

  // ---------- Soal bacaan ----------
  const kalimatBacaan = b => b._kal || (b._kal = pecah(b.teks, b.arti).kalimat.map(k => ({ en: k.teks, id: k.arti })));
  const cukupPanjang = k => k.en.split(/\s+/).length >= 3;
  const reKata = k => new RegExp('\\b' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
  const kalimatDenganKata = (b, kata) => kalimatBacaan(b).find(k => reKata(kata).test(k.en));
  const bankBacaan = b => [...soalDari(b).map(q => ({ pg: q })), ...((window.SOAL_BS || {})[b.id] || []).map(x => ({ bs: x }))];
  // Daftar "unit" satu sesi (w) per sub level.
  function urutBacaan(b, n) {
    const G = window.KATA_BACAAN[b.id], K = kalimatBacaan(b);
    const panjang = K.map((k, i) => i).filter(i => cukupPanjang(K[i]));
    if (n === 1) return kocok(G.map((_, i) => i));
    if (n === 2) return kocok(panjang).slice(0, 10);
    if (n === 3) return [0, 1, 2, 3, 4];
    if (n === 4) return kocok(bankBacaan(b).map((_, i) => i)).slice(0, 10);
    if (bacaSuara(b)) return kocok(panjang).slice(0, 6);
    return kocok(G.map((_, i) => i).filter(i => kalimatDenganKata(b, G[i][0])));
  }
  function buatSoalBacaan(b, n, w) {
    const G = window.KATA_BACAAN[b.id], K = kalimatBacaan(b);
    if (n === 1) {
      const [kata, arti] = G[w];
      const c = kalimatDenganKata(b, kata);
      return Math.random() < 0.5
        ? { w, jenis: 'pilih', tanya: 'Apa arti kata ini dalam bacaan?', besar: kata, suara: kata, kecil: c ? `“${c.en}”` : '', ...pilihan(arti, G.map(x => x[1])) }
        : { w, jenis: 'pilih', tanya: 'Apa bahasa Inggrisnya dalam bacaan?', besar: arti, suaraKunci: kata, ...pilihan(kata, G.map(x => x[0])) };
    }
    if (n === 2) {
      const k = K[w];
      return { w, jenis: 'pilih', tanya: 'Dengarkan kalimat dari bacaan. Apa artinya?', putar: k.en, tulisSesudah: k.en,
        ...pilihan(k.id, K.filter(x => x !== k && cukupPanjang(x)).map(x => x.id)) };
    }
    if (n === 3) {
      const L = Math.min(K.length, b.tahap >= 4 ? 3 : 4);
      const s = Math.floor(Math.random() * (K.length - L + 1));
      return { w, jenis: 'susun', urutKalimat: true, tanya: 'Urutkan kalimat-kalimat ini sesuai bacaan.', token: K.slice(s, s + L).map(x => x.en) };
    }
    if (n === 4) {
      const x = bankBacaan(b)[w];
      if (x.pg) return { w, jenis: 'pilih', tanya: x.pg.t, ...pilihan(x.pg.p[x.pg.j], x.pg.p), alasan: x.pg.b, bahasSelalu: true };
      return { w, jenis: 'pilih', tanya: 'Benar atau salah menurut bacaan?', kalimat: x.bs[0], p: ['Benar', 'Salah'], j: x.bs[1] ? 0 : 1,
        alasan: x.bs[2] || '', bahasSelalu: true };
    }
    if (bacaSuara(b)) {
      const k = K[w];
      return { w, jenis: 'ucapK', tanya: 'Bacalah kalimat dari bacaan ini dengan suara jelas:', kalimat: k.en, kecil: k.id,
        target: k.en, fokus: '', fokusPos: 0, suaraKunci: k.en, bacaTeks: true };
    }
    const [kata] = G[w];
    const c = kalimatDenganKata(b, kata);
    return { w, jenis: 'pilih', tanya: 'Lengkapi kalimat dari bacaan.', kalimat: c.en.replace(reKata(kata), '_____'), kecil: c.id,
      suaraKunci: c.en, sesudah: c.en, ...pilihan(kata, G.map(x => x[0])) };
  }

  // Satu soal untuk kata ke-w (sub level 3: situasi ke-w).
  function buatSoal(b, n, w) {
    if (b.pola) return buatSoalPola(b, n, w);
    if (!b.kosakata) return buatSoalBacaan(b, n, w);
    const kk = b.kosakata, k = kk[w];
    const kata = kk.map(x => x[0]), arti = kk.map(x => x[1]);
    if (n === 1) {
      return Math.random() < 0.5
        ? { w, jenis: 'pilih', tanya: 'Apa arti kata ini?', besar: k[0], suara: k[0], ...pilihan(k[1], arti) }
        : { w, jenis: 'pilih', tanya: 'Apa bahasa Inggrisnya?', besar: k[1], suaraKunci: k[0], ...pilihan(k[0], kata) };
    }
    if (n === 2) {
      if (Math.random() < 0.5) return { w, jenis: 'pilih', tanya: 'Dengarkan. Kata apa yang kamu dengar?', putar: k[0], ...pilihan(k[0], kata) };
      const c = ambil(contohKata(b, k));
      const lain = semuaContoh(b).filter(x => x.kata !== k[0]).map(x => x.id);
      return { w, jenis: 'pilih', tanya: 'Dengarkan kalimatnya. Apa artinya?', putar: c[0], tulisSesudah: c[0], ...pilihan(c[1], lain) };
    }
    if (n === 3) {
      const s = b.situasi[w];
      const calon = kata.filter(x => x !== s.j && !(s.juga || []).includes(x));
      return { w, jenis: 'pilih', tanya: s.s, suaraKunci: s.j, ...pilihan(s.j, calon) };
    }
    if (n === 4) {
      const c = ambil(contohKata(b, k));
      const r = rumpang(c[0], k[0]);
      const token = c[0].split(/\s+/);
      const bisaSusun = token.length >= 3 && token.length <= 8;
      if (r && (!bisaSusun || Math.random() < 0.5)) {
        const calon = kata.filter(x => !miripDengan(b, k[0]).includes(x));
        return { w, jenis: 'pilih', tanya: 'Lengkapi kalimatnya.', besar: r, kecil: c[1], suaraKunci: c[0], ...pilihan(k[0], calon) };
      }
      if (bisaSusun) return { w, jenis: 'susun', tanya: 'Susun kata-kata ini menjadi kalimat.', kecil: c[1], token, suaraKunci: c[0] };
      return { w, jenis: 'pilih', tanya: 'Apa bahasa Inggrisnya?', besar: k[1], suaraKunci: k[0], ...pilihan(k[0], kata) };
    }
    // Soal situasi: ungkapan lain yang juga pantas (juga) ikut diterima.
    const sit = b.situasi.filter(s => s.j === k[0]);
    const s = sit.length && Math.random() < 0.5 ? ambil(sit) : null;
    return s
      ? { w, jenis: 'ucap', tanya: s.s, target: k[0], terima: terimaUcap([k[0], ...(s.juga || [])]), petunjuk: 'Ucapkan kata yang tepat dalam bahasa Inggris.' }
      : { w, jenis: 'ucap', tanya: 'Ucapkan dalam bahasa Inggris:', besar: k[1], target: k[0], terima: terimaUcap([k[0]]) };
  }

  let latih = null;   // { b, n, antre: [soal], i, benar, awal, sudah, rec }
  function mulaiLatih(b, n) {
    const urut = b.pola ? Array.from({ length: 10 }, (_, i) => i) : !b.kosakata ? urutBacaan(b, n)
      : n === 3 ? kocok(b.situasi.map((_, i) => i)).slice(0, 10) : kocok(b.kosakata.map((_, i) => i));
    latih = { b, n, antre: urut.map(w => buatSoal(b, n, w)), i: 0, benar: 0, awal: urut.length, sudah: false, rec: null };
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
      <div class="lt-jalur"><span id="lt-isi"></span></div>
      <div id="lt-kotak"></div>`;
    gambarSoal();
  }

  function gambarSoal() {
    const L = latih;
    if (L.i >= L.antre.length) { selesaiLatih(); return; }
    const q = L.antre[L.i];
    L.sudah = false;
    const ulangan = L.i >= L.awal;
    $('#lt-isi').style.width = `${Math.min(100, (L.i / L.antre.length) * 100)}%`;
    let isi = `<p class="lt-nomor">${ulangan ? '🔁 Ulangi yang tadi keliru' : `Soal ${L.i + 1} dari ${L.awal}`}</p>
      <p class="lt-tanya">${esc(q.tanya)}</p>`;
    if (q.putar) isi += '<button class="tombol lt-putar" data-putar>🔊 Putar lagi</button>';
    if (q.besar) isi += `<p class="lt-besar">${esc(q.besar)}${q.suara ? ' <button class="tombol kecil" data-dengar aria-label="Dengarkan">🔊</button>' : ''}</p>`;
    if (q.kalimat) isi += `<p class="lt-kalimat">${esc(q.kalimat)}</p>`;
    if (q.kecil) isi += `<p class="lt-kecil">${esc(q.kecil)}</p>`;
    if (q.jenis === 'ketik') {
      isi += `<form class="lt-ketik" id="lt-ketik"><input id="lt-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Ketik jawabanmu" aria-label="Jawaban">
          <button class="tombol utama">Periksa</button></form>${q.petunjukKetik ? `<p class="lt-kecil">${esc(q.petunjukKetik)}</p>` : ''}`;
    } else if (q.jenis === 'pilih') {
      isi += `<div class="lt-pilihan">${q.p.map((x, i) => `<button class="lt-opsi" data-i="${i}"><span class="opsi-huruf">${'ABCD'[i]}</span><span>${esc(x)}</span></button>`).join('')}</div>`;
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
    if (e.target.closest('#lt-lanjut')) { L.i++; gambarSoal(); window.scrollTo(0, 0); return; }
    if (e.target.closest('#lt-suara-kunci')) { ucapLatih(L.dengar); return; }
    if (L.sudah) return;
    const o = e.target.closest('.lt-opsi');
    if (o) {
      const pilih = +o.dataset.i;
      $('#lt-kotak').querySelectorAll('.lt-opsi').forEach((x, i) => {
        x.disabled = true;
        x.classList.toggle('kunci', i === q.j);
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
    if (L.i < L.awal && ok) L.benar++;
    if (!ok) {
      // Diulang di akhir sesi dengan soal baru untuk kata/situasi yang sama.
      L.antre.push(buatSoal(L.b, L.n, q.w));
      if (L.b.kosakata && L.n === SUB.length) tambahDek(L.b.kosakata[q.w][0], L.b.kosakata[q.w][2], true);
    }
    L.dengar = q.suaraKunci || q.target || q.tulisSesudah || q.putar || '';
    $('#lt-umpan').innerHTML = `<div class="lt-umpan ${ok ? 'benar' : 'keliru'}">
        <p><b>${ok ? ambil(['✓ Benar!', '✓ Tepat!', '✓ Bagus!']) : '✗ Belum tepat.'}</b> ${keterangan || ''}</p>
        ${q.tulisSesudah ? `<p class="lt-kecil">Kalimatnya: “${esc(q.tulisSesudah)}”</p>` : ''}
        ${q.sesudah && (!ok || q.p && q.p[0] === 'Benar') && q.jenis !== 'susun' ? `<p>Kalimat yang benar: <b>${esc(q.sesudah)}</b></p>` : ''}
        ${q.alasan && (!ok || q.bahasSelalu) ? `<p class="lt-kecil">${esc(q.alasan)}</p>` : ''}
        <div class="lt-umpan-aksi">${L.dengar ? '<button class="tombol kecil" id="lt-suara-kunci">🔊 Dengarkan</button>' : ''}
        <button class="tombol utama kecil" id="lt-lanjut">Lanjut →</button></div></div>`;
    // Jawaban yang benar langsung diperdengarkan saat keliru, agar bentuk yang tepat yang diingat.
    if (!ok && q.jenis !== 'ucap' && q.jenis !== 'ucapK') ucapLatih(L.dengar);
    $('#lt-lanjut').focus({ preventScroll: true });
    $('#lt-umpan').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function selesaiLatih() {
    const L = latih, b = L.b, n = L.n;
    const persen = Math.round(L.benar * 100 / L.awal);
    const d = dataSub(b);
    const rekor = !(d.s[n - 1] >= persen);
    if (rekor) { d.s[n - 1] = persen; simpanSub(); }
    const lulus = persen >= TUNTAS;
    const SB = daftarSub(b);
    if (b.kosakata && n === SB.length) {
      if (lulus) b.kosakata.forEach(([k, , c]) => tambahDek(k, c, false));
      simpanDek();
    }
    const kelas = persen >= 85 ? 'baik' : persen >= 60 ? 'sedang' : 'kurang';
    const berikut = n < SB.length && lulusSub(b, n) ? n + 1 : 0;
    $('#lt-isi').style.width = '100%';
    $('#lt-kotak').onclick = null;
    $('#lt-kotak').innerHTML = `<div class="hasil">
      <h2>Hasil sub level ${n}</h2>
      <div class="skor ${kelas}"><b>${persen}%</b><span>${L.benar} dari ${L.awal} benar pada percobaan pertama${rekor ? ' · 🏅 skor terbaik' : ''}</span></div>
      <p>${lulus ? (n < SB.length ? `🎉 Lulus! Sub level ${n + 1} sudah terbuka.` : b.kosakata ? '🎉 Lulus! Semua kata level ini masuk Ulang kosakata.' : '🎉 Lulus!') : `Perlu ${TUNTAS}% untuk lulus. Soalnya akan berbeda saat diulang.`}</p>
      ${n === SB.length && tuntas(b) ? statusLevelHTML(b) : ''}
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
    return `<section class="sub-level">
      <h2>🧩 Latihan bertahap</h2>
      <p class="petunjuk">Pelajari ${b.pola ? 'polanya dan contoh kalimatnya' : b.kosakata ? 'kata-katanya' : 'teksnya (dengarkan dan baca)'} di atas, lalu kerjakan ${daftarSub(b).length} sub level secara berurutan. Tiap sub level lulus bila
        ≥ ${TUNTAS}% benar; soalnya diacak sehingga berbeda tiap kali dikerjakan.${d.lama ? ' Level ini sudah kamu tuntaskan sebelumnya, jadi semua sub level terbuka untuk mengulang.' : ''}</p>
      <div class="sub-daftar">${daftarSub(b).map((s, i) => {
        const n = i + 1, buka = terbukaSub(b, n), sk = d.s[i], ok = sk >= TUNTAS;
        const isi = `<span class="sub-no">${ok ? '✓' : buka ? n : '🔒'}</span>
          <span class="kartu-isi"><span class="sub-nama">${s.ikon} ${esc(s.nama)}</span>
          <span class="kartu-info">${esc(s.ket)}${sk != null ? ` · terbaik <b>${sk}%</b>` : ''}</span></span>`;
        return buka
          ? `<a class="sub-kartu${ok ? ' lulus' : ''}" href="#latih/${encodeURIComponent(b.id)}/${n}">${isi}</a>`
          : `<span class="sub-kartu kunci" title="Luluskan sub level ${n - 1} dulu">${isi}</span>`;
      }).join('')}</div>
    </section>`;
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
    const semua = window.BACAAN;
    const j = semua.indexOf(b);
    return { level: i + 1, jumlah: isi.length, sebelum: semua[j - 1] || null, sesudah: semua[j + 1] || null };
  }
  const labelLevel = b => `Tahap ${b.tahap} · Level ${posisiLevel(b).level}`;

  function tampilDaftar() {
    kini = null;
    layar.innerHTML = `<header class="judul-app"><h1>📖 English Reading</h1>
        <p>Dengarkan bacaan, lalu baca sendiri dan lihat koreksinya. Mulai dari tahap yang sesuai, tuntaskan tiap level
          (skor terbaik ≥ ${TUNTAS}%), lalu naik ke tahap berikutnya.</p></header>` + kartuUlang() +
      window.TAHAP.map(t => {
        const isi = window.BACAAN.filter(b => b.tahap === t.no);
        if (!isi.length) return '';
        const jumlahTuntas = isi.filter(tuntas).length;
        return `<section class="tahap${jumlahTuntas === isi.length ? ' selesai' : ''}">
          <div class="tahap-kepala"><span class="tahap-no">${t.no}</span>
            <div><h2>${esc(t.nama)}</h2><span class="tahap-setara">${esc(t.setara)}</span></div>
            <span class="tahap-progres">${jumlahTuntas}/${isi.length} tuntas</span></div>
          <p class="tahap-fokus">${esc(t.fokus)}</p>
          <div class="daftar">${isi.map((b, i) => {
            const s = skorTerbaik[b.id];
            const jenis = jenisLevel(b);
            const ukuran = b.kosakata ? `${b.kosakata.length} kata · ${esc(b.kelompok)}` : `${(b.teks.match(/\S+/g) || []).length} kata`;
            const ok = tuntas(b);
            const sp = skorPaham[b.id];
            return `<a class="kartu${ok ? ' tuntas' : ''}" href="#baca/${encodeURIComponent(b.id)}">
              <span class="kartu-level">${ok ? '✓' : i + 1}</span>
              <span class="kartu-isi"><span class="kartu-judul">${esc(b.judul)}</span>
              <span class="kartu-info"><span class="jenis jenis-${jenis.kunci}">${jenis.nama}</span> Level ${i + 1} · ${ukuran}${punyaSub(b) ? ` · 🧩 <b>${jumlahLulusSub(b)}/${SUB.length}</b> sub level` : ''}${s != null ? ` · 🎤 <b>${s}%</b>` : ''}${sp != null ? ` · 📝 <b>${sp}%</b>` : ''}${soalDari(b) && sp == null && !punyaSub(b) ? ` · ${soalDari(b).length} soal` : ''}</span></span></a>`;
          }).join('')}</div></section>`;
      }).join('') +
      (bisaSuara ? '' : '<div class="pesan">Browser ini tidak bisa membacakan teks. Gunakan Google Chrome versi terbaru.</div>');
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

  function tampilBaca(b) {
    const p = pecah(b.teks, b.arti);
    kini = { b, kalimat: p.kalimat, kata: p.kata, pilihK: 0, sejajar: p.sejajar };
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
    $('#pilih-laju').onchange = e => { setelan.laju = +e.target.value; simpanSetelan(); };
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
  }

  function rute() {
    hentikanSuara();
    batalkanRekam();
    batalUlang();
    batalLatih();
    const ml = location.hash.match(/^#latih\/([^/]+)\/(\d)$/);
    if (ml) {
      const bl = window.BACAAN.find(x => x.id === decodeURIComponent(ml[1]));
      const n = +ml[2];
      if (punyaSub(bl) && n >= 1 && n <= SUB.length) {
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
