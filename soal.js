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
      b: '"I like football and music."' },
    // Tambahan untuk Latihan bertahap (9 Okt 2026)
    { t: 'What is the boy\'s name?', p: ['Budi', 'Rina', 'Dina', 'Andi'], j: 0,
      b: '"My name is Budi."' },
    { t: 'Who does Budi live with?', p: ['His friends', 'His family', 'His teacher', 'His grandmother'], j: 1,
      b: '"I live in Soreang with my family."' },
    { t: 'What is Budi?', p: ['A teacher', 'A farmer', 'A student', 'A doctor'], j: 2,
      b: '"I am a student."' },
    { t: '"Nice to meet you!" We say this when we …', p: ['meet someone for the first time', 'go to bed', 'eat breakfast', 'say goodbye at night'], j: 0,
      b: 'Nice to meet you = senang berkenalan denganmu; diucapkan saat pertama kali bertemu.' },
    { t: 'Which sentence is TRUE about Budi?', p: ['He is ten years old.', 'He lives in Jakarta.', 'He likes music.', 'He is a teacher.'], j: 2,
      b: '"I like football and music."' }
  ],
  'my-family': [
    { t: 'What is the father\'s job?', p: ['A nurse', 'A farmer', 'A teacher', 'A doctor'], j: 2,
      b: '"My father is a teacher." Yang perawat (nurse) adalah ibunya.' },
    { t: 'How many brothers and sisters does the writer have?', p: ['One', 'Two', 'Three', 'Four'], j: 1,
      b: '"I have one brother and one sister": satu saudara laki-laki + satu saudara perempuan = dua.' },
    { t: '"My sister is a baby." This means the sister is …', p: ['very young', 'very tall', 'ten years old', 'a student'], j: 0,
      b: 'Baby = bayi, artinya masih sangat kecil (very young). Yang berumur sepuluh tahun adalah saudara laki-lakinya.' },
    // Tambahan untuk Latihan bertahap (9 Okt 2026)
    { t: 'What is the mother\'s job?', p: ['A teacher', 'A nurse', 'A farmer', 'A doctor'], j: 1,
      b: '"My mother is a nurse."' },
    { t: 'How old is the brother?', p: ['Five years old', 'Ten years old', 'Fifteen years old', 'One year old'], j: 1,
      b: '"My brother is ten years old."' },
    { t: 'What kind of house do they live in?', p: ['A big house', 'A small house', 'A new house', 'An old house'], j: 1,
      b: '"We live in a small house."' },
    { t: 'How does the writer feel about the family?', p: ['Sad', 'Angry', 'The writer loves them very much', 'Tired'], j: 2,
      b: '"I love my family very much."' },
    { t: 'How many people are there in the family, including the writer?', p: ['Three', 'Four', 'Five', 'Six'], j: 2,
      b: 'Ayah, ibu, satu saudara laki-laki, satu saudara perempuan, dan penulis = lima orang.' }
  ],
  'my-school': [
    { t: 'What is Rina\'s school like?', p: ['Big and noisy', 'Not very big, but clean and green', 'Old and dirty', 'Big and modern'], j: 1,
      b: '"My school is not very big, but it is clean and green."' },
    { t: 'How does Rina go to school?', p: ['By bus', 'By bicycle', 'On foot', 'By motorcycle'], j: 2,
      b: '"I walk to school" = berjalan kaki (on foot).' },
    { t: 'Why does Rina like English?', p: ['Because it is easy', 'Because she wants to talk with people from other countries', 'Because her teacher is kind', 'Because her school is green'], j: 1,
      b: '"I like English because I want to talk with people from other countries."' },
    // Tambahan untuk Latihan bertahap (9 Okt 2026)
    { t: 'Where is Rina\'s school?', p: ['In Bandung', 'In Soreang', 'In Jakarta', 'In a big city'], j: 1,
      b: '"… a senior high school in Soreang."' },
    { t: 'What is in the school yard?', p: ['Many cars', 'Many trees', 'A big pool', 'Many shops'], j: 1,
      b: '"There are many trees in the yard."' },
    { t: 'Which subject is NOT mentioned?', p: ['English', 'Mathematics', 'Science', 'History'], j: 3,
      b: 'Yang disebut: English, mathematics, dan science.' },
    { t: 'Who does Rina walk to school with?', p: ['Her mother', 'Her teacher', 'Her best friend', 'Her brother'], j: 2,
      b: '"… I walk to school with my best friend."' },
    { t: '"My school is not very big, but it is clean and green." The word "but" shows …', p: ['a contrast', 'a reason', 'a time', 'a place'], j: 0,
      b: 'but (tetapi) menunjukkan pertentangan: tidak terlalu besar, tetapi bersih dan hijau.' }
  ],
  'my-day': [
    { t: 'Who does the writer go to school with?', p: ['Mother', 'Friends', 'Father', 'Brother'], j: 2,
      b: '"Then I go to school with my father."' },
    { t: 'When does the writer do homework?', p: ['In the morning', 'At school', 'In the afternoon', 'In the evening'], j: 3,
      b: '"In the evening, I do my homework."' },
    { t: 'What does the writer do after doing homework?', p: ['Plays football', 'Watches television and goes to bed', 'Eats breakfast', 'Goes to school'], j: 1,
      b: '"After that, I watch television and go to bed." After that = setelah mengerjakan PR.' },
    // Tambahan untuk Latihan bertahap (9 Okt 2026)
    { t: 'When does the writer wake up?', p: ['Late at night', 'Early in the morning', 'In the afternoon', 'At noon'], j: 1,
      b: '"I wake up early every morning."' },
    { t: 'Who does the writer eat breakfast with?', p: ['Friends', 'The family', 'The teacher', 'Nobody'], j: 1,
      b: '"I take a bath and eat breakfast with my family."' },
    { t: 'When does the writer go home?', p: ['In the morning', 'In the afternoon', 'At night', 'At noon'], j: 1,
      b: '"I go home in the afternoon."' },
    { t: 'What does the writer do at school?', p: ['Sleeps and eats', 'Studies and plays with friends', 'Watches television', 'Does homework'], j: 1,
      b: '"At school, I study and play with my friends."' },
    { t: 'What is the last activity of the day?', p: ['Doing homework', 'Watching television', 'Going to bed', 'Taking a bath'], j: 2,
      b: '"After that, I watch television and go to bed." Yang terakhir adalah tidur.' }
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
      b: 'Difficulty = kesulitan, maknanya paling dekat dengan problem (masalah).' },
    // Tambahan untuk Latihan bertahap (9 Okt 2026)
    { t: 'What does Sinta look like?', p: ['Short with short hair', 'Tall with long black hair', 'Tall with short brown hair', 'Short with long black hair'], j: 1,
      b: '"She is tall and has long black hair."' },
    { t: 'What is Sinta good at?', p: ['Swimming and dancing', 'Drawing and singing', 'Cooking and reading', 'Football and music'], j: 1,
      b: '"She is good at drawing and singing."' },
    { t: 'Where do they sometimes go together?', p: ['To the market', 'To the library', 'To the beach', 'To the cinema'], j: 1,
      b: '"Sometimes we go to the library together."' },
    { t: '"I am lucky to have a friend like her." How does the writer feel?', p: ['Grateful', 'Angry', 'Bored', 'Afraid'], j: 0,
      b: 'lucky = beruntung; penulis bersyukur punya sahabat seperti Sinta.' },
    { t: 'The word "her" in the last sentence refers to …', p: ['the writer', 'Sinta', 'the teacher', 'the mother'], j: 1,
      b: '"a friend like her" = teman seperti Sinta.' }
  ],
  'a-rainy-morning': [
    { t: 'Why did Dimas put on his raincoat?', p: ['It was cold.', 'It was raining heavily.', 'It was a new raincoat.', 'His friend asked him.'], j: 1,
      b: 'Teks dibuka dengan "It was raining heavily this morning."' },
    { t: 'What did his mother give him?', p: ['Breakfast', 'A raincoat', 'An umbrella', 'New shoes'], j: 2,
      b: '"His mother gave him an umbrella."' },
    { t: 'How did Dimas feel when he arrived at school?', p: ['Sad', 'Angry', 'Happy', 'Sleepy'], j: 2,
      b: '"… but he was happy because he was not late."' },
    { t: 'Why was Dimas happy?', p: ['His shoes were dry.', 'He was not late.', 'The rain stopped.', 'He got a new umbrella.'], j: 1,
      b: '"… he was happy because he was not late." Sepatunya justru basah.' },
    // Tambahan untuk Latihan bertahap (9 Okt 2026)
    { t: 'What was the weather like that morning?', p: ['Sunny', 'Windy', 'Raining heavily', 'Snowing'], j: 2,
      b: '"It was raining heavily this morning."' },
    { t: 'What did Dimas see when he looked out of the window?', p: ['A wet street full of puddles', 'A sunny garden', 'His friends', 'A big car'], j: 0,
      b: '"The street was wet and full of puddles."' },
    { t: 'How did Dimas eat his breakfast?', p: ['Slowly', 'Quickly', 'With his friends', 'At school'], j: 1,
      b: '"He quickly ate his breakfast …"' },
    { t: 'What happened to his shoes?', p: ['They were new', 'They were wet', 'They were lost', 'They were clean'], j: 1,
      b: '"… his shoes were wet …"' },
    { t: 'The word "puddles" means …', p: ['small pools of water on the ground', 'big trees', 'heavy clouds', 'wet shoes'], j: 0,
      b: 'puddles = genangan air.' }
  ],
  'make-tea': [
    { t: 'What is the purpose of the text?', p: ['To describe a cup', 'To tell the reader how to make tea', 'To tell a story about tea', 'To sell tea'], j: 1,
      b: 'Teks prosedur: langkah-langkah (First, Next, Then, Finally) untuk membuat teh.' },
    { t: 'What should you do right after putting the tea bag into the cup?', p: ['Add sugar', 'Boil the water', 'Pour the hot water into the cup', 'Take out the tea bag'], j: 2,
      b: 'Urutannya: "Next, put a tea bag into a cup. Then, pour the hot water into the cup."' },
    { t: 'How long should you wait before taking out the tea bag?', p: ['One minute', 'About three minutes', 'Ten minutes', 'One hour'], j: 1,
      b: '"Wait for about three minutes. After that, take out the tea bag."' },
    { t: 'Which ingredient is optional?', p: ['Water', 'A tea bag', 'Milk', 'Hot water'], j: 2,
      b: '"If you like, you can also add some milk…": susu boleh ditambahkan atau tidak (optional).' },
    // Tambahan untuk Latihan bertahap (9 Okt 2026)
    { t: 'What is the first step?', p: ['Put a tea bag into a cup', 'Boil some water', 'Add sugar', 'Pour the hot water'], j: 1,
      b: '"First, boil some water in a kettle."' },
    { t: 'What do you use to boil the water?', p: ['A cup', 'A kettle', 'A spoon', 'A bag'], j: 1,
      b: '"… boil some water in a kettle."' },
    { t: 'How much sugar can you add?', p: ['One or two spoons', 'Three cups', 'Five spoons', 'No sugar at all'], j: 0,
      b: '"Add one or two spoons of sugar …"' },
    { t: 'The word "stir" means …', p: ['to mix a drink with a spoon', 'to boil water', 'to drink quickly', 'to cut a lemon'], j: 0,
      b: 'stir = mengaduk.' },
    { t: 'What type of text is this?', p: ['A story', 'A procedure', 'An announcement', 'A letter'], j: 1,
      b: 'Teks berisi langkah-langkah membuat sesuatu = prosedur.' }
  ],
  'announcement': [
    { t: 'Who is the announcement for?', p: ['Teachers', 'Parents', 'All students', 'The headmaster'], j: 2,
      b: '"This is an announcement for all students."' },
    { t: 'What will happen next Friday?', p: ['A sports competition', 'A clean school day', 'A school holiday', 'A birthday party'], j: 1,
      b: '"Next Friday, our school will hold a clean school day."' },
    { t: 'Which item is NOT mentioned as something to bring?', p: ['A broom', 'A dustpan', 'A plastic bag', 'A bucket'], j: 3,
      b: 'Yang harus dibawa: broom, dustpan, plastic bag. Bucket (ember) tidak disebut.' },
    { t: 'What will the students do after cleaning?', p: ['Go home early', 'Have breakfast together in the hall', 'Play football', 'Each get a prize'], j: 1,
      b: '"After cleaning, we will have breakfast together in the hall." Hadiah hanya untuk kelas terbaik.' },
    // Tambahan untuk Latihan bertahap (9 Okt 2026)
    { t: 'What time must students come to school?', p: ['At six', 'At seven', 'At eight', 'At nine'], j: 1,
      b: '"… come to school at seven in the morning."' },
    { t: 'What will each class clean?', p: ['The hall only', 'Its own classroom and the school yard', 'The teachers\' room', 'The canteen'], j: 1,
      b: '"Each class will clean its own classroom and the school yard."' },
    { t: 'Who will give the prize?', p: ['The class leader', 'The headmaster', 'The parents', 'The students'], j: 1,
      b: '"The best class will get a prize from the headmaster."' },
    { t: 'What should the students wear?', p: ['Their school uniform', 'Their sports uniform', 'Their best clothes', 'A raincoat'], j: 1,
      b: '"Do not forget to wear your sports uniform."' },
    { t: 'Where will they have breakfast?', p: ['In the classroom', 'In the hall', 'In the yard', 'At home'], j: 1,
      b: '"… we will have breakfast together in the hall."' }
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
      b: 'Kalimat terakhir: "He believes that patience and hard work will bring a good harvest."' },
    // Tambahan untuk Latihan bertahap (9 Okt 2026)
    { t: 'Where does Pak Ahmad live?', p: ['In a big city', 'In a small village near the mountains', 'Near the beach', 'In Jakarta'], j: 1,
      b: '"… lives in a small village near the mountains."' },
    { t: 'Which activity is NOT mentioned in the text?', p: ['Checking the water', 'Removing the weeds', 'Selling rice at the market', 'Talking with other farmers'], j: 2,
      b: 'Yang disebut: memeriksa air, mencabut rumput liar, berbincang dengan petani lain.' },
    { t: 'Why is planting rice difficult?', p: ['It is hard work and the weather is not always friendly', 'The rice field is too far', 'He has no tools', 'He is too old'], j: 0,
      b: '"Planting rice is hard work, and the weather is not always friendly."' },
    { t: 'The word "patience" is closest in meaning to …', p: ['the ability to wait calmly', 'the ability to run fast', 'a lot of money', 'a feeling of anger'], j: 0,
      b: 'patience = kesabaran.' },
    { t: 'What does Pak Ahmad believe?', p: ['The rain will stop soon', 'Patience and hard work will bring a good harvest', 'Farming is easy', 'The mountains are dangerous'], j: 1,
      b: '"He believes that patience and hard work will bring a good harvest."' }
  ],
  'malin-kundang': [
    { t: 'Why did Malin sail to another land?', p: ['To find his father', 'To find a better life', 'To marry a princess', 'To visit his mother'], j: 1,
      b: '"… Malin decided to sail to another land to find a better life."' },
    { t: 'What did Malin do when his mother came to meet him?', p: ['He hugged her.', 'He said that she was not his mother.', 'He gave her money.', 'He cried happily.'], j: 1,
      b: '"Malin was ashamed of her and said that she was not his mother."' },
    { t: '"Heartbroken, the old woman prayed …" The word "heartbroken" describes someone who is …', p: ['very sad', 'very happy', 'very angry', 'very rich'], j: 0,
      b: 'Heartbroken = patah hati, sangat sedih.' },
    { t: 'What is the moral value of the story?', p: ['We must respect our parents.', 'We must sail to become rich.', 'Rich people are always happy.', 'Storms are dangerous.'], j: 0,
      b: 'Malin dihukum karena durhaka dan malu mengakui ibunya. Pesannya: hormati orang tua.' },
    // Tambahan untuk Latihan bertahap (9 Okt 2026)
    { t: 'Who was Malin Kundang\'s mother?', p: ['A rich merchant', 'A poor widow', 'A beautiful princess', 'A farmer\'s wife'], j: 1,
      b: '"… there lived a poor widow and her son, Malin Kundang."' },
    { t: 'What did Malin become years later?', p: ['A poor fisherman', 'A rich merchant', 'A farmer', 'A teacher'], j: 1,
      b: '"Years later, he became a rich merchant …"' },
    { t: 'What happened after the mother prayed?', p: ['The sun shone', 'A terrible storm came', 'Malin hugged her', 'The ship sailed away happily'], j: 1,
      b: '"… the old woman prayed, and a terrible storm came."' },
    { t: 'What type of text is this?', p: ['A legend (folktale)', 'A procedure', 'An announcement', 'A report'], j: 0,
      b: 'Cerita rakyat dengan pesan moral = legenda (narrative).' },
    { t: 'What happened to Malin Kundang at the end?', p: ['He became a king', 'He was turned into stone', 'He went back to his wife', 'He became poor'], j: 1,
      b: '"Malin Kundang was turned into stone."' }
  ],
  'mobile-phones': [
    { t: 'What is the writer\'s main opinion?', p: ['Students should not have phones.', 'Students should use phones wisely.', 'Phones are only for playing games.', 'Phones are too expensive.'], j: 1,
      b: 'Pendapat penulis ditegaskan dengan "Therefore, we should use our phones wisely."' },
    { t: 'According to the text, what is a negative effect of phones?', p: ['Finding information', 'Contacting families', 'Feeling tired in class after playing games late', 'Learning new skills'], j: 2,
      b: '"Some students play games until late at night and feel tired in class." Pilihan lain adalah manfaat.' },
    { t: '"On the other hand, they can also take too much of our time." The word "they" refers to …', p: ['students', 'families', 'phones', 'skills'], j: 2,
      b: 'Kalimat sebelumnya membahas phones (telepon). They = phones.' },
    { t: 'What does the writer suggest?', p: ['Selling our phones', 'Playing games at night', 'Setting a time limit', 'Buying a new phone'], j: 2,
      b: '"We can set a time limit and put the phone away when we study."' },
    // Tambahan untuk Latihan bertahap (9 Okt 2026)
    { t: 'According to the text, how many students have a mobile phone?', p: ['Very few', 'Almost every student', 'No students', 'Only teachers'], j: 1,
      b: '"Today, almost every student has a mobile phone."' },
    { t: 'Which benefit of phones is mentioned in the text?', p: ['Contacting our families', 'Cooking food', 'Cleaning the house', 'Making us sleep early'], j: 0,
      b: '"Phones can help us find information, contact our families, and learn new skills."' },
    { t: 'Why do some students feel tired in class?', p: ['They walk to school', 'They play games until late at night', 'They study too much', 'They eat too much'], j: 1,
      b: '"Some students play games until late at night and feel tired in class."' },
    { t: 'The word "wisely" means …', p: ['in a smart and careful way', 'very quickly', 'without stopping', 'in a lazy way'], j: 0,
      b: 'wisely = dengan bijak.' },
    { t: 'What type of text is this?', p: ['A short exposition (opinion with reasons)', 'A story', 'A procedure', 'An announcement'], j: 0,
      b: 'Teks menyampaikan pendapat beserta alasan dan saran = eksposisi.' }
  ],
  'plastic-waste': [
    { t: 'What problem is discussed in the text?', p: ['Air pollution', 'Plastic waste', 'Forest fires', 'Floods'], j: 1,
      b: 'Kalimat pertama menyebut masalahnya: "Plastic waste has become one of the most serious environmental problems…"' },
    { t: 'Why is plastic harmful to animals?', p: ['It is expensive.', 'It takes hundreds of years to break down.', 'It is colorful.', 'It is very light.'], j: 1,
      b: '"Because plastic takes hundreds of years to break down, it harms fish, birds, and other animals."' },
    { t: '"… and separate our rubbish." The word "rubbish" means …', p: ['waste', 'money', 'food', 'clothes'], j: 0,
      b: 'Rubbish = sampah (waste).' },
    { t: 'What does the last sentence imply?', p: ['Only the government can solve the problem.', 'Small actions by many people are important.', 'Big actions are useless.', 'The problem cannot be solved.'], j: 1,
      b: '"Small actions, when done by many people, can make a big difference." Tersirat: peran setiap orang penting.' },
    // Tambahan untuk Latihan bertahap (9 Okt 2026)
    { t: 'Where does much of the plastic end up every year?', p: ['In rivers and oceans', 'In schools', 'In the mountains', 'In the sky'], j: 0,
      b: '"… millions of tons of plastic end up in rivers and oceans."' },
    { t: 'How long does plastic take to break down?', p: ['A few days', 'A few weeks', 'Hundreds of years', 'One year'], j: 2,
      b: '"… plastic takes hundreds of years to break down …"' },
    { t: 'How can tiny pieces of plastic affect people?', p: ['They can enter our food and water', 'They make us taller', 'They clean the water', 'They help fish grow'], j: 0,
      b: '"… tiny pieces of plastic can enter our food and water."' },
    { t: 'Which action is suggested in the text?', p: ['Buying more bottles', 'Bringing our own bags', 'Throwing rubbish in rivers', 'Burning plastic'], j: 1,
      b: '"… we should bring our own bags …"' },
    { t: 'The phrase "In addition" is used to …', p: ['add more information', 'show a contrast', 'show time', 'end the text'], j: 0,
      b: 'In addition = selain itu; menambahkan informasi.' }
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
      b: '"Perhaps the best solution is a simple and affordable uniform, combined with a few days each month…" Penulis mengambil jalan tengah.' },
    // Tambahan untuk Latihan bertahap (9 Okt 2026)
    { t: 'According to the supporters, how do uniforms save time?', p: ['Students do not need to think about what to wear', 'Students can sleep at school', 'Uniforms are cheap', 'Teachers check them quickly'], j: 0,
      b: '"… students do not need to think about what to wear."' },
    { t: 'Why can uniforms be expensive for some families?', p: ['Schools may require several different sets', 'Uniforms are made of gold', 'Students lose them every day', 'Shops do not sell them'], j: 0,
      b: '"… especially when schools require several different sets for different days."' },
    { t: 'When are uniforms uncomfortable, according to some students?', p: ['In hot weather', 'At night', 'On Sundays', 'During holidays'], j: 0,
      b: '"… uncomfortable, particularly in hot weather."' },
    { t: 'The word "affordable" in the last paragraph is closest in meaning to …', p: ['not too expensive', 'very beautiful', 'very old', 'hard to find'], j: 0,
      b: 'affordable = terjangkau harganya.' },
    { t: 'How is the text organized?', p: ['Issue – arguments for – arguments against – conclusion', 'Story – problem – solution', 'Steps – result', 'Announcement – details – thanks'], j: 0,
      b: 'Teks diskusi: isu, argumen pendukung, argumen penentang, lalu kesimpulan.' },
    { t: 'What can be inferred about the writer\'s position?', p: ['The writer is balanced and suggests a middle way', 'The writer strongly hates uniforms', 'The writer only supports uniforms', 'The writer has no opinion at all'], j: 0,
      b: 'Penulis menimbang kedua pihak lalu mengusulkan jalan tengah.' },
    // Bentuk soal TKA tambahan (10 Okt 2026): pilihan ganda kompleks, benar/salah, penalaran.
    { t: 'Which arguments are given by the SUPPORTERS of school uniforms?', p: ['Uniforms create a sense of equality.', 'Uniforms save time in the morning.', 'Uniforms help recognize students easily.', 'Uniforms let students express their personality.', 'Uniforms are always comfortable.'], j: [0, 1, 2],
      b: 'Paragraf 2: kesetaraan, menghemat waktu, mudah dikenali. Ekspresi kepribadian adalah argumen penentang; kenyamanan justru dikeluhkan.' },
    { t: 'Tentukan benar atau salah menurut teks.', bs: [['Some schools require several sets of uniforms.', true], ['Opponents think uniforms are cheap for all families.', false], ['The writer suggests a few free-dress days each month.', true], ['According to the text, teenagers are still developing their identity.', true]],
      b: 'Paragraf 3: seragam bisa mahal karena beberapa setel; remaja sedang membentuk jati diri. Paragraf 4: beberapa hari bebas tiap bulan.' },
    { t: 'Which of the following, if true, would most STRENGTHEN the supporters\' argument?', p: ['A study shows that students in schools with uniforms feel less pressure to follow fashion.', 'Uniforms in many schools cost more every year.', 'Many students say uniforms are too hot.', 'Students in free-dress schools express themselves better.'], j: 0,
      b: 'Pendukung berpendapat seragam mengurangi tekanan mengikuti mode; temuan penelitian itu menguatkannya. Pilihan lain justru menguatkan penentang.' }
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
      b: 'Penulis memberi alasan-alasan dan mengajak membaca ("let us … open a book"), jadi sikapnya mendukung (supportive).' },
    // Tambahan untuk Latihan bertahap (9 Okt 2026)
    { t: 'According to the text, what do many young people spend more time on?', p: ['Reading books', 'Scrolling through social media', 'Playing football', 'Sleeping'], j: 1,
      b: '"… many young people today spend more time scrolling through social media than reading books."' },
    { t: 'What is the third reason the writer gives?', p: ['Reading improves vocabulary', 'Reading trains concentration', 'Reading reduces stress and makes us creative', 'Reading is expensive'], j: 2,
      b: '"Third, reading can reduce stress and make us more creative."' },
    { t: 'How can students start reading, according to the last paragraph?', p: ['By buying many expensive books', 'By reading for just ten minutes before sleeping', 'By stopping school', 'By watching short videos'], j: 1,
      b: '"… or start with just ten minutes before going to sleep."' },
    { t: 'The word "regularly" is closest in meaning to …', p: ['often and routinely', 'never', 'very fast', 'only once'], j: 0,
      b: 'regularly = secara rutin.' },
    { t: '"… a nation of readers is a nation that grows." This sentence suggests that …', p: ['reading helps a country develop', 'readers should leave the country', 'nations do not need books', 'books are too expensive'], j: 0,
      b: 'Bangsa yang gemar membaca adalah bangsa yang berkembang.' },
    { t: 'What type of text is this?', p: ['Analytical exposition', 'Recount', 'Procedure', 'Narrative'], j: 0,
      b: 'Pendapat (thesis) + alasan-alasan + ajakan = eksposisi analitis.' },
    // Bentuk soal TKA tambahan (10 Okt 2026)
    { t: 'Which benefits of reading are mentioned by the writer?', p: ['It improves knowledge and vocabulary.', 'It trains concentration.', 'It can reduce stress.', 'It makes students rich.', 'It replaces sleep.'], j: [0, 1, 2],
      b: 'First: pengetahuan dan kosakata. Second: konsentrasi. Third: mengurangi stres dan kreatif.' },
    { t: 'Tentukan benar atau salah menurut teks.', bs: [['The writer compares books with short videos.', true], ['The writer says students must buy expensive books.', false], ['Digital books are mentioned as one option.', true], ['The writer gives no reasons for the opinion.', false]],
      b: 'Paragraf 3 membandingkan buku dengan video pendek; paragraf 5 menyebut perpustakaan dan buku digital; ada tiga alasan.' },
    { t: 'Which statement would the writer most likely agree with?', p: ['Reading for a few minutes every day is better than not reading at all.', 'Reading is only useful before exams.', 'Social media is the best way to learn new words.', 'Only libraries can help students read.'], j: 0,
      b: 'Penulis menyarankan memulai "with just ten minutes before going to sleep": sedikit tetapi rutin.' }
  ],
  // ---------- Tahap 4 tambahan (10 Okt 2026) ----------
  // Kisi-kisi TKA: pemahaman (ide pokok, rinci, makna kata, rujukan), aplikasi (tujuan, menerapkan
  // informasi), penalaran (inferensi, simpulan, sikap penulis). Bentuk: pilihan ganda, pilihan ganda
  // kompleks (j = daftar indeks), benar/salah per pernyataan (bs).
  'river-cleanup': [
    { t: 'What is the text mainly about?', p: ['A clean-up event at the Citarum River involving students', 'How to build a bridge over a river', 'A competition between five schools', 'The history of the Citarum River'], j: 0,
      b: 'Teks berita (news item): peristiwa utamanya ada di paragraf 1.' },
    { t: 'Why was the event held?', p: ['To celebrate World Environment Day and raise awareness about the river', 'To build a new bridge', 'To sell broken furniture', 'To choose the cleanest school'], j: 0,
      b: '"It was held to celebrate World Environment Day and to raise awareness about the condition of the river."' },
    { t: 'Where did most of the rubbish come from, according to the organizers?', p: ['Households that throw rubbish into the river', 'Factories near the river', 'Tourists', 'The students'], j: 0,
      b: '"… most of the waste came from households that still throw their rubbish directly into the river."' },
    { t: '"She explained that people must change their daily habits …" The word "She" refers to …', p: ['the head of the environmental group', 'one of the students', 'a teacher', 'a government official'], j: 0,
      b: 'Kalimat sebelumnya membicarakan "The head of the environmental group".' },
    { t: 'What does the head of the environmental group believe?', p: ['A yearly clean-up alone cannot solve the problem.', 'The river is already clean.', 'Students should not join the event.', 'Plastic bags are not a problem.'], j: 0,
      b: '"… cleaning the river once a year is not enough"; kebiasaan sehari-hari harus berubah.' },
    { t: 'Which paragraph tells us what the volunteers did during the event?', p: ['Paragraph 2', 'Paragraph 1', 'Paragraph 3', 'Paragraph 4'], j: 0,
      b: 'Paragraf 2 menceritakan kegiatan relawan: memakai sarung tangan, mengumpulkan sampah, mengisi karung.' },
    { t: 'The word "admitted" in the last paragraph is closest in meaning to …', p: ['confessed', 'refused', 'forgot', 'denied'], j: 0,
      b: 'admitted = mengaku (confessed).' },
    { t: 'Which of the following were collected from the riverbanks?', p: ['Plastic bottles', 'Broken furniture', 'Old clothes', 'Dead fish', 'Car tyres'], j: [0, 1, 2],
      b: '"… they collected plastic bottles, food wrappers, old clothes, and even broken furniture …"' },
    { t: 'Tentukan benar atau salah berdasarkan berita.', bs: [['The event was held on a Saturday.', true], ['The volunteers filled fewer than one hundred sacks.', false], ['The organizers plan to hold the event again.', true], ['The regency government was not involved.', false]],
      b: 'Sabtu lalu; lebih dari seribu karung; diadakan lagi tiap tiga bulan; diselenggarakan bersama pemerintah kabupaten.' },
    { t: 'What can be inferred from the text?', p: ['The river will stay dirty unless people change their habits.', 'The students did not enjoy the event.', 'The river is too dangerous to visit.', 'Schools already teach waste management well.'], j: 0,
      b: 'Sampah berasal dari kebiasaan rumah tangga, dan ketua kelompok meminta kebiasaan diubah: tanpa itu sungai akan tetap kotor.' },
    { t: 'A family wants to follow the advice in paragraph 3. What should they do?', p: ['Separate waste at home and use fewer plastic bags', 'Throw rubbish into the river at night', 'Buy more plastic bags', 'Clean the river once a year only'], j: 0,
      b: '"… such as separating waste at home and using fewer plastic bags."' },
    { t: 'Which are the organizers\' plans or hopes?', p: ['Holding a similar event every three months', 'More schools joining the event', 'Stopping the event next year', 'Moving the event to another city'], j: [0, 1],
      b: '"The organizers plan to hold a similar event every three months and hope that more schools will join them."' },
    { t: 'What is the purpose of the text?', p: ['To inform readers about a recent event', 'To persuade readers to buy gloves', 'To describe a river in detail', 'To tell a funny story'], j: 0,
      b: 'News item bertujuan memberitakan peristiwa yang baru terjadi.' }
  ],
  'email-science-fair': [
    { t: 'Why did Raka write the email?', p: ['To ask permission to hold a science fair', 'To invite Mrs Lestari to a party', 'To complain about the school hall', 'To report the winners of a science fair'], j: 0,
      b: '"… to ask for your permission to hold a science fair at our school next month."' },
    { t: 'Who is Mrs Lestari most likely to be?', p: ['The school principal', 'A student', 'A parent who sells science kits', 'The winner of the fair'], j: 0,
      b: 'Ia dimintai izin memakai aula, guru sebagai juri, dan anggaran sekolah: kemungkinan besar kepala sekolah.' },
    { t: 'How many groups have registered for the fair?', p: ['Thirty-two', 'Fifteen', 'Four', 'Two'], j: 0,
      b: '"So far, thirty-two groups have registered …"' },
    { t: '"… their projects range from simple water filters to small solar-powered cars." The word "their" refers to …', p: ['the thirty-two groups', 'the teachers', 'the parents', 'the judges'], j: 0,
      b: 'their = milik kelompok-kelompok yang sudah mendaftar.' },
    { t: 'What does the Student Council request from the school?', p: ['The school hall and four classrooms', 'Two science teachers as judges', 'A small budget for prizes and certificates', 'New computers for the laboratory', 'A holiday after the fair'], j: [0, 1, 2],
      b: 'Tiga permohonan: First (aula dan empat kelas), Second (dua guru juri), Finally (anggaran hadiah dan sertifikat).' },
    { t: 'The word "grateful" in paragraph 3 is closest in meaning to …', p: ['thankful', 'angry', 'worried', 'surprised'], j: 0,
      b: 'grateful = berterima kasih (thankful).' },
    { t: 'What has Raka attached to the email?', p: ['A detailed schedule and a list of committee members', 'Photos of the projects', 'The prize money', 'A certificate'], j: 0,
      b: '"We have already prepared a detailed schedule and a list of the committee members, which I have attached …"' },
    { t: 'Tentukan benar atau salah menurut email.', bs: [['The fair will last until night.', false], ['Students from other schools may visit the fair.', true], ['The Student Council has not prepared anything yet.', false], ['Raka is the chairperson of the Student Council.', true]],
      b: 'Pameran pukul delapan sampai dua siang; untuk siswa sekolah lain juga; jadwal dan daftar panitia sudah siap; Raka ketua OSIS.' },
    { t: 'Which sentence shows the writer\'s hope about the effect of the fair?', p: ['We believe the fair will motivate younger students to become more interested in science.', 'So far, thirty-two groups have registered.', 'First, we need to use the school hall and four classrooms.', 'Thank you for your time and support.'], j: 0,
      b: 'Kalimat itu menyatakan dampak yang diharapkan: memotivasi adik kelas.' },
    { t: 'What is the tone of the email?', p: ['Polite and formal', 'Angry and rude', 'Funny and casual', 'Sad and hopeless'], j: 0,
      b: 'Ungkapan seperti "we would be grateful", "please do not hesitate", "Yours sincerely" menunjukkan nada sopan dan resmi.' },
    { t: 'If Mrs Lestari has a question about the schedule, what should she do according to the email?', p: ['Contact Raka', 'Wait until the fair', 'Ask the judges', 'Cancel the fair'], j: 0,
      b: '"If you have any questions or suggestions, please do not hesitate to contact me."' },
    { t: 'How is the email organized?', p: ['Purpose – details of the event – requests – closing', 'Problem – complaint – threat', 'Story – conflict – resolution', 'Steps – materials – result'], j: 0,
      b: 'Paragraf 1 tujuan, paragraf 2 rincian, paragraf 3 permohonan, paragraf 4 penutup.' }
  ],
  'komodo': [
    { t: 'What is the text mainly about?', p: ['General information about the Komodo dragon', 'A trip to Komodo Island', 'How to keep a Komodo dragon as a pet', 'A story about a brave Komodo dragon'], j: 0,
      b: 'Teks report: informasi umum tentang komodo (ciri, makanan, berkembang biak, perlindungan).' },
    { t: 'Where can Komodo dragons be found in the wild?', p: ['Only on a few islands in eastern Indonesia', 'All over Indonesia', 'In Africa and Australia', 'Only in zoos'], j: 0,
      b: '"It is found only on a few islands in eastern Indonesia …"' },
    { t: 'What do Komodo dragons use their tongue for?', p: ['To smell the air', 'To catch insects', 'To dig the ground', 'To clean their eggs'], j: 0,
      b: '"… a long yellow tongue, which they use to smell the air."' },
    { t: '"… which they use to smell the air." The word "they" refers to …', p: ['Komodo dragons', 'the islands', 'sharp claws', 'dead animals'], j: 0,
      b: 'they = Komodo dragons (subjek kalimat).' },
    { t: 'How do Komodo dragons usually catch their prey?', p: ['They wait quietly and attack suddenly.', 'They chase it for many kilometres.', 'They hunt in big groups at night.', 'They use trees to trap it.'], j: 0,
      b: '"… they usually wait quietly and attack suddenly."' },
    { t: 'Why do young Komodo dragons live in trees?', p: ['To stay safe from larger dragons', 'Because they eat leaves', 'Because the ground is too hot', 'To lay their eggs'], j: 0,
      b: '"… in trees, where they are safe from larger dragons."' },
    { t: 'The word "endangered" in the last paragraph means …', p: ['at risk of disappearing', 'very dangerous', 'growing quickly', 'living in water'], j: 0,
      b: 'endangered = terancam punah.' },
    { t: 'According to the text, why are Komodo dragons in danger?', p: ['Their habitat is getting smaller.', 'The number of animals they hunt is decreasing.', 'They lay too many eggs.', 'They cannot smell well.'], j: [0, 1],
      b: '"Their habitat is getting smaller, and the number of animals they hunt is decreasing."' },
    { t: 'Tentukan benar atau salah menurut teks.', bs: [['An adult Komodo dragon can weigh more than seventy kilograms.', true], ['Komodo dragons only eat small lizards.', false], ['Komodo eggs hatch after about eight months.', true], ['Komodo National Park was created in two thousand ten.', false]],
      b: 'Komodo memakan hampir semua daging, dari kadal sampai kerbau; taman nasional didirikan tahun seribu sembilan ratus delapan puluh.' },
    { t: 'What can be inferred about an animal that escapes after being bitten by a Komodo dragon?', p: ['It may still die a few days later.', 'It will become stronger.', 'It will never be hunted again.', 'It will turn into a Komodo dragon.'], j: 0,
      b: 'Air liur berbakteri dan berbisa membuat hewan yang tergigit melemah dan mati beberapa hari kemudian.' },
    { t: 'Which paragraph describes what Komodo dragons eat and how they hunt?', p: ['Paragraph 3', 'Paragraph 1', 'Paragraph 2', 'Paragraph 4'], j: 0,
      b: 'Paragraf 3 dimulai "Komodo dragons are carnivores."' },
    { t: 'What is the purpose of the last paragraph?', p: ['To explain the threats to Komodo dragons and how they are protected', 'To describe the body of the Komodo dragon', 'To explain how Komodo dragons lay eggs', 'To tell a legend about the Komodo dragon'], j: 0,
      b: 'Paragraf terakhir: spesies terancam punah, penyebabnya, dan Taman Nasional Komodo.' },
    { t: 'What type of text is this?', p: ['Report', 'Narrative', 'Recount', 'Procedure'], j: 0,
      b: 'Report: klasifikasi umum lalu deskripsi ciri, perilaku, dan keadaan suatu jenis hewan.' }
  ],
  'lake-toba': [
    { t: 'What is the main idea of the second paragraph?', p: ['The woman married Toba on the condition that he keep her secret.', 'Toba caught a golden fish.', 'Samosir ate his father\'s lunch.', 'A lake was formed.'], j: 0,
      b: 'Paragraf 2: syarat pernikahan dan janji Toba menjaga rahasia.' },
    { t: 'What was the condition of the marriage?', p: ['Toba must never tell anyone that she had been a fish.', 'Toba must stop fishing.', 'Toba must build a big house.', 'Toba must move to another island.'], j: 0,
      b: '"He must never tell anyone that she had once been a fish."' },
    { t: 'Why did Toba become angry?', p: ['Samosir had eaten most of his lunch.', 'Samosir lost the basket.', 'His wife disappeared.', 'The rain destroyed his field.'], j: 0,
      b: 'Toba melihat keranjang kosong karena Samosir memakan sebagian besar makanan.' },
    { t: 'The word "heartbroken" in paragraph 4 is closest in meaning to …', p: ['very sad', 'very proud', 'very hungry', 'very tired'], j: 0,
      b: 'heartbroken = sangat sedih, patah hati.' },
    { t: 'Why did the mother most likely tell Samosir to climb the highest hill?', p: ['To save him from the coming flood', 'To find his father', 'To catch another fish', 'To punish him'], j: 0,
      b: 'Sesudahnya hujan lebat dan banjir; bukit itu menjadi pulau. Ibu melindungi anaknya (inferensi).' },
    { t: 'Which events happened AFTER Toba broke his promise?', p: ['The mother disappeared.', 'Heavy rain began to fall.', 'Toba caught a golden fish.', 'Samosir was born.', 'A large lake was formed.'], j: [0, 1, 4],
      b: 'Ikan ditangkap dan Samosir lahir sebelum janji dilanggar; ibu menghilang, hujan, dan danau terbentuk sesudahnya.' },
    { t: 'Tentukan benar atau salah menurut cerita.', bs: [['Toba was a fisherman who lived by the sea.', false], ['The golden fish turned into a beautiful woman.', true], ['Samosir took lunch to his father in the field.', true], ['Toba kept his promise until the end.', false]],
      b: 'Toba seorang petani yang memancing di sungai; ia melanggar janjinya saat marah.' },
    { t: 'What is the climax of the story?', p: ['Toba shouts that Samosir is the child of a fish.', 'Toba goes fishing.', 'Samosir is born.', 'Samosir grows into a strong boy.'], j: 0,
      b: 'Puncak konflik: Toba melanggar janji dengan membuka rahasia istrinya.' },
    { t: 'What moral value can we learn from the story?', p: ['We should keep our promises.', 'We should eat a lot.', 'We should not go fishing.', 'We should live near a lake.'], j: 0,
      b: 'Bencana terjadi karena Toba melanggar janji.' },
    { t: 'According to the legend, how was Samosir Island formed?', p: ['The hill where Samosir stood became an island in the lake.', 'Samosir built it with his father.', 'It was formed by a volcano.', 'The golden fish created it.'], j: 0,
      b: '"The hill where Samosir stood became an island in the middle of the lake …"' },
    { t: 'What is the purpose of the text?', p: ['To entertain readers with a legend that explains the origin of a place', 'To describe Lake Toba as a tourist attraction', 'To persuade readers to visit North Sumatra', 'To report a recent flood'], j: 0,
      b: 'Narrative (legenda) bertujuan menghibur dan menjelaskan asal-usul tempat.' },
    { t: '"… and told his mother what his father had said." What had his father said?', p: ['That Samosir was the child of a fish', 'That Samosir should climb a hill', 'That lunch was delicious', 'That he wanted to marry again'], j: 0,
      b: '"You are truly the child of a fish!"' }
  ],

  // ---------- Tahap 5: Level UTBK/SNBT (10 Okt 2026) ----------
  // Literasi Bahasa Inggris SNBT: ide pokok, judul, rinci, makna kata, rujukan, inferensi, tujuan dan
  // sikap penulis, organisasi teks, hubungan antarparagraf, memperkuat/melemahkan argumen, penerapan.
  // Pilihan ganda 5 opsi, pilihan ganda kompleks, dan benar/salah.
  'sleep-memory': [
    { t: 'What is the main idea of the text?', p: ['Sleep plays an important role in learning, so students should not sacrifice it before exams.', 'Students should study less in order to sleep more.', 'The hippocampus is the most important part of the brain.', 'Short naps are more useful than a full night of sleep.', 'Staying up late is the best way to remember words.'], j: 0,
      b: 'Paragraf 1 menantang kebiasaan begadang; paragraf 2–4 menjelaskan peran tidur; paragraf 5 memberi saran.' },
    { t: 'According to paragraph 2, what happens to memories during deep sleep?', p: ['They are replayed and gradually moved to the cortex for long-term storage.', 'They are completely deleted from the brain.', 'They are moved from the cortex to the hippocampus.', 'They become weaker and more fragile.', 'They are replaced by new information from the senses.'], j: 0,
      b: '"… the brain replays the experiences of the day and gradually transfers important memories to the cortex …"' },
    { t: 'The word "fragile" in paragraph 2 is closest in meaning to …', p: ['easily damaged', 'very large', 'extremely clear', 'well organized', 'permanently stored'], j: 0,
      b: 'fragile = rapuh, mudah rusak; dikontraskan dengan "stable".' },
    { t: 'In the experiment in paragraph 3, why is one group kept awake?', p: ['To compare their memory with that of the group that slept', 'To make them learn more words', 'To test their reaction time', 'To give them more time to study', 'To show that they were more tired than usual'], j: 0,
      b: 'Kelompok terjaga menjadi pembanding (kontrol) bagi kelompok yang tidur.' },
    { t: 'Which of the following can be inferred from paragraph 4?', p: ['Studying while very tired is often an inefficient use of time.', 'Tired students understand paragraphs faster.', 'Lack of sleep only affects emotions.', 'Students who stay up late always fail exams.', 'Reaction time has nothing to do with sleep.'], j: 0,
      b: '"… the extra hours gained by staying up late are often wasted because the brain is not working efficiently."' },
    { t: '"It also reduces attention …" (paragraph 4). The word "It" refers to …', p: ['lack of sleep', 'memory', 'the brain', 'a short nap', 'the exam'], j: 0,
      b: 'Kalimat sebelumnya: "Lack of sleep does not only weaken memory."' },
    { t: 'The author\'s attitude toward staying up late to study is best described as …', p: ['critical', 'enthusiastic', 'neutral', 'confused', 'indifferent'], j: 0,
      b: 'Penulis menyebut kebiasaan itu "may actually do more harm than good" dan menyarankan cara lain: kritis.' },
    { t: 'Which effects of lack of sleep are mentioned in the text?', p: ['Weaker memory', 'Reduced attention', 'Slower reaction time', 'Difficulty controlling emotions', 'Better concentration'], j: [0, 1, 2, 3],
      b: 'Paragraf 4: melemahkan ingatan, mengurangi perhatian, memperlambat reaksi, emosi sulit dikendalikan.' },
    { t: 'Tentukan benar atau salah berdasarkan teks.', bs: [['The hippocampus acts as a temporary storage space.', true], ['Participants who slept usually remembered fewer words.', false], ['A short afternoon nap may help some memory tasks.', true], ['The author advises students to stop studying before exams.', false]],
      b: 'Yang tidur mengingat lebih banyak kata; penulis menyarankan belajar lebih cerdas, bukan berhenti belajar.' },
    { t: 'Which of the following, if true, would most WEAKEN the main claim of the text?', p: ['New studies find that people kept awake remember as many words as those who sleep.', 'Some students enjoy studying at night.', 'Many students drink coffee before exams.', 'The cortex is larger than the hippocampus.', 'Some exams are held in the afternoon.'], j: 0,
      b: 'Klaim utama: tidur membantu ingatan. Temuan bahwa yang terjaga mengingat sama banyak langsung melemahkannya.' },
    { t: 'Which advice best reflects the conclusion of the text?', p: ['Revise a little every day and keep a regular sleep schedule.', 'Study all night before the exam to save time.', 'Sleep all day before the exam.', 'Avoid studying in groups.', 'Only study in the afternoon.'], j: 0,
      b: '"Spreading revision over several days and protecting a regular sleep schedule …"' },
    { t: 'How does the author organize the text?', p: ['A common belief is challenged, explained with research, and followed by advice.', 'A story is told in chronological order.', 'Two opinions are compared without a conclusion.', 'A procedure is described step by step.', 'A problem is mentioned but no solution is given.'], j: 0,
      b: 'Keyakinan umum (begadang) → penjelasan dan penelitian → akibat → saran.' },
    { t: 'Which statements would the author most likely agree with?', p: ['Good sleep is part of good exam preparation.', 'Studying smarter is more useful than studying longer while exhausted.', 'Memories are stored permanently as soon as we see something.', 'Sleep is a waste of valuable study time.'], j: [0, 1],
      b: 'Ingatan baru mula-mula rapuh; tidur bukan pemborosan waktu, melainkan bagian dari belajar.' },
    { t: 'Which is the best title for the text?', p: ['Sleep: The Hidden Partner of Learning', 'How to Stay Awake All Night', 'The Danger of Afternoon Naps', 'Why Exams Should Be Cancelled', 'The Structure of the Human Eye'], j: 0,
      b: 'Judul terbaik mencakup gagasan utama: tidur dan belajar.' }
  ],
  'urban-heat': [
    { t: 'What is the text mainly about?', p: ['The causes, effects, and possible solutions of the urban heat island effect', 'The history of Jakarta, Surabaya, and Medan', 'How air conditioners are produced', 'Why people prefer living in the countryside', 'The best materials for building roads'], j: 0,
      b: 'Paragraf 2 penyebab, paragraf 3 akibat, paragraf 4 solusi, paragraf 5 penutup.' },
    { t: 'According to paragraph 2, why do cities become hotter than the countryside?', p: ['City materials absorb heat, and green areas are replaced by buildings.', 'Cities are closer to the sun.', 'There are more rivers in cities.', 'People in cities do not use fans.', 'The countryside has more factories.'], j: 0,
      b: 'Aspal, beton, atap gelap menyerap panas; pohon dan lapangan diganti bangunan; ditambah panas kendaraan dan AC.' },
    { t: 'The word "release" in paragraph 2 is closest in meaning to …', p: ['give off', 'keep', 'destroy', 'measure', 'reflect'], j: 0,
      b: 'release the heat = melepaskan panas (give off).' },
    { t: '"This, in turn, leads to more fossil fuels being burned …" (paragraph 3). The word "This" refers to …', p: ['the increased demand for electricity', 'extreme heat', 'the countryside', 'planting trees', 'white rooftops'], j: 0,
      b: 'Kalimat sebelumnya: suhu tinggi meningkatkan kebutuhan listrik.' },
    { t: 'Which groups are especially at risk from extreme heat?', p: ['Elderly people', 'Young children', 'Outdoor workers', 'Urban planners', 'Factory owners'], j: [0, 1, 2],
      b: '"… particularly for elderly people, young children, and outdoor workers."' },
    { t: 'Why does the author mention white rooftops?', p: ['As an example of a way to reduce absorbed heat', 'To show that white is a popular colour', 'To explain why buildings are expensive', 'To prove that rooftops cause floods', 'To describe traditional houses'], j: 0,
      b: '"… paint rooftops white … so that less heat is absorbed."' },
    { t: 'What is the function of "Admittedly" at the beginning of the last paragraph?', p: ['To acknowledge a weakness before presenting a counterargument', 'To introduce a new example', 'To summarize the whole text', 'To give a definition', 'To describe a sequence of events'], j: 0,
      b: 'Admittedly = memang (harus diakui): penulis mengakui biaya solusi, lalu membantah dengan "Nevertheless …".' },
    { t: 'Which of the following can be inferred from the text?', p: ['A city with many parks is likely to be cooler than one with few parks.', 'The countryside is always hotter than the city at night.', 'Urban heat has no connection with climate change.', 'Air conditioners are the best long-term solution.', 'Cities will stop growing in the future.'], j: 0,
      b: 'Taman dan pohon menurunkan suhu setempat (paragraf 4).' },
    { t: 'Tentukan benar atau salah berdasarkan teks.', bs: [['Dark rooftops release heat slowly at night.', true], ['The author thinks the solutions are free and easy.', false], ['Higher temperatures increase the demand for electricity.', true], ['Trees cool the air partly by releasing water vapour.', true]],
      b: 'Solusi membutuhkan biaya, lahan, dan komitmen jangka panjang (paragraf 5).' },
    { t: 'The author\'s main purpose in the last paragraph is to …', p: ['argue that acting now is worthwhile despite the costs', 'list the costs of building parks', 'describe the weather of the next generation', 'criticize urban planners', 'explain how wind flows'], j: 0,
      b: '"… the cost of doing nothing will be far greater."' },
    { t: 'A city government wants to reduce urban heat with a limited budget. Based on the text, which action is most relevant?', p: ['Planting trees along busy streets', 'Building more asphalt parking lots', 'Giving free air conditioners to every family', 'Replacing parks with shopping centres', 'Painting rooftops black'], j: 0,
      b: 'Menanam pohon disebut menurunkan suhu; pilihan lain justru menambah panas.' },
    { t: 'Which statement best describes the relationship between paragraph 3 and paragraph 4?', p: ['Paragraph 3 presents problems, and paragraph 4 offers solutions.', 'Paragraph 4 gives examples of the causes in paragraph 3.', 'Paragraph 4 repeats the ideas of paragraph 3.', 'Paragraph 3 disagrees with paragraph 4.', 'Both paragraphs describe the causes of urban heat.'], j: 0,
      b: 'Paragraf 3 akibat (masalah), paragraf 4 dibuka "Fortunately …" dengan solusi.' },
    { t: 'Which causes of the urban heat island effect are mentioned in the text?', p: ['Asphalt and concrete absorb sunlight.', 'Trees and fields are replaced by buildings.', 'Cars and air conditioners produce heat.', 'There is too much rain in cities.'], j: [0, 1, 2],
      b: 'Semua di paragraf 2; hujan tidak disebut.' },
    { t: 'The word "liveable" in the last paragraph is closest in meaning to …', p: ['suitable and pleasant to live in', 'very crowded', 'easy to build', 'cheap to visit', 'full of factories'], j: 0,
      b: 'liveable = layak huni.' }
  ],
  'ai-classroom': [
    { t: 'What is the text mainly about?', p: ['The debate over AI in schools and a possible middle way', 'How to build an AI program', 'The history of calculators', 'Why teachers should be replaced by AI', 'How students can write essays faster'], j: 0,
      b: 'Teks discussion: pendukung, pengkritik, pendekatan seimbang, kesimpulan.' },
    { t: 'According to supporters, how can AI help shy students?', p: ['They can ask an AI assistant questions as many times as needed.', 'They can avoid going to school.', 'They can get higher grades automatically.', 'They can talk to other students online.', 'They can skip difficult lessons.'], j: 0,
      b: '"A student who is too shy … can ask an AI assistant as many times as needed …"' },
    { t: 'The word "sparked" in paragraph 1 is closest in meaning to …', p: ['started', 'ended', 'hidden', 'avoided', 'calmed'], j: 0,
      b: 'sparked a debate = memicu perdebatan.' },
    { t: 'Which risks of AI are mentioned by critics?', p: ['Students may copy answers without learning.', 'Critical thinking may become weaker.', 'AI may give wrong information that sounds convincing.', 'AI makes phones more expensive.', 'Teachers will have no time for students.'], j: [0, 1, 2],
      b: 'Paragraf 3: menyalin jawaban, melemahnya berpikir kritis, informasi keliru yang meyakinkan.' },
    { t: '"… and students who trust them blindly may not notice the mistakes." The word "them" refers to …', p: ['AI tools', 'students', 'mistakes', 'teachers', 'assignments'], j: 0,
      b: 'them = AI tools yang kadang menghasilkan informasi keliru.' },
    { t: 'Why does the author mention the calculator in the last paragraph?', p: ['To show that a new tool can change, rather than destroy, what students learn', 'To argue that calculators are better than AI', 'To explain how calculators work', 'To suggest that mathematics is no longer important', 'To compare the prices of different tools'], j: 0,
      b: 'Analogi: kalkulator tidak membuat pelajaran matematika tak berguna, tetapi mengubah apa yang dipelajari.' },
    { t: 'What is the author\'s position on AI in schools?', p: ['AI should be used wisely and responsibly, not banned.', 'AI should be completely banned.', 'AI should replace teachers.', 'AI is useless for students.', 'The author has no opinion.'], j: 0,
      b: 'Paragraf terakhir: sekolah yang menyiapkan siswa memakai AI dengan bijak memberi keunggulan.' },
    { t: 'Tentukan benar atau salah berdasarkan teks.', bs: [['AI tools are only available to rich students.', false], ['AI can offer more challenging tasks to students who are ahead.', true], ['Educators who want a balanced approach suggest banning AI.', false], ['Oral presentations can help show what students truly know.', true]],
      b: 'AI tersedia gratis bagi siapa saja dengan ponsel; pendekatan seimbang justru "Rather than banning AI".' },
    { t: 'Which assessment best fits the "balanced approach" in paragraph 4?', p: ['Students use AI to brainstorm, then explain their essay orally in their own words.', 'Students submit AI-written essays without reading them.', 'Students are forbidden to use any technology at home.', 'Teachers let AI grade all exams without checking.', 'Students copy answers from classmates.'], j: 0,
      b: 'AI boleh untuk mencari ide, tetapi siswa tetap menjelaskan penalarannya sendiri (penerapan).' },
    { t: 'Which of the following, if true, would most STRENGTHEN the critics\' argument?', p: ['A study finds that students who rely on AI for homework score lower on tests without AI.', 'Many students enjoy using AI tools.', 'AI tools are becoming cheaper.', 'Teachers use AI to prepare exercises.', 'Some AI tools can explain concepts in many languages.'], j: 0,
      b: 'Pengkritik khawatir siswa tidak benar-benar belajar; nilai lebih rendah tanpa AI mendukung kekhawatiran itu.' },
    { t: 'How is the text organized?', p: ['Background – arguments for – arguments against – a balanced solution – conclusion', 'A story told in chronological order', 'Steps to use an AI tool', 'A description of a computer', 'A list of AI products and prices'], j: 0,
      b: 'Lima paragraf: latar, pendukung, pengkritik, jalan tengah, kesimpulan.' },
    { t: 'The word "Ultimately" in the last paragraph signals …', p: ['a final conclusion', 'an example', 'a contrast', 'a cause', 'a time in the past'], j: 0,
      b: 'Ultimately = pada akhirnya; menandai kesimpulan.' },
    { t: 'It can be inferred that the author believes future students will …', p: ['live in a world where AI is common', 'never use AI', 'not need to learn mathematics', 'stop going to school', 'only learn through oral exams'], j: 0,
      b: '"… in a world where such technology is everywhere."' },
    { t: 'According to the text, which are possible benefits of AI?', p: ['Personal tutoring at any time', 'Explanations adjusted to the student\'s level', 'Saving teachers\' time on routine work', 'Guaranteeing that all information is correct'], j: [0, 1, 2],
      b: 'Paragraf 2. AI justru kadang memberi informasi keliru (paragraf 3).' }
  ],
  'spice-trade': [
    { t: 'What is the main topic of the text?', p: ['The history of the nutmeg trade in the Banda Islands and its human cost', 'How to grow nutmeg trees', 'The geography of Maluku province', 'Why nutmeg is cheap today', 'The life of Portuguese explorers'], j: 0,
      b: 'Teks menelusuri perdagangan pala dari Banda sampai penaklukan Belanda dan pelajarannya.' },
    { t: 'Why were the Banda Islands so valuable five hundred years ago?', p: ['They were the only place where nutmeg trees grew.', 'They had large gold mines.', 'They were the capital of Europe.', 'They had the biggest ports in Asia.', 'They produced the best rice.'], j: 0,
      b: '"… the only place in the world where nutmeg trees grew."' },
    { t: 'According to paragraph 2, why was nutmeg so expensive by the time it reached Venice?', p: ['It passed through a long chain of traders, and its price increased many times.', 'European kings controlled the price.', 'It was carried by air.', 'It was grown in Venice.', 'It was mixed with gold.'], j: 0,
      b: 'Rantai pedagang yang panjang membuat harganya naik berkali-kali.' },
    { t: 'The word "precious" in paragraph 2 is closest in meaning to …', p: ['valuable', 'dangerous', 'ordinary', 'heavy', 'fresh'], j: 0,
      b: 'precious = berharga.' },
    { t: 'Which European country reached Maluku first?', p: ['Portugal', 'Spain', 'England', 'The Netherlands', 'Italy'], j: 0,
      b: '"The Portuguese reached Maluku first, followed by the Spanish, the English, and the Dutch."' },
    { t: '"Each wanted to control the spice trade and the enormous profits it promised." The word "it" refers to …', p: ['the spice trade', 'Maluku', 'the sea route', 'each country', 'the Dutch'], j: 0,
      b: 'Keuntungan besar yang dijanjikan perdagangan rempah.' },
    { t: 'What happened when the people of Banda refused to sell their nutmeg only to the Dutch?', p: ['The company attacked the islands.', 'The Dutch paid them more money.', 'The Portuguese protected them.', 'They became rich merchants.', 'Nutmeg trees stopped growing.'], j: 0,
      b: '"… the company attacked the islands."' },
    { t: 'Which statements describe the consequences of the Dutch attack?', p: ['Thousands of Bandanese were killed or forced to leave.', 'The land was given to Dutch planters.', 'Enslaved workers were used on the plantations.', 'Nutmeg became cheap immediately.', 'The Bandanese took control of the trade.'], j: [0, 1, 2],
      b: 'Paragraf 4. Pala menjadi murah baru di masa kini, bukan langsung sesudah penyerangan.' },
    { t: 'Tentukan benar atau salah berdasarkan teks.', bs: [['Europeans knew exactly where nutmeg came from before the end of the fifteenth century.', false], ['Arab and Indian merchants were part of the spice trade chain.', true], ['Competition among European countries was always peaceful.', false], ['Nutmeg can be found in almost any kitchen today.', true]],
      b: 'Orang Eropa hampir tidak tahu asal rempah; persaingan sering berubah menjadi kekerasan.' },
    { t: 'The author\'s tone in paragraph 4 can best be described as …', p: ['critical and serious', 'humorous', 'cheerful', 'neutral and uninterested', 'admiring'], j: 0,
      b: '"It was one of the darkest chapters …": nada serius dan kritis terhadap kekejaman itu.' },
    { t: 'What lesson does the author want readers to take from the last paragraph?', p: ['Ordinary products may have histories shaped by the pursuit of wealth and human suffering.', 'Nutmeg should be more expensive.', 'Explorers were always heroes.', 'Spices are bad for our health.', 'Islands are not important in history.'], j: 0,
      b: '"… ordinary products can have extraordinary histories … at a terrible human cost."' },
    { t: 'Which of the following can be inferred from the text?', p: ['Before the Europeans arrived, Indonesian sailors were already part of international trade.', 'Europeans planted the first nutmeg trees in Banda.', 'The Dutch were the first Europeans in Maluku.', 'Nutmeg was never sold in India.', 'The Banda Islands are in western Indonesia.'], j: 0,
      b: 'Pelaut Indonesia membawa rempah ke Malaysia dan India jauh sebelum penjelajah Eropa datang.' },
    { t: 'How is the information in paragraphs 2 to 4 mainly organized?', p: ['In chronological order', 'From the least to the most important', 'As a comparison of two countries', 'As a list of definitions', 'As problem and solution'], j: 0,
      b: 'For centuries → end of the fifteenth century → early seventeenth century: urutan waktu.' },
    { t: 'Which is the best title for the text?', p: ['Nutmeg: A Small Spice with a Dark History', 'How to Cook with Spices', 'The Beauty of Maluku Beaches', 'European Kings and Queens', 'A Guide to Modern Trade'], j: 0,
      b: 'Judul itu mencakup pala, nilai pentingnya, dan sejarah kelamnya.' }
  ]
};

