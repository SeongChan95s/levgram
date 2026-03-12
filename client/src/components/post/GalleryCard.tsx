import type { Post } from '@/types/post';
import IconGridRow2Col2 from '../common/Icon/IconGridRow2Col2';
import styles from './GalleryCard.module.scss';

interface GalleryCardProps {
	post: Post;
	onClick: (post: Post) => void;
}

export default function GalleryCard({ post, onClick }: GalleryCardProps) {
	return (
		<article key={post.id} className={styles.card} onClick={() => onClick(post)}>
			<div className={styles.imageWrap}>
				<img
					src={post.photos[0]}
					alt={post.title}
					loading="lazy"
					className={styles.image}
				/>
				{post.photos.length > 1 && (
					<span className={styles.multiIcon}>
						<IconGridRow2Col2 size="fill" />
					</span>
				)}
			</div>
			<span className={styles.model}>{post.model}</span>
		</article>
	);
}
