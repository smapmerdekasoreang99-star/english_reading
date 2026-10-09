/* Daftar tahap dan bacaan English Reading.
   Peta belajar 5 tahap (acuan CEFR), dari kosakata dasar sampai level TKA SMA.
   Urutan level di dalam satu tahap = urutan bacaan di daftar ini.

   Tiga jenis level: kosakata (daftar [kata, arti, contoh, arti contoh]),
   pola kalimat (pola + catatan + teks), dan bacaan (teks).

   Kosakata boleh diberi contohLain ({ kata: [[kalimat, arti], ...] }) dan situasi
   ([{ s, j, juga }]) untuk Latihan bertahap 5 sub level; lihat README dan contoh Greetings.

   Menambah bacaan: salin satu blok { ... }, beri id unik (huruf kecil, tanda -),
   isi tahap 0–4. Jumlah kalimat terjemahan (arti) harus sama dengan teks agar
   terjemahan tampil di bawah tiap kalimat. Baris kosong di teks = paragraf baru.
   Hindari angka (tulis "twenty", bukan "20"), jam ("seven o'clock"), dan singkatan
   bertitik ("Mr.") agar pemecahan kalimat dan koreksi bacaan tetap tepat. */
window.TAHAP = [
  { no: 0, nama: 'Fondasi', setara: 'Pre-A1 · setara SD', fokus: 'Kosakata dasar berkelompok (17 kelompok, 170 kata). Tiap kata dengan arti dan contoh kalimat.' },
  { no: 1, nama: 'Kalimat Sederhana', setara: 'A1 · SD akhir–SMP 7', fokus: 'Pola kalimat dasar (I am, there is, simple present, want to, kata tanya) dan bacaan pendek.' },
  { no: 2, nama: 'Teks Fungsional Pendek', setara: 'A2 · SMP', fokus: 'Pola masa lalu, masa depan, dan modal; teks deskripsi, recount, prosedur, pengumuman.' },
  { no: 3, nama: 'Genre Teks', setara: 'A2+–B1 · SMP 9–SMA 10', fokus: 'Pola menyampaikan pendapat; narrative, report, exposition singkat; kata sambung.' },
  { no: 4, nama: 'Level TKA', setara: 'B1 · SMA 11–12', fokus: 'Teks panjang: discussion dan exposition; ide pokok, inferensi, sikap penulis.' }
];

