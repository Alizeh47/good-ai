import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserProfile from '../../../components/ui/user/profile';
import { useAnalytics } from '../../../components/ui/common/analytics';

// Mock analytics hook
jest.mock('../../../components/ui/common/analytics', () => ({
  useAnalytics: jest.fn(() => ({
    trackEvent: jest.fn(),
  })),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('UserProfile', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatar.jpg',
  };

  const mockOrders = [
    {
      id: '1',
      date: '2024-01-01',
      status: 'delivered',
      total: 199.98,
      items: [
        {
          id: '1',
          name: 'Test Product',
          price: 99.99,
          quantity: 2,
          image: '/test-image.jpg',
        },
      ],
    },
  ];

  const mockWishlist = [
    {
      id: '1',
      name: 'Test Product',
      price: 99.99,
      image: '/test-image.jpg',
    },
  ];

  const mockAddresses = [
    {
      id: '1',
      type: 'shipping',
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      phone: '1234567890',
      isDefault: true,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockOnLogout = jest.fn();
  const mockOnUpdateProfile = jest.fn();

  it('renders user profile correctly', () => {
    render(
      <UserProfile
        user={mockUser}
        orders={mockOrders}
        wishlist={mockWishlist}
        addresses={mockAddresses}
        onLogout={mockOnLogout}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toHaveAttribute('src', '/avatar.jpg');
  });

  it('switches between tabs correctly', () => {
    render(
      <UserProfile
        user={mockUser}
        orders={mockOrders}
        wishlist={mockWishlist}
        addresses={mockAddresses}
        onLogout={mockOnLogout}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    // Check if Orders tab is active by default
    expect(screen.getByText('Orders')).toHaveClass('active');

    // Switch to Wishlist tab
    fireEvent.click(screen.getByText('Wishlist'));
    expect(screen.getByText('Wishlist')).toHaveClass('active');

    // Switch to Addresses tab
    fireEvent.click(screen.getByText('Addresses'));
    expect(screen.getByText('Addresses')).toHaveClass('active');

    // Switch to Settings tab
    fireEvent.click(screen.getByText('Settings'));
    expect(screen.getByText('Settings')).toHaveClass('active');
  });

  it('displays order history correctly', () => {
    render(
      <UserProfile
        user={mockUser}
        orders={mockOrders}
        wishlist={mockWishlist}
        addresses={mockAddresses}
        onLogout={mockOnLogout}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    expect(screen.getByText('Order #1')).toBeInTheDocument();
    expect(screen.getByText('$199.98')).toBeInTheDocument();
    expect(screen.getByText('Delivered')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
  });

  it('displays wishlist items correctly', () => {
    render(
      <UserProfile
        user={mockUser}
        orders={mockOrders}
        wishlist={mockWishlist}
        addresses={mockAddresses}
        onLogout={mockOnLogout}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    fireEvent.click(screen.getByText('Wishlist'));

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('displays addresses correctly', () => {
    render(
      <UserProfile
        user={mockUser}
        orders={mockOrders}
        wishlist={mockWishlist}
        addresses={mockAddresses}
        onLogout={mockOnLogout}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    fireEvent.click(screen.getByText('Addresses'));

    expect(screen.getByText('Default Shipping Address')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('New York, NY 10001')).toBeInTheDocument();
  });

  it('handles adding a new address', async () => {
    const mockOnAddAddress = jest.fn();

    render(
      <UserProfile
        user={mockUser}
        orders={mockOrders}
        wishlist={mockWishlist}
        addresses={mockAddresses}
        onLogout={mockOnLogout}
        onUpdateProfile={mockOnUpdateProfile}
        onAddAddress={mockOnAddAddress}
      />
    );

    fireEvent.click(screen.getByText('Addresses'));
    fireEvent.click(screen.getByText('Add New Address'));

    await userEvent.type(screen.getByLabelText(/first name/i), 'Jane');
    await userEvent.type(screen.getByLabelText(/last name/i), 'Smith');
    await userEvent.type(screen.getByLabelText(/address/i), '456 Oak St');
    await userEvent.type(screen.getByLabelText(/city/i), 'Los Angeles');
    await userEvent.type(screen.getByLabelText(/state/i), 'CA');
    await userEvent.type(screen.getByLabelText(/zip/i), '90001');
    await userEvent.type(screen.getByLabelText(/phone/i), '9876543210');

    fireEvent.click(screen.getByText('Save Address'));

    await waitFor(() => {
      expect(mockOnAddAddress).toHaveBeenCalledWith({
        firstName: 'Jane',
        lastName: 'Smith',
        address: '456 Oak St',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90001',
        phone: '9876543210',
        type: 'shipping',
        isDefault: false,
      });
    });
  });

  it('handles removing an address', async () => {
    const mockOnRemoveAddress = jest.fn();

    render(
      <UserProfile
        user={mockUser}
        orders={mockOrders}
        wishlist={mockWishlist}
        addresses={mockAddresses}
        onLogout={mockOnLogout}
        onUpdateProfile={mockOnUpdateProfile}
        onRemoveAddress={mockOnRemoveAddress}
      />
    );

    fireEvent.click(screen.getByText('Addresses'));
    fireEvent.click(screen.getByText('Remove'));

    // Confirm removal
    fireEvent.click(screen.getByText('Yes, Remove'));

    await waitFor(() => {
      expect(mockOnRemoveAddress).toHaveBeenCalledWith('1');
    });
  });

  it('handles updating user settings', async () => {
    const mockOnUpdateSettings = jest.fn();

    render(
      <UserProfile
        user={mockUser}
        orders={mockOrders}
        wishlist={mockWishlist}
        addresses={mockAddresses}
        onLogout={mockOnLogout}
        onUpdateProfile={mockOnUpdateProfile}
        onUpdateSettings={mockOnUpdateSettings}
      />
    );

    fireEvent.click(screen.getByText('Settings'));

    await userEvent.type(screen.getByLabelText(/name/i), 'John Smith');
    await userEvent.type(screen.getByLabelText(/email/i), 'john.smith@example.com');

    fireEvent.click(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(mockOnUpdateSettings).toHaveBeenCalledWith({
        name: 'John Smith',
        email: 'john.smith@example.com',
      });
    });
  });

  it('handles removing wishlist items', async () => {
    const mockOnRemoveFromWishlist = jest.fn();
    const { trackEvent } = useAnalytics();

    render(
      <UserProfile
        user={mockUser}
        orders={mockOrders}
        wishlist={mockWishlist}
        addresses={mockAddresses}
        onLogout={mockOnLogout}
        onUpdateProfile={mockOnUpdateProfile}
        onRemoveFromWishlist={mockOnRemoveFromWishlist}
      />
    );

    fireEvent.click(screen.getByText('Wishlist'));
    fireEvent.click(screen.getByText('Remove'));

    await waitFor(() => {
      expect(mockOnRemoveFromWishlist).toHaveBeenCalledWith('1');
      expect(trackEvent).toHaveBeenCalledWith('remove_from_wishlist', {
        product_id: '1',
        product_name: 'Test Product',
      });
    });
  });

  it('handles moving wishlist items to cart', async () => {
    const mockOnMoveToCart = jest.fn();
    const { trackEvent } = useAnalytics();

    render(
      <UserProfile
        user={mockUser}
        orders={mockOrders}
        wishlist={mockWishlist}
        addresses={mockAddresses}
        onLogout={mockOnLogout}
        onUpdateProfile={mockOnUpdateProfile}
        onMoveToCart={mockOnMoveToCart}
      />
    );

    fireEvent.click(screen.getByText('Wishlist'));
    fireEvent.click(screen.getByText('Move to Cart'));

    await waitFor(() => {
      expect(mockOnMoveToCart).toHaveBeenCalledWith('1');
      expect(trackEvent).toHaveBeenCalledWith('move_to_cart', {
        product_id: '1',
        product_name: 'Test Product',
      });
    });
  });

  it('validates address form fields', async () => {
    render(
      <UserProfile
        user={mockUser}
        orders={mockOrders}
        wishlist={mockWishlist}
        addresses={mockAddresses}
        onLogout={mockOnLogout}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    fireEvent.click(screen.getByText('Addresses'));
    fireEvent.click(screen.getByText('Add New Address'));

    // Try to save without filling required fields
    fireEvent.click(screen.getByText('Save Address'));

    expect(await screen.findByText('First name is required')).toBeInTheDocument();
    expect(await screen.findByText('Last name is required')).toBeInTheDocument();
    expect(await screen.findByText('Address is required')).toBeInTheDocument();
    expect(await screen.findByText('City is required')).toBeInTheDocument();
    expect(await screen.findByText('State is required')).toBeInTheDocument();
    expect(await screen.findByText('ZIP code is required')).toBeInTheDocument();
    expect(await screen.findByText('Phone is required')).toBeInTheDocument();
  });

  it('validates settings form fields', async () => {
    render(
      <UserProfile
        user={mockUser}
        orders={mockOrders}
        wishlist={mockWishlist}
        addresses={mockAddresses}
        onLogout={mockOnLogout}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    fireEvent.click(screen.getByText('Settings'));

    // Clear fields and try to save
    await userEvent.clear(screen.getByLabelText(/name/i));
    await userEvent.clear(screen.getByLabelText(/email/i));
    fireEvent.click(screen.getByText('Save Changes'));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Email is required')).toBeInTheDocument();

    // Enter invalid email
    await userEvent.type(screen.getByLabelText(/email/i), 'invalid-email');
    fireEvent.click(screen.getByText('Save Changes'));

    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
  });
}); 