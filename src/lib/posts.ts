import { type CollectionEntry, getCollection } from 'astro:content';

/** draft가 아닌 글을 최신순으로 */
export async function getPosts(): Promise<CollectionEntry<'blog'>[]> {
	const all = await getCollection('blog', ({ data }) => !data.draft || import.meta.env.DEV);
	return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** 한국어 기준 대략적인 읽기 시간(분). 분당 500자 */
export function readingMinutes(body: string | undefined): number {
	const chars = (body ?? '').replace(/\s+/g, '').length;
	return Math.max(1, Math.round(chars / 500));
}

/** 카테고리별 글 수 */
export function countBy(posts: CollectionEntry<'blog'>[], key: 'category' | 'tags') {
	const map = new Map<string, number>();
	for (const p of posts) {
		const values = key === 'tags' ? p.data.tags : [p.data.category];
		for (const v of values) map.set(v, (map.get(v) ?? 0) + 1);
	}
	return [...map.entries()].sort((a, b) => b[1] - a[1]);
}
