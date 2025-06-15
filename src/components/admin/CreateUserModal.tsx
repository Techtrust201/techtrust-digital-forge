
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { X, UserPlus, Mail, Phone, Building, MapPin } from 'lucide-react';

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
    // Plan et services
    tier: 'bronze',
    services: [] as string[],
    // Notes
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const tierOptions = [
    { value: 'bronze', label: 'Bronze', price: '39€/mois', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { value: 'silver', label: 'Silver', price: '299€/mois', color: 'bg-gray-50 text-gray-700 border-gray-200' },
    { value: 'gold', label: 'Gold', price: '599€/mois', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    { value: 'diamond', label: 'Diamond', price: '1299€/mois', color: 'bg-purple-50 text-purple-700 border-purple-200' }
  ];

  const industryOptions = [
    'E-commerce', 'Services', 'Technologie', 'Santé', 'Éducation', 
    'Finance', 'Immobilier', 'Restaurant', 'Mode', 'Autre'
  ];

  const serviceOptions = [
    { id: 'website', label: 'Site Web', category: 'web' },
    { id: 'ecommerce', label: 'E-commerce', category: 'web' },
    { id: 'seo', label: 'SEO', category: 'marketing' },
    { id: 'social', label: 'Réseaux Sociaux', category: 'marketing' },
    { id: 'ads', label: 'Publicité', category: 'marketing' },
    { id: 'analytics', label: 'Analytics', category: 'data' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
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
    if (!isStepValid(1) || !isStepValid(2)) {
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

      // Créer le nouvel utilisateur
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
        tier: formData.tier,
        services: formData.services,
        notes: formData.notes,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        revenue: tierOptions.find(t => t.value === formData.tier)?.price.split('€')[0] || '0'
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
        tier: 'bronze', services: [], notes: ''
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

  const selectedTier = tierOptions.find(t => t.value === formData.tier);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
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

          {/* Étape 4: Plan et services */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Plan et services</h3>

              <div>
                <Label>Plan tarifaire</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {tierOptions.map((tier) => (
                    <div
                      key={tier.value}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.tier === tier.value
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleInputChange('tier', tier.value)}
                    >
                      <div className="font-medium">{tier.label}</div>
                      <div className="text-sm text-gray-600">{tier.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Services inclus</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {serviceOptions.map((service) => (
                    <div
                      key={service.id}
                      className={`p-2 border rounded-lg cursor-pointer text-sm transition-all ${
                        formData.services.includes(service.id)
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      {service.label}
                    </div>
                  ))}
                </div>
              </div>

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
              disabled={isLoading || !isStepValid(1) || !isStepValid(2)}
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? 'Création...' : 'Créer le client'}
            </Button>
          )}
        </div>

        {/* Summary in last step */}
        {currentStep === 4 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Récapitulatif</h4>
            <div className="text-sm space-y-1">
              <p><strong>Client :</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email :</strong> {formData.email}</p>
              <p><strong>Entreprise :</strong> {formData.company}</p>
              <p><strong>Plan :</strong> <Badge className={selectedTier?.color}>{selectedTier?.label} - {selectedTier?.price}</Badge></p>
              {formData.services.length > 0 && (
                <p><strong>Services :</strong> {formData.services.length} service(s) sélectionné(s)</p>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
