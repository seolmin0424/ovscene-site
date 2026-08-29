# OVSCENE 오브씬 — 웹사이트

1인 가구를 위한 취향 기반 리빙 큐레이션 브랜드 콘셉트 사이트.
테마(모던 · 빈티지 · 키치 · 에코 · 메탈릭) 하나를 고르면 오브제 구성은 무작위로 채워진다는
브랜드 핵심 개념을 실제로 눌러볼 수 있게 만든 정적 사이트입니다.

## 구조

```
ovscene-site/
├── index.html          한 페이지 전체 (섹션 앵커로 이동)
├── assets/
│   ├── styles.css      디자인 토큰 · 레이아웃 · 반응형
│   ├── app.js          테마 데이터, 랜덤 추첨, 오브제 SVG 생성, 장바구니
│   ├── favicon.svg     로고 심볼
│   └── og.svg          공유용 미리보기 이미지
├── 404.html
└── .nojekyll           GitHub Pages에서 assets 폴더를 그대로 서빙
```

빌드 도구가 필요 없습니다. `index.html`을 브라우저로 열면 그대로 동작합니다.

## 수정하기 쉬운 곳

| 무엇을 | 어디서 |
|---|---|
| 테마 5종 이름·색·설명 | `assets/app.js`의 `THEMES` 배열 |
| 판매 팩 이름·가격·구성 풀 | `assets/app.js`의 `PACKS` 배열 |
| 오브제 종류 이름 | `assets/app.js`의 `NAMES` 객체 |
| 브랜드 색 · 우드 톤 | `assets/styles.css` 상단 `:root` 변수 |
| 문구 · FAQ · 푸터 | `index.html` |

실제 제품 사진이 생기면 `assets/app.js`의 `scene()` 함수가 만드는 SVG 자리를
`<img>` 태그로 바꾸면 됩니다.

## 배포

정적 파일만 있으므로 어떤 호스팅에도 올릴 수 있습니다.

**GitHub Pages**

```
git remote add origin https://github.com/<사용자명>/ovscene-site.git
git branch -M main
git push -u origin main
```

푸시한 뒤 저장소 → Settings → Pages → Source를 `main` / `root`로 지정하면
`https://<사용자명>.github.io/ovscene-site/` 로 열립니다.

**Netlify Drop** — <https://app.netlify.com/drop> 에 `ovscene-site` 폴더를 그대로 끌어다 놓으면
바로 주소가 발급됩니다. 계정 없이도 임시 주소를 받을 수 있습니다.

**Vercel** — <https://vercel.com/new> 에서 이 저장소를 불러오면 설정 없이 배포됩니다.

## 참고

결제·회원가입·메일 발송은 실제로 동작하지 않는 데모입니다.
장바구니 내용은 브라우저의 localStorage에만 저장되며 서버로 전송되지 않습니다.
실제 판매를 하려면 결제 PG 연동과 사업자 정보 표기(전자상거래법상 필수)가 추가로 필요합니다.
