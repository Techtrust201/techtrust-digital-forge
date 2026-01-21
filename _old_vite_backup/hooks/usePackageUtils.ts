
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Package {
  id: string;
  name: string;
  category_key: string;
  category_name: string;
  price: number;
  duration?: string;
  tier: string;
  features: any[];
  is_active: boolean;
  created_at: string;
}

export const usePackageUtils = () => {
  // Récupérer les packages depuis la base de données
  const { data: packagesFromDb = [], isLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('is_active', true)
        .order('category_key, price');

      if (error) {
        console.error('Error fetching packages:', error);
        throw error;
      }

      return data as Package[];
    },
  });

  const getAllPackages = useMemo(() => {
    return () => {
      return packagesFromDb.map(pkg => ({
        ...pkg,
        category: pkg.category_name,
        categoryKey: pkg.category_key
      }));
    };
  }, [packagesFromDb]);

  const getPackageById = useMemo(() => {
    return (packageId: string) => {
      const pkg = packagesFromDb.find(p => p.id === packageId);
      if (!pkg) return undefined;
      
      return {
        ...pkg,
        category: pkg.category_name,
        categoryKey: pkg.category_key
      };
    };
  }, [packagesFromDb]);

  const getPackageColor = (categoryKey: string) => {
    switch (categoryKey) {
      case 'website': return 'bg-blue-100 text-blue-800';
      case 'growth': return 'bg-green-100 text-green-800';
      case 'community': return 'bg-orange-100 text-orange-800';
      case 'custom': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalPrice = (packageIds: string[]) => {
    return packageIds.reduce((total, packageId) => {
      const pkg = getPackageById(packageId);
      return total + (pkg?.price || 0);
    }, 0);
  };

  return {
    getAllPackages,
    getPackageById,
    getPackageColor,
    getTotalPrice,
    isLoading
  };
};
