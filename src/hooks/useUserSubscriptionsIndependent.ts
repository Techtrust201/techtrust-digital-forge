
import { useState, useEffect } from 'react';
import { db } from '@/lib/database';
import { useBetterAuthIndependent } from './useBetterAuthIndependent';

export interface UserSubscription {
  id: string;
  user_id: string;
  package_id: string;
  package_name: string;
  package_category: string;
  status: string;
  created_at: string;
  expires_at?: string;
  updated_at: string;
}

export const useUserSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useBetterAuthIndependent();

  useEffect(() => {
    if (user) {
      fetchSubscriptions();
    }
  }, [user]);

  const fetchSubscriptions = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const data = await db.query<UserSubscription>(
        'SELECT * FROM public.user_subscriptions WHERE user_id = $1 AND status = $2',
        [user.id, 'active']
      );
      setSubscriptions(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching subscriptions:', err);
    } finally {
      setLoading(false);
    }
  };

  const hasPackage = (packageId: string) => {
    return subscriptions.some(sub => sub.package_id === packageId && sub.status === 'active');
  };

  const hasCategory = (category: string) => {
    return subscriptions.some(sub => sub.package_category === category && sub.status === 'active');
  };

  const getActivePackages = () => {
    return subscriptions.filter(sub => sub.status === 'active');
  };

  const hasAnalyticsAccess = () => {
    // Accès Analytics pour tous les packages sauf les plus basiques
    return subscriptions.some(sub => 
      sub.status === 'active' && 
      !['website-starter', 'custom-audit'].includes(sub.package_id)
    );
  };

  const hasCampaignsAccess = () => {
    // Accès Campagnes pour Growth Hacking et Community Management
    return subscriptions.some(sub => 
      sub.status === 'active' && 
      ['growth-easy', 'growth-pro', 'growth-enterprise', 'community-starter', 'community-growth', 'community-premium'].includes(sub.package_id)
    );
  };

  const hasAdvancedAnalytics = () => {
    // Analytics avancées pour les packages premium
    return subscriptions.some(sub => 
      sub.status === 'active' && 
      ['growth-pro', 'growth-enterprise', 'community-premium', 'website-premium', 'custom-enterprise'].includes(sub.package_id)
    );
  };

  return {
    subscriptions,
    loading,
    error,
    hasPackage,
    hasCategory,
    getActivePackages,
    hasAnalyticsAccess,
    hasCampaignsAccess,
    hasAdvancedAnalytics,
    refetch: fetchSubscriptions
  };
};