/* ---------- Latihan bertahap bacaan (9 Okt 2026) ----------
   KATA_BACAAN: kata penting tiap bacaan [kata seperti tertulis di teks, arti dalam konteks].
   SOAL_BS: pernyataan benar/salah [pernyataan, benar?, penjelasan].
   Sub level Pemahaman mengambil 10 soal acak dari SOAL + SOAL_BS bacaan itu. */
window.KATA_BACAAN = {
  'hello-budi': [['name', 'nama'], ['fifteen', 'lima belas'], ['live', 'tinggal'], ['family', 'keluarga'], ['student', 'pelajar'], ['football', 'sepak bola'], ['music', 'musik'], ['meet', 'bertemu']],
  'my-family': [['family', 'keluarga'], ['father', 'ayah'], ['teacher', 'guru'], ['mother', 'ibu'], ['nurse', 'perawat'], ['brother', 'saudara laki-laki'], ['sister', 'saudara perempuan'], ['baby', 'bayi'], ['small', 'kecil'], ['love', 'menyayangi']],
  'my-school': [['student', 'pelajar'], ['senior high school', 'SMA'], ['big', 'besar'], ['clean', 'bersih'], ['green', 'hijau, asri'], ['trees', 'pohon-pohon'], ['yard', 'halaman'], ['walk', 'berjalan kaki'], ['best friend', 'sahabat'], ['countries', 'negara-negara']],
  'my-day': [['wake up', 'bangun tidur'], ['early', 'pagi-pagi, awal'], ['take a bath', 'mandi'], ['breakfast', 'sarapan'], ['then', 'lalu'], ['afternoon', 'sore, siang'], ['evening', 'malam, petang'], ['homework', 'PR'], ['after that', 'setelah itu'], ['go to bed', 'pergi tidur']],
  'best-friend': [['tall', 'tinggi'], ['glasses', 'kacamata'], ['kind', 'baik hati'], ['friendly', 'ramah'], ['difficulty', 'kesulitan'], ['drawing', 'menggambar'], ['weekend', 'akhir pekan'], ['village', 'desa'], ['library', 'perpustakaan'], ['lucky', 'beruntung']],
  'a-rainy-morning': [['heavily', 'deras'], ['woke up', 'bangun'], ['late', 'terlambat, kesiangan'], ['wet', 'basah'], ['puddles', 'genangan air'], ['quickly', 'cepat-cepat'], ['raincoat', 'jas hujan'], ['umbrella', 'payung'], ['arrived', 'tiba'], ['happy', 'senang']],
  'make-tea': [['boil', 'merebus'], ['kettle', 'ketel, cerek'], ['pour', 'menuang'], ['wait', 'menunggu'], ['take out', 'mengeluarkan'], ['spoons', 'sendok'], ['stir', 'mengaduk'], ['slice', 'irisan'], ['finally', 'akhirnya'], ['warm', 'hangat']],
  'announcement': [['attention', 'perhatian'], ['announcement', 'pengumuman'], ['hold', 'mengadakan'], ['broom', 'sapu'], ['dustpan', 'pengki'], ['own', 'sendiri'], ['hall', 'aula'], ['prize', 'hadiah'], ['headmaster', 'kepala sekolah'], ['sports uniform', 'seragam olahraga']],
  'the-farmer': [['village', 'desa'], ['mountains', 'pegunungan'], ['sunrise', 'matahari terbit'], ['rice field', 'sawah'], ['removes', 'mencabut, membuang'], ['weeds', 'rumput liar'], ['weather', 'cuaca'], ['gives up', 'menyerah'], ['patience', 'kesabaran'], ['harvest', 'panen']],
  'malin-kundang': [['widow', 'janda'], ['grew up', 'tumbuh dewasa'], ['sail', 'berlayar'], ['merchant', 'saudagar'], ['married', 'menikahi'], ['ashamed', 'malu'], ['heartbroken', 'sangat sedih, patah hati'], ['prayed', 'berdoa'], ['storm', 'badai'], ['stone', 'batu']],
  'mobile-phones': [['almost', 'hampir'], ['information', 'informasi'], ['contact', 'menghubungi'], ['skills', 'keterampilan'], ['on the other hand', 'di sisi lain'], ['tired', 'lelah'], ['therefore', 'karena itu'], ['wisely', 'dengan bijak'], ['time limit', 'batas waktu'], ['put the phone away', 'menyingkirkan ponsel']],
  'plastic-waste': [['waste', 'sampah'], ['serious', 'serius'], ['oceans', 'lautan'], ['break down', 'terurai'], ['harms', 'membahayakan'], ['tiny', 'sangat kecil'], ['reduce', 'mengurangi'], ['single-use', 'sekali pakai'], ['separate', 'memisahkan'], ['difference', 'perubahan, perbedaan']],
  'school-uniforms': [['debated', 'diperdebatkan'], ['equality', 'kesetaraan'], ['pressure', 'tekanan'], ['recognize', 'mengenali'], ['opponents', 'pihak yang menentang'], ['personality', 'kepribadian'], ['identity', 'jati diri'], ['expensive', 'mahal'], ['uncomfortable', 'tidak nyaman'], ['affordable', 'terjangkau']],
  'reading-habit': [['valuable', 'berharga'], ['habit', 'kebiasaan'], ['unfortunately', 'sayangnya'], ['regularly', 'secara rutin'], ['concentrate', 'berkonsentrasi'], ['requires', 'membutuhkan'], ['creative', 'kreatif'], ['imagine', 'membayangkan'], ['borrow', 'meminjam'], ['nation', 'bangsa']],
  'river-cleanup': [['volunteers', 'relawan'], ['organized', 'diselenggarakan'], ['awareness', 'kesadaran'], ['collected', 'mengumpulkan'], ['wrappers', 'bungkus'], ['households', 'rumah tangga'], ['habits', 'kebiasaan'], ['responsible', 'bertanggung jawab'], ['admitted', 'mengaku'], ['similar', 'serupa']],
  'email-science-fair': [['behalf', 'atas nama'], ['permission', 'izin'], ['purpose', 'tujuan'], ['registered', 'mendaftar'], ['motivate', 'mendorong, memotivasi'], ['request', 'mengajukan, meminta'], ['judges', 'juri'], ['grateful', 'berterima kasih'], ['budget', 'anggaran'], ['attached', 'melampirkan']],
  'komodo': [['lizard', 'kadal'], ['rough', 'kasar'], ['claws', 'cakar'], ['detect', 'mendeteksi'], ['prey', 'mangsa'], ['saliva', 'air liur'], ['bury', 'mengubur'], ['hatch', 'menetas'], ['endangered', 'terancam punah'], ['habitat', 'habitat, tempat hidup']],
  'lake-toba': [['caught', 'menangkap'], ['surprise', 'keterkejutan'], ['condition', 'syarat'], ['promised', 'berjanji'], ['secret', 'rahasia'], ['empty', 'kosong'], ['heartbroken', 'sangat sedih'], ['disappeared', 'menghilang'], ['flooded', 'membanjiri'], ['valley', 'lembah']],
  'sleep-memory': [['essential', 'sangat penting'], ['temporary', 'sementara'], ['gradually', 'secara bertahap'], ['fragile', 'rapuh'], ['participants', 'peserta'], ['significantly', 'jauh, secara berarti'], ['nap', 'tidur sebentar'], ['Consequently', 'akibatnya'], ['efficiently', 'secara efisien'], ['exhausting', 'melelahkan']],
  'urban-heat': [['phenomenon', 'fenomena'], ['noticeable', 'cukup terasa'], ['absorb', 'menyerap'], ['release', 'melepaskan'], ['consequences', 'akibat'], ['demand', 'kebutuhan, permintaan'], ['elderly', 'lanjut usia'], ['shade', 'keteduhan'], ['Admittedly', 'memang (harus diakui)'], ['liveable', 'layak huni']],
  'ai-classroom': [['sparked', 'memicu'], ['heated', 'sengit'], ['tutor', 'guru pribadi'], ['adjust', 'menyesuaikan'], ['struggling', 'kesulitan'], ['convincing', 'meyakinkan'], ['blindly', 'begitu saja, tanpa berpikir'], ['balanced', 'seimbang'], ['brainstorm', 'mencari ide'], ['advantage', 'keunggulan']],
  'spice-trade': [['prized', 'dihargai'], ['merchants', 'saudagar'], ['precious', 'berharga'], ['explorers', 'penjelajah'], ['source', 'sumber'], ['enormous', 'sangat besar'], ['profits', 'keuntungan'], ['violent', 'penuh kekerasan'], ['refused', 'menolak'], ['extraordinary', 'luar biasa']]
};
window.SOAL_BS = {
  'hello-budi': [
    ['Budi is fifteen years old.', true, '"I am fifteen years old."'],
    ['Budi lives in Bandung.', false, 'Budi tinggal di Soreang.'],
    ['Budi likes football.', true, '"I like football and music."'],
    ['Budi is a teacher.', false, 'Budi seorang pelajar (student).'],
    ['Budi lives alone.', false, 'Budi tinggal bersama keluarganya.'],
    ['Budi likes music.', true, '"I like football and music."']
  ],
  'my-family': [
    ['The father is a teacher.', true, '"My father is a teacher."'],
    ['The mother is a doctor.', false, 'Ibunya seorang perawat (nurse).'],
    ['The writer has two brothers.', false, 'Penulis punya satu saudara laki-laki dan satu saudara perempuan.'],
    ['The sister is a baby.', true, '"My sister is a baby."'],
    ['The family lives in a big house.', false, 'Mereka tinggal di rumah kecil (a small house).'],
    ['The brother is ten years old.', true, '"My brother is ten years old."']
  ],
  'my-school': [
    ['Rina is a senior high school student.', true, '"I am a student at a senior high school in Soreang."'],
    ['Rina\'s school is very big.', false, 'Sekolahnya tidak terlalu besar.'],
    ['There are many trees in the school yard.', true, '"There are many trees in the yard."'],
    ['Rina goes to school by bus.', false, 'Rina berjalan kaki bersama sahabatnya.'],
    ['Rina studies English, mathematics, and science.', true, '"We study English, mathematics, and science."'],
    ['Rina likes English because she wants to be a teacher.', false, 'Karena ia ingin berbicara dengan orang dari negara lain.']
  ],
  'my-day': [
    ['The writer wakes up late.', false, 'Penulis bangun pagi-pagi (early).'],
    ['The writer goes to school with the father.', true, '"Then I go to school with my father."'],
    ['The writer does homework in the morning.', false, 'PR dikerjakan pada malam hari (in the evening).'],
    ['The writer watches television after doing homework.', true, '"After that, I watch television …"'],
    ['The writer eats breakfast alone.', false, 'Sarapan bersama keluarga.'],
    ['The writer goes home in the afternoon.', true, '"I go home in the afternoon."']
  ],
  'best-friend': [
    ['Sinta always wears glasses.', true, '"She always wears glasses."'],
    ['Sinta has short hair.', false, 'Rambutnya panjang dan hitam.'],
    ['Sinta often helps the writer with lessons.', true, '"She often helps me when I have difficulty with my lessons."'],
    ['They ride their bicycles every day.', false, 'Mereka bersepeda setiap akhir pekan (every weekend).'],
    ['Sinta is good at drawing.', true, '"She is good at drawing and singing."'],
    ['The writer thinks Sinta is unfriendly.', false, 'Sinta sangat baik dan ramah (kind and friendly).']
  ],
  'a-rainy-morning': [
    ['Dimas woke up early.', false, 'Dimas bangun kesiangan (woke up late).'],
    ['The street was wet.', true, '"The street was wet and full of puddles."'],
    ['His father gave him an umbrella.', false, 'Ibunya yang memberinya payung.'],
    ['Dimas put on his raincoat.', true, '"… and put on his raincoat."'],
    ['Dimas was late for school.', false, '"… he was happy because he was not late."'],
    ['His shoes were wet when he arrived at school.', true, '"When he arrived at school, his shoes were wet …"']
  ],
  'make-tea': [
    ['You should boil the water first.', true, '"First, boil some water in a kettle."'],
    ['You wait for about ten minutes.', false, 'Sekitar tiga menit (about three minutes).'],
    ['You take out the tea bag after waiting.', true, '"After that, take out the tea bag."'],
    ['Milk must be added to the tea.', false, 'Susu atau lemon boleh ditambahkan bila suka (opsional).'],
    ['You stir the tea after adding sugar.', true, '"Add one or two spoons of sugar and stir it well."'],
    ['The text tells you to drink the tea when it is cold.', false, '"Enjoy it while it is warm!"']
  ],
  'announcement': [
    ['The clean school day is next Friday.', true, '"Next Friday, our school will hold a clean school day."'],
    ['Students must bring a broom, a dustpan, and a plastic bag.', true, '"Please bring a broom, a dustpan, and a plastic bag."'],
    ['Students must come at eight in the morning.', false, 'Pukul tujuh pagi (at seven).'],
    ['The best class will get a prize from the headmaster.', true, '"The best class will get a prize from the headmaster."'],
    ['Students should wear their batik uniform.', false, 'Yang dipakai seragam olahraga (sports uniform).'],
    ['Students will have lunch together after cleaning.', false, 'Mereka sarapan bersama (breakfast) di aula.']
  ],
  'the-farmer': [
    ['Pak Ahmad lives in a big city.', false, 'Ia tinggal di desa kecil dekat pegunungan.'],
    ['He goes to the rice field before sunrise.', true, '"He wakes up before sunrise and goes to his rice field."'],
    ['He removes the weeds in his rice field.', true, '"… removes the weeds …"'],
    ['The weather is always friendly.', false, '"… the weather is not always friendly."'],
    ['Pak Ahmad gives up easily.', false, '"Pak Ahmad never gives up."'],
    ['He talks with other farmers.', true, '"… and talks with other farmers."']
  ],
  'malin-kundang': [
    ['Malin Kundang\'s family was rich.', false, 'Ibunya seorang janda miskin (a poor widow).'],
    ['Malin sailed to another land to find a better life.', true, '"… to sail to another land to find a better life."'],
    ['Malin married a beautiful woman.', true, '"… and married a beautiful woman."'],
    ['Malin was proud of his mother.', false, 'Malin malu (ashamed) terhadap ibunya.'],
    ['A terrible storm came after the mother prayed.', true, '"… the old woman prayed, and a terrible storm came."'],
    ['Malin said that the old woman was his mother.', false, 'Ia berkata bahwa perempuan itu bukan ibunya.']
  ],
  'mobile-phones': [
    ['Phones can help us learn new skills.', true, '"… and learn new skills."'],
    ['The writer says phones are always bad.', false, 'Penulis menyebut manfaat dan dampak buruknya, lalu menyarankan memakai dengan bijak.'],
    ['Some students play games until late at night.', true, '"Some students play games until late at night …"'],
    ['The writer suggests setting a time limit.', true, '"We can set a time limit …"'],
    ['The writer suggests using the phone while studying.', false, 'Disarankan menyingkirkan ponsel saat belajar.'],
    ['Phones can take too much of our time.', true, '"… they can also take too much of our time."']
  ],
  'plastic-waste': [
    ['Plastic breaks down in a few days.', false, 'Plastik butuh ratusan tahun untuk terurai.'],
    ['Plastic can harm fish and birds.', true, '"… it harms fish, birds, and other animals."'],
    ['Tiny pieces of plastic can enter our food.', true, '"… tiny pieces of plastic can enter our food and water."'],
    ['The writer suggests using more single-use bottles.', false, 'Disarankan menghindari botol sekali pakai.'],
    ['Separating rubbish can help reduce the problem.', true, '"To reduce this problem, we should … separate our rubbish."'],
    ['The writer believes small actions are useless.', false, 'Tindakan kecil oleh banyak orang dapat membawa perubahan besar.']
  ],
  'school-uniforms': [
    ['Supporters say uniforms create a sense of equality.', true, '"Supporters argue that uniforms create a sense of equality among students."'],
    ['Opponents believe uniforms help students express their personality.', false, 'Penentang berpendapat seragam membatasi ekspresi kepribadian.'],
    ['Uniforms help security guards recognize students.', true, '"… uniforms help teachers and security guards recognize students easily …"'],
    ['The writer concludes that only one side is right.', false, '"In conclusion, both sides have reasonable arguments."'],
    ['Some students complain that uniforms are uncomfortable in hot weather.', true, '"… uncomfortable, particularly in hot weather."'],
    ['The writer suggests that students wear their own clothes every day.', false, 'Usulnya seragam sederhana dan terjangkau, ditambah beberapa hari bebas tiap bulan.']
  ],
  'reading-habit': [
    ['The writer thinks reading should be a daily habit.', true, '"… every student should make reading a daily habit …"'],
    ['Short videos help us concentrate for a long time.', false, 'Buku, bukan video pendek, yang melatih fokus dalam waktu lama.'],
    ['Reading can help us relax.', true, '"… which helps us relax …"'],
    ['The writer says reading must be expensive.', false, '"Reading does not have to be expensive or difficult."'],
    ['We can borrow books from the school library.', true, '"We can borrow books from the school library …"'],
    ['The writer gives three reasons why students should read.', true, 'First, Second, Third: tiga alasan.']
  ],
  'river-cleanup': [
    ['More than two hundred students joined the event.', true, '"More than two hundred students from five high schools …"'],
    ['The event started in the afternoon.', false, 'Relawan mulai bekerja pukul tujuh pagi.'],
    ['The volunteers wore gloves and boots.', true, '"Wearing gloves and boots, they collected …"'],
    ['The head of the group thinks one clean-up a year is enough.', false, '"… cleaning the river once a year is not enough."'],
    ['One student was shocked by the amount of rubbish.', true, '"One of them admitted that she was shocked …"'],
    ['Only one school took part in the event.', false, 'Siswa dari lima SMA.']
  ],
  'email-science-fair': [
    ['The science fair is planned for a Saturday.', true, '"… planned for Saturday, the fifteenth of November …"'],
    ['The fair will be held next year.', false, 'Bulan depan (next month).'],
    ['Some projects are small solar-powered cars.', true, '"… to small solar-powered cars."'],
    ['The Student Council asks for three science teachers as judges.', false, 'Dua guru sains.'],
    ['Raka has attached a list of committee members.', true, '"… a list of the committee members, which I have attached …"'],
    ['Raka asks Mrs Lestari to contact the parents.', false, 'Raka meminta Bu Lestari menghubunginya bila ada pertanyaan.']
  ],
  'komodo': [
    ['The Komodo dragon is the largest living lizard in the world.', true, 'Kalimat pertama teks.'],
    ['Komodo dragons have smooth green skin.', false, 'Kulitnya abu-abu dan kasar (rough grey skin).'],
    ['A Komodo dragon can smell a dead animal from several kilometres away.', true, '"… can detect a dead animal from several kilometres away."'],
    ['Komodo dragons usually chase their prey for a long distance.', false, 'Mereka menunggu diam-diam lalu menyerang tiba-tiba.'],
    ['Female Komodo dragons bury their eggs in the ground.', true, '"… bury them in the ground."'],
    ['Komodo National Park is a World Heritage Site.', true, '"… which is now a World Heritage Site."']
  ],
  'lake-toba': [
    ['Toba caught a big golden fish in a river.', true, '"… he caught a big golden fish."'],
    ['The woman had no condition for marrying Toba.', false, '"… but on one condition."'],
    ['Samosir was always hungry.', true, '"… but he was always hungry."'],
    ['Samosir gave all the food to his father.', false, 'Ia memakan sebagian besar makanannya.'],
    ['The mother disappeared before the heavy rain began.', true, '"Then, she disappeared, and a heavy rain began to fall."'],
    ['In the story, Lake Toba was formed by a flood.', true, '"The flood formed a large lake …"']
  ],
  'sleep-memory': [
    ['A growing body of research supports staying up late to study.', false, 'Penelitian menunjukkan begadang justru lebih banyak merugikan.'],
    ['The cortex is where memories can be kept for a long time.', true, '"… to the cortex, where they can be kept for a long time."'],
    ['In the typical study, both groups learned the same list of words.', true, '"… two groups of participants learn the same list of words."'],
    ['Lack of sleep improves reaction time.', false, 'Kurang tidur memperlambat waktu reaksi.'],
    ['A tired student may read the same paragraph several times without understanding it.', true, 'Paragraf 4.'],
    ['The author suggests spreading revision over several days.', true, 'Paragraf 5.']
  ],
  'urban-heat': [
    ['The centre of a city can be several degrees warmer than the countryside.', true, 'Kalimat pertama teks.'],
    ['The urban heat island effect is becoming less important.', false, '"… is becoming a serious concern …"'],
    ['Concrete buildings absorb sunlight during the day.', true, 'Paragraf 2.'],
    ['Extreme heat is dangerous only for young adults.', false, 'Terutama bagi lansia, anak kecil, dan pekerja lapangan.'],
    ['Some cities cover their rooftops with plants.', true, '"… or to cover them with plants …"'],
    ['Experts say doing nothing will cost less.', false, '"… the cost of doing nothing will be far greater."']
  ],
  'ai-classroom': [
    ['AI tools are freely available to anyone with a phone.', true, 'Paragraf 1.'],
    ['All educators agree that AI should be banned.', false, 'Ada pendukung, pengkritik, dan yang mengusulkan jalan tengah.'],
    ['AI tools always produce correct information.', false, '"… information that sounds convincing but is completely wrong …"'],
    ['Some educators suggest teaching students to use AI responsibly.', true, 'Paragraf 4.'],
    ['The author compares AI with a calculator.', true, 'Paragraf 5.'],
    ['According to critics, copying AI answers helps students learn.', false, 'Menyalin jawaban membuat siswa tidak benar-benar belajar.']
  ],
  'spice-trade': [
    ['Nutmeg trees grew only in the Banda Islands.', true, '"… the only place in the world where nutmeg trees grew."'],
    ['A small bag of nutmeg was cheap in Europe.', false, 'Bisa lebih mahal daripada sebuah rumah.'],
    ['The Spanish reached Maluku before the Portuguese.', false, 'Portugis tiba lebih dulu.'],
    ['The Dutch East India Company wanted complete control of nutmeg production.', true, 'Paragraf 4.'],
    ['Local people suffered from the competition among Europeans.', true, '"… and local people suffered the most."'],
    ['The author thinks the history of Banda is unimportant.', false, 'Penulis menyebutnya salah satu babak paling kelam dan mengambil pelajaran darinya.']
  ]
};


