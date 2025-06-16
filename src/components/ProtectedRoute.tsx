
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, isLoading, isEmailVerified, canAccessAdmin, profile } = useSupabaseAuth();
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!isLoading && !hasRedirected) {
      if (!user) {
        console.log('ProtectedRoute: No user, redirecting to auth');
        setHasRedirected(true);
        navigate('/auth', { replace: true });
        return;
      }

      if (!isEmailVerified) {
        console.log('ProtectedRoute: Email not verified, redirecting to auth');
        setHasRedirected(true);
        navigate('/auth', { replace: true });
        return;
      }

      if (adminOnly && profile && !canAccessAdmin()) {
        console.log('ProtectedRoute: Admin access required but user not admin, redirecting to dashboard');
        setHasRedirected(true);
        navigate('/dashboard', { replace: true });
        return;
      }
    }
  }, [user, isLoading, isEmailVerified, adminOnly, canAccessAdmin, navigate, hasRedirected, profile]);

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

  if (!user || !isEmailVerified) {
    return null; // La redirection se fait dans useEffect
  }

  if (adminOnly && profile && !canAccessAdmin()) {
    return null; // La redirection se fait dans useEffect
  }

  return <>{children}</>;
};

export default ProtectedRoute;
