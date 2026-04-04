# JP233

問題データは 1 問題につき 1 つの JSON ファイルで管理します。

- 問題一覧は `data/problem-files.json` で管理します。
- 各問題は `data/problems/problem-001.json` のような個別ファイルに保存します。
- 各 JSON は 1 つの問題セットだけを持ち、本文・設問・解説を含みます。
- `script.js` は一覧ファイルを読んだあと、個別問題 JSON を読み込み、`createdAt` の新しい順に表示します。
- `file://` で直接開いた場合は `embedded-data.js` を使ってローカル確認できます。