/* ---------- Sub level 6–10 bacaan TKA (Tahap 4) dan UTBK/SNBT (Tahap 5), 10 Okt 2026 ----------
   IDE_POKOK: ide pokok tiap paragraf, urut sesuai paragraf teks (dipisah baris kosong); null = paragraf
     bukan isi (salam/penutup surat), tidak dinomori. Pengecoh soal ide pokok = ide paragraf lain.
   RUJUKAN: [kata rujukan, potongan teks yang memuatnya (persis), yang dirujuk, [pengecoh]].
   SINONIM: [kata seperti tertulis di teks, padanan dalam konteks, [pengecoh]].
   TKA: 3 pengecoh (4 opsi); UTBK/SNBT: 4 pengecoh (5 opsi).
   SOAL_UJIAN: soal tambahan bertanda jenis k (inferensi, tujuan, evaluasi, sikap); digabung ke SOAL di bawah. */
window.IDE_POKOK = {
  'school-uniforms': [
    'People have different opinions about whether students should wear school uniforms.',
    'Supporters believe uniforms bring equality, save time, and make schools safer.',
    'Opponents argue that uniforms limit self-expression, cost money, and can be uncomfortable.',
    'Both sides have good reasons, so a simple uniform with some free-dress days may be best.'],
  'reading-habit': [
    'The writer believes every student should read every day.',
    'Reading increases our knowledge and vocabulary.',
    'Reading trains the brain to focus for a long time.',
    'Reading helps us relax and become more creative.',
    'Reading is easy and cheap to start, so students should begin now.'],
  'river-cleanup': [
    'Students joined a clean-up of the Citarum River to mark World Environment Day.',
    'The volunteers collected a huge amount of rubbish, mostly from households.',
    'The organizer says people must change their daily habits, not just clean once a year.',
    'The students enjoyed the event, and the organizers plan to hold it regularly.'],
  'email-science-fair': [null,
    'Raka asks permission to hold a science fair next month and gives its date and time.',
    'The fair will let students show their projects and inspire younger students.',
    'The Student Council asks the school for rooms, judges, and a small budget.',
    'Raka mentions the attached documents and thanks the principal.', null],
  'komodo': [
    'The Komodo dragon is the largest lizard and lives only on a few Indonesian islands.',
    'Komodo dragons have strong bodies and use their tongues to smell.',
    'Komodo dragons eat meat and weaken their prey with harmful saliva.',
    'Young Komodo dragons hatch from eggs and live in trees to stay safe.',
    'Komodo dragons are endangered and are protected in a national park.'],
  'lake-toba': [
    'A young farmer named Toba catches a golden fish that becomes a woman.',
    'The woman marries Toba on the condition that he keeps her secret.',
    'Toba gets angry at his hungry son and reveals the secret.',
    'The mother disappears after the promise is broken, and heavy rain begins.',
    'The flood creates Lake Toba and Samosir Island.'],
  'sleep-memory': [
    'Staying up late to study may be harmful because sleep is essential for learning.',
    'During sleep, the brain moves important memories into long-term storage.',
    'Experiments show that people who sleep remember more than those who stay awake.',
    'Lack of sleep weakens attention, reaction time, and emotional control.',
    'Students should study smarter by spreading their revision and sleeping regularly.'],
  'urban-heat': [
    'Cities are becoming much hotter than the countryside around them.',
    'City materials and the loss of green areas are the main causes of urban heat.',
    'Urban heat increases energy use, pollution, and health risks.',
    'Trees, parks, light-colored roofs, and better street design can cool cities.',
    'These solutions are costly, but doing nothing would cost even more.'],
  'ai-classroom': [
    'AI tools have started a debate about their place in schools.',
    'Supporters say AI can act as a personal tutor and save teachers time.',
    'Critics warn that AI may stop students from really learning and may give wrong information.',
    'Many educators prefer teaching students to use AI responsibly instead of banning it.',
    'Like a calculator, AI is a tool whose value depends on how it is used.'],
  'spice-trade': [
    'The Banda Islands were once extremely valuable because only they grew nutmeg.',
    'Nutmeg reached Europe through many traders, which made it very expensive.',
    'European countries competed violently to control the spice trade.',
    'The Dutch took control of nutmeg by attacking and conquering Banda.',
    'The story shows how ordinary products can have dark and important histories.']
};

