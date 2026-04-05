let sortedSets = [];
let currentSet = null;

const manifestPath = "./data/problem-files.json";
const storageKey = "jp233-progress-v1";

const setListEl = document.getElementById("setList");
const setTitleEl = document.getElementById("setTitle");
const setMetaEl = document.getElementById("setMeta");
const passageEl = document.getElementById("passage");
const questionCardsEl = document.getElementById("questionCards");
const solutionsEl = document.getElementById("solutions");
const questionKeys = ["q1", "q2", "q3", "q4", "q5"];
let progress = loadProgress();

function loadProgress() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
    return {
      answers: parsed.answers || {},
      viewed: parsed.viewed || {},
      solutionOpen: parsed.solutionOpen || {}
    };
  } catch (error) {
    console.warn("Failed to load saved progress.", error);
    return { answers: {}, viewed: {}, solutionOpen: {} };
  }
}

function saveProgress() {
  window.localStorage.setItem(storageKey, JSON.stringify(progress));
}

function getSavedAnswer(problemId, key) {
  return progress.answers[problemId]?.[key] || null;
}

function setSavedAnswer(problemId, key, answerText) {
  if (!progress.answers[problemId]) {
    progress.answers[problemId] = {};
  }
  progress.answers[problemId][key] = answerText;
  saveProgress();
}

function markViewed(problemId) {
  if (!progress.viewed[problemId]) {
    progress.viewed[problemId] = true;
    saveProgress();
  }
}

function isCompleted(set) {
  return questionKeys.every((key) => set[key] && getSavedAnswer(set.id, key));
}

function isSolutionOpen(problemId) {
  return Boolean(progress.solutionOpen[problemId]);
}

function setSolutionOpen(problemId, open) {
  progress.solutionOpen[problemId] = open;
  saveProgress();
}

function renderChoices(target, set, key, choices) {
  target.innerHTML = "";
  const selectedAnswer = getSavedAnswer(set.id, key);
  const solutionOpen = isSolutionOpen(set.id);
  const correctAnswer = set[key].answerText;

  choices.forEach((choice, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.textContent = choice;

    const answerNumber = String(index + 1);
    if (selectedAnswer === answerNumber) {
      button.classList.add("selected");
    }
    if (solutionOpen && correctAnswer === answerNumber) {
      button.classList.add("correct");
    }
    if (solutionOpen && selectedAnswer === answerNumber && correctAnswer !== answerNumber) {
      button.classList.add("wrong");
    }

    button.addEventListener("click", () => {
      setSavedAnswer(set.id, key, answerNumber);
      render();
    });

    li.appendChild(button);
    target.appendChild(li);
  });
}

function renderSetList() {
  setListEl.innerHTML = "";
  sortedSets.forEach((set) => {
    const btn = document.createElement("button");
    const read = Boolean(progress.viewed[set.id]);
    const completed = isCompleted(set);
    const status = completed ? "完了" : read ? "既読" : "";

    btn.className = `set-btn ${set.id === currentSet.id ? "active" : ""} ${read ? "read" : ""} ${completed ? "completed" : ""}`;
    btn.innerHTML = `
      <span class="meta-row">
        <span class="date">${set.createdAt}</span>
        <span class="state">${status}</span>
      </span>
      ${set.title}
    `;
    btn.addEventListener("click", () => {
      currentSet = set;
      render();
    });
    setListEl.appendChild(btn);
  });
}

function renderPassage(paragraphs) {
  passageEl.innerHTML = "";
  paragraphs.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    passageEl.appendChild(p);
  });
}

function renderQuestions(set) {
  questionCardsEl.innerHTML = "";

  questionKeys.forEach((key) => {
    const question = set[key];
    if (!question) return;

    const section = document.createElement("section");
    section.className = "card";

    const title = document.createElement("h3");
    title.textContent = question.title;
    section.appendChild(title);

    if (question.prompt) {
      const prompt = document.createElement("p");
      prompt.className = "prompt";
      prompt.textContent = question.prompt;
      section.appendChild(prompt);
    }

    if (question.linked) {
      const linked = document.createElement("blockquote");
      linked.className = "linked";
      linked.textContent = question.linked;
      section.appendChild(linked);
    }

    const choices = document.createElement("ol");
    choices.className = "choices";
    renderChoices(choices, set, key, question.choices);
    section.appendChild(choices);

    questionCardsEl.appendChild(section);
  });
}

function renderSolutions(set) {
  solutionsEl.innerHTML = "";
  const details = document.createElement("details");
  details.className = "solution-panel";
  details.open = isSolutionOpen(set.id);
  details.addEventListener("toggle", () => {
    setSolutionOpen(set.id, details.open);
    render();
  });

  const summary = document.createElement("summary");
  summary.textContent = "解答・解説を開く";
  details.appendChild(summary);

  const body = document.createElement("div");
  body.className = "solution-body";

  questionKeys.forEach((key) => {
    const question = set[key];
    if (!question) return;

    const block = document.createElement("div");
    block.className = "solution-block";

    const title = document.createElement("p");
    title.className = "solution-title";
    const selectedAnswer = getSavedAnswer(set.id, key) || "未選択";
    title.textContent = `${question.title.split(".")[0]} 正答：${question.answerText} / あなたの選択：${selectedAnswer}`;

    const explanation = document.createElement("p");
    explanation.className = "solution-text";
    explanation.textContent = question.explanation;

    block.appendChild(title);
    block.appendChild(explanation);
    body.appendChild(block);
  });

  details.appendChild(body);
  solutionsEl.appendChild(details);
}

function render() {
  if (!currentSet) return;
  markViewed(currentSet.id);

  setTitleEl.textContent = currentSet.title;
  setMetaEl.textContent = `作成日: ${currentSet.createdAt} ・ 難易度: ${currentSet.level}`;

  renderPassage(currentSet.passage);
  renderQuestions(currentSet);
  renderSolutions(currentSet);
  renderSetList();
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`${path} load failed: ${response.status}`);
  }
  return response.json();
}

function getEmbeddedProblems() {
  const embedded = window.__JP233_EMBEDDED_DATA__;
  if (embedded && Array.isArray(embedded.problems)) {
    return embedded.problems;
  }
  throw new Error("embedded problem data is unavailable");
}

async function loadProblemSets() {
  try {
    const manifest = await loadJson(manifestPath);
    const files = Array.isArray(manifest.files) ? manifest.files : [];
    const loadedProblems = await Promise.all(files.map(loadJson));
    return loadedProblems;
  } catch (error) {
    console.warn("Falling back to embedded local data.", error);
    return getEmbeddedProblems();
  }
}

async function initialize() {
  try {
    const problemSets = await loadProblemSets();

    sortedSets = [...problemSets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    currentSet = sortedSets[0] || null;

    if (!currentSet) {
      throw new Error("No problem sets available");
    }

    render();
  } catch (error) {
    setTitleEl.textContent = "問題の読み込みに失敗しました。";
    setMetaEl.textContent = "data/problem-files.json と data/problems/*.json、または embedded-data.js を確認してください。";
    console.error(error);
  }
}

initialize();
