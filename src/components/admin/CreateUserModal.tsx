
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { X } from 'lucide-react';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateUserModal = ({ isOpen, onClose }: CreateUserModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tier: 'bronze',
    services: [] as string[]
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation des données
      if (!formData.name || !formData.email) {
        toast.error('Nom et email sont requis');
        return;
      }

      // Vérifier si l'utilisateur existe déjà
      const existingUsers = JSON.parse(localStorage.getItem('admin_users') || '[]');
      const userExists = existingUsers.some((user: any) => user.email === formData.email);
      
      if (userExists) {
        toast.error('Un utilisateur avec cet email existe déjà');
        return;
      }

      // Créer le nouvel utilisateur
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        revenue: formData.tier === 'bronze' ? 39 : formData.tier === 'silver' ? 299 : formData.tier === 'gold' ? 599 : 1299
      };

      // Sauvegarder localement (en attendant l'intégration Supabase)
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('admin_users', JSON.stringify(updatedUsers));

      toast.success('Utilisateur créé avec succès');
      onClose();
      
      // Actualiser la page pour voir le nouvel utilisateur
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      toast.error('Erreur lors de la création de l\'utilisateur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Créer un nouveau client
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom complet *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
              placeholder="Ex: Marie Dubois"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
              placeholder="marie@entreprise.com"
              required
            />
          </div>

          <div>
            <Label>Plan initial</Label>
            <Select value={formData.tier} onValueChange={(value) => setFormData(prev => ({...prev, tier: value}))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bronze">Bronze - 39€/mois</SelectItem>
                <SelectItem value="silver">Silver - 299€/mois</SelectItem>
                <SelectItem value="gold">Gold - 599€/mois</SelectItem>
                <SelectItem value="diamond">Diamond - 1299€/mois</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Création...' : 'Créer le compte'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
