'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '../../lib/store/auth-store';
import { useCartStore } from '../../lib/store/cart-store';
import { useWishlistStore } from '../../lib/store/wishlist-store';
import { useThemeStore } from '../../lib/store/theme-store';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Initialize stores
    useAuthStore.persist.rehydrate();
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
    useThemeStore.persist.rehydrate();

    // Set up theme listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      useThemeStore.getState().setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Initial check
    handleThemeChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', handleThemeChange);
    setIsHydrated(true);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
} 