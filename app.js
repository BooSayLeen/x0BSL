/* =========================================================
   Write It Right! — classroom writing game (teacher-run, projected)
   Plain JavaScript, no build step. State is saved in localStorage.
   ========================================================= */
(function () {
  'use strict';

  const C = window.CONTENT;
  // levels: Beginner A (easiest) → D. L() = the current level's questions and texts
  const LVS = ['A', 'B', 'C', 'D'];
  const L = () => C.levels[S.level] || C.levels.A;
  const upTo = arr => arr.filter(x => !x.lv || LVS.indexOf(x.lv) <= LVS.indexOf(S.level || 'A'));
  const levelName = () => (C.levelInfo[S.level] || C.levelInfo.A).name;
  const KEY = 'write-it-right-v2';
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const LET = 'ABCD';

  const TEAM_STYLES = [
    { name: 'Full Stops', sym: '.', color: '#E4572E' },
    { name: 'Commas', sym: ',', color: '#1F7A8C' },
    { name: 'Question Marks', sym: '?', color: '#7B2CBF' },
    { name: 'Exclamations', sym: '!', color: '#D98E04' },
    { name: 'Apostrophes', sym: '’', color: '#2A9D8F' },
    { name: 'Capitals', sym: 'A', color: '#C9184A' },
    { name: 'Colons', sym: ':', color: '#3A6EA5' },
    { name: 'Quotes', sym: '“', color: '#5B8E3E' }
  ];

  const STAGES = [
    { id: 'setup', short: 'Teams', title: 'Set up the teams', mins: 3 },
    { id: 'r1', short: 'Capital Corners', title: 'Capital Corners', n: 1, skill: 'Capital letters', move: 'Corners, boards or cards', mins: 6, aim: '5 questions',
      tabs: [['learn', 'Learn'], ['how', 'How to play'], ['play', 'Play']] },
    { id: 'r2', short: 'Punctuation Swat', title: 'Punctuation Swat', n: 2, skill: '.  ?  !  ,  ’', move: 'Swat, boards or cards', mins: 6, aim: '6 sentences',
      tabs: [['learn', 'Learn'], ['how', 'How to play'], ['play', 'Play']] },
    { id: 'rv', short: 'Verb Check', title: 'Verb Check', n: 3, skill: 'he / she + s · correct or wrong?', move: 'Corners, boards or cards', mins: 6, aim: '6 questions',
      tabs: [['learn', 'Learn'], ['how', 'How to play'], ['play', 'Play']] },
    { id: 'r3', short: 'Sentence Scramble', title: 'Sentence Scramble', n: 4, skill: 'Sentences + questions', move: 'Relay to the judge', mins: 6, aim: '4–5 items',
      tabs: [['learn', 'Learn'], ['how', 'How to play'], ['play', 'Play']] },
    { id: 'r4', short: 'Running Dictation', title: 'Running Dictation', n: 5, skill: 'Accurate writing', move: 'Walk, read, remember', mins: 7,
      tabs: [['how', 'How to play'], ['play', 'Play'], ['check', 'Check']] },
    { id: 'r5', short: 'Paragraph Builder', title: 'Paragraph Builder', n: 6, skill: 'Simple paragraphs', move: 'Poster on the wall', mins: 12,
      tabs: [['learn', 'Learn'], ['topics', 'Topics'], ['write', 'Write']] },
    { id: 'r6', short: "Judges' Walk", title: "Judges' Walk", n: 7, skill: 'Peer judging', move: 'Gallery walk', mins: 10,
      tabs: [['how', 'How to judge'], ['walk', 'Walk'], ['scores', 'Enter scores'], ['results', 'Results']] },
    { id: 'awards', short: 'Awards', title: 'Awards', mins: 4 }
  ];

  /* ------------------------------------------------------------------ state */
  function defaultState() {
    const rounds = {};
    STAGES.forEach(s => { if (s.tabs) rounds[s.id] = { tab: s.tabs[0][0], i: 0, rev: {} }; });
    return {
      v: 1, stage: 0,
      students: Array.from({ length: 11 }, (_, i) => 'Student ' + (i + 1)),
      mode: 'pairs', nTeams: 4, teams: [], awards: {}, rounds,
      topics: {}, topicView: 0, judging: {}, judge: null, r4text: 0, r6rot: 1,
      level: 'A', peek: {}, sound: true, theme: 'light', answerMode: 'move', prizes: {},
      warmAct: { r1: 'stand', rv: 'clap', r3: 'thumbs' }
    };
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const d = defaultState(), s = JSON.parse(raw);
      return Object.assign(d, s, { rounds: Object.assign(d.rounds, s.rounds || {}) });
    } catch (e) { return defaultState(); }
  }
  let S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked */ } }

  const team = id => S.teams.find(t => t.id === id);
  const stage = () => STAGES[S.stage];

  /* ------------------------------------------------------------------ scoring */
  function score(tid) {
    let n = 0;
    for (const k in S.awards) n += S.awards[k][tid] || 0;
    return n;
  }
  function scoreBy(tid, prefix) {
    let n = 0;
    for (const k in S.awards) if (k === prefix || k.startsWith(prefix + ':')) n += S.awards[k][tid] || 0;
    return n;
  }
  function setAward(key, tid, pts) {
    S.awards[key] = S.awards[key] || {};
    const prev = S.awards[key][tid] || 0;
    S.awards[key][tid] = pts;
    if (pts > prev) sfx.point();
  }

  /* ------------------------------------------------------------------ sound */
  let ac = null;
  function tone(freq, dur, type, when, vol) {
    if (!S.sound) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === 'suspended') ac.resume();
      const t0 = ac.currentTime + (when || 0);
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = type || 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(vol || 0.18, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      o.connect(g); g.connect(ac.destination);
      o.start(t0); o.stop(t0 + dur + 0.05);
    } catch (e) { /* no audio */ }
  }
  const sfx = {
    point() { tone(660, 0.12); tone(990, 0.2, 'sine', 0.1); },
    reveal() { tone(520, 0.12, 'triangle'); tone(780, 0.25, 'triangle', 0.12); },
    cue() { [0, 0.25, 0.5].forEach(w => tone(740, 0.18, 'square', w, 0.12)); },
    alarm() { for (let i = 0; i < 6; i++) tone(i % 2 ? 660 : 880, 0.22, 'square', i * 0.28, 0.13); },
    fanfare() { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.35, 'triangle', i * 0.15, 0.16)); }
  };

  /* ------------------------------------------------------------------ flash + confetti */
  let flashTO;
  function flash(text, color) {
    const el = $('#flash');
    el.textContent = text;
    el.style.setProperty('--fc', color || 'var(--accent)');
    el.classList.add('on');
    clearTimeout(flashTO);
    flashTO = setTimeout(() => el.classList.remove('on'), 2600);
  }
  function confetti() {
    const colors = TEAM_STYLES.map(t => t.color);
    const box = document.createElement('div');
    box.className = 'confetti';
    for (let i = 0; i < 140; i++) {
      const p = document.createElement('i');
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = Math.random() * 0.8 + 's';
      p.style.animationDuration = 2.2 + Math.random() * 1.8 + 's';
      p.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      box.appendChild(p);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 5000);
  }

  /* ------------------------------------------------------------------ timer */
  const T = { total: 300, left: 300, running: false, end: 0, label: '', every: 0, everyText: '', lastCue: -1 };
  function timerSet(sec, opts) {
    opts = opts || {};
    T.total = sec; T.left = sec; T.running = false;
    T.label = opts.label || "TIME'S UP!";
    T.every = opts.every || 0; T.everyText = opts.everyText || ''; T.lastCue = -1;
    const sel = $('#t-preset');
    if ([...sel.options].some(o => +o.value === sec)) sel.value = String(sec);
    drawTimer();
  }
  function timerStart() {
    if (T.left <= 0) T.left = T.total;
    T.running = true; T.end = Date.now() + T.left * 1000; drawTimer();
  }
  function timerPause() { T.running = false; drawTimer(); }
  function tick() {
    if (!T.running) return;
    const left = Math.max(0, Math.ceil((T.end - Date.now()) / 1000));
    if (left !== T.left) {
      T.left = left;
      const elapsed = T.total - left;
      if (T.every && left > 0 && elapsed > 0 && elapsed % T.every === 0 && T.lastCue !== elapsed) {
        T.lastCue = elapsed; sfx.cue(); flash(T.everyText);
      }
      if (left <= 5 && left > 0) tone(1000, 0.06, 'sine', 0, 0.08);
      if (left === 0) { T.running = false; T.endedAt = Date.now(); sfx.alarm(); flash(T.label, 'var(--bad)'); setTimeout(drawTimer, 3600); }
      drawTimer();
    }
  }
  const fmt = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  function drawTimer() {
    const d = $('#t-disp');
    d.textContent = fmt(T.left);
    d.classList.toggle('low', T.left <= 10 && T.left > 0 && T.running);
    d.classList.toggle('zero', T.left === 0);
    $('#t-toggle').textContent = T.running ? '⏸' : '▶';
    // short answer timers (5 / 10 / 20 s) also count down big on the question card
    const qt = document.querySelector('.qtimer');
    if (qt) {
      const show = T.total <= 30 && (T.running || (T.left === 0 && Date.now() - (T.endedAt || 0) < 3500));
      qt.classList.toggle('on', show);
      qt.classList.toggle('low', show && T.left <= 3);
      qt.textContent = show ? (T.left > 0 ? T.left : '⏰') : '';
    }
    const big = $('#bigtimer');
    if (big.classList.contains('on')) {
      const pct = T.total ? (T.left / T.total) * 100 : 0;
      big.innerHTML = `<div class="bt-inner"><div class="bt-label">${esc(T.running ? 'Time left' : (T.left === 0 ? "Time's up" : 'Paused'))}</div>
        <div class="bt-num ${T.left <= 10 ? 'low' : ''}">${fmt(T.left)}</div>
        <div class="bt-bar"><span style="width:${pct}%"></span></div>
        <div class="bt-hint">Click anywhere to close · T = start/pause</div></div>`;
    }
  }
  setInterval(tick, 200);
  // quick timer used by the rounds: set + start + flash
  function cue(sec, label, opts) {
    timerSet(sec, Object.assign({ label: label }, opts || {}));
    timerStart();
    sfx.cue();
  }

  /* ------------------------------------------------------------------ teams */
  function planTeams(n, mode, nTeams) {
    let k;
    if (mode === 'custom') k = nTeams;
    else {
      const size = { pairs: 2, threes: 3, fours: 4 }[mode] || 2;
      k = Math.round(n / size);
      while (k > 1 && Math.floor(n / k) < 2) k--;
    }
    k = Math.max(2, Math.min(8, k, Math.floor(n / 2) || 2));
    const sizes = Array.from({ length: k }, (_, i) => Math.floor(n / k) + (i < n % k ? 1 : 0));
    return sizes;
  }
  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function seededShuffle(a, seed) {
    a = a.slice();
    let x = seed * 9301 + 49297;
    const rnd = () => { x = (x * 9301 + 49297) % 233280; return x / 233280; };
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function readNames() {
    const ta = $('#names');
    if (ta) S.students = ta.value.split('\n').map(s => s.trim()).filter(Boolean);
    return S.students;
  }
  function hasProgress() { return Object.keys(S.awards).length > 0 || Object.keys(S.judging).length > 0; }
  function makeTeams() {
    const names = readNames();
    if (names.length < 2) { alert('Add at least 2 student names.'); return; }
    if (hasProgress() && !confirm('Making new teams will clear all scores. Continue?')) return;
    const sizes = planTeams(names.length, S.mode, S.nTeams);
    const pool = shuffle(names);
    S.teams = sizes.map((sz, i) => Object.assign({ id: 't' + i, members: [] }, TEAM_STYLES[i]));
    pool.forEach((nm, i) => S.teams[i % sizes.length].members.push(nm));
    S.awards = {}; S.judging = {}; S.topics = {}; S.judge = null;
    sfx.fanfare();
  }

  /* ------------------------------------------------------------------ small html helpers */
  function hl(text) {
    // highlight capitals and punctuation in a (plain) text
    return esc(text)
      .replace(/&#39;/g, "\u0001")
      .replace(/[A-Z]/g, m => `<b class="hc">${m}</b>`)
      .replace(/[.,?!\u0001]/g, m => `<b class="hp">${m === '\u0001' ? "'" : m}</b>`);
  }
  const tchip = t => `<span class="tchip" style="--c:${t.color}"><i>${esc(t.sym)}</i>${esc(t.name)}</span>`;
  const tdot = t => `<i class="tdot" style="--c:${t.color}">${esc(t.sym)}</i>`;
  function needTeams() {
    return S.teams.length ? '' : `<div class="notice">No teams yet. <button class="btn sm" data-act="go" data-i="0">Make teams first</button></div>`;
  }
  function awardBlock(key, max, hint, labels) {
    if (!S.teams.length) return needTeams();
    const cur = S.awards[key] || {};
    return `<div class="award"><div class="award-h">Give points <small>${esc(hint)}</small></div>
      ${S.teams.map(t => `<div class="aw-row">${tchip(t)}<div class="pills">${Array.from({ length: max + 1 }, (_, p) =>
        `<button class="pill ${(cur[t.id] || 0) === p ? 'on' : ''}" style="--c:${t.color}" data-act="award" data-key="${key}" data-team="${t.id}" data-pts="${p}" title="${labels && labels[p] ? esc(labels[p]) : ''}">${p ? '+' + p : '0'}</button>`).join('')}</div></div>`).join('')}
    </div>`;
  }
  const dictText = () => L().dictation[S.r4text] || L().dictation[0];
  function roundHead(s) {
    const r = S.rounds[s.id];
    return `<div class="rhead">
      <div class="rnum">Round ${s.n}</div>
      <h1>${esc(s.title)}</h1>
      <div class="tags"><span class="tag lvl">🎯 ${esc(levelName())}</span><span class="tag skill">✏️ ${esc(s.id === 'r2' ? upTo(C.marks).map(m => m.mark === "'" ? '’' : m.mark).join('  ') : s.skill)}</span><span class="tag move">🏃 ${esc(s.move)}</span><span class="tag time">⏱ ~${s.mins} min${s.aim ? ' · ' + esc(s.aim) : ''}</span></div>
      <div class="tabs">${s.tabs.map(([id, lab], i) => `<button class="tab ${r.tab === id ? 'on' : ''}" data-act="tab" data-tab="${id}"><span>${i + 1}</span>${esc(lab)}</button>`).join('')}</div>
    </div>`;
  }
  function itemNav(id, n, word) {
    const r = S.rounds[id];
    const dots = Array.from({ length: n }, (_, i) => `<button class="dot ${i === r.i ? 'on' : ''} ${r.rev[i] ? 'done' : ''}" data-act="item" data-i="${i}" title="${word} ${i + 1}"></button>`).join('');
    return `<div class="inav"><button class="btn ghost" data-act="prev" ${r.i === 0 ? 'disabled' : ''}>◀ Prev</button>
      <div class="inav-mid"><b>${word} ${r.i + 1}</b> of ${n}<div class="dots">${dots}</div></div>
      <button class="btn ghost" data-act="next" ${r.i >= n - 1 ? 'disabled' : ''}>Next ▶</button></div>`;
  }
  const boardMode = () => S.answerMode === 'board';
  // pick text for the current answer mode: run to the corner · write on the board · raise the right card
  const byMode = (move, board, card) => S.answerMode === 'board' ? board : S.answerMode === 'card' ? card : move;
  function modeBar() {
    return `<div class="modebar"><span>Teams answer by</span><div class="seg">${[['move', '🏃 Running to the corner'], ['board', '🪧 Writing on the board'], ['card', '🃏 Raising the right card']].map(([m, l]) =>
      `<button class="${S.answerMode === m ? 'on' : ''}" data-act="answerMode" data-m="${m}">${l}</button>`).join('')}</div></div>`;
  }
  function quickTimers(moveLabel) {
    const label = byMode(moveLabel, 'BOARDS UP!', 'CARDS UP!');
    return [5, 10, 20].map(sec => `<button class="btn qt" data-act="cue" data-sec="${sec}" data-label="${esc(label)}">⏱ ${sec} s</button>`).join('');
  }
  const qtimer = '<div class="qtimer" aria-live="polite"></div>';
  function optionCards(opts, ans, rev) {
    return `<div class="corners n${opts.length}">${opts.map((o, i) => `<div class="corner c${i} ${rev ? (i === ans ? 'right' : 'wrong') : ''}"><span class="cl">${LET[i]}</span><span class="ct">${esc(o)}</span></div>`).join('')}</div>`;
  }
  function boardPic(text) {
    return `<div class="boardpic"><div class="wb">${text}</div><p>Write it big. When the teacher says <b>"Boards up!"</b>, everyone raises their board.</p></div>`;
  }
  function cardPic(cards) {
    return `<div class="boardpic"><div class="cardfan">${cards.map((c, i) => `<span class="acard ${i === 1 ? 'up' : ''}">${c}</span>`).join('')}</div>
      <p>Each team has a set of answer cards (🖨 Print → <b>Answer cards</b>). When the teacher says <b>"Cards up!"</b>, raise the right card.</p></div>`;
  }
  // YES / NO warm-ups: a drop-down menu chooses the body action
  const warmAct = id => C.warmActions.find(a => a.id === (S.warmAct || {})[id]) || C.warmActions[0];
  function warmCtl(id, yesLabel, noLabel) {
    const a = warmAct(id);
    return `<div class="warmctl"><label>Action: <select class="warmsel" data-round="${id}">${C.warmActions.map(x =>
        `<option value="${x.id}" ${x.id === a.id ? 'selected' : ''}>${esc(x.yes.e + ' ' + x.name + ' ' + x.no.e)}</option>`).join('')}</select></label>
      <div class="warmrule"><span class="wy"><b>${yesLabel}</b> → ${a.yes.e} ${esc(a.yes.t)}</span><span class="wn"><b>${noLabel}</b> → ${a.no.e} ${esc(a.no.t)}</span></div></div>`;
  }
  const warmTag = (id, yes) => { const a = warmAct(id), x = yes ? a.yes : a.no; return x.e + ' ' + esc(x.t); };
  function nextStageBtn() {
    const nx = STAGES[S.stage + 1];
    const sc = S.teams.length && S.stage > 0 ? `<button class="btn big" data-act="board" data-v="scores">📊 Show scores</button>` : '';
    return nx ? `<div class="nextstage">${sc}<button class="btn big" data-act="go" data-i="${S.stage + 1}">Next: ${esc(nx.short)} →</button></div>` : '';
  }
  function peek(key) { return !!S.peek[key]; }

  /* ------------------------------------------------------------------ views */
  const V = {};

  V.setup = function () {
    const names = S.students;
    const sizes = planTeams(names.length, S.mode, S.nTeams);
    const modes = [['pairs', 'Pairs'], ['threes', 'Groups of 3'], ['fours', 'Groups of 4'], ['custom', 'Number of teams']];
    const total = STAGES.reduce((a, s) => a + s.mins, 0);
    return `<section class="hero">
        <div><h1>Write It Right! <span class="sub">A Day in the Life</span></h1>
        <p class="lead">A whole-lesson team game. Students move, write and judge — and practise <b>sentences</b>, <b>simple paragraphs</b>, <b>capital letters</b> and <b>punctuation</b> with the <b>present simple</b> and <b>daily routines</b>.</p>
        <div class="levels">${LVS.map(l => `<button class="lvbtn ${S.level === l ? 'on' : ''}" data-act="level" data-l="${l}"><b>${esc(C.levelInfo[l].name)}</b><small>${esc(C.levelInfo[l].focus)}</small></button>`).join('')}</div>
        <p class="prizeline">🎁 Winners choose a prize: ${C.prizes.map(g => `<span>${g.e} ${esc(g.name)}</span>`).join('')}</p></div>
      </section>
      <div class="grid2">
        <div class="card">
          <h2>1 · Students</h2>
          <p class="muted">One name per line (${names.length} now). Remove absent students.</p>
          <textarea id="names" rows="11" spellcheck="false">${esc(names.join('\n'))}</textarea>
          <h2>2 · Groups</h2>
          <div class="seg">${modes.map(([m, l]) => `<button class="${S.mode === m ? 'on' : ''}" data-act="mode" data-mode="${m}">${l}</button>`).join('')}</div>
          ${S.mode === 'custom' ? `<label class="inline">Teams: <input type="number" id="nteams" min="2" max="8" value="${S.nTeams}"></label>` : ''}
          <p class="preview">${names.length} students → <b>${sizes.length} teams</b> (${sizes.join(', ')})</p>
          <button class="btn big" data-act="makeTeams">🎲 ${S.teams.length ? 'Shuffle new teams' : 'Make random teams'}</button>
        </div>
        <div class="card">
          <h2>3 · Teams</h2>
          ${S.teams.length ? `<p class="muted">Rename a team by typing. Tap → next to a name to move that student.</p>
          <div class="teams">${S.teams.map(t => `<div class="team" style="--c:${t.color}">
              <div class="team-h"><i>${esc(t.sym)}</i><input class="tname" data-team="${t.id}" value="${esc(t.name)}" aria-label="Team name"></div>
              <ul>${t.members.map((m, mi) => `<li>${esc(m)}<button class="mv" data-act="move" data-team="${t.id}" data-m="${mi}" title="Move to next team">→</button></li>`).join('')}</ul>
            </div>`).join('')}</div>
          <div class="actions"><button class="btn big" data-act="board" data-v="teams">📺 Show teams on the board</button></div>
          <button class="btn big go" data-act="go" data-i="1">Start the game ▶</button>`
          : `<div class="empty">Teams appear here.<br>Every team is named after a punctuation mark.</div>`}
        </div>
      </div>
      <div class="grid2">
        <div class="card">
          <h2>Lesson flow <small class="muted">(~${total} min)</small></h2>
          <ol class="flow">${STAGES.map((s, i) => `<li data-act="go" data-i="${i}"><b>${esc(s.short)}</b><span>${s.skill ? esc(s.skill) + ' · ' + esc(s.move) : (i === 0 ? 'Groups + names' : 'Winners + exit ticket')}</span><em>${s.mins}′</em></li>`).join('')}</ol>
        </div>
        <div class="card">
          <h2>Before class</h2>
          <ul class="check">
            <li>Print (🖨 button): <b>corner signs A–D</b>, <b>punctuation cards</b>, <b>dictation texts</b>, <b>planners</b>, <b>judging sheets</b>.</li>
            <li>Tape the <b>A B C D</b> signs in the four corners of the room.</li>
            <li>Tape the <b>. ? ! , ’</b> cards on the front wall (far from the teams).</li>
            <li>Pin one <b>dictation text</b> per team on the back wall / corridor.</li>
            <li>Paper or mini-whiteboards + markers for each team. Big poster paper + tape.</li>
            <li>Show this page on the digital board. Students don't need devices: they watch the board.</li>
            <li>Keys: <kbd>←</kbd><kbd>→</kbd> items · <kbd>R</kbd> reveal · <kbd>T</kbd> timer · <kbd>S</kbd> scores · <kbd>G</kbd> teams · <kbd>F</kbd> full screen. On a touch board: swipe ← → to change questions.</li>
          </ul>
        </div>
      </div>`;
  };

  /* ----- Round 1 */
  V.r1 = {
    learn() {
      return `<div class="lesson">
        <h2>When do we use a CAPITAL letter?</h2>
        <div class="cards">${upTo(C.capitals).map(c => `<div class="rcard ${c.no ? 'no' : ''}"><h3>${c.no ? '✗ ' : ''}${esc(c.title)}</h3><p>${c.ex}</p></div>`).join('')}</div>
        <h2>🏃 Warm-up: Capital or not?</h2>
        <p class="muted">The teacher says the word. Everybody does the action. Click a word to show the answer.</p>
        ${warmCtl('r1', 'Capital', 'No capital')}
        <div class="words">${upTo(C.standUp).map((w, i) => {
          const k = 'su' + i, on = peek(k);
          const shown = on ? (w.cap ? w.w.charAt(0).toUpperCase() + w.w.slice(1) : w.w) : w.w;
          return `<button class="word ${on ? (w.cap ? 'yes' : 'nope') : ''}" data-act="peek" data-k="${k}">${esc(shown)}${on ? `<small>${warmTag('r1', w.cap)}</small>` : ''}</button>`;
        }).join('')}</div></div>`;
    },
    how() {
      return `<div class="how">${modeBar()}<ol class="steps">
        <li><b>Read</b> the four sentences on the screen together.</li>
        <li><b>Talk</b> in your team. Which sentence is correct? Watch the timer (5, 10 or 20 seconds).</li>
        ${byMode('<li><b>Move!</b> When the time ends, the whole team goes to corner <b>A</b>, <b>B</b>, <b>C</b> or <b>D</b>.</li>',
          '<li><b>Write</b> the letter <b>A</b>, <b>B</b>, <b>C</b> or <b>D</b> on your team board. When the time ends: <b>Boards up!</b></li>',
          '<li><b>Choose</b> your card <b>A</b>, <b>B</b>, <b>C</b> or <b>D</b>. When the time ends: <b>Cards up!</b></li>')}
        <li>The teacher reveals the answer. Correct teams get <b>+1</b>.</li>
        <li><b>Bonus:</b> one person explains the rule → <b>+1</b> more.</li>
      </ol>
      ${S.answerMode === 'card' ? cardPic(['A', 'B', 'C', 'D']) : boardMode() ? boardPic('B') : `<div class="cornermap">${[0, 1, 2, 3].map(i => `<div class="cm c${i}">${LET[i]}</div>`).join('')}<div class="cm-mid">teams<br>start here</div></div>`}</div>`;
    },
    play() {
      const r = S.rounds.r1, q = L().corners[r.i], rev = !!r.rev[r.i];
      return `${itemNav('r1', L().corners.length, 'Question')}
        <div class="qcard">${qtimer}<div class="qprompt">Which sentence is correct? ${byMode('🏃 Go to corner A, B, C or D', '🪧 Write A, B, C or D', '🃏 Raise card A, B, C or D')}</div>
          ${optionCards(q.options, q.answer, rev)}
          ${rev ? `<div class="explain">✅ <b>${LET[q.answer]}</b> — ${esc(q.why)}</div>` : ''}
        </div>
        <div class="actions">${quickTimers('GO TO YOUR CORNER!')}
          <button class="btn primary" data-act="reveal">${rev ? 'Hide answer' : 'Reveal answer'} <kbd>R</kbd></button>
        </div>
        ${rev ? awardBlock('r1:' + r.i, 2, '+1 correct · +2 correct and explains the rule') : ''}`;
    }
  };

  /* ----- Round 2 */
  V.r2 = {
    learn() {
      return `<div class="lesson"><h2>Five punctuation marks</h2>
        <div class="cards marks">${upTo(C.marks).map(m => `<div class="rcard mk"><div class="bigmark">${esc(m.mark)}</div><h3>${esc(m.name)}</h3><p>${esc(m.use)}</p><p class="ex">${hl(m.ex)}</p></div>`).join('')}</div>
        <h2>🏃 Warm-up: Body punctuation</h2>
        <p class="muted">Learn the actions. The teacher reads a sentence — the class does the action for each mark.</p>
        <div class="actionsrow">${upTo(C.marks).map(m => `<span class="act-chip"><b>${esc(m.mark)}</b> ${esc(m.action)}</span>`).join('')}</div>
        <div class="words">${upTo(C.bodyPunct).map((x, i) => {
          const s = x.s, k = 'bp' + i, on = peek(k);
          const plain = s.replace(/[.,?!]/g, '').replace(/'/g, "'");
          return `<button class="word wide ${on ? 'yes' : ''}" data-act="peek" data-k="${k}">${on ? hl(s) : esc(plain) + ' …'}</button>`;
        }).join('')}</div></div>`;
    },
    how() {
      return S.answerMode === 'card'
        ? `<div class="how">${modeBar()}<ol class="steps">
        <li>The screen shows a sentence with a <b>gap</b>.</li>
        <li>Your team decides the missing mark: <b>. ? ! , ’</b></li>
        <li>Find the right <b>punctuation card</b> in your set. Change the card holder every time!</li>
        <li>When the time ends: <b>Cards up!</b> First correct card = <b>+2</b>. Other correct cards = <b>+1</b>.</li>
      </ol>${cardPic(['.', '?', '!', ',', '’'])}</div>`
        : boardMode()
        ? `<div class="how">${modeBar()}<ol class="steps">
        <li>The screen shows a sentence with a <b>gap</b>.</li>
        <li>Your team decides the missing mark: <b>. ? ! , ’</b></li>
        <li>One person <b>writes the mark</b> big on the team board. Change writer every time!</li>
        <li>When the time ends: <b>Boards up!</b> First correct board = <b>+2</b>. Other correct boards = <b>+1</b>.</li>
      </ol>${boardPic('?')}</div>`
        : `<div class="how">${modeBar()}<ol class="steps">
        <li>Each team stands in a line at the <b>back</b> of the room.</li>
        <li>The screen shows a sentence with a <b>gap</b>.</li>
        <li>The <b>first person</b> in each line walks quickly to the wall and <b>swats</b> (touches) the right card: <b>. ? ! , ’</b></li>
        <li>First correct swat = <b>+2</b>. Other correct swats = <b>+1</b>.</li>
        <li>Swatters go to the <b>end</b> of their line. Everybody gets a turn!</li>
      </ol><p class="tip">💡 Safety: walk — no running, no pushing. A hand on the card = your answer.</p></div>`;
    },
    play() {
      const r = S.rounds.r2, q = L().swat[r.i], rev = !!r.rev[r.i];
      const [a, b] = q.text.split('{_}');
      const mk = C.marks.find(m => m.mark === q.answer);
      return `${itemNav('r2', L().swat.length, 'Sentence')}
        <div class="qcard">${qtimer}<div class="qprompt">${byMode('🏃 Swat the missing mark', '🪧 Write the missing mark', '🃏 Raise the missing mark')}</div><div class="sentence">${esc(a)}<span class="gap ${rev ? 'filled' : ''}">${rev ? esc(q.answer) : '&nbsp;'}</span>${esc(b)}</div>
          <div class="pcards">${upTo(C.marks).map(m => `<div class="pcard ${rev ? (m.mark === q.answer ? 'right' : 'dim') : ''}"><b>${esc(m.mark)}</b><small>${esc(m.name)}</small></div>`).join('')}</div>
          ${rev ? `<div class="explain">✅ <b>${esc(mk.name)}</b> — ${esc(mk.use)}</div>` : ''}
        </div>
        <div class="actions">${quickTimers('SWAT!')}
          <button class="btn primary" data-act="reveal">${rev ? 'Hide answer' : 'Reveal answer'} <kbd>R</kbd></button>
        </div>
        ${rev ? awardBlock('r2:' + r.i, 2, '+2 first correct · +1 correct') : ''}`;
    }
  };

  /* ----- Verb Check (subject–verb agreement + correct or wrong?) */
  V.rv = {
    learn() {
      return `<div class="lesson"><h2>Subject + verb: do we add <span class="hc">-s</span>?</h2>
        <div class="svtable"><div class="sv no-s"><b>I · you · we · they</b><span>my friends · my mother and I</span><em>work · go · watch · have</em></div>
          <div class="sv yes-s"><b>he · she · it</b><span>Omar · my sister · the bus</span><em>work<u>s</u> · go<u>es</u> · watch<u>es</u> · ha<u>s</u></em></div></div>
        <div class="cards">${upTo(C.agreement).map(c => `<div class="rcard ${c.no ? 'no' : ''}"><h3>${esc(c.title)}</h3><p>${c.ex}</p></div>`).join('')}</div>
        <h2>🏃 Warm-up: -s or no -s?</h2>
        <p class="muted">The teacher says the subject and the verb. Everybody does the action. Click to check.</p>
        ${warmCtl('rv', 'Needs -s', 'No -s')}
        <div class="words">${C.clapS.map((x, i) => {
          const k = 'cs' + i, on = peek(k);
          return `<button class="word wide ${on ? (x.s ? 'yes' : 'nope') : ''}" data-act="peek" data-k="${k}">${esc(x.w)}${on ? `<small>${warmTag('rv', x.s)} — ${esc(x.a)}</small>` : ''}</button>`;
        }).join('')}</div></div>`;
    },
    how() {
      return `<div class="how">${modeBar()}
        <div class="grid2"><div class="qtype"><h3>Type 1 · Choose the verb</h3><p class="mini-q">My sister ___ in a bank.</p>
            ${optionCards(['work', 'works', 'working'], 1, false)}</div>
          <div class="qtype"><h3>Type 2 · Correct or wrong?</h3><p class="mini-q">They gets up at seven.</p>
            ${optionCards(['✓ Correct', '✗ Wrong'], 1, false)}</div></div>
        <ol class="steps">
        <li><b>Talk</b> in your team. Watch the timer (5, 10 or 20 seconds).</li>
        ${byMode('<li><b>Move!</b> When the time ends, go to the corner: <b>A</b>, <b>B</b> or <b>C</b>. For correct or wrong: corner <b>A = ✓ Correct</b>, corner <b>B = ✗ Wrong</b>.</li>',
          '<li><b>Write</b> the letter (<b>A</b>, <b>B</b> or <b>C</b>) on your team board. When the time ends: <b>Boards up!</b></li>',
          '<li><b>Choose</b> your card: <b>A</b>, <b>B</b> or <b>C</b> — or <b>✓</b> / <b>✗</b> for correct or wrong. When the time ends: <b>Cards up!</b></li>')}
        <li>The teacher reveals the answer. Correct teams get <b>+1</b>.</li>
        <li><b>Bonus +1:</b> say the correct sentence (for example: <i>They get up at seven.</i>).</li>
      </ol></div>`;
    },
    play() {
      const r = S.rounds.rv, q = L().verbs[r.i], rev = !!r.rev[r.i];
      const tf = q.type === 'tf';
      const opts = tf ? ['✓ Correct', '✗ Wrong'] : q.options;
      const ans = tf ? (q.ok ? 0 : 1) : q.answer;
      let sentence;
      if (tf) sentence = `<div class="sentence ${rev ? (q.ok ? 'ok' : 'bad') : ''}">${esc(q.text)}</div>`;
      else {
        const [a, b] = q.text.split('___');
        sentence = `<div class="sentence">${esc(a)}<span class="gap word-gap ${rev ? 'filled' : ''}">${rev ? esc(q.options[q.answer]) : '&nbsp;'}</span>${esc(b)}</div>`;
      }
      return `${itemNav('rv', L().verbs.length, 'Question')}
        <div class="qcard">${qtimer}<div class="qprompt">${tf ? 'Correct or wrong?' : 'Choose the correct verb.'} ${byMode('🏃 Go to the corner', '🪧 Write the letter', tf ? '🃏 Raise ✓ or ✗' : '🃏 Raise the letter card')}</div>
          ${sentence}
          ${optionCards(opts, ans, rev)}
          ${rev ? `<div class="explain">✅ <b>${LET[ans]}</b> — ${esc(q.why)}${q.fix ? `<div class="fix">✏️ ${hl(q.fix)}</div>` : ''}</div>` : ''}
        </div>
        <div class="actions">${quickTimers('GO TO YOUR CORNER!')}
          <button class="btn primary" data-act="reveal">${rev ? 'Hide answer' : 'Reveal answer'} <kbd>R</kbd></button>
        </div>
        ${rev ? awardBlock('rv:' + r.i, 2, '+1 correct · +2 correct and says the correct sentence') : ''}`;
    }
  };

  /* ----- Round 3 */
  V.r3 = {
    learn() {
      const sn = C.sentence;
      return `<div class="lesson"><h2>What is a sentence?</h2>
        <div class="formula">${sn.formula.map(f => `<span>${esc(f)}</span>`).join('<i>+</i>')}</div>
        <div class="goodbad"><div class="good">✓ ${hl(sn.good)}</div>
          ${sn.bad.map(b => `<div class="bad">✗ ${esc(b.s)} <small>${esc(b.why)}</small></div>`).join('')}</div>
        <h2>Present simple for routines</h2>
        <div class="cards">${C.presentSimple.map(c => `<div class="rcard"><h3>${esc(c.title)}</h3><p>${c.ex}</p></div>`).join('')}</div>
        <h2>🏃 Warm-up: Sentence or not?</h2>
        <p class="muted">The teacher reads it. Everybody does the action. Click to check.</p>
        ${warmCtl('r3', 'Sentence', 'Not a sentence')}
        <div class="words">${C.sentenceOrNot.map((x, i) => {
          const k = 'sn' + i, on = peek(k);
          return `<button class="word wide ${on ? (x.ok ? 'yes' : 'nope') : ''}" data-act="peek" data-k="${k}">${esc(x.s)}${on ? `<small>${warmTag('r3', x.ok)} — ${esc(x.why)}</small>` : ''}</button>`;
        }).join('')}</div></div>`;
    },
    how() {
      return `<div class="how"><ol class="steps">
        <li>The screen shows <b>mixed-up words</b> (no capitals, no punctuation). Some make a <b>sentence</b>, some make a <b>question</b> ❓.</li>
        <li>Your team writes it correctly on paper — with <b>capital letters</b> and <b>punctuation</b> (questions end with <b>?</b>).</li>
        <li>A <b>runner</b> walks it to the teacher (the judge). Change runner every time!</li>
        <li>Points: <b>+1</b> word order · <b>+1</b> capitals · <b>+1</b> punctuation. First correct team: <b>+1 bonus</b>.</li>
      </ol><p class="tip">💡 Watch the verb: he / she + <b>s</b> (gets, goes, studies). Questions: <b>Do / Does / Where / What time</b> … + <b>?</b></p></div>`;
    },
    play() {
      const r = S.rounds.r3, q = L().scramble[r.i], rev = !!r.rev[r.i];
      const words = q.words.split(' ');
      let mixed = seededShuffle(words, r.i + 3);
      if (mixed.join(' ') === words.join(' ')) mixed = mixed.slice(1).concat(mixed[0]);
      const isQ = q.answer.trim().endsWith('?');
      return `${itemNav('r3', L().scramble.length, 'Item')}
        <div class="qcard">${qtimer}<div class="qprompt"><span class="kind ${isQ ? 'q' : ''}">${isQ ? '❓ Make a question' : '✏️ Make a sentence'}</span></div><div class="tiles">${mixed.map((w, i) => `<span class="tile" style="--d:${i * 60}ms">${esc(w)}</span>`).join('')}</div>
          ${rev ? `<div class="answer">${hl(q.answer)}</div>
            <div class="checks"><span>✓ word order</span><span>✓ <b class="hc">C</b>apitals</span><span>✓ punctuation <b class="hp">. , ? ! ’</b></span></div>` : ''}
        </div>
        <div class="actions">
          <button class="btn" data-act="cue" data-sec="60" data-label="RUNNERS — GO!">⏱ 1 min</button>
          <button class="btn primary" data-act="reveal">${rev ? 'Hide answer' : 'Reveal answer'} <kbd>R</kbd></button>
        </div>
        ${rev ? awardBlock('r3:' + r.i, 4, '1 order · 1 capitals · 1 punctuation · +1 first correct') : ''}`;
    }
  };

  /* ----- Round 4 */
  V.r4 = {
    how() {
      return `<div class="how"><div class="grid2">
        <div><h2>Roles</h2><ul class="roles">
          <li><b>🏃 Runner</b> goes to the text on the wall, reads, <b>remembers</b>, comes back and <b>says</b> it.</li>
          <li><b>✍️ Writer</b> listens and <b>writes</b>. The writer cannot go to the wall.</li>
          <li><b>🔎 Checker</b> (teams of 3+) helps the writer: capitals? full stops? commas?</li>
        </ul>
        <h2>Rules</h2><ul class="roles">
          <li>No phones, no photos, no shouting across the room.</li>
          <li>The runner cannot take the paper to the wall.</li>
          <li>When you hear <b>SWAP!</b> change roles.</li>
        </ul></div>
        <div><h2>Choose the text</h2>
        <div class="choice">${L().dictation.map((d, i) => `<button class="opt ${S.r4text === i ? 'on' : ''}" data-act="r4text" data-i="${i}"><b>${esc(d.title)}</b><small>${esc(d.level)} · ${d.text.split(/\s+/).length} words</small></button>`).join('')}</div>
        <p class="muted">Print one copy per team (🖨 → Running dictation) and pin them far from the teams.</p></div>
      </div></div>`;
    },
    play() {
      const d = dictText();
      return `<div class="center">
        <div class="bigtitle">🏃 ${esc(d.title)}</div>
        <p class="lead">Runners: go to the wall! Writers: get ready to write.</p>
        <div class="actions">
          <button class="btn big primary" data-act="cue" data-sec="360" data-label="STOP WRITING!" data-every="120" data-every-text="SWAP ROLES!">⏱ Start 6 min · SWAP every 2 min</button>
          <button class="btn big" data-act="cue" data-sec="480" data-label="STOP WRITING!" data-every="120" data-every-text="SWAP ROLES!">⏱ 8 min</button>
        </div>
        <p class="muted">The text is NOT on the screen. It shows in the next tab (Check).</p></div>`;
    },
    check() {
      const d = dictText(), on = peek('r4show');
      const table = [['0–1', 5], ['2–3', 4], ['4–5', 3], ['6–7', 2], ['8–9', 1], ['10+', 0]];
      return `<div class="lesson">
        <ol class="steps small">
          <li><b>Swap papers</b> with the team on your right.</li>
          <li>Compare with the text. <b>Circle</b> every mistake: capital letter, punctuation, missing word, spelling.</li>
          <li>Count the mistakes. Give the paper back and tell the team <b>one thing they did well</b>.</li>
        </ol>
        ${on ? `<div class="dicttext">${hl(d.text)}</div>` : `<div class="center"><button class="btn big primary" data-act="peek" data-k="r4show">Show the text</button></div>`}
        <table class="mini"><tr><th>Mistakes</th>${table.map(r => `<td>${r[0]}</td>`).join('')}</tr><tr><th>Points</th>${table.map(r => `<td><b>${r[1]}</b></td>`).join('')}</tr></table>
        ${awardBlock('r4', 5, 'use the table above')}
      </div>`;
    }
  };

  /* ----- Round 5 */
  V.r5 = {
    learn() {
      const m = L().model, on = peek('modelHl');
      const sent = s => on ? hl(s) : esc(s);
      return `<div class="lesson"><div class="grid2">
        <div><h2>A paragraph is like a burger 🍔</h2>
          <div class="burger">
            <div class="bun top"><b>Topic sentence</b><small>What is the paragraph about?</small></div>
            <div class="fill f1"><b>Supporting sentence</b><small>detail</small></div>
            <div class="fill f2"><b>Supporting sentence</b><small>detail</small></div>
            <div class="fill f3"><b>Supporting sentence</b><small>detail</small></div>
            <div class="bun bot"><b>Concluding sentence</b><small>Close it: I love… because…</small></div>
          </div>
          <ul class="rules">${C.paragraph.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
        </div>
        <div><h2>Model: ${esc(m.title)}</h2>
          <p class="para model"><span class="p-top">${sent(m.topic)}</span> ${m.support.map((s, i) => `<span class="p-sup f${(i % 3) + 1}">${sent(s)}</span>`).join(' ')} <span class="p-bot">${sent(m.conclusion)}</span></p>
          <div class="actions left"><button class="btn" data-act="peek" data-k="modelHl">${on ? 'Hide' : 'Show'} capitals & punctuation</button></div>
          <p class="muted">${m.find}</p>
        </div></div></div>`;
    },
    topics() {
      const tv = Math.min(S.topicView, C.topics.length - 1), tp = C.topics[tv];
      return `<div class="lesson"><div class="grid2">
        <div><h2>Team topics</h2>
          ${S.teams.length ? `<div class="tlist">${S.teams.map(t => {
            const ti = S.topics[t.id];
            return `<div class="trow">${tchip(t)}<button class="topicbtn ${ti == null ? 'empty' : ''}" data-act="topicCycle" data-team="${t.id}">${ti == null ? 'tap to choose' : esc(C.topics[ti].name)}</button></div>`;
          }).join('')}</div>
          <div class="actions left"><button class="btn primary" data-act="spin">🎲 Spin topics</button></div>` : needTeams()}
          <h2>All topics</h2>
          <div class="choice">${C.topics.map((t, i) => `<button class="opt ${i === tv ? 'on' : ''}" data-act="topicView" data-i="${i}">${esc(t.name)}</button>`).join('')}</div>
        </div>
        <div><h2>${esc(tp.name)}</h2>
          <div class="frames">${tp.frames.map((f, i) => `<div class="frame ${i === 0 ? 'top' : i === tp.frames.length - 1 ? 'bot' : ''}">${esc(f).replace(/___/g, '<span class="blankline"></span>')}</div>`).join('')}</div>
          <h3>Word bank</h3><div class="bank">${tp.words.map(w => `<span>${esc(w)}</span>`).join('')}</div>
        </div></div></div>`;
    },
    write() {
      return `<div class="lesson"><div class="grid2">
        <div><h2>Write your team paragraph</h2>
          <ol class="steps small">
            <li><b>Plan</b> on the planner sheet (2 min).</li>
            <li><b>Write</b> on the poster. Big, clear letters. Team name at the top (8 min).</li>
            <li><b>Check</b> with the checklist. Fix mistakes (2 min).</li>
            <li><b>Stick</b> your poster on the wall.</li>
          </ol>
          <div class="actions left">
            <button class="btn" data-act="cue" data-sec="120" data-label="START WRITING!">⏱ Plan 2′</button>
            <button class="btn primary" data-act="cue" data-sec="480" data-label="STOP — CHECK!">⏱ Write 8′</button>
            <button class="btn" data-act="cue" data-sec="120" data-label="POSTERS ON THE WALL!">⏱ Check 2′</button>
          </div>
          <h2>⭐ Bonus missions</h2>
          <ul class="missions">${C.missions.map(m => `<li>${esc(m)}</li>`).join('')}</ul>
        </div>
        <div><h2>Checklist = the judges' rubric</h2>${rubricList()}</div>
      </div></div>`;
    }
  };
  function rubricList() {
    return `<ol class="rubric">${C.rubric.map(c => `<li><i>${esc(c.icon)}</i><div><b>${esc(c.title)}</b> <span class="from">from ${esc(c.from)}</span>
        <small>🔎 ${esc(c.check)}</small><small class="rex">${c.ex}</small></div></li>`).join('')}</ol>
      <div class="scale">${C.scale.map(s => `<span>${esc(s)}</span>`).join('')}</div>`;
  }
  const FACE = ['😟', '🙂', '😃'];

  /* ----- Round 6 */
  function judgeTotal(j, t) {
    const a = (S.judging[j] || {})[t];
    if (!a || a.some(v => v == null)) return null;
    return a.reduce((x, y) => x + y, 0);
  }
  function results() {
    const rows = S.teams.map(t => {
      const peers = S.teams.filter(j => j.id !== t.id).map(j => ({ j, v: judgeTotal(j.id, t.id) }));
      const teacher = judgeTotal('teacher', t.id);
      const vals = peers.filter(p => p.v != null).map(p => p.v);
      const wsum = vals.reduce((a, b) => a + b, 0) + (teacher != null ? teacher * 2 : 0);
      const wn = vals.length + (teacher != null ? 2 : 0);
      const avg = wn ? wsum / wn : null;
      return { t, peers, teacher, avg, pts: avg == null ? 0 : Math.round(avg * 2) };
    });
    const eye = S.teams.map(j => {
      const diffs = S.teams.filter(t => t.id !== j.id).map(t => {
        const a = judgeTotal(j.id, t.id), b = judgeTotal('teacher', t.id);
        return a != null && b != null ? Math.abs(a - b) : null;
      }).filter(x => x != null);
      const md = diffs.length ? diffs.reduce((a, b) => a + b, 0) / diffs.length : null;
      const bonus = md == null ? 0 : md <= 1 ? 3 : md <= 2 ? 2 : md <= 3 ? 1 : 0;
      return { j, md, bonus };
    });
    return { rows, eye };
  }
  V.r6 = {
    how() {
      return `<div class="lesson"><div class="grid2">
        <div><h2>How to judge a poster</h2>
          <ol class="steps small">
            <li><b>Read</b> the poster out loud together.</li>
            <li><b>Check one thing at a time</b> — the 5 checks below. For each check, write <b>✓</b> or <b>✗</b> under sentences <b>1 2 3 4 5</b> on the judging sheet.</li>
            <li><b>Count the ✗</b> and give stars: <b>no ✗ = 2</b> · <b>1–2 ✗ = 1</b> · <b>3 or more ✗ = 0</b>.</li>
            <li><b>Write</b> one ⭐ good thing and one 🔧 thing to fix.</li>
          </ol>
          <h2>The 5 checks</h2>${rubricList()}
          <p class="tip">Max <b>${C.maxStars} stars</b> per poster. You cannot judge your own poster.</p></div>
        <div><h2>Be fair! 👀</h2>
          <p>The teacher judges too. Teams whose stars are <b>close to the teacher's</b> win <b>Sharp-Eye</b> bonus points (up to +3). Giving low stars to win does not help!</p>
          <h2>Say it nicely 🗣️</h2>
          <ul class="frames2">${C.feedback.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>
      </div></div>`;
    },
    walk() {
      if (S.teams.length < 2) return needTeams();
      const n = S.teams.length, rot = Math.min(Math.max(1, S.r6rot), n - 1);
      return `<div class="lesson">
        <p class="lead">Posters go on the wall <b>in team order</b> (${S.teams.map(t => esc(t.sym)).join(' → ')}). Every rotation, teams move <b>one poster clockwise</b>.</p>
        <div class="rotbtns">${Array.from({ length: n - 1 }, (_, i) => `<button class="opt ${rot === i + 1 ? 'on' : ''}" data-act="rot" data-i="${i + 1}">Rotation ${i + 1}</button>`).join('')}</div>
        <div class="rotgrid">${S.teams.map((t, i) => {
          const tgt = S.teams[(i + rot) % n];
          return `<div class="rot">${tchip(t)}<span class="arrow">→ judges →</span><span class="poster" style="--c:${tgt.color}">📄 ${esc(tgt.name)}'s poster</span></div>`;
        }).join('')}</div>
        <div class="actions">
          <button class="btn primary big" data-act="cue" data-sec="120" data-label="ROTATE! →">⏱ 2 min per poster</button>
          <button class="btn" data-act="cue" data-sec="90" data-label="ROTATE! →">⏱ 90 s</button>
          ${rot < n - 1 ? `<button class="btn" data-act="rot" data-i="${rot + 1}">Next rotation →</button>` : `<button class="btn" data-act="tab" data-tab="scores">Enter scores →</button>`}
        </div></div>`;
    },
    scores() {
      if (S.teams.length < 2) return needTeams();
      const judges = S.teams.concat([{ id: 'teacher', name: 'Teacher', sym: '🎓', color: '#444' }]);
      const sel = judges.find(j => j.id === S.judge);
      const done = j => S.teams.filter(t => t.id !== j.id).every(t => judgeTotal(j.id, t.id) != null);
      let body = `<p class="muted center">Each team sends one person to the board to enter its stars from the judging sheet. Choose the judge:</p>
        <div class="scale center">${C.scale.map(x => `<span>${esc(x)}</span>`).join('')}</div>`;
      if (sel) {
        const targets = S.teams.filter(t => t.id !== sel.id);
        body = `<div class="jgrid">${targets.map(t => {
          const a = (S.judging[sel.id] || {})[t.id] || [];
          const tot = judgeTotal(sel.id, t.id);
          return `<div class="jcard" style="--c:${t.color}"><div class="jh">${tchip(t)}<span class="jt">${tot == null ? '…' : tot + ' / ' + C.maxStars}</span></div>
            ${C.rubric.map((c, ci) => `<div class="jrow"><span title="${esc(c.check)}"><i>${esc(c.icon)}</i>${esc(c.title)}</span><div class="pills">${[0, 1, 2].map(v =>
              `<button class="pill face ${a[ci] === v ? 'on' : ''}" style="--c:${t.color}" data-act="judge" data-t="${t.id}" data-c="${ci}" data-v="${v}" title="${esc(C.scale[2 - v])}">${FACE[v]} ${v}</button>`).join('')}</div></div>`).join('')}
          </div>`;
        }).join('')}</div>`;
      }
      return `<div class="lesson"><div class="judges">${judges.map(j => `<button class="jbtn ${S.judge === j.id ? 'on' : ''}" style="--c:${j.color}" data-act="pickJudge" data-j="${j.id}"><i>${esc(j.sym)}</i>${esc(j.name)}${done(j) ? ' ✓' : ''}</button>`).join('')}</div>${body}</div>`;
    },
    results() {
      if (S.teams.length < 2) return needTeams();
      const { rows, eye } = results();
      const anyTeacher = S.teams.some(t => judgeTotal('teacher', t.id) != null);
      return `<div class="lesson">
        <h2>Paragraph scores</h2>
        <div class="tablewrap"><table class="res"><thead><tr><th>Poster</th>${S.teams.map(j => `<th>${tdot(j)}</th>`).join('')}<th>🎓</th><th>Average</th><th>Points</th></tr></thead>
        <tbody>${rows.map(r => `<tr><td>${tchip(r.t)}</td>${S.teams.map(j => j.id === r.t.id ? '<td class="self">—</td>' : `<td>${judgeTotal(j.id, r.t.id) ?? '·'}</td>`).join('')}
          <td>${r.teacher ?? '·'}</td><td><b>${r.avg == null ? '–' : r.avg.toFixed(1)}</b></td><td class="pts">+${r.pts}</td></tr>`).join('')}</tbody></table></div>
        <p class="muted">Points = average stars × 2 (max ${C.maxStars * 2}). The teacher's stars count double.</p>
        <h2>👀 Sharp-Eye judges</h2>
        ${anyTeacher ? `<div class="eyes">${eye.map(e => `<div class="eye">${tchip(e.j)}<span>${e.md == null ? 'no scores' : 'avg. difference ' + e.md.toFixed(1)}</span><b>+${e.bonus}</b></div>`).join('')}</div>
          <p class="muted">Difference from the teacher: ≤1 → +3 · ≤2 → +2 · ≤3 → +1</p>`
          : `<p class="muted">Enter the teacher's stars (🎓 in "Enter scores") to unlock Sharp-Eye bonuses.</p>`}
        <div class="actions"><button class="btn big primary" data-act="applyJudging">➕ Add these points to the scoreboard</button></div>
        ${S.awards['r6:para'] ? '<p class="muted center">Points added. Press again if you change any stars.</p>' : ''}
      </div>`;
    }
  };

  /* ----- Awards */
  V.awards = function () {
    if (!S.teams.length) return needTeams();
    const ranked = ranking();
    const podium = [ranked[1], ranked[0], ranked[2]].filter(Boolean);
    const max = Math.max(1, ranked[0].s);
    const { rows, eye } = results();
    const bestPara = rows.filter(r => r.avg != null).sort((a, b) => b.avg - a.avg)[0];
    const bestEye = eye.filter(e => e.md != null).sort((a, b) => a.md - b.md)[0];
    const cols = ['r1', 'r2', 'rv', 'r3', 'r4'].map(id => [id, 'R' + STAGES.find(x => x.id === id).n]).concat([['r6', 'Para + judging'], ['manual', '±']]);
    const gift = k => S.prizes[k] != null ? C.prizes[S.prizes[k]] : null;
    const giftTag = k => gift(k) ? `<span class="gift-tag" title="${esc(gift(k).name)}">${gift(k).e}</span>` : '';
    const slots = [['p1', '🥇 1st place', ranked[0] && ranked[0].t], ['p2', '🥈 2nd place', ranked[1] && ranked[1].t], ['p3', '🥉 3rd place', ranked[2] && ranked[2].t],
      ['para', '📝 Best Paragraph', bestPara && bestPara.t], ['eye', '👀 Sharp-Eye Judges', bestEye && bestEye.j]].filter(x => x[2]);
    return `<div class="lesson">
      <h1 class="center">🏆 And the winners are…</h1>
      <div class="podium">${podium.map(r => `<div class="pod p${r.rank}" style="--c:${r.t.color}; --h:${30 + (r.s / max) * 70}%">
          <div class="pod-team">${giftTag('p' + (ranked.indexOf(r) + 1))}<i>${esc(r.t.sym)}</i><b>${esc(r.t.name)}</b><small>${r.t.members.map(esc).join(', ')}</small></div>
          <div class="pod-bar"><span>${r.s}</span><em>${r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : '🥉'}</em></div></div>`).join('')}</div>
      <div class="actions"><button class="btn big primary" data-act="celebrate">🎉 Celebrate</button></div>
      <div class="grid3">
        <div class="award-card"><div class="ai">📝</div><b>Best Paragraph</b>${bestPara ? tchip(bestPara.t) + `<small>${bestPara.avg.toFixed(1)} / ${C.maxStars} stars</small>` + giftTag('para') : '<small>—</small>'}</div>
        <div class="award-card"><div class="ai">👀</div><b>Sharp-Eye Judges</b>${bestEye ? tchip(bestEye.j) + `<small>closest to the teacher</small>` + giftTag('eye') : '<small>needs teacher stars</small>'}</div>
        <div class="award-card"><div class="ai">🎟️</div><b>Exit ticket</b><small>${esc(C.exitTicket)}</small></div>
      </div>
      <h2>🎁 Prizes — the winners choose!</h2>
      <p class="muted">1st place chooses first, then 2nd, then 3rd. Tap the prize each team chooses.</p>
      <div class="prizes">${slots.map(([k, l, t]) => `<div class="prow"><div class="plabel"><b>${l}</b>${tchip(t)}</div>
        <div class="gifts">${C.prizes.map((g, i) => `<button class="gift ${S.prizes[k] === i ? 'on' : ''}" style="--c:${t.color}" data-act="prize" data-k="${k}" data-i="${i}"><span>${g.e}</span>${esc(g.name)}</button>`).join('')}</div></div>`).join('')}</div>
      <h2>Score sheet</h2>
      <div class="tablewrap"><table class="res"><thead><tr><th>#</th><th>Team</th>${cols.map(c => `<th>${c[1]}</th>`).join('')}<th>Total</th></tr></thead>
      <tbody>${ranked.map(r => `<tr><td>${r.rank}</td><td>${tchip(r.t)}</td>${cols.map(c => `<td>${scoreBy(r.t.id, c[0])}</td>`).join('')}<td class="pts">${r.s}</td></tr>`).join('')}</tbody></table></div>
    </div>`;
  };

  /* ------------------------------------------------------------------ board views (full screen, for students) */
  let boardView = null; // 'teams' | 'scores' | null
  function ranking() {
    const ranked = S.teams.map(t => ({ t, s: score(t.id) })).sort((a, b) => b.s - a.s);
    let rank = 0, last = null;
    ranked.forEach((r, i) => { if (r.s !== last) { rank = i + 1; last = r.s; } r.rank = rank; });
    return ranked;
  }
  function boardHtml() {
    if (!S.teams.length) return `<div class="bv-inner"><h1>No teams yet</h1><p class="bv-hint">Make teams on the Teams page first.</p></div>`;
    if (boardView === 'teams') {
      return `<div class="bv-inner"><h1>👥 Find your team</h1>
        <div class="tb-grid n${S.teams.length}">${S.teams.map(t => `<div class="tb" style="--c:${t.color}">
          <div class="tb-h"><i>${esc(t.sym)}</i><b>${esc(t.name)}</b></div>
          <ul>${t.members.map(m => `<li>${esc(m)}</li>`).join('')}</ul></div>`).join('')}</div>
        <p class="bv-hint">Tap anywhere to close</p></div>`;
    }
    const ranked = ranking(), max = Math.max(1, ranked[0].s);
    const medal = r => r.s > 0 && r.rank <= 3 ? ['🥇', '🥈', '🥉'][r.rank - 1] : r.rank;
    return `<div class="bv-inner"><h1>📊 Scores <small>after ${esc(stage().short)}</small></h1>
      <div class="lb">${ranked.map((r, i) => `<div class="lb-row" style="--c:${r.t.color}; --w:${(r.s / max) * 100}%; --d:${i * 90}ms">
        <span class="lb-rank">${medal(r)}</span><i>${esc(r.t.sym)}</i>
        <div class="lb-main"><b>${esc(r.t.name)}</b><small>${r.t.members.map(esc).join(' · ')}</small><div class="lb-bar"><span></span></div></div>
        <span class="lb-score">${r.s}</span></div>`).join('')}</div>
      <p class="bv-hint">Tap anywhere to close</p></div>`;
  }
  function drawBoard() {
    const el = $('#boardview');
    el.classList.toggle('on', !!boardView);
    if (boardView) el.innerHTML = boardHtml();
  }

  /* ------------------------------------------------------------------ render */
  let prevScores = {};
  let scOpen = null; // phone: which scoreboard chip shows its + / − buttons
  function render() {
    const st = stage();
    document.documentElement.dataset.theme = S.theme;
    $('#b-sound').textContent = S.sound ? '🔊' : '🔇';
    $('.brand-txt small').textContent = levelName() + ' · A Day in the Life';
    $('#stepper').innerHTML = STAGES.map((s, i) => `<button class="step ${i === S.stage ? 'on' : ''} ${i < S.stage ? 'past' : ''}" data-act="go" data-i="${i}" title="${esc(s.short)}"><span>${s.n || (i === 0 ? '👥' : '🏆')}</span><em>${esc(s.short)}</em></button>`).join('');

    let html;
    if (typeof V[st.id] === 'function') html = V[st.id]();
    else {
      const r = S.rounds[st.id];
      html = roundHead(st) + `<div class="rbody">${V[st.id][r.tab]()}</div>`;
    }
    const main = $('#main');
    main.innerHTML = html + nextStageBtn();
    main.className = 'st-' + st.id;
    renderScores();
    drawBoard();
    drawTimer();
    save();
  }
  function renderScores() {
    const sb = $('#scoreboard');
    if (!S.teams.length) { sb.innerHTML = '<span class="muted">Scoreboard appears when teams are made.</span>'; return; }
    const top = Math.max(...S.teams.map(t => score(t.id)));
    sb.innerHTML = S.teams.map(t => {
      const s = score(t.id), bump = prevScores[t.id] != null && prevScores[t.id] !== s;
      return `<div class="sc ${bump ? 'bump' : ''} ${scOpen === t.id ? 'open' : ''}" style="--c:${t.color}" data-act="scOpen" data-team="${t.id}" title="Tap for + / −">
        <i>${esc(t.sym)}</i><span class="sn">${top > 0 && s === top ? '👑 ' : ''}${esc(t.name)}</span><b>${s}</b>
        <span class="pm"><button data-act="adj" data-team="${t.id}" data-d="-1" aria-label="minus one">−</button><button data-act="adj" data-team="${t.id}" data-d="1" aria-label="plus one">+</button></span></div>`;
    }).join('');
    S.teams.forEach(t => { prevScores[t.id] = score(t.id); });
  }

  /* ------------------------------------------------------------------ modals: rules + print */
  function openModal(html) { const m = $('#modal'); m.innerHTML = `<div class="mbox"><button class="ic mclose" data-act="closeModal">✕</button>${html}</div>`; m.classList.add('on'); }
  function closeModal() { $('#modal').classList.remove('on'); }
  function rulesHtml() {
    return `<div class="rulesref">
      <section><h2>Capital letters</h2>${C.capitals.map(c => `<p><b>${c.no ? '✗ ' : ''}${esc(c.title)}:</b> ${c.ex}</p>`).join('')}</section>
      <section><h2>Punctuation</h2>${C.marks.map(m => `<p><b class="bm">${esc(m.mark)}</b> <b>${esc(m.name)}</b> — ${esc(m.use)} <i>${esc(m.ex)}</i></p>`).join('')}</section>
      <section><h2>Present simple</h2>${C.presentSimple.map(c => `<p><b>${esc(c.title)}:</b> ${c.ex}</p>`).join('')}</section>
      <section><h2>Sentences & paragraphs</h2><p>${C.sentence.formula.map(esc).join(' + ')}</p><ul>${C.paragraph.map(p => `<li>${esc(p)}</li>`).join('')}</ul></section>
    </div>`;
  }
  const PRINTS = [
    ['corners', 'Corner signs A B C D (4 pages)'],
    ['marks', 'Punctuation swat cards . ? ! , ’ (5 pages)'],
    ['cards', 'Answer cards for each team: A B C D · ✓ ✗ · . ? ! , ’ (3 pages per team)'],
    ['dict', 'Running dictation text (1 per team)'],
    ['planner', 'Paragraph planner (1 per team)'],
    ['judge', 'Judging sheets (1 per team)'],
    ['handout', 'Rules handout (1 page)']
  ];
  function printHtml() {
    return `<h2>🖨 Printables</h2>
      <p class="muted">${S.teams.length ? S.teams.length + ' teams — sheets are made for each team.' : 'Make teams first to print one sheet per team.'}</p>
      <div class="plist">${PRINTS.map(([k, l]) => `<label><input type="checkbox" name="pr" value="${k}" checked> ${esc(l)}</label>`).join('')}</div>
      <label class="inline">Dictation text: <select id="pr-dict">${L().dictation.map((d, i) => `<option value="${i}" ${i === S.r4text ? 'selected' : ''}>${esc(d.title)} (${esc(d.level)})</option>`).join('')}</select></label>
      <div class="actions"><button class="btn big primary" data-act="doPrint">Print selected</button></div>`;
  }
  // low marks (. ,) sit on the baseline and high marks (’ ') near the top: nudge them to the middle of the card
  const markPos = c => ['.', ','].includes(c) ? 'lowmark' : ["'", '’'].includes(c) ? 'highmark' : '';
  function buildPrint(keys, dictIdx) {
    const teams = S.teams.length ? S.teams : [{ name: '________', sym: '', color: '#333', id: 'x' }];
    const out = [];
    const cornerCol = ['#E4572E', '#1F7A8C', '#7B2CBF', '#D98E04'];
    if (keys.includes('corners')) LET.split('').forEach((l, i) => out.push(`<div class="page sign"><div class="sign-big" style="color:${cornerCol[i]}">${l}</div></div>`));
    if (keys.includes('marks')) C.marks.forEach(m => out.push(`<div class="page sign"><div class="sign-big mark ${markPos(m.mark)}">${esc(m.mark)}</div><div class="sign-name">${esc(m.name)}</div></div>`));
    if (keys.includes('cards')) {
      const set = ['A', 'B', 'C', 'D', '✓', '✗', '.', '?', '!', ',', '’'];
      const sub = { '✓': 'Correct', '✗': 'Wrong', '.': 'full stop', '?': 'question mark', '!': 'exclamation mark', ',': 'comma', '’': 'apostrophe' };
      teams.forEach(t => {
        for (let i = 0; i < set.length; i += 4) {
          out.push(`<div class="page cards4">${set.slice(i, i + 4).map(c => `<div class="acard-p" style="--c:${t.color}">
            <div class="ac-big ${markPos(c)}">${esc(c)}</div><div class="ac-sub">${esc(sub[c] || '')}</div><div class="ac-team">${esc(t.sym)} ${esc(t.name)}</div></div>`).join('')}</div>`);
        }
      });
    }
    if (keys.includes('dict')) {
      const d = L().dictation[dictIdx] || L().dictation[0];
      teams.forEach(t => out.push(`<div class="page"><div class="ph">Running Dictation · ${esc(t.name)}</div><h1>${esc(d.title)}</h1><p class="dict-print">${esc(d.text)}</p></div>`));
    }
    if (keys.includes('planner')) teams.forEach(t => {
      const tp = S.topics[t.id] != null ? C.topics[S.topics[t.id]].name : '______________________';
      out.push(`<div class="page"><div class="ph">Paragraph Planner · Team: ${esc(t.name)}</div><h1>Topic: ${esc(tp)}</h1>
        <div class="pl"><b>🍞 Sentence 1 · topic sentence</b><div class="ln"></div><div class="ln"></div></div>
        ${[2, 3, 4].map(i => `<div class="pl"><b>🥬 Sentence ${i} · detail</b><div class="ln"></div><div class="ln"></div></div>`).join('')}
        <div class="pl"><b>🍞 Sentence 5 · concluding sentence</b><div class="ln"></div><div class="ln"></div></div>
        <div class="pchk">${C.rubric.map(c => `<span>☐ ${esc(c.title)}</span>`).join('')}</div>
        <div class="pchk">${C.missions.map(m => `<span>⭐ ${esc(m)}</span>`).join('')}</div></div>`);
    });
    if (keys.includes('judge')) teams.forEach(t => {
      // one block per poster, 2 posters per page · columns = sentences 1–5
      const others = S.teams.length ? S.teams.filter(o => o.id !== t.id) : [1, 2, 3, 4].map(i => ({ name: 'Team ' + i }));
      const nS = C.sentences || 5;
      const hint = ['topic', 'detail', 'detail', 'detail', 'end'];
      const block = o => `<div class="jblock"><div class="jb-h">Poster: <b>${esc(o.name)}</b></div>
        <table class="jt-print"><tr><th class="ck">Check</th>${Array.from({ length: nS }, (_, k) => `<th class="sn">${k + 1}</th>`).join('')}<th class="nx">✗</th><th class="sx">Stars</th></tr>
        ${C.rubric.map((c, i) => `<tr><td class="ck"><b>${i + 1}. ${esc(c.title)}</b></td>${Array.from({ length: nS }, (_, k) =>
          `<td class="tick">${i === C.rubric.length - 1 ? `<small>${hint[k] || ''}</small>` : ''}</td>`).join('')}<td class="nx"></td><td class="sx">0 · 1 · 2</td></tr>`).join('')}
        <tr class="tot"><td class="ck"><b>TOTAL stars /${C.maxStars}</b></td><td colspan="${nS + 2}"></td></tr>
        <tr class="fb"><td class="ck"><b>⭐ One good thing</b></td><td colspan="${nS + 2}"></td></tr>
        <tr class="fb"><td class="ck"><b>🔧 One thing to fix</b></td><td colspan="${nS + 2}"></td></tr></table></div>`;
      for (let k = 0; k < others.length; k += 2) {
        out.push(`<div class="page"><div class="ph">Judging Sheet · Our team: ${esc(t.name)} · ${esc(levelName())}</div>
          <div class="jhow"><b>How to judge:</b> ① Read the 5 sentences together. ② For each check, write <b>✓</b> or <b>✗</b> under sentences 1–5. ③ Count the <b>✗</b> and circle the stars. ④ Write one ⭐ and one 🔧.</div>
          <div class="jkey">${C.scale.map(x => `<span>${esc(x)}</span>`).join('')}</div>
          <ol class="jchecks">${C.rubric.map(c => `<li><b>${esc(c.title)}:</b> ${esc(c.check)}</li>`).join('')}</ol>
          ${others.slice(k, k + 2).map(block).join('')}</div>`);
      }
    });
    if (keys.includes('handout')) out.push(`<div class="page handout"><h1>Write It Right! · Rules</h1>${rulesHtml()}</div>`);
    return out.join('');
  }

  /* ------------------------------------------------------------------ actions */
  const A = {
    go(d) { S.stage = +d.i; closeModal(); window.scrollTo(0, 0); },
    tab(d) { S.rounds[stage().id].tab = d.tab; window.scrollTo(0, 0); },
    item(d) { S.rounds[stage().id].i = +d.i; },
    prev() { const r = S.rounds[stage().id]; if (r && r.i > 0) r.i--; },
    next() {
      const id = stage().id, r = S.rounds[id];
      const n = { r1: L().corners.length, r2: L().swat.length, rv: L().verbs.length, r3: L().scramble.length }[id];
      if (r && n && r.i < n - 1) r.i++;
    },
    reveal() {
      const r = S.rounds[stage().id];
      if (!r || r.tab !== 'play') return false;
      r.rev[r.i] = !r.rev[r.i];
      if (r.rev[r.i]) sfx.reveal();
    },
    peek(d) { S.peek[d.k] = !S.peek[d.k]; if (S.peek[d.k]) sfx.reveal(); },
    award(d) { setAward(d.key, d.team, +d.pts); },
    adj(d) { S.awards.manual = S.awards.manual || {}; S.awards.manual[d.team] = (S.awards.manual[d.team] || 0) + (+d.d); if (+d.d > 0) sfx.point(); },
    mode(d) { readNames(); S.mode = d.mode; },
    makeTeams() { makeTeams(); },
    move(d) {
      const i = S.teams.findIndex(t => t.id === d.team);
      const [m] = S.teams[i].members.splice(+d.m, 1);
      S.teams[(i + 1) % S.teams.length].members.push(m);
    },
    cue(d) {
      cue(+d.sec, d.label, d.every ? { every: +d.every, everyText: d.everyText } : null);
      if (+d.sec > 30) flash('⏱ ' + fmt(+d.sec), 'var(--accent)');
      return false;
    },
    r4text(d) { S.r4text = +d.i; },
    level(d) {
      if (S.level === d.l) return false;
      S.level = d.l; S.r4text = 0; S.peek = {};
      ['r1', 'r2', 'rv', 'r3'].forEach(id => { S.rounds[id].i = 0; S.rounds[id].rev = {}; });
      sfx.reveal();
    },
    topicView(d) { S.topicView = +d.i; },
    topicCycle(d) {
      const used = new Set(Object.entries(S.topics).filter(([k]) => k !== d.team).map(([, v]) => v));
      let cur = S.topics[d.team] == null ? -1 : S.topics[d.team];
      for (let step = 0; step < C.topics.length; step++) {
        cur = (cur + 1) % C.topics.length;
        if (!used.has(cur) || used.size >= C.topics.length) break;
      }
      S.topics[d.team] = cur; S.topicView = cur;
    },
    spin() {
      let n = 0;
      const iv = setInterval(() => {
        const pool = shuffle(C.topics.map((_, i) => i));
        S.teams.forEach((t, i) => { S.topics[t.id] = pool[i % pool.length]; });
        tone(400 + Math.random() * 600, 0.05, 'triangle', 0, 0.08);
        render();
        if (++n > 14) { clearInterval(iv); sfx.fanfare(); }
      }, 110);
      return false;
    },
    rot(d) { S.r6rot = +d.i; },
    pickJudge(d) { S.judge = d.j; },
    judge(d) {
      const j = S.judge; if (!j) return false;
      S.judging[j] = S.judging[j] || {};
      const a = S.judging[j][d.t] = S.judging[j][d.t] || Array(C.rubric.length).fill(null);
      a[+d.c] = +d.v;
    },
    applyJudging() {
      const { rows, eye } = results();
      S.awards['r6:para'] = {}; S.awards['r6:eye'] = {};
      rows.forEach(r => { S.awards['r6:para'][r.t.id] = r.pts; });
      eye.forEach(e => { S.awards['r6:eye'][e.j.id] = e.bonus; });
      sfx.fanfare(); flash('Points added! 🎉');
    },
    scOpen(d) { scOpen = scOpen === d.team ? null : d.team; renderScores(); return false; },
    board(d) { boardView = d.v; closeModal(); $('.top').classList.remove('more-open'); if (d.v === 'scores') sfx.reveal(); },
    closeBoard() { boardView = null; },
    answerMode(d) { S.answerMode = d.m; },
    prize(d) { S.prizes[d.k] = S.prizes[d.k] === +d.i ? null : +d.i; if (S.prizes[d.k] != null) sfx.point(); },
    celebrate() { confetti(); sfx.fanfare(); return false; },
    tToggle() { T.running ? timerPause() : timerStart(); return false; },
    tReset() { timerSet(T.total, { label: T.label, every: T.every, everyText: T.everyText }); return false; },
    bigtimer() { $('#bigtimer').classList.toggle('on'); drawTimer(); return false; },
    sound() { S.sound = !S.sound; },
    theme() { S.theme = S.theme === 'dark' ? 'light' : 'dark'; },
    fullscreen() {
      const de = document.documentElement;
      if (document.fullscreenElement || document.webkitFullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      else if (de.requestFullscreen) de.requestFullscreen().catch(() => {});
      else if (de.webkitRequestFullscreen) de.webkitRequestFullscreen();
      return false;
    },
    more() { $('.top').classList.toggle('more-open'); return false; },
    rules() { openModal(`<h2>📘 Rules</h2>${rulesHtml()}`); return false; },
    print() { openModal(printHtml()); return false; },
    closeModal() { closeModal(); return false; },
    doPrint() {
      const keys = [...document.querySelectorAll('input[name=pr]:checked')].map(i => i.value);
      const di = +($('#pr-dict') || { value: S.r4text }).value;
      $('#print-area').innerHTML = buildPrint(keys, di);
      closeModal();
      setTimeout(() => window.print(), 60);
      return false;
    },
    resetAll() {
      if (!confirm('Start a new game? Scores, teams and judging will be cleared (student names are kept).')) return false;
      const names = S.students, sound = S.sound, theme = S.theme;
      S = defaultState(); S.students = names; S.sound = sound; S.theme = theme;
      prevScores = {};
    }
  };

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el) { if (e.target.id === 'modal') closeModal(); return; }
    const fn = A[el.dataset.act];
    if (!fn) return;
    if (el.closest('.more-tools')) $('.top').classList.remove('more-open');
    if (fn(el.dataset, el) !== false) render();
  });
  document.addEventListener('change', e => {
    if (e.target.classList.contains('tname')) {
      const t = team(e.target.dataset.team); if (t) { t.name = e.target.value.trim() || t.name; save(); renderScores(); }
    } else if (e.target.id === 'nteams') {
      S.nTeams = Math.max(2, Math.min(8, +e.target.value || 2)); readNames(); render();
    } else if (e.target.id === 'names') {
      readNames(); render();
    } else if (e.target.classList.contains('warmsel')) {
      S.warmAct = Object.assign({}, S.warmAct, { [e.target.dataset.round]: e.target.value }); render();
    } else if (e.target.id === 't-preset') {
      timerSet(+e.target.value);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key.toLowerCase();
    let handled = true;
    if (k === 'arrowright') { A.next(); render(); }
    else if (k === 'arrowleft') { A.prev(); render(); }
    else if (k === 'r' || k === ' ') { if (A.reveal() !== false) render(); else if (k === ' ') A.tToggle(); }
    else if (k === 't') A.tToggle();
    else if (k === 's' || k === 'g') { const v = k === 's' ? 'scores' : 'teams'; boardView = boardView === v ? null : v; drawBoard(); }
    else if (k === 'f') A.fullscreen();
    else if (k === 'escape') { closeModal(); $('#bigtimer').classList.remove('on'); boardView = null; drawBoard(); }
    else handled = false;
    if (handled) e.preventDefault();
  });
  window.addEventListener('afterprint', () => { $('#print-area').innerHTML = ''; });

  // Phones: hide full screen where the browser can't do it (iPhone Safari)
  if (!document.documentElement.requestFullscreen && !document.documentElement.webkitRequestFullscreen) $('#b-fs').hidden = true;

  // iOS / Android only allow sound after the first touch: unlock it then
  const unlock = () => {
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === 'suspended') ac.resume();
      const b = ac.createBuffer(1, 1, 22050), src = ac.createBufferSource();
      src.buffer = b; src.connect(ac.destination); src.start(0);
    } catch (e) { /* no audio */ }
    window.removeEventListener('touchend', unlock); window.removeEventListener('pointerdown', unlock);
  };
  window.addEventListener('touchend', unlock, { passive: true });
  window.addEventListener('pointerdown', unlock, { passive: true });

  // Swipe left / right on the question to change item (phones and tablets)
  let sx = null, sy = 0;
  $('#main').addEventListener('touchstart', e => {
    if (e.touches.length !== 1 || e.target.closest('input, textarea, select, .tablewrap, .scroll-x')) { sx = null; return; }
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  $('#main').addEventListener('touchend', e => {
    if (sx == null) return;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    sx = null;
    const r = S.rounds[stage().id];
    if (!r || r.tab !== 'play' || Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) A.next(); else A.prev();
    render();
  }, { passive: true });

  timerSet(300);
  render();
})();
