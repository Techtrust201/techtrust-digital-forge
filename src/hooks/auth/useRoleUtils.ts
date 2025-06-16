
import { User } from './types';

export const useRoleUtils = (user: User | null) => {
  const getUserRole = () => {
    return user?.role || 'client';
  };

  const isAdmin = () => {
    const role = getUserRole();
    return role === 'admin' || role === 'super_admin';
  };

  const hasRole = (role: string) => {
    return getUserRole() === role;
  };

  return {
    getUserRole,
    isAdmin,
    hasRole
  };
};
