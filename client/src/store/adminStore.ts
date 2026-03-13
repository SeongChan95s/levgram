import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminStore {
	token: string | null;
	isAdmin: boolean;
	login: (token: string) => void;
	logout: () => void;
}

export const useAdminStore = create<AdminStore>()(
	persist(
		set => ({
			token: null,
			isAdmin: false,
			login: (token: string) => set({ token, isAdmin: true }),
			logout: () => set({ token: null, isAdmin: false })
		}),
		{ name: 'admin-store' }
	)
);
