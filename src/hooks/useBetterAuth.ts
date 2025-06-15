import { useState, useEffect } from 'react';
import { auth, type Session, type User } from '@/lib/auth';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: string | null;
}

export const useBetterAuth = () => {
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
        
        if (result?.session && result?.user) {
          const userRole = (result.user as any).role || 'client';
          
          setAuthState({
            user: { ...result.user, role: userRole } as User,
            session: result.session,
            isLoading: false,
            isAuthenticated: true,
            userRole
          });
        } else {
          setAuthState({
            user: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
            userRole: null
          });
        }
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
        const userRole = (result.user as any).role || 'client';
        
        setAuthState({
          user: { ...result.user, role: userRole } as User,
          session: null, // Better Auth signIn doesn't return session directly
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
        body: { 
          email, 
          password, 
          name,
          callbackURL: `${window.location.origin}/auth?verified=true`
        },
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

  const forgotPassword = async (email: string) => {
    try {
      const result = await auth.api.forgetPassword({
        body: { 
          email, 
          redirectTo: `${window.location.origin}/auth?reset=true` 
        },
        headers: new Headers({
          'Cookie': document.cookie
        })
      });
      
      return result;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  };

  const resetPassword = async (password: string, token: string) => {
    try {
      const result = await auth.api.resetPassword({
        body: { newPassword: password },
        headers: new Headers({
          'Cookie': document.cookie,
          'Authorization': `Bearer ${token}`
        })
      });
      
      return result;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  };

  const resendVerification = async (email: string) => {
    try {
      const result = await auth.api.sendVerificationEmail({
        body: { 
          email, 
          callbackURL: `${window.location.origin}/auth?verified=true` 
        },
        headers: new Headers({
          'Cookie': document.cookie
        })
      });
      
      return result;
    } catch (error) {
      console.error('Resend verification error:', error);
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

  const isAdmin = () => {
    return authState.userRole === 'admin' || authState.userRole === 'super_admin';
  };

  const hasRole = (role: string) => {
    return authState.userRole === role;
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword,
    resendVerification,
    isAdmin,
    hasRole,
    getUserRole: () => authState.userRole
  };
};
