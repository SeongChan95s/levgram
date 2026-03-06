import type { Message } from '../../types/message';
import styles from './ChatBubble.module.scss';

interface ChatBubbleProps {
	message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
	return (
		<div className={`${styles.wrap} ${styles[message.sender]}`}>
			<div className={styles.bubble}>{message.content}</div>
		</div>
	);
}
