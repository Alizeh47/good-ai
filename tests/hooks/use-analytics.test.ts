import { renderHook } from '@testing-library/react';
import { useAnalytics } from '@/hooks/use-analytics';

describe('useAnalytics', () => {
  const originalEnv = process.env;
  const mockGtag = jest.fn();

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    process.env.NEXT_PUBLIC_GA_ID = 'GA-TEST-ID';
    window.gtag = mockGtag;
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  it('should track page view', () => {
    const { result } = renderHook(() => useAnalytics());
    result.current.trackPageView();

    expect(mockGtag).toHaveBeenCalledWith('config', 'GA-TEST-ID', {
      page_path: '/',
    });
  });

  it('should track custom event', () => {
    const { result } = renderHook(() => useAnalytics());
    result.current.trackEvent('click', 'button', 'test-button', 1);

    expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
      event_category: 'button',
      event_label: 'test-button',
      value: 1,
    });
  });

  it('should track purchase', () => {
    const { result } = renderHook(() => useAnalytics());
    const purchaseData = {
      transactionId: 'TEST-123',
      value: 99.99,
      items: [{ id: '1', name: 'Test Product' }],
    };

    result.current.trackPurchase(
      purchaseData.transactionId,
      purchaseData.value,
      purchaseData.items
    );

    expect(mockGtag).toHaveBeenCalledWith('event', 'purchase', {
      transaction_id: purchaseData.transactionId,
      value: purchaseData.value,
      currency: 'USD',
      items: purchaseData.items,
    });
  });

  it('should not track when GA ID is not set', () => {
    process.env.NEXT_PUBLIC_GA_ID = undefined;
    const { result } = renderHook(() => useAnalytics());

    result.current.trackPageView();
    result.current.trackEvent('test', 'category');
    result.current.trackPurchase('123', 100, []);

    expect(mockGtag).not.toHaveBeenCalled();
  });
}); 