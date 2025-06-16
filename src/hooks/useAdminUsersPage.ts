

import { useState } from 'react';
import { useUserData } from './useUserData';

interface User {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  tier: string;
  status: string;
  created: string;
  packages?: string[];
  subscriptions?: any[];
  revenue?: number;
  joinDate?: string;
  lastLogin?: string;
  phone?: string;
  company?: string;
  position?: string;
  industry?: string;
  address?: any;
  notes?: string;
}

export const useAdminUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [editingUser, setEditingUser] = useState<any>(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const {
    getFilteredUsers,
    getPageTitle,
    getPageDescription
  } = useUserData();

  // Get users from the filtered function and convert to expected format
  const rawUsers = getFilteredUsers();
  const users: User[] = rawUsers.map(user => ({
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    role: user.role || 'user',
    tier: user.tier || 'bronze',
    status: user.status || 'active',
    created: user.created || new Date().toISOString().split('T')[0],
    packages: user.packages || [],
    subscriptions: [],
    revenue: 0,
    joinDate: user.created,
    lastLogin: user.lastLogin,
    phone: undefined,
    company: undefined,
    position: undefined,
    industry: undefined,
    address: undefined,
    notes: undefined
  }));

  // Create mock stats based on users data
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    inactiveUsers: users.filter(u => u.status !== 'active').length,
    totalRevenue: users.reduce((sum, u) => sum + (u.revenue || 0), 0)
  };

  // Filter users based on search criteria
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesTier = tierFilter === 'all' || user.tier === tierFilter;
    
    return matchesSearch && matchesStatus && matchesTier;
  });

  const openEditDialog = (user: any) => {
    setEditingUser(user);
  };

  const saveUserPackages = async (packages: string[]): Promise<void> => {
    if (!editingUser) return;
    
    console.log('Saving packages for user:', editingUser.id, packages);
    // Ici vous pourriez implémenter la logique de sauvegarde
    setEditingUser(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTierFilter('all');
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    tierFilter,
    setTierFilter,
    editingUser,
    showCreateUserModal,
    setShowCreateUserModal,
    users: filteredUsers,
    isLoading: false, // Static data, so never loading
    stats,
    openEditDialog,
    saveUserPackages,
    clearFilters,
    closeEditDialog: () => setEditingUser(null)
  };
};

