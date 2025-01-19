'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin, Settings, LogOut } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

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

interface ProfileSectionProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  orders: Order[];
  wishlist: any[];
  addresses: Address[];
}

type ProfileTab = 'orders' | 'wishlist' | 'addresses' | 'settings';

export default function ProfileSection({
  user,
  orders,
  wishlist,
  addresses,
}: ProfileSectionProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>('orders');

  const tabs = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {/* Profile Header */}
            <div className="text-center mb-8">
              <div className="relative w-24 h-24 mx-auto mb-4">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-warm-cream flex items-center justify-center">
                    <User size={32} className="text-dark-teal" />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-serif text-dark-teal">{user.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{user.email}</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ProfileTab)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors",
                    activeTab === tab.id
                      ? "bg-dark-teal text-white"
                      : "hover:bg-warm-cream text-dark-teal"
                  )}
                >
                  <tab.icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
                         text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} />
                <span className="font-medium">Sign Out</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-2xl p-6 shadow-sm min-h-[600px]">
            {/* Orders */}
            {activeTab === 'orders' && (
              <div>
                <h3 className="text-xl font-serif text-dark-teal mb-6">Order History</h3>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-100 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-medium text-dark-teal">
                            ${order.total.toLocaleString()}
                          </span>
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium",
                            {
                              'bg-yellow-100 text-yellow-800': order.status === 'pending',
                              'bg-blue-100 text-blue-800': order.status === 'processing',
                              'bg-purple-100 text-purple-800': order.status === 'shipped',
                              'bg-green-100 text-green-800': order.status === 'delivered',
                            }
                          )}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-warm-cream">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-dark-teal">{item.name}</p>
                              <p className="text-sm text-gray-600">
                                {item.quantity} × ${item.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist */}
            {activeTab === 'wishlist' && (
              <div>
                <h3 className="text-xl font-serif text-dark-teal mb-6">My Wishlist</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group relative"
                    >
                      <div className="aspect-square relative rounded-xl overflow-hidden bg-warm-cream">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-4">
                        <h4 className="text-lg font-serif text-dark-teal">{item.name}</h4>
                        <p className="text-gold font-medium">${item.price.toLocaleString()}</p>
                      </div>
                      <button
                        className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm
                                shadow-lg text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Heart size={18} className="fill-current" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses */}
            {activeTab === 'addresses' && (
              <div>
                <h3 className="text-xl font-serif text-dark-teal mb-6">My Addresses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <motion.div
                      key={address.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative border border-gray-100 rounded-xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-dark-teal">{address.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {address.type.charAt(0).toUpperCase() + address.type.slice(1)} Address
                          </p>
                        </div>
                        {address.isDefault && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 text-gray-600">
                        <p>{address.street}</p>
                        <p>{address.city}, {address.state} {address.zip}</p>
                        <p>{address.country}</p>
                      </div>
                      <div className="absolute bottom-6 right-6 flex gap-2">
                        <button className="text-dark-teal hover:text-gold transition-colors">
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-600 transition-colors">
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="h-full min-h-[200px] border-2 border-dashed border-gray-200 rounded-xl
                             flex items-center justify-center text-gray-500 hover:text-dark-teal
                             hover:border-dark-teal transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Plus size={18} />
                      Add New Address
                    </span>
                  </motion.button>
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div>
                <h3 className="text-xl font-serif text-dark-teal mb-6">Account Settings</h3>
                <form className="max-w-md space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full h-12 px-4 rounded-xl border border-gray-200
                             text-dark-teal focus:outline-none focus:border-dark-teal
                             focus:ring-1 focus:ring-dark-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full h-12 px-4 rounded-xl border border-gray-200
                             text-dark-teal focus:outline-none focus:border-dark-teal
                             focus:ring-1 focus:ring-dark-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Leave blank to keep current password"
                      className="w-full h-12 px-4 rounded-xl border border-gray-200
                             text-dark-teal focus:outline-none focus:border-dark-teal
                             focus:ring-1 focus:ring-dark-teal"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-8 py-3
                           bg-dark-teal text-white rounded-full font-medium
                           hover:bg-dark-teal/90 transition-colors"
                  >
                    Save Changes
                  </motion.button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 