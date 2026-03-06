import { useQuery } from '@tanstack/react-query';
import type { Post } from '../types/photo';
import { POSTS } from '../mocks/posts';

const BASE_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8080';

interface ApiResponse<T> {
	success: boolean;
	data: T;
}

async function getPosts(): Promise<Post[]> {
	const res = await fetch(`${BASE_URL}/api/posts`);
	if (!res.ok) throw new Error('게시글 로드 실패');
	const json: ApiResponse<Post[]> = await res.json();
	return json.data;
}

async function searchPosts(q: string): Promise<Post[]> {
	const params = new URLSearchParams({ q });
	const res = await fetch(`${BASE_URL}/api/posts/search?${params.toString()}`);
	if (!res.ok) throw new Error('검색 실패');
	const json: ApiResponse<Post[]> = await res.json();
	return json.data;
}

export function usePosts() {
	return useQuery<Post[]>({
		queryKey: ['posts'],
		queryFn: getPosts,
		placeholderData: POSTS,
		retry: false
	});
}

export function useSearchPosts(q: string) {
	return useQuery<Post[]>({
		queryKey: ['posts', 'search', q],
		queryFn: () => searchPosts(q),
		enabled: q.trim().length > 0,
		placeholderData: []
	});
}
