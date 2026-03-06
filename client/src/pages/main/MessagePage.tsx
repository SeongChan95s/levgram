import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ChatBubble from '../../components/portfolio/ChatBubble';
import { useMessages, useSendMessage } from '../../services/messagesService';

export default function MessagePage() {
	const [input, setInput] = useState('');
	const bottomRef = useRef<HTMLDivElement>(null);

	const { data: messages = [] } = useMessages();
	const { mutate: sendMessage, isPending } = useSendMessage();

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSend = () => {
		const content = input.trim();
		if (!content || isPending) return;
		sendMessage({ content, sender: 'user' });
		setInput('');
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
			handleSend();
		}
	};

	return (
		<>
			<Helmet>
				<title>메시지 · levgram</title>
			</Helmet>
			<main className="pt-60 min-h-svh flex flex-col">
				{/* 채팅 영역 */}
				<div className="flex-1 overflow-y-auto px-(--inner) py-16 flex flex-col gap-8 pb-[120px]">
					{messages.length === 0 && (
						<p className="text-center text-body-3 text-gray-400 mt-40">
							아직 메시지가 없습니다.
						</p>
					)}
					{messages.map(msg => (
						<ChatBubble key={msg._id} message={msg} />
					))}
					<div ref={bottomRef} />
				</div>

				{/* 입력창 - TabBar 위 고정 */}
				<div
					className="fixed bottom-[60px] inset-x-0 mx-auto flex items-center gap-8 px-(--inner) py-8 bg-white border-t border-gray-100"
					style={{ maxWidth: 'var(--layout-max-width)' }}>
					<input
						type="text"
						value={input}
						onChange={e => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="메시지를 입력하세요..."
						className="flex-1 bg-gray-100 rounded-full px-16 py-8 text-body-3 text-gray-900 outline-none placeholder:text-gray-400"
					/>
					<button
						onClick={handleSend}
						disabled={!input.trim() || isPending}
						className="flex-shrink-0 px-16 py-8 bg-[#5A0FC8] text-white text-label-2 rounded-full disabled:opacity-40 transition-opacity">
						전송
					</button>
				</div>
			</main>
		</>
	);
}
