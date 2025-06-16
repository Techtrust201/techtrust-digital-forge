
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useSupabaseAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔄 Auth state change:', event, session?.user?.email);
        
        setAuthState({
          user: session?.user ?? null,
          session: session,
          isLoading: false,
          isAuthenticated: !!session
        });
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('📱 Initial session check:', session?.user?.email);
      
      setAuthState({
        user: session?.user ?? null,
        session: session,
        isLoading: false,
        isAuthenticated: !!session
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting sign in for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('❌ Sign in error:', error);
        throw error;
      }
      
      console.log('✅ Sign in successful:', data.user?.email);
      return { user: data.user, session: data.session };
    } catch (error) {
      console.error('❌ Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      console.log('📝 Attempting sign up for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth?verified=true`,
          data: {
            name: name || email.split('@')[0]
          }
        }
      });
      
      if (error) {
        console.error('❌ Sign up error:', error);
        throw error;
      }
      
      console.log('✅ Sign up successful:', data.user?.email);
      return { user: data.user, session: data.session };
    } catch (error) {
      console.error('❌ Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log('🚪 Signing out...');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Sign out error:', error);
        throw error;
      }
      
      console.log('✅ Sign out successful');
    } catch (error) {
      console.error('❌ Sign out error:', error);
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      console.log('🔑 Password reset request for:', email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?reset=true`
      });
      
      if (error) {
        console.error('❌ Password reset error:', error);
        throw error;
      }
      
      console.log('✅ Password reset email sent');
    } catch (error) {
      console.error('❌ Password reset error:', error);
      throw error;
    }
  };

  const resetPassword = async (password: string) => {
    try {
      console.log('🔄 Updating password...');
      
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) {
        console.error('❌ Password update error:', error);
        throw error;
      }
      
      console.log('✅ Password updated successfully');
    } catch (error) {
      console.error('❌ Password update error:', error);
      throw error;
    }
  };

  const resendVerification = async (email: string) => {
    try {
      console.log('📧 Resending verification for:', email);
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth?verified=true`
        }
      });
      
      if (error) {
        console.error('❌ Resend verification error:', error);
        throw error;
      }
      
      console.log('✅ Verification email resent');
    } catch (error) {
      console.error('❌ Resend verification error:', error);
      throw error;
    }
  };

  // Get user role from database
  const getUserRole = async (): Promise<string> => {
    if (!authState.user) return 'client';
    
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', authState.user.id)
        .single();
      
      if (error) {
        console.log('No role found, defaulting to client');
        return 'client';
      }
      
      return data.role || 'client';
    } catch (error) {
      console.error('Error fetching user role:', error);
      return 'client';
    }
  };

  const isAdmin = async (): Promise<boolean> => {
    const role = await getUserRole();
    return role === 'admin' || role === 'super_admin';
  };

  const hasRole = async (role: string): Promise<boolean> => {
    const userRole = await getUserRole();
    return userRole === role;
  };

  // Create super admin account (development only)
  const createSuperAdmin = async (email: string, password: string, name: string) => {
    try {
      console.log('🔑 Creating super admin account...');
      
      // First create the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Wait a bit for the trigger to create the profile
        setTimeout(async () => {
          try {
            // Update the user role to super_admin
            const { error: roleError } = await supabase
              .from('user_roles')
              .update({ role: 'super_admin' })
              .eq('user_id', data.user.id);
            
            if (roleError) {
              console.error('Error setting super admin role:', roleError);
            } else {
              console.log('✅ Super admin role assigned');
            }
          } catch (err) {
            console.error('Error in role assignment:', err);
          }
        }, 2000);
      }
      
      return { user: data.user, session: data.session };
    } catch (error) {
      console.error('❌ Super admin creation error:', error);
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
    getUserRole,
    isAdmin,
    hasRole,
    createSuperAdmin
  };
};
