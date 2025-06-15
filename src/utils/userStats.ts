
import type { UserWithAuth, UserStats } from '@/types/user';

export const calculateUserStats = (users: UserWithAuth[]): UserStats => {
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const inactiveUsers = users.filter(user => user.status === 'inactive').length;
  const totalRevenue = users.reduce((sum, user) => sum + (user.revenue || 0), 0);

  return {
    totalUsers,
    activeUsers,
    inactiveUsers,
    totalRevenue
  };
};
