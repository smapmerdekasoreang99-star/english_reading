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
  { no: 0, nama: 'Fondasi', setara: 'Pre-A1 · setara SD', fokus: 'Kosakata dasar berkelompok (35 kelompok), termasuk angka sampai jutaan, bilangan bertingkat, dan menyatakan jam. Tiap kata dengan arti dan contoh kalimat.' },
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
  // Tambahan 10 Okt 2026: bilangan 11–100, bilangan besar sampai jutaan, bilangan bertingkat.
  {
    id: 'numbers-100', tahap: 0, judul: 'Numbers 11 to 100', kelompok: 'Angka 11–100',
    kosakata: [
      ['eleven', 'sebelas', 'There are eleven players in a football team.', 'Ada sebelas pemain dalam satu tim sepak bola.'],
      ['twelve', 'dua belas', 'There are twelve months in a year.', 'Ada dua belas bulan dalam setahun.'],
      ['thirteen', 'tiga belas', 'My brother is thirteen years old.', 'Kakakku berumur tiga belas tahun.'],
      ['fifteen', 'lima belas', 'The break is fifteen minutes long.', 'Waktu istirahat lamanya lima belas menit.'],
      ['twenty', 'dua puluh', 'I have twenty books.', 'Saya punya dua puluh buku.'],
      ['twenty-five', 'dua puluh lima', 'There are twenty-five students in my class.', 'Ada dua puluh lima siswa di kelasku.'],
      ['thirty', 'tiga puluh', 'April has thirty days.', 'Bulan April punya tiga puluh hari.'],
      ['forty', 'empat puluh', 'My father is forty years old.', 'Ayahku berumur empat puluh tahun.'],
      ['sixty', 'enam puluh', 'One hour has sixty minutes.', 'Satu jam ada enam puluh menit.'],
      ['one hundred', 'seratus', 'There are one hundred chairs in the hall.', 'Ada seratus kursi di aula.']
    ],
    contohLain: {
      'eleven': [['Ten plus one is eleven.', 'Sepuluh tambah satu sama dengan sebelas.'], ['My cousin is eleven years old.', 'Sepupuku berumur sebelas tahun.']],
      'twelve': [['I have lunch at twelve.', 'Saya makan siang pukul dua belas.'], ['A box has twelve pencils.', 'Satu kotak berisi dua belas pensil.']],
      'thirteen': [['There are thirteen girls in the room.', 'Ada tiga belas anak perempuan di ruangan itu.'], ['Ten plus three is thirteen.', 'Sepuluh tambah tiga sama dengan tiga belas.']],
      'fifteen': [['I walk to school for fifteen minutes.', 'Saya berjalan ke sekolah selama lima belas menit.'], ['She is fifteen years old.', 'Dia berumur lima belas tahun.']],
      'twenty': [['Two times ten is twenty.', 'Dua kali sepuluh sama dengan dua puluh.'], ['We have twenty chickens.', 'Kami punya dua puluh ekor ayam.']],
      'twenty-five': [['Five times five is twenty-five.', 'Lima kali lima sama dengan dua puluh lima.'], ['My teacher is twenty-five years old.', 'Guruku berumur dua puluh lima tahun.']],
      'thirty': [['The test takes thirty minutes.', 'Ujiannya berlangsung tiga puluh menit.'], ['There are thirty days in June.', 'Ada tiga puluh hari di bulan Juni.']],
      'forty': [['Our class has forty desks.', 'Kelas kami punya empat puluh meja.'], ['Four times ten is forty.', 'Empat kali sepuluh sama dengan empat puluh.']],
      'sixty': [['One minute has sixty seconds.', 'Satu menit ada enam puluh detik.'], ['My grandfather is sixty years old.', 'Kakekku berumur enam puluh tahun.']],
      'one hundred': [['Ten times ten is one hundred.', 'Sepuluh kali sepuluh sama dengan seratus.'], ['I got one hundred on my test.', 'Saya mendapat nilai seratus di ujianku.']]
    },
    situasi: [
      { s: 'Berapa jumlah pemain satu tim sepak bola di lapangan?', j: 'eleven' },
      { s: 'Berapa jumlah bulan dalam setahun?', j: 'twelve' },
      { s: 'Sepuluh ditambah dua sama dengan …', j: 'twelve' },
      { s: 'Sepuluh ditambah tiga sama dengan …', j: 'thirteen' },
      { s: 'Seperempat jam sama dengan berapa menit?', j: 'fifteen' },
      { s: 'Sepuluh ditambah lima sama dengan …', j: 'fifteen' },
      { s: 'Dua kali sepuluh sama dengan …', j: 'twenty' },
      { s: 'Berapa jumlah jari tangan dan jari kakimu seluruhnya?', j: 'twenty' },
      { s: 'Lima kali lima sama dengan …', j: 'twenty-five' },
      { s: 'Berapa jumlah hari di bulan April?', j: 'thirty' },
      { s: 'Setengah jam sama dengan berapa menit?', j: 'thirty' },
      { s: 'Empat kali sepuluh sama dengan …', j: 'forty' },
      { s: 'Berapa menit dalam satu jam?', j: 'sixty' },
      { s: 'Sepuluh kali sepuluh sama dengan …', j: 'one hundred' }
    ]
  },
  {
    id: 'big-numbers', tahap: 0, judul: 'Big Numbers', kelompok: 'Angka ratusan sampai jutaan',
    kosakata: [
      ['five hundred', 'lima ratus', 'I found a five hundred rupiah coin.', 'Saya menemukan koin lima ratus rupiah.'],
      ['one thousand', 'seribu', 'Our school has one thousand two hundred students.', 'Sekolah kami punya seribu dua ratus siswa.'],
      ['two thousand', 'dua ribu', 'I buy a candy for two thousand rupiah.', 'Saya membeli permen seharga dua ribu rupiah.'],
      ['ten thousand', 'sepuluh ribu', 'My pocket money is ten thousand rupiah a day.', 'Uang sakuku sepuluh ribu rupiah sehari.'],
      ['twenty thousand', 'dua puluh ribu', 'The ticket costs twenty thousand rupiah.', 'Harga tiketnya dua puluh ribu rupiah.'],
      ['fifty thousand', 'lima puluh ribu', 'This book costs fifty thousand rupiah.', 'Buku ini harganya lima puluh ribu rupiah.'],
      ['one hundred thousand', 'seratus ribu', 'The stadium can hold one hundred thousand people.', 'Stadion itu dapat menampung seratus ribu orang.'],
      ['five hundred thousand', 'lima ratus ribu', 'My new shoes cost five hundred thousand rupiah.', 'Sepatu baruku harganya lima ratus ribu rupiah.'],
      ['one million', 'satu juta', 'More than one million people live in this city.', 'Lebih dari satu juta orang tinggal di kota ini.'],
      ['ten million', 'sepuluh juta', 'The new motorcycle costs ten million rupiah.', 'Sepeda motor baru itu harganya sepuluh juta rupiah.']
    ],
    contohLain: {
      'five hundred': [['Ten times fifty is five hundred.', 'Sepuluh kali lima puluh sama dengan lima ratus.'], ['The village has five hundred families.', 'Desa itu punya lima ratus keluarga.']],
      'one thousand': [['Ten times one hundred is one thousand.', 'Sepuluh kali seratus sama dengan seribu.'], ['The hall has one thousand chairs.', 'Aula itu punya seribu kursi.']],
      'two thousand': [['A bottle of water costs two thousand rupiah.', 'Sebotol air harganya dua ribu rupiah.'], ['The library has two thousand books.', 'Perpustakaan itu punya dua ribu buku.']],
      'ten thousand': [['One hundred times one hundred is ten thousand.', 'Seratus kali seratus sama dengan sepuluh ribu.'], ['I walk ten thousand steps every day.', 'Saya berjalan sepuluh ribu langkah setiap hari.']],
      'twenty thousand': [['A bowl of meatball soup costs twenty thousand rupiah.', 'Semangkuk bakso harganya dua puluh ribu rupiah.'], ['The concert has twenty thousand fans.', 'Konser itu punya dua puluh ribu penggemar.']],
      'fifty thousand': [['Can I pay with fifty thousand rupiah?', 'Bolehkah saya membayar dengan lima puluh ribu rupiah?'], ['The festival has fifty thousand visitors.', 'Festival itu punya lima puluh ribu pengunjung.']],
      'one hundred thousand': [['The red money is one hundred thousand rupiah.', 'Uang berwarna merah itu seratus ribu rupiah.'], ['This bag costs one hundred thousand rupiah.', 'Tas ini harganya seratus ribu rupiah.']],
      'five hundred thousand': [['My mother saves five hundred thousand rupiah every month.', 'Ibuku menabung lima ratus ribu rupiah setiap bulan.'], ['The school trip costs five hundred thousand rupiah.', 'Darmawisata sekolah biayanya lima ratus ribu rupiah.']],
      'one million': [['One thousand times one thousand is one million.', 'Seribu kali seribu sama dengan satu juta.'], ['The prize is one million rupiah.', 'Hadiahnya satu juta rupiah.']],
      'ten million': [['The city has ten million trees.', 'Kota itu punya sepuluh juta pohon.'], ['My uncle saved ten million rupiah for a new house.', 'Pamanku menabung sepuluh juta rupiah untuk rumah baru.']]
    },
    situasi: [
      { s: 'Koin Rp500 dalam bahasa Inggris dibaca …', j: 'five hundred' },
      { s: 'Seribu dikurangi lima ratus sama dengan …', j: 'five hundred' },
      { s: 'Sepuluh kali seratus sama dengan …', j: 'one thousand' },
      { s: 'Uang kertas Rp2.000 dalam bahasa Inggris dibaca …', j: 'two thousand' },
      { s: 'Dua kali seribu sama dengan …', j: 'two thousand' },
      { s: 'Uang kertas Rp10.000 dalam bahasa Inggris dibaca …', j: 'ten thousand' },
      { s: 'Seratus kali seratus sama dengan …', j: 'ten thousand' },
      { s: 'Uang kertas Rp20.000 dalam bahasa Inggris dibaca …', j: 'twenty thousand' },
      { s: 'Uang kertas biru Rp50.000 dalam bahasa Inggris dibaca …', j: 'fifty thousand' },
      { s: 'Uang kertas merah Rp100.000 dalam bahasa Inggris dibaca …', j: 'one hundred thousand' },
      { s: 'Lima puluh ribu ditambah lima puluh ribu sama dengan …', j: 'one hundred thousand' },
      { s: 'Lima kali seratus ribu sama dengan …', j: 'five hundred thousand' },
      { s: 'Seribu kali seribu sama dengan …', j: 'one million' },
      { s: 'Rp1.000.000 dalam bahasa Inggris dibaca …', j: 'one million' },
      { s: 'Sepuluh kali satu juta sama dengan …', j: 'ten million' }
    ]
  },
  {
    id: 'ordinal-numbers', tahap: 0, judul: 'Ordinal Numbers 1st to 10th', kelompok: 'Bilangan bertingkat 1–10',
    kosakata: [
      ['first', 'pertama', 'January is the first month of the year.', 'Januari adalah bulan pertama dalam setahun.'],
      ['second', 'kedua', 'I sit in the second row.', 'Saya duduk di baris kedua.'],
      ['third', 'ketiga', 'My class is on the third floor.', 'Kelasku ada di lantai tiga.'],
      ['fourth', 'keempat', 'April is the fourth month of the year.', 'April adalah bulan keempat dalam setahun.'],
      ['fifth', 'kelima', 'May is the fifth month of the year.', 'Mei adalah bulan kelima dalam setahun.'],
      ['sixth', 'keenam', 'June is the sixth month of the year.', 'Juni adalah bulan keenam dalam setahun.'],
      ['seventh', 'ketujuh', 'July is the seventh month of the year.', 'Juli adalah bulan ketujuh dalam setahun.'],
      ['eighth', 'kedelapan', 'August is the eighth month of the year.', 'Agustus adalah bulan kedelapan dalam setahun.'],
      ['ninth', 'kesembilan', 'My brother is in the ninth grade.', 'Kakakku duduk di kelas sembilan.'],
      ['tenth', 'kesepuluh', 'October is the tenth month of the year.', 'Oktober adalah bulan kesepuluh dalam setahun.']
    ],
    contohLain: {
      'first': [['She won first place in the race.', 'Dia meraih juara pertama dalam lomba lari.'], ['This is my first visit to Bali.', 'Ini kunjungan pertamaku ke Bali.']],
      'second': [['Andi is the second child in his family.', 'Andi adalah anak kedua di keluarganya.'], ['February is the second month.', 'Februari adalah bulan kedua.']],
      'third': [['My team got third place.', 'Timku mendapat juara ketiga.'], ['March is the third month of the year.', 'Maret adalah bulan ketiga dalam setahun.']],
      'fourth': [['This is the fourth time I read this book.', 'Ini keempat kalinya saya membaca buku ini.'], ['He lives on the fourth floor.', 'Dia tinggal di lantai empat.']],
      'fifth': [['Our team finished in fifth place.', 'Tim kami finis di urutan kelima.'], ['Turn left at the fifth house.', 'Belok kiri di rumah kelima.']],
      'sixth': [['My sister is in the sixth grade.', 'Adik perempuanku duduk di kelas enam.'], ['This is my sixth English lesson.', 'Ini pelajaran bahasa Inggrisku yang keenam.']],
      'seventh': [['Sunday is the seventh day of the week.', 'Minggu adalah hari ketujuh dalam sepekan.'], ['I am in the seventh grade.', 'Saya duduk di kelas tujuh.']],
      'eighth': [['My sister is in the eighth grade.', 'Kakak perempuanku duduk di kelas delapan.'], ['This is the eighth question.', 'Ini soal kedelapan.']],
      'ninth': [['September is the ninth month of the year.', 'September adalah bulan kesembilan dalam setahun.'], ['I live on the ninth floor.', 'Saya tinggal di lantai sembilan.']],
      'tenth': [['Today is the tenth of October.', 'Hari ini tanggal sepuluh Oktober.'], ['She is in the tenth grade.', 'Dia duduk di kelas sepuluh.']]
    },
    situasi: [
      { s: 'Kamu juara satu lomba lari. Kamu berada di urutan …', j: 'first' },
      { s: 'Januari adalah bulan ke-…', j: 'first' },
      { s: 'Pemenang medali perak berada di urutan …', j: 'second' },
      { s: 'Februari adalah bulan ke-…', j: 'second' },
      { s: 'Pemenang medali perunggu berada di urutan …', j: 'third' },
      { s: 'Maret adalah bulan ke-…', j: 'third' },
      { s: 'April adalah bulan ke-…', j: 'fourth' },
      { s: 'Mei adalah bulan ke-…', j: 'fifth' },
      { s: 'Juni adalah bulan ke-…', j: 'sixth' },
      { s: 'Siswa kelas 6 SD duduk di the … grade.', j: 'sixth' },
      { s: 'Juli adalah bulan ke-…', j: 'seventh' },
      { s: 'Bila sepekan dimulai hari Senin, hari Minggu adalah hari ke-…', j: 'seventh' },
      { s: 'Hari Kemerdekaan Indonesia jatuh pada bulan ke-…', j: 'eighth' },
      { s: 'September adalah bulan ke-…', j: 'ninth' },
      { s: 'Oktober adalah bulan ke-…', j: 'tenth' },
      { s: 'Siswa kelas 10 SMA duduk di the … grade.', j: 'tenth' }
    ]
  },
  {
    id: 'ordinal-numbers-2', tahap: 0, judul: 'Ordinal Numbers 11th to 50th', kelompok: 'Bilangan bertingkat 11–50',
    kosakata: [
      ['eleventh', 'kesebelas', 'November is the eleventh month of the year.', 'November adalah bulan kesebelas dalam setahun.'],
      ['twelfth', 'kedua belas', 'December is the twelfth month of the year.', 'Desember adalah bulan kedua belas dalam setahun.'],
      ['thirteenth', 'ketiga belas', "Today is my brother's thirteenth birthday.", 'Hari ini ulang tahun ketiga belas kakakku.'],
      ['fifteenth', 'kelima belas', 'The test is on the fifteenth of May.', 'Ujiannya tanggal lima belas Mei.'],
      ['twentieth', 'kedua puluh', 'Today is my twentieth day at the new school.', 'Hari ini adalah hari kedua puluhku di sekolah baru.'],
      ['twenty-first', 'kedua puluh satu', 'Kartini Day is on the twenty-first of April.', 'Hari Kartini jatuh pada tanggal dua puluh satu April.'],
      ['twenty-second', 'kedua puluh dua', 'My birthday is on the twenty-second of July.', 'Ulang tahunku tanggal dua puluh dua Juli.'],
      ['thirtieth', 'ketiga puluh', 'The last day of April is the thirtieth.', 'Hari terakhir bulan April adalah tanggal tiga puluh.'],
      ['thirty-first', 'ketiga puluh satu', 'The year ends on the thirty-first of December.', 'Tahun berakhir pada tanggal tiga puluh satu Desember.'],
      ['fiftieth', 'kelima puluh', 'My grandparents celebrate their fiftieth wedding anniversary.', 'Kakek dan nenekku merayakan ulang tahun pernikahan mereka yang kelima puluh.']
    ],
    contohLain: {
      'eleventh': [['He finished in eleventh place.', 'Dia finis di urutan kesebelas.'], ['I live on the eleventh floor.', 'Saya tinggal di lantai sebelas.']],
      'twelfth': [['Students in the twelfth grade will finish school soon.', 'Siswa kelas dua belas akan segera lulus sekolah.'], ['This is the twelfth page.', 'Ini halaman kedua belas.']],
      'thirteenth': [['The meeting is on the thirteenth of June.', 'Rapatnya tanggal tiga belas Juni.'], ['She came thirteenth in the race.', 'Dia datang di urutan ketiga belas dalam lomba itu.']],
      'fifteenth': [['My father gets his salary on the fifteenth.', 'Ayahku menerima gaji pada tanggal lima belas.'], ['This is the fifteenth question.', 'Ini soal kelima belas.']],
      'twentieth': [['Tomorrow is the twentieth of May.', 'Besok tanggal dua puluh Mei.'], ['My aunt celebrates her twentieth year as a teacher.', 'Bibiku merayakan tahun kedua puluhnya sebagai guru.']],
      'twenty-first': [['My birthday is on the twenty-first of June.', 'Ulang tahunku tanggal dua puluh satu Juni.'], ['We live in the twenty-first century.', 'Kita hidup di abad kedua puluh satu.']],
      'twenty-second': [['The school trip is on the twenty-second of August.', 'Darmawisata sekolah tanggal dua puluh dua Agustus.'], ['He sits in the twenty-second seat.', 'Dia duduk di kursi kedua puluh dua.']],
      'thirtieth': [['My aunt celebrated her thirtieth birthday.', 'Bibiku merayakan ulang tahunnya yang ketiga puluh.'], ['The exam ends on the thirtieth of June.', 'Ujian berakhir tanggal tiga puluh Juni.']],
      'thirty-first': [['The last day of August is the thirty-first.', 'Hari terakhir bulan Agustus adalah tanggal tiga puluh satu.'], ['My report is due on the thirty-first of May.', 'Laporanku harus dikumpulkan tanggal tiga puluh satu Mei.']],
      'fiftieth': [['Our school celebrates its fiftieth anniversary this year.', 'Sekolah kami merayakan ulang tahun kelima puluh tahun ini.'], ['He was the fiftieth visitor today.', 'Dia pengunjung kelima puluh hari ini.']]
    },
    situasi: [
      { s: 'November adalah bulan ke-…', j: 'eleventh' },
      { s: 'Lantai 11 sebuah gedung disebut the … floor.', j: 'eleventh' },
      { s: 'Desember adalah bulan ke-…', j: 'twelfth' },
      { s: 'Siswa kelas 12 SMA duduk di the … grade.', j: 'twelfth' },
      { s: 'Ulang tahun ke-13 disebut the … birthday.', j: 'thirteenth' },
      { s: 'Tanggal 15 Mei dibaca the … of May.', j: 'fifteenth' },
      { s: 'Ulang tahun ke-20 disebut the … birthday.', j: 'twentieth' },
      { s: 'Hari Kartini jatuh pada tanggal 21 April: the … of April.', j: 'twenty-first' },
      { s: 'Abad sekarang (abad ke-21) disebut the … century.', j: 'twenty-first' },
      { s: 'Tanggal 22 Juli dibaca the … of July.', j: 'twenty-second' },
      { s: 'Hari terakhir bulan April (tanggal 30) adalah the …', j: 'thirtieth' },
      { s: 'Hari terakhir bulan Desember (tanggal 31) adalah the …', j: 'thirty-first' },
      { s: 'Ulang tahun pernikahan ke-50 disebut the … anniversary.', j: 'fiftieth' },
      { s: 'Sekolah yang berdiri 50 tahun lalu merayakan ulang tahun the …', j: 'fiftieth' }
    ]
  },
  {
    id: 'colors', tahap: 0, judul: 'Colors', kelompok: 'Warna', ilustrasi: 'warna',
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
    id: 'family-words', tahap: 0, judul: 'Family', kelompok: 'Keluarga dan orang', ilustrasi: 'keluarga',
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
  // Tambahan 10 Okt 2026: anggota tubuh, perasaan, pakaian (dengan ilustrasi).
  {
    id: 'body-parts', tahap: 0, judul: 'Parts of the Body', kelompok: 'Anggota tubuh', ilustrasi: 'tubuh',
    kosakata: [
      ['head', 'kepala', 'Wear a helmet to protect your head.', 'Pakailah helm untuk melindungi kepalamu.'],
      ['eye', 'mata', 'I have something in my eye.', 'Ada sesuatu di mataku.'],
      ['ear', 'telinga', 'Put your hand on your ear.', 'Letakkan tanganmu di telingamu.'],
      ['nose', 'hidung', 'I smell with my nose.', 'Saya mencium bau dengan hidungku.'],
      ['mouth', 'mulut', 'Open your mouth, please.', 'Tolong buka mulutmu.'],
      ['hand', 'tangan', 'Raise your hand, please.', 'Tolong angkat tanganmu.'],
      ['arm', 'lengan', 'He broke his arm.', 'Lengannya patah.'],
      ['leg', 'kaki (tungkai)', 'My leg hurts after the game.', 'Kakiku sakit setelah pertandingan.'],
      ['foot', 'telapak kaki', 'I hurt my foot.', 'Telapak kakiku terluka.'],
      ['stomach', 'perut', 'My stomach hurts.', 'Perutku sakit.']
    ],
    contohLain: {
      'head': [['My head hurts.', 'Kepalaku sakit.'], ['She puts a hat on her head.', 'Dia memakai topi di kepalanya.']],
      'eye': [['Close one eye.', 'Tutup satu mata.'], ['My right eye is red.', 'Mata kananku merah.']],
      'ear': [['My left ear hurts.', 'Telinga kiriku sakit.'], ['The cat has one white ear.', 'Kucing itu punya satu telinga putih.']],
      'nose': [['My nose is cold.', 'Hidungku dingin.'], ['An elephant has a long nose.', 'Gajah punya hidung yang panjang.']],
      'mouth': [['Do not talk with your mouth full.', 'Jangan bicara saat mulutmu penuh.'], ['Cover your mouth when you cough.', 'Tutup mulutmu saat batuk.']],
      'hand': [['I write with my right hand.', 'Saya menulis dengan tangan kananku.'], ['Give me your hand.', 'Berikan tanganmu.']],
      'arm': [['She has a bag on her arm.', 'Dia membawa tas di lengannya.'], ['Raise your left arm.', 'Angkat lengan kirimu.']],
      'leg': [['Stand on one leg.', 'Berdirilah dengan satu kaki.'], ['The dog has a hurt leg.', 'Kaki anjing itu terluka.']],
      'foot': [['Put your left foot forward.', 'Majukan kaki kirimu.'], ['I go to school on foot.', 'Saya pergi ke sekolah berjalan kaki.']],
      'stomach': [['Do not swim with a full stomach.', 'Jangan berenang dengan perut kenyang.'], ['My stomach is full.', 'Perutku kenyang.']]
    },
    situasi: [
      { s: 'Bagian tubuh untuk melihat …', j: 'eye' },
      { s: 'Bagian tubuh untuk mendengar …', j: 'ear' },
      { s: 'Bagian tubuh untuk mencium bau …', j: 'nose' },
      { s: 'Bagian tubuh untuk makan dan berbicara …', j: 'mouth' },
      { s: 'Bagian tubuh untuk menulis dan memegang pensil …', j: 'hand' },
      { s: 'Topi dipakai di …', j: 'head' },
      { s: 'Helm melindungi …', j: 'head' },
      { s: 'Bagian tubuh antara bahu dan tangan …', j: 'arm' },
      { s: 'Bagian tubuh untuk berlari dan menendang bola …', j: 'leg', juga: ['foot'] },
      { s: 'Sepatu dipakai di …', j: 'foot' },
      { s: 'Setelah makan terlalu banyak, bagian ini terasa penuh …', j: 'stomach' },
      { s: 'Temanmu sakit maag. Yang sakit adalah …', j: 'stomach' }
    ]
  },
  {
    id: 'feelings', tahap: 0, judul: 'Feelings', kelompok: 'Perasaan', ilustrasi: 'kisi',
    ikon: { 'happy': '😄', 'sad': '😢', 'angry': '😠', 'tired': '😩', 'hungry': '🤤', 'thirsty': '🥤', 'scared': '😨', 'bored': '🥱', 'excited': '🤩', 'sick': '🤒' },
    kosakata: [
      ['happy', 'senang', 'I am happy to see you.', 'Saya senang bertemu denganmu.'],
      ['sad', 'sedih', 'He is sad because his cat is sick.', 'Dia sedih karena kucingnya sakit.'],
      ['angry', 'marah', 'My father is angry with me.', 'Ayahku marah kepadaku.'],
      ['tired', 'lelah', 'I am tired after school.', 'Saya lelah sepulang sekolah.'],
      ['hungry', 'lapar', 'I am hungry, so I eat rice.', 'Saya lapar, jadi saya makan nasi.'],
      ['thirsty', 'haus', 'I am thirsty after playing football.', 'Saya haus setelah bermain sepak bola.'],
      ['scared', 'takut', 'My little sister is scared of the dark.', 'Adik perempuanku takut gelap.'],
      ['bored', 'bosan', 'I am bored at home.', 'Saya bosan di rumah.'],
      ['excited', 'bersemangat, sangat senang', 'We are excited about the school trip.', 'Kami bersemangat menyambut darmawisata sekolah.'],
      ['sick', 'sakit', 'I am sick, so I stay at home.', 'Saya sakit, jadi saya tinggal di rumah.']
    ],
    contohLain: {
      'happy': [['She is happy with her new bag.', 'Dia senang dengan tas barunya.'], ['We are happy today.', 'Kami senang hari ini.']],
      'sad': [['Do not be sad.', 'Jangan sedih.'], ['I feel sad today.', 'Saya merasa sedih hari ini.']],
      'angry': [['Please do not be angry.', 'Tolong jangan marah.'], ['The teacher looks angry.', 'Guru itu terlihat marah.']],
      'tired': [['You look tired.', 'Kamu terlihat lelah.'], ['The farmer is tired.', 'Petani itu lelah.']],
      'hungry': [['Are you hungry?', 'Apakah kamu lapar?'], ['The baby is hungry.', 'Bayi itu lapar.']],
      'thirsty': [['Drink some water if you are thirsty.', 'Minumlah air jika kamu haus.'], ['The cat is thirsty.', 'Kucing itu haus.']],
      'scared': [['Are you scared of snakes?', 'Apakah kamu takut ular?'], ['Do not be scared.', 'Jangan takut.']],
      'bored': [['The students look bored.', 'Para siswa terlihat bosan.'], ['He is never bored.', 'Dia tidak pernah bosan.']],
      'excited': [['I am excited to meet you.', 'Saya sangat senang akan bertemu denganmu.'], ['The children are excited.', 'Anak-anak itu bersemangat.']],
      'sick': [['My grandmother is sick.', 'Nenekku sakit.'], ['He feels sick today.', 'Dia merasa sakit hari ini.']]
    },
    situasi: [
      { s: 'Kamu mendapat hadiah ulang tahun. Kamu merasa …', j: 'happy', juga: ['excited'] },
      { s: 'Teman baikmu pindah ke kota lain. Kamu merasa …', j: 'sad' },
      { s: 'Adikmu merusak mainanmu dengan sengaja. Kamu merasa …', j: 'angry' },
      { s: 'Kamu baru selesai lari jauh dan ingin istirahat. Kamu merasa …', j: 'tired' },
      { s: 'Kamu belum makan sejak pagi. Kamu merasa …', j: 'hungry' },
      { s: 'Hari sangat panas dan kamu ingin minum. Kamu merasa …', j: 'thirsty' },
      { s: 'Kamu mendengar suara aneh di malam hari. Kamu merasa …', j: 'scared' },
      { s: 'Tidak ada yang bisa dikerjakan di rumah. Kamu merasa …', j: 'bored' },
      { s: 'Besok kamu akan pergi ke Bali untuk pertama kali. Kamu merasa …', j: 'excited', juga: ['happy'] },
      { s: 'Kamu demam dan batuk. Kamu merasa …', j: 'sick' },
      { s: 'Nilai ujianmu seratus. Kamu merasa …', j: 'happy', juga: ['excited'] },
      { s: 'Kamu melihat ular besar di kebun. Kamu merasa …', j: 'scared' }
    ]
  },
  {
    id: 'clothes', tahap: 0, judul: 'Clothes', kelompok: 'Pakaian', ilustrasi: 'kisi',
    ikon: { 'shirt': '👕', 'trousers': '👖', 'skirt': '👗', 'shoes': '👞', 'socks': '🧦', 'hat': '🧢', 'jacket': '🧥', 'uniform': '👔', 'headscarf': '🧕', 'sandals': '🩴' },
    kosakata: [
      ['shirt', 'kemeja, baju', 'My school shirt is white.', 'Kemeja sekolahku putih.'],
      ['trousers', 'celana panjang', 'Boys wear grey trousers to school.', 'Anak laki-laki memakai celana panjang abu-abu ke sekolah.'],
      ['skirt', 'rok', 'She wears a long skirt.', 'Dia memakai rok panjang.'],
      ['shoes', 'sepatu', 'My shoes are black.', 'Sepatuku hitam.'],
      ['socks', 'kaus kaki', 'Wear white socks on Monday.', 'Pakailah kaus kaki putih pada hari Senin.'],
      ['hat', 'topi', 'Wear a hat in the sun.', 'Pakailah topi saat panas.'],
      ['jacket', 'jaket', 'Take your jacket because it is cold.', 'Bawalah jaketmu karena dingin.'],
      ['uniform', 'seragam', 'We wear our uniform every school day.', 'Kami memakai seragam setiap hari sekolah.'],
      ['headscarf', 'kerudung', 'She wears a white headscarf.', 'Dia memakai kerudung putih.'],
      ['sandals', 'sandal', 'I wear sandals at home.', 'Saya memakai sandal di rumah.']
    ],
    contohLain: {
      'shirt': [['He wears a blue shirt.', 'Dia memakai kemeja biru.'], ['Please iron my shirt.', 'Tolong setrika kemejaku.']],
      'trousers': [['My trousers are too long.', 'Celanaku terlalu panjang.'], ['These trousers are new.', 'Celana ini baru.']],
      'skirt': [['Girls wear a grey skirt to school.', 'Anak perempuan memakai rok abu-abu ke sekolah.'], ['This skirt is beautiful.', 'Rok ini cantik.']],
      'shoes': [['Take off your shoes, please.', 'Tolong lepas sepatumu.'], ['I need new shoes.', 'Saya perlu sepatu baru.']],
      'socks': [['My socks are wet.', 'Kaus kakiku basah.'], ['Where are my socks?', 'Di mana kaus kakiku?']],
      'hat': [['I wear a hat for the flag ceremony.', 'Saya memakai topi saat upacara bendera.'], ['His hat is red.', 'Topinya merah.']],
      'jacket': [['My jacket is warm.', 'Jaketku hangat.'], ['She wears a jacket on the motorcycle.', 'Dia memakai jaket saat naik sepeda motor.']],
      'uniform': [['My uniform is clean.', 'Seragamku bersih.'], ['The nurse wears a white uniform.', 'Perawat itu memakai seragam putih.']],
      'headscarf': [['My mother has a blue headscarf.', 'Ibuku punya kerudung biru.'], ['Her headscarf is new.', 'Kerudungnya baru.']],
      'sandals': [['Do not wear sandals to school.', 'Jangan memakai sandal ke sekolah.'], ['My sandals are under the bed.', 'Sandalku di bawah tempat tidur.']]
    },
    situasi: [
      { s: 'Pakaian atas berkancing untuk ke sekolah …', j: 'shirt', juga: ['uniform'] },
      { s: 'Anak laki-laki SMA memakai … abu-abu.', j: 'trousers' },
      { s: 'Anak perempuan SMA memakai … abu-abu.', j: 'skirt' },
      { s: 'Alas kaki tertutup untuk ke sekolah …', j: 'shoes' },
      { s: 'Dipakai di kaki sebelum memakai sepatu …', j: 'socks' },
      { s: 'Dipakai di kepala saat upacara bendera …', j: 'hat' },
      { s: 'Dipakai saat udara dingin atau naik motor …', j: 'jacket' },
      { s: 'Pakaian yang sama yang dipakai semua siswa …', j: 'uniform' },
      { s: 'Penutup kepala yang dipakai banyak siswi muslim …', j: 'headscarf' },
      { s: 'Alas kaki terbuka untuk dipakai di rumah …', j: 'sandals' },
      { s: 'Hujan dan dingin. Sebelum berangkat, kamu memakai …', j: 'jacket' },
      { s: 'Kakimu berkeringat di dalam sepatu. Kamu perlu mengganti …', j: 'socks' }
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
  // Tambahan 10 Okt 2026: ruangan di rumah (denah).
  {
    id: 'rooms', tahap: 0, judul: 'Rooms of the House', kelompok: 'Ruangan di rumah', ilustrasi: 'denah',
    kosakata: [
      ['living room', 'ruang tamu, ruang keluarga', 'We watch TV in the living room.', 'Kami menonton TV di ruang keluarga.'],
      ['bedroom', 'kamar tidur', 'I sleep in my bedroom.', 'Saya tidur di kamar tidurku.'],
      ['kitchen', 'dapur', 'My mother cooks in the kitchen.', 'Ibuku memasak di dapur.'],
      ['bathroom', 'kamar mandi', 'I take a bath in the bathroom.', 'Saya mandi di kamar mandi.'],
      ['dining room', 'ruang makan', 'We have dinner in the dining room.', 'Kami makan malam di ruang makan.'],
      ['garage', 'garasi', 'Dad parks the car in the garage.', 'Ayah memarkir mobil di garasi.'],
      ['garden', 'kebun, taman', 'My grandmother grows flowers in the garden.', 'Nenekku menanam bunga di kebun.'],
      ['terrace', 'teras', 'We drink tea on the terrace.', 'Kami minum teh di teras.'],
      ['study room', 'ruang belajar', 'I do my homework in the study room.', 'Saya mengerjakan PR di ruang belajar.'],
      ['prayer room', 'musala', 'We pray in the prayer room.', 'Kami salat di musala.']
    ],
    contohLain: {
      'living room': [['Guests sit in the living room.', 'Tamu duduk di ruang tamu.'], ['The living room is big.', 'Ruang tamunya besar.']],
      'bedroom': [['My bedroom is small.', 'Kamar tidurku kecil.'], ['I share a bedroom with my brother.', 'Saya sekamar dengan kakakku.']],
      'kitchen': [['The kitchen is clean.', 'Dapurnya bersih.'], ['Put the plates in the kitchen.', 'Taruh piring-piring di dapur.']],
      'bathroom': [['The bathroom is next to the kitchen.', 'Kamar mandi ada di sebelah dapur.'], ['Please clean the bathroom.', 'Tolong bersihkan kamar mandi.']],
      'dining room': [['The dining room has six chairs.', 'Ruang makan punya enam kursi.'], ['Breakfast is ready in the dining room.', 'Sarapan sudah siap di ruang makan.']],
      'garage': [['My bicycle is in the garage.', 'Sepedaku ada di garasi.'], ['The garage door is open.', 'Pintu garasi terbuka.']],
      'garden': [['The children play in the garden.', 'Anak-anak bermain di taman.'], ['There is a mango tree in our garden.', 'Ada pohon mangga di kebun kami.']],
      'terrace': [['Leave your shoes on the terrace.', 'Tinggalkan sepatumu di teras.'], ['The cat sleeps on the terrace.', 'Kucing tidur di teras.']],
      'study room': [['The study room is quiet.', 'Ruang belajarnya tenang.'], ['There are many books in the study room.', 'Ada banyak buku di ruang belajar.']],
      'prayer room': [['The prayer room is clean and quiet.', 'Musalanya bersih dan tenang.'], ['Our house has a small prayer room.', 'Rumah kami punya musala kecil.']]
    },
    situasi: [
      { s: 'Ruangan untuk menerima tamu dan menonton TV …', j: 'living room' },
      { s: 'Ruangan untuk tidur …', j: 'bedroom' },
      { s: 'Ruangan untuk memasak …', j: 'kitchen' },
      { s: 'Ruangan untuk mandi dan menggosok gigi …', j: 'bathroom' },
      { s: 'Ruangan dengan meja makan untuk makan bersama …', j: 'dining room' },
      { s: 'Tempat menyimpan mobil dan sepeda motor …', j: 'garage' },
      { s: 'Tempat menanam bunga dan sayuran di sekitar rumah …', j: 'garden' },
      { s: 'Bagian depan rumah yang terbuka, tempat duduk-duduk pada sore hari …', j: 'terrace' },
      { s: 'Ruangan yang tenang untuk mengerjakan PR …', j: 'study room' },
      { s: 'Ruangan untuk salat di rumah …', j: 'prayer room' },
      { s: 'Kamu ingin mengambil air dingin dari kulkas. Kamu pergi ke …', j: 'kitchen' },
      { s: 'Kamu baru bangun tidur. Kamu berada di …', j: 'bedroom' }
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
  // Tambahan 10 Okt 2026: menyatakan waktu (jam). Gaya past/to; hindari a.m./p.m. (titiknya memecah kalimat).
  // Tambahan 10 Okt 2026: nama hari dan nama bulan (dengan pita pekan dan kalender).
  {
    id: 'days-week', tahap: 0, judul: 'Days of the Week', kelompok: 'Nama hari', ilustrasi: 'pekan',
    kosakata: [
      ['Monday', 'Senin', 'We have a flag ceremony on Monday.', 'Kami upacara bendera pada hari Senin.'],
      ['Tuesday', 'Selasa', 'We play football on Tuesday.', 'Kami bermain sepak bola pada hari Selasa.'],
      ['Wednesday', 'Rabu', 'Wednesday is in the middle of the week.', 'Rabu ada di tengah pekan.'],
      ['Thursday', 'Kamis', 'We wear batik on Thursday.', 'Kami memakai batik pada hari Kamis.'],
      ['Friday', 'Jumat', 'We go home early on Friday.', 'Kami pulang lebih awal pada hari Jumat.'],
      ['Saturday', 'Sabtu', 'I help my mother on Saturday.', 'Saya membantu ibuku pada hari Sabtu.'],
      ['Sunday', 'Minggu', 'My family goes to the park on Sunday.', 'Keluargaku pergi ke taman pada hari Minggu.'],
      ['weekend', 'akhir pekan', 'What do you do on the weekend?', 'Apa yang kamu lakukan pada akhir pekan?'],
      ['weekday', 'hari kerja, hari sekolah', 'Monday is a weekday.', 'Senin adalah hari kerja.'],
      ['every day', 'setiap hari', 'I read a book every day.', 'Saya membaca buku setiap hari.']
    ],
    contohLain: {
      'Monday': [['School starts again on Monday.', 'Sekolah dimulai lagi pada hari Senin.'], ['I have English on Monday.', 'Saya belajar bahasa Inggris pada hari Senin.']],
      'Tuesday': [['Today is Tuesday.', 'Hari ini hari Selasa.'], ['The test is on Tuesday.', 'Ujiannya hari Selasa.']],
      'Wednesday': [['I go to the library on Wednesday.', 'Saya pergi ke perpustakaan pada hari Rabu.'], ['See you on Wednesday.', 'Sampai jumpa hari Rabu.']],
      'Thursday': [['Thursday comes after Wednesday.', 'Kamis datang setelah Rabu.'], ['My aunt visits us on Thursday.', 'Bibiku mengunjungi kami pada hari Kamis.']],
      'Friday': [['Friday is my favorite day.', 'Jumat adalah hari favoritku.'], ['We do sports on Friday morning.', 'Kami berolahraga pada Jumat pagi.']],
      'Saturday': [['There is no school on Saturday.', 'Tidak ada sekolah pada hari Sabtu.'], ['We visit Grandma on Saturday.', 'Kami mengunjungi Nenek pada hari Sabtu.']],
      'Sunday': [['Sunday comes after Saturday.', 'Minggu datang setelah Sabtu.'], ['I wake up late on Sunday.', 'Saya bangun siang pada hari Minggu.']],
      'weekend': [['We go camping on the weekend.', 'Kami berkemah pada akhir pekan.'], ['Saturday and Sunday are the weekend.', 'Sabtu dan Minggu adalah akhir pekan.']],
      'weekday': [['Every weekday I wake up at five.', 'Setiap hari sekolah saya bangun pukul lima.'], ['Friday is the last weekday.', 'Jumat adalah hari kerja terakhir.']],
      'every day': [['We pray every day.', 'Kami berdoa setiap hari.'], ['She drinks milk every day.', 'Dia minum susu setiap hari.']]
    },
    situasi: [
      { s: 'Hari pertama sekolah dalam sepekan, hari upacara bendera …', j: 'Monday' },
      { s: 'Hari setelah Senin …', j: 'Tuesday' },
      { s: 'Hari di tengah pekan, setelah Selasa …', j: 'Wednesday' },
      { s: 'Hari sebelum Jumat …', j: 'Thursday' },
      { s: 'Hari salat Jumat …', j: 'Friday' },
      { s: 'Hari sebelum Minggu …', j: 'Saturday' },
      { s: 'Hari setelah Sabtu …', j: 'Sunday' },
      { s: 'Sabtu dan Minggu disebut …', j: 'weekend' },
      { s: 'Senin sampai Jumat masing-masing disebut …', j: 'weekday' },
      { s: 'Kamu menggosok gigi setiap pagi, yaitu …', j: 'every day' },
      { s: 'Kemarin hari Minggu. Hari ini hari …', j: 'Monday' },
      { s: 'Hari ini Jumat. Besok hari …', j: 'Saturday' },
      { s: 'Besok hari Kamis. Hari ini hari …', j: 'Wednesday' }
    ]
  },
  {
    id: 'months', tahap: 0, judul: 'Months of the Year', kelompok: 'Nama bulan dan tanggal', ilustrasi: 'kalender',
    kosakata: [
      ['January', 'Januari', 'The new year starts in January.', 'Tahun baru dimulai pada bulan Januari.'],
      ['February', 'Februari', 'February is the shortest month.', 'Februari adalah bulan terpendek.'],
      ['March', 'Maret', 'We have a holiday in March.', 'Kami libur di bulan Maret.'],
      ['April', 'April', 'Kartini Day is in April.', 'Hari Kartini jatuh di bulan April.'],
      ['May', 'Mei', 'Labour Day is in May.', 'Hari Buruh jatuh di bulan Mei.'],
      ['June', 'Juni', 'The school holiday starts in June.', 'Libur sekolah dimulai di bulan Juni.'],
      ['July', 'Juli', 'The new school year starts in July.', 'Tahun ajaran baru dimulai di bulan Juli.'],
      ['August', 'Agustus', 'We celebrate Independence Day in August.', 'Kami merayakan Hari Kemerdekaan di bulan Agustus.'],
      ['September', 'September', 'September comes after August.', 'September datang setelah Agustus.'],
      ['October', 'Oktober', 'Youth Pledge Day is in October.', 'Hari Sumpah Pemuda jatuh di bulan Oktober.'],
      ['November', 'November', "Teachers' Day is in November.", 'Hari Guru jatuh di bulan November.'],
      ['December', 'Desember', 'December is the last month of the year.', 'Desember adalah bulan terakhir dalam setahun.']
    ],
    contohLain: {
      'January': [['My birthday is in January.', 'Ulang tahunku di bulan Januari.'], ['It often rains in January.', 'Sering hujan di bulan Januari.']],
      'February': [['February has twenty-eight days.', 'Februari punya dua puluh delapan hari.'], ['We have a test in February.', 'Kami ada ujian di bulan Februari.']],
      'March': [['March comes after February.', 'Maret datang setelah Februari.'], ['My cousin was born in March.', 'Sepupuku lahir di bulan Maret.']],
      'April': [['April has thirty days.', 'April punya tiga puluh hari.'], ['The dry season starts in April.', 'Musim kemarau dimulai di bulan April.']],
      'May': [['May comes after April.', 'Mei datang setelah April.'], ['We plant trees in May.', 'Kami menanam pohon di bulan Mei.']],
      'June': [['June is the sixth month.', 'Juni adalah bulan keenam.'], ['It is dry and sunny in June.', 'Di bulan Juni cuacanya kering dan cerah.']],
      'July': [['My sister was born in July.', 'Adik perempuanku lahir di bulan Juli.'], ['July comes after June.', 'Juli datang setelah Juni.']],
      'August': [['There are many games in August.', 'Ada banyak lomba di bulan Agustus.'], ['August has thirty-one days.', 'Agustus punya tiga puluh satu hari.']],
      'September': [['We go on a school trip in September.', 'Kami darmawisata di bulan September.'], ['My father was born in September.', 'Ayahku lahir di bulan September.']],
      'October': [['The rainy season starts in October.', 'Musim hujan dimulai di bulan Oktober.'], ['We have a big test in October.', 'Kami ada ujian besar di bulan Oktober.']],
      'November': [['It rains a lot in November.', 'Banyak hujan di bulan November.'], ['November has thirty days.', 'November punya tiga puluh hari.']],
      'December': [['We have a long holiday in December.', 'Kami libur panjang di bulan Desember.'], ['The year ends in December.', 'Tahun berakhir di bulan Desember.']]
    },
    situasi: [
      { s: 'Bulan pertama dalam setahun …', j: 'January' },
      { s: 'Bulan sebelum Februari …', j: 'January' },
      { s: 'Bulan yang hanya punya 28 atau 29 hari …', j: 'February' },
      { s: 'Bulan ketiga dalam setahun …', j: 'March' },
      { s: 'Hari Kartini (21 April) jatuh di bulan …', j: 'April' },
      { s: 'Hari Buruh (1 Mei) jatuh di bulan …', j: 'May' },
      { s: 'Hari Lahir Pancasila (1 Juni) jatuh di bulan …', j: 'June' },
      { s: 'Bulan ketujuh dalam setahun …', j: 'July' },
      { s: 'Hari Kemerdekaan Indonesia (17 Agustus) jatuh di bulan …', j: 'August' },
      { s: 'Bulan kesembilan dalam setahun …', j: 'September' },
      { s: 'Hari Sumpah Pemuda (28 Oktober) jatuh di bulan …', j: 'October' },
      { s: 'Hari Guru Nasional (25 November) jatuh di bulan …', j: 'November' },
      { s: 'Bulan terakhir dalam setahun …', j: 'December' }
    ]
  },
  {
    id: 'telling-time', tahap: 0, judul: 'Telling the Time', kelompok: 'Menyatakan jam', ilustrasi: 'jam',
    kosakata: [
      ["o'clock", 'tepat (pukul … tepat)', "It is seven o'clock.", 'Sekarang pukul tujuh tepat.'],
      ['half past', 'lewat tiga puluh menit (setengah …)', 'It is half past six.', 'Sekarang pukul setengah tujuh.'],
      ['quarter past', 'lewat seperempat (lewat lima belas menit)', 'It is a quarter past eight.', 'Sekarang pukul delapan lewat lima belas menit.'],
      ['quarter to', 'kurang seperempat (kurang lima belas menit)', 'It is a quarter to nine.', 'Sekarang pukul sembilan kurang lima belas menit.'],
      ['minutes past', 'menit lewat', 'It is ten minutes past four.', 'Sekarang pukul empat lewat sepuluh menit.'],
      ['minutes to', 'menit sebelum (kurang … menit)', 'It is five minutes to twelve.', 'Sekarang pukul dua belas kurang lima menit.'],
      ['what time is it', 'jam berapa sekarang', 'Excuse me, what time is it?', 'Permisi, jam berapa sekarang?'],
      ['noon', 'tengah hari (pukul dua belas siang)', 'We have lunch at noon.', 'Kami makan siang pada tengah hari.'],
      ['midnight', 'tengah malam', 'The new year starts at midnight.', 'Tahun baru dimulai tengah malam.'],
      ['in the morning', 'pagi hari', 'I go to school at seven in the morning.', 'Saya berangkat sekolah pukul tujuh pagi.']
    ],
    contohLain: {
      "o'clock": [["School starts at seven o'clock.", 'Sekolah dimulai pukul tujuh tepat.'], ["I go to bed at nine o'clock.", 'Saya tidur pukul sembilan tepat.']],
      'half past': [['The film starts at half past seven.', 'Filmnya mulai pukul setengah delapan.'], ['I wake up at half past five.', 'Saya bangun pukul setengah enam.']],
      'quarter past': [['The bus comes at a quarter past six.', 'Bus datang pukul enam lewat seperempat.'], ['We have a break at a quarter past ten.', 'Kami istirahat pukul sepuluh lewat seperempat.']],
      'quarter to': [['The class ends at a quarter to one.', 'Pelajaran selesai pukul satu kurang seperempat.'], ['I leave home at a quarter to seven.', 'Saya berangkat dari rumah pukul tujuh kurang seperempat.']],
      'minutes past': [['The train leaves at twenty minutes past three.', 'Kereta berangkat pukul tiga lewat dua puluh menit.'], ['It is five minutes past eleven.', 'Sekarang pukul sebelas lewat lima menit.']],
      'minutes to': [['It is ten minutes to six.', 'Sekarang pukul enam kurang sepuluh menit.'], ['The shop closes at twenty minutes to nine.', 'Toko tutup pukul sembilan kurang dua puluh menit.']],
      'what time is it': [['What time is it now?', 'Jam berapa sekarang?'], ['Mom, what time is it?', 'Bu, jam berapa sekarang?']],
      'noon': [['The sun is very hot at noon.', 'Matahari sangat panas pada tengah hari.'], ['The shop closes at noon on Friday.', 'Toko itu tutup pada tengah hari setiap Jumat.']],
      'midnight': [['I never stay up until midnight.', 'Saya tidak pernah begadang sampai tengah malam.'], ['The streets are quiet at midnight.', 'Jalanan sepi pada tengah malam.']],
      'in the morning': [['I take a shower at six in the morning.', 'Saya mandi pukul enam pagi.'], ['Birds sing in the morning.', 'Burung-burung berkicau di pagi hari.']]
    },
    situasi: [
      { s: 'Jam menunjukkan pukul 07.00. Dalam bahasa Inggris: It is seven …', j: "o'clock" },
      { s: 'Kamu pulang tepat pukul dua. Ayah bertanya kapan kamu pulang. Kamu menjawab, "At two …"', j: "o'clock" },
      { s: 'Jam menunjukkan pukul 06.30. Dalam bahasa Inggris: It is … six.', j: 'half past' },
      { s: 'Film dimulai pukul 07.30. Dalam bahasa Inggris: at … seven.', j: 'half past' },
      { s: 'Jam menunjukkan pukul 08.15. Dalam bahasa Inggris: It is a … eight.', j: 'quarter past' },
      { s: 'Istirahat pukul 10.15. Dalam bahasa Inggris: at a … ten.', j: 'quarter past' },
      { s: 'Jam menunjukkan pukul 08.45. Dalam bahasa Inggris: It is a … nine.', j: 'quarter to' },
      { s: 'Pelajaran selesai pukul 12.45. Dalam bahasa Inggris: at a … one.', j: 'quarter to' },
      { s: 'Jam menunjukkan pukul 04.10. Dalam bahasa Inggris: It is ten … four.', j: 'minutes past' },
      { s: 'Jam menunjukkan pukul 05.50. Dalam bahasa Inggris: It is ten … six.', j: 'minutes to' },
      { s: 'Kamu tidak membawa jam dan ingin tahu waktu. Kamu bertanya kepada temanmu, "Excuse me, …?"', j: 'what time is it' },
      { s: 'Pukul 12.00 siang disebut …', j: 'noon' },
      { s: 'Pukul 12.00 malam, saat tanggal berganti, disebut …', j: 'midnight' },
      { s: 'Kamu berangkat sekolah pukul 06.30 pagi: "at half past six …"', j: 'in the morning' }
    ]
  },
  // Tambahan 10 Okt 2026: cuaca dan musim.
  {
    id: 'weather', tahap: 0, judul: 'Weather and Seasons', kelompok: 'Cuaca dan musim', ilustrasi: 'kisi',
    catatanIlus: 'Di Indonesia ada dua musim: dry season (musim kemarau, kira-kira April–Oktober) dan rainy season (musim hujan, kira-kira Oktober–Maret).',
    ikon: { 'sunny': '☀️', 'rainy': '🌧️', 'cloudy': '☁️', 'windy': '🌬️', 'cool': '🍃', 'storm': '⛈️', 'rainbow': '🌈', 'umbrella': '☂️', 'dry season': '🏜️', 'rainy season': '☔' },
    kosakata: [
      ['sunny', 'cerah', 'It is sunny today.', 'Hari ini cerah.'],
      ['rainy', 'hujan', 'It is rainy this afternoon.', 'Siang ini hujan.'],
      ['cloudy', 'berawan', 'The sky is cloudy.', 'Langitnya berawan.'],
      ['windy', 'berangin', 'It is windy at the beach.', 'Di pantai berangin.'],
      ['cool', 'sejuk', 'The air is cool in the mountains.', 'Udaranya sejuk di pegunungan.'],
      ['storm', 'badai', 'There is a big storm tonight.', 'Ada badai besar malam ini.'],
      ['rainbow', 'pelangi', 'Look, there is a rainbow in the sky!', 'Lihat, ada pelangi di langit!'],
      ['umbrella', 'payung', 'Bring an umbrella because it is going to rain.', 'Bawalah payung karena akan hujan.'],
      ['dry season', 'musim kemarau', 'There is little rain in the dry season.', 'Hanya sedikit hujan pada musim kemarau.'],
      ['rainy season', 'musim hujan', 'It rains almost every day in the rainy season.', 'Hampir setiap hari hujan pada musim hujan.']
    ],
    contohLain: {
      'sunny': [['We play outside on sunny days.', 'Kami bermain di luar saat hari cerah.'], ['The sky is sunny and blue.', 'Langitnya cerah dan biru.']],
      'rainy': [['I stay at home on rainy days.', 'Saya tinggal di rumah saat hari hujan.'], ['Bandung is often rainy.', 'Bandung sering hujan.']],
      'cloudy': [['It is cloudy, but it is not raining.', 'Cuacanya berawan, tetapi tidak hujan.'], ['A cloudy morning feels cool.', 'Pagi yang berawan terasa sejuk.']],
      'windy': [['We fly kites on windy days.', 'Kami bermain layang-layang saat hari berangin.'], ['It is too windy to play badminton.', 'Terlalu berangin untuk bermain bulu tangkis.']],
      'cool': [['It is cool in the morning.', 'Pagi hari terasa sejuk.'], ['Soreang is cool at night.', 'Soreang sejuk pada malam hari.']],
      'storm': [['Stay inside during the storm.', 'Tetaplah di dalam saat badai.'], ['The storm broke a tree.', 'Badai itu mematahkan sebuah pohon.']],
      'rainbow': [['A rainbow has seven colors.', 'Pelangi punya tujuh warna.'], ['We see a rainbow after the rain.', 'Kami melihat pelangi setelah hujan.']],
      'umbrella': [['My umbrella is blue.', 'Payungku biru.'], ['Can I borrow your umbrella?', 'Bolehkah saya meminjam payungmu?']],
      'dry season': [['Rivers are low in the dry season.', 'Sungai surut pada musim kemarau.'], ['It is hot in the dry season.', 'Cuaca panas pada musim kemarau.']],
      'rainy season': [['Farmers plant rice in the rainy season.', 'Petani menanam padi pada musim hujan.'], ['Some roads flood in the rainy season.', 'Beberapa jalan banjir pada musim hujan.']]
    },
    situasi: [
      { s: 'Matahari bersinar terang dan langit biru. Cuacanya …', j: 'sunny' },
      { s: 'Air turun dari langit sejak pagi. Cuacanya …', j: 'rainy' },
      { s: 'Langit tertutup awan abu-abu, tetapi tidak hujan. Cuacanya …', j: 'cloudy' },
      { s: 'Layang-layang terbang tinggi karena cuacanya …', j: 'windy' },
      { s: 'Udara pagi di Soreang terasa …', j: 'cool' },
      { s: 'Hujan sangat deras, angin kencang, dan ada petir. Itu …', j: 'storm' },
      { s: 'Lengkungan tujuh warna di langit setelah hujan …', j: 'rainbow' },
      { s: 'Benda yang kamu bawa agar tidak basah kehujanan …', j: 'umbrella' },
      { s: 'Di Indonesia, kira-kira April sampai Oktober adalah …', j: 'dry season' },
      { s: 'Di Indonesia, kira-kira Oktober sampai Maret adalah …', j: 'rainy season' },
      { s: 'Petani menanam padi saat …', j: 'rainy season' },
      { s: 'Banyak sumur kering saat …', j: 'dry season' }
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
  // Tambahan 10 Okt 2026: uang dan belanja (toko dengan struk).
  {
    id: 'money-shopping', tahap: 0, judul: 'Money and Shopping', kelompok: 'Uang dan belanja', ilustrasi: 'belanja',
    kosakata: [
      ['how much', 'berapa (harganya)', 'How much is this pen?', 'Berapa harga pulpen ini?'],
      ['price', 'harga', 'The price of rice is going up.', 'Harga beras sedang naik.'],
      ['cheap', 'murah', 'This pencil is very cheap.', 'Pensil ini sangat murah.'],
      ['expensive', 'mahal', 'This phone is too expensive.', 'Ponsel ini terlalu mahal.'],
      ['buy', 'membeli', 'I want to buy some bread.', 'Saya ingin membeli roti.'],
      ['sell', 'menjual', 'My aunt wants to sell her old bicycle.', 'Bibiku ingin menjual sepeda lamanya.'],
      ['pay', 'membayar', 'I pay at the cashier.', 'Saya membayar di kasir.'],
      ['change', 'uang kembalian', 'Here is your change.', 'Ini uang kembalianmu.'],
      ['cashier', 'kasir', 'The cashier is very friendly.', 'Kasirnya sangat ramah.'],
      ['discount', 'diskon, potongan harga', 'There is a discount on shoes today.', 'Ada diskon sepatu hari ini.']
    ],
    contohLain: {
      'how much': [['How much are these apples?', 'Berapa harga apel-apel ini?'], ['Excuse me, how much is the bag?', 'Permisi, berapa harga tas itu?']],
      'price': [['What is the price of this book?', 'Berapa harga buku ini?'], ['The price is on the label.', 'Harganya ada di label.']],
      'cheap': [['Vegetables are cheap at the market.', 'Sayuran murah di pasar.'], ['I want a cheap bag.', 'Saya ingin tas yang murah.']],
      'expensive': [['Shoes in the mall are expensive.', 'Sepatu di mal mahal.'], ['Is it expensive?', 'Apakah itu mahal?']],
      'buy': [['Mom wants to buy vegetables.', 'Ibu ingin membeli sayuran.'], ['Where can I buy a ticket?', 'Di mana saya bisa membeli tiket?']],
      'sell': [['Do you sell notebooks?', 'Apakah Anda menjual buku tulis?'], ['The farmer will sell his rice at the market.', 'Petani itu akan menjual berasnya di pasar.']],
      'pay': [['Can I pay by card?', 'Bisakah saya membayar dengan kartu?'], ['Please pay here.', 'Silakan bayar di sini.']],
      'change': [['Do not forget your change.', 'Jangan lupa uang kembalianmu.'], ['The seller gives me my change.', 'Penjual memberikan uang kembalianku.']],
      'cashier': [['Please go to the cashier.', 'Silakan ke kasir.'], ['My sister works as a cashier.', 'Kakakku bekerja sebagai kasir.']],
      'discount': [['Can I get a discount?', 'Bisakah saya mendapat diskon?'], ['The shop gives a big discount.', 'Toko itu memberi diskon besar.']]
    },
    situasi: [
      { s: 'Kamu ingin tahu harga sebuah buku. Kamu bertanya, "… is this book?"', j: 'how much' },
      { s: 'Kamu bertanya harga beberapa apel: "… are these apples?"', j: 'how much' },
      { s: 'Angka rupiah yang tertulis di label barang adalah …', j: 'price' },
      { s: 'Harga pensil hanya Rp1.000. Pensil itu …', j: 'cheap' },
      { s: 'Harga sepatu itu Rp1.000.000. Sepatu itu …', j: 'expensive' },
      { s: 'Kamu memberikan uang dan mendapat barang. Kamu …', j: 'buy' },
      { s: 'Pedagang memberikan barang dan menerima uang. Pedagang …', j: 'sell' },
      { s: 'Setelah memilih barang, kamu ke kasir untuk …', j: 'pay' },
      { s: 'Harganya Rp8.000 dan kamu memberi Rp10.000. Rp2.000 yang kamu terima adalah …', j: 'change' },
      { s: 'Orang yang menerima pembayaran di toko disebut …', j: 'cashier' },
      { s: 'Harga turun 20% karena ada …', j: 'discount' },
      { s: 'Penjual memberikan uang sisa sambil berkata, "Here is your …"', j: 'change' }
    ]
  },
  {
    id: 'places', tahap: 0, judul: 'Places and Directions', kelompok: 'Tempat dan arah', ilustrasi: 'peta',
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
  // Tambahan 10 Okt 2026: kendaraan.
  {
    id: 'transport', tahap: 0, judul: 'Transportation', kelompok: 'Kendaraan', ilustrasi: 'kisi',
    ikon: { 'bus': '🚌', 'train': '🚆', 'car': '🚗', 'motorcycle': '🏍️', 'bicycle': '🚲', 'taxi': '🚕', 'plane': '✈️', 'ship': '🚢', 'on foot': '🚶', 'bus stop': '🚏' },
    kosakata: [
      ['bus', 'bus', 'I go to school by bus.', 'Saya pergi ke sekolah naik bus.'],
      ['train', 'kereta', 'We go to Jakarta by train.', 'Kami pergi ke Jakarta naik kereta.'],
      ['car', 'mobil', 'My uncle has a red car.', 'Pamanku punya mobil merah.'],
      ['motorcycle', 'sepeda motor', 'My father rides a motorcycle to work.', 'Ayahku naik sepeda motor ke tempat kerja.'],
      ['bicycle', 'sepeda', 'I ride my bicycle to school.', 'Saya naik sepeda ke sekolah.'],
      ['taxi', 'taksi', 'We take a taxi to the airport.', 'Kami naik taksi ke bandara.'],
      ['plane', 'pesawat', 'We fly to Bali by plane.', 'Kami terbang ke Bali naik pesawat.'],
      ['ship', 'kapal', 'The ship sails to Lombok.', 'Kapal itu berlayar ke Lombok.'],
      ['on foot', 'berjalan kaki', 'I go to the mosque on foot.', 'Saya pergi ke masjid berjalan kaki.'],
      ['bus stop', 'halte bus', 'Wait at the bus stop.', 'Tunggu di halte bus.']
    ],
    contohLain: {
      'bus': [['The bus is full of students.', 'Bus itu penuh siswa.'], ['Wait for the bus here.', 'Tunggu bus di sini.']],
      'train': [['The train is very fast.', 'Kereta itu sangat cepat.'], ["The train leaves at eight o'clock.", 'Kereta berangkat pukul delapan tepat.']],
      'car': [['We go to Bandung by car.', 'Kami pergi ke Bandung naik mobil.'], ['The car is in the garage.', 'Mobil itu di garasi.']],
      'motorcycle': [['Wear a helmet on a motorcycle.', 'Pakailah helm saat naik sepeda motor.'], ['His motorcycle is new.', 'Sepeda motornya baru.']],
      'bicycle': [['My bicycle is blue.', 'Sepedaku biru.'], ['She learns to ride a bicycle.', 'Dia belajar naik sepeda.']],
      'taxi': [['The taxi is waiting outside.', 'Taksinya menunggu di luar.'], ['Call a taxi, please.', 'Tolong panggilkan taksi.']],
      'plane': [['The plane is in the sky.', 'Pesawat itu di langit.'], ['I see a plane at the airport.', 'Saya melihat pesawat di bandara.']],
      'ship': [['We go to Sumatra by ship.', 'Kami pergi ke Sumatra naik kapal.'], ['The ship is very big.', 'Kapal itu sangat besar.']],
      'on foot': [['My house is near, so I come on foot.', 'Rumahku dekat, jadi saya datang berjalan kaki.'], ['We go to the market on foot.', 'Kami pergi ke pasar berjalan kaki.']],
      'bus stop': [['The bus stop is near my school.', 'Halte bus dekat sekolahku.'], ['Many people are at the bus stop.', 'Banyak orang di halte bus.']]
    },
    situasi: [
      { s: 'Kendaraan besar yang mengangkut banyak penumpang di jalan raya …', j: 'bus' },
      { s: 'Kendaraan panjang yang berjalan di atas rel …', j: 'train' },
      { s: 'Kendaraan beroda empat milik keluarga …', j: 'car', juga: ['taxi'] },
      { s: 'Kendaraan beroda dua bermesin; pengendaranya wajib memakai helm …', j: 'motorcycle' },
      { s: 'Kendaraan beroda dua tanpa mesin yang dikayuh …', j: 'bicycle' },
      { s: 'Mobil yang bisa disewa dan dibayar sesuai argo …', j: 'taxi' },
      { s: 'Kendaraan yang terbang dari bandara …', j: 'plane' },
      { s: 'Kendaraan besar yang berlayar di laut …', j: 'ship' },
      { s: 'Kamu pergi tanpa kendaraan, hanya dengan kakimu …', j: 'on foot' },
      { s: 'Tempat menunggu bus …', j: 'bus stop' },
      { s: 'Dari Jakarta ke Bali, yang paling cepat naik …', j: 'plane' },
      { s: 'Rumah temanmu hanya seratus meter dari rumahmu. Kamu ke sana …', j: 'on foot', juga: ['bicycle'] }
    ]
  },
  {
    id: 'prepositions', tahap: 0, judul: 'Prepositions', kelompok: 'Preposisi dan posisi', ilustrasi: 'preposisi',
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
  // Tambahan 10 Okt 2026: hobi, hewan, pekerjaan, ungkapan di kelas.
  {
    id: 'hobbies', tahap: 0, judul: 'Hobbies and Sports', kelompok: 'Hobi dan olahraga', ilustrasi: 'kisi',
    ikon: { 'football': '⚽', 'badminton': '🏸', 'volleyball': '🏐', 'basketball': '🏀', 'swimming': '🏊', 'drawing': '🎨', 'singing': '🎤', 'dancing': '💃', 'cooking': '🍳', 'playing the guitar': '🎸' },
    kosakata: [
      ['football', 'sepak bola', 'I play football with my friends.', 'Saya bermain sepak bola dengan teman-temanku.'],
      ['badminton', 'bulu tangkis', 'We play badminton after school.', 'Kami bermain bulu tangkis sepulang sekolah.'],
      ['volleyball', 'bola voli', 'The girls play volleyball on the beach.', 'Anak-anak perempuan bermain bola voli di pantai.'],
      ['basketball', 'bola basket', 'He plays basketball every Friday.', 'Dia bermain bola basket setiap Jumat.'],
      ['swimming', 'berenang', 'I go swimming on Sunday.', 'Saya pergi berenang pada hari Minggu.'],
      ['drawing', 'menggambar', 'My hobby is drawing.', 'Hobiku menggambar.'],
      ['singing', 'bernyanyi', 'She likes singing.', 'Dia suka bernyanyi.'],
      ['dancing', 'menari', 'My sister is good at dancing.', 'Kakakku pandai menari.'],
      ['cooking', 'memasak', 'My brother likes cooking fried rice.', 'Kakakku suka memasak nasi goreng.'],
      ['playing the guitar', 'bermain gitar', 'I like playing the guitar.', 'Saya suka bermain gitar.']
    ],
    contohLain: {
      'football': [['Football is my favorite sport.', 'Sepak bola adalah olahraga favoritku.'], ['We watch football on TV.', 'Kami menonton sepak bola di TV.']],
      'badminton': [['Indonesia is good at badminton.', 'Indonesia jago bulu tangkis.'], ['I need a new badminton racket.', 'Saya perlu raket bulu tangkis baru.']],
      'volleyball': [['Our volleyball team won the game.', 'Tim bola voli kami memenangkan pertandingan.'], ['I like volleyball.', 'Saya suka bola voli.']],
      'basketball': [['The basketball is orange.', 'Bola basketnya oranye.'], ['Tall students are good at basketball.', 'Siswa yang tinggi pandai bermain bola basket.']],
      'swimming': [['Swimming is good for your body.', 'Berenang baik untuk tubuhmu.'], ['She is good at swimming.', 'Dia pandai berenang.']],
      'drawing': [['I like drawing animals.', 'Saya suka menggambar hewan.'], ['He is drawing a cat.', 'Dia sedang menggambar kucing.']],
      'singing': [['We are singing a song.', 'Kami sedang menyanyikan lagu.'], ['Singing makes me happy.', 'Bernyanyi membuatku senang.']],
      'dancing': [['I learn traditional dancing at school.', 'Saya belajar tari tradisional di sekolah.'], ['Dancing is fun.', 'Menari itu menyenangkan.']],
      'cooking': [['Cooking is my hobby.', 'Memasak adalah hobiku.'], ['Mom is cooking in the kitchen.', 'Ibu sedang memasak di dapur.']],
      'playing the guitar': [['He is playing the guitar in his room.', 'Dia sedang bermain gitar di kamarnya.'], ['Playing the guitar is not easy.', 'Bermain gitar tidak mudah.']]
    },
    situasi: [
      { s: 'Olahraga dengan bola yang ditendang, sebelas pemain satu tim …', j: 'football' },
      { s: 'Olahraga dengan raket dan kok …', j: 'badminton' },
      { s: 'Olahraga bola yang dipukul dengan tangan melewati net tinggi …', j: 'volleyball' },
      { s: 'Olahraga bola yang dimasukkan ke dalam ring …', j: 'basketball' },
      { s: 'Olahraga di kolam renang …', j: 'swimming' },
      { s: 'Hobi membuat gambar dengan pensil dan krayon …', j: 'drawing' },
      { s: 'Hobi membawakan lagu dengan suara merdu …', j: 'singing' },
      { s: 'Hobi menggerakkan tubuh mengikuti musik …', j: 'dancing' },
      { s: 'Hobi membuat makanan di dapur …', j: 'cooking' },
      { s: 'Hobi memetik senar alat musik …', j: 'playing the guitar' },
      { s: 'Kamu ikut paduan suara karena suka …', j: 'singing' },
      { s: 'Kamu suka melukis pemandangan dengan cat air. Hobimu …', j: 'drawing' }
    ]
  },
  {
    id: 'animals', tahap: 0, judul: 'Animals', kelompok: 'Hewan', ilustrasi: 'kisi',
    ikon: { 'cat': '🐱', 'dog': '🐶', 'bird': '🐦', 'cow': '🐄', 'goat': '🐐', 'chicken': '🐔', 'fish': '🐟', 'elephant': '🐘', 'monkey': '🐒', 'snake': '🐍' },
    kosakata: [
      ['cat', 'kucing', 'My cat sleeps on the sofa.', 'Kucingku tidur di sofa.'],
      ['dog', 'anjing', 'The dog runs very fast.', 'Anjing itu berlari sangat cepat.'],
      ['bird', 'burung', 'A bird can fly.', 'Burung bisa terbang.'],
      ['cow', 'sapi', 'A cow gives us milk.', 'Sapi memberi kita susu.'],
      ['goat', 'kambing', 'My uncle has a goat.', 'Pamanku punya seekor kambing.'],
      ['chicken', 'ayam', 'The chicken lays an egg every day.', 'Ayam itu bertelur setiap hari.'],
      ['fish', 'ikan', 'A fish lives in water.', 'Ikan hidup di air.'],
      ['elephant', 'gajah', 'An elephant is very big.', 'Gajah sangat besar.'],
      ['monkey', 'monyet', 'The monkey likes bananas.', 'Monyet itu suka pisang.'],
      ['snake', 'ular', 'A snake has no legs.', 'Ular tidak punya kaki.']
    ],
    contohLain: {
      'cat': [['A cat says meow.', 'Kucing berbunyi meong.'], ['The cat drinks milk.', 'Kucing itu minum susu.']],
      'dog': [['A dog says woof.', 'Anjing berbunyi guk-guk.'], ['My neighbor has a big dog.', 'Tetanggaku punya anjing besar.']],
      'bird': [['The bird sings in the morning.', 'Burung itu berkicau di pagi hari.'], ['There is a bird in the tree.', 'Ada burung di pohon.']],
      'cow': [['The cow eats grass.', 'Sapi itu makan rumput.'], ['A cow says moo.', 'Sapi berbunyi moo.']],
      'goat': [['The goat eats leaves.', 'Kambing itu makan daun.'], ['A goat has two horns.', 'Kambing punya dua tanduk.']],
      'chicken': [['The chicken wakes us up in the morning.', 'Ayam membangunkan kami di pagi hari.'], ['A chicken has two legs.', 'Ayam punya dua kaki.']],
      'fish': [['I have a small fish.', 'Saya punya seekor ikan kecil.'], ['The fish swims fast.', 'Ikan itu berenang cepat.']],
      'elephant': [['An elephant has a long nose.', 'Gajah punya hidung yang panjang.'], ['We see an elephant at the zoo.', 'Kami melihat gajah di kebun binatang.']],
      'monkey': [['A monkey can climb trees.', 'Monyet bisa memanjat pohon.'], ['The monkey takes my hat.', 'Monyet itu mengambil topiku.']],
      'snake': [['Be careful, there is a snake!', 'Hati-hati, ada ular!'], ['The snake is long.', 'Ular itu panjang.']]
    },
    situasi: [
      { s: 'Hewan yang berbunyi "meong" …', j: 'cat' },
      { s: 'Hewan yang berbunyi "guk-guk" dan menjaga rumah …', j: 'dog' },
      { s: 'Hewan bersayap yang bisa terbang dan berkicau …', j: 'bird' },
      { s: 'Hewan besar yang memberi kita susu …', j: 'cow' },
      { s: 'Hewan bertanduk yang suka makan daun dan berbunyi "mbek" …', j: 'goat' },
      { s: 'Hewan yang bertelur dan berkokok di pagi hari …', j: 'chicken' },
      { s: 'Hewan yang hidup di air dan bernapas dengan insang …', j: 'fish' },
      { s: 'Hewan darat terbesar dengan belalai panjang …', j: 'elephant' },
      { s: 'Hewan yang suka pisang dan pandai memanjat pohon …', j: 'monkey' },
      { s: 'Hewan panjang yang tidak punya kaki …', j: 'snake' },
      { s: 'Hewan peliharaan yang suka tidur dan mengeong …', j: 'cat' },
      { s: 'Telur yang kita makan biasanya berasal dari …', j: 'chicken' }
    ]
  },
  {
    id: 'jobs', tahap: 0, judul: 'Jobs', kelompok: 'Pekerjaan', ilustrasi: 'kisi',
    ikon: { 'teacher': '🧑‍🏫', 'doctor': '🧑‍⚕️', 'farmer': '🧑‍🌾', 'driver': '🚕', 'police officer': '👮', 'cook': '🧑‍🍳', 'nurse': '💉', 'seller': '🧺', 'mechanic': '🧑‍🔧', 'fisherman': '🎣' },
    kosakata: [
      ['teacher', 'guru', 'My mother is a teacher.', 'Ibuku seorang guru.'],
      ['doctor', 'dokter', 'The doctor checks my heart.', 'Dokter memeriksa jantungku.'],
      ['farmer', 'petani', 'The farmer grows rice.', 'Petani itu menanam padi.'],
      ['driver', 'sopir', 'The bus driver drives carefully.', 'Sopir bus itu menyetir dengan hati-hati.'],
      ['police officer', 'polisi', 'A police officer helps people cross the road.', 'Polisi membantu orang menyeberang jalan.'],
      ['cook', 'juru masak', 'The cook makes delicious fried rice.', 'Juru masak itu membuat nasi goreng yang lezat.'],
      ['nurse', 'perawat', 'The nurse gives me medicine.', 'Perawat memberiku obat.'],
      ['seller', 'pedagang, penjual', 'The seller sells vegetables at the market.', 'Pedagang itu menjual sayuran di pasar.'],
      ['mechanic', 'montir', 'The mechanic fixes my motorcycle.', 'Montir memperbaiki sepeda motorku.'],
      ['fisherman', 'nelayan', 'The fisherman catches fish in the sea.', 'Nelayan menangkap ikan di laut.']
    ],
    contohLain: {
      'teacher': [['The teacher explains the lesson.', 'Guru menjelaskan pelajaran.'], ['I want to be a teacher.', 'Saya ingin menjadi guru.']],
      'doctor': [['A doctor works in a hospital.', 'Dokter bekerja di rumah sakit.'], ['Go to the doctor if you are sick.', 'Pergilah ke dokter jika kamu sakit.']],
      'farmer': [['My grandfather is a farmer.', 'Kakekku seorang petani.'], ['A farmer works in the field.', 'Petani bekerja di sawah.']],
      'driver': [['My uncle is a taxi driver.', 'Pamanku sopir taksi.'], ['The driver stops the car.', 'Sopir menghentikan mobil.']],
      'police officer': [['The police officer stops the motorcycle.', 'Polisi menghentikan sepeda motor itu.'], ['Ask a police officer for help.', 'Mintalah bantuan kepada polisi.']],
      'cook': [['My father is a cook in a hotel.', 'Ayahku juru masak di hotel.'], ['The cook works in the kitchen.', 'Juru masak bekerja di dapur.']],
      'nurse': [['My aunt is a nurse.', 'Bibiku seorang perawat.'], ['A nurse helps the doctor.', 'Perawat membantu dokter.']],
      'seller': [['The seller is very friendly.', 'Penjual itu sangat ramah.'], ['My neighbor is a fruit seller.', 'Tetanggaku penjual buah.']],
      'mechanic': [['My brother wants to be a mechanic.', 'Kakakku ingin menjadi montir.'], ['The mechanic works in a garage.', 'Montir bekerja di bengkel.']],
      'fisherman': [['The fisherman has a small boat.', 'Nelayan itu punya perahu kecil.'], ['My uncle is a fisherman.', 'Pamanku seorang nelayan.']]
    },
    situasi: [
      { s: 'Orang yang mengajar di sekolah …', j: 'teacher' },
      { s: 'Orang yang memeriksa dan mengobati orang sakit …', j: 'doctor' },
      { s: 'Orang yang menanam padi di sawah …', j: 'farmer' },
      { s: 'Orang yang mengemudikan bus atau angkot …', j: 'driver' },
      { s: 'Orang yang mengatur lalu lintas dan menjaga keamanan …', j: 'police officer' },
      { s: 'Orang yang memasak di restoran …', j: 'cook' },
      { s: 'Orang yang merawat pasien dan membantu dokter di rumah sakit …', j: 'nurse' },
      { s: 'Orang yang berjualan di pasar …', j: 'seller' },
      { s: 'Orang yang memperbaiki sepeda motor di bengkel …', j: 'mechanic' },
      { s: 'Orang yang menangkap ikan di laut …', j: 'fisherman' },
      { s: 'Kamu sakit gigi dan pergi ke …', j: 'doctor' },
      { s: 'Di rumah sakit, orang yang memberimu obat dan mengukur suhu badanmu …', j: 'nurse', juga: ['doctor'] }
    ]
  },
  {
    id: 'classroom-expressions', tahap: 0, judul: 'Classroom Expressions', kelompok: 'Ungkapan di kelas', ilustrasi: 'kisi',
    catatanIlus: '🧑‍🏫 = biasa diucapkan guru · 🙋 = biasa diucapkan siswa.',
    ikon: { 'open your book': '🧑‍🏫', 'repeat after me': '🧑‍🏫', 'listen carefully': '🧑‍🏫', 'work in pairs': '🧑‍🏫', 'be quiet': '🧑‍🏫',
      'may I go to the toilet': '🙋', "I don't understand": '🙋', 'can you repeat that': '🙋', 'how do you say': '🙋', 'sorry I am late': '🙋' },
    kosakata: [
      ['open your book', 'buka bukumu', 'Please open your book.', 'Tolong buka bukumu.'],
      ['repeat after me', 'ulangi setelah saya', 'Listen and repeat after me.', 'Dengarkan dan ulangi setelah saya.'],
      ['listen carefully', 'dengarkan baik-baik', 'Listen carefully to the story.', 'Dengarkan ceritanya baik-baik.'],
      ['work in pairs', 'bekerjalah berpasangan', 'Now, work in pairs.', 'Sekarang, bekerjalah berpasangan.'],
      ['be quiet', 'tolong tenang', 'Please be quiet, everyone.', 'Semuanya, tolong tenang.'],
      ['may I go to the toilet', 'bolehkah saya ke toilet', 'Excuse me, may I go to the toilet?', 'Permisi, bolehkah saya ke toilet?'],
      ["I don't understand", 'saya tidak mengerti', "Sorry, I don't understand.", 'Maaf, saya tidak mengerti.'],
      ['can you repeat that', 'bisakah Anda mengulanginya', 'Can you repeat that, please?', 'Bisakah Anda mengulanginya?'],
      ['how do you say', 'bagaimana mengatakan', 'How do you say this word in English?', 'Apa bahasa Inggrisnya kata ini?'],
      ['sorry I am late', 'maaf saya terlambat', 'Sorry I am late, sir.', 'Maaf saya terlambat, Pak.']
    ],
    contohLain: {
      'open your book': [['Open your book and read the story.', 'Buka bukumu dan bacalah ceritanya.'], ['Everyone, open your book now.', 'Semuanya, buka buku kalian sekarang.']],
      'repeat after me': [['Class, repeat after me.', 'Anak-anak, ulangi setelah saya.'], ['Please repeat after me slowly.', 'Tolong ulangi setelah saya pelan-pelan.']],
      'listen carefully': [['Please listen carefully.', 'Tolong dengarkan baik-baik.'], ['Listen carefully and answer the question.', 'Dengarkan baik-baik dan jawab pertanyaannya.']],
      'work in pairs': [['Please work in pairs with your friend.', 'Silakan bekerja berpasangan dengan temanmu.'], ['We work in pairs today.', 'Kami bekerja berpasangan hari ini.']],
      'be quiet': [['Be quiet in the library.', 'Tenanglah di perpustakaan.'], ['Can you be quiet, please?', 'Bisakah kamu tenang?']],
      'may I go to the toilet': [['Sir, may I go to the toilet?', 'Pak, bolehkah saya ke toilet?'], ["Ma'am, may I go to the toilet, please?", 'Bu, bolehkah saya ke toilet?']],
      "I don't understand": [["I don't understand this question.", 'Saya tidak mengerti soal ini.'], ["I don't understand the word.", 'Saya tidak mengerti kata itu.']],
      'can you repeat that': [['Sorry, can you repeat that?', 'Maaf, bisakah Anda mengulanginya?'], ['Teacher, can you repeat that slowly?', 'Bu Guru, bisakah Anda mengulanginya pelan-pelan?']],
      'how do you say': [['How do you say it in English?', 'Apa bahasa Inggrisnya?'], ['Teacher, how do you say this?', 'Bu Guru, bagaimana mengucapkan ini?']],
      'sorry I am late': [['Good morning, sorry I am late.', 'Selamat pagi, maaf saya terlambat.'], ['Sorry I am late, the bus was slow.', 'Maaf saya terlambat, busnya lambat.']]
    },
    situasi: [
      { s: 'Guru ingin semua siswa membuka buku. Guru berkata …', j: 'open your book' },
      { s: 'Guru ingin siswa menirukan ucapannya. Guru berkata …', j: 'repeat after me' },
      { s: 'Guru akan memutar rekaman dan ingin siswa memperhatikan. Guru berkata …', j: 'listen carefully' },
      { s: 'Guru ingin siswa bekerja berdua dengan teman sebangku. Guru berkata …', j: 'work in pairs' },
      { s: 'Kelas sangat ribut. Guru berkata …', j: 'be quiet' },
      { s: 'Kamu ingin ke kamar kecil saat pelajaran. Kamu berkata …', j: 'may I go to the toilet' },
      { s: 'Kamu belum paham penjelasan guru. Kamu berkata …', j: "I don't understand", juga: ['can you repeat that'] },
      { s: 'Guru berbicara terlalu cepat dan kamu ingin mendengar sekali lagi. Kamu berkata …', j: 'can you repeat that', juga: ["I don't understand"] },
      { s: 'Kamu ingin tahu bahasa Inggris sebuah kata. Kamu bertanya …', j: 'how do you say' },
      { s: 'Kamu datang setelah pelajaran dimulai. Kamu berkata …', j: 'sorry I am late' },
      { s: 'Sebelum membaca cerita, guru meminta siswa …', j: 'open your book' },
      { s: 'Di perpustakaan, petugas meminta semua orang …', j: 'be quiet' }
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
    id: 'holiday-pangandaran', tahap: 2, judul: 'My Holiday in Pangandaran',
    teks: 'Last school holiday, my family and I went to Pangandaran Beach in West Java. We left home early in the morning by car. The trip took about five hours. In the afternoon, we played in the sand and swam in the sea. My little brother built a big sandcastle. In the evening, we watched the beautiful sunset together. The next day, we took a small boat to see the fish and the coral. We also ate grilled fish at a restaurant near the beach. On the last day, we bought some souvenirs for our friends. I was tired but very happy. I hope to visit Pangandaran again next year.',
    arti: 'Pada libur sekolah yang lalu, saya dan keluarga pergi ke Pantai Pangandaran di Jawa Barat. Kami berangkat dari rumah pagi-pagi sekali naik mobil. Perjalanannya memakan waktu sekitar lima jam. Pada sore hari, kami bermain pasir dan berenang di laut. Adik laki-laki saya membuat istana pasir yang besar. Pada malam hari, kami menyaksikan matahari terbenam yang indah bersama-sama. Keesokan harinya, kami naik perahu kecil untuk melihat ikan dan terumbu karang. Kami juga makan ikan bakar di sebuah rumah makan dekat pantai. Pada hari terakhir, kami membeli beberapa oleh-oleh untuk teman-teman kami. Saya lelah, tetapi sangat senang. Saya berharap dapat mengunjungi Pangandaran lagi tahun depan.'
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
    id: 'birthday-invitation', tahap: 2, judul: 'A Birthday Party Invitation',
    teks: "Dear friends, I would like to invite you to my birthday party. I am turning sixteen this month. The party will be on Saturday, the twenty-fourth of October. It will start at four o'clock in the afternoon. It will be at my house on Jalan Melati. We will eat cake, play games, and sing karaoke together. Please wear a white shirt because the party has a white theme. You do not need to bring a present. Just bring your smile and a good appetite! Please send me a message by Thursday if you can come. I hope to see you there. Your friend, Nadia.",
    arti: 'Teman-teman yang baik, saya ingin mengundang kalian ke pesta ulang tahun saya. Saya akan berusia enam belas tahun bulan ini. Pestanya akan diadakan pada hari Sabtu, tanggal dua puluh empat Oktober. Pesta akan dimulai pukul empat sore. Pesta akan diadakan di rumah saya di Jalan Melati. Kita akan makan kue, bermain gim, dan bernyanyi karaoke bersama. Harap memakai kemeja putih karena pestanya bertema putih. Kalian tidak perlu membawa kado. Cukup bawa senyuman dan selera makan yang baik! Harap kirimi saya pesan paling lambat hari Kamis jika kalian bisa datang. Saya berharap bertemu kalian di sana. Temanmu, Nadia.'
  },
  {
    id: 'message-from-mom', tahap: 2, judul: 'A Message from Mom',
    teks: "Dear Rafi, I have to go to the hospital this afternoon because Grandma is sick. Do not worry, she is getting better. I will come home at about eight o'clock tonight. There is some fried rice on the table for your lunch. Please warm it up before you eat it. Please feed the cat and water the plants in the front yard. Do not forget to lock the door if you go out. Your sister will come home from school at three o'clock. Please help her with her math homework. If you need anything, call me or Aunt Lina next door. Thank you, dear. With love, Mom.",
    arti: 'Rafi sayang, Ibu harus pergi ke rumah sakit sore ini karena Nenek sakit. Jangan khawatir, keadaan Nenek mulai membaik. Ibu akan pulang sekitar pukul delapan malam ini. Ada nasi goreng di atas meja untuk makan siangmu. Tolong hangatkan dulu sebelum kamu memakannya. Tolong beri makan kucing dan siram tanaman di halaman depan. Jangan lupa mengunci pintu jika kamu pergi keluar. Adikmu akan pulang dari sekolah pukul tiga. Tolong bantu dia mengerjakan PR matematikanya. Jika kamu memerlukan sesuatu, telepon Ibu atau Tante Lina di sebelah rumah. Terima kasih, Sayang. Dengan cinta, Ibu.'
  },
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
    id: 'borobudur', tahap: 3, judul: 'Borobudur Temple',
    teks: 'Borobudur Temple is the largest Buddhist temple in the world. It stands in Magelang, Central Java, not far from Yogyakarta. The temple was built in the eighth and ninth centuries under the Sailendra dynasty. It is made of large blocks of grey volcanic stone and has no rooms inside. The building has nine stacked platforms, with six square ones at the bottom and three round ones at the top. Its walls are decorated with more than two thousand relief panels that tell stories and teach Buddhist lessons. On the round terraces, there are seventy-two bell-shaped stupas, and each of them contains a statue of Buddha. Today, Borobudur is a UNESCO World Heritage Site, and many visitors climb it at dawn to watch the sunrise.',
    arti: 'Candi Borobudur adalah candi Buddha terbesar di dunia. Candi ini berdiri di Magelang, Jawa Tengah, tidak jauh dari Yogyakarta. Candi ini dibangun pada abad kedelapan dan kesembilan pada masa Dinasti Syailendra. Candi ini terbuat dari balok-balok besar batu vulkanik berwarna abu-abu dan tidak memiliki ruangan di dalamnya. Bangunannya memiliki sembilan teras bertingkat, dengan enam teras persegi di bagian bawah dan tiga teras melingkar di bagian atas. Dindingnya dihiasi lebih dari dua ribu panel relief yang menceritakan kisah-kisah dan mengajarkan ajaran Buddha. Di teras-teras melingkar, terdapat tujuh puluh dua stupa berbentuk lonceng, dan masing-masing berisi sebuah arca Buddha. Kini, Borobudur menjadi Situs Warisan Dunia UNESCO, dan banyak pengunjung mendakinya saat fajar untuk menyaksikan matahari terbit.'
  },
  {
    id: 'malin-kundang', tahap: 3, judul: 'Malin Kundang',
    teks: 'Once upon a time, there lived a poor widow and her son, Malin Kundang. When he grew up, Malin decided to sail to another land to find a better life. Years later, he became a rich merchant and married a beautiful woman. One day, his ship landed in his old village. His mother ran to meet him, but Malin was ashamed of her and said that she was not his mother. Heartbroken, the old woman prayed, and a terrible storm came. Malin Kundang was turned into stone.',
    arti: 'Pada zaman dahulu, hiduplah seorang janda miskin bersama anaknya, Malin Kundang. Ketika dewasa, Malin memutuskan berlayar ke negeri lain untuk mencari kehidupan yang lebih baik. Bertahun-tahun kemudian, ia menjadi saudagar kaya dan menikahi seorang perempuan cantik. Suatu hari, kapalnya berlabuh di kampung halamannya. Ibunya berlari menemuinya, tetapi Malin malu dan berkata bahwa perempuan itu bukan ibunya. Dengan hati hancur, perempuan tua itu berdoa, dan datanglah badai yang dahsyat. Malin Kundang berubah menjadi batu.'
  },
  {
    id: 'mouse-deer', tahap: 3, judul: 'The Mouse Deer and the Crocodiles',
    teks: 'Once upon a time, a clever mouse deer named Kancil lived in a forest. One day, he wanted to cross a river because he saw sweet fruit on the other side. However, the river was full of hungry crocodiles. Kancil had an idea and called the crocodiles. "The king wants to give meat to every crocodile, so he has asked me to count you," he said. The crocodiles believed him and lined up across the river. Kancil jumped from back to back and counted them loudly. When he reached the other side, he laughed and said there was no meat at all. The crocodiles were very angry, but Kancil had already run off to enjoy the fruit. This story shows that a clever mind can save us from danger.',
    arti: 'Pada zaman dahulu, hiduplah seekor kancil cerdik bernama Kancil di sebuah hutan. Suatu hari, ia ingin menyeberangi sungai karena melihat buah yang manis di seberang. Akan tetapi, sungai itu penuh dengan buaya yang lapar. Kancil mendapat akal dan memanggil para buaya. "Raja ingin memberi daging kepada setiap buaya, jadi beliau menyuruhku menghitung kalian," katanya. Para buaya memercayainya dan berbaris melintang di sungai. Kancil melompat dari punggung ke punggung sambil menghitung mereka dengan suara keras. Ketika sampai di seberang, ia tertawa dan berkata bahwa sama sekali tidak ada daging. Para buaya sangat marah, tetapi Kancil sudah lari untuk menikmati buah itu. Cerita ini menunjukkan bahwa akal yang cerdik dapat menyelamatkan kita dari bahaya.'
  },
  {
    id: 'mobile-phones', tahap: 3, judul: 'Using Mobile Phones Wisely',
    teks: 'Today, almost every student has a mobile phone. Phones can help us find information, contact our families, and learn new skills. On the other hand, they can also take too much of our time. Some students play games until late at night and feel tired in class. Therefore, we should use our phones wisely. We can set a time limit and put the phone away when we study.',
    arti: 'Saat ini, hampir setiap siswa memiliki telepon genggam. Telepon dapat membantu kita mencari informasi, menghubungi keluarga, dan mempelajari keterampilan baru. Di sisi lain, telepon juga bisa menyita terlalu banyak waktu kita. Sebagian siswa bermain gim sampai larut malam dan merasa lelah di kelas. Karena itu, kita harus menggunakan telepon dengan bijak. Kita bisa menetapkan batas waktu dan menyimpan telepon saat belajar.'
  },
  {
    id: 'eat-breakfast', tahap: 3, judul: 'Why We Should Eat Breakfast',
    teks: 'Breakfast is often called the most important meal of the day, and every student should eat it before going to school. First, breakfast gives our body energy after we have not eaten for many hours during the night. Without it, we may feel weak, sleepy, or dizzy in the morning. Second, a good breakfast helps us concentrate in class, so we can understand our lessons more easily. Third, it stops us from feeling too hungry and buying unhealthy snacks before lunch. Therefore, we should not skip breakfast, even when we are in a hurry. Even a simple meal such as rice with eggs, bread, or fruit is much better than nothing.',
    arti: 'Sarapan sering disebut sebagai makanan terpenting dalam sehari, dan setiap siswa sebaiknya menyantapnya sebelum berangkat sekolah. Pertama, sarapan memberi tubuh kita energi setelah kita tidak makan selama berjam-jam pada malam hari. Tanpa sarapan, kita mungkin merasa lemas, mengantuk, atau pusing pada pagi hari. Kedua, sarapan yang baik membantu kita berkonsentrasi di kelas, sehingga kita dapat memahami pelajaran dengan lebih mudah. Ketiga, sarapan mencegah kita merasa terlalu lapar dan membeli jajanan tidak sehat sebelum makan siang. Karena itu, kita tidak boleh melewatkan sarapan, bahkan ketika sedang terburu-buru. Makanan sederhana seperti nasi dengan telur, roti, atau buah pun jauh lebih baik daripada tidak makan sama sekali.'
  },
  {
    id: 'plastic-waste', tahap: 3, judul: 'Plastic Waste',
    teks: 'Plastic waste has become one of the most serious environmental problems in the world. Every year, millions of tons of plastic end up in rivers and oceans. Because plastic takes hundreds of years to break down, it harms fish, birds, and other animals. In addition, tiny pieces of plastic can enter our food and water. To reduce this problem, we should bring our own bags, avoid single-use bottles, and separate our rubbish. Small actions, when done by many people, can make a big difference.',
    arti: 'Sampah plastik telah menjadi salah satu masalah lingkungan paling serius di dunia. Setiap tahun, jutaan ton plastik berakhir di sungai dan lautan. Karena plastik membutuhkan ratusan tahun untuk terurai, plastik membahayakan ikan, burung, dan hewan lainnya. Selain itu, potongan kecil plastik dapat masuk ke makanan dan air kita. Untuk mengurangi masalah ini, kita sebaiknya membawa tas sendiri, menghindari botol sekali pakai, dan memilah sampah. Tindakan kecil, bila dilakukan banyak orang, dapat membuat perbedaan besar.'
  },

  // ---------- Tahap 4: Level TKA ----------
  {
    id: 'honey-bees', tahap: 3, judul: 'Honey Bees',
    teks: 'Honey bees are flying insects that live together in large groups called colonies. A healthy colony can have tens of thousands of bees but only one queen. The queen is the largest bee, and her main job is to lay eggs. She can lay up to two thousand eggs in a single day. Most bees in a colony are female workers. They collect nectar and pollen from flowers, build the wax comb, clean the hive, and protect it from enemies. The male bees, called drones, have no stings and exist mainly to mate with a queen. Honey bees turn nectar into honey and store it in the comb as food. As they move from flower to flower, they also carry pollen, which helps plants produce fruit and seeds.',
    arti: 'Lebah madu adalah serangga terbang yang hidup bersama dalam kelompok besar yang disebut koloni. Sebuah koloni yang sehat dapat beranggotakan puluhan ribu lebah, tetapi hanya memiliki satu ratu. Ratu adalah lebah terbesar, dan tugas utamanya adalah bertelur. Ia dapat bertelur hingga dua ribu butir dalam satu hari. Sebagian besar lebah dalam koloni adalah lebah pekerja betina. Mereka mengumpulkan nektar dan serbuk sari dari bunga, membangun sarang lilin, membersihkan sarang, dan melindunginya dari musuh. Lebah jantan, yang disebut lebah pejantan (drone), tidak memiliki sengat dan terutama hidup untuk kawin dengan ratu. Lebah madu mengubah nektar menjadi madu dan menyimpannya di sarang sebagai makanan. Ketika berpindah dari bunga ke bunga, mereka juga membawa serbuk sari, yang membantu tumbuhan menghasilkan buah dan biji.'
  },
  {
    id: 'how-rain-forms', tahap: 3, judul: 'How Rain Is Formed',
    teks: 'Rain is water that falls from clouds to the ground, and it is an important part of the water cycle. The process begins when the sun heats the water in oceans, lakes, and rivers. The heat turns some of the water into an invisible gas called water vapor. This warm vapor rises high into the sky, where the air is much colder. There, the vapor cools down and changes back into tiny water droplets, and millions of these droplets form clouds. Inside a cloud, the droplets bump into one another and join together to make bigger drops. When the drops become too heavy to float in the air, they fall to the earth as rain. The rainwater then flows into rivers and seas, and the cycle starts again.',
    arti: 'Hujan adalah air yang jatuh dari awan ke tanah, dan hujan merupakan bagian penting dari siklus air. Prosesnya dimulai ketika matahari memanaskan air di lautan, danau, dan sungai. Panas itu mengubah sebagian air menjadi gas tak kasatmata yang disebut uap air. Uap yang hangat ini naik tinggi ke langit, tempat udara jauh lebih dingin. Di sana, uap mendingin dan berubah kembali menjadi titik-titik air yang sangat kecil, dan jutaan titik air ini membentuk awan. Di dalam awan, titik-titik air saling bertabrakan dan bergabung menjadi tetesan yang lebih besar. Ketika tetesan itu menjadi terlalu berat untuk melayang di udara, tetesan itu jatuh ke bumi sebagai hujan. Air hujan kemudian mengalir ke sungai dan laut, dan siklus itu dimulai lagi.'
  },
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
    id: 'public-transport', tahap: 4, judul: 'Let Us Use Public Transport',
    teks: `Every morning, millions of people in Indonesian cities such as Jakarta, Surabaya, and Medan spend hours stuck in traffic jams. Most of them travel alone in private cars or ride their own motorcycles. As a result, our roads are crowded, and the air we breathe is becoming more polluted every year. I strongly believe that it is time for all of us to leave our private vehicles at home and use public transport instead.

First, public transport can reduce traffic congestion. One bus can carry up to fifty passengers, while a car usually carries only one or two people. If more people choose buses, trains, or the MRT, there will be fewer vehicles on the roads. This means that everyone, including ambulance drivers and delivery workers, can reach their destinations faster.

Second, using public transport helps to protect the environment. Cars and motorcycles produce a large amount of smoke that pollutes the air and causes breathing problems, especially for children and old people. When fewer vehicles are on the road, less smoke is released. Cleaner air will make our cities healthier places to live.

Third, public transport is cheaper than driving. Car owners must pay for fuel, parking, and repairs, and these costs keep rising. In contrast, a ticket for the Transjakarta bus costs only a few thousand rupiah. Passengers can also read, rest, or study during the trip instead of concentrating on the road.

Of course, public transport in Indonesia is not perfect yet. Some buses are crowded, and some areas still have no good service. However, the government is building more routes and improving stations every year. Therefore, let us start today by taking a bus or a train at least once a week. If we work together, our cities will have less traffic, cleaner air, and a brighter future.`,
    arti: 'Setiap pagi, jutaan orang di kota-kota Indonesia seperti Jakarta, Surabaya, dan Medan menghabiskan berjam-jam terjebak kemacetan. Sebagian besar dari mereka bepergian sendirian dengan mobil pribadi atau mengendarai sepeda motor sendiri. Akibatnya, jalan-jalan kita padat, dan udara yang kita hirup semakin tercemar setiap tahun. Saya sangat yakin bahwa sudah saatnya kita semua meninggalkan kendaraan pribadi di rumah dan beralih menggunakan transportasi umum. Pertama, transportasi umum dapat mengurangi kemacetan lalu lintas. Satu bus dapat mengangkut hingga lima puluh penumpang, sedangkan sebuah mobil biasanya hanya membawa satu atau dua orang. Jika lebih banyak orang memilih bus, kereta, atau MRT, kendaraan di jalan akan berkurang. Ini berarti setiap orang, termasuk sopir ambulans dan kurir pengantar barang, dapat tiba di tujuan lebih cepat. Kedua, menggunakan transportasi umum membantu melindungi lingkungan. Mobil dan sepeda motor menghasilkan banyak asap yang mencemari udara dan menyebabkan gangguan pernapasan, terutama bagi anak-anak dan orang lanjut usia. Ketika kendaraan di jalan lebih sedikit, asap yang dilepaskan juga lebih sedikit. Udara yang lebih bersih akan menjadikan kota kita tempat tinggal yang lebih sehat. Ketiga, transportasi umum lebih murah daripada mengemudi sendiri. Pemilik mobil harus membayar bahan bakar, parkir, dan perbaikan, dan biaya-biaya ini terus naik. Sebaliknya, tiket bus Transjakarta hanya beberapa ribu rupiah. Penumpang juga dapat membaca, beristirahat, atau belajar selama perjalanan alih-alih berkonsentrasi pada jalan. Tentu saja, transportasi umum di Indonesia belum sempurna. Sebagian bus penuh sesak, dan beberapa daerah masih belum memiliki layanan yang baik. Namun, pemerintah membangun lebih banyak rute dan memperbaiki stasiun setiap tahun. Oleh karena itu, mari kita mulai hari ini dengan naik bus atau kereta setidaknya sekali seminggu. Jika kita bekerja sama, kota kita akan memiliki lalu lintas yang lebih lancar, udara yang lebih bersih, dan masa depan yang lebih cerah.'
  },
  {
    id: 'robotics-news', tahap: 4, judul: 'Bandung Students Win a Robotics Competition',
    teks: `Four students from Harapan Bangsa Senior High School in Bandung have won first place in the National Student Robotics Competition, which was held in Jakarta last Saturday. Their robot, named Si Kancil, beat robots from thirty-five other schools across Indonesia.

The competition challenged students to build a robot that could help farmers. Each robot had to move along a model rice field, find the plants that needed water, and water them without damaging the young rice. The judges scored the robots on speed, accuracy, and creativity. Si Kancil completed the task in less than four minutes and watered every plant correctly.

The team spent almost six months preparing for the competition. They used cheap materials, such as old plastic bottles and parts from broken toys, to keep their costs low. "We failed many times," said Nadia Putri, the team leader. "Once, our robot fell over just two weeks before the competition, so we had to rebuild most of it."

Their teacher, Pak Hendra Gunawan, said he was proud of the students' hard work. He explained that the school did not have a special laboratory, so the team often worked in the library after classes. "Their success shows that creativity is more important than expensive equipment," he added.

As the winners, the team received a trophy and a scholarship of fifty million rupiah. They will also represent Indonesia at an international robotics competition in Japan next year. The students now plan to improve Si Kancil so that it can be used by real farmers in West Java.`,
    arti: 'Empat siswa dari SMA Harapan Bangsa di Bandung meraih juara pertama dalam Kompetisi Robotik Pelajar Nasional, yang diadakan di Jakarta Sabtu lalu. Robot mereka, yang diberi nama Si Kancil, mengalahkan robot dari tiga puluh lima sekolah lain di seluruh Indonesia. Kompetisi itu menantang siswa untuk membuat robot yang dapat membantu petani. Setiap robot harus bergerak di sepanjang model sawah, menemukan tanaman yang membutuhkan air, dan menyiraminya tanpa merusak padi yang masih muda. Para juri menilai robot berdasarkan kecepatan, ketepatan, dan kreativitas. Si Kancil menyelesaikan tugas dalam waktu kurang dari empat menit dan menyiram setiap tanaman dengan benar. Tim itu menghabiskan hampir enam bulan untuk mempersiapkan diri menghadapi kompetisi. Mereka menggunakan bahan-bahan murah, seperti botol plastik bekas dan bagian dari mainan rusak, agar biayanya tetap rendah. "Kami gagal berkali-kali," kata Nadia Putri, ketua tim. "Suatu kali, robot kami terjatuh hanya dua minggu sebelum kompetisi, sehingga kami harus membangun ulang sebagian besar bagiannya." Guru mereka, Pak Hendra Gunawan, mengatakan bahwa ia bangga atas kerja keras para siswa. Ia menjelaskan bahwa sekolah tidak memiliki laboratorium khusus, sehingga tim sering bekerja di perpustakaan sepulang sekolah. "Keberhasilan mereka menunjukkan bahwa kreativitas lebih penting daripada peralatan yang mahal," tambahnya. Sebagai pemenang, tim itu menerima piala dan beasiswa sebesar lima puluh juta rupiah. Mereka juga akan mewakili Indonesia dalam kompetisi robotik internasional di Jepang tahun depan. Para siswa kini berencana menyempurnakan Si Kancil agar dapat digunakan oleh petani sungguhan di Jawa Barat.'
  },
  {
    id: 'laskar-pelangi-review', tahap: 4, judul: 'A Review of Laskar Pelangi',
    teks: `Laskar Pelangi, or The Rainbow Troops, is the first novel by Andrea Hirata. It was published in two thousand five and quickly became one of the best-selling novels in Indonesian history. The story is based on the writer's own childhood on Belitung, a small island near Sumatra.

The novel tells the story of a poor Muhammadiyah primary school that is about to be closed. The government will only allow the school to stay open if it has at least ten new students. On the first day, only nine children arrive, and everyone feels hopeless. Just before the headmaster gives up, a tenth boy named Harun appears, and the school is saved. The ten students, who call themselves Laskar Pelangi, are taught by a young and devoted teacher, Bu Muslimah, and the kind headmaster, Pak Harfan.

What makes this novel special is its unforgettable characters. Lintang, the son of a poor fisherman, cycles a long way to school every day and sometimes meets crocodiles on the road, yet he is the most brilliant student in the class. Mahar is a creative boy who helps the school win an art carnival. Through their stories, Hirata shows that intelligence and talent can be found anywhere, even in a school with a leaking roof.

However, the novel is not without weaknesses. Some chapters contain long descriptions and scientific terms that may slow down young readers. The plot also jumps from one event to another, so readers sometimes need to concentrate to follow the story. In addition, the ending is quite sad, which may disappoint readers who expect a happy conclusion.

Overall, Laskar Pelangi is an inspiring and moving novel. It reminds us that education is a right for every child, not only for the rich. I highly recommend it to students, teachers, and anyone who needs motivation to keep learning in difficult situations.`,
    arti: 'Laskar Pelangi, atau The Rainbow Troops, adalah novel pertama karya Andrea Hirata. Novel ini diterbitkan pada tahun dua ribu lima dan dengan cepat menjadi salah satu novel terlaris dalam sejarah Indonesia. Ceritanya didasarkan pada masa kecil penulis sendiri di Belitung, sebuah pulau kecil di dekat Sumatra. Novel ini menceritakan sebuah sekolah dasar Muhammadiyah yang miskin dan hampir ditutup. Pemerintah hanya mengizinkan sekolah itu tetap buka jika memiliki sedikitnya sepuluh murid baru. Pada hari pertama, hanya sembilan anak yang datang, dan semua orang merasa putus asa. Tepat sebelum kepala sekolah menyerah, seorang anak laki-laki kesepuluh bernama Harun muncul, dan sekolah itu pun selamat. Kesepuluh murid itu, yang menyebut diri mereka Laskar Pelangi, diajar oleh seorang guru muda yang penuh pengabdian, Bu Muslimah, dan kepala sekolah yang baik hati, Pak Harfan. Yang membuat novel ini istimewa adalah tokoh-tokohnya yang tak terlupakan. Lintang, anak seorang nelayan miskin, bersepeda jauh ke sekolah setiap hari dan kadang bertemu buaya di jalan, tetapi ia adalah murid paling cerdas di kelas. Mahar adalah anak kreatif yang membantu sekolah memenangkan karnaval seni. Melalui kisah mereka, Hirata menunjukkan bahwa kecerdasan dan bakat dapat ditemukan di mana saja, bahkan di sekolah yang atapnya bocor. Namun, novel ini bukan tanpa kelemahan. Beberapa bab berisi deskripsi panjang dan istilah ilmiah yang dapat memperlambat pembaca muda. Alurnya juga melompat dari satu peristiwa ke peristiwa lain, sehingga pembaca kadang perlu berkonsentrasi untuk mengikuti cerita. Selain itu, akhir ceritanya cukup sedih, yang mungkin mengecewakan pembaca yang mengharapkan akhir bahagia. Secara keseluruhan, Laskar Pelangi adalah novel yang menginspirasi dan menyentuh hati. Novel ini mengingatkan kita bahwa pendidikan adalah hak setiap anak, bukan hanya milik orang kaya. Saya sangat merekomendasikannya kepada siswa, guru, dan siapa saja yang membutuhkan motivasi untuk terus belajar dalam situasi sulit.'
  },
  {
    id: 'how-tsunamis-happen', tahap: 4, judul: 'How Tsunamis Happen',
    teks: `A tsunami is a series of huge ocean waves that can destroy coastal areas within minutes. The word comes from Japanese and means harbour wave. Indonesia is one of the countries most at risk of tsunamis because it lies where several large plates of the Earth's crust meet.

Most tsunamis are caused by strong earthquakes under the sea. The surface of the Earth is made of huge plates that move very slowly. Sometimes one plate becomes stuck under another, and pressure builds up for many years. When the pressure is finally released, the sea floor suddenly moves up or down. This movement pushes the whole column of water above it, and waves start to spread out in all directions. Tsunamis can also be caused by underwater landslides and volcanic eruptions, such as the eruption of Anak Krakatau in twenty eighteen.

In the deep ocean, a tsunami travels extremely fast, sometimes as fast as a jet plane. However, its waves are usually less than one metre high, so people on ships may not even notice them. As the waves approach the shore, the water becomes shallower and the waves slow down. Their energy is pushed upward, and the waves can become taller than a three-storey building.

Before a tsunami arrives, the sea sometimes pulls back suddenly from the beach and leaves fish and rocks uncovered. Many people do not understand this natural warning and walk to the beach to look. In fact, this is the moment when they should run to higher ground immediately. In two thousand four, a tsunami caused by a huge earthquake near Aceh killed more than two hundred thousand people in several countries around the Indian Ocean.

Although tsunamis cannot be prevented, their damage can be reduced. Indonesia now has an early warning system that sends alerts after a strong earthquake. Schools in coastal areas also hold evacuation drills so that students know where to go. Understanding how tsunamis happen can save many lives.`,
    arti: 'Tsunami adalah rangkaian gelombang laut raksasa yang dapat menghancurkan daerah pesisir dalam hitungan menit. Kata ini berasal dari bahasa Jepang dan berarti gelombang pelabuhan. Indonesia adalah salah satu negara yang paling berisiko terkena tsunami karena terletak di tempat bertemunya beberapa lempeng besar kerak bumi. Sebagian besar tsunami disebabkan oleh gempa bumi kuat di bawah laut. Permukaan bumi terdiri atas lempeng-lempeng raksasa yang bergerak sangat lambat. Terkadang satu lempeng tersangkut di bawah lempeng lain, dan tekanan menumpuk selama bertahun-tahun. Ketika tekanan itu akhirnya terlepas, dasar laut tiba-tiba bergerak naik atau turun. Gerakan ini mendorong seluruh kolom air di atasnya, dan gelombang mulai menyebar ke segala arah. Tsunami juga dapat disebabkan oleh longsor bawah laut dan letusan gunung api, seperti letusan Anak Krakatau pada tahun dua ribu delapan belas. Di laut dalam, tsunami bergerak sangat cepat, kadang secepat pesawat jet. Namun, gelombangnya biasanya kurang dari satu meter tingginya, sehingga orang di kapal mungkin bahkan tidak menyadarinya. Saat gelombang mendekati pantai, air menjadi lebih dangkal dan gelombang melambat. Energinya terdorong ke atas, dan gelombang dapat menjadi lebih tinggi daripada gedung tiga lantai. Sebelum tsunami tiba, laut kadang tiba-tiba surut dari pantai dan membuat ikan serta batu-batu terlihat. Banyak orang tidak memahami peringatan alam ini dan berjalan ke pantai untuk melihat. Padahal, inilah saatnya mereka harus segera berlari ke tempat yang lebih tinggi. Pada tahun dua ribu empat, tsunami yang disebabkan oleh gempa besar di dekat Aceh menewaskan lebih dari dua ratus ribu orang di beberapa negara di sekitar Samudra Hindia. Meskipun tsunami tidak dapat dicegah, kerusakannya dapat dikurangi. Indonesia kini memiliki sistem peringatan dini yang mengirimkan peringatan setelah gempa kuat terjadi. Sekolah-sekolah di daerah pesisir juga mengadakan latihan evakuasi agar siswa tahu ke mana harus pergi. Memahami bagaimana tsunami terjadi dapat menyelamatkan banyak nyawa.'
  },
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
  },
  {
    id: 'mangrove-forests', tahap: 5, judul: 'Guardians of the Coast',
    teks: `Along the coasts of Indonesia, where the land meets the sea, grow some of the most remarkable forests on the planet. Mangroves are trees and shrubs that can survive in salty water, and their tangled roots rise above the mud like stilts. Indonesia has the largest area of mangroves of any country, covering roughly three million hectares, or about one fifth of the world's total. For a long time, however, these forests were seen as useless swamps that were best cleared for more profitable uses.

Scientists now know that this view was badly mistaken. Mangroves are among the most carbon-rich ecosystems on Earth, and a hectare of mangrove can store several times more carbon than a hectare of tropical forest on dry land. Most of this carbon is not held in the trees themselves but is locked in the waterlogged soil beneath them, where it may remain for thousands of years. When the forests are cleared, much of this stored carbon can be released into the atmosphere as carbon dioxide.

Mangroves also protect the people who live behind them. Their dense roots slow down waves, reduce erosion, and trap sediment, which helps the coastline keep pace with rising seas. During storms and even tsunamis, villages with healthy mangrove belts have often suffered less damage than those without them, although mangroves cannot stop the largest waves on their own. In addition, the forests serve as nurseries for fish, crabs, and shrimp, supporting the livelihoods of coastal fishing communities.

Despite these benefits, Indonesia has lost a large share of its mangroves over the past half century. The biggest single cause has been the conversion of forests into ponds for shrimp and fish farming, which promised quick profits for farmers and exporters. Ironically, many of these ponds were abandoned after only a few years because of disease and declining water quality. Along parts of the northern coast of Java, the loss of mangroves, combined with land sinking, has allowed the sea to swallow entire villages.

In recent years, the government and many local groups have launched ambitious programs to restore mangroves. Yet experience shows that planting seedlings is not enough. Many planting projects have failed because young trees were placed on mudflats where mangroves never grew naturally, so the seedlings were simply washed away. More successful efforts focus on restoring the natural flow of tides and sediment, allowing mangroves to return on their own, and involving local communities who depend on the coast. If such approaches are widely adopted, the guardians of the coast may yet recover.`,
    arti: 'Di sepanjang pesisir Indonesia, tempat daratan bertemu laut, tumbuh beberapa hutan paling menakjubkan di planet ini. Mangrove adalah pohon dan semak yang mampu bertahan hidup di air asin, dan akar-akarnya yang kusut menjulang di atas lumpur seperti egrang. Indonesia memiliki kawasan mangrove terluas di antara semua negara, yaitu sekitar tiga juta hektare, atau kira-kira seperlima dari total dunia. Namun, untuk waktu yang lama, hutan ini dipandang sebagai rawa tak berguna yang sebaiknya dibuka untuk penggunaan yang lebih menguntungkan. Para ilmuwan kini tahu bahwa pandangan ini sangat keliru. Mangrove termasuk ekosistem paling kaya karbon di Bumi, dan satu hektare mangrove dapat menyimpan karbon beberapa kali lebih banyak daripada satu hektare hutan tropis di daratan kering. Sebagian besar karbon ini tidak tersimpan di pohonnya, tetapi terkunci di dalam tanah yang tergenang air di bawahnya, tempat karbon itu dapat bertahan selama ribuan tahun. Ketika hutan dibuka, banyak karbon yang tersimpan ini dapat terlepas ke atmosfer sebagai karbon dioksida. Mangrove juga melindungi orang-orang yang tinggal di belakangnya. Akarnya yang rapat memperlambat ombak, mengurangi erosi, dan menahan endapan, sehingga membantu garis pantai mengimbangi naiknya permukaan laut. Saat badai dan bahkan tsunami, desa-desa yang memiliki sabuk mangrove yang sehat sering mengalami kerusakan lebih ringan daripada desa yang tidak memilikinya, meskipun mangrove tidak dapat menghentikan gelombang terbesar dengan sendirinya. Selain itu, hutan ini menjadi tempat pembesaran ikan, kepiting, dan udang, sehingga menopang mata pencaharian masyarakat nelayan pesisir. Meskipun memiliki manfaat-manfaat ini, Indonesia telah kehilangan mangrove dalam jumlah besar selama setengah abad terakhir. Penyebab tunggal terbesarnya adalah pengubahan hutan menjadi tambak udang dan ikan, yang menjanjikan keuntungan cepat bagi petambak dan eksportir. Ironisnya, banyak tambak ini ditinggalkan hanya setelah beberapa tahun karena penyakit dan menurunnya kualitas air. Di sebagian pantai utara Jawa, hilangnya mangrove, ditambah penurunan muka tanah, telah membuat laut menelan desa-desa seluruhnya. Dalam beberapa tahun terakhir, pemerintah dan banyak kelompok setempat telah meluncurkan program ambisius untuk memulihkan mangrove. Namun, pengalaman menunjukkan bahwa menanam bibit saja tidak cukup. Banyak proyek penanaman gagal karena pohon muda ditanam di dataran lumpur yang tidak pernah ditumbuhi mangrove secara alami, sehingga bibitnya hanyut begitu saja. Upaya yang lebih berhasil berfokus pada pemulihan aliran alami pasang surut dan endapan, membiarkan mangrove tumbuh kembali dengan sendirinya, serta melibatkan masyarakat setempat yang bergantung pada pesisir. Jika pendekatan semacam ini diterapkan secara luas, para penjaga pesisir ini masih mungkin pulih.'
  },
  {
    id: 'food-waste', tahap: 5, judul: 'The Hidden Cost of Food Waste',
    teks: `Every year, a staggering amount of food is produced but never eaten. According to the United Nations, around one billion tonnes of food were wasted by households, restaurants, and shops in twenty twenty-two, roughly one fifth of all the food available to consumers. Another significant share is lost earlier, somewhere between the farm and the market. At the same time, hundreds of millions of people around the world do not have enough to eat.

The problem begins long before food reaches our plates. In many developing countries, including Indonesia, a large portion of the harvest is lost because of poor storage, a lack of refrigeration, and long, slow transport routes. Fruit and vegetables bruise, rot, or are eaten by pests before they can be sold. In wealthier supply chains, by contrast, perfectly edible produce is often rejected simply because it is the wrong size or shape to meet the standards of supermarkets.

Surprisingly, however, the largest share of waste occurs at home. Households account for about sixty percent of the food wasted at the consumer level, and the problem is not limited to rich countries. Studies in Indonesia suggest that each person wastes well over one hundred kilograms of food a year, much of it from celebrations, buffets, and meals that are cooked in excess. People buy more than they need, store food poorly, or throw it away because they misunderstand the dates printed on packages.

The cost of this waste goes far beyond the money spent on uneaten meals. Growing, transporting, and cooking food consumes enormous quantities of water, land, and energy, all of which are wasted when the food is thrown away. Moreover, when food rots in landfills, it produces methane, a greenhouse gas that is far more powerful than carbon dioxide in the short term. Researchers estimate that food loss and waste together are responsible for roughly eight to ten percent of global greenhouse gas emissions.

Fortunately, many solutions are simple and inexpensive. Farmers can reduce losses with better storage and shared cold rooms, while shops can sell imperfect produce at lower prices or donate surplus food to people in need. At home, planning meals, buying only what is necessary, and learning that a "best before" date refers to quality rather than safety can make a real difference. Leftovers that cannot be eaten can be composted instead of being sent to landfills. None of these steps alone will solve the problem, but together they could save money, feed more people, and ease the pressure on the planet.`,
    arti: 'Setiap tahun, makanan dalam jumlah yang mencengangkan diproduksi tetapi tidak pernah dimakan. Menurut Perserikatan Bangsa-Bangsa, sekitar satu miliar ton makanan terbuang oleh rumah tangga, restoran, dan toko pada tahun dua ribu dua puluh dua, kira-kira seperlima dari seluruh makanan yang tersedia bagi konsumen. Bagian lain yang cukup besar hilang lebih awal, di suatu tempat antara ladang dan pasar. Pada saat yang sama, ratusan juta orang di seluruh dunia tidak cukup makan. Masalah ini bermula jauh sebelum makanan sampai di piring kita. Di banyak negara berkembang, termasuk Indonesia, sebagian besar hasil panen hilang karena penyimpanan yang buruk, tidak adanya pendingin, dan jalur pengangkutan yang panjang dan lambat. Buah dan sayur memar, membusuk, atau dimakan hama sebelum sempat dijual. Sebaliknya, dalam rantai pasok di negara yang lebih kaya, hasil bumi yang sebenarnya layak dimakan sering ditolak hanya karena ukuran atau bentuknya tidak memenuhi standar pasar swalayan. Namun, yang mengejutkan, bagian sampah makanan terbesar justru terjadi di rumah. Rumah tangga menyumbang sekitar enam puluh persen makanan yang terbuang di tingkat konsumen, dan masalah ini tidak terbatas pada negara kaya. Penelitian di Indonesia menunjukkan bahwa setiap orang membuang jauh lebih dari seratus kilogram makanan per tahun, banyak di antaranya berasal dari perayaan, prasmanan, dan masakan yang dibuat berlebihan. Orang membeli lebih banyak daripada yang mereka butuhkan, menyimpan makanan dengan buruk, atau membuangnya karena salah memahami tanggal yang tercetak pada kemasan. Kerugian akibat sampah ini jauh melampaui uang yang dikeluarkan untuk makanan yang tidak dimakan. Menanam, mengangkut, dan memasak makanan menghabiskan air, lahan, dan energi dalam jumlah sangat besar, yang semuanya ikut terbuang ketika makanan itu dibuang. Selain itu, ketika makanan membusuk di tempat pembuangan akhir, makanan itu menghasilkan metana, gas rumah kaca yang jauh lebih kuat daripada karbon dioksida dalam jangka pendek. Para peneliti memperkirakan bahwa susut dan sisa pangan bersama-sama menyumbang kira-kira delapan sampai sepuluh persen emisi gas rumah kaca dunia. Untungnya, banyak solusi yang sederhana dan murah. Petani dapat mengurangi kehilangan dengan penyimpanan yang lebih baik dan ruang pendingin bersama, sementara toko dapat menjual hasil bumi yang kurang sempurna dengan harga lebih rendah atau menyumbangkan makanan berlebih kepada orang yang membutuhkan. Di rumah, merencanakan menu, membeli hanya yang diperlukan, dan memahami bahwa tanggal "best before" berkaitan dengan mutu, bukan keamanan, dapat membawa perubahan nyata. Sisa makanan yang tidak dapat dimakan dapat dijadikan kompos alih-alih dikirim ke tempat pembuangan akhir. Tidak satu pun langkah ini yang dapat menyelesaikan masalah sendirian, tetapi bersama-sama langkah-langkah itu dapat menghemat uang, memberi makan lebih banyak orang, dan meringankan beban bagi planet ini.'
  },
  {
    id: 'regional-languages', tahap: 5, judul: "Saving Indonesia's Regional Languages",
    teks: `Indonesia is one of the most linguistically diverse countries on Earth. Alongside Indonesian, the national language, more than seven hundred regional languages are spoken across the archipelago, from Acehnese in the west to the hundreds of languages of Papua in the east. Some, such as Javanese and Sundanese, have tens of millions of speakers. Many others, however, are spoken by only a few thousand people, or even a few hundred, and linguists warn that a significant number of them are in danger of disappearing.

A language rarely dies suddenly. Instead, it fades over several generations as parents stop passing it on to their children. In Indonesia, this shift is driven by a combination of forces. As families move to cities and marry across ethnic groups, Indonesian often becomes the shared language of the home. Many parents also believe that Indonesian, or English, will give their children better opportunities at school and work, so they deliberately avoid using the local language. Television, social media, and the internet, which are dominated by national and global languages, reinforce the trend.

The loss of a language is more than the loss of words. Each language carries a unique way of seeing the world, including knowledge about local plants, animals, farming, and the sea that has been built up over centuries. Traditional songs, stories, and rituals are often impossible to translate fully, so they may vanish along with the language itself. For the communities concerned, the disappearance of their language can also weaken a sense of identity and connection to their ancestors.

In response, the government launched a national program in twenty twenty-two to revitalize regional languages, working with provinces and local communities. Schools have introduced lessons and competitions in storytelling, speech, and song in local languages, and some communities have created dictionaries and learning materials. Young people are also playing a role by producing videos, music, and comedy in their regional languages and sharing them online, showing that these languages can feel modern rather than old-fashioned.

Whether these efforts will succeed remains uncertain. Experts point out that a language survives only if it is used in daily life, especially between parents and children, not just in classrooms or at festivals. Revitalization is therefore not merely a task for teachers or the government. It depends on the choices of ordinary families, who must decide that speaking their ancestors' language is worth the effort.`,
    arti: 'Indonesia adalah salah satu negara dengan keragaman bahasa terbesar di Bumi. Selain bahasa Indonesia sebagai bahasa nasional, lebih dari tujuh ratus bahasa daerah dituturkan di seluruh Nusantara, dari bahasa Aceh di barat hingga ratusan bahasa di Papua di timur. Sebagian, seperti bahasa Jawa dan Sunda, memiliki puluhan juta penutur. Namun, banyak bahasa lain hanya dituturkan oleh beberapa ribu orang, atau bahkan beberapa ratus orang, dan para ahli bahasa memperingatkan bahwa cukup banyak di antaranya terancam punah. Sebuah bahasa jarang mati secara tiba-tiba. Sebaliknya, bahasa itu memudar selama beberapa generasi ketika orang tua berhenti mewariskannya kepada anak-anak mereka. Di Indonesia, pergeseran ini didorong oleh gabungan beberapa kekuatan. Ketika keluarga pindah ke kota dan menikah antarsuku, bahasa Indonesia sering menjadi bahasa bersama di rumah. Banyak orang tua juga percaya bahwa bahasa Indonesia, atau bahasa Inggris, akan memberi anak mereka peluang yang lebih baik di sekolah dan dunia kerja, sehingga mereka sengaja menghindari penggunaan bahasa daerah. Televisi, media sosial, dan internet, yang didominasi bahasa nasional dan bahasa global, memperkuat kecenderungan itu. Hilangnya sebuah bahasa lebih dari sekadar hilangnya kata-kata. Setiap bahasa membawa cara unik dalam memandang dunia, termasuk pengetahuan tentang tumbuhan, hewan, pertanian, dan laut setempat yang dibangun selama berabad-abad. Lagu, cerita, dan ritual tradisional sering tidak mungkin diterjemahkan sepenuhnya, sehingga semua itu dapat lenyap bersama bahasanya. Bagi masyarakat yang bersangkutan, hilangnya bahasa mereka juga dapat melemahkan rasa jati diri dan ikatan dengan leluhur mereka. Sebagai tanggapan, pemerintah meluncurkan program nasional pada tahun dua ribu dua puluh dua untuk merevitalisasi bahasa daerah, bekerja sama dengan provinsi dan masyarakat setempat. Sekolah telah memperkenalkan pelajaran serta lomba mendongeng, berpidato, dan menyanyi dalam bahasa daerah, dan sebagian masyarakat telah menyusun kamus dan bahan ajar. Kaum muda juga berperan dengan membuat video, musik, dan komedi dalam bahasa daerah mereka lalu membagikannya di internet, sehingga menunjukkan bahwa bahasa-bahasa ini bisa terasa modern, bukan kuno. Apakah upaya-upaya ini akan berhasil masih belum pasti. Para ahli menegaskan bahwa sebuah bahasa hanya bertahan jika dipakai dalam kehidupan sehari-hari, terutama antara orang tua dan anak, bukan hanya di kelas atau di festival. Karena itu, revitalisasi bukan semata-mata tugas guru atau pemerintah. Revitalisasi bergantung pada pilihan keluarga-keluarga biasa, yang harus memutuskan bahwa menuturkan bahasa leluhur mereka sepadan dengan usahanya.'
  },
  {
    id: 'geothermal-energy', tahap: 5, judul: 'Power from Beneath the Ground',
    teks: `Indonesia sits on the Pacific Ring of Fire, a belt of volcanoes and earthquakes that circles the Pacific Ocean. This location brings obvious dangers, but it also provides an extraordinary resource. Deep beneath the surface, heat from the Earth warms underground water and turns it into steam, which can be used to spin turbines and generate electricity. Indonesia is often estimated to hold around forty percent of the world's geothermal potential, more than almost any other country.

The country has been using this resource for decades. Its first geothermal power plant began operating at Kamojang, in West Java, in nineteen eighty-three, and today Indonesia is one of the world's largest producers of geothermal electricity, second only to the United States. Even so, only about one tenth of the estimated potential has been developed, and geothermal energy still supplies a small share of the nation's electricity, which comes mostly from coal.

Supporters argue that geothermal energy offers advantages that few other clean sources can match. Unlike solar and wind power, which depend on the weather, a geothermal plant can produce electricity day and night, in every season. Its greenhouse gas emissions are only a small fraction of those from a coal plant, and it requires relatively little land. Because the heat comes from inside the Earth, the fuel is free and will not run out on any human timescale, as long as the underground reservoirs are managed carefully.

Nevertheless, developing geothermal energy is neither cheap nor simple. Before any electricity is produced, companies must drill deep exploration wells, each of which can cost millions of dollars, and some of these wells turn out to be unproductive. Many promising sites lie in remote mountains or inside protected forests, which raises concerns about damage to ecosystems. Local communities have sometimes opposed projects because they worry about their water supply and their safety. Their fears are not baseless, since a gas leak at a plant in North Sumatra in twenty twenty-one killed several villagers.

For these reasons, experts believe that technology alone will not unlock Indonesia's geothermal wealth. The government can reduce the financial risk by funding early exploration, so that investors do not have to bear the full cost of failed wells. Equally important, companies must consult communities honestly, share the benefits fairly, and meet strict safety standards. If these conditions are met, the heat beneath Indonesia's volcanoes could play a much larger role in its transition to clean energy.`,
    arti: 'Indonesia terletak di Cincin Api Pasifik, sabuk gunung api dan gempa bumi yang melingkari Samudra Pasifik. Letak ini membawa bahaya yang jelas, tetapi juga menyediakan sumber daya yang luar biasa. Jauh di bawah permukaan, panas dari dalam Bumi memanaskan air bawah tanah dan mengubahnya menjadi uap, yang dapat digunakan untuk memutar turbin dan membangkitkan listrik. Indonesia sering diperkirakan memiliki sekitar empat puluh persen potensi panas bumi dunia, lebih banyak daripada hampir semua negara lain. Negara ini telah memanfaatkan sumber daya ini selama puluhan tahun. Pembangkit listrik panas bumi pertamanya mulai beroperasi di Kamojang, Jawa Barat, pada tahun seribu sembilan ratus delapan puluh tiga, dan kini Indonesia termasuk produsen listrik panas bumi terbesar di dunia, hanya kalah dari Amerika Serikat. Meski demikian, baru sekitar sepersepuluh dari perkiraan potensinya yang telah dikembangkan, dan energi panas bumi masih memasok sebagian kecil listrik nasional, yang sebagian besar berasal dari batu bara. Para pendukung berpendapat bahwa energi panas bumi menawarkan keunggulan yang sulit ditandingi sumber energi bersih lainnya. Berbeda dengan tenaga surya dan angin yang bergantung pada cuaca, pembangkit panas bumi dapat menghasilkan listrik siang dan malam, di setiap musim. Emisi gas rumah kacanya hanya sebagian kecil dari emisi pembangkit batu bara, dan pembangkit ini membutuhkan lahan yang relatif sedikit. Karena panasnya berasal dari dalam Bumi, bahan bakarnya gratis dan tidak akan habis dalam rentang waktu manusia, selama waduk panas bawah tanahnya dikelola dengan cermat. Meskipun demikian, mengembangkan energi panas bumi tidaklah murah ataupun sederhana. Sebelum listrik apa pun dihasilkan, perusahaan harus mengebor sumur eksplorasi yang dalam, yang masing-masing dapat menelan biaya jutaan dolar, dan sebagian sumur itu ternyata tidak produktif. Banyak lokasi yang menjanjikan berada di pegunungan terpencil atau di dalam hutan lindung, sehingga menimbulkan kekhawatiran tentang kerusakan ekosistem. Masyarakat setempat kadang menentang proyek karena mereka khawatir akan pasokan air dan keselamatan mereka. Kekhawatiran mereka tidak tanpa dasar, karena kebocoran gas di sebuah pembangkit di Sumatra Utara pada tahun dua ribu dua puluh satu menewaskan beberapa warga desa. Karena alasan-alasan ini, para ahli meyakini bahwa teknologi saja tidak akan membuka kekayaan panas bumi Indonesia. Pemerintah dapat mengurangi risiko keuangan dengan mendanai eksplorasi tahap awal, sehingga investor tidak perlu menanggung seluruh biaya sumur yang gagal. Sama pentingnya, perusahaan harus berkonsultasi dengan masyarakat secara jujur, berbagi manfaat secara adil, dan memenuhi standar keselamatan yang ketat. Jika syarat-syarat ini terpenuhi, panas di bawah gunung-gunung api Indonesia dapat berperan jauh lebih besar dalam peralihan negeri ini menuju energi bersih.'
  },
  {
    id: 'bilingual-brain', tahap: 5, judul: 'The Bilingual Brain',
    teks: `More than half of the world's population is thought to use two or more languages in daily life. In Indonesia, this is the norm rather than the exception, as many children grow up speaking a regional language at home and Indonesian at school. For a long time, however, bilingualism was viewed with suspicion. Some educators in the early twentieth century believed that learning two languages would confuse children and slow their intellectual development.

Research from the second half of the twentieth century challenged this view. Studies began to suggest that bilingual people might enjoy certain mental advantages. Because both languages remain active in the brain even when only one is being used, bilinguals must constantly select the right language and suppress the other. Some psychologists proposed that this constant practice strengthens executive functions, the mental skills that allow us to focus attention, ignore distractions, and switch between tasks.

Early experiments seemed to support this idea. In several studies, bilingual children and adults performed better than monolinguals on tasks that required them to ignore misleading information. Other research reported that bilingual older adults tended to show symptoms of dementia several years later than monolingual adults, raising hopes that speaking two languages might help protect the ageing brain.

More recent work, however, has painted a less clear picture. When researchers repeated earlier experiments with larger groups of participants, many failed to find any bilingual advantage at all. Critics also noted that studies with positive results were more likely to be published than those that found nothing, which may have exaggerated the effect. Furthermore, bilinguals and monolinguals often differ in other ways, such as education, income, or immigration background, making it difficult to tell whether language itself is responsible for any differences.

Today, scientists remain divided on whether bilingualism improves general thinking skills. Yet even sceptics agree that the old fears were unfounded, since there is little evidence that growing up with two languages harms children's development. Moreover, the most obvious benefits of bilingualism do not depend on laboratory tests. Speaking more than one language allows people to communicate with more communities, access more knowledge, and stay connected to their cultural heritage.`,
    arti: 'Lebih dari separuh penduduk dunia diperkirakan menggunakan dua bahasa atau lebih dalam kehidupan sehari-hari. Di Indonesia, hal ini merupakan kebiasaan umum, bukan pengecualian, karena banyak anak tumbuh dengan berbicara bahasa daerah di rumah dan bahasa Indonesia di sekolah. Namun, untuk waktu yang lama, kedwibahasaan dipandang dengan curiga. Sebagian pendidik pada awal abad kedua puluh percaya bahwa mempelajari dua bahasa akan membingungkan anak dan memperlambat perkembangan intelektual mereka. Penelitian dari paruh kedua abad kedua puluh menggugat pandangan ini. Berbagai penelitian mulai menunjukkan bahwa orang dwibahasa mungkin memiliki keunggulan mental tertentu. Karena kedua bahasa tetap aktif di otak bahkan ketika hanya satu yang sedang dipakai, penutur dwibahasa harus terus-menerus memilih bahasa yang tepat dan menekan bahasa yang lain. Sebagian psikolog berpendapat bahwa latihan terus-menerus ini memperkuat fungsi eksekutif, yaitu keterampilan mental yang memungkinkan kita memusatkan perhatian, mengabaikan gangguan, dan berpindah antartugas. Percobaan-percobaan awal tampaknya mendukung gagasan ini. Dalam beberapa penelitian, anak-anak dan orang dewasa dwibahasa berprestasi lebih baik daripada penutur satu bahasa pada tugas yang menuntut mereka mengabaikan informasi yang menyesatkan. Penelitian lain melaporkan bahwa orang lanjut usia yang dwibahasa cenderung menunjukkan gejala demensia beberapa tahun lebih lambat daripada orang dewasa yang hanya menguasai satu bahasa, sehingga memunculkan harapan bahwa berbicara dua bahasa dapat membantu melindungi otak yang menua. Namun, penelitian yang lebih baru memberikan gambaran yang kurang jelas. Ketika para peneliti mengulang percobaan terdahulu dengan kelompok peserta yang lebih besar, banyak yang sama sekali tidak menemukan keunggulan dwibahasa. Para pengkritik juga mencatat bahwa penelitian dengan hasil positif lebih mungkin diterbitkan daripada penelitian yang tidak menemukan apa pun, sehingga mungkin membesar-besarkan efeknya. Selain itu, penutur dwibahasa dan penutur satu bahasa sering berbeda dalam hal lain, seperti pendidikan, penghasilan, atau latar belakang imigrasi, sehingga sulit memastikan apakah bahasa itu sendiri yang menyebabkan perbedaan yang ada. Kini, para ilmuwan masih terbelah tentang apakah kedwibahasaan meningkatkan kemampuan berpikir secara umum. Namun, bahkan mereka yang skeptis sepakat bahwa kekhawatiran lama itu tidak berdasar, karena hampir tidak ada bukti bahwa tumbuh dengan dua bahasa merugikan perkembangan anak. Selain itu, manfaat kedwibahasaan yang paling jelas tidak bergantung pada uji laboratorium. Menguasai lebih dari satu bahasa memungkinkan orang berkomunikasi dengan lebih banyak komunitas, mengakses lebih banyak pengetahuan, dan tetap terhubung dengan warisan budayanya.'
  },
  {
    id: 'teens-social-media', tahap: 5, judul: 'Teenagers and Social Media',
    teks: `For many teenagers today, social media is not an optional extra but a central part of daily life. Through their phones, young people chat with friends, share photos, follow the news, and explore their interests, often for several hours a day. This has led parents, teachers, and governments to ask an urgent question about whether these platforms are harming the mental health of a generation.

The case for concern is easy to understand. Social media can expose teenagers to cyberbullying, harmful content, and constant comparison with carefully edited images of other people's lives. Many platforms are designed to keep users scrolling for as long as possible, and late-night use can cut into the sleep that growing brains need. Several large surveys have found that teenagers who spend the most time on social media report higher levels of anxiety and depression than those who use it less.

Yet social media also brings genuine benefits. It allows teenagers to maintain friendships, find support, and connect with others who share their hobbies or experiences. For young people who feel isolated in their own communities, an online group can provide a sense of belonging that is hard to find elsewhere. Social media can also be a place for creativity, where teenagers write, draw, make music, and learn new skills.

Interpreting the research is more difficult than headlines suggest. Most studies are correlational, which means they show that heavy use and poor mental health often occur together, but not that one causes the other. It is possible that teenagers who already feel unhappy turn to their phones more often. In addition, many studies rely on teenagers' own estimates of their screen time, which are often inaccurate, and the average effects found tend to be small. What matters may be less how long teenagers spend online than what they do there and how it makes them feel.

Given this uncertainty, most experts recommend balance rather than panic. Keeping phones out of the bedroom at night, turning off unnecessary notifications, and taking regular breaks can protect sleep and attention. Teenagers can also ask themselves whether an app leaves them feeling better or worse, and unfollow accounts that make them feel inadequate. Above all, open conversations between teenagers and adults are likely to achieve more than strict bans, which young people often find ways to avoid.`,
    arti: 'Bagi banyak remaja masa kini, media sosial bukan sekadar tambahan yang boleh ada atau tidak, melainkan bagian utama kehidupan sehari-hari. Melalui ponsel, kaum muda mengobrol dengan teman, berbagi foto, mengikuti berita, dan menjelajahi minat mereka, sering kali selama beberapa jam sehari. Hal ini membuat orang tua, guru, dan pemerintah mengajukan pertanyaan mendesak tentang apakah platform-platform ini merusak kesehatan mental satu generasi. Alasan untuk khawatir mudah dipahami. Media sosial dapat membuat remaja terpapar perundungan siber, konten berbahaya, dan perbandingan terus-menerus dengan gambar kehidupan orang lain yang disunting dengan cermat. Banyak platform dirancang agar pengguna terus menggulir layar selama mungkin, dan pemakaian larut malam dapat mengurangi tidur yang dibutuhkan otak yang sedang tumbuh. Beberapa survei besar menemukan bahwa remaja yang paling lama menggunakan media sosial melaporkan tingkat kecemasan dan depresi yang lebih tinggi daripada mereka yang lebih jarang menggunakannya. Namun, media sosial juga membawa manfaat yang nyata. Media sosial memungkinkan remaja menjaga persahabatan, mendapatkan dukungan, dan terhubung dengan orang lain yang memiliki hobi atau pengalaman yang sama. Bagi kaum muda yang merasa terasing di lingkungannya sendiri, kelompok daring dapat memberikan rasa memiliki yang sulit ditemukan di tempat lain. Media sosial juga dapat menjadi tempat berkreasi, tempat remaja menulis, menggambar, membuat musik, dan mempelajari keterampilan baru. Menafsirkan hasil penelitian lebih sulit daripada kesan yang ditimbulkan judul berita. Sebagian besar penelitian bersifat korelasional, artinya penelitian itu menunjukkan bahwa pemakaian berat dan kesehatan mental yang buruk sering muncul bersamaan, tetapi tidak menunjukkan bahwa yang satu menyebabkan yang lain. Bisa jadi remaja yang sudah merasa tidak bahagia lebih sering beralih ke ponselnya. Selain itu, banyak penelitian bergantung pada perkiraan remaja sendiri tentang waktu layar mereka, yang sering tidak akurat, dan rata-rata efek yang ditemukan cenderung kecil. Yang penting mungkin bukan seberapa lama remaja berada di dunia maya, melainkan apa yang mereka lakukan di sana dan bagaimana hal itu memengaruhi perasaan mereka. Mengingat ketidakpastian ini, sebagian besar ahli menganjurkan keseimbangan, bukan kepanikan. Menjauhkan ponsel dari kamar tidur pada malam hari, mematikan notifikasi yang tidak perlu, dan beristirahat secara teratur dapat melindungi tidur dan perhatian. Remaja juga dapat bertanya pada diri sendiri apakah sebuah aplikasi membuat perasaan mereka lebih baik atau lebih buruk, dan berhenti mengikuti akun yang membuat mereka merasa tidak cukup baik. Yang terpenting, percakapan terbuka antara remaja dan orang dewasa kemungkinan besar lebih berhasil daripada larangan ketat, yang sering dicari celahnya oleh kaum muda.'
  }
];
