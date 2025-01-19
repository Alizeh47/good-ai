import { useEffect, useState } from 'react';
import {
  initPerformanceTracking,
  getResourceMetrics,
  getNavigationMetrics,
  type PerformanceMetrics,
  type PerformanceObserverEntry,
} from '../utils/performance';

interface UsePerformanceOptions {
  trackResources?: boolean;
  trackNavigation?: boolean;
  reportInterval?: number;
}

interface ResourceMetrics {
  totalResources: number;
  totalSize: number;
  totalDuration: number;
  byType: Record<string, {
    count: number;
    size: number;
    duration: number;
  }>;
}

interface NavigationMetrics {
  type?: string;
  protocol?: string;
  duration: number;
  redirectTime: number;
  dnsTime: number;
  tcpTime: number;
  ttfb: number;
  downloadTime: number;
  domInteractive: number;
  domComplete: number;
}

interface PerformanceData {
  webVitals: PerformanceMetrics;
  resources: ResourceMetrics | null;
  navigation: NavigationMetrics | null;
  isSupported: boolean;
}

const defaultOptions: UsePerformanceOptions = {
  trackResources: true,
  trackNavigation: true,
  reportInterval: 5000,
};

export function usePerformance(options: UsePerformanceOptions = {}): PerformanceData {
  const { trackResources, trackNavigation, reportInterval } = { ...defaultOptions, ...options };
  const [webVitals, setWebVitals] = useState<PerformanceMetrics>({
    FCP: null,
    LCP: null,
    FID: null,
    CLS: null,
    TTFB: null,
    INP: null,
  });
  const [resources, setResources] = useState<ResourceMetrics | null>(null);
  const [navigation, setNavigation] = useState<NavigationMetrics | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if Performance API is supported
    const supported = typeof window !== 'undefined' &&
      'performance' in window &&
      'PerformanceObserver' in window;

    setIsSupported(supported);

    if (!supported) {
      console.warn('Performance API is not supported in this browser');
      return;
    }

    // Initialize performance tracking
    initPerformanceTracking();

    // Set up periodic reporting of resource and navigation metrics
    if (trackResources || trackNavigation) {
      const interval = setInterval(() => {
        if (trackResources) {
          const resourceMetrics = getResourceMetrics();
          setResources(resourceMetrics);
        }

        if (trackNavigation) {
          const navigationMetrics = getNavigationMetrics();
          setNavigation(navigationMetrics);
        }
      }, reportInterval);

      return () => clearInterval(interval);
    }
  }, [trackResources, trackNavigation, reportInterval]);

  // Update web vitals when metrics change
  useEffect(() => {
    if (!isSupported) return;

    const updateMetrics = (entries: PerformanceObserverEntry[]) => {
      entries.forEach(entry => {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              setWebVitals(prev => ({ ...prev, FCP: entry.startTime }));
            }
            break;
          case 'largest-contentful-paint':
            setWebVitals(prev => ({ ...prev, LCP: entry.startTime }));
            break;
          case 'first-input':
            setWebVitals(prev => ({ ...prev, FID: entry.duration }));
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              setWebVitals(prev => ({
                ...prev,
                CLS: (prev.CLS || 0) + ((entry as any).value || 0),
              }));
            }
            break;
          case 'navigation':
            setWebVitals(prev => ({ ...prev, TTFB: entry.startTime }));
            break;
        }
      });
    };

    try {
      const observer = new PerformanceObserver(list => {
        updateMetrics(list.getEntries() as PerformanceObserverEntry[]);
      });

      observer.observe({
        entryTypes: [
          'paint',
          'largest-contentful-paint',
          'first-input',
          'layout-shift',
          'navigation',
        ],
      });

      return () => observer.disconnect();
    } catch (e) {
      console.error('Error setting up PerformanceObserver:', e);
    }
  }, [isSupported]);

  return {
    webVitals,
    resources,
    navigation,
    isSupported,
  };
} 