
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsData {
  id: string;
  metric_name: string;
  metric_value: number;
  date: string;
  category?: string;
  metadata?: any;
  created_at: string;
}

export const useAnalyticsData = () => {
  return useQuery({
    queryKey: ['analytics-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_data')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as AnalyticsData[];
    },
  });
};

export const useAnalyticsOverview = () => {
  return useQuery({
    queryKey: ['analytics-overview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_data')
        .select('*')
        .in('metric_name', ['unique_visitors', 'page_views', 'click_rate', 'session_duration']);
      
      if (error) throw error;
      return data as AnalyticsData[];
    },
  });
};

export const useRevenueAnalytics = () => {
  return useQuery({
    queryKey: ['revenue-analytics'],
    queryFn: async () => {
      // Simuler des données de revenus
      return [
        { service: 'Agence Web', revenue: 58400, percentage: 39.7, clients: 45 },
        { service: 'Growth Hacking', revenue: 34200, percentage: 23.2, clients: 28 },
        { service: 'Consulting Digital', revenue: 28700, percentage: 19.5, clients: 22 },
        { service: 'Community Management', revenue: 25930, percentage: 17.6, clients: 31 },
      ];
    },
  });
};

export const useUserAnalytics = () => {
  return useQuery({
    queryKey: ['user-analytics'],
    queryFn: async () => {
      // Simuler des données utilisateurs
      return {
        deviceStats: [
          { device: 'Desktop', users: 4523, percentage: 54.8 },
          { device: 'Mobile', users: 2847, percentage: 34.5 },
          { device: 'Tablet', users: 877, percentage: 10.7 },
        ],
        topCountries: [
          { country: 'France', users: 3256, flag: '🇫🇷', percentage: 39.5 },
          { country: 'Belgique', users: 1847, flag: '🇧🇪', percentage: 22.4 },
          { country: 'Suisse', users: 1205, flag: '🇨🇭', percentage: 14.6 },
          { country: 'Canada', users: 892, flag: '🇨🇦', percentage: 10.8 },
          { country: 'Maroc', users: 634, flag: '🇲🇦', percentage: 7.7 },
        ],
      };
    },
  });
};
