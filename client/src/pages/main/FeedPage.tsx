import { Helmet } from 'react-helmet-async';
import FeedCard from '../../components/portfolio/FeedCard';
import { usePosts } from '../../services/postsService';
import { PHOTOGRAPHER } from '../../mocks/photographer';
import { POSTS } from '../../mocks/posts';

export default function FeedPage() {
	const { data: posts = POSTS } = usePosts();

	return (
		<>
			<Helmet>
				<title>levgram</title>
				<meta name="description" content="사진작가 피드" />
			</Helmet>
			<main className="pt-60 min-h-svh pb-16">
				{posts.map(post => (
					<FeedCard key={post.id} post={post} photographer={PHOTOGRAPHER} />
				))}
			</main>
		</>
	);
}
