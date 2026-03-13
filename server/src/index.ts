import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import postsRouter from './routes/post.js';
import adminRouter from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 8080;

if (!fs.existsSync('uploads')) {
	fs.mkdirSync('uploads', { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/api/health', (_req: Request, res: Response) => {
	res.json({ success: true, message: '서버 정상 동작 중!~~' });
});

app.use('/api/posts', postsRouter);
app.use('/api/admin', adminRouter);

app.listen(PORT, () => {
	console.log(`서버 실행 중: http://localhost:${PORT}`);
});
