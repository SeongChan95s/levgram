import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Modal } from '../common/Modal';
import { IconClose, IconEdit, IconTrash } from '../common/Icon';
import { IconButton } from '../common/IconButton';
import { useAdminStore } from '../../store/adminStore';
import { deletePost } from '../../services/post';
import type { Post } from '../../types/post';
import styles from './PostDetailModal.module.scss';

interface PostDetailModalProps {
	post: Post | null;
	onClose: () => void;
}

export default function PostDetailModal({ post, onClose }: PostDetailModalProps) {
	const [displayPost, setDisplayPost] = useState<Post | null>(null);
	const [isConfirming, setIsConfirming] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { isAdmin, token } = useAdminStore();

	useEffect(() => {
		if (post !== null) {
			setDisplayPost(post);
		} else {
			setIsConfirming(false);
		}
	}, [post]);

	const handleDelete = async () => {
		if (!displayPost || !token) return;
		setIsDeleting(true);
		try {
			await deletePost(displayPost.id, token);
			queryClient.invalidateQueries({ queryKey: ['posts'] });
			onClose();
		} finally {
			setIsDeleting(false);
			setIsConfirming(false);
		}
	};

	return (
		<Modal visible={post !== null} className={styles.postDetailModal}>
			<div className={styles.header}>
				{isAdmin && displayPost && (
					<div className={styles.adminActions}>
						<IconButton
							icon={<IconEdit />}
							size="md"
							onClick={() => {
								onClose();
								navigate(`/detail/${displayPost.id}`);
							}}
						/>
						{isConfirming ? (
							<div className={styles.deleteConfirm}>
								<span className={styles.confirmText}>삭제할까요?</span>
								<button
									className={styles.confirmBtn}
									onClick={handleDelete}
									disabled={isDeleting}>
									삭제
								</button>
								<button
									className={styles.cancelBtn}
									onClick={() => setIsConfirming(false)}>
									취소
								</button>
							</div>
						) : (
							<IconButton
								icon={<IconTrash />}
								size="md"
								className={styles.deleteButton}
								onClick={() => setIsConfirming(true)}
							/>
						)}
					</div>
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
