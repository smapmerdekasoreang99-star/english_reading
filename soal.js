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
      b: 'Penulis menimbang kedua pihak lalu mengusulkan jalan tengah.' }
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
      b: 'Pendapat (thesis) + alasan-alasan + ajakan = eksposisi analitis.' }
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
  'reading-habit': [['valuable', 'berharga'], ['habit', 'kebiasaan'], ['unfortunately', 'sayangnya'], ['regularly', 'secara rutin'], ['concentrate', 'berkonsentrasi'], ['requires', 'membutuhkan'], ['creative', 'kreatif'], ['imagine', 'membayangkan'], ['borrow', 'meminjam'], ['nation', 'bangsa']]
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
  ]
};
