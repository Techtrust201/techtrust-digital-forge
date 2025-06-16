
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, User, Building } from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    company: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, signIn, signUp, isLoading: authLoading } = useSupabaseAuth();

  // Rediriger si déjà connecté
  if (isAuthenticated && !authLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        // Validation pour l'inscription
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Les mots de passe ne correspondent pas');
        }
        if (formData.password.length < 6) {
          throw new Error('Le mot de passe doit contenir au moins 6 caractères');
        }

        const userData = {
          name: formData.name,
          company: formData.company
        };

        await signUp(formData.email, formData.password, userData);
      }
    } catch (error: any) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      company: ''
    });
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50">
      <NavbarPublic />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              {isLogin ? 'Connexion' : 'Créer un compte'}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              {isLogin 
                ? 'Connectez-vous à votre espace Techtrust' 
                : 'Rejoignez Techtrust et boostez votre croissance'
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Champs inscription seulement */}
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Nom complet
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Votre nom complet"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10"
                        required={!isLogin}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                      Entreprise (optionnel)
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Nom de votre entreprise"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirmation mot de passe (inscription seulement) */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirmer le mot de passe
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3"
                disabled={isLoading || authLoading}
              >
                {isLoading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'Créer le compte')}
              </Button>
            </form>

            <Separator />

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
              </p>
              <Button
                variant="link"
                onClick={toggleAuthMode}
                className="text-red-600 hover:text-red-700 font-medium p-0"
              >
                {isLogin ? 'Créer un compte' : 'Se connecter'}
              </Button>
            </div>

            {!isLogin && (
              <div className="text-xs text-gray-500 text-center">
                En créant un compte, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
