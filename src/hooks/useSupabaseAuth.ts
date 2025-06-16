
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  name: string | null;
  company: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [lastResendTime, setLastResendTime] = useState<number>(0);

  // Charger le profil utilisateur
  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, company, role, created_at, updated_at')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Erreur chargement profil:', error);
        return;
      }

      console.log('Profil chargé:', data);
      setProfile(data);
    } catch (error) {
      console.error('Erreur profil:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('Auth state change:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Charger le profil utilisateur après connexion avec un délai pour éviter les conflits
          setTimeout(() => {
            if (mounted) {
              loadUserProfile(session.user.id);
            }
          }, 100);
        } else {
          setProfile(null);
        }

        setIsLoading(false);
      }
    );

    // Vérifier la session existante
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
  }, []);

  // Inscription
  const signUp = async (email: string, password: string, name: string, companyName?: string) => {
    const redirectUrl = `${window.location.origin}/auth?verified=true`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: name,
          company_name: companyName || null,
          role: 'client_bronze'
        }
      }
    });

    if (!error && data.user && !data.user.email_confirmed_at) {
      setEmailVerificationSent(true);
    }

    return { data, error };
  };

  // Connexion
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  };

  // Connexion Google
  const signInWithGoogle = async () => {
    const redirectUrl = `${window.location.origin}/auth?verified=true`;
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl
      }
    });

    return { data, error };
  };

  // Déconnexion
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setSession(null);
      setProfile(null);
      setEmailVerificationSent(false);
    }
    return { error };
  };

  // Renvoyer l'email de vérification
  const resendVerificationEmail = async () => {
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
  };

  // Réinitialiser le mot de passe
  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth?reset=true`
    });

    return { error };
  };

  // Vérifier si l'email est confirmé
  const isEmailVerified = user?.email_confirmed_at != null;

  // Vérifier les rôles
  const hasRole = (role: string): boolean => {
    return profile?.role === role;
  };

  const isAdmin = (): boolean => {
    return profile?.role === 'super_admin';
  };

  const canAccessAdmin = (): boolean => {
    console.log('Checking admin access, profile role:', profile?.role);
    return hasRole('super_admin');
  };

  const getRemainingResendTime = (): number => {
    const now = Date.now();
    const remaining = Math.max(0, 60000 - (now - lastResendTime));
    return Math.ceil(remaining / 1000);
  };

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
