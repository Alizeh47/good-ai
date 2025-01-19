'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import {
  initPerformanceTracking,
  getResourceMetrics,
  getNavigationMetrics,
  type PerformanceMetrics,
} from '../../lib/utils/performance';

interface PerformanceContextType {
  webVitals: PerformanceMetrics;
  resources: any;
  navigation: any;
  isSupported: boolean;
}

const defaultContext: PerformanceContextType = {
  webVitals: {
    FCP: null,
    LCP: null,
    FID: null,
    CLS: null,
    TTFB: null,
    INP: null,
  },
  resources: null,
  navigation: null,
  isSupported: false,
};

const PerformanceContext = createContext<PerformanceContextType>(defaultContext);

interface PerformanceProviderProps {
  children: ReactNode;
  trackResources?: boolean;
  trackNavigation?: boolean;
  reportInterval?: number;
}

export function PerformanceProvider({
  children,
  trackResources = true,
  trackNavigation = true,
  reportInterval = 5000,
}: PerformanceProviderProps) {
  const [metrics, setMetrics] = useState<PerformanceContextType>(defaultContext);
  const pathname = usePathname();

  useEffect(() => {
    // Check if Performance API is supported
    const supported = typeof window !== 'undefined' &&
      'performance' in window &&
      'PerformanceObserver' in window;

    if (!supported) {
      console.warn('Performance API is not supported in this browser');
      return;
    }

    // Initialize performance tracking
    initPerformanceTracking();

    // Update isSupported state
    setMetrics(prev => ({ ...prev, isSupported: true }));

    // Set up periodic reporting of resource and navigation metrics
    if (trackResources || trackNavigation) {
      const interval = setInterval(() => {
        const updates: Partial<PerformanceContextType> = {};

        if (trackResources) {
          updates.resources = getResourceMetrics();
        }

        if (trackNavigation) {
          updates.navigation = getNavigationMetrics();
        }

        setMetrics(prev => ({ ...prev, ...updates }));
      }, reportInterval);

      return () => clearInterval(interval);
    }
  }, [trackResources, trackNavigation, reportInterval]);

  // Track route changes
  useEffect(() => {
    if (!metrics.isSupported) return;

    // Reset CLS on route change
    setMetrics(prev => ({
      ...prev,
      webVitals: {
        ...prev.webVitals,
        CLS: 0,
      },
    }));

    // Track page view in Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname,
      });
    }
  }, [pathname, metrics.isSupported]);

  return (
    <PerformanceContext.Provider value={metrics}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformanceContext() {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformanceContext must be used within a PerformanceProvider');
  }
  return context;
} 