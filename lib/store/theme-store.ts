import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: Theme;
  setSystemTheme: (theme: Theme) => void;
  resolvedTheme: Theme;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      systemTheme: 'light',

      setTheme: (theme) => {
        set({ theme });
        if (theme === 'system') {
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(get().systemTheme);
        } else {
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(theme);
        }
      },

      setSystemTheme: (theme) => {
        set({ systemTheme: theme });
        if (get().theme === 'system') {
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(theme);
        }
      },

      get resolvedTheme() {
        return get().theme === 'system' ? get().systemTheme : get().theme;
      },
    }),
    {
      name: 'theme-storage',
      skipHydration: true,
    }
  )
); 