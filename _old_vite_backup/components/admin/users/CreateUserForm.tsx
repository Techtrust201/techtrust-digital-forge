
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PackageSelector from './PackageSelector';
import { usePackageUtils } from '@/hooks/usePackageUtils';
import { useUserInvitations } from '@/hooks/useUserInvitations';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';

const CreateUserForm = () => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  const { getAllPackages } = usePackageUtils();
  const { sendInvitation, isLoading } = useUserInvitations();

  const handlePackageToggle = (packageId: string) => {
    const packageToAdd = getAllPackages().find(pkg => pkg.id === packageId);
    if (!packageToAdd) return;

    // Supprimer tout package existant de la même catégorie
    const updatedPackages = selectedPackages.filter(id => {
      const existingPackage = getAllPackages().find(pkg => pkg.id === id);
      return existingPackage?.categoryKey !== packageToAdd.categoryKey;
    });

    // Ajouter ou retirer le package
    if (selectedPackages.includes(packageId)) {
      setSelectedPackages(selectedPackages.filter(id => id !== packageId));
    } else {
      setSelectedPackages([...updatedPackages, packageId]);
    }
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

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    console.log('Création du compte:', { ...formData, packages: selectedPackages });

    const invitationData = {
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
      company: '', // Optionnel pour cette interface simplifiée
      phone: '',
      position: '',
      industry: '',
      address: {
        street: '',
        city: '',
        postalCode: '',
        country: 'France'
      },
      selectedPackages: selectedPackages,
      notes: `Compte créé depuis l'interface admin pour ${formData.firstName} ${formData.lastName}`,
    };

    const result = await sendInvitation(invitationData);
    
    if (result.success) {
      toast.success(
        `Invitation envoyée à ${formData.firstName} ${formData.lastName}`, 
        {
          description: "L'utilisateur recevra un email pour activer son compte"
        }
      );

      // Reset form après succès
      setFormData({
        firstName: '',
        lastName: '',
        email: ''
      });
      setSelectedPackages([]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
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
                disabled={!isFormValid() || isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <UserPlus className="w-4 h-4 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Créer le compte
                  </>
                )}
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
                onPackageToggle={handlePackageToggle}
                availablePackages={getAllPackages()}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;
