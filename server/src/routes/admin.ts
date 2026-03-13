import { Router, Request, Response } from 'express';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
	const { password } = req.body;
	if (!password || password !== process.env.ADMIN_PASSWORD) {
		res.status(401).json({ success: false, message: '비밀번호가 틀렸습니다.' });
		return;
	}
	res.json({ success: true, token: process.env.ADMIN_TOKEN });
});

export default router;
