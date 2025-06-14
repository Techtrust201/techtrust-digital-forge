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
  Calendar,
  X,
  Plus
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const AdminUsersPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editingPackages, setEditingPackages] = useState<string[]>([]);

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

  const getFilteredUsers = () => {
    const path = location.pathname;
    
    if (path.includes('/new')) {
      return [
        {
          id: 1,
          name: 'Marie Dubois',
          email: 'marie.dubois@email.com',
          role: 'client',
          packages: ['website-business', 'growth-pro'],
          status: 'pending',
          created: '2024-01-20',
          lastLogin: 'Jamais'
        },
        {
          id: 2,
          name: 'Jean Durand',
          email: 'jean.durand@email.com',
          role: 'client',
          packages: ['community-starter'],
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
          packages: ['community-starter', 'custom-audit'],
          status: 'suspended',
          created: '2024-01-05',
          lastLogin: '2024-01-18'
        },
        {
          id: 4,
          name: 'Paul Moreau',
          email: 'paul.moreau@email.com',
          role: 'client',
          packages: ['website-starter'],
          status: 'suspended',
          created: '2023-12-15',
          lastLogin: '2024-01-10'
        }
      ];
    }
    
    return [
      {
        id: 1,
        name: 'Marie Dubois',
        email: 'marie.dubois@email.com',
        role: 'client',
        packages: ['website-business', 'growth-pro'],
        status: 'active',
        created: '2024-01-15',
        lastLogin: '2024-01-20'
      },
      {
        id: 2,
        name: 'Pierre Martin',
        email: 'pierre.martin@email.com',
        role: 'client',
        packages: ['growth-pro', 'community-premium'],
        status: 'active',
        created: '2024-01-10',
        lastLogin: '2024-01-19'
      },
      {
        id: 3,
        name: 'Sophie Laurent',
        email: 'sophie.laurent@email.com',
        role: 'client',
        packages: ['community-premium'],
        status: 'suspended',
        created: '2024-01-05',
        lastLogin: '2024-01-18'
      }
    ];
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/new')) return 'Nouveaux comptes';
    if (path.includes('/suspended')) return 'Comptes suspendus';
    if (path.includes('/create')) return 'Créer un compte';
    return 'Tous les utilisateurs';
  };

  const getPageDescription = () => {
    const path = location.pathname;
    if (path.includes('/new')) return 'Comptes créés récemment en attente de validation';
    if (path.includes('/suspended')) return 'Comptes suspendus temporairement ou définitivement';
    if (path.includes('/create')) return 'Créer un nouveau compte utilisateur';
    return 'Gérez tous vos utilisateurs et leurs accès';
  };

  const users = getFilteredUsers();

  const getAllPackages = () => {
    const allPackages: any[] = [];
    Object.entries(packagesData).forEach(([categoryKey, category]) => {
      category.packages.forEach(pkg => {
        allPackages.push({
          ...pkg,
          category: category.title,
          categoryKey
        });
      });
    });
    return allPackages;
  };

  const getPackageById = (packageId: string) => {
    const allPackages = getAllPackages();
    return allPackages.find(pkg => pkg.id === packageId);
  };

  const getPackageColor = (categoryKey: string) => {
    switch (categoryKey) {
      case 'website': return 'bg-blue-100 text-blue-800';
      case 'growth': return 'bg-green-100 text-green-800';
      case 'community': return 'bg-orange-100 text-orange-800';
      case 'custom': return 'bg-purple-100 text-purple-800';
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

  const addPackage = (packageId: string, isEditing: boolean = false) => {
    if (isEditing) {
      if (!editingPackages.includes(packageId)) {
        setEditingPackages([...editingPackages, packageId]);
      }
    } else {
      if (!selectedPackages.includes(packageId)) {
        setSelectedPackages([...selectedPackages, packageId]);
      }
    }
  };

  const removePackage = (packageId: string, isEditing: boolean = false) => {
    if (isEditing) {
      setEditingPackages(editingPackages.filter(id => id !== packageId));
    } else {
      setSelectedPackages(selectedPackages.filter(id => id !== packageId));
    }
  };

  const getTotalPrice = (packageIds: string[]) => {
    return packageIds.reduce((total, packageId) => {
      const pkg = getPackageById(packageId);
      return total + (pkg?.price || 0);
    }, 0);
  };

  const openEditDialog = (user: any) => {
    setEditingUser(user);
    setEditingPackages([...user.packages]);
  };

  const saveUserPackages = () => {
    // Ici, vous intégrerais la logique pour sauvegarder les modifications
    console.log('Sauvegarde des formules pour', editingUser.name, ':', editingPackages);
    setEditingUser(null);
    setEditingPackages([]);
  };

  // Si on est sur la page de création
  if (location.pathname.includes('/create')) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
            <p className="text-gray-500 mt-2">{getPageDescription()}</p>
          </div>

          <Card className="max-w-4xl">
            <CardHeader>
              <CardTitle>Nouveau compte utilisateur</CardTitle>
              <CardDescription>Créez un nouveau compte pour un client avec une ou plusieurs formules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                <label className="text-sm font-medium">Formules sélectionnées</label>
                <div className="mt-2 space-y-4">
                  {selectedPackages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedPackages.map((packageId) => {
                        const pkg = getPackageById(packageId);
                        if (!pkg) return null;
                        return (
                          <Badge 
                            key={packageId} 
                            className={`${getPackageColor(pkg.categoryKey)} flex items-center gap-1`}
                          >
                            {pkg.category} - {pkg.name} ({pkg.price}€{pkg.duration || ''})
                            <X 
                              className="w-3 h-3 cursor-pointer" 
                              onClick={() => removePackage(packageId)}
                            />
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                  
                  <Select onValueChange={(value) => addPackage(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ajouter une formule..." />
                    </SelectTrigger>
                    <SelectContent>
                      {getAllPackages().map((pkg) => (
                        <SelectItem 
                          key={pkg.id} 
                          value={pkg.id}
                          disabled={selectedPackages.includes(pkg.id)}
                        >
                          {pkg.category} - {pkg.name} ({pkg.price}€{pkg.duration || ''})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedPackages.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Récapitulatif des formules</h4>
                  <div className="space-y-2">
                    {selectedPackages.map((packageId) => {
                      const pkg = getPackageById(packageId);
                      if (!pkg) return null;
                      return (
                        <div key={packageId} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="text-gray-600">{pkg.category}</span>
                            <span className="font-medium ml-2">{pkg.name}</span>
                          </div>
                          <span className="font-bold text-red-600">
                            {pkg.price}€{pkg.duration || ''}
                          </span>
                        </div>
                      );
                    })}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between items-center font-bold">
                        <span>Total :</span>
                        <span className="text-red-600 text-lg">
                          {getTotalPrice(selectedPackages)}€
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button className="bg-red-500 hover:bg-red-600" disabled={selectedPackages.length === 0}>
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
                  <TableHead>Formules</TableHead>
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
                      <div className="flex flex-wrap gap-1">
                        {user.packages.map((packageId: string) => {
                          const pkg = getPackageById(packageId);
                          if (!pkg) return null;
                          return (
                            <Badge 
                              key={packageId}
                              className={`${getPackageColor(pkg.categoryKey)} text-xs`}
                            >
                              {pkg.name}
                            </Badge>
                          );
                        })}
                      </div>
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
                          <DropdownMenuItem onClick={() => openEditDialog(user)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier les formules
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

        <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Modifier les formules - {editingUser?.name}</DialogTitle>
              <DialogDescription>
                Ajoutez ou supprimez des formules pour ce client
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Formules actuelles</label>
                <div className="mt-2 space-y-4">
                  {editingPackages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {editingPackages.map((packageId) => {
                        const pkg = getPackageById(packageId);
                        if (!pkg) return null;
                        return (
                          <Badge 
                            key={packageId} 
                            className={`${getPackageColor(pkg.categoryKey)} flex items-center gap-1`}
                          >
                            {pkg.category} - {pkg.name} ({pkg.price}€{pkg.duration || ''})
                            <X 
                              className="w-3 h-3 cursor-pointer" 
                              onClick={() => removePackage(packageId, true)}
                            />
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                  
                  <Select onValueChange={(value) => addPackage(value, true)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ajouter une formule..." />
                    </SelectTrigger>
                    <SelectContent>
                      {getAllPackages().map((pkg) => (
                        <SelectItem 
                          key={pkg.id} 
                          value={pkg.id}
                          disabled={editingPackages.includes(pkg.id)}
                        >
                          {pkg.category} - {pkg.name} ({pkg.price}€{pkg.duration || ''})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {editingPackages.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Nouveau total</h4>
                  <div className="space-y-2">
                    {editingPackages.map((packageId) => {
                      const pkg = getPackageById(packageId);
                      if (!pkg) return null;
                      return (
                        <div key={packageId} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="text-gray-600">{pkg.category}</span>
                            <span className="font-medium ml-2">{pkg.name}</span>
                          </div>
                          <span className="font-bold text-red-600">
                            {pkg.price}€{pkg.duration || ''}
                          </span>
                        </div>
                      );
                    })}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between items-center font-bold">
                        <span>Total :</span>
                        <span className="text-red-600 text-lg">
                          {getTotalPrice(editingPackages)}€
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditingUser(null)}>
                Annuler
              </Button>
              <Button className="bg-red-500 hover:bg-red-600" onClick={saveUserPackages}>
                Sauvegarder
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
