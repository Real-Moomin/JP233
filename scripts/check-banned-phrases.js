const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const problemsDir = path.join(root, "data", "problems");
const bannedPhrases = ["本文は", "本文では"];
const fieldsToCheck = ["title", "prompt", "linked", "explanation"];
const questionKeys = ["q1", "q2", "q3", "q4", "q5"];
const quotedWordPattern = /「([^」]+)」/;

const hits = [];

for (const name of fs.readdirSync(problemsDir).filter((file) => file.endsWith(".json")).sort()) {
  const filePath = path.join(problemsDir, name);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  for (const phrase of bannedPhrases) {
    for (const paragraph of data.passage || []) {
      if (paragraph.includes(phrase)) {
        hits.push(`${name} passage: ${phrase}`);
      }
    }

    for (const key of questionKeys) {
      const question = data[key];
      if (!question) continue;

      for (const field of fieldsToCheck) {
        if (typeof question[field] === "string" && question[field].includes(phrase)) {
          hits.push(`${name} ${key}.${field}: ${phrase}`);
        }
      }

      for (const choice of question.choices || []) {
        if (choice.includes(phrase)) {
          hits.push(`${name} ${key}.choices: ${phrase}`);
        }
      }
    }
  }

  const q2Word = data.q2?.title?.match(quotedWordPattern)?.[1] || null;
  const q5Word = data.q5?.title?.match(quotedWordPattern)?.[1] || null;
  if (q2Word && q5Word && q2Word === q5Word) {
    hits.push(`${name} q2/q5 target overlap: ${q2Word}`);
  }
}

if (hits.length > 0) {
  console.error("Reading problem validation failed:");
  for (const hit of hits) {
    console.error(`- ${hit}`);
  }
  process.exit(1);
}

console.log("No banned phrases or q2/q5 target overlaps found in data/problems.");
