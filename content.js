/* =========================================================
   Write It Right! — game content
   Theme: present simple + everyday routines.
   Edit anything here to change the questions/texts.
   ========================================================= */
window.CONTENT = {

  /* ---------- Reference rules (used in Learn tabs, Rules panel, handout) ---------- */
  capitals: [
    { lv: 'A', title: 'Start of a sentence', ex: '<u>M</u>y day starts at six.' },
    { lv: 'A', title: 'The word I', ex: 'Sara and <u>I</u> walk to work.' },
    { lv: 'A', title: 'Names of people', ex: '<u>O</u>mar, <u>M</u>r. <u>K</u>han, <u>L</u>ina' },
    { lv: 'B', title: 'Cities and countries', ex: '<u>C</u>airo, <u>D</u>ubai, <u>E</u>gypt, <u>S</u>udan' },
    { lv: 'B', title: 'Days', ex: '<u>M</u>onday, <u>F</u>riday, <u>S</u>aturday' },
    { lv: 'C', title: 'Months', ex: '<u>J</u>uly, <u>A</u>pril, <u>M</u>ay' },
    { lv: 'C', title: 'Languages', ex: '<u>E</u>nglish, <u>A</u>rabic, <u>F</u>rench' },
    { lv: 'A', title: 'NO capital', ex: 'breakfast, work, bus, morning, summer, winter', no: true }
  ],

  marks: [
    { lv: 'A', mark: '.', name: 'full stop', use: 'At the end of a normal sentence.', ex: 'I get up at seven.', action: 'Tap the table once' },
    { lv: 'A', mark: '?', name: 'question mark', use: 'At the end of a question.', ex: 'What time do you get up?', action: 'Shrug your shoulders' },
    { lv: 'B', mark: '!', name: 'exclamation mark', use: 'For strong feelings: surprise, happy, angry.', ex: 'What a busy day!', action: 'Both hands on your cheeks (surprise!)' },
    { lv: 'C', mark: ',', name: 'comma', use: 'Between things in a list (no comma before "and").', ex: 'I wash, cook and clean.', action: 'Hands silent (still)' },
    { lv: 'D', mark: "'", name: 'apostrophe', use: 'Shows missing letters: I\'m = I am, don\'t = do not.', ex: 'She doesn\'t work on Friday.', action: 'Put your hands up' }
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
    'Write 3 supporting sentences. They give details.',
    'That is 5 sentences: 1 topic + 3 details + 1 concluding.',
    'Finish with a concluding sentence. It closes the paragraph.',
    'Indent (move in) the first line.',
    'Sentences follow each other on the line. Do not make a list.'
  ],

  /* Warm-up actions for the YES / NO warm-ups (the teacher picks one from a drop-down menu) */
  warmActions: [
    { id: 'stand', name: 'Stand up / Sit down', yes: { e: '⬆️', t: 'Stand up' }, no: { e: '⬇️', t: 'Sit down' } },
    { id: 'thumbs', name: 'Thumbs up / Thumbs down', yes: { e: '👍', t: 'Thumbs up' }, no: { e: '👎', t: 'Thumbs down' } },
    { id: 'hands', name: 'Hands together / Hands on your head', yes: { e: '🙏', t: 'Hands together (praying)' }, no: { e: '🙆', t: 'Hands on your head' } },
    { id: 'clap', name: 'Clap once / Hands down', yes: { e: '👏', t: 'Clap once' }, no: { e: '✋', t: 'Hands down' } }
  ],

  /* Round 1 warm-up: Stand up (capital) / Sit down (no capital) */
  standUp: [
    { w: 'i', cap: true }, { w: 'breakfast', cap: false }, { w: 'sara', cap: true }, { w: 'bus', cap: false },
    { w: 'omar', cap: true }, { w: 'morning', cap: false },
    { w: 'monday', cap: true, lv: 'B' }, { w: 'cairo', cap: true, lv: 'B' }, { w: 'work', cap: false, lv: 'B' },
    { w: 'july', cap: true, lv: 'C' }, { w: 'english', cap: true, lv: 'C' }, { w: 'summer', cap: false, lv: 'C' }
  ],

  /* Round 2 warm-up: teacher reads, class does the punctuation action */
  bodyPunct: [
    { s: 'I get up at seven.', lv: 'A' }, { s: 'Do you drink tea?', lv: 'A' }, { s: 'Where does she work?', lv: 'A' },
    { s: 'What a long day!', lv: 'B' }, { s: 'I wash, cook and clean.', lv: 'C' }, { s: "I don't like Mondays.", lv: 'D' }
  ],

  /* ---------- Round 3: Verb Check — subject–verb agreement + Correct or wrong?
     type 'choose': options → corners A, B, C · answer = index
     type 'tf': is the sentence correct? ok = true/false · fix = the correct sentence */
  agreement: [
    { lv: 'B', title: 'Spelling', ex: 'go → <u>goes</u> · watch → <u>watches</u> · study → <u>studies</u> · have → <u>has</u>' },
    { lv: 'C', title: "don't / doesn't + verb", ex: "I <u>don't</u> drive. She <u>doesn't</u> drive. (NOT doesn't drive<b>s</b>)" },
    { lv: 'C', title: 'Do / Does …?', ex: '<u>Do</u> you cook? <u>Does</u> he cook? (NOT Does he cook<b>s</b>?)' },
    { lv: 'C', title: 'Careful!', ex: 'My mother and I = <u>we</u> → cook · My brothers = <u>they</u> → work', no: true }
  ],

  /* Round 3 warm-up: clap once if the verb needs -s */
  clapS: [
    { w: 'my brother ___ (work)', s: true, a: 'works' }, { w: 'they ___ (play)', s: false, a: 'play' },
    { w: 'Sara ___ (study)', s: true, a: 'studies' }, { w: 'my friends ___ (go)', s: false, a: 'go' },
    { w: 'the bus ___ (leave)', s: true, a: 'leaves' }, { w: 'you ___ (cook)', s: false, a: 'cook' },
    { w: 'my mother and I ___ (watch)', s: false, a: 'watch' }, { w: 'he ___ (have)', s: true, a: 'has' }
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

  /* =====================================================================
     LEVELS — Beginner A (easiest) → Beginner D. Each level has its own
     questions and texts for rounds 1–6. The Learn tabs only show the rules
     marked with that level or lower (lv: 'A'…'D' above).
     corners: answer = 0..3 (A–D) · swat: {_} = the gap
     verbs: type 'choose' (answer = index) or 'tf' (ok = correct?, fix = correct sentence)
     scramble: words are shown lowercase without punctuation
     ===================================================================== */
  levelInfo: {
    A: { name: 'Beginner A', focus: 'Capitals at the start, I and names · . and ? · I work / she works' },
    B: { name: 'Beginner B', focus: '+ cities, countries and days · ! · goes, watches, has' },
    C: { name: 'Beginner C', focus: "+ months and languages · commas in lists · don't / doesn't · Does …?" },
    D: { name: 'Beginner D', focus: "+ apostrophes (I'm, doesn't) · everything mixed · longer texts" }
  },

  levels: {
    A: {
      corners: [
        { options: ['my name is Ali.', 'My name is ali.', 'My name is Ali.', 'My Name Is Ali.'], answer: 2, why: 'Capital for the start of a sentence and for names: Ali.' },
        { options: ['i get up at six.', 'I get up at six.', 'I Get up at six.', 'i Get Up at six.'], answer: 1, why: 'The word I is always a capital.' },
        { options: ['Sara is my friend.', 'sara is my friend.', 'Sara is my Friend.', 'Sara Is My Friend.'], answer: 0, why: 'Names need a capital: Sara. "friend" is a normal word.' },
        { options: ['i drink tea.', 'I drink Tea.', 'I Drink tea.', 'I drink tea.'], answer: 3, why: 'Only the first word (I) needs a capital.' },
        { options: ['omar works in a shop.', 'Omar works in a shop.', 'Omar Works in a shop.', 'Omar works in a Shop.'], answer: 1, why: 'Start of the sentence + the name Omar.' },
        { options: ['My mother and i cook.', 'my mother and I cook.', 'My mother and I cook.', 'My Mother and I cook.'], answer: 2, why: 'Capital M at the start. I is always a capital.' }
      ],
      swat: [
        { text: 'I get up at seven{_}', answer: '.' },
        { text: 'What is your name{_}', answer: '?' },
        { text: 'She works in a bank{_}', answer: '.' },
        { text: 'Do you drink tea{_}', answer: '?' },
        { text: 'Where do you live{_}', answer: '?' },
        { text: 'We go to work by bus{_}', answer: '.' }
      ],
      verbs: [
        { type: 'choose', text: 'She ___ tea.', options: ['drink', 'drinks'], answer: 1, why: 'she → drinks.' },
        { type: 'tf', text: 'He work in a bank.', ok: false, fix: 'He works in a bank.', why: 'he → works.' },
        { type: 'choose', text: 'I ___ at six.', options: ['get up', 'gets up'], answer: 0, why: 'I → no -s.' },
        { type: 'tf', text: 'Sara likes coffee.', ok: true, why: 'Sara = she → likes.' },
        { type: 'choose', text: 'Omar ___ in a shop.', options: ['work', 'works'], answer: 1, why: 'Omar = he → works.' },
        { type: 'tf', text: 'They plays football.', ok: false, fix: 'They play football.', why: 'they → no -s.' },
        { type: 'choose', text: 'We ___ TV at night.', options: ['watch', 'watches'], answer: 0, why: 'we → no -s.' },
        { type: 'tf', text: 'My father reads the newspaper.', ok: true, why: 'my father = he → reads.' }
      ],
      scramble: [
        { answer: 'I get up at six.', words: 'i get up at six' },
        { answer: 'She drinks tea.', words: 'she drinks tea' },
        { answer: 'My name is Sara.', words: 'my name is sara' },
        { answer: 'He works in a bank.', words: 'he works in a bank' },
        { answer: 'Do you like coffee?', words: 'do you like coffee' },
        { answer: 'Where do you live?', words: 'where do you live' }
      ],
      dictation: [
        { title: 'My Day', level: 'Beginner A', text: 'My name is Sara. I get up at six. I drink tea. I go to work by bus. I work in a bank. I go to bed at ten.' }
      ],
      model: {
        title: 'My Morning',
        topic: 'My mornings are busy.',
        support: ['I get up at six every day.', 'I have tea and bread for breakfast.', 'I go to work by bus.'],
        conclusion: 'I like my mornings.',
        find: 'Find: the topic sentence · 3 details · the concluding sentence · 5 capital letters at the start · 5 full stops.'
      }
    },

    B: {
      corners: [
        { options: ['i get up at seven.', 'I get up at Seven.', 'I Get Up At Seven.', 'I get up at seven.'], answer: 3, why: 'Capital for the start and the word I. Numbers need no capital.' },
        { options: ['Sara drinks coffee every morning.', 'sara drinks coffee every morning.', 'Sara drinks Coffee every morning.', 'Sara Drinks Coffee Every Morning.'], answer: 0, why: 'Names need a capital. Normal words (coffee, morning) do not.' },
        { options: ['We go to the gym on monday.', 'we go to the gym on Monday.', 'We go to the gym on Monday.', 'We go to the Gym on Monday.'], answer: 2, why: 'Days of the week need a capital: Monday.' },
        { options: ['My brother works in dubai.', 'My brother works in Dubai.', 'my brother works in Dubai.', 'My Brother works in dubai.'], answer: 1, why: 'Cities need a capital: Dubai.' },
        { options: ['Omar and I walk to work.', 'Omar and i walk to work.', 'omar and I walk to work.', 'Omar And I Walk To Work.'], answer: 0, why: 'Names and I need capitals. Normal words do not.' },
        { options: ['Do you work on saturday?', 'do you work on Saturday?', 'Do you work on Saturday?', 'Do You Work On Saturday?'], answer: 2, why: 'Questions start with a capital. Saturday is a day → capital.' }
      ],
      swat: [
        { text: 'I get up at six every day{_}', answer: '.' },
        { text: 'What time do you get up{_}', answer: '?' },
        { text: 'What a busy day{_}', answer: '!' },
        { text: 'Does he cook dinner{_}', answer: '?' },
        { text: 'Oh no{_} I am late for work!', answer: '!' },
        { text: 'He takes the bus to work{_}', answer: '.' }
      ],
      verbs: [
        { type: 'choose', text: 'My sister ___ in a bank.', options: ['work', 'works', 'working'], answer: 1, why: 'My sister = she → works.' },
        { type: 'tf', text: 'They gets up at seven.', ok: false, fix: 'They get up at seven.', why: 'they → no -s.' },
        { type: 'choose', text: 'He ___ his homework at night.', options: ['do', 'does', 'dos'], answer: 1, why: 'do → does (add -es).' },
        { type: 'tf', text: 'Omar studies English on Monday.', ok: true, why: 'Omar = he → study → studies.' },
        { type: 'choose', text: 'I ___ coffee every morning.', options: ['drink', 'drinks', 'drinking'], answer: 0, why: 'I → no -s.' },
        { type: 'tf', text: 'We watches TV after dinner.', ok: false, fix: 'We watch TV after dinner.', why: 'we → no -s.' },
        { type: 'choose', text: 'My children ___ to school at eight.', options: ['go', 'goes', 'going'], answer: 0, why: 'my children = they → go.' },
        { type: 'tf', text: 'Sara has breakfast at seven.', ok: true, why: 'have → has with he / she.' }
      ],
      scramble: [
        { answer: 'My sister gets up at six.', words: 'my sister gets up at six' },
        { answer: 'I go to work on Monday.', words: 'i go to work on monday' },
        { answer: 'What time do you have lunch?', words: 'what time do you have lunch' },
        { answer: 'Does she work in Cairo?', words: 'does she work in cairo' },
        { answer: 'What a busy morning!', words: 'what a busy morning' },
        { answer: 'Do you walk to work every day?', words: 'do you walk to work every day' }
      ],
      dictation: [
        { title: "Omar's Day", level: 'Beginner B', text: 'Omar is a taxi driver in Cairo. He gets up at five every day. He drinks tea and eats bread. He works from Sunday to Thursday. On Friday he visits his mother. What a busy man!' }
      ],
      model: {
        title: "My Friend's Day",
        topic: 'My friend Ahmed has a busy day.',
        support: ['He gets up at six every morning.', 'He drives to his office in Cairo.', 'He has lunch with his friends at two.'],
        conclusion: 'I think Ahmed works very hard!',
        find: 'Find: 4 verbs with <b>-s</b> · names and places with capitals · the topic and concluding sentences · the exclamation mark.'
      }
    },

    C: {
      corners: [
        { options: ['She has English lessons on tuesday.', 'She has english lessons on Tuesday.', 'She has English lessons on Tuesday.', 'she has English lessons on Tuesday.'], answer: 2, why: 'Languages (English) and days (Tuesday) need capitals.' },
        { options: ['I swim every day in Summer.', 'I swim every day in summer.', 'i swim every day in summer.', 'I Swim every day in Summer.'], answer: 1, why: 'Careful! Seasons (summer, winter) do NOT need a capital.' },
        { options: ['my father watches the News at night.', 'My Father watches the news at night.', 'My father watches the News at Night.', 'My father watches the news at night.'], answer: 3, why: 'Normal words (father, news, night) are small letters.' },
        { options: ['Mr. Khan teaches maths in the morning.', 'mr. Khan teaches maths in the morning.', 'Mr. khan teaches maths in the morning.', 'Mr. Khan Teaches Maths in the Morning.'], answer: 0, why: 'Titles and names: Mr. Khan. "maths" and "morning" are small.' },
        { options: ['We visit our Family in July.', 'We visit our family in July.', 'We visit our family in july.', 'we visit our family in July.'], answer: 1, why: 'Months need a capital: July.' },
        { options: ['Lina speaks arabic and french at work.', 'lina speaks Arabic and French at work.', 'Lina Speaks Arabic And French at work.', 'Lina speaks Arabic and French at work.'], answer: 3, why: 'Names and languages need capitals.' }
      ],
      swat: [
        { text: 'I have bread{_} eggs and tea for breakfast.', answer: ',' },
        { text: 'When do you go to bed{_}', answer: '?' },
        { text: 'On Sunday I clean{_} cook and wash the clothes.', answer: ',' },
        { text: 'What a lovely morning{_}', answer: '!' },
        { text: 'We watch TV{_} read and relax in the evening.', answer: ',' },
        { text: 'My sister starts work at nine{_}', answer: '.' }
      ],
      verbs: [
        { type: 'tf', text: "She don't eat meat.", ok: false, fix: "She doesn't eat meat.", why: "she → doesn't." },
        { type: 'choose', text: '___ your father drive to work?', options: ['Do', 'Does', 'Is'], answer: 1, why: 'your father = he → Does …?' },
        { type: 'choose', text: "The shop ___ at nine o'clock.", options: ['open', 'opens', 'opening'], answer: 1, why: 'the shop = it → opens.' },
        { type: 'tf', text: 'Does he works on Friday?', ok: false, fix: 'Does he work on Friday?', why: 'After does, the verb has no -s.' },
        { type: 'choose', text: 'My mother and I ___ dinner together.', options: ['cook', 'cooks', 'cooking'], answer: 0, why: 'my mother and I = we → cook.' },
        { type: 'tf', text: 'I have tea, bread and cheese for breakfast.', ok: true, why: 'Commas in the list, capital I, full stop.' },
        { type: 'tf', text: 'We go to the gym on monday.', ok: false, fix: 'We go to the gym on Monday.', why: 'Days need a capital: Monday.' },
        { type: 'tf', text: 'Where does she live.', ok: false, fix: 'Where does she live?', why: 'A question ends with a question mark.' }
      ],
      scramble: [
        { answer: 'Ahmed and I play football on Friday.', words: 'ahmed and i play football on friday' },
        { answer: 'I have tea, bread and cheese for breakfast.', words: 'i have tea bread and cheese for breakfast' },
        { answer: 'We visit our grandmother every Sunday.', words: 'we visit our grandmother every sunday' },
        { answer: 'Where does your brother work?', words: 'where does your brother work' },
        { answer: 'What time does the bank open?', words: 'what time does the bank open' },
        { answer: 'Sara studies English in the evening.', words: 'sara studies english in the evening' }
      ],
      dictation: [
        { title: "Omar's Week", level: 'Beginner C', text: "Omar is a taxi driver in Alexandria. He usually gets up at half past five. He has tea, bread and cheese for breakfast. He doesn't work on Fridays. On Saturday he takes his children to the beach. What a lovely day!" }
      ],
      model: {
        title: 'My Weekend',
        topic: 'My weekends are relaxing and fun.',
        support: ['On Friday I sleep late and pray at the mosque.', 'In the afternoon I visit my parents, my brother and my sister.', 'On Saturday we go to the market and buy fruit, vegetables and fish.'],
        conclusion: 'I love my weekends because I see my family.',
        find: 'Find: 2 lists with commas · days with capitals · the topic and concluding sentences.'
      }
    },

    D: {
      corners: [
        { options: ['Mr. khan teaches English in Cairo.', 'Mr. Khan teaches English in Cairo.', 'mr. Khan teaches english in Cairo.', 'Mr. Khan Teaches English In Cairo.'], answer: 1, why: 'Title + name, language and city all need capitals.' },
        { options: ['We visit our family in Egypt in July.', 'We visit our Family in Egypt in July.', 'we visit our family in egypt in July.', 'We visit our family in Egypt in july.'], answer: 0, why: 'Countries and months need capitals. "family" does not.' },
        { options: ['My brother and i swim every Saturday in summer.', 'My brother and I swim every Saturday in Summer.', 'My brother and I swim every Saturday in summer.', 'my brother and I swim every saturday in summer.'], answer: 2, why: 'I and Saturday need capitals. Seasons do not.' },
        { options: ['does your sister work in dubai on Sunday?', 'Does your sister work in Dubai on Sunday?', 'Does your Sister work in Dubai on sunday?', 'Does Your Sister Work In Dubai On Sunday?'], answer: 1, why: 'Start, city and day need capitals.' },
        { options: ["i'm a nurse at a hospital in Alexandria.", "I'm a Nurse at a hospital in alexandria.", "I'm a nurse at a Hospital in Alexandria.", "I'm a nurse at a hospital in Alexandria."], answer: 3, why: "I'm = I am → capital I. Cities need a capital." },
        { options: ['Lina and I speak Arabic, English and French.', 'Lina and I speak arabic, english and french.', 'lina and i speak Arabic, English and French.', 'Lina And I Speak Arabic, English And French.'], answer: 0, why: 'Names, I and languages need capitals.' }
      ],
      swat: [
        { text: 'She doesn{_}t work on Friday.', answer: "'" },
        { text: 'I{_}m always tired on Monday.', answer: "'" },
        { text: 'We need milk{_} eggs and bread.', answer: ',' },
        { text: 'Where does your brother work{_}', answer: '?' },
        { text: 'I don{_}t drink coffee at night.', answer: "'" },
        { text: 'What a lovely surprise{_}', answer: '!' },
        { text: 'They{_}re from Sudan.', answer: "'" }
      ],
      verbs: [
        { type: 'choose', text: 'My brothers ___ in Dubai.', options: ['lives', 'live', 'living'], answer: 1, why: 'my brothers = they → live.' },
        { type: 'tf', text: 'Does she speaks English?', ok: false, fix: 'Does she speak English?', why: 'After does, no -s.' },
        { type: 'choose', text: 'The bus ___ at seven every morning.', options: ['leave', 'leaves', 'leaving'], answer: 1, why: 'the bus = it → leaves.' },
        { type: 'tf', text: "My mother and I doesn't drink coffee.", ok: false, fix: "My mother and I don't drink coffee.", why: "my mother and I = we → don't." },
        { type: 'choose', text: '___ your children walk to school?', options: ['Does', 'Do', 'Are'], answer: 1, why: 'your children = they → Do …?' },
        { type: 'tf', text: 'He watches the news, reads and goes to bed.', ok: true, why: 'he → watches, reads, goes.' },
        { type: 'choose', text: 'My boss never ___ late.', options: ['arrive', 'arrives', 'arriving'], answer: 1, why: 'my boss = he / she → arrives.' },
        { type: 'tf', text: 'Lina study English every evening.', ok: false, fix: 'Lina studies English every evening.', why: 'Lina = she → studies.' }
      ],
      scramble: [
        { answer: "He doesn't drink coffee.", words: 'he doesnt drink coffee' },
        { answer: 'When does your English lesson start?', words: 'when does your english lesson start' },
        { answer: 'Does Lina visit her mother on Saturday?', words: 'does lina visit her mother on saturday' },
        { answer: "My brother doesn't work on Friday.", words: 'my brother doesnt work on friday' },
        { answer: "I'm a teacher in Cairo.", words: 'im a teacher in cairo' },
        { answer: 'We wash, cook and clean on Saturday.', words: 'we wash cook and clean on saturday' },
        { answer: 'How do you go to work?', words: 'how do you go to work' }
      ],
      dictation: [
        { title: "Lina's Week", level: 'Beginner D', text: "Lina works as a nurse at a big hospital in Dubai. She starts work at seven o'clock every morning. She never has time for breakfast. She doesn't work on Fridays. On Saturdays she visits her mother, cooks lunch and talks for hours. Does Lina love her job? Yes, she does!" },
        { title: 'A Teacher in Cairo', level: 'Beginner D+', text: "I'm an English teacher in Cairo. I wake up at five thirty and I always pray first. My husband makes coffee and I get dressed. We don't eat breakfast at home. I take the metro to work. My lessons start at eight on Sunday, Monday and Tuesday. My students are busy adults. They never miss a class!" }
      ],
      model: {
        title: "My Grandfather's Day",
        topic: 'My grandfather Hassan has a calm but busy routine.',
        support: [
          "He always wakes up at five o'clock and prays at the mosque near his house.",
          'Then he drinks tea, reads the newspaper and walks along the Nile for an hour.',
          "He doesn't watch TV in the morning because he prefers the radio."
        ],
        conclusion: "I love my grandfather's routine because it is simple, healthy and happy.",
        find: "Find: 6 verbs with <b>-s</b> · a list with commas · doesn't and grandfather's · names and places with capitals · the topic and concluding sentences."
      }
    }
  },

  topics: [
    { name: 'My Morning Routine', frames: ['My mornings are ___ (busy / quiet).', 'I get up at ___.', 'I ___ and ___ in the bathroom.', 'I have ___ for breakfast.', 'I like my mornings because ___.'], words: ['wake up', 'get up', 'have a shower', 'brush my teeth', 'get dressed', 'pray', 'make tea', 'catch the bus', 'drive'] },
    { name: 'My Evening Routine', frames: ['My evenings are ___.', 'I come home at ___.', 'I have dinner at ___ with ___.', 'After dinner I ___, ___ and ___.', 'I love my evenings because ___.'], words: ['cook', 'watch TV', 'read', 'call my family', 'help my children', 'check my phone', 'relax', 'tired', 'happy'] },
    { name: 'My Weekend', frames: ['My weekends are ___.', 'I get up at ___ on Friday.', 'I ___ with my family.', 'On Saturday I ___, ___ and ___.', 'I love weekends because ___.'], words: ['sleep late', 'visit', 'go shopping', 'clean the house', 'go to the market', 'eat out', 'relaxing', 'fun'] },
    { name: "My Friend's Day", frames: ['My friend ___ is a ___.', 'He / She gets up at ___.', 'He / She goes to work by ___.', 'Every day he / she ___.', 'My friend\'s day is ___ because ___.'], words: ['gets up', 'goes', 'works', 'studies', 'watches', 'has', 'teaches', 'drives', 'busy'] },
    { name: 'My Working Day', frames: ['I am a ___.', 'I start work at ___.', 'I work in ___.', 'Every day I ___, ___ and ___.', 'I like my job because ___.'], words: ['office', 'shop', 'hospital', 'school', 'answer emails', 'help people', 'meet', 'write', 'tired'] },
    { name: "My Mother's / Father's Day", frames: ['My ___ is a ___.', 'She / He gets up at ___.', 'She / He ___ every morning.', 'She / He doesn\'t ___.', 'I love my ___ because ___.'], words: ['cooks', 'cleans', 'works', 'reads', 'prays', 'drinks', 'watches', 'kind', 'strong'] },
    { name: 'My Favourite Day', frames: ['My favourite day is ___.', 'On ___ I get up at ___.', 'I don\'t ___ on this day.', 'I ___ with ___.', 'I love ___ because ___.'], words: ['Friday', 'Saturday', 'Sunday', 'sleep', 'visit', 'cook', 'play', 'relax', 'free'] }
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
      check: 'Sentence 1 = topic · sentences 2, 3, 4 = details · sentence 5 = concluding. All about one routine.',
      ex: 'Top bun · fillings · bottom bun 🍔' }
  ],
  scale: ['😃 2 stars = no mistakes', '🙂 1 star = 1–2 mistakes', '😟 0 stars = 3 or more mistakes'],
  sentences: 5, // posters have 5 sentences
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
