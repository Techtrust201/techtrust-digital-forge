
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Shield,
  Rocket,
  Crown,
  Diamond,
  UserPlus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Mail,
  Phone
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userData, setUserData] = useState<any>(null);
  
  // Données simulées pour l'admin
  const [adminStats] = useState({
    totalUsers: 1247,
    activeProjects: 89,
    monthlyRevenue: 45670,
    conversionRate: 12.4
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Marie Dubois',
      email: 'marie@entreprise.com',
      tier: 'gold',
      status: 'active',
      joinDate: '2024-01-15',
      revenue: 2597,
      services: ['site-web', 'growth-hacking', 'community-management']
    },
    {
      id: 2,
      name: 'Pierre Martin',
      email: 'pierre@startup.fr',
      tier: 'silver',
      status: 'trial',
      joinDate: '2024-01-14',
      revenue: 1798,
      services: ['site-web', 'community-management']
    },
    {
      id: 3,
      name: 'Sophie Lefebvre',
      email: 'sophie@shop.com',
      tier: 'bronze',
      status: 'active',
      joinDate: '2024-01-13',
      revenue: 899,
      services: ['site-web']
    },
    {
      id: 4,
      name: 'Thomas Wilson',
      email: 'thomas@wilson.com',
      tier: 'diamond',
      status: 'active',
      joinDate: '2024-01-10',
      revenue: 7096,
      services: ['site-web', 'growth-hacking', 'community-management', 'consulting']
    }
  ]);

  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: 'Les tendances Growth Hacking 2025',
      author: 'Admin Techtrust',
      status: 'published',
      date: '2025-01-15',
      views: 1250
    },
    {
      id: 2,
      title: 'Comment optimiser son site pour 2025',
      author: 'Admin Techtrust', 
      status: 'draft',
      date: '2025-01-14',
      views: 0
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    tier: 'bronze',
    services: []
  });

  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    status: 'draft'
  });

  useEffect(() => {
    const user = localStorage.getItem('techtrust_user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      
      // Vérifier si l'utilisateur est admin
      if (parsedUser.role !== 'admin') {
        window.location.href = '/dashboard';
      }
    } else {
      window.location.href = '/auth';
    }
  }, []);

  // Fonctions utilitaires
  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return { icon: Shield, name: 'Bronze', color: 'text-amber-600', bgColor: 'bg-amber-50' };
      case 'silver':
        return { icon: Rocket, name: 'Silver', color: 'text-gray-600', bgColor: 'bg-gray-50' };
      case 'gold':
        return { icon: Crown, name: 'Gold', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
      case 'diamond':
        return { icon: Diamond, name: 'Diamond', color: 'text-purple-600', bgColor: 'bg-purple-50' };
      default:
        return { icon: Shield, name: 'Bronze', color: 'text-amber-600', bgColor: 'bg-amber-50' };
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Actif' };
      case 'trial':
        return { icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Essai' };
      case 'suspended':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', label: 'Suspendu' };
      default:
        return { icon: CheckCircle, color: 'text-gray-600', bg: 'bg-gray-50', label: 'Inconnu' };
    }
  };

  // Gestionnaires d'événements
  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }
    
    const user = {
      id: users.length + 1,
      ...newUser,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      revenue: newUser.tier === 'diamond' ? 7096 : newUser.tier === 'gold' ? 2597 : newUser.tier === 'silver' ? 1798 : 899
    };
    
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', tier: 'bronze', services: [] });
    alert('✅ Utilisateur créé avec succès !');
  };

  const handleCreateBlogPost = () => {
    if (!newBlogPost.title || !newBlogPost.content) {
      alert('Veuillez remplir le titre et le contenu');
      return;
    }
    
    const post = {
      id: blogPosts.length + 1,
      ...newBlogPost,
      author: 'Admin Techtrust',
      date: new Date().toISOString().split('T')[0],
      views: 0
    };
    
    setBlogPosts([...blogPosts, post]);
    setNewBlogPost({ title: '', content: '', excerpt: '', status: 'draft' });
    alert('✅ Article de blog créé avec succès !');
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== userId));
      alert('✅ Utilisateur supprimé');
    }
  };

  const handleSuspendUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'suspended' ? 'active' : 'suspended' }
        : user
    ));
  };

  // Rendu des sections
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Tableau de bord Admin 🔧
          </h1>
          <p className="text-gray-600">
            Vue d'ensemble de la plateforme Techtrust
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => setActiveSection('users')}
            className="bg-green-500 hover:bg-green-600"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Nouveau client
          </Button>
          <Badge className="bg-red-100 text-red-800">
            Admin
          </Badge>
        </div>
      </div>

      {/* Stats principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-500" />
              <Badge variant="outline" className="text-green-600 border-green-200">
                +12%
              </Badge>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">{adminStats.totalUsers.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Utilisateurs total</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-green-500" />
              <Badge variant="outline" className="text-green-600 border-green-200">
                +8%
              </Badge>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">{adminStats.activeProjects}</h3>
              <p className="text-sm text-gray-600">Projets actifs</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-yellow-500" />
              <Badge variant="outline" className="text-green-600 border-green-200">
                +15%
              </Badge>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">{adminStats.monthlyRevenue.toLocaleString()}€</h3>
              <p className="text-sm text-gray-600">Revenus mensuels</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <Badge variant="outline" className="text-green-600 border-green-200">
                +2.1%
              </Badge>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">{adminStats.conversionRate}%</h3>
              <p className="text-sm text-gray-600">Taux de conversion</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <Button 
              onClick={() => setActiveSection('users')}
              variant="outline" 
              className="h-20 flex-col gap-2"
            >
              <UserPlus className="w-6 h-6 text-blue-500" />
              <span>Créer un compte client</span>
            </Button>
            <Button 
              onClick={() => setActiveSection('analytics')}
              variant="outline" 
              className="h-20 flex-col gap-2"
            >
              <TrendingUp className="w-6 h-6 text-green-500" />
              <span>Voir les performances</span>
            </Button>
            <Button 
              onClick={() => setActiveSection('blog')}
              variant="outline" 
              className="h-20 flex-col gap-2"
            >
              <Edit className="w-6 h-6 text-purple-500" />
              <span>Créer un article</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => alert('Rapport généré ! 📊')}
            >
              <Download className="w-6 h-6 text-orange-500" />
              <span>Générer un rapport</span>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertes Système</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 mt-0.5 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">Serveur de backup à 85%</p>
                <p className="text-xs text-gray-500 mt-1">Il y a 30 min</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 mt-0.5 text-green-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">Mise à jour IA déployée</p>
                <p className="text-xs text-gray-500 mt-1">Il y a 2h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h2>
          <p className="text-gray-600">Gérer tous les comptes clients</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setActiveSection('users-create')}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau client
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tous les utilisateurs ({users.length})</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Rechercher..." className="pl-9" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => {
              const tierInfo = getTierInfo(user.tier);
              const statusInfo = getStatusInfo(user.status);
              const TierIcon = tierInfo.icon;
              const StatusIcon = statusInfo.icon;
              
              return (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`${tierInfo.color} ${tierInfo.bgColor} border-0 text-xs`}>
                          <TierIcon className="w-3 h-3 mr-1" />
                          {tierInfo.name}
                        </Badge>
                        <Badge className={`${statusInfo.color} ${statusInfo.bg} border-0 text-xs`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{user.revenue}€/mois</p>
                    <p className="text-sm text-gray-500">{user.services.length} service{user.services.length > 1 ? 's' : ''}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSuspendUser(user.id)}
                      className={user.status === 'suspended' ? 'text-green-600' : 'text-orange-600'}
                    >
                      {user.status === 'suspended' ? 'Réactiver' : 'Suspendre'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCreateUser = () => (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => setActiveSection('users')}
          className="mb-4"
        >
          ← Retour à la liste
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Créer un nouveau client</h2>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                placeholder="Jean Dupont"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                placeholder="jean@entreprise.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tier">Plan</Label>
            <select
              id="tier"
              value={newUser.tier}
              onChange={(e) => setNewUser({...newUser, tier: e.target.value})}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="bronze">Bronze (899€)</option>
              <option value="silver">Silver (1798€)</option>
              <option value="gold">Gold (2597€)</option>
              <option value="diamond">Diamond (7096€)</option>
            </select>
          </div>

          <div>
            <Label>Services inclus</Label>
            <div className="grid md:grid-cols-2 gap-2 mt-2">
              {['site-web', 'growth-hacking', 'community-management', 'consulting'].map((service) => (
                <label key={service} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newUser.services.includes(service)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewUser({...newUser, services: [...newUser.services, service]});
                      } else {
                        setNewUser({...newUser, services: newUser.services.filter(s => s !== service)});
                      }
                    }}
                  />
                  <span className="text-sm capitalize">{service.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleCreateUser}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              Créer le client
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setActiveSection('users')}
              className="flex-1"
            >
              Annuler
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBlog = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion du Blog</h2>
          <p className="text-gray-600">Créer et gérer les articles de blog</p>
        </div>
        <Button 
          onClick={() => setActiveSection('blog-create')}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvel article
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Articles de blog ({blogPosts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{post.title}</h4>
                  <p className="text-sm text-gray-600">{post.author} • {post.date}</p>
                  <Badge className={post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {post.status === 'published' ? 'Publié' : 'Brouillon'}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{post.views} vues</p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCreateBlog = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => setActiveSection('blog')}
          className="mb-4"
        >
          ← Retour aux articles
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Créer un nouvel article</h2>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="title">Titre de l'article *</Label>
            <Input
              id="title"
              value={newBlogPost.title}
              onChange={(e) => setNewBlogPost({...newBlogPost, title: e.target.value})}
              placeholder="Les nouvelles tendances du marketing digital..."
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Extrait</Label>
            <Textarea
              id="excerpt"
              value={newBlogPost.excerpt}
              onChange={(e) => setNewBlogPost({...newBlogPost, excerpt: e.target.value})}
              placeholder="Résumé court de l'article..."
              className="h-20"
            />
          </div>

          <div>
            <Label htmlFor="content">Contenu de l'article *</Label>
            <Textarea
              id="content"
              value={newBlogPost.content}
              onChange={(e) => setNewBlogPost({...newBlogPost, content: e.target.value})}
              placeholder="Rédigez votre article ici..."
              className="h-64"
            />
          </div>

          <div>
            <Label htmlFor="status">Statut</Label>
            <select
              id="status"
              value={newBlogPost.status}
              onChange={(e) => setNewBlogPost({...newBlogPost, status: e.target.value})}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Brouillon</option>
              <option value="published">Publier immédiatement</option>
            </select>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleCreateBlogPost}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              {newBlogPost.status === 'published' ? 'Publier l\'article' : 'Enregistrer en brouillon'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setActiveSection('blog')}
              className="flex-1"
            >
              Annuler
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (!userData) {
    return <div>Chargement...</div>;
  }

  return (
    <AdminLayout>
      {/* Contenu selon la section active */}
      {activeSection === 'dashboard' && renderDashboard()}
      {activeSection === 'users' && renderUsers()}
      {activeSection === 'users-create' && renderCreateUser()}
      {activeSection === 'analytics' && (
        <div className="text-center py-16">
          <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Analytics Global</h3>
          <p className="text-gray-600">Statistiques et performances globales de la plateforme</p>
        </div>
      )}
      {activeSection === 'blog' && renderBlog()}
      {activeSection === 'blog-create' && renderCreateBlog()}
      {activeSection === 'campaigns' && (
        <div className="text-center py-16">
          <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Gestion des Campagnes</h3>
          <p className="text-gray-600">Gérer toutes les campagnes marketing de la plateforme</p>
        </div>
      )}
      {activeSection === 'billing' && (
        <div className="text-center py-16">
          <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Facturation</h3>
          <p className="text-gray-600">Gérer la facturation et les paiements</p>
        </div>
      )}
      {activeSection === 'system' && (
        <div className="text-center py-16">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Configuration Système</h3>
          <p className="text-gray-600">Paramètres système et sécurité</p>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
