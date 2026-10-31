// 사이트 전역 설정. 여기만 바꾸면 헤더·푸터·RSS·메타에 모두 반영된다.

export const SITE_TITLE = 'Kaison Lab';
export const SITE_TAGLINE = '행동하고, 기록한다.';
export const SITE_DESCRIPTION =
	'생각만 하던 것을 행동으로 옮기고, 그 경험을 있는 그대로 기록하는 개발자의 일지.';
export const SITE_URL = 'https://kaisonlab.com';

export const AUTHOR = {
	name: 'Kaison',
	role: '1인 개발자',
	bio: '퇴근 후 시간에 작은 서비스를 직접 만들고, 그 과정에서 겪고 배운 것을 있는 그대로 나눕니다.',
};

export const SOCIAL = {
	github: 'https://github.com/KaisonLab',
	threads: 'https://www.threads.com/@kaisonlab',
	home: 'https://kaisonlab.com',
};

// 홈 히어로에서 타이핑되는 문구. {중괄호}로 감싼 부분은 금색으로 강조된다.
export const HERO_LINES = [
	'Hello World! {Do} it first.',
	'Then {write} it down.',
	'Experience over {plans}.',
];
export const HERO_QUOTE = '계획보다 먼저 해 보고, 해 본 것을 남깁니다.';

// 홈 통계 섹션. 글 수와 운영일은 글 데이터에서 자동 계산된다.
export const BLOG_START_DATE = new Date('2026-10-31');
export const PROJECT_COUNT = 1;
// 총 방문자: GoatCounter 사이트 코드(예: 'kaisonlab' → kaisonlab.goatcounter.com)를 넣으면
// 공개 카운터 API에서 자동으로 가져온다. 비워 두면 VISITOR_FALLBACK을 보여준다.
export const GOATCOUNTER_CODE = '';
export const VISITOR_FALLBACK = 0;
export const WELCOME = {
	title: '여러분의 방문을 {진심으로 환영}합니다',
	desc: '생각만 하던 것을 직접 만들어 보고, 그 과정에서 배운 것을 나누는 개발자의 블로그입니다. 잘된 시도만큼 실패한 시도도 자세히 다룹니다.',
};

// 카테고리별 아이콘(Icon.astro의 이름)과 설명. 글의 category 값과 이름이 같아야 한다.
export const CATEGORIES: Record<string, { icon: string; desc: string }> = {
	일지: { icon: 'notebook', desc: '만드는 과정의 진행 기록' },
	출시: { icon: 'rocket', desc: '출시 회고와 전후 비교' },
	기술: { icon: 'wrench', desc: '기술을 고른 이유와 문제 해결 과정' },
	마케팅: { icon: 'megaphone', desc: '서비스를 알리고 사용자와 이야기한 기록' },
	생각: { icon: 'bulb', desc: 'AI 시대의 1인 개발에 대한 생각' },
};
