import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserProfile from '../../../../components/ui/user/profile';
import { AnalyticsProvider } from '../../../../components/ui/common/analytics';

// Mock the analytics context
jest.mock('../../../../components/ui/common/analytics', () => ({
  ...jest.requireActual('../../../../components/ui/common/analytics'),
  useAnalytics: () => ({
    trackEvent: jest.fn(),
  }),
}));

describe('UserProfile', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 000-0000',
  };

  const mockOrders = [{ id: '1', date: '2024-01-01', status: 'delivered', total: 99.99, items: [] }];
  const mockWishlist = [{ id: '1', name: 'Test Product', price: 99.99, image: '/test.jpg' }];
  const mockAddresses = [{ id: '1', type: 'shipping', firstName: 'John', lastName: 'Doe', address: '123 Main St', city: 'Test', state: 'TS', zip: '12345', phone: '1234567890', isDefault: true }];

  const mockOnLogout = jest.fn();
  const mockOnUpdateProfile = jest.fn();

  const renderUserProfile = (props = {}) => {
    return render(
      <AnalyticsProvider>
        <UserProfile
          user={mockUser}
          orders={mockOrders}
          wishlist={mockWishlist}
          addresses={mockAddresses}
          onLogout={mockOnLogout}
          onUpdateProfile={mockOnUpdateProfile}
          {...props}
        />
      </AnalyticsProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user information correctly', () => {
    renderUserProfile();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('displays user avatar placeholder when no avatar is provided', () => {
    renderUserProfile();
    const avatarPlaceholder = screen.getByTestId('avatar-placeholder');
    expect(avatarPlaceholder).toBeInTheDocument();
  });

  it('displays user avatar when provided', () => {
    const userWithAvatar = {
      ...mockUser,
      avatar: 'https://example.com/avatar.jpg',
    };
    renderUserProfile({ user: userWithAvatar });
    const avatar = screen.getByAltText(userWithAvatar.name);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', userWithAvatar.avatar);
  });

  it('switches between tabs correctly', async () => {
    renderUserProfile();
    
    await userEvent.click(screen.getByText('Orders'));
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
    
    await userEvent.click(screen.getByText('Wishlist'));
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
    
    await userEvent.click(screen.getByText('Addresses'));
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
    
    await userEvent.click(screen.getByText('Settings'));
    expect(screen.getByText('Account Settings')).toBeInTheDocument();
  });

  it('enables form editing when clicking Edit Profile', async () => {
    renderUserProfile();
    await userEvent.click(screen.getByText('Settings'));
    await userEvent.click(screen.getByText('Edit Profile'));
    
    const nameInput = screen.getByDisplayValue(mockUser.name);
    const emailInput = screen.getByDisplayValue(mockUser.email);
    const phoneInput = screen.getByDisplayValue(mockUser.phone);
    
    expect(nameInput).not.toBeDisabled();
    expect(emailInput).not.toBeDisabled();
    expect(phoneInput).not.toBeDisabled();
  });

  it('validates required fields when updating profile', async () => {
    renderUserProfile();
    await userEvent.click(screen.getByText('Settings'));
    await userEvent.click(screen.getByText('Edit Profile'));
    
    const nameInput = screen.getByDisplayValue(mockUser.name);
    await userEvent.clear(nameInput);
    await userEvent.click(screen.getByText('Save Changes'));
    
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('validates email format when updating profile', async () => {
    renderUserProfile();
    await userEvent.click(screen.getByText('Settings'));
    await userEvent.click(screen.getByText('Edit Profile'));
    
    const emailInput = screen.getByDisplayValue(mockUser.email);
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.click(screen.getByText('Save Changes'));
    
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  it('calls onUpdateProfile with correct data when form is valid', async () => {
    renderUserProfile();
    await userEvent.click(screen.getByText('Settings'));
    await userEvent.click(screen.getByText('Edit Profile'));
    
    const nameInput = screen.getByDisplayValue(mockUser.name);
    const emailInput = screen.getByDisplayValue(mockUser.email);
    const phoneInput = screen.getByDisplayValue(mockUser.phone);
    
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Jane Doe');
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'jane@example.com');
    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, '+1 (555) 111-1111');
    
    await userEvent.click(screen.getByText('Save Changes'));
    
    expect(mockOnUpdateProfile).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+1 (555) 111-1111',
    });
  });

  it('handles profile update errors', async () => {
    const error = new Error('Failed to update profile');
    mockOnUpdateProfile.mockRejectedValue(error);
    
    renderUserProfile();
    await userEvent.click(screen.getByText('Settings'));
    await userEvent.click(screen.getByText('Edit Profile'));
    await userEvent.click(screen.getByText('Save Changes'));
    
    await waitFor(() => {
      expect(screen.getByText('Failed to update profile')).toBeInTheDocument();
    });
  });

  it('resets form when clicking Cancel', async () => {
    renderUserProfile();
    await userEvent.click(screen.getByText('Settings'));
    await userEvent.click(screen.getByText('Edit Profile'));
    
    const nameInput = screen.getByDisplayValue(mockUser.name);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Jane Doe');
    
    await userEvent.click(screen.getByText('Cancel'));
    
    expect(screen.getByDisplayValue(mockUser.name)).toBeInTheDocument();
  });

  it('calls onLogout when clicking Logout', async () => {
    renderUserProfile();
    await userEvent.click(screen.getByText('Logout'));
    expect(mockOnLogout).toHaveBeenCalled();
  });
}); 