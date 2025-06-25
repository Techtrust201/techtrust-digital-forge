
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('status', 'active');

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (err: any) {
      setError(err.message);
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

  const getUserTier = () => {
    // Calculer le tier basé sur les packages actifs
    const packageIds = subscriptions
      .filter(sub => sub.status === 'active')
      .map(sub => sub.package_id);
    
    // Logique simplifiée - devrait idéalement utiliser la fonction SQL
    if (packageIds.some(id => ['growth-enterprise', 'custom-enterprise'].includes(id))) {
      return 'diamond';
    } else if (packageIds.some(id => ['website-premium', 'community-premium', 'custom-app'].includes(id))) {
      return 'gold';
    } else if (packageIds.some(id => ['website-business', 'growth-pro', 'community-growth'].includes(id))) {
      return 'silver';
    }
    return 'bronze';
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
    getUserTier,
    refetch: fetchSubscriptions
  };
};
