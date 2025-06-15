
import { supabase } from '@/integrations/supabase/client';
import type { UserWithAuth } from '@/types/user';

export interface UserRole {
  id: string;
  userId: string;
  role: 'super_admin' | 'admin' | 'manager' | 'employee' | 'client';
  createdAt: string;
}

export const getUserRole = async (userId: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('userId', userId)
      .single();
    
    if (error) {
      console.error('Get user role error:', error);
      return null;
    }
    
    return data?.role || null;
  } catch (error) {
    console.error('Get user role error:', error);
    return null;
  }
};

export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('userId', userId)
      .in('role', ['super_admin', 'admin']);
    
    if (error) {
      console.error('Is admin check error:', error);
      return false;
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error('Is admin check error:', error);
    return false;
  }
};

export const hasRole = async (userId: string, role: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('userId', userId)
      .eq('role', role);
    
    if (error) {
      console.error('Has role check error:', error);
      return false;
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error('Has role check error:', error);
    return false;
  }
};
