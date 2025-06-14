
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, Check } from 'lucide-react';

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
  allPackages: Package[];
  onAddPackage: (packageId: string) => void;
  onRemovePackage: (packageId: string) => void;
  getPackageById: (packageId: string) => Package | undefined;
  getPackageColor: (categoryKey: string) => string;
  getTotalPrice: (packageIds: string[]) => number;
}

const PackageSelector: React.FC<PackageSelectorProps> = ({
  selectedPackages,
  allPackages,
  onAddPackage,
  onRemovePackage,
  getPackageById,
  getPackageColor,
  getTotalPrice
}) => {
  // Group packages by category
  const packagesByCategory = allPackages.reduce((acc, pkg) => {
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Sélectionner les formules</h3>
        <p className="text-sm text-gray-600 mb-6">
          Choisissez une ou plusieurs formules pour ce client. Vous pouvez sélectionner des formules de différentes catégories.
        </p>
      </div>

      {/* Package Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(packagesByCategory).map(([categoryKey, { title, packages }]) => (
          <Card key={categoryKey} className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getPackageColor(categoryKey).replace('text-', 'bg-').replace('100', '500')}`}></div>
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                    isSelected(pkg.id)
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => isSelected(pkg.id) ? onRemovePackage(pkg.id) : onAddPackage(pkg.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{pkg.name}</div>
                      <div className="text-red-600 font-bold">
                        {pkg.price}€{pkg.duration || ''}
                      </div>
                    </div>
                    <div className="ml-2">
                      {isSelected(pkg.id) ? (
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-red-500">
                          <Plus className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Packages Summary */}
      {selectedPackages.length > 0 && (
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-gray-900">
              Formules sélectionnées ({selectedPackages.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Selected packages list */}
            <div className="flex flex-wrap gap-2">
              {selectedPackages.map((packageId) => {
                const pkg = getPackageById(packageId);
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
                      onClick={() => onRemovePackage(packageId)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                );
              })}
            </div>
            
            {/* Price breakdown */}
            <div className="border-t pt-3 mt-3">
              <div className="space-y-1">
                {selectedPackages.map((packageId) => {
                  const pkg = getPackageById(packageId);
                  if (!pkg) return null;
                  return (
                    <div key={packageId} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{pkg.category} - {pkg.name}</span>
                      <span className="font-medium text-red-600">
                        {pkg.price}€{pkg.duration || ''}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total :</span>
                <span className="font-bold text-red-600 text-lg">
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
          <p className="text-xs">Cliquez sur les formules ci-dessus pour les ajouter</p>
        </div>
      )}
    </div>
  );
};

export default PackageSelector;
