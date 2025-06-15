
import { useState, useEffect } from 'react';
import { auth, type Session, type User } from '@/lib/auth';
import { getUserRole } from '@/services/authService';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: string | null;
}

export const useBetterAuthIndependent = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
    userRole: null
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await auth.api.getSession({
          headers: new Headers({
            'Cookie': document.cookie
          })
        });
        
        let userRole = null;
        if (result?.user) {
          userRole = await getUserRole(result.user.id);
        }
        
        setAuthState({
          user: result?.user || null,
          session: result?.session || null,
          isLoading: false,
          isAuthenticated: !!result?.user,
          userRole
        });
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthState({
          user: null,
          session: null,
          isLoading: false,
          isAuthenticated: false,
          userRole: null
        });
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await auth.api.signInEmail({
        body: { email, password },
        headers: new Headers({
          'Cookie': document.cookie
        })
      });
      
      if (result?.user) {
        const userRole = await getUserRole(result.user.id);
        setAuthState({
          user: result.user,
          session: null,
          isLoading: false,
          isAuthenticated: true,
          userRole
        });
      }
      
      return result;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const result = await auth.api.signUpEmail({
        body: { email, password, name },
        headers: new Headers({
          'Cookie': document.cookie
        })
      });
      
      return result;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth.api.signOut({
        headers: new Headers({
          'Cookie': document.cookie
        })
      });
      setAuthState({
        user: null,
        session: null,
        isLoading: false,
        isAuthenticated: false,
        userRole: null
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    getUserRole: () => authState.userRole
  };
};
