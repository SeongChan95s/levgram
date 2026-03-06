import { Router, Request, Response } from 'express';
import { getDB } from '../db.js';
import type { IMessage, MessageSender } from '../models/Message.js';

const router = Router();

// GET / - 전체 메시지 (오래된 순)
router.get('/', async (_req: Request, res: Response) => {
	try {
		const messages = await getDB()
			.collection<IMessage>('messages')
			.find()
			.sort({ createdAt: 1 })
			.toArray();
		res.json({ success: true, data: messages });
	} catch (_err) {
		res.status(500).json({ success: false, message: '서버 오류' });
	}
});

// POST / - 메시지 전송
router.post('/', async (req: Request, res: Response) => {
	try {
		const { content, sender } = req.body as { content: string; sender: MessageSender };

		if (!content || !sender) {
			res.status(400).json({ success: false, message: 'content, sender 필수' });
			return;
		}

		const doc: IMessage = { content, sender, createdAt: new Date() };
		const result = await getDB().collection<IMessage>('messages').insertOne(doc);
		res.status(201).json({ success: true, data: { ...doc, _id: result.insertedId } });
	} catch (_err) {
		res.status(500).json({ success: false, message: '서버 오류' });
	}
});

export default router;
