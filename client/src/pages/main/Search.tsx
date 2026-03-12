import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import PostDetailModal from '../../components/post/PostDetailModal';
import GalleryCard from '../../components/post/GalleryCard';
import { getPosts, searchPosts } from '../../services/post';
import { useInfiniteScrollQuery } from '@/hooks/useInfiniteScroll';
import type { Post } from '../../types/post';
import { IconButton } from '@/components/common/IconButton';
import { IconGridCol1Filled, IconGridCol2, IconGridCol3 } from '@/components/common/Icon';
import { TextField } from '@/components/common/TextField';

const LIMIT = 12;

type ColCount = 1 | 2 | 3;

const colsClassMap: Record<ColCount, string> = {
	1: 'columns-1',
	2: 'columns-2',
	3: 'columns-3'
};

export default function SearchPage() {
	const [query, setQuery] = useState('');
	const [submittedQuery, setSubmittedQuery] = useState('');
	const [cols, setCols] = useState<ColCount>(3);
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);

	const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
		queryKey: ['posts', 'search', submittedQuery],
		queryFn: ({ pageParam: skip }) =>
			submittedQuery.trim()
				? searchPosts({ q: submittedQuery, limit: LIMIT, skip })
				: getPosts({ limit: LIMIT, skip }),
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.length < LIMIT) return undefined;
			return pages.length * LIMIT;
		}
	});

	const infiniteLoaderRef = useInfiniteScrollQuery({
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage
	});

	function handleSearch(e: React.FormEvent) {
		e.preventDefault();
		setSubmittedQuery(query);
	}

	return (
		<>
			<Helmet>
				<title>Search - Levgram</title>
			</Helmet>
			<main className="search-page">
				<form
					onSubmit={handleSearch}
					className="sticky top-(--nav-bar-height) z-10 bg-white border-b border-gray-100 px-(--inner) flex items-center gap-12">
					<TextField
						className="flex-1"
						value={query}
						onChange={e => setQuery(e.target.value)}
						placeholder="제목, 모델명으로 검색..."
					/>

					<div className="flex items-center gap-6 ">
						<IconButton
							className="w-28 h-28 p-2 border border-gray-200 rounded"
							icon={<IconGridCol1Filled />}
							onClick={() => setCols(1)}
						/>
						<IconButton
							className="w-28 h-28 p-2 border border-gray-200 rounded"
							icon={<IconGridCol2 />}
							onClick={() => setCols(2)}
						/>
						<IconButton
							className="w-28 h-28 p-2 border border-gray-200 rounded"
							icon={<IconGridCol3 />}
							onClick={() => setCols(3)}
						/>
					</div>
				</form>

				{/* 갤러리 */}
				<section className={`${colsClassMap[cols]} gap-2 p-2`}>
					{data?.pages.map(page =>
						page.map(post => (
							<GalleryCard key={post.id} post={post} onClick={setSelectedPost} />
						))
					)}
				</section>
				<div ref={infiniteLoaderRef} />
			</main>

			<PostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
		</>
	);
}
