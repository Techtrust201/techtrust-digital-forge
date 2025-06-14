
import { useMemo } from 'react';

export const usePackageUtils = () => {
  const packagesData = {
    website: {
      title: "Création Site Web",
      packages: [
        { id: "website-starter", name: "Starter", price: 899 },
        { id: "website-business", name: "Business", price: 1599 },
        { id: "website-premium", name: "Premium E-commerce", price: 2999 }
      ]
    },
    growth: {
      title: "Growth Hacking IA",
      packages: [
        { id: "growth-easy", name: "Easy", price: 299, duration: "/mois" },
        { id: "growth-pro", name: "Pro", price: 599, duration: "/mois" },
        { id: "growth-enterprise", name: "Enterprise", price: 1299, duration: "/mois" }
      ]
    },
    community: {
      title: "Community Management",
      packages: [
        { id: "community-starter", name: "Starter", price: 799, duration: "/mois" },
        { id: "community-growth", name: "Growth", price: 1499, duration: "/mois" },
        { id: "community-premium", name: "Premium", price: 2999, duration: "/mois" }
      ]
    },
    custom: {
      title: "Solutions Sur Mesure",
      packages: [
        { id: "custom-audit", name: "Audit & Conseil", price: 1500 },
        { id: "custom-app", name: "Application Sur Mesure", price: 15000 },
        { id: "custom-enterprise", name: "Solution Enterprise", price: 50000 }
      ]
    }
  };

  const getAllPackages = useMemo(() => {
    return () => {
      const allPackages: any[] = [];
      Object.entries(packagesData).forEach(([categoryKey, category]) => {
        category.packages.forEach(pkg => {
          allPackages.push({
            ...pkg,
            category: category.title,
            categoryKey
          });
        });
      });
      return allPackages;
    };
  }, []);

  const getPackageById = useMemo(() => {
    return (packageId: string) => {
      const allPackages = getAllPackages();
      return allPackages.find(pkg => pkg.id === packageId);
    };
  }, [getAllPackages]);

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
    getTotalPrice
  };
};
