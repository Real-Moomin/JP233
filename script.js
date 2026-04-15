let sortedSets = [];
let currentSetId = null;

const manifestPath = "./data/problem-files.json";
const storageKey = "jp233-progress-v1";

const setListEl = document.getElementById("setList");
const setTitleEl = document.getElementById("setTitle");
const setMetaEl = document.getElementById("setMeta");
const passageEl = document.getElementById("passage");
const questionCardsEl = document.getElementById("questionCards");
const solutionsEl = document.getElementById("solutions");
let progress = loadProgress();

function getDisplayOrderMap(sets) {
  return new Map(
    [...sets]
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map((set, index) => [set.id, index + 1])
  );
}

function getDifficultyStars(set) {
  const tier = set.difficultyTier || "";
  const level = set.level || "";

  if (tier === "upper-intermediate") return "★★★☆☆";
  if (tier === "advanced") return "★★★★☆";
  if (tier === "very advanced") return "★★★★★";

  if (!level) return "★★★☆☆";
  if (level.includes("N1") || level.includes("大学入試")) return "★★★★☆";
  if (level.includes("N2")) return "★★★☆☆";
  if (level.includes("N3")) return "★★☆☆☆";
  return "★★★☆☆";
}

function getQuestionKeys(set) {
  return Object.keys(set)
    .filter((key) => /^q\d+$/.test(key))
    .sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)));
}

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

function clearSavedAnswer(problemId, key) {
  if (!progress.answers[problemId]) return;
  delete progress.answers[problemId][key];
  if (Object.keys(progress.answers[problemId]).length === 0) {
    delete progress.answers[problemId];
  }
  saveProgress();
}

function markViewed(problemId) {
  if (!progress.viewed[problemId]) {
    progress.viewed[problemId] = true;
    saveProgress();
  }
}

function isCompleted(set) {
  return getQuestionKeys(set).every((key) => getSavedAnswer(set.id, key));
}

function getCurrentSet() {
  return sortedSets.find((set) => set.id === currentSetId) || null;
}

function isSolutionOpen(problemId) {
  return Boolean(progress.solutionOpen[problemId]);
}

function setSolutionOpen(problemId, open) {
  progress.solutionOpen[problemId] = open;
  saveProgress();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getQuotedTarget(title) {
  const match = title.match(/「(.+?)」/);
  return match ? match[1] : null;
}

function getHighlightTerms(set) {
  return ["q2", "q4"]
    .map((key) => set[key]?.title)
    .filter(Boolean)
    .map(getQuotedTarget)
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
}

function buildHighlightedFragment(text, terms) {
  const fragment = document.createDocumentFragment();
  if (!terms.length) {
    fragment.appendChild(document.createTextNode(text));
    return fragment;
  }

  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "g");
  const parts = text.split(pattern);

  parts.forEach((part) => {
    if (!part) return;

    if (terms.includes(part)) {
      const mark = document.createElement("mark");
      mark.className = "passage-highlight";
      mark.textContent = part;
      fragment.appendChild(mark);
      return;
    }

    fragment.appendChild(document.createTextNode(part));
  });

  return fragment;
}

function renderChoices(target, set, key, choices) {
  target.innerHTML = "";
  const selectedAnswer = getSavedAnswer(set.id, key);

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

    button.addEventListener("click", () => {
      if (selectedAnswer === answerNumber) {
        clearSavedAnswer(set.id, key);
      } else {
        setSavedAnswer(set.id, key, answerNumber);
      }
      render();
    });

    li.appendChild(button);
    target.appendChild(li);
  });
}

function renderSetList() {
  setListEl.innerHTML = "";
  const displayOrderMap = getDisplayOrderMap(sortedSets);
  sortedSets.forEach((set) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.dataset.setId = set.id;
    const read = isCompleted(set);
    const status = read ? "既読" : "";
    const displayNumber = displayOrderMap.get(set.id);

    btn.className = `set-btn ${set.id === currentSetId ? "active" : ""} ${read ? "read completed" : ""}`;
    btn.innerHTML = `
      <span class="meta-row">
        <span class="set-number">#${displayNumber}</span>
        <span class="state">${status}</span>
      </span>
      <span class="title-text">${set.title}</span>
    `;
    setListEl.appendChild(btn);
  });
}

setListEl.addEventListener("click", (event) => {
  const button = event.target.closest(".set-btn");
  if (!button) return;
  const { setId } = button.dataset;
  if (!setId || setId === currentSetId) return;
  currentSetId = setId;
  render();
});

function renderPassage(set) {
  passageEl.innerHTML = "";
  const terms = getHighlightTerms(set);

  set.passage.forEach((text) => {
    const p = document.createElement("p");
    p.appendChild(buildHighlightedFragment(text, terms));
    passageEl.appendChild(p);
  });
}

function renderQuestions(set) {
  questionCardsEl.innerHTML = "";

  getQuestionKeys(set).forEach((key) => {
    const question = set[key];

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
  });

  const summary = document.createElement("summary");
  summary.textContent = "解答・解説を開く";
  details.appendChild(summary);

  const body = document.createElement("div");
  body.className = "solution-body";

  getQuestionKeys(set).forEach((key) => {
    const question = set[key];

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
  const currentSet = getCurrentSet();
  if (!currentSet) return;
  const displayOrderMap = getDisplayOrderMap(sortedSets);
  const displayNumber = displayOrderMap.get(currentSet.id);
  const difficultyStars = getDifficultyStars(currentSet);

  setTitleEl.textContent = currentSet.title;
  setMetaEl.textContent = `#${displayNumber} ・ 難易度: ${difficultyStars}`;

  renderPassage(currentSet);
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
    if (!currentSetId || !sortedSets.some((set) => set.id === currentSetId)) {
      currentSetId = sortedSets[0]?.id || null;
    }

    if (!currentSetId) {
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
