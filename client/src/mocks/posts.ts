import type { Post } from '../types/photo';

export const POSTS: Post[] = [
	{
		id: 1,
		photos: [
			'https://picsum.photos/seed/p01a/800/1200',
			'https://picsum.photos/seed/p01b/800/1200',
			'https://picsum.photos/seed/p01c/800/1200'
		],
		title: 'Morning Light',
		model: 'Yuna K.',
		description: '이른 아침, 빛이 세상에 처음 닿는 순간을 담았습니다.',
		date: '2026.01.15',
		location: 'Seoul, Korea',
		tags: ['portrait', 'morning', 'light']
	},
	{
		id: 2,
		photos: [
			'https://picsum.photos/seed/p02a/800/1200',
			'https://picsum.photos/seed/p02b/800/1200'
		],
		title: 'Golden Hour',
		model: 'Sora L.',
		description: '황금빛 노을이 물드는 시간.',
		date: '2026.01.22',
		location: 'Busan, Korea',
		tags: ['golden', 'sunset', 'portrait']
	},
	{
		id: 3,
		photos: ['https://picsum.photos/seed/p03a/800/1200'],
		title: 'Silence',
		model: 'Mina J.',
		description: '고요함 속에 담긴 이야기.',
		date: '2026.02.03',
		location: 'Jeju, Korea',
		tags: ['silence', 'jeju', 'nature']
	},
	{
		id: 4,
		photos: [
			'https://picsum.photos/seed/p04a/800/1200',
			'https://picsum.photos/seed/p04b/800/1200',
			'https://picsum.photos/seed/p04c/800/1200',
			'https://picsum.photos/seed/p04d/800/1200'
		],
		title: 'Urban Flow',
		model: 'Hana P.',
		description: '도시의 흐름 속에서 발견한 아름다움.',
		date: '2026.02.10',
		location: 'Seoul, Korea',
		tags: ['street', 'urban', 'city']
	},
	{
		id: 5,
		photos: [
			'https://picsum.photos/seed/p05a/800/1200',
			'https://picsum.photos/seed/p05b/800/1200'
		],
		title: 'Soft Grain',
		model: 'Rina C.',
		description: '필름 감성이 살아있는 포트레이트.',
		date: '2026.02.18',
		tags: ['film', 'grain', 'portrait']
	},
	{
		id: 6,
		photos: ['https://picsum.photos/seed/p06a/800/1200'],
		title: 'Bloom',
		model: 'Eunbi S.',
		description: '꽃이 피어나는 계절.',
		date: '2026.02.25',
		location: 'Gyeongju, Korea',
		tags: ['bloom', 'spring', 'flower']
	},
	{
		id: 7,
		photos: [
			'https://picsum.photos/seed/p07a/800/1200',
			'https://picsum.photos/seed/p07b/800/1200',
			'https://picsum.photos/seed/p07c/800/1200'
		],
		title: 'Dusk',
		model: 'Jiyeon K.',
		date: '2026.03.01',
		location: 'Incheon, Korea',
		tags: ['dusk', 'evening', 'port']
	},
	{
		id: 8,
		photos: ['https://picsum.photos/seed/p08a/800/1200'],
		title: 'Shadow Play',
		model: 'Nara O.',
		description: '빛과 그림자의 유희.',
		date: '2026.03.05',
		location: 'Seoul, Korea',
		tags: ['shadow', 'light', 'abstract']
	},
	{
		id: 9,
		photos: [
			'https://picsum.photos/seed/p09a/800/1200',
			'https://picsum.photos/seed/p09b/800/1200'
		],
		title: 'Reverie',
		model: 'Dahye M.',
		description: '몽상, 그 사이 어딘가.',
		date: '2026.03.08',
		tags: ['dream', 'soft', 'portrait']
	},
	{
		id: 10,
		photos: ['https://picsum.photos/seed/p10a/800/1200'],
		title: 'Wanderer',
		model: 'Soyeon B.',
		date: '2026.03.10',
		location: 'Sokcho, Korea',
		tags: ['travel', 'landscape', 'wanderer']
	},
	{
		id: 11,
		photos: [
			'https://picsum.photos/seed/p11a/800/1200',
			'https://picsum.photos/seed/p11b/800/1200',
			'https://picsum.photos/seed/p11c/800/1200'
		],
		title: 'Haze',
		model: 'Yujin A.',
		description: '안개 속에 녹아든 순간.',
		date: '2026.03.12',
		location: 'Namhae, Korea',
		tags: ['fog', 'haze', 'moody']
	},
	{
		id: 12,
		photos: ['https://picsum.photos/seed/p12a/800/1200'],
		title: 'Pure',
		model: 'Chaeyeon W.',
		description: '순수함, 그 자체.',
		date: '2026.03.15',
		location: 'Seoul, Korea',
		tags: ['pure', 'minimal', 'portrait']
	}
];
