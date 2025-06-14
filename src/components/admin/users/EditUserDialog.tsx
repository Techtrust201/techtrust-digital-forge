
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
import { Save, X } from 'lucide-react';

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

  const hasChanges = () => {
    if (!user) return false;
    return JSON.stringify(editingPackages.sort()) !== JSON.stringify(user.packages.sort());
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">{user.name.charAt(0)}</span>
            </div>
            Modifier les formules - {user.name}
          </DialogTitle>
          <DialogDescription>
            Ajoutez ou supprimez des formules pour ce client. Les changements seront appliqués immédiatement.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
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

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-600">
            {hasChanges() ? (
              <span className="text-orange-600 font-medium">⚠️ Modifications non sauvegardées</span>
            ) : (
              <span className="text-green-600">✓ Aucune modification</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Button>
            <Button 
              className="bg-red-500 hover:bg-red-600" 
              onClick={handleSave}
              disabled={!hasChanges()}
            >
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
