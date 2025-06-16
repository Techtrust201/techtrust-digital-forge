
import { authClient } from '@/lib/auth-client';

export const useBetterAuth = () => {
  const { data: session, isPending: isLoading } = authClient.useSession();
  
  const user = session?.user || null;
  const isAuthenticated = !!session;

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting sign in for:', email);
      const result = await authClient.signIn.email({
        email,
        password
      });
      console.log('✅ Sign in result:', result);
      return result;
    } catch (error) {
      console.error('❌ Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      console.log('📝 Attempting sign up for:', email);
      const result = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: `${window.location.origin}/auth?verified=true`
      });
      console.log('✅ Sign up result:', result);
      return result;
    } catch (error) {
      console.error('❌ Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error('❌ Sign out error:', error);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const result = await authClient.forgetPassword({
        email,
        redirectTo: `${window.location.origin}/auth?reset=true`
      });
      return result;
    } catch (error) {
      console.error('❌ Forgot password error:', error);
      throw error;
    }
  };

  const resetPassword = async (password: string, token: string) => {
    try {
      const result = await authClient.resetPassword({
        newPassword: password,
        token
      });
      return result;
    } catch (error) {
      console.error('❌ Reset password error:', error);
      throw error;
    }
  };

  const resendVerification = async (email: string) => {
    try {
      const result = await authClient.sendVerificationEmail({
        email,
        callbackURL: `${window.location.origin}/auth?verified=true`
      });
      return result;
    } catch (error) {
      console.error('❌ Resend verification error:', error);
      throw error;
    }
  };

  const getUserRole = () => {
    return user?.role || 'client';
  };

  const isAdmin = () => {
    const role = getUserRole();
    return role === 'admin' || role === 'super_admin';
  };

  const hasRole = (role: string) => {
    return getUserRole() === role;
  };

  return {
    user,
    session,
    isLoading,
    isAuthenticated,
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
