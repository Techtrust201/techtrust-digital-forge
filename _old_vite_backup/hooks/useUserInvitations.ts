
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface InvitationData {
  email: string;
  name: string;
  company?: string;
  phone?: string;
  position?: string;
  industry?: string;
  address?: any;
  selectedPackages: string[];
  notes?: string;
}

export const useUserInvitations = () => {
  const [isLoading, setIsLoading] = useState(false);

  const checkForDuplicates = async (email: string) => {
    console.log('[INVITATIONS] Checking for duplicates:', email);
    
    // Vérifier si l'email existe déjà dans les profils utilisateurs
    const { data: existingProfile, error: profileError } = await supabase
      .from('profiles')
      .select('id, name')
      .eq('id', `(SELECT id FROM auth.users WHERE email = '${email}')`)
      .maybeSingle();

    // Vérifier si l'email existe déjà dans les invitations en attente
    const { data: existingInvitation, error: invitationError } = await supabase
      .from('user_invitations')
      .select('id, name, status')
      .eq('email', email)
      .eq('status', 'pending')
      .maybeSingle();

    console.log('[INVITATIONS] Existing profile:', existingProfile);
    console.log('[INVITATIONS] Existing invitation:', existingInvitation);

    return {
      hasProfile: !!existingProfile,
      hasInvitation: !!existingInvitation,
      profileData: existingProfile,
      invitationData: existingInvitation
    };
  };

  const sendInvitation = async (invitationData: InvitationData) => {
    setIsLoading(true);
    
    try {
      console.log('[INVITATIONS] Sending invitation for:', invitationData.email);
      
      // Vérifier les doublons avant d'envoyer
      const duplicateCheck = await checkForDuplicates(invitationData.email);
      
      if (duplicateCheck.hasProfile) {
        toast.error(`Un compte utilisateur existe déjà pour ${invitationData.email}`);
        return { success: false, error: 'Compte existant' };
      }

      if (duplicateCheck.hasInvitation) {
        toast.error(`Une invitation est déjà en attente pour ${invitationData.email}`);
        return { success: false, error: 'Invitation en attente' };
      }

      const { data, error } = await supabase.functions.invoke('send-invitation', {
        body: invitationData,
      });

      if (error) {
        console.error('[INVITATIONS] Error:', error);
        throw new Error(error.message || 'Erreur lors de l\'envoi de l\'invitation');
      }

      console.log('[INVITATIONS] Invitation sent successfully:', data);
      toast.success(`Invitation envoyée avec succès à ${invitationData.email}`);
      
      return { success: true, data };
    } catch (error: any) {
      console.error('[INVITATIONS] Failed to send invitation:', error);
      toast.error(error.message || 'Erreur lors de l\'envoi de l\'invitation');
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const getInvitations = async () => {
    try {
      const { data, error } = await supabase
        .from('user_invitations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[INVITATIONS] Error fetching invitations:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('[INVITATIONS] Failed to fetch invitations:', error);
      return [];
    }
  };

  const cancelInvitation = async (invitationId: string) => {
    try {
      const { error } = await supabase
        .from('user_invitations')
        .delete()
        .eq('id', invitationId);

      if (error) {
        console.error('[INVITATIONS] Error canceling invitation:', error);
        throw error;
      }

      toast.success('Invitation annulée avec succès');
      return { success: true };
    } catch (error: any) {
      console.error('[INVITATIONS] Failed to cancel invitation:', error);
      toast.error('Erreur lors de l\'annulation de l\'invitation');
      return { success: false, error: error.message };
    }
  };

  return {
    sendInvitation,
    getInvitations,
    cancelInvitation,
    checkForDuplicates,
    isLoading,
  };
};
