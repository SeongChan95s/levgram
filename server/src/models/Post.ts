import type { ObjectId } from 'mongodb';

export interface Post {
	_id?: ObjectId;
	photos: string[];
	title: string;
	model: string;
	description?: string;
	date?: string;
	location?: string;
	tags?: string[];
	createdAt?: Date;
}
