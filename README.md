# English Reading

Latihan membaca bahasa Inggris untuk siswa. Halaman statis (HTML + JavaScript),
tanpa database dan tanpa login.

| Berkas | Isi |
|---|---|
| `index.html` | Halaman aplikasi |
| `bacaan.js` | Peta 5 tahap (TAHAP) dan daftar bacaan per tahap; urutan di daftar = urutan level. Tambah bacaan di sini |
| `app.js` | Pemutar suara dan koreksi bacaan |
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
