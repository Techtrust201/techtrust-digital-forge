
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

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
  return (
    <div>
      <label className="text-sm font-medium">Formules sélectionnées</label>
      <div className="mt-2 space-y-4">
        {selectedPackages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedPackages.map((packageId) => {
              const pkg = getPackageById(packageId);
              if (!pkg) return null;
              return (
                <Badge 
                  key={packageId} 
                  className={`${getPackageColor(pkg.categoryKey)} flex items-center gap-1`}
                >
                  {pkg.category} - {pkg.name} ({pkg.price}€{pkg.duration || ''})
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => onRemovePackage(packageId)}
                  />
                </Badge>
              );
            })}
          </div>
        )}
        
        <Select onValueChange={onAddPackage}>
          <SelectTrigger>
            <SelectValue placeholder="Ajouter une formule..." />
          </SelectTrigger>
          <SelectContent>
            {allPackages.map((pkg) => (
              <SelectItem 
                key={pkg.id} 
                value={pkg.id}
                disabled={selectedPackages.includes(pkg.id)}
              >
                {pkg.category} - {pkg.name} ({pkg.price}€{pkg.duration || ''})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedPackages.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <h4 className="font-medium text-gray-900 mb-3">Récapitulatif des formules</h4>
          <div className="space-y-2">
            {selectedPackages.map((packageId) => {
              const pkg = getPackageById(packageId);
              if (!pkg) return null;
              return (
                <div key={packageId} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-600">{pkg.category}</span>
                    <span className="font-medium ml-2">{pkg.name}</span>
                  </div>
                  <span className="font-bold text-red-600">
                    {pkg.price}€{pkg.duration || ''}
                  </span>
                </div>
              );
            })}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center font-bold">
                <span>Total :</span>
                <span className="text-red-600 text-lg">
                  {getTotalPrice(selectedPackages)}€
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageSelector;
