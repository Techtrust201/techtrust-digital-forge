
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  industry?: string;
  tier?: string;
  status?: string;
}

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile and check admin status
          setTimeout(async () => {
            await fetchUserProfile(session.user.id);
            await checkAdminStatus(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setIsAdmin(false);
        }
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
        checkAdminStatus(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('userId', userId)
        .in('role', ['super_admin', 'admin']);

      if (error) {
        console.error('Error checking admin status:', error);
        return;
      }

      setIsAdmin(data && data.length > 0);
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const signUp = async (email: string, password: string, userData?: { name?: string; company?: string }) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: userData
        }
      });

      if (error) {
        console.error('Signup error:', error);
        toast.error(error.message);
        return { error };
      }

      if (data.user && !data.session) {
        toast.success('Vérifiez votre email pour confirmer votre inscription');
      } else {
        toast.success('Inscription réussie !');
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error('Erreur lors de l\'inscription');
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Signin error:', error);
        toast.error(error.message);
        return { error };
      }

      toast.success('Connexion réussie !');
      return { data, error: null };
    } catch (error: any) {
      console.error('Signin error:', error);
      toast.error('Erreur lors de la connexion');
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Signout error:', error);
        toast.error('Erreur lors de la déconnexion');
        return;
      }

      toast.success('Déconnexion réussie');
    } catch (error) {
      console.error('Signout error:', error);
      toast.error('Erreur lors de la déconnexion');
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: 'Utilisateur non connecté' };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Profile update error:', error);
        toast.error('Erreur lors de la mise à jour du profil');
        return { error };
      }

      setProfile(data);
      toast.success('Profil mis à jour avec succès');
      return { data, error: null };
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error('Erreur lors de la mise à jour');
      return { error };
    }
  };

  return {
    user,
    session,
    profile,
    isLoading,
    isAdmin,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,
    updateProfile,
    fetchUserProfile
  };
};
