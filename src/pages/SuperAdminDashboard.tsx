
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Shield, 
  Crown, 
  Search, 
  Filter,
  Settings,
  Mail,
  Phone,
  Building,
  Calendar,
  Package,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import UserPackageManager from '@/components/admin/UserPackageManager';
import CreateSuperAdminModal from '@/components/admin/CreateSuperAdminModal';

interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  industry?: string;
  tier: string;
  status: string;
  created_at: string;
  subscriptions?: any[];
  roles?: string[];
}

const SuperAdminDashboard = () => {
  const { isAuthenticated, isLoading: authLoading, isAdmin, user } = useSupabaseAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showPackageManager, setShowPackageManager] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    premiumUsers: 0,
    newThisMonth: 0
  });

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchUsers();
    }
  }, [isAuthenticated, isAdmin]);

  if (authLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Chargement...</p>
      </div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Récupérer les profils utilisateurs
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Récupérer les souscriptions pour chaque utilisateur
      const { data: subscriptions, error: subscriptionsError } = await supabase
        .from('user_subscriptions')
        .select('*');

      if (subscriptionsError) throw subscriptionsError;

      // Récupérer les rôles utilisateurs
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      // Combiner les données
      const usersWithData = profiles?.map(profile => {
        const userSubscriptions = subscriptions?.filter(sub => sub.user_id === profile.id) || [];
        const userRoles = roles?.filter(role => role.userId === profile.id).map(role => role.role) || [];
        
        return {
          ...profile,
          subscriptions: userSubscriptions,
          roles: userRoles
        };
      }) || [];

      setUsers(usersWithData);

      // Calculer les statistiques
      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      setStats({
        totalUsers: usersWithData.length,
        activeUsers: usersWithData.filter(u => u.status === 'active').length,
        premiumUsers: usersWithData.filter(u => u.subscriptions && u.subscriptions.length > 0).length,
        newThisMonth: usersWithData.filter(u => new Date(u.created_at) >= thisMonth).length
      });

    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'bg-amber-100 text-amber-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'diamond': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openPackageManager = (user: UserProfile) => {
    setSelectedUser(user);
    setShowPackageManager(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Shield className="w-8 h-8 text-red-600" />
                Super Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Gestion des utilisateurs et packages</p>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Créer Admin
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Utilisateurs Total', value: stats.totalUsers, icon: Users, color: 'blue' },
            { title: 'Utilisateurs Actifs', value: stats.activeUsers, icon: Shield, color: 'green' },
            { title: 'Utilisateurs Premium', value: stats.premiumUsers, icon: Crown, color: 'yellow' },
            { title: 'Nouveaux ce mois', value: stats.newThisMonth, icon: Calendar, color: 'purple' }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filtres et recherche */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par nom, email ou entreprise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="pending">En attente</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des utilisateurs */}
        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs ({filteredUsers.length})</CardTitle>
            <CardDescription>
              Gérez les utilisateurs et leurs packages
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Chargement des utilisateurs...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-red-100 text-red-600">
                          {user.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{user.name || 'Sans nom'}</h3>
                          <Badge className={getTierColor(user.tier)}>
                            {user.tier}
                          </Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          {user.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </div>
                          )}
                          {user.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {user.phone}
                            </div>
                          )}
                          {user.company && (
                            <div className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              {user.company}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <Package className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {user.subscriptions?.length || 0} package(s) actif(s)
                          </span>
                          {user.roles && user.roles.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {user.roles.join(', ')}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPackageManager(user)}
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Packages
                      </Button>
                    </div>
                  </motion.div>
                ))}
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Aucun utilisateur trouvé</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Package Manager Modal */}
      {showPackageManager && selectedUser && (
        <UserPackageManager
          user={selectedUser}
          isOpen={showPackageManager}
          onClose={() => {
            setShowPackageManager(false);
            setSelectedUser(null);
            fetchUsers(); // Recharger les données
          }}
        />
      )}

      {/* Create Super Admin Modal */}
      <CreateSuperAdminModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={fetchUsers}
      />
    </div>
  );
};

export default SuperAdminDashboard;
