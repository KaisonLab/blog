#!/usr/bin/env node
/*
  OpenAI 이미지 API로 글 표지(또는 본문 그림)를 만든다.

  사용법
    npm run image -- --slug 2026-11-07-first-screen --prompt "퇴근길 지하철에서 이어폰을 끼고 혼잣말하는 사람"
    npm run image -- --out src/assets/posts/hero-x.png --prompt "..." --size 1536x1024 --no-style

  옵션
    --slug <글 파일명>   src/assets/posts/<slug>.png 로 저장하고, 글 frontmatter에 넣을 heroImage 경로를 알려 준다
    --out <경로>        저장 위치를 직접 지정
    --prompt <문장>     그릴 내용. 한국어로 써도 된다
    --size              1536x1024(가로, 기본) · 1024x1536(세로) · 1024x1024
    --quality           low · medium(기본) · high
    --no-style          scripts/image-style.txt 의 공통 스타일을 붙이지 않는다
    --model             기본 gpt-image-1

  준비
    .env 파일에 OPENAI_API_KEY=sk-... 한 줄. (.env는 git에 올라가지 않는다)
*/

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ---- .env 읽기 (의존성 없이) ----
function loadEnv() {
	const p = join(ROOT, '.env');
	if (!existsSync(p)) return;
	for (const line of readFileSync(p, 'utf8').split('\n')) {
		const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i);
		if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
	}
}
loadEnv();

// ---- 인자 파싱 ----
const args = process.argv.slice(2);
const opt = { size: '1536x1024', quality: 'medium', model: 'gpt-image-1', style: true };
for (let i = 0; i < args.length; i++) {
	const a = args[i];
	if (a === '--no-style') opt.style = false;
	else if (a.startsWith('--')) opt[a.slice(2)] = args[++i];
}

if (!opt.prompt) {
	console.error('--prompt 가 필요합니다. 예: npm run image -- --slug my-post --prompt "..."');
	process.exit(1);
}
if (!process.env.OPENAI_API_KEY) {
	console.error('OPENAI_API_KEY 가 없습니다. source/.env 파일에 OPENAI_API_KEY=sk-... 를 넣어 주세요.');
	process.exit(1);
}

const out = opt.out ? resolve(ROOT, opt.out) : join(ROOT, 'src/assets/posts', `${opt.slug ?? 'image-' + Date.now()}.png`);

// ---- 프롬프트 조립: 공통 스타일 + 요청 내용 ----
let prompt = opt.prompt;
if (opt.style) {
	const stylePath = join(ROOT, 'scripts/image-style.txt');
	if (existsSync(stylePath)) {
		const style = readFileSync(stylePath, 'utf8').trim();
		prompt = `${style}\n\nSubject: ${opt.prompt}`;
	}
}

console.log(`모델 ${opt.model} · ${opt.size} · ${opt.quality}`);
console.log(`저장 ${out}`);

const res = await fetch('https://api.openai.com/v1/images/generations', {
	method: 'POST',
	headers: {
		Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		model: opt.model,
		prompt,
		size: opt.size,
		quality: opt.quality,
		n: 1,
		output_format: 'png',
	}),
});

if (!res.ok) {
	console.error(`요청 실패 ${res.status}: ${await res.text()}`);
	process.exit(1);
}
const json = await res.json();
const b64 = json.data?.[0]?.b64_json;
if (!b64) {
	console.error('응답에 이미지가 없습니다:', JSON.stringify(json).slice(0, 300));
	process.exit(1);
}

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, Buffer.from(b64, 'base64'));
console.log('완료.');

if (opt.slug) {
	console.log(`\n글 frontmatter에 추가:\nheroImage: ../../assets/posts/${opt.slug}.png`);
}
