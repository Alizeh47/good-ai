import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAnalytics } from '../common/analytics';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would verify the session with your backend
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real app, this would make an API call to your backend
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);

      trackEvent('user_login', {
        method: 'email',
      });

      router.push('/dashboard');
    } catch (error) {
      setError('Invalid email or password');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real app, this would make an API call to your backend
      // For demo purposes, we'll simulate a successful registration
      const mockUser: User = {
        id: '1',
        email,
        name,
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);

      trackEvent('user_register', {
        method: 'email',
      });

      router.push('/dashboard');
    } catch (error) {
      setError('Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real app, this would make an API call to your backend
      localStorage.removeItem('user');
      setUser(null);

      trackEvent('user_logout');

      router.push('/');
    } catch (error) {
      setError('Logout failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real app, this would make an API call to your backend
      // For demo purposes, we'll just simulate a successful password reset
      await new Promise(resolve => setTimeout(resolve, 1000));

      trackEvent('password_reset_request', {
        email,
      });
    } catch (error) {
      setError('Password reset failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real app, this would make an API call to your backend
      const updatedUser = { ...user, ...data } as User;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      trackEvent('profile_update');
    } catch (error) {
      setError('Profile update failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 