import { Helmet } from 'react-helmet-async';
import FeedCard from '../../components/post/FeedCard';
import { getPosts } from '../../services/post';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInfiniteScrollQuery } from '@/hooks/useInfiniteScroll';

export default function HomePage() {
	const {
		data: posts,
		isPending,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage
	} = useInfiniteQuery({
		queryFn: async ({ pageParam: skip }) => getPosts({ limit: 2, skip }),
		queryKey: ['posts'],
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.length < 2) {
				return undefined;
			}
			return pages.length * 2;
		}
	});
	const infiniteLoaderRef = useInfiniteScrollQuery({
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage
	});

	return (
		<>
			<Helmet>
				<title>Home - Levgram</title>
				<meta name="description" content="사진작가 피드" />
			</Helmet>
			<main className="home-page">
				{posts &&
					posts.pages.map(page => {
						return page.map(post => <FeedCard key={post.id} post={post} />);
					})}

				{isPending && <div>데이터를 가져오는중...</div>}
				<div ref={infiniteLoaderRef}></div>
			</main>
		</>
	);
}
