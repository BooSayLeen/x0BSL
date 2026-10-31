/* =========================================================
   Write It Right! — game content
   Theme: present simple + everyday routines.
   Edit anything here to change the questions/texts.
   ========================================================= */
window.CONTENT = {

  /* ---------- Reference rules (used in Learn tabs, Rules panel, handout) ---------- */
  capitals: [
    { title: 'Start of a sentence', ex: '<u>M</u>y day starts at six.' },
    { title: 'The word I', ex: 'Sara and <u>I</u> walk to work.' },
    { title: 'Names of people', ex: '<u>O</u>mar, <u>M</u>r. <u>K</u>han, <u>L</u>ina' },
    { title: 'Cities and countries', ex: '<u>C</u>airo, <u>D</u>ubai, <u>E</u>gypt, <u>S</u>udan' },
    { title: 'Days and months', ex: '<u>M</u>onday, <u>F</u>riday, <u>J</u>uly, <u>A</u>pril' },
    { title: 'Languages', ex: '<u>E</u>nglish, <u>A</u>rabic, <u>F</u>rench' },
    { title: 'NO capital', ex: 'breakfast, work, bus, morning, summer, winter', no: true }
  ],

  marks: [
    { mark: '.', name: 'full stop', use: 'At the end of a normal sentence.', ex: 'I get up at seven.', action: 'Tap the table once' },
    { mark: '?', name: 'question mark', use: 'At the end of a question.', ex: 'What time do you get up?', action: 'Shrug your shoulders' },
    { mark: '!', name: 'exclamation mark', use: 'For strong feelings: surprise, happy, angry.', ex: 'What a busy day!', action: 'Clap once' },
    { mark: ',', name: 'comma', use: 'Between things in a list (no comma before "and").', ex: 'I wash, cook and clean.', action: 'Raise one hand' },
    { mark: "'", name: 'apostrophe', use: 'Shows missing letters: I\'m = I am, don\'t = do not.', ex: 'She doesn\'t work on Friday.', action: 'Draw it in the air' }
  ],

  presentSimple: [
    { title: 'I / you / we / they', ex: 'I <u>get up</u> at six. They <u>work</u> in a bank.' },
    { title: 'he / she / it + s', ex: 'She <u>gets</u> up at six. He <u>works</u> in a bank.' },
    { title: 'Spelling', ex: 'go → <u>goes</u> · watch → <u>watches</u> · study → <u>studies</u> · have → <u>has</u>' },
    { title: 'Negative', ex: 'I <u>don\'t</u> drink coffee. She <u>doesn\'t</u> work on Friday.' },
    { title: 'Question', ex: '<u>Do</u> you cook? <u>Does</u> he drive to work?' },
    { title: 'Routine words', ex: 'every day · every morning · on Monday · at seven · always · usually · never' }
  ],

  sentence: {
    formula: ['Capital letter', 'Subject (I / she / Omar)', 'Verb (get up / works)', 'More words', '. ? !'],
    good: 'My brother works in a bank.',
    bad: [
      { s: 'works in a bank.', why: 'No subject. Who works?' },
      { s: 'My brother in a bank.', why: 'No verb. What does he do?' },
      { s: 'my brother works in a bank', why: 'No capital letter and no full stop.' }
    ]
  },

  paragraph: [
    'A paragraph is about ONE topic.',
    'Start with a topic sentence. It tells the reader the topic.',
    'Write 3 or 4 supporting sentences. They give details.',
    'Finish with a concluding sentence. It closes the paragraph.',
    'Indent (move in) the first line.',
    'Sentences follow each other on the line. Do not make a list.'
  ],

  /* ---------- Round 1: Capital Corners (answer = index 0..3 = A..D) ---------- */
  corners: [
    { options: ['i get up at seven.', 'I get up at Seven.', 'I Get Up At Seven.', 'I get up at seven.'], answer: 3, why: 'Capital for the start of a sentence and the word I. Numbers need no capital.' },
    { options: ['Sara drinks coffee every morning.', 'sara drinks coffee every morning.', 'Sara drinks Coffee every morning.', 'Sara Drinks Coffee Every Morning.'], answer: 0, why: 'Names of people need a capital. Normal words (coffee, morning) do not.' },
    { options: ['We go to the gym on monday.', 'we go to the gym on Monday.', 'We go to the gym on Monday.', 'We go to the Gym on Monday.'], answer: 2, why: 'Days of the week need a capital: Monday.' },
    { options: ['My brother works in dubai.', 'My brother works in Dubai.', 'my brother works in Dubai.', 'My Brother works in dubai.'], answer: 1, why: 'Cities need a capital: Dubai. "brother" is a normal word.' },
    { options: ['Omar and I walk to work.', 'Omar and i walk to work.', 'omar and I walk to work.', 'Omar And I Walk To Work.'], answer: 0, why: 'The word I is always a capital — in every part of the sentence.' },
    { options: ['She has English lessons on tuesday.', 'She has english lessons on Tuesday.', 'She has English lessons on Tuesday.', 'she has English lessons on Tuesday.'], answer: 2, why: 'Languages (English) and days (Tuesday) need capitals.' },
    { options: ['I swim every day in Summer.', 'I swim every day in summer.', 'i swim every day in summer.', 'I Swim every day in Summer.'], answer: 1, why: 'Careful! Seasons (summer, winter) do NOT need a capital.' },
    { options: ['my father watches the News at night.', 'My Father watches the news at night.', 'My father watches the News at Night.', 'My father watches the news at night.'], answer: 3, why: 'Normal words (father, news, night) are small letters.' },
    { options: ['Do you work on saturday?', 'do you work on Saturday?', 'Do you work on Saturday?', 'Do You Work On Saturday?'], answer: 2, why: 'Questions start with a capital too. Saturday is a day → capital.' },
    { options: ['Mr. Khan teaches maths in the morning.', 'mr. Khan teaches maths in the morning.', 'Mr. khan teaches maths in the morning.', 'Mr. Khan Teaches Maths in the Morning.'], answer: 0, why: 'Titles and names: Mr. Khan. "maths" and "morning" are small.' },
    { options: ['We visit our Family in July.', 'We visit our family in July.', 'We visit our family in july.', 'we visit our family in July.'], answer: 1, why: 'Months need a capital: July. "family" is a normal word.' },
    { options: ['my mother cooks dinner every evening.', 'My mother cooks Dinner every evening.', 'My Mother cooks dinner every Evening.', 'My mother cooks dinner every evening.'], answer: 3, why: 'Only the first word needs a capital here.' }
  ],

  /* Round 1 warm-up: Stand up (capital) / Sit down (no capital) */
  standUp: [
    { w: 'monday', cap: true }, { w: 'breakfast', cap: false }, { w: 'cairo', cap: true },
    { w: 'summer', cap: false }, { w: 'i', cap: true }, { w: 'bus', cap: false },
    { w: 'sara', cap: true }, { w: 'july', cap: true }, { w: 'english', cap: true }, { w: 'morning', cap: false }
  ],

  /* ---------- Round 2: Punctuation Swat ({_} = the gap) ---------- */
  swat: [
    { text: 'I get up at six every day{_}', answer: '.' },
    { text: 'What time do you get up{_}', answer: '?' },
    { text: 'I have bread{_} eggs and tea for breakfast.', answer: ',' },
    { text: 'She doesn{_}t work on Friday.', answer: "'" },
    { text: 'What a busy day{_}', answer: '!' },
    { text: 'He takes the bus to work{_}', answer: '.' },
    { text: 'Does he cook dinner{_}', answer: '?' },
    { text: 'I don{_}t drink coffee at night.', answer: "'" },
    { text: 'On Sunday I clean{_} cook and wash the clothes.', answer: ',' },
    { text: 'Oh no{_} I am late for work!', answer: '!' },
    { text: 'When do you go to bed{_}', answer: '?' },
    { text: 'I{_}m always tired on Monday.', answer: "'" },
    { text: 'We watch TV{_} read and relax in the evening.', answer: ',' },
    { text: 'My sister starts work at nine{_}', answer: '.' },
    { text: 'What a lovely morning{_}', answer: '!' }
  ],

  /* Round 2 warm-up: teacher reads, class does the punctuation action */
  bodyPunct: [
    'I get up at seven.', 'Do you drink tea?', 'What a long day!',
    'I wash, cook and clean.', "I don't like Mondays.", 'Where does she work?'
  ],

  /* ---------- Round 3: Sentence Scramble (words shown lowercase, no punctuation) ---------- */
  scramble: [
    { answer: 'My sister gets up at six.', words: 'my sister gets up at six' },
    { answer: 'I go to work on Monday.', words: 'i go to work on monday' },
    { answer: 'What time do you have lunch?', words: 'what time do you have lunch' },
    { answer: 'Ahmed and I play football on Friday.', words: 'ahmed and i play football on friday' },
    { answer: 'He doesn\'t drink coffee.', words: 'he doesnt drink coffee' },
    { answer: 'Does she work in Cairo?', words: 'does she work in cairo' },
    { answer: 'I have tea, bread and cheese for breakfast.', words: 'i have tea bread and cheese for breakfast' },
    { answer: 'We visit our grandmother every Sunday.', words: 'we visit our grandmother every sunday' },
    { answer: 'What a busy morning!', words: 'what a busy morning' },
    { answer: 'Sara studies English in the evening.', words: 'sara studies english in the evening' }
  ],

  /* Round 3 warm-up: sentence or not? */
  sentenceOrNot: [
    { s: 'I get up at seven.', ok: true, why: 'Subject + verb + full stop.' },
    { s: 'every morning at six', ok: false, why: 'No subject and no verb.' },
    { s: 'She works in a bank.', ok: true, why: 'Subject (She) + verb (works).' },
    { s: 'my brother on Friday', ok: false, why: 'No verb. What does he do?' },
    { s: 'We have lunch at two.', ok: true, why: 'Subject (We) + verb (have).' },
    { s: 'goes to bed at ten', ok: false, why: 'No subject. Who goes to bed?' }
  ],

  /* ---------- Round 4: Running Dictation texts ---------- */
  dictation: [
    { title: "Omar's Day", level: 'Easy', text: "My name is Omar. I get up at six o'clock. I have tea and bread for breakfast. I go to work by bus. I come home at five. I love my evenings!" },
    { title: "Lina's Week", level: 'Medium', text: "Lina is a nurse in Dubai. She starts work at seven every morning. She doesn't work on Friday. On Saturday she visits her mother. They cook, eat and talk together. Lina loves Saturdays!" },
    { title: 'A Busy Morning', level: 'Harder', text: "I'm a teacher. I wake up at half past five. I don't eat breakfast at home. I take the train to Alexandria. My lessons start at eight. What a busy morning!" }
  ],

  /* ---------- Round 5: Paragraph Builder ---------- */
  model: {
    title: "My Grandfather's Day",
    topic: "My grandfather's day is very calm.",
    support: [
      'He gets up at five o\'clock every morning.',
      'He drinks tea, reads the newspaper and walks in the park.',
      'He has lunch with my grandmother at two.',
      'In the evening he watches the news and talks to his friends.'
    ],
    conclusion: "I love my grandfather's routine because it is simple and happy."
  },

  topics: [
    { name: 'My Morning Routine', frames: ['My mornings are ___ (busy / quiet).', 'I get up at ___.', 'I ___ and ___ in the bathroom.', 'I have ___ for breakfast.', 'I leave home at ___.', 'I like my mornings because ___.'], words: ['wake up', 'get up', 'have a shower', 'brush my teeth', 'get dressed', 'pray', 'make tea', 'catch the bus', 'drive'] },
    { name: 'My Evening Routine', frames: ['My evenings are ___.', 'I come home at ___.', 'I have dinner at ___ with ___.', 'After dinner I ___, ___ and ___.', 'I go to bed at ___.', 'I love my evenings because ___.'], words: ['cook', 'watch TV', 'read', 'call my family', 'help my children', 'check my phone', 'relax', 'tired', 'happy'] },
    { name: 'My Weekend', frames: ['My weekends are ___.', 'I get up at ___ on Friday.', 'I ___ with my family.', 'On Saturday I ___, ___ and ___.', 'In the evening we ___.', 'I love weekends because ___.'], words: ['sleep late', 'visit', 'go shopping', 'clean the house', 'go to the market', 'eat out', 'relaxing', 'fun'] },
    { name: "My Friend's Day", frames: ['My friend ___ is a ___.', 'He / She gets up at ___.', 'He / She goes to work by ___.', 'Every day he / she ___.', 'He / She doesn\'t ___.', 'My friend\'s day is ___ because ___.'], words: ['gets up', 'goes', 'works', 'studies', 'watches', 'has', 'teaches', 'drives', 'busy'] },
    { name: 'My Working Day', frames: ['I am a ___.', 'I start work at ___.', 'I work in ___.', 'Every day I ___, ___ and ___.', 'I finish work at ___.', 'I like my job because ___.'], words: ['office', 'shop', 'hospital', 'school', 'answer emails', 'help people', 'meet', 'write', 'tired'] },
    { name: "My Mother's / Father's Day", frames: ['My ___ is a ___.', 'She / He gets up at ___.', 'She / He ___ every morning.', 'She / He doesn\'t ___.', 'In the evening she / he ___.', 'I love my ___ because ___.'], words: ['cooks', 'cleans', 'works', 'reads', 'prays', 'drinks', 'watches', 'kind', 'strong'] },
    { name: 'My Favourite Day', frames: ['My favourite day is ___.', 'On ___ I get up at ___.', 'I don\'t ___ on this day.', 'I ___ with ___.', 'In the evening I ___.', 'I love ___ because ___.'], words: ['Friday', 'Saturday', 'Sunday', 'sleep', 'visit', 'cook', 'play', 'relax', 'free'] }
  ],

  missions: [
    'Use a list with commas: I wash, cook and clean.',
    "Use don't or doesn't.",
    'Use a day of the week (capital letter!).',
    'Use he / she + s at least once (gets, goes, works).'
  ],

  /* ---------- Round 6: Judging rubric (each criterion 0 / 1 / 2) ---------- */
  rubric: [
    { icon: 'Aa', title: 'Sentence starts', desc: 'Every sentence starts with a capital letter.' },
    { icon: 'I', title: 'Special capitals', desc: 'Capital for I, names, places, days, months, languages.' },
    { icon: '.?!', title: 'End marks', desc: 'Every sentence ends with . ? or !' },
    { icon: ",'", title: 'Commas & apostrophes', desc: '2 = used correctly · 1 = not used · 0 = mistakes.' },
    { icon: 'S+V', title: 'Present simple sentences', desc: 'Complete sentences, correct verbs: I work / she works / he doesn\'t.' },
    { icon: '¶', title: 'Paragraph shape', desc: 'Topic sentence + 3 supporting + concluding. One topic.' }
  ],
  scale: ['0 = No', '1 = Some', '2 = Yes, all'],

  feedback: [
    '⭐ We like your ___.',
    '⭐ Your topic sentence is very clear.',
    '🔧 You need a capital letter in ___.',
    '🔧 Sentence ___ needs a full stop.',
    '🔧 Add a comma in your list.',
    '🔧 He / She needs + s: "works", not "work".'
  ],

  exitTicket: 'Write 3 sentences about your daily routine. Use capital letters, full stops and one list with commas.'
};
