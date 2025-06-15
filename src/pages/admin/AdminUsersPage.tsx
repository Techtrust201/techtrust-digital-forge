
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import UserStatsCards from '@/components/admin/users/UserStatsCards';
import CreateUserForm from '@/components/admin/users/CreateUserForm';
import UsersTable from '@/components/admin/users/UsersTable';
import EditUserDialog from '@/components/admin/users/EditUserDialog';
import SearchFilters from '@/components/admin/SearchFilters';
import CreateUserModal from '@/components/admin/CreateUserModal';
import { useSupabaseUsers } from '@/hooks/useSupabaseUsers';
import { usePackageUtils } from '@/hooks/usePackageUtils';

const AdminUsersPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [editingUser, setEditingUser] = useState<any>(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const {
    users,
    isLoading,
    updateUserPackages,
    getUserStats
  } = useSupabaseUsers();

  const { getPackageById, getPackageColor } = usePackageUtils();

  // Filtrer les utilisateurs selon les critères
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesTier = tierFilter === 'all' || user.tier === tierFilter;
    
    return matchesSearch && matchesStatus && matchesTier;
  });

  const stats = getUserStats();

  const openEditDialog = (user: any) => {
    setEditingUser(user);
  };

  const saveUserPackages = async (packages: string[]) => {
    if (!editingUser) return;
    
    const result = await updateUserPackages(editingUser.id, packages);
    if (result.success) {
      setEditingUser(null);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTierFilter('all');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'inactive':
        return 'Inactif';
      case 'pending':
        return 'En attente';
      default:
        return status;
    }
  };

  const getPageTitle = () => {
    if (location.pathname.includes('/create')) {
      return 'Créer un nouveau client';
    }
    return 'Gestion des utilisateurs';
  };

  const getPageDescription = () => {
    if (location.pathname.includes('/create')) {
      return 'Créez un nouveau compte client avec ses formules';
    }
    return `${stats.totalUsers} utilisateurs dont ${stats.activeUsers} actifs`;
  };

  // Si on est sur la page de création
  if (location.pathname.includes('/create')) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
            <p className="text-gray-500 mt-2">{getPageDescription()}</p>
          </div>
          <CreateUserForm />
        </div>
      </AdminLayout>
    );
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des utilisateurs...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
            <p className="text-gray-500 mt-2">{getPageDescription()}</p>
          </div>
          <Button 
            className="bg-red-500 hover:bg-red-600"
            onClick={() => setShowCreateUserModal(true)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Nouveau client
          </Button>
        </div>

        <UserStatsCards />

        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          tierFilter={tierFilter}
          onTierFilterChange={setTierFilter}
          onClearFilters={clearFilters}
        />

        <UsersTable
          users={filteredUsers}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          getPageDescription={getPageDescription}
          getPackageById={getPackageById}
          getPackageColor={getPackageColor}
          getStatusColor={getStatusColor}
          getStatusLabel={getStatusLabel}
          onEditUser={openEditDialog}
        />

        <EditUserDialog
          user={editingUser}
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          onSave={saveUserPackages}
        />

        <CreateUserModal 
          isOpen={showCreateUserModal}
          onClose={() => setShowCreateUserModal(false)}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
