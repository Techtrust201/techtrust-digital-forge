
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { InvitationData } from '@/types/invitation';

export const useAccountCreation = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const createAccount = async (
    invitation: InvitationData,
    password: string,
    confirmPassword: string
  ) => {
    if (password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    setIsCreating(true);

    try {
      console.log('[ACTIVATION] Creating account for:', invitation.email);

      // Créer le compte utilisateur avec Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: invitation.email,
        password: password,
        options: {
          data: {
            name: invitation.name,
            company: invitation.company,
            phone: invitation.phone,
            position: invitation.position,
            industry: invitation.industry,
            address: invitation.address,
            role: 'client'
          }
        }
      });

      if (authError) {
        console.error('[ACTIVATION] Auth error:', authError);
        toast.error('Erreur lors de la création du compte: ' + authError.message);
        return;
      }

      if (!authData.user) {
        toast.error('Erreur lors de la création du compte');
        return;
      }

      console.log('[ACTIVATION] Account created:', authData.user.id);

      // Utiliser la nouvelle fonction pour synchroniser les subscriptions
      const { error: syncError } = await supabase.rpc('sync_user_subscriptions_from_invitation', {
        invitation_id: invitation.id,
        new_user_id: authData.user.id
      });

      if (syncError) {
        console.error('[ACTIVATION] Subscription sync error:', syncError);
        toast.error('Erreur lors de la synchronisation des packages');
        return;
      }

      console.log('[ACTIVATION] Subscriptions synchronized successfully');

      // Marquer l'invitation comme acceptée
      const { error: updateError } = await supabase
        .from('user_invitations')
        .update({
          status: 'accepted',
          activated_at: new Date().toISOString(),
          user_id: authData.user.id,
        })
        .eq('id', invitation.id);

      if (updateError) {
        console.error('[ACTIVATION] Error updating invitation:', updateError);
      }

      toast.success('Compte créé avec succès !', {
        description: 'Vous allez être redirigé vers votre dashboard'
      });

      // Rediriger vers le dashboard après un court délai
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error: any) {
      console.error('[ACTIVATION] Error creating account:', error);
      toast.error('Erreur lors de la création du compte');
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createAccount,
    isCreating
  };
};
