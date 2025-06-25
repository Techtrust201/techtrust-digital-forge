
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useUserData = () => {
  const location = useLocation();

  // Récupérer les données des utilisateurs avec une requête qui combine profiles et invitations
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['admin-users', location.pathname],
    queryFn: async () => {
      console.log('[USER_DATA] Fetching users for path:', location.pathname);

      // Requête pour récupérer les utilisateurs réels (avec profils créés)
      const { data: profileUsers, error: profileError } = await supabase
        .from('profiles')
        .select(`
          id,
          name,
          role,
          status,
          tier,
          created_at,
          user_subscriptions (
            package_id,
            package_name,
            package_category,
            status
          )
        `);

      if (profileError) {
        console.error('[USER_DATA] Error fetching profiles:', profileError);
        throw profileError;
      }

      // Requête pour récupérer les invitations en attente
      const { data: pendingInvitations, error: invitationError } = await supabase
        .from('user_invitations')
        .select('*')
        .eq('status', 'pending');

      if (invitationError) {
        console.error('[USER_DATA] Error fetching invitations:', invitationError);
        // Ne pas bloquer si les invitations échouent
      }

      console.log('[USER_DATA] Profile users:', profileUsers?.length || 0);
      console.log('[USER_DATA] Pending invitations:', pendingInvitations?.length || 0);

      // Combiner les données selon la route
      let combinedUsers: any[] = [];

      if (location.pathname.includes('/new')) {
        // Page "nouveaux comptes" : utilisateurs récents + invitations en attente
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const recentUsers = profileUsers?.filter(user => 
          new Date(user.created_at) >= sevenDaysAgo
        ) || [];

        combinedUsers = [
          ...recentUsers.map((user: any, index: number) => ({
            id: `profile_${user.id}`,
            name: user.name || 'Utilisateur sans nom',
            email: `user-${user.id}@example.com`, // Placeholder
            role: 'client',
            packages: user.user_subscriptions?.map((sub: any) => sub.package_id) || [],
            status: user.status || 'active',
            tier: user.tier || 'bronze',
            created: new Date(user.created_at).toLocaleDateString('fr-FR'),
            lastLogin: 'Récent',
            type: 'user'
          })),
          ...(pendingInvitations?.map((invitation: any, index: number) => ({
            id: `invitation_${invitation.id}`,
            name: invitation.name,
            email: invitation.email,
            role: 'client',
            packages: invitation.selected_packages || [],
            status: 'pending',
            tier: 'bronze',
            created: new Date(invitation.created_at).toLocaleDateString('fr-FR'),
            lastLogin: 'En attente d\'activation',
            type: 'invitation'
          })) || [])
        ];
      } else if (location.pathname.includes('/suspended')) {
        // Page "comptes suspendus" : uniquement les profils suspendus
        combinedUsers = profileUsers?.filter(user => user.status === 'suspended')
          .map((user: any, index: number) => ({
            id: `profile_${user.id}`,
            name: user.name || 'Utilisateur sans nom',
            email: `user-${user.id}@example.com`,
            role: 'client',
            packages: user.user_subscriptions?.map((sub: any) => sub.package_id) || [],
            status: user.status || 'suspended',
            tier: user.tier || 'bronze',
            created: new Date(user.created_at).toLocaleDateString('fr-FR'),
            lastLogin: 'Suspendu',
            type: 'user'
          })) || [];
      } else {
        // Page "tous les utilisateurs" : profils actifs uniquement
        combinedUsers = profileUsers?.filter(user => user.status !== 'suspended')
          .map((user: any, index: number) => ({
            id: `profile_${user.id}`,
            name: user.name || 'Utilisateur sans nom',
            email: `user-${user.id}@example.com`,
            role: 'client',
            packages: user.user_subscriptions?.map((sub: any) => sub.package_id) || [],
            status: user.status || 'active',
            tier: user.tier || 'bronze',
            created: new Date(user.created_at).toLocaleDateString('fr-FR'),
            lastLogin: 'Récent',
            type: 'user'
          })) || [];
      }

      console.log('[USER_DATA] Combined users:', combinedUsers.length);
      return combinedUsers;
    },
  });

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/new')) return 'Nouveaux comptes';
    if (path.includes('/suspended')) return 'Comptes suspendus';
    if (path.includes('/create')) return 'Créer un compte';
    return 'Tous les utilisateurs';
  };

  const getPageDescription = () => {
    const path = location.pathname;
    if (path.includes('/new')) return 'Comptes créés récemment et invitations en attente de validation';
    if (path.includes('/suspended')) return 'Comptes suspendus temporairement ou définitivement';
    if (path.includes('/create')) return 'Créer un nouveau compte utilisateur';
    return 'Gérez tous vos utilisateurs et leurs accès aux packages';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'suspended': return 'Suspendu';
      case 'pending': return 'En attente';
      default: return status;
    }
  };

  return {
    users,
    isLoading,
    error,
    getPageTitle,
    getPageDescription,
    getStatusColor,
    getStatusLabel
  };
};
