
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface InvitationData {
  id: string;
  email: string;
  name: string;
  company: string;
  selected_packages: string[];
  status: string;
}

const ActivateAccount = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error('Lien d\'activation invalide');
      navigate('/auth');
      return;
    }

    loadInvitation();
  }, [token, navigate]);

  const loadInvitation = async () => {
    try {
      console.log('[ACTIVATION] Loading invitation for token:', token);
      
      const { data, error } = await supabase
        .from('user_invitations')
        .select('*')
        .eq('invitation_token', token)
        .eq('status', 'pending')
        .single();

      if (error || !data) {
        console.error('[ACTIVATION] Invitation not found:', error);
        toast.error('Invitation introuvable ou expirée');
        navigate('/auth');
        return;
      }

      // Vérifier si l'invitation n'est pas expirée
      if (new Date(data.expires_at) < new Date()) {
        toast.error('Cette invitation a expiré');
        navigate('/auth');
        return;
      }

      console.log('[ACTIVATION] Invitation loaded:', data);
      
      // Convertir les données pour correspondre à notre interface
      const invitationData: InvitationData = {
        id: data.id,
        email: data.email,
        name: data.name,
        company: data.company || '',
        selected_packages: Array.isArray(data.selected_packages) ? data.selected_packages : [],
        status: data.status,
      };
      
      setInvitation(invitationData);
    } catch (error) {
      console.error('[ACTIVATION] Error loading invitation:', error);
      toast.error('Erreur lors du chargement de l\'invitation');
      navigate('/auth');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!invitation) return;

    if (password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    setIsCreating(true);

    try {
      console.log('[ACTIVATION] Creating account for:', invitation.email);

      // Créer le compte utilisateur avec Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: invitation.email,
        password: password,
        options: {
          data: {
            name: invitation.name,
            company: invitation.company,
          }
        }
      });

      if (authError) {
        console.error('[ACTIVATION] Auth error:', authError);
        toast.error('Erreur lors de la création du compte: ' + authError.message);
        return;
      }

      if (!authData.user) {
        toast.error('Erreur lors de la création du compte');
        return;
      }

      console.log('[ACTIVATION] Account created:', authData.user.id);

      // Marquer l'invitation comme acceptée
      const { error: updateError } = await supabase
        .from('user_invitations')
        .update({
          status: 'accepted',
          activated_at: new Date().toISOString(),
          user_id: authData.user.id,
        })
        .eq('id', invitation.id);

      if (updateError) {
        console.error('[ACTIVATION] Error updating invitation:', updateError);
      }

      toast.success('Compte créé avec succès !', {
        description: 'Vous allez être redirigé vers votre dashboard'
      });

      // Rediriger vers le dashboard après un court délai
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error: any) {
      console.error('[ACTIVATION] Error creating account:', error);
      toast.error('Erreur lors de la création du compte');
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de votre invitation...</p>
        </div>
      </div>
    );
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
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Informations du compte</h3>
            <p className="text-sm text-blue-700">
              <strong>Email :</strong> {invitation.email}
            </p>
            <p className="text-sm text-blue-700">
              <strong>Entreprise :</strong> {invitation.company}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">Mot de passe *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 caractères"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Répétez votre mot de passe"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600"
              disabled={isCreating || !password || !confirmPassword}
            >
              {isCreating ? 'Création du compte...' : 'Créer mon compte'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivateAccount;
