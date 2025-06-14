
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import PackageSelector from './PackageSelector';
import { usePackageUtils } from '@/hooks/usePackageUtils';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  packages: string[];
  status: string;
  created: string;
  lastLogin: string;
}

interface EditUserDialogProps {
  user: User | null;
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
  const [editingPackages, setEditingPackages] = useState<string[]>([]);
  const { getAllPackages, getPackageById, getPackageColor, getTotalPrice } = usePackageUtils();

  useEffect(() => {
    if (user) {
      setEditingPackages([...user.packages]);
    }
  }, [user]);

  const addPackage = (packageId: string) => {
    if (!editingPackages.includes(packageId)) {
      setEditingPackages([...editingPackages, packageId]);
    }
  };

  const removePackage = (packageId: string) => {
    setEditingPackages(editingPackages.filter(id => id !== packageId));
  };

  const handleSave = () => {
    onSave(editingPackages);
    onClose();
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier les formules - {user.name}</DialogTitle>
          <DialogDescription>
            Ajoutez ou supprimez des formules pour ce client
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <PackageSelector
            selectedPackages={editingPackages}
            allPackages={getAllPackages()}
            onAddPackage={addPackage}
            onRemovePackage={removePackage}
            getPackageById={getPackageById}
            getPackageColor={getPackageColor}
            getTotalPrice={getTotalPrice}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button className="bg-red-500 hover:bg-red-600" onClick={handleSave}>
            Sauvegarder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
