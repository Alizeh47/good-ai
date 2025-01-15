import { render, screen } from '@testing-library/react';
import { ErrorBoundary, ErrorMessage } from '../error-boundary';

const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Prevent console.error from cluttering the test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders fallback UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops, something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText(/Please try refreshing the page/i)
    ).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom error message</div>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });
});

describe('ErrorMessage', () => {
  it('renders error message', () => {
    const error = new Error('Test error message');
    render(<ErrorMessage error={error} />);

    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });
}); 