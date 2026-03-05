import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080; // Cloud Run 기본 포트

app.use(cors());
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
	res.json({ success: true, message: '서버 정상 동작 중!' });
});

app.listen(PORT, () => {
	console.log(`서버 실행 중: http://localhost:${PORT}`);
});
