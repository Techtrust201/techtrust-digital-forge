
import { db } from '@/lib/database';
import { toast } from 'sonner';
import type { Profile, UserWithAuth, CreateUserData } from '@/types/user';
import { auth } from '@/lib/auth';

export const fetchAllUsers = async (): Promise<UserWithAuth[]> => {
  try {
    // Récupérer tous les profils avec leurs subscriptions
    const profiles = await db.query<any>(`
      SELECT 
        p.*,
        json_agg(
          json_build_object(
            'id', us.id,
            'package_id', us.package_id,
            'package_name', us.package_name,
            'package_category', us.package_category,
            'status', us.status,
            'created_at', us.created_at,
            'expires_at', us.expires_at
          )
        ) FILTER (WHERE us.id IS NOT NULL) as user_subscriptions
      FROM public.profiles p
      LEFT JOIN public.user_subscriptions us ON p.id = us.user_id
      GROUP BY p.id, p.name, p.tier, p.status, p.created_at, p.updated_at, 
               p.phone, p.company, p.position, p.industry, p.address, p.notes
    `);

    // Récupérer les informations d'authentification Better-Auth
    const authUsers = await db.query<any>(`
      SELECT id, email, "emailVerified", "createdAt"
      FROM public."user"
    `);

    // Combiner les données
    const combinedUsers: UserWithAuth[] = profiles?.map(profile => {
      const authUser = authUsers?.find(auth => auth.id === profile.id);
      
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
        role: 'user',
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
    // Créer l'utilisateur avec Better-Auth
    const result = await auth.api.signUpEmail({
      body: {
        email: userData.email,
        password: 'TempPassword123!',
        name: `${userData.firstName} ${userData.lastName}`,
      }
    });

    if (!result?.user) {
      throw new Error('Erreur lors de la création de l\'utilisateur');
    }

    // Mettre à jour le profil avec les informations supplémentaires
    await db.execute(`
      UPDATE public.profiles 
      SET 
        phone = $2,
        company = $3,
        position = $4,
        industry = $5,
        address = $6,
        notes = $7,
        tier = $8
      WHERE id = $1
    `, [
      result.user.id,
      userData.phone,
      userData.company,
      userData.position,
      userData.industry,
      JSON.stringify(userData.address),
      userData.notes,
      'bronze'
    ]);

    // Ajouter les packages/subscriptions
    if (userData.selectedPackages && userData.selectedPackages.length > 0) {
      const subscriptions = userData.selectedPackages.map(packageId => [
        result.user.id,
        packageId,
        packageId,
        'general',
        'active'
      ]);

      for (const subscription of subscriptions) {
        await db.execute(`
          INSERT INTO public.user_subscriptions (user_id, package_id, package_name, package_category, status)
          VALUES ($1, $2, $3, $4, $5)
        `, subscription);
      }
    }

    toast.success(`Client ${userData.firstName} ${userData.lastName} créé avec succès`);
    return { success: true, data: result.user };

  } catch (error: any) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    toast.error(error.message || 'Erreur lors de la création du client');
    return { success: false, error: error.message };
  }
};

export const updateUserPackages = async (userId: string, packages: string[]) => {
  try {
    // Supprimer les anciens packages
    await db.execute(
      'DELETE FROM public.user_subscriptions WHERE user_id = $1',
      [userId]
    );

    // Ajouter les nouveaux packages
    if (packages.length > 0) {
      for (const packageId of packages) {
        await db.execute(`
          INSERT INTO public.user_subscriptions (user_id, package_id, package_name, package_category, status)
          VALUES ($1, $2, $3, $4, $5)
        `, [userId, packageId, packageId, 'general', 'active']);
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
