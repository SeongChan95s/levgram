import MySwiperMain from '../common/Swiper/MySwiperMain';
import { IconButton } from '../common/IconButton';
import { IconEdit } from '../common/Icon';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../../store/adminStore';
import type { Post } from '../../types/post';
import styles from './FeedCard.module.scss';

interface FeedCardProps {
	post: Post;
}

export default function FeedCard({ post }: FeedCardProps) {
	const navigate = useNavigate();
	const isAdmin = useAdminStore(s => s.isAdmin);

	return (
		<article className={styles.card}>
			<div className={styles.photoArea}>
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
				{isAdmin && (
					<IconButton
						className={styles.editButton}
						icon={<IconEdit />}
						size="md"
						onClick={() => navigate(`/detail/${post.id}`)}
					/>
				)}
			</div>

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
