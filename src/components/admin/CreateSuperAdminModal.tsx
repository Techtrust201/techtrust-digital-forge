
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Crown, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CreateSuperAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateSuperAdminModal: React.FC<CreateSuperAdminModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'admin' as 'admin' | 'super_admin'
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.name) {
      toast.error('Tous les champs sont requis');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    try {
      setLoading(true);

      // Créer l'utilisateur
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            name: formData.name
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Attendre un peu pour que le profil soit créé par le trigger
        setTimeout(async () => {
          try {
            // Ajouter le rôle admin avec la bonne colonne userId
            const { error: roleError } = await supabase
              .from('user_roles')
              .insert({
                userId: authData.user!.id,
                role: formData.role
              });

            if (roleError) throw roleError;

            // Mettre à jour le profil
            const { error: profileError } = await supabase
              .from('profiles')
              .update({
                name: formData.name,
                tier: formData.role === 'super_admin' ? 'diamond' : 'gold',
                status: 'active'
              })
              .eq('id', authData.user!.id);

            if (profileError) throw profileError;

            toast.success(`${formData.role === 'super_admin' ? 'Super Admin' : 'Admin'} créé avec succès`);
            setFormData({ email: '', password: '', name: '', role: 'admin' });
            onSuccess();
            onClose();
          } catch (error: any) {
            console.error('Error setting up admin:', error);
            toast.error('Erreur lors de la configuration de l\'admin');
          }
        }, 2000);
      }

    } catch (error: any) {
      console.error('Error creating admin:', error);
      if (error.message.includes('User already registered')) {
        toast.error('Un compte existe déjà avec cet email');
      } else {
        toast.error('Erreur lors de la création: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      value: 'admin' as const,
      label: 'Admin',
      description: 'Peut gérer les utilisateurs et packages',
      icon: Settings,
      color: 'text-blue-600'
    },
    {
      value: 'super_admin' as const,
      label: 'Super Admin',
      description: 'Accès complet à tous les paramètres',
      icon: Crown,
      color: 'text-purple-600'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" style={{ color: '#45C7FF' }} />
            Créer un Admin
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Nom de l'administrateur"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@tech-trust.fr"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Mot de passe sécurisé"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label>Rôle</Label>
            <div className="space-y-2">
              {roles.map((role) => {
                const RoleIcon = role.icon;
                return (
                  <Card 
                    key={role.value}
                    className={`cursor-pointer transition-all ${
                      formData.role === role.value 
                        ? 'border-blue-400 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData({ ...formData, role: role.value })}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <RoleIcon className={`w-5 h-5 ${role.color}`} />
                        <div className="flex-1">
                          <h3 className="font-medium">{role.label}</h3>
                          <p className="text-sm text-gray-600">{role.description}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          formData.role === role.value 
                            ? 'border-blue-400 bg-blue-400' 
                            : 'border-gray-300'
                        }`}>
                          {formData.role === role.value && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="text-white"
              style={{ backgroundColor: '#45C7FF' }}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Création...
                </>
              ) : (
                'Créer Admin'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSuperAdminModal;
