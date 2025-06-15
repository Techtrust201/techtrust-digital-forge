
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

interface AdminUsersHeaderProps {
  title: string;
  description: string;
  onCreateUser: () => void;
}

const AdminUsersHeader: React.FC<AdminUsersHeaderProps> = ({
  title,
  description,
  onCreateUser
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-2">{description}</p>
      </div>
      <Button 
        className="bg-red-500 hover:bg-red-600"
        onClick={onCreateUser}
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Nouveau client
      </Button>
    </div>
  );
};

export default AdminUsersHeader;
