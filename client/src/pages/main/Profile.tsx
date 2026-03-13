import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import PostDetailModal from '../../components/post/PostDetailModal';
import { getPosts } from '../../services/post';
import { PHOTOGRAPHER } from '../../mocks/photographer';
import type { Post } from '../../types/post';
import { useInfiniteScrollQuery } from '@/hooks/useInfiniteScroll';
import GalleryCard from '@/components/post/GalleryCard';
import Skeleton from '@/components/common/Skeleton/Skeleton';
import galleryCardStyles from '@/components/post/GalleryCard.module.scss';

export default function ProfilePage() {
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);

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
	const postAmount = posts ? posts.pages.reduce((acc, cur) => acc + cur.length, 0) : 0;

	return (
		<>
			<Helmet>
				<title>Profile - Levgram</title>
				<meta name="description" content="사진작가 포트폴리오 프로필" />
			</Helmet>
			<main className="profile-page">
				<h2 className="hidden">프로필 페이지</h2>
				<section className="overview-section px-(--inner) pt-12 pb-16 border-b border-gray-100">
					<header className="overview-section-header flex gap-24 items-center mb-14">
						<div className="profile-img flex-none w-80 h-80 rounded-full">
							<img
								className="w-full h-full rounded-full object-cover bg-gray-100"
								src={PHOTOGRAPHER.avatar}
								alt={PHOTOGRAPHER.name}
							/>
						</div>

						<div className="profile-stats-area flex flex-1 justify-around">
							<div className="flex flex-col items-center gap-2">
								<span className="text-headline-4 text-gray-900">{postAmount}</span>
								<span className="text-label-3 text-gray-500">게시물</span>
							</div>
							<div className="flex flex-col items-center gap-2">
								<span className="text-headline-4 text-gray-900">
									{PHOTOGRAPHER.followers}
								</span>
								<span className="text-label-3 text-gray-500">방문자수</span>
							</div>
							<div className="flex flex-col items-center gap-2">
								<span className="text-headline-4 text-gray-900">
									{PHOTOGRAPHER.following}
								</span>
								<span className="text-label-3 text-gray-500">좋아요수</span>
							</div>
						</div>
					</header>

					<div className="profile-body flex flex-col gap-3">
						<div className="name-wrap flex items-baseline gap-8">
							<span className="name text-body-2 font-medium text-gray-900">
								{PHOTOGRAPHER.name}
							</span>
							<span className="role text-label-2 font-normal text-gray-500">
								{PHOTOGRAPHER.role}
							</span>
						</div>
						<p className="bio mt-8 text-body-3 text-gray-700 whitespace-pre-line">
							{PHOTOGRAPHER.bio}
						</p>
					</div>
				</section>

				<section className="gallery columns-3 gap-2 p-2">
					{posts &&
						posts.pages.map(page => {
							return page.map(post => (
								<GalleryCard key={post.id} post={post} onClick={setSelectedPost} />
							));
						})}

					{isFetching && (
						<>
							<Skeleton className="h-180 mb-2" variant="rect" />
							<Skeleton className="h-60 mb-2" variant="rect" />
						</>
					)}

					<div ref={infiniteLoaderRef}></div>
				</section>
			</main>

			<PostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
		</>
	);
}
