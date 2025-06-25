
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

  const sendInvitation = async (invitationData: InvitationData) => {
    setIsLoading(true);
    
    try {
      console.log('[INVITATIONS] Sending invitation for:', invitationData.email);
      
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

  return {
    sendInvitation,
    getInvitations,
    isLoading,
  };
};
