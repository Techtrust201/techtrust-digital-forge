
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
  Shield, 
  Bell, 
  Download,
  Edit,
  Crown,
  Rocket,
  Diamond,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building,
  Zap,
  Star
} from 'lucide-react';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData] = useState(() => {
    const user = localStorage.getItem('techtrust_user');
    return user ? JSON.parse(user) : null;
  });

  const getUserPackages = () => {
    switch(userData?.tier) {
      case 'bronze':
        return [
          { service: 'Site Web', package: 'Starter', price: 899, status: 'active', nextBilling: '2025-02-15' }
        ];
      case 'silver':
        return [
          { service: 'Site Web', package: 'Business', price: 1599, status: 'active', nextBilling: '2025-02-15' },
          { service: 'Community Management', package: 'Basic', price: 199, status: 'active', nextBilling: '2025-02-15' }
        ];
      case 'gold':
        return [
          { service: 'Site Web', package: 'Business', price: 1599, status: 'active', nextBilling: '2025-02-15' },
          { service: 'Growth Hacking', package: 'Medium', price: 599, status: 'active', nextBilling: '2025-02-15' },
          { service: 'Community Management', package: 'Pro', price: 399, status: 'active', nextBilling: '2025-02-15' }
        ];
      case 'diamond':
        return [
          { service: 'Site Web', package: 'Premium E-commerce', price: 2999, status: 'active', nextBilling: '2025-02-15' },
          { service: 'Growth Hacking', package: 'High Performance', price: 1299, status: 'active', nextBilling: '2025-02-15' },
          { service: 'Community Management', package: 'Expert', price: 799, status: 'active', nextBilling: '2025-02-15' },
          { service: 'Consulting', package: 'Accompagnement', price: 1999, status: 'active', nextBilling: '2025-02-15' }
        ];
      default:
        return [];
    }
  };

  const getTierInfo = () => {
    const packages = getUserPackages();
    const totalValue = packages.reduce((sum, pkg) => sum + pkg.price, 0);
    
    if (totalValue >= 5000) return { name: 'Diamond', icon: Diamond, color: 'text-purple-600', bg: 'bg-purple-50' };
    if (totalValue >= 2000) return { name: 'Gold', icon: Crown, color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (totalValue >= 1000) return { name: 'Silver', icon: Rocket, color: 'text-gray-600', bg: 'bg-gray-50' };
    return { name: 'Bronze', icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50' };
  };

  const getInvoices = () => [
    { id: 'INV-2025-001', date: '2025-01-15', amount: getTierInfo().name === 'Diamond' ? 7096 : getTierInfo().name === 'Gold' ? 2597 : getTierInfo().name === 'Silver' ? 1798 : 899, status: 'paid' },
    { id: 'INV-2024-012', date: '2024-12-15', amount: getTierInfo().name === 'Diamond' ? 7096 : getTierInfo().name === 'Gold' ? 2597 : getTierInfo().name === 'Silver' ? 1798 : 899, status: 'paid' },
    { id: 'INV-2024-011', date: '2024-11-15', amount: getTierInfo().name === 'Diamond' ? 7096 : getTierInfo().name === 'Gold' ? 2597 : getTierInfo().name === 'Silver' ? 1798 : 899, status: 'paid' }
  ];

  const tierInfo = getTierInfo();
  const TierIcon = tierInfo.icon;
  const packages = getUserPackages();
  const invoices = getInvoices();

  const renderProfile = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Informations personnelles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName">Prénom</Label>
              <Input id="firstName" defaultValue={userData?.name?.split(' ')[0] || 'Jean'} />
            </div>
            <div>
              <Label htmlFor="lastName">Nom</Label>
              <Input id="lastName" defaultValue={userData?.name?.split(' ')[1] || 'Dupont'} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={userData?.email || ''} />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" defaultValue="+33 1 23 45 67 89" />
            </div>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Edit className="w-4 h-4 mr-2" />
            Mettre à jour
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Informations entreprise
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="company">Nom de l'entreprise</Label>
              <Input id="company" defaultValue="Ma Startup SAS" />
            </div>
            <div>
              <Label htmlFor="siret">SIRET</Label>
              <Input id="siret" defaultValue="12345678901234" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Adresse</Label>
              <Input id="address" defaultValue="123 Rue de la Innovation, 75001 Paris" />
            </div>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Edit className="w-4 h-4 mr-2" />
            Mettre à jour
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderPlan = () => (
    <div className="space-y-6">
      <Card className={`${tierInfo.bg} border-2`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <TierIcon className={`w-12 h-12 ${tierInfo.color}`} />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Plan {tierInfo.name}</h3>
                <p className="text-gray-600">Votre niveau actuel</p>
              </div>
            </div>
            <Badge className={`${tierInfo.color} text-lg px-4 py-2`}>
              {packages.length} service{packages.length > 1 ? 's' : ''} actif{packages.length > 1 ? 's' : ''}
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Vos services actifs :</h4>
              <div className="space-y-2">
                {packages.map((pkg, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium">{pkg.service}</p>
                      <p className="text-sm text-gray-600">{pkg.package}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{pkg.price}€</p>
                      <Badge className="bg-green-100 text-green-800 text-xs">Actif</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Prochaine facturation :</h4>
              <div className="p-4 bg-white rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">15 février 2025</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {packages.reduce((sum, pkg) => sum + pkg.price, 0).toLocaleString()}€
                </p>
                <p className="text-sm text-gray-600">Facturation mensuelle</p>
              </div>
              
              <div className="mt-4 space-y-2">
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  <Zap className="w-4 h-4 mr-2" />
                  Upgrade vers un plan supérieur
                </Button>
                <Button variant="outline" className="w-full">
                  Voir tous les plans
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggestions d'upgrade */}
      {tierInfo.name !== 'Diamond' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Optimisez votre plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">
                🚀 Passez au niveau supérieur et économisez !
              </h4>
              <p className="text-gray-600 mb-4">
                Débloquez de nouvelles fonctionnalités et bénéficiez de tarifs préférentiels.
              </p>
              <div className="flex gap-3">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                  Voir les upgrades
                </Button>
                <Button variant="outline">
                  Parler à un conseiller
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Mode de paiement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 1234</p>
                <p className="text-sm text-gray-600">Expire 12/26</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Historique des factures
            </span>
            <Button variant="outline" size="sm">
              Télécharger tout
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-gray-600">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{invoice.amount.toLocaleString()}€</p>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    Payée
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  PDF
                </Button>
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
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Sécurité du compte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="currentPassword">Mot de passe actuel</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div>
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600">
            Changer le mot de passe
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            'Nouvelles factures',
            'Mises à jour produits',
            'Rapports mensuels',
            'Alertes sécurité'
          ].map((notif, index) => (
            <div key={index} className="flex items-center justify-between">
              <span>{notif}</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mon Compte 👤</h1>
            <p className="text-gray-600">Gérez vos informations et préférences</p>
          </div>
        </div>

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
            <Crown className="w-4 h-4" />
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

        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'plan' && renderPlan()}
        {activeTab === 'billing' && renderBilling()}
        {activeTab === 'security' && renderSecurity()}
      </div>
    </DashboardLayout>
  );
};

export default Account;
