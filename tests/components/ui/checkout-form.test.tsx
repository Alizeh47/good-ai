import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckoutForm from '../../../components/ui/forms/checkout-form';
import { useAnalytics } from '../../../components/ui/common/analytics';

// Mock analytics hook
jest.mock('../../../components/ui/common/analytics', () => ({
  useAnalytics: jest.fn(() => ({
    trackEvent: jest.fn(),
  })),
}));

describe('CheckoutForm', () => {
  const mockCartItems = [
    {
      id: '1',
      name: 'Test Product',
      price: 99.99,
      quantity: 2,
      size: 'M',
      color: 'Blue',
      image: '/test-image.jpg',
    },
  ];

  const mockShippingMethods = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 5.99,
      estimatedDays: '3-5',
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 14.99,
      estimatedDays: '1-2',
    },
  ];

  const fillShippingForm = async () => {
    await userEvent.type(screen.getByLabelText(/first name/i), 'John');
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/phone/i), '1234567890');
    await userEvent.type(screen.getByLabelText(/address/i), '123 Main St');
    await userEvent.type(screen.getByLabelText(/city/i), 'New York');
    await userEvent.type(screen.getByLabelText(/state/i), 'NY');
    await userEvent.type(screen.getByLabelText(/zip/i), '10001');
  };

  const fillPaymentForm = async () => {
    await userEvent.type(screen.getByLabelText(/card number/i), '4242424242424242');
    await userEvent.type(screen.getByLabelText(/expiry/i), '12/25');
    await userEvent.type(screen.getByLabelText(/cvc/i), '123');
    await userEvent.type(screen.getByLabelText(/name on card/i), 'John Doe');
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders checkout form correctly', () => {
    render(
      <CheckoutForm
        cartItems={mockCartItems}
        shippingMethods={mockShippingMethods}
      />
    );

    // Check if cart summary is displayed
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();

    // Check if shipping methods are displayed
    expect(screen.getByText('Standard Shipping')).toBeInTheDocument();
    expect(screen.getByText('Express Shipping')).toBeInTheDocument();

    // Check if form sections are present
    expect(screen.getByText('Shipping Information')).toBeInTheDocument();
    expect(screen.getByText('Payment Information')).toBeInTheDocument();
  });

  it('calculates total correctly', () => {
    render(
      <CheckoutForm
        cartItems={mockCartItems}
        shippingMethods={mockShippingMethods}
      />
    );

    // Subtotal: 2 * $99.99 = $199.98
    expect(screen.getByText('$199.98')).toBeInTheDocument();

    // Select standard shipping
    fireEvent.click(screen.getByLabelText(/standard shipping/i));
    expect(screen.getByText('$205.97')).toBeInTheDocument(); // Total with standard shipping

    // Select express shipping
    fireEvent.click(screen.getByLabelText(/express shipping/i));
    expect(screen.getByText('$214.97')).toBeInTheDocument(); // Total with express shipping
  });

  it('validates shipping form fields', async () => {
    render(
      <CheckoutForm
        cartItems={mockCartItems}
        shippingMethods={mockShippingMethods}
      />
    );

    // Try to proceed without filling required fields
    fireEvent.click(screen.getByText('Continue to Payment'));

    // Check for error messages
    expect(await screen.findByText('First name is required')).toBeInTheDocument();
    expect(await screen.findByText('Last name is required')).toBeInTheDocument();
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Phone is required')).toBeInTheDocument();
    expect(await screen.findByText('Address is required')).toBeInTheDocument();
    expect(await screen.findByText('City is required')).toBeInTheDocument();
    expect(await screen.findByText('State is required')).toBeInTheDocument();
    expect(await screen.findByText('ZIP code is required')).toBeInTheDocument();
  });

  it('validates payment form fields', async () => {
    render(
      <CheckoutForm
        cartItems={mockCartItems}
        shippingMethods={mockShippingMethods}
      />
    );

    // Fill shipping form and proceed to payment
    await fillShippingForm();
    fireEvent.click(screen.getByText('Continue to Payment'));

    // Try to place order without filling payment details
    fireEvent.click(screen.getByText('Place Order'));

    // Check for error messages
    expect(await screen.findByText('Card number is required')).toBeInTheDocument();
    expect(await screen.findByText('Expiry date is required')).toBeInTheDocument();
    expect(await screen.findByText('CVC is required')).toBeInTheDocument();
    expect(await screen.findByText('Name on card is required')).toBeInTheDocument();
  });

  it('handles successful form submission', async () => {
    const { trackEvent } = useAnalytics();
    const mockOnSubmit = jest.fn();

    render(
      <CheckoutForm
        cartItems={mockCartItems}
        shippingMethods={mockShippingMethods}
        onSubmit={mockOnSubmit}
      />
    );

    // Fill shipping form
    await fillShippingForm();
    fireEvent.click(screen.getByText('Continue to Payment'));

    // Fill payment form
    await fillPaymentForm();

    // Place order
    fireEvent.click(screen.getByText('Place Order'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(trackEvent).toHaveBeenCalledWith('purchase', {
        transaction_id: expect.any(String),
        value: 214.97,
        items: mockCartItems,
      });
    });
  });

  it('handles form errors gracefully', async () => {
    const mockOnSubmit = jest.fn().mockRejectedValue(new Error('Payment failed'));

    render(
      <CheckoutForm
        cartItems={mockCartItems}
        shippingMethods={mockShippingMethods}
        onSubmit={mockOnSubmit}
      />
    );

    // Fill forms and submit
    await fillShippingForm();
    fireEvent.click(screen.getByText('Continue to Payment'));
    await fillPaymentForm();
    fireEvent.click(screen.getByText('Place Order'));

    // Check for error message
    expect(await screen.findByText('Payment failed')).toBeInTheDocument();
  });

  it('allows editing shipping information from payment step', async () => {
    render(
      <CheckoutForm
        cartItems={mockCartItems}
        shippingMethods={mockShippingMethods}
      />
    );

    // Fill shipping form and proceed to payment
    await fillShippingForm();
    fireEvent.click(screen.getByText('Continue to Payment'));

    // Click edit shipping
    fireEvent.click(screen.getByText('Edit Shipping'));

    // Verify we're back at shipping step
    expect(screen.getByLabelText(/first name/i)).toHaveValue('John');
    expect(screen.getByText('Continue to Payment')).toBeInTheDocument();
  });

  it('preserves form data when switching between steps', async () => {
    render(
      <CheckoutForm
        cartItems={mockCartItems}
        shippingMethods={mockShippingMethods}
      />
    );

    // Fill shipping form
    await fillShippingForm();
    fireEvent.click(screen.getByText('Continue to Payment'));

    // Fill payment form
    await fillPaymentForm();

    // Go back to shipping
    fireEvent.click(screen.getByText('Edit Shipping'));

    // Verify shipping data is preserved
    expect(screen.getByLabelText(/first name/i)).toHaveValue('John');
    expect(screen.getByLabelText(/last name/i)).toHaveValue('Doe');

    // Go back to payment
    fireEvent.click(screen.getByText('Continue to Payment'));

    // Verify payment data is preserved
    expect(screen.getByLabelText(/card number/i)).toHaveValue('4242424242424242');
    expect(screen.getByLabelText(/expiry/i)).toHaveValue('12/25');
  });

  it('validates email format', async () => {
    render(
      <CheckoutForm
        cartItems={mockCartItems}
        shippingMethods={mockShippingMethods}
      />
    );

    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);

    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'valid@email.com');
    fireEvent.blur(emailInput);

    expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
  });

  it('validates phone number format', async () => {
    render(
      <CheckoutForm
        cartItems={mockCartItems}
        shippingMethods={mockShippingMethods}
      />
    );

    const phoneInput = screen.getByLabelText(/phone/i);
    await userEvent.type(phoneInput, '123');
    fireEvent.blur(phoneInput);

    expect(await screen.findByText('Please enter a valid phone number')).toBeInTheDocument();

    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, '1234567890');
    fireEvent.blur(phoneInput);

    expect(screen.queryByText('Please enter a valid phone number')).not.toBeInTheDocument();
  });

  it('validates card number format', async () => {
    render(
      <CheckoutForm
        cartItems={mockCartItems}
        shippingMethods={mockShippingMethods}
      />
    );

    await fillShippingForm();
    fireEvent.click(screen.getByText('Continue to Payment'));

    const cardInput = screen.getByLabelText(/card number/i);
    await userEvent.type(cardInput, '1234');
    fireEvent.blur(cardInput);

    expect(await screen.findByText('Please enter a valid card number')).toBeInTheDocument();

    await userEvent.clear(cardInput);
    await userEvent.type(cardInput, '4242424242424242');
    fireEvent.blur(cardInput);

    expect(screen.queryByText('Please enter a valid card number')).not.toBeInTheDocument();
  });
}); 