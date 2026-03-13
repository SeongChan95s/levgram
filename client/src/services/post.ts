import { objectToQueryString } from '@/utils/convert/objectToQueryString';
import type { Post } from '../types/post';
import type { FetchResponse } from '@/types';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

interface GetPostsParams {
	limit?: number;
	skip?: number;
}

export async function getPosts({ limit, skip }: GetPostsParams): Promise<Post[]> {
	const params = objectToQueryString({ limit, skip });
	const res = await fetch(`${BASE_URL}/api/posts/getPosts?${params}`);
	const result: FetchResponse<Post[]> = await res.json();
	if (!res.ok || !result.success) throw new Error('게시글 불러오기 실패');
	return result.data;
}

interface SearchPostsParams {
	q: string;
	limit?: number;
	skip?: number;
}

export async function searchPosts({
	q,
	limit,
	skip
}: SearchPostsParams): Promise<Post[]> {
	const params = objectToQueryString({ q, limit, skip });
	const res = await fetch(`${BASE_URL}/api/posts/search?${params}`);
	const result: FetchResponse<Post[]> = await res.json();
	if (!res.ok || !result.success) throw new Error('검색 실패');
	return result.data;
}

export async function getPost(id: string): Promise<Post> {
	const res = await fetch(`${BASE_URL}/api/posts/${id}`);
	const result: FetchResponse<Post> = await res.json();
	if (!res.ok || !result.success) throw new Error('게시글 불러오기 실패');
	return result.data;
}

export async function deletePost(id: string, token: string): Promise<void> {
	const res = await fetch(`${BASE_URL}/api/posts/${id}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${token}` }
	});
	const result: FetchResponse = await res.json();
	if (!res.ok || !result.success) throw new Error('삭제 실패');
}

export async function updatePost(
	id: string,
	formData: FormData,
	token: string
): Promise<Post> {
	const res = await fetch(`${BASE_URL}/api/posts/${id}`, {
		method: 'PUT',
		headers: { Authorization: `Bearer ${token}` },
		body: formData
	});
	const result: FetchResponse<Post> = await res.json();
	if (!res.ok || !result.success) throw new Error('수정 실패');
	return result.data;
}
