import { useEffect } from 'react'
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals'

type MetricType = 'CLS' | 'FID' | 'LCP' | 'FCP' | 'TTFB'

interface WebVitalsMetric {
  id: string
  name: MetricType
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals'

function getConnectionSpeed() {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const connection = (navigator as any).connection
    if (connection && connection.effectiveType) {
      return connection.effectiveType
    }
  }
  return ''
}

async function sendToAnalytics(metric: WebVitalsMetric, options: { path: string }) {
  const body = {
    dsn: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    id: metric.id,
    page: options.path,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  }

  try {
    if (process.env.NODE_ENV === 'production') {
      const response = await fetch(vitalsUrl, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      return response
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals]:', metric.name, metric.value, metric.rating)
    }
  } catch (err) {
    console.error('[Web Vitals Error]:', err)
  }
}

export function WebVitals() {
  useEffect(() => {
    const path = location.pathname

    // Core Web Vitals
    onCLS((metric) => sendToAnalytics(metric as WebVitalsMetric, { path }))
    onFID((metric) => sendToAnalytics(metric as WebVitalsMetric, { path }))
    onLCP((metric) => sendToAnalytics(metric as WebVitalsMetric, { path }))

    // Additional metrics
    onFCP((metric) => sendToAnalytics(metric as WebVitalsMetric, { path }))
    onTTFB((metric) => sendToAnalytics(metric as WebVitalsMetric, { path }))
  }, [])

  return null
} 