import { useState, useEffect, useCallback, useMemo } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  name: string | null;
  company: string | null;
  tier: string | null;
  created_at: string;
  updated_at: string;
}

interface UserRole {
  role: 'admin' | 'super_admin' | 'manager' | 'employee' | 'client';
}

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [lastResendTime, setLastResendTime] = useState<number>(0);

  // Load user profile and role
  const loadUserProfile = useCallback(async (userId: string) => {
    try {
      const [profileResponse, roleResponse] = await Promise.all([
        supabase
          .from('profiles')
          .select('id, name, company, tier, created_at, updated_at')
          .eq('id', userId)
          .single(),
        supabase
          .from('user_roles')
          .select('role')
          .eq('userId', userId)
          .single()
      ]);

      if (profileResponse.error) {
        // Profile load failed silently - user might not have profile yet
        return;
      }

      setProfile(profileResponse.data);
      
      if (roleResponse.data) {
        setUserRole(roleResponse.data);
      }
    } catch (error) {
      // Silent failure - user might not have profile/role yet
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Load profile with delay for new users
          setTimeout(() => {
            if (mounted) {
              loadUserProfile(session.user.id);
            }
          }, 500);
        } else {
          setProfile(null);
          setUserRole(null);
        }

        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        loadUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadUserProfile]);

  // Sign up
  const signUp = useCallback(async (email: string, password: string, name: string, companyName?: string) => {
    const redirectUrl = `${window.location.origin}/auth?verified=true`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: name,
          company_name: companyName || null
        }
      }
    });

    if (!error && data.user && !data.user.email_confirmed_at) {
      setEmailVerificationSent(true);
    }

    return { data, error };
  }, []);

  // Connexion
  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  }, []);

  // Connexion Google
  const signInWithGoogle = useCallback(async () => {
    const redirectUrl = `${window.location.origin}/auth?verified=true`;
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl
      }
    });

    return { data, error };
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setSession(null);
      setProfile(null);
      setUserRole(null);
      setEmailVerificationSent(false);
    }
    return { error };
  }, []);

  // Renvoyer l'email de vérification
  const resendVerificationEmail = useCallback(async () => {
    if (!user?.email) return { error: new Error('Aucun email trouvé') };

    const now = Date.now();
    if (now - lastResendTime < 60000) {
      return { error: new Error('Veuillez attendre 60 secondes avant de renvoyer l\'email') };
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth?verified=true`
      }
    });

    if (!error) {
      setLastResendTime(now);
    }

    return { error };
  }, [user?.email, lastResendTime]);

  // Réinitialiser le mot de passe
  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth?reset=true`
    });

    return { error };
  }, []);

  // Mark email as verified manually (for admins)
  const markEmailAsVerified = useCallback(async () => {
    if (user?.email === 'contact@tech-trust.fr') {
      return true;
    }
    return false;
  }, [user?.email]);

  // Role checks using useMemo
  const hasRole = useMemo(() => {
    return (role: string): boolean => {
      return userRole?.role === role;
    };
  }, [userRole?.role]);

  const isAdmin = useMemo(() => {
    return userRole?.role === 'admin' || userRole?.role === 'super_admin';
  }, [userRole?.role]);

  const canAccessAdmin = useMemo(() => {
    return userRole?.role === 'admin' || userRole?.role === 'super_admin';
  }, [userRole?.role]);

  const getRemainingResendTime = useCallback((): number => {
    const now = Date.now();
    const remaining = Math.max(0, 60000 - (now - lastResendTime));
    return Math.ceil(remaining / 1000);
  }, [lastResendTime]);

  // Vérifier si l'email est confirmé (ou si c'est l'admin)
  const isEmailVerified = user?.email_confirmed_at != null || user?.email === 'contact@tech-trust.fr';

  return {
    user,
    session,
    profile,
    isLoading,
    emailVerificationSent,
    isEmailVerified,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resendVerificationEmail,
    resetPassword,
    hasRole,
    isAdmin,
    canAccessAdmin,
    getRemainingResendTime,
    markEmailAsVerified,
    isAuthenticated: !!user && isEmailVerified
  };
};
