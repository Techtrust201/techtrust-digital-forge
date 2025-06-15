
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Profile {
  id: string;
  name?: string;
  phone?: string;
  company?: string;
  position?: string;
  industry?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  notes?: string;
  tier: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface UserWithAuth extends Profile {
  email?: string;
  emailVerified?: boolean;
  subscriptions?: any[];
  packages?: string[];
  revenue?: number;
  joinDate?: string;
  lastLogin?: string;
}

export const useSupabaseUsers = () => {
  const [users, setUsers] = useState<UserWithAuth[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Récupérer tous les profils avec leurs informations d'authentification
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          *,
          user_subscriptions (*)
        `);

      if (profilesError) {
        console.error('Erreur lors de la récupération des profils:', profilesError);
        toast.error('Erreur lors du chargement des utilisateurs');
        return;
      }

      // Récupérer les informations d'authentification
      const { data: authUsers, error: authError } = await supabase
        .from('user')
        .select('id, email, emailVerified, createdAt');

      if (authError) {
        console.error('Erreur lors de la récupération des données auth:', authError);
      }

      // Combiner les données
      const combinedUsers: UserWithAuth[] = profiles?.map(profile => {
        const authUser = authUsers?.find(auth => auth.id === profile.id);
        
        return {
          ...profile,
          email: authUser?.email,
          emailVerified: authUser?.emailVerified,
          joinDate: profile.created_at?.split('T')[0],
          lastLogin: 'Récemment', // À implémenter avec les sessions
          packages: profile.user_subscriptions?.map((sub: any) => sub.package_id) || [],
          subscriptions: profile.user_subscriptions || [],
          revenue: profile.user_subscriptions?.reduce((total: number, sub: any) => {
            // Calculer le prix basé sur le package_id - à améliorer
            return total + 0;
          }, 0) || 0
        };
      }) || [];

      setUsers(combinedUsers);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      toast.error('Erreur lors du chargement des utilisateurs');
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    position?: string;
    industry?: string;
    address?: any;
    selectedPackages: string[];
    notes?: string;
  }) => {
    try {
      // Vérifier si l'utilisateur existe déjà
      const { data: existingUser } = await supabase
        .from('user')
        .select('email')
        .eq('email', userData.email)
        .single();

      if (existingUser) {
        toast.error('Un utilisateur avec cet email existe déjà');
        return { success: false, error: 'Email déjà utilisé' };
      }

      // Créer l'utilisateur avec Better-Auth via l'API
      const response = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: 'TempPassword123!', // Mot de passe temporaire
          name: `${userData.firstName} ${userData.lastName}`,
          profile: {
            phone: userData.phone,
            company: userData.company,
            position: userData.position,
            industry: userData.industry,
            address: userData.address,
            notes: userData.notes,
          },
          packages: userData.selectedPackages
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création');
      }

      const result = await response.json();
      
      // Rafraîchir la liste des utilisateurs
      await fetchUsers();
      
      toast.success(`Client ${userData.firstName} ${userData.lastName} créé avec succès`);
      return { success: true, data: result };

    } catch (error: any) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      toast.error(error.message || 'Erreur lors de la création du client');
      return { success: false, error: error.message };
    }
  };

  const updateUserPackages = async (userId: string, packages: string[]) => {
    try {
      // Supprimer les anciens packages
      const { error: deleteError } = await supabase
        .from('user_subscriptions')
        .delete()
        .eq('user_id', userId);

      if (deleteError) {
        throw deleteError;
      }

      // Ajouter les nouveaux packages
      if (packages.length > 0) {
        const subscriptions = packages.map(packageId => ({
          user_id: userId,
          package_id: packageId,
          package_name: packageId, // À améliorer avec les vraies données
          package_category: 'general', // À améliorer
          status: 'active'
        }));

        const { error: insertError } = await supabase
          .from('user_subscriptions')
          .insert(subscriptions);

        if (insertError) {
          throw insertError;
        }
      }

      await fetchUsers();
      toast.success('Formules mises à jour avec succès');
      return { success: true };

    } catch (error: any) {
      console.error('Erreur lors de la mise à jour des packages:', error);
      toast.error('Erreur lors de la mise à jour des formules');
      return { success: false, error: error.message };
    }
  };

  const getUserStats = () => {
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.status === 'active').length;
    const inactiveUsers = users.filter(user => user.status === 'inactive').length;
    const totalRevenue = users.reduce((sum, user) => sum + (user.revenue || 0), 0);

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      totalRevenue
    };
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    isLoading,
    fetchUsers,
    createUser,
    updateUserPackages,
    getUserStats
  };
};
