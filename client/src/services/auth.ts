const BASE_URL = import.meta.env.VITE_SERVER_URL;

export async function adminLogin(password: string): Promise<string> {
	const res = await fetch(`${BASE_URL}/api/admin/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ password })
	});
	const result: { success: boolean; token?: string; message?: string } = await res.json();
	if (!res.ok || !result.success || !result.token) {
		throw new Error(result.message ?? '로그인 실패');
	}
	return result.token;
}
