"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const router = useRouter();
  const { user, isLoading, isEmailVerified, isAdmin } = useSupabaseAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/dashboard/auth');
        return;
      }

      if (!isEmailVerified && user.email !== 'contact@tech-trust.fr') {
        router.push('/dashboard/auth');
        return;
      }

      if (adminOnly && !isAdmin) {
        router.push('/dashboard');
        return;
      }
    }
  }, [user, isLoading, isEmailVerified, isAdmin, adminOnly, router]);

  // Show skeleton during loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="space-y-3">
          <Skeleton className="w-[300px] h-[80px] rounded-md" />
          <Skeleton className="w-[200px] h-[40px] rounded-md" />
          <Skeleton className="w-[400px] h-[20px] rounded-md" />
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!user || (!isEmailVerified && user.email !== 'contact@tech-trust.fr')) {
    return null;
  }

  if (adminOnly && !isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
