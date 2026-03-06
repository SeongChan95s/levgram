import type { Post } from '../types/photo';

const BASE_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8080';

interface ApiResponse<T> {
	success: boolean;
	data: T;
}

export async function getPosts(): Promise<Post[]> {
	const res = await fetch(`${BASE_URL}/api/posts`);
	if (!res.ok) throw new Error('게시글 로드 실패');
	const json: ApiResponse<Post[]> = await res.json();
	return json.data;
}

export async function searchPosts(q: string): Promise<Post[]> {
	const params = new URLSearchParams({ q });
	const res = await fetch(`${BASE_URL}/api/posts/search?${params.toString()}`);
	if (!res.ok) throw new Error('검색 실패');
	const json: ApiResponse<Post[]> = await res.json();
	return json.data;
}
