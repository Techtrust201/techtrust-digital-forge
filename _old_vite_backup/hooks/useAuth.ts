
import { useSupabaseAuth } from './useSupabaseAuth';

// Hook de compatibilité pour maintenir l'interface existante
export const useAuth = () => {
  const supabaseAuth = useSupabaseAuth();
  
  return {
    user: supabaseAuth.user ? {
      id: supabaseAuth.user.id,
      email: supabaseAuth.user.email || '',
      role: 'client' // Default role, actual role is in user_roles table
    } : null,
    isLoading: supabaseAuth.isLoading,
    login: async (userData: any) => {
      // Deprecated - use useSupabaseAuth
      return;
    },
    logout: async () => {
      return supabaseAuth.signOut();
    },
    isAuthenticated: supabaseAuth.isAuthenticated
  };
};
