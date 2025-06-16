
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, isLoading, isEmailVerified, profile, isAuthenticated } = useSupabaseAuth();
  const navigate = useNavigate();

  console.log('[PROTECTED] État:', { 
    isLoading, 
    user: user?.email, 
    isEmailVerified, 
    profileRole: profile?.role, 
    adminOnly,
    isAuthenticated
  });

  useEffect(() => {
    // Ne rien faire pendant le chargement
    if (isLoading) {
      console.log('[PROTECTED] En cours de chargement...');
      return;
    }

    // Si pas d'utilisateur connecté, rediriger vers auth
    if (!user) {
      console.log('[PROTECTED] Pas d\'utilisateur - redirection vers /auth');
      navigate('/auth', { replace: true });
      return;
    }

    // Si l'email n'est pas vérifié (sauf pour l'admin), rediriger vers auth
    if (!isEmailVerified && user.email !== 'contact@tech-trust.fr') {
      console.log('[PROTECTED] Email non vérifié - redirection vers /auth');
      navigate('/auth', { replace: true });
      return;
    }

    // Si accès admin requis mais utilisateur pas admin, rediriger vers dashboard normal
    if (adminOnly && profile && profile.role !== 'super_admin') {
      console.log('[PROTECTED] Accès admin refusé - redirection vers /dashboard');
      navigate('/dashboard', { replace: true });
      return;
    }

    console.log('[PROTECTED] Accès autorisé');
  }, [isLoading, user, isEmailVerified, profile, adminOnly, navigate]);

  // Pendant le chargement, afficher un skeleton
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

  // Vérifications finales avant de rendre les enfants
  if (!user) {
    return null; // La redirection se fait dans useEffect
  }

  if (!isEmailVerified && user.email !== 'contact@tech-trust.fr') {
    return null; // La redirection se fait dans useEffect
  }

  if (adminOnly && profile && profile.role !== 'super_admin') {
    return null; // La redirection se fait dans useEffect
  }

  console.log('[PROTECTED] Rendu des enfants autorisé');
  return <>{children}</>;
};

export default ProtectedRoute;
