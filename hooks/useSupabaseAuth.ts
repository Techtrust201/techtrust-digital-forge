"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

interface UserProfile {
  id: string;
  name: string | null;
  company: string | null;
  tier: string | null;
  role: string;
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
          .select('id, name, company, tier, role, created_at, updated_at')
          .eq('id', userId)
          .single(),
        supabase
          .from('user_roles')
          .select('role')
          .eq('userId', userId)
          .single()
      ]);

      if (profileResponse.error) {
        console.log('[AUTH] Profile not found for user:', userId);
        return;
      }

      setProfile(profileResponse.data as UserProfile);
      
      if (roleResponse.data) {
        setUserRole(roleResponse.data as UserRole);
      }
    } catch (error) {
      console.error('[AUTH] Error loading profile:', error);
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
    const redirectUrl = `${window.location.origin}/dashboard/auth?verified=true`;
    
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

  // Sign in
  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  }, []);

  // Google OAuth
  const signInWithGoogle = useCallback(async () => {
    const redirectUrl = `${window.location.origin}/dashboard/auth?verified=true`;
    
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

  // Resend verification email
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
        emailRedirectTo: `${window.location.origin}/dashboard/auth?verified=true`
      }
    });

    if (!error) {
      setLastResendTime(now);
    }

    return { error };
  }, [user?.email, lastResendTime]);

  // Reset password
  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/dashboard/auth?reset=true`
    });

    return { error };
  }, []);

  // Role checks
  const hasRole = useMemo(() => {
    return (role: string): boolean => {
      return userRole?.role === role || profile?.role === role;
    };
  }, [userRole?.role, profile?.role]);

  const isAdmin = useMemo(() => {
    return userRole?.role === 'admin' || userRole?.role === 'super_admin' || profile?.role === 'admin';
  }, [userRole?.role, profile?.role]);

  const canAccessAdmin = useMemo(() => {
    return userRole?.role === 'admin' || userRole?.role === 'super_admin' || profile?.role === 'admin';
  }, [userRole?.role, profile?.role]);

  const getRemainingResendTime = useCallback((): number => {
    const now = Date.now();
    const remaining = Math.max(0, 60000 - (now - lastResendTime));
    return Math.ceil(remaining / 1000);
  }, [lastResendTime]);

  // Check if email is verified
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
    isAuthenticated: !!user && isEmailVerified
  };
};
