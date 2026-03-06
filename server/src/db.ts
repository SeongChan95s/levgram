import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/levgram';

let client: MongoClient;
let db: Db;

export async function connectDB(): Promise<Db> {
	if (db) return db;
	client = new MongoClient(MONGODB_URI);
	await client.connect();
	db = client.db();
	console.log('MongoDB 연결 성공');
	return db;
}

export function getDB(): Db {
	if (!db) throw new Error('DB가 초기화되지 않았습니다. connectDB()를 먼저 호출하세요.');
	return db;
}
