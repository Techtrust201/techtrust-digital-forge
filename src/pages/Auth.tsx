
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBetterAuth } from '@/hooks/useBetterAuth';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Mail, User, Eye, EyeOff, Shield, Rocket, Crown, Diamond, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Auth = () => {
  const { t } = useTranslation();
  const { signIn, signUp, isAuthenticated, isLoading } = useBetterAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/dashboard';
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result?.user) {
        toast.success('Connexion réussie !');
        // La redirection se fera via useEffect
      } else {
        toast.error('Email ou mot de passe incorrect');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Erreur de connexion');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.name) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const result = await signUp(formData.email, formData.password, formData.name);
      
      if (result?.user) {
        toast.success('Compte créé avec succès !');
        setActiveTab('login');
        setFormData({ email: formData.email, password: '', name: '', confirmPassword: '' });
      }
    } catch (error: any) {
      console.error('Register error:', error);
      toast.error(error.message || 'Erreur lors de la création du compte');
    }
  };

  const fillTestAccount = (email: string, password: string) => {
    setFormData({ ...formData, email, password });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Connexion Espace Client Techtrust",
    "description": "Accédez à votre espace client Techtrust pour gérer vos outils IA de growth hacking, community management et solutions digitales.",
    "url": "https://www.tech-trust.fr/auth"
  };

  return (
    <>
      <SEO
        title="Connexion Espace Client | Dashboard Techtrust 2025"
        description="🔐 Accédez à votre espace client Techtrust. Gérez vos outils IA growth hacking, community management, analytics et projets digitaux depuis un dashboard unifié."
        keywords="connexion techtrust, espace client, dashboard, outils ia, growth hacking, community management, analytics"
        canonicalUrl="https://www.tech-trust.fr/auth"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-purple-50">
        <NavbarPublic />
        
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-4xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Espace Client <span className="text-blue-500">Techtrust</span>
              </h1>
              <p className="text-lg text-gray-600">
                Accédez à vos outils IA et gérez vos projets digitaux
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Formulaire de connexion */}
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login" className="text-lg py-3">Se connecter</TabsTrigger>
                    <TabsTrigger value="register" className="text-lg py-3">S'inscrire</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <Card className="shadow-xl">
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl">Connexion</CardTitle>
                        <CardDescription className="text-lg">
                          Accédez à votre dashboard personnalisé
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <form onSubmit={handleLogin} className="space-y-6">
                          <div>
                            <Label htmlFor="email" className="text-base font-medium">Email</Label>
                            <div className="relative mt-2">
                              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="votre@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="pl-10 h-12 text-base"
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="password" className="text-base font-medium">Mot de passe</Label>
                            <div className="relative mt-2">
                              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                              <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="pl-10 pr-12 h-12 text-base"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full h-12 text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                          >
                            Se connecter
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <Card className="shadow-xl">
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl">Créer un compte</CardTitle>
                        <CardDescription className="text-lg">
                          Rejoignez +2000 clients satisfaits
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <form onSubmit={handleRegister} className="space-y-6">
                          <div>
                            <Label htmlFor="name" className="text-base font-medium">Nom complet</Label>
                            <div className="relative mt-2">
                              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                              <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Jean Dupont"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="pl-10 h-12 text-base"
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="email-register" className="text-base font-medium">Email professionnel</Label>
                            <div className="relative mt-2">
                              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                              <Input
                                id="email-register"
                                name="email"
                                type="email"
                                placeholder="jean@entreprise.com"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="pl-10 h-12 text-base"
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="password-register" className="text-base font-medium">Mot de passe</Label>
                            <div className="relative mt-2">
                              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                              <Input
                                id="password-register"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="pl-10 pr-12 h-12 text-base"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="confirm-password" className="text-base font-medium">Confirmer le mot de passe</Label>
                            <div className="relative mt-2">
                              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                              <Input
                                id="confirm-password"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                className="pl-10 pr-12 h-12 text-base"
                                required
                              />
                            </div>
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full h-12 text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                          >
                            Créer mon compte
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Comptes de test */}
              <div>
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-blue-500" />
                      Comptes de Test
                    </CardTitle>
                    <CardDescription>
                      Cliquez pour remplir automatiquement
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { email: 'admin@techtrust.fr', password: 'admin123', name: 'Admin', role: 'Super Admin' },
                      { email: 'starter@techtrust.fr', password: 'starter123', name: 'Client Starter', role: 'Client' },
                      { email: 'business@techtrust.fr', password: 'business123', name: 'Client Business', role: 'Client' },
                      { email: 'premium@techtrust.fr', password: 'premium123', name: 'Client Premium', role: 'Client' },
                      { email: 'manager@techtrust.fr', password: 'manager123', name: 'Manager', role: 'Manager' }
                    ].map((account) => (
                      <Card 
                        key={account.email}
                        className="cursor-pointer transition-all hover:shadow-md hover:bg-blue-50"
                        onClick={() => fillTestAccount(account.email, account.password)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{account.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {account.role}
                            </Badge>
                          </div>
                          <div className="text-xs space-y-1 text-gray-600">
                            <div><strong>Email:</strong> {account.email}</div>
                            <div><strong>Password:</strong> {account.password}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Auth;
