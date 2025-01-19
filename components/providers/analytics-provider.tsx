'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import * as analytics from '../../lib/utils/analytics';
import Script from 'next/script';
import { useAnalytics as useAnalyticsHook } from '@/hooks/use-analytics';

interface AnalyticsContextType {
  trackEvent: typeof analytics.trackEvent;
  trackException: typeof analytics.trackException;
  trackTiming: typeof analytics.trackTiming;
  trackEcommerce: typeof analytics.trackEcommerce;
  ecommerce: typeof analytics.ecommerce;
  setUserProperties: typeof analytics.setUserProperties;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const { trackPageView } = useAnalyticsHook();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    trackPageView();
  }, [pathname, searchParams, trackPageView]);

  if (!process.env.NEXT_PUBLIC_GA_ID) {
    return <>{children}</>;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {children}
    </>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
} 