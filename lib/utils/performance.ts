interface PerformanceMetrics {
  FCP: number | null;
  LCP: number | null;
  FID: number | null;
  CLS: number | null;
  TTFB: number | null;
  INP: number | null;
}

interface PerformanceObserverEntry {
  name: string;
  entryType: string;
  startTime: number;
  duration: number;
  value?: number;
  hadRecentInput?: boolean;
  renderTime?: number;
  loadTime?: number;
  size?: number;
  id?: string;
  url?: string;
  element?: Element;
  navigationType?: string;
  nextHopProtocol?: string;
}

const metrics: PerformanceMetrics = {
  FCP: null,
  LCP: null,
  FID: null,
  CLS: null,
  TTFB: null,
  INP: null,
};

let clsValue = 0;
let clsEntries: PerformanceObserverEntry[] = [];

function initPerformanceTracking() {
  // First Contentful Paint
  const fcpObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    if (entries.length > 0) {
      metrics.FCP = entries[0].startTime;
      reportMetric('FCP', metrics.FCP);
    }
  });

  // Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1] as PerformanceObserverEntry;
      metrics.LCP = lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime;
      reportMetric('LCP', metrics.LCP);
    }
  });

  // First Input Delay
  const fidObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    if (entries.length > 0) {
      metrics.FID = entries[0].duration;
      reportMetric('FID', metrics.FID);
    }
  });

  // Cumulative Layout Shift
  const clsObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries() as PerformanceObserverEntry[];
    
    entries.forEach(entry => {
      if (!entry.hadRecentInput && entry.value) {
        clsValue += entry.value;
        clsEntries.push(entry);
        
        // Only keep the 5 most recent entries
        if (clsEntries.length > 5) {
          const excessEntries = clsEntries.length - 5;
          clsValue -= clsEntries.slice(0, excessEntries).reduce((sum, entry) => sum + (entry.value || 0), 0);
          clsEntries = clsEntries.slice(excessEntries);
        }
        
        metrics.CLS = clsValue;
        reportMetric('CLS', metrics.CLS);
      }
    });
  });

  // Time to First Byte
  const navigationObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    if (entries.length > 0) {
      metrics.TTFB = entries[0].startTime;
      reportMetric('TTFB', metrics.TTFB);
    }
  });

  // Interaction to Next Paint
  const inpObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1] as PerformanceObserverEntry;
      metrics.INP = lastEntry.duration;
      reportMetric('INP', metrics.INP);
    }
  });

  try {
    fcpObserver.observe({ entryTypes: ['paint'] });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    fidObserver.observe({ entryTypes: ['first-input'] });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    navigationObserver.observe({ entryTypes: ['navigation'] });
    inpObserver.observe({ entryTypes: ['interaction'] });
  } catch (e) {
    console.error('Performance tracking error:', e);
  }
}

function reportMetric(name: keyof PerformanceMetrics, value: number | null) {
  if (value === null) return;

  // Send to Google Analytics
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: name,
      value: Math.round(value),
      non_interaction: true,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name}:`, value);
  }
}

function getResourceMetrics() {
  if (typeof window === 'undefined') return null;

  const resources = performance.getEntriesByType('resource');
  const metrics = {
    totalResources: resources.length,
    totalSize: 0,
    totalDuration: 0,
    byType: {} as Record<string, { count: number; size: number; duration: number }>,
  };

  resources.forEach((resource: PerformanceObserverEntry) => {
    const size = resource.size || 0;
    const duration = resource.duration;
    const type = resource.entryType;

    metrics.totalSize += size;
    metrics.totalDuration += duration;

    if (!metrics.byType[type]) {
      metrics.byType[type] = { count: 0, size: 0, duration: 0 };
    }

    metrics.byType[type].count++;
    metrics.byType[type].size += size;
    metrics.byType[type].duration += duration;
  });

  return metrics;
}

function getNavigationMetrics() {
  if (typeof window === 'undefined') return null;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceObserverEntry;
  if (!navigation) return null;

  return {
    type: navigation.navigationType,
    protocol: navigation.nextHopProtocol,
    duration: navigation.duration,
    redirectTime: navigation.startTime,
    dnsTime: navigation.startTime,
    tcpTime: navigation.startTime,
    ttfb: navigation.startTime,
    downloadTime: navigation.duration,
    domInteractive: navigation.startTime,
    domComplete: navigation.startTime,
  };
}

export {
  initPerformanceTracking,
  getResourceMetrics,
  getNavigationMetrics,
  type PerformanceMetrics,
  type PerformanceObserverEntry,
}; 