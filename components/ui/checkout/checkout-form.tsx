import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, MapPin, ChevronRight, Check } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface Address {
  id: string;
  type: 'billing' | 'shipping';
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Delivery in 5-7 business days',
    price: 0,
    estimatedDays: '5-7',
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Delivery in 2-3 business days',
    price: 15,
    estimatedDays: '2-3',
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day delivery',
    price: 25,
    estimatedDays: '1',
  },
];

interface CheckoutFormProps {
  addresses: Address[];
  subtotal: number;
  onSubmit: (data: any) => void;
}

export default function CheckoutForm({ addresses, subtotal, onSubmit }: CheckoutFormProps) {
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [selectedShippingAddress, setSelectedShippingAddress] = useState<string>('');
  const [selectedBillingAddress, setSelectedBillingAddress] = useState<string>('');
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>('standard');
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingAddresses = addresses.filter(addr => addr.type === 'shipping');
  const billingAddresses = addresses.filter(addr => addr.type === 'billing');
  const selectedShipping = shippingMethods.find(method => method.id === selectedShippingMethod);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    onSubmit({
      shippingAddress: addresses.find(addr => addr.id === selectedShippingAddress),
      billingAddress: sameAsShipping
        ? addresses.find(addr => addr.id === selectedShippingAddress)
        : addresses.find(addr => addr.id === selectedBillingAddress),
      shippingMethod: selectedShipping,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            step === 'shipping' ? "bg-dark-teal" : "bg-dark-teal"
          )}>
            {step === 'payment' ? <Check size={20} /> : <Truck size={20} />}
          </div>
          <div className="w-24 h-1 bg-dark-teal" />
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            step === 'payment' ? "bg-dark-teal text-white" : "bg-warm-cream text-dark-teal"
          )}>
            <CreditCard size={20} />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Shipping Step */}
        {step === 'shipping' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Shipping Address */}
            <div className="mb-8">
              <h3 className="text-xl font-serif text-dark-teal mb-6">Shipping Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shippingAddresses.map((address) => (
                  <label
                    key={address.id}
                    className={cn(
                      "relative flex flex-col p-6 rounded-xl border-2 cursor-pointer transition-colors",
                      selectedShippingAddress === address.id
                        ? "border-dark-teal bg-warm-cream"
                        : "border-gray-200 hover:border-dark-teal"
                    )}
                  >
                    <input
                      type="radio"
                      name="shippingAddress"
                      value={address.id}
                      checked={selectedShippingAddress === address.id}
                      onChange={(e) => setSelectedShippingAddress(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-medium text-dark-teal">{address.name}</p>
                        {address.isDefault && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            Default Address
                          </span>
                        )}
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        selectedShippingAddress === address.id
                          ? "border-dark-teal"
                          : "border-gray-300"
                      )}>
                        {selectedShippingAddress === address.id && (
                          <div className="w-3 h-3 rounded-full bg-dark-teal" />
                        )}
                      </div>
                    </div>
                    <div className="text-gray-600 space-y-1">
                      <p>{address.street}</p>
                      <p>{address.city}, {address.state} {address.zip}</p>
                      <p>{address.country}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Shipping Method */}
            <div className="mb-8">
              <h3 className="text-xl font-serif text-dark-teal mb-6">Shipping Method</h3>
              <div className="space-y-4">
                {shippingMethods.map((method) => (
                  <label
                    key={method.id}
                    className={cn(
                      "relative flex items-center p-6 rounded-xl border-2 cursor-pointer transition-colors",
                      selectedShippingMethod === method.id
                        ? "border-dark-teal bg-warm-cream"
                        : "border-gray-200 hover:border-dark-teal"
                    )}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={method.id}
                      checked={selectedShippingMethod === method.id}
                      onChange={(e) => setSelectedShippingMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-dark-teal">{method.name}</p>
                        <p className="font-medium text-dark-teal">
                          {method.price === 0 ? 'FREE' : `$${method.price}`}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Billing Address */}
            <div className="mb-8">
              <h3 className="text-xl font-serif text-dark-teal mb-6">Billing Address</h3>
              <label className="flex items-center gap-2 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-dark-teal
                           focus:ring-dark-teal focus:ring-offset-0"
                />
                <span className="text-gray-700">Same as shipping address</span>
              </label>

              {!sameAsShipping && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {billingAddresses.map((address) => (
                    <label
                      key={address.id}
                      className={cn(
                        "relative flex flex-col p-6 rounded-xl border-2 cursor-pointer transition-colors",
                        selectedBillingAddress === address.id
                          ? "border-dark-teal bg-warm-cream"
                          : "border-gray-200 hover:border-dark-teal"
                      )}
                    >
                      <input
                        type="radio"
                        name="billingAddress"
                        value={address.id}
                        checked={selectedBillingAddress === address.id}
                        onChange={(e) => setSelectedBillingAddress(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-medium text-dark-teal">{address.name}</p>
                          {address.isDefault && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              Default Address
                            </span>
                          )}
                        </div>
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                          selectedBillingAddress === address.id
                            ? "border-dark-teal"
                            : "border-gray-300"
                        )}>
                          {selectedBillingAddress === address.id && (
                            <div className="w-3 h-3 rounded-full bg-dark-teal" />
                          )}
                        </div>
                      </div>
                      <div className="text-gray-600 space-y-1">
                        <p>{address.street}</p>
                        <p>{address.city}, {address.state} {address.zip}</p>
                        <p>{address.country}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Continue Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              type="button"
              onClick={() => setStep('payment')}
              disabled={!selectedShippingAddress || (!sameAsShipping && !selectedBillingAddress)}
              className="w-full flex items-center justify-center gap-2 px-8 py-4
                       bg-dark-teal text-white rounded-full font-medium
                       hover:bg-dark-teal/90 transition-colors disabled:opacity-50
                       disabled:cursor-not-allowed"
            >
              Continue to Payment
              <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Order Summary */}
            <div className="mb-8 p-6 bg-warm-cream rounded-xl">
              <h3 className="text-xl font-serif text-dark-teal mb-4">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{selectedShipping?.price === 0 ? 'FREE' : `$${selectedShipping?.price}`}</span>
                </div>
                <div className="pt-4 border-t flex justify-between font-medium text-dark-teal">
                  <span>Total</span>
                  <span>${(subtotal + (selectedShipping?.price || 0)).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="mb-8">
              <h3 className="text-xl font-serif text-dark-teal mb-6">Payment Information</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full h-12 px-4 rounded-xl border border-gray-200
                             text-dark-teal focus:outline-none focus:border-dark-teal
                             focus:ring-1 focus:ring-dark-teal"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full h-12 px-4 rounded-xl border border-gray-200
                               text-dark-teal focus:outline-none focus:border-dark-teal
                               focus:ring-1 focus:ring-dark-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full h-12 px-4 rounded-xl border border-gray-200
                               text-dark-teal focus:outline-none focus:border-dark-teal
                               focus:ring-1 focus:ring-dark-teal"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="px-6 py-2 text-dark-teal hover:text-gold transition-colors"
              >
                Back
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                type="submit"
                disabled={isProcessing}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4
                         bg-dark-teal text-white rounded-full font-medium
                         hover:bg-dark-teal/90 transition-colors disabled:opacity-50
                         disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order
                    <ChevronRight size={18} />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
} 