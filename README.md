# English Reading

Latihan membaca bahasa Inggris untuk siswa. Halaman statis (HTML + JavaScript),
tanpa database dan tanpa login.

| Berkas | Isi |
|---|---|
| `index.html` | Halaman aplikasi |
| `bacaan.js` | Peta 6 tahap (TAHAP, sampai Level TKA dan Level UTBK/SNBT) dan daftar bacaan per tahap; urutan di daftar = urutan level. Tambah bacaan di sini |
| `soal.js` | Soal pemahaman per bacaan (pertanyaan, pilihan, kunci, pembahasan), pernyataan benar/salah (`SOAL_BS`), dan kata penting tiap bacaan (`KATA_BACAAN`) |
| `pola.js` | Perakit kalimat acak untuk Latihan bertahap level Pola kalimat |
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

Tiap level *Bacaan* punya soal di `soal.js` (3 soal Tahap 1, 4 soal Tahap 2–3, lalu bank soal
gaya TKA di Tahap 4 dan gaya UTBK/SNBT di Tahap 5; lihat bagian terakhir). Urutan pilihan diacak tiap kali tampil.
Skor terbaik disimpan di perangkat (`er_paham`).

| Jenis level | Syarat tuntas (≥ 80%) |
|---|---|
| Kosakata, pola kalimat | pelafalan |
| Bacaan Tahap 1–2 | pelafalan **dan** pemahaman |
| Bacaan Tahap 3–5 | pemahaman (pelafalan sebagai latihan) |
| Semua level yang punya latihan bertahap (kosakata, pola, bacaan) | kelima sub level lulus (Baca & Koreksi sebagai latihan) |

## Latihan bertahap (sub level kosakata)

**Syarat sebelum sub level 1** (diatur di **⚙️ Pengaturan** di bagian bawah halaman utama, tersimpan per
perangkat di `er_setelan`), berlaku di semua level yang punya latihan bertahap:

| Pengaturan | Pilihan | Artinya |
|---|---|---|
| Mendengar | **Harus Dengar** (bawaan) / Tanpa Dengar | Teks level didengarkan dengan ▶ Dengarkan sampai kalimat terakhir. Boleh berhenti lalu dilanjutkan (mis. dari kalimat yang diketuk); yang dihitung, semua kalimat pernah selesai dibacakan. Tercatat per level di `er_dengar` (10 Okt 2026). |
| Membaca | **Harus Baca** (bawaan) / Tanpa Baca | Teks dibaca dengan Baca & Koreksi sampai selesai dengan akurasi minimal 50–90% (bawaan 75%; 9 Okt 2026). |

Halaman level menampilkan syarat yang masih berlaku, dengan ✓ untuk yang sudah terpenuhi. Dikecualikan:
browser tanpa suara (syarat dengar) atau tanpa pengenal suara (syarat baca), level yang sudah tuntas
sebelumnya, dan level yang sub levelnya sudah mulai dikerjakan. Pengaturan lama "Tanpa syarat" otomatis
menjadi Tanpa Baca.

Percontohan di **Greetings** (9 Okt 2026), lalu dipasang di ke-17 kelompok kosakata Tahap 0.
Aktif otomatis di level kosakata yang punya `situasi` di `bacaan.js`.

| Sub level | Bentuk soal |
|---|---|
| 1 Kenali | kata → pilih arti, atau arti → pilih kata |
| 2 Dengar | kata dibacakan → pilih tulisannya; kalimat dibacakan → pilih artinya |
| 3 Situasi | situasi/konteks berbahasa Indonesia → pilih kata yang tepat |
| 4 Lengkapi & susun | kalimat rumpang (dengan artinya) atau susun kata acak |
| 5 Ucapkan | arti atau situasi → siswa mengucapkan bahasa Inggrisnya (pengenal suara ≥ 70%; diketik bila browser tanpa pengenal suara) |

- Soal dibuat acak dari `kosakata`, `contohLain` (2–3 contoh kalimat tambahan per kata,
  dengan arti) dan `situasi` (`s` situasi, `j` jawaban, `juga` ungkapan lain yang juga
  pantas: tidak dijadikan pengecoh dan ikut diterima di sub level 5).
- Tiap sesi 10 soal (satu per kata; Situasi = 10 situasi acak). Yang salah diulang di akhir
  sesi dengan soal baru untuk kata yang sama. Lulus = ≥ 80% benar pada percobaan pertama.
- Sub level berikutnya terbuka setelah yang sebelumnya lulus; level tuntas bila kelimanya lulus.
  Lulus sub level 5 memasukkan semua kata ke Ulang kosakata; kata yang salah diucapkan di
  sub level 5 juga masuk (kotak 1).
- Level yang sudah tuntas lewat Baca & Koreksi sebelum sub level dipasang dianggap lulus semua
  sub levelnya (dicatat sekali di `er_sub_cek`). Skor sub level: `er_sub` di perangkat.
- `mirip` (opsional, per level): kata yang terjemahannya sama, mis. `[['he', 'she']]` ("dia"),
  tidak saling dijadikan pengecoh kalimat rumpang.
- Sub level 5 menerima kata sebunyi (`HOMOFON` di `app.js`, mis. to/two, our/hour) karena
  pengenal suara bisa menuliskan salah satunya; kata pendek disarankan diucapkan dalam kalimat.
- Menambah ke level lain: isi `contohLain` dan `situasi` seperti di Greetings. Contoh kalimat
  sebaiknya memuat kata/frasanya utuh (untuk kalimat rumpang) dan 3–8 kata (untuk susun kata).

## Latihan bertahap pola kalimat

