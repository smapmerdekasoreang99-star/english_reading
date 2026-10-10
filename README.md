# English Reading

Latihan membaca bahasa Inggris untuk siswa. Halaman statis (HTML + JavaScript).
Sejak 10 Okt 2026 sistemnya meniru Matematika Dasar: siswa masuk dengan NISN (+ kode akses saat sesi kelas),
guru masuk dengan PIN, dan kemajuan tersimpan di database Tryout (lihat
[Login siswa, sesi kelas, dan halaman guru](#login-siswa-sesi-kelas-dan-halaman-guru-10-okt-2026)).

| Berkas | Isi |
|---|---|
| `index.html` | Halaman siswa |
| `masuk.js` | Layar masuk siswa (NISN + kode akses), sinkron kemajuan ke server, kunci layar; memuat `app.js` sesudah masuk |
| `guru.html`, `guru.js` | Halaman guru (PIN), tampilan dan menu sama dengan Matdas: Sesi Kegiatan, Perkembangan Siswa, Analisis Siswa, Pengaturan & Tahapan Khusus, Pengaturan Umum, Tahapan Level, Admin |
| `assets/dasar.css`, `assets/matdas.css`, `assets/umum.js`, `assets/excel.js`, `assets/kepala-excel.js`, `assets/simpan.js` | Salinan berkas bersama dari Matematika_Dasar/assets (token tampilan, komponen guru, unduhan Excel berkop) |
| `config.js` | Alamat dan kunci publik project Supabase Tryout (sama dengan Matdas) |
| `bacaan.js` | Peta 6 tahap (TAHAP, sampai Level TKA dan Level UTBK/SNBT) dan daftar bacaan per tahap; urutan di daftar = urutan level. Tambah bacaan di sini |
| `soal.js` | Soal pemahaman per bacaan (pertanyaan, pilihan, kunci, pembahasan), pernyataan benar/salah (`SOAL_BS`), dan kata penting tiap bacaan (`KATA_BACAAN`) |
| `pola.js` | Perakit kalimat acak untuk Latihan bertahap level Pola kalimat |
| `app.js` | Pemutar suara, koreksi bacaan, soal pemahaman, ulang kosakata |
| `gaya.css` | Tampilan halaman siswa; token warna dan huruf dari `assets/dasar.css` (sama dengan Matdas) |

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

## Ilustrasi level (10 Okt 2026)

Level yang diberi `ilustrasi` di `bacaan.js` mendapat gambar bantu di atas teksnya (`ilustrasiHTML` di `app.js`).
Jenis yang ada (10 Okt 2026): `jam` (*Telling the Time*), `pekan` (*Days of the Week*), `kalender` (*Months of the Year*),
`belanja` (*Money and Shopping*: rak berlabel harga + struk dan kembalian), `tubuh` (*Parts of the Body*), `denah` (*Rooms of the House*),
`kisi` (kisi emoji dari `ikon` di `bacaan.js`, mis. *Feelings*, *Weather*, *Clothes*, *Animals*, *Jobs*, *Transportation*, *Hobbies*,
*Classroom Expressions*; `catatanIlus` opsional), serta untuk level lama `warna` (*Colors*), `keluarga` (*Family*), `peta`
(*Places and Directions*), dan `preposisi` (*Prepositions*: bola dan kotak). Ketuk bagian gambar: kalimatnya tampil dan dibacakan.

Kecepatan suara bawaan **Pelan** (0,75) sejak 10 Okt 2026; pilihan Kecepatan yang pernah dipilih siswa sendiri (`setelan.lajuDipilih`) tetap dipakai.

Rincian jam: muka jam (SVG buatan sendiri) dengan sebutan tiap 5 menit, sisi kanan
*past* (hijau) dan sisi kiri *to* (biru), serta tabel contoh satu jam penuh (2:00 It's two o'clock … 2:55 It's five to three).
Jamnya bisa diganti dengan ◀ ▶. Ketuk sebutan atau contoh: jarum bergerak dan kalimatnya dibacakan.

## Bilangan dan jam dari pengenal suara

Pengenal suara sering menuliskan bilangan sebagai angka. Sebelum dicocokkan dengan teks, `bilanganKeKata`
di `app.js` mengubahnya ke kata: `1,000,000` / `Rp50.000` → one million / fifty thousand, `21st` →
twenty first, `7:30` → half past seven, `8:45` → quarter to nine, `7:00` → seven o'clock. Karena itu teks
menulis jam dengan gaya past/to dan bilangan tanpa "and" (one thousand two hundred).

## Menambah bacaan

Salin satu blok di `bacaan.js`, beri `id` unik. Tulis angka dengan huruf
("twenty") dan hindari singkatan bertitik ("Mr.") agar pemecahan kalimat dan
koreksi tetap tepat. Naikkan `?v=` di `index.html` setelah mengubah berkas.

## Mencoba di komputer

Mikrofon tidak diizinkan dari `file://`. Jalankan server lokal, misalnya
`npx serve .` di folder ini, lalu buka alamat yang ditampilkan di Chrome.

## Jenis level dan pengulangan

- **Kosakata** (Tahap 0): 35 kelompok × 10 kata (Months of the Year 12) (sejak 10 Okt 2026 termasuk *Numbers 11 to 100*,
  *Big Numbers* sampai puluhan juta, *Ordinal Numbers* 1st–10th dan 11th–50th, dan *Telling the Time*). Tiap kata punya arti dan satu
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

Percontohan di **Greetings** (9 Okt 2026), lalu dipasang di semua kelompok kosakata Tahap 0.
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

## Pengaturan & Tahapan: Umum dan Khusus (10 Okt 2026)

Meniru Matematika Dasar. Halaman **⚙️ Pengaturan & Tahapan** (`#pengaturan`, pintu di bawah daftar bacaan) punya dua tab:

- **Umum** (`#pengaturan`): aturan bawaan perangkat (jumlah soal, syarat dengar/baca, bila jawaban salah) dan
  tahapan umum, yaitu semua tahap, level, dan sub level dipakai berurutan. Tersimpan di `er_setelan`.
- **Khusus** (`#pengaturan/khusus`): profil bernama yang menimpa Umum.
  - **Aturan:** isian yang dibiarkan "Ikut umum" memakai nilai Umum, satu per satu (`atur.x` di `app.js`).
  - **Tahapan:** checklist bertingkat. Tahap yang dimatikan mematikan levelnya, level yang dimatikan mematikan sub levelnya,
    dan ada tombol sub level massal per tahap (mis. hanya 6–10). Disimpan sebagai daftar yang *dimatikan*
    (`mati: { tahap, level, sub }`), jadi bacaan baru otomatis ikut dipakai.
  - Mulai dari awal atau dari contoh: Persiapan TKA, Persiapan UTBK/SNBT (sub level 6–10, 20 soal), Fondasi (Tahap 0–1), dan Teks Fungsional & Genre (Tahap 2–3).
  - Satu profil bisa dipakai pada satu waktu (`er_khusus`). Halaman depan lalu menampilkan spanduk dan hanya materi yang dipakai.
    Sub level yang tidak dipakai disembunyikan dan dilewati, dan level tuntas bila semua sub level yang dipakai lulus.
- **Sejak login siswa:** Pengaturan Umum dan tahapan khusus diatur guru di `guru.html` dan dikirim server saat siswa masuk.
  Di halaman siswa, menu ini hanya-baca: tab Khusus menampilkan tahapan yang dipasang untuknya, sedangkan editor dan
  tautan `#khusus=` dialihkan. Tautan `#khusus=` hanya berlaku pada mode luring tanpa server.

## Meniru tampilan dan fasilitas Matematika Dasar (10 Okt 2026)

Halaman guru dibangun ulang dari `Matematika_Dasar/guru.html` (CSS disalin apa adanya). Yang berbeda hanya editor
**Tahapan Khusus**, yang tetap memakai checklist tahap → level → sub level English Reading beserta aturannya.

- **Sesi Kegiatan:** saringan rombel/tingkat/status/cari, kotak sesi per rombel (buka 30–120 menit, **+ Tambah n menit**,
  **Tutup sekarang**, **QR & kode masuk** layar penuh, **Tampilkan teratas**), kotak aturan dan tahapan yang berlaku,
  ubin ringkasan, centang siswa → **Atur tahapan** / **Hapus data latihan**, **Unduh daftar** (.xlsx berkop).
- **Papan 10 teratas** (`er_teratas`): sejak sesi dibuka, urut sub level lulus → rata-rata nilai → banyak kegiatan;
  `guru.html?simulasi=teratas` untuk melihat tampilannya tanpa PIN.
- **Perkembangan Siswa:** Per Siswa (posisi, kemajuan, lulus 7 hari, rata-rata, waktu latihan, catatan Macet/Tidak aktif/
  Nilai rendah) dan Per Rombel (ubin, sebaran per tahap, perbandingan rombel), **Unduh rekap** (.xlsx).
- **Analisis Siswa:** catatan otomatis, grafik sub level lulus, kegiatan per jenis, per tahap, hasil di bawah 80%,
  riwayat sub level lulus, tahapan khusus siswa, hapus data latihan.
- **Pengaturan & Tahapan Khusus** (seperti Matdas, sejak 10 Okt 2026 aturan dan materi terpisah): cara sistem memilih
  (siswa → rombel → umum, terpisah untuk aturan dan tahapan), **Cek aturan siswa** beserta asal tiap isian,
  **1. Profil aturan** (`er_atur_profil`: jumlah soal, bila salah, batas salah, syarat dengar/baca, batas keluar halaman),
  **2. Tahapan khusus** (`er_profil`: materi saja, editor checklist + contoh siap pakai), **3. Untuk seluruh rombel**
  (dua pilihan: profil aturan dan tahapan), **4. Untuk siswa tertentu** (Sesi Kegiatan → centang → Atur aturan & tahapan,
  atau Analisis Siswa). Aturan lama yang dulu diisi di tahapan khusus dipindahkan otomatis menjadi profil aturan
  bernama sama dan dipasang ke rombel/siswa yang sama.
- **Pengaturan Umum** (admin): Halaman Latihan, Pengawasan keluar halaman, Aturan naik sub level, Sesi (lama satu sesi mandiri dalam menit, `durasi_menit`).
- **Tahapan Level:** 6 tahap → level → sub level. **Contoh** (kosakata/pola/bacaan + soal, Tampilkan Jawaban,
  Mode Layar Penuh), **Coba** (uji coba guru: `index.html#coba=<id level>`, data hanya di tab itu), dan admin bisa
  **menutup tahap/level/sub level** untuk tahapan umum (`er_pengaturan` umum.mati; tahapan khusus tidak terpengaruh).
- **Admin:** Guru dan PIN (tarik dari Data Induk, buat/ubah PIN berlapis dengan alasan dan riwayat, kartu PIN PNG,
  Unduh XLSX), PIN admin English Reading (`tka_privat.pin_admin_er`), Kosongkan data latihan (PIN kepala sekolah).

Halaman siswa memakai bilah atas, layar masuk (sambutan + 3 langkah + kartu masuk + **Masuk guru**), jam sisa sesi kelas,
tombol Keluar, dan pengawasan keluar halaman seperti Matdas: alarm bunyi + getar, layar peringatan, klik kanan dan salin
dicegah saat sesi kelas, layar kunci dengan kode buka. NISN tidak diingat di perangkat (satu HP bisa dipakai bergantian).

## Login siswa, sesi kelas, dan halaman guru (10 Okt 2026)

Meniru Matematika Dasar. Data di project Supabase Tryout, tabel dan fungsi berawalan `er_`
(`../database_tryout/kontrak/english_reading.sql`).

**Siswa** (`index.html` → `masuk.js`)
- Masuk dengan **NISN**. Siswa yang dipakai adalah semua siswa aktif `tka_siswa`, per rombel.
- Bila guru sedang membuka **sesi kelas** untuk rombelnya, siswa juga harus mengisi **kode akses** 4 angka.
  Kode itu bisa terisi otomatis lewat QR (`index.html#kode=XXXX`).
- Di luar sesi, siswa boleh **latihan mandiri** dengan NISN saja selama Pengaturan Umum "Latihan mandiri" = Boleh.
- Kemajuan (`er_skor`, `er_paham`, `er_sub`, dan seterusnya) dikirim ke server sekitar 1,5 detik sesudah berubah, dan
  diantre bila sedang luring. Riwayat nilai (sub level, Baca & Koreksi, dengar, pemahaman) dicatat di `er_hasil`.
- Kemajuan lama di perangkat **dipindahkan** ke akun siswa yang pertama kali masuk di perangkat itu, lalu digabung
  dengan mengambil nilai terbaik.
- Saat sesi kelas, keluar halaman dicatat. Bila melebihi batas di Pengaturan Umum, latihan dikunci sampai guru
  membuka kunci atau siswa mengetik kode buka.

**Guru** (`guru.html`, tautan "Guru / pengawas" di layar masuk siswa)
- Masuk dengan **PIN pribadi** yang sama dengan Tryout/Matdas (`mtd_guru`). Guru yang belum punya PIN bisa masuk
  sementara dengan ID gurunya. Admin masuk dengan PIN admin Matdas/operator.
- Guru hanya melihat **rombel Bahasa Inggris yang diajarnya**, sesuai jadwal KBM di Data Induk.
- 🏫 **Sesi Kegiatan:** buka sesi per rombel (30–120 menit), perpanjang 15 menit, atau tutup. Tersedia layar penuh
  berisi kode akses besar dan QR untuk proyektor, serta daftar siswa yang sedang aktif, terkunci, atau keluar halaman,
  dengan tombol buka kunci.
- 📈 **Perkembangan:** tabel per rombel berisi tahap sekarang, level tuntas, sub level lulus, hasil 7 hari, dan terakhir aktif.
  Angka ini dihitung di browser dari blob kemajuan memakai `bacaan.js`/`soal.js`/`pola.js` dan tahapan yang berlaku.
- 🔍 **Analisis Siswa:** kemajuan per tahap, sub level yang perlu perhatian (≥ 2 kali dicoba tetapi belum 80%),
  dan 40 hasil terakhir. Dari sini guru juga bisa memasang tahapan khusus untuk satu siswa dan menghapus data latihan.
- 🎯 **Pengaturan & Tahapan:** Pengaturan Umum hanya bisa diubah admin, termasuk latihan mandiri, batas keluar
  halaman, dan kode buka. Tahapan khusus memakai editor checklist tahap → level → sub level yang sama dengan `app.js`.
  Tahapan dan profil aturan dipasang ke rombel atau siswa. Urutan yang berlaku: siswa → rombel → umum.
  Seperti Matdas, profil aturan juga boleh mengisi **batas keluar halaman saat sesi kelas** dan **keluar halaman yang dihitung**
  (detik); isian yang dikosongkan memakai lapis di bawahnya.
- 🛠️ **Admin:** "Tarik guru dari Data Induk" memanggil `guru_ekspor` (kunci `er_kelas`) lalu `er_sinkron_guru`.
  PIN guru tetap dibuat di admin Matdas/Tryout.

## Sepuluh sub level untuk bacaan Tahap 2–5 (10 Okt 2026)

**Setiap tahap 2–5 berisi 10 level** (18 bacaan baru, ditulis 10 Okt 2026, data lengkap untuk 10 sub level):
- Tahap 2: `holiday-pangandaran` (recount), `birthday-invitation` (invitation), `message-from-mom` (short message).
- Tahap 3: `borobudur` (descriptive), `mouse-deer` (narrative), `eat-breakfast` (analytical exposition), `honey-bees` (report),
  `how-rain-forms` (explanation).
- Tahap 4: `public-transport` (hortatory exposition), `robotics-news` (news item), `laskar-pelangi-review` (review),
  `how-tsunamis-happen` (explanation).
- Tahap 5: `mangrove-forests`, `food-waste`, `regional-languages`, `geothermal-energy`, `bilingual-brain`, `teens-social-media`.

Datanya ada di bagian akhir `soal.js` ("Bacaan tambahan Tahap 2–5"). Pengenal suara menuliskan tahun sebagai angka; `bilanganKeKata`
membacanya berpasangan (1983 nineteen eighty-three, 2022 twenty twenty-two; 2000–2009 two thousand …), jadi tulis tahun di teks dengan cara itu.

**Tahap 2 (Teks Fungsional Pendek) dan Tahap 3 (Genre Teks)** juga punya 10 sub level di semua bacaannya (pola kalimat tetap 5), sebagai bekal ke
tahap berikutnya. Bedanya: teksnya satu paragraf, jadi sub level 6 menjadi **Ide pokok & struktur teks**. Kalimat teks ditanyakan
termasuk bagian apa (identification/description/closing, orientation/events/reorientation, goal/steps/closing,
opening/content/closing) dari `BAGIAN` di `soal.js`. Pengecohnya nama bagian jenis teks lain (`BAGIAN_SEMUA`).
Sub level 10 bernama **Uji siap naik tahap**. Semua soal 4 opsi, setingkat A2 (`SOAL_TAHAP2`, `RUJUKAN`, `SINONIM`).

Bacaan Tahap 4 (TKA) dan Tahap 5 (UTBK/SNBT) punya **10 sub level**: sub level 1–5 seperti bacaan lain, lalu lima sub level
menurut kisi-kisi ujian. Pilihan ganda 4 opsi di TKA dan 5 opsi di UTBK/SNBT. Level tuntas bila kesepuluhnya lulus.

| Sub level | Isi | Sumber soal |
|---|---|---|
| 6 Ide pokok & organisasi | ide pokok paragraf ke-n, paragraf mana yang membahas ide tertentu, judul, susunan teks | `IDE_POKOK` + bank jenis ide/organisasi |
| 7 Rincian & rujukan | informasi tersurat, kata rujukan (it, they, which, this …), benar/salah, tabel | `RUJUKAN` + bank jenis rinci/rujukan + `SOAL_BS` |
| 8 Makna kata | kata dalam kalimat teks → padanannya, dan padanan → kata di teks | `SINONIM` + bank jenis kata |
| 9 Inferensi & sikap penulis | kesimpulan, tujuan bagian teks, sikap/nada, fakta vs opini, memperkuat/melemahkan | bank jenis inferensi/tujuan/sikap/evaluasi (termasuk `SOAL_UJIAN`, `SOAL_UJIAN_2`) |
| 10 Simulasi TKA / Simulasi UTBK/SNBT | campuran semua jenis | semua di atas |

- Jenis soal bank ditentukan `kategoriSoal` di `app.js` dari kalimat pertanyaannya, atau langsung dengan `k` di `soal.js`.
- Di sub level 4 dan 6–10 ada **📄 Lihat teks bacaan** dengan nomor paragraf (salam dan penutup surat tidak dinomori;
  di Simulasi teksnya langsung terbuka).
- Menambah bacaan TKA/UTBK: isi juga `IDE_POKOK` (satu per paragraf), `RUJUKAN` (potongan harus persis dari teks),
  `SINONIM`, dan beberapa soal bertanda `k` agar sub level 9 punya paling sedikit 10 soal.

## Bila jawaban salah (10 Okt 2026)

Di **⚙️ Pengaturan & Tahapan → Umum → Bila jawaban salah** (atau per tahapan khusus):

| Pengaturan | Pilihan | Artinya |
|---|---|---|
| Jawaban benar dan penjelasannya | **Ditampilkan** (bawaan) / Tidak ditampilkan | Bila tidak: hanya "✗ Belum tepat"; pilihan yang benar tidak ditandai, baris tabel benar/salah tidak ditandai, jawaban tidak dibacakan. Pembahasan tetap tampil bila jawaban benar. |
| Soal yang dijawab salah | **Diulang di akhir sesi** (bawaan) / Diulang di nomor itu sampai benar / Maju terus | Pengulangan selalu memakai soal baru untuk kata atau kalimat yang sama (`setelan.bilaSalah`: `akhir` / `ulang` / `lanjut`). |
| Batas salah dalam satu sub level | **Tanpa batas** (bawaan), lebih dari 3 / 5 / 8 / 10 kali | Salah melebihi batas: sub level dimulai lagi dari nomor 1 dengan soal yang berbeda. Hitungan salah tampil di samping nomor soal. |

Nilai lulus tetap ≥ 80% benar pada **percobaan pertama** tiap nomor; soal pengulangan tidak menambah nilai.

## Jumlah soal per sub level dan bentuk soal bergilir (10 Okt 2026)

**⚙️ Pengaturan → Jumlah soal per sub level**: 10 (bawaan), 15, 20, 25, 30, atau 40 soal per sesi
(`setelan.jumlahSoal`, per perangkat). Lulus tetap ≥ 80% benar pada percobaan pertama.

Bila unitnya lebih sedikit dari jumlah soal (mis. 10 kata, 6–19 kalimat bacaan), unit diulang dalam
putaran acak berikutnya. Untuk unit yang sama, bentuk soal yang belum dipakai di sesi itu didahulukan,
jadi kata/kalimat yang muncul lagi tampil dalam bentuk lain:

| Jenis level | Sub level | Bentuk soal yang bergilir |
|---|---|---|
| Kosakata | 1 Kenali | kata → arti · arti → kata · arti kata dalam kalimat · benar/salah pasangan kata–arti |
| | 2 Dengar | dengar kata → tulisan · dengar kata → arti · dengar kalimat → arti · dengar kalimat → tulisan |
| | 3 Situasi | situasi → ungkapan · ungkapan → situasi yang tepat |
| | 4 Lengkapi & susun | rumpang pilih · rumpang ketik (petunjuk huruf awal) · susun kata · arti → kalimat Inggris |
| | 5 Ucapkan | arti → ucapkan · situasi → ucapkan · kalimat rumpang → ucapkan kata yang hilang |
| Pola kalimat | 1 | pilih bentuk · pilih kalimat yang benar |
| | 2 | benar/salah · kalimat keliru → pilih penggantinya |
| | 3 | ketik bentuk · kalimat keliru → ketik perbaikannya |
| | 4 | susun dengan arti · dengar lalu susun |
| | 5 | arti → ucapkan · kalimat rumpang → ucapkan kalimat lengkap |
| Bacaan | 1 Kosakata bacaan | kata → arti · arti → kata · dengar kata → arti · benar/salah kata–arti · kata yang hilang dari kalimat teks |
| | 2 Dengar & pahami | dengar → arti · arti → kalimat teks · dengar → tulisan · dengar → kata penting yang ada di kalimat |
| | 3 Urutkan | urutkan kalimat · kalimat sesudahnya · kalimat sebelumnya |
| | 4 Pemahaman | bank soal + soal turunan (≥ 20%): "apakah jawaban ini tepat?", tabel benar/salah dan "pilih semua yang benar" dari `SOAL_BS` acak |
| | 5 | Tahap 1–2: baca kalimat · dengar lalu baca. Tahap 3–5: rumpang pilih · rumpang ketik |

Kalimat Pola selalu dirakit baru oleh `pola.js`, jadi jumlah soal berapa pun tetap bervariasi.

## Level TKA dan Level UTBK/SNBT (10 Okt 2026)

- (Sejak 10 Okt 2026 Tahap 4 dan 5 masing-masing 10 bacaan; lihat bagian "Sepuluh sub level" di atas.)
- **Tahap 4 · Level TKA** (B1–B1+): 6 bacaan pertama dengan genre berbeda: discussion, analytical exposition,
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

