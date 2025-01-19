interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}

interface PerformanceEntry {
  name: string;
  entryType: string;
  startTime: number;
  duration: number;
  processingStart?: number;
  hadRecentInput?: boolean;
}

interface PerformanceObserverEntryList {
  getEntries(): PerformanceEntry[];
  getEntriesByType(type: string): PerformanceEntry[];
  getEntriesByName(name: string, type?: string): PerformanceEntry[];
}

interface PerformanceObserver {
  observe(options: { entryTypes: string[] }): void;
  disconnect(): void;
  takeRecords(): PerformanceEntry[];
}

interface PerformanceObserverInit {
  entryTypes: string[];
}

declare let PerformanceObserver: {
  prototype: PerformanceObserver;
  new(callback: (list: PerformanceObserverEntryList) => void): PerformanceObserver;
  supportedEntryTypes: string[];
}; 