
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building } from 'lucide-react';
import { FormData } from './types';

interface CompanyInfoStepProps {
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
}

const CompanyInfoStep = ({ formData, onInputChange }: CompanyInfoStepProps) => {
  const industryOptions = [
    'E-commerce', 'Services', 'Technologie', 'Santé', 'Éducation', 
    'Finance', 'Immobilier', 'Restaurant', 'Mode', 'Autre'
  ];

  return (
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
          onChange={(e) => onInputChange('company', e.target.value)}
          placeholder="Mon Entreprise SARL"
          required
        />
      </div>

      <div>
        <Label htmlFor="position">Poste</Label>
        <Input
          id="position"
          value={formData.position}
          onChange={(e) => onInputChange('position', e.target.value)}
          placeholder="Directeur Marketing"
        />
      </div>

      <div>
        <Label>Secteur d'activité</Label>
        <Select value={formData.industry} onValueChange={(value) => onInputChange('industry', value)}>
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
  );
};

export default CompanyInfoStep;
