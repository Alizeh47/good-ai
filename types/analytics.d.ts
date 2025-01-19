interface Window {
  gtag: (
    command: 'js' | 'config' | 'event',
    target: string | Date,
    params?: Record<string, any>
  ) => void;
}

interface PerformanceEntry {
  name: string;
  entryType: string;
  startTime: number;
  duration: number;
  processingStart?: number;
  hadRecentInput?: boolean;
  value?: number;
}

interface PerformanceObserverEntryList {
  getEntries(): PerformanceEntry[];
}

interface PerformanceObserverInit {
  entryTypes: string[];
}

interface PerformanceObserver {
  observe(options: PerformanceObserverInit): void;
  disconnect(): void;
  takeRecords(): PerformanceEntry[];
}

declare var PerformanceObserver: {
  prototype: PerformanceObserver;
  new(callback: (list: PerformanceObserverEntryList) => void): PerformanceObserver;
  supportedEntryTypes: string[];
}; 