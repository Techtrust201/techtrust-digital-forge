
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
    users: rawUsers,
    isLoading,
    stats
  } = useUserData();

  // Convert users to the expected User format
  const users: User[] = rawUsers.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || 'user',
    tier: user.tier || 'bronze',
    status: user.status || 'active',
    created: user.created_at || new Date().toISOString().split('T')[0],
    packages: user.packages || [],
    subscriptions: user.subscriptions || [],
    revenue: user.revenue || 0,
    joinDate: user.created_at,
    lastLogin: user.lastLogin,
    phone: user.phone,
    company: user.company,
    position: user.position,
    industry: user.industry,
    address: user.address,
    notes: user.notes
  }));

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

  const saveUserPackages = async (packages: string[]) => {
    if (!editingUser) return;
    
    console.log('Saving packages for user:', editingUser.id, packages);
    // Ici vous pourriez implémenter la logique de sauvegarde
    setEditingUser(null);
    return { success: true };
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
    isLoading,
    stats,
    openEditDialog,
    saveUserPackages,
    clearFilters,
    closeEditDialog: () => setEditingUser(null)
  };
};
