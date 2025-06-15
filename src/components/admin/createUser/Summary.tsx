
import React from 'react';
import { usePackageUtils } from '@/hooks/usePackageUtils';
import { FormData } from './types';

interface SummaryProps {
  formData: FormData;
}

const Summary = ({ formData }: SummaryProps) => {
  const { getTotalPrice } = usePackageUtils();

  if (formData.selectedPackages.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium mb-2">Récapitulatif</h4>
      <div className="text-sm space-y-1">
        <p><strong>Client :</strong> {formData.firstName} {formData.lastName}</p>
        <p><strong>Email :</strong> {formData.email}</p>
        <p><strong>Entreprise :</strong> {formData.company}</p>
        <p><strong>Total :</strong> <span className="font-bold text-red-600">{getTotalPrice(formData.selectedPackages)}€</span></p>
      </div>
    </div>
  );
};

export default Summary;
