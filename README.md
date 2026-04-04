# JP233

문제 데이터는 `data/*.json` 파일로 분할 관리합니다.

- `data/humanities.json`: 철학, 미학, 사회학, 지리학, 세계사
- `data/science.json`: 의학, 수학, 생물학, 화학, 물리학
- `data/tech-social.json`: 기술, 경영학, 경제학, 기술사회

`script.js`는 위 파일들을 병렬 로드한 뒤 `createdAt` 기준 최신순으로 정렬해 사이드바에 표시합니다.
