// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// 배포 주소. Cloudflare Pages 기본 주소(xxx.pages.dev)가 나오면 여기와 consts.ts의 SITE_URL을 바꾼다.
export default defineConfig({
	site: 'https://blog.kaisonlab.com',
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			theme: 'vitesse-dark',
			wrap: true,
		},
	},
});
