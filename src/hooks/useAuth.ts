
// Hook de compatibilité qui utilise le nouveau système Supabase
import { useSupabaseAuth } from './useSupabaseAuth';

export const useAuth = () => {
  const auth = useSupabaseAuth();
  
  // Maintenir la compatibilité avec l'ancienne interface
  const login = (userData: any) => {
    // Cette méthode est obsolète, utiliser signIn à la place
    console.warn('useAuth.login is deprecated, use signIn instead');
  };

  const logout = () => {
    return auth.signOut();
  };

  return {
    user: auth.user ? {
      id: auth.user.id,
      email: auth.user.email || '',
      role: auth.isAdmin ? 'admin' : 'user'
    } : null,
    isLoading: auth.isLoading,
    login,
    logout,
    isAuthenticated: auth.isAuthenticated,
    // Nouvelles méthodes Supabase
    ...auth
  };
};
