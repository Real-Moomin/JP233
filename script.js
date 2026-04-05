let sortedSets = [];
let currentSet = null;

const manifestPath = "./data/problem-files.json";

const setListEl = document.getElementById("setList");
const setTitleEl = document.getElementById("setTitle");
const setMetaEl = document.getElementById("setMeta");
const passageEl = document.getElementById("passage");
const questionCardsEl = document.getElementById("questionCards");
const solutionsEl = document.getElementById("solutions");
const questionKeys = ["q1", "q2", "q3", "q4", "q5"];

function renderChoices(target, choices) {
  target.innerHTML = "";
  choices.forEach((choice) => {
    const li = document.createElement("li");
    li.textContent = choice;
    target.appendChild(li);
  });
}

function renderSetList() {
  setListEl.innerHTML = "";
  sortedSets.forEach((set) => {
    const btn = document.createElement("button");
    btn.className = `set-btn ${set.id === currentSet.id ? "active" : ""}`;
    btn.innerHTML = `<span class="date">${set.createdAt}</span>${set.title}`;
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
    renderChoices(choices, question.choices);
    section.appendChild(choices);

    questionCardsEl.appendChild(section);
  });
}

function renderSolutions(set) {
  solutionsEl.innerHTML = "";

  questionKeys.forEach((key) => {
    const question = set[key];
    if (!question) return;

    const details = document.createElement("details");
    details.className = "solution-item";

    const summary = document.createElement("summary");
    summary.textContent = `${question.title.split(".")[0]} 正答：${question.answerText}`;
    details.appendChild(summary);

    const explanation = document.createElement("p");
    explanation.textContent = question.explanation;
    details.appendChild(explanation);

    solutionsEl.appendChild(details);
  });
}

function render() {
  if (!currentSet) return;

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
