
import { useState } from 'react';
import { toast } from 'sonner';

export const useCampaignActions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendEmailNow = async (campaignData: any) => {
    setIsLoading(true);
    try {
      // Simulation d'envoi d'email
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const existingCampaigns = JSON.parse(localStorage.getItem('email_campaigns') || '[]');
      const newCampaign = {
        id: Math.random().toString(36).substr(2, 9),
        ...campaignData,
        status: 'sent',
        sentAt: new Date().toISOString(),
        stats: {
          sent: Math.floor(Math.random() * 1000) + 100,
          opened: Math.floor(Math.random() * 300) + 50,
          clicked: Math.floor(Math.random() * 100) + 10
        }
      };

      const updatedCampaigns = [...existingCampaigns, newCampaign];
      localStorage.setItem('email_campaigns', JSON.stringify(updatedCampaigns));
      
      toast.success('Email envoyé avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi');
    } finally {
      setIsLoading(false);
    }
  };

  const scheduleCampaign = async (campaignData: any, scheduledDate: string) => {
    setIsLoading(true);
    try {
      const existingCampaigns = JSON.parse(localStorage.getItem('email_campaigns') || '[]');
      const newCampaign = {
        id: Math.random().toString(36).substr(2, 9),
        ...campaignData,
        status: 'scheduled',
        scheduledAt: scheduledDate,
        createdAt: new Date().toISOString()
      };

      const updatedCampaigns = [...existingCampaigns, newCampaign];
      localStorage.setItem('email_campaigns', JSON.stringify(updatedCampaigns));
      
      toast.success('Campagne programmée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la programmation');
    } finally {
      setIsLoading(false);
    }
  };

  const previewCampaign = async (campaignData: any) => {
    setIsLoading(true);
    try {
      // Simulation de génération d'aperçu
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const previewData = {
        subject: campaignData.subject,
        content: campaignData.content,
        recipients: campaignData.recipients || [],
        estimatedDelivery: new Date(Date.now() + 5 * 60000).toLocaleString()
      };
      
      toast.success('Aperçu généré');
      return previewData;
    } catch (error) {
      toast.error('Erreur lors de la génération de l\'aperçu');
    } finally {
      setIsLoading(false);
    }
  };

  const createSequence = async (sequenceType: 'email' | 'sms' | 'mixed', sequenceData: any) => {
    setIsLoading(true);
    try {
      const existingSequences = JSON.parse(localStorage.getItem('campaign_sequences') || '[]');
      const newSequence = {
        id: Math.random().toString(36).substr(2, 9),
        type: sequenceType,
        ...sequenceData,
        status: 'active',
        createdAt: new Date().toISOString(),
        stats: {
          subscribers: 0,
          completionRate: 0,
          conversionRate: 0
        }
      };

      const updatedSequences = [...existingSequences, newSequence];
      localStorage.setItem('campaign_sequences', JSON.stringify(updatedSequences));
      
      toast.success(`Séquence ${sequenceType} créée avec succès`);
    } catch (error) {
      toast.error('Erreur lors de la création de la séquence');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendEmailNow,
    scheduleCampaign,
    previewCampaign,
    createSequence,
    isLoading
  };
};
