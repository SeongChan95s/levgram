import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import postsRouter from './routes/post.js';
import messagesRouter from './routes/message.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
	res.json({ success: true, message: '서버 정상 동작 중!~~' });
});

app.use('/api/posts', postsRouter);
app.use('/api/messages', messagesRouter);

app.listen(PORT, () => {
	console.log(`서버 실행 중: http://localhost:${PORT}`);
});
