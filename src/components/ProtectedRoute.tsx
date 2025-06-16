
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, isLoading, isEmailVerified, canAccessAdmin } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Pas connecté
        navigate('/auth');
        return;
      }

      if (!isEmailVerified) {
        // Email non vérifié
        navigate('/auth');
        return;
      }

      if (adminOnly && !canAccessAdmin()) {
        // Accès admin requis mais utilisateur non autorisé
        navigate('/dashboard');
        return;
      }
    }
  }, [user, isLoading, isEmailVerified, adminOnly, canAccessAdmin, navigate]);

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

  if (adminOnly && !canAccessAdmin()) {
    return null; // La redirection se fait dans useEffect
  }

  return <>{children}</>;
};

export default ProtectedRoute;