window.RUJUKAN = {
  'school-uniforms': [
    ['they', 'Teenagers are developing their identity, and the way they dress', 'teenagers', ['parents', 'teachers', 'uniforms']],
    ['which', 'recognize students easily, which makes the school environment safer', 'helping teachers and guards recognize students easily', ['the school environment', 'fashion trends', 'the morning']],
    ['they', 'but they may also reduce freedom', 'school uniforms', ['parents', 'both sides', 'students']],
    ['their', 'Some students also complain that their uniforms are uncomfortable', "some students'", ["teachers'", "parents'", "schools'"]]],
  'reading-habit': [
    ['it', 'Students who read regularly usually find it easier to understand lessons', 'to understand lessons and express their thoughts', ['reading', 'the book', 'vocabulary']],
    ['This ability', 'This ability to concentrate is very useful', 'focusing on one story or idea for a long time', ['watching short videos', 'solving difficult problems', 'studying for exams']],
    ['which', 'we imagine other places and other lives, which helps us relax', 'imagining other places and other lives', ['other lives', 'stress', 'problems']],
    ['We', 'We can borrow books from the school library', 'students, including the writer and the readers', ['librarians', 'teachers', 'parents']]],
  'river-cleanup': [
    ['It', 'It was held to celebrate World Environment Day', 'the river clean-up event', ['the regency government', 'the Citarum River', 'the environmental group']],
    ['they', 'they collected plastic bottles', 'the volunteers', ['the organizers', 'the households', 'the boots']],
    ['She', 'She explained that people must change their daily habits', 'the head of the environmental group', ['one of the students', 'a teacher', 'a government official']],
    ['them', 'hope that more schools will join them', 'the organizers', ['the students', 'the households', 'the rivers']]],
  'email-science-fair': [
    ['your', 'to ask for your permission', "Mrs Lestari's", ["Raka's", "the parents'", "the judges'"]],
    ['their', 'their projects range from simple water filters', 'the thirty-two groups', ['the teachers', 'the parents', 'the judges']],
    ['which', 'a list of the committee members, which I have attached', 'the schedule and the list of committee members', ['the science fair', 'the classrooms', 'the prizes']],
    ['me', 'please do not hesitate to contact me', 'Raka Pratama', ['Mrs Lestari', 'the science teachers', 'the parents']]],
  'komodo': [
    ['It', 'It is found only on a few islands', 'the Komodo dragon', ['the world', 'eastern Indonesia', 'Flores']],
    ['which', 'a long yellow tongue, which they use to smell the air', 'a long yellow tongue', ['sharp claws', 'rough grey skin', 'a long tail']],
    ['them', 'lay around twenty eggs at a time and bury them', 'the eggs', ['the female dragons', 'young dragons', 'larger dragons']],
    ['they', 'where they are safe from larger dragons', 'young Komodo dragons', ['female dragons', 'the eggs', 'the trees']]],
  'lake-toba': [
    ['she', 'that she had once been a fish', "the woman (Toba's wife)", ['a neighbor', 'Samosir', 'the river']],
    ['him', 'his mother asked him to take lunch', 'Samosir', ['Toba', 'the farmer next door', 'the fish']],
    ['he', 'he ate most of the food', 'Samosir', ['Toba', 'the woman', 'a stranger']],
    ['She', 'She told Samosir to climb the highest hill nearby', "Samosir's mother", ['Toba', 'an old woman in the village', 'a neighbor']]],
  'sleep-memory': [
    ['this habit', 'this habit may actually do more harm than good', 'staying up late to study', ['sleeping early', 'preparing for an exam', 'doing research', 'organizing information']],
    ['which', 'the hippocampus, which acts like a temporary storage space', 'the hippocampus', ['the cortex', 'our senses', 'the information', 'the day']],
    ['ones', 'into stable long-term ones', 'memories', ['experiences', 'stages of sleep', 'senses', 'words']],
    ['those', 'those who slept usually remember significantly more words', 'the participants in the group that slept', ['the words', 'the experiments', 'the researchers', 'the days']],
    ['it', 'it suggests that they should study smarter', 'the evidence about sleep and memory', ['the exam', 'a single night', 'the brain', 'the schedule']]],
  'urban-heat': [
    ['This phenomenon', 'This phenomenon, known as the urban heat island effect', 'a city centre being warmer than the countryside', ['people moving to cities', 'a hot afternoon', 'the growth of Jakarta', 'a serious concern']],
    ['which', 'trees and open fields, which naturally cool the air', 'trees and open fields', ['new buildings', 'dark rooftops', 'the urban environment', 'air conditioners']],
    ['This', 'This, in turn, leads to more fossil fuels being burned', 'the higher demand for electricity', ['extreme heat', 'fans', 'greenhouse gases', 'outdoor workers']],
    ['them', 'or to cover them with plants', 'rooftops', ['cities', 'plants', 'streets', 'buildings']],
    ['they', 'how liveable they are for the next generation', 'cities', ['experts', 'solutions', 'planners', 'generations']]],
  'ai-classroom': [
    ['Their', 'Their arrival has sparked a heated debate', 'AI tools', ['educators', 'phones', 'schools', 'students']],
    ['it', 'that it can act as a personal tutor', 'AI', ['education', 'the student', 'the school', 'a phone']],
    ['they', 'so that they can focus on guiding students personally', 'teachers', ['students', 'AI tools', 'exercises', 'critics']],
    ['this', 'Over time, this could weaken their ability', 'students copying answers produced by AI', ['completing assignments', 'learning something new', 'asking questions', 'using a calculator']],
    ['it', 'its value depends on how it is used', 'AI as a tool', ['mathematics', 'a calculator', 'the world', 'education']]],
  'spice-trade': [
    ['them', 'Indonesian sailors carried them to ports', 'nutmeg and other spices', ['traders', 'Arab merchants', 'the ports', 'Europeans']],
    ['their', 'their price had increased many times', "the spices'", ["Venice's", "the traders'", "the sailors'", "Europe's"]],
    ['it', 'the enormous profits it promised', 'the spice trade', ['Maluku', 'the Dutch', 'the competition', 'the sea route']],
    ['who', 'Dutch planters who used enslaved workers', 'Dutch planters', ['the Bandanese', 'the company', 'enslaved workers', 'the islands']],
    ['It', 'It also shows how the desire for wealth', 'the story of the Banda Islands', ['nutmeg', 'the kitchen', 'the modern world', 'wealth']]]
};

