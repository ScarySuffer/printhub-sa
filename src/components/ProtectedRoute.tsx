'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('customer' | 'provider' | 'admin')[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (allowedRoles && userRole && !allowedRoles.includes(userRole as any)) {
      router.push('/dashboard/customer');
    }
  }, [isAuthenticated, userRole, router, allowedRoles]);

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole as any)) {
    return null;
  }

  return <>{children}</>;
}