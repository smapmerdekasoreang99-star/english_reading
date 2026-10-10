/* Daftar tahap dan bacaan English Reading.
   Peta belajar 6 tahap (acuan CEFR), dari kosakata dasar sampai level TKA dan UTBK/SNBT.
   Urutan level di dalam satu tahap = urutan bacaan di daftar ini.

   Tiga jenis level: kosakata (daftar [kata, arti, contoh, arti contoh]),
   pola kalimat (pola + catatan + teks), dan bacaan (teks).

   Kosakata boleh diberi contohLain ({ kata: [[kalimat, arti], ...] }) dan situasi
   ([{ s, j, juga }]) untuk Latihan bertahap 5 sub level; lihat README dan contoh Greetings.

   Menambah bacaan: salin satu blok { ... }, beri id unik (huruf kecil, tanda -),
   isi tahap 0–5. Jumlah kalimat terjemahan (arti) harus sama dengan teks agar
   terjemahan tampil di bawah tiap kalimat. Baris kosong di teks = paragraf baru.
   Hindari angka (tulis "twenty", bukan "20"), jam ("seven o'clock"), dan singkatan
   bertitik ("Mr.") agar pemecahan kalimat dan koreksi bacaan tetap tepat. */
window.TAHAP = [
  { no: 0, nama: 'Fondasi', setara: 'Pre-A1 · setara SD', fokus: 'Kosakata dasar berkelompok (17 kelompok, 170 kata). Tiap kata dengan arti dan contoh kalimat.' },
  { no: 1, nama: 'Kalimat Sederhana', setara: 'A1 · SD akhir–SMP 7', fokus: 'Pola kalimat dasar (I am, there is, simple present, want to, kata tanya) dan bacaan pendek.' },
  { no: 2, nama: 'Teks Fungsional Pendek', setara: 'A2 · SMP', fokus: 'Pola masa lalu, masa depan, dan modal; teks deskripsi, recount, prosedur, pengumuman.' },
  { no: 3, nama: 'Genre Teks', setara: 'A2+–B1 · SMP 9–SMA 10', fokus: 'Pola menyampaikan pendapat; narrative, report, exposition singkat; kata sambung.' },
  { no: 4, nama: 'Level TKA', setara: 'B1–B1+ · SMA 11–12', fokus: 'Discussion, exposition, news item, email, report, dan narrative; ide pokok, rujukan, inferensi, sikap penulis. Bentuk soal TKA: pilihan ganda, pilihan ganda kompleks, benar/salah.' },
  { no: 5, nama: 'Level UTBK/SNBT', setara: 'B2 · SMA 12 · persiapan PTN', fokus: 'Teks ilmiah populer, isu sosial, teknologi, dan sejarah yang lebih panjang; ide pokok, inferensi, memperkuat/melemahkan argumen, tujuan dan sikap penulis, organisasi teks. Pilihan ganda 5 opsi, pilihan ganda kompleks, benar/salah.' }
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
    ],
    mirip: [['he', 'she']],
    contohLain: {
      'I': [['I like apples.', 'Saya suka apel.'], ['I live in Soreang.', 'Saya tinggal di Soreang.']],
      'you': [['You are very kind.', 'Kamu sangat baik hati.'], ['Are you hungry?', 'Apakah kamu lapar?']],
      'he': [['He is my father.', 'Dia ayahku.'], ['He is a good boy.', 'Dia anak laki-laki yang baik.']],
      'she': [['She is my mother.', 'Dia ibuku.'], ['She is a smart girl.', 'Dia anak perempuan yang pintar.']],
      'it': [['It is a big house.', 'Itu rumah yang besar.'], ['Where is my book? It is on the table.', 'Di mana bukuku? Buku itu ada di atas meja.']],
      'we': [['We are good friends.', 'Kami teman baik.'], ['We go to school together.', 'Kami pergi ke sekolah bersama.']],
      'they': [['They are my classmates.', 'Mereka teman sekelasku.'], ['They live in Bandung.', 'Mereka tinggal di Bandung.']],
      'my': [['This is my house.', 'Ini rumahku.'], ['My name is Dina.', 'Namaku Dina.']],
      'your': [['What is your name?', 'Siapa namamu?'], ['Your shoes are new.', 'Sepatumu baru.']],
      'our': [['Our teacher is kind.', 'Guru kami baik hati.'], ['This is our classroom.', 'Ini kelas kami.']]
    },
    situasi: [
      { s: 'Kamu berbicara tentang dirimu sendiri: "… am a student."', j: 'I' },
      { s: 'Kamu berbicara kepada temanmu: "… are my best friend."', j: 'you' },
      { s: 'Kamu bertanya kepada guru: "Are … busy, sir?"', j: 'you' },
      { s: 'Kamu membicarakan ayahmu: "… is a farmer."', j: 'he' },
      { s: 'Kamu membicarakan kakekmu: "… is seventy years old."', j: 'he' },
      { s: 'Kamu membicarakan ibumu: "… is a teacher."', j: 'she' },
      { s: 'Kamu membicarakan adik perempuanmu: "… likes to sing."', j: 'she' },
      { s: 'Kamu menunjuk seekor kucing: "… is very cute."', j: 'it' },
      { s: 'Di luar sedang hujan: "… is raining."', j: 'it' },
      { s: 'Kamu dan teman-temanmu satu kelas: "… are in class ten."', j: 'we' },
      { s: 'Kamu membicarakan dua orang tetanggamu: "… are very kind."', j: 'they' },
      { s: 'Tas itu milikmu sendiri: "This is … bag."', j: 'my' },
      { s: 'Kamu bertanya apakah pulpen itu milik temanmu: "Is this … pen?"', j: 'your' },
      { s: 'Sekolah itu milik kamu dan teman-temanmu: "… school is clean."', j: 'our' }
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
    ],
    contohLain: {
      'one': [['I have one cat.', 'Saya punya satu kucing.'], ['One plus one is two.', 'Satu tambah satu sama dengan dua.']],
      'two': [['I have two eyes.', 'Saya punya dua mata.'], ['Two birds are in the tree.', 'Dua burung ada di pohon.']],
      'three': [['My cat has three kittens.', 'Kucingku punya tiga anak kucing.'], ['I eat three times a day.', 'Saya makan tiga kali sehari.']],
      'four': [['A table has four legs.', 'Meja punya empat kaki.'], ['There are four people in my family.', 'Ada empat orang di keluargaku.']],
      'five': [['My brother is five years old.', 'Adikku berumur lima tahun.'], ['I have five fingers on one hand.', 'Saya punya lima jari di satu tangan.']],
      'six': [['An insect has six legs.', 'Serangga punya enam kaki.'], ['I have six pencils.', 'Saya punya enam pensil.']],
      'seven': [['I wake up at seven.', 'Saya bangun pukul tujuh.'], ['There are seven colors in a rainbow.', 'Ada tujuh warna pada pelangi.']],
      'eight': [['An octopus has eight arms.', 'Gurita punya delapan lengan.'], ['I sleep for eight hours.', 'Saya tidur selama delapan jam.']],
      'nine': [['Five plus four is nine.', 'Lima tambah empat sama dengan sembilan.'], ['There are nine students in the room.', 'Ada sembilan siswa di ruangan itu.']],
      'ten': [['I have ten toes.', 'Saya punya sepuluh jari kaki.'], ['Ten minus one is nine.', 'Sepuluh kurang satu sama dengan sembilan.']]
    },
    situasi: [
      { s: 'Berapa jumlah hidung di wajahmu?', j: 'one' },
      { s: 'Berapa jumlah matahari di langit kita?', j: 'one' },
      { s: 'Berapa jumlah kaki seekor ayam?', j: 'two' },
      { s: 'Berapa jumlah roda sepeda?', j: 'two' },
      { s: 'Berapa jumlah sisi segitiga?', j: 'three' },
      { s: 'Berapa jumlah warna lampu lalu lintas?', j: 'three' },
      { s: 'Berapa jumlah kaki seekor kucing?', j: 'four' },
      { s: 'Berapa jumlah jari pada satu tangan?', j: 'five' },
      { s: 'Berapa jumlah kaki seekor semut?', j: 'six' },
      { s: 'Tiga ditambah tiga sama dengan …', j: 'six' },
      { s: 'Berapa jumlah hari dalam satu minggu?', j: 'seven' },
      { s: 'Berapa jumlah kaki seekor laba-laba?', j: 'eight' },
      { s: 'Lima ditambah empat sama dengan …', j: 'nine' },
      { s: 'Berapa jumlah jari pada kedua tanganmu?', j: 'ten' }
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
    ],
    contohLain: {
      'red': [['Her dress is red.', 'Gaunnya merah.'], ['I like red roses.', 'Saya suka mawar merah.']],
      'blue': [['My bag is blue.', 'Tasku biru.'], ['The sea is blue.', 'Laut berwarna biru.']],
      'green': [['The grass is green.', 'Rumputnya hijau.'], ['He has a green bicycle.', 'Dia punya sepeda hijau.']],
      'yellow': [['The sun is yellow.', 'Matahari berwarna kuning.'], ['I have a yellow pencil.', 'Saya punya pensil kuning.']],
      'black': [['The cat is black.', 'Kucing itu hitam.'], ['He wears black shoes.', 'Dia memakai sepatu hitam.']],
      'white': [['Milk is white.', 'Susu berwarna putih.'], ['The clouds are white.', 'Awan-awan berwarna putih.']],
      'orange': [['The carrot is orange.', 'Wortel itu oranye.'], ['My cat is orange.', 'Kucingku berwarna oranye.']],
      'purple': [['The flower is purple.', 'Bunga itu ungu.'], ['Grapes can be purple.', 'Anggur bisa berwarna ungu.']],
      'brown': [['Coffee is brown.', 'Kopi berwarna cokelat.'], ['My dog is brown.', 'Anjingku berwarna cokelat.']],
      'pink': [['Her shoes are pink.', 'Sepatunya merah muda.'], ['I have a pink book.', 'Saya punya buku merah muda.']]
    },
    situasi: [
      { s: 'Warna langit pada siang yang cerah.', j: 'blue' },
      { s: 'Warna daun yang segar.', j: 'green' },
      { s: 'Lampu lalu lintas yang berarti boleh jalan.', j: 'green' },
      { s: 'Warna pisang yang matang.', j: 'yellow' },
      { s: 'Warna susu.', j: 'white' },
      { s: 'Warna bagian bawah bendera Indonesia.', j: 'white' },
      { s: 'Warna arang.', j: 'black' },
      { s: 'Warna tomat yang matang.', j: 'red' },
      { s: 'Lampu lalu lintas yang berarti berhenti.', j: 'red' },
      { s: 'Warna wortel.', j: 'orange' },
      { s: 'Merah dicampur kuning menjadi …', j: 'orange' },
      { s: 'Warna terong.', j: 'purple' },
      { s: 'Warna batang pohon.', j: 'brown' },
      { s: 'Merah dicampur putih menjadi …', j: 'pink' }
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
    ],
    contohLain: {
      'father': [['My father works in an office.', 'Ayahku bekerja di kantor.'], ['My father reads the newspaper.', 'Ayahku membaca koran.']],
      'mother': [['My mother is kind.', 'Ibuku baik hati.'], ['I help my mother in the kitchen.', 'Saya membantu ibuku di dapur.']],
      'brother': [['I have an older brother.', 'Saya punya seorang kakak laki-laki.'], ['My little brother is five years old.', 'Adik laki-lakiku berumur lima tahun.']],
      'sister': [['My sister is a student.', 'Saudara perempuanku seorang pelajar.'], ['I play with my little sister.', 'Saya bermain dengan adik perempuanku.']],
      'son': [['Budi is their son.', 'Budi anak laki-laki mereka.'], ['My uncle has a son.', 'Pamanku punya seorang anak laki-laki.']],
      'daughter': [['Rina is their daughter.', 'Rina anak perempuan mereka.'], ['My aunt has a daughter.', 'Bibiku punya seorang anak perempuan.']],
      'grandfather': [['My grandfather is a farmer.', 'Kakekku seorang petani.'], ['I visit my grandfather every Sunday.', 'Saya mengunjungi kakekku setiap hari Minggu.']],
      'grandmother': [['My grandmother makes cakes.', 'Nenekku membuat kue.'], ['My grandmother is seventy years old.', 'Nenekku berumur tujuh puluh tahun.']],
      'uncle': [['My uncle is a driver.', 'Pamanku seorang sopir.'], ['My uncle lives in Jakarta.', 'Pamanku tinggal di Jakarta.']],
      'aunt': [['My aunt bakes bread.', 'Bibiku membuat roti.'], ['My aunt is my mother\'s sister.', 'Bibiku adalah saudara perempuan ibuku.']]
    },
    situasi: [
      { s: 'Suami ibumu adalah …', j: 'father' },
      { s: 'Orang yang melahirkanmu adalah …', j: 'mother' },
      { s: 'Anak laki-laki ayah dan ibumu (selain kamu) adalah …', j: 'brother', juga: ['son'] },
      { s: 'Anak perempuan ayah dan ibumu (selain kamu) adalah …', j: 'sister', juga: ['daughter'] },
      { s: 'Pak Budi punya anak laki-laki bernama Andi. Andi adalah … Pak Budi.', j: 'son' },
      { s: 'Bagi kakekmu, ayahmu adalah …', j: 'son' },
      { s: 'Bu Sari punya anak perempuan bernama Rina. Rina adalah … Bu Sari.', j: 'daughter' },
      { s: 'Ayah dari ayahmu adalah …', j: 'grandfather' },
      { s: 'Ibu dari ibumu adalah …', j: 'grandmother' },
      { s: 'Istri kakekmu adalah …', j: 'grandmother' },
      { s: 'Adik laki-laki ibumu adalah …', j: 'uncle' },
      { s: 'Suami bibimu adalah …', j: 'uncle' },
      { s: 'Kakak perempuan ayahmu adalah …', j: 'aunt' },
      { s: 'Istri pamanmu adalah …', j: 'aunt' }
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
    ],
    contohLain: {
      'book': [['I read a book every night.', 'Saya membaca buku setiap malam.'], ['Open your book, please.', 'Tolong buka bukumu.']],
      'pen': [['I write with a pen.', 'Saya menulis dengan pulpen.'], ['My pen is black.', 'Pulpenku hitam.']],
      'bag': [['Put your book in your bag.', 'Masukkan bukumu ke dalam tasmu.'], ['Her bag is new.', 'Tasnya baru.']],
      'table': [['We eat at the table.', 'Kami makan di meja.'], ['The table is clean.', 'Meja itu bersih.']],
      'chair': [['This chair is broken.', 'Kursi ini rusak.'], ['There is a cat under the chair.', 'Ada kucing di bawah kursi.']],
      'door': [['Someone is at the door.', 'Ada seseorang di pintu.'], ['The door is open.', 'Pintunya terbuka.']],
      'window': [['The window is closed.', 'Jendelanya tertutup.'], ['I can see the garden from the window.', 'Saya bisa melihat kebun dari jendela.']],
      'bed': [['My bed is soft.', 'Tempat tidurku empuk.'], ['I make my bed every morning.', 'Saya merapikan tempat tidurku setiap pagi.']],
      'phone': [['My phone is ringing.', 'Teleponku berdering.'], ['Can I use your phone?', 'Boleh saya pakai teleponmu?']],
      'cup': [['This cup is hot.', 'Cangkir ini panas.'], ['I want a cup of tea.', 'Saya mau secangkir teh.']]
    },
    situasi: [
      { s: 'Benda yang kamu baca.', j: 'book' },
      { s: 'Benda untuk menulis dengan tinta.', j: 'pen' },
      { s: 'Benda untuk membawa buku ke sekolah.', j: 'bag' },
      { s: 'Benda tempat menaruh buku saat belajar atau piring saat makan.', j: 'table' },
      { s: 'Benda untuk duduk.', j: 'chair' },
      { s: 'Kamu masuk ke kelas melalui …', j: 'door' },
      { s: 'Ketuk dulu sebelum membukanya.', j: 'door' },
      { s: 'Kamu melihat ke luar rumah melalui benda berkaca ini.', j: 'window' },
      { s: 'Udara segar dan cahaya matahari masuk melalui …', j: 'window', juga: ['door'] },
      { s: 'Benda tempat kamu tidur.', j: 'bed' },
      { s: 'Benda untuk menelepon dan mengirim pesan.', j: 'phone' },
      { s: 'Benda kecil bertangkai untuk minum teh atau kopi.', j: 'cup' }
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
    ],
    contohLain: {
      'go': [['Let us go to the park.', 'Ayo kita pergi ke taman.'], ['I go to the market with my mother.', 'Saya pergi ke pasar bersama ibuku.']],
      'come': [['Come here, please.', 'Tolong datang ke sini.'], ['Can you come to my party?', 'Bisakah kamu datang ke pestaku?']],
      'eat': [['I eat an apple.', 'Saya makan apel.'], ['Do not eat too much candy.', 'Jangan makan terlalu banyak permen.']],
      'drink': [['I drink milk every morning.', 'Saya minum susu setiap pagi.'], ['Cats drink water.', 'Kucing minum air.']],
      'sleep': [['I sleep at nine.', 'Saya tidur pukul sembilan.'], ['Babies sleep a lot.', 'Bayi banyak tidur.']],
      'see': [['I see a big tree.', 'Saya melihat pohon besar.'], ['Can you see the moon?', 'Bisakah kamu melihat bulan?']],
      'hear': [['I hear a bird singing.', 'Saya mendengar burung bernyanyi.'], ['I cannot hear you.', 'Saya tidak bisa mendengarmu.']],
      'read': [['I read the newspaper.', 'Saya membaca koran.'], ['Please read this page.', 'Tolong baca halaman ini.']],
      'write': [['I write a letter to my friend.', 'Saya menulis surat untuk temanku.'], ['Please write your name.', 'Tolong tulis namamu.']],
      'speak': [['Can you speak English?', 'Bisakah kamu berbicara bahasa Inggris?'], ['Please speak slowly.', 'Tolong bicara pelan-pelan.']]
    },
    situasi: [
      { s: 'Pukul enam pagi kamu berangkat: "I … to school."', j: 'go' },
      { s: 'Temanmu memanggilmu: "… here, please!"', j: 'come' },
      { s: 'Ada tamu di depan pintu. Kamu berkata, "Please … in."', j: 'come' },
      { s: 'Kegiatan saat kamu lapar.', j: 'eat' },
      { s: 'Kegiatan saat kamu haus.', j: 'drink' },
      { s: 'Ibu berkata: "… your milk."', j: 'drink' },
      { s: 'Kegiatan saat kamu mengantuk di malam hari.', j: 'sleep' },
      { s: 'Kegiatan dengan mata, misalnya memandang pelangi.', j: 'see' },
      { s: 'Kegiatan dengan telinga.', j: 'hear' },
      { s: 'Di perpustakaan kamu duduk dan … buku cerita.', j: 'read' },
      { s: 'Guru berkata: "… your name on the paper."', j: 'write' },
      { s: 'Kegiatan dengan mulut saat bercakap-cakap.', j: 'speak' }
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
    ],
    contohLain: {
      'have': [['I have two sisters.', 'Saya punya dua saudara perempuan.'], ['We have a big garden.', 'Kami punya kebun yang besar.']],
      'like': [['I like cats.', 'Saya suka kucing.'], ['Do you like football?', 'Apakah kamu suka sepak bola?']],
      'want': [['I want a new bicycle.', 'Saya ingin sepeda baru.'], ['Do you want some water?', 'Apakah kamu ingin air?']],
      'need': [['I need your help.', 'Saya butuh bantuanmu.'], ['Plants need water.', 'Tanaman butuh air.']],
      'make': [['I make a kite.', 'Saya membuat layang-layang.'], ['Let us make a cake.', 'Ayo kita membuat kue.']],
      'do': [['I do my homework.', 'Saya mengerjakan PR saya.'], ['Do your best.', 'Lakukan yang terbaik.']],
      'give': [['Give me some water, please.', 'Tolong beri saya air.'], ['I give a gift to my mother.', 'Saya memberi hadiah kepada ibuku.']],
      'take': [['Take a pen from my bag.', 'Ambil pulpen dari tasku.'], ['I take the bus to school.', 'Saya naik bus ke sekolah.']],
      'know': [['I know the answer.', 'Saya tahu jawabannya.'], ['Do you know my name?', 'Apakah kamu tahu namaku?']],
      'help': [['Please help me.', 'Tolong bantu saya.'], ['I help my father in the garden.', 'Saya membantu ayahku di kebun.']]
    },
    situasi: [
      { s: 'Kamu memiliki sepeda: "I … a bicycle."', j: 'have' },
      { s: 'Kamu senang sekali makan bakso: "I … meatballs."', j: 'like', juga: ['want'] },
      { s: 'Kamu haus dan ingin minum: "I … some water."', j: 'want', juga: ['need'] },
      { s: 'Ujian besok, kamu harus punya pensil: "I … a pencil."', j: 'need', juga: ['want', 'have'] },
      { s: 'Ibu mengajakmu ke dapur: "Let us … a cake."', j: 'make' },
      { s: 'Guru mengingatkan PR: "Please … your homework."', j: 'do' },
      { s: 'Kamu menyerahkan buku kepada temanmu: "I … you this book."', j: 'give' },
      { s: 'Hujan turun. Ibu berkata: "… your umbrella."', j: 'take' },
      { s: 'Kamu yakin dengan jawabanmu: "I … the answer."', j: 'know', juga: ['have'] },
      { s: 'Kamu tersesat dan tidak tahu jalan: "I do not … the way."', j: 'know' },
      { s: 'Temanmu kesulitan membawa tas berat: "Can I … you?"', j: 'help' },
      { s: 'Kamu berterima kasih: "Thank you for your …"', j: 'help' }
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
    ],
    contohLain: {
      'big': [['Our house is big.', 'Rumah kami besar.'], ['I have a big dog.', 'Saya punya anjing besar.']],
      'small': [['My room is small.', 'Kamarku kecil.'], ['An ant is very small.', 'Semut sangat kecil.']],
      'good': [['You are a good student.', 'Kamu siswa yang baik.'], ['This food is good.', 'Makanan ini enak.']],
      'bad': [['That is a bad idea.', 'Itu ide yang buruk.'], ['Smoking is bad for you.', 'Merokok buruk bagimu.']],
      'happy': [['We are happy at school.', 'Kami senang di sekolah.'], ['Happy birthday!', 'Selamat ulang tahun!']],
      'sad': [['Why are you sad?', 'Mengapa kamu sedih?'], ['The movie is sad.', 'Film itu sedih.']],
      'hot': [['It is hot today.', 'Hari ini panas.'], ['Be careful, the soup is hot.', 'Hati-hati, supnya panas.']],
      'cold': [['I want cold water.', 'Saya mau air dingin.'], ['It is cold at night.', 'Malam hari dingin.']],
      'new': [['This is my new phone.', 'Ini telepon baruku.'], ['We have a new teacher.', 'Kami punya guru baru.']],
      'old': [['This house is very old.', 'Rumah ini sangat tua.'], ['My bag is old.', 'Tasku sudah lama.']]
    },
    situasi: [
      { s: 'Gajah dibandingkan semut: gajah itu …', j: 'big' },
      { s: 'Semut dibandingkan gajah: semut itu …', j: 'small' },
      { s: 'Nilai ujianmu seratus. Nilai itu …', j: 'good' },
      { s: 'Temanmu suka menolong orang lain. Dia anak yang …', j: 'good', juga: ['happy'] },
      { s: 'Hujan badai dan petir sepanjang hari. Cuacanya …', j: 'bad', juga: ['cold'] },
      { s: 'Kamu mendapat hadiah ulang tahun. Kamu merasa …', j: 'happy' },
      { s: 'Kucingmu hilang. Kamu merasa …', j: 'sad' },
      { s: 'Api terasa …', j: 'hot' },
      { s: 'Teh yang baru diseduh dengan air mendidih itu …', j: 'hot' },
      { s: 'Es batu terasa …', j: 'cold' },
      { s: 'Sepatu yang baru dibeli kemarin itu …', j: 'new' },
      { s: 'Kakek berumur delapan puluh tahun. Kakek sudah …', j: 'old' }
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
    ],
    contohLain: {
      'what': [['What is this?', 'Apa ini?'], ['What do you want?', 'Apa yang kamu inginkan?']],
      'where': [['Where is my bag?', 'Di mana tasku?'], ['Where is the library?', 'Di mana perpustakaan?']],
      'when': [['When do you go to school?', 'Kapan kamu pergi ke sekolah?'], ['When is the test?', 'Kapan ujiannya?']],
      'who': [['Who is your teacher?', 'Siapa gurumu?'], ['Who is at the door?', 'Siapa yang di pintu?']],
      'why': [['Why are you late?', 'Mengapa kamu terlambat?'], ['Why do you like cats?', 'Mengapa kamu suka kucing?']],
      'how': [['How do you make tea?', 'Bagaimana cara kamu membuat teh?'], ['How is the weather today?', 'Bagaimana cuaca hari ini?']],
      'which': [['Which color do you like?', 'Warna mana yang kamu suka?'], ['Which one is yours?', 'Yang mana milikmu?']],
      'whose': [['Whose bag is this?', 'Tas siapa ini?'], ['Whose phone is ringing?', 'Telepon siapa yang berdering?']],
      'how many': [['How many books do you have?', 'Berapa banyak buku yang kamu punya?'], ['How many students are in your class?', 'Berapa banyak siswa di kelasmu?']],
      'how much': [['How much is the bread?', 'Berapa harga roti itu?'], ['How much water do you drink?', 'Berapa banyak air yang kamu minum?']]
    },
    situasi: [
      { s: 'Kamu ingin tahu nama sebuah benda: "… is this?"', j: 'what' },
      { s: 'Kamu ingin tahu letak toilet: "… is the toilet?"', j: 'where' },
      { s: 'Kamu ingin tahu tanggal ulang tahun temanmu: "… is your birthday?"', j: 'when' },
      { s: 'Kamu ingin tahu jam kedatangan kereta: "… does the train come?"', j: 'when' },
      { s: 'Kamu ingin tahu orang yang berdiri di depan kelas: "… is that man?"', j: 'who' },
      { s: 'Kamu ingin tahu alasan temanmu menangis: "… are you crying?"', j: 'why' },
      { s: 'Kamu ingin tahu cara membuat layang-layang: "… do you make a kite?"', j: 'how' },
      { s: 'Ada dua tas di meja. Kamu bertanya: "… bag is yours?"', j: 'which', juga: ['whose'] },
      { s: 'Kamu menemukan pulpen dan ingin tahu pemiliknya: "… pen is this?"', j: 'whose', juga: ['which'] },
      { s: 'Kamu ingin tahu jumlah saudara temanmu: "… brothers do you have?"', j: 'how many' },
      { s: 'Kamu ingin tahu jumlah apel di keranjang: "… apples are there?"', j: 'how many' },
      { s: 'Kamu ingin tahu harga baju di toko: "… is this shirt?"', j: 'how much' }
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
    ],
    contohLain: {
      'today': [['It is sunny today.', 'Hari ini cerah.'], ['What day is it today?', 'Hari apa hari ini?']],
      'tomorrow': [['I will go to Bandung tomorrow.', 'Saya akan pergi ke Bandung besok.'], ['Tomorrow is Sunday.', 'Besok hari Minggu.']],
      'yesterday': [['Yesterday was Monday.', 'Kemarin hari Senin.'], ['I visited my grandmother yesterday.', 'Saya mengunjungi nenekku kemarin.']],
      'morning': [['I drink milk in the morning.', 'Saya minum susu pada pagi hari.'], ['The morning air is fresh.', 'Udara pagi segar.']],
      'night': [['The stars shine at night.', 'Bintang bersinar pada malam hari.'], ['I study at night.', 'Saya belajar pada malam hari.']],
      'Monday': [['School starts on Monday.', 'Sekolah dimulai pada hari Senin.'], ['Monday is the first school day.', 'Senin adalah hari sekolah pertama.']],
      'Friday': [['We clean the class on Friday.', 'Kami membersihkan kelas pada hari Jumat.'], ['Friday comes after Thursday.', 'Jumat datang setelah Kamis.']],
      'Sunday': [['Sunday is a holiday.', 'Minggu adalah hari libur.'], ['I do not go to school on Sunday.', 'Saya tidak sekolah pada hari Minggu.']],
      'week': [['See you next week.', 'Sampai jumpa minggu depan.'], ['There are seven days in a week.', 'Ada tujuh hari dalam seminggu.']],
      'hour': [['One hour has sixty minutes.', 'Satu jam ada enam puluh menit.'], ['I watch TV for one hour.', 'Saya menonton TV selama satu jam.']]
    },
    situasi: [
      { s: 'Hari yang sedang kamu jalani sekarang.', j: 'today' },
      { s: 'Hari sesudah hari ini.', j: 'tomorrow' },
      { s: 'Hari sebelum hari ini.', j: 'yesterday' },
      { s: 'Waktu matahari terbit.', j: 'morning' },
      { s: 'Waktu kamu sarapan.', j: 'morning' },
      { s: 'Waktu bulan dan bintang terlihat.', j: 'night' },
      { s: 'Hari sesudah Minggu.', j: 'Monday' },
      { s: 'Hari upacara bendera di awal pekan sekolah.', j: 'Monday' },
      { s: 'Hari sesudah Kamis.', j: 'Friday' },
      { s: 'Hari sesudah Sabtu.', j: 'Sunday' },
      { s: 'Tujuh hari disebut satu …', j: 'week' },
      { s: 'Enam puluh menit disebut satu …', j: 'hour' }
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
    ],
    contohLain: {
      'rice': [['Fried rice is delicious.', 'Nasi goreng enak.'], ['I eat rice with fish.', 'Saya makan nasi dengan ikan.']],
      'bread': [['This bread is soft.', 'Roti ini lembut.'], ['I buy bread at the bakery.', 'Saya membeli roti di toko roti.']],
      'egg': [['I eat a boiled egg.', 'Saya makan telur rebus.'], ['The hen lays an egg.', 'Ayam betina bertelur.']],
      'chicken': [['We have chicken soup.', 'Kami makan sup ayam.'], ['The chicken is in the garden.', 'Ayam itu ada di kebun.']],
      'fish': [['I like grilled fish.', 'Saya suka ikan bakar.'], ['Fish live in water.', 'Ikan hidup di air.']],
      'fruit': [['Mango is my favorite fruit.', 'Mangga adalah buah kesukaanku.'], ['We buy fruit at the market.', 'Kami membeli buah di pasar.']],
      'vegetables': [['Carrots are vegetables.', 'Wortel adalah sayuran.'], ['My mother cooks vegetables.', 'Ibuku memasak sayuran.']],
      'water': [['The water is clean.', 'Airnya bersih.'], ['I am thirsty. I need water.', 'Saya haus. Saya butuh air.']],
      'milk': [['I drink a glass of milk.', 'Saya minum segelas susu.'], ['Cows give us milk.', 'Sapi memberi kita susu.']],
      'tea': [['I drink hot tea.', 'Saya minum teh panas.'], ['My grandmother likes sweet tea.', 'Nenekku suka teh manis.']]
    },
    situasi: [
      { s: 'Makanan pokok orang Indonesia, dimasak dari beras.', j: 'rice' },
      { s: 'Makanan dari tepung yang dipanggang, sering untuk sarapan.', j: 'bread' },
      { s: 'Ayam betina menghasilkan ini.', j: 'egg' },
      { s: 'Hewan yang berkokok di pagi hari.', j: 'chicken' },
      { s: 'Bahan utama sate ayam.', j: 'chicken' },
      { s: 'Hewan yang hidup dan berenang di air, bisa dimakan.', j: 'fish' },
      { s: 'Mangga, pisang, dan jeruk termasuk …', j: 'fruit' },
      { s: 'Wortel, bayam, dan kangkung termasuk …', j: 'vegetables' },
      { s: 'Minuman bening yang paling sehat saat haus.', j: 'water' },
      { s: 'Minuman putih dari sapi.', j: 'milk' },
      { s: 'Minuman hangat dari daun yang diseduh.', j: 'tea' },
      { s: 'Bahan utama nasi goreng.', j: 'rice' }
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
    ],
    contohLain: {
      'home': [['Let us go home.', 'Ayo pulang.'], ['I stay at home on Sunday.', 'Saya tinggal di rumah pada hari Minggu.']],
      'school': [['I walk to school.', 'Saya berjalan kaki ke sekolah.'], ['Our school has a big field.', 'Sekolah kami punya lapangan besar.']],
      'market': [['The market is busy in the morning.', 'Pasar ramai pada pagi hari.'], ['We buy vegetables at the market.', 'Kami membeli sayuran di pasar.']],
      'mosque': [['My father prays at the mosque.', 'Ayahku salat di masjid.'], ['The mosque is very beautiful.', 'Masjid itu sangat indah.']],
      'hospital': [['Doctors work at the hospital.', 'Dokter bekerja di rumah sakit.'], ['My uncle is in the hospital.', 'Pamanku ada di rumah sakit.']],
      'library': [['The library is quiet.', 'Perpustakaan itu tenang.'], ['I borrow books from the library.', 'Saya meminjam buku dari perpustakaan.']],
      'left': [['Turn left here.', 'Belok kiri di sini.'], ['The school is on the left.', 'Sekolah itu ada di sebelah kiri.']],
      'right': [['Turn right at the mosque.', 'Belok kanan di masjid.'], ['My house is on the right.', 'Rumahku ada di sebelah kanan.']],
      'near': [['My house is near the school.', 'Rumahku dekat sekolah.'], ['Is the market near here?', 'Apakah pasar dekat dari sini?']],
      'far': [['Is your house far?', 'Apakah rumahmu jauh?'], ['The beach is far from here.', 'Pantai jauh dari sini.']]
    },
    situasi: [
      { s: 'Tempat kamu tinggal bersama keluarga.', j: 'home' },
      { s: 'Tempat kamu belajar bersama guru dan teman.', j: 'school' },
      { s: 'Tempat membeli sayur, ikan, dan buah.', j: 'market' },
      { s: 'Tempat umat Islam salat berjamaah.', j: 'mosque' },
      { s: 'Tempat orang sakit dirawat oleh dokter dan perawat.', j: 'hospital' },
      { s: 'Tempat meminjam dan membaca buku.', j: 'library' },
      { s: 'Lawan kata kanan.', j: 'left' },
      { s: 'Lawan kata kiri.', j: 'right' },
      { s: 'Kebanyakan orang menulis dengan tangan …', j: 'right' },
      { s: 'Lawan kata jauh.', j: 'near' },
      { s: 'Rumahmu hanya lima menit berjalan kaki dari sekolah. Rumahmu … sekolah.', j: 'near' },
      { s: 'Perjalanan ke kota itu butuh sepuluh jam. Kota itu …', j: 'far' }
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
    ],
    contohLain: {
      'in': [['My book is in my bag.', 'Bukuku ada di dalam tasku.'], ['The fish are in the water.', 'Ikan-ikan ada di dalam air.']],
      'on': [['The cat is on the bed.', 'Kucing itu ada di atas tempat tidur.'], ['Put the plate on the table.', 'Taruh piring di atas meja.']],
      'under': [['My shoes are under the bed.', 'Sepatuku ada di bawah tempat tidur.'], ['The ball is under the table.', 'Bola itu ada di bawah meja.']],
      'next to': [['Sit next to me.', 'Duduklah di sebelahku.'], ['The bank is next to the market.', 'Bank itu ada di sebelah pasar.']],
      'behind': [['Who is behind you?', 'Siapa di belakangmu?'], ['The ball is behind the door.', 'Bola itu ada di belakang pintu.']],
      'in front of': [['Stand in front of the class.', 'Berdirilah di depan kelas.'], ['There is a tree in front of my house.', 'Ada pohon di depan rumahku.']],
      'between': [['I sit between Ani and Budi.', 'Saya duduk di antara Ani dan Budi.'], ['The cat is between the boxes.', 'Kucing itu ada di antara kotak-kotak.']],
      'at': [['I am at school.', 'Saya ada di sekolah.'], ['We meet at the park.', 'Kami bertemu di taman.']],
      'from': [['This letter is from my friend.', 'Surat ini dari temanku.'], ['She comes from Bandung.', 'Dia berasal dari Bandung.']],
      'to': [['I walk to the mosque.', 'Saya berjalan ke masjid.'], ['Give this book to Rina.', 'Berikan buku ini kepada Rina.']]
    },
    situasi: [
      { s: 'Buku dimasukkan ke dalam tas: "The book is … the bag."', j: 'in' },
      { s: 'Ikan berenang di dalam akuarium: "The fish is … the tank."', j: 'in' },
      { s: 'Gelas diletakkan di permukaan meja: "The glass is … the table."', j: 'on' },
      { s: 'Kucing bersembunyi di kolong kursi: "The cat is … the chair."', j: 'under' },
      { s: 'Rina duduk tepat di samping Budi: "Rina sits … Budi."', j: 'next to' },
      { s: 'Kebun ada di bagian belakang rumah: "The garden is … the house."', j: 'behind' },
      { s: 'Mobil diparkir di depan sekolah: "The car is … the school."', j: 'in front of' },
      { s: 'Rumahmu terletak di antara masjid dan pasar: "My house is … the mosque and the market."', j: 'between' },
      { s: 'Kamu sedang berada di sekolah: "I am … school."', j: 'at', juga: ['in'] },
      { s: 'Kamu berasal dari Soreang: "I come … Soreang."', j: 'from' },
      { s: 'Kamu berjalan menuju pasar: "I go … the market."', j: 'to' },
      { s: 'Topi dipakai di atas kepala: "The hat is … my head."', j: 'on' }
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
    ],
    contohLain: {
      'wake up': [['I wake up at five.', 'Saya bangun pukul lima.'], ['Please wake up, it is morning.', 'Bangunlah, sudah pagi.']],
      'take a bath': [['I take a bath in the morning.', 'Saya mandi pada pagi hari.'], ['Take a bath before dinner.', 'Mandilah sebelum makan malam.']],
      'have breakfast': [['I have breakfast at six.', 'Saya sarapan pukul enam.'], ['Do you have breakfast every day?', 'Apakah kamu sarapan setiap hari?']],
      'go to school': [['We go to school on foot.', 'Kami pergi ke sekolah berjalan kaki.'], ['I go to school at six thirty.', 'Saya pergi ke sekolah pukul setengah tujuh.']],
      'study': [['Let us study together.', 'Ayo kita belajar bersama.'], ['I study math at night.', 'Saya belajar matematika pada malam hari.']],
      'play': [['Can I play with you?', 'Boleh aku bermain denganmu?'], ['We play football after school.', 'Kami bermain sepak bola sepulang sekolah.']],
      'cook': [['I can cook noodles.', 'Saya bisa memasak mi.'], ['My mother likes to cook.', 'Ibuku suka memasak.']],
      'clean': [['Please clean the board.', 'Tolong bersihkan papan tulis.'], ['I clean my room on Sunday.', 'Saya membersihkan kamarku pada hari Minggu.']],
      'watch': [['I like to watch cartoons.', 'Saya suka menonton kartun.'], ['We watch the news at night.', 'Kami menonton berita pada malam hari.']],
      'go to bed': [['Go to bed early.', 'Tidurlah lebih awal.'], ['I go to bed after I study.', 'Saya tidur setelah belajar.']]
    },
    situasi: [
      { s: 'Hal pertama yang kamu lakukan saat alarm pagi berbunyi.', j: 'wake up' },
      { s: 'Kegiatan dengan sabun dan air di kamar mandi.', j: 'take a bath' },
      { s: 'Makan pagi sebelum berangkat.', j: 'have breakfast' },
      { s: 'Pukul enam pagi kamu berangkat dengan seragam dan tas.', j: 'go to school' },
      { s: 'Membaca buku pelajaran dan mengerjakan latihan soal.', j: 'study' },
      { s: 'Sebelum ujian, kamu … dengan sungguh-sungguh.', j: 'study' },
      { s: 'Bersenang-senang bersama teman di lapangan, misalnya sepak bola.', j: 'play' },
      { s: 'Ibu menggoreng ikan dan membuat sayur di dapur.', j: 'cook' },
      { s: 'Menyapu lantai dan merapikan kamar.', j: 'clean' },
      { s: 'Duduk di depan televisi melihat film.', j: 'watch' },
      { s: 'Pukul sembilan malam kamu mematikan lampu kamar dan berbaring.', j: 'go to bed' },
      { s: 'Piket kelas setiap Jumat: menyapu dan mengepel.', j: 'clean' }
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
    ],
    contohLain: {
      'and': [['I have a cat and a dog.', 'Saya punya kucing dan anjing.'], ['Rina and Budi are friends.', 'Rina dan Budi berteman.']],
      'but': [['I am tired but happy.', 'Saya lelah tetapi senang.'], ['I like cats, but my sister likes dogs.', 'Saya suka kucing, tetapi adikku suka anjing.']],
      'or': [['Is it big or small?', 'Apakah itu besar atau kecil?'], ['You can walk or ride a bike.', 'Kamu bisa berjalan atau naik sepeda.']],
      'because': [['I eat because I am hungry.', 'Saya makan karena saya lapar.'], ['She is happy because it is her birthday.', 'Dia senang karena hari ini ulang tahunnya.']],
      'so': [['I was hungry, so I ate.', 'Saya lapar, jadi saya makan.'], ['It is late, so I go home.', 'Sudah larut, jadi saya pulang.']],
      'if': [['Call me if you need help.', 'Telepon aku jika kamu butuh bantuan.'], ['If you are tired, take a rest.', 'Jika kamu lelah, beristirahatlah.']],
      'when': [['I was happy when I won.', 'Saya senang ketika saya menang.'], ['Be quiet when the teacher speaks.', 'Tenanglah ketika guru berbicara.']],
      'then': [['Wash your hands, then eat.', 'Cuci tanganmu, lalu makan.'], ['I take a bath, then I sleep.', 'Saya mandi, lalu saya tidur.']],
      'after': [['I sleep after lunch.', 'Saya tidur setelah makan siang.'], ['We go home after school.', 'Kami pulang setelah sekolah.']],
      'before': [['Pray before you eat.', 'Berdoalah sebelum makan.'], ['Brush your teeth before bed.', 'Sikat gigimu sebelum tidur.']]
    },
    situasi: [
      { s: 'Menggabungkan dua hal: "I like rice … fish."', j: 'and' },
      { s: 'Dua hal yang berlawanan: "The house is small … clean."', j: 'but', juga: ['and'] },
      { s: 'Memberi pilihan: "Do you want milk … tea?"', j: 'or' },
      { s: 'Memberi pilihan: "Is your bag red … blue?"', j: 'or' },
      { s: 'Memberi alasan: "I am sad … my cat is sick."', j: 'because' },
      { s: 'Memberi alasan: "She stays home … she is sick."', j: 'because' },
      { s: 'Menyatakan akibat: "It is raining, … I take my umbrella."', j: 'so' },
      { s: 'Menyatakan syarat: "… you study hard, you will pass."', j: 'if', juga: ['when'] },
      { s: 'Menyatakan waktu kejadian: "I was sleeping … the phone rang."', j: 'when' },
      { s: 'Urutan kegiatan: "I wake up, … I take a bath."', j: 'then' },
      { s: 'Sepulang sekolah: "I play football … school."', j: 'after' },
      { s: 'Sebelum tidur: "I brush my teeth … I sleep."', j: 'before' }
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
    ],
    mirip: [['do', 'does', 'did'], ['can', 'may']],
    contohLain: {
      'can': [['Birds can fly.', 'Burung bisa terbang.'], ['I can ride a bicycle.', 'Saya bisa naik sepeda.']],
      'cannot': [['I cannot swim.', 'Saya tidak bisa berenang.'], ['Fish cannot walk.', 'Ikan tidak bisa berjalan.']],
      'will': [['We will go to the beach.', 'Kami akan pergi ke pantai.'], ['It will rain tomorrow.', 'Besok akan hujan.']],
      'must': [['We must wear a uniform.', 'Kami harus memakai seragam.'], ['You must be on time.', 'Kamu harus tepat waktu.']],
      'should': [['You should sleep early.', 'Kamu sebaiknya tidur lebih awal.'], ['We should help our friends.', 'Kita sebaiknya membantu teman kita.']],
      'may': [['May I come in?', 'Bolehkah saya masuk?'], ['You may sit here.', 'Kamu boleh duduk di sini.']],
      'do': [['Do you have a pen?', 'Apakah kamu punya pulpen?'], ['Do they live here?', 'Apakah mereka tinggal di sini?']],
      'does': [['Does he like football?', 'Apakah dia suka sepak bola?'], ['Does your cat eat fish?', 'Apakah kucingmu makan ikan?']],
      'did': [['Did you see my bag?', 'Apakah tadi kamu melihat tasku?'], ['Did she come yesterday?', 'Apakah dia datang kemarin?']],
      'is': [['The sky is blue.', 'Langit berwarna biru.'], ['He is a doctor.', 'Dia seorang dokter.']]
    },
    situasi: [
      { s: 'Kamu mampu berenang: "I … swim."', j: 'can' },
      { s: 'Burung mampu terbang: "Birds … fly."', j: 'can' },
      { s: 'Kamu tidak mampu terbang: "I … fly."', j: 'cannot' },
      { s: 'Ikan tidak mampu berjalan: "Fish … walk."', j: 'cannot' },
      { s: 'Rencanamu besok: "I … visit my grandmother tomorrow."', j: 'will' },
      { s: 'Aturan wajib di jalan: "You … stop at the red light."', j: 'must', juga: ['should'] },
      { s: 'Saran untuk teman yang sakit: "You … see a doctor."', j: 'should', juga: ['must', 'can'] },
      { s: 'Minta izin dengan sopan kepada guru: "… I go to the toilet?"', j: 'may', juga: ['can'] },
      { s: 'Bertanya tentang kebiasaan temanmu: "… you like fried rice?"', j: 'do' },
      { s: 'Bertanya tentang kebiasaan Budi: "… Budi play football?"', j: 'does' },
      { s: 'Bertanya tentang kejadian kemarin: "… you go to school yesterday?"', j: 'did' },
      { s: 'Menjelaskan seseorang: "My mother … a teacher."', j: 'is' }
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
  },
  // Tambahan Tahap 4 (10 Okt 2026): news item, email resmi, report, narrative.
  {
    id: 'river-cleanup', tahap: 4, judul: 'Students Clean Up the Citarum River',
    teks: `More than two hundred students from five high schools in Bandung Regency joined a river clean-up on the banks of the Citarum River last Saturday. The event was organized by a local environmental group together with the regency government. It was held to celebrate World Environment Day and to raise awareness about the condition of the river.

The volunteers started working at seven in the morning. Wearing gloves and boots, they collected plastic bottles, food wrappers, old clothes, and even broken furniture from the riverbanks. By noon, they had filled more than one thousand sacks with rubbish. According to the organizers, most of the waste came from households that still throw their rubbish directly into the river.

The head of the environmental group said that cleaning the river once a year is not enough. She explained that people must change their daily habits, such as separating waste at home and using fewer plastic bags. She also asked schools to teach students how to manage waste in a responsible way.

The students said they were happy to take part in the event. One of them admitted that she was shocked by the amount of rubbish she found. The organizers plan to hold a similar event every three months and hope that more schools will join them.`,
    arti: 'Lebih dari dua ratus siswa dari lima SMA di Kabupaten Bandung mengikuti kegiatan bersih-bersih di tepi Sungai Citarum Sabtu lalu. Kegiatan itu diselenggarakan oleh sebuah kelompok lingkungan setempat bersama pemerintah kabupaten. Kegiatan tersebut diadakan untuk memperingati Hari Lingkungan Hidup Sedunia dan meningkatkan kesadaran tentang kondisi sungai. Para relawan mulai bekerja pukul tujuh pagi. Dengan memakai sarung tangan dan sepatu bot, mereka mengumpulkan botol plastik, bungkus makanan, pakaian bekas, bahkan perabot rusak dari tepi sungai. Menjelang tengah hari, mereka telah mengisi lebih dari seribu karung dengan sampah. Menurut panitia, sebagian besar sampah berasal dari rumah tangga yang masih membuang sampah langsung ke sungai. Ketua kelompok lingkungan itu mengatakan bahwa membersihkan sungai setahun sekali tidaklah cukup. Ia menjelaskan bahwa masyarakat harus mengubah kebiasaan sehari-hari, seperti memilah sampah di rumah dan mengurangi penggunaan kantong plastik. Ia juga meminta sekolah-sekolah mengajari siswa cara mengelola sampah secara bertanggung jawab. Para siswa mengatakan mereka senang ikut serta dalam kegiatan itu. Salah satu dari mereka mengaku terkejut dengan banyaknya sampah yang ia temukan. Panitia berencana mengadakan kegiatan serupa setiap tiga bulan dan berharap lebih banyak sekolah akan bergabung.'
  },
  {
    id: 'email-science-fair', tahap: 4, judul: 'An Email: Request for a Science Fair',
    teks: `Dear Mrs Lestari,

I am writing on behalf of the Student Council to ask for your permission to hold a science fair at our school next month. The event is planned for Saturday, the fifteenth of November, from eight in the morning until two in the afternoon.

The purpose of the fair is to give students a chance to show their science projects to parents, teachers, and students from other schools. So far, thirty-two groups have registered, and their projects range from simple water filters to small solar-powered cars. We believe the fair will motivate younger students to become more interested in science.

To make the event successful, we would like to request three things. First, we need to use the school hall and four classrooms. Second, we hope that two science teachers can act as judges. Finally, we would be grateful if the school could provide a small budget for prizes and certificates.

We have already prepared a detailed schedule and a list of the committee members, which I have attached to this email. If you have any questions or suggestions, please do not hesitate to contact me. Thank you for your time and support.

Yours sincerely,
Raka Pratama
Chairperson of the Student Council`,
    arti: 'Ibu Lestari yang terhormat, saya menulis atas nama OSIS untuk meminta izin Ibu mengadakan pameran sains di sekolah kita bulan depan. Acara ini direncanakan pada hari Sabtu, lima belas November, mulai pukul delapan pagi sampai pukul dua siang. Tujuan pameran ini adalah memberi kesempatan kepada siswa untuk menunjukkan proyek sains mereka kepada orang tua, guru, dan siswa dari sekolah lain. Sejauh ini, tiga puluh dua kelompok telah mendaftar, dan proyek mereka beragam, mulai dari penyaring air sederhana sampai mobil kecil bertenaga surya. Kami yakin pameran ini akan mendorong siswa yang lebih muda untuk lebih tertarik pada sains. Agar acara ini sukses, kami ingin mengajukan tiga permohonan. Pertama, kami perlu menggunakan aula sekolah dan empat ruang kelas. Kedua, kami berharap dua guru sains dapat menjadi juri. Terakhir, kami akan sangat berterima kasih apabila sekolah dapat menyediakan sedikit anggaran untuk hadiah dan sertifikat. Kami sudah menyiapkan jadwal terperinci dan daftar anggota panitia, yang saya lampirkan pada surel ini. Jika Ibu memiliki pertanyaan atau saran, jangan ragu untuk menghubungi saya. Terima kasih atas waktu dan dukungan Ibu. Hormat saya, Raka Pratama, Ketua OSIS'
  },
  {
    id: 'komodo', tahap: 4, judul: 'The Komodo Dragon',
    teks: `The Komodo dragon is the largest living lizard in the world. It is found only on a few islands in eastern Indonesia, including Komodo, Rinca, and Flores. An adult Komodo dragon can grow up to three metres long and weigh more than seventy kilograms.

Komodo dragons have rough grey skin, a long tail, and strong legs with sharp claws. They also have a long yellow tongue, which they use to smell the air. With this tongue, a Komodo dragon can detect a dead animal from several kilometres away.

Komodo dragons are carnivores. They eat almost any kind of meat, from small lizards to deer, pigs, and even buffaloes. Instead of chasing their prey for a long distance, they usually wait quietly and attack suddenly. Their saliva contains harmful bacteria and venom, so an animal that is bitten often becomes weak and dies a few days later.

Female Komodo dragons lay around twenty eggs at a time and bury them in the ground. The eggs hatch after about eight months. Young Komodo dragons spend their first years in trees, where they are safe from larger dragons.

Today, Komodo dragons are an endangered species. Their habitat is getting smaller, and the number of animals they hunt is decreasing. To protect them, the Indonesian government created Komodo National Park in nineteen eighty, which is now a World Heritage Site.`,
    arti: 'Komodo adalah kadal terbesar yang masih hidup di dunia. Hewan ini hanya ditemukan di beberapa pulau di Indonesia bagian timur, termasuk Komodo, Rinca, dan Flores. Komodo dewasa dapat tumbuh hingga tiga meter panjangnya dan beratnya lebih dari tujuh puluh kilogram. Komodo memiliki kulit abu-abu yang kasar, ekor panjang, dan kaki kuat dengan cakar tajam. Komodo juga memiliki lidah panjang berwarna kuning yang digunakan untuk mencium bau di udara. Dengan lidah ini, komodo dapat mendeteksi bangkai hewan dari jarak beberapa kilometer. Komodo adalah hewan pemakan daging. Mereka memakan hampir semua jenis daging, mulai dari kadal kecil sampai rusa, babi, bahkan kerbau. Alih-alih mengejar mangsa dalam jarak jauh, mereka biasanya menunggu diam-diam lalu menyerang tiba-tiba. Air liur mereka mengandung bakteri berbahaya dan bisa, sehingga hewan yang tergigit sering menjadi lemah dan mati beberapa hari kemudian. Komodo betina bertelur sekitar dua puluh butir sekaligus dan menguburnya di dalam tanah. Telur-telur itu menetas setelah sekitar delapan bulan. Komodo muda menghabiskan tahun-tahun pertamanya di atas pohon, tempat mereka aman dari komodo yang lebih besar. Saat ini, komodo adalah spesies yang terancam punah. Habitat mereka semakin sempit, dan jumlah hewan buruan mereka semakin berkurang. Untuk melindungi mereka, pemerintah Indonesia mendirikan Taman Nasional Komodo pada tahun seribu sembilan ratus delapan puluh, yang kini menjadi Situs Warisan Dunia.'
  },
  {
    id: 'lake-toba', tahap: 4, judul: 'The Legend of Lake Toba',
    teks: `Long ago, in the land of North Sumatra, there lived a young farmer named Toba. One day, while he was fishing in a river, he caught a big golden fish. To his surprise, the fish suddenly turned into a beautiful woman.

The woman agreed to marry Toba, but on one condition. He must never tell anyone that she had once been a fish. Toba promised to keep the secret, and they lived happily together. A year later, they had a son named Samosir.

Samosir grew into a strong boy, but he was always hungry. One afternoon, his mother asked him to take lunch to his father in the field. On the way, Samosir felt so hungry that he ate most of the food. When Toba saw the empty basket, he became very angry and shouted, "You are truly the child of a fish!"

Samosir ran home crying and told his mother what his father had said. His mother was heartbroken because Toba had broken his promise. She told Samosir to climb the highest hill nearby. Then, she disappeared, and a heavy rain began to fall.

Water came out of the ground and flooded the whole valley. The flood formed a large lake, which people later called Lake Toba. The hill where Samosir stood became an island in the middle of the lake, known today as Samosir Island.`,
    arti: 'Dahulu kala, di tanah Sumatra Utara, hiduplah seorang petani muda bernama Toba. Suatu hari, ketika sedang memancing di sungai, ia menangkap seekor ikan besar berwarna keemasan. Betapa terkejutnya ia, ikan itu tiba-tiba berubah menjadi seorang perempuan cantik. Perempuan itu bersedia menikah dengan Toba, tetapi dengan satu syarat. Toba tidak boleh memberi tahu siapa pun bahwa ia dulunya seekor ikan. Toba berjanji menjaga rahasia itu, dan mereka hidup bahagia bersama. Setahun kemudian, mereka dikaruniai seorang anak laki-laki bernama Samosir. Samosir tumbuh menjadi anak yang kuat, tetapi ia selalu lapar. Suatu siang, ibunya menyuruhnya mengantarkan makan siang kepada ayahnya di ladang. Di tengah jalan, Samosir merasa sangat lapar sehingga ia memakan sebagian besar makanan itu. Ketika Toba melihat keranjang yang kosong, ia sangat marah dan berteriak, "Dasar kamu memang anak ikan!" Samosir berlari pulang sambil menangis dan menceritakan kepada ibunya apa yang dikatakan ayahnya. Ibunya sangat sedih karena Toba telah melanggar janjinya. Ia menyuruh Samosir memanjat bukit tertinggi di dekat situ. Kemudian, ia menghilang, dan hujan lebat mulai turun. Air keluar dari dalam tanah dan membanjiri seluruh lembah. Banjir itu membentuk sebuah danau besar, yang kemudian disebut orang Danau Toba. Bukit tempat Samosir berdiri menjadi sebuah pulau di tengah danau, yang kini dikenal sebagai Pulau Samosir.'
  },

  // ---------- Tahap 5: Level UTBK/SNBT (10 Okt 2026) ----------
  // Teks B2: ilmiah populer, isu lingkungan kota, teknologi, sejarah. Soal pilihan ganda 5 opsi.
  {
    id: 'sleep-memory', tahap: 5, judul: 'Why Sleep Matters for Learning',
    teks: `Many students believe that staying up late to study is the best way to prepare for an exam. However, a growing body of research suggests that this habit may actually do more harm than good. Sleep, it turns out, plays an essential role in how the brain stores and organizes new information.

During the day, the brain collects a huge amount of information through our senses. Much of this information is first held in a region called the hippocampus, which acts like a temporary storage space. While we sleep, especially during the deep stages of sleep, the brain replays the experiences of the day and gradually transfers important memories to the cortex, where they can be kept for a long time. In other words, sleep helps to turn fragile short-term memories into stable long-term ones.

Researchers have tested this idea in many experiments. In a typical study, two groups of participants learn the same list of words. One group is allowed to sleep normally, while the other group is kept awake for the night. When both groups are tested the next day, those who slept usually remember significantly more words. Interestingly, even a short nap in the afternoon can improve performance on some memory tasks.

Lack of sleep does not only weaken memory. It also reduces attention, slows down reaction time, and makes it harder to control emotions. A tired student may read the same paragraph several times without understanding it. Consequently, the extra hours gained by staying up late are often wasted because the brain is not working efficiently.

None of this means that students should study less. Rather, it suggests that they should study smarter. Spreading revision over several days and protecting a regular sleep schedule are likely to produce better results than a single night of exhausting effort before the exam.`,
    arti: 'Banyak siswa percaya bahwa begadang untuk belajar adalah cara terbaik mempersiapkan ujian. Namun, semakin banyak penelitian menunjukkan bahwa kebiasaan ini justru bisa lebih banyak merugikan daripada menguntungkan. Ternyata, tidur memainkan peran penting dalam cara otak menyimpan dan menata informasi baru. Sepanjang hari, otak mengumpulkan sangat banyak informasi melalui pancaindra kita. Sebagian besar informasi ini mula-mula disimpan di bagian otak yang disebut hipokampus, yang berfungsi seperti ruang penyimpanan sementara. Saat kita tidur, terutama pada tahap tidur nyenyak, otak memutar ulang pengalaman hari itu dan secara bertahap memindahkan ingatan penting ke korteks, tempat ingatan itu dapat disimpan dalam waktu lama. Dengan kata lain, tidur membantu mengubah ingatan jangka pendek yang rapuh menjadi ingatan jangka panjang yang stabil. Para peneliti telah menguji gagasan ini dalam banyak percobaan. Dalam sebuah penelitian yang umum, dua kelompok peserta mempelajari daftar kata yang sama. Satu kelompok dibiarkan tidur seperti biasa, sedangkan kelompok lain dibuat tetap terjaga sepanjang malam. Ketika kedua kelompok diuji keesokan harinya, mereka yang tidur biasanya mengingat jauh lebih banyak kata. Menariknya, tidur siang yang singkat pun dapat meningkatkan hasil pada beberapa tugas mengingat. Kurang tidur tidak hanya melemahkan daya ingat. Kurang tidur juga mengurangi perhatian, memperlambat waktu reaksi, dan membuat emosi lebih sulit dikendalikan. Siswa yang lelah mungkin membaca paragraf yang sama beberapa kali tanpa memahaminya. Akibatnya, jam tambahan yang diperoleh dari begadang sering terbuang karena otak tidak bekerja secara efisien. Semua ini tidak berarti siswa harus belajar lebih sedikit. Sebaliknya, hal ini menunjukkan bahwa mereka harus belajar dengan lebih cerdas. Membagi waktu mengulang pelajaran ke beberapa hari dan menjaga jadwal tidur yang teratur kemungkinan besar memberi hasil yang lebih baik daripada satu malam usaha melelahkan sebelum ujian.'
  },
  {
    id: 'urban-heat', tahap: 5, judul: 'Cooling Our Cities',
    teks: `On a hot afternoon, the centre of a large city can be several degrees warmer than the countryside around it. This phenomenon, known as the urban heat island effect, is becoming a serious concern as more and more people move to cities. In Indonesia, cities such as Jakarta, Surabaya, and Medan have experienced a noticeable rise in temperature over the past few decades.

The main cause of the effect lies in the materials that cities are made of. Asphalt roads, concrete buildings, and dark rooftops absorb sunlight during the day and release the heat slowly at night. At the same time, trees and open fields, which naturally cool the air, are often replaced by new buildings. Heat from cars, factories, and air conditioners adds even more warmth to the urban environment.

The consequences go beyond mere discomfort. Higher temperatures increase the demand for electricity, as people rely more heavily on fans and air conditioners. This, in turn, leads to more fossil fuels being burned and more greenhouse gases being released. Extreme heat can also be dangerous to health, particularly for elderly people, young children, and outdoor workers.

Fortunately, cities are not powerless. Planting trees along streets and creating parks can lower local temperatures, since plants provide shade and release water vapour into the air. Some cities have begun to paint rooftops white or to cover them with plants, so that less heat is absorbed. Urban planners are also designing streets that allow wind to flow more freely between buildings.

Admittedly, these solutions require money, space, and long-term commitment. Nevertheless, experts argue that the cost of doing nothing will be far greater. As cities continue to grow, the way they are designed today will determine how liveable they are for the next generation.`,
    arti: 'Pada siang hari yang panas, pusat kota besar bisa beberapa derajat lebih panas daripada daerah pedesaan di sekitarnya. Fenomena ini, yang dikenal sebagai efek pulau panas perkotaan, menjadi perhatian serius karena semakin banyak orang pindah ke kota. Di Indonesia, kota-kota seperti Jakarta, Surabaya, dan Medan telah mengalami kenaikan suhu yang cukup terasa selama beberapa dekade terakhir. Penyebab utama efek ini terletak pada bahan-bahan penyusun kota. Jalan beraspal, gedung beton, dan atap berwarna gelap menyerap sinar matahari pada siang hari dan melepaskan panasnya perlahan pada malam hari. Pada saat yang sama, pepohonan dan lapangan terbuka, yang secara alami menyejukkan udara, sering digantikan oleh bangunan baru. Panas dari mobil, pabrik, dan pendingin ruangan menambah kehangatan lingkungan kota. Akibatnya lebih dari sekadar rasa tidak nyaman. Suhu yang lebih tinggi meningkatkan kebutuhan listrik, karena orang semakin bergantung pada kipas angin dan pendingin ruangan. Hal ini pada gilirannya menyebabkan lebih banyak bahan bakar fosil dibakar dan lebih banyak gas rumah kaca dilepaskan. Panas ekstrem juga dapat membahayakan kesehatan, terutama bagi lansia, anak kecil, dan pekerja lapangan. Untungnya, kota-kota bukannya tanpa daya. Menanam pohon di sepanjang jalan dan membuat taman dapat menurunkan suhu setempat, karena tanaman memberi keteduhan dan melepaskan uap air ke udara. Beberapa kota mulai mengecat atap dengan warna putih atau menutupinya dengan tanaman, sehingga panas yang diserap berkurang. Para perencana kota juga merancang jalan yang memungkinkan angin mengalir lebih leluasa di antara gedung-gedung. Memang, solusi-solusi ini membutuhkan biaya, lahan, dan komitmen jangka panjang. Meskipun demikian, para ahli berpendapat bahwa kerugian jika tidak melakukan apa-apa akan jauh lebih besar. Seiring kota terus berkembang, cara kota dirancang hari ini akan menentukan seberapa layak huni kota itu bagi generasi berikutnya.'
  },
  {
    id: 'ai-classroom', tahap: 5, judul: 'Artificial Intelligence in the Classroom',
    teks: `Only a few years ago, the idea of a computer program that could write essays, solve maths problems, and explain difficult concepts in seconds seemed like science fiction. Today, such tools powered by artificial intelligence, or AI, are freely available to anyone with a phone. Their arrival has sparked a heated debate among educators about whether AI should be welcomed or restricted in schools.

Supporters of AI in education point out that it can act as a personal tutor for every student. A student who is too shy to ask questions in class can ask an AI assistant as many times as needed, at any time of day. AI can also adjust explanations to a student's level, offering simpler examples to those who are struggling and more challenging tasks to those who are ahead. For teachers, AI may save time on routine work such as preparing exercises, so that they can focus on guiding students personally.

Critics, however, warn that these benefits come with serious risks. If students simply copy answers produced by AI, they may complete their assignments without actually learning anything. Over time, this could weaken their ability to think critically, write independently, and solve problems on their own. Moreover, AI tools sometimes produce information that sounds convincing but is completely wrong, and students who trust them blindly may not notice the mistakes.

Between these two positions, a growing number of educators are calling for a balanced approach. Rather than banning AI, they suggest teaching students how to use it responsibly. For example, students might be allowed to use AI to brainstorm ideas or check their understanding, but they would still be required to explain their reasoning in their own words. Assessments could also include more oral presentations and classroom discussions, where students must demonstrate what they truly know.

Ultimately, AI is a tool, and like any tool, its value depends on how it is used. A calculator did not make mathematics education useless; instead, it changed what students needed to learn. In the same way, schools that prepare students to use AI wisely may give them an advantage in a world where such technology is everywhere.`,
    arti: 'Baru beberapa tahun lalu, gagasan tentang program komputer yang dapat menulis esai, menyelesaikan soal matematika, dan menjelaskan konsep sulit dalam hitungan detik terasa seperti fiksi ilmiah. Kini, alat-alat semacam itu yang ditenagai kecerdasan buatan, atau AI, tersedia secara gratis bagi siapa saja yang memiliki ponsel. Kehadirannya memicu perdebatan sengit di kalangan pendidik tentang apakah AI sebaiknya disambut atau dibatasi di sekolah. Para pendukung AI dalam pendidikan menyatakan bahwa AI dapat berperan sebagai guru pribadi bagi setiap siswa. Siswa yang terlalu malu bertanya di kelas dapat bertanya kepada asisten AI sebanyak yang diperlukan, kapan saja. AI juga dapat menyesuaikan penjelasan dengan tingkat kemampuan siswa, memberikan contoh yang lebih sederhana bagi yang kesulitan dan tugas yang lebih menantang bagi yang sudah lebih maju. Bagi guru, AI dapat menghemat waktu untuk pekerjaan rutin seperti menyiapkan latihan, sehingga mereka dapat fokus membimbing siswa secara pribadi. Namun, para pengkritik memperingatkan bahwa manfaat ini disertai risiko yang serius. Jika siswa hanya menyalin jawaban yang dihasilkan AI, mereka mungkin menyelesaikan tugas tanpa benar-benar mempelajari apa pun. Lama-kelamaan, hal ini dapat melemahkan kemampuan mereka untuk berpikir kritis, menulis secara mandiri, dan memecahkan masalah sendiri. Selain itu, alat AI kadang menghasilkan informasi yang terdengar meyakinkan tetapi sepenuhnya keliru, dan siswa yang memercayainya begitu saja mungkin tidak menyadari kesalahannya. Di antara kedua posisi ini, semakin banyak pendidik menyerukan pendekatan yang seimbang. Alih-alih melarang AI, mereka menyarankan agar siswa diajari cara menggunakannya secara bertanggung jawab. Misalnya, siswa boleh menggunakan AI untuk mencari ide atau memeriksa pemahaman mereka, tetapi mereka tetap diwajibkan menjelaskan penalaran mereka dengan kata-kata sendiri. Penilaian juga dapat mencakup lebih banyak presentasi lisan dan diskusi kelas, tempat siswa harus menunjukkan apa yang benar-benar mereka ketahui. Pada akhirnya, AI adalah alat, dan seperti alat lainnya, nilainya bergantung pada cara penggunaannya. Kalkulator tidak membuat pendidikan matematika menjadi tidak berguna; sebaliknya, kalkulator mengubah apa yang perlu dipelajari siswa. Dengan cara yang sama, sekolah yang menyiapkan siswa menggunakan AI dengan bijak dapat memberi mereka keunggulan di dunia tempat teknologi semacam itu ada di mana-mana.'
  },
  {
    id: 'spice-trade', tahap: 5, judul: 'The Islands That Changed the World',
    teks: `Five hundred years ago, a few tiny islands in eastern Indonesia were among the most valuable places on Earth. The Banda Islands, in what is now the province of Maluku, were the only place in the world where nutmeg trees grew. In Europe, nutmeg was so highly prized that a small bag of it could be worth more than a house.

For centuries, nutmeg and other spices from the region reached Europe through a long chain of traders. Indonesian sailors carried them to ports in Malaysia and India, where Arab and Indian merchants bought them and transported them further west. By the time the spices arrived in Venice, their price had increased many times. Europeans had little idea where these precious goods actually came from.

This situation changed at the end of the fifteenth century, when European explorers began searching for a sea route to the source of the spices. The Portuguese reached Maluku first, followed by the Spanish, the English, and the Dutch. Each wanted to control the spice trade and the enormous profits it promised. Competition between them often turned violent, and local people suffered the most.

In the early seventeenth century, the Dutch East India Company decided to take complete control of nutmeg production. When the people of Banda refused to sell their nutmeg only to the Dutch, the company attacked the islands. Thousands of Bandanese were killed or forced to leave, and the land was given to Dutch planters who used enslaved workers. It was one of the darkest chapters in the history of the archipelago.

Today, nutmeg is cheap and can be found in almost any kitchen. Yet the story of the Banda Islands reminds us that ordinary products can have extraordinary histories. It also shows how the desire for wealth shaped the modern world, often at a terrible human cost.`,
    arti: 'Lima ratus tahun yang lalu, beberapa pulau kecil di Indonesia bagian timur termasuk tempat paling berharga di Bumi. Kepulauan Banda, yang kini termasuk Provinsi Maluku, adalah satu-satunya tempat di dunia tempat pohon pala tumbuh. Di Eropa, pala begitu dihargai sehingga sekantong kecil pala bisa lebih mahal daripada sebuah rumah. Selama berabad-abad, pala dan rempah lain dari wilayah ini sampai ke Eropa melalui rantai pedagang yang panjang. Pelaut Indonesia membawanya ke pelabuhan di Malaysia dan India, tempat saudagar Arab dan India membelinya lalu mengangkutnya lebih jauh ke barat. Ketika rempah-rempah itu tiba di Venesia, harganya sudah naik berkali-kali lipat. Orang Eropa hampir tidak tahu dari mana sebenarnya barang berharga ini berasal. Keadaan ini berubah pada akhir abad kelima belas, ketika para penjelajah Eropa mulai mencari jalur laut menuju sumber rempah-rempah. Portugis tiba di Maluku lebih dulu, disusul Spanyol, Inggris, dan Belanda. Masing-masing ingin menguasai perdagangan rempah dan keuntungan besar yang dijanjikannya. Persaingan di antara mereka sering berubah menjadi kekerasan, dan penduduk setempatlah yang paling menderita. Pada awal abad ketujuh belas, Kongsi Dagang Hindia Timur Belanda memutuskan untuk menguasai sepenuhnya produksi pala. Ketika penduduk Banda menolak menjual pala mereka hanya kepada Belanda, kongsi dagang itu menyerang pulau-pulau tersebut. Ribuan orang Banda dibunuh atau dipaksa pergi, dan tanahnya diberikan kepada pekebun Belanda yang mempekerjakan budak. Itu adalah salah satu babak paling kelam dalam sejarah Nusantara. Kini, pala murah dan dapat ditemukan di hampir setiap dapur. Namun, kisah Kepulauan Banda mengingatkan kita bahwa barang biasa bisa memiliki sejarah yang luar biasa. Kisah ini juga menunjukkan bagaimana hasrat akan kekayaan membentuk dunia modern, sering kali dengan harga kemanusiaan yang mengerikan.'
  }
];
