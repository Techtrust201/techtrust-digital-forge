
import { db } from '@/lib/database';
import type { UserWithAuth } from '@/types/user';

export interface UserRole {
  id: string;
  userId: string;
  role: 'super_admin' | 'admin' | 'manager' | 'employee' | 'client';
  createdAt: string;
}

export const getUserRole = async (userId: string): Promise<string | null> => {
  try {
    const result = await db.queryOne<UserRole>(
      'SELECT role FROM public.user_roles WHERE "userId" = $1',
      [userId]
    );
    return result?.role || null;
  } catch (error) {
    console.error('Get user role error:', error);
    return null;
  }
};

export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    const result = await db.queryOne<{ exists: boolean }>(
      'SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE "userId" = $1 AND role IN ($2, $3)) as exists',
      [userId, 'super_admin', 'admin']
    );
    return result?.exists || false;
  } catch (error) {
    console.error('Is admin check error:', error);
    return false;
  }
};

export const hasRole = async (userId: string, role: string): Promise<boolean> => {
  try {
    const result = await db.queryOne<{ exists: boolean }>(
      'SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE "userId" = $1 AND role = $2) as exists',
      [userId, role]
    );
    return result?.exists || false;
  } catch (error) {
    console.error('Has role check error:', error);
    return false;
  }
};
