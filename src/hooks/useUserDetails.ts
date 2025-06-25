
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useUserDetails = (userId: string | null) => {
  return useQuery({
    queryKey: ['user-details', userId],
    queryFn: async () => {
      if (!userId || userId.startsWith('invitation_')) {
        return null;
      }

      const targetUserId = userId.replace('profile_', '');
      
      const { data, error } = await supabase.rpc('get_user_details', {
        target_user_id: targetUserId
      });

      if (error) {
        console.error('[USER_DETAILS] Error fetching user details:', error);
        throw error;
      }

      return data?.[0] || null;
    },
    enabled: !!userId && !userId.startsWith('invitation_'),
  });
};
