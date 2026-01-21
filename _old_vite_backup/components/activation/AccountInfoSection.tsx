
import React from 'react';
import { InvitationData } from '@/types/invitation';

interface AccountInfoSectionProps {
  invitation: InvitationData;
}

export const AccountInfoSection = ({ invitation }: AccountInfoSectionProps) => {
  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
      <h3 className="font-medium text-blue-900 mb-2">Informations du compte</h3>
      <p className="text-sm text-blue-700">
        <strong>Email :</strong> {invitation.email}
      </p>
      <p className="text-sm text-blue-700">
        <strong>Entreprise :</strong> {invitation.company}
      </p>
    </div>
  );
};
