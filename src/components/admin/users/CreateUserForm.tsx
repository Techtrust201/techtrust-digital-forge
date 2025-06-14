
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PackageSelector from './PackageSelector';
import { usePackageUtils } from '@/hooks/usePackageUtils';

const CreateUserForm = () => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const { getAllPackages, getPackageById, getPackageColor, getTotalPrice } = usePackageUtils();

  const addPackage = (packageId: string) => {
    if (!selectedPackages.includes(packageId)) {
      setSelectedPackages([...selectedPackages, packageId]);
    }
  };

  const removePackage = (packageId: string) => {
    setSelectedPackages(selectedPackages.filter(id => id !== packageId));
  };

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>Nouveau compte utilisateur</CardTitle>
        <CardDescription>Créez un nouveau compte pour un client avec une ou plusieurs formules</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Prénom</label>
            <Input placeholder="Jean" />
          </div>
          <div>
            <label className="text-sm font-medium">Nom</label>
            <Input placeholder="Dupont" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input placeholder="jean.dupont@email.com" type="email" />
        </div>
        
        <PackageSelector
          selectedPackages={selectedPackages}
          allPackages={getAllPackages()}
          onAddPackage={addPackage}
          onRemovePackage={removePackage}
          getPackageById={getPackageById}
          getPackageColor={getPackageColor}
          getTotalPrice={getTotalPrice}
        />

        <div className="flex gap-2 pt-4">
          <Button className="bg-red-500 hover:bg-red-600" disabled={selectedPackages.length === 0}>
            Créer le compte
          </Button>
          <Button variant="outline">Annuler</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateUserForm;
