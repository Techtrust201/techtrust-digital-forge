import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, isLoading, isEmailVerified, profile } = useSupabaseAuth();

  console.log('[PROTECTED] État:', { 
    isLoading, 
    user: user?.email, 
    isEmailVerified, 
    profileRole: profile?.role, 
    adminOnly
  });

  // Affiche un skeleton pendant le chargement
  if (isLoading) {
    console.log('[PROTECTED] Affichage skeleton loading');
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

  // Redirections (rendu conditionnel) sans side-effects
  if (!user) {
    console.log('[PROTECTED] Pas d\'utilisateur - redirection vers /auth');
    return <Navigate to="/auth" replace />;
  }

  if (!isEmailVerified && user.email !== 'contact@tech-trust.fr') {
    console.log('[PROTECTED] Email non vérifié - redirection vers /auth');
    return <Navigate to="/auth" replace />;
  }

  if (adminOnly && profile && profile.role !== 'super_admin') {
    console.log('[PROTECTED] Accès admin refusé - redirection vers /dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('[PROTECTED] Accès autorisé, rendu des enfants');
  return <>{children}</>;
};

export default ProtectedRoute;
