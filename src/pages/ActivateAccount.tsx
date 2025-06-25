
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useInvitationActivation } from '@/hooks/useInvitationActivation';
import { useAccountCreation } from '@/hooks/useAccountCreation';
import { LoadingState } from '@/components/activation/LoadingState';
import { AccountInfoSection } from '@/components/activation/AccountInfoSection';
import { PasswordForm } from '@/components/activation/PasswordForm';

const ActivateAccount = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { invitation, isLoading } = useInvitationActivation(token);
  const { createAccount, isCreating } = useAccountCreation();

  const handlePasswordSubmit = (password: string, confirmPassword: string) => {
    if (invitation) {
      createAccount(invitation, password, confirmPassword);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!invitation) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Activez votre compte</CardTitle>
          <CardDescription>
            Bienvenue {invitation.name} ! Créez votre mot de passe pour accéder à votre espace client.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AccountInfoSection invitation={invitation} />
          <PasswordForm onSubmit={handlePasswordSubmit} isCreating={isCreating} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivateAccount;
