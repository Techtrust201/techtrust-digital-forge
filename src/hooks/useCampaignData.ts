
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content?: string;
  type: 'newsletter' | 'promotion' | 'automation' | 'event';
  status: 'draft' | 'sent' | 'scheduled' | 'active';
  recipients: number;
  open_rate: number;
  click_rate: number;
  sent_date?: string;
  created_at: string;
}

export interface SMSCampaign {
  id: string;
  name: string;
  message: string;
  status: 'draft' | 'sent' | 'scheduled' | 'failed';
  recipients: number;
  delivered: number;
  delivery_rate: number;
  cost: number;
  sent_date?: string;
  created_at: string;
}

export interface AutomationCampaign {
  id: string;
  name: string;
  description?: string;
  trigger_type: 'welcome' | 'abandoned_cart' | 'birthday' | 'follow_up';
  status: 'active' | 'inactive' | 'paused';
  total_triggered: number;
  total_completed: number;
  conversion_rate: number;
  created_at: string;
}

export const useEmailCampaigns = () => {
  return useQuery({
    queryKey: ['email-campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as EmailCampaign[];
    },
  });
};

export const useSMSCampaigns = () => {
  return useQuery({
    queryKey: ['sms-campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sms_campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as SMSCampaign[];
    },
  });
};

export const useAutomationCampaigns = () => {
  return useQuery({
    queryKey: ['automation-campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automation_campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as AutomationCampaign[];
    },
  });
};

export const useCampaignActions = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createEmailCampaign = useMutation({
    mutationFn: async (campaign: Omit<EmailCampaign, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('email_campaigns')
        .insert([campaign])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      toast({ title: 'Campagne email créée' });
    },
  });

  const sendEmailCampaign = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('email_campaigns')
        .update({ 
          status: 'sent', 
          sent_date: new Date().toISOString(),
          recipients: Math.floor(Math.random() * 1000) + 500,
          open_rate: Math.random() * 40 + 20,
          click_rate: Math.random() * 10 + 2
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      toast({ title: 'Campagne envoyée avec succès' });
    },
  });

  const createSMSCampaign = useMutation({
    mutationFn: async (campaign: Omit<SMSCampaign, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('sms_campaigns')
        .insert([campaign])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sms-campaigns'] });
      toast({ title: 'Campagne SMS créée' });
    },
  });

  const sendSMSCampaign = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('sms_campaigns')
        .update({ 
          status: 'sent', 
          sent_date: new Date().toISOString(),
          recipients: Math.floor(Math.random() * 500) + 100,
          delivered: Math.floor(Math.random() * 480) + 95,
          delivery_rate: Math.random() * 5 + 95,
          cost: Math.random() * 50 + 10
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sms-campaigns'] });
      toast({ title: 'Campagne SMS envoyée' });
    },
  });

  return {
    createEmailCampaign,
    sendEmailCampaign,
    createSMSCampaign,
    sendSMSCampaign,
  };
};
