import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { IconClose } from '../common/Icon';
import { IconButton } from '../common/IconButton';
import MySwiperMain from '../common/Swiper/MySwiperMain';
import type { Post } from '../../types/photo';
import styles from './PostDetailModal.module.scss';

interface PostDetailModalProps {
	post: Post | null;
	onClose: () => void;
}

export default function PostDetailModal({ post, onClose }: PostDetailModalProps) {
	const overlayRef = useRef<HTMLDivElement>(null);

	// 모달 열릴 때 페이지 스크롤 방지
	useEffect(() => {
		if (post !== null) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [post]);

	return (
		<CSSTransition
			nodeRef={overlayRef}
			in={post !== null}
			timeout={220}
			mountOnEnter
			unmountOnExit>
			<div
				className={`${styles.overlay} fixed inset-0 z-[90] bg-white flex flex-col overflow-hidden`}
				ref={overlayRef}>

				{/* 헤더 - 닫기 버튼 왼쪽 (인스타그램 스타일) */}
				<div
					className="flex-none flex items-center border-b border-gray-100"
					style={{ paddingTop: 'max(8px, env(safe-area-inset-top))', paddingBottom: '4px' }}>
					<IconButton icon={<IconClose />} size="md" onClick={onClose} />
				</div>

				{/* 사진 스와이퍼 */}
				<div className={`${styles.swiperFill} flex-1 min-h-0 overflow-hidden`}>
					<MySwiperMain variant="cardPerView" slidesPerView={1} spaceBetween={0}>
						{post?.photos.map((src, i) => (
							<img
								key={i}
								src={src}
								alt={post.title}
								className="w-full h-full object-contain block"
							/>
						))}
					</MySwiperMain>
				</div>

				{/* 정보 영역 */}
				<div
					className="flex-none border-t border-gray-100 flex flex-col gap-4"
					style={{
						padding: '12px 16px',
						paddingBottom: 'max(16px, env(safe-area-inset-bottom))'
					}}>
					{/* 제목 · 모델 */}
					<div className="flex items-baseline overflow-hidden">
						<span className="font-semibold text-gray-900 text-[15px] leading-snug shrink truncate">
							{post?.title}
						</span>
						<span className="flex-none mx-6 text-gray-300 text-[13px]">·</span>
						<span className="flex-none text-[13px] text-gray-500 max-w-[45%] truncate">
							{post?.model}
						</span>
					</div>
					{/* 설명 */}
					{post?.description && (
						<p className="text-[14px] leading-relaxed text-gray-700">{post.description}</p>
					)}
					{/* 날짜 · 장소 */}
					{(post?.date || post?.location) && (
						<p className="text-[12px] text-gray-400 flex items-center">
							{post.date && <span>{post.date}</span>}
							{post.date && post.location && <span className="mx-4">·</span>}
							{post.location && <span>{post.location}</span>}
						</p>
					)}
				</div>
			</div>
		</CSSTransition>
	);
}
