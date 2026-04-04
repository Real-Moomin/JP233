const problemSets = [
  {
    id: 3,
    title: "현대 과학・사회: 알고리즘 추천과 시민의 판단",
    createdAt: "2026-04-03",
    level: "고3~대학 초급",
    passage: [
      "　現代の情報環境では、個人が接するニュースや動画の多くが、推薦アルゴリズムを通じて提示される。アルゴリズムは、過去の閲覧履歴や滞在時間などの行動データを解析し、利用者の関心に合う情報を優先的に並べる。その結果、利用者は短時間で好みに近い情報へ到達できるようになった。",
      "　しかし利便性の拡大は、判断の偏りという副作用を伴う。特定の立場を支持する投稿ばかりが連続して表示されると、利用者はそれが社会全体の多数意見だと錯覚しやすい。これは、異なる根拠を持つ反対意見に触れる機会を減らし、論点を多角的に検討する力を弱める。",
      "　この問題を議論する際、しばしば『フィルターバブル』という概念が用いられる。フィルターバブルとは、利用者が自分に近い情報だけに囲まれ、外部の視点が見えにくくなる状態を指す。重要なのは、情報そのものが偽でなくても、情報の配列が偏るだけで認識が変形されうる点である。",
      "　対策としては、プラットフォーム運営者の設計責任と、利用者側の読解実践を同時に考える必要がある。たとえば運営者は、推薦理由の表示や、異なる観点を示す『代替記事』の提示機能を強化できる。 一方、利用者は情報を受動的に消費せず、一次資料の確認、出典比較、反証可能性の検討を習慣化しなければならない。",
      "　結局のところ、アルゴリズムは判断を代行する装置ではなく、判断を補助する道具にすぎない。民主社会における熟議の基盤は、異質な他者の主張を読み解き、自らの見解を修正し続ける市民の態度によって支えられる。技術の進歩は、その態度を不要にするのではなく、むしろ一層要求している。"
    ],
    q1: {
      choices: [
        "推薦アルゴリズムは、利用者の過去行動データを活用して情報を並べる。",
        "情報が事実であれば、配列の偏りは認識に影響しないと筆者は述べる。",
        "フィルターバブルは、異なる視点への接触機会を縮小させる状態を指す。",
        "筆者は運営者の責任と利用者の実践を同時に検討すべきだと主張する。",
        "筆者はアルゴリズムを判断の補助道具として位置づけている。"
      ],
      answer: 2,
      explanation: "本文第3段落では、情報が偽でなくても配列の偏りだけで認識が変形されると述べる。"
    },
    q2: {
      prompt: "지문 2단락의 '錯覚(さっかく)'의 의미로 가장 적절한 것은?",
      choices: [
        "충분한 근거 없이 사실을 사실이 아닌 것으로 인식함",
        "반복 노출로 인해 제한된 상황을 전체 현실로 잘못 인식함",
        "서로 다른 의견을 동일한 가치로 인정하는 태도",
        "판단을 보류하고 추가 자료를 찾는 신중한 상태",
        "수치 데이터를 무조건 신뢰하는 기계적 습관"
      ],
      answer: 2,
      explanation: "문맥상 특정 의견이 연속 노출되어 그것이 사회 전체 의견처럼 보이는 인지 왜곡을 뜻한다."
    },
    q3: {
      prompt: "다음 사례 중, 본문 관점에서 가장 타당한 대응을 고르시오.",
      linked: "[연계 지문] 한 대학 신문 동아리는 지방선거 보도를 준비하면서 SNS 상위 노출 게시물만 참고했다. 이후 기사 초안에서 쟁점이 한 정당의 프레임으로만 구성되었다는 비판을 받았다.",
      choices: [
        "조회 수가 높은 게시물이 민심을 가장 정확히 반영하므로 그대로 기사화한다.",
        "속보 경쟁이 중요하므로 출처 검증보다 게시물 수집량 확대를 우선한다.",
        "서로 다른 성향의 1차 자료와 공식 통계를 병행 검토해 쟁점 배열을 재구성한다.",
        "논란을 피하기 위해 선거 관련 보도 자체를 중단한다.",
        "알고리즘이 자동 추천한 기사만 사용하면 객관성이 확보된다고 본다."
      ],
      answer: 3,
      explanation: "본문은 반대 관점 접촉, 출처 비교, 1차 자료 확인을 통해 편향을 줄여야 한다고 본다."
    },
    q4: {
      prompt: "알고리즘 추천 환경에서 '좋은 시민적 독해 습관'이 무엇인지, 본문 논지를 활용해 250~350자 내외로 논술하시오."
    },
    solutions: [
      "문제 1 정답: ②",
      "문제 2 정답: ②",
      "문제 3 정답: ③"
    ]
  },
  {
    id: 2,
    title: "문화・철학: 전통의 계승과 변형",
    createdAt: "2026-03-28",
    level: "고2~대학 초급",
    passage: [
      "　伝統文化はしばしば『保存』の語で語られるが、実際には固定された標本ではない。祭礼、工芸、芸能は、地域の経済構造や世代構成の変化を受けながら、その都度の実践として再構成されてきた。",
      "　ここで重要なのは、変化それ自体を伝統の劣化とみなす短絡を避けることである。むしろ伝統の持続可能性は、変化を受け入れる可塑性に依存する。",
      "　もちろん、何でも変えてよいわけではない。実践者共同体が『これを失えば当該文化の同一性が崩れる』と合意する核心要素は、慎重に継承されるべきである。",
      "　したがって、継承の課題は『不変か改変か』の二項対立ではなく、核心と周縁を峻別し、時代条件に応じた再配置を設計できるかどうかにある。"
    ],
    q1: {
      choices: [
        "필자는 전통 문화를 고정된 표본으로 보지 않는다.",
        "필자는 변화 자체를 전통의 타락으로 단정해서는 안 된다고 본다.",
        "필자는 핵심 요소까지 자유롭게 변형해야 지속 가능성이 높아진다고 본다.",
        "필자는 핵심과 주변을 구분하는 설계가 중요하다고 본다.",
        "필자는 불변/개변의 이분법을 비판한다."
      ],
      answer: 3,
      explanation: "3단락에서 핵심 요소는 신중히 계승되어야 한다고 밝혔다."
    },
    q2: {
      prompt: "'峻別(しゅんべつ)'의 문맥적 의미로 가장 알맞은 것은?",
      choices: ["거부하다", "엄격히 구별하다", "절충하다", "반복하다", "은폐하다"],
      answer: 2,
      explanation: "핵심/주변 요소를 엄밀히 가려내는 의미이다."
    },
    q3: {
      prompt: "다음 중 본문 논리에 부합하는 정책 제안은?",
      linked: "[연계 지문] 한 지방자치단체가 전통 공연 활성화를 위해 청년 창작자 참여형 프로그램을 기획하고 있다.",
      choices: [
        "기존 형식을 완전히 폐기하고 전면 대체한다.",
        "핵심 의례 절차는 유지하되 무대·홍보 방식은 현대화한다.",
        "전통의 순수성을 위해 관객 참여를 금지한다.",
        "세대 갈등을 피하려고 프로그램을 취소한다.",
        "기록 보존만 하고 실제 공연은 중단한다."
      ],
      answer: 2,
      explanation: "핵심은 지키고 주변은 재배치한다는 본문 결론과 합치된다."
    },
    q4: {
      prompt: "당신이 생각하는 '핵심 요소'의 기준을 하나 정하고, 실제 문화 사례에 적용해 200자 이상 쓰시오."
    },
    solutions: ["문제 1 정답: ③", "문제 2 정답: ②", "문제 3 정답: ②"]
  },
  {
    id: 1,
    title: "시사・법: 디지털 기록과 잊힐 권리",
    createdAt: "2026-03-19",
    level: "고3~대학",
    passage: [
      "　検索技術の発展は、過去の記録へのアクセスを飛躍的に容易にした。これは公共監視の強化という利点を持つ一方、個人の更生や生活再建を妨げる可能性もはらむ。",
      "　いわゆる『忘れられる権利』の議論は、この緊張関係の中で登場した。論点は、情報を全面的に消すか残すかではなく、公共性・時間経過・当事者の地位をどう衡量するかにある。",
      "　裁判実務でも、社会的関心の高い案件か、私生活に関わる軽微な事項かによって判断は分かれる。したがって法的判断は抽象原理だけでなく、具体的文脈の分析を要する。",
      "　市民はこの問題を、表現の自由と人格権の対立として単純化せず、情報の二次流通がもたらす実害を検証しつつ、比例的な救済の形を探る必要がある。"
    ],
    q1: {
      choices: [
        "필자는 검색 기술의 공익적 측면을 인정한다.",
        "필자는 '잊힐 권리'를 정보 전면 삭제 요구와 동일시한다.",
        "필자는 공공성·시간·당사자 지위의 형량을 강조한다.",
        "필자는 판례 판단에서 구체적 문맥 분석이 필요하다고 본다.",
        "필자는 표현의 자유와 인격권의 단순 대립 구도를 경계한다."
      ],
      answer: 2,
      explanation: "2단락은 전면 삭제/유지의 이분법이 핵심이 아니라고 말한다."
    },
    q2: {
      prompt: "'衡量(こうりょう)'의 의미로 가장 적절한 것은?",
      choices: ["비난하다", "측정해 서열화하다", "이해관계를 비교·조정해 판단하다", "감정적으로 공감하다", "위험을 회피하다"],
      answer: 3,
      explanation: "법적 맥락에서 상충 가치들을 비교해 균형 판단한다는 뜻이다."
    },
    q3: {
      prompt: "다음 사례 중 본문 취지에 가장 부합하는 결론은?",
      linked: "[연계 지문] 12년 전 경미한 청소년 사건 기사 링크가 성인이 된 당사자의 취업 과정에서 반복 노출되고 있다. 해당 사건은 현재 공적 논쟁의 중심 이슈는 아니다.",
      choices: [
        "모든 검색 결과를 무기한 유지해야 한다.",
        "언론 자유 침해 우려가 있으므로 어떤 조치도 불가하다.",
        "공공성·시간 경과를 고려해 검색 노출 제한 같은 비례적 조치를 검토한다.",
        "당사자가 원하면 기사 원문 자체를 즉시 삭제한다.",
        "동일한 사건을 더 많이 유통해 사회적 경각심을 높인다."
      ],
      answer: 3,
      explanation: "본문은 맥락별 형량과 비례적 구제를 강조한다."
    },
    q4: {
      prompt: "'공익적 기록 보존'과 '개인의 재사회화'가 충돌할 때 우선 기준을 어떻게 설정할지 250자 이상 논하시오."
    },
    solutions: ["문제 1 정답: ②", "문제 2 정답: ③", "문제 3 정답: ③"]
  }
];

const sortedSets = [...problemSets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
let currentSet = sortedSets[0];

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
const q4PromptEl = document.getElementById("q4Prompt");
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
    <p><strong>${set.solutions[0]}</strong> — ${set.q1.explanation}</p>
    <p><strong>${set.solutions[1]}</strong> — ${set.q2.explanation}</p>
    <p><strong>${set.solutions[2]}</strong> — ${set.q3.explanation}</p>
  `;
}

function render() {
  setTitleEl.textContent = currentSet.title;
  setMetaEl.textContent = `제작일: ${currentSet.createdAt} · 난이도: ${currentSet.level}`;

  renderPassage(currentSet.passage);
  renderChoices(q1El, currentSet.q1.choices);

  q2PromptEl.textContent = currentSet.q2.prompt;
  renderChoices(q2El, currentSet.q2.choices);

  q3PromptEl.textContent = currentSet.q3.prompt;
  q3LinkedEl.textContent = currentSet.q3.linked;
  renderChoices(q3El, currentSet.q3.choices);

  q4PromptEl.textContent = currentSet.q4.prompt;
  renderSolutions(currentSet);
  renderSetList();
}

render();
