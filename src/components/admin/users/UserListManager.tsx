
import React from 'react';
import UsersTable from './UsersTable';
import EditUserDialog from './EditUserDialog';
import { UserWithAuth } from '@/types/user';
import { getStatusColor, getStatusLabel } from '@/utils/userStatus';

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

interface UserListManagerProps {
  users: User[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  getPageDescription: () => string;
  getPackageById: (packageId: string) => any;
  getPackageColor: (categoryKey: string) => string;
  editingUser: any;
  onEditUser: (user: any) => void;
  onCloseEdit: () => void;
  onSaveUserPackages: (packages: string[]) => Promise<void>;
}

const UserListManager: React.FC<UserListManagerProps> = ({
  users,
  searchTerm,
  onSearchChange,
  getPageDescription,
  getPackageById,
  getPackageColor,
  editingUser,
  onEditUser,
  onCloseEdit,
  onSaveUserPackages
}) => {
  return (
    <>
      <UsersTable
        users={users}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        getPageDescription={getPageDescription}
        getPackageById={getPackageById}
        getPackageColor={getPackageColor}
        getStatusColor={getStatusColor}
        getStatusLabel={getStatusLabel}
        onEditUser={onEditUser}
      />

      <EditUserDialog
        user={editingUser}
        isOpen={!!editingUser}
        onClose={onCloseEdit}
        onSave={onSaveUserPackages}
      />
    </>
  );
};

export default UserListManager;
