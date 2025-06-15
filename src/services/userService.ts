
import { toast } from 'sonner';
import type { Profile, UserWithAuth, CreateUserData } from '@/types/user';

// Données de test pour démonstration
const mockUsers: UserWithAuth[] = [
  {
    id: 'user_1',
    name: 'Admin Test',
    email: 'admin@test.com',
    phone: '+33123456789',
    company: 'TechTrust Digital',
    position: 'Administrateur',
    industry: 'Digital',
    tier: 'premium',
    status: 'active',
    role: 'admin',
    emailVerified: true,
    joinDate: '2024-01-15',
    lastLogin: 'Récemment',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-06-15T10:00:00Z',
    created: '2024-01-15T10:00:00Z',
    packages: ['growth-pro', 'website-premium'],
    subscriptions: [
      {
        id: 'sub_1',
        user_id: 'user_1',
        package_id: 'growth-pro',
        package_name: 'Growth Pro',
        package_category: 'growth',
        status: 'active',
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-06-15T10:00:00Z'
      }
    ],
    revenue: 299
  },
  {
    id: 'user_2',
    name: 'Client Test',
    email: 'client@test.com',
    phone: '+33987654321',
    company: 'StartupCo',
    position: 'CEO',
    industry: 'Tech',
    tier: 'basic',
    status: 'active',
    role: 'client',
    emailVerified: true,
    joinDate: '2024-02-01',
    lastLogin: 'Il y a 2 jours',
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-06-14T10:00:00Z',
    created: '2024-02-01T10:00:00Z',
    packages: ['website-starter'],
    subscriptions: [
      {
        id: 'sub_2',
        user_id: 'user_2',
        package_id: 'website-starter',
        package_name: 'Website Starter',
        package_category: 'website',
        status: 'active',
        created_at: '2024-02-01T10:00:00Z',
        updated_at: '2024-06-14T10:00:00Z'
      }
    ],
    revenue: 99
  }
];

export const fetchAllUsers = async (): Promise<UserWithAuth[]> => {
  try {
    // Simuler un délai de chargement
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Fetching mock users:', mockUsers);
    return mockUsers;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    toast.error('Erreur lors du chargement des utilisateurs');
    return [];
  }
};

export const createNewUser = async (userData: CreateUserData) => {
  try {
    const newUser: UserWithAuth = {
      id: `user_${Date.now()}`,
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      phone: userData.phone,
      company: userData.company,
      position: userData.position,
      industry: userData.industry,
      address: userData.address,
      notes: userData.notes,
      tier: 'basic',
      status: 'active',
      role: 'client',
      emailVerified: false,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Jamais',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created: new Date().toISOString(),
      packages: userData.selectedPackages,
      subscriptions: userData.selectedPackages.map(packageId => ({
        id: `sub_${Date.now()}_${Math.random()}`,
        user_id: `user_${Date.now()}`,
        package_id: packageId,
        package_name: packageId,
        package_category: 'general',
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })),
      revenue: 0
    };

    // Ajouter à la liste mock
    mockUsers.push(newUser);

    toast.success(`Client ${userData.firstName} ${userData.lastName} créé avec succès`);
    return { success: true, data: newUser };

  } catch (error: any) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    toast.error(error.message || 'Erreur lors de la création du client');
    return { success: false, error: error.message };
  }
};

export const updateUserPackages = async (userId: string, packages: string[]) => {
  try {
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex].packages = packages;
      mockUsers[userIndex].subscriptions = packages.map(packageId => ({
        id: `sub_${Date.now()}_${Math.random()}`,
        user_id: userId,
        package_id: packageId,
        package_name: packageId,
        package_category: 'general',
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
    }

    toast.success('Formules mises à jour avec succès');
    return { success: true };

  } catch (error: any) {
    console.error('Erreur lors de la mise à jour des packages:', error);
    toast.error('Erreur lors de la mise à jour des formules');
    return { success: false, error: error.message };
  }
};
