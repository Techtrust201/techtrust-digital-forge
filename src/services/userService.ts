
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Profile, UserWithAuth, CreateUserData } from '@/types/user';

export const fetchAllUsers = async (): Promise<UserWithAuth[]> => {
  try {
    // Récupérer tous les profils avec leurs subscriptions
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select(`
        *,
        user_subscriptions (*)
      `);

    if (profilesError) {
      console.error('Erreur lors de la récupération des profils:', profilesError);
      toast.error('Erreur lors du chargement des utilisateurs');
      return [];
    }

    // Récupérer les informations d'authentification
    const { data: authUsers, error: authError } = await supabase
      .from('user')
      .select('id, email, emailVerified, createdAt');

    if (authError) {
      console.error('Erreur lors de la récupération des données auth:', authError);
    }

    // Récupérer les rôles utilisateurs
    const { data: userRoles, error: rolesError } = await supabase
      .from('user_roles')
      .select('userId, role');

    if (rolesError) {
      console.error('Erreur lors de la récupération des rôles:', rolesError);
    }

    // Combiner les données
    const combinedUsers: UserWithAuth[] = profiles?.map(profile => {
      const authUser = authUsers?.find(auth => auth.id === profile.id);
      const userRole = userRoles?.find(role => role.userId === profile.id);
      
      // Parse address safely
      let parsedAddress;
      try {
        parsedAddress = typeof profile.address === 'string' 
          ? JSON.parse(profile.address) 
          : profile.address;
      } catch {
        parsedAddress = undefined;
      }
      
      return {
        ...profile,
        address: parsedAddress,
        email: authUser?.email,
        emailVerified: authUser?.emailVerified,
        joinDate: profile.created_at?.split('T')[0],
        lastLogin: 'Récemment',
        created: profile.created_at,
        role: userRole?.role || 'client',
        packages: profile.user_subscriptions?.map((sub: any) => sub.package_id) || [],
        subscriptions: profile.user_subscriptions || [],
        revenue: profile.user_subscriptions?.reduce((total: number, sub: any) => {
          return total + 0; // À calculer selon la logique métier
        }, 0) || 0
      };
    }) || [];

    return combinedUsers;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    toast.error('Erreur lors du chargement des utilisateurs');
    return [];
  }
};

export const createNewUser = async (userData: CreateUserData) => {
  try {
    // Utiliser la fonction Edge admin-create-user
    const { data, error } = await supabase.functions.invoke('admin-create-user', {
      body: {
        email: userData.email,
        password: 'TempPassword123!',
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
      }
    });

    if (error) {
      throw new Error(error.message || 'Erreur lors de la création');
    }

    toast.success(`Client ${userData.firstName} ${userData.lastName} créé avec succès`);
    return { success: true, data };

  } catch (error: any) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    toast.error(error.message || 'Erreur lors de la création du client');
    return { success: false, error: error.message };
  }
};

export const updateUserPackages = async (userId: string, packages: string[]) => {
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
        package_name: packageId,
        package_category: 'general',
        status: 'active'
      }));

      const { error: insertError } = await supabase
        .from('user_subscriptions')
        .insert(subscriptions);

      if (insertError) {
        throw insertError;
      }
    }

    toast.success('Formules mises à jour avec succès');
    return { success: true };

  } catch (error: any) {
    console.error('Erreur lors de la mise à jour des packages:', error);
    toast.error('Erreur lors de la mise à jour des formules');
    return { success: false, error: error.message };
  }
};
