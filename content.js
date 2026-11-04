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

  /* ---------- Round 3: Verb Check — subject–verb agreement + Correct or wrong?
     type 'choose': options → corners A, B, C · answer = index
     type 'tf': is the sentence correct? ok = true/false · fix = the correct sentence */
  agreement: [
    { title: 'Spelling', ex: 'go → <u>goes</u> · watch → <u>watches</u> · study → <u>studies</u> · have → <u>has</u>' },
    { title: "don't / doesn't + verb", ex: "I <u>don't</u> drive. She <u>doesn't</u> drive. (NOT doesn't drive<b>s</b>)" },
    { title: 'Do / Does …?', ex: '<u>Do</u> you cook? <u>Does</u> he cook? (NOT Does he cook<b>s</b>?)' },
    { title: 'Careful!', ex: 'My mother and I = <u>we</u> → cook · My brothers = <u>they</u> → work', no: true }
  ],

  /* Round 3 warm-up: clap once if the verb needs -s */
  clapS: [
    { w: 'my brother ___ (work)', s: true, a: 'works' }, { w: 'they ___ (play)', s: false, a: 'play' },
    { w: 'Sara ___ (study)', s: true, a: 'studies' }, { w: 'my friends ___ (go)', s: false, a: 'go' },
    { w: 'the bus ___ (leave)', s: true, a: 'leaves' }, { w: 'you ___ (cook)', s: false, a: 'cook' },
    { w: 'my mother and I ___ (watch)', s: false, a: 'watch' }, { w: 'he ___ (have)', s: true, a: 'has' }
  ],

  verbs: [
    { type: 'choose', text: 'My sister ___ in a bank.', options: ['work', 'works', 'working'], answer: 1, why: 'My sister = she → works.' },
    { type: 'tf', text: 'They gets up at seven.', ok: false, fix: 'They get up at seven.', why: 'they → no -s.' },
    { type: 'choose', text: 'I ___ coffee every morning.', options: ['drink', 'drinks', 'drinking'], answer: 0, why: 'I → no -s.' },
    { type: 'tf', text: 'Omar studies English on Monday.', ok: true, why: 'Omar = he → study → studies.' },
    { type: 'choose', text: 'He ___ his homework at night.', options: ['do', 'dos', 'does'], answer: 2, why: 'do → does (add -es).' },
    { type: 'tf', text: "She don't eat meat.", ok: false, fix: "She doesn't eat meat.", why: "she → doesn't." },
    { type: 'choose', text: '___ your father drive to work?', options: ['Do', 'Does', 'Is'], answer: 1, why: 'your father = he → Does …?' },
    { type: 'tf', text: 'We watches TV after dinner.', ok: false, fix: 'We watch TV after dinner.', why: 'we → no -s.' },
    { type: 'choose', text: 'The shop ___ at nine o\'clock.', options: ['open', 'opens', 'opening'], answer: 1, why: 'the shop = it → opens.' },
    { type: 'tf', text: 'Does he works on Friday?', ok: false, fix: 'Does he work on Friday?', why: 'After does, the verb has no -s.' },
    { type: 'choose', text: 'My mother and I ___ dinner together.', options: ['cook', 'cooks', 'cooking'], answer: 0, why: 'my mother and I = we → cook.' },
    { type: 'tf', text: 'Sara has breakfast at seven.', ok: true, why: 'have → has with he / she.' },
    { type: 'tf', text: 'We go to the gym on monday.', ok: false, fix: 'We go to the gym on Monday.', why: 'Days need a capital: Monday.' },
    { type: 'tf', text: 'Where does she live.', ok: false, fix: 'Where does she live?', why: 'A question ends with a question mark.' },
    { type: 'tf', text: 'I have tea, bread and cheese for breakfast.', ok: true, why: 'Commas in the list, capital I, full stop.' },
    { type: 'choose', text: 'My children ___ to school at eight.', options: ['go', 'goes', 'going'], answer: 0, why: 'my children = they → go.' }
  ],

  /* ---------- Round 4: Sentence Scramble (sentences + questions) (words shown lowercase, no punctuation) ---------- */
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
    { answer: 'Sara studies English in the evening.', words: 'sara studies english in the evening' },
    { answer: 'Where does your brother work?', words: 'where does your brother work' },
    { answer: 'Do you walk to work every day?', words: 'do you walk to work every day' },
    { answer: 'What time does the bank open?', words: 'what time does the bank open' },
    { answer: 'Does Lina visit her mother on Saturday?', words: 'does lina visit her mother on saturday' },
    { answer: 'How do you go to work?', words: 'how do you go to work' },
    { answer: 'When does your English lesson start?', words: 'when does your english lesson start' }
  ],

  /* Round 4 warm-up: sentence or not? */
  sentenceOrNot: [
    { s: 'I get up at seven.', ok: true, why: 'Subject + verb + full stop.' },
    { s: 'every morning at six', ok: false, why: 'No subject and no verb.' },
    { s: 'She works in a bank.', ok: true, why: 'Subject (She) + verb (works).' },
    { s: 'my brother on Friday', ok: false, why: 'No verb. What does he do?' },
    { s: 'We have lunch at two.', ok: true, why: 'Subject (We) + verb (have).' },
    { s: 'goes to bed at ten', ok: false, why: 'No subject. Who goes to bed?' }
  ],

  /* ---------- Round 5: Running Dictation texts ---------- */
  dictation: [
    { title: "Omar's Day", level: 'Standard', text: "Omar is a taxi driver in Alexandria. He usually gets up at half past five. He has tea, bread and cheese for breakfast. He doesn't work on Fridays. On Saturday he takes his children to the beach. What a lovely day!" },
    { title: "Lina's Week", level: 'Harder', text: "Lina works as a nurse at a big hospital in Dubai. She starts work at seven o'clock every morning. She never has time for breakfast. She doesn't work on Fridays. On Saturdays she visits her mother, cooks lunch and talks for hours. Does Lina love her job? Yes, she does!" },
    { title: 'A Teacher in Cairo', level: 'Challenge', text: "I'm an English teacher in Cairo. I wake up at five thirty and I always pray first. My husband makes coffee and I get dressed. We don't eat breakfast at home. I take the metro to work. My lessons start at eight on Sunday, Monday and Tuesday. My students are busy adults. They never miss a class!" }
  ],

  /* ---------- Round 6: Paragraph Builder ---------- */
  model: {
    title: "My Grandfather's Day",
    topic: 'My grandfather Hassan has a calm but busy routine.',
    support: [
      'He always wakes up at five o\'clock and prays at the mosque near his house.',
      'Then he drinks tea, reads the newspaper and walks along the Nile for an hour.',
      "He doesn't watch TV in the morning because he prefers the radio.",
      'Every Friday he visits my family in Giza and tells us funny stories.'
    ],
    conclusion: "I love my grandfather's routine because it is simple, healthy and happy.",
    find: 'Find: 6 verbs with <b>-s</b> · 2 lists with commas · doesn\'t and grandfather\'s · names, places and days with capitals · the topic and concluding sentences.'
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

  /* ---------- Round 7: Judging — 5 checks, each 0 / 1 / 2 stars (max 10) ----------
     Judges COUNT MISTAKES for each check:  no mistakes = 2 · 1–2 mistakes = 1 · 3 or more = 0 */
  rubric: [
    { icon: 'Aa', title: 'Capital letters', from: 'Capital Corners',
      check: 'Look at the first letter of every sentence, I, names, places and days.',
      ex: '<u>M</u>y friend <u>S</u>ara goes to <u>C</u>airo on <u>M</u>onday.' },
    { icon: '.?!', title: 'End marks', from: 'Punctuation Swat',
      check: 'Look at the end of every sentence. Is there . ? or ! ?',
      ex: 'She works in a bank<b>.</b> Does she like it<b>?</b>' },
    { icon: ",'", title: 'Commas and apostrophes', from: 'Punctuation Swat',
      check: "Find the list and the short forms (don't, doesn't, I'm). Not used = 1 star.",
      ex: "I wash<b>,</b> cook and clean. He doesn<b>'</b>t drive." },
    { icon: 'S+V', title: 'Verbs (he / she + s)', from: 'Verb Check',
      check: 'Look at every verb. he / she / it + s · I / you / we / they: no s.',
      ex: 'She <u>works</u>. They <u>work</u>. He <u>doesn\'t</u> work.' },
    { icon: '¶', title: 'Paragraph shape', from: 'Paragraph Builder',
      check: 'Topic sentence → 3 or more details → concluding sentence. All about one routine.',
      ex: 'Top bun · fillings · bottom bun 🍔' }
  ],
  scale: ['😃 2 stars = no mistakes', '🙂 1 star = 1–2 mistakes', '😟 0 stars = 3 or more mistakes'],
  maxStars: 10,

  /* Prizes the winners can choose from */
  prizes: [
    { e: '🍩', name: 'Donut' },
    { e: '🍫', name: 'Chocolate' },
    { e: '🖊️', name: 'Pens' },
    { e: '🗒️', name: 'Sticky notes' }
  ],

  feedback: [
    '⭐ We like your ___.',
    '⭐ Your topic sentence is very clear.',
    '🔧 You need a capital letter in ___.',
    '🔧 Sentence ___ needs a full stop.',
    '🔧 Add a comma in your list.',
    '🔧 He / She needs + s: "works", not "work".',
    '🔧 Your paragraph needs a concluding sentence.'
  ],

  exitTicket: 'Write 3 sentences about your daily routine. Use capital letters, full stops and one list with commas.'
};
