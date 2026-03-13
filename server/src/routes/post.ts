import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import multer from 'multer';
import path from 'path';
import type { Post } from '../models/Post.js';
import { connectDB } from '../db.js';

const router = Router();

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => cb(null, 'uploads'),
	filename: (_req, file, cb) => {
		const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		const ext = path.extname(file.originalname);
		cb(null, `${unique}${ext}`);
	}
});

const upload = multer({ storage });

const toPostResponse = (post: Post) => {
	const { _id, ...rest } = post;
	return { ...rest, id: _id?.toString() ?? '' };
};

router.get('/getPosts', async (req: Request, res: Response) => {
	try {
		const { limit = 0, skip = 0 } = req.query;
		const limitPipe = limit ? [{ $limit: parseInt(limit as string) }] : [];
		const skipPipe = skip ? [{ $skip: parseInt(skip as string) }] : [];

		const db = (await connectDB()).db(process.env.MONGODB_NAME);
		const posts = (await db
			.collection<Post>('posts')
			.aggregate([...skipPipe, ...limitPipe])
			.toArray()) as Post[];

		res.json({ success: true, data: posts.map(toPostResponse) });
	} catch (_err) {
		res.status(500).json({ success: false, message: '서버 오류' });
	}
});

router.get('/search', async (req: Request, res: Response) => {
	try {
		const { q, model, tag } = req.query;
		const filter: Record<string, unknown> = {};

		if (q && typeof q === 'string') {
			filter['title'] = { $regex: q, $options: 'i' };
		}
		if (model && typeof model === 'string') {
			filter['model'] = { $regex: model, $options: 'i' };
		}
		if (tag && typeof tag === 'string') {
			filter['tags'] = tag;
		}

		const db = (await connectDB()).db(process.env.MONGODB_NAME);
		const posts = await db
			.collection<Post>('posts')
			.find(filter)
			.sort({ createdAt: -1 })
			.toArray();

		res.json({ success: true, data: posts.map(toPostResponse) });
	} catch (_err) {
		res.status(500).json({ success: false, message: '서버 오류' });
	}
});

router.get('/:id', async (req: Request, res: Response) => {
	try {
		const id = String(req.params.id);
		const db = (await connectDB()).db(process.env.MONGODB_NAME);
		const post = await db
			.collection<Post>('posts')
			.findOne({ _id: new ObjectId(id) });

		if (!post) {
			res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' });
			return;
		}

		res.json({ success: true, data: toPostResponse(post) });
	} catch (_err) {
		res.status(500).json({ success: false, message: '서버 오류' });
	}
});

router.put('/:id', upload.array('photos'), async (req: Request, res: Response) => {
	const token = req.headers.authorization?.replace('Bearer ', '');
	if (!token || token !== process.env.ADMIN_TOKEN) {
		res.status(401).json({ success: false, message: '인증 실패' });
		return;
	}

	try {
		const id = String(req.params.id);
		const { title, model, description, date, location, tags, existingPhotos } = req.body;

		const existingPhotosArr: string[] = existingPhotos ? JSON.parse(existingPhotos) : [];
		const tagsArr: string[] = tags ? JSON.parse(tags) : [];

		const uploadedFiles = (req.files as Express.Multer.File[]) ?? [];
		const newPhotoUrls = uploadedFiles.map(
			file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
		);

		const photos = [...existingPhotosArr, ...newPhotoUrls];

		const updateData: Partial<Post> = { title, model, photos };
		if (description !== undefined) updateData.description = description;
		if (date !== undefined) updateData.date = date;
		if (location !== undefined) updateData.location = location;
		updateData.tags = tagsArr;

		const db = (await connectDB()).db(process.env.MONGODB_NAME);
		const updated = await db
			.collection<Post>('posts')
			.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				{ $set: updateData },
				{ returnDocument: 'after' }
			);

		if (!updated) {
			res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' });
			return;
		}

		res.json({ success: true, data: toPostResponse(updated) });
	} catch (_err) {
		res.status(500).json({ success: false, message: '서버 오류' });
	}
});

export default router;
