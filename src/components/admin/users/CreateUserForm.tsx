
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PackageSelector from './PackageSelector';
import { usePackageUtils } from '@/hooks/usePackageUtils';
import { UserPlus } from 'lucide-react';

const CreateUserForm = () => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  const { getAllPackages, getPackageById, getPackageColor, getTotalPrice } = usePackageUtils();

  const addPackage = (packageId: string) => {
    if (!selectedPackages.includes(packageId)) {
      setSelectedPackages([...selectedPackages, packageId]);
    }
  };

  const removePackage = (packageId: string) => {
    setSelectedPackages(selectedPackages.filter(id => id !== packageId));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.firstName.trim() && 
           formData.lastName.trim() && 
           formData.email.trim() && 
           selectedPackages.length > 0;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      console.log('Création du compte:', { ...formData, packages: selectedPackages });
      // Handle form submission
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nouveau compte utilisateur</h1>
        <p className="text-gray-600">Créez un compte client avec ses formules</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Information */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Informations du client</CardTitle>
            <CardDescription>Renseignez les informations de base</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                placeholder="Jean"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                placeholder="Dupont"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="jean.dupont@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t space-y-2">
              <Button 
                className="w-full bg-red-500 hover:bg-red-600" 
                disabled={!isFormValid()}
                onClick={handleSubmit}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Créer le compte
              </Button>
              <Button variant="outline" className="w-full">
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Package Selection */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <PackageSelector
                selectedPackages={selectedPackages}
                allPackages={getAllPackages()}
                onAddPackage={addPackage}
                onRemovePackage={removePackage}
                getPackageById={getPackageById}
                getPackageColor={getPackageColor}
                getTotalPrice={getTotalPrice}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;
