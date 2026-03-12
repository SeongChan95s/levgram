import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
	hasNextPage?: boolean;
	isFetchingNextPage?: boolean;
	fetchNextPage: () => void;
}

/**
 * useInfiniteQuery와 인터섹션 옵져버를 조합한 무한 스크롤 훅입니다.
 * 옵져버 대상이 시야 안에 있는 동안 지속적으로 다음 페이지를 패칭합니다.
 * @param hasNextPage useInfiniteQuery의 다음 페이지 여부
 * @param isFetchingNextPage useInfiniteQuery의 패칭 중 여부
 * @param fetchNextPage useInfiniteQuery의 다음 페이지 패칭 요청
 * @returns 감시 대상 요소
 */
export function useInfiniteScrollQuery({
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage
}: UseInfiniteScrollProps) {
	const infiniteLoaderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const target = infiniteLoaderRef.current;

		const observer = new IntersectionObserver(entries => {
			const entry = entries[0];
			if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
				fetchNextPage();
			}
		});

		if (target) {
			observer.observe(target);
		}

		return () => {
			if (target) observer.unobserve(target);
		};
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	return infiniteLoaderRef;
}
