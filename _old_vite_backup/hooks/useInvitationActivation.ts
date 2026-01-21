
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { InvitationData } from '@/types/invitation';

export const useInvitationActivation = (token: string | null) => {
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      validateToken(token);
    }
  }, [token]);

  const validateToken = async (token: string) => {
    try {
      console.log('[ACTIVATION] Validating token:', token);
      
      const { data, error } = await supabase
        .from('user_invitations')
        .select('*')
        .eq('invitation_token', token)
        .eq('status', 'pending')
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error) {
        console.error('[ACTIVATION] Token validation error:', error);
        toast.error('Token invalide ou expiré');
        setInvitation(null);
        return;
      }

      console.log('[ACTIVATION] Token validated successfully:', data);
      setInvitation(data as InvitationData);
    } catch (error: any) {
      console.error('[ACTIVATION] Token validation failed:', error);
      toast.error('Token invalide ou expiré');
      setInvitation(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    invitation,
    isLoading
  };
};
