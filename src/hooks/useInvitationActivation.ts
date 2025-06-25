
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { InvitationData } from '@/types/invitation';

export const useInvitationActivation = (token: string | null) => {
  const navigate = useNavigate();
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      toast.error('Lien d\'activation invalide');
      navigate('/auth');
      return;
    }

    loadInvitation();
  }, [token, navigate]);

  const loadInvitation = async () => {
    try {
      console.log('[ACTIVATION] Loading invitation for token:', token);
      
      const { data, error } = await supabase
        .from('user_invitations')
        .select('*')
        .eq('invitation_token', token)
        .eq('status', 'pending')
        .single();

      if (error || !data) {
        console.error('[ACTIVATION] Invitation not found:', error);
        toast.error('Invitation introuvable ou expirée');
        navigate('/auth');
        return;
      }

      // Vérifier si l'invitation n'est pas expirée
      if (new Date(data.expires_at) < new Date()) {
        toast.error('Cette invitation a expiré');
        navigate('/auth');
        return;
      }

      console.log('[ACTIVATION] Invitation loaded:', data);
      
      // Convertir les données pour correspondre à notre interface
      const invitationData: InvitationData = {
        id: data.id,
        email: data.email,
        name: data.name,
        company: data.company || '',
        selected_packages: Array.isArray(data.selected_packages) 
          ? data.selected_packages.map(pkg => String(pkg))
          : [],
        status: data.status,
      };
      
      setInvitation(invitationData);
    } catch (error) {
      console.error('[ACTIVATION] Error loading invitation:', error);
      toast.error('Erreur lors du chargement de l\'invitation');
      navigate('/auth');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    invitation,
    isLoading
  };
};
