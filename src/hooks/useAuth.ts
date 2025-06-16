
import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing auth state
    const checkAuth = () => {
      const savedUser = localStorage.getItem('techtrust_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Error parsing saved user:', error);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('techtrust_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('techtrust_user');
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  };
};
