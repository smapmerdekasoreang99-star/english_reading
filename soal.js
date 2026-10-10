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
window.BAGIAN_SEMUA = ['identification', 'description', 'orientation', 'events', 'reorientation', 'goal', 'materials', 'steps', 'opening', 'content', 'closing',
  'complication', 'resolution', 'coda', 'general classification', 'thesis', 'arguments', 'reiteration', 'general statement', 'explanation'];
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

/* ---------- Bacaan tambahan Tahap 2–5 dan data sub level 6–10 Genre Teks (10 Okt 2026) ----------
   Bacaan baru agar tiap tahap punya 10 level. Formatnya sama dengan bagian di atas. */
Object.assign(window.SOAL, {
  'holiday-pangandaran': [
    { t: 'What is the text mainly about?', p: ["The writer's holiday at Pangandaran Beach", 'How to build a sandcastle', 'A restaurant near the beach', 'The history of West Java'], j: 0, b: 'Teks menceritakan liburan penulis dan keluarganya di Pantai Pangandaran.' },
    { t: 'How did the family go to Pangandaran?', p: ['By car', 'By train', 'By bus', 'By plane'], j: 0, b: '"We left home early in the morning by car."' },
    { t: 'How long did the trip take?', p: ['About five hours', 'About two hours', 'About one day', 'About ten hours'], j: 0, b: '"The trip took about five hours."' },
    { t: 'What did the family do on the last day?', p: ['They bought some souvenirs.', 'They took a small boat.', 'They watched the sunset.', 'They built a sandcastle.'], j: 0, b: '"On the last day, we bought some souvenirs for our friends."' },
    { t: 'The word "souvenirs" is closest in meaning to …', p: ['things you buy to remember a place', 'tickets for a boat', 'kinds of grilled fish', 'pictures of the sunset'], j: 0, b: 'souvenirs = oleh-oleh atau cendera mata dari suatu tempat.' },
    { t: 'The word "We" in "We also ate grilled fish" refers to …', p: ['the writer and the family', 'the writer and the friends', 'the boat drivers', 'the people in the restaurant'], j: 0, b: 'Penulis berlibur bersama keluarganya ("my family and I").' },
    { k: 'tujuan', t: 'What is the purpose of the text?', p: ["To tell the writer's experience during a holiday", 'To describe how to get to West Java', 'To advertise a restaurant', 'To explain how coral grows'], j: 0, b: 'Recount text menceritakan pengalaman masa lalu.' },
    { k: 'sikap', t: 'How did the writer feel about the holiday?', p: ['Happy and satisfied', 'Bored and sad', 'Angry and upset', 'Afraid and worried'], j: 0, b: '"I was tired but very happy" dan ia ingin datang lagi.' },
    { k: 'inferensi', t: 'Why did the family probably leave home early in the morning?', p: ['Because the trip was long', 'Because the beach closed at noon', 'Because the car was broken', 'Because it was raining'], j: 0, b: 'Perjalanannya sekitar lima jam, jadi mereka berangkat pagi-pagi.' },
    { k: 'inferensi', t: 'Why did the family most likely take a small boat?', p: ['To see the fish and the coral in the sea', 'To go back home', 'To catch fish for dinner', 'To buy souvenirs'], j: 0, b: '"we took a small boat to see the fish and the coral".' },
    { k: 'inferensi', t: 'Why was the writer tired?', p: ['Because the family did many activities', 'Because the writer was sick', 'Because the writer did homework', 'Because the writer could not sleep at home'], j: 0, b: 'Mereka bepergian jauh, bermain, berenang, naik perahu, dan berbelanja.' },
    { k: 'tujuan', t: 'What is the function of the last two sentences?', p: ["To give the writer's feelings and hope at the end", 'To start the story', 'To describe the trip by car', 'To list the souvenirs'], j: 0, b: 'Bagian reorientation berisi perasaan dan harapan penulis.' },
    { k: 'tujuan', t: 'Why does the writer mention the souvenirs?', p: ['To show that the writer remembered the friends', 'To complain about the prices', 'To describe the restaurant', 'To explain why the trip was long'], j: 0, b: 'Oleh-oleh dibeli "for our friends".' },
    { k: 'evaluasi', t: 'Which sentence is an OPINION?', p: ['We watched the beautiful sunset together.', 'The trip took about five hours.', 'We left home early in the morning by car.', 'We took a small boat.'], j: 0, b: 'Kata "beautiful" adalah penilaian penulis.' },
    { k: 'evaluasi', t: 'Which activity did the family NOT do in Pangandaran?', p: ['Climbing a mountain', 'Swimming in the sea', 'Eating grilled fish', 'Watching the sunset'], j: 0, b: 'Mendaki gunung tidak disebutkan.' },
    { k: 'inferensi', t: "What can we learn about the writer's little brother?", p: ['He enjoyed playing on the beach.', 'He did not like the sea.', 'He stayed at home.', 'He drove the car.'], j: 0, b: 'Ia membuat istana pasir yang besar.' }
  ],
  'birthday-invitation': [
    { t: 'What type of text is this?', p: ['An invitation', 'A recount', 'A procedure', 'A description'], j: 0, b: 'Teks mengundang teman-teman ke pesta ulang tahun.' },
    { t: 'When will the party be held?', p: ['On Saturday, the twenty-fourth of October', 'On Thursday, the twenty-fourth of October', 'On Sunday, the fourth of October', 'On Saturday, the fourteenth of October'], j: 0, b: '"The party will be on Saturday, the twenty-fourth of October."' },
    { t: 'What time will the party start?', p: ["At four o'clock in the afternoon", "At four o'clock in the morning", "At seven o'clock in the evening", "At two o'clock in the afternoon"], j: 0, b: '"It will start at four o\'clock in the afternoon."' },
    { t: 'Where will the party be?', p: ["At Nadia's house on Jalan Melati", 'At a restaurant', 'At school', 'At a karaoke place in the city'], j: 0, b: '"It will be at my house on Jalan Melati."' },
    { t: 'The word "present" in the text is closest in meaning to …', p: ['gift', 'time', 'party', 'message'], j: 0, b: 'present = kado atau hadiah.' },
    { t: 'The word "It" in "It will start at four o\'clock" refers to …', p: ['the party', 'the cake', 'the message', 'the shirt'], j: 0, b: 'Yang dimulai pukul empat adalah pestanya.' },
    { k: 'tujuan', t: 'What is the purpose of the text?', p: ['To invite friends to a birthday party', 'To tell a story about a party', 'To explain how to make a cake', 'To describe Jalan Melati'], j: 0, b: '"I would like to invite you to my birthday party."' },
    { k: 'inferensi', t: 'How old is Nadia now?', p: ['Fifteen years old', 'Sixteen years old', 'Seventeen years old', 'Fourteen years old'], j: 0, b: '"I am turning sixteen this month" berarti sekarang ia masih lima belas tahun.' },
    { k: 'inferensi', t: 'Why does Nadia probably ask her friends to send a message by Thursday?', p: ['To know how many guests will come', 'To ask them to buy presents', 'To change the date of the party', 'To tell them the theme'], j: 0, b: 'Ia perlu tahu jumlah tamu sebelum hari Sabtu.' },
    { k: 'inferensi', t: 'What does "Just bring your smile and a good appetite" suggest?', p: ['There will be plenty of food and fun.', 'The guests must cook the food.', 'The guests must bring a camera.', 'The party will be very quiet.'], j: 0, b: 'Selera makan yang baik menunjukkan akan ada banyak makanan.' },
    { k: 'sikap', t: 'The tone of the invitation is …', p: ['friendly and warm', 'angry and rude', 'sad and worried', 'serious and cold'], j: 0, b: 'Penulis menyapa "Dear friends" dan menutup dengan "Your friend".' },
    { k: 'evaluasi', t: 'Which guest follows the invitation correctly?', p: ['Rudi comes on Saturday at four in a white shirt.', 'Sari comes on Sunday in a red dress.', 'Doni comes at seven in the evening.', 'Tika comes on Saturday in a black shirt.'], j: 0, b: 'Hari, jam, dan pakaian Rudi sesuai undangan.' },
    { k: 'evaluasi', t: 'Which information is NOT given in the invitation?', p: ['The time the party will end', 'The place of the party', 'The colour of the clothes', 'The day of the party'], j: 0, b: 'Jam berakhirnya pesta tidak disebutkan.' },
    { k: 'tujuan', t: 'Why does Nadia mention the white theme?', p: ['To tell the guests what to wear', 'To describe her house', 'To ask for a white cake', 'To explain the games'], j: 0, b: '"Please wear a white shirt because the party has a white theme."' },
    { k: 'tujuan', t: 'What is the function of the sentence "You do not need to bring a present"?', p: ['To make the guests feel free to come without a gift', 'To tell the guests to buy an expensive gift', 'To give the address', 'To end the invitation'], j: 0, b: 'Nadia ingin teman-temannya datang tanpa beban membawa kado.' },
    { k: 'evaluasi', t: 'Andi can come to the party. What should he do before Friday?', p: ['Send Nadia a message by Thursday', 'Go to her house on Sunday', 'Buy a white shirt', 'Bring a big present'], j: 0, b: '"Please send me a message by Thursday if you can come."' }
  ],
  'message-from-mom': [
    { t: 'What is the text mainly about?', p: ['Things Rafi must do while his mother is away', 'How to cook fried rice', "Grandma's life in the hospital", "Rafi's day at school"], j: 0, b: 'Ibu meninggalkan pesan berisi tugas-tugas untuk Rafi.' },
    { t: 'Why does Mom have to go to the hospital?', p: ['Because Grandma is sick', 'Because she works there', 'Because Rafi is sick', 'Because Aunt Lina is sick'], j: 0, b: '"… because Grandma is sick."' },
    { t: 'What time will Mom come home?', p: ["At about eight o'clock tonight", "At three o'clock", "At about eight o'clock in the morning", 'Tomorrow afternoon'], j: 0, b: '"I will come home at about eight o\'clock tonight."' },
    { t: "What is on the table for Rafi's lunch?", p: ['Some fried rice', 'Some bread', 'Some noodles', 'Some fried chicken'], j: 0, b: '"There is some fried rice on the table for your lunch."' },
    { t: 'The word "feed" in the text is closest in meaning to …', p: ['give food to', 'play with', 'wash', 'look for'], j: 0, b: 'feed = memberi makan.' },
    { t: 'The word "her" in "Please help her with her math homework" refers to …', p: ["Rafi's sister", 'Grandma', 'Aunt Lina', 'Mom'], j: 0, b: 'Kalimat sebelumnya membicarakan adik Rafi.' },
    { k: 'tujuan', t: 'What is the purpose of the text?', p: ['To tell Rafi what to do while Mom is away', 'To describe the hospital', 'To invite Rafi to a party', 'To tell a story about a cat'], j: 0, b: 'Pesan singkat berisi kabar dan permintaan Ibu.' },
    { k: 'inferensi', t: 'Where is Rafi most likely when he reads the message?', p: ['At home', 'At the hospital', 'At school', "At Aunt Lina's house"], j: 0, b: 'Makanan ada di meja dan ia diminta mengunci pintu bila keluar.' },
    { k: 'inferensi', t: 'Who is probably older, Rafi or his sister?', p: ['Rafi', 'His sister', 'They are twins.', 'The text does not give any clue.'], j: 0, b: 'Rafi diminta membantu adiknya mengerjakan PR.' },
    { k: 'inferensi', t: 'Why does Mom write "Do not worry, she is getting better"?', p: ['So that Rafi will not be too afraid', 'So that Rafi will go to the hospital', 'Because Grandma is coming home today', 'Because Rafi is sick too'], j: 0, b: 'Ibu ingin menenangkan Rafi.' },
    { k: 'sikap', t: 'How does Mom feel about Rafi?', p: ['She loves and trusts him.', 'She is angry with him.', 'She is tired of him.', 'She does not care about him.'], j: 0, b: 'Ia menulis "Thank you, dear" dan "With love", serta memberinya banyak tanggung jawab.' },
    { k: 'tujuan', t: 'Why does Mom mention Aunt Lina?', p: ['So Rafi knows who can help him', 'To invite Aunt Lina to dinner', 'To say that Aunt Lina is sick', 'To ask Rafi to clean her house'], j: 0, b: '"If you need anything, call me or Aunt Lina next door."' },
    { k: 'evaluasi', t: 'Which task is NOT in the message?', p: ['Washing the dishes', 'Feeding the cat', 'Watering the plants', 'Locking the door'], j: 0, b: 'Mencuci piring tidak disebutkan.' },
    { k: 'evaluasi', t: "Rafi wants to play football at a friend's house. What should he do?", p: ['Lock the door before he goes', 'Leave the door open', 'Take his sister to the hospital', 'Give the fried rice to the cat'], j: 0, b: '"Do not forget to lock the door if you go out."' },
    { k: 'inferensi', t: 'Why must Rafi warm up the fried rice?', p: ['Because it has become cold', 'Because it is still raw', 'Because the cat will eat it', 'Because it is for Grandma'], j: 0, b: 'Nasi goreng dimasak lebih awal sehingga sudah dingin saat makan siang.' },
    { k: 'tujuan', t: 'Why does Mom write "Thank you, dear" near the end?', p: ['To show that she is grateful for his help', 'To ask Rafi for money', 'To start the message', 'To tell Rafi the time'], j: 0, b: 'Ibu berterima kasih karena Rafi akan membantu di rumah.' }
  ],
  'borobudur': [
    { t: 'What is the text mainly about?', p: ['The history and features of Borobudur Temple', 'How to travel to Yogyakarta', 'The life of the Sailendra kings', 'How stone blocks are cut'], j: 0, b: 'Seluruh teks menggambarkan Borobudur: letak, sejarah, bangunan, dan pengunjungnya.' },
    { t: 'Where is Borobudur Temple located?', p: ['In Magelang, Central Java', 'In Yogyakarta city center', 'In Bali', 'In East Java'], j: 0, b: '"It stands in Magelang, Central Java, not far from Yogyakarta."' },
    { t: 'How many stupas are there on the round terraces?', p: ['Seventy-two', 'Nine', 'Six', 'Two thousand'], j: 0, b: '"… there are seventy-two bell-shaped stupas …"' },
    { t: 'The word "decorated" is closest in meaning to …', p: ['beautified', 'destroyed', 'emptied', 'measured'], j: 0, b: 'Decorated = dihiasi (beautified).' },
    { t: 'The word "it" in "many visitors climb it at dawn" refers to …', p: ['Borobudur', 'the sunrise', 'the statue of Buddha', 'the dynasty'], j: 0, b: 'Yang didaki pengunjung adalah Candi Borobudur.' },
    { k: 'tujuan', t: 'What is the purpose of the text?', p: ['To describe Borobudur Temple', 'To tell a legend about a king', 'To explain how to make a temple', 'To persuade people not to visit temples'], j: 0, b: 'Teks deskriptif bertujuan menggambarkan suatu tempat secara khusus.' },
    { k: 'tujuan', t: 'What is the function of the first two sentences?', p: ['To identify the temple and where it is', 'To describe the relief panels', 'To tell the end of a story', "To give the writer's opinion about visitors"], j: 0, b: 'Dua kalimat pertama adalah identification: nama dan letak candi.' },
    { k: 'tujuan', t: 'Why does the writer mention the relief panels?', p: ['To show that the walls tell stories and teach lessons', 'To explain how the stone was carried', 'To describe the weather around the temple', 'To show that the temple has many rooms'], j: 0, b: '"… relief panels that tell stories and teach Buddhist lessons."' },
    { k: 'inferensi', t: 'What can be inferred from the fact that the temple has no rooms inside?', p: ['People visit it by walking around its terraces, not by entering rooms.', 'People can sleep inside the temple.', 'The temple is a modern building.', 'The temple is very small.'], j: 0, b: 'Tanpa ruangan, pengunjung berjalan mengelilingi dan menaiki teras-terasnya.' },
    { k: 'inferensi', t: 'How old is Borobudur Temple most likely?', p: ['More than one thousand years old', 'About one hundred years old', 'About fifty years old', 'Less than ten years old'], j: 0, b: 'Dibangun pada abad kedelapan dan kesembilan, jadi usianya lebih dari seribu tahun.' },
    { k: 'inferensi', t: 'Why do many visitors probably climb the temple at dawn?', p: ['Because the view of the sunrise from the top is beautiful', 'Because the temple is closed in the morning', 'Because the stupas are made at dawn', 'Because it is too dark to see anything'], j: 0, b: '"… climb it at dawn to watch the sunrise." Pemandangannya indah.' },
    { k: 'sikap', t: 'How does the writer seem to feel about Borobudur?', p: ['Impressed by its size and beauty', 'Disappointed with it', 'Afraid of it', 'Bored by it'], j: 0, b: 'Penulis menonjolkan bahwa Borobudur terbesar, berhias, dan diakui dunia.' },
    { k: 'evaluasi', t: 'Which visitor would most likely enjoy Borobudur the most?', p: ['Someone who loves history and old stone carvings', 'Someone who wants to swim in the sea', 'Someone who wants to go shopping in a mall', 'Someone who only likes modern buildings'], j: 0, b: 'Borobudur adalah candi kuno dengan ribuan panel relief dan stupa batu.' },
    { k: 'evaluasi', t: 'Which piece of information would best fit the description part of the text?', p: ['Some of the reliefs show scenes from daily life in ancient Java.', 'The writer went to school by bus yesterday.', 'Rice farmers wake up before sunrise.', 'Plastic waste is a serious problem.'], j: 0, b: 'Informasi tentang relief sesuai dengan bagian deskripsi candi.' },
    { k: 'evaluasi', t: 'Based on the text, why is Borobudur important to protect?', p: ['It is a very old and valuable heritage of the world.', 'It is the newest building in Java.', 'It has many hotel rooms inside.', 'It is made of plastic.'], j: 0, b: 'Candi berusia lebih dari seribu tahun dan berstatus Situs Warisan Dunia UNESCO.' }
  ],
  'mouse-deer': [
    { t: 'What is the best title for the text?', p: ['The Clever Mouse Deer', 'The Kind Crocodiles', "The King's Party", 'A Fruit Market in the Forest'], j: 0, b: 'Cerita berpusat pada kecerdikan Kancil mengelabui buaya.' },
    { t: 'Why did Kancil want to cross the river?', p: ['He saw sweet fruit on the other side.', 'He wanted to meet the king.', 'He wanted to catch fish.', 'The crocodiles invited him.'], j: 0, b: '"… he wanted to cross a river because he saw sweet fruit on the other side."' },
    { t: 'What did Kancil tell the crocodiles?', p: ['The king wanted to give them meat.', 'The king wanted to visit the river.', 'The fruit was poisonous.', 'A hunter was coming.'], j: 0, b: '"The king wants to give meat to every crocodile …"' },
    { t: 'The word "clever" is closest in meaning to …', p: ['smart', 'lazy', 'brave', 'hungry'], j: 0, b: 'Clever = cerdik, pandai (smart).' },
    { t: 'The word "them" in "counted them loudly" refers to …', p: ['the crocodiles', 'the fruits', 'the kings', 'the trees'], j: 0, b: 'Yang dihitung Kancil adalah para buaya.' },
    { k: 'inferensi', t: 'Why did the crocodiles line up across the river?', p: ['They hoped to get meat from the king.', 'They wanted to help Kancil.', 'They wanted to eat the fruit.', 'They were afraid of Kancil.'], j: 0, b: 'Mereka percaya akan diberi daging oleh raja, jadi mereka mau dihitung.' },
    { k: 'inferensi', t: "What was Kancil's real plan?", p: ["To use the crocodiles' backs as a bridge", 'To count the crocodiles for the king', 'To make friends with the crocodiles', 'To give meat to the crocodiles'], j: 0, b: 'Kancil melompat dari punggung ke punggung untuk sampai ke seberang.' },
    { k: 'inferensi', t: 'What can we infer about the crocodiles?', p: ['They were easily fooled.', 'They were very clever.', 'They were not hungry.', "They were Kancil's best friends."], j: 0, b: 'Mereka langsung percaya pada kebohongan Kancil.' },
    { k: 'sikap', t: 'How did the crocodiles feel at the end of the story?', p: ['Angry', 'Grateful', 'Proud', 'Relaxed'], j: 0, b: '"The crocodiles were very angry …"' },
    { k: 'sikap', t: 'How did Kancil probably feel when he reached the other side?', p: ['Relieved and pleased with himself', 'Sad and lonely', 'Afraid and confused', 'Sorry for the crocodiles'], j: 0, b: 'Ia tertawa karena rencananya berhasil.' },
    { k: 'tujuan', t: 'What is the purpose of the text?', p: ['To entertain readers with a folktale', 'To describe what crocodiles eat', 'To explain how to cross a river safely', 'To report news about a forest'], j: 0, b: 'Fabel/cerita rakyat bertujuan menghibur dan menyampaikan pesan.' },
    { k: 'tujuan', t: 'What is the function of the last sentence?', p: ['To give the moral of the story', 'To introduce the characters', 'To describe the problem', 'To describe the river'], j: 0, b: 'Kalimat terakhir adalah coda: pesan moral cerita.' },
    { k: 'evaluasi', t: 'Which proverb best fits the story?', p: ['Brains are better than brawn.', 'Slow and steady wins the race.', 'Honesty is the best policy.', 'Many hands make light work.'], j: 0, b: 'Kancil yang kecil mengalahkan buaya yang besar dengan akalnya.' },
    { k: 'evaluasi', t: "What could be a weakness in Kancil's behavior?", p: ['He lied to get what he wanted.', 'He was too slow to run.', 'He shared his fruit with everyone.', 'He was afraid of the forest.'], j: 0, b: 'Kancil berhasil, tetapi caranya dengan berbohong kepada buaya.' },
    { k: 'evaluasi', t: 'Which situation shows the same lesson as the story?', p: ['A girl stays calm and thinks of a smart way to escape from a stray dog.', 'A boy runs into the river without thinking.', "A student copies a friend's homework.", 'A man gives all his money to a stranger.'], j: 0, b: 'Pesannya: akal yang cerdik menyelamatkan dari bahaya.' }
  ],
  'eat-breakfast': [
    { t: 'What is the main idea of the text?', p: ['Students should eat breakfast before school.', 'Students should buy snacks before lunch.', 'Rice with eggs is the best food.', 'Students often feel sleepy in class.'], j: 0, b: 'Tesis: "every student should eat it before going to school."' },
    { t: 'According to the text, how can we feel without breakfast?', p: ['Weak, sleepy, or dizzy', 'Strong and fresh', 'Happy and excited', 'Full and lazy'], j: 0, b: '"Without it, we may feel weak, sleepy, or dizzy in the morning."' },
    { t: 'Which food is mentioned as a simple breakfast?', p: ['Bread', 'Pizza', 'Ice cream', 'Fried chicken'], j: 0, b: '"… rice with eggs, bread, or fruit …"' },
    { t: 'The word "skip" is closest in meaning to …', p: ['miss', 'cook', 'enjoy', 'buy'], j: 0, b: 'Skip breakfast = melewatkan sarapan (miss).' },
    { t: 'The word "it" in "Without it, we may feel weak" refers to …', p: ['breakfast', 'the night', 'our body', 'energy'], j: 0, b: 'Kalimat sebelumnya membahas sarapan; tanpa sarapan kita lemas.' },
    { k: 'tujuan', t: 'What is the purpose of the text?', p: ['To persuade readers that eating breakfast is important', 'To explain how to cook rice with eggs', 'To describe a school canteen', 'To tell a story about a hungry student'], j: 0, b: 'Eksposisi analitis meyakinkan pembaca dengan argumen.' },
    { k: 'tujuan', t: 'Why does the writer use the words "First", "Second", and "Third"?', p: ['To list the arguments in order', 'To show the times of meals', 'To count the students', 'To give steps for cooking'], j: 0, b: 'Ketiganya menandai urutan argumen penulis.' },
    { k: 'tujuan', t: 'Why does the writer mention rice with eggs, bread, or fruit?', p: ['To show that breakfast can be simple and easy', 'To advertise a restaurant', 'To list foods that are unhealthy', "To describe the writer's favorite lunch"], j: 0, b: 'Penulis menunjukkan bahwa sarapan sederhana pun sudah cukup.' },
    { k: 'inferensi', t: 'What can be inferred about students who skip breakfast?', p: ['They may find it harder to understand lessons.', 'They always get the best scores.', 'They never feel hungry.', 'They eat healthier snacks.'], j: 0, b: 'Sarapan membantu konsentrasi; tanpa sarapan pemahaman pelajaran bisa terganggu.' },
    { k: 'inferensi', t: 'Why do we need energy in the morning according to the text?', p: ['Because we have not eaten for many hours during the night', 'Because lunch is not important', 'Because we sleep at school', 'Because snacks give no energy'], j: 0, b: '"… after we have not eaten for many hours during the night."' },
    { k: 'inferensi', t: 'Which student is most likely to feel dizzy during the first lesson?', p: ['A student who left home without eating anything', 'A student who ate rice with eggs at home', 'A student who had bread and fruit for breakfast', 'A student who woke up early and ate breakfast'], j: 0, b: 'Tanpa sarapan, "we may feel weak, sleepy, or dizzy in the morning."' },
    { k: 'sikap', t: "What is the writer's attitude toward breakfast?", p: ['Strongly supportive', 'Doubtful', 'Against it', 'Uninterested'], j: 0, b: 'Penulis yakin semua siswa harus sarapan.' },
    { k: 'evaluasi', t: "Which fact would best support the writer's argument?", p: ['Students who eat breakfast usually pay better attention in morning lessons.', 'Many students like to play football after school.', 'Some people drink coffee in the afternoon.', 'Bread is made from flour.'], j: 0, b: 'Fakta itu mendukung argumen kedua tentang konsentrasi.' },
    { k: 'evaluasi', t: "Which student follows the writer's advice?", p: ['Dewi eats a banana and some bread even when she is late.', 'Rudi skips breakfast and buys chips at school.', 'Tari sleeps until noon every day.', 'Agus only drinks soda in the morning.'], j: 0, b: 'Sesuai saran: jangan melewatkan sarapan walau terburu-buru; makanan sederhana pun cukup.' },
    { k: 'evaluasi', t: 'Which sentence states an opinion?', p: ['Therefore, we should not skip breakfast, even when we are in a hurry.', 'Without it, we may feel weak, sleepy, or dizzy in the morning.', 'Breakfast gives our body energy after a long night.', 'Rice, eggs, bread, and fruit are kinds of food.'], j: 0, b: 'Kata "should" menunjukkan pendapat/saran penulis.' }
  ],
  'honey-bees': [
    { t: 'What is the text mainly about?', p: ['The life and roles of honey bees in a colony', 'How to make honey at home', 'Why people are afraid of bees', 'The best flowers in a garden'], j: 0, b: 'Teks melaporkan koloni lebah madu, peran ratu, pekerja, pejantan, dan manfaatnya.' },
    { t: 'What type of text is this?', p: ['A report text', 'A narrative text', 'A procedure text', 'A recount text'], j: 0, b: 'Teks menjelaskan fakta umum tentang lebah madu sebagai satu jenis hewan = report.' },
    { t: 'What is the main job of the queen?', p: ['To lay eggs', 'To collect nectar', 'To clean the hive', 'To protect the colony from enemies'], j: 0, b: '"… her main job is to lay eggs."' },
    { t: 'The word "store" in "store it in the comb" is closest in meaning to …', p: ['keep', 'sell', 'eat', 'throw'], j: 0, b: 'Store = menyimpan (keep).' },
    { t: 'The word "They" in "They collect nectar and pollen" refers to …', p: ['the female workers', 'the drones', 'the queens', 'the flowers'], j: 0, b: 'Kalimat sebelumnya membahas lebah pekerja betina.' },
    { k: 'inferensi', t: 'Which bees in a colony would most likely be safe to touch without being stung?', p: ['The drones', 'The workers', 'The queen and the workers', 'All the female bees'], j: 0, b: '"The male bees, called drones, have no stings …" Jadi pejantanlah yang tidak bisa menyengat.' },
    { k: 'inferensi', t: 'What can be inferred about worker bees?', p: ['They do most of the work in the colony.', 'They are all male.', 'They lay all the eggs.', 'They never leave the hive.'], j: 0, b: 'Pekerja mengumpulkan nektar, membangun sarang, membersihkan, dan menjaga sarang.' },
    { k: 'inferensi', t: 'What would most likely happen to many plants if there were no bees?', p: ['They would produce less fruit and fewer seeds.', 'They would grow taller.', 'They would make more honey.', 'They would have more flowers.'], j: 0, b: 'Lebah membawa serbuk sari yang membantu tumbuhan menghasilkan buah dan biji.' },
    { k: 'inferensi', t: 'Why is the queen important to the colony?', p: ['Without her eggs, the colony could not grow.', 'She collects the most nectar.', 'She protects the hive alone.', 'She makes all the honey.'], j: 0, b: 'Ratu satu-satunya yang bertelur, sampai dua ribu butir sehari.' },
    { k: 'tujuan', t: 'What is the purpose of the text?', p: ['To give general information about honey bees', 'To tell a funny story about a bee', 'To persuade people to buy honey', 'To explain how to build a hive'], j: 0, b: 'Teks report bertujuan memberi informasi umum tentang sesuatu.' },
    { k: 'tujuan', t: 'Why does the writer mention that the queen can lay up to two thousand eggs a day?', p: ['To show how a colony can have so many bees', 'To show that the queen is lazy', 'To compare bees with chickens', 'To explain how honey is made'], j: 0, b: 'Jumlah telur yang sangat banyak menjelaskan mengapa koloni bisa beranggotakan puluhan ribu lebah.' },
    { k: 'tujuan', t: 'What is the function of the last sentence?', p: ['To show how bees are useful to plants', 'To describe the queen', 'To explain how bees sting', 'To introduce the topic'], j: 0, b: 'Kalimat terakhir menjelaskan peran lebah dalam penyerbukan.' },
    { k: 'sikap', t: 'What is the tone of the text?', p: ['Informative and neutral', 'Angry', 'Sad', 'Humorous'], j: 0, b: 'Teks report menyampaikan fakta secara netral.' },
    { k: 'evaluasi', t: 'Which statement is NOT supported by the text?', p: ['Drones are the strongest workers in the hive.', 'A colony has only one queen.', 'Workers collect nectar and pollen.', 'Bees store honey in the comb.'], j: 0, b: 'Pejantan tidak disebut sebagai pekerja; tugas utamanya kawin dengan ratu.' },
    { k: 'evaluasi', t: 'Which fact would best fit in this text?', p: ['Worker bees tell other bees where flowers are by doing a special dance.', 'Snakes can swallow eggs whole.', 'Butterflies begin life as caterpillars.', 'Rice grows best in wet fields.'], j: 0, b: 'Hanya fakta itu yang membahas perilaku lebah madu.' }
  ],
  'how-rain-forms': [
    { t: 'What is the text mainly about?', p: ['The process of how rain is formed', 'Why people like rainy days', 'How to stay dry in the rain', 'The history of weather reports'], j: 0, b: 'Teks menjelaskan tahapan terbentuknya hujan.' },
    { t: 'What does the sun do at the beginning of the process?', p: ['It heats the water in oceans, lakes, and rivers.', 'It makes the clouds heavy.', 'It cools the water vapor.', 'It pushes the drops down.'], j: 0, b: '"The process begins when the sun heats the water in oceans, lakes, and rivers."' },
    { t: 'When do the drops fall to the earth?', p: ['When they become too heavy to float in the air', 'When the sun heats them', 'When they turn into gas', 'When the air is warm'], j: 0, b: '"When the drops become too heavy to float in the air, they fall to the earth as rain."' },
    { t: 'The word "invisible" is closest in meaning to …', p: ['cannot be seen', 'very heavy', 'very cold', 'easy to touch'], j: 0, b: 'Invisible = tidak terlihat.' },
    { t: 'The word "they" in "they fall to the earth as rain" refers to …', p: ['the drops', 'the clouds', 'the rivers', 'the gases'], j: 0, b: 'Yang jatuh sebagai hujan adalah tetesan air (the drops).' },
    { k: 'tujuan', t: 'What is the purpose of the text?', p: ['To explain how rain is formed', 'To describe a rainy village', 'To persuade people to save water', 'To tell a story about a cloud'], j: 0, b: 'Teks eksplanasi menjelaskan proses terjadinya suatu fenomena.' },
    { k: 'tujuan', t: 'What is the function of the first sentence?', p: ['To give a general statement about rain', 'To explain the last step of the process', "To give the writer's opinion", 'To describe how clouds look'], j: 0, b: 'Kalimat pertama adalah general statement: pengertian hujan.' },
    { k: 'tujuan', t: 'Why does the writer end the text with "the cycle starts again"?', p: ['To show that the process happens over and over', 'To show that rain stops forever', 'To introduce a new topic', 'To describe the color of the sea'], j: 0, b: 'Proses ini berulang terus; itulah sebabnya disebut siklus.' },
    { k: 'inferensi', t: 'What can be inferred about air high in the sky?', p: ['It is colder than the air near the ground.', 'It is hotter than the air near the sea.', 'It has no water at all.', 'It is always heavy.'], j: 0, b: '"… rises high into the sky, where the air is much colder."' },
    { k: 'inferensi', t: 'What would most likely happen if the droplets in a cloud did not join together?', p: ['They would stay too light to fall as rain.', 'They would fall faster.', 'They would turn into rivers.', 'They would become hotter.'], j: 0, b: 'Tetesan baru jatuh setelah bergabung menjadi lebih besar dan berat.' },
    { k: 'inferensi', t: 'Why does the vapor change back into water droplets?', p: ['Because it cools down in the cold air', 'Because the sun heats it', 'Because it touches the ground', 'Because it becomes invisible'], j: 0, b: '"There, the vapor cools down and changes back into tiny water droplets."' },
    { k: 'sikap', t: 'What is the tone of the text?', p: ['Informative', 'Worried', 'Angry', 'Humorous'], j: 0, b: 'Teks eksplanasi menyampaikan proses ilmiah secara netral dan informatif.' },
    { k: 'evaluasi', t: 'Which sentence shows the correct order of the process?', p: ['Water heats up, vapor rises, vapor cools into droplets, drops fall as rain.', 'Drops fall, vapor rises, the sun heats water, clouds form.', 'Clouds form, the sun heats water, rain falls, vapor rises.', 'Vapor cools, the sun heats water, rain falls, clouds disappear.'], j: 0, b: 'Urutan dalam teks: pemanasan, penguapan, pendinginan (pengembunan), lalu hujan.' },
    { k: 'evaluasi', t: 'Which everyday example is most similar to the way clouds form?', p: ['Water drops appear on the outside of a cold glass of ice water.', 'Salt disappears in a glass of water.', 'Ice cream melts in the sun.', 'A candle burns slowly.'], j: 0, b: 'Uap air mendingin dan berubah menjadi titik air, sama seperti pembentukan awan.' },
    { k: 'evaluasi', t: 'Which statement is NOT correct according to the text?', p: ['Water vapor can easily be seen in the air.', 'The sun starts the process.', 'Clouds are made of tiny water droplets.', 'Rainwater flows back into rivers and seas.'], j: 0, b: 'Uap air adalah gas yang tak terlihat (invisible).' }
  ],
  'public-transport': [
    { t: 'What is the main argument of the text?', p: ['People in Indonesian cities should use public transport.', 'Public transport in Indonesia is already perfect.', 'Cars are cheaper than buses.', 'The government should build more roads.'], j: 0, b: 'Tesis di paragraf 1: "it is time for all of us to leave our private vehicles at home and use public transport instead."' },
    { t: 'What type of text is this?', p: ['Hortatory exposition', 'News item', 'Narrative', 'Procedure'], j: 0, b: 'Penulis menyampaikan tesis, argumen (First, Second, Third), lalu ajakan "let us start today". Itu ciri hortatory exposition.' },
    { t: 'According to the text, how many passengers can one bus carry?', p: ['Up to fifty', 'Only one or two', 'About five hundred', 'Exactly twenty'], j: 0, b: '"One bus can carry up to fifty passengers …"' },
    { t: 'According to paragraph 4, what must car owners pay for?', p: ['Fuel, parking, and repairs', 'Bus and train tickets', 'School fees and books', 'Hospital bills'], j: 0, b: '"Car owners must pay for fuel, parking, and repairs …"' },
    { t: 'The word "congestion" in paragraph 2 is closest in meaning to …', p: ['heavy traffic', 'clean air', 'cheap tickets', 'road repair'], j: 0, b: 'congestion = kemacetan, yaitu lalu lintas yang padat.' },
    { t: 'The word "them" in "Most of them travel alone" refers to …', p: ['millions of people in Indonesian cities', 'traffic jams', 'private cars', 'motorcycles'], j: 0, b: 'Kalimat sebelumnya membicarakan "millions of people in Indonesian cities".' },
    { t: 'How is the text organized?', p: ['Thesis – arguments – recommendation', 'Orientation – complication – resolution', 'Goal – materials – steps', 'Main event – background – sources'], j: 0, b: 'Paragraf 1 tesis, paragraf 2–4 argumen, paragraf 5 ajakan (recommendation).' },
    { k: 'inferensi', t: 'What can be inferred about ambulances in Indonesian cities?', p: ['They are often slowed down by heavy traffic.', 'They never use city roads.', 'They cause most of the air pollution.', 'They carry fifty passengers at a time.'], j: 0, b: 'Penulis menyebut sopir ambulans bisa sampai lebih cepat bila kendaraan berkurang; artinya sekarang mereka sering terhambat macet.' },
    { k: 'inferensi', t: 'It can be inferred that the writer thinks the weaknesses of public transport …', p: ['can be reduced over time', 'are too serious to fix', 'are caused by the passengers', 'do not exist at all'], j: 0, b: 'Penulis mengakui kekurangan, lalu menyebut pemerintah menambah rute dan memperbaiki stasiun setiap tahun.' },
    { k: 'inferensi', t: 'Why does the writer probably mention the Transjakarta bus?', p: ['To give a real example of a cheap ticket', 'To complain about its service', 'To show that buses are faster than trains', 'To advertise a new bus company'], j: 0, b: 'Transjakarta menjadi contoh nyata tiket murah, "only a few thousand rupiah".' },
    { k: 'tujuan', t: 'Why does the writer compare one bus with one car in paragraph 2?', p: ['To show that buses move more people with fewer vehicles', 'To explain how buses are made', 'To prove that cars are more comfortable', 'To describe the color of the buses'], j: 0, b: 'Satu bus membawa lima puluh orang, satu mobil hanya satu atau dua; jadi bus mengurangi jumlah kendaraan.' },
    { k: 'tujuan', t: 'What is the purpose of the last paragraph?', p: ['To admit some weaknesses and invite readers to act', 'To describe the history of buses in Indonesia', 'To list the prices of all tickets', 'To blame the government for traffic jams'], j: 0, b: 'Paragraf 5 mengakui kekurangan ("not perfect yet") lalu mengajak: "let us start today".' },
    { k: 'sikap', t: "What is the writer's attitude toward public transport?", p: ['Supportive', 'Doubtful', 'Uninterested', 'Angry'], j: 0, b: 'Penulis "strongly believe" dan mengajak pembaca memakai transportasi umum.' },
    { k: 'sikap', t: 'The tone of the final sentence is …', p: ['hopeful', 'sad', 'angry', 'humorous'], j: 0, b: '"… less traffic, cleaner air, and a brighter future" menunjukkan harapan.' },
    { k: 'evaluasi', t: "Which fact, if true, would most STRENGTHEN the writer's second argument?", p: ['Air quality in a city improved after more people started taking buses.', 'Bus tickets became more expensive this year.', 'Many people prefer driving alone.', 'New cars are faster than old ones.'], j: 0, b: 'Argumen kedua: transportasi umum melindungi lingkungan; udara membaik saat orang beralih ke bus menguatkannya.' },
    { k: 'evaluasi', t: 'Which statement from the text is an OPINION rather than a fact?', p: ['It is time for all of us to leave our private vehicles at home.', 'One bus can carry up to fifty passengers.', 'Car owners must pay for parking.', 'A car usually carries only one or two people.'], j: 0, b: 'Kalimat itu didahului "I strongly believe", jadi pendapat penulis. Pilihan lain informasi yang bisa dibuktikan.' },
    { k: 'evaluasi', t: "Which person best follows the writer's advice?", p: ['Sari takes the train to work twice a week instead of driving.', 'Budi buys a second car for his family.', 'Rina drives alone to the market every day.', 'Andi rides his motorcycle so that he can avoid buses.'], j: 0, b: 'Ajakan penulis: naik bus atau kereta setidaknya sekali seminggu.' },
    { t: 'Which reasons does the writer give for using public transport?', p: ['It can reduce traffic congestion.', 'It helps to protect the environment.', 'It is cheaper than driving.', 'It is always comfortable and never crowded.', 'It is available in every area of Indonesia.'], j: [0, 1, 2], b: 'Tiga argumen: First (macet), Second (lingkungan), Third (murah). Paragraf 5 justru menyebut bus kadang penuh dan sebagian daerah belum punya layanan baik.' },
    { t: 'Tentukan benar atau salah menurut teks.', bs: [['Most people in the cities travel alone in private vehicles.', true], ['The writer says public transport in Indonesia is already perfect.', false], ['Smoke from vehicles can cause breathing problems.', true], ['The writer asks readers to stop using cars forever.', false]], b: 'Paragraf 1: kebanyakan bepergian sendirian. Paragraf 3: asap menyebabkan gangguan napas. Paragraf 5: "not perfect yet" dan ajakannya hanya "at least once a week".' }
  ],
  'robotics-news': [
    { t: 'What is the text mainly about?', p: ['A team of Bandung students winning a national robotics competition', 'How to build a robot from plastic bottles', 'The life of farmers in West Java', 'A robotics competition in Japan'], j: 0, b: 'Paragraf 1 (berita utama): empat siswa Bandung juara pertama Kompetisi Robotik Pelajar Nasional.' },
    { t: 'What type of text is this?', p: ['News item', 'Narrative', 'Hortatory exposition', 'Procedure'], j: 0, b: 'Teks melaporkan peristiwa aktual (main event), latar belakang, dan pernyataan narasumber. Itu news item.' },
    { t: 'Where was the competition held?', p: ['In Jakarta', 'In Bandung', 'In Japan', 'In a rice field in West Java'], j: 0, b: '"… which was held in Jakarta last Saturday."' },
    { t: 'According to the text, what did each robot have to do?', p: ['Find plants that needed water and water them', 'Plant new rice seeds', 'Carry rice to the market', 'Catch birds in the rice field'], j: 0, b: '"… find the plants that needed water, and water them without damaging the young rice."' },
    { t: 'Where did the team usually work on the robot?', p: ['In the school library after classes', 'In a special laboratory', 'In a factory in Jakarta', "At Nadia's house on weekends"], j: 0, b: '"… the school did not have a special laboratory, so the team often worked in the library after classes."' },
    { t: 'The word "accuracy" in paragraph 2 is closest in meaning to …', p: ['correctness', 'speed', 'beauty', 'size'], j: 0, b: 'accuracy = ketepatan; Si Kancil menyiram setiap tanaman "correctly".' },
    { t: 'The word "it" in "so we had to rebuild most of it" refers to …', p: ['the robot', 'the competition', 'the rice field', 'the team'], j: 0, b: 'Yang terjatuh dan dibangun ulang adalah robot ("our robot fell over").' },
    { t: 'Which paragraph tells the readers what the winners received?', p: ['Paragraph 5', 'Paragraph 2', 'Paragraph 3', 'Paragraph 4'], j: 0, b: 'Paragraf 5: "the team received a trophy and a scholarship of fifty million rupiah."' },
    { k: 'inferensi', t: 'What can be inferred about the team from the cheap materials they used?', p: ['They had a limited budget but were creative.', 'They did not care about winning.', 'They received a lot of money from sponsors.', 'They copied a robot from another school.'], j: 0, b: 'Mereka memakai botol bekas dan mainan rusak "to keep their costs low": dana terbatas, tetapi kreatif.' },
    { k: 'inferensi', t: 'Why did the judges probably give Si Kancil a high score?', p: ['It was fast and watered every plant correctly.', 'It was the most expensive robot.', 'It was the biggest robot in the competition.', 'It was made in a special laboratory.'], j: 0, b: 'Kriteria juri: kecepatan, ketepatan, kreativitas; Si Kancil selesai kurang dari empat menit dan tepat semua.' },
    { k: 'inferensi', t: 'Which statement about the team is most likely true?', p: ['They did not give up after their robot fell over.', 'They finished the robot in one week.', 'They had never failed before the competition.', 'They worked only during school hours.'], j: 0, b: 'Robot jatuh dua minggu sebelum lomba, tetapi mereka membangunnya ulang dan menang.' },
    { k: 'tujuan', t: 'Why does the writer include the words of Nadia Putri?', p: ['To show the difficulties the team faced', 'To describe the rules of the competition', 'To explain the prize money', 'To advertise the school'], j: 0, b: 'Kutipan Nadia ("We failed many times …") menunjukkan kesulitan yang dihadapi tim.' },
    { k: 'tujuan', t: 'What is the function of the first paragraph?', p: ['To present the main event in brief', "To give the teacher's opinion", 'To describe the prize', "To explain the students' future plans"], j: 0, b: 'Paragraf pertama berita memuat inti peristiwa: siapa, apa, di mana, kapan.' },
    { k: 'sikap', t: "How does Pak Hendra feel about his students' achievement?", p: ['Proud', 'Disappointed', 'Worried', 'Jealous'], j: 0, b: '"… said he was proud of the students\' hard work."' },
    { k: 'evaluasi', t: 'What lesson can readers learn from the text?', p: ['Hard work and creativity can lead to success even with limited facilities.', 'Only rich schools can win competitions.', 'Robots will soon replace all farmers.', 'Students should not join competitions.'], j: 0, b: 'Pak Hendra: "creativity is more important than expensive equipment."' },
    { k: 'evaluasi', t: "Which fact would best SUPPORT Pak Hendra's statement about creativity?", p: ['Si Kancil, made from old bottles and broken toys, beat robots with expensive parts.', 'The trophy was very large.', 'The competition was held on a Saturday.', 'The team leader is a girl.'], j: 0, b: 'Robot dari bahan murah yang mengalahkan robot mahal mendukung pendapat bahwa kreativitas lebih penting dari peralatan mahal.' },
    { k: 'sikap', t: 'How did the team probably feel when their robot fell over two weeks before the competition?', p: ['Worried but still determined', 'Relaxed and careless', 'Proud and satisfied', 'Bored and uninterested'], j: 0, b: 'Kejadian itu mengkhawatirkan, tetapi mereka tetap membangun ulang robotnya.' },
    { k: 'tujuan', t: "Why does the writer mention the students' plan in the last sentence?", p: ['To show that the robot may be useful in real life', 'To explain the rules of the competition', 'To describe the trophy', 'To complain about farmers in West Java'], j: 0, b: 'Rencana agar Si Kancil dipakai petani sungguhan menunjukkan manfaat nyata robot itu.' },
    { t: 'Which statements are TRUE about Si Kancil?', p: ['It was built to help farmers.', 'It completed the task in less than four minutes.', 'It was made partly from old plastic bottles.', 'It is already used by farmers in West Java.', 'It was built in a special laboratory.'], j: [0, 1, 2], b: 'Paragraf 2 dan 3 mendukung tiga pernyataan pertama. Petani belum memakainya (baru rencana), dan sekolah tidak punya laboratorium khusus.' },
    { t: 'Tentukan benar atau salah menurut teks.', bs: [['Thirty-five other schools took part in the competition.', true], ['Nadia Putri is the teacher of the team.', false], ['The team will compete in Japan next year.', true], ['The prize was a new laboratory.', false]], b: 'Paragraf 1: tiga puluh lima sekolah lain. Nadia adalah ketua tim, gurunya Pak Hendra. Hadiahnya piala dan beasiswa; mereka akan ke Jepang tahun depan.' }
  ],
  'laskar-pelangi-review': [
    { t: 'What is the text mainly about?', p: ['A review of the novel Laskar Pelangi', 'The biography of Andrea Hirata', 'The history of Belitung island', 'How to become a good teacher'], j: 0, b: 'Teks menilai novel Laskar Pelangi: ringkasan cerita, kelebihan, kelemahan, dan rekomendasi.' },
    { t: 'What type of text is this?', p: ['Review', 'Recount', 'News item', 'Explanation'], j: 0, b: 'Ada orientasi, ringkasan isi, evaluasi (kelebihan dan kelemahan), dan kesimpulan berupa rekomendasi. Itu review.' },
    { t: 'When was Laskar Pelangi published?', p: ['In two thousand five', 'In two thousand eight', 'In nineteen ninety-five', 'In two thousand fifteen'], j: 0, b: '"It was published in two thousand five …"' },
    { t: 'Why was the school about to be closed?', p: ['It might not have at least ten new students.', 'Its teacher wanted to move to Sumatra.', 'Its building was destroyed by a flood.', 'The students failed their exams.'], j: 0, b: '"The government will only allow the school to stay open if it has at least ten new students."' },
    { t: 'The word "devoted" in paragraph 2 is closest in meaning to …', p: ['dedicated', 'lazy', 'strict', 'wealthy'], j: 0, b: 'devoted = penuh pengabdian, sangat berdedikasi.' },
    { t: 'The word "he" in "yet he is the most brilliant student" refers to …', p: ['Lintang', 'Mahar', 'Harun', 'Pak Harfan'], j: 0, b: 'Kalimat itu membicarakan Lintang, anak nelayan yang bersepeda jauh.' },
    { t: 'Which paragraph discusses the weaknesses of the novel?', p: ['Paragraph 4', 'Paragraph 1', 'Paragraph 2', 'Paragraph 3'], j: 0, b: 'Paragraf 4 dibuka "However, the novel is not without weaknesses."' },
    { k: 'inferensi', t: 'What can be inferred about the school in the novel?', p: ['It had very poor facilities.', 'It was the richest school on the island.', 'It had hundreds of students.', 'It was built by the government.'], j: 0, b: 'Sekolahnya miskin, hampir ditutup, dan atapnya bocor.' },
    { k: 'inferensi', t: 'How did people probably feel when Harun appeared?', p: ['Relieved and happy', 'Angry and upset', 'Bored and tired', 'Scared and confused'], j: 0, b: 'Sebelumnya semua putus asa; Harun membuat jumlah murid menjadi sepuluh sehingga sekolah selamat.' },
    { k: 'inferensi', t: 'Which kind of reader might find the novel difficult?', p: ['A young reader who is not used to long descriptions', 'A teacher who loves education stories', 'An adult who enjoys moving stories', 'A student who needs motivation'], j: 0, b: 'Deskripsi panjang dan istilah ilmiah "may slow down young readers".' },
    { k: 'tujuan', t: 'Why does the writer mention that Lintang meets crocodiles on the road?', p: ['To show how hard Lintang struggles to go to school', 'To describe the animals of Belitung', 'To explain why the school was closed', 'To show that Lintang is afraid of animals'], j: 0, b: 'Detail buaya menegaskan perjuangan Lintang yang berat demi sekolah.' },
    { k: 'tujuan', t: 'What is the purpose of the last paragraph?', p: ["To give the writer's final judgment and recommendation", 'To summarize the life of Andrea Hirata', 'To list the weaknesses of the novel', 'To tell the ending of the story'], j: 0, b: 'Paragraf 5: "Overall, …" dan "I highly recommend it …".' },
    { k: 'sikap', t: "What is the reviewer's overall attitude toward the novel?", p: ['Positive, although the reviewer notes some weaknesses', 'Completely negative', 'Uninterested', 'Confused'], j: 0, b: 'Penulis menyebut kelemahan, tetapi menyimpulkan novel itu "inspiring and moving" dan merekomendasikannya.' },
    { k: 'evaluasi', t: 'Which statement from the text is an OPINION?', p: ['Laskar Pelangi is an inspiring and moving novel.', 'It was published in two thousand five.', 'The story is set on Belitung.', 'Laskar Pelangi is the first novel by Andrea Hirata.'], j: 0, b: '"Inspiring and moving" adalah penilaian penulis; pilihan lain fakta.' },
    { k: 'evaluasi', t: 'What lesson does the novel teach, according to the reviewer?', p: ['Every child, rich or poor, has the right to education.', 'Only rich children can become smart.', 'Students should leave school to work.', 'Small schools should be closed.'], j: 0, b: '"It reminds us that education is a right for every child, not only for the rich."' },
    { k: 'sikap', t: 'How does the reviewer feel about the ending of the novel?', p: ['It is sad and may disappoint some readers.', 'It is funny and exciting.', 'It is the best part of the book.', 'It is too short to understand.'], j: 0, b: '"… the ending is quite sad, which may disappoint readers who expect a happy conclusion."' },
    { k: 'evaluasi', t: "Which statement would most WEAKEN the reviewer's criticism in paragraph 4?", p: ['Many young readers say the scientific terms are easy to understand.', 'The novel has more than thirty chapters.', 'Some readers prefer happy endings.', 'The novel was published in two thousand five.'], j: 0, b: 'Kritiknya: istilah ilmiah dapat memperlambat pembaca muda. Bila pembaca muda merasa mudah, kritik itu melemah.' },
    { t: 'Which statements about the characters are TRUE according to the text?', p: ['Lintang is the son of a poor fisherman.', 'Mahar helps the school win an art carnival.', 'Bu Muslimah is a young teacher.', 'Harun is the headmaster of the school.', 'Lintang is the weakest student in the class.'], j: [0, 1, 2], b: 'Harun adalah murid kesepuluh (kepala sekolahnya Pak Harfan), dan Lintang justru murid paling cerdas.' },
    { t: 'Tentukan benar atau salah menurut teks.', bs: [["The story is based on the writer's own childhood.", true], ['Ten children arrived on the first day.', false], ['The reviewer thinks the ending is happy.', false], ['The reviewer recommends the novel to teachers.', true]], b: 'Paragraf 1: masa kecil penulis. Paragraf 2: hanya sembilan yang datang dulu. Paragraf 4: akhirnya cukup sedih. Paragraf 5: direkomendasikan untuk guru.' }
  ],
  'how-tsunamis-happen': [
    { t: 'What is the text mainly about?', p: ['How tsunamis form and how their damage can be reduced', 'The history of earthquakes in Japan', 'How to build a ship that survives a tsunami', 'The eruption of Anak Krakatau'], j: 0, b: 'Teks menjelaskan pengertian, penyebab, proses, tanda, dan cara mengurangi dampak tsunami.' },
    { t: 'What type of text is this?', p: ['Explanation', 'Narrative', 'Review', 'News item'], j: 0, b: 'Teks menjelaskan proses terjadinya fenomena alam (general statement, sequence of explanation, closing). Itu explanation.' },
    { t: 'According to the text, what causes most tsunamis?', p: ['Strong earthquakes under the sea', 'Strong winds over the ocean', 'Heavy rain near the coast', 'Large ships in the harbour'], j: 0, b: '"Most tsunamis are caused by strong earthquakes under the sea."' },
    { t: 'Why may people on ships not notice a tsunami in the deep ocean?', p: ['Its waves are usually less than one metre high.', 'It travels very slowly.', 'It only happens at night.', 'It is hidden by thick fog.'], j: 0, b: '"… its waves are usually less than one metre high, so people on ships may not even notice them."' },
    { t: 'The word "immediately" in paragraph 4 is closest in meaning to …', p: ['at once', 'slowly', 'later', 'carefully'], j: 0, b: 'immediately = segera, tanpa menunggu.' },
    { t: 'The word "it" in "pushes the whole column of water above it" refers to …', p: ['the sea floor', 'the pressure', 'the plate', 'the wave'], j: 0, b: 'Kalimat sebelumnya: "the sea floor suddenly moves up or down". Air di atas dasar laut itulah yang terdorong.' },
    { t: 'How is the information in paragraph 2 organized?', p: ['As a sequence of causes and effects', 'As a comparison of two countries', 'As a list of opinions', 'As a story with a complication'], j: 0, b: 'Paragraf 2: lempeng tersangkut → tekanan menumpuk → dilepas → dasar laut bergerak → gelombang menyebar.' },
    { k: 'inferensi', t: 'What can be inferred from the fact that the waves slow down near the shore?', p: ['The water piles up and the waves become much higher.', 'The tsunami becomes harmless.', 'The waves disappear before reaching land.', 'The waves move back to the deep ocean.'], j: 0, b: 'Gelombang melambat, energinya terdorong ke atas, sehingga gelombang meninggi.' },
    { k: 'inferensi', t: 'Why did many people probably become victims in places where the sea pulled back?', p: ['They walked to the beach instead of running to higher ground.', 'They were sleeping on ships.', 'They stayed on top of tall hills.', 'They heard the warning too early.'], j: 0, b: 'Paragraf 4: banyak orang tidak memahami tanda itu dan justru berjalan ke pantai.' },
    { k: 'inferensi', t: 'Which place would be the SAFEST during a tsunami warning?', p: ['A hill far from the beach', 'A fishing boat near the harbour', 'A sandy beach', 'A house by the river mouth'], j: 0, b: 'Teks menyarankan lari "to higher ground"; bukit yang jauh dari pantai paling aman.' },
    { k: 'tujuan', t: 'Why does the writer compare a tsunami with a jet plane?', p: ['To show how fast a tsunami moves in the deep ocean', 'To explain how planes cause tsunamis', 'To describe the height of the waves', 'To show that tsunamis can fly'], j: 0, b: 'Perbandingan itu menegaskan kecepatan tsunami di laut dalam.' },
    { k: 'tujuan', t: 'Why does the writer mention the Aceh tsunami of two thousand four?', p: ['To show how deadly a tsunami can be', 'To describe the culture of Aceh', 'To explain how volcanoes erupt', 'To prove that tsunamis are rare'], j: 0, b: 'Lebih dari dua ratus ribu korban menunjukkan betapa mematikannya tsunami.' },
    { k: 'tujuan', t: 'What is the function of the last paragraph?', p: ['To explain how the damage of tsunamis can be reduced', 'To describe how plates move', 'To tell the history of the word tsunami', 'To compare tsunamis and floods'], j: 0, b: 'Paragraf 5: sistem peringatan dini, latihan evakuasi, dan pentingnya pemahaman.' },
    { k: 'sikap', t: 'The writer presents the information in a … way.', p: ['factual and informative', 'humorous', 'angry', 'romantic'], j: 0, b: 'Teks eksplanasi menyajikan fakta ilmiah secara objektif.' },
    { k: 'evaluasi', t: 'A student at a beach feels a strong earthquake and sees the sea pull back. Based on the text, what should she do?', p: ['Run to higher ground right away', 'Walk to the beach to collect fish', 'Wait on the sand for a warning message', 'Take a boat out to sea to watch'], j: 0, b: 'Laut surut adalah peringatan alam; saatnya "run to higher ground immediately".' },
    { k: 'evaluasi', t: 'Which fact, if true, would best SUPPORT the idea that evacuation drills save lives?', p: ['Students who practised drills reached safe places faster during a real tsunami.', 'Some schools are far from the sea.', 'Tsunami waves travel as fast as jet planes.', 'Earthquakes happen often in Indonesia.'], j: 0, b: 'Bukti bahwa siswa yang berlatih lebih cepat sampai di tempat aman langsung mendukung manfaat latihan evakuasi.' },
    { k: 'evaluasi', t: 'Which action best applies the information in the last paragraph?', p: ['A coastal school practises an evacuation route every semester.', 'A village builds houses closer to the beach.', 'A family ignores warnings after an earthquake.', 'A town removes its warning sirens.'], j: 0, b: 'Paragraf 5: sekolah pesisir mengadakan latihan evakuasi agar siswa tahu ke mana harus pergi.' },
    { t: 'Which can cause a tsunami, according to the text?', p: ['Strong earthquakes under the sea', 'Underwater landslides', 'Volcanic eruptions', 'Strong winds on land', 'Heavy rain in the mountains'], j: [0, 1, 2], b: 'Paragraf 2: gempa bawah laut, longsor bawah laut, dan letusan gunung api. Angin dan hujan tidak disebut.' },
    { t: 'Tentukan benar atau salah menurut teks.', bs: [['The word tsunami comes from Japanese.', true], ['Tsunami waves are always very high in the deep ocean.', false], ['Indonesia has an early warning system.', true], ['Tsunamis can be completely prevented.', false]], b: 'Paragraf 1: dari bahasa Jepang. Paragraf 3: di laut dalam kurang dari satu meter. Paragraf 5: ada sistem peringatan dini, tetapi tsunami tidak dapat dicegah.' }
  ],
  'mangrove-forests': [
    { k: 'ide', t: 'What is the text mainly about?', p: ["The value of Indonesia's mangroves, the main cause of their loss, and how they can be restored effectively", 'Why mangroves store more carbon than any other type of forest on Earth', "Why shrimp farming should be banned along all of Indonesia's coasts", 'How mangroves protect coastal villages from tsunamis and storms', 'How coastal villages in northern Java have changed over the past fifty years'], j: 0, b: 'Teks membahas nilai mangrove (karbon, perlindungan pantai), penyebab hilangnya (tambak), dan cara pemulihan yang efektif. Pilihan lain hanya sebagian isi atau berlebihan.' },
    { k: 'ide', t: 'Which is the best title for the text?', p: ['Mangroves: Valuable, Vanishing, and Worth Restoring Wisely', 'Shrimp Ponds: An Economic Success Story', 'A Simple Guide to Planting Mangrove Seedlings', 'The Sinking Villages of Northern Java', 'Carbon in the Soil: An Unsolved Scientific Mystery'], j: 0, b: 'Judul itu mencakup tiga hal pokok: nilai mangrove, hilangnya mangrove, dan pemulihan yang bijak.' },
    { k: 'rinci', t: 'According to paragraph 2, where is most of the carbon in a mangrove forest stored?', p: ['In the waterlogged soil beneath the trees', 'In the trunks and branches of the trees', 'In the roots that rise above the mud', 'In the seawater surrounding the forest', 'In the atmosphere above the forest'], j: 0, b: '"Most of this carbon is not held in the trees themselves but is locked in the waterlogged soil beneath them."' },
    { k: 'kata', t: 'The word "mistaken" in paragraph 2 is closest in meaning to …', p: ['incorrect', 'unpopular', 'old-fashioned', 'harmful', 'careless'], j: 0, b: '"this view was badly mistaken" = pandangan itu sangat keliru (incorrect).' },
    { k: 'rujukan', t: '"… although mangroves cannot stop the largest waves on their own." The word "their" refers to …', p: ['mangroves', 'villages', 'storms', 'the largest waves', 'the people behind them'], j: 0, b: 'Mangrove tidak dapat menghentikan gelombang terbesar dengan sendirinya.' },
    { k: 'organisasi', t: 'What is the relationship between paragraph 3 and paragraph 4?', p: ['Paragraph 3 describes the benefits of mangroves, while paragraph 4 explains how they have been lost in spite of those benefits.', 'Paragraph 4 gives further examples that support the benefits described in paragraph 3.', 'Paragraph 4 offers solutions to the problems described in paragraph 3.', 'Paragraph 4 disproves the claim in paragraph 3 that mangroves protect villages.', 'Paragraph 4 repeats the ideas of paragraph 3 using examples from Java.'], j: 0, b: '"Despite these benefits …" menghubungkan manfaat (paragraf 3) dengan hilangnya mangrove (paragraf 4).' },
    { k: 'rinci', t: 'Which of the following are mentioned as ways in which mangroves benefit coastal communities?', p: ['Slowing down waves', 'Trapping sediment', 'Serving as nurseries for fish, crabs, and shrimp', 'Providing fresh drinking water', 'Stopping even the largest tsunami waves completely'], j: [0, 1, 2], b: 'Paragraf 3. Air minum tidak disebut, dan mangrove justru tidak dapat menghentikan gelombang terbesar.' },
    { t: 'Tentukan benar atau salah berdasarkan teks.', bs: [['Mangroves can survive in salty water.', true], ['Mangroves were always valued as important forests.', false], ['Clearing mangroves can release carbon dioxide into the atmosphere.', true], ['Most shrimp ponds built on mangrove land stayed productive for decades.', false]], b: 'Mangrove dulu dianggap rawa tak berguna; banyak tambak ditinggalkan setelah beberapa tahun.' },
    { k: 'inferensi', t: 'It can be inferred from paragraph 1 that the earlier view of mangroves …', p: ['judged land mainly by its immediate economic use rather than its ecological functions', 'was based on careful scientific measurements of carbon', 'recognized their role in coastal protection but not in carbon storage', 'was held only by foreign scientists who had never visited Indonesia', 'led directly to the abandonment of shrimp ponds'], j: 0, b: 'Mangrove dianggap "useless swamps" yang sebaiknya dibuka "for more profitable uses": yang dihitung hanya keuntungan langsung.' },
    { k: 'inferensi', t: 'If a mangrove forest is cleared and its soil is dug up to build a pond, what would most likely happen?', p: ['Carbon stored in the soil for a long time could enter the atmosphere.', 'The carbon would stay locked in the soil permanently.', 'The shrimp in the pond would absorb most of the released carbon.', 'The coastline would gain more sediment than before.', 'Nearby forests would immediately store less carbon.'], j: 0, b: 'Karbon terkunci di tanah; "When the forests are cleared, much of this stored carbon can be released into the atmosphere".' },
    { k: 'tujuan', t: 'Why does the author mention that many ponds "were abandoned after only a few years"?', p: ['To show that the profits used to justify clearing mangroves were often short-lived', 'To prove that shrimp farming is impossible in Indonesia', 'To explain why mangroves have already returned to most abandoned ponds', 'To criticize farmers for being unwilling to work hard', 'To show that disease spreads from mangroves to ponds'], j: 0, b: 'Kata "Ironically" menegaskan bahwa keuntungan yang dijanjikan ternyata tidak bertahan lama.' },
    { k: 'tujuan', t: 'What is the function of the sentence "Yet experience shows that planting seedlings is not enough." in paragraph 5?', p: ['It qualifies the optimism about restoration programs by pointing to a common weakness.', 'It rejects restoration completely as a waste of money.', "It provides evidence that the government's restoration targets have been met.", 'It shifts the discussion back to carbon storage.', 'It summarizes the benefits described in paragraph 3.'], j: 0, b: 'Kalimat itu memberi batasan: program pemulihan ada, tetapi menanam bibit saja tidak cukup.' },
    { k: 'sikap', t: "What is the author's attitude toward the future of Indonesia's mangroves?", p: ['Cautiously hopeful', 'Completely pessimistic', 'Uncritically enthusiastic', 'Indifferent', 'Sarcastic'], j: 0, b: '"If such approaches are widely adopted, the guardians of the coast may yet recover": berharap, tetapi bersyarat.' },
    { k: 'sikap', t: "The author's tone in describing the conversion of mangroves into shrimp ponds is best described as …", p: ['critical', 'approving', 'amused', 'nostalgic', 'neutral and uninterested'], j: 0, b: 'Penulis menyoroti tambak yang ditinggalkan ("Ironically") dan desa yang ditelan laut: nada kritis.' },
    { k: 'evaluasi', t: 'Which finding would most strengthen the claim that mangroves protect coastal villages?', p: ['During the same storm, villages behind wide mangrove belts suffered less flooding than similar villages without mangroves.', 'Mangrove leaves contain a high amount of carbon.', 'Shrimp exports earned high profits in the past.', 'Some villages behind mangroves were destroyed by very large tsunamis.', 'Mangrove seedlings grow fastest on open mudflats.'], j: 0, b: 'Perbandingan desa yang mirip dalam badai yang sama menjadi bukti paling langsung. Pilihan keempat justru melemahkan.' },
    { k: 'evaluasi', t: "Which finding would most weaken the author's explanation of why many planting projects fail?", p: ['Seedlings planted where mangroves had grown before died just as often as those planted on mudflats.', 'Many seedlings planted on mudflats were washed away within months.', 'Projects that involved local communities had higher survival rates.', 'Restoring the flow of tides allowed mangroves to return naturally.', 'The government increased its budget for mangrove planting.'], j: 0, b: 'Penulis menyalahkan lokasi (dataran lumpur). Jika di lokasi bekas mangrove pun bibit sama-sama mati, penjelasan itu melemah.' },
    { k: 'evaluasi', t: 'The recommendation in paragraph 5 is based on which assumption?', p: ['Mangroves can recover naturally if suitable tidal and sediment conditions are restored.', 'Local communities oppose all forms of restoration.', 'Planting seedlings always damages the coastline.', 'Shrimp farming will soon end without any intervention.', 'Mudflats are the best places for new mangroves.'], j: 0, b: 'Saran "allowing mangroves to return on their own" mengandaikan mangrove bisa tumbuh kembali bila kondisi alaminya pulih.' },
    { k: 'inferensi', t: 'Which statement is best supported by paragraph 4?', p: ['Mangrove loss has worsened a coastal problem in Java that also has other causes.', 'Land sinking in Java is caused entirely by shrimp ponds.', 'Mangrove loss alone caused villages in Java to disappear.', 'Shrimp farming in northern Java remains highly profitable today.', 'All villages on the northern coast of Java have been moved inland.'], j: 0, b: '"the loss of mangroves, combined with land sinking": ada lebih dari satu penyebab.' }
  ],
  'food-waste': [
    { k: 'ide', t: 'What is the text mainly about?', p: ['Food is wasted throughout the food system, with serious costs, but practical steps can reduce it.', 'Households in rich countries are mainly responsible for world hunger.', 'Supermarkets cause most food waste by rejecting imperfect produce.', 'Methane from landfills is the largest source of greenhouse gases.', 'Indonesia wastes more food than any other country in the world.'], j: 0, b: 'Teks membahas di mana makanan terbuang, akibatnya, dan solusinya. Pilihan lain terlalu sempit atau tidak didukung teks.' },
    { k: 'ide', t: 'Which is the best title for the text?', p: ['Wasted Food, Wasted Resources: A Problem We Can Reduce', 'The Rise of Supermarkets in Asia', 'Why Farmers Cannot Store Their Harvest', 'Methane: The Most Dangerous Gas on Earth', 'Celebrations and Buffets in Indonesia'], j: 0, b: 'Judul itu mencakup masalah, kerugian sumber daya, dan harapan adanya solusi.' },
    { k: 'rinci', t: 'According to paragraph 2, why is much of the harvest lost in many developing countries?', p: ['Because of poor storage, a lack of refrigeration, and slow transport', 'Because supermarkets reject produce of the wrong size or shape', 'Because consumers misunderstand the dates on packages', 'Because farmers deliberately grow more than the market needs', 'Because too much food is cooked for celebrations'], j: 0, b: '"… lost because of poor storage, a lack of refrigeration, and long, slow transport routes." Penolakan karena bentuk terjadi di rantai pasok negara kaya.' },
    { k: 'kata', t: 'The word "surplus" in paragraph 5 is closest in meaning to …', p: ['extra', 'spoiled', 'imported', 'expensive', 'cooked'], j: 0, b: 'surplus food = makanan berlebih (extra).' },
    { k: 'rujukan', t: '"… all of which are wasted when the food is thrown away." The word "which" refers to …', p: ['water, land, and energy', 'uneaten meals', 'the money spent', 'greenhouse gases', 'transport routes'], j: 0, b: 'Air, lahan, dan energi yang dipakai untuk menanam, mengangkut, dan memasak makanan.' },
    { k: 'organisasi', t: 'How is paragraph 3 related to paragraph 2?', p: ['Paragraph 2 describes waste before food reaches consumers, while paragraph 3 shows that, unexpectedly, most waste happens in households.', 'Paragraph 3 offers solutions to the supply chain problems in paragraph 2.', 'Paragraph 3 gives examples of the supermarket standards mentioned in paragraph 2.', 'Paragraph 3 denies that any food is lost in supply chains.', 'Paragraph 3 repeats paragraph 2 using data from Indonesia.'], j: 0, b: 'Paragraf 2 = sebelum sampai ke konsumen; paragraf 3 diawali "Surprisingly, however, the largest share of waste occurs at home."' },
    { k: 'rinci', t: 'Which of the following are mentioned as causes of household food waste?', p: ['Buying more than is needed', 'Storing food poorly', 'Misunderstanding the dates printed on packages', 'A lack of refrigeration on farms', 'Supermarket standards for size and shape'], j: [0, 1, 2], b: 'Paragraf 3. Dua pilihan terakhir adalah penyebab di rantai pasok, bukan di rumah tangga.' },
    { t: 'Tentukan benar atau salah berdasarkan teks.', bs: [['Food waste is a problem only in rich countries.', false], ['Some edible produce is rejected because of its shape.', true], ['Rotting food in landfills produces methane.', true], ['The author believes one single step can solve food waste.', false]], b: 'Masalah ini "not limited to rich countries"; "None of these steps alone will solve the problem".' },
    { k: 'tujuan', t: 'Why does the author mention that "hundreds of millions of people around the world do not have enough to eat"?', p: ['To highlight the contrast between the food that is wasted and unmet human needs', 'To prove that food waste is the only cause of world hunger', 'To show that United Nations figures are unreliable', 'To introduce the role of supermarkets in food waste', 'To explain why households waste so much food'], j: 0, b: 'Kalimat "At the same time …" mempertentangkan makanan terbuang dengan orang yang kelaparan; teks tidak menyebut sampah sebagai satu-satunya penyebab kelaparan.' },
    { k: 'inferensi', t: 'The word "Surprisingly" at the beginning of paragraph 3 suggests that the author expects readers to …', p: ["assume that most food is wasted before it reaches people's homes", 'already know that households waste the most food', 'believe that food waste is not a serious problem', 'think that poor countries waste more food than rich ones', 'trust the standards used by supermarkets'], j: 0, b: 'Fakta disebut mengejutkan karena pembaca mungkin mengira pemborosan terbesar terjadi di rantai pasok (paragraf 2).' },
    { k: 'inferensi', t: 'What can be inferred about food that has passed its "best before" date?', p: ['It may still be safe to eat.', 'It must be thrown away immediately.', 'It is always dangerous to health.', 'Its date refers to safety rather than quality.', 'It can no longer be composted.'], j: 0, b: 'Tanggal "best before" berkaitan dengan mutu, bukan keamanan, jadi makanan itu mungkin masih aman.' },
    { k: 'inferensi', t: 'Based on paragraph 3, which household would most likely waste the least food?', p: ['A family that plans its meals and buys only what it needs for the week', 'A family that often hosts large buffets for guests', 'A family that buys in bulk to save money but has little storage space', 'A family that throws food away on its "best before" date', 'A family that always cooks extra portions in case visitors come'], j: 0, b: 'Penyebab sampah rumah tangga: membeli berlebihan, menyimpan buruk, salah paham tanggal, memasak berlebihan. Keluarga pertama menghindari semuanya.' },
    { k: 'tujuan', t: 'What is the main function of paragraph 4?', p: ['To explain why food waste matters beyond the money lost on uneaten food', 'To describe where in the supply chain food is wasted', 'To propose solutions for households and farmers', 'To compare greenhouse gas emissions between countries', 'To question the accuracy of United Nations figures'], j: 0, b: '"The cost of this waste goes far beyond the money …": air, lahan, energi, dan metana.' },
    { k: 'evaluasi', t: 'Which finding would most strengthen the claim that food waste contributes to climate change?', p: ['Landfills containing large amounts of food release much more methane than landfills without food.', 'Many households in Indonesia now own refrigerators.', 'Supermarkets sell imperfect produce at lower prices.', 'Composting is cheaper than sending waste to landfills.', 'Food waste in restaurants decreased slightly last year.'], j: 0, b: 'Bukti langsung bahwa sampah makanan menambah gas rumah kaca (metana).' },
    { k: 'evaluasi', t: 'Which finding would most weaken the suggestion that shared cold rooms reduce losses on farms?', p: ['In a trial, farmers using shared cold rooms lost about as much of their harvest as farmers without them.', 'Cold rooms require electricity to operate.', 'Farmers with cold rooms sold their produce at higher prices.', 'Fruit stored in cold rooms bruised less often.', 'Many villages want to build more cold rooms.'], j: 0, b: 'Jika kehilangan panen tetap sama, klaim bahwa ruang pendingin mengurangi kehilangan menjadi lemah.' },
    { k: 'evaluasi', t: 'The suggestion that shops donate surplus food to people in need assumes that …', p: ['the surplus food is still safe and suitable to eat', 'people in need prefer imperfect produce', 'donating food is more profitable than selling it', 'all supermarkets waste the same amount of food', 'consumers will stop shopping at supermarkets'], j: 0, b: 'Menyumbangkan makanan hanya masuk akal bila makanan itu masih layak dimakan.' },
    { k: 'sikap', t: "What is the author's attitude toward solving the problem of food waste?", p: ['Optimistic but realistic', 'Hopeless', 'Confident that one measure will be enough', 'Indifferent', 'Angry at farmers'], j: 0, b: '"many solutions are simple and inexpensive", tetapi "None of these steps alone will solve the problem".' },
    { k: 'tujuan', t: 'Why does the author state that "None of these steps alone will solve the problem"?', p: ['To acknowledge the limits of each measure while stressing the value of combining them', 'To discourage readers from trying to reduce waste', 'To show that the solutions are too expensive', 'To argue that only governments can reduce food waste', 'To contradict the figures given in paragraph 1'], j: 0, b: 'Kalimat itu dilanjutkan "but together they could save money …".' }
  ],
  'regional-languages': [
    { k: 'ide', t: 'What is the text mainly about?', p: ["Why many of Indonesia's regional languages are endangered, why this matters, and how they are being revitalized", 'How Indonesian became the national language of the archipelago', 'Why parents should teach their children English instead of local languages', 'How many people speak Javanese and Sundanese today', 'How young Indonesians use social media to make comedy'], j: 0, b: 'Teks membahas ancaman, penyebab, akibat, dan upaya revitalisasi bahasa daerah.' },
    { k: 'ide', t: 'Which is the best title for the text?', p: ["Keeping Indonesia's Many Voices Alive", 'Indonesian: One Language for Everyone', 'The Hundreds of Languages of Papua', 'Social Media and Modern Music', 'Learning English for a Better Future'], j: 0, b: '"Many Voices" mewakili ratusan bahasa daerah, dan "Keeping … Alive" mewakili upaya pelestarian.' },
    { k: 'rinci', t: 'According to paragraph 2, why do some parents avoid using the local language with their children?', p: ['They believe Indonesian or English will bring better opportunities.', 'Their children refuse to learn the local language.', 'Schools forbid the use of local languages.', 'They have completely forgotten the local language.', 'The government requires Indonesian to be used at home.'], j: 0, b: '"Many parents also believe that Indonesian, or English, will give their children better opportunities … so they deliberately avoid using the local language."' },
    { k: 'kata', t: 'The word "fades" in paragraph 2 is closest in meaning to …', p: ['gradually disappears', 'suddenly ends', 'spreads widely', 'changes its name', 'grows stronger'], j: 0, b: '"it fades over several generations" = memudar perlahan; kalimat sebelumnya menegaskan bahasa "rarely dies suddenly".' },
    { k: 'rujukan', t: '"… so they may vanish along with the language itself." The word "they" refers to …', p: ['traditional songs, stories, and rituals', 'the communities concerned', 'local plants and animals', 'the ancestors', 'the centuries'], j: 0, b: 'Lagu, cerita, dan ritual tradisional yang sulit diterjemahkan dapat lenyap bersama bahasanya.' },
    { k: 'organisasi', t: 'How is paragraph 2 related to paragraph 1?', p: ['Paragraph 1 states that many languages are endangered, and paragraph 2 explains why this happens.', 'Paragraph 2 offers solutions to the problem described in paragraph 1.', 'Paragraph 2 questions the number of languages given in paragraph 1.', 'Paragraph 2 describes the consequences of losing a language.', 'Paragraph 2 gives more examples of languages with many speakers.'], j: 0, b: 'Paragraf 2 menjelaskan penyebab pergeseran bahasa; akibatnya baru dibahas di paragraf 3.' },
    { k: 'rinci', t: 'Which of the following are mentioned as forces driving the shift away from regional languages?', p: ['Families moving to cities', 'Marriage across ethnic groups', 'Media dominated by national and global languages', 'A law that bans regional languages', 'A lack of dictionaries in regional languages'], j: [0, 1, 2], b: 'Paragraf 2. Teks tidak menyebut larangan hukum, dan kamus disebut sebagai bagian dari upaya revitalisasi.' },
    { t: 'Tentukan benar atau salah berdasarkan teks.', bs: [['Some regional languages have tens of millions of speakers.', true], ['Languages usually disappear within a single generation.', false], ['Some communities have created dictionaries in their languages.', true], ['Experts believe classroom lessons alone can save a language.', false]], b: 'Bahasa memudar "over several generations"; bahasa bertahan hanya jika dipakai sehari-hari, "not just in classrooms".' },
    { k: 'inferensi', t: 'Based on paragraph 2, a language is most seriously threatened when …', p: ['children no longer learn it at home, even if older people still speak it', 'it is not taught at universities', 'it has fewer than one million speakers', 'it is rarely heard on television', 'it borrows some words from Indonesian'], j: 0, b: 'Bahasa memudar "as parents stop passing it on to their children": rantai pewarisan di rumah yang menentukan.' },
    { k: 'tujuan', t: 'Why does the author mention "knowledge about local plants, animals, farming, and the sea"?', p: ['To illustrate that a language holds practical knowledge that may be lost with it', 'To show that regional languages lack scientific vocabulary', 'To argue that farming should be taught only in local languages', 'To explain why parents prefer Indonesian', 'To compare Javanese with Sundanese'], j: 0, b: 'Contoh itu mendukung gagasan "The loss of a language is more than the loss of words."' },
    { k: 'tujuan', t: 'What is the main function of paragraph 4?', p: ['To describe efforts being made to counter language loss', 'To explain the causes of language loss', 'To prove that revitalization has already succeeded', "To criticize the government's language policy", 'To describe how a language gradually dies'], j: 0, b: 'Paragraf 4 diawali "In response" lalu menjelaskan program pemerintah, sekolah, masyarakat, dan kaum muda.' },
    { k: 'inferensi', t: "Young people's videos and music in regional languages most likely help because they …", p: ['change the image of these languages, making them seem relevant to modern life', 'turn regional languages into official national languages', 'remove the need for parents to speak the language at home', 'earn large amounts of money for local communities', 'increase the total number of languages in Indonesia'], j: 0, b: '"showing that these languages can feel modern rather than old-fashioned".' },
    { k: 'sikap', t: "What is the author's attitude toward the revitalization efforts?", p: ['Supportive but uncertain about their outcome', 'Dismissive of their value', 'Certain that they will succeed', 'Opposed to any government involvement', 'Indifferent to their results'], j: 0, b: 'Penulis menghargai upaya itu, tetapi menyatakan "Whether these efforts will succeed remains uncertain."' },
    { k: 'sikap', t: 'The tone of paragraph 3 is best described as …', p: ['concerned', 'humorous', 'triumphant', 'detached and uninterested', 'angry'], j: 0, b: 'Paragraf 3 menekankan apa yang hilang (pengetahuan, tradisi, jati diri): nada prihatin.' },
    { k: 'evaluasi', t: "Which finding would most strengthen the experts' view in paragraph 5?", p: ['Languages taught only at school, but not spoken at home, have continued to lose speakers.', 'A language regained many young speakers through school lessons alone.', 'Many new dictionaries of regional languages have been published.', 'Javanese still has tens of millions of speakers.', 'Storytelling competitions attract many students.'], j: 0, b: 'Para ahli: bahasa bertahan hanya jika dipakai sehari-hari, bukan hanya di kelas. Pilihan kedua justru melemahkan.' },
    { k: 'evaluasi', t: 'Which finding would most weaken the claim that revitalization depends on the choices of ordinary families?', p: ['A language recovered many speakers through school programs, even though parents did not use it at home.', 'Children whose parents speak a local language at home usually become fluent in it.', 'Families in cities often use Indonesian at home.', 'Some parents believe English brings better jobs.', 'Young people share videos in regional languages online.'], j: 0, b: 'Jika bahasa pulih tanpa peran keluarga, klaim bahwa keluarga menentukan menjadi lemah.' },
    { k: 'evaluasi', t: "The parents' decision described in paragraph 2 is based on the assumption that …", p: ['a regional language offers fewer economic benefits than Indonesian or English', 'English is easier to learn than any regional language', 'regional languages cannot be written down', 'Indonesian is spoken only in cities', 'schools teach all subjects in regional languages'], j: 0, b: 'Orang tua memilih bahasa yang dianggap membawa "better opportunities at school and work".' },
    { k: 'inferensi', t: 'Which statement is best supported by the text?', p: ['Large languages such as Javanese are less likely to be in immediate danger than languages with only a few hundred speakers.', 'All regional languages will disappear within one generation.', 'Papua has fewer languages than Aceh.', 'Indonesian is threatened by the growth of regional languages.', 'Young people refuse to use regional languages online.'], j: 0, b: 'Paragraf 1 membedakan bahasa berpenutur puluhan juta dengan bahasa berpenutur sedikit yang terancam punah.' }
  ],
  'geothermal-energy': [
    { k: 'ide', t: 'What is the text mainly about?', p: ["Indonesia's large geothermal potential, its advantages, and the obstacles to developing it", 'How volcanoes and earthquakes form along the Ring of Fire', 'Why Indonesia must stop using coal immediately', 'The history of the geothermal plant at Kamojang', 'The dangers of gas leaks at power plants'], j: 0, b: 'Teks membahas potensi, keunggulan, tantangan, dan syarat pengembangan panas bumi.' },
    { k: 'ide', t: 'Which is the best title for the text?', p: ['Tapping the Heat Below: Promise and Problems', 'Living Safely with Volcanoes', "Coal: Indonesia's Main Source of Power", 'How Steam Turbines Work', 'The Gas Leak in North Sumatra'], j: 0, b: 'Judul itu mencakup potensi (promise) dan tantangan (problems).' },
    { k: 'rinci', t: "According to paragraph 2, when and where did Indonesia's first geothermal power plant begin operating?", p: ['In nineteen eighty-three, at Kamojang', 'In nineteen eighty-three, in North Sumatra', 'In twenty twenty-one, at Kamojang', 'In nineteen seventy-three, at Kamojang', 'In nineteen ninety-three, in West Java'], j: 0, b: '"Its first geothermal power plant began operating at Kamojang, in West Java, in nineteen eighty-three".' },
    { k: 'kata', t: 'The word "baseless" in paragraph 4 is closest in meaning to …', p: ['unfounded', 'exaggerated', 'widespread', 'unusual', 'recent'], j: 0, b: '"Their fears are not baseless" = kekhawatiran itu ada dasarnya; baseless = unfounded.' },
    { k: 'rujukan', t: '"Their fears are not baseless …" The word "Their" refers to …', p: ['local communities', 'companies', 'investors', 'experts', 'the villagers in Kamojang'], j: 0, b: 'Kalimat sebelumnya: "Local communities have sometimes opposed projects because they worry …".' },
    { k: 'organisasi', t: 'What is the relationship between paragraph 3 and paragraph 4?', p: ['Paragraph 3 presents the advantages of geothermal energy, while paragraph 4 discusses the difficulties of developing it.', 'Paragraph 4 provides evidence for the advantages described in paragraph 3.', 'Paragraph 4 proves that geothermal energy is not clean after all.', 'Paragraph 4 offers solutions to the problems raised in paragraph 3.', 'Paragraph 4 continues the history of geothermal energy begun in paragraph 3.'], j: 0, b: 'Paragraf 4 diawali "Nevertheless": beralih dari keunggulan ke tantangan.' },
    { k: 'rinci', t: 'Which of the following are presented as challenges in developing geothermal energy?', p: ['Expensive exploration wells', 'Wells that turn out to be unproductive', 'Sites located inside protected forests', 'Dependence on sunny and windy weather', 'Fuel that will soon run out'], j: [0, 1, 2], b: 'Paragraf 4. Ketergantungan pada cuaca adalah kelemahan tenaga surya dan angin; panas bumi tidak akan habis dalam rentang waktu manusia.' },
    { t: 'Tentukan benar atau salah berdasarkan teks.', bs: [['Steam from underground water can be used to spin turbines.', true], ['Indonesia produces more geothermal electricity than any other country.', false], ['Geothermal plants need relatively little land.', true], ["Most of Indonesia's geothermal potential has already been developed.", false]], b: 'Indonesia hanya kalah dari Amerika Serikat; baru sekitar sepersepuluh potensi yang dikembangkan.' },
    { k: 'tujuan', t: 'Why does the author mention solar and wind power in paragraph 3?', p: ['To highlight that geothermal plants can produce electricity continuously', 'To argue that solar and wind power should be abandoned', 'To show that solar and wind power produce more emissions', 'To explain why Indonesia still relies on coal', 'To compare the building costs of different power plants'], j: 0, b: 'Perbandingan itu menonjolkan bahwa panas bumi tidak bergantung pada cuaca: "day and night, in every season".' },
    { k: 'inferensi', t: 'The fact that "only about one tenth of the estimated potential has been developed" suggests that …', p: ['there is still considerable room for geothermal energy to grow in Indonesia', "the estimate of Indonesia's potential is probably wrong", 'geothermal energy will soon replace coal completely', 'the United States has more geothermal potential than Indonesia', "most of Indonesia's geothermal plants have closed"], j: 0, b: 'Sebagian besar potensi belum dimanfaatkan, jadi masih banyak ruang untuk berkembang.' },
    { k: 'inferensi', t: 'What can be inferred about why private investors may hesitate to develop geothermal projects?', p: ['They risk paying for expensive wells that may produce no usable steam.', 'Geothermal electricity cannot legally be sold in Indonesia.', 'The government forbids private companies from drilling.', 'Turbines for geothermal plants are not available.', 'Geothermal plants produce more emissions than coal plants.'], j: 0, b: 'Sumur eksplorasi mahal dan sebagian "turn out to be unproductive"; karena itu pemerintah disarankan menanggung risiko awal.' },
    { k: 'tujuan', t: 'Why does the author mention the gas leak in North Sumatra?', p: ["To show that communities' safety concerns have a real basis", 'To argue that all geothermal plants are too dangerous to operate', 'To explain how geothermal plants produce electricity', 'To show that North Sumatra has the greatest geothermal potential', 'To blame the villagers for the accident'], j: 0, b: '"Their fears are not baseless, since a gas leak …": peristiwa itu mendukung kekhawatiran warga.' },
    { k: 'sikap', t: "What is the author's overall attitude toward geothermal energy in Indonesia?", p: ['Positive, provided that certain conditions are met', 'Entirely negative', 'Uncritically enthusiastic', 'Indifferent', 'Fearful'], j: 0, b: 'Penulis melihat potensi besar, tetapi menekankan syarat: "If these conditions are met …".' },
    { k: 'evaluasi', t: 'Which finding would most support the proposal that the government fund early exploration?', p: ['More private investors joined projects in areas where government drilling had already confirmed steam reserves.', 'Coal power remained cheaper than geothermal power.', 'Wind turbines have become larger and more efficient.', 'A volcano in Java erupted last year.', 'Some communities opposed a geothermal project.'], j: 0, b: 'Bukti bahwa pengurangan risiko eksplorasi oleh pemerintah menarik investor.' },
    { k: 'evaluasi', t: 'Which finding would most weaken the claim in paragraph 3 that geothermal plants produce electricity in every season?', p: ['The output of many geothermal plants falls sharply during the dry season.', 'Solar panels produce no electricity at night.', 'Geothermal plants release small amounts of gas.', 'Drilling costs have risen in recent years.', 'Some geothermal sites are inside protected forests.'], j: 0, b: 'Klaimnya: listrik stabil "in every season". Penurunan tajam saat kemarau langsung melemahkannya.' },
    { k: 'evaluasi', t: 'The conclusion in paragraph 5 assumes that the main barriers to geothermal development are …', p: ['financial and social rather than purely technical', 'mainly technical, because Indonesia lacks the technology', 'impossible to overcome', 'caused only by the price of coal', 'related to the decreasing activity of volcanoes'], j: 0, b: '"technology alone will not unlock …": solusinya berupa pendanaan risiko, konsultasi, pembagian manfaat, dan keselamatan.' },
    { k: 'inferensi', t: 'The phrase "will not run out on any human timescale" suggests that the Earth\'s heat …', p: ['is effectively unlimited for human purposes, although reservoirs still need careful management', 'will run out within one generation', 'can be controlled completely by engineers', 'never requires any kind of management', 'is available only in volcanic seasons'], j: 0, b: 'Panas bumi tidak habis dalam rentang waktu manusia, tetapi ada syarat "as long as the underground reservoirs are managed carefully".' },
    { k: 'sikap', t: 'How would the author most likely respond to the view that geothermal plants should be built as fast as possible, whatever local people think?', p: ['Disagree, because honest consultation and safety are essential', 'Agree, because clean energy matters more than local concerns', "Agree, because communities' fears are baseless", 'Disagree, because geothermal energy is too expensive to develop', 'Have no opinion, because the issue is purely technical'], j: 0, b: 'Penulis menekankan "companies must consult communities honestly … and meet strict safety standards".' }
  ],
  'bilingual-brain': [
    { k: 'ide', t: 'What is the text mainly about?', p: ['How views on the mental effects of bilingualism have changed and why the evidence is still debated', 'Why bilingual people are more intelligent than monolingual people', 'How children in Indonesia learn regional languages at home', 'The main causes of dementia in older adults', 'Why early educators opposed the teaching of Indonesian'], j: 0, b: 'Teks menelusuri pandangan lama, temuan awal, kritik terbaru, dan kesimpulan yang masih diperdebatkan.' },
    { k: 'ide', t: 'Which is the best title for the text?', p: ['The Bilingual Advantage: Proven Fact or Open Question?', 'Two Languages Will Make You a Genius', 'Dementia and the Ageing Brain', 'Learning Indonesian at School', 'A Short History of Language Teaching'], j: 0, b: 'Judul itu mencerminkan bahwa keunggulan dwibahasa masih diperdebatkan.' },
    { k: 'rinci', t: 'According to paragraph 2, what are executive functions?', p: ['Mental skills for focusing attention, ignoring distractions, and switching between tasks', 'The ability to learn large numbers of new words', 'The ability to remember events from childhood', 'The skill of speaking a second language without an accent', 'The ability to translate quickly between languages'], j: 0, b: '"executive functions, the mental skills that allow us to focus attention, ignore distractions, and switch between tasks".' },
    { k: 'kata', t: 'The word "suppress" in paragraph 2 is closest in meaning to …', p: ['hold back', 'translate', 'forget permanently', 'express', 'replace'], j: 0, b: 'Penutur dwibahasa memilih satu bahasa dan menahan (hold back) bahasa lainnya.' },
    { k: 'rujukan', t: '"… more likely to be published than those that found nothing …" The word "those" refers to …', p: ['studies', 'critics', 'participants', 'bilinguals', 'monolinguals'], j: 0, b: 'Penelitian yang tidak menemukan apa pun dibandingkan dengan penelitian berhasil positif.' },
    { k: 'organisasi', t: 'How does paragraph 4 relate to paragraph 3?', p: ['It challenges the findings in paragraph 3 by pointing to failed repetitions and problems in the research.', 'It gives further examples that support the findings in paragraph 3.', 'It explains the biological process behind the findings in paragraph 3.', 'It repeats the findings of paragraph 3 in simpler words.', 'It offers practical advice based on paragraph 3.'], j: 0, b: '"More recent work, however, has painted a less clear picture." Paragraf 4 meragukan temuan awal.' },
    { k: 'rinci', t: 'Which of the following are given as reasons why the bilingual advantage may have been overestimated?', p: ['Larger repeated experiments often failed to find it.', 'Studies with positive results were more likely to be published.', 'Bilinguals and monolinguals may differ in education and income.', 'Bilingual children are confused by having two languages.', 'The tasks used in experiments were too easy for monolinguals.'], j: [0, 1, 2], b: 'Paragraf 4. Pilihan keempat adalah kekhawatiran lama yang dinyatakan tidak berdasar; pilihan kelima tidak disebut.' },
    { t: 'Tentukan benar atau salah berdasarkan teks.', bs: [['Many Indonesian children use a regional language at home and Indonesian at school.', true], ['Early twentieth-century educators all welcomed bilingualism.', false], ['Some research linked bilingualism to later symptoms of dementia.', true], ['Scientists now agree that bilingualism improves general thinking skills.', false]], b: 'Bilingualisme dulu dicurigai; kini ilmuwan "remain divided".' },
    { k: 'inferensi', t: 'It can be inferred that the early twentieth-century fears about bilingualism were based on …', p: ['assumptions rather than strong evidence', 'large experiments with many participants', 'studies of dementia in older adults', 'research from the second half of the century', 'tests of executive functions'], j: 0, b: 'Paragraf 5: "the old fears were unfounded, since there is little evidence that growing up with two languages harms children\'s development".' },
    { k: 'tujuan', t: 'Why does the author mention Indonesian children in paragraph 1?', p: ['To show that bilingualism is a common, everyday experience for many readers', 'To prove that Indonesian children have stronger executive functions', 'To argue that regional languages should replace Indonesian at school', 'To criticize the way languages are taught in Indonesian schools', 'To explain why dementia is rare in Indonesia'], j: 0, b: 'Contoh itu menegaskan "this is the norm rather than the exception".' },
    { k: 'evaluasi', t: 'Which finding would most weaken the claim that bilingualism delays dementia?', p: ['When education and income were taken into account, bilinguals and monolinguals developed dementia at about the same age.', 'Bilingual adults scored higher on vocabulary tests.', 'Bilingual children switched between tasks faster than monolinguals.', 'Dementia is more common among people over eighty.', 'Some monolinguals learn a second language late in life.'], j: 0, b: 'Jika perbedaan hilang setelah faktor pendidikan dan penghasilan diperhitungkan, bahasa bukan penyebabnya.' },
    { k: 'evaluasi', t: 'Which finding would most strengthen the original idea of a bilingual advantage?', p: ['A very large study of people with similar education and income found bilinguals consistently better at ignoring distractions.', 'A small study with positive results was published in a famous journal.', 'Bilinguals tend to earn higher incomes than monolinguals.', 'Many parents believe that bilingual children are smarter.', 'Some bilinguals mix two languages in one sentence.'], j: 0, b: 'Penelitian besar yang mengendalikan faktor lain menjawab kritik di paragraf 4.' },
    { k: 'inferensi', t: "The critics' point about publication suggests that the published evidence may be distorted because …", p: ['studies that found no difference were less likely to be seen by other scientists', 'researchers deliberately invented positive results', 'journals refused to publish any studies on bilingualism', 'bilingual researchers only studied bilingual participants', 'experiments were never repeated'], j: 0, b: 'Penelitian tanpa hasil jarang terbit, sehingga gambaran yang terlihat condong ke hasil positif. Tidak ada tuduhan pemalsuan.' },
    { k: 'tujuan', t: 'What is the function of the sentence "Moreover, the most obvious benefits of bilingualism do not depend on laboratory tests." in paragraph 5?', p: ['It shifts attention to benefits that do not depend on the disputed mental advantage.', 'It provides new laboratory evidence for the bilingual advantage.', 'It rejects bilingualism as having no real value.', "It restates the critics' argument from paragraph 4.", 'It introduces a new experiment on dementia.'], j: 0, b: 'Kalimat itu mengalihkan pembahasan ke manfaat praktis: komunikasi, pengetahuan, dan warisan budaya.' },
    { k: 'sikap', t: "What is the author's attitude toward the claim that bilingualism improves general thinking skills?", p: ['Cautious and balanced', 'Strongly convinced', 'Completely dismissive', 'Mocking', 'Indifferent'], j: 0, b: 'Penulis menyajikan bukti pendukung dan kritik, lalu menyatakan ilmuwan "remain divided".' },
    { k: 'sikap', t: 'How does the author feel about bilingualism itself?', p: ['Positive about its practical value', 'Suspicious of its effects on children', 'Worried that it slows development', 'Neutral to the point of disinterest', 'Opposed to it in schools'], j: 0, b: 'Paragraf terakhir menekankan manfaat nyata menguasai lebih dari satu bahasa.' },
    { k: 'evaluasi', t: "The critics' argument about education, income, and immigration background assumes that …", p: ['these factors could themselves affect performance on thinking tasks', 'bilinguals always earn more than monolinguals', 'immigration improves memory', 'monolinguals have no formal education', 'language has no effect at all on the brain'], j: 0, b: 'Faktor-faktor itu disebut karena mungkin ikut memengaruhi hasil tes, bukan bahasanya.' },
    { k: 'inferensi', t: 'Which statement is best supported by the text?', p: ['Even if no thinking advantage exists, raising children with two languages is unlikely to harm them.', 'Bilingualism has been proven to prevent dementia.', 'Monolingual children are usually confused at school.', 'Scientists agree that the bilingual advantage is large.', 'Laboratory tests are the only way to measure the benefits of bilingualism.'], j: 0, b: '"there is little evidence that growing up with two languages harms children\'s development".' }
  ],
  'teens-social-media': [
    { k: 'ide', t: 'What is the text mainly about?', p: ['The benefits and risks of social media for teenagers, the limits of current research, and sensible ways to use it', 'Why social media causes depression among teenagers', 'How platforms are designed to keep users scrolling', 'Why governments should ban phones for teenagers', 'How teenagers use social media to make music'], j: 0, b: 'Teks membahas risiko, manfaat, keterbatasan penelitian, dan saran. Pilihan kedua bertentangan dengan paragraf 4.' },
    { k: 'ide', t: 'Which is the best title for the text?', p: ['Social Media and Teens: Beyond the Headlines', 'The Hidden Dangers of Every Phone', 'How to Become Popular Online', 'Sleep and the Growing Brain', 'Cyberbullying in Indonesian Schools'], j: 0, b: 'Teks mengajak melihat persoalan lebih seimbang daripada judul berita.' },
    { k: 'rinci', t: 'According to paragraph 2, how can late-night use of social media harm teenagers?', p: ['It can reduce the sleep that their growing brains need.', "It exposes them to edited images of other people's lives.", 'It makes their estimates of screen time inaccurate.', 'It causes them to unfollow their friends.', 'It leads their parents to introduce strict bans.'], j: 0, b: '"late-night use can cut into the sleep that growing brains need".' },
    { k: 'kata', t: 'The word "inadequate" in paragraph 5 is closest in meaning to …', p: ['not good enough', 'overconfident', 'bored', 'well connected', 'curious'], j: 0, b: 'Akun yang membuat remaja merasa tidak cukup baik (not good enough).' },
    { k: 'rujukan', t: '"… strict bans, which young people often find ways to avoid." The word "which" refers to …', p: ['strict bans', 'open conversations', 'unnecessary notifications', 'regular breaks', 'accounts'], j: 0, b: 'Larangan ketat sering dicari celahnya oleh kaum muda.' },
    { k: 'organisasi', t: 'How is paragraph 3 related to paragraph 2?', p: ['Paragraph 3 presents benefits that balance the risks described in paragraph 2.', 'Paragraph 3 gives more evidence of the risks in paragraph 2.', 'Paragraph 3 explains the research methods behind paragraph 2.', 'Paragraph 3 denies that the risks in paragraph 2 exist.', 'Paragraph 3 offers advice for avoiding the risks in paragraph 2.'], j: 0, b: '"Yet social media also brings genuine benefits." Paragraf 3 tidak menyangkal risiko, tetapi menyeimbangkannya.' },
    { k: 'rinci', t: 'Which of the following are mentioned as benefits of social media for teenagers?', p: ['Maintaining friendships', 'Finding a sense of belonging', 'Having a place for creativity', 'Guaranteed lower levels of anxiety', 'Better and longer sleep'], j: [0, 1, 2], b: 'Paragraf 3. Teks tidak menjanjikan kecemasan berkurang, dan pemakaian larut malam justru mengurangi tidur.' },
    { t: 'Tentukan benar atau salah berdasarkan teks.', bs: [['Many platforms are designed to keep users scrolling.', true], ['Most studies prove that heavy use causes poor mental health.', false], ["Teenagers' own estimates of screen time are often inaccurate.", true], ['Experts mostly recommend banning social media for teenagers.', false]], b: 'Penelitian sebagian besar korelasional; ahli menganjurkan keseimbangan, bukan larangan.' },
    { k: 'inferensi', t: 'The sentence "It is possible that teenagers who already feel unhappy turn to their phones more often." suggests that …', p: ['the link between social media use and poor mental health may partly run in the opposite direction', 'social media always makes unhappy teenagers feel better', 'unhappy teenagers rarely use their phones', 'heavy use of social media is definitely the cause of depression', "teenagers' estimates of screen time are accurate"], j: 0, b: 'Bisa jadi rasa tidak bahagia yang menyebabkan pemakaian berat, bukan sebaliknya.' },
    { k: 'tujuan', t: 'Why does the author mention that many platforms are "designed to keep users scrolling"?', p: ["To suggest that heavy use is encouraged partly by how platforms work, not only by users' choices", 'To praise the skill of the people who design apps', 'To explain why most studies are correlational', 'To prove that teenagers have no self-control', 'To describe a benefit of social media'], j: 0, b: 'Rancangan platform ikut mendorong pemakaian berlama-lama; pilihan keempat terlalu berlebihan.' },
    { k: 'evaluasi', t: 'Which finding would most strengthen the claim that social media use causes poor mental health?', p: ['Teenagers randomly assigned to cut their social media use reported less anxiety than a similar comparison group.', 'A survey found that heavy users report more anxiety than light users.', 'Teenagers often overestimate their screen time.', 'Many teenagers use social media to make music.', 'Most teenagers own a phone.'], j: 0, b: 'Percobaan acak dapat menunjukkan sebab-akibat; survei (pilihan kedua) hanya menunjukkan hubungan (korelasi).' },
    { k: 'evaluasi', t: 'Which finding would most weaken the view that the amount of time spent online is what matters most?', p: ['Teenagers who spent the same amount of time online felt very differently depending on what they did there.', 'Teenagers who used social media for many hours reported more anxiety.', "Late-night use reduced teenagers' sleep.", 'Some platforms send many notifications.', 'Parents worry about how long their children spend online.'], j: 0, b: 'Jika waktu sama tetapi dampaknya berbeda, yang menentukan adalah aktivitasnya, bukan lamanya.' },
    { k: 'evaluasi', t: "Which statement from the text expresses the author's judgment rather than a reported fact?", p: ['Open conversations between teenagers and adults are likely to achieve more than strict bans.', 'Several large surveys have found that heavy users report higher levels of anxiety.', "Many studies rely on teenagers' own estimates of their screen time.", 'Most studies are correlational.', 'Many platforms are designed to keep users scrolling.'], j: 0, b: 'Pilihan pertama adalah penilaian atau rekomendasi; pilihan lain melaporkan temuan atau fakta.' },
    { k: 'sikap', t: "What is the author's overall attitude toward teenagers' use of social media?", p: ['Balanced, neither alarmist nor dismissive', 'Alarmed and fearful', 'Uncritically enthusiastic', 'Indifferent', 'Hostile'], j: 0, b: 'Penulis menimbang risiko dan manfaat lalu menganjurkan "balance rather than panic".' },
    { k: 'tujuan', t: 'What is the main function of paragraph 4?', p: ['To explain why research findings on social media should be interpreted with caution', 'To prove that social media is harmless', 'To list the benefits of social media', 'To describe how platforms are designed', 'To recommend strict bans on phones'], j: 0, b: '"Interpreting the research is more difficult than headlines suggest", lalu dijelaskan keterbatasannya.' },
    { k: 'inferensi', t: 'What would the author most likely advise a teenager who feels worse after using a certain app?', p: ['Limit its use or unfollow the accounts that cause those feelings.', 'Delete every social media account permanently.', 'Use the app more often until the feeling disappears.', 'Ignore the feeling, since research effects are small.', 'Ask parents to ban all phones at home.'], j: 0, b: 'Paragraf 5: menilai perasaan setelah memakai aplikasi dan "unfollow accounts that make them feel inadequate".' },
    { k: 'sikap', t: "The author's attitude toward strict bans on social media is best described as …", p: ['sceptical', 'strongly supportive', 'neutral', 'enthusiastic', 'admiring'], j: 0, b: 'Larangan ketat dinilai kurang efektif karena sering dihindari kaum muda.' },
    { k: 'evaluasi', t: 'The advice to keep phones out of the bedroom at night assumes that …', p: ["having a phone nearby at night tends to reduce teenagers' sleep", 'teenagers do not need much sleep', 'most cyberbullying happens in bedrooms', 'notifications are always harmless', 'parents always know how teenagers use their phones'], j: 0, b: 'Saran itu bertujuan "protect sleep", jadi mengandaikan ponsel di kamar mengganggu tidur.' }
  ]
});
Object.assign(window.SOAL_BS, {
  'holiday-pangandaran': [
    ['The family went to Pangandaran by car.', true, '"We left home early in the morning by car."'],
    ['The trip took about two hours.', false, 'Sekitar lima jam (about five hours).'],
    ["The writer's little brother built a sandcastle.", true, '"My little brother built a big sandcastle."'],
    ['They watched the sunrise in the evening.', false, 'Pada malam hari mereka melihat matahari terbenam (sunset).'],
    ['They ate grilled fish near the beach.', true, '"We also ate grilled fish at a restaurant near the beach."'],
    ['The writer does not want to visit Pangandaran again.', false, '"I hope to visit Pangandaran again next year."']
  ],
  'birthday-invitation': [
    ['Nadia is inviting her friends to her birthday party.', true, '"I would like to invite you to my birthday party."'],
    ['The party will be on Sunday.', false, 'Pestanya hari Sabtu (Saturday).'],
    ['The party will start in the morning.', false, 'Dimulai pukul empat sore (in the afternoon).'],
    ['The guests should wear white shirts.', true, '"Please wear a white shirt …"'],
    ['The guests must bring a present.', false, '"You do not need to bring a present."'],
    ['The guests will sing karaoke at the party.', true, '"We will eat cake, play games, and sing karaoke together."']
  ],
  'message-from-mom': [
    ['Grandma is sick.', true, '"… because Grandma is sick."'],
    ["Mom will come home at about eight o'clock tonight.", true, '"I will come home at about eight o\'clock tonight."'],
    ['There is some fried chicken on the table.', false, 'Yang ada di meja nasi goreng (fried rice).'],
    ['Rafi has to water the plants in the backyard.', false, 'Tanaman di halaman depan (front yard).'],
    ["Rafi's sister will come home at three o'clock.", true, '"Your sister will come home from school at three o\'clock."'],
    ["Aunt Lina lives far from Rafi's house.", false, 'Tante Lina tinggal di sebelah rumah (next door).']
  ],
  'borobudur': [
    ['Borobudur is the largest Buddhist temple in the world.', true, '"Borobudur Temple is the largest Buddhist temple in the world."'],
    ['Borobudur is located in Bali.', false, 'Borobudur berada di Magelang, Jawa Tengah.'],
    ['The temple was built in the eighth and ninth centuries.', true, '"… built in the eighth and ninth centuries …"'],
    ['The temple has many rooms inside.', false, 'Candi ini tidak memiliki ruangan di dalamnya.'],
    ['Each stupa on the round terraces contains a statue of Buddha.', true, '"… each of them contains a statue of Buddha."'],
    ['All nine platforms of the temple are round.', false, 'Enam teras persegi dan tiga teras melingkar.']
  ],
  'mouse-deer': [
    ['Kancil lived in a forest.', true, '"… a clever mouse deer named Kancil lived in a forest."'],
    ['The river was empty and safe.', false, 'Sungai itu penuh buaya yang lapar.'],
    ['Kancil said the king wanted to give meat to the crocodiles.', true, '"The king wants to give meat to every crocodile …"'],
    ['The crocodiles did not believe Kancil.', false, '"The crocodiles believed him …"'],
    ['Kancil swam across the river.', false, 'Ia melompat dari punggung ke punggung buaya.'],
    ['The crocodiles were angry at the end.', true, '"The crocodiles were very angry …"']
  ],
  'eat-breakfast': [
    ['The writer thinks every student should eat breakfast.', true, '"… every student should eat it before going to school."'],
    ['Breakfast gives our body energy.', true, '"First, breakfast gives our body energy …"'],
    ['The writer says breakfast makes us sleepy in class.', false, 'Justru tanpa sarapan kita bisa mengantuk.'],
    ['Breakfast helps us concentrate in class.', true, '"… a good breakfast helps us concentrate in class …"'],
    ['The writer says we may skip breakfast when we are in a hurry.', false, '"… we should not skip breakfast, even when we are in a hurry."'],
    ['According to the writer, breakfast must be an expensive meal.', false, 'Makanan sederhana seperti nasi dengan telur, roti, atau buah sudah jauh lebih baik.']
  ],
  'honey-bees': [
    ['Honey bees live in large groups called colonies.', true, '"… live together in large groups called colonies."'],
    ['A healthy colony has many queens.', false, 'Satu koloni hanya memiliki satu ratu.'],
    ['The queen is the largest bee in the colony.', true, '"The queen is the largest bee …"'],
    ['Most bees in a colony are male drones.', false, 'Sebagian besar adalah lebah pekerja betina.'],
    ['Drones have no stings.', true, '"… drones, have no stings …"'],
    ['Bees make honey from pollen.', false, 'Lebah mengubah nektar (bukan serbuk sari) menjadi madu.']
  ],
  'how-rain-forms': [
    ['Rain is part of the water cycle.', true, '"… it is an important part of the water cycle."'],
    ['The moon heats the water in the oceans.', false, 'Mataharilah yang memanaskan air.'],
    ['Water vapor is a gas that we cannot see.', true, '"… an invisible gas called water vapor."'],
    ['The air high in the sky is warmer than near the ground.', false, 'Udara di atas jauh lebih dingin.'],
    ['Clouds are made of millions of tiny water droplets.', true, '"… millions of these droplets form clouds."'],
    ['Small droplets fall immediately as rain.', false, 'Tetesan baru jatuh setelah bergabung dan menjadi terlalu berat.']
  ],
  'public-transport': [
    ['Many people in Indonesian cities spend hours in traffic jams.', true, '"… spend hours stuck in traffic jams."'],
    ['A car usually carries more people than a bus.', false, 'Bus hingga lima puluh penumpang, mobil hanya satu atau dua.'],
    ['Children and old people are especially affected by air pollution.', true, '"… causes breathing problems, especially for children and old people."'],
    ['The cost of using a car is going down.', false, '"… these costs keep rising."'],
    ['Passengers can study during the trip.', true, '"Passengers can also read, rest, or study during the trip …"'],
    ['The government has stopped building new routes.', false, '"… the government is building more routes and improving stations every year."']
  ],
  'robotics-news': [
    ['The team won first place in the competition.', true, '"… have won first place in the National Student Robotics Competition …"'],
    ['The robots had to help fishermen catch fish.', false, 'Robot harus membantu petani menyiram tanaman padi.'],
    ['The team prepared for almost six months.', true, '"The team spent almost six months preparing …"'],
    ['The team used only new and expensive parts.', false, 'Mereka memakai botol plastik bekas dan bagian mainan rusak.'],
    ['The robot once fell over before the competition.', true, '"Once, our robot fell over just two weeks before the competition …"'],
    ['The scholarship was worth five million rupiah.', false, 'Beasiswanya lima puluh juta rupiah.']
  ],
  'laskar-pelangi-review': [
    ["Laskar Pelangi is Andrea Hirata's first novel.", true, '"… is the first novel by Andrea Hirata."'],
    ['The novel is set on the island of Bali.', false, 'Latarnya Belitung, pulau kecil di dekat Sumatra.'],
    ['The school needed at least ten new students to stay open.', true, '"… if it has at least ten new students."'],
    ['Pak Harfan is described as a cruel headmaster.', false, 'Ia disebut "the kind headmaster".'],
    ['Some chapters contain scientific terms.', true, '"Some chapters contain long descriptions and scientific terms …"'],
    ['The reviewer says the novel is only for rich readers.', false, 'Penulis merekomendasikannya untuk siswa, guru, dan siapa saja.']
  ],
  'how-tsunamis-happen': [
    ["Indonesia lies where several plates of the Earth's crust meet.", true, '"… it lies where several large plates of the Earth\'s crust meet."'],
    ['The plates of the Earth move very quickly.', false, '"… huge plates that move very slowly."'],
    ['Anak Krakatau erupted in twenty eighteen.', true, '"… the eruption of Anak Krakatau in twenty eighteen."'],
    ['Tsunami waves become lower as they reach the shore.', false, 'Gelombang justru meninggi, bisa melebihi gedung tiga lantai.'],
    ['The Aceh tsunami affected several countries.', true, '"… in several countries around the Indian Ocean."'],
    ['Only schools in the mountains hold evacuation drills.', false, '"Schools in coastal areas also hold evacuation drills …"']
  ],
  'mangrove-forests': [
    ['Indonesia has the largest area of mangroves of any country.', true, '"Indonesia has the largest area of mangroves of any country."'],
    ['Most of the carbon in mangrove forests is stored in the leaves and trunks.', false, 'Sebagian besar karbon tersimpan di tanah yang tergenang air.'],
    ['According to the text, mangroves can stop even the largest waves by themselves.', false, '"mangroves cannot stop the largest waves on their own."'],
    ['Mangroves provide nurseries for fish, crabs, and shrimp.', true, 'Paragraf 3.'],
    ['Many shrimp ponds built on cleared mangrove land were later abandoned.', true, '"many of these ponds were abandoned after only a few years".'],
    ['The author believes that planting seedlings anywhere is enough to restore mangroves.', false, '"planting seedlings is not enough"; lokasi dan aliran pasang surut penting.']
  ],
  'food-waste': [
    ['Around one fifth of the food available to consumers was wasted in twenty twenty-two.', true, '"roughly one fifth of all the food available to consumers".'],
    ['Food waste is a problem only in rich countries.', false, '"the problem is not limited to rich countries".'],
    ['Supermarkets may reject edible produce because of its size or shape.', true, 'Paragraf 2.'],
    ['Methane is weaker than carbon dioxide in the short term.', false, 'Metana "far more powerful than carbon dioxide in the short term".'],
    ['A "best before" date mainly refers to quality.', true, '"refers to quality rather than safety".'],
    ['The author claims that composting alone will solve food waste.', false, '"None of these steps alone will solve the problem".']
  ],
  'regional-languages': [
    ['Indonesia has more than seven hundred regional languages.', true, 'Paragraf 1.'],
    ['Javanese and Sundanese are spoken by only a few thousand people.', false, 'Keduanya memiliki "tens of millions of speakers".'],
    ['According to the text, languages usually die suddenly.', false, '"A language rarely dies suddenly."'],
    ['Some traditional songs and stories cannot be fully translated.', true, '"often impossible to translate fully".'],
    ['The national revitalization program began in twenty twenty-two.', true, 'Paragraf 4.'],
    ['The author is certain that the revitalization efforts will succeed.', false, '"Whether these efforts will succeed remains uncertain."']
  ],
  'geothermal-energy': [
    ['Geothermal plants use steam to spin turbines.', true, 'Paragraf 1.'],
    ['Indonesia is the largest producer of geothermal electricity in the world.', false, 'Indonesia "second only to the United States".'],
    ["Most of Indonesia's electricity comes from coal.", true, '"… which comes mostly from coal."'],
    ['Like solar power, geothermal power depends on the weather.', false, 'Panas bumi tidak bergantung pada cuaca.'],
    ['Every exploration well produces useful steam.', false, '"some of these wells turn out to be unproductive".'],
    ['The author believes communities should share the benefits of geothermal projects.', true, '"share the benefits fairly".']
  ],
  'bilingual-brain': [
    ["More than half of the world's population is thought to use two or more languages.", true, 'Paragraf 1.'],
    ['Educators in the early twentieth century encouraged children to learn two languages.', false, 'Mereka khawatir dua bahasa membingungkan anak.'],
    ['Both languages of a bilingual person remain active even when only one is being used.', true, 'Paragraf 2.'],
    ['All recent studies with large groups confirmed the bilingual advantage.', false, '"many failed to find any bilingual advantage at all".'],
    ['Bilinguals and monolinguals may differ in education and income.', true, 'Paragraf 4.'],
    ["There is strong evidence that bilingualism harms children's development.", false, '"there is little evidence that growing up with two languages harms children\'s development".']
  ],
  'teens-social-media': [
    ['Many teenagers use social media for several hours a day.', true, 'Paragraf 1.'],
    ['Late-night use of social media can reduce sleep.', true, 'Paragraf 2.'],
    ['According to the text, social media has no benefits for teenagers.', false, 'Paragraf 3 menyebut manfaat nyata.'],
    ['Most studies prove that social media causes depression.', false, 'Sebagian besar penelitian korelasional, tidak membuktikan sebab-akibat.'],
    ['The average effects found in studies tend to be small.', true, 'Paragraf 4.'],
    ['The author recommends strict bans as the best solution.', false, 'Percakapan terbuka dinilai lebih berhasil daripada larangan ketat.']
  ]
});
Object.assign(window.KATA_BACAAN, {
  'holiday-pangandaran': [
    ['holiday', 'liburan'],
    ['left', 'berangkat, meninggalkan'],
    ['trip', 'perjalanan'],
    ['sand', 'pasir'],
    ['sandcastle', 'istana pasir'],
    ['sunset', 'matahari terbenam'],
    ['boat', 'perahu'],
    ['grilled', 'dibakar, dipanggang'],
    ['souvenirs', 'oleh-oleh, cendera mata'],
    ['tired', 'lelah']
  ],
  'birthday-invitation': [
    ['invite', 'mengundang'],
    ['birthday party', 'pesta ulang tahun'],
    ['turning', 'akan berusia'],
    ['start', 'dimulai'],
    ['games', 'permainan'],
    ['wear', 'memakai'],
    ['theme', 'tema'],
    ['present', 'kado, hadiah'],
    ['appetite', 'selera makan'],
    ['message', 'pesan']
  ],
  'message-from-mom': [
    ['hospital', 'rumah sakit'],
    ['sick', 'sakit'],
    ['worry', 'khawatir'],
    ['getting better', 'mulai membaik'],
    ['warm it up', 'menghangatkannya'],
    ['feed', 'memberi makan'],
    ['plants', 'tanaman'],
    ['lock', 'mengunci'],
    ['homework', 'pekerjaan rumah (PR)'],
    ['next door', 'di sebelah rumah']
  ],
  'borobudur': [
    ['largest', 'terbesar'],
    ['built', 'dibangun'],
    ['centuries', 'abad (jamak)'],
    ['dynasty', 'dinasti, wangsa'],
    ['volcanic stone', 'batu vulkanik'],
    ['stacked', 'bertingkat, bertumpuk'],
    ['decorated', 'dihiasi'],
    ['relief panels', 'panel relief (pahatan pada dinding)'],
    ['contains', 'berisi'],
    ['at dawn', 'saat fajar']
  ],
  'mouse-deer': [
    ['clever', 'cerdik, pandai'],
    ['mouse deer', 'kancil'],
    ['cross', 'menyeberangi'],
    ['hungry', 'lapar'],
    ['crocodiles', 'buaya-buaya'],
    ['count', 'menghitung'],
    ['lined up', 'berbaris'],
    ['loudly', 'dengan suara keras'],
    ['run off', 'lari, kabur'],
    ['danger', 'bahaya']
  ],
  'eat-breakfast': [
    ['meal', 'makanan, waktu makan'],
    ['energy', 'energi, tenaga'],
    ['weak', 'lemas, lemah'],
    ['dizzy', 'pusing'],
    ['concentrate', 'berkonsentrasi'],
    ['unhealthy', 'tidak sehat'],
    ['snacks', 'jajanan, camilan'],
    ['skip', 'melewatkan'],
    ['in a hurry', 'terburu-buru'],
    ['better than nothing', 'lebih baik daripada tidak sama sekali']
  ],
  'honey-bees': [
    ['insects', 'serangga'],
    ['colonies', 'koloni'],
    ['queen', 'ratu'],
    ['lay eggs', 'bertelur'],
    ['nectar', 'nektar, sari bunga'],
    ['pollen', 'serbuk sari'],
    ['wax comb', 'sarang lilin (sisiran sarang)'],
    ['hive', 'sarang lebah'],
    ['drones', 'lebah jantan'],
    ['seeds', 'biji']
  ],
  'how-rain-forms': [
    ['water cycle', 'siklus air'],
    ['process', 'proses'],
    ['heats', 'memanaskan'],
    ['invisible', 'tak kasatmata, tidak terlihat'],
    ['water vapor', 'uap air'],
    ['rises', 'naik'],
    ['droplets', 'titik-titik air'],
    ['bump into', 'bertabrakan dengan'],
    ['float', 'melayang'],
    ['flows', 'mengalir']
  ],
  'public-transport': [
    ['stuck', 'terjebak'],
    ['crowded', 'padat, penuh sesak'],
    ['polluted', 'tercemar'],
    ['private', 'pribadi'],
    ['congestion', 'kemacetan'],
    ['passengers', 'penumpang'],
    ['destinations', 'tujuan'],
    ['released', 'dilepaskan'],
    ['repairs', 'perbaikan'],
    ['routes', 'rute']
  ],
  'robotics-news': [
    ['competition', 'kompetisi, lomba'],
    ['challenged', 'menantang'],
    ['damaging', 'merusak'],
    ['accuracy', 'ketepatan'],
    ['materials', 'bahan'],
    ['rebuild', 'membangun ulang'],
    ['laboratory', 'laboratorium'],
    ['equipment', 'peralatan'],
    ['scholarship', 'beasiswa'],
    ['represent', 'mewakili']
  ],
  'laskar-pelangi-review': [
    ['best-selling', 'terlaris'],
    ['childhood', 'masa kecil'],
    ['hopeless', 'putus asa'],
    ['devoted', 'penuh pengabdian'],
    ['unforgettable', 'tak terlupakan'],
    ['brilliant', 'sangat cerdas'],
    ['leaking', 'bocor'],
    ['weaknesses', 'kelemahan'],
    ['disappoint', 'mengecewakan'],
    ['inspiring', 'menginspirasi']
  ],
  'how-tsunamis-happen': [
    ['coastal', 'pesisir'],
    ['crust', 'kerak (bumi)'],
    ['pressure', 'tekanan'],
    ['released', 'terlepas, dilepaskan'],
    ['spread out', 'menyebar'],
    ['shallower', 'lebih dangkal'],
    ['approach', 'mendekati'],
    ['uncovered', 'terbuka, terlihat'],
    ['immediately', 'segera'],
    ['evacuation', 'evakuasi']
  ],
  'mangrove-forests': [
    ['tangled', 'kusut, saling membelit'],
    ['hectares', 'hektare'],
    ['mistaken', 'keliru'],
    ['waterlogged', 'tergenang air'],
    ['erosion', 'pengikisan, erosi'],
    ['sediment', 'endapan'],
    ['livelihoods', 'mata pencaharian'],
    ['conversion', 'pengubahan, alih fungsi'],
    ['Ironically', 'ironisnya'],
    ['seedlings', 'bibit tanaman']
  ],
  'food-waste': [
    ['staggering', 'mencengangkan'],
    ['refrigeration', 'pendinginan, lemari pendingin'],
    ['bruise', 'memar'],
    ['edible', 'layak dimakan'],
    ['excess', 'berlebihan'],
    ['landfills', 'tempat pembuangan akhir sampah'],
    ['methane', 'metana'],
    ['inexpensive', 'murah'],
    ['surplus', 'berlebih, sisa'],
    ['Leftovers', 'sisa makanan']
  ],
  'regional-languages': [
    ['diverse', 'beragam'],
    ['archipelago', 'kepulauan, Nusantara'],
    ['linguists', 'ahli bahasa'],
    ['generations', 'generasi'],
    ['deliberately', 'dengan sengaja'],
    ['reinforce', 'memperkuat'],
    ['vanish', 'lenyap'],
    ['ancestors', 'leluhur'],
    ['revitalize', 'menghidupkan kembali'],
    ['festivals', 'festival, perayaan']
  ],
  'geothermal-energy': [
    ['belt', 'sabuk, jalur'],
    ['turbines', 'turbin'],
    ['potential', 'potensi'],
    ['reservoirs', 'waduk, cadangan bawah tanah'],
    ['exploration', 'eksplorasi, penjajakan'],
    ['unproductive', 'tidak produktif'],
    ['remote', 'terpencil'],
    ['baseless', 'tidak berdasar'],
    ['consult', 'berkonsultasi, meminta pendapat'],
    ['transition', 'peralihan']
  ],
  'bilingual-brain': [
    ['norm', 'kebiasaan umum, norma'],
    ['suspicion', 'kecurigaan'],
    ['intellectual', 'intelektual'],
    ['suppress', 'menekan, menahan'],
    ['executive functions', 'fungsi eksekutif'],
    ['misleading', 'menyesatkan'],
    ['dementia', 'demensia (pikun)'],
    ['exaggerated', 'membesar-besarkan'],
    ['sceptics', 'orang yang skeptis'],
    ['heritage', 'warisan']
  ],
  'teens-social-media': [
    ['optional', 'tidak wajib, pilihan'],
    ['platforms', 'platform, layanan'],
    ['cyberbullying', 'perundungan siber'],
    ['scrolling', 'menggulir layar'],
    ['genuine', 'nyata, sungguhan'],
    ['belonging', 'rasa memiliki'],
    ['correlational', 'korelasional (menunjukkan hubungan)'],
    ['inaccurate', 'tidak akurat'],
    ['notifications', 'notifikasi, pemberitahuan'],
    ['inadequate', 'tidak cukup baik']
  ]
});
Object.assign(window.RUJUKAN, {
  'holiday-pangandaran': [
    ['I', 'my family and I went to Pangandaran Beach', 'the writer', ["the writer's brother", "the writer's friend", 'the boat driver']],
    ['we', 'we played in the sand and swam in the sea', 'the writer and the family', ['the writer and the friends', 'the people at the restaurant', 'the boat drivers']],
    ['My', 'My little brother built a big sandcastle', "the writer's", ["the friend's", "the driver's", "the seller's"]],
    ['our', 'we bought some souvenirs for our friends', "the writer's family's", ["the boat driver's", "the seller's", "the restaurant owner's"]]
  ],
  'birthday-invitation': [
    ['you', 'I would like to invite you to my birthday party', "Nadia's friends", ['Nadia', "Nadia's parents", 'the teachers']],
    ['It', 'It will be at my house on Jalan Melati', 'the party', ['the cake', 'the message', 'the shirt']],
    ['my', 'It will be at my house on Jalan Melati', "Nadia's", ["the guests'", "the teacher's", "the neighbour's"]],
    ['We', 'We will eat cake, play games, and sing karaoke together', 'Nadia and her friends', ["Nadia's parents", 'the teachers', 'the neighbours']]
  ],
  'message-from-mom': [
    ['she', 'Do not worry, she is getting better', 'Grandma', ["Rafi's sister", 'Aunt Lina', 'Mom']],
    ['I', "I will come home at about eight o'clock tonight", 'Mom', ['Rafi', 'Grandma', 'Aunt Lina']],
    ['it', 'Please warm it up before you eat it', 'the fried rice', ['the table', 'the cat', 'the door']],
    ['Your', 'Your sister will come home from school', "Rafi's", ["Grandma's", "Aunt Lina's", "the doctor's"]],
    ['me', 'call me or Aunt Lina next door', 'Mom', ['Rafi', "Rafi's sister", 'Grandma']]
  ],
  'borobudur': [
    ['It', 'It stands in Magelang, Central Java', 'Borobudur Temple', ['Yogyakarta', 'the world', 'the Sailendra dynasty']],
    ['ones', 'with six square ones at the bottom', 'platforms', ['stupas', 'stones', 'rooms']],
    ['that', 'relief panels that tell stories', 'relief panels', ['walls', 'stupas', 'visitors']],
    ['them', 'each of them contains a statue of Buddha', 'the seventy-two stupas', ['the visitors', 'the relief panels', 'the stone blocks']]
  ],
  'mouse-deer': [
    ['he', 'he wanted to cross a river', 'Kancil', ['the king', 'the crocodile', 'the hunter']],
    ['me', 'he has asked me to count you', 'Kancil', ['the king', 'the crocodiles', 'the fruit']],
    ['you', 'he has asked me to count you', 'the crocodiles', ['Kancil', 'the king', 'the readers']],
    ['him', 'The crocodiles believed him', 'Kancil', ['the king', 'the biggest crocodile', 'the hunter']]
  ],
  'eat-breakfast': [
    ['it', 'every student should eat it before going to school', 'breakfast', ['the day', 'the school', 'the meal plan']],
    ['we', 'after we have not eaten for many hours', 'people, including the writer and the readers', ['the teachers only', 'the snacks', 'the parents only']],
    ['our', 'so we can understand our lessons', "students' (the writer's and the readers')", ["teachers'", "parents'", "cooks'"]],
    ['it', 'Third, it stops us from feeling too hungry', 'breakfast', ['lunch', 'the class', 'the snack']]
  ],
  'honey-bees': [
    ['that', 'flying insects that live together', 'honey bees (flying insects)', ['colonies', 'flowers', 'queens']],
    ['her', 'her main job is to lay eggs', "the queen's", ["the worker's", "the drone's", "the colony's"]],
    ['it', 'clean the hive, and protect it from enemies', 'the hive', ['the comb', 'the flower', 'the queen']],
    ['which', 'carry pollen, which helps plants produce fruit and seeds', 'carrying pollen from flower to flower', ['the honey', 'the hive', 'the wax comb']]
  ],
  'how-rain-forms': [
    ['it', 'and it is an important part of the water cycle', 'rain', ['the ground', 'the cloud', 'the sun']],
    ['where', 'into the sky, where the air is much colder', 'high in the sky', ['in the oceans', 'in the rivers', 'on the ground']],
    ['There', 'There, the vapor cools down', 'high in the sky', ['in the lakes', 'on the ground', 'in the sea']],
    ['these droplets', 'millions of these droplets form clouds', 'the tiny water droplets from the cooled vapor', ['the raindrops on the ground', 'the drops in the rivers', 'the drops of seawater']]
  ],
  'public-transport': [
    ['them', 'Most of them travel alone in private cars', 'millions of people in Indonesian cities', ['traffic jams', 'private cars', 'Indonesian cities']],
    ['This', 'This means that everyone, including ambulance drivers and delivery workers', 'having fewer vehicles on the roads', ['one bus carrying fifty passengers', 'people buying more cars', 'ambulance drivers']],
    ['that', 'a large amount of smoke that pollutes the air', 'smoke', ['cars and motorcycles', 'breathing problems', 'old people']],
    ['these costs', 'and these costs keep rising', 'fuel, parking, and repairs', ['bus tickets', 'study fees', 'new stations']],
    ['their', 'can reach their destinations faster', 'everyone, including ambulance drivers and delivery workers', ['the buses', 'the trains', 'the roads']]
  ],
  'robotics-news': [
    ['Their', 'Their robot, named Si Kancil', 'the four students from Harapan Bangsa Senior High School', ['the judges', 'the farmers', 'the other schools']],
    ['them', 'and water them without damaging the young rice', 'the plants that needed water', ['the robots', 'the farmers', 'the judges']],
    ['They', 'They used cheap materials', 'the team', ['the judges', 'the farmers', 'the toys']],
    ['he', 'said he was proud of the students', 'Pak Hendra Gunawan', ['Nadia Putri', 'a judge', 'a farmer']],
    ['it', 'so that it can be used by real farmers', 'Si Kancil', ['the trophy', 'the scholarship', 'the competition']]
  ],
  'laskar-pelangi-review': [
    ['It', 'It was published in two thousand five', 'Laskar Pelangi', ['Belitung', 'Sumatra', 'Indonesian history']],
    ['it', 'if it has at least ten new students', 'the school', ['the government', 'the novel', 'the island']],
    ['who', 'The ten students, who call themselves Laskar Pelangi', 'the ten students', ['the teachers', 'the readers', 'the headmasters']],
    ['their', 'Through their stories, Hirata shows', 'Lintang and Mahar', ['the readers', 'the teachers', 'the crocodiles']],
    ['which', 'the ending is quite sad, which may disappoint readers', 'the fact that the ending is quite sad', ['the plot', 'the scientific terms', 'the chapters']]
  ],
  'how-tsunamis-happen': [
    ['it', 'because it lies where several large plates', 'Indonesia', ['a tsunami', 'the word', "the Earth's crust"]],
    ['them', 'people on ships may not even notice them', 'the tsunami waves', ['the ships', 'the people', 'the planes']],
    ['Their', 'Their energy is pushed upward', "the waves'", ["the ships'", "the buildings'", "the people's"]],
    ['they', 'this is the moment when they should run to higher ground', 'the people at the beach', ['the fish', 'the rocks', 'the waves']],
    ['their', 'their damage can be reduced', "tsunamis'", ["schools'", "students'", "earthquakes'"]]
  ],
  'mangrove-forests': [
    ['their', 'their tangled roots rise above the mud', 'mangroves', ['the coasts of Indonesia', 'salty water', 'the land and the sea', 'stilts']],
    ['it', 'where it may remain for thousands of years', 'the carbon locked in the soil', ['the soil', 'the trees', 'the atmosphere', 'a hectare of tropical forest']],
    ['them', 'the people who live behind them', 'mangroves', ['the people', 'the villages', 'the scientists', 'the waves']],
    ['which', 'which promised quick profits for farmers and exporters', 'turning forests into shrimp and fish ponds', ['the mangrove forests', 'the farmers', 'the exporters', 'the past half century']],
    ['who', 'local communities who depend on the coast', 'local communities', ['mangroves', 'the government', 'the seedlings', 'the tides']]
  ],
  'food-waste': [
    ['they', 'before they can be sold', 'fruit and vegetables', ['pests', 'farmers', 'transport routes', 'developing countries']],
    ['it', 'much of it from celebrations, buffets, and meals', 'the food each person wastes', ['each person', 'the study', 'Indonesia', 'the problem']],
    ['which', 'all of which are wasted when the food is thrown away', 'water, land, and energy', ['uneaten meals', 'the money', 'transport routes', 'greenhouse gases']],
    ['it', 'it produces methane', 'food rotting in landfills', ['carbon dioxide', 'the landfill', 'the greenhouse gas', 'the short term']],
    ['they', 'together they could save money', 'these steps', ['farmers', 'shops', 'leftovers', 'people in need']]
  ],
  'regional-languages': [
    ['them', 'a significant number of them are in danger of disappearing', 'regional languages', ['linguists', 'speakers', 'a few hundred people', 'Javanese and Sundanese']],
    ['it', 'it fades over several generations', 'a language', ['a family', 'Indonesia', 'a child', 'the archipelago']],
    ['they', 'so they deliberately avoid using the local language', 'many parents', ['their children', 'schools', 'employers', 'linguists']],
    ['which', 'which are dominated by national and global languages', 'television, social media, and the internet', ['local languages', 'the forces', 'families', 'cities']],
    ['who', 'ordinary families, who must decide', 'ordinary families', ['teachers', 'the government', 'ancestors', 'experts']]
  ],
  'geothermal-energy': [
    ['it', 'turns it into steam', 'underground water', ['the surface', 'heat from the Earth', 'electricity', 'the Ring of Fire']],
    ['which', 'which comes mostly from coal', "the nation's electricity", ['geothermal energy', 'the estimated potential', 'the United States', 'Kamojang']],
    ['those', 'only a small fraction of those from a coal plant', 'greenhouse gas emissions', ['electricity', 'turbines', 'seasons', 'the weather']],
    ['which', 'each of which can cost millions of dollars', 'deep exploration wells', ['companies', 'electricity', 'protected forests', 'remote mountains']],
    ['its', 'a much larger role in its transition to clean energy', "Indonesia's", ["the volcano's", "the government's", "the company's", "the community's"]]
  ],
  'bilingual-brain': [
    ['this', 'challenged this view', 'the belief that learning two languages confuses children', ['the belief that bilinguals have mental advantages', 'the norm in Indonesia', 'executive functions', 'research on dementia']],
    ['them', 'tasks that required them to ignore misleading information', 'the participants in the studies', ['the tasks', 'the researchers', 'the studies', 'the symptoms']],
    ['which', 'which may have exaggerated the effect', 'the greater likelihood of positive results being published', ['the critics', 'the participants', 'the larger groups', 'the education of bilinguals']],
    ['their', 'stay connected to their cultural heritage', 'people who speak more than one language', ['laboratory tests', 'scientists', 'sceptics', "children's fears"]]
  ],
  'teens-social-media': [
    ['This', 'This has led parents, teachers, and governments', 'teenagers spending hours on social media every day', ['the news', 'their interests', 'mental health', 'an urgent question']],
    ['those', 'than those who use it less', 'teenagers', ['surveys', 'platforms', 'images', 'brains']],
    ['It', 'It allows teenagers to maintain friendships', 'social media', ['support', 'a hobby', 'the community', 'the research']],
    ['they', 'which means they show that heavy use', 'most studies', ['teenagers', 'headlines', 'phones', 'experts']],
    ['them', 'unfollow accounts that make them feel inadequate', 'teenagers', ['accounts', 'apps', 'adults', 'notifications']]
  ],
  'the-farmer': [
    ['who', 'a farmer who lives in a small village', 'Pak Ahmad', ['the mountains', 'other farmers', 'the rice field']],
    ['He', 'He wakes up before sunrise', 'Pak Ahmad', ['the weather', 'another farmer', 'the village head']],
    ['his', 'goes to his rice field', "Pak Ahmad's", ["the village's", "other farmers'", "the mountain's"]],
    ['He', 'He checks the water', 'Pak Ahmad', ['the rice field', 'the weather', 'the weeds']]
  ],
  'malin-kundang': [
    ['he', 'When he grew up', 'Malin Kundang', ['the widow', 'the merchant', 'the old man']],
    ['his', 'his ship landed in his old village', "Malin Kundang's", ["the widow's", "the wife's", "the king's"]],
    ['her', 'Malin was ashamed of her', "Malin's mother", ['his wife', 'the ship', 'the storm']],
    ['she', 'said that she was not his mother', 'the old woman', ['his wife', 'the ship', 'the merchant']]
  ],
  'mobile-phones': [
    ['they', 'On the other hand, they can also take too much of our time', 'mobile phones', ['students', 'families', 'new skills']],
    ['us', 'Phones can help us find information', 'the writer and the readers (students)', ['the phones', 'the teachers', 'the families']],
    ['we', 'Therefore, we should use our phones wisely', 'the writer and the readers (students)', ['the phones', 'the parents', 'the games']],
    ['we', 'put the phone away when we study', 'the writer and the readers (students)', ['the phones', 'the families', 'the games']]
  ],
  'plastic-waste': [
    ['it', 'it harms fish, birds, and other animals', 'plastic', ['the ocean', 'the river', 'the food']],
    ['this problem', 'To reduce this problem', 'plastic waste', ['single-use bottles', 'our own bags', 'tiny fish']],
    ['our', 'can enter our food and water', "people's (the writer's and the readers')", ["animals'", "the fish's", "the oceans'"]],
    ['we', 'we should bring our own bags', 'the writer and the readers (people)', ['fish and birds', 'the bottles', 'the oceans']]
  ]
});
Object.assign(window.SINONIM, {
  'holiday-pangandaran': [
    ['trip', 'journey', ['house', 'party', 'meal']],
    ['built', 'made', ['broke', 'sold', 'found']],
    ['beautiful', 'lovely', ['ugly', 'boring', 'dark']],
    ['small', 'little', ['huge', 'heavy', 'old']],
    ['bought', 'purchased', ['sold', 'lost', 'borrowed']],
    ['tired', 'exhausted', ['energetic', 'angry', 'hungry']],
    ['happy', 'glad', ['sad', 'bored', 'afraid']],
    ['hope', 'wish', ['fear', 'forget', 'doubt']]
  ],
  'birthday-invitation': [
    ['invite', 'ask to come', ['send away', 'forget', 'visit']],
    ['start', 'begin', ['finish', 'stop', 'leave']],
    ['wear', 'put on', ['take off', 'wash', 'sell']],
    ['present', 'gift', ['bill', 'letter', 'ticket']],
    ['need', 'have to', ['refuse', 'forget', 'hate']],
    ['bring', 'take with you', ['leave behind', 'throw away', 'sell']],
    ['hope', 'wish', ['fear', 'doubt', 'forget']],
    ['together', 'with one another', ['alone', 'separately', 'quietly']]
  ],
  'message-from-mom': [
    ['sick', 'ill', ['healthy', 'hungry', 'busy']],
    ['worry', 'feel afraid', ['laugh', 'relax', 'shout']],
    ['warm', 'heat', ['cool', 'cut', 'hide']],
    ['feed', 'give food to', ['wash', 'catch', 'chase']],
    ['forget', 'fail to remember', ['remember', 'hope', 'try']],
    ['lock', 'close with a key', ['open wide', 'paint', 'break']],
    ['help', 'assist', ['disturb', 'ignore', 'leave']],
    ['need', 'want', ['have enough', 'lose', 'refuse']]
  ],
  'borobudur': [
    ['largest', 'biggest', ['smallest', 'oldest', 'newest']],
    ['stands', 'is located', ['falls', 'moves', 'disappears']],
    ['built', 'constructed', ['destroyed', 'discovered', 'painted']],
    ['made', 'formed', ['broken', 'sold', 'hidden']],
    ['decorated', 'adorned', ['damaged', 'cleaned', 'covered']],
    ['contains', 'holds', ['loses', 'breaks', 'lacks']],
    ['visitors', 'tourists', ['builders', 'kings', 'monks']],
    ['dawn', 'daybreak', ['midnight', 'noon', 'dusk']]
  ],
  'mouse-deer': [
    ['clever', 'smart', ['foolish', 'slow', 'shy']],
    ['cross', 'go over', ['avoid', 'clean', 'drink']],
    ['full', 'filled', ['empty', 'quiet', 'dry']],
    ['believed', 'trusted', ['doubted', 'attacked', 'ignored']],
    ['reached', 'arrived at', ['left', 'missed', 'lost']],
    ['angry', 'furious', ['calm', 'glad', 'sleepy']],
    ['enjoy', 'savor', ['hate', 'throw away', 'hide']],
    ['danger', 'threat', ['safety', 'joy', 'food']]
  ],
  'eat-breakfast': [
    ['important', 'essential', ['useless', 'expensive', 'strange']],
    ['energy', 'strength', ['weakness', 'sleep', 'hunger']],
    ['weak', 'tired', ['strong', 'happy', 'brave']],
    ['concentrate', 'focus', ['sleep', 'forget', 'play']],
    ['easily', 'without difficulty', ['slowly', 'with difficulty', 'rarely']],
    ['skip', 'miss', ['eat', 'cook', 'share']],
    ['hurry', 'rush', ['rest', 'delay', 'party']],
    ['simple', 'plain', ['fancy', 'expensive', 'complicated']]
  ],
  'honey-bees': [
    ['large', 'big', ['tiny', 'weak', 'quiet']],
    ['healthy', 'strong', ['sick', 'empty', 'angry']],
    ['main', 'chief', ['minor', 'secret', 'last']],
    ['collect', 'gather', ['drop', 'eat', 'burn']],
    ['protect', 'guard', ['attack', 'leave', 'destroy']],
    ['enemies', 'attackers', ['friends', 'flowers', 'workers']],
    ['store', 'keep', ['waste', 'sell', 'spill']],
    ['produce', 'make', ['destroy', 'lose', 'eat']]
  ],
  'how-rain-forms': [
    ['important', 'essential', ['useless', 'small', 'strange']],
    ['begins', 'starts', ['ends', 'stops', 'fails']],
    ['rises', 'goes up', ['falls', 'sinks', 'stays']],
    ['tiny', 'very small', ['huge', 'heavy', 'warm']],
    ['form', 'make', ['destroy', 'hide', 'clean']],
    ['join', 'combine', ['separate', 'disappear', 'melt']],
    ['heavy', 'weighty', ['light', 'thin', 'clear']],
    ['flows', 'runs', ['freezes', 'flies', 'burns']]
  ],
  'public-transport': [
    ['crowded', 'packed', ['empty', 'quiet', 'wide']],
    ['reduce', 'decrease', ['increase', 'ignore', 'measure']],
    ['carry', 'transport', ['drop', 'build', 'sell']],
    ['reach', 'arrive at', ['leave', 'avoid', 'search for']],
    ['produce', 'create', ['absorb', 'stop', 'clean']],
    ['rising', 'increasing', ['falling', 'stable', 'disappearing']],
    ['improving', 'upgrading', ['closing', 'damaging', 'selling']],
    ['perfect', 'flawless', ['broken', 'expensive', 'slow']]
  ],
  'robotics-news': [
    ['beat', 'defeated', ['joined', 'helped', 'followed']],
    ['scored', 'rated', ['built', 'ignored', 'bought']],
    ['completed', 'finished', ['started', 'failed', 'avoided']],
    ['cheap', 'inexpensive', ['costly', 'heavy', 'modern']],
    ['broken', 'damaged', ['new', 'shiny', 'expensive']],
    ['proud', 'pleased', ['ashamed', 'angry', 'bored']],
    ['received', 'got', ['gave', 'lost', 'refused']],
    ['improve', 'enhance', ['damage', 'sell', 'hide']]
  ],
  'laskar-pelangi-review': [
    ['quickly', 'rapidly', ['slowly', 'rarely', 'quietly']],
    ['allow', 'permit', ['forbid', 'force', 'forget']],
    ['appears', 'arrives', ['leaves', 'hides', 'sleeps']],
    ['special', 'remarkable', ['ordinary', 'boring', 'cheap']],
    ['brilliant', 'intelligent', ['lazy', 'slow', 'shy']],
    ['concentrate', 'focus', ['relax', 'forget', 'sleep']],
    ['moving', 'touching', ['boring', 'funny', 'confusing']],
    ['recommend', 'suggest', ['reject', 'hide', 'criticize']]
  ],
  'how-tsunamis-happen': [
    ['huge', 'enormous', ['tiny', 'calm', 'shallow']],
    ['destroy', 'ruin', ['build', 'protect', 'clean']],
    ['suddenly', 'abruptly', ['gradually', 'gently', 'rarely']],
    ['extremely', 'very', ['slightly', 'rarely', 'hardly']],
    ['notice', 'see', ['ignore', 'cause', 'stop']],
    ['shore', 'coast', ['mountain', 'forest', 'sky']],
    ['prevented', 'stopped', ['started', 'measured', 'caused']],
    ['alerts', 'warnings', ['rewards', 'invitations', 'reports of success']]
  ],
  'mangrove-forests': [
    ['remarkable', 'extraordinary', ['ordinary', 'dangerous', 'ancient', 'tiny']],
    ['mistaken', 'wrong', ['accurate', 'popular', 'recent', 'careful']],
    ['dense', 'thick', ['thin', 'weak', 'dry', 'short']],
    ['reduce', 'lessen', ['increase', 'cause', 'measure', 'hide']],
    ['abandoned', 'deserted', ['built', 'sold', 'expanded', 'cleaned']],
    ['swallow', 'engulf', ['protect', 'drain', 'feed', 'build']],
    ['ambitious', 'bold', ['modest', 'secret', 'failed', 'cheap']],
    ['adopted', 'taken up', ['rejected', 'forgotten', 'delayed', 'criticized']]
  ],
  'food-waste': [
    ['staggering', 'astonishing', ['tiny', 'reasonable', 'steady', 'predictable']],
    ['significant', 'considerable', ['minor', 'hidden', 'recent', 'uncertain']],
    ['rot', 'decay', ['grow', 'ripen', 'freeze', 'dry']],
    ['edible', 'safe to eat', ['spoiled', 'poisonous', 'imported', 'frozen']],
    ['rejected', 'turned down', ['accepted', 'packed', 'priced', 'ordered']],
    ['consumes', 'uses up', ['produces', 'saves', 'protects', 'creates']],
    ['inexpensive', 'cheap', ['costly', 'complex', 'slow', 'risky']],
    ['ease', 'reduce', ['increase', 'ignore', 'measure', 'shift']]
  ],
  'regional-languages': [
    ['diverse', 'varied', ['similar', 'ancient', 'unified', 'isolated']],
    ['shift', 'change', ['return', 'silence', 'stability', 'debate']],
    ['deliberately', 'intentionally', ['accidentally', 'rarely', 'secretly', 'reluctantly']],
    ['reinforce', 'strengthen', ['reverse', 'weaken', 'question', 'slow']],
    ['unique', 'distinctive', ['common', 'foreign', 'simple', 'modern']],
    ['vanish', 'disappear', ['appear', 'spread', 'survive', 'improve']],
    ['revitalize', 'bring back to life', ['abolish', 'translate', 'replace', 'record']],
    ['uncertain', 'unclear', ['guaranteed', 'impossible', 'obvious', 'unimportant']]
  ],
  'geothermal-energy': [
    ['obvious', 'clear', ['hidden', 'minor', 'unexpected', 'rare']],
    ['generate', 'produce', ['consume', 'store', 'measure', 'block']],
    ['fraction', 'small part', ['multiple', 'whole', 'total', 'double']],
    ['remote', 'isolated', ['crowded', 'nearby', 'modern', 'fertile']],
    ['unproductive', 'fruitless', ['profitable', 'dangerous', 'shallow', 'expensive']],
    ['opposed', 'resisted', ['supported', 'ignored', 'funded', 'organized']],
    ['bear', 'shoulder', ['avoid', 'divide', 'refund', 'calculate']],
    ['consult', 'seek the views of', ['ignore', 'pay', 'relocate', 'inspect']]
  ],
  'bilingual-brain': [
    ['suspicion', 'distrust', ['admiration', 'curiosity', 'enthusiasm', 'support']],
    ['challenged', 'questioned', ['confirmed', 'repeated', 'ignored', 'funded']],
    ['constantly', 'continually', ['occasionally', 'rarely', 'carefully', 'quickly']],
    ['misleading', 'deceptive', ['accurate', 'helpful', 'simple', 'familiar']],
    ['exaggerated', 'overstated', ['reduced', 'hidden', 'measured', 'explained']],
    ['divided', 'in disagreement', ['united', 'certain', 'uninterested', 'satisfied']],
    ['unfounded', 'groundless', ['justified', 'serious', 'common', 'ancient']],
    ['heritage', 'legacy', ['future', 'economy', 'fashion', 'technology']]
  ],
  'teens-social-media': [
    ['optional', 'not required', ['essential', 'expensive', 'popular', 'harmful']],
    ['urgent', 'pressing', ['minor', 'silly', 'old', 'private']],
    ['expose', 'make vulnerable', ['shield', 'reward', 'hide', 'teach']],
    ['genuine', 'real', ['false', 'minor', 'temporary', 'hidden']],
    ['isolated', 'lonely', ['popular', 'busy', 'confident', 'famous']],
    ['inaccurate', 'incorrect', ['precise', 'honest', 'recent', 'useful']],
    ['regular', 'frequent', ['rare', 'long', 'sudden', 'expensive']],
    ['achieve', 'accomplish', ['prevent', 'lose', 'avoid', 'delay']]
  ],
  'the-farmer': [
    ['checks', 'examines', ['wastes', 'drinks', 'ignores']],
    ['removes', 'takes out', ['plants', 'waters', 'sells']],
    ['hard', 'difficult', ['easy', 'cheap', 'quick']],
    ['friendly', 'pleasant', ['dry', 'cold', 'fast']],
    ['believes', 'thinks', ['doubts', 'forgets', 'denies']],
    ['harvest', 'crop', ['storm', 'market', 'seed']],
    ['small', 'little', ['huge', 'busy', 'modern']],
    ['bring', 'produce', ['destroy', 'stop', 'hide']]
  ],
  'malin-kundang': [
    ['poor', 'needy', ['wealthy', 'famous', 'young']],
    ['decided', 'chose', ['forgot', 'refused', 'feared']],
    ['find', 'seek', ['lose', 'sell', 'hide']],
    ['rich', 'wealthy', ['poor', 'weak', 'lonely']],
    ['beautiful', 'pretty', ['ugly', 'poor', 'old']],
    ['landed', 'arrived', ['sank', 'left', 'broke']],
    ['ashamed', 'embarrassed', ['proud', 'happy', 'brave']],
    ['terrible', 'awful', ['gentle', 'small', 'pleasant']]
  ],
  'mobile-phones': [
    ['Today', 'nowadays', ['yesterday', 'tomorrow', 'never']],
    ['almost', 'nearly', ['hardly', 'never', 'completely']],
    ['help', 'assist', ['stop', 'confuse', 'hurt']],
    ['contact', 'reach', ['avoid', 'forget', 'ignore']],
    ['skills', 'abilities', ['games', 'problems', 'hobbies']],
    ['tired', 'weary', ['fresh', 'excited', 'hungry']],
    ['wisely', 'sensibly', ['carelessly', 'secretly', 'rarely']],
    ['study', 'learn', ['sleep', 'play', 'rest']]
  ],
  'plastic-waste': [
    ['serious', 'severe', ['minor', 'funny', 'simple']],
    ['harms', 'hurts', ['helps', 'feeds', 'protects']],
    ['tiny', 'very small', ['huge', 'heavy', 'colorful']],
    ['enter', 'get into', ['leave', 'clean', 'cool']],
    ['reduce', 'decrease', ['increase', 'create', 'ignore']],
    ['avoid', 'stay away from', ['collect', 'buy', 'choose']],
    ['separate', 'sort', ['mix', 'burn', 'hide']],
    ['difference', 'change', ['mistake', 'problem', 'noise']]
  ]
});
Object.assign(window.IDE_POKOK, {
  'public-transport': [
    'Traffic jams and pollution are serious problems, so people should use public transport.',
    'Public transport can reduce traffic congestion because it carries many people at once.',
    'Public transport helps protect the environment by reducing smoke from vehicles.',
    'Public transport is cheaper than driving and lets passengers use their time well.',
    'Although it is not perfect, readers are invited to start using public transport regularly.'
  ],
  'robotics-news': [
    'Four Bandung students won a national robotics competition with their robot Si Kancil.',
    'The robots had to help farmers by watering rice plants, and Si Kancil did it fast and correctly.',
    'The team prepared for months with cheap materials and did not give up after many failures.',
    'Their teacher was proud and believed creativity matters more than expensive equipment.',
    'The team received prizes, will compete in Japan, and plans to improve the robot for farmers.'
  ],
  'laskar-pelangi-review': [
    'Laskar Pelangi is a best-selling first novel by Andrea Hirata based on his childhood on Belitung.',
    'The novel tells how a poor school is saved and how ten students are taught by devoted teachers.',
    'The novel is special because of its unforgettable and talented characters.',
    'The novel has some weaknesses, such as long descriptions, a jumping plot, and a sad ending.',
    'Overall, the reviewer recommends the novel because it is inspiring and values education.'
  ],
  'how-tsunamis-happen': [
    'A tsunami is a series of huge waves, and Indonesia is at high risk of them.',
    'Most tsunamis happen when a sudden movement of the sea floor pushes the water above it.',
    'Tsunami waves are fast and low in the deep ocean but grow very tall near the shore.',
    'When the sea suddenly pulls back, people should run to higher ground at once.',
    'Warning systems, drills, and knowledge can reduce the damage caused by tsunamis.'
  ],
  'mangrove-forests': [
    "Indonesia has the world's largest mangrove area, but these forests were long considered worthless.",
    'Mangroves store large amounts of carbon, mostly in their waterlogged soil.',
    'Mangroves protect coastlines and support coastal fishing communities.',
    'Indonesia has lost many mangroves, mainly to shrimp and fish ponds.',
    'Restoration works best when it restores natural conditions and involves local people.'
  ],
  'food-waste': [
    'A huge amount of food is wasted every year while many people go hungry.',
    'Much food is lost in supply chains because of poor storage or strict market standards.',
    'Households are responsible for the largest share of food waste.',
    'Food waste wastes resources and adds to greenhouse gas emissions.',
    'Simple actions by farmers, shops, and households can reduce food waste.'
  ],
  'regional-languages': [
    'Indonesia has more than seven hundred regional languages, many of which are endangered.',
    'Languages decline when parents stop passing them on, a shift driven by several social forces.',
    'Losing a language means losing knowledge, traditions, and identity.',
    'The government, schools, and young people are working to revitalize regional languages.',
    'The success of revitalization depends mainly on families using the language every day.'
  ],
  'geothermal-energy': [
    "Indonesia's location on the Ring of Fire gives it huge geothermal potential.",
    'Indonesia has used geothermal energy for decades but has developed only a small part of its potential.',
    'Geothermal energy is reliable, low in emissions, and needs little land.',
    'High costs, environmental concerns, and local opposition make geothermal development difficult.',
    'Government support and fair treatment of communities are needed to expand geothermal energy.'
  ],
  'bilingual-brain': [
    "Bilingualism is common, but it was once feared to harm children's development.",
    'Researchers proposed that managing two languages might strengthen executive functions.',
    'Early studies appeared to show bilingual advantages in attention and in delaying dementia.',
    'Later research questioned the bilingual advantage because of failed repetitions and other factors.',
    'Scientists still disagree, but bilingualism is not harmful and has clear practical benefits.'
  ],
  'teens-social-media': [
    "Social media is central to teenagers' lives, raising concern about their mental health.",
    'Social media poses risks such as cyberbullying, comparison, and lost sleep.',
    'Social media also offers friendship, belonging, and creativity.',
    'Research on social media and mental health has important limitations.',
    'Experts recommend balanced habits and open conversations rather than strict bans.'
  ]
});
Object.assign(window.BAGIAN, {
  'holiday-pangandaran': { jenis: 'recount text', bagian: [['orientation', 'memperkenalkan siapa, kapan, dan ke mana mereka berlibur', [0]], ['events', 'urutan kegiatan selama perjalanan dan liburan', [1, 2, 3, 4, 5, 6, 7, 8]], ['reorientation', 'perasaan dan harapan penulis di akhir cerita', [9, 10]]] },
  'birthday-invitation': { jenis: 'invitation', bagian: [['opening', 'sapaan dan ajakan datang ke pesta ulang tahun', [0, 1]], ['content', 'isi: hari, tanggal, jam, tempat, acara, pakaian, dan konfirmasi kehadiran', [2, 3, 4, 5, 6, 7, 8, 9]], ['closing', 'harapan bertemu dan nama pengundang', [10, 11]]] },
  'message-from-mom': { jenis: 'short message', bagian: [['opening', 'sapaan dan alasan Ibu pergi serta kabar Nenek', [0, 1]], ['content', 'isi: jam pulang dan tugas-tugas untuk Rafi', [2, 3, 4, 5, 6, 7, 8]], ['closing', 'tawaran bantuan, ucapan terima kasih, dan nama pengirim', [9, 10, 11]]] },
  'borobudur': { jenis: 'descriptive text', bagian: [['identification', 'memperkenalkan Candi Borobudur dan letaknya', [0, 1]], ['description', 'menggambarkan sejarah, bahan, bentuk bangunan, relief, stupa, dan pengunjungnya', [2, 3, 4, 5, 6, 7]]] },
  'mouse-deer': { jenis: 'narrative text', bagian: [['orientation', 'memperkenalkan tokoh Kancil dan tempatnya (hutan)', [0]], ['complication', 'masalah: Kancil ingin menyeberang, tetapi sungai penuh buaya lapar', [1, 2]], ['resolution', 'Kancil menipu buaya, melompati punggung mereka, dan berhasil sampai ke seberang', [3, 4, 5, 6, 7, 8]], ['coda', 'pesan moral cerita', [9]]] },
  'eat-breakfast': { jenis: 'analytical exposition', bagian: [['thesis', 'pendapat penulis: setiap siswa sebaiknya sarapan sebelum sekolah', [0]], ['arguments', 'alasan: memberi energi, membantu konsentrasi, mencegah jajan tidak sehat', [1, 2, 3, 4]], ['reiteration', 'menegaskan kembali agar tidak melewatkan sarapan, walau dengan makanan sederhana', [5, 6]]] },
  'honey-bees': { jenis: 'report text', bagian: [['general classification', 'menggolongkan lebah madu sebagai serangga terbang yang hidup dalam koloni', [0]], ['description', 'menjelaskan anggota koloni (ratu, pekerja, pejantan), pembuatan madu, dan perannya bagi tumbuhan', [1, 2, 3, 4, 5, 6, 7, 8]]] },
  'how-rain-forms': { jenis: 'explanation text', bagian: [['general statement', 'pengertian hujan sebagai bagian dari siklus air', [0]], ['explanation', 'urutan proses: pemanasan, penguapan, pendinginan, pembentukan awan, dan turunnya hujan', [1, 2, 3, 4, 5, 6]], ['closing', 'air hujan kembali ke sungai dan laut, siklus berulang', [7]]] },
  'the-farmer': { jenis: 'descriptive text', bagian: [['identification', 'memperkenalkan Pak Ahmad, seorang petani, dan tempat tinggalnya', [0]], ['description', 'menggambarkan kegiatan sehari-hari, kesulitan, sifat pantang menyerah, dan keyakinan Pak Ahmad', [1, 2, 3, 4, 5]]] },
  'malin-kundang': { jenis: 'narrative text', bagian: [['orientation', 'memperkenalkan tokoh (janda miskin dan Malin) serta awal kisah Malin merantau hingga menjadi kaya', [0, 1, 2]], ['complication', 'masalah muncul: Malin pulang dan menolak mengakui ibunya', [3, 4]], ['resolution', 'akhir cerita: ibu berdoa, badai datang, dan Malin menjadi batu', [5, 6]]] },
  'mobile-phones': { jenis: 'analytical exposition', bagian: [['thesis', 'memperkenalkan isu: hampir semua siswa punya ponsel yang bermanfaat tetapi juga bisa menyita waktu', [0, 1, 2]], ['arguments', 'alasan/bukti: sebagian siswa bermain gim sampai larut malam dan lelah di kelas', [3]], ['reiteration', 'menegaskan kembali pendapat (pakai ponsel dengan bijak) beserta saran', [4, 5]]] },
  'plastic-waste': { jenis: 'analytical exposition', bagian: [['thesis', 'pendapat penulis: sampah plastik adalah salah satu masalah lingkungan paling serius', [0]], ['arguments', 'alasan: plastik mencemari sungai dan laut, lama terurai, membahayakan hewan, dan masuk ke makanan', [1, 2, 3]], ['reiteration', 'menegaskan kembali dengan saran tindakan dan ajakan bahwa tindakan kecil berarti', [4, 5]]] }
});
// Soal tambahan (bertanda jenis) untuk bacaan Genre Teks yang sudah ada.
window.SOAL['the-farmer'].push(...[
  { k: 'inferensi', t: "What can be inferred about Pak Ahmad's working day?", p: ['It starts very early in the morning.', 'It starts after lunch.', 'It is short and relaxing.', 'It happens only on weekends.'], j: 0, b: '"He wakes up before sunrise and goes to his rice field." Ia mulai bekerja pagi-pagi sekali.' },
  { k: 'inferensi', t: 'Why does Pak Ahmad probably talk with other farmers?', p: ['To share information and help one another', 'To sell his rice field', 'To avoid working', 'To complain about his family'], j: 0, b: 'Petani biasanya berbagi informasi tentang air, hama, dan cuaca; ini kesimpulan yang paling masuk akal.' },
  { k: 'inferensi', t: 'Which word best describes Pak Ahmad?', p: ['Hardworking', 'Lazy', 'Careless', 'Impatient'], j: 0, b: 'Ia bangun sebelum matahari terbit, bekerja keras, dan tidak pernah menyerah.' },
  { k: 'tujuan', t: 'What is the purpose of the text?', p: ['To describe a farmer and his daily life', 'To explain how to plant rice step by step', 'To persuade people to move to a village', 'To report a flood in a village'], j: 0, b: 'Teks deskriptif ini menggambarkan Pak Ahmad dan kesehariannya.' },
  { k: 'tujuan', t: 'Why does the writer mention that "the weather is not always friendly"?', p: ['To show that farming is a difficult job', 'To explain how rain is formed', 'To show that Pak Ahmad hates rain', 'To describe the beauty of the mountains'], j: 0, b: 'Kalimat itu menunjukkan tantangan bertani, lalu dikontraskan dengan "However, Pak Ahmad never gives up."' },
  { k: 'tujuan', t: 'What is the function of the word "However" in the text?', p: ["To contrast the difficulties with Pak Ahmad's strong spirit", 'To add another activity of Pak Ahmad', 'To show the time of the activity', 'To give an example of the weather'], j: 0, b: '"However" menunjukkan pertentangan: pekerjaan berat dan cuaca buruk, tetapi Pak Ahmad tidak menyerah.' },
  { k: 'sikap', t: 'How does the writer feel about Pak Ahmad?', p: ['The writer admires him.', 'The writer feels sorry for being his neighbor.', 'The writer is angry with him.', 'The writer thinks he is foolish.'], j: 0, b: 'Penulis menonjolkan kerja keras dan sikap pantang menyerah Pak Ahmad; ini menunjukkan kekaguman.' },
  { k: 'sikap', t: "What is Pak Ahmad's attitude toward difficulties?", p: ['He stays patient and keeps working.', 'He becomes angry and stops working.', 'He leaves the village.', 'He asks other people to do his work.'], j: 0, b: '"However, Pak Ahmad never gives up. He believes that patience and hard work will bring a good harvest."' },
  { k: 'evaluasi', t: 'Which proverb best fits the text?', p: ['Hard work pays off.', 'Easy come, easy go.', 'Too many cooks spoil the broth.', 'Do not judge a book by its cover.'], j: 0, b: 'Pak Ahmad yakin kesabaran dan kerja keras akan membawa panen yang baik: kerja keras akan membuahkan hasil.' },
  { k: 'evaluasi', t: "Which sentence shows a belief rather than a fact about Pak Ahmad's activities?", p: ['He believes that patience and hard work will bring a good harvest.', 'He wakes up before sunrise and goes to his rice field.', 'He checks the water, removes the weeds, and talks with other farmers.', 'Pak Ahmad is a farmer who lives in a small village near the mountains.'], j: 0, b: 'Kata "believes" menunjukkan keyakinan, bukan kegiatan yang bisa diamati.' },
  { k: 'evaluasi', t: 'If a long dry season came, what would Pak Ahmad most likely do?', p: ['Keep working and look for ways to water his field', 'Sell his field and move to the city', 'Stop going to his field', 'Blame the other farmers'], j: 0, b: 'Ia tidak pernah menyerah, jadi ia kemungkinan besar tetap berusaha.' }
]);
window.SOAL['malin-kundang'].push(...[
  { k: 'inferensi', t: 'Why was Malin probably ashamed of his mother?', p: ['She was old and poor, while he had become rich.', 'She had become a rich merchant.', 'She did not recognize him.', 'She came with a terrible storm.'], j: 0, b: 'Ibunya janda miskin, sedangkan Malin sudah menjadi saudagar kaya dan beristri cantik.' },
  { k: 'inferensi', t: 'What can be inferred from the phrase "Years later"?', p: ['Malin was away from his village for a long time.', 'Malin returned home the next day.', 'Malin never left his village.', 'Malin visited his mother every year.'], j: 0, b: '"Years later" berarti bertahun-tahun kemudian; Malin lama merantau.' },
  { k: 'inferensi', t: 'Why did the terrible storm most likely come?', p: ["As a punishment for Malin's cruelty to his mother", "Because Malin's ship was too old", 'Because the wife wanted to go home', 'Because the mother was a sailor'], j: 0, b: 'Badai datang setelah ibu yang sakit hati berdoa; itu hukuman bagi anak durhaka.' },
  { k: 'inferensi', t: "How did the mother probably feel when she saw Malin's ship?", p: ['Happy and excited', 'Bored', 'Afraid of Malin', 'Ashamed of her son'], j: 0, b: '"His mother ran to meet him" menunjukkan ia gembira anaknya pulang.' },
  { k: 'tujuan', t: 'What is the purpose of the text?', p: ['To entertain readers and teach a moral lesson', 'To explain how ships are built', 'To describe a village by the sea', 'To report a real storm'], j: 0, b: 'Legenda (narrative) bertujuan menghibur sekaligus menyampaikan pesan moral.' },
  { k: 'tujuan', t: 'Why does the writer mention that Malin became a rich merchant?', p: ['To show how his life changed and why he became proud', 'To explain how to become a merchant', 'To describe his wife', 'To show that his mother was also rich'], j: 0, b: 'Kekayaan membuat Malin sombong dan malu mengakui ibunya yang miskin.' },
  { k: 'sikap', t: 'How did the mother feel after Malin said she was not his mother?', p: ['Deeply hurt', 'Proud', 'Relieved', 'Amused'], j: 0, b: '"Heartbroken, the old woman prayed …" Ia sangat sakit hati.' },
  { k: 'sikap', t: "Malin's attitude toward his mother can best be described as …", p: ['disrespectful', 'loving', 'grateful', 'polite'], j: 0, b: 'Ia malu dan menyangkal ibunya sendiri: tidak hormat (durhaka).' },
  { k: 'evaluasi', t: 'Which proverb best fits the story?', p: ['Pride comes before a fall.', 'The early bird catches the worm.', 'Practice makes perfect.', 'Two heads are better than one.'], j: 0, b: 'Kesombongan Malin berujung pada kehancurannya (menjadi batu).' },
  { k: 'evaluasi', t: "Which situation is most similar to Malin's action?", p: ['A successful man pretends not to know his poor parents in front of his friends.', 'A student thanks her mother after graduation.', 'A sailor saves his friend from a storm.', 'A merchant sends money to his village every month.'], j: 0, b: 'Sama seperti Malin: malu dan tidak mengakui orang tua yang miskin.' },
  { k: 'evaluasi', t: 'Which character trait should we avoid, according to the story?', p: ['Being ungrateful to our parents', 'Working hard to find a better life', 'Sailing to another land', 'Marrying a kind person'], j: 0, b: 'Merantau dan bekerja keras tidak salah; yang salah adalah durhaka dan tidak tahu berterima kasih kepada ibu.' }
]);
window.SOAL['mobile-phones'].push(...[
  { k: 'tujuan', t: 'What is the purpose of the text?', p: ['To persuade students to use their phones wisely', 'To describe a new mobile phone', 'To tell a story about a student', 'To explain how a phone works'], j: 0, b: 'Penulis menyampaikan pendapat dan alasan agar siswa memakai ponsel dengan bijak.' },
  { k: 'tujuan', t: 'Why does the writer mention students who play games until late at night?', p: ['To give an example of how phones can take too much time', 'To recommend good games', 'To show that students are clever', 'To describe a school rule'], j: 0, b: 'Contoh itu mendukung kalimat "they can also take too much of our time."' },
  { k: 'tujuan', t: 'What is the function of the phrase "On the other hand"?', p: ['To introduce the negative side of phones', 'To add more benefits of phones', 'To end the text', 'To show the time of an event'], j: 0, b: 'Sesudah manfaat, "On the other hand" memperkenalkan sisi buruknya.' },
  { k: 'sikap', t: "What is the writer's attitude toward mobile phones?", p: ['Balanced: phones are useful but must be controlled', 'Completely against phones', 'Completely in favor of using phones all day', 'Not interested at all'], j: 0, b: 'Penulis menyebut manfaat dan bahayanya, lalu menyarankan memakai dengan bijak.' },
  { k: 'sikap', t: 'How would the writer probably feel about a student who plays games until midnight before an exam?', p: ['Worried', 'Proud', 'Excited', 'Jealous'], j: 0, b: 'Penulis menganggap bermain gim sampai larut malam membuat siswa lelah di kelas.' },
  { k: 'inferensi', t: 'What can be inferred about students who feel tired in class?', p: ['They may not learn well.', 'They get better scores.', 'They study harder than others.', 'They do not have phones.'], j: 0, b: 'Siswa yang lelah sulit berkonsentrasi, sehingga belajarnya terganggu.' },
  { k: 'inferensi', t: 'Why does the writer suggest putting the phone away when we study?', p: ['So that we can focus on our lessons', 'So that the phone will not break', 'So that our families cannot contact us', 'So that we can save money'], j: 0, b: 'Ponsel bisa mengganggu dan menyita waktu; menyingkirkannya membantu kita fokus.' },
  { k: 'evaluasi', t: 'Which statement would the writer most likely agree with?', p: ['Phones are good tools if we control their use.', 'Students should never use phones.', 'Playing games all night is healthy.', 'Phones are only useful for games.'], j: 0, b: 'Penulis setuju ponsel bermanfaat asalkan dipakai dengan bijak.' },
  { k: 'evaluasi', t: 'Which sentence from the text is an opinion?', p: ['Therefore, we should use our phones wisely.', 'Today, almost every student has a mobile phone.', 'Some students play games until late at night and feel tired in class.', 'Phones can help us find information, contact our families, and learn new skills.'], j: 0, b: 'Kata "should" menunjukkan pendapat/saran penulis.' },
  { k: 'evaluasi', t: "Which fact would best strengthen the writer's argument?", p: ['A study shows that students who use phones late at night sleep less and get lower scores.', 'A new phone has a bigger screen.', 'Many families have more than one phone.', 'Phones were invented many years ago.'], j: 0, b: 'Fakta itu mendukung alasan bahwa pemakaian ponsel berlebihan merugikan siswa.' },
  { k: 'evaluasi', t: "Which student follows the writer's advice?", p: ['Rina keeps her phone in another room while she does her homework.', 'Budi plays games until midnight every day.', 'Sari checks her phone every five minutes in class.', 'Doni sleeps with his phone next to his pillow.'], j: 0, b: 'Sesuai saran "put the phone away when we study."' }
]);
window.SOAL['plastic-waste'].push(...[
  { k: 'tujuan', t: 'What is the purpose of the text?', p: ['To persuade readers to help reduce plastic waste', 'To explain how plastic is made', 'To describe a beautiful ocean', 'To tell a story about a fisherman'], j: 0, b: 'Penulis menyampaikan masalah, alasan, dan ajakan untuk bertindak.' },
  { k: 'tujuan', t: 'Why does the writer mention that plastic takes hundreds of years to break down?', p: ['To explain why plastic is dangerous for animals', 'To show that plastic is strong and useful', 'To compare plastic with paper', 'To explain how to recycle plastic'], j: 0, b: '"Because plastic takes hundreds of years to break down, it harms fish, birds, and other animals."' },
  { k: 'tujuan', t: 'Why does the writer mention that tiny pieces of plastic can enter our food and water?', p: ['To show that plastic can also harm humans', 'To give a recipe', 'To show that plastic is tasty', 'To describe clean water'], j: 0, b: 'Setelah hewan, penulis menunjukkan bahwa manusia pun terkena dampaknya.' },
  { k: 'sikap', t: "What is the writer's attitude toward plastic waste?", p: ['Concerned', 'Amused', 'Uninterested', 'Pleased'], j: 0, b: 'Penulis menyebutnya masalah serius dan mengajak bertindak; ia prihatin.' },
  { k: 'sikap', t: 'What is the tone of the last sentence?', p: ['Hopeful and encouraging', 'Angry and hopeless', 'Sad and lonely', 'Funny and silly'], j: 0, b: '"Small actions, when done by many people, can make a big difference." Nadanya optimis dan menyemangati.' },
  { k: 'inferensi', t: 'What can be inferred about single-use bottles?', p: ['They add to the plastic waste problem.', 'They help clean the oceans.', 'They break down in a few days.', 'They are good food for fish.'], j: 0, b: 'Penulis menyarankan menghindarinya karena botol sekali pakai menambah sampah plastik.' },
  { k: 'inferensi', t: 'Who does the writer think should take action?', p: ['Everyone, including ordinary people', 'Only the government', 'Only scientists', 'Only fishermen'], j: 0, b: '"we should …" dan "when done by many people" menunjukkan semua orang perlu bertindak.' },
  { k: 'evaluasi', t: "Which fact would best strengthen the writer's argument?", p: ['Cities that stopped using plastic bags now have less plastic in their rivers.', 'Plastic toys come in many colors.', 'Some fish live in very deep water.', 'Many people like to go to the beach.'], j: 0, b: 'Fakta itu membuktikan bahwa tindakan mengurangi plastik benar-benar berhasil.' },
  { k: 'evaluasi', t: "Which statement would weaken the writer's argument?", p: ['Most plastic in the oceans breaks down within a few months.', 'Plastic bottles are often found on beaches.', 'Sea turtles sometimes eat plastic bags.', 'Many rivers are full of rubbish.'], j: 0, b: 'Argumen penulis bertumpu pada plastik yang butuh ratusan tahun untuk terurai.' },
  { k: 'evaluasi', t: 'Which sentence from the text is an opinion?', p: ['To reduce this problem, we should bring our own bags, avoid single-use bottles, and separate our rubbish.', 'Every year, millions of tons of plastic end up in rivers and oceans.', 'In addition, tiny pieces of plastic can enter our food and water.', 'Because plastic takes hundreds of years to break down, it harms fish, birds, and other animals.'], j: 0, b: 'Kata "should" menunjukkan saran/pendapat penulis.' },
  { k: 'evaluasi', t: "Which person follows the writer's advice?", p: ['Dina brings a cloth bag when she goes to the market.', 'Andi buys a new plastic bottle of water every day.', 'Rudi throws his rubbish into the river.', 'Tono mixes all his rubbish in one bag.'], j: 0, b: 'Sesuai saran "bring our own bags".' }
]);
