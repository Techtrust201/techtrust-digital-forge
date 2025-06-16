
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
    // Éviter les redirections pendant le chargement
    if (isLoading || hasRedirected) return;

    const currentPath = window.location.pathname;
    
    // Si pas d'utilisateur connecté
    if (!user) {
      console.log('ProtectedRoute: No user, redirecting to auth');
      setHasRedirected(true);
      navigate('/auth', { replace: true });
      return;
    }

    // Si l'email n'est pas vérifié (sauf pour l'admin)
    if (!isEmailVerified && user.email !== 'contact@tech-trust.fr') {
      console.log('ProtectedRoute: Email not verified, redirecting to auth');
      setHasRedirected(true);
      navigate('/auth', { replace: true });
      return;
    }

    // Si accès admin requis mais utilisateur pas admin
    if (adminOnly && profile && !canAccessAdmin()) {
      console.log('ProtectedRoute: Admin access required but user not admin, redirecting to dashboard');
      setHasRedirected(true);
      navigate('/dashboard', { replace: true });
      return;
    }

    // Si tout est OK, réinitialiser le flag de redirection
    if (user && isEmailVerified && (!adminOnly || canAccessAdmin())) {
      setHasRedirected(false);
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

  // Afficher un message si l'utilisateur n'est pas autorisé
  if (!user || (!isEmailVerified && user.email !== 'contact@tech-trust.fr')) {
    return null;
  }

  if (adminOnly && profile && !canAccessAdmin()) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
