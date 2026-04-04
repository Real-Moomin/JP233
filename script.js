let sortedSets = [];
let currentSet = null;

const problemFiles = [
  "./data/humanities.json",
  "./data/science.json",
  "./data/tech-social.json"
];

const setListEl = document.getElementById("setList");
const setTitleEl = document.getElementById("setTitle");
const setMetaEl = document.getElementById("setMeta");
const passageEl = document.getElementById("passage");
const q1TitleEl = document.getElementById("q1Title");
const q1El = document.getElementById("q1");
const q2TitleEl = document.getElementById("q2Title");
const q2PromptEl = document.getElementById("q2Prompt");
const q2El = document.getElementById("q2");
const q3TitleEl = document.getElementById("q3Title");
const q3PromptEl = document.getElementById("q3Prompt");
const q3LinkedEl = document.getElementById("q3Linked");
const q3El = document.getElementById("q3");
const solutionsEl = document.getElementById("solutions");

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

function renderSolutions(set) {
  solutionsEl.innerHTML = `
    <p><strong>문제1 정답: ${set.q1.answerText}</strong> — ${set.q1.explanation}</p>
    <p><strong>문제2 정답: ${set.q2.answerText}</strong> — ${set.q2.explanation}</p>
    <p><strong>문제3 정답: ${set.q3.answerText}</strong> — ${set.q3.explanation}</p>
  `;
}

function render() {
  if (!currentSet) return;

  setTitleEl.textContent = currentSet.title;
  setMetaEl.textContent = `作成日: ${currentSet.createdAt} ・ 難易度: ${currentSet.level}`;

  q1TitleEl.textContent = currentSet.q1.title;
  q2TitleEl.textContent = currentSet.q2.title;
  q3TitleEl.textContent = currentSet.q3.title;

  q1TitleEl.textContent = currentSet.q1.title;
  q2TitleEl.textContent = currentSet.q2.title;
  q3TitleEl.textContent = currentSet.q3.title;

  renderPassage(currentSet.passage);
  renderChoices(q1El, currentSet.q1.choices);

  q2PromptEl.textContent = currentSet.q2.prompt;
  renderChoices(q2El, currentSet.q2.choices);

  q3PromptEl.textContent = currentSet.q3.prompt;
  q3LinkedEl.textContent = currentSet.q3.linked;
  renderChoices(q3El, currentSet.q3.choices);

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

async function initialize() {
  try {
    const loaded = await Promise.all(problemFiles.map(loadJson));
    const problemSets = loaded.flatMap((item) => item.sets || []);

    sortedSets = [...problemSets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    currentSet = sortedSets[0] || null;
    render();
  } catch (error) {
    setTitleEl.textContent = "문제를 불러오지 못했습니다.";
    setMetaEl.textContent = "data/*.json 파일을 확인해주세요.";
    console.error(error);
  }
}

initialize();
