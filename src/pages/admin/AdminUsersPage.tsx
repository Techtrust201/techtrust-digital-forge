
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import UserStatsCards from '@/components/admin/users/UserStatsCards';
import CreateUserForm from '@/components/admin/users/CreateUserForm';
import UsersTable from '@/components/admin/users/UsersTable';
import EditUserDialog from '@/components/admin/users/EditUserDialog';
import { useUserData } from '@/hooks/useUserData';
import { usePackageUtils } from '@/hooks/usePackageUtils';

const AdminUsersPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<any>(null);

  const {
    getFilteredUsers,
    getPageTitle,
    getPageDescription,
    getStatusColor,
    getStatusLabel
  } = useUserData();

  const { getPackageById, getPackageColor } = usePackageUtils();

  const users = getFilteredUsers();

  const openEditDialog = (user: any) => {
    setEditingUser(user);
  };

  const saveUserPackages = (packages: string[]) => {
    console.log('Sauvegarde des formules pour', editingUser?.name, ':', packages);
    setEditingUser(null);
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
            <p className="text-gray-500 mt-2">{getPageDescription()}</p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600">
            <UserPlus className="w-4 h-4 mr-2" />
            Nouveau client
          </Button>
        </div>

        <UserStatsCards />

        <UsersTable
          users={users}
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
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
