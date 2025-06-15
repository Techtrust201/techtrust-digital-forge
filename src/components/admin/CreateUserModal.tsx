
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { X, UserPlus, Mail, Phone, Building, MapPin, Package } from 'lucide-react';
import { usePackageUtils } from '@/hooks/usePackageUtils';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateUserModal = ({ isOpen, onClose }: CreateUserModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Informations entreprise
    company: '',
    position: '',
    industry: '',
    // Adresse
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    // Services sélectionnés
    selectedPackages: [] as string[],
    // Notes
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const { getAllPackages, getPackageById, getPackageColor, getTotalPrice } = usePackageUtils();
  const allPackages = getAllPackages();

  const industryOptions = [
    'E-commerce', 'Services', 'Technologie', 'Santé', 'Éducation', 
    'Finance', 'Immobilier', 'Restaurant', 'Mode', 'Autre'
  ];

  // Grouper les packages par catégorie
  const packagesByCategory = allPackages.reduce((acc, pkg) => {
    if (!acc[pkg.categoryKey]) {
      acc[pkg.categoryKey] = {
        title: pkg.category,
        packages: []
      };
    }
    acc[pkg.categoryKey].packages.push(pkg);
    return acc;
  }, {} as Record<string, { title: string; packages: any[] }>);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPackage = (packageId: string) => {
    const packageToAdd = getPackageById(packageId);
    if (!packageToAdd) return;

    // Supprimer tout package existant de la même catégorie
    const updatedPackages = formData.selectedPackages.filter(id => {
      const existingPackage = getPackageById(id);
      return existingPackage?.categoryKey !== packageToAdd.categoryKey;
    });

    // Ajouter le nouveau package
    setFormData(prev => ({
      ...prev,
      selectedPackages: [...updatedPackages, packageId]
    }));
  };

  const removePackage = (packageId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedPackages: prev.selectedPackages.filter(id => id !== packageId)
    }));
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName.trim() && formData.lastName.trim() && formData.email.trim();
      case 2:
        return formData.company.trim();
      case 3:
        return formData.city.trim() && formData.country.trim();
      case 4:
        return formData.selectedPackages.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 4 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid(1) || !isStepValid(2) || !isStepValid(4)) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsLoading(true);

    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUsers = JSON.parse(localStorage.getItem('admin_users') || '[]');
      const userExists = existingUsers.some((user: any) => user.email === formData.email);
      
      if (userExists) {
        toast.error('Un utilisateur avec cet email existe déjà');
        return;
      }

      // Créer le nouvel utilisateur avec les vrais packages
      const selectedPackageDetails = formData.selectedPackages.map(id => getPackageById(id)).filter(Boolean);
      
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        position: formData.position,
        industry: formData.industry,
        address: {
          street: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        },
        packages: selectedPackageDetails,
        selectedPackages: formData.selectedPackages,
        notes: formData.notes,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        revenue: getTotalPrice(formData.selectedPackages)
      };

      // Sauvegarder localement
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('admin_users', JSON.stringify(updatedUsers));

      toast.success(`Client ${formData.firstName} ${formData.lastName} créé avec succès`);
      onClose();
      
      // Reset form
      setCurrentStep(1);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '',
        company: '', position: '', industry: '',
        address: '', city: '', postalCode: '', country: 'France',
        selectedPackages: [], notes: ''
      });

      // Actualiser la page pour voir le nouvel utilisateur
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      toast.error('Erreur lors de la création du client');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-xl">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-red-500" />
              Créer un nouveau client
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step < currentStep ? 'bg-red-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {/* Étape 1: Informations personnelles */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                Informations personnelles
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Jean"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Dupont"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="jean.dupont@entreprise.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+33 1 23 45 67 89"
                />
              </div>
            </div>
          )}

          {/* Étape 2: Informations entreprise */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Building className="w-5 h-5 text-green-500" />
                Informations entreprise
              </h3>

              <div>
                <Label htmlFor="company">Entreprise *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Mon Entreprise SARL"
                  required
                />
              </div>

              <div>
                <Label htmlFor="position">Poste</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  placeholder="Directeur Marketing"
                />
              </div>

              <div>
                <Label>Secteur d'activité</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    {industryOptions.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Étape 3: Adresse */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-500" />
                Adresse
              </h3>

              <div>
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Rue de la Paix"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Ville *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Paris"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Code postal</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    placeholder="75001"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="country">Pays</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Étape 4: Sélection des packages */}
          {currentStep === 4 && (
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
                {Object.entries(packagesByCategory).map(([categoryKey, { title, packages }]) => {
                  const selectedInCategory = packages.find(pkg => formData.selectedPackages.includes(pkg.id));
                  
                  return (
                    <div key={categoryKey} className={`border-2 rounded-lg p-4 transition-all ${
                      selectedInCategory ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getPackageColor(categoryKey).replace('text-', 'bg-').replace('100', '500')}`}></div>
                          <h4 className="font-medium">{title}</h4>
                        </div>
                        {selectedInCategory && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {selectedInCategory.name}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        {packages.map((pkg) => {
                          const isSelected = formData.selectedPackages.includes(pkg.id);
                          
                          return (
                            <div
                              key={pkg.id}
                              className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                                isSelected
                                  ? 'border-red-500 bg-red-100 shadow-md'
                                  : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                              }`}
                              onClick={() => isSelected ? removePackage(pkg.id) : addPackage(pkg.id)}
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
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Notes ou commentaires sur ce client..."
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={currentStep === 1 ? onClose : handlePrevious}
          >
            {currentStep === 1 ? 'Annuler' : 'Précédent'}
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              className="bg-red-500 hover:bg-red-600"
            >
              Suivant
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !isStepValid(1) || !isStepValid(2) || !isStepValid(4)}
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? 'Création...' : 'Créer le client'}
            </Button>
          )}
        </div>

        {/* Récapitulatif en dernière étape */}
        {currentStep === 4 && formData.selectedPackages.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Récapitulatif</h4>
            <div className="text-sm space-y-1">
              <p><strong>Client :</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email :</strong> {formData.email}</p>
              <p><strong>Entreprise :</strong> {formData.company}</p>
              <p><strong>Total :</strong> <span className="font-bold text-red-600">{getTotalPrice(formData.selectedPackages)}€</span></p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
