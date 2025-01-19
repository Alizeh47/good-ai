import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { AnalyticsProvider, useAnalytics } from '../../../components/ui/common/analytics';

// Mock window.gtag
const mockGtag = jest.fn();
window.gtag = mockGtag;

// Mock PerformanceObserver
const mockDisconnect = jest.fn();
const mockObserve = jest.fn();
const mockTakeRecords = jest.fn();

class MockPerformanceObserver {
  constructor(callback: (list: any) => void) {
    this.callback = callback;
  }
  callback: (list: any) => void;
  disconnect = mockDisconnect;
  observe = mockObserve;
  takeRecords = mockTakeRecords;
}

(window as any).PerformanceObserver = MockPerformanceObserver;

// Test component that uses analytics hooks
const TestComponent = () => {
  const { trackEvent } = useAnalytics();

  return (
    <div>
      <button onClick={() => trackEvent('test_event', { value: 'test' })}>Track Event</button>
      <button onClick={() => trackEvent('page_view', { page_path: '/test-page' })}>Track Page View</button>
      <button onClick={() => trackEvent('purchase', { value: 100 })}>Track Conversion</button>
      <button onClick={() => trackEvent('error', { error_message: 'test error' })}>Track Error</button>
    </div>
  );
};

describe('Analytics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes Google Analytics', () => {
    render(
      <AnalyticsProvider>
        <div>Test</div>
      </AnalyticsProvider>
    );

    expect(mockGtag).toHaveBeenCalledWith('js', expect.any(Date));
    expect(mockGtag).toHaveBeenCalledWith('config', 'G-XXXXXXXXXX');
  });

  it('tracks events', () => {
    const { getByText } = render(
      <AnalyticsProvider>
        <TestComponent />
      </AnalyticsProvider>
    );

    fireEvent.click(getByText('Track Event'));

    expect(mockGtag).toHaveBeenCalledWith('event', 'test_event', {
      value: 'test',
    });
  });

  it('tracks page views', () => {
    const { getByText } = render(
      <AnalyticsProvider>
        <TestComponent />
      </AnalyticsProvider>
    );

    fireEvent.click(getByText('Track Page View'));

    expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {
      page_path: '/test-page',
    });
  });

  it('tracks conversions', () => {
    const { getByText } = render(
      <AnalyticsProvider>
        <TestComponent />
      </AnalyticsProvider>
    );

    fireEvent.click(getByText('Track Conversion'));

    expect(mockGtag).toHaveBeenCalledWith('event', 'purchase', {
      value: 100,
    });
  });

  it('tracks errors', () => {
    const { getByText } = render(
      <AnalyticsProvider>
        <TestComponent />
      </AnalyticsProvider>
    );

    fireEvent.click(getByText('Track Error'));

    expect(mockGtag).toHaveBeenCalledWith('event', 'error', {
      error_message: 'test error',
      error_stack: expect.any(String),
    });
  });

  it('initializes performance monitoring', () => {
    render(
      <AnalyticsProvider>
        <div>Test</div>
      </AnalyticsProvider>
    );

    expect(mockObserve).toHaveBeenCalledWith({
      entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'first-input'],
    });
  });

  it('tracks performance metrics', () => {
    const { unmount } = render(
      <AnalyticsProvider>
        <div>Test</div>
      </AnalyticsProvider>
    );

    const observer = new MockPerformanceObserver(() => {});
    const mockEntry = {
      name: 'FCP',
      entryType: 'paint',
      startTime: 1000,
      duration: 0,
    };

    act(() => {
      observer.callback({
        getEntries: () => [mockEntry],
      });
    });

    expect(mockGtag).toHaveBeenCalledWith('event', 'performance', {
      metric_name: 'FCP',
      value: 1000,
    });

    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('tracks visibility', () => {
    const mockIntersectionObserver = jest.fn();
    window.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: mockIntersectionObserver,
      disconnect: jest.fn(),
    }));

    render(
      <AnalyticsProvider>
        <div data-track-visibility>Test</div>
      </AnalyticsProvider>
    );

    expect(mockIntersectionObserver).toHaveBeenCalled();
  });

  it('tracks clicks', () => {
    render(
      <AnalyticsProvider>
        <button data-track-click="test_button">Click Me</button>
      </AnalyticsProvider>
    );

    const button = document.querySelector('[data-track-click]');
    fireEvent.click(button!);

    expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
      element_id: 'test_button',
    });
  });
}); 