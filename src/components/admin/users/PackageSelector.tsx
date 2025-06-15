
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

  const handlePackageClick = (pkg: Package) => {
    if (isSelected(pkg.id)) {
      // Si le package est déjà sélectionné, on le désélectionne
      onRemovePackage(pkg.id);
    } else {
      // Désélectionner tous les autres packages avant de sélectionner le nouveau
      selectedPackages.forEach(packageId => {
        onRemovePackage(packageId);
      });
      // Ajouter le nouveau package
      onAddPackage(pkg.id);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Sélectionner une formule</h3>
        <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg mb-4">
          <AlertCircle className="w-4 h-4" />
          <span>Une seule formule peut être sélectionnée à la fois. Cliquez pour changer de sélection.</span>
        </div>
      </div>

      {/* Package Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(packagesByCategory).map(([categoryKey, { title, packages }]) => {
          const hasSelectedInCategory = packages.some(pkg => isSelected(pkg.id));
          
          return (
            <Card key={categoryKey} className={`border-2 transition-all ${
              hasSelectedInCategory ? 'border-red-500 bg-red-50' : 'border-gray-200'
            }`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getPackageColor(categoryKey).replace('text-', 'bg-').replace('100', '500')}`}></div>
                    {title}
                  </div>
                  {hasSelectedInCategory && (
                    <Badge className="bg-red-500 text-white text-xs">
                      Sélectionné
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
                      onClick={() => handlePackageClick(pkg)}
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

      {/* Selected Package Summary */}
      {selectedPackages.length > 0 && (
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-900">
                  Formule sélectionnée
                </span>
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
          <p className="text-xs">Choisissez une formule</p>
        </div>
      )}
    </div>
  );
};

export default PackageSelector;
