export type MessageSender = 'user' | 'photographer';

export interface Message {
	_id?: string;
	content: string;
	sender: MessageSender;
	createdAt?: string;
}
