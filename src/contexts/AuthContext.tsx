'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
  role: 'customer' | 'provider' | 'admin';
  name: string;
  loggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: 'customer' | 'provider' | 'admin') => void;
  logout: () => void;
  isAuthenticated: boolean;
  userRole: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage on mount (client-side only)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, role: 'customer' | 'provider' | 'admin') => {
    const userData = {
      email,
      role,
      name: email.split('@')[0],
      loggedIn: true,
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    // Refresh the router to update all components
    router.refresh();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
    // Refresh the router to update all components
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        userRole: user?.role || null,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}