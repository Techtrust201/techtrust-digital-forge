
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { UserData } from '@/types/admin';

interface AdminUserInfoProps {
  userData: UserData | null;
  isSidebarCollapsed: boolean;
}

const AdminUserInfo = ({ userData, isSidebarCollapsed }: AdminUserInfoProps) => {
  if (!userData) return null;

  if (isSidebarCollapsed) {
    return (
      <div className="p-2 border-b bg-red-50 flex justify-center">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">
            {userData.name.charAt(0)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 border-b bg-red-50">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">
            {userData.name.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 truncate">
            {userData.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">
            {userData.email}
          </p>
        </div>
      </div>
      <Badge className="bg-red-100 text-red-800 border-red-200">
        <Shield className="w-3 h-3 mr-1" />
        Super Admin
      </Badge>
    </div>
  );
};

export default AdminUserInfo;
