
import { useState, useEffect } from 'react';
import { auth, type Session, type User } from '@/lib/auth';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useBetterAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await auth.api.getSession({});
        
        setAuthState({
          user: result?.user || null,
          session: result?.session || null,
          isLoading: false,
          isAuthenticated: !!result?.user
        });
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthState({
          user: null,
          session: null,
          isLoading: false,
          isAuthenticated: false
        });
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await auth.api.signInEmail({
        body: { email, password }
      });
      
      if (result?.user) {
        setAuthState({
          user: result.user,
          session: null, // Better-Auth gère les sessions automatiquement
          isLoading: false,
          isAuthenticated: true
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
        body: { email, password, name }
      });
      
      return result;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth.api.signOut({});
      setAuthState({
        user: null,
        session: null,
        isLoading: false,
        isAuthenticated: false
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getUserRole = async (userId: string): Promise<string | null> => {
    try {
      const response = await fetch('/api/user/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await response.json();
      return data.role || null;
    } catch (error) {
      console.error('Get user role error:', error);
      return null;
    }
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    getUserRole
  };
};
