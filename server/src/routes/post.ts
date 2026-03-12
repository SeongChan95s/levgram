import { Router, Request, Response } from 'express';
import type { Post } from '../models/Post.js';
import { connectDB } from '../db.js';

const router = Router();

router.get('/getPosts', async (req: Request, res: Response) => {
	try {
		const { limit = 0, skip = 0 } = req.query;
		const limitPipe = limit ? [{ $limit: parseInt(limit as string) }] : [];
		const skipPipe = skip ? [{ $skip: parseInt(skip as string) }] : [];

		const db = (await connectDB()).db(process.env.MONGODB_NAME);
		const posts = await db
			.collection<Post>('posts')
			.aggregate([...skipPipe, ...limitPipe])
			.toArray();

		res.json({ success: true, data: posts });
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
		res.json({ success: true, data: posts });
	} catch (_err) {
		res.status(500).json({ success: false, message: '서버 오류' });
	}
});

export default router;