window.SINONIM = {
  'school-uniforms': [
    ['debated', 'discussed', ['ignored', 'celebrated', 'solved']], ['equality', 'fairness', ['wealth', 'discipline', 'fashion']],
    ['recognize', 'identify', ['forget', 'punish', 'avoid']], ['claim', 'state', ['deny', 'doubt', 'hide']],
    ['express', 'show', ['hide', 'buy', 'change']], ['require', 'demand', ['refuse', 'sell', 'forget']],
    ['reasonable', 'sensible', ['strange', 'expensive', 'careless']], ['affordable', 'inexpensive', ['luxurious', 'colorful', 'uncomfortable']]],
  'reading-habit': [
    ['valuable', 'useful', ['cheap', 'boring', 'difficult']], ['develop', 'build', ['lose', 'sell', 'forget']],
    ['regularly', 'often', ['rarely', 'quickly', 'badly']], ['express', 'communicate', ['hide', 'forget', 'delay']],
    ['concentrate', 'focus', ['relax', 'sleep', 'guess']], ['requires', 'needs', ['avoids', 'gives', 'stops']],
    ['imagine', 'picture', ['forget', 'ignore', 'copy']], ['borrow', 'take temporarily', ['buy', 'sell', 'throw away']]],
  'river-cleanup': [
    ['joined', 'took part in', ['left', 'watched', 'cancelled']], ['organized', 'arranged', ['stopped', 'attended', 'criticized']],
    ['celebrate', 'commemorate', ['forget', 'protest', 'replace']], ['awareness', 'understanding', ['anger', 'money', 'pollution']],
    ['collected', 'gathered', ['dropped', 'sold', 'burned']], ['manage', 'handle', ['ignore', 'produce', 'increase']],
    ['admitted', 'confessed', ['refused', 'forgot', 'denied']], ['similar', 'comparable', ['different', 'larger', 'dangerous']]],
  'email-science-fair': [
    ['permission', 'approval', ['payment', 'complaint', 'invitation']], ['purpose', 'aim', ['problem', 'price', 'result']],
    ['registered', 'signed up', ['given up', 'won', 'paid']], ['range', 'vary', ['stop', 'grow', 'fall']],
    ['motivate', 'encourage', ['discourage', 'punish', 'confuse']], ['request', 'ask for', ['refuse', 'offer', 'send']],
    ['grateful', 'thankful', ['angry', 'worried', 'surprised']], ['hesitate', 'pause', ['hurry', 'refuse', 'promise']]],
  'komodo': [
    ['found', 'located', ['lost', 'hidden', 'born']], ['rough', 'coarse', ['smooth', 'soft', 'shiny']],
    ['detect', 'notice', ['ignore', 'attack', 'hide']], ['prey', 'hunted animal', ['owner', 'enemy', 'partner']],
    ['suddenly', 'unexpectedly', ['slowly', 'carefully', 'rarely']], ['harmful', 'dangerous', ['helpful', 'harmless', 'tasty']],
    ['bury', 'cover with soil', ['dig up', 'break', 'throw']], ['endangered', 'at risk of dying out', ['very dangerous', 'growing quickly', 'well protected']]],
  'lake-toba': [
    ['caught', 'captured', ['released', 'sold', 'cooked']], ['condition', 'requirement', ['gift', 'problem', 'reason']],
    ['promised', 'swore', ['refused', 'forgot', 'doubted']], ['truly', 'really', ['never', 'hardly', 'sadly']],
    ['heartbroken', 'deeply sad', ['very angry', 'very proud', 'very tired']], ['nearby', 'close by', ['far away', 'very high', 'behind']],
    ['disappeared', 'vanished', ['appeared', 'returned', 'shouted']], ['flooded', 'covered with water', ['dried up', 'burned', 'cleaned']]],
  'sleep-memory': [
    ['essential', 'crucial', ['optional', 'harmful', 'minor', 'unclear']], ['temporary', 'short-term', ['permanent', 'large', 'hidden', 'damaged']],
    ['gradually', 'slowly over time', ['suddenly', 'rarely', 'completely', 'randomly']], ['fragile', 'easily broken', ['very strong', 'well organized', 'permanent', 'huge']],
    ['typical', 'usual', ['rare', 'strange', 'recent', 'difficult']], ['significantly', 'considerably', ['slightly', 'rarely', 'barely', 'equally']],
    ['efficiently', 'productively', ['slowly', 'wastefully', 'carelessly', 'rarely']], ['exhausting', 'tiring', ['relaxing', 'exciting', 'useful', 'short']]],
  'urban-heat': [
    ['phenomenon', 'occurrence', ['solution', 'theory', 'mistake', 'building']], ['noticeable', 'clear', ['hidden', 'tiny', 'planned', 'false']],
    ['absorb', 'take in', ['give off', 'reflect', 'destroy', 'measure']], ['release', 'give off', ['keep', 'store', 'block', 'ignore']],
    ['consequences', 'results', ['causes', 'reasons', 'solutions', 'plans']], ['rely', 'depend', ['refuse', 'complain', 'save', 'wait']],
    ['powerless', 'helpless', ['powerful', 'wealthy', 'careless', 'crowded']], ['commitment', 'dedication', ['hesitation', 'payment', 'argument', 'permission']]],
  'ai-classroom': [
    ['sparked', 'triggered', ['ended', 'avoided', 'calmed', 'hidden']], ['restricted', 'limited', ['welcomed', 'required', 'improved', 'ignored']],
    ['adjust', 'adapt', ['repeat', 'remove', 'ignore', 'copy']], ['struggling', 'having difficulty', ['succeeding', 'relaxing', 'complaining', 'cheating']],
    ['convincing', 'believable', ['doubtful', 'boring', 'obvious', 'confusing']], ['blindly', 'without questioning', ['carefully', 'rarely', 'angrily', 'slowly']],
    ['demonstrate', 'show', ['hide', 'forget', 'copy', 'doubt']], ['advantage', 'benefit', ['problem', 'cost', 'risk', 'weakness']]],
  'spice-trade': [
    ['prized', 'valued', ['hated', 'ignored', 'feared', 'cheap']], ['transported', 'carried', ['grew', 'hid', 'burned', 'tasted']],
    ['precious', 'valuable', ['common', 'dangerous', 'heavy', 'fresh']], ['enormous', 'huge', ['tiny', 'fair', 'secret', 'regular']],
    ['violent', 'brutal', ['peaceful', 'friendly', 'quiet', 'fair']], ['refused', 'declined', ['agreed', 'offered', 'promised', 'pretended']],
    ['forced', 'compelled', ['allowed', 'invited', 'encouraged', 'paid']], ['extraordinary', 'remarkable', ['ordinary', 'boring', 'simple', 'cheap']]]
};

