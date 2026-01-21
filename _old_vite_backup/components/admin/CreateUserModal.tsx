
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { X, UserPlus, Mail } from 'lucide-react';
import { usePackageUtils } from '@/hooks/usePackageUtils';
import { useUserInvitations } from '@/hooks/useUserInvitations';
import { CreateUserModalProps, FormData } from './createUser/types';
import ProgressBar from './createUser/ProgressBar';
import PersonalInfoStep from './createUser/PersonalInfoStep';
import CompanyInfoStep from './createUser/CompanyInfoStep';
import AddressStep from './createUser/AddressStep';
import PackageSelectionStep from './createUser/PackageSelectionStep';
import Summary from './createUser/Summary';

const CreateUserModal = ({ isOpen, onClose }: CreateUserModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    industry: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    selectedPackages: [],
    notes: ''
  });

  const { getPackageById, getTotalPrice } = usePackageUtils();
  const { sendInvitation, isLoading } = useUserInvitations();

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

    const invitationData = {
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
      company: formData.company,
      phone: formData.phone,
      position: formData.position,
      industry: formData.industry,
      address: {
        street: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country
      },
      selectedPackages: formData.selectedPackages,
      notes: formData.notes,
    };

    const result = await sendInvitation(invitationData);
    
    if (result.success) {
      onClose();
      
      // Reset form
      setCurrentStep(1);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '',
        company: '', position: '', industry: '',
        address: '', city: '', postalCode: '', country: 'France',
        selectedPackages: [], notes: ''
      });

      toast.success(
        `Invitation envoyée à ${formData.firstName} ${formData.lastName}`, 
        {
          description: "L'utilisateur recevra un email pour activer son compte"
        }
      );
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} onInputChange={handleInputChange} />;
      case 2:
        return <CompanyInfoStep formData={formData} onInputChange={handleInputChange} />;
      case 3:
        return <AddressStep formData={formData} onInputChange={handleInputChange} />;
      case 4:
        return (
          <PackageSelectionStep
            formData={formData}
            onInputChange={handleInputChange}
            onAddPackage={addPackage}
            onRemovePackage={removePackage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-xl">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-red-500" />
              Inviter un nouveau client
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <ProgressBar currentStep={currentStep} totalSteps={4} />

        <div className="space-y-6">
          {renderCurrentStep()}
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
              {isLoading ? (
                <>
                  <Mail className="w-4 h-4 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer l'invitation
                </>
              )}
            </Button>
          )}
        </div>

        {/* Récapitulatif en dernière étape */}
        {currentStep === 4 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Récapitulatif de l'invitation</h3>
            <p className="text-sm text-gray-600">
              Un email d'invitation sera envoyé à <strong>{formData.email}</strong> avec 
              les instructions pour créer son compte et accéder aux services sélectionnés.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
