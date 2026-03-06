import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import PostDetailModal from '../../components/portfolio/PostDetailModal';
import IconGridRow2Col2 from '../../components/common/Icon/IconGridRow2Col2';
import { getPosts } from '../../services/post';
import { PHOTOGRAPHER } from '../../mocks/photographer';
import { POSTS } from '../../mocks/posts';
import type { Post } from '../../types/photo';

export default function ProfilePage() {
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);
	const { data: posts = POSTS } = useQuery<Post[]>({
		queryKey: ['posts'],
		queryFn: getPosts,
		placeholderData: POSTS,
		retry: false
	});

	return (
		<>
			<Helmet>
				<title>levgram</title>
				<meta name="description" content="사진작가 포트폴리오" />
			</Helmet>
			<main className="pt-60 min-h-svh">
				{/* 프로필 섹션 */}
				<section className="px-(--inner) pt-20 pb-16 border-b border-gray-100">
					{/* 아바타 + 통계 */}
					<div className="flex items-center mb-14">
						{/* 아바타 - 인스타그램 그라디언트 링 */}
						<div
							className="flex-none w-80 h-80 rounded-full p-3 mr-40"
							style={{
								background:
									'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)'
							}}>
							<img
								className="w-full h-full rounded-full object-cover bg-gray-100"
								src={PHOTOGRAPHER.avatar}
								alt={PHOTOGRAPHER.name}
							/>
						</div>
						{/* 통계 3열 */}
						<div className="flex flex-1 justify-around">
							<div className="flex flex-col items-center gap-2">
								<span className="text-headline-4 text-gray-900">{posts.length}</span>
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
					</div>
					{/* 프로필 정보 */}
					<div className="flex flex-col gap-3">
						<span className="text-label-1 text-gray-900">{PHOTOGRAPHER.name}</span>
						<span className="text-label-3 text-gray-500">{PHOTOGRAPHER.role}</span>
						<p className="mt-8 text-body-3 text-gray-700 whitespace-pre-line">
							{PHOTOGRAPHER.bio}
						</p>
					</div>
				</section>

				{/* 갤러리 그리드 */}
				<section className="grid grid-cols-3 gap-2">
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
							<p className="text-label-4 px-6 py-4 text-gray-700 flex items-center overflow-hidden">
								<span className="truncate flex-1 min-w-0">{post.title}</span>
								<span className="flex-none mx-4 text-gray-300">·</span>
								<span className="flex-none text-gray-500 max-w-[40%] truncate">
									{post.model}
								</span>
							</p>
						</article>
					))}
				</section>
			</main>

			<PostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
		</>
	);
}
