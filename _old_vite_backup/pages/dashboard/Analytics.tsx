
import React from 'react';
import { useLocation } from 'react-router-dom';
import WebsiteAnalytics from './analytics/WebsiteAnalytics';
import SocialAnalytics from './analytics/SocialAnalytics';
import GrowthAnalytics from './analytics/GrowthAnalytics';
import CommunityAnalytics from './analytics/CommunityAnalytics';

const Analytics = () => {
  const location = useLocation();

  // Déterminer quelle sous-page afficher basé sur l'URL
  if (location.pathname.includes('/dashboard/analytics/social')) {
    return <SocialAnalytics />;
  }
  if (location.pathname.includes('/dashboard/analytics/growth')) {
    return <GrowthAnalytics />;
  }
  if (location.pathname.includes('/dashboard/analytics/community')) {
    return <CommunityAnalytics />;
  }
  
  // Par défaut, afficher les analytics du site web
  return <WebsiteAnalytics />;
};

export default Analytics;
