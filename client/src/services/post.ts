import { objectToQueryString } from '@/utils/convert/objectToQueryString';
import type { Post } from '../types/photo';
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

export async function searchPosts(q: string): Promise<Post[]> {
	const params = new URLSearchParams({ q });
	const res = await fetch(`${BASE_URL}/api/posts/search?${params.toString()}`);
	const result: FetchResponse<Post[]> = await res.json();
	if (!res.ok || !result.success) throw new Error('검색 실패');
	return result.data;
}
