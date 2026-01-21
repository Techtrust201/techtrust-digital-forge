
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Package } from 'lucide-react';
import { usePackageUtils } from '@/hooks/usePackageUtils';
import { FormData, PackageWithCategory, CategoryGroup } from './types';

interface PackageSelectionStepProps {
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
  onAddPackage: (packageId: string) => void;
  onRemovePackage: (packageId: string) => void;
}

const PackageSelectionStep = ({ 
  formData, 
  onInputChange, 
  onAddPackage, 
  onRemovePackage 
}: PackageSelectionStepProps) => {
  const { getAllPackages, getPackageById, getPackageColor, getTotalPrice } = usePackageUtils();
  const allPackages = getAllPackages();

  // Grouper les packages par catégorie avec types corrects
  const packagesByCategory: Record<string, CategoryGroup> = allPackages.reduce((acc, pkg: PackageWithCategory) => {
    if (!acc[pkg.categoryKey]) {
      acc[pkg.categoryKey] = {
        title: pkg.category,
        packages: []
      };
    }
    acc[pkg.categoryKey].packages.push(pkg);
    return acc;
  }, {} as Record<string, CategoryGroup>);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Package className="w-5 h-5 text-orange-500" />
        Sélection des formules
      </h3>

      <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
        💡 Vous pouvez sélectionner une formule par catégorie. Choisir une nouvelle formule remplacera la précédente dans la même catégorie.
      </div>

      {/* Packages par catégorie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(packagesByCategory).map(([categoryKey, categoryData]) => {
          const selectedInCategory = categoryData.packages.find(pkg => formData.selectedPackages.includes(pkg.id));
          
          return (
            <div key={categoryKey} className={`border-2 rounded-lg p-4 transition-all ${
              selectedInCategory ? 'border-red-500 bg-red-50' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getPackageColor(categoryKey).replace('text-', 'bg-').replace('100', '500')}`}></div>
                  <h4 className="font-medium">{categoryData.title}</h4>
                </div>
                {selectedInCategory && (
                  <Badge className="bg-red-500 text-white text-xs">
                    {selectedInCategory.name}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                {categoryData.packages.map((pkg) => {
                  const isSelected = formData.selectedPackages.includes(pkg.id);
                  
                  return (
                    <div
                      key={pkg.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                        isSelected
                          ? 'border-red-500 bg-red-100 shadow-md'
                          : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                      }`}
                      onClick={() => isSelected ? onRemovePackage(pkg.id) : onAddPackage(pkg.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{pkg.name}</div>
                          <div className="text-red-600 font-bold">
                            {pkg.price}€{pkg.duration || ''}
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'bg-red-500 border-red-500' : 'border-gray-300'
                        }`}>
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Résumé des packages sélectionnés */}
      {formData.selectedPackages.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-medium">
                Formules sélectionnées ({formData.selectedPackages.length})
              </span>
              <div className="flex flex-wrap gap-2">
                {formData.selectedPackages.map(packageId => {
                  const pkg = getPackageById(packageId);
                  if (!pkg) return null;
                  return (
                    <Badge key={packageId} className={getPackageColor(pkg.categoryKey)}>
                      {pkg.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-red-600 text-xl">
                {getTotalPrice(formData.selectedPackages)}€
              </span>
            </div>
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="notes">Notes internes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => onInputChange('notes', e.target.value)}
          placeholder="Notes ou commentaires sur ce client..."
          rows={3}
        />
      </div>
    </div>
  );
};

export default PackageSelectionStep;
