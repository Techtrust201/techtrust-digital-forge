
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ActivationData {
  token: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export const useInvitationActivation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [invitationData, setInvitationData] = useState<any>(null);

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
        throw new Error('Token invalide ou expiré');
      }

      console.log('[ACTIVATION] Token validated successfully:', data);
      setInvitationData(data);
      return { success: true, data };
    } catch (error: any) {
      console.error('[ACTIVATION] Token validation failed:', error);
      toast.error(error.message || 'Token invalide ou expiré');
      return { success: false, error: error.message };
    }
  };

  const activateAccount = async ({ token, password, firstName, lastName }: ActivationData) => {
    setIsLoading(true);
    
    try {
      console.log('[ACTIVATION] Starting account activation for token:', token);

      if (!invitationData) {
        throw new Error('Données d\'invitation non trouvées');
      }

      // 1. Créer le compte utilisateur avec Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: invitationData.email,
        password: password,
        options: {
          data: {
            name: `${firstName || ''} ${lastName || ''}`.trim() || invitationData.name,
            company: invitationData.company,
            phone: invitationData.phone,
            position: invitationData.position,
            industry: invitationData.industry,
            address: invitationData.address,
            role: 'client'
          }
        }
      });

      if (authError) {
        console.error('[ACTIVATION] Auth signup error:', authError);
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('Erreur lors de la création du compte');
      }

      console.log('[ACTIVATION] User created successfully:', authData.user.id);

      // 2. Utiliser la nouvelle fonction pour synchroniser les subscriptions
      const { error: syncError } = await supabase.rpc('sync_user_subscriptions_from_invitation', {
        invitation_id: invitationData.id,
        new_user_id: authData.user.id
      });

      if (syncError) {
        console.error('[ACTIVATION] Subscription sync error:', syncError);
        throw new Error('Erreur lors de la synchronisation des packages');
      }

      console.log('[ACTIVATION] Subscriptions synchronized successfully');

      // 3. Marquer l'invitation comme acceptée
      const { error: updateError } = await supabase
        .from('user_invitations')
        .update({
          status: 'accepted',
          activated_at: new Date().toISOString(),
          user_id: authData.user.id
        })
        .eq('id', invitationData.id);

      if (updateError) {
        console.error('[ACTIVATION] Invitation update error:', updateError);
        // Ne pas faire échouer l'activation pour cette erreur non critique
      }

      console.log('[ACTIVATION] Account activation completed successfully');
      
      toast.success('Compte activé avec succès !', {
        description: 'Vous pouvez maintenant vous connecter avec vos identifiants'
      });

      return { success: true, user: authData.user };
    } catch (error: any) {
      console.error('[ACTIVATION] Activation failed:', error);
      toast.error(error.message || 'Erreur lors de l\'activation du compte');
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    validateToken,
    activateAccount,
    invitationData,
    isLoading
  };
};
