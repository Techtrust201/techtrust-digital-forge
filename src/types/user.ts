
export interface Profile {
  id: string;
  name?: string;
  phone?: string;
  company?: string;
  position?: string;
  industry?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  notes?: string;
  tier: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface UserWithAuth extends Profile {
  email?: string;
  emailVerified?: boolean;
  subscriptions?: any[];
  packages?: string[];
  revenue?: number;
  joinDate?: string;
  lastLogin?: string;
  role?: string;
  created?: string;
}

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  industry?: string;
  address?: any;
  selectedPackages: string[];
  notes?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalRevenue: number;
}
