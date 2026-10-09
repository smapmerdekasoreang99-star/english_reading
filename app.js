/* English Reading — dengarkan paragraf, lalu baca sendiri dan dikoreksi per kata.
   Suara: speechSynthesis (bawaan browser). Koreksi: SpeechRecognition (Chrome),
   hasil pengenalan dicocokkan dengan teks memakai LCS per kata. Grafik suara
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
  const skorTerbaik = baca('er_skor', {});

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
  // LCS: untuk tiap kata teks, indeks kata ucapan pasangannya (-1 bila tidak ada).
  function cocokkan(target, ucap) {
    const n = target.length, m = ucap.length;
    const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        dp[i][j] = sama(target[i], ucap[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
    const pasangan = new Array(n).fill(-1);
    let i = 0, j = 0;
    while (i < n && j < m) {
      if (sama(target[i], ucap[j]) && dp[i][j] === dp[i + 1][j + 1] + 1) { pasangan[i] = j; i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
      else j++;
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
  const petunjukAwal = b => (b && b.kosakata
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

  // Ajakan naik level setelah membaca utuh dengan skor tuntas.
  function lanjutHTML(persen, lengkap) {
    const p = posisiLevel(kini.b);
    if (!lengkap) return '<p class="lanjut">Baca paragraf sampai akhir agar skormu tercatat.</p>';
    if (persen < TUNTAS) return `<p class="lanjut">Capai ${TUNTAS}% untuk menuntaskan level ini. Latih kata di atas, lalu coba lagi.</p>`;
    if (!p.sesudah) return '<p class="lanjut">🏆 Kamu sudah sampai level terakhir. Hebat!</p>';
    const naik = p.sesudah.tahap !== kini.b.tahap;
    return `<p class="lanjut">${naik ? `🎉 Tahap ${kini.b.tahap} selesai! ` : ''}Level ini tuntas.</p>
      <a class="tombol utama" href="#baca/${encodeURIComponent(p.sesudah.id)}">Lanjut: ${labelLevel(p.sesudah)} →</a>`;
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
      ${lanjutHTML(persen, lengkap)}
      <details><summary>Yang terdengar oleh aplikasi</summary><p>${esc(teksUcap)}</p></details>
      <p class="catatan">Angka di bawah tiap kata adalah perkiraan dari pengenal suara otomatis: kata yang dikenali memakai
        tingkat keyakinan pengenal, kata yang tidak dikenali memakai kemiripan dengan kata yang terdengar. Belum menilai tekanan
        dan intonasi. Dengarkan contohnya lalu coba lagi.</p>
    </div>`;
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
        const tuntas = isi.filter(b => skorTerbaik[b.id] >= TUNTAS).length;
        return `<section class="tahap${tuntas === isi.length ? ' selesai' : ''}">
          <div class="tahap-kepala"><span class="tahap-no">${t.no}</span>
            <div><h2>${esc(t.nama)}</h2><span class="tahap-setara">${esc(t.setara)}</span></div>
            <span class="tahap-progres">${tuntas}/${isi.length} tuntas</span></div>
          <p class="tahap-fokus">${esc(t.fokus)}</p>
          <div class="daftar">${isi.map((b, i) => {
            const s = skorTerbaik[b.id];
            const jenis = jenisLevel(b);
            const ukuran = b.kosakata ? `${b.kosakata.length} kata · ${esc(b.kelompok)}` : `${(b.teks.match(/\S+/g) || []).length} kata`;
            const ok = s >= TUNTAS;
            return `<a class="kartu${ok ? ' tuntas' : ''}" href="#baca/${encodeURIComponent(b.id)}">
              <span class="kartu-level">${ok ? '✓' : i + 1}</span>
              <span class="kartu-isi"><span class="kartu-judul">${esc(b.judul)}</span>
              <span class="kartu-info"><span class="jenis jenis-${jenis.kunci}">${jenis.nama}</span> Level ${i + 1} · ${ukuran}${s != null ? ` · skor terbaik <b>${s}%</b>` : ''}</span></span></a>`;
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
  }

  function rute() {
    hentikanSuara();
    batalkanRekam();
    batalUlang();
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
