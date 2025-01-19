'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformance } from '../../lib/hooks/use-performance';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface ThresholdConfig {
  good: number;
  needsImprovement: number;
}

const thresholds: Record<string, ThresholdConfig> = {
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  TTFB: { good: 800, needsImprovement: 1800 },
  INP: { good: 200, needsImprovement: 500 },
};

function formatMetricValue(name: string, value: number | null): string {
  if (value === null) return 'Not available';
  
  switch (name) {
    case 'CLS':
      return value.toFixed(3);
    default:
      return `${Math.round(value)}ms`;
  }
}

function getMetricStatus(name: string, value: number | null): 'good' | 'needs-improvement' | 'poor' | 'unknown' {
  if (value === null) return 'unknown';
  
  const threshold = thresholds[name];
  if (!threshold) return 'unknown';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case 'good':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'needs-improvement':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case 'poor':
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return null;
  }
}

export default function MetricsDisplay() {
  const { webVitals, resources, navigation, isSupported } = usePerformance();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-md"
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <h2 className="text-lg font-semibold">Performance Metrics</h2>
          <span className="text-sm text-gray-500">
            {isExpanded ? 'Hide Details' : 'Show Details'}
          </span>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 space-y-4"
            >
              {/* Core Web Vitals */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-gray-500">Core Web Vitals</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(webVitals).map(([name, value]) => {
                    const status = getMetricStatus(name, value);
                    return (
                      <div
                        key={name}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                      >
                        <div className="flex items-center space-x-2">
                          <StatusIcon status={status} />
                          <span className="font-medium">{name}</span>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {formatMetricValue(name, value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Resource Metrics */}
              {resources && (
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-gray-500">Resources</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Total Resources</span>
                      <span>{resources.totalResources}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Size</span>
                      <span>{Math.round(resources.totalSize / 1024)} KB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Duration</span>
                      <span>{Math.round(resources.totalDuration)}ms</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Metrics */}
              {navigation && (
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-gray-500">Navigation</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Protocol</span>
                      <span>{navigation.protocol || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>DNS Time</span>
                      <span>{Math.round(navigation.dnsTime)}ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>DOM Interactive</span>
                      <span>{Math.round(navigation.domInteractive)}ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>DOM Complete</span>
                      <span>{Math.round(navigation.domComplete)}ms</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 