import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import FeedCard from '../../components/portfolio/FeedCard';
import { getPosts } from '../../services/post';
import { PHOTOGRAPHER } from '../../mocks/photographer';
import { POSTS } from '../../mocks/posts';
import type { Post } from '../../types/photo';

export default function HomePage() {
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
				<meta name="description" content="사진작가 피드" />
			</Helmet>
			<main className="pt-60 min-h-svh pb-16">
				{posts.map(post => (
					<FeedCard key={post.id} post={post} />
				))}
			</main>
		</>
	);
}
