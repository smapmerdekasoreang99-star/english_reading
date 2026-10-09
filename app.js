/* English Reading — dengarkan paragraf, lalu baca sendiri dan dikoreksi per kata.
   Suara: speechSynthesis (bawaan browser). Koreksi: SpeechRecognition (Chrome),
   hasil pengenalan dicocokkan dengan teks memakai LCS per kata. */
(function () {
  'use strict';

  const $ = (s, el) => (el || document).querySelector(s);
  const layar = $('#layar');
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const bisaSuara = 'speechSynthesis' in window;
  const android = /Android/i.test(navigator.userAgent);
  const TINGKAT = ['Dasar', 'Menengah', 'Lanjut'];
  const LAJU = [[0.6, 'Sangat pelan'], [0.75, 'Pelan'], [0.9, 'Sedang'], [1, 'Normal']];

  function baca(kunci, awal) {
    try { const v = localStorage.getItem(kunci); return v === null ? awal : JSON.parse(v); } catch (e) { return awal; }
  }
  function tulis(kunci, nilai) {
    try { localStorage.setItem(kunci, JSON.stringify(nilai)); } catch (e) { /* abaikan */ }
  }
  const setelan = Object.assign({ suara: '', laju: 0.9 }, baca('er_setelan', {}));
  const skorTerbaik = baca('er_skor', {});

  function esc(s) {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }
  function norm(w) {
    return w.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9']/g, '').replace(/^'+|'+$/g, '');
  }

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
  function pecah(teks) {
    const kata = [];
    const kalimat = (teks.match(/[^.!?]+[.!?]+["'”’]?|[^.!?]+$/g) || []).map(s => s.trim()).filter(Boolean).map((s, k) => {
      const daftar = [];
      const re = /[^\s-]+-?|-/g;
      let m;
      while ((m = re.exec(s))) {
        const w = { asli: m[0], norm: norm(m[0]), posisi: m.index, k: k, i: -1 };
        if (w.norm) { w.i = kata.length; kata.push(w); }
        daftar.push(w);
      }
      return { teks: s, kata: daftar };
    });
    return { kalimat, kata };
  }

  // ---------- Pencocokan bacaan ----------
  const ANGKA = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  function kataUcapan(transkrip) {
    return transkrip.replace(/-/g, ' ').split(/\s+/).map(norm).filter(Boolean)
      .map(w => (/^\d+$/.test(w) && ANGKA[+w]) ? ANGKA[+w] : w);
  }
  function sama(a, b) {
    return a === b || a.replace(/'/g, '') === b.replace(/'/g, '');
  }
  // LCS: tandai kata teks mana yang muncul berurutan di ucapan.
  function cocokkan(target, ucap) {
    const n = target.length, m = ucap.length;
    const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        dp[i][j] = sama(target[i], ucap[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
    const hasil = new Array(n).fill(false);
    let i = 0, j = 0;
    while (i < n && j < m) {
      if (sama(target[i], ucap[j]) && dp[i][j] === dp[i + 1][j + 1] + 1) { hasil[i] = true; i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
      else j++;
    }
    return hasil;
  }

  // ---------- Keadaan halaman baca ----------
  let kini = null;            // { b, kalimat, kata, pilihK }
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
    const u = ucapan(teks.replace(/[^A-Za-z0-9'’-]/g, ''), Math.min(setelan.laju, 0.8));
    if (w) sorotKata(w);
    u.onend = () => { if (token === putar.token) sorotKata(null); };
    speechSynthesis.speak(u);
  }

  function pilihKalimat(k) {
    kini.pilihK = k;
    const p = $('#t-putar');
    if (p) p.textContent = k > 0 ? `▶ Dengarkan dari kalimat ${k + 1}` : '▶ Dengarkan';
  }

  // ---------- Koreksi bacaan ----------
  function bersihkanKoreksi() {
    if (!kini) return;
    kini.kata.forEach(w => w.el.classList.remove('benar', 'salah', 'lewat'));
    $('#hasil').innerHTML = '';
    $('#legenda').hidden = true;
  }
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
        : 'Ketuk sebuah kata untuk mendengar cara membacanya.';
    }
  }

  function mulaiRekam() {
    if (!SR) {
      $('#hasil').innerHTML = '<div class="pesan">Koreksi bacaan membutuhkan pengenal suara. Gunakan <b>Google Chrome</b> (Android atau komputer) atau Safari terbaru, dan pastikan tersambung ke internet.</div>';
      return;
    }
    hentikanSuara();
    bersihkanKoreksi();
    rekam = { aktif: true, rec: null, sesiLalu: [], sesiIni: '', galat: '' };
    tombolRekam(true);
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
    rekam.sesiIni = '';
    r.onresult = e => {
      if (!rekam || rekam.rec !== r) return;
      let t = '';
      for (let i = 0; i < e.results.length; i++) t += ' ' + e.results[i][0].transcript;
      rekam.sesiIni = t;
      tandaiLangsung();
    };
    r.onerror = e => {
      if (!rekam || rekam.rec !== r) return;
      if (e.error !== 'no-speech' && e.error !== 'aborted') rekam.galat = e.error;
    };
    r.onend = () => {
      if (!rekam || rekam.rec !== r) return;
      if (rekam.sesiIni.trim()) rekam.sesiLalu.push(rekam.sesiIni);
      rekam.sesiIni = '';
      if (rekam.aktif && !rekam.galat) {
        try { jalankanPengenal(); return; } catch (err) { rekam.galat = 'gagal-mulai'; }
      }
      selesaiRekam();
    };
    try { r.start(); } catch (err) { rekam.galat = 'gagal-mulai'; selesaiRekam(); }
  }

  function transkrip(r) {
    return (r.sesiLalu.join(' ') + ' ' + r.sesiIni).replace(/\s+/g, ' ').trim();
  }

  function tandaiLangsung() {
    const cocok = cocokkan(kini.kata.map(w => w.norm), kataUcapan(transkrip(rekam)));
    kini.kata.forEach((w, i) => w.el.classList.toggle('benar', cocok[i]));
  }

  function hentikanRekam() {
    if (!rekam) return;
    rekam.aktif = false;
    try { rekam.rec.stop(); } catch (e) { selesaiRekam(); }
  }
  function batalkanRekam() {
    if (!rekam) return;
    const r = rekam;
    rekam = null;
    try { r.rec.abort(); } catch (e) { /* abaikan */ }
    tombolRekam(false);
  }

  const PESAN_GALAT = {
    'not-allowed': 'Izin mikrofon ditolak. Izinkan mikrofon untuk halaman ini (ikon gembok di samping alamat), lalu coba lagi.',
    'service-not-allowed': 'Pengenal suara tidak diizinkan di browser ini. Gunakan Google Chrome.',
    'audio-capture': 'Mikrofon tidak ditemukan. Periksa mikrofon atau headset.',
    'network': 'Pengenal suara membutuhkan internet. Periksa sambungan (atau matikan VPN), lalu coba lagi.',
    'language-not-supported': 'Bahasa Inggris tidak didukung pengenal suara di perangkat ini.',
    'gagal-mulai': 'Pengenal suara gagal dinyalakan. Muat ulang halaman, lalu coba lagi.'
  };

  function selesaiRekam() {
    if (!rekam) return;
    const r = rekam;
    rekam = null;
    tombolRekam(false);
    const hasilEl = $('#hasil');
    const teksUcap = transkrip(r);
    const ucap = kataUcapan(teksUcap);
    if (!ucap.length) {
      kini.kata.forEach(w => w.el.classList.remove('benar'));
      hasilEl.innerHTML = `<div class="pesan">${esc(PESAN_GALAT[r.galat] || (r.galat ? 'Pengenal suara berhenti (' + r.galat + '). Coba lagi.' : 'Tidak ada suara yang terdengar. Dekatkan mikrofon dan bacalah lebih keras.'))}</div>`;
      return;
    }

    const cocok = cocokkan(kini.kata.map(w => w.norm), ucap);
    const akhir = cocok.lastIndexOf(true);
    // Kata setelah kata terakhir yang dikenali dianggap belum dibaca, bukan salah.
    const dibaca = akhir + 1;
    let benar = 0;
    const salah = [];
    kini.kata.forEach((w, i) => {
      const ok = cocok[i];
      const lewat = !ok && i > akhir;
      w.el.classList.toggle('benar', ok);
      w.el.classList.toggle('salah', !ok && !lewat);
      w.el.classList.toggle('lewat', lewat);
      if (ok) benar++;
      else if (!lewat && !salah.some(x => x.norm === w.norm)) salah.push(w);
    });
    const total = kini.kata.length;
    const sisa = total - dibaca;
    const persen = dibaca ? Math.round(benar * 100 / dibaca) : 0;
    // Skor terbaik hanya dicatat bila paragraf dibaca (hampir) sampai akhir.
    const lengkap = sisa <= Math.max(2, Math.round(total * 0.05));
    let rekor = false;
    if (lengkap && (skorTerbaik[kini.b.id] == null || persen > skorTerbaik[kini.b.id])) {
      skorTerbaik[kini.b.id] = persen;
      tulis('er_skor', skorTerbaik);
      rekor = true;
    }
    const kelas = persen >= 85 ? 'baik' : persen >= 60 ? 'sedang' : 'kurang';
    const pujian = persen >= 95 ? 'Excellent! 🎉' : persen >= 85 ? 'Great job! 👍' : persen >= 60 ? 'Good, keep practicing!' : 'Keep trying, you can do it!';

    $('#legenda').hidden = false;
    hasilEl.innerHTML = `<div class="hasil">
      <h2>Hasil bacaan</h2>
      <div class="skor ${kelas}"><b>${persen}%</b><span>${pujian}</span></div>
      <p>${benar} dari ${dibaca} kata yang kamu baca terdengar tepat.${sisa > 0 ? ` <b>${sisa} kata di akhir belum dibaca.</b>` : ''}${rekor ? ' 🏅 Skor terbaik baru!' : ''}</p>
      ${salah.length ? `<p>Latih kata berikut (ketuk untuk mendengar):</p>
        <div class="chip-daftar">${salah.map(w => `<button class="chip" data-ucap="${esc(w.asli)}">${esc(w.asli.replace(/[^A-Za-z0-9'’-]/g, ''))}</button>`).join('')}</div>`
        : (dibaca ? '<p>Semua kata yang kamu baca terdengar tepat. 👏</p>' : '')}
      <details><summary>Yang terdengar oleh aplikasi</summary><p>${esc(teksUcap)}</p></details>
      <p class="catatan">Koreksi memakai pengenal suara otomatis. Kata merah berarti tidak dikenali sebagai kata yang benar,
        bisa karena pelafalan, membaca terlalu cepat, atau suara kurang jelas. Dengarkan contohnya lalu coba lagi.</p>
    </div>`;
  }

  // ---------- Tampilan ----------
  function tampilDaftar() {
    kini = null;
    layar.innerHTML = `<header class="judul-app"><h1>📖 English Reading</h1>
        <p>Dengarkan bacaan, lalu baca sendiri dan lihat koreksinya.</p></header>` +
      TINGKAT.map(t => {
        const isi = window.BACAAN.filter(b => b.tingkat === t);
        if (!isi.length) return '';
        return `<section class="kelompok"><h2>${t}</h2><div class="daftar">${isi.map(b => {
          const nKata = (b.teks.match(/\S+/g) || []).length;
          const s = skorTerbaik[b.id];
          return `<a class="kartu" href="#baca/${encodeURIComponent(b.id)}"><span class="kartu-judul">${esc(b.judul)}</span>
            <span class="kartu-info">${nKata} kata${s != null ? ` · skor terbaik <b>${s}%</b>` : ''}</span></a>`;
        }).join('')}</div></section>`;
      }).join('') +
      (bisaSuara ? '' : '<div class="pesan">Browser ini tidak bisa membacakan teks. Gunakan Google Chrome versi terbaru.</div>');
  }

  function tampilBaca(b) {
    const p = pecah(b.teks);
    kini = { b, kalimat: p.kalimat, kata: p.kata, pilihK: 0 };
    const teksHTML = p.kalimat.map((kal, k) => `<span class="kal" data-k="${k}">` +
      kal.kata.map((w, j) => {
        const isi = w.i >= 0 ? `<span class="kata" data-w="${w.i}">${esc(w.asli)}</span>` : esc(w.asli);
        const jeda = j < kal.kata.length - 1 && !w.asli.endsWith('-') ? ' ' : '';
        return isi + jeda;
      }).join('') + '</span>').join(' ');

    layar.innerHTML = `
      <div class="bar-atas"><a href="#" class="kembali">← Daftar bacaan</a><span class="label-tingkat">${esc(b.tingkat)}</span></div>
      <h1 class="judul-bacaan">${esc(b.judul)}</h1>
      <div class="kendali">
        <button id="t-putar" class="tombol utama"${bisaSuara ? '' : ' disabled'}>▶ Dengarkan</button>
        <button id="t-henti" class="tombol" hidden>⏹ Berhenti</button>
        <button id="t-rekam" class="tombol rekam">🎤 Baca &amp; Koreksi</button>
      </div>
      <div class="setelan">
        <label>Kecepatan <select id="pilih-laju">${LAJU.map(([v, t]) => `<option value="${v}"${v === setelan.laju ? ' selected' : ''}>${t}</option>`).join('')}</select></label>
        <label>Suara <select id="pilih-suara"></select></label>
      </div>
      <p class="petunjuk" id="petunjuk">Ketuk sebuah kata untuk mendengar cara membacanya.</p>
      <div class="teks" id="teks">${teksHTML}</div>
      <div class="legenda" id="legenda" hidden><span class="l-benar">tepat</span><span class="l-salah">perlu dilatih</span><span class="l-lewat">belum dibaca</span></div>
      <div id="hasil"></div>
      <details class="arti"><summary>Terjemahan (Bahasa Indonesia)</summary><p>${esc(b.arti)}</p></details>`;

    p.kalimat.forEach((kal, k) => { kal.el = layar.querySelector(`.kal[data-k="${k}"]`); });
    p.kata.forEach(w => { w.el = layar.querySelector(`.kata[data-w="${w.i}"]`); });
    if (bisaSuara) isiPilihSuara($('#pilih-suara'));
    else $('#pilih-suara').closest('label').hidden = true;

    $('#t-putar').onclick = () => mulaiPutar(kini.pilihK);
    $('#t-henti').onclick = hentikanSuara;
    $('#t-rekam').onclick = () => (rekam ? hentikanRekam() : mulaiRekam());
    $('#pilih-laju').onchange = e => { setelan.laju = +e.target.value; tulis('er_setelan', setelan); };
    $('#pilih-suara').onchange = e => { setelan.suara = e.target.value; tulis('er_setelan', setelan); };
    $('#teks').onclick = e => {
      const el = e.target.closest('.kata');
      if (!el || rekam) return;
      const w = kini.kata[+el.dataset.w];
      pilihKalimat(w.k);
      ucapKata(w.asli, w);
    };
    $('#hasil').onclick = e => {
      const c = e.target.closest('[data-ucap]');
      if (c) ucapKata(c.dataset.ucap);
    };
  }

  function rute() {
    hentikanSuara();
    batalkanRekam();
    const m = location.hash.match(/^#baca\/(.+)$/);
    const id = m ? decodeURIComponent(m[1]) : '';
    const b = window.BACAAN.find(x => x.id === id);
    if (b) tampilBaca(b); else tampilDaftar();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', rute);
  // Chrome kadang tetap bersuara setelah halaman ditinggalkan.
  window.addEventListener('pagehide', () => { if (bisaSuara) speechSynthesis.cancel(); });
  rute();
})();