Sejak 9 Okt 2026 kesembilan level *Pola kalimat* (Tahap 1–3) juga punya 5 sub level. Kalimatnya
tidak diambil dari bank soal, tetapi **dirakit acak oleh `pola.js`** dari daftar subjek, kata kerja
(beserta bentuk -s, -ing, lampau), keterangan, dan artinya, sehingga hampir tidak pernah berulang.
Tiap kalimat menandai satu bagian yang diuji (mis. am/is/are, -s, do/does, bentuk lampau,
kata penghubung) beserta bentuk kelirunya dan aturannya.

| Sub level | Bentuk soal |
|---|---|
| 1 Pilih bentuk | kalimat rumpang → pilih bentuk yang tepat |
| 2 Benar atau salah | kalimat (separuhnya sengaja keliru) → benar/salah, lalu ditunjukkan yang benar |
| 3 Lengkapi | kalimat rumpang + petunjuk bentuk dasar → ketik bentuk yang tepat |
| 4 Susun kalimat | kata-kata acak → susun (dengan artinya) |
| 5 Terjemahkan & ucapkan | arti bahasa Indonesia → ucapkan kalimat bahasa Inggrisnya |

- Sub level 5 dinilai per kata seperti Baca & Koreksi: lulus bila bagian yang diuji tepat dan kata
  yang meleset ≤ 20% (minimal 1 boleh meleset). Bentuk singkat (don't, isn't, can't) disamakan
  dengan bentuk panjangnya; untuk masa depan, will dan be going to sama-sama diterima.
- Menambah variasi: tambah baris di daftar `pola.js` (subjek, kegiatan, waktu, dsb.). Menambah
  pola baru: tulis satu fungsi perakit dan daftarkan di `window.POLA_GEN` dengan id levelnya.

## Latihan bertahap bacaan

Sejak 9 Okt 2026 ke-14 level *Bacaan* (Tahap 1–4) juga punya 5 sub level. Teksnya tetap; variasi
datang dari teks itu sendiri (kalimat dan terjemahannya) dan bank soal.

| Sub level | Bentuk soal | Sumber |
|---|---|---|
| 1 Kosakata bacaan | kata ↔ arti, dengan kalimat dari teks | `KATA_BACAAN` (8–10 kata per bacaan) |
| 2 Dengar & pahami | kalimat teks dibacakan → pilih artinya | otomatis dari teks + terjemahan |
| 3 Urutkan | 4 kalimat berurutan (Tahap 4: 3) diacak → susun kembali | otomatis |
| 4 Pemahaman | 10 soal acak dari bank pilihan ganda (`SOAL`) + benar/salah (`SOAL_BS`), selalu dengan pembahasan | 14–17 soal per bacaan |
| 5 Baca kalimat / Rumpang teks | Tahap 1–2: membaca 6 kalimat teks keras-keras, dinilai per kata. Tahap 3–4 (atau browser tanpa pengenal suara): kalimat teks dengan satu kata penting dihilangkan → pilih katanya | otomatis |

- Bagian *Soal pemahaman* lama di halaman bacaan diganti sub level 4.
- Bacaan yang sudah tuntas dengan syarat lama (pelafalan dan/atau pemahaman ≥ 80%) dianggap lulus
  semua sub level.
- Menambah bacaan baru dengan latihan bertahap: isi `SOAL` (≥ 8 soal), `SOAL_BS` (≥ 6), dan
  `KATA_BACAAN` (kata harus tertulis persis di teks). Terjemahan (`arti`) harus sejajar per kalimat.

## Level TKA dan Level UTBK/SNBT (10 Okt 2026)

- **Tahap 4 · Level TKA** (B1–B1+): 6 bacaan dengan genre berbeda: discussion, analytical exposition,
  news item (`river-cleanup`), email resmi (`email-science-fair`), report (`komodo`), dan narrative
  (`lake-toba`). 12–14 soal + 6 benar/salah per bacaan.
- **Tahap 5 · Level UTBK/SNBT** (B2): 4 bacaan lebih panjang: ilmiah populer (`sleep-memory`), isu
  lingkungan kota (`urban-heat`), teknologi/discussion (`ai-classroom`), dan sejarah (`spice-trade`).
  14 soal + 6 benar/salah per bacaan; pilihan ganda 5 opsi (A–E).
- Kisi-kisi soal mengikuti TKA/SNBT: pemahaman (ide pokok, judul, informasi rinci, makna kata, rujukan),
  penerapan (tujuan teks, menerapkan isi teks ke situasi baru), dan penalaran (inferensi, simpulan, sikap
  dan nada penulis, organisasi teks, hubungan antarparagraf, pernyataan yang memperkuat/melemahkan
  argumen). Tingkat kesulitan dari setara sampai satu tingkat di atasnya.
- Bentuk soal di `SOAL` (sub level 4 Pemahaman mengambil 10 soal acak dari `SOAL` + `SOAL_BS`):

  | Bentuk | Penulisan di `soal.js` |
  |---|---|
  | Pilihan ganda (4–5 opsi) | `{ t, p: [...], j: 0, b }` |
  | Pilihan ganda kompleks (jawaban benar lebih dari satu) | `{ t, p: [...], j: [0, 2], b }`; benar bila semua kunci dipilih dan tidak ada yang keliru |
  | Benar/salah per pernyataan (tabel) | `{ t, bs: [[pernyataan, true/false], ...], b }`; benar bila semua baris tepat, baris yang keliru ditunjukkan |

  Bentuk kompleks dan tabel hanya tampil di Latihan bertahap (bagian *Soal pemahaman* lama melewatinya).
- Di sub level 4 Tahap 4–5 ada **📄 Lihat teks bacaan**, seperti ujian sungguhan yang menyertakan teksnya.

