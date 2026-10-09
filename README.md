# English Reading

Latihan membaca bahasa Inggris untuk siswa. Halaman statis (HTML + JavaScript),
tanpa database dan tanpa login.

| Berkas | Isi |
|---|---|
| `index.html` | Halaman aplikasi |
| `bacaan.js` | Daftar bacaan (judul, tingkat, teks, terjemahan). Tambah bacaan di sini |
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
