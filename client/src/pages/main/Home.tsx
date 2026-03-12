import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import FeedCard from '../../components/portfolio/FeedCard';
import { getPosts } from '../../services/post';
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
				<title>Home - Levgram</title>
				<meta name="description" content="사진작가 피드" />
			</Helmet>
			<main className="home-page">
				{posts.map(post => (
					<FeedCard key={post.id} post={post} />
				))}
			</main>
		</>
	);
}
