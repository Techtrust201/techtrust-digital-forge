
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { servicesData } from '@/data/servicesData';

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

export const useUserPackages = (userId?: string) => {
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchSubscriptions();
    } else {
      setSubscriptions([]);
      setLoading(false);
    }
  }, [userId]);

  const fetchSubscriptions = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active');

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching subscriptions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Vérifier si l'utilisateur a un package spécifique
  const hasPackage = (packageId: string) => {
    return subscriptions.some(sub => sub.package_id === packageId && sub.status === 'active');
  };

  // Vérifier si l'utilisateur a accès à une catégorie
  const hasCategory = (category: string) => {
    return subscriptions.some(sub => sub.package_category === category && sub.status === 'active');
  };

  // Obtenir tous les packages actifs
  const getActivePackages = () => {
    return subscriptions.filter(sub => sub.status === 'active');
  };

  // Vérifications spécifiques par fonctionnalité
  const hasAnalyticsAccess = () => {
    // Tous les packages ont accès aux analytics de base
    return subscriptions.length > 0;
  };

  const hasAdvancedAnalytics = () => {
    // Analytics avancées pour les plans Pro et Enterprise
    return subscriptions.some(sub => 
      sub.status === 'active' && 
      (sub.package_id.includes('-pro') || sub.package_id.includes('-enterprise'))
    );
  };

  const hasEmailCampaignsAccess = () => {
    // Accès email pour Growth Hacking et certains autres packages
    return subscriptions.some(sub => 
      sub.status === 'active' && 
      (sub.package_category === 'growth' || 
       ['website-premium', 'community-premium'].includes(sub.package_id))
    );
  };

  const hasSMSCampaignsAccess = () => {
    // SMS seulement pour Growth Hacking Pro/Enterprise
    return subscriptions.some(sub => 
      sub.status === 'active' && 
      sub.package_category === 'growth' &&
      (sub.package_id.includes('-pro') || sub.package_id.includes('-enterprise'))
    );
  };

  const getSocialNetworksLimit = () => {
    // Limite des réseaux sociaux selon le package Community Management
    const communityPackage = subscriptions.find(sub => 
      sub.status === 'active' && sub.package_category === 'community'
    );

    if (!communityPackage) return 0;

    // Accéder au service community dans servicesData
    const communityService = servicesData.community;
    if (!communityService) return 0;

    const packageData = communityService.packages.find(pkg => pkg.id === communityPackage.package_id);

    // Extraire la limite depuis les features
    const socialFeature = packageData?.features.find(f => 
      f.toLowerCase().includes('réseaux sociaux')
    );

    if (socialFeature?.includes('2 réseaux')) return 2;
    if (socialFeature?.includes('4 réseaux')) return 4;
    if (socialFeature?.includes('illimité') || communityPackage.package_id.includes('premium')) return -1; // illimité
    
    return 0;
  };

  const getEmailLimit = () => {
    // Limite d'emails selon le package Growth Hacking
    const growthPackage = subscriptions.find(sub => 
      sub.status === 'active' && sub.package_category === 'growth'
    );

    if (!growthPackage) return 0;

    if (growthPackage.package_id === 'growth-easy') return 1000;
    if (growthPackage.package_id === 'growth-pro') return 5000;
    if (growthPackage.package_id === 'growth-enterprise') return -1; // illimité

    return 0;
  };

  const canAccessFeature = (feature: string) => {
    switch (feature) {
      case 'analytics':
        return hasAnalyticsAccess();
      case 'advanced-analytics':
        return hasAdvancedAnalytics();
      case 'email-campaigns':
        return hasEmailCampaignsAccess();
      case 'sms-campaigns':
        return hasSMSCampaignsAccess();
      case 'blog-management':
        return hasCategory('website') || hasCategory('community');
      case 'automation':
        return hasPackage('growth-pro') || hasPackage('growth-enterprise');
      default:
        return false;
    }
  };

  const getUpgradeMessage = (feature: string) => {
    const messages = {
      'analytics': 'Souscrivez à un package pour accéder aux analytics',
      'advanced-analytics': 'Passez au plan Pro ou Enterprise pour les analytics avancées',
      'email-campaigns': 'Souscrivez au Growth Hacking pour les campagnes email',
      'sms-campaigns': 'Passez au Growth Hacking Pro pour les SMS',
      'automation': 'Passez au Growth Hacking Pro pour l\'automatisation'
    };

    return messages[feature as keyof typeof messages] || 'Mettez à niveau votre package pour cette fonctionnalité';
  };

  return {
    subscriptions,
    loading,
    error,
    hasPackage,
    hasCategory,
    getActivePackages,
    hasAnalyticsAccess,
    hasAdvancedAnalytics,
    hasEmailCampaignsAccess,
    hasSMSCampaignsAccess,
    getSocialNetworksLimit,
    getEmailLimit,
    canAccessFeature,
    getUpgradeMessage,
    refetch: fetchSubscriptions
  };
};
