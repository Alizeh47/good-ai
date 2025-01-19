import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Phone, Package, Heart, Settings, LogOut } from 'lucide-react';
import { useAnalytics } from '../common/analytics';

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  orders: {
    id: string;
    date: string;
    status: string;
    total: number;
    items: {
      id: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
    }[];
  }[];
  wishlist: {
    id: string;
    name: string;
    price: number;
    image: string;
  }[];
  addresses: {
    id: string;
    type: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    isDefault: boolean;
  }[];
  onLogout: () => void;
  onUpdateProfile: (data: Partial<UserProfileProps['user']>) => Promise<void>;
  onAddAddress?: (data: Omit<UserProfileProps['addresses'][0], 'id'>) => Promise<void>;
  onRemoveAddress?: (id: string) => Promise<void>;
  onUpdateSettings?: (data: { name: string; email: string }) => Promise<void>;
  onRemoveFromWishlist?: (id: string) => Promise<void>;
  onMoveToCart?: (id: string) => Promise<void>;
}

type ProfileTab = 'orders' | 'wishlist' | 'addresses' | 'settings';

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  orders,
  wishlist,
  addresses,
  onLogout,
  onUpdateProfile,
  onAddAddress,
  onRemoveAddress,
  onUpdateSettings,
  onRemoveFromWishlist,
  onMoveToCart
}) => {
  const { trackEvent } = useAnalytics();
  const [activeTab, setActiveTab] = useState<ProfileTab>('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.email.includes('@')) return 'Invalid email address';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await onUpdateProfile(formData);
      trackEvent('profile_updated');
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      trackEvent('profile_update_error', { error: err instanceof Error ? err.message : 'Unknown error' });
    }
  };

  const handleLogout = () => {
    trackEvent('user_logout');
    onLogout();
  };

  const tabs: { id: ProfileTab; label: string; icon: React.ReactNode }[] = [
    { id: 'orders', label: 'Orders', icon: <Package size={20} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={20} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
            {/* Profile Summary */}
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full rounded-full bg-teal-100 flex items-center justify-center"
                    data-testid="avatar-placeholder"
                    aria-label="User avatar placeholder"
                  >
                    <User size={32} className="text-teal-600" />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-serif">{user.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{user.email}</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2" aria-label="User profile navigation">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveTab(tab.id);
                    trackEvent('profile_tab_change', { tab: tab.id });
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left
                    ${activeTab === tab.id
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                  aria-label={`View ${tab.label.toLowerCase()}`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </motion.button>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-50"
                aria-label="Log out of account"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </motion.button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            {activeTab === 'settings' ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-serif">Account Settings</h3>
                  {!isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsEditing(true)}
                      className="text-teal-600 hover:text-teal-700 font-medium"
                      aria-label="Edit profile information"
                    >
                      Edit Profile
                    </motion.button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500
                          disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="John Doe"
                        aria-label="Full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500
                          disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="you@example.com"
                        aria-label="Email address"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500
                          disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="+1 (555) 000-0000"
                        aria-label="Phone number"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm" role="alert">
                      {error}
                    </p>
                  )}

                  {isEditing && (
                    <div className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700"
                        aria-label="Save profile changes"
                      >
                        Save Changes
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            name: user.name,
                            email: user.email,
                            phone: user.phone || '',
                          });
                          setError(null);
                        }}
                        className="px-6 py-2 border border-gray-200 rounded-lg font-medium hover:bg-gray-50"
                        aria-label="Cancel profile editing"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-serif mb-2">Coming Soon</h3>
                <p className="text-gray-600">
                  This section is under development. Check back later!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 