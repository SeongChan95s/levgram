import { IconArrowStick, IconHomeFilled, IconNotifyOutlined } from '../../common/Icon';
import { IconButton } from '../../common/IconButton';
import { useRef, useEffect, useState, startTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { classNames } from '../../../utils/classNames';
import styles from './NavBar.module.scss';

interface NavBarProps {
	title?: string | boolean;
	subText?: string;
	back?: boolean;
	logo?: boolean;
	home?: boolean;
	search?: boolean;
	darkMode?: boolean;
	notify?: boolean;
	action?: React.ReactNode;
}

interface PathMap {
	path: string;
	exact?: boolean;
	color?: 'light' | 'dark' | 'glass' | 'transparent';
	scroll?: {
		type?: 'transform' | 'reverse';
		maxScroll?: number;
	};
	props?: NavBarProps;
}

const initialNavBarProps: NavBarProps = {
	title: undefined,
	back: false,
	logo: false,
	home: false,
	search: false,
	darkMode: false,
	notify: false,
	action: undefined
};

const pathMap: PathMap[] = [
	{
		path: '/',
		props: { logo: true, notify: true },
		exact: true,
		scroll: { type: 'transform' }
	},
	{
		path: '/search',
		props: { logo: true, title: 'Search' },
		exact: true
	},
	{
		path: '/contact',
		props: { logo: true, title: 'Contact' },
		exact: true
	},
	{
		path: '/profile',
		props: { logo: true, notify: true },
		exact: true,
		scroll: { type: 'transform' }
	}
];

/**
 * url에 따라 미리 저장된 객체를 반환하는 훅
 */
function useNavPath() {
	const { pathname } = useLocation();
	const [matchedPath, setMatchedPath] = useState<PathMap | undefined>();

	useEffect(() => {
		const requestTitle = requestAnimationFrame(() => {
			startTransition(() => {
				setMatchedPath(() => {
					let result = pathMap.find(({ path, exact = false }) =>
						exact ? pathname == path : pathname.startsWith(path)
					);
					return result ? { ...result } : undefined;
				});
			});
		});

		return () => {
			setMatchedPath(undefined);
			cancelAnimationFrame(requestTitle);
		};
	}, [pathname]);

	return { ...matchedPath };
}

export default function NavBar() {
	const navigate = useNavigate();
	const matchedPath = useNavPath();
	const navRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const [titleIsOverflowing, setTitleIsOverflowing] = useState(false);
	const scrollAccumRef = useRef(0);
	const lastScrollYRef = useRef(0);
	const rafRef = useRef<number>(0);
	let navBarProps = { ...initialNavBarProps, ...matchedPath?.props };

	useEffect(() => {
		if (titleRef.current && navBarProps.title) {
			const element = titleRef.current;
			const isOverflow = element.scrollWidth > element.clientWidth;
			setTitleIsOverflowing(isOverflow);
		}
	}, [navBarProps.title]);

	useEffect(() => {
		if (matchedPath?.scroll?.type !== 'transform') return;

		scrollAccumRef.current = 0;
		lastScrollYRef.current = window.scrollY;
		navRef.current?.style.setProperty('--nav-translate-y', '0px');

		const handleScroll = () => {
			cancelAnimationFrame(rafRef.current);
			rafRef.current = requestAnimationFrame(() => {
				const navHeight = navRef.current?.offsetHeight ?? 60;
				const currentY = window.scrollY;
				const delta = currentY - lastScrollYRef.current;
				lastScrollYRef.current = currentY;

				if (currentY <= 0) {
					scrollAccumRef.current = 0;
				} else {
					scrollAccumRef.current = Math.max(
						0,
						Math.min(navHeight, scrollAccumRef.current + delta)
					);
				}

				navRef.current?.style.setProperty(
					'--nav-translate-y',
					`-${scrollAccumRef.current}px`
				);
			});
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			cancelAnimationFrame(rafRef.current);
			window.removeEventListener('scroll', handleScroll);
		};
	}, [matchedPath?.scroll?.type]);

	const handleScrollTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	};

	const className = classNames(
		styles.navBar,
		`${styles?.[matchedPath?.scroll?.type ?? '']}`
	);

	return (
		<header id="navBar" ref={navRef} className={className}>
			<div className={styles.container}>
				<nav className={styles.gnb}>
					<div className={styles.navLeft}>
						{navBarProps.back && (
							<IconButton
								className={styles.backButton}
								icon={<IconArrowStick />}
								size="md"
								onClick={() => navigate(-1)}
							/>
						)}

						{navBarProps.logo && (
							<h1 className={styles.logo} onClick={handleScrollTop}>
								Levgram
							</h1>
						)}

						{navBarProps.action && navBarProps.action}

						{navBarProps.title && (
							<div
								className={`${styles.titleBox} ${
									titleIsOverflowing ? styles.marquee : ''
								}`}>
								<h2 ref={titleRef} onClick={handleScrollTop}>
									{navBarProps.title}
								</h2>
							</div>
						)}
					</div>

					{navBarProps.darkMode ||
						navBarProps.notify ||
						(navBarProps.home && (
							<div className={styles.quickMenu}>
								{navBarProps.home && <IconButton size="lg" icon={<IconHomeFilled />} />}
								{navBarProps.notify && (
									<IconButton size="lg" icon={<IconNotifyOutlined />} />
								)}
								{navBarProps.darkMode && (
									<IconButton size="lg" icon={<IconNotifyOutlined />} />
								)}
							</div>
						))}
				</nav>
			</div>
		</header>
	);
}
