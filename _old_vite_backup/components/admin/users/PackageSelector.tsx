
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Check, AlertCircle } from 'lucide-react';

interface Package {
  id: string;
  name: string;
  price: number;
  duration?: string;
  category: string;
  categoryKey: string;
}

interface PackageSelectorProps {
  selectedPackages: string[];
  onPackageToggle: (packageId: string) => void;
  availablePackages: Package[];
}

const PackageSelector: React.FC<PackageSelectorProps> = ({
  selectedPackages,
  onPackageToggle,
  availablePackages
}) => {
  // Group packages by category
  const packagesByCategory = availablePackages.reduce((acc, pkg) => {
    if (!acc[pkg.categoryKey]) {
      acc[pkg.categoryKey] = {
        title: pkg.category,
        packages: []
      };
    }
    acc[pkg.categoryKey].packages.push(pkg);
    return acc;
  }, {} as Record<string, { title: string; packages: Package[] }>);

  const isSelected = (packageId: string) => selectedPackages.includes(packageId);

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
      const pkg = availablePackages.find(p => p.id === packageId);
      return total + (pkg?.price || 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Sélectionner les formules</h3>
        <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg mb-4">
          <AlertCircle className="w-4 h-4" />
          <span>Vous pouvez sélectionner une formule par catégorie. Choisir une nouvelle formule dans une catégorie remplacera la précédente.</span>
        </div>
      </div>

      {/* Package Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(packagesByCategory).map(([categoryKey, { title, packages }]) => {
          const selectedInCategory = packages.find(pkg => isSelected(pkg.id));
          
          return (
            <Card key={categoryKey} className={`border-2 transition-all ${
              selectedInCategory ? 'border-red-500 bg-red-50' : 'border-gray-200'
            }`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getPackageColor(categoryKey).replace('text-', 'bg-').replace('100', '500')}`}></div>
                    {title}
                  </div>
                  {selectedInCategory && (
                    <Badge className="bg-red-500 text-white text-xs">
                      {selectedInCategory.name}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {packages.map((pkg) => {
                  const isThisSelected = isSelected(pkg.id);
                  
                  return (
                    <div
                      key={pkg.id}
                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer hover:scale-[1.02] ${
                        isThisSelected
                          ? 'border-red-500 bg-red-100 shadow-md'
                          : 'border-gray-200 hover:border-red-300 hover:bg-red-50 hover:shadow-sm'
                      }`}
                      onClick={() => onPackageToggle(pkg.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{pkg.name}</div>
                          <div className="text-red-600 font-bold">
                            {pkg.price}€{pkg.duration || ''}
                          </div>
                        </div>
                        <div className="ml-2">
                          {isThisSelected ? (
                            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 border-2 border-gray-300 rounded-full hover:border-red-500 transition-colors"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected Packages Summary */}
      {selectedPackages.length > 0 && (
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-900">
                  Formules sélectionnées ({selectedPackages.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedPackages.map(packageId => {
                    const pkg = availablePackages.find(p => p.id === packageId);
                    if (!pkg) return null;
                    return (
                      <Badge 
                        key={packageId} 
                        className={`${getPackageColor(pkg.categoryKey)} flex items-center gap-1 py-1 px-2 text-xs`}
                      >
                        {pkg.name}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => onPackageToggle(packageId)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    );
                  })}
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-red-600 text-xl">
                  {getTotalPrice(selectedPackages)}€
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedPackages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📦</div>
          <p className="text-sm">Aucune formule sélectionnée</p>
          <p className="text-xs">Choisissez une ou plusieurs formules</p>
        </div>
      )}
    </div>
  );
};

export default PackageSelector;
