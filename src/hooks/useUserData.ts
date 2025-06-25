
import { useLocation } from 'react-router-dom';

export const useUserData = () => {
  const location = useLocation();

  const getFilteredUsers = () => {
    const path = location.pathname;
    
    if (path.includes('/new')) {
      return [
        {
          id: 1,
          name: 'Marie Dubois',
          email: 'marie.dubois@email.com',
          role: 'client',
          packages: ['website-business', 'growth-pro'],
          status: 'pending',
          tier: 'gold',
          created: '2024-01-20',
          lastLogin: 'Jamais'
        },
        {
          id: 2,
          name: 'Jean Durand',
          email: 'jean.durand@email.com',
          role: 'client',
          packages: ['community-starter'],
          status: 'pending',
          tier: 'bronze',
          created: '2024-01-19',
          lastLogin: 'Jamais'
        }
      ];
    }
    
    if (path.includes('/suspended')) {
      return [
        {
          id: 3,
          name: 'Sophie Laurent',
          email: 'sophie.laurent@email.com',
          role: 'client',
          packages: ['community-starter', 'custom-audit'],
          status: 'suspended',
          tier: 'silver',
          created: '2024-01-05',
          lastLogin: '2024-01-18'
        },
        {
          id: 4,
          name: 'Paul Moreau',
          email: 'paul.moreau@email.com',
          role: 'client',
          packages: ['website-starter'],
          status: 'suspended',
          tier: 'bronze',
          created: '2023-12-15',
          lastLogin: '2024-01-10'
        }
      ];
    }
    
    return [
      {
        id: 1,
        name: 'Marie Dubois',
        email: 'marie.dubois@email.com',
        role: 'client',
        packages: ['website-business', 'growth-pro'],
        status: 'active',
        tier: 'gold',
        created: '2024-01-15',
        lastLogin: '2024-01-20'
      },
      {
        id: 2,
        name: 'Pierre Martin',
        email: 'pierre.martin@email.com',
        role: 'client',
        packages: ['growth-pro', 'community-premium'],
        status: 'active',
        tier: 'diamond',
        created: '2024-01-10',
        lastLogin: '2024-01-19'
      },
      {
        id: 3,
        name: 'Sophie Laurent',
        email: 'sophie.laurent@email.com',
        role: 'client',
        packages: ['community-premium'],
        status: 'suspended',
        tier: 'silver',
        created: '2024-01-05',
        lastLogin: '2024-01-18'
      }
    ];
  };

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
    return 'Gérez tous vos utilisateurs et leurs accès';
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

  // Retourner les propriétés attendues par AdminUsersPage
  const users = getFilteredUsers();
  const isLoading = false;
  const error = null;

  return {
    users,
    isLoading,
    error,
    getFilteredUsers,
    getPageTitle,
    getPageDescription,
    getStatusColor,
    getStatusLabel
  };
};
