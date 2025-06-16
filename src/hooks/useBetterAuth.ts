
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
        console.log('🔍 Checking authentication status...');
        
        const result = await auth.api.getSession({
          headers: new Headers({
            'Cookie': document.cookie
          })
        });
        
        console.log('✅ Auth check result:', result);
        
        if (result?.session && result?.user) {
          setAuthState({
            user: result.user,
            session: result.session,
            isLoading: false,
            isAuthenticated: true
          });
        } else {
          setAuthState({
            user: null,
            session: null,
            isLoading: false,
            isAuthenticated: false
          });
        }
      } catch (error) {
        console.error('❌ Auth check error:', error);
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
      console.log('🔐 Attempting sign in for:', email);
      
      const result = await auth.api.signInEmail({
        body: { email, password },
        headers: new Headers({
          'Cookie': document.cookie
        })
      });
      
      console.log('✅ Sign in result:', result);
      
      if (result?.user) {
        setAuthState({
          user: result.user,
          session: null,
          isLoading: false,
          isAuthenticated: true
        });
      }
      
      return result;
    } catch (error) {
      console.error('❌ Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      console.log('📝 Attempting sign up for:', email);
      
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
      
      console.log('✅ Sign up result:', result);
      return result;
    } catch (error) {
      console.error('❌ Sign up error:', error);
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
      console.error('❌ Forgot password error:', error);
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
      console.error('❌ Reset password error:', error);
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
      console.error('❌ Resend verification error:', error);
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
        isAuthenticated: false
      });
    } catch (error) {
      console.error('❌ Sign out error:', error);
    }
  };

  const isAdmin = () => {
    return authState.user?.role === 'admin' || authState.user?.role === 'super_admin';
  };

  const hasRole = (role: string) => {
    return authState.user?.role === role;
  };

  const getUserRole = () => {
    return authState.user?.role || 'client';
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
    getUserRole
  };
};