window.SOAL_UJIAN = {
  'school-uniforms': [
    { k: 'inferensi', t: 'Which group would most likely agree with the opponents of school uniforms?', p: ['Students who like to show their personal style', 'Security guards who want to recognize students', 'Parents who want to save time in the morning', 'Teachers who want equality among students'], j: 0,
      b: 'Penentang menekankan kebebasan berekspresi; siswa yang ingin menunjukkan gaya pribadi paling mungkin setuju.' },
    { k: 'tujuan', t: 'Why does the writer mention "hot weather" in paragraph 3?', p: ['To give an example of why uniforms can be uncomfortable', 'To describe the climate of Indonesia', 'To explain why uniforms are cheap', 'To support the idea of equality'], j: 0,
      b: '"… uncomfortable, particularly in hot weather" adalah contoh ketidaknyamanan seragam.' },
    { k: 'evaluasi', t: 'Which fact would most WEAKEN the opponents\' argument about cost?', p: ['The government gives free uniforms to every student.', 'Uniforms are sold in many shops.', 'Some students have three sets of uniforms.', 'Fashion trends change every year.'], j: 0,
      b: 'Argumen biaya melemah bila seragam diberikan gratis.' },
    { k: 'sikap', t: 'The tone of the conclusion can best be described as …', p: ['balanced', 'angry', 'humorous', 'pessimistic'], j: 0,
      b: 'Penulis menimbang kedua pihak dan mengusulkan jalan tengah.' }],
  'reading-habit': [
    { k: 'inferensi', t: 'It can be inferred that the writer thinks social media …', p: ['takes time that could be used for reading', 'is the best way to build vocabulary', 'helps students concentrate', 'should replace books'], j: 0,
      b: 'Kalimat kedua mengeluhkan waktu yang habis untuk media sosial dibanding membaca.' },
    { k: 'tujuan', t: 'What is the purpose of the last paragraph?', p: ['To show that reading is easy to start and to invite readers to read', 'To list the prices of books', 'To compare libraries in different schools', 'To explain how digital books are made'], j: 0,
      b: 'Paragraf terakhir: membaca tidak mahal atau sulit, lalu ajakan "let us … open a book".' },
    { k: 'evaluasi', t: 'Which statement, if true, would best SUPPORT the writer\'s second reason?', p: ['Students who read daily can focus longer in class.', 'Many students prefer videos to books.', 'Books are heavier than phones.', 'Some libraries close on Sundays.'], j: 0,
      b: 'Alasan kedua: membaca melatih konsentrasi.' },
    { k: 'sikap', t: 'How does the writer feel about short videos?', p: ['They are less helpful for concentration than books.', 'They are the best learning tool.', 'They should be watched every day.', 'They are more creative than stories.'], j: 0,
      b: 'Video pendek dikontraskan dengan buku yang menuntut fokus lama.' }],
  'river-cleanup': [
    { k: 'inferensi', t: 'What can be inferred about the condition of the Citarum River?', p: ['It is polluted by a lot of household rubbish.', 'It is the cleanest river in Indonesia.', 'It has no fish or plants at all.', 'It is too far from the city to visit.'], j: 0,
      b: 'Lebih dari seribu karung sampah, sebagian besar dari rumah tangga.' },
    { k: 'tujuan', t: 'Why does the writer mention "more than one thousand sacks"?', p: ['To show how much rubbish was found', 'To describe the size of the sacks', 'To explain the cost of the event', 'To compare the students with the volunteers'], j: 0,
      b: 'Angka itu menunjukkan banyaknya sampah.' },
    { k: 'evaluasi', t: 'Which action would best follow the advice of the head of the environmental group?', p: ['A school starts a weekly waste-sorting program.', 'A family burns rubbish near the river.', 'A shop gives out more plastic bags.', 'Students clean the river only once a year.'], j: 0,
      b: 'Ia menyarankan perubahan kebiasaan sehari-hari dan pendidikan pengelolaan sampah di sekolah.' },
    { k: 'sikap', t: 'How did the student who "admitted" being shocked probably feel?', p: ['Surprised and concerned', 'Bored and tired', 'Proud and relaxed', 'Angry at her friends'], j: 0,
      b: 'Shocked = terkejut; ia kaget melihat banyaknya sampah.' }],
  'email-science-fair': [
    { k: 'inferensi', t: 'What can be inferred about the science fair?', p: ['It has not been approved yet.', 'It has already finished.', 'It will be held every month.', 'It is organized by the teachers.'], j: 0,
      b: 'Raka masih meminta izin, jadi pameran belum disetujui.' },
    { k: 'tujuan', t: 'Why does Raka mention the water filters and solar-powered cars?', p: ['To show the variety of the projects', 'To ask for money to buy them', 'To complain about the projects', 'To describe the prizes'], j: 0,
      b: 'Contoh itu menunjukkan ragam proyek.' },
    { k: 'evaluasi', t: 'Which addition would make Raka\'s request more convincing?', p: ['A short description of how the fair will be supervised', 'A list of his favorite songs', 'A complaint about the school hall', 'A request for a holiday'], j: 0,
      b: 'Rincian pengawasan menambah keyakinan kepala sekolah.' },
    { k: 'sikap', t: 'Raka\'s attitude toward Mrs Lestari is …', p: ['respectful', 'rude', 'indifferent', 'angry'], j: 0,
      b: 'Bahasanya sopan: "we would be grateful", "please do not hesitate".' }],
  'komodo': [
    { k: 'inferensi', t: 'Why do young Komodo dragons probably avoid larger dragons?', p: ['Larger dragons may eat them.', 'Larger dragons are their teachers.', 'They cannot see larger dragons.', 'Larger dragons live in trees.'], j: 0,
      b: 'Anak komodo aman di pohon dari komodo besar; artinya komodo besar bisa memangsanya.' },
    { k: 'tujuan', t: 'Why does the writer mention that Komodo dragons can detect a dead animal from several kilometres away?', p: ['To show how powerful their sense of smell is', 'To explain how fast they run', 'To describe the size of the island', 'To show that they eat only plants'], j: 0,
      b: 'Menunjukkan kuatnya penciuman lewat lidah.' },
    { k: 'evaluasi', t: 'Which action would best help protect Komodo dragons?', p: ['Protecting their habitat and the animals they hunt', 'Taking their eggs to the city', 'Hunting deer on Komodo Island', 'Building more roads in the national park'], j: 0,
      b: 'Ancamannya: habitat menyempit dan buruan berkurang.' },
    { k: 'sikap', t: 'The writer presents the information in a … way.', p: ['factual', 'humorous', 'angry', 'emotional'], j: 0,
      b: 'Teks report menyajikan fakta secara objektif.' }],
  'lake-toba': [
    { k: 'inferensi', t: 'What can be inferred about the woman\'s secret?', p: ['It was very important to her.', 'She wanted everyone to know it.', 'Samosir already knew it.', 'It was about her family\'s money.'], j: 0,
      b: 'Ia menjadikannya syarat pernikahan dan sangat sedih saat rahasia itu terbongkar.' },
    { k: 'tujuan', t: 'What is the function of the last paragraph?', p: ['To tell how the lake and the island were formed', 'To introduce the main characters', 'To describe the problem', 'To give the moral directly'], j: 0,
      b: 'Resolusi: asal-usul Danau Toba dan Pulau Samosir.' },
    { k: 'evaluasi', t: 'Which proverb best matches the message of the story?', p: ['A promise is a debt that must be paid.', 'The early bird catches the worm.', 'Practice makes perfect.', 'Better late than never.'], j: 0,
      b: 'Inti cerita: janji harus ditepati.' },
    { k: 'sikap', t: 'How did Toba most likely feel after the flood?', p: ['Regretful', 'Proud', 'Amused', 'Relieved'], j: 0,
      b: 'Ia kehilangan keluarganya karena melanggar janji; ia tentu menyesal.' }],
  'sleep-memory': [
    { k: 'inferensi', t: 'Based on the text, which student is likely to remember the most for an exam?', p: ['A student who studies a little every day and sleeps well', 'A student who studies all night before the exam', 'A student who sleeps all day before the exam', 'A student who drinks coffee to stay awake', 'A student who studies only on the morning of the exam'], j: 0,
      b: 'Mengulang bertahap + tidur teratur (paragraf 5).' },
    { k: 'tujuan', t: 'Why does the author describe a typical experiment in paragraph 3?', p: ['To provide evidence for the claim about sleep and memory', 'To explain how to become a researcher', 'To criticize the participants', 'To show that words are hard to learn', 'To compare different universities'], j: 0,
      b: 'Percobaan menjadi bukti klaim.' },
    { k: 'evaluasi', t: 'Which finding would most STRENGTHEN the author\'s argument?', p: ['Students who sleep eight hours before a test score higher than those who sleep three hours.', 'Many students like studying with music.', 'Coffee is popular among university students.', 'Some exams are held online.', 'Most students own a phone.'], j: 0,
      b: 'Temuan itu mendukung hubungan tidur dan prestasi.' },
    { k: 'sikap', t: 'The author\'s tone toward students who study late at night is mainly …', p: ['advisory', 'mocking', 'angry', 'indifferent', 'admiring'], j: 0,
      b: 'Penulis menasihati (advisory), bukan mengejek.' }],
  'urban-heat': [
    { k: 'inferensi', t: 'Which neighbourhood would probably be the hottest on a sunny afternoon?', p: ['One with dark roofs, wide roads, and no trees', 'One with many parks and trees', 'One near a cool forest', 'One with white roofs and gardens', 'One where wind flows freely between buildings'], j: 0,
      b: 'Atap gelap dan aspal menyerap panas, dan tidak ada pohon yang menyejukkan.' },
    { k: 'tujuan', t: 'Why does the author mention Jakarta, Surabaya, and Medan?', p: ['To give local examples of the problem', 'To compare their populations', 'To recommend places to live', 'To describe their history', 'To criticize their governments'], j: 0,
      b: 'Contoh masalah di Indonesia.' },
    { k: 'evaluasi', t: 'Which statement would most WEAKEN the claim that green areas cool cities?', p: ['A study finds that parks have no effect on nearby temperatures.', 'Many people enjoy walking in parks.', 'Parks need regular cleaning.', 'Trees grow slowly.', 'Some cities have few parks.'], j: 0,
      b: 'Langsung membantah efek pendinginan taman.' },
    { k: 'sikap', t: 'The author\'s attitude toward the future of cities is …', p: ['cautiously hopeful', 'completely hopeless', 'uninterested', 'angry', 'amused'], j: 0,
      b: '"Fortunately, cities are not powerless", tetapi biayanya diakui: optimis dengan hati-hati.' }],
  'ai-classroom': [
    { k: 'inferensi', t: 'What can be inferred about students who trust AI tools blindly?', p: ['They may learn wrong information without noticing.', 'They always get the best grades.', 'They never use their phones.', 'They are better at mathematics.', 'They do not need teachers.'], j: 0,
      b: 'Paragraf 3: informasi keliru yang meyakinkan bisa tidak disadari.' },
    { k: 'tujuan', t: 'What is the main purpose of paragraph 4?', p: ['To present a middle way between supporting and banning AI', 'To list the dangers of AI', 'To describe how AI is built', 'To praise calculators', 'To explain oral presentations in detail'], j: 0,
      b: 'Paragraf 4 menawarkan pendekatan seimbang.' },
    { k: 'evaluasi', t: 'Which school policy best reflects the author\'s view?', p: ['AI is allowed for brainstorming, but students must explain their work orally.', 'AI is banned completely.', 'AI writes all homework.', 'Teachers are replaced by AI.', 'Phones are collected every morning.'], j: 0,
      b: 'Sesuai pendekatan seimbang dan kesimpulan penulis.' },
    { k: 'sikap', t: 'Which word best describes the author\'s view of AI?', p: ['balanced', 'fearful', 'unlimitedly enthusiastic', 'dismissive', 'hostile'], j: 0,
      b: 'Penulis menimbang manfaat dan risikonya.' }],
  'spice-trade': [
    { k: 'inferensi', t: 'Why did Europeans most likely want to find a sea route to the spice islands?', p: ['To buy spices directly and avoid paying many traders', 'To learn the Malay language', 'To visit Venice', 'To sell nutmeg to Indonesians', 'To escape from Arab merchants'], j: 0,
      b: 'Harga naik berkali-kali lipat lewat rantai pedagang yang panjang.' },
    { k: 'tujuan', t: 'Why does the author compare a small bag of nutmeg to a house?', p: ['To show how valuable nutmeg was in Europe', 'To describe houses in Banda', 'To explain how nutmeg was stored', 'To show that houses were cheap', 'To criticize European homes'], j: 0,
      b: 'Perbandingan itu menegaskan tingginya nilai pala.' },
    { k: 'evaluasi', t: 'Which statement best supports the claim that "local people suffered the most"?', p: ['Thousands of Bandanese were killed or forced to leave.', 'Nutmeg is cheap today.', 'The Portuguese arrived first.', 'Venice was a rich city.', 'Spices are used in cooking.'], j: 0,
      b: 'Bukti penderitaan penduduk setempat (paragraf 4).' },
    { k: 'sikap', t: 'The author\'s attitude toward the Dutch East India Company\'s actions is …', p: ['disapproving', 'admiring', 'neutral', 'amused', 'grateful'], j: 0,
      b: '"one of the darkest chapters" menunjukkan sikap tidak setuju.' }]
};
Object.keys(window.SOAL_UJIAN).forEach(id => { if (window.SOAL[id]) window.SOAL[id].push(...window.SOAL_UJIAN[id]); });
// Tambahan agar sub level 9 (inferensi & sikap penulis) punya paling sedikit 10 soal per bacaan.
window.SOAL_UJIAN_2 = {
  'school-uniforms': [
    { k: 'inferensi', t: 'According to the supporters, how might students from poorer families benefit from uniforms?', p: ['They may feel less pressure when everyone wears the same clothes.', 'They will never need to buy clothes.', 'They will become the best students.', 'They will not have to go to school early.'], j: 0,
      b: 'Seragam membuat siswa kaya dan miskin tampak sama sehingga tekanan mengikuti mode berkurang.' },
    { k: 'tujuan', t: 'Why does the writer begin the text with a question?', p: ['To introduce the issue that will be discussed', 'To test the readers\' knowledge', 'To show that the answer is obvious', 'To describe a school rule'], j: 0,
      b: 'Pertanyaan pembuka memperkenalkan isu yang didiskusikan.' },
    { k: 'evaluasi', t: 'Which situation best shows the "free-dress days" idea in the conclusion?', p: ['Students wear uniforms most days but their own clothes on one Friday each month.', 'Students never wear uniforms.', 'Students buy five different uniforms.', 'Teachers choose students\' clothes every day.'], j: 0,
      b: 'Seragam sederhana ditambah beberapa hari bebas setiap bulan.' }],
  'reading-habit': [
    { k: 'inferensi', t: 'Which student follows the writer\'s advice best?', p: ['Dina reads ten pages of a library book every night before sleeping.', 'Budi watches short videos for three hours a day.', 'Rina buys many books but never opens them.', 'Andi reads only when there is an exam.'], j: 0,
      b: 'Membaca rutin setiap hari, mulai dari sedikit.' },
    { k: 'tujuan', t: 'Why does the writer use the words "First", "Second", and "Third"?', p: ['To organize the reasons clearly', 'To show the time of the day', 'To compare three books', 'To count the students'], j: 0,
      b: 'Penanda urutan alasan.' },
    { k: 'evaluasi', t: 'Which piece of evidence would make the first reason stronger?', p: ['A survey showing that students who read more know more words', 'A list of popular video games', 'A story about a library cat', 'The price of a new phone'], j: 0,
      b: 'Alasan pertama: membaca menambah pengetahuan dan kosakata.' }],
  'river-cleanup': [
    { k: 'inferensi', t: 'Why will the organizers probably hold the event every three months?', p: ['Because one clean-up is not enough to solve the problem', 'Because the students did not enjoy it', 'Because the river is already clean', 'Because the government stopped them'], j: 0,
      b: 'Sampah terus datang; membersihkan sekali tidak cukup.' },
    { k: 'inferensi', t: 'What can be inferred about some people who live near the river?', p: ['They still throw rubbish into it.', 'They all joined the clean-up.', 'They organized the event.', 'They never use plastic bags.'], j: 0,
      b: 'Sebagian besar sampah berasal dari rumah tangga yang masih membuangnya ke sungai.' },
    { k: 'tujuan', t: 'What is the main purpose of paragraph 3?', p: ['To report the organizer\'s opinion about a long-term solution', 'To describe what the students wore', 'To list the types of rubbish', 'To announce the next event'], j: 0,
      b: 'Paragraf 3 memuat pendapat ketua kelompok lingkungan.' },
    { k: 'sikap', t: 'The writer reports the event in a … way.', p: ['neutral and informative', 'angry', 'funny', 'sad'], j: 0,
      b: 'Teks berita melaporkan fakta tanpa memihak.' }],
  'email-science-fair': [
    { k: 'inferensi', t: 'Who will most likely judge the projects at the fair?', p: ['Two science teachers', 'The parents', 'Raka himself', 'Students from other schools'], j: 0,
      b: '"we hope that two science teachers can act as judges".' },
    { k: 'inferensi', t: 'What will probably happen if Mrs Lestari agrees?', p: ['The Student Council will use the hall and classrooms for the fair.', 'The fair will be cancelled.', 'Raka will move to another school.', 'The projects will be sold.'], j: 0,
      b: 'Izin memungkinkan aula dan kelas dipakai untuk pameran.' },
    { k: 'tujuan', t: 'Why does Raka write "So far, thirty-two groups have registered"?', p: ['To show that many students are interested', 'To complain about the number of groups', 'To ask for more judges', 'To explain the prizes'], j: 0,
      b: 'Menunjukkan besarnya minat siswa.' },
    { k: 'evaluasi', t: 'Which reply from Mrs Lestari would show that she accepts the request?', p: ['"You may use the hall. Please send me the budget details."', '"The school hall is closed forever."', '"I do not like science."', '"Please write to the parents instead."'], j: 0,
      b: 'Balasan itu memberi izin.' }],
  'komodo': [
    { k: 'inferensi', t: 'Why is it dangerous for people to walk alone on Komodo Island?', p: ['Komodo dragons may attack suddenly.', 'The island has no roads.', 'Komodo dragons are very small.', 'The weather is always cold.'], j: 0,
      b: 'Komodo menunggu diam lalu menyerang tiba-tiba, dan gigitannya berbahaya.' },
    { k: 'inferensi', t: 'What would probably happen if deer disappeared from the islands?', p: ['Komodo dragons would have less food.', 'Komodo dragons would eat only plants.', 'Komodo dragons would grow bigger.', 'More Komodo eggs would hatch.'], j: 0,
      b: 'Rusa adalah salah satu buruan; buruan yang berkurang adalah ancaman.' },
    { k: 'tujuan', t: 'What is the purpose of the first paragraph?', p: ['To introduce the Komodo dragon in general', 'To tell a story about a hunter', 'To explain how eggs hatch', 'To persuade readers to visit Flores'], j: 0,
      b: 'Klasifikasi umum dalam teks report.' },
    { k: 'evaluasi', t: 'Which statement is an OPINION rather than a fact?', p: ['Komodo dragons are the most interesting animals in Indonesia.', 'Komodo dragons live on a few islands.', 'Komodo dragons are carnivores.', 'Komodo eggs hatch after about eight months.'], j: 0,
      b: '"The most interesting" adalah pendapat; pilihan lain fakta dari teks.' }],
  'lake-toba': [
    { k: 'inferensi', t: 'Why did the mother most likely tell Samosir to climb the highest hill?', p: ['She knew a flood was coming and wanted to save him.', 'She wanted him to find his father.', 'She asked him to catch a fish.', 'She wanted him to look for food.'], j: 0,
      b: 'Sesudah itu air membanjiri lembah; bukit menjadi tempat yang aman.' },
    { k: 'tujuan', t: 'Why does the story include Samosir eating his father\'s lunch?', p: ['To create the conflict that leads to the broken promise', 'To show that Samosir was a good cook', 'To describe the food in North Sumatra', 'To explain why Toba was a farmer'], j: 0,
      b: 'Peristiwa itu memicu kemarahan Toba (komplikasi).' },
    { k: 'sikap', t: 'How would you describe Toba\'s words to his son?', p: ['Hurtful', 'Kind', 'Funny', 'Polite'], j: 0,
      b: '"You are truly the child of a fish!" adalah kata-kata yang menyakitkan.' }],
  'sleep-memory': [
    { k: 'inferensi', t: 'What can be inferred from the studies about short afternoon naps?', p: ['Even a short rest can help the brain process new information.', 'Naps are more useful than a full night of sleep.', 'Students should sleep during lessons.', 'Naps make people forget words.', 'Only adults benefit from naps.'], j: 0,
      b: 'Tidur siang singkat pun membantu sebagian tugas mengingat.' },
    { k: 'evaluasi', t: 'Which assumption does the author make in the last paragraph?', p: ['Students can control how they plan their study time.', 'All students sleep ten hours.', 'Exams are always held in the morning.', 'Teachers do not give homework.', 'Reading is harmful at night.'], j: 0,
      b: 'Saran mengatur jadwal belajar mengandaikan siswa dapat mengatur waktunya sendiri.' }],
  'urban-heat': [
    { k: 'inferensi', t: 'Why might an outdoor worker in Surabaya face more risk today than decades ago?', p: ['Temperatures in the city have risen noticeably.', 'There are fewer workers in the city.', 'Surabaya has more forests now.', 'Air conditioners are not sold there.', 'The rainy season has become longer.'], j: 0,
      b: 'Kota-kota itu mengalami kenaikan suhu yang cukup terasa.' },
    { k: 'tujuan', t: 'What is the function of paragraph 3 in the text?', p: ['To explain why the urban heat island effect is a serious problem', 'To describe the history of fans', 'To list the names of cities', 'To give solutions to the problem', 'To define the word "rooftop"'], j: 0,
      b: 'Paragraf 3 menjelaskan akibatnya, yaitu mengapa masalah ini serius.' }],
  'ai-classroom': [
    { k: 'inferensi', t: 'What does the author imply by comparing AI to a calculator?', p: ['New technology changes what students need to learn.', 'Calculators are dangerous for students.', 'AI will disappear soon.', 'Mathematics is no longer important.', 'Students should not use calculators.'], j: 0,
      b: 'Kalkulator mengubah apa yang perlu dipelajari, bukan menghapus pelajarannya.' },
    { k: 'evaluasi', t: 'Which statement would the critics in paragraph 3 most likely agree with?', p: ['Students must still practise thinking and writing on their own.', 'AI should do all homework.', 'AI never makes mistakes.', 'Students should copy answers quickly.', 'Teachers are no longer needed.'], j: 0,
      b: 'Pengkritik khawatir kemampuan berpikir dan menulis mandiri melemah.' }],
  'spice-trade': [
    { k: 'inferensi', t: 'What can be inferred about the people of Banda before the Dutch attack?', p: ['They wanted to sell nutmeg to more than one buyer.', 'They had never seen nutmeg.', 'They lived in Venice.', 'They were Dutch planters.', 'They did not grow any spices.'], j: 0,
      b: 'Mereka menolak menjual pala hanya kepada Belanda.' },
    { k: 'tujuan', t: 'What is the purpose of the last paragraph?', p: ['To connect the history to a lesson for readers today', 'To describe how nutmeg is cooked', 'To list European countries', 'To explain the sea route in detail', 'To praise the Dutch company'], j: 0,
      b: 'Paragraf terakhir menarik pelajaran dari sejarah itu.' },
    { k: 'evaluasi', t: 'Which statement in the text expresses an OPINION?', p: ['It was one of the darkest chapters in the history of the archipelago.', 'The Portuguese reached Maluku first.', 'Nutmeg trees grew in the Banda Islands.', 'Indonesian sailors carried spices to India.', 'Today, nutmeg is cheap.'], j: 0,
      b: '"One of the darkest chapters" adalah penilaian penulis.' }]
};
Object.keys(window.SOAL_UJIAN_2).forEach(id => { if (window.SOAL[id]) window.SOAL[id].push(...window.SOAL_UJIAN_2[id]); });

