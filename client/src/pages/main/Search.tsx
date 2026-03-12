import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import PostDetailModal from '../../components/post/PostDetailModal';
import IconGridRow2Col2 from '../../components/common/Icon/IconGridRow2Col2';
import { getPosts, searchPosts } from '../../services/post';
import { useDebounce } from '../../hooks/useDebounce';
import { POSTS } from '../../mocks/posts';
import type { Post } from '../../types/photo';

type ColCount = 1 | 2 | 3;

const colsClassMap: Record<ColCount, string> = {
	1: 'grid-cols-1',
	2: 'grid-cols-2',
	3: 'grid-cols-3'
};

export default function SearchPage() {
	const [query, setQuery] = useState('');
	const [cols, setCols] = useState<ColCount>(3);
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);

	const debouncedQuery = useDebounce(query, 300);

	const { data: allPosts = POSTS } = useQuery<Post[]>({
		queryKey: ['posts'],
		queryFn: () => getPosts({}),
		placeholderData: POSTS,
		retry: false
	});
	const { data: searchedPosts = [] } = useQuery<Post[]>({
		queryKey: ['posts', 'search', debouncedQuery],
		queryFn: () => searchPosts(debouncedQuery),
		enabled: debouncedQuery.trim().length > 0,
		placeholderData: []
	});

	const posts = debouncedQuery.trim() ? searchedPosts : allPosts;

	return (
		<>
			<Helmet>
				<title>Search - Levgram</title>
			</Helmet>
			<main className="search-page">
				{/* sticky 검색바 */}
				<div className="sticky top-(--nav-bar-height) z-10 bg-white border-b border-gray-100 px-(--inner) py-8 flex items-center gap-8">
					<input
						type="search"
						value={query}
						onChange={e => setQuery(e.target.value)}
						placeholder="제목, 모델명으로 검색..."
						className="flex-1 bg-gray-100 rounded-lg px-12 py-6 text-body-3 text-gray-900 outline-none placeholder:text-gray-400"
					/>
					{/* 열 수 토글 */}
					<div className="flex items-center gap-4 shrink-0">
						{([1, 2, 3] as ColCount[]).map(n => (
							<button
								key={n}
								onClick={() => setCols(n)}
								className={`w-28 h-28 flex items-center justify-center rounded text-label-3 font-semibold transition-colors ${
									cols === n ? 'text-gray-900' : 'text-gray-400'
								}`}
								aria-label={`${n}열 보기`}>
								{n}
							</button>
						))}
					</div>
				</div>

				{/* 갤러리 그리드 */}
				<section className={`grid gap-0.5 ${colsClassMap[cols]}`}>
					{posts.map(post => (
						<article
							key={post.id}
							className="cursor-pointer overflow-hidden relative group"
							onClick={() => setSelectedPost(post)}>
							<div className="aspect-2/3 overflow-hidden relative">
								<img
									src={post.photos[0]}
									alt={post.title}
									loading="lazy"
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
								/>
								{post.photos.length > 1 && (
									<span
										className="absolute top-6 right-6 text-white"
										style={{
											filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))'
										}}>
										<IconGridRow2Col2 />
									</span>
								)}
							</div>
							{cols === 1 && (
								<p className="text-label-4 px-6 py-4 text-gray-700 flex items-center overflow-hidden">
									<span className="truncate flex-1 min-w-0">{post.title}</span>
									<span className="flex-none mx-4 text-gray-300">·</span>
									<span className="flex-none text-gray-500 max-w-[40%] truncate">
										{post.model}
									</span>
								</p>
							)}
						</article>
					))}
				</section>
			</main>

			<PostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
		</>
	);
}
