import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../common/Modal';
import { IconClose, IconEdit } from '../common/Icon';
import { IconButton } from '../common/IconButton';
import { useAdminStore } from '../../store/adminStore';
import type { Post } from '../../types/post';
import styles from './PostDetailModal.module.scss';

interface PostDetailModalProps {
	post: Post | null;
	onClose: () => void;
}

export default function PostDetailModal({ post, onClose }: PostDetailModalProps) {
	const [displayPost, setDisplayPost] = useState<Post | null>(null);
	const navigate = useNavigate();
	const isAdmin = useAdminStore(s => s.isAdmin);

	useEffect(() => {
		if (post !== null) {
			setDisplayPost(post);
		}
	}, [post]);

	return (
		<Modal visible={post !== null} className={styles.postDetailModal}>
			<div className={styles.header}>
				{isAdmin && displayPost && (
					<IconButton
						className={styles.editButton}
						icon={<IconEdit />}
						size="md"
						onClick={() => {
							onClose();
							navigate(`/detail/${displayPost.id}`);
						}}
					/>
				)}
				<IconButton
					className={styles.closeButton}
					icon={<IconClose />}
					size="md"
					onClick={onClose}
				/>
			</div>

			<div className={styles.info}>
				<div className={styles.titleRow}>
					<span className={styles.title}>{displayPost?.title}</span>
					<span className={styles.dot}>·</span>
					<span className={styles.model}>{displayPost?.model}</span>
				</div>
				{displayPost?.description && (
					<p className={styles.description}>{displayPost.description}</p>
				)}
				{(displayPost?.date || displayPost?.location) && (
					<p className={styles.meta}>
						{displayPost.date && <span>{displayPost.date}</span>}
						{displayPost.date && displayPost.location && (
							<span className={styles.metaDot}>·</span>
						)}
						{displayPost.location && <span>{displayPost.location}</span>}
					</p>
				)}
			</div>

			<div className={styles.photoWrap}>
				{displayPost?.photos.map((src, i) => (
					<img
						key={i}
						src={src}
						alt={displayPost.title}
						className="w-full object-contain block"
					/>
				))}
			</div>
		</Modal>
	);
}
