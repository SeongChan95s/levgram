import type { ObjectId } from 'mongodb';

export interface IPhoto {
	src: string;
	alt?: string;
}

export interface IPost {
	_id?: ObjectId;
	photos: IPhoto[];
	title: string;
	model: string;
	description?: string;
	date?: string;
	location?: string;
	tags?: string[];
	createdAt?: Date;
}
