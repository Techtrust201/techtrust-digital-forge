
import React, { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Building, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

type AuthMode = 'signin' | 'signup' | 'forgot-password' | 'check-email' | 'email-confirmation';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    company: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { isAuthenticated, signIn, signUp, isLoading: authLoading } = useSupabaseAuth();

  // Vérifier les paramètres d'URL pour la confirmation d'email
  useEffect(() => {
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    if (error) {
      if (error === 'access_denied' || errorDescription?.includes('expired')) {
        setMode('email-confirmation');
        toast.error('Le lien de confirmation a expiré. Veuillez vous inscrire à nouveau.');
      } else {
        toast.error('Erreur de confirmation: ' + (errorDescription || error));
      }
    }
  }, [searchParams]);

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

  const validateForm = (): string | null => {
    if (!formData.email || !formData.email.includes('@')) {
      return 'Email invalide';
    }
    
    if (mode === 'signup' || mode === 'signin') {
      if (!formData.password || formData.password.length < 6) {
        return 'Le mot de passe doit contenir au moins 6 caractères';
      }
    }

    if (mode === 'signup') {
      if (!formData.name.trim()) {
        return 'Le nom est requis';
      }
      if (formData.password !== formData.confirmPassword) {
        return 'Les mots de passe ne correspondent pas';
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signin') {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes('Email not confirmed')) {
            setMode('check-email');
            setEmailSent(true);
            toast.info('Veuillez confirmer votre email avant de vous connecter');
          } else if (error.message.includes('Invalid login credentials')) {
            toast.error('Email ou mot de passe incorrect');
          } else {
            toast.error('Erreur de connexion: ' + error.message);
          }
        }
      } else if (mode === 'signup') {
        const userData = {
          name: formData.name,
          company: formData.company
        };

        const { error } = await signUp(formData.email, formData.password, userData);
        if (error) {
          if (error.message.includes('User already registered')) {
            toast.error('Un compte existe déjà avec cet email');
            setMode('signin');
          } else {
            toast.error('Erreur d\'inscription: ' + error.message);
          }
        } else {
          setMode('check-email');
          setEmailSent(true);
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error('Une erreur inattendue s\'est produite');
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
    setShowPassword(false);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50">
      <NavbarPublic />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full max-w-md"
          >
            <Card className="shadow-2xl border-0 overflow-hidden">
              {/* Check Email Mode */}
              {mode === 'check-email' && (
                <>
                  <CardHeader className="text-center space-y-4 pb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                    >
                      <CheckCircle className="w-16 h-16 mx-auto" />
                    </motion.div>
                    <CardTitle className="text-2xl">Vérifiez votre email</CardTitle>
                    <CardDescription className="text-green-100">
                      Un lien de confirmation a été envoyé
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4 text-center">
                    <p className="text-gray-600">
                      Nous avons envoyé un lien de confirmation à :
                    </p>
                    <p className="font-medium text-gray-900 bg-gray-100 p-3 rounded-lg">
                      {formData.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      Cliquez sur le lien dans l'email pour activer votre compte.
                      Vérifiez aussi vos spams !
                    </p>
                    <div className="flex gap-2 mt-6">
                      <Button 
                        variant="outline" 
                        onClick={() => switchMode('signin')}
                        className="flex-1"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour
                      </Button>
                      <Button 
                        onClick={() => switchMode('signup')}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                      >
                        Renvoyer l'email
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}

              {/* Email Confirmation Error Mode */}
              {mode === 'email-confirmation' && (
                <>
                  <CardHeader className="text-center space-y-4 pb-6 bg-gradient-to-r from-orange-500 to-red-600 text-white">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                    >
                      <AlertCircle className="w-16 h-16 mx-auto" />
                    </motion.div>
                    <CardTitle className="text-2xl">Lien expiré</CardTitle>
                    <CardDescription className="text-orange-100">
                      Le lien de confirmation n'est plus valide
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4 text-center">
                    <p className="text-gray-600">
                      Les liens de confirmation expirent après 24h pour des raisons de sécurité.
                    </p>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Veuillez vous inscrire à nouveau pour recevoir un nouveau lien de confirmation.
                      </AlertDescription>
                    </Alert>
                    <Button 
                      onClick={() => switchMode('signup')}
                      className="w-full bg-red-600 hover:bg-red-700 mt-4"
                    >
                      Nouvelle inscription
                    </Button>
                  </CardContent>
                </>
              )}

              {/* Sign In / Sign Up Mode */}
              {(mode === 'signin' || mode === 'signup') && (
                <>
                  <CardHeader className="space-y-1 pb-6">
                    <CardTitle className="text-2xl font-bold text-center text-gray-900">
                      {mode === 'signin' ? 'Connexion' : 'Créer un compte'}
                    </CardTitle>
                    <CardDescription className="text-center text-gray-600">
                      {mode === 'signin' 
                        ? 'Connectez-vous à votre espace Techtrust' 
                        : 'Rejoignez Techtrust et boostez votre croissance'
                      }
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Champs inscription seulement */}
                      <AnimatePresence>
                        {mode === 'signup' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                          >
                            <div className="space-y-2">
                              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Nom complet *
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
                                  required={mode === 'signup'}
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
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email *
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
                          Mot de passe *
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
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirmation mot de passe (inscription seulement) */}
                      <AnimatePresence>
                        {mode === 'signup' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                              Confirmer le mot de passe *
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
                                required={mode === 'signup'}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 transition-all duration-200 transform hover:scale-[1.02]"
                        disabled={isLoading || authLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {mode === 'signin' ? 'Connexion...' : 'Inscription...'}
                          </>
                        ) : (
                          mode === 'signin' ? 'Se connecter' : 'Créer le compte'
                        )}
                      </Button>
                    </form>

                    <Separator />

                    <div className="text-center space-y-2">
                      <p className="text-sm text-gray-600">
                        {mode === 'signin' ? "Pas encore de compte ?" : "Déjà un compte ?"}
                      </p>
                      <Button
                        variant="link"
                        onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                        className="text-red-600 hover:text-red-700 font-medium p-0 transition-colors"
                      >
                        {mode === 'signin' ? 'Créer un compte' : 'Se connecter'}
                      </Button>
                    </div>

                    {mode === 'signup' && (
                      <div className="text-xs text-gray-500 text-center">
                        En créant un compte, vous acceptez nos{' '}
                        <a href="/terms" className="text-red-600 hover:underline">conditions d'utilisation</a>
                        {' '}et notre{' '}
                        <a href="/privacy" className="text-red-600 hover:underline">politique de confidentialité</a>.
                      </div>
                    )}
                  </CardContent>
                </>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default AuthPage;
