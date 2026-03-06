import MySwiperMain from '../common/Swiper/MySwiperMain';
import type { Post } from '../../types/photo';
import styles from './FeedCard.module.scss';

interface Photographer {
	name: string;
	avatar: string;
}

interface FeedCardProps {
	post: Post;
	photographer: Photographer;
}

export default function FeedCard({ post, photographer }: FeedCardProps) {
	return (
		<article className={styles.card}>
			{/* 상단: 아바타 + 사진작가명 */}
			<div className={styles.header}>
				<img
					className={styles.avatar}
					src={photographer.avatar}
					alt={photographer.name}
				/>
				<span className={styles.authorName}>{photographer.name}</span>
			</div>

			{/* 중앙: 사진 */}
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

			{/* 하단: 정보 */}
			<div className={styles.info}>
				<div className={styles.titleRow}>
					<span className={styles.title}>{post.title}</span>
					<span className={styles.dot}>·</span>
					<span className={styles.model}>{post.model}</span>
				</div>
				{post.description && (
					<p className={styles.description}>{post.description}</p>
				)}
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
