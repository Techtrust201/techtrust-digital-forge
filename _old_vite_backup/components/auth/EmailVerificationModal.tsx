
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Clock, RefreshCw } from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({ isOpen, onClose }) => {
  const { 
    user, 
    resendVerificationEmail, 
    getRemainingResendTime 
  } = useSupabaseAuth();
  
  const [isResending, setIsResending] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    setCountdown(getRemainingResendTime());
    
    const interval = setInterval(() => {
      const remaining = getRemainingResendTime();
      setCountdown(remaining);
      
      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [getRemainingResendTime]);

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendError(null);
    setResendSuccess(false);

    const { error } = await resendVerificationEmail();

    if (error) {
      setResendError(error.message);
    } else {
      setResendSuccess(true);
      setCountdown(60);
    }

    setIsResending(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-500" />
            Vérifiez votre email
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert>
            <Mail className="w-4 h-4" />
            <AlertDescription>
              Un email de confirmation a été envoyé à <strong>{user?.email}</strong>. 
              Cliquez sur le lien dans l'email pour activer votre compte.
            </AlertDescription>
          </Alert>

          {resendSuccess && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                Email de confirmation renvoyé avec succès !
              </AlertDescription>
            </Alert>
          )}

          {resendError && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {resendError}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleResendEmail}
              disabled={isResending || countdown > 0}
              variant="outline"
              className="w-full"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : countdown > 0 ? (
                <>
                  <Clock className="w-4 h-4 mr-2" />
                  Renvoyer dans {countdown}s
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Renvoyer l'email
                </>
              )}
            </Button>

            <Button variant="ghost" onClick={onClose}>
              Fermer
            </Button>
          </div>

          <div className="text-sm text-gray-600 text-center">
            <p>Vous ne trouvez pas l'email ?</p>
            <p>Vérifiez votre dossier spam ou courrier indésirable.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerificationModal;
