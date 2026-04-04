const baseThemes = [
  {
    title: "科学技術と社会的信頼",
    context: "研究機関が公開する技術情報と市民の受容過程",
    issue: "短期的な成果の強調が長期的な検証文化を圧迫する点",
    concept: "検証可能性",
    vocab: "暫定",
    vocabChoices: ["最終的に確定した状態", "一時的に採用され、後で修正されうる状態", "制度外で非公式に運用される状態", "多数決のみで決まった状態", "感情的反応だけで定着した状態"],
    q1Wrong: "筆者は、公開前の検証より話題性を優先することが望ましいと述べている。",
    linked: "地方都市の教育委員会は、学習支援AIの導入効果を公表した。しかし報告書は成功例のみを掲載し、失敗事例の条件を記載していない。\n\n別の学校では、同じAIを導入したが学習定着率が伸びず、担当教員が運用記録を公開して改善策を共有した。",
    q3Correct: "成功例と失敗例の両方を比較し、再現条件を明示したうえで段階的に導入範囲を決める。"
  },
  {
    title: "文化継承と都市再編",
    context: "再開発地域での祭礼・工芸の継承方法",
    issue: "景観の更新が実践共同体の記憶を分断する点",
    concept: "制度設計",
    vocab: "媒介",
    vocabChoices: ["価値判断を停止する行為", "異なる主体をつなぎ、理解を成立させる働き", "伝統を完全に固定する規則", "過去の記録を消去する手続き", "資金配分を停止する処分"],
    q1Wrong: "筆者は、祭礼の核心手順まで全面的に変更すべきだと主張している。",
    linked: "ある市は観光強化のため、祭礼を週末イベント化し、儀礼手順を短縮した。来訪者は増えたが、担い手の青年会は『意味が伝わらない』と反発した。\n\n隣接地区では、儀礼部分を従来通り維持しつつ、解説展示と多言語案内を追加して参加者層を広げた。",
    q3Correct: "核心手順の継承を優先し、周辺の説明方法や参加導線を更新して継続可能性を高める。"
  },
  {
    title: "メディア環境と熟議",
    context: "短尺動画中心のニュース消費",
    issue: "断片情報の連続が論点の因果関係を見えにくくする点",
    concept: "文脈依存性",
    vocab: "敷衍",
    vocabChoices: ["個別事例から概念を広げて説明すること", "事実を隠すために編集すること", "対象を分類せず列挙すること", "議論を停止して多数派に従うこと", "制度を一時凍結すること"],
    q1Wrong: "筆者は、情報量が多ければ文脈確認は不要になると述べる。",
    linked: "大学新聞部は、学費改定の記事を作る際、短尺動画の切り抜き発言だけを根拠に見出しを決めた。\n\nその後、審議会議事録を読んだ別チームが、発言の前提条件が省略されていたと指摘し、記事構成を修正した。",
    q3Correct: "一次資料を確認して発言の前後関係を復元し、論点を因果の流れで再配置する。"
  },
  {
    title: "環境政策と地域合意",
    context: "再生可能エネルギー導入をめぐる住民対話",
    issue: "数値目標の共有だけでは負担配分の納得が得られない点",
    concept: "説明責任",
    vocab: "逓減",
    vocabChoices: ["段階的に減少すること", "急激に増加すること", "同一水準で固定されること", "無秩序に変動すること", "法的効力を失うこと"],
    q1Wrong: "筆者は、地域対話では費用負担の情報公開を避けるべきだと述べる。",
    linked: "沿岸部の自治体は風力発電計画を提示し、年間発電量のみを強調した。住民説明会では景観、騒音、保守費用の質問が続いたが、詳細資料は未提示だった。\n\n別地域では、便益と負担の試算を世帯属性ごとに示し、補償条件を段階的に見直す協議会を設置した。",
    q3Correct: "発電効果だけでなく負担分配の根拠を公開し、見直し可能な合意手順を制度化する。"
  },
  {
    title: "法とデジタル記録",
    context: "検索可能性と更生機会の調整",
    issue: "過去情報の恒常的可視化が現在の人格評価を固定化する点",
    concept: "比例原則",
    vocab: "斟酌",
    vocabChoices: ["事情をくみ取り、判断に反映すること", "命令に機械的に従うこと", "証拠を排除して裁くこと", "記録を全面非公開にすること", "責任を他者へ移すこと"],
    q1Wrong: "筆者は、社会的関心が低い事案でも無期限公開を原則にすべきだと述べる。",
    linked: "十年前の軽微な処分歴が、現在の就職検索で常に上位表示される。本人は再発防止活動に参加し、地域評価も改善している。\n\n一方、公職者候補の重大不正に関する報道は、現在も政策判断に直結する情報として広く参照されている。",
    q3Correct: "公共性と時間経過を区別し、社会的必要性が低い情報には検索表示の限定など比例的手段を採る。"
  },
  {
    title: "教育評価と学習観",
    context: "標準化試験と探究活動の両立",
    issue: "測定可能な成果のみを重視すると学習過程の質が不可視化される点",
    concept: "多元評価",
    vocab: "漸進",
    vocabChoices: ["段階を追って少しずつ進むこと", "一度に全面改訂すること", "評価を停止すること", "外部基準を排除すること", "目標を縮小すること"],
    q1Wrong: "筆者は、試験点だけで学習到達を完全に把握できると主張する。",
    linked: "高校Aは探究活動を実施しているが、成績表には試験点のみを記載しているため、調査計画や協働過程が反映されない。\n\n高校Bは試験点に加え、仮説設定・資料批判・発表後の修正記録を評価票に組み込み、学期ごとに重みを調整している。",
    q3Correct: "到達度指標を複線化し、成果と過程の両面を可視化する評価設計へ移行する。"
  },
  {
    title: "医療情報と意思決定",
    context: "患者向け情報提供の設計",
    issue: "専門語の多用が自己決定の前提となる理解を阻害する点",
    concept: "理解可能性",
    vocab: "包摂",
    vocabChoices: ["多様な当事者を排除せず取り込むこと", "一部のみを優先すること", "判断を延期すること", "制度外へ移すこと", "費用を削減すること"],
    q1Wrong: "筆者は、説明資料の難解さは医療の中立性を高めると述べる。",
    linked: "病院Xは新治療の説明会で専門用語中心の資料を配布し、質疑時間を短く設定した。\n\n病院Yは同じ治療について、比較表・副作用頻度・代替治療を平易な表現で示し、患者会の質問を受けて説明順序を改訂した。",
    q3Correct: "専門性を維持しつつ理解可能な表現へ翻訳し、質問を反映して説明手順を更新する。"
  },
  {
    title: "労働市場と自動化",
    context: "業務効率化と職務再設計",
    issue: "自動化の利益配分が不透明だと現場の技能継承が断絶する点",
    concept: "移行支援",
    vocab: "再配置",
    vocabChoices: ["役割や資源を目的に応じて組み替えること", "既存体制を凍結すること", "責任を回避すること", "成果を隠すこと", "規則を廃止すること"],
    q1Wrong: "筆者は、自動化後の再訓練は不要であると断言している。",
    linked: "製造企業Mは工程自動化を進めたが、削減人員の再訓練計画を示さなかったため離職率が上昇した。\n\n企業Nは導入前に技能棚卸しを行い、保守・品質監査・データ分析へ職務を再配置し、賃金体系も見直した。",
    q3Correct: "効率化利益の配分根拠を開示し、再訓練と職務再設計を同時に実施する。"
  },
  {
    title: "都市交通と公共性",
    context: "移動弱者を含む交通計画",
    issue: "平均移動時間の短縮だけではアクセス格差を把握できない点",
    concept: "公平性",
    vocab: "補完",
    vocabChoices: ["不足部分を補って全体機能を高めること", "同一施策を繰り返すこと", "計画を撤回すること", "費用を無視すること", "規制を強化すること"],
    q1Wrong: "筆者は、高齢者や障害者の移動需要を例外として扱うべきだと述べる。",
    linked: "市営バス再編で幹線ルートは高速化したが、住宅地から病院への乗継回数が増え、通院負担が上昇した。\n\n別都市では、幹線高速化と同時に予約制の地域循環便を導入し、医療・福祉施設への接続を補完した。",
    q3Correct: "平均指標に加えてアクセス困難層の移動実態を測定し、補完交通を組み合わせる。"
  },
  {
    title: "国際協力と知識共有",
    context: "開発協力における技術移転の設計",
    issue: "成果物の提供だけでは現地の運用能力が自立しない点",
    concept: "共創",
    vocab: "冗長",
    vocabChoices: ["予備性を持たせ、失敗時の代替を確保すること", "不要な要素を完全に削ること", "評価を単純化すること", "費用を外部化すること", "規模を最小化すること"],
    q1Wrong: "筆者は、現地側の運用訓練を省いても持続性は保てると述べる。",
    linked: "浄水設備を寄贈した地域で、保守部品の調達網がなく、故障時に長期間停止した。\n\n別案件では、現地技術者が複数手順を学べる訓練計画と、地域企業を含む部品供給網を同時に整備した。",
    q3Correct: "設備提供と並行して運用訓練・供給網・代替手順を設計し、現地主体の維持管理を可能にする。"
  }
];

