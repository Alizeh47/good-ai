import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      signIn: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // TODO: Implement actual authentication
          const mockUser = {
            id: '1',
            email,
            name: 'John Doe',
          };
          set({ user: mockUser, isAuthenticated: true });
        } catch (error) {
          console.error('Authentication error:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      signOut: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
      skipHydration: true,
    }
  )
); 