import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function HomePage() {
	// const result = fetch('/api/');

	return (
		<>
			<Helmet>
				<title>levgram</title>
				<meta name="description" content="설명" />
			</Helmet>
			<div className="home-page">
				<main>
					<div className="flex items-center">
						<h2 className="text-headline-1">홈 페이지</h2>
					</div>
					<Link to="/guide/common/component">가이드</Link>
				</main>
			</div>
		</>
	);
}
