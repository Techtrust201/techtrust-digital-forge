
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  CreditCard, 
  Download, 
  Shield, 
  Crown, 
  Rocket,
  Diamond,
  Star,
  Calendar,
  FileText,
  Settings,
  Bell,
  Lock,
  CheckCircle,
  ArrowRight,
  Package
} from 'lucide-react';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData] = useState(() => {
    const user = localStorage.getItem('techtrust_user');
    return user ? JSON.parse(user) : null;
  });

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return { 
          icon: Shield, 
          name: 'Bronze', 
          color: 'text-amber-600 bg-amber-50',
          nextTier: 'Silver',
          progress: 25,
          benefits: ['Site web basique', 'Support email', 'SSL gratuit']
        };
      case 'silver':
        return { 
          icon: Rocket, 
          name: 'Silver', 
          color: 'text-gray-600 bg-gray-50',
          nextTier: 'Gold',
          progress: 50,
          benefits: ['Growth Hacking Pro', 'Analytics avancées', 'Support prioritaire']
        };
      case 'gold':
        return { 
          icon: Crown, 
          name: 'Gold', 
          color: 'text-yellow-600 bg-yellow-50',
          nextTier: 'Diamond',
          progress: 75,
          benefits: ['Solutions sur mesure', 'Community Pro', 'Account manager']
        };
      case 'diamond':
        return { 
          icon: Diamond, 
          name: 'Diamond', 
          color: 'text-purple-600 bg-purple-50',
          nextTier: null,
          progress: 100,
          benefits: ['Accès illimité', 'Support VIP 24/7', 'Services premium']
        };
      default:
        return { 
          icon: Shield, 
          name: 'Bronze', 
          color: 'text-amber-600 bg-amber-50',
          nextTier: 'Silver',
          progress: 25,
          benefits: ['Site web basique', 'Support email', 'SSL gratuit']
        };
    }
  };

  const tierInfo = getTierInfo(userData?.tier || 'bronze');
  const TierIcon = tierInfo.icon;

  // Données simulées pour les factures
  const invoices = [
    {
      id: 'INV-2025-001',
      date: '2025-01-15',
      amount: 599,
      status: 'paid',
      description: 'Growth Hacking Pro - Janvier 2025',
      downloadUrl: '#'
    },
    {
      id: 'INV-2024-012',
      date: '2024-12-15',
      amount: 599,
      status: 'paid',
      description: 'Growth Hacking Pro - Décembre 2024',
      downloadUrl: '#'
    },
    {
      id: 'INV-2024-011',
      date: '2024-11-15',
      amount: 1599,
      status: 'paid',
      description: 'Site Web Business - Développement',
      downloadUrl: '#'
    }
  ];

  const renderProfile = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">{userData?.name?.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{userData?.name}</h3>
              <p className="text-gray-600">{userData?.email}</p>
              <Badge className={`mt-2 ${tierInfo.color}`}>
                <TierIcon className="w-4 h-4 mr-1" />
                Niveau {tierInfo.name}
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" defaultValue={userData?.name} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={userData?.email} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" placeholder="+33 1 23 45 67 89" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="company">Entreprise</Label>
              <Input id="company" placeholder="Mon Entreprise SAS" className="mt-1" />
            </div>
          </div>

          <Button className="bg-blue-500 hover:bg-blue-600">
            Sauvegarder les modifications
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres de notification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Notifications par email</h4>
              <p className="text-sm text-gray-600">Recevoir les notifications importantes</p>
            </div>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Configuré
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Rapports hebdomadaires</h4>
              <p className="text-sm text-gray-600">Résumé de vos performances</p>
            </div>
            <Button variant="outline" size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Activé
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Alertes de sécurité</h4>
              <p className="text-sm text-gray-600">Connexions suspectes et changements</p>
            </div>
            <Button variant="outline" size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Activé
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPlan = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mon plan actuel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-lg ${tierInfo.color}`}>
                <TierIcon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Plan {tierInfo.name}</h3>
                <p className="text-gray-600">Membre depuis janvier 2025</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">
                {userData?.tier === 'bronze' ? '89' : userData?.tier === 'silver' ? '299' : userData?.tier === 'gold' ? '599' : '1299'}€
              </p>
              <p className="text-gray-600">/mois</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Vos avantages inclus :</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {tierInfo.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {tierInfo.nextTier && (
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">Progression vers {tierInfo.nextTier}</h4>
                <span className="text-sm text-gray-600">{tierInfo.progress}%</span>
              </div>
              <Progress value={tierInfo.progress} className="mb-4" />
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Star className="w-4 h-4 mr-2" />
                Passer au niveau {tierInfo.nextTier}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Utilisation ce mois</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Emails envoyés</span>
                <span className="text-sm font-medium">2,450 / 10,000</span>
              </div>
              <Progress value={24.5} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">SMS envoyés</span>
                <span className="text-sm font-medium">340 / 2,000</span>
              </div>
              <Progress value={17} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Leads générés</span>
                <span className="text-sm font-medium">156 / 500</span>
              </div>
              <Progress value={31.2} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Services actifs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData?.services?.map((service: string, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {service.replace('-', ' ').toUpperCase()}
                    </h4>
                    <p className="text-sm text-gray-600">Actif depuis janvier 2025</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Gérer
                </Button>
              </div>
            )) || (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucun service actif</p>
                <Button className="mt-4">
                  Découvrir nos services
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Méthode de paiement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-600">Expire 12/27</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Modifier
            </Button>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-4">Informations de facturation</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Nom sur la carte</Label>
                <Input defaultValue={userData?.name} className="mt-1" />
              </div>
              <div>
                <Label>Email de facturation</Label>
                <Input defaultValue={userData?.email} className="mt-1" />
              </div>
              <div>
                <Label>Adresse</Label>
                <Input placeholder="123 Rue de la Paix" className="mt-1" />
              </div>
              <div>
                <Label>Code postal</Label>
                <Input placeholder="75001" className="mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historique des factures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <FileText className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{invoice.id}</p>
                    <p className="text-sm text-gray-600">{invoice.description}</p>
                    <p className="text-sm text-gray-500">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{invoice.amount}€</p>
                    <Badge className={invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {invoice.status === 'paid' ? 'Payée' : 'En attente'}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sécurité du compte</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <h4 className="font-medium text-green-900">Compte sécurisé</h4>
                <p className="text-sm text-green-700">Toutes les vérifications sont passées</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">Vérifié</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Authentification à deux facteurs</h4>
                <p className="text-sm text-gray-600">Sécurisez votre compte avec 2FA</p>
              </div>
              <Button variant="outline">
                <Shield className="w-4 h-4 mr-2" />
                Activer
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Mot de passe</h4>
                <p className="text-sm text-gray-600">Dernière modification il y a 2 mois</p>
              </div>
              <Button variant="outline">
                <Lock className="w-4 h-4 mr-2" />
                Modifier
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Sessions actives</h4>
                <p className="text-sm text-gray-600">Gérez vos connexions actives</p>
              </div>
              <Button variant="outline">
                Voir les sessions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connexions récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Paris, France</p>
                <p className="text-sm text-gray-600">Aujourd'hui à 14:30 • Chrome sur macOS</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Actuelle</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Paris, France</p>
                <p className="text-sm text-gray-600">Hier à 09:15 • Safari sur iPhone</p>
              </div>
              <Badge variant="outline">Mobile</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mon Compte 👤</h1>
            <p className="text-gray-600">Gérez vos informations et paramètres</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={tierInfo.color}>
              <TierIcon className="w-4 h-4 mr-1" />
              {tierInfo.name}
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Profil
          </Button>
          <Button
            variant={activeTab === 'plan' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('plan')}
            className="flex items-center gap-2"
          >
            <Package className="w-4 h-4" />
            Mon Plan
          </Button>
          <Button
            variant={activeTab === 'billing' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('billing')}
            className="flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Facturation
          </Button>
          <Button
            variant={activeTab === 'security' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('security')}
            className="flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Sécurité
          </Button>
        </div>

        {/* Contenu */}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'plan' && renderPlan()}
        {activeTab === 'billing' && renderBilling()}
        {activeTab === 'security' && renderSecurity()}
      </div>
    </DashboardLayout>
  );
};

export default Account;
