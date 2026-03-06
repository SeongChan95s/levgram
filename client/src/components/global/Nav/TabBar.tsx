import {
	IconHomeFilled,
	IconHomeOutlined,
	IconMessageFilled,
	IconMessageOutlined,
	IconPersonFilled,
	IconPersonOutlined,
	IconSearchFilled,
	IconSearchOutlined
} from '../../common/Icon';

import AppBar from '../../common/AppBar/AppBar';
import { Link, useLocation } from 'react-router-dom';
import styles from './TabBar.module.scss';

type TabBarItemBase = {
	label: string;
	exact?: boolean;
	icons: {
		normal: React.ReactNode;
		activated: React.ReactNode;
	};
};

type TabBarItemWithHref = TabBarItemBase & {
	href: string;
	callback?: never;
};

type TabBarItemWithCallback = TabBarItemBase & {
	href?: never;
	callback: () => void;
};

type TabBarItem = TabBarItemWithHref | TabBarItemWithCallback;

export default function TabBar() {
	const { pathname } = useLocation();

	const TabBarProps: TabBarItem[] = [
		{
			label: '홈',
			href: '/',
			exact: true,
			icons: {
				normal: <IconHomeOutlined size="fill" />,
				activated: <IconHomeFilled size="fill" />
			}
		},
		{
			label: '검색',
			href: '/search',
			icons: {
				normal: <IconSearchOutlined size="fill" />,
				activated: <IconSearchFilled size="fill" />
			}
		},
		{
			label: '메세지',
			href: '/message',
			icons: {
				normal: <IconMessageOutlined size="fill" />,
				activated: <IconMessageFilled size="fill" />
			}
		},
		{
			label: '프로필',
			href: '/profile',
			icons: {
				normal: <IconPersonOutlined size="fill" />,
				activated: <IconPersonFilled size="fill" />
			}
		}
	];

	const isActivated = (prop: TabBarItem) => {
		if (!prop.href) return false;
		return prop.exact ? pathname === prop.href : pathname.startsWith(prop.href);
	};

	return (
		<AppBar id={styles.tabBar}>
			<nav>
				<ul className={styles.container}>
					{TabBarProps.map((prop, i) => (
						<li key={i}>
							{prop.href ? (
								<Link className={styles.link} to={prop.href}>
									<div className={styles.iconWrap}>
										{isActivated(prop) ? prop.icons.activated : prop.icons.normal}
									</div>
									<span className="hidden">{prop.label.toUpperCase()}</span>
								</Link>
							) : (
								<button className={styles.link} onClick={prop.callback}>
									<div className={styles.iconWrap}>{prop.icons.normal}</div>
									<span className="hidden">{prop.label.toUpperCase()}</span>
								</button>
							)}
						</li>
					))}
				</ul>
			</nav>
		</AppBar>
	);
}
