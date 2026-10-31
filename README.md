# Kaison Lab Blog

Astro로 만든 개발 일지 블로그. Cloudflare Pages에 배포한다.

## 글 쓰기

`src/content/blog/YYYY-MM-DD-slug.md` 파일 하나가 글 하나다.

```md
---
title: '글 제목'
description: '목록 카드와 메타 태그에 쓰이는 한 줄 요약'
pubDate: 2026-11-07
category: 일지        # 일지 · 출시 · 기술 · 마케팅 · 생각 (src/consts.ts의 CATEGORIES)
tags: [음성일기, 1인개발]
# heroImage: ../../assets/posts/2026-11-07-slug.png   # 표지. 없으면 카테고리 아이콘 표지가 쓰인다
# draft: true        # true면 빌드에서 빠진다 (dev 서버에서는 보임)
---

본문은 마크다운.
```

## 표지 이미지 만들기 (OpenAI 이미지 API)

1. `.env.example`을 복사해 `.env`를 만들고 `OPENAI_API_KEY`를 넣는다. `.env`는 git에 올라가지 않는다.
2. 글 파일명(slug)과 그릴 내용을 주면 `src/assets/posts/<slug>.png`로 저장된다.

```bash
npm run image -- --slug 2026-11-07-slug --prompt "퇴근길 지하철에서 이어폰을 끼고 혼잣말하는 사람"
```

3. 출력에 나오는 `heroImage:` 한 줄을 글 frontmatter에 붙인다.

- 공통 화풍은 `scripts/image-style.txt`에 있다. 바꾸면 이후 이미지에 모두 적용된다. `--no-style`로 끌 수 있다.
- 크기: `--size 1536x1024`(가로, 기본) · `1024x1536` · `1024x1024`, 품질: `--quality low|medium|high`.
- 본문 그림도 같은 방법으로 `--out src/assets/posts/파일명.png`에 만들고 마크다운에서 `![설명](../../assets/posts/파일명.png)`로 넣는다.

## 명령

```bash
npm run dev      # http://localhost:4321
npm run build    # dist/ 생성
npm run preview  # 빌드 결과 미리보기
```

## 설정

- 사이트 제목·설명·작성자·SNS 링크·히어로 문구·카테고리: `src/consts.ts`
- 배포 주소: `astro.config.mjs`의 `site`
- 색·폰트: `src/styles/global.css`의 `:root`. 기본은 밝은 테마, 어두운 대장간 테마는 헤더의 해/달 버튼(`data-theme="dark"`, localStorage에 기억)
- 홈 통계(총 방문자·총 포스팅·운영일·서비스 수)와 환영 문구: `src/consts.ts`의 `PROJECT_COUNT`, `WELCOME`. 총 방문자는 `GOATCOUNTER_CODE`에 GoatCounter 사이트 코드를 넣으면 자동으로 가져오고, 비어 있으면 `VISITOR_FALLBACK` 값을 보여준다
- 아이콘: `src/components/Icon.astro` (선 아이콘 모음. 카테고리 아이콘 이름은 `consts.ts`의 CATEGORIES에서 지정)
- 브랜드 이미지: `src/assets/brand/`, 파비콘·OG 기본 이미지: `public/`
- 디자인 백업: `../etc/design-backup/` (다크 원본, 밝은 종이 테마 시안)

## 배포 (Cloudflare Pages)

저장소: https://github.com/KaisonLab/blog (이 폴더가 저장소 루트)

1. Cloudflare 대시보드 → Workers & Pages → Create → Pages → Connect to Git → `KaisonLab/blog` 선택
2. 빌드 설정: Framework preset `Astro`, Build command `npm run build`, Build output `dist`, Root directory는 비워 둠
3. Custom domains에서 `blog.kaisonlab.com` 추가 (kaisonlab.com이 Cloudflare DNS에 있어 CNAME은 자동으로 생긴다)
4. 이후 main에 푸시할 때마다 자동 배포. 사이트 주소는 `astro.config.mjs`의 `site`와 `src/consts.ts`의 `SITE_URL`에 맞춰 둔다
