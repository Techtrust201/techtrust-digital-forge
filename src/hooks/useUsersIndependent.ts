
import { useState, useEffect } from 'react';
import { fetchAllUsers, createNewUser, updateUserPackages } from '@/services/userServiceIndependent';
import { calculateUserStats } from '@/utils/userStats';
import type { UserWithAuth, CreateUserData } from '@/types/user';

export const useUsersIndependent = () => {
  const [users, setUsers] = useState<UserWithAuth[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    const userData = await fetchAllUsers();
    setUsers(userData);
    setIsLoading(false);
  };

  const createUser = async (userData: CreateUserData) => {
    const result = await createNewUser(userData);
    if (result.success) {
      await fetchUsers(); // Rafraîchir la liste
    }
    return result;
  };

  const updatePackages = async (userId: string, packages: string[]) => {
    const result = await updateUserPackages(userId, packages);
    if (result.success) {
      await fetchUsers(); // Rafraîchir la liste
    }
    return result;
  };

  const getUserStats = () => calculateUserStats(users);

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    isLoading,
    fetchUsers,
    createUser,
    updateUserPackages: updatePackages,
    getUserStats
  };
};
