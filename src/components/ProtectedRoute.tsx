
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
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    // Ne pas naviguer pendant le chargement ou si déjà navigué
    if (isLoading || hasNavigated) {
      console.log('[PROTECTED] Attente - isLoading:', isLoading, 'hasNavigated:', hasNavigated);
      return;
    }

    const currentPath = window.location.pathname;
    console.log('[PROTECTED] Vérification accès - Path:', currentPath, 'User:', user?.email, 'Admin requis:', adminOnly);

    // Si pas d'utilisateur connecté
    if (!user) {
      console.log('[PROTECTED] Pas d\'utilisateur - redirection vers /auth');
      setHasNavigated(true);
      navigate('/auth', { replace: true });
      return;
    }

    // Si l'email n'est pas vérifié (sauf pour l'admin)
    if (!isEmailVerified && user.email !== 'contact@tech-trust.fr') {
      console.log('[PROTECTED] Email non vérifié - redirection vers /auth');
      setHasNavigated(true);
      navigate('/auth', { replace: true });
      return;
    }

    // Si accès admin requis mais utilisateur pas admin
    if (adminOnly && profile && !canAccessAdmin()) {
      console.log('[PROTECTED] Accès admin refusé - redirection vers /dashboard');
      setHasNavigated(true);
      navigate('/dashboard', { replace: true });
      return;
    }

    // Si on arrive ici, l'accès est autorisé
    if (hasNavigated) {
      console.log('[PROTECTED] Accès autorisé - reset hasNavigated');
      setHasNavigated(false);
    }

  }, [user, isLoading, isEmailVerified, adminOnly, canAccessAdmin, profile, navigate, hasNavigated]);

  // Afficher un skeleton pendant le chargement
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

  // Si pas d'utilisateur ou email non vérifié, ne rien afficher (redirection en cours)
  if (!user || (!isEmailVerified && user.email !== 'contact@tech-trust.fr')) {
    console.log('[PROTECTED] Accès refusé - pas d\'utilisateur ou email non vérifié');
    return null;
  }

  // Si admin requis mais pas admin, ne rien afficher (redirection en cours)
  if (adminOnly && profile && !canAccessAdmin()) {
    console.log('[PROTECTED] Accès admin refusé');
    return null;
  }

  console.log('[PROTECTED] Rendu des enfants autorisé');
  return <>{children}</>;
};

export default ProtectedRoute;