/* ---------- Sub level 6–10 bacaan Tahap 2: Teks Fungsional Pendek (A2), 10 Okt 2026 ----------
   Teks satu paragraf, jadi sub level 6 memakai BAGIAN (struktur teks) sebagai ganti ide pokok paragraf:
   BAGIAN[id] = { jenis, bagian: [[nama bagian, penjelasan, [indeks kalimat (mulai 0)]], ...] }.
   Pengecoh soal bagian diambil dari BAGIAN_SEMUA (nama bagian jenis teks lain). Semua soal 4 opsi. */
window.BAGIAN_SEMUA = ['identification', 'description', 'orientation', 'events', 'reorientation', 'goal', 'steps', 'opening', 'content', 'closing'];
window.BAGIAN = {
  'best-friend': { jenis: 'descriptive text', bagian: [
    ['identification', 'memperkenalkan orang yang dideskripsikan', [0, 1]],
    ['description', 'menggambarkan ciri fisik, sifat, kepandaian, dan kebiasaannya', [2, 3, 4, 5, 6, 7, 8]],
    ['closing', 'kesan atau perasaan penulis', [9]]] },
  'a-rainy-morning': { jenis: 'recount text', bagian: [
    ['orientation', 'memperkenalkan waktu, keadaan, dan tokoh', [0, 1]],
    ['events', 'urutan kejadian yang dialami tokoh', [2, 3, 4]],
    ['reorientation', 'akhir cerita dan perasaan tokoh', [5]]] },
  'make-tea': { jenis: 'procedure text', bagian: [
    ['goal', 'tujuan: apa yang akan dibuat', [0]],
    ['steps', 'langkah-langkah berurutan', [1, 2, 3, 4, 5, 6, 7, 8]],
    ['closing', 'kalimat penutup untuk pembaca', [9]]] },
  'announcement': { jenis: 'short announcement', bagian: [
    ['opening', 'menarik perhatian dan menyebut untuk siapa pengumuman itu', [0, 1]],
    ['content', 'isi: acara, waktu, dan hal yang harus dilakukan', [2, 3, 4, 5, 6, 7, 8]],
    ['closing', 'ucapan terima kasih', [9]]] }
};

