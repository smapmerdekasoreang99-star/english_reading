/* Daftar tahap dan bacaan English Reading.
   Peta belajar 5 tahap (acuan CEFR), dari kosakata dasar sampai level TKA SMA.
   Urutan level di dalam satu tahap = urutan bacaan di daftar ini.

   Menambah bacaan: salin satu blok { ... }, beri id unik (huruf kecil, tanda -),
   isi tahap 0–4. Jumlah kalimat terjemahan (arti) harus sama dengan teks agar
   terjemahan tampil di bawah tiap kalimat. Baris kosong di teks = paragraf baru.
   Hindari angka (tulis "twenty", bukan "20"), jam ("seven o'clock"), dan singkatan
   bertitik ("Mr.") agar pemecahan kalimat dan koreksi bacaan tetap tepat. */
window.TAHAP = [
  { no: 0, nama: 'Fondasi', setara: 'Pre-A1 · setara SD', fokus: 'Bunyi dan kosakata dasar: angka, warna, salam, benda di kelas.' },
  { no: 1, nama: 'Kalimat Sederhana', setara: 'A1 · SD akhir–SMP 7', fokus: 'Memperkenalkan diri, keluarga, sekolah, kegiatan sehari-hari (to be, simple present).' },
  { no: 2, nama: 'Teks Fungsional Pendek', setara: 'A2 · SMP', fokus: 'Deskripsi, recount, prosedur, pengumuman (simple past, future, perintah).' },
  { no: 3, nama: 'Genre Teks', setara: 'A2+–B1 · SMP 9–SMA 10', fokus: 'Narrative, report, exposition singkat; kata sambung dan kalimat majemuk.' },
  { no: 4, nama: 'Level TKA', setara: 'B1 · SMA 11–12', fokus: 'Teks panjang: discussion dan exposition; ide pokok, inferensi, sikap penulis.' }
];