window.BACAAN = [
  // ---------- Tahap 0: Fondasi — kosakata berkelompok ----------
  // kosakata: [kata, arti, contoh kalimat, arti contoh]. Teks dan terjemahan dibentuk otomatis.
  {
    id: 'greetings', tahap: 0, judul: 'Greetings', kelompok: 'Sapaan dan ungkapan',
    kosakata: [
      ['hello', 'halo', 'Hello, my name is Rina.', 'Halo, nama saya Rina.'],
      ['good morning', 'selamat pagi', 'Good morning, class.', 'Selamat pagi, anak-anak.'],
      ['good afternoon', 'selamat siang', 'Good afternoon, sir.', 'Selamat siang, Pak.'],
      ['good night', 'selamat tidur', 'Good night, Mom.', 'Selamat tidur, Bu.'],
      ['goodbye', 'sampai jumpa', 'Goodbye, see you tomorrow.', 'Sampai jumpa, sampai besok.'],
      ['thank you', 'terima kasih', 'Thank you for your help.', 'Terima kasih atas bantuanmu.'],
      ['sorry', 'maaf', 'Sorry, I am late.', 'Maaf, saya terlambat.'],
      ['please', 'tolong, silakan', 'Please sit down.', 'Silakan duduk.'],
      ['excuse me', 'permisi', 'Excuse me, where is the library?', 'Permisi, di mana perpustakaan?'],
      ['how are you', 'apa kabar', 'How are you today?', 'Apa kabarmu hari ini?']
    ],
    // Latihan bertahap (percontohan): contoh kalimat tambahan per kata dan soal situasi.
    contohLain: {
      'hello': [['Hello, I am your new friend.', 'Halo, saya teman barumu.'], ['Hello, Andi! Nice to see you.', 'Halo, Andi! Senang bertemu denganmu.'], ['Hello, can you hear me?', 'Halo, kamu bisa mendengarku?']],
      'good morning': [['Good morning, everyone.', 'Selamat pagi, semuanya.'], ['Good morning, Dad.', 'Selamat pagi, Ayah.'], ['Good morning, teacher. I am ready.', 'Selamat pagi, Bu Guru. Saya siap.']],
      'good afternoon': [['Good afternoon, everyone.', 'Selamat siang, semuanya.'], ['Good afternoon, Dad. I am home.', 'Selamat siang, Ayah. Aku sudah pulang.'], ['Good afternoon, madam.', 'Selamat siang, Bu.']],
      'good night': [['Good night, sleep well.', 'Selamat tidur, tidur yang nyenyak.'], ['Good night, Dad. See you in the morning.', 'Selamat tidur, Ayah. Sampai jumpa besok pagi.'], ['Good night, little brother.', 'Selamat tidur, adik kecil.']],
      'goodbye': [['Goodbye, everyone!', 'Sampai jumpa, semuanya!'], ['Goodbye, Grandma. I will visit you again.', 'Sampai jumpa, Nenek. Aku akan berkunjung lagi.'], ['Say goodbye to your friends.', 'Ucapkan sampai jumpa kepada teman-temanmu.']],
      'thank you': [['Thank you very much.', 'Terima kasih banyak.'], ['Thank you for the gift.', 'Terima kasih atas hadiahnya.'], ['Thank you, teacher.', 'Terima kasih, Bu Guru.']],
      'sorry': [['Sorry, I forgot my book.', 'Maaf, aku lupa membawa bukuku.'], ['I am sorry, I broke your pencil.', 'Maaf, aku mematahkan pensilmu.'], ['Sorry, can you say that again?', 'Maaf, bisa kamu ulangi?']],
      'please': [['Please open your book.', 'Tolong buka bukumu.'], ['Please be quiet.', 'Tolong tenang.'], ['Please come in.', 'Silakan masuk.']],
      'excuse me': [['Excuse me, can I sit here?', 'Permisi, boleh saya duduk di sini?'], ['Excuse me, I want to pass.', 'Permisi, saya mau lewat.'], ['Excuse me, is this your bag?', 'Permisi, apakah ini tasmu?']],
      'how are you': [['Hi Rina, how are you?', 'Hai Rina, apa kabar?'], ['How are you, Grandpa?', 'Apa kabar, Kakek?'], ['How are you this morning?', 'Apa kabarmu pagi ini?']]
    },
    // s = situasi, j = jawaban, juga = ungkapan lain yang juga pantas (tidak dipakai sebagai pengecoh).
    situasi: [
      { s: 'Pukul tujuh pagi kamu bertemu gurumu di gerbang sekolah. Kamu menyapanya…', j: 'good morning', juga: ['hello', 'how are you'] },
      { s: 'Pagi hari kamu bangun dan menyapa ayahmu di meja makan…', j: 'good morning', juga: ['hello', 'how are you'] },
      { s: 'Pukul dua siang kamu masuk ke ruang guru dan menyapa guru di sana…', j: 'good afternoon', juga: ['hello', 'excuse me', 'how are you'] },
      { s: 'Pukul tiga sore ayahmu pulang kerja. Kamu menyapanya…', j: 'good afternoon', juga: ['hello', 'how are you'] },
      { s: 'Malam hari kamu akan tidur. Kamu berkata kepada ibumu…', j: 'good night', juga: ['goodbye'] },
      { s: 'Adikmu sudah berbaring di tempat tidur. Sebelum mematikan lampu, kamu berkata…', j: 'good night', juga: ['goodbye'] },
      { s: 'Pulang sekolah, kamu berpisah dengan temanmu di gerbang. Kamu berkata…', j: 'goodbye', juga: ['good afternoon'] },
      { s: 'Liburan selesai dan kamu pamit kepada nenek sebelum naik bus. Kamu berkata…', j: 'goodbye', juga: ['thank you'] },
      { s: 'Temanmu meminjamkan pensilnya kepadamu. Kamu berkata…', j: 'thank you', juga: [] },
      { s: 'Gurumu memujimu, "Good job!" Kamu menjawab…', j: 'thank you', juga: [] },
      { s: 'Kamu tidak sengaja menginjak kaki temanmu. Kamu berkata…', j: 'sorry', juga: ['excuse me'] },
      { s: 'Kamu datang terlambat ke kelas. Kamu berkata kepada guru…', j: 'sorry', juga: ['excuse me', 'good morning', 'good afternoon'] },
      { s: 'Kamu meminta adikmu dengan sopan, "… close the door."', j: 'please', juga: [] },
      { s: 'Ada tamu di depan pintu. Kamu mempersilakannya, "… come in."', j: 'please', juga: [] },
      { s: 'Kamu ingin lewat, tetapi ada orang berdiri di depan pintu. Kamu berkata…', j: 'excuse me', juga: ['sorry'] },
      { s: 'Kamu ingin bertanya arah kepada orang yang tidak kamu kenal. Kamu memulai dengan…', j: 'excuse me', juga: ['hello', 'sorry', 'good morning', 'good afternoon'] },
      { s: 'Kamu bertemu teman yang lama tidak berjumpa dan ingin menanyakan kabarnya…', j: 'how are you', juga: ['hello', 'good morning', 'good afternoon'] },
      { s: 'Kamu menjenguk kakek yang baru sembuh dan ingin tahu keadaannya…', j: 'how are you', juga: ['hello', 'good morning', 'good afternoon'] },
      { s: 'Kamu mengangkat telepon dari nomor yang tidak kamu kenal. Kamu berkata…', j: 'hello', juga: ['good morning', 'good afternoon', 'how are you'] },
      { s: 'Kamu melambaikan tangan kepada teman di seberang jalan dan menyapanya…', j: 'hello', juga: ['good morning', 'good afternoon', 'how are you'] }
    ]
  },
  {
    id: 'pronouns', tahap: 0, judul: 'Pronouns', kelompok: 'Kata ganti orang',
    kosakata: [
      ['I', 'saya', 'I am a student.', 'Saya seorang pelajar.'],
      ['you', 'kamu, Anda', 'You are my friend.', 'Kamu temanku.'],
      ['he', 'dia (laki-laki)', 'He is my brother.', 'Dia saudara laki-lakiku.'],
      ['she', 'dia (perempuan)', 'She is my teacher.', 'Dia guruku.'],
      ['it', 'itu (benda, hewan)', 'It is a cat.', 'Itu seekor kucing.'],
      ['we', 'kami, kita', 'We are in the classroom.', 'Kami ada di kelas.'],
      ['they', 'mereka', 'They play football.', 'Mereka bermain sepak bola.'],
      ['my', 'milik saya', 'My bag is blue.', 'Tas saya biru.'],
      ['your', 'milikmu', 'Is this your pen?', 'Apakah ini pulpenmu?'],
      ['our', 'milik kami, milik kita', 'Our school is big.', 'Sekolah kami besar.']
    ]
  },
  {
    id: 'numbers', tahap: 0, judul: 'Numbers', kelompok: 'Angka',
    kosakata: [
      ['one', 'satu', 'I have one brother.', 'Saya punya satu saudara laki-laki.'],
      ['two', 'dua', 'She has two cats.', 'Dia punya dua ekor kucing.'],
      ['three', 'tiga', 'There are three books on the table.', 'Ada tiga buku di atas meja.'],
      ['four', 'empat', 'A car has four wheels.', 'Mobil punya empat roda.'],
      ['five', 'lima', 'I wake up at five.', 'Saya bangun pukul lima.'],
      ['six', 'enam', 'We study six days a week.', 'Kami belajar enam hari seminggu.'],
      ['seven', 'tujuh', 'There are seven days in a week.', 'Ada tujuh hari dalam seminggu.'],
      ['eight', 'delapan', 'A spider has eight legs.', 'Laba-laba punya delapan kaki.'],
      ['nine', 'sembilan', 'My sister is nine years old.', 'Adik perempuanku berumur sembilan tahun.'],
      ['ten', 'sepuluh', 'I have ten fingers.', 'Saya punya sepuluh jari.']
    ]
  },
  {
    id: 'colors', tahap: 0, judul: 'Colors', kelompok: 'Warna',
    kosakata: [
      ['red', 'merah', 'The apple is red.', 'Apel itu merah.'],
      ['blue', 'biru', 'The sky is blue.', 'Langit berwarna biru.'],
      ['green', 'hijau', 'The leaves are green.', 'Daun-daun berwarna hijau.'],
      ['yellow', 'kuning', 'A banana is yellow.', 'Pisang berwarna kuning.'],
      ['black', 'hitam', 'My hair is black.', 'Rambutku hitam.'],
      ['white', 'putih', 'My school shirt is white.', 'Kemeja sekolahku putih.'],
      ['orange', 'oranye', 'The sun is orange in the evening.', 'Matahari berwarna oranye pada sore hari.'],
      ['purple', 'ungu', 'She has a purple bag.', 'Dia punya tas ungu.'],
      ['brown', 'cokelat', 'The table is brown.', 'Meja itu berwarna cokelat.'],
      ['pink', 'merah muda', 'My sister likes pink.', 'Adik perempuanku suka warna merah muda.']
    ]
  },
  {
    id: 'family-words', tahap: 0, judul: 'Family', kelompok: 'Keluarga dan orang',
    kosakata: [
      ['father', 'ayah', 'My father is a farmer.', 'Ayahku seorang petani.'],
      ['mother', 'ibu', 'My mother cooks every day.', 'Ibuku memasak setiap hari.'],
      ['brother', 'saudara laki-laki', 'My brother is tall.', 'Saudara laki-lakiku tinggi.'],
      ['sister', 'saudara perempuan', 'My sister likes music.', 'Saudara perempuanku suka musik.'],
      ['son', 'anak laki-laki', 'They have one son.', 'Mereka punya satu anak laki-laki.'],
      ['daughter', 'anak perempuan', 'Their daughter is a doctor.', 'Anak perempuan mereka seorang dokter.'],
      ['grandfather', 'kakek', 'My grandfather lives in the village.', 'Kakekku tinggal di desa.'],
      ['grandmother', 'nenek', 'My grandmother tells good stories.', 'Nenekku pandai bercerita.'],
      ['uncle', 'paman', 'My uncle has a big car.', 'Pamanku punya mobil besar.'],
      ['aunt', 'bibi', 'My aunt is a nurse.', 'Bibiku seorang perawat.']
    ]
  },
  {
    id: 'classroom', tahap: 0, judul: 'Things at Home and School', kelompok: 'Benda di rumah dan kelas',
    kosakata: [
      ['book', 'buku', 'This is my English book.', 'Ini buku bahasa Inggrisku.'],
      ['pen', 'pulpen', 'Can I borrow your pen?', 'Boleh saya pinjam pulpenmu?'],
      ['bag', 'tas', 'My bag is heavy.', 'Tasku berat.'],
      ['table', 'meja', 'The book is on the table.', 'Buku itu ada di atas meja.'],
      ['chair', 'kursi', 'Please sit on the chair.', 'Silakan duduk di kursi.'],
      ['door', 'pintu', 'Close the door, please.', 'Tolong tutup pintunya.'],
      ['window', 'jendela', 'Open the window, please.', 'Tolong buka jendelanya.'],
      ['bed', 'tempat tidur', 'My cat sleeps on my bed.', 'Kucingku tidur di tempat tidurku.'],
      ['phone', 'telepon', 'My phone is in my bag.', 'Teleponku ada di dalam tas.'],
      ['cup', 'cangkir', 'I drink tea from a cup.', 'Saya minum teh dari cangkir.']
    ]
  },
  {
    id: 'verbs-1', tahap: 0, judul: 'Basic Verbs 1', kelompok: 'Kata kerja dasar',
    kosakata: [
      ['go', 'pergi', 'I go to school every day.', 'Saya pergi ke sekolah setiap hari.'],
      ['come', 'datang', 'Please come to my house.', 'Silakan datang ke rumahku.'],
      ['eat', 'makan', 'We eat rice for lunch.', 'Kami makan nasi untuk makan siang.'],
      ['drink', 'minum', 'I drink water every morning.', 'Saya minum air setiap pagi.'],
      ['sleep', 'tidur', 'The baby sleeps in the bedroom.', 'Bayi itu tidur di kamar.'],
      ['see', 'melihat', 'I can see a bird.', 'Saya bisa melihat seekor burung.'],
      ['hear', 'mendengar', 'Can you hear me?', 'Apakah kamu bisa mendengarku?'],
      ['read', 'membaca', 'She reads a book.', 'Dia membaca buku.'],
      ['write', 'menulis', 'Write your name here.', 'Tulis namamu di sini.'],
      ['speak', 'berbicara', 'I want to speak English.', 'Saya ingin berbicara bahasa Inggris.']
    ]
  },
  {
    id: 'verbs-2', tahap: 0, judul: 'Basic Verbs 2', kelompok: 'Kata kerja dasar',
    kosakata: [
      ['have', 'punya', 'I have a new bag.', 'Saya punya tas baru.'],
      ['like', 'suka', 'I like fried rice.', 'Saya suka nasi goreng.'],
      ['want', 'ingin', 'I want to learn English.', 'Saya ingin belajar bahasa Inggris.'],
      ['need', 'butuh, perlu', 'I need a pencil.', 'Saya butuh pensil.'],
      ['make', 'membuat', 'My mother makes a cake.', 'Ibuku membuat kue.'],
      ['do', 'melakukan, mengerjakan', 'I do my homework at night.', 'Saya mengerjakan PR pada malam hari.'],
      ['give', 'memberi', 'Give me the book, please.', 'Tolong berikan buku itu kepadaku.'],
      ['take', 'membawa, mengambil', 'Take your umbrella.', 'Bawalah payungmu.'],
      ['know', 'tahu', 'I know his name.', 'Saya tahu namanya.'],
      ['help', 'membantu', 'Can you help me?', 'Bisakah kamu membantuku?']
    ]
  },
  {
    id: 'adjectives', tahap: 0, judul: 'Basic Adjectives', kelompok: 'Kata sifat dasar',
    kosakata: [
      ['big', 'besar', 'An elephant is big.', 'Gajah itu besar.'],
      ['small', 'kecil', 'A mouse is small.', 'Tikus itu kecil.'],
      ['good', 'baik, bagus', 'This is a good book.', 'Ini buku yang bagus.'],
      ['bad', 'buruk', 'The weather is bad today.', 'Cuaca hari ini buruk.'],
      ['happy', 'senang', 'I am happy today.', 'Saya senang hari ini.'],
      ['sad', 'sedih', 'She is sad because her cat is sick.', 'Dia sedih karena kucingnya sakit.'],
      ['hot', 'panas', 'The tea is hot.', 'Teh itu panas.'],
      ['cold', 'dingin', 'The water is cold.', 'Air itu dingin.'],
      ['new', 'baru', 'I have new shoes.', 'Saya punya sepatu baru.'],
      ['old', 'tua, lama', 'My grandfather is old.', 'Kakekku sudah tua.']
    ]
  },
  {
    id: 'question-words', tahap: 0, judul: 'Question Words', kelompok: 'Kata tanya',
    kosakata: [
      ['what', 'apa', 'What is your name?', 'Siapa namamu?'],
      ['where', 'di mana', 'Where do you live?', 'Di mana kamu tinggal?'],
      ['when', 'kapan', 'When is your birthday?', 'Kapan ulang tahunmu?'],
      ['who', 'siapa', 'Who is that girl?', 'Siapa gadis itu?'],
      ['why', 'mengapa', 'Why are you sad?', 'Mengapa kamu sedih?'],
      ['how', 'bagaimana', 'How do you go to school?', 'Bagaimana kamu pergi ke sekolah?'],
      ['which', 'yang mana', 'Which bag is yours?', 'Tas yang mana milikmu?'],
      ['whose', 'milik siapa', 'Whose book is this?', 'Buku siapa ini?'],
      ['how many', 'berapa banyak', 'How many brothers do you have?', 'Berapa saudara laki-laki yang kamu punya?'],
      ['how much', 'berapa (harga, jumlah)', 'How much is this shirt?', 'Berapa harga kemeja ini?']
    ]
  },
  {
    id: 'time-days', tahap: 0, judul: 'Time and Days', kelompok: 'Waktu dan hari',
    kosakata: [
      ['today', 'hari ini', 'Today is Monday.', 'Hari ini hari Senin.'],
      ['tomorrow', 'besok', 'See you tomorrow.', 'Sampai jumpa besok.'],
      ['yesterday', 'kemarin', 'I was sick yesterday.', 'Saya sakit kemarin.'],
      ['morning', 'pagi', 'I study in the morning.', 'Saya belajar pada pagi hari.'],
      ['night', 'malam', 'I sleep at night.', 'Saya tidur pada malam hari.'],
      ['Monday', 'Senin', 'We have English on Monday.', 'Kami belajar bahasa Inggris pada hari Senin.'],
      ['Friday', 'Jumat', 'Friday is my favorite day.', 'Jumat adalah hari favoritku.'],
      ['Sunday', 'Minggu', 'We go to the market on Sunday.', 'Kami pergi ke pasar pada hari Minggu.'],
      ['week', 'minggu, pekan', 'I play football every week.', 'Saya bermain sepak bola setiap minggu.'],
      ['hour', 'jam', 'I study for one hour.', 'Saya belajar selama satu jam.']
    ]
  },
  {
    id: 'food-drinks', tahap: 0, judul: 'Food and Drinks', kelompok: 'Makanan dan minuman',
    kosakata: [
      ['rice', 'nasi', 'We eat rice every day.', 'Kami makan nasi setiap hari.'],
      ['bread', 'roti', 'I eat bread for breakfast.', 'Saya makan roti untuk sarapan.'],
      ['egg', 'telur', 'My mother fries an egg.', 'Ibuku menggoreng telur.'],
      ['chicken', 'ayam', 'I like fried chicken.', 'Saya suka ayam goreng.'],
      ['fish', 'ikan', 'My father catches fish in the river.', 'Ayahku menangkap ikan di sungai.'],
      ['fruit', 'buah', 'Fruit is good for your health.', 'Buah baik untuk kesehatanmu.'],
      ['vegetables', 'sayuran', 'Eat your vegetables.', 'Habiskan sayuranmu.'],
      ['water', 'air', 'Drink more water.', 'Minumlah lebih banyak air.'],
      ['milk', 'susu', 'The baby drinks milk.', 'Bayi itu minum susu.'],
      ['tea', 'teh', 'Would you like some tea?', 'Maukah kamu minum teh?']
    ]
  },
  {
    id: 'places', tahap: 0, judul: 'Places and Directions', kelompok: 'Tempat dan arah',
    kosakata: [
      ['home', 'rumah', 'I go home in the afternoon.', 'Saya pulang pada sore hari.'],
      ['school', 'sekolah', 'My school is near my house.', 'Sekolahku dekat rumahku.'],
      ['market', 'pasar', 'My mother goes to the market.', 'Ibuku pergi ke pasar.'],
      ['mosque', 'masjid', 'The mosque is next to the school.', 'Masjid itu di sebelah sekolah.'],
      ['hospital', 'rumah sakit', 'My aunt works at a hospital.', 'Bibiku bekerja di rumah sakit.'],
      ['library', 'perpustakaan', 'I read books in the library.', 'Saya membaca buku di perpustakaan.'],
      ['left', 'kiri', 'Turn left at the corner.', 'Belok kiri di tikungan.'],
      ['right', 'kanan', 'The bank is on the right.', 'Bank itu ada di sebelah kanan.'],
      ['near', 'dekat', 'The shop is near here.', 'Toko itu dekat dari sini.'],
      ['far', 'jauh', 'My village is far from the city.', 'Desaku jauh dari kota.']
    ]
  },
  {
    id: 'prepositions', tahap: 0, judul: 'Prepositions', kelompok: 'Preposisi dan posisi',
    kosakata: [
      ['in', 'di dalam', 'The pen is in the bag.', 'Pulpen itu ada di dalam tas.'],
      ['on', 'di atas', 'The cup is on the table.', 'Cangkir itu ada di atas meja.'],
      ['under', 'di bawah', 'The cat is under the chair.', 'Kucing itu ada di bawah kursi.'],
      ['next to', 'di sebelah', 'I sit next to Rina.', 'Saya duduk di sebelah Rina.'],
      ['behind', 'di belakang', 'The garden is behind the house.', 'Kebun itu ada di belakang rumah.'],
      ['in front of', 'di depan', 'The car is in front of the school.', 'Mobil itu ada di depan sekolah.'],
      ['between', 'di antara', 'The bank is between the shop and the mosque.', 'Bank itu ada di antara toko dan masjid.'],
      ['at', 'di (tempat, waktu)', 'I am at home.', 'Saya ada di rumah.'],
      ['from', 'dari', 'I am from Soreang.', 'Saya dari Soreang.'],
      ['to', 'ke', 'We go to the beach.', 'Kami pergi ke pantai.']
    ]
  },
  {
    id: 'daily-activities', tahap: 0, judul: 'Daily Activities', kelompok: 'Kegiatan sehari-hari',
    kosakata: [
      ['wake up', 'bangun tidur', 'I wake up early.', 'Saya bangun pagi-pagi.'],
      ['take a bath', 'mandi', 'I take a bath twice a day.', 'Saya mandi dua kali sehari.'],
      ['have breakfast', 'sarapan', 'We have breakfast together.', 'Kami sarapan bersama.'],
      ['go to school', 'pergi ke sekolah', 'I go to school by bus.', 'Saya pergi ke sekolah naik bus.'],
      ['study', 'belajar', 'I study English at school.', 'Saya belajar bahasa Inggris di sekolah.'],
      ['play', 'bermain', 'The children play in the yard.', 'Anak-anak bermain di halaman.'],
      ['cook', 'memasak', 'My father can cook fried rice.', 'Ayahku bisa memasak nasi goreng.'],
      ['clean', 'membersihkan', 'We clean our classroom every Friday.', 'Kami membersihkan kelas setiap hari Jumat.'],
      ['watch', 'menonton', 'I watch a movie on Saturday.', 'Saya menonton film pada hari Sabtu.'],
      ['go to bed', 'pergi tidur', 'I go to bed at nine.', 'Saya tidur pukul sembilan.']
    ]
  },
  {
    id: 'conjunctions', tahap: 0, judul: 'Conjunctions', kelompok: 'Kata penghubung',
    kosakata: [
      ['and', 'dan', 'I like tea and coffee.', 'Saya suka teh dan kopi.'],
      ['but', 'tetapi', 'The bag is small but heavy.', 'Tas itu kecil tetapi berat.'],
      ['or', 'atau', 'Do you want tea or milk?', 'Kamu mau teh atau susu?'],
      ['because', 'karena', 'I am tired because I studied late.', 'Saya lelah karena belajar sampai larut.'],
      ['so', 'jadi, sehingga', 'It was raining, so I stayed home.', 'Hujan turun, jadi saya tinggal di rumah.'],
      ['if', 'jika', 'If it rains, we will stay home.', 'Jika hujan, kita akan tinggal di rumah.'],
      ['when', 'ketika', 'I was sleeping when you called.', 'Saya sedang tidur ketika kamu menelepon.'],
      ['then', 'lalu', 'I eat breakfast, then I go to school.', 'Saya sarapan, lalu pergi ke sekolah.'],
      ['after', 'setelah', 'I play after school.', 'Saya bermain setelah sekolah.'],
      ['before', 'sebelum', 'Wash your hands before you eat.', 'Cuci tanganmu sebelum makan.']
    ]
  },
  {
    id: 'modals', tahap: 0, judul: 'Helping Verbs and Modals', kelompok: 'Kata bantu dan modal',
    kosakata: [
      ['can', 'bisa', 'I can swim.', 'Saya bisa berenang.'],
      ['cannot', 'tidak bisa', 'She cannot come today.', 'Dia tidak bisa datang hari ini.'],
      ['will', 'akan', 'I will call you tomorrow.', 'Saya akan meneleponmu besok.'],
      ['must', 'harus', 'You must wear a helmet.', 'Kamu harus memakai helm.'],
      ['should', 'sebaiknya', 'You should drink more water.', 'Kamu sebaiknya minum lebih banyak air.'],
      ['may', 'boleh', 'May I go to the toilet?', 'Bolehkah saya ke toilet?'],
      ['do', 'kata bantu tanya', 'Do you like music?', 'Apakah kamu suka musik?'],
      ['does', 'kata bantu tanya untuk dia', 'Does she live here?', 'Apakah dia tinggal di sini?'],
      ['did', 'kata bantu lampau', 'Did you eat breakfast?', 'Apakah kamu sudah sarapan?'],
      ['is', 'adalah (untuk dia, itu)', 'She is my friend.', 'Dia temanku.']
    ]
  },

  // ---------- Tahap 1: Kalimat Sederhana ----------
  {
    id: 'pola-i-am', tahap: 1, judul: 'Pattern: I am …',
    pola: 'I am / You are / She is + kata benda atau kata sifat',
    catatan: 'Untuk menyebut identitas dan keadaan. I → am; you, we, they → are; he, she, it → is.',
    teks: 'I am a student. I am fifteen years old. You are my best friend. She is a teacher. He is very tall. We are happy today. They are in the library.',
    arti: 'Saya seorang pelajar. Saya berumur lima belas tahun. Kamu sahabatku. Dia seorang guru. Dia sangat tinggi. Kami senang hari ini. Mereka ada di perpustakaan.'
  },
  {
    id: 'hello-budi', tahap: 1, judul: 'Hello, I Am Budi',
    teks: 'Hello! My name is Budi. I am fifteen years old. I live in Soreang with my family. I am a student. I like football and music. Nice to meet you!',
    arti: 'Halo! Nama saya Budi. Saya berumur lima belas tahun. Saya tinggal di Soreang bersama keluarga saya. Saya seorang pelajar. Saya suka sepak bola dan musik. Senang bertemu denganmu!'
  },
  {
    id: 'my-family', tahap: 1, judul: 'My Family',
    teks: 'This is my family. My father is a teacher. My mother is a nurse. I have one brother and one sister. My brother is ten years old. My sister is a baby. We live in a small house. I love my family very much.',
    arti: 'Ini keluarga saya. Ayah saya seorang guru. Ibu saya seorang perawat. Saya punya satu adik laki-laki dan satu adik perempuan. Adik laki-laki saya berumur sepuluh tahun. Adik perempuan saya masih bayi. Kami tinggal di sebuah rumah kecil. Saya sangat menyayangi keluarga saya.'
  },
  {
    id: 'pola-there-is', tahap: 1, judul: 'Pattern: There is / There are',
    pola: 'There is + satu benda · There are + banyak benda',
    catatan: 'Untuk menyatakan "ada". Pakai is untuk satu benda, are untuk lebih dari satu.',
    teks: 'There is a book on the table. There is a cat under the chair. There are many trees in the yard. There are thirty students in my class. Is there a library in your school? Yes, there is.',
    arti: 'Ada sebuah buku di atas meja. Ada seekor kucing di bawah kursi. Ada banyak pohon di halaman. Ada tiga puluh siswa di kelasku. Apakah ada perpustakaan di sekolahmu? Ya, ada.'
  },
  {
    id: 'my-school', tahap: 1, judul: 'My School',
    teks: 'My name is Rina. I am a student at a senior high school in Soreang. My school is not very big, but it is clean and green. There are many trees in the yard. Every morning, I walk to school with my best friend. We study English, mathematics, and science. I like English because I want to talk with people from other countries.',
    arti: 'Nama saya Rina. Saya siswa di sebuah SMA di Soreang. Sekolah saya tidak terlalu besar, tetapi bersih dan hijau. Ada banyak pohon di halaman. Setiap pagi, saya berjalan ke sekolah bersama sahabat saya. Kami belajar bahasa Inggris, matematika, dan IPA. Saya suka bahasa Inggris karena saya ingin berbicara dengan orang-orang dari negara lain.'
  },
  {
    id: 'pola-present', tahap: 1, judul: 'Pattern: Daily Routines',
    pola: 'I / You / We / They + kata kerja · He / She + kata kerja + s',
    catatan: 'Simple present untuk kebiasaan dan kegiatan rutin. Untuk he, she, it, kata kerja ditambah -s atau -es.',
    teks: 'I teach English. I drink coffee every morning. We study at school. They play football after school. She reads a book every night. He watches television on Sunday. My cat sleeps all day.',
    arti: 'Saya mengajar bahasa Inggris. Saya minum kopi setiap pagi. Kami belajar di sekolah. Mereka bermain sepak bola sepulang sekolah. Dia membaca buku setiap malam. Dia menonton televisi pada hari Minggu. Kucingku tidur sepanjang hari.'
  },
  {
    id: 'my-day', tahap: 1, judul: 'My Daily Activities',
    teks: 'I wake up early every morning. I take a bath and eat breakfast with my family. Then I go to school with my father. At school, I study and play with my friends. I go home in the afternoon. In the evening, I do my homework. After that, I watch television and go to bed.',
    arti: 'Saya bangun pagi-pagi setiap hari. Saya mandi dan sarapan bersama keluarga. Lalu saya pergi ke sekolah bersama ayah saya. Di sekolah, saya belajar dan bermain dengan teman-teman. Saya pulang pada sore hari. Pada malam hari, saya mengerjakan PR. Setelah itu, saya menonton televisi dan tidur.'
  },

  {
    id: 'pola-want', tahap: 1, judul: 'Pattern: I want to …',
    pola: 'I want to / I need to / I like to + kata kerja',
    catatan: 'Untuk menyatakan keinginan, kebutuhan, dan kesukaan. Setelah to, kata kerja tetap bentuk dasar.',
    teks: 'I want to learn English. I want to speak English with my friends. I need to finish my homework. We need to go now. I like to read stories. She likes to sing. Do you want to come with me?',
    arti: 'Saya ingin belajar bahasa Inggris. Saya ingin berbicara bahasa Inggris dengan teman-temanku. Saya perlu menyelesaikan PR-ku. Kami perlu pergi sekarang. Saya suka membaca cerita. Dia suka bernyanyi. Apakah kamu mau ikut denganku?'
  },
  {
    id: 'pola-questions', tahap: 1, judul: 'Pattern: Asking Questions',
    pola: 'What / Where / How + do you … ?',
    catatan: 'Pertanyaan sehari-hari: kata tanya di depan, lalu do atau does, subjek, dan kata kerja.',
    teks: 'What is your name? My name is Dina. Where do you live? I live in Soreang. How do you go to school? I go to school by bus. What do you do after school? I usually play badminton.',
    arti: 'Siapa namamu? Namaku Dina. Di mana kamu tinggal? Saya tinggal di Soreang. Bagaimana kamu pergi ke sekolah? Saya pergi ke sekolah naik bus. Apa yang kamu lakukan sepulang sekolah? Saya biasanya bermain bulu tangkis.'
  },

  // ---------- Tahap 2: Teks Fungsional Pendek ----------
  {
    id: 'best-friend', tahap: 2, judul: 'My Best Friend',
    teks: 'I have a best friend. Her name is Sinta. She is tall and has long black hair. She always wears glasses. Sinta is very kind and friendly. She often helps me when I have difficulty with my lessons. She is good at drawing and singing. Every weekend, we ride our bicycles around the village. Sometimes we go to the library together. I am lucky to have a friend like her.',
    arti: 'Saya punya seorang sahabat. Namanya Sinta. Ia tinggi dan berambut hitam panjang. Ia selalu memakai kacamata. Sinta sangat baik dan ramah. Ia sering membantu saya ketika saya kesulitan dengan pelajaran. Ia pandai menggambar dan bernyanyi. Setiap akhir pekan, kami bersepeda keliling desa. Kadang-kadang kami pergi ke perpustakaan bersama. Saya beruntung punya teman seperti dia.'
  },
  {
    id: 'pola-past', tahap: 2, judul: 'Pattern: Talking about the Past',
    pola: 'I + kata kerja bentuk lampau (worked, went, ate)',
    catatan: 'Simple past untuk kejadian yang sudah lewat. Kata kerja beraturan + ed; yang tak beraturan berubah bentuk (go → went, eat → ate).',
    teks: 'I worked hard yesterday. I went to school by bicycle. We visited our grandmother last week. She cooked fried rice for dinner. They watched a movie last night. I ate an apple this morning. Did you finish your homework?',
    arti: 'Saya bekerja keras kemarin. Saya pergi ke sekolah naik sepeda. Kami mengunjungi nenek minggu lalu. Dia memasak nasi goreng untuk makan malam. Mereka menonton film tadi malam. Saya makan sebuah apel tadi pagi. Apakah kamu sudah menyelesaikan PR-mu?'
  },
  {
    id: 'a-rainy-morning', tahap: 2, judul: 'A Rainy Morning',
    teks: 'It was raining heavily this morning. Dimas woke up late and looked out of the window. The street was wet and full of puddles. He quickly ate his breakfast and put on his raincoat. His mother gave him an umbrella. When he arrived at school, his shoes were wet, but he was happy because he was not late.',
    arti: 'Pagi ini hujan turun dengan deras. Dimas bangun kesiangan dan melihat ke luar jendela. Jalanan basah dan penuh genangan air. Ia cepat-cepat sarapan dan memakai jas hujannya. Ibunya memberinya sebuah payung. Ketika ia tiba di sekolah, sepatunya basah, tetapi ia senang karena tidak terlambat.'
  },
  {
    id: 'pola-can-must', tahap: 2, judul: 'Pattern: can, must, should',
    pola: 'can / must / should + kata kerja',
    catatan: 'Kata bantu modal: can (bisa), must (harus), should (sebaiknya). Kata kerja sesudahnya tetap bentuk dasar.',
    teks: 'I can swim very well. She can speak three languages. You must wear your uniform on Monday. Students must not use phones during the test. You should eat more vegetables. We should protect our environment.',
    arti: 'Saya bisa berenang dengan sangat baik. Dia bisa berbicara tiga bahasa. Kamu harus memakai seragam pada hari Senin. Siswa tidak boleh menggunakan telepon selama ujian. Kamu sebaiknya makan lebih banyak sayuran. Kita sebaiknya menjaga lingkungan kita.'
  },
  {
    id: 'make-tea', tahap: 2, judul: 'How to Make a Cup of Tea',
    teks: 'How do you make a good cup of tea? First, boil some water in a kettle. Next, put a tea bag into a cup. Then, pour the hot water into the cup. Wait for about three minutes. After that, take out the tea bag. Add one or two spoons of sugar and stir it well. If you like, you can also add some milk or a slice of lemon. Finally, your tea is ready. Enjoy it while it is warm!',
    arti: 'Bagaimana cara membuat secangkir teh yang enak? Pertama, rebus air di dalam ketel. Berikutnya, masukkan satu kantong teh ke dalam cangkir. Lalu, tuangkan air panas ke dalam cangkir. Tunggu sekitar tiga menit. Setelah itu, angkat kantong tehnya. Tambahkan satu atau dua sendok gula, lalu aduk rata. Jika suka, kamu juga bisa menambahkan sedikit susu atau seiris lemon. Akhirnya, tehmu siap. Nikmati selagi hangat!'
  },
  {
    id: 'pola-future', tahap: 2, judul: 'Pattern: Talking about the Future',
    pola: 'I will + kata kerja · I am going to + kata kerja',
    catatan: 'Untuk masa depan. Will untuk keputusan atau janji; be going to untuk rencana yang sudah disiapkan.',
    teks: 'I will study tomorrow. I will help you with your homework. It will rain this afternoon. We are going to visit the museum next week. She is going to buy a new bag. Are you going to join the competition?',
    arti: 'Saya akan belajar besok. Saya akan membantumu mengerjakan PR. Sore ini akan turun hujan. Kami akan mengunjungi museum minggu depan. Dia akan membeli tas baru. Apakah kamu akan mengikuti lomba itu?'
  },
  {
    id: 'announcement', tahap: 2, judul: 'School Announcement',
    teks: 'Attention, please. This is an announcement for all students. Next Friday, our school will hold a clean school day. All students must come to school at seven in the morning. Please bring a broom, a dustpan, and a plastic bag. Each class will clean its own classroom and the school yard. After cleaning, we will have breakfast together in the hall. The best class will get a prize from the headmaster. Do not forget to wear your sports uniform. Thank you for your attention.',
    arti: 'Mohon perhatian. Ini adalah pengumuman untuk seluruh siswa. Jumat depan, sekolah kita akan mengadakan hari bersih sekolah. Semua siswa harus datang ke sekolah pukul tujuh pagi. Harap membawa sapu, pengki, dan kantong plastik. Setiap kelas akan membersihkan ruang kelasnya sendiri dan halaman sekolah. Setelah bersih-bersih, kita akan sarapan bersama di aula. Kelas terbaik akan mendapat hadiah dari kepala sekolah. Jangan lupa memakai seragam olahraga. Terima kasih atas perhatiannya.'
  },

  // ---------- Tahap 3: Genre Teks ----------
  {
    id: 'pola-opinion', tahap: 3, judul: 'Pattern: Giving Opinions',
    pola: 'I think … because … · I agree / I disagree …',
    catatan: 'Untuk menyampaikan pendapat beserta alasannya. Kata penghubung yang sering dipakai: because, so, therefore, however, although.',
    teks: 'I think English is important because it helps us communicate with more people. I believe that reading every day can improve our vocabulary. I agree with you, but I have a different reason. I disagree because uniforms can be expensive for some families. Although the test was difficult, I tried my best. Therefore, we should practice a little every day.',
    arti: 'Menurut saya bahasa Inggris penting karena membantu kita berkomunikasi dengan lebih banyak orang. Saya yakin bahwa membaca setiap hari dapat meningkatkan kosakata kita. Saya setuju denganmu, tetapi saya punya alasan yang berbeda. Saya tidak setuju karena seragam bisa mahal bagi sebagian keluarga. Walaupun ujiannya sulit, saya berusaha sebaik mungkin. Karena itu, kita sebaiknya berlatih sedikit setiap hari.'
  },
  {
    id: 'the-farmer', tahap: 3, judul: 'The Farmer and the Rice Field',
    teks: 'Pak Ahmad is a farmer who lives in a small village near the mountains. He wakes up before sunrise and goes to his rice field. He checks the water, removes the weeds, and talks with other farmers. Planting rice is hard work, and the weather is not always friendly. However, Pak Ahmad never gives up. He believes that patience and hard work will bring a good harvest.',
    arti: 'Pak Ahmad adalah seorang petani yang tinggal di sebuah desa kecil dekat pegunungan. Ia bangun sebelum matahari terbit dan pergi ke sawahnya. Ia memeriksa air, mencabut rumput liar, dan berbincang dengan petani lain. Menanam padi adalah pekerjaan berat, dan cuaca tidak selalu bersahabat. Namun, Pak Ahmad tidak pernah menyerah. Ia percaya bahwa kesabaran dan kerja keras akan membawa panen yang baik.'
  },
  {
    id: 'malin-kundang', tahap: 3, judul: 'Malin Kundang',
    teks: 'Once upon a time, there lived a poor widow and her son, Malin Kundang. When he grew up, Malin decided to sail to another land to find a better life. Years later, he became a rich merchant and married a beautiful woman. One day, his ship landed in his old village. His mother ran to meet him, but Malin was ashamed of her and said that she was not his mother. Heartbroken, the old woman prayed, and a terrible storm came. Malin Kundang was turned into stone.',
    arti: 'Pada zaman dahulu, hiduplah seorang janda miskin bersama anaknya, Malin Kundang. Ketika dewasa, Malin memutuskan berlayar ke negeri lain untuk mencari kehidupan yang lebih baik. Bertahun-tahun kemudian, ia menjadi saudagar kaya dan menikahi seorang perempuan cantik. Suatu hari, kapalnya berlabuh di kampung halamannya. Ibunya berlari menemuinya, tetapi Malin malu dan berkata bahwa perempuan itu bukan ibunya. Dengan hati hancur, perempuan tua itu berdoa, dan datanglah badai yang dahsyat. Malin Kundang berubah menjadi batu.'
  },
  {
    id: 'mobile-phones', tahap: 3, judul: 'Using Mobile Phones Wisely',
    teks: 'Today, almost every student has a mobile phone. Phones can help us find information, contact our families, and learn new skills. On the other hand, they can also take too much of our time. Some students play games until late at night and feel tired in class. Therefore, we should use our phones wisely. We can set a time limit and put the phone away when we study.',
    arti: 'Saat ini, hampir setiap siswa memiliki telepon genggam. Telepon dapat membantu kita mencari informasi, menghubungi keluarga, dan mempelajari keterampilan baru. Di sisi lain, telepon juga bisa menyita terlalu banyak waktu kita. Sebagian siswa bermain gim sampai larut malam dan merasa lelah di kelas. Karena itu, kita harus menggunakan telepon dengan bijak. Kita bisa menetapkan batas waktu dan menyimpan telepon saat belajar.'
  },
  {
    id: 'plastic-waste', tahap: 3, judul: 'Plastic Waste',
    teks: 'Plastic waste has become one of the most serious environmental problems in the world. Every year, millions of tons of plastic end up in rivers and oceans. Because plastic takes hundreds of years to break down, it harms fish, birds, and other animals. In addition, tiny pieces of plastic can enter our food and water. To reduce this problem, we should bring our own bags, avoid single-use bottles, and separate our rubbish. Small actions, when done by many people, can make a big difference.',
    arti: 'Sampah plastik telah menjadi salah satu masalah lingkungan paling serius di dunia. Setiap tahun, jutaan ton plastik berakhir di sungai dan lautan. Karena plastik membutuhkan ratusan tahun untuk terurai, plastik membahayakan ikan, burung, dan hewan lainnya. Selain itu, potongan kecil plastik dapat masuk ke makanan dan air kita. Untuk mengurangi masalah ini, kita sebaiknya membawa tas sendiri, menghindari botol sekali pakai, dan memilah sampah. Tindakan kecil, bila dilakukan banyak orang, dapat membuat perbedaan besar.'
  },

  // ---------- Tahap 4: Level TKA ----------
  {
    id: 'school-uniforms', tahap: 4, judul: 'Should Students Wear School Uniforms?',
    teks: `Should students wear school uniforms? This question has been debated by parents, teachers, and students for many years. Some people strongly support school uniforms, while others believe that students should be free to choose their own clothes.

Supporters argue that uniforms create a sense of equality among students. When everyone wears the same clothes, rich and poor students look alike, so there is less pressure to follow fashion trends. Uniforms can also save time in the morning because students do not need to think about what to wear. In addition, uniforms help teachers and security guards recognize students easily, which makes the school environment safer.

On the other hand, opponents claim that uniforms limit students' freedom to express their personality. Teenagers are developing their identity, and the way they dress is one way to show who they are. Furthermore, uniforms can be expensive for some families, especially when schools require several different sets for different days. Some students also complain that their uniforms are uncomfortable, particularly in hot weather.

In conclusion, both sides have reasonable arguments. School uniforms may encourage equality and discipline, but they may also reduce freedom and add costs for parents. Perhaps the best solution is a simple and affordable uniform, combined with a few days each month when students may wear clothes of their own choice.`,
    arti: 'Haruskah siswa memakai seragam sekolah? Pertanyaan ini telah diperdebatkan oleh orang tua, guru, dan siswa selama bertahun-tahun. Sebagian orang sangat mendukung seragam sekolah, sementara yang lain berpendapat bahwa siswa seharusnya bebas memilih pakaian sendiri. Para pendukung berpendapat bahwa seragam menciptakan rasa kesetaraan di antara siswa. Ketika semua orang memakai pakaian yang sama, siswa kaya dan miskin terlihat serupa, sehingga tekanan untuk mengikuti tren mode berkurang. Seragam juga dapat menghemat waktu di pagi hari karena siswa tidak perlu memikirkan apa yang akan dipakai. Selain itu, seragam membantu guru dan petugas keamanan mengenali siswa dengan mudah, sehingga lingkungan sekolah lebih aman. Di sisi lain, pihak yang menentang menyatakan bahwa seragam membatasi kebebasan siswa untuk mengekspresikan kepribadian mereka. Remaja sedang membentuk jati dirinya, dan cara mereka berpakaian adalah salah satu cara menunjukkan siapa diri mereka. Lebih jauh lagi, seragam bisa mahal bagi sebagian keluarga, terutama ketika sekolah mewajibkan beberapa setel berbeda untuk hari yang berbeda. Sebagian siswa juga mengeluh bahwa seragam mereka tidak nyaman, terutama saat cuaca panas. Kesimpulannya, kedua pihak memiliki argumen yang masuk akal. Seragam sekolah dapat mendorong kesetaraan dan kedisiplinan, tetapi juga dapat mengurangi kebebasan dan menambah biaya bagi orang tua. Mungkin solusi terbaik adalah seragam yang sederhana dan terjangkau, ditambah beberapa hari setiap bulan ketika siswa boleh memakai pakaian pilihan sendiri.'
  },
  {
    id: 'reading-habit', tahap: 4, judul: 'Why Every Student Should Read',
    teks: `Reading is one of the most valuable habits that a student can develop. Unfortunately, many young people today spend more time scrolling through social media than reading books. In my opinion, every student should make reading a daily habit for several important reasons.

First, reading improves our knowledge and vocabulary. Every book we read introduces new ideas, new information, and new words that we can use when we speak and write. Students who read regularly usually find it easier to understand lessons and to express their thoughts clearly.

Second, reading trains our brain to concentrate. Unlike short videos that change every few seconds, a book requires us to focus on one story or idea for a long time. This ability to concentrate is very useful when we study for exams or solve difficult problems.

Third, reading can reduce stress and make us more creative. When we read a good story, we imagine other places and other lives, which helps us relax and see problems from different points of view.

Reading does not have to be expensive or difficult. We can borrow books from the school library, read digital books on our phones, or start with just ten minutes before going to sleep. Therefore, let us turn off our screens for a while and open a book, because a nation of readers is a nation that grows.`,
    arti: 'Membaca adalah salah satu kebiasaan paling berharga yang dapat dikembangkan seorang siswa. Sayangnya, banyak anak muda saat ini menghabiskan lebih banyak waktu menggulir media sosial daripada membaca buku. Menurut saya, setiap siswa sebaiknya menjadikan membaca kebiasaan sehari-hari karena beberapa alasan penting. Pertama, membaca meningkatkan pengetahuan dan kosakata kita. Setiap buku yang kita baca memperkenalkan gagasan baru, informasi baru, dan kata-kata baru yang dapat kita gunakan saat berbicara dan menulis. Siswa yang rutin membaca biasanya lebih mudah memahami pelajaran dan mengungkapkan pikiran dengan jelas. Kedua, membaca melatih otak kita untuk berkonsentrasi. Berbeda dengan video pendek yang berganti setiap beberapa detik, sebuah buku menuntut kita fokus pada satu cerita atau gagasan dalam waktu lama. Kemampuan berkonsentrasi ini sangat berguna ketika kita belajar untuk ujian atau memecahkan masalah sulit. Ketiga, membaca dapat mengurangi stres dan membuat kita lebih kreatif. Ketika membaca cerita yang bagus, kita membayangkan tempat dan kehidupan lain, yang membantu kita rileks dan melihat masalah dari sudut pandang berbeda. Membaca tidak harus mahal atau sulit. Kita bisa meminjam buku dari perpustakaan sekolah, membaca buku digital di ponsel, atau memulai dengan sepuluh menit saja sebelum tidur. Karena itu, mari matikan layar sejenak dan buka sebuah buku, karena bangsa yang gemar membaca adalah bangsa yang tumbuh.'
  }
];
