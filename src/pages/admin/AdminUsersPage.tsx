
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  MoreHorizontal,
  Edit,
  Ban,
  UserCheck,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AdminUsersPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');

  // Packages data matching the pricing page
  const packagesData = {
    website: {
      title: "Création Site Web",
      packages: [
        { id: "website-starter", name: "Starter", price: 899 },
        { id: "website-business", name: "Business", price: 1599 },
        { id: "website-premium", name: "Premium E-commerce", price: 2999 }
      ]
    },
    growth: {
      title: "Growth Hacking IA",
      packages: [
        { id: "growth-easy", name: "Easy", price: 299, duration: "/mois" },
        { id: "growth-pro", name: "Pro", price: 599, duration: "/mois" },
        { id: "growth-enterprise", name: "Enterprise", price: 1299, duration: "/mois" }
      ]
    },
    community: {
      title: "Community Management",
      packages: [
        { id: "community-starter", name: "Starter", price: 799, duration: "/mois" },
        { id: "community-growth", name: "Growth", price: 1499, duration: "/mois" },
        { id: "community-premium", name: "Premium", price: 2999, duration: "/mois" }
      ]
    },
    custom: {
      title: "Solutions Sur Mesure",
      packages: [
        { id: "custom-audit", name: "Audit & Conseil", price: 1500 },
        { id: "custom-app", name: "Application Sur Mesure", price: 15000 },
        { id: "custom-enterprise", name: "Solution Enterprise", price: 50000 }
      ]
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/new')) return 'Nouveaux comptes';
    if (path.includes('/suspended')) return 'Comptes suspendus';
    if (path.includes('/create')) return 'Créer un compte';
    return 'Tous les utilisateurs';
  };

  const getFilteredUsers = () => {
    const path = location.pathname;
    
    if (path.includes('/new')) {
      return [
        {
          id: 1,
          name: 'Marie Dubois',
          email: 'marie.dubois@email.com',
          role: 'client',
          package: 'Website Business',
          category: 'Création Site Web',
          status: 'pending',
          created: '2024-01-20',
          lastLogin: 'Jamais'
        },
        {
          id: 2,
          name: 'Jean Durand',
          email: 'jean.durand@email.com',
          role: 'client',
          package: 'Growth Pro',
          category: 'Growth Hacking IA',
          status: 'pending',
          created: '2024-01-19',
          lastLogin: 'Jamais'
        }
      ];
    }
    
    if (path.includes('/suspended')) {
      return [
        {
          id: 3,
          name: 'Sophie Laurent',
          email: 'sophie.laurent@email.com',
          role: 'client',
          package: 'Community Starter',
          category: 'Community Management',
          status: 'suspended',
          created: '2024-01-05',
          lastLogin: '2024-01-18'
        },
        {
          id: 4,
          name: 'Paul Moreau',
          email: 'paul.moreau@email.com',
          role: 'client',
          package: 'Website Starter',
          category: 'Création Site Web',
          status: 'suspended',
          created: '2023-12-15',
          lastLogin: '2024-01-10'
        }
      ];
    }
    
    // Tous les utilisateurs par défaut
    return [
      {
        id: 1,
        name: 'Marie Dubois',
        email: 'marie.dubois@email.com',
        role: 'client',
        package: 'Website Business',
        category: 'Création Site Web',
        status: 'active',
        created: '2024-01-15',
        lastLogin: '2024-01-20'
      },
      {
        id: 2,
        name: 'Pierre Martin',
        email: 'pierre.martin@email.com',
        role: 'client',
        package: 'Growth Pro',
        category: 'Growth Hacking IA',
        status: 'active',
        created: '2024-01-10',
        lastLogin: '2024-01-19'
      },
      {
        id: 3,
        name: 'Sophie Laurent',
        email: 'sophie.laurent@email.com',
        role: 'client',
        package: 'Community Premium',
        category: 'Community Management',
        status: 'suspended',
        created: '2024-01-05',
        lastLogin: '2024-01-18'
      }
    ];
  };

  const getPageDescription = () => {
    const path = location.pathname;
    if (path.includes('/new')) return 'Comptes créés récemment en attente de validation';
    if (path.includes('/suspended')) return 'Comptes suspendus temporairement ou définitivement';
    if (path.includes('/create')) return 'Créer un nouveau compte utilisateur';
    return 'Gérez tous vos utilisateurs et leurs accès';
  };

  const users = getFilteredUsers();

  const getPackageColor = (category: string) => {
    switch (category) {
      case 'Création Site Web': return 'bg-blue-100 text-blue-800';
      case 'Growth Hacking IA': return 'bg-green-100 text-green-800';
      case 'Community Management': return 'bg-orange-100 text-orange-800';
      case 'Solutions Sur Mesure': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'suspended': return 'Suspendu';
      case 'pending': return 'En attente';
      default: return status;
    }
  };

  const getSelectedPackageData = () => {
    if (!selectedCategory || !selectedPackage) return null;
    const category = packagesData[selectedCategory];
    return category?.packages.find(pkg => pkg.id === selectedPackage);
  };

  // Si on est sur la page de création
  if (location.pathname.includes('/create')) {
    const selectedPackageData = getSelectedPackageData();

    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
            <p className="text-gray-500 mt-2">{getPageDescription()}</p>
          </div>

          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Nouveau compte utilisateur</CardTitle>
              <CardDescription>Créez un nouveau compte pour un client avec une formule spécifique</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Prénom</label>
                  <Input placeholder="Jean" />
                </div>
                <div>
                  <label className="text-sm font-medium">Nom</label>
                  <Input placeholder="Dupont" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input placeholder="jean.dupont@email.com" type="email" />
              </div>
              
              <div>
                <label className="text-sm font-medium">Catégorie de service</label>
                <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(packagesData).map(([key, category]) => (
                      <SelectItem key={key} value={key}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCategory && (
                <div>
                  <label className="text-sm font-medium">Formule</label>
                  <Select onValueChange={setSelectedPackage} value={selectedPackage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une formule" />
                    </SelectTrigger>
                    <SelectContent>
                      {packagesData[selectedCategory].packages.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.id}>
                          {pkg.name} - {pkg.price}€{pkg.duration || ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedPackageData && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Récapitulatif de la formule</h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">{packagesData[selectedCategory].title}</p>
                      <p className="font-medium">{selectedPackageData.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">
                        {selectedPackageData.price}€{selectedPackageData.duration || ''}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button className="bg-red-500 hover:bg-red-600" disabled={!selectedPackageData}>
                  Créer le compte
                </Button>
                <Button variant="outline">Annuler</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
            <p className="text-gray-500 mt-2">{getPageDescription()}</p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600">
            <UserPlus className="w-4 h-4 mr-2" />
            Nouveau client
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-gray-600">+12% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nouveaux ce mois</CardTitle>
              <UserPlus className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-gray-600">+5% vs mois dernier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Actifs aujourd'hui</CardTitle>
              <UserCheck className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-gray-600">27% du total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suspendus</CardTitle>
              <Ban className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-600">-2 cette semaine</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Liste des utilisateurs</CardTitle>
                <CardDescription>{getPageDescription()}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher un utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Formule</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Création</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>
                        {getStatusLabel(user.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{user.package}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPackageColor(user.category)}>
                        {user.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.created}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Contacter
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Ban className="w-4 h-4 mr-2" />
                            Suspendre
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
