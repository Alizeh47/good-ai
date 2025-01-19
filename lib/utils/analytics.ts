interface EventOptions {
  category?: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  [key: string]: any;
}

interface PageViewOptions {
  title?: string;
  location?: string;
  path?: string;
}

interface EcommerceEvent {
  items: Array<{
    item_id: string;
    item_name: string;
    item_category?: string;
    price: number;
    quantity?: number;
    currency?: string;
    [key: string]: any;
  }>;
  currency?: string;
  value?: number;
  [key: string]: any;
}

// Initialize Google Analytics
export function initGA() {
  if (typeof window === 'undefined') return;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) {
    console.warn('Google Analytics ID not found');
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', gaId, {
    send_page_view: false, // We'll track page views manually
  });
}

// Track page views
export function trackPageView({ title, location, path }: PageViewOptions = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_title: title,
    page_location: location || window.location.href,
    page_path: path || window.location.pathname,
  });
}

// Track custom events
export function trackEvent(action: string, options: EventOptions = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  const { category, label, value, nonInteraction, ...rest } = options;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    non_interaction: nonInteraction,
    ...rest,
  });
}

// Track exceptions
export function trackException(description: string, fatal: boolean = false) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'exception', {
    description,
    fatal,
  });
}

// Track user timing
export function trackTiming(name: string, value: number, category?: string, label?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'timing_complete', {
    name,
    value,
    event_category: category,
    event_label: label,
  });
}

// E-commerce tracking
export function trackEcommerce(action: string, event: EcommerceEvent) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, event);
}

// Common e-commerce events
export const ecommerce = {
  viewItem(item: EcommerceEvent['items'][0]) {
    trackEcommerce('view_item', {
      items: [item],
      value: item.price,
      currency: item.currency || 'USD',
    });
  },

  addToCart(item: EcommerceEvent['items'][0]) {
    trackEcommerce('add_to_cart', {
      items: [item],
      value: item.price * (item.quantity || 1),
      currency: item.currency || 'USD',
    });
  },

  removeFromCart(item: EcommerceEvent['items'][0]) {
    trackEcommerce('remove_from_cart', {
      items: [item],
      value: item.price * (item.quantity || 1),
      currency: item.currency || 'USD',
    });
  },

  beginCheckout(items: EcommerceEvent['items']) {
    const value = items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    trackEcommerce('begin_checkout', {
      items,
      value,
      currency: items[0]?.currency || 'USD',
    });
  },

  purchase(items: EcommerceEvent['items'], transactionId: string, shipping: number = 0, tax: number = 0) {
    const value = items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    trackEcommerce('purchase', {
      transaction_id: transactionId,
      value: value + shipping + tax,
      tax,
      shipping,
      currency: items[0]?.currency || 'USD',
      items,
    });
  },
};

// User properties
export function setUserProperties(properties: { [key: string]: any }) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'set_user_properties', {
    user_properties: properties
  });
}

// Declare global window object with gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (command: "js" | "config" | "event", target: string | Date, params?: Record<string, any>) => void;
  }
} 