import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import postsRouter from './routes/posts.js';
import messagesRouter from './routes/messages.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
	res.json({ success: true, message: '서버 정상 동작 중!~~' });
});

app.use('/api/posts', postsRouter);
app.use('/api/messages', messagesRouter);

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`서버 실행 중: http://localhost:${PORT}`);
		});
	})
	.catch(err => {
		console.error('MongoDB 연결 실패:', err);
		process.exit(1);
	});
