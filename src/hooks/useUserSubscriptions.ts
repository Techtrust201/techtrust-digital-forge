import { useState, useEffect } from 'react';
import { useSupabaseAuth } from './useSupabaseAuth';

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

// Données de test simplifiées
const mockSubscriptions: Record<string, UserSubscription[]> = {
  'admin_test_user': [
    {
      id: 'sub_admin_1',
      user_id: 'admin_test_user',
      package_id: 'growth-pro',
      package_name: 'Growth Pro',
      package_category: 'growth',
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-06-15T10:00:00Z'
    }
  ],
  'client_test_user': [
    {
      id: 'sub_client_1',
      user_id: 'client_test_user',
      package_id: 'website-starter',
      package_name: 'Website Starter',
      package_category: 'website',
      status: 'active',
      created_at: '2024-02-01T10:00:00Z',
      updated_at: '2024-06-14T10:00:00Z'
    }
  ]
};

export const useUserSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useSupabaseAuth();

  useEffect(() => {
    if (user) {
      fetchSubscriptions();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchSubscriptions = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const userSubscriptions = mockSubscriptions[user.id] || [];
      setSubscriptions(userSubscriptions);
      setError(null);
      
      console.log('📦 User subscriptions loaded:', userSubscriptions);
    } catch (err: any) {
      setError(err.message);
      console.error('❌ Error fetching subscriptions:', err);
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
    return subscriptions.some(sub => 
      sub.status === 'active' && 
      !['website-starter', 'custom-audit'].includes(sub.package_id)
    );
  };

  const hasCampaignsAccess = () => {
    return subscriptions.some(sub => 
      sub.status === 'active' && 
      ['growth-easy', 'growth-pro', 'growth-enterprise', 'community-starter', 'community-growth', 'community-premium'].includes(sub.package_id)
    );
  };

  const hasAdvancedAnalytics = () => {
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
