import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface AnalyticsContextType {
  trackEvent: (name: string, properties?: Record<string, any>) => void;
  trackPageView: (url: string, referrer?: string) => void;
  trackConversion: (value: number, currency?: string) => void;
  trackError: (error: Error, context?: Record<string, any>) => void;
  trackPerformance: (metric: PerformanceEntry) => void;
}

interface PerformanceMetrics {
  FCP: number | null; // First Contentful Paint
  LCP: number | null; // Largest Contentful Paint
  FID: number | null; // First Input Delay
  CLS: number | null; // Cumulative Layout Shift
  TTFB: number | null; // Time to First Byte
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const router = useRouter();
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    FCP: null,
    LCP: null,
    FID: null,
    CLS: null,
    TTFB: null,
  });

  useEffect(() => {
    // Initialize analytics services
    if (typeof window !== 'undefined') {
      // Google Analytics initialization
      if (process.env.NEXT_PUBLIC_GA_ID) {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', process.env.NEXT_PUBLIC_GA_ID);
      }

      // Initialize performance monitoring
      if ('PerformanceObserver' in window) {
        // First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            const [entry] = entries;
            setMetrics(prev => ({ ...prev, FCP: entry.startTime }));
            trackPerformance(entry);
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            const [entry] = entries;
            setMetrics(prev => ({ ...prev, LCP: entry.startTime }));
            trackPerformance(entry);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            const [entry] = entries;
            setMetrics(prev => ({ ...prev, FID: entry.processingStart - entry.startTime }));
            trackPerformance(entry);
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += (entry as any).value;
              setMetrics(prev => ({ ...prev, CLS: clsValue }));
              trackPerformance(entry);
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Time to First Byte
        const navigationEntry = performance.getEntriesByType('navigation')[0];
        if (navigationEntry) {
          setMetrics(prev => ({
            ...prev,
            TTFB: (navigationEntry as PerformanceNavigationTiming).responseStart
          }));
        }

        return () => {
          fcpObserver.disconnect();
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      }
    }
  }, []);

  // Track page views
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackPageView(url, document.referrer);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Track errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      trackError(event.error, {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const trackEvent = (name: string, properties?: Record<string, any>) => {
    // Google Analytics event tracking
    if (window.gtag) {
      window.gtag('event', name, properties);
    }

    // Custom event tracking
    console.log('Event:', name, properties);
  };

  const trackPageView = (url: string, referrer?: string) => {
    // Google Analytics page view tracking
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
        page_path: url,
        page_referrer: referrer,
      });
    }

    // Custom page view tracking
    console.log('Page View:', url, { referrer });
  };

  const trackConversion = (value: number, currency: string = 'USD') => {
    // Google Analytics conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: process.env.NEXT_PUBLIC_GA_CONVERSION_ID,
        value,
        currency,
      });
    }

    // Custom conversion tracking
    console.log('Conversion:', { value, currency });
  };

  const trackError = (error: Error, context?: Record<string, any>) => {
    // Error tracking
    console.error('Error:', error, context);
  };

  const trackPerformance = (metric: PerformanceEntry) => {
    // Performance tracking
    console.log('Performance:', {
      name: metric.name,
      value: metric.startTime,
      entryType: metric.entryType,
    });
  };

  const value = {
    trackEvent,
    trackPageView,
    trackConversion,
    trackError,
    trackPerformance,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

// Hook for tracking visibility
export function useTrackVisibility(elementId: string, threshold: number = 0.5) {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('element_visible', {
              element_id: elementId,
              visibility_ratio: entry.intersectionRatio,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementId, threshold, trackEvent]);
}

// Hook for tracking clicks
export function useTrackClicks(elementId: string, eventName: string) {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const handleClick = () => {
      trackEvent(eventName, { element_id: elementId });
    };

    element.addEventListener('click', handleClick);
    return () => element.removeEventListener('click', handleClick);
  }, [elementId, eventName, trackEvent]);
} 