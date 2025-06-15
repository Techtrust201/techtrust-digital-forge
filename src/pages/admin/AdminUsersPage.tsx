
import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminUsersHeader from '@/components/admin/users/AdminUsersHeader';
import UserStatsCards from '@/components/admin/users/UserStatsCards';
import CreateUserForm from '@/components/admin/users/CreateUserForm';
import UserFilters from '@/components/admin/users/UserFilters';
import UserListManager from '@/components/admin/users/UserListManager';
import CreateUserModal from '@/components/admin/CreateUserModal';
import { useAdminUsersPage } from '@/hooks/useAdminUsersPage';
import { usePackageUtils } from '@/hooks/usePackageUtils';

const AdminUsersPage = () => {
  const location = useLocation();
  const { getPackageById, getPackageColor } = usePackageUtils();
  
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    tierFilter,
    setTierFilter,
    editingUser,
    showCreateUserModal,
    setShowCreateUserModal,
    users,
    isLoading,
    stats,
    openEditDialog,
    saveUserPackages,
    clearFilters,
    closeEditDialog
  } = useAdminUsersPage();

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
        <AdminUsersHeader
          title={getPageTitle()}
          description={getPageDescription()}
          onCreateUser={() => setShowCreateUserModal(true)}
        />

        <UserStatsCards />

        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          tierFilter={tierFilter}
          onTierFilterChange={setTierFilter}
          onClearFilters={clearFilters}
        />

        <UserListManager
          users={users}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          getPageDescription={getPageDescription}
          getPackageById={getPackageById}
          getPackageColor={getPackageColor}
          editingUser={editingUser}
          onEditUser={openEditDialog}
          onCloseEdit={closeEditDialog}
          onSaveUserPackages={saveUserPackages}
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
