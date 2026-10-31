import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// src/content/blog/ 아래 .md / .mdx 파일 하나가 글 하나
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// 카테고리는 consts.ts의 CATEGORIES 키 중 하나
			category: z.string().default('일지'),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
