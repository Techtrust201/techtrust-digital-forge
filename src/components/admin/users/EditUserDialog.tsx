
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { usePackageUtils } from '@/hooks/usePackageUtils';
import { useUserPackages } from '@/hooks/useUserPackages';
import PackageSelector from './PackageSelector';

interface EditUserDialogProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (packages: string[]) => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  user,
  isOpen,
  onClose,
  onSave
}) => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const { getAllPackages, getTotalPrice } = usePackageUtils();
  const { updateUserPackages, isLoading } = useUserPackages();

  useEffect(() => {
    if (user?.packages) {
      setSelectedPackages(user.packages);
    }
  }, [user]);

  const handleSave = async () => {
    if (!user?.id) return;

    const result = await updateUserPackages(user.id, selectedPackages);
    
    if (result.success) {
      onSave(selectedPackages);
      onClose();
      // Forcer le rechargement pour voir les changements
      window.location.reload();
    }
  };

  const totalPrice = getTotalPrice(selectedPackages);

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Modifier les formules de {user.name}
          </DialogTitle>
          <DialogDescription>
            Gérez les packages et formules attribués à cet utilisateur.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total mensuel</p>
                <p className="text-lg font-bold text-green-600">{totalPrice}€</p>
              </div>
            </div>
          </div>

          <PackageSelector
            selectedPackages={selectedPackages}
            onPackageToggle={(packageId) => {
              setSelectedPackages(prev =>
                prev.includes(packageId)
                  ? prev.filter(id => id !== packageId)
                  : [...prev, packageId]
              );
            }}
            availablePackages={getAllPackages()}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
