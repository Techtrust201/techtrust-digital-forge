
import { useEffect } from 'react';
import { authService } from './auth/authService';
import { useAuthState } from './auth/useAuthState';
import { useRoleUtils } from './auth/useRoleUtils';

export const useBetterAuth = () => {
  const { authState, setAuthState } = useAuthState();
  const roleUtils = useRoleUtils(authState.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('🔍 Checking authentication status...');
        
        const result = await authService.getSession();
        
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
  }, [setAuthState]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting sign in for:', email);
      
      const result = await authService.signIn(email, password);
      
      console.log('✅ Sign in result:', result);
      
      if (result?.user) {
        // Get session after login
        const sessionResult = await authService.getSession();
        
        setAuthState({
          user: result.user,
          session: sessionResult?.session || null,
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
      
      const result = await authService.signUp(email, password, name);
      
      console.log('✅ Sign up result:', result);
      return result;
    } catch (error) {
      console.error('❌ Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
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

  const forgotPassword = async (email: string) => {
    try {
      const result = await authService.forgotPassword(email);
      return result;
    } catch (error) {
      console.error('❌ Forgot password error:', error);
      throw error;
    }
  };

  const resetPassword = async (password: string, token: string) => {
    try {
      const result = await authService.resetPassword(password, token);
      return result;
    } catch (error) {
      console.error('❌ Reset password error:', error);
      throw error;
    }
  };

  const resendVerification = async (email: string) => {
    try {
      const result = await authService.resendVerification(email);
      return result;
    } catch (error) {
      console.error('❌ Resend verification error:', error);
      throw error;
    }
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword,
    resendVerification,
    ...roleUtils
  };
};
