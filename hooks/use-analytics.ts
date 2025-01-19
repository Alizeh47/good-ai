import { useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag: (
      command: 'js' | 'config' | 'event',
      target: string | Date,
      params?: Record<string, any>
    ) => void;
  }
}

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const trackPageView = useCallback(() => {
    if (process.env.NEXT_PUBLIC_GA_ID) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname + searchParams?.toString(),
      });
    }
  }, [pathname, searchParams]);

  const trackEvent = useCallback(
    (action: string, category: string, label?: string, value?: number) => {
      if (process.env.NEXT_PUBLIC_GA_ID) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
        });
      }
    },
    []
  );

  const trackPurchase = useCallback(
    (transactionId: string, value: number, items: any[]) => {
      if (process.env.NEXT_PUBLIC_GA_ID) {
        window.gtag('event', 'purchase', {
          transaction_id: transactionId,
          value: value,
          currency: 'USD',
          items: items,
        });
      }
    },
    []
  );

  return {
    trackPageView,
    trackEvent,
    trackPurchase,
  };
} 