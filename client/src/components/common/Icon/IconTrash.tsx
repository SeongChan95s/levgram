import React from 'react';
import styles from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
	size?: 'sm' | 'md' | 'lg' | 'fill';
	className?: string;
}

const IconTrash: React.FC<IconProps> = ({ size = 'md', className = '', ...props }) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		width="100%"
		height="100%"
		className={`${styles.icon} ${styles[size]} icon ${className}`}
		{...props}>
		<path
			d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
			fill="currentColor"
		/>
	</svg>
);

export default IconTrash;
