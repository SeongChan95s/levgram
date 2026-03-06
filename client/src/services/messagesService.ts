import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Message, MessageSender } from '../types/message';

const BASE_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8080';

interface ApiResponse<T> {
	success: boolean;
	data: T;
}

async function getMessages(): Promise<Message[]> {
	const res = await fetch(`${BASE_URL}/api/messages`);
	if (!res.ok) throw new Error('메시지 로드 실패');
	const json: ApiResponse<Message[]> = await res.json();
	return json.data;
}

async function createMessage(body: { content: string; sender: MessageSender }): Promise<Message> {
	const res = await fetch(`${BASE_URL}/api/messages`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
	if (!res.ok) throw new Error('메시지 전송 실패');
	const json: ApiResponse<Message> = await res.json();
	return json.data;
}

export function useMessages() {
	return useQuery<Message[]>({
		queryKey: ['messages'],
		queryFn: getMessages,
		placeholderData: [],
		retry: false
	});
}

export function useSendMessage() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: { content: string; sender: MessageSender }) => createMessage(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['messages'] });
		}
	});
}