function createPassage(theme, setNo) {
  return [
    `　${theme.context}は、近年の政策議論で繰り返し取り上げられている。表面的には効率化や利便性の向上として語られるが、実際には制度の前提そのものを問い直す契機を含んでいる。第${setNo}セットでは、指標の読みやすさと社会的妥当性が必ずしも一致しない局面に注目する。`,
    `　第一に確認すべきは、成果の表示形式である。単一の数値は比較可能性を高める一方で、測定からこぼれ落ちる経験を不可視化しやすい。とりわけ${theme.issue}ため、評価基準が固定化されるほど、異なる立場の当事者は議論の入口から排除される危険がある。`,
    `　第二に、制度運用には時間軸の分析が必要である。短期成果が強調される局面では、失敗の学習や試行錯誤の記録が軽視され、現場は説明責任より即時的成果を優先しがちになる。しかし、この傾向は長期的には信頼の低下を招き、制度改訂のコストをむしろ増大させる。`,
    `　第三に、専門家と市民の役割分担を再整理する必要がある。専門知は高度な判断の基盤であるが、それが閉鎖的な言語体系にとどまれば、公共的意思決定の正統性は弱まる。したがって重要なのは、専門性を下げることではなく、検討過程を追跡可能な形で共有する設計である。`,
    `　この点で鍵となるのが${theme.concept}という観点である。制度が安定的に機能するためには、判断根拠、異論への応答、修正手順が相互に連結されていなければならない。つまり、結論の正しさだけでなく、結論に至る道筋の公開可能性こそが信頼形成の核心となる。`,
    `　以上を踏まえると、課題は『賛成か反対か』の二項対立ではない。むしろ、可視化される成果と可視化されにくい負担を同時に扱う制度設計へ移行できるかが問われる。本文は、その移行を支える実践として、比較可能なデータ、反証可能な記録、段階的改訂の仕組みを組み合わせる必要性を示している。`
  ];
}

function buildSet(index) {
  const theme = baseThemes[index % baseThemes.length];
  const setNo = index + 1;
  const day = String(30 - index).padStart(2, "0");

  return {
    id: setNo,
    title: `第${setNo}回　${theme.title}`,
    createdAt: `2026-03-${day}`,
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

const problemSets = Array.from({ length: 30 }, (_, index) => buildSet(index));

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
  setMetaEl.textContent = `作成日: ${currentSet.createdAt} ・ 難易度: ${currentSet.level}`;

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

render();
