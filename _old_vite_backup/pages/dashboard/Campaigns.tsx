
import React from 'react';
import { useLocation } from 'react-router-dom';
import EmailCampaigns from './campaigns/EmailCampaigns';
import SMSCampaigns from './campaigns/SMSCampaigns';
import LeadCampaigns from './campaigns/LeadCampaigns';
import AutomationCampaigns from './campaigns/AutomationCampaigns';
import ContentCreation from './campaigns/ContentCreation';

const Campaigns = () => {
  const location = useLocation();

  // Déterminer quelle sous-page afficher basé sur l'URL
  if (location.pathname.includes('/dashboard/campaigns/sms')) {
    return <SMSCampaigns />;
  }
  if (location.pathname.includes('/dashboard/campaigns/leads')) {
    return <LeadCampaigns />;
  }
  if (location.pathname.includes('/dashboard/campaigns/automation')) {
    return <AutomationCampaigns />;
  }
  if (location.pathname.includes('/dashboard/campaigns/content')) {
    return <ContentCreation />;
  }
  
  // Par défaut, afficher les campagnes email
  return <EmailCampaigns />;
};

export default Campaigns;