Object.assign(window.RUJUKAN, {
  'best-friend': [
    ['Her', 'Her name is Sinta', "the writer's best friend", ['the writer', 'the teacher', "the writer's mother"]],
    ['She', 'She always wears glasses', 'Sinta', ['the writer', 'the librarian', 'the teacher']],
    ['me', 'She often helps me when I have difficulty', 'the writer', ['Sinta', 'the teacher', 'Sinta\'s sister']],
    ['we', 'Every weekend, we ride our bicycles', 'the writer and Sinta', ['Sinta and her mother', "the writer's family", 'the students']]],
  'a-rainy-morning': [
    ['He', 'He quickly ate his breakfast', 'Dimas', ['his father', 'his brother', 'his teacher']],
    ['his', 'put on his raincoat', "Dimas's", ["his mother's", "his father's", "his teacher's"]],
    ['him', 'His mother gave him an umbrella', 'Dimas', ['his father', 'his friend', 'the teacher']],
    ['he', 'but he was happy because he was not late', 'Dimas', ['his mother', 'his teacher', 'the driver']]],
  'make-tea': [
    ['it', 'and stir it well', 'the tea with sugar', ['the kettle', 'the tea bag', 'the lemon']],
    ['you', 'If you like, you can also add some milk', 'the reader who makes the tea', ["the writer's mother", 'a seller', 'a teacher']],
    ['your', 'Finally, your tea is ready', "the reader's", ["the writer's", "the seller's", "the guest's"]],
    ['it', 'Enjoy it while it is warm', 'the cup of tea', ['the kettle', 'the sugar', 'the lemon']]],
  'announcement': [
    ['This', 'This is an announcement for all students', 'the message being read', ['the school yard', 'the prize', 'next Friday']],
    ['its', 'Each class will clean its own classroom', "each class's", ["the headmaster's", "the school's", "the teacher's"]],
    ['we', 'we will have breakfast together in the hall', 'all the students together', ['the headmaster only', 'the cleaners', 'the parents']],
    ['your', 'Do not forget to wear your sports uniform', "the students'", ["the headmaster's", "the teachers'", "the parents'"]]]
});

Object.assign(window.SINONIM, {
  'best-friend': [
    ['kind', 'nice', ['rude', 'lazy', 'tall']], ['friendly', 'easy to talk to', ['angry', 'shy', 'tired']],
    ['often', 'many times', ['never', 'once', 'rarely']], ['helps', 'assists', ['bothers', 'calls', 'leaves']],
    ['difficulty', 'problem', ['success', 'holiday', 'game']], ['good at', 'skilled at', ['bad at', 'afraid of', 'tired of']],
    ['together', 'with each other', ['alone', 'late', 'apart']], ['lucky', 'fortunate', ['unhappy', 'careless', 'lonely']]],
  'a-rainy-morning': [
    ['heavily', 'a lot', ['a little', 'quietly', 'slowly']], ['woke up', 'got up', ['went to bed', 'sat down', 'fell down']],
    ['wet', 'not dry', ['dry', 'hot', 'clean']], ['quickly', 'fast', ['slowly', 'sadly', 'late']],
    ['gave', 'handed', ['took', 'sold', 'lost']], ['arrived', 'reached the place', ['left', 'forgot', 'called']],
    ['happy', 'glad', ['sad', 'angry', 'tired']], ['late', 'not on time', ['early', 'on time', 'ready']]],
  'make-tea': [
    ['boil', 'heat until it bubbles', ['freeze', 'wash', 'cut']], ['pour', 'let the water flow', ['cut', 'fry', 'blow']],
    ['wait', 'stay for a moment', ['hurry', 'run', 'sleep']], ['take out', 'remove', ['put in', 'break', 'drink']],
    ['add', 'put in', ['remove', 'burn', 'hide']], ['stir', 'mix', ['cut', 'boil', 'freeze']],
    ['finally', 'at last', ['first', 'next', 'never']], ['warm', 'a little hot', ['frozen', 'cold', 'icy']]],
  'announcement': [
    ['attention', 'notice', ['noise', 'holiday', 'question']], ['hold', 'organize', ['cancel', 'forget', 'break']],
    ['bring', 'take with you', ['leave', 'sell', 'buy']], ['each', 'every', ['no', 'only one', 'some']],
    ['together', 'with one another', ['alone', 'separately', 'quietly']], ['prize', 'award', ['punishment', 'test', 'broom']],
    ['forget', 'fail to remember', ['remember', 'hope', 'try']], ['must', 'have to', ['may not', 'do not need to', 'will never']]]
});

window.SOAL_TAHAP2 = {
  'best-friend': [
    { k: 'sikap', t: 'How does the writer feel about Sinta?', p: ['Thankful and happy', 'Angry', 'Jealous', 'Bored'], j: 0, b: '"I am lucky to have a friend like her."' },
    { k: 'inferensi', t: 'Why does the writer probably ask Sinta for help with lessons?', p: ['Because Sinta is kind and helpful', 'Because Sinta is a teacher', 'Because Sinta lives in the library', 'Because Sinta is older than the teacher'], j: 0, b: 'Sinta baik hati dan sering membantu.' },
    { k: 'inferensi', t: 'Where do the writer and Sinta probably live?', p: ['In a village', 'In the center of a big city', 'On a ship', 'In another country'], j: 0, b: '"we ride our bicycles around the village".' },
    { k: 'tujuan', t: 'What is the purpose of the text?', p: ["To describe the writer's best friend", 'To tell a funny story', 'To explain how to ride a bicycle', 'To announce a school event'], j: 0, b: 'Teks deskriptif menggambarkan seseorang.' },
    { k: 'tujuan', t: 'Why does the writer mention that Sinta wears glasses?', p: ['To describe what Sinta looks like', 'To show that Sinta is sick', 'To explain why Sinta likes drawing', 'To say that Sinta is a teacher'], j: 0, b: 'Bagian deskripsi ciri fisik.' },
    { k: 'evaluasi', t: 'Which sentence is an OPINION?', p: ['I am lucky to have a friend like her.', 'Her name is Sinta.', 'She always wears glasses.', 'Sometimes we go to the library together.'], j: 0, b: 'Perasaan atau penilaian penulis adalah opini.' },
    { k: 'evaluasi', t: 'Which activity would Sinta most likely enjoy?', p: ['Joining a drawing competition', 'Fixing a car engine', 'Swimming in the sea', 'Selling fish at the market'], j: 0, b: 'Sinta pandai menggambar dan bernyanyi.' },
    { k: 'inferensi', t: 'What kind of friend is Sinta?', p: ['A helpful friend', 'A lazy friend', 'An angry friend', 'A selfish friend'], j: 0, b: 'Ia sering membantu penulis.' }],
  'a-rainy-morning': [
    { k: 'inferensi', t: 'Why did Dimas eat his breakfast quickly?', p: ['Because he woke up late and did not want to be late', 'Because the food was cold', 'Because his mother was angry', 'Because he was not hungry'], j: 0, b: 'Ia bangun kesiangan.' },
    { k: 'inferensi', t: 'Why were his shoes wet?', p: ['Because he walked on the wet street', 'Because he washed them', 'Because he swam in a river', 'Because his mother poured water on them'], j: 0, b: 'Jalanan basah dan penuh genangan.' },
    { k: 'sikap', t: 'How did Dimas feel at the end of the story?', p: ['Happy', 'Angry', 'Afraid', 'Bored'], j: 0, b: '"he was happy because he was not late".' },
    { k: 'tujuan', t: 'What is the purpose of the text?', p: ['To tell what happened to Dimas one rainy morning', 'To describe a raincoat', 'To explain how rain is formed', 'To announce a school rule'], j: 0, b: 'Recount menceritakan pengalaman.' },
    { k: 'tujuan', t: 'Why does the writer say the street was "full of puddles"?', p: ['To show how much it had rained', 'To describe a new road', 'To explain why Dimas woke up late', 'To show that Dimas likes water'], j: 0, b: 'Menggambarkan hujan lebat.' },
    { k: 'evaluasi', t: 'What lesson can we learn from the story?', p: ['Be prepared when the weather is bad.', 'Never eat breakfast.', 'Do not go to school when it rains.', 'Always wake up late.'], j: 0, b: 'Dimas memakai jas hujan dan membawa payung sehingga tidak terlambat.' },
    { k: 'inferensi', t: 'What kind of mother does Dimas have?', p: ['A caring mother', 'A careless mother', 'An angry mother', 'A lazy mother'], j: 0, b: 'Ia memberi Dimas payung.' },
    { k: 'evaluasi', t: 'What would probably happen if Dimas had not hurried?', p: ['He would be late for school.', 'He would win a prize.', 'The rain would stop.', 'His shoes would stay dry.'], j: 0, b: 'Ia bangun kesiangan; tanpa bergegas ia akan terlambat.' }],
  'make-tea': [
    { k: 'inferensi', t: 'What would probably happen if you never took out the tea bag?', p: ['The tea would become too strong.', 'The water would freeze.', 'The sugar would disappear.', 'The cup would break.'], j: 0, b: 'Kantong teh yang terlalu lama membuat teh terlalu pekat.' },
    { k: 'inferensi', t: 'Who is the text written for?', p: ['Anyone who wants to make tea', 'Tea farmers only', 'Doctors', 'Teachers only'], j: 0, b: 'Prosedur ditujukan kepada pembaca ("you").' },
    { k: 'tujuan', t: 'Why does the writer use words like "First", "Next", and "Then"?', p: ['To show the order of the steps', 'To compare different teas', 'To describe the cup', 'To tell a story about tea'], j: 0, b: 'Penanda urutan langkah.' },
    { k: 'tujuan', t: 'What is the function of the first sentence?', p: ['To introduce the goal of the text', 'To give the last step', 'To list the prices', 'To describe a tea farm'], j: 0, b: 'Kalimat pertama adalah goal.' },
    { k: 'evaluasi', t: 'Which step can you skip without spoiling the tea?', p: ['Adding milk or lemon', 'Boiling the water', 'Putting the tea bag into the cup', 'Pouring the hot water'], j: 0, b: '"If you like" berarti boleh dilewati.' },
    { k: 'sikap', t: 'The last sentence "Enjoy it while it is warm!" sounds …', p: ['friendly', 'angry', 'sad', 'worried'], j: 0, b: 'Ajakan yang ramah.' },
    { k: 'evaluasi', t: 'Which thing is NOT needed to follow the steps?', p: ['A knife', 'A kettle', 'A cup', 'A spoon'], j: 0, b: 'Pisau tidak disebut dalam langkah-langkahnya.' },
    { k: 'inferensi', t: 'Why should you drink the tea while it is warm?', p: ['Because warm tea tastes better', 'Because cold tea is dangerous', 'Because the cup will break', 'Because the sugar disappears'], j: 0, b: 'Penulis menyarankan menikmati teh selagi hangat.' }],
  'announcement': [
    { k: 'tujuan', t: 'What is the purpose of the text?', p: ['To inform students about the clean school day', 'To describe the school building', 'To tell a story about a headmaster', 'To explain how to make breakfast'], j: 0, b: 'Pengumuman memberi informasi.' },
    { k: 'inferensi', t: 'Who most likely reads out this announcement?', p: ['A teacher or a school staff member', 'A parent at home', 'A seller at the market', 'A tourist'], j: 0, b: 'Pengumuman sekolah dibacakan pihak sekolah.' },
    { k: 'inferensi', t: 'Why should students bring brooms and dustpans?', p: ['To clean their classrooms and the school yard', 'To play a game', 'To buy breakfast', 'To decorate the hall'], j: 0, b: 'Setiap kelas membersihkan kelas dan halaman.' },
    { k: 'inferensi', t: 'Why should students probably wear their sports uniform?', p: ['Because they will do physical work', 'Because they will have a test', 'Because it is a holiday', 'Because they will meet the president'], j: 0, b: 'Bersih-bersih adalah kerja fisik.' },
    { k: 'sikap', t: 'The tone of the announcement is …', p: ['polite and clear', 'angry', 'funny', 'sad'], j: 0, b: '"Attention, please", "Thank you for your attention".' },
    { k: 'evaluasi', t: 'Which student follows the announcement correctly?', p: ['Rina comes at seven in her sports uniform with a broom.', 'Budi comes at nine in his batik shirt.', 'Dina brings only a ball.', 'Andi stays at home on Friday.'], j: 0, b: 'Sesuai semua petunjuk.' },
    { k: 'evaluasi', t: 'Which information is NOT stated in the announcement?', p: ['The kind of prize', 'The time students must come', 'The things to bring', 'What to wear'], j: 0, b: 'Jenis hadiahnya tidak disebutkan.' },
    { k: 'tujuan', t: 'Why does the announcement mention a prize?', p: ['To encourage the classes to clean well', 'To ask for money', 'To describe the headmaster', 'To end the event'], j: 0, b: 'Hadiah mendorong kelas bersih-bersih dengan baik.' }]
};
Object.keys(window.SOAL_TAHAP2).forEach(id => { if (window.SOAL[id]) window.SOAL[id].push(...window.SOAL_TAHAP2[id]); });
// Tambahan agar sub level 9 Tahap 2 punya paling sedikit 10 soal per bacaan.
[['best-friend', [
  { k: 'inferensi', t: 'What can we learn about the writer from the text?', p: ['The writer sometimes needs help with lessons.', 'The writer is a teacher.', 'The writer cannot ride a bicycle.', 'The writer does not like the library.'], j: 0, b: '"She often helps me when I have difficulty with my lessons."' },
  { k: 'tujuan', t: 'Why does the writer mention the library?', p: ['To show an activity they do together', 'To describe where the writer works', 'To explain how to borrow books', 'To complain about the library'], j: 0, b: 'Perpustakaan disebut sebagai salah satu kegiatan bersama mereka.' }]],
 ['a-rainy-morning', [
  { k: 'inferensi', t: 'What did Dimas probably think when he looked out of the window?', p: ['That he needed to protect himself from the rain', 'That it was a sunny day', 'That school was closed', 'That he wanted to go swimming'], j: 0, b: 'Sesudah itu ia memakai jas hujan.' },
  { k: 'tujuan', t: 'Why does the writer mention the umbrella?', p: ['To show how his mother helped him stay dry', 'To describe the color of the umbrella', 'To show that Dimas lost it', 'To explain why Dimas woke up late'], j: 0, b: 'Ibu membantu dengan memberinya payung.' }]],
 ['make-tea', [
  { k: 'evaluasi', t: 'Which instruction would be a good extra step at the end?', p: ['Wash the cup after you finish drinking.', 'Throw the kettle away.', 'Put the used tea bag back into the box.', 'Boil the sugar.'], j: 0, b: 'Langkah tambahan yang wajar setelah selesai.' }]],
 ['announcement', [
  { k: 'inferensi', t: 'Why will the best class get a prize?', p: ['Because it cleaned its area best', 'Because it came first in a test', 'Because it brought the most food', 'Because it sang the best song'], j: 0, b: 'Hadiah diberikan untuk kelas yang paling baik membersihkan.' },
  { k: 'tujuan', t: 'Why does the announcement begin with "Attention, please"?', p: ['To get the students to listen', 'To end the announcement', 'To give the time of the event', 'To name the prize'], j: 0, b: 'Pembuka untuk menarik perhatian.' }]]
].forEach(([id, soal]) => { window.SOAL_TAHAP2[id].push(...soal); window.SOAL[id].push(...soal); });
