let sortedSets = [];
let currentSet = null;

const setListEl = document.getElementById("setList");
const setTitleEl = document.getElementById("setTitle");
const setMetaEl = document.getElementById("setMeta");
const passageEl = document.getElementById("passage");
const q1El = document.getElementById("q1");
const q2PromptEl = document.getElementById("q2Prompt");
const q2El = document.getElementById("q2");
const q3PromptEl = document.getElementById("q3Prompt");
const q3LinkedEl = document.getElementById("q3Linked");
const q3El = document.getElementById("q3");
const solutionsEl = document.getElementById("solutions");

function createPassage(theme, setNo) {
  return [
    `　${theme.context}は、近年の政策議論で繰り返し取り上げられている。表面的には効率化や利便性の向上として語られるが、実際には制度の前提そのものを問い直す契機を含んでいる。第${setNo}セットでは、指標の読みやすさと社会的妥当性が必ずしも一致しない局面に注目する。`,
    `　第一に確認すべきは、成果の表示形式である。単一の数値は比較可能性を高める一方で、測定からこぼれ落ちる経験を不可視化しやすい。とりわけ${theme.issue}ため、評価基準が固定化されるほど、異なる立場の当事者は議論の入口から排除される危険がある。`,
    "　第二に、制度運用には時間軸の分析が必要である。短期成果が強調される局面では、失敗の学習や試行錯誤の記録が軽視され、現場は説明責任より即時的成果を優先しがちになる。しかし、この傾向は長期的には信頼の低下を招き、制度改訂のコストをむしろ増大させる。",
    "　第三に、専門家と市民の役割分担を再整理する必要がある。専門知は高度な判断の基盤であるが、それが閉鎖的な言語体系にとどまれば、公共的意思決定の正統性は弱まる。したがって重要なのは、専門性を下げることではなく、検討過程を追跡可能な形で共有する設計である。",
    `　この点で鍵となるのが${theme.concept}という観点である。制度が安定的に機能するためには、判断根拠、異論への応答、修正手順が相互に連結されていなければならない。つまり、結論の正しさだけでなく、結論に至る道筋の公開可能性こそが信頼形成の核心となる。`,
    "　以上を踏まえると、課題は『賛成か反対か』の二項対立ではない。むしろ、可視化される成果と可視化されにくい負担を同時に扱う制度設計へ移行できるかが問われる。本文は、その移行を支える実践として、比較可能なデータ、反証可能な記録、段階的改訂の仕組みを組み合わせる必要性を示している。"
  ];
}

function formatDateByOffset(startDate, offsetDays) {
  const d = new Date(`${startDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - offsetDays);
  return d.toISOString().slice(0, 10);
}

function buildSet(index, baseThemes, startDate) {
  const theme = baseThemes[index % baseThemes.length];
  const setNo = index + 1;

  return {
    id: setNo,
    title: `第${setNo}回　${theme.title}`,
    createdAt: formatDateByOffset(startDate, index),
    level: "高校上級〜大学入試レベル",
    passage: createPassage(theme, setNo),
    q1: {
      choices: [
        "本文は、単一指標の利点を認めつつ、その限界も指摘している。",
        "本文は、短期成果偏重が長期的信頼を損なう可能性を論じている。",
        theme.q1Wrong,
        `本文は、${theme.concept}の観点から判断過程の公開可能性を重視している。`,
        "本文は、賛否の対立を超えて制度改訂の設計を問う姿勢を示している。"
      ],
      answer: 3,
      explanation: "本文は単純化を退け、検証過程と修正可能性の確保を重視しているため、③が不一致である。"
    },
    q2: {
      prompt: `本文中の「${theme.vocab}」の意味として最も適切なものを選べ。`,
      choices: theme.vocabChoices,
      answer: 2,
      explanation: `「${theme.vocab}」は文脈上、${theme.vocabChoices[1]}という意味で用いられている。`
    },
    q3: {
      prompt: "次の事例を読み、本文の論旨に照らして最も妥当な対応を選べ。",
      linked: theme.linked,
      choices: [
        "短期的成果を最大化するため、検証記録の公開を後回しにする。",
        "対立回避を優先し、当事者間の不一致は議事録に残さない。",
        theme.q3Correct,
        "運用上の失敗事例は制度不信を招くため共有しない。",
        "専門家のみで意思決定を完結し、市民説明は最小限にとどめる。"
      ],
      answer: 3,
      explanation: "本文は、根拠の公開・比較検証・段階的修正を伴う運用を支持しており、③が最も適切である。"
    },
    solutions: ["問題1 正答：③", "問題2 正答：②", "問題3 正答：③"]
  };
}

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
    <p><strong>${set.solutions[0]}</strong> — ${set.q1.explanation}</p>
    <p><strong>${set.solutions[1]}</strong> — ${set.q2.explanation}</p>
    <p><strong>${set.solutions[2]}</strong> — ${set.q3.explanation}</p>
  `;
}

function render() {
  if (!currentSet) return;

  setTitleEl.textContent = currentSet.title;
  setMetaEl.textContent = `제작일: ${currentSet.createdAt} · 난이도: ${currentSet.level}`;

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

async function initialize() {
  try {
    const response = await fetch("./problems.json");
    if (!response.ok) {
      throw new Error(`problems.json load failed: ${response.status}`);
    }

    const { setCount = 30, startDate = "2026-03-30", baseThemes = [] } = await response.json();
    const problemSets = Array.from({ length: setCount }, (_, index) => buildSet(index, baseThemes, startDate));

    sortedSets = [...problemSets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    currentSet = sortedSets[0] || null;
    render();
  } catch (error) {
    setTitleEl.textContent = "문제를 불러오지 못했습니다.";
    setMetaEl.textContent = "problems.json 파일을 확인해주세요.";
    console.error(error);
  }
}

initialize();
