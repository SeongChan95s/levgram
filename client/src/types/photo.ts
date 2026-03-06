export interface Post {
	id: number;
	photos: string[];
	title: string;
	model: string;
	description?: string;
	date?: string;
	location?: string;
	tags?: string[];
}
