import { useCallback } from 'react';

interface EventData {
  [key: string]: any;
}

export function useAnalytics() {
  const trackEvent = useCallback((eventName: string, eventData?: EventData) => {
    // For now, we'll just log to console
    // In production, this would send data to your analytics service
    console.log(`[Analytics] Event: ${eventName}`, eventData);

    // Example implementation for Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, eventData);
    }
  }, []);

  return { trackEvent };
} 