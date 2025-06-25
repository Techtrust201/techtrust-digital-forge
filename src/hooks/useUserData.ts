
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useUserData = () => {
  const location = useLocation();

  // Récupérer les données réelles des utilisateurs avec leurs subscriptions
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['admin-users', location.pathname],
    queryFn: async () => {
      let query = supabase
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

      // Filtrer selon la route
      if (location.pathname.includes('/new')) {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        query = query.gte('created_at', sevenDaysAgo.toISOString());
      } else if (location.pathname.includes('/suspended')) {
        query = query.eq('status', 'suspended');
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }

      // Transformer les données pour correspondre au format attendu
      return data?.map((user: any, index: number) => ({
        id: index + 1,
        name: user.name || 'Utilisateur sans nom',
        email: `user-${user.id}@example.com`, // Placeholder car nous n'avons pas l'email dans profiles
        role: 'client',
        packages: user.user_subscriptions?.map((sub: any) => sub.package_id) || [],
        status: user.status || 'active',
        tier: user.tier || 'bronze',
        created: new Date(user.created_at).toLocaleDateString('fr-FR'),
        lastLogin: 'Récent'
      })) || [];
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
    if (path.includes('/new')) return 'Comptes créés récemment en attente de validation';
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
