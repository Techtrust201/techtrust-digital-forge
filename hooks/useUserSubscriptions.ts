"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

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
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setSubscriptions([]);
        return;
      }

      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active');

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
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
    // Access Analytics for all packages except basic ones
    return subscriptions.some(sub => 
      sub.status === 'active' && 
      !['website-starter', 'custom-audit'].includes(sub.package_id)
    );
  };

  const hasCampaignsAccess = () => {
    // Access Campaigns for Growth Hacking and Community Management
    return subscriptions.some(sub => 
      sub.status === 'active' && 
      ['growth-easy', 'growth-pro', 'growth-enterprise', 'community-starter', 'community-growth', 'community-premium'].includes(sub.package_id)
    );
  };

  const hasAdvancedAnalytics = () => {
    // Advanced analytics for premium packages
    return subscriptions.some(sub => 
      sub.status === 'active' && 
      ['growth-pro', 'growth-enterprise', 'community-premium', 'website-premium', 'custom-enterprise'].includes(sub.package_id)
    );
  };

  const getUserTier = () => {
    const packageIds = subscriptions
      .filter(sub => sub.status === 'active')
      .map(sub => sub.package_id);
    
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