window.BACAAN = [
  // ---------- Tahap 0: Fondasi ----------
  {
    id: 'numbers', tahap: 0, judul: 'Numbers',
    teks: 'One. Two. Three. Four. Five. Six. Seven. Eight. Nine. Ten.',
    arti: 'Satu. Dua. Tiga. Empat. Lima. Enam. Tujuh. Delapan. Sembilan. Sepuluh.'
  },
  {
    id: 'colors', tahap: 0, judul: 'Colors',
    teks: 'Red. Blue. Green. Yellow. Black. White. Orange. Purple. Brown. Pink.',
    arti: 'Merah. Biru. Hijau. Kuning. Hitam. Putih. Oranye. Ungu. Cokelat. Merah muda.'
  },
  {
    id: 'greetings', tahap: 0, judul: 'Greetings',
    teks: 'Good morning. Good afternoon. Good evening. Good night. Hello. Goodbye. Thank you. You are welcome. Sorry. Please.',
    arti: 'Selamat pagi. Selamat siang. Selamat malam. Selamat tidur. Halo. Sampai jumpa. Terima kasih. Sama-sama. Maaf. Tolong.'
  },
  {
    id: 'classroom', tahap: 0, judul: 'In My Classroom',
    teks: 'A book. A pen. A pencil. A ruler. An eraser. A bag. A table. A chair. A whiteboard. A window.',
    arti: 'Sebuah buku. Sebuah pulpen. Sebuah pensil. Sebuah penggaris. Sebuah penghapus. Sebuah tas. Sebuah meja. Sebuah kursi. Sebuah papan tulis. Sebuah jendela.'
  },

  // ---------- Tahap 1: Kalimat Sederhana ----------
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
    id: 'my-school', tahap: 1, judul: 'My School',
    teks: 'My name is Rina. I am a student at a senior high school in Soreang. My school is not very big, but it is clean and green. There are many trees in the yard. Every morning, I walk to school with my best friend. We study English, mathematics, and science. I like English because I want to talk with people from other countries.',
    arti: 'Nama saya Rina. Saya siswa di sebuah SMA di Soreang. Sekolah saya tidak terlalu besar, tetapi bersih dan hijau. Ada banyak pohon di halaman. Setiap pagi, saya berjalan ke sekolah bersama sahabat saya. Kami belajar bahasa Inggris, matematika, dan IPA. Saya suka bahasa Inggris karena saya ingin berbicara dengan orang-orang dari negara lain.'
  },
  {
    id: 'my-day', tahap: 1, judul: 'My Daily Activities',
    teks: 'I wake up early every morning. I take a bath and eat breakfast with my family. Then I go to school with my father. At school, I study and play with my friends. I go home in the afternoon. In the evening, I do my homework. After that, I watch television and go to bed.',
    arti: 'Saya bangun pagi-pagi setiap hari. Saya mandi dan sarapan bersama keluarga. Lalu saya pergi ke sekolah bersama ayah saya. Di sekolah, saya belajar dan bermain dengan teman-teman. Saya pulang pada sore hari. Pada malam hari, saya mengerjakan PR. Setelah itu, saya menonton televisi dan tidur.'
  },

  // ---------- Tahap 2: Teks Fungsional Pendek ----------
  {
    id: 'best-friend', tahap: 2, judul: 'My Best Friend',
    teks: 'I have a best friend. Her name is Sinta. She is tall and has long black hair. She always wears glasses. Sinta is very kind and friendly. She often helps me when I have difficulty with my lessons. She is good at drawing and singing. Every weekend, we ride our bicycles around the village. Sometimes we go to the library together. I am lucky to have a friend like her.',
    arti: 'Saya punya seorang sahabat. Namanya Sinta. Ia tinggi dan berambut hitam panjang. Ia selalu memakai kacamata. Sinta sangat baik dan ramah. Ia sering membantu saya ketika saya kesulitan dengan pelajaran. Ia pandai menggambar dan bernyanyi. Setiap akhir pekan, kami bersepeda keliling desa. Kadang-kadang kami pergi ke perpustakaan bersama. Saya beruntung punya teman seperti dia.'
  },
  {
    id: 'a-rainy-morning', tahap: 2, judul: 'A Rainy Morning',
    teks: 'It was raining heavily this morning. Dimas woke up late and looked out of the window. The street was wet and full of puddles. He quickly ate his breakfast and put on his raincoat. His mother gave him an umbrella. When he arrived at school, his shoes were wet, but he was happy because he was not late.',
    arti: 'Pagi ini hujan turun dengan deras. Dimas bangun kesiangan dan melihat ke luar jendela. Jalanan basah dan penuh genangan air. Ia cepat-cepat sarapan dan memakai jas hujannya. Ibunya memberinya sebuah payung. Ketika ia tiba di sekolah, sepatunya basah, tetapi ia senang karena tidak terlambat.'
  },
  {
    id: 'make-tea', tahap: 2, judul: 'How to Make a Cup of Tea',
    teks: 'How do you make a good cup of tea? First, boil some water in a kettle. Next, put a tea bag into a cup. Then, pour the hot water into the cup. Wait for about three minutes. After that, take out the tea bag. Add one or two spoons of sugar and stir it well. If you like, you can also add some milk or a slice of lemon. Finally, your tea is ready. Enjoy it while it is warm!',
    arti: 'Bagaimana cara membuat secangkir teh yang enak? Pertama, rebus air di dalam ketel. Berikutnya, masukkan satu kantong teh ke dalam cangkir. Lalu, tuangkan air panas ke dalam cangkir. Tunggu sekitar tiga menit. Setelah itu, angkat kantong tehnya. Tambahkan satu atau dua sendok gula, lalu aduk rata. Jika suka, kamu juga bisa menambahkan sedikit susu atau seiris lemon. Akhirnya, tehmu siap. Nikmati selagi hangat!'
  },
  {
    id: 'announcement', tahap: 2, judul: 'School Announcement',
    teks: 'Attention, please. This is an announcement for all students. Next Friday, our school will hold a clean school day. All students must come to school at seven in the morning. Please bring a broom, a dustpan, and a plastic bag. Each class will clean its own classroom and the school yard. After cleaning, we will have breakfast together in the hall. The best class will get a prize from the headmaster. Do not forget to wear your sports uniform. Thank you for your attention.',
    arti: 'Mohon perhatian. Ini adalah pengumuman untuk seluruh siswa. Jumat depan, sekolah kita akan mengadakan hari bersih sekolah. Semua siswa harus datang ke sekolah pukul tujuh pagi. Harap membawa sapu, pengki, dan kantong plastik. Setiap kelas akan membersihkan ruang kelasnya sendiri dan halaman sekolah. Setelah bersih-bersih, kita akan sarapan bersama di aula. Kelas terbaik akan mendapat hadiah dari kepala sekolah. Jangan lupa memakai seragam olahraga. Terima kasih atas perhatiannya.'
  },

  // ---------- Tahap 3: Genre Teks ----------
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
