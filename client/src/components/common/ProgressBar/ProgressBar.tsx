import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
	className?: string;
	percent?: number;
}

export default function ProgressBar({ percent = 0, className }: ProgressBarProps) {
	return (
		<div className={`${styles.progressBar} ${className}`}>
			<span className={styles.bar} style={{ width: `${percent}%` }}></span>
		</div>
	);
}
