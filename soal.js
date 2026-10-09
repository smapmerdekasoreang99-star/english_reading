/* Soal pemahaman per bacaan (kunci = id bacaan di bacaan.js).
   t = pertanyaan, p = pilihan, j = indeks jawaban benar (0 = A), b = pembahasan.
   Jenis soal naik bertahap: informasi rinci (Tahap 1) → ide pokok, makna kata,
   rujukan (Tahap 2–3) → tujuan teks, inferensi, sikap penulis (Tahap 4 / TKA). */
window.SOAL = {
  // ---------- Tahap 1 ----------
  'hello-budi': [
    { t: 'How old is Budi?', p: ['Ten years old', 'Fifteen years old', 'Five years old', 'Fifty years old'], j: 1,
      b: 'Kalimat "I am fifteen years old" berarti Budi berumur lima belas tahun.' },
    { t: 'Where does Budi live?', p: ['In Bandung', 'In Jakarta', 'In Soreang', 'In Bogor'], j: 2,
      b: '"I live in Soreang with my family."' },
    { t: 'What does Budi like?', p: ['Football and music', 'Drawing and singing', 'Cooking and reading', 'Swimming and dancing'], j: 0,
      b: '"I like football and music."' }
  ],
  'my-family': [
    { t: 'What is the father\'s job?', p: ['A nurse', 'A farmer', 'A teacher', 'A doctor'], j: 2,
      b: '"My father is a teacher." Yang perawat (nurse) adalah ibunya.' },
    { t: 'How many brothers and sisters does the writer have?', p: ['One', 'Two', 'Three', 'Four'], j: 1,
      b: '"I have one brother and one sister": satu saudara laki-laki + satu saudara perempuan = dua.' },
    { t: '"My sister is a baby." This means the sister is …', p: ['very young', 'very tall', 'ten years old', 'a student'], j: 0,
      b: 'Baby = bayi, artinya masih sangat kecil (very young). Yang berumur sepuluh tahun adalah saudara laki-lakinya.' }
  ],
  'my-school': [
    { t: 'What is Rina\'s school like?', p: ['Big and noisy', 'Not very big, but clean and green', 'Old and dirty', 'Big and modern'], j: 1,
      b: '"My school is not very big, but it is clean and green."' },
    { t: 'How does Rina go to school?', p: ['By bus', 'By bicycle', 'On foot', 'By motorcycle'], j: 2,
      b: '"I walk to school" = berjalan kaki (on foot).' },
    { t: 'Why does Rina like English?', p: ['Because it is easy', 'Because she wants to talk with people from other countries', 'Because her teacher is kind', 'Because her school is green'], j: 1,
      b: '"I like English because I want to talk with people from other countries."' }
  ],
  'my-day': [
    { t: 'Who does the writer go to school with?', p: ['Mother', 'Friends', 'Father', 'Brother'], j: 2,
      b: '"Then I go to school with my father."' },
    { t: 'When does the writer do homework?', p: ['In the morning', 'At school', 'In the afternoon', 'In the evening'], j: 3,
      b: '"In the evening, I do my homework."' },
    { t: 'What does the writer do after doing homework?', p: ['Plays football', 'Watches television and goes to bed', 'Eats breakfast', 'Goes to school'], j: 1,
      b: '"After that, I watch television and go to bed." After that = setelah mengerjakan PR.' }
  ],

  // ---------- Tahap 2 ----------
  'best-friend': [
    { t: 'What is the text mainly about?', p: ['The writer\'s village', 'The writer\'s best friend', 'A library', 'Drawing lessons'], j: 1,
      b: 'Seluruh teks menggambarkan Sinta, sahabat penulis. Ini teks deskripsi tentang seseorang.' },
    { t: 'Which statement about Sinta is TRUE?', p: ['She has short hair.', 'She is short.', 'She always wears glasses.', 'She is unfriendly.'], j: 2,
      b: '"She always wears glasses." Pilihan lain bertentangan dengan teks: rambutnya panjang, ia tinggi, dan ramah.' },
    { t: 'What do they do every weekend?', p: ['Go to the library', 'Ride bicycles around the village', 'Draw pictures', 'Sing songs'], j: 1,
      b: '"Every weekend, we ride our bicycles around the village." Ke perpustakaan hanya "sometimes".' },
    { t: '"She often helps me when I have difficulty with my lessons." The word "difficulty" is closest in meaning to …', p: ['problem', 'happiness', 'holiday', 'homework'], j: 0,
      b: 'Difficulty = kesulitan, maknanya paling dekat dengan problem (masalah).' }
  ],
  'a-rainy-morning': [
    { t: 'Why did Dimas put on his raincoat?', p: ['It was cold.', 'It was raining heavily.', 'It was a new raincoat.', 'His friend asked him.'], j: 1,
      b: 'Teks dibuka dengan "It was raining heavily this morning."' },
    { t: 'What did his mother give him?', p: ['Breakfast', 'A raincoat', 'An umbrella', 'New shoes'], j: 2,
      b: '"His mother gave him an umbrella."' },
    { t: 'How did Dimas feel when he arrived at school?', p: ['Sad', 'Angry', 'Happy', 'Sleepy'], j: 2,
      b: '"… but he was happy because he was not late."' },
    { t: 'Why was Dimas happy?', p: ['His shoes were dry.', 'He was not late.', 'The rain stopped.', 'He got a new umbrella.'], j: 1,
      b: '"… he was happy because he was not late." Sepatunya justru basah.' }
  ],
  'make-tea': [
    { t: 'What is the purpose of the text?', p: ['To describe a cup', 'To tell the reader how to make tea', 'To tell a story about tea', 'To sell tea'], j: 1,
      b: 'Teks prosedur: langkah-langkah (First, Next, Then, Finally) untuk membuat teh.' },
    { t: 'What should you do right after putting the tea bag into the cup?', p: ['Add sugar', 'Boil the water', 'Pour the hot water into the cup', 'Take out the tea bag'], j: 2,
      b: 'Urutannya: "Next, put a tea bag into a cup. Then, pour the hot water into the cup."' },
    { t: 'How long should you wait before taking out the tea bag?', p: ['One minute', 'About three minutes', 'Ten minutes', 'One hour'], j: 1,
      b: '"Wait for about three minutes. After that, take out the tea bag."' },
    { t: 'Which ingredient is optional?', p: ['Water', 'A tea bag', 'Milk', 'Hot water'], j: 2,
      b: '"If you like, you can also add some milk…": susu boleh ditambahkan atau tidak (optional).' }
  ],
  'announcement': [
    { t: 'Who is the announcement for?', p: ['Teachers', 'Parents', 'All students', 'The headmaster'], j: 2,
      b: '"This is an announcement for all students."' },
    { t: 'What will happen next Friday?', p: ['A sports competition', 'A clean school day', 'A school holiday', 'A birthday party'], j: 1,
      b: '"Next Friday, our school will hold a clean school day."' },
    { t: 'Which item is NOT mentioned as something to bring?', p: ['A broom', 'A dustpan', 'A plastic bag', 'A bucket'], j: 3,
      b: 'Yang harus dibawa: broom, dustpan, plastic bag. Bucket (ember) tidak disebut.' },
    { t: 'What will the students do after cleaning?', p: ['Go home early', 'Have breakfast together in the hall', 'Play football', 'Each get a prize'], j: 1,
      b: '"After cleaning, we will have breakfast together in the hall." Hadiah hanya untuk kelas terbaik.' }
  ],

  // ---------- Tahap 3 ----------
  'the-farmer': [
    { t: 'What is the main idea of the text?', p: ['Pak Ahmad\'s village is near the mountains.', 'Pak Ahmad is a hardworking farmer who never gives up.', 'The weather is always bad for farmers.', 'Farmers like to talk with each other.'], j: 1,
      b: 'Ide pokok mencakup seluruh teks: kerja keras Pak Ahmad dan keyakinannya. Pilihan lain hanya detail kecil.' },
    { t: 'When does Pak Ahmad go to his rice field?', p: ['After lunch', 'Before sunrise', 'In the evening', 'At night'], j: 1,
      b: '"He wakes up before sunrise and goes to his rice field."' },
    { t: '"However, Pak Ahmad never gives up." The phrase "gives up" means …', p: ['stops trying', 'wakes up', 'works hard', 'plants rice'], j: 0,
      b: 'Give up = menyerah, berhenti berusaha (stops trying).' },
    { t: 'What can we learn from Pak Ahmad?', p: ['Farming is easy work.', 'Patience and hard work bring good results.', 'The weather is always friendly.', 'We should live near the mountains.'], j: 1,
      b: 'Kalimat terakhir: "He believes that patience and hard work will bring a good harvest."' }
  ],
  'malin-kundang': [
    { t: 'Why did Malin sail to another land?', p: ['To find his father', 'To find a better life', 'To marry a princess', 'To visit his mother'], j: 1,
      b: '"… Malin decided to sail to another land to find a better life."' },
    { t: 'What did Malin do when his mother came to meet him?', p: ['He hugged her.', 'He said that she was not his mother.', 'He gave her money.', 'He cried happily.'], j: 1,
      b: '"Malin was ashamed of her and said that she was not his mother."' },
    { t: '"Heartbroken, the old woman prayed …" The word "heartbroken" describes someone who is …', p: ['very sad', 'very happy', 'very angry', 'very rich'], j: 0,
      b: 'Heartbroken = patah hati, sangat sedih.' },
    { t: 'What is the moral value of the story?', p: ['We must respect our parents.', 'We must sail to become rich.', 'Rich people are always happy.', 'Storms are dangerous.'], j: 0,
      b: 'Malin dihukum karena durhaka dan malu mengakui ibunya. Pesannya: hormati orang tua.' }
  ],
  'mobile-phones': [
    { t: 'What is the writer\'s main opinion?', p: ['Students should not have phones.', 'Students should use phones wisely.', 'Phones are only for playing games.', 'Phones are too expensive.'], j: 1,
      b: 'Pendapat penulis ditegaskan dengan "Therefore, we should use our phones wisely."' },
    { t: 'According to the text, what is a negative effect of phones?', p: ['Finding information', 'Contacting families', 'Feeling tired in class after playing games late', 'Learning new skills'], j: 2,
      b: '"Some students play games until late at night and feel tired in class." Pilihan lain adalah manfaat.' },
    { t: '"On the other hand, they can also take too much of our time." The word "they" refers to …', p: ['students', 'families', 'phones', 'skills'], j: 2,
      b: 'Kalimat sebelumnya membahas phones (telepon). They = phones.' },
    { t: 'What does the writer suggest?', p: ['Selling our phones', 'Playing games at night', 'Setting a time limit', 'Buying a new phone'], j: 2,
      b: '"We can set a time limit and put the phone away when we study."' }
  ],
  'plastic-waste': [
    { t: 'What problem is discussed in the text?', p: ['Air pollution', 'Plastic waste', 'Forest fires', 'Floods'], j: 1,
      b: 'Kalimat pertama menyebut masalahnya: "Plastic waste has become one of the most serious environmental problems…"' },
    { t: 'Why is plastic harmful to animals?', p: ['It is expensive.', 'It takes hundreds of years to break down.', 'It is colorful.', 'It is very light.'], j: 1,
      b: '"Because plastic takes hundreds of years to break down, it harms fish, birds, and other animals."' },
    { t: '"… and separate our rubbish." The word "rubbish" means …', p: ['waste', 'money', 'food', 'clothes'], j: 0,
      b: 'Rubbish = sampah (waste).' },
    { t: 'What does the last sentence imply?', p: ['Only the government can solve the problem.', 'Small actions by many people are important.', 'Big actions are useless.', 'The problem cannot be solved.'], j: 1,
      b: '"Small actions, when done by many people, can make a big difference." Tersirat: peran setiap orang penting.' }
  ],

  // ---------- Tahap 4 (gaya TKA) ----------
  'school-uniforms': [
    { t: 'What is the purpose of the text?', p: ['To tell a story about a school', 'To present arguments for and against school uniforms', 'To describe a school uniform', 'To explain how uniforms are made'], j: 1,
      b: 'Teks discussion: menyajikan pendapat pendukung (paragraf 2) dan penentang (paragraf 3), lalu kesimpulan.' },
    { t: 'According to the supporters, how do uniforms make schools safer?', p: ['Uniforms are comfortable.', 'Teachers and security guards can recognize students easily.', 'Students always arrive on time.', 'Uniforms are cheap.'], j: 1,
      b: '"… uniforms help teachers and security guards recognize students easily, which makes the school environment safer."' },
    { t: '"… opponents claim that uniforms limit students\' freedom …" The word "opponents" refers to people who …', p: ['support school uniforms', 'disagree with school uniforms', 'sell school uniforms', 'design school uniforms'], j: 1,
      b: 'Opponents = pihak penentang. Paragraf ini dibuka "On the other hand", kebalikan dari supporters.' },
    { t: 'Which of the following is NOT an argument against school uniforms?', p: ['They limit self-expression.', 'They can be expensive.', 'They save time in the morning.', 'They can be uncomfortable.'], j: 2,
      b: 'Menghemat waktu di pagi hari adalah argumen pendukung (paragraf 2), bukan penentang.' },
    { t: 'What does the writer suggest in the last paragraph?', p: ['Uniforms must be banned.', 'Uniforms are perfect and should not change.', 'A simple, affordable uniform with some free-dress days may be the best solution.', 'Students should choose their own school.'], j: 2,
      b: '"Perhaps the best solution is a simple and affordable uniform, combined with a few days each month…" Penulis mengambil jalan tengah.' }
  ],
  'reading-habit': [
    { t: 'What is the writer\'s main argument?', p: ['Social media is useful for students.', 'Every student should make reading a daily habit.', 'Books are too expensive.', 'Short videos are better than books.'], j: 1,
      b: 'Tesis di paragraf pertama: "every student should make reading a daily habit for several important reasons."' },
    { t: 'According to the second paragraph, how does reading help students?', p: ['It makes them rich.', 'It improves their knowledge and vocabulary.', 'It makes lessons shorter.', 'It replaces their teachers.'], j: 1,
      b: '"First, reading improves our knowledge and vocabulary."' },
    { t: 'Why does the writer compare books with short videos?', p: ['To show that reading trains concentration', 'To show that videos are more fun', 'To advertise a video application', 'To explain how videos are made'], j: 0,
      b: 'Perbandingan dipakai untuk argumen kedua: buku menuntut fokus lama sehingga melatih konsentrasi.' },
    { t: '"This ability to concentrate is very useful …" The word "This" refers to …', p: ['reading digital books', 'the ability to focus on one story or idea for a long time', 'short videos', 'studying for exams'], j: 1,
      b: 'This merujuk ke kalimat sebelumnya: fokus pada satu cerita atau gagasan dalam waktu lama.' },
    { t: 'What is the writer\'s attitude toward reading?', p: ['Negative', 'Doubtful', 'Supportive', 'Uninterested'], j: 2,
      b: 'Penulis memberi alasan-alasan dan mengajak membaca ("let us … open a book"), jadi sikapnya mendukung (supportive).' }
  ]
};
