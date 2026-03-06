import type { ObjectId } from 'mongodb';

export type MessageSender = 'user' | 'photographer';

export interface IMessage {
	_id?: ObjectId;
	content: string;
	sender: MessageSender;
	createdAt?: Date;
}
