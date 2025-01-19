'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { AuthProvider } from './session-provider';
import { QueryProvider } from './query-provider';
import { AnalyticsProvider } from '@/components/ui/common/analytics';
import { PerformanceProvider } from '@/components/providers/performance-provider';
import MetricsDisplay from '@/components/performance/metrics-display';

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <QueryProvider>
          <AnalyticsProvider>
            <PerformanceProvider>
              {children}
              {process.env.NODE_ENV === 'development' && <MetricsDisplay />}
            </PerformanceProvider>
          </AnalyticsProvider>
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
} 