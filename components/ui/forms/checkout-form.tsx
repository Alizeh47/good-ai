import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAnalytics } from '../common/analytics';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

interface CheckoutFormProps {
  cartItems: CartItem[];
  shippingMethods: ShippingMethod[];
  onSubmit?: (data: any) => Promise<void>;
}

interface FormData {
  shipping: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  payment: {
    cardNumber: string;
    expiry: string;
    cvc: string;
    nameOnCard: string;
  };
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  cartItems,
  shippingMethods,
  onSubmit,
}) => {
  const { trackEvent, trackConversion } = useAnalytics();
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment'>('shipping');
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0].id);
  const [formData, setFormData] = useState<FormData>({
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    },
    payment: {
      cardNumber: '',
      expiry: '',
      cvc: '',
      nameOnCard: '',
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = shippingMethods.find((method) => method.id === selectedShipping)?.price || 0;
  const total = subtotal + shippingCost;

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\d{10}$/.test(phone);
  };

  const validateCardNumber = (cardNumber: string) => {
    return /^\d{16}$/.test(cardNumber);
  };

  const validateShippingForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.shipping.firstName) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.shipping.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.shipping.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.shipping.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.shipping.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.shipping.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.shipping.address) {
      newErrors.address = 'Address is required';
    }
    if (!formData.shipping.city) {
      newErrors.city = 'City is required';
    }
    if (!formData.shipping.state) {
      newErrors.state = 'State is required';
    }
    if (!formData.shipping.zip) {
      newErrors.zip = 'ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.payment.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!validateCardNumber(formData.payment.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    if (!formData.payment.expiry) {
      newErrors.expiry = 'Expiry date is required';
    }
    if (!formData.payment.cvc) {
      newErrors.cvc = 'CVC is required';
    }
    if (!formData.payment.nameOnCard) {
      newErrors.nameOnCard = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    step: 'shipping' | 'payment',
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value,
      },
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleContinueToPayment = () => {
    if (validateShippingForm()) {
      setCurrentStep('payment');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validatePaymentForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit({
          ...formData,
          selectedShipping,
          total,
        });
      }

      const transactionId = Math.random().toString(36).substr(2, 9);

      trackEvent('purchase', {
        transaction_id: transactionId,
        value: total,
        items: cartItems,
      });

      trackConversion('purchase', {
        value: total,
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-warm-cream">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">
                      {item.size} / {item.color}
                    </p>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-600">Quantity: {item.quantity}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {currentStep === 'shipping' ? (
              <div className="space-y-6">
                <h2 className="text-xl font-medium">Shipping Information</h2>

                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.shipping.firstName}
                      onChange={(e) =>
                        handleInputChange('shipping', 'firstName', e.target.value)
                      }
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.shipping.lastName}
                      onChange={(e) =>
                        handleInputChange('shipping', 'lastName', e.target.value)
                      }
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.shipping.email}
                      onChange={(e) =>
                        handleInputChange('shipping', 'email', e.target.value)
                      }
                      onBlur={(e) => {
                        if (!validateEmail(e.target.value)) {
                          setErrors((prev) => ({
                            ...prev,
                            email: 'Please enter a valid email address',
                          }));
                        }
                      }}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.shipping.phone}
                      onChange={(e) =>
                        handleInputChange('shipping', 'phone', e.target.value)
                      }
                      onBlur={(e) => {
                        if (!validatePhone(e.target.value)) {
                          setErrors((prev) => ({
                            ...prev,
                            phone: 'Please enter a valid phone number',
                          }));
                        }
                      }}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.shipping.address}
                    onChange={(e) =>
                      handleInputChange('shipping', 'address', e.target.value)
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                {/* City, State, ZIP */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="city">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formData.shipping.city}
                      onChange={(e) =>
                        handleInputChange('shipping', 'city', e.target.value)
                      }
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="state">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={formData.shipping.state}
                      onChange={(e) =>
                        handleInputChange('shipping', 'state', e.target.value)
                      }
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="zip">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      value={formData.shipping.zip}
                      onChange={(e) =>
                        handleInputChange('shipping', 'zip', e.target.value)
                      }
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.zip ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.zip && (
                      <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
                    )}
                  </div>
                </div>

                {/* Shipping Methods */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Shipping Method</h3>
                  <div className="space-y-3">
                    {shippingMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer ${
                          selectedShipping === method.id
                            ? 'border-teal-600 bg-teal-50'
                            : 'border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={selectedShipping === method.id}
                            onChange={(e) => setSelectedShipping(e.target.value)}
                            className="w-4 h-4 text-teal-600"
                          />
                          <div className="ml-3">
                            <span className="font-medium">{method.name}</span>
                            <p className="text-sm text-gray-600">
                              {method.estimatedDays} business days
                            </p>
                          </div>
                        </div>
                        <span className="font-medium">${method.price.toFixed(2)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleContinueToPayment}
                  className="w-full bg-teal-600 text-white py-3 rounded-full font-medium"
                >
                  Continue to Payment
                </motion.button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">Payment Information</h2>
                  <button
                    type="button"
                    onClick={() => setCurrentStep('shipping')}
                    className="text-teal-600 hover:text-teal-700"
                  >
                    Edit Shipping
                  </button>
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="cardNumber">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={formData.payment.cardNumber}
                    onChange={(e) =>
                      handleInputChange('payment', 'cardNumber', e.target.value)
                    }
                    onBlur={(e) => {
                      if (!validateCardNumber(e.target.value)) {
                        setErrors((prev) => ({
                          ...prev,
                          cardNumber: 'Please enter a valid card number',
                        }));
                      }
                    }}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength={16}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                  )}
                </div>

                {/* Expiry & CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="expiry">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      value={formData.payment.expiry}
                      onChange={(e) =>
                        handleInputChange('payment', 'expiry', e.target.value)
                      }
                      placeholder="MM/YY"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.expiry ? 'border-red-500' : 'border-gray-300'
                      }`}
                      maxLength={5}
                    />
                    {errors.expiry && (
                      <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="cvc">
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      value={formData.payment.cvc}
                      onChange={(e) =>
                        handleInputChange('payment', 'cvc', e.target.value)
                      }
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.cvc ? 'border-red-500' : 'border-gray-300'
                      }`}
                      maxLength={3}
                    />
                    {errors.cvc && (
                      <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
                    )}
                  </div>
                </div>

                {/* Name on Card */}
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="nameOnCard">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="nameOnCard"
                    value={formData.payment.nameOnCard}
                    onChange={(e) =>
                      handleInputChange('payment', 'nameOnCard', e.target.value)
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.nameOnCard ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.nameOnCard && (
                    <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>
                  )}
                </div>

                {submitError && (
                  <div className="bg-red-50 text-red-500 p-4 rounded-lg">
                    {submitError}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 text-white py-3 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </motion.button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm; 