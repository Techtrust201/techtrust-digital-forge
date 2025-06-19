import { useState, useEffect, useCallback, useMemo } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  name: string | null;
  company: string | null;
  role: string;
  tier: string | null;
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
  const loadUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, company, role, tier, created_at, updated_at')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('[AUTH] Erreur chargement profil:', error);
        return;
      }

      console.log('[AUTH] Profil chargé:', data);
      setProfile(data);
    } catch (error) {
      console.error('[AUTH] Erreur profil:', error);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    console.log('[AUTH] Initialisation hook authentification');

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('[AUTH] Changement état:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Charger le profil utilisateur
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

      console.log('[AUTH] Session existante:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        loadUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      console.log('[AUTH] Nettoyage hook authentification');
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadUserProfile]);

  // Inscription
  const signUp = useCallback(async (email: string, password: string, name: string, companyName?: string) => {
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

  // Déconnexion
  const signOut = useCallback(async () => {
    console.log('[AUTH] Déconnexion');
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setSession(null);
      setProfile(null);
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

  // Fonction pour marquer l'email comme vérifié manuellement (pour les admins)
  const markEmailAsVerified = useCallback(async () => {
    if (user?.email === 'contact@tech-trust.fr') {
      // Pour l'admin, on considère l'email comme vérifié
      console.log('[AUTH] Admin email marked as verified');
      return true;
    }
    return false;
  }, [user?.email]);

  // Vérifications des rôles avec useMemo pour éviter les re-créations
  const hasRole = useMemo(() => {
    return (role: string): boolean => {
      const result = profile?.role === role;
      console.log('[AUTH] hasRole check:', role, result, 'profile role:', profile?.role);
      return result;
    };
  }, [profile?.role]);

  const isAdmin = useMemo(() => {
    const result = profile?.role === 'super_admin';
    console.log('[AUTH] isAdmin check:', result, 'profile role:', profile?.role);
    return result;
  }, [profile?.role]);

  const canAccessAdmin = useMemo(() => {
    const result = profile?.role === 'super_admin';
    console.log('[AUTH] canAccessAdmin check:', result);
    return result;
  }, [profile?.role]);

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
