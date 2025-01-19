import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthModal from '../../../../components/ui/auth/auth-modal';
import { AnalyticsProvider } from '../../../../components/ui/common/analytics';

// Mock the analytics context
jest.mock('../../../../components/ui/common/analytics', () => ({
  ...jest.requireActual('../../../../components/ui/common/analytics'),
  useAnalytics: () => ({
    trackEvent: jest.fn(),
  }),
}));

describe('AuthModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  const renderAuthModal = (props = {}) => {
    return render(
      <AnalyticsProvider>
        <AuthModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          {...props}
        />
      </AnalyticsProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form by default', () => {
    renderAuthModal();
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('switches to register form when clicking sign up', async () => {
    renderAuthModal();
    await userEvent.click(screen.getByText('Sign up'));
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
  });

  it('switches to forgot password form when clicking forgot password', async () => {
    renderAuthModal();
    await userEvent.click(screen.getByText('Forgot your password?'));
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
  });

  it('validates email format', async () => {
    renderAuthModal();
    const emailInput = screen.getByPlaceholderText('you@example.com');
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.click(screen.getByText('Sign In'));
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  it('validates required fields in login form', async () => {
    renderAuthModal();
    await userEvent.click(screen.getByText('Sign In'));
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('validates password match in register form', async () => {
    renderAuthModal();
    await userEvent.click(screen.getByText('Sign up'));
    
    await userEvent.type(screen.getByPlaceholderText('John Doe'), 'Test User');
    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'password123');
    await userEvent.type(screen.getAllByPlaceholderText('••••••••')[1], 'password456');
    
    await userEvent.click(screen.getByText('Create Account'));
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('calls onSubmit with correct data for login', async () => {
    renderAuthModal();
    
    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'password123');
    
    await userEvent.click(screen.getByText('Sign In'));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: '',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: '',
      mode: 'login',
    });
  });

  it('calls onSubmit with correct data for registration', async () => {
    renderAuthModal();
    await userEvent.click(screen.getByText('Sign up'));
    
    await userEvent.type(screen.getByPlaceholderText('John Doe'), 'Test User');
    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'password123');
    await userEvent.type(screen.getAllByPlaceholderText('••••••••')[1], 'password123');
    
    await userEvent.click(screen.getByText('Create Account'));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      mode: 'register',
    });
  });

  it('calls onSubmit with correct data for password reset', async () => {
    renderAuthModal();
    await userEvent.click(screen.getByText('Forgot your password?'));
    
    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@example.com');
    await userEvent.click(screen.getByText('Send Reset Link'));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: '',
      email: 'test@example.com',
      password: '',
      confirmPassword: '',
      mode: 'forgot-password',
    });
  });

  it('displays loading state during submission', async () => {
    mockOnSubmit.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));
    renderAuthModal();
    
    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'password123');
    
    await userEvent.click(screen.getByText('Sign In'));
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('handles submission errors', async () => {
    const error = new Error('Invalid credentials');
    mockOnSubmit.mockRejectedValue(error);
    renderAuthModal();
    
    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'password123');
    
    await userEvent.click(screen.getByText('Sign In'));
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('closes modal when clicking outside', async () => {
    renderAuthModal();
    const modalOverlay = screen.getByTestId('modal-overlay');
    await userEvent.click(modalOverlay);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('closes modal when clicking close button', async () => {
    renderAuthModal();
    const closeButton = screen.getByLabelText('Close');
    await userEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
}); 