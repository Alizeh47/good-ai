export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public errors?: any[]
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function isAPIError(error: any): error is APIError {
  return error instanceof APIError;
}

export async function handleAPIResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new APIError(
      errorData.message || 'An unexpected error occurred',
      response.status,
      errorData.code,
      errorData.errors
    );
  }
  return response.json();
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof APIError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  options: {
    onError?: (error: Error) => void;
    fallback?: T;
  } = {}
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (options.onError) {
      options.onError(error instanceof Error ? error : new Error(String(error)));
    }
    if (options.fallback !== undefined) {
      return options.fallback;
    }
    throw error;
  }
}

export function isNetworkError(error: unknown): boolean {
  return (
    error instanceof TypeError &&
    (error.message === 'Failed to fetch' ||
      error.message === 'Network request failed' ||
      error.message.includes('network'))
  );
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    shouldRetry?: (error: Error) => boolean;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    shouldRetry = isNetworkError,
  } = options;

  let lastError: Error;
  let delay = initialDelay;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (!shouldRetry(lastError) || attempt === maxRetries - 1) {
        throw lastError;
      }

      await new Promise(resolve => setTimeout(resolve, delay));
      delay = Math.min(delay * 2, maxDelay);
    }
  }

  throw lastError!;
} 