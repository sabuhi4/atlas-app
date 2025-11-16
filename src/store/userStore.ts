import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    email?: string;
    user_metadata?: {
        full_name?: string;
        avatar_url?: string;
    };
}

interface UserState {
    user: User | null;
    isDarkMode: boolean;
    setUser: (user: User | null) => void;
    toggleDarkMode: () => void;
    setDarkMode: (isDark: boolean) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isDarkMode: false,
            setUser: (user) => set({ user }),
            toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
            setDarkMode: (isDark) => set({ isDarkMode: isDark }),
        }),
        {
            name: 'user-storage',
        }
    )
);