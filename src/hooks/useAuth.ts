
import { useSupabaseAuth } from './useSupabaseAuth';

// Hook de compatibilité pour maintenir l'interface existante
export const useAuth = () => {
  const supabaseAuth = useSupabaseAuth();
  
  return {
    user: supabaseAuth.user ? {
      id: supabaseAuth.user.id,
      email: supabaseAuth.user.email || '',
      role: supabaseAuth.profile?.role || 'client_bronze'
    } : null,
    isLoading: supabaseAuth.isLoading,
    login: async (userData: any) => {
      // Cette méthode est maintenant obsolète avec l'auth Supabase
      console.warn('useAuth.login is deprecated, use useSupabaseAuth instead');
    },
    logout: async () => {
      return supabaseAuth.signOut();
    },
    isAuthenticated: supabaseAuth.isAuthenticated
  };
};
