import { Helmet } from 'react-helmet-async';
import FeedCard from '../../components/post/FeedCard';
import { getPosts } from '../../services/post';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInfiniteScrollQuery } from '@/hooks/useInfiniteScroll';
import Skeleton from '@/components/common/Skeleton/Skeleton';

export default function HomePage() {
	const {
		data: posts,
		isFetching,
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

				{isFetching && (
					<>
						<article className="border-b border-gray-100">
							<div className="relative aspect-4/5 overflow-hidden">
								<Skeleton variant="rect" fill />
							</div>
							<div className="flex flex-col gap-4 px-(--inner) pt-16 pb-32">
								<div className="flex items-baseline gap-4 overflow-hidden">
									<Skeleton variant="text" className="flex-1 min-w-0" />
									<Skeleton
										variant="text"
										width="80px"
										className="shrink-0 max-w-[40%]"
									/>
								</div>
								<Skeleton variant="text" fontSize="var(--text-body-3)" />
								<Skeleton variant="text" width="120px" fontSize="var(--text-label-4)" />
							</div>
						</article>
						<article className="border-b border-gray-100">
							<div className="relative aspect-4/5 overflow-hidden">
								<Skeleton variant="rect" fill />
							</div>
							<div className="flex flex-col gap-4 px-(--inner) pt-16 pb-32">
								<div className="flex items-baseline gap-4 overflow-hidden">
									<Skeleton variant="text" className="flex-1 min-w-0" />
									<Skeleton
										variant="text"
										width="80px"
										className="shrink-0 max-w-[40%]"
									/>
								</div>
								<Skeleton variant="text" fontSize="var(--text-body-3)" />
								<Skeleton variant="text" width="120px" fontSize="var(--text-label-4)" />
							</div>
						</article>
					</>
				)}

				<div ref={infiniteLoaderRef}></div>
			</main>
		</>
	);
}
