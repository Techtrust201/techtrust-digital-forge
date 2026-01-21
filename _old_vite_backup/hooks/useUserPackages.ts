
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useUserPackages = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateUserPackages = async (userId: string, packageIds: string[]) => {
    setIsLoading(true);
    
    try {
      const targetUserId = userId.replace('profile_', '');
      
      const { error } = await supabase.rpc('update_user_packages', {
        target_user_id: targetUserId,
        new_package_ids: packageIds
      });

      if (error) {
        console.error('[USER_PACKAGES] Error updating packages:', error);
        throw error;
      }

      toast.success('Packages mis à jour avec succès');
      return { success: true };
    } catch (error: any) {
      console.error('[USER_PACKAGES] Failed to update packages:', error);
      toast.error('Erreur lors de la mise à jour des packages');
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateUserPackages,
    isLoading
  };
};
