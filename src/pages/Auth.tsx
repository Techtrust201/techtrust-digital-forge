
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

// Comptes de test disponibles
const testAccounts = [
  {
    email: 'admin@techtrust.fr',
    password: 'admin123',
    role: 'admin',
    tier: 'diamond',
    name: 'Admin Techtrust',
    description: 'Accès complet à tous les outils'
  },
  {
    email: 'starter@techtrust.fr', 
    password: 'starter123',
    role: 'client',
    tier: 'bronze',
    services: ['website-starter'],
    name: 'Client Starter',
    description: 'Site web basique'
  },
  {
    email: 'business@techtrust.fr',
    password: 'business123', 
    role: 'client',
    tier: 'silver',
    services: ['website-business', 'growth-pro'],
    name: 'Client Business',
    description: 'Site + Growth Hacking'
  },
  {
    email: 'premium@techtrust.fr',
    password: 'premium123',
    role: 'client', 
    tier: 'gold',
    services: ['website-premium', 'growth-enterprise', 'community-growth'],
    name: 'Client Premium',
    description: 'Formules premium'
  },
  {
    email: 'stagiaire@techtrust.fr',
    password: 'stage123',
    role: 'employee',
    tier: 'bronze',
    permissions: ['community-management'],
    name: 'Stagiaire CM',
    description: 'Community manager stagiaire'
  },
  {
    email: 'manager@techtrust.fr',
    password: 'manager123',
    role: 'manager',
    tier: 'gold', 
    permissions: ['all-except-admin'],
    name: 'Manager',
    description: 'Manager équipe'
  }
];

const Auth = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [selectedTestAccount, setSelectedTestAccount] = useState<typeof testAccounts[0] | null>(null);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Connexion Espace Client Techtrust",
    "description": "Accédez à votre espace client Techtrust pour gérer vos outils IA de growth hacking, community management et solutions digitales.",
    "url": "https://www.tech-trust.fr/auth"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier les comptes de test
    const account = testAccounts.find(acc => 
      acc.email === formData.email && acc.password === formData.password
    );
    
    if (account) {
      // Stocker les infos de connexion
      localStorage.setItem('techtrust_user', JSON.stringify(account));
      
      // Rediriger selon le rôle
      if (account.role === 'admin') {
        window.location.href = '/admin/dashboard';
      } else {
        window.location.href = '/dashboard';
      }
    } else {
      alert('❌ Email ou mot de passe incorrect. Utilisez un compte de test ci-dessous.');
    }
  };

  const handleTestAccountSelect = (account: typeof testAccounts[0]) => {
    setFormData({
      ...formData,
      email: account.email,
      password: account.password
    });
    setSelectedTestAccount(account);
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'bronze': return Shield;
      case 'silver': return Rocket;
      case 'gold': return Crown;
      case 'diamond': return Diamond;
      default: return Shield;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'text-amber-600 bg-amber-50';
      case 'silver': return 'text-gray-600 bg-gray-50';
      case 'gold': return 'text-yellow-600 bg-yellow-50';
      case 'diamond': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
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
                <Tabs defaultValue="login" className="w-full">
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
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                          
                          <div className="text-center">
                            <a href="/forgot-password" className="text-blue-500 hover:underline">
                              Mot de passe oublié ?
                            </a>
                          </div>
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
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                      Utilisez ces comptes pour tester les différents accès
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {testAccounts.map((account) => {
                      const TierIcon = getTierIcon(account.tier);
                      const isSelected = selectedTestAccount?.email === account.email;
                      
                      return (
                        <Card 
                          key={account.email}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                          }`}
                          onClick={() => handleTestAccountSelect(account)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <TierIcon className={`w-4 h-4 ${getTierColor(account.tier).split(' ')[0]}`} />
                                <span className="font-medium text-sm">{account.name}</span>
                              </div>
                              <Badge className={`text-xs ${getTierColor(account.tier)}`}>
                                {account.tier.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">{account.description}</p>
                            <div className="text-xs space-y-1">
                              <div><strong>Email:</strong> {account.email}</div>
                              <div><strong>Mot de passe:</strong> {account.password}</div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Info demo */}
                <Card className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-medium text-gray-900 mb-2">Mode Démo</h4>
                    <p className="text-sm text-gray-600">
                      Cette version de démo vous permet de tester toutes les fonctionnalités selon votre profil utilisateur.
                    </p>
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
