# English Reading

Latihan membaca bahasa Inggris untuk siswa. Halaman statis (HTML + JavaScript),
tanpa database dan tanpa login.

| Berkas | Isi |
|---|---|
| `index.html` | Halaman aplikasi |
| `bacaan.js` | Peta 5 tahap (TAHAP) dan daftar bacaan per tahap; urutan di daftar = urutan level. Tambah bacaan di sini |
| `soal.js` | Soal pemahaman per bacaan (pertanyaan, pilihan, kunci, pembahasan) |
| `app.js` | Pemutar suara, koreksi bacaan, soal pemahaman, ulang kosakata |
| `gaya.css` | Tampilan (palet sama dengan Matdas / Petualangan) |

## Cara kerja

1. **Dengarkan** — paragraf dibacakan per kalimat dengan suara bawaan browser
   (`speechSynthesis`); kalimat yang sedang dibaca disorot. Kecepatan dan suara
   (en-US / en-GB, tergantung perangkat) bisa dipilih dan diingat di perangkat.
2. **Ketuk kata** — kata itu dibacakan pelan; tombol Dengarkan lalu mulai dari
   kalimat kata tersebut.
3. **Baca & Koreksi** — siswa membaca keras-keras; pengenal suara browser
   (`SpeechRecognition`, Chrome/Safari, perlu internet dan izin mikrofon)
   mengubah suara menjadi teks, lalu dicocokkan per kata dengan bacaan:
   hijau = tepat, merah = perlu dilatih, abu-abu = belum dibaca. Skor = kata
   tepat ÷ kata yang dibaca. Skor terbaik disimpan di perangkat (localStorage)
   bila paragraf dibaca sampai akhir.
   Siswa boleh kembali membaca ulang kalimat sebelumnya (mis. sudah di kalimat 6,
   lalu mengulang kalimat 2): sisa ucapan diselaraskan lagi ke bagian mana pun di
   paragraf, asal paling sedikit dua kata berurutan cocok.

Koreksi ini menilai apakah kata **dikenali** sebagai kata yang benar, bukan
penilaian fonetik rinci (tekanan, intonasi).

## Menambah bacaan

Salin satu blok di `bacaan.js`, beri `id` unik. Tulis angka dengan huruf
("twenty") dan hindari singkatan bertitik ("Mr.") agar pemecahan kalimat dan
koreksi tetap tepat. Naikkan `?v=` di `index.html` setelah mengubah berkas.

## Mencoba di komputer

Mikrofon tidak diizinkan dari `file://`. Jalankan server lokal, misalnya
`npx serve .` di folder ini, lalu buka alamat yang ditampilkan di Chrome.

## Jenis level dan pengulangan

- **Kosakata** (Tahap 0): 17 kelompok × 10 kata. Tiap kata punya arti dan satu
  contoh kalimat. Ditulis di `bacaan.js` sebagai `kosakata: [kata, arti, contoh, arti contoh]`;
  teksnya dibentuk otomatis menjadi "kata. contoh kalimat." agar bisa didengar dan dikoreksi.
- **Pola kalimat** (Tahap 1–3): `pola` (rumus), `catatan` (penjelasan), lalu contoh kalimat.
- **Bacaan**: paragraf biasa.
- **Ulang kosakata** (`#ulang`): sistem kotak 1–5. Kata masuk saat level kosakata dibaca
  utuh, atau saat kata di bacaan bernilai < 60%. Diucapkan ≥ 85% saat jatuh tempo → naik
  kotak (diulang lagi 1, 2, 4, 7, 14 hari); belum tepat → kotak 1, diulang besok.
  Disimpan di perangkat (`localStorage`, kunci `er_dek`).

## Soal pemahaman dan syarat tuntas

Tiap level *Bacaan* punya soal pilihan ganda di `soal.js` (3 soal Tahap 1, 4 soal
Tahap 2–3, 5 soal Tahap 4 gaya TKA). Urutan pilihan diacak tiap kali tampil.
Skor terbaik disimpan di perangkat (`er_paham`).

| Jenis level | Syarat tuntas (≥ 80%) |
|---|---|
| Kosakata, pola kalimat | pelafalan |
| Bacaan Tahap 1–2 | pelafalan **dan** pemahaman |
| Bacaan Tahap 3–4 | pemahaman (pelafalan sebagai latihan) |
