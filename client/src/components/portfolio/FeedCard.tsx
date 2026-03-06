import MySwiperMain from '../common/Swiper/MySwiperMain';
import type { Post } from '../../types/photo';
import styles from './FeedCard.module.scss';

interface FeedCardProps {
	post: Post;
}

export default function FeedCard({ post }: FeedCardProps) {
	return (
		<article className={styles.card}>
			{post.photos.length > 1 ? (
				<div className={styles.swiperFill}>
					<MySwiperMain variant="cardPerView" slidesPerView={1} spaceBetween={0}>
						{post.photos.map((src, i) => (
							<img key={i} src={src} alt={post.title} loading="lazy" />
						))}
					</MySwiperMain>
				</div>
			) : (
				<div className={styles.photoWrap}>
					<img src={post.photos[0]} alt={post.title} loading="lazy" />
				</div>
			)}

			<div className={styles.container}>
				<header className={styles.titleRow}>
					<span className={styles.title}>{post.title}</span>
					<span className={styles.model}>
						<span>Model.</span>
						{post.model}
					</span>
				</header>
				{post.description && <p className={styles.description}>{post.description}</p>}
				{(post.date || post.location) && (
					<p className={styles.meta}>
						{post.date && <span>{post.date}</span>}
						{post.date && post.location && <span>·</span>}
						{post.location && <span>{post.location}</span>}
					</p>
				)}
			</div>
		</article>
	);
}
