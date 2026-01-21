
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';
import { FormData } from './types';

interface AddressStepProps {
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
}

const AddressStep = ({ formData, onInputChange }: AddressStepProps) => {
  return (
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
          onChange={(e) => onInputChange('address', e.target.value)}
          placeholder="123 Rue de la Paix"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">Ville *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            placeholder="Paris"
            required
          />
        </div>
        <div>
          <Label htmlFor="postalCode">Code postal</Label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => onInputChange('postalCode', e.target.value)}
            placeholder="75001"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="country">Pays</Label>
        <Input
          id="country"
          value={formData.country}
          onChange={(e) => onInputChange('country', e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddressStep;
