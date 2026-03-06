import { Router, Request, Response } from 'express';
import { getDB } from '../db.js';
import type { IPost } from '../models/Post.js';

const router = Router();

// GET / - 전체 게시글 (최신순)
router.get('/', async (_req: Request, res: Response) => {
	try {
		const posts = await getDB()
			.collection<IPost>('posts')
			.find()
			.sort({ createdAt: -1 })
			.toArray();
		res.json({ success: true, data: posts });
	} catch (_err) {
		res.status(500).json({ success: false, message: '서버 오류' });
	}
});

// GET /search?q=&model=&tag=
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

		const posts = await getDB()
			.collection<IPost>('posts')
			.find(filter)
			.sort({ createdAt: -1 })
			.toArray();
		res.json({ success: true, data: posts });
	} catch (_err) {
		res.status(500).json({ success: false, message: '서버 오류' });
	}
});

export default router;
