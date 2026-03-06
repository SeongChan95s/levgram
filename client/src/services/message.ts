import type { Message, MessageSender } from '../types/message';

const BASE_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8080';

interface ApiResponse<T> {
	success: boolean;
	data: T;
}

export async function getMessages(): Promise<Message[]> {
	const res = await fetch(`${BASE_URL}/api/messages`);
	if (!res.ok) throw new Error('메시지 로드 실패');
	const json: ApiResponse<Message[]> = await res.json();
	return json.data;
}

export async function createMessage(body: { content: string; sender: MessageSender }): Promise<Message> {
	const res = await fetch(`${BASE_URL}/api/messages`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
	if (!res.ok) throw new Error('메시지 전송 실패');
	const json: ApiResponse<Message> = await res.json();
	return json.data;
}
