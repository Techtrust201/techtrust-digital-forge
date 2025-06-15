
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Shield, Crown, Users, Settings, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface UserRole {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  role: 'super_admin' | 'admin' | 'manager' | 'employee' | 'client';
  assignedAt: string;
  assignedBy: string;
}

const AdminAuthRolesPage = () => {
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingRole, setEditingRole] = useState<UserRole | null>(null);
  const [newRoleDialog, setNewRoleDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    loadUserRoles();
  }, []);

  const loadUserRoles = async () => {
    setIsLoading(true);
    try {
      // Simuler des rôles utilisateur pour la démo
      const mockRoles: UserRole[] = [
        {
          id: 'role-1',
          userId: 'admin-1',
          userEmail: 'admin@techtrust.fr',
          userName: 'Admin Techtrust',
          role: 'super_admin',
          assignedAt: '2024-01-01T00:00:00Z',
          assignedBy: 'System'
        },
        {
          id: 'role-2',
          userId: 'manager-1',
          userEmail: 'manager@techtrust.fr',
          userName: 'Manager',
          role: 'manager',
          assignedAt: '2024-01-15T00:00:00Z',
          assignedBy: 'admin@techtrust.fr'
        },
        {
          id: 'role-3',
          userId: 'client-business-1',
          userEmail: 'business@techtrust.fr',
          userName: 'Client Business',
          role: 'client',
          assignedAt: '2024-01-20T00:00:00Z',
          assignedBy: 'admin@techtrust.fr'
        }
      ];
      
      setUserRoles(mockRoles);
    } catch (error) {
      console.error('Erreur lors du chargement des rôles:', error);
      toast.error('Erreur lors du chargement des rôles');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      setUserRoles(prev => 
        prev.map(ur => 
          ur.userId === userId 
            ? { ...ur, role: newRole as any, assignedAt: new Date().toISOString() }
            : ur
        )
      );
      toast.success('Rôle mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
      toast.error('Erreur lors de la mise à jour du rôle');
    }
  };

  const removeUserRole = async (userId: string) => {
    try {
      setUserRoles(prev => prev.filter(ur => ur.userId !== userId));
      toast.success('Rôle supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du rôle:', error);
      toast.error('Erreur lors de la suppression du rôle');
    }
  };

  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'super_admin':
        return { label: 'Super Admin', color: 'bg-red-100 text-red-800', icon: Crown };
      case 'admin':
        return { label: 'Admin', color: 'bg-purple-100 text-purple-800', icon: Shield };
      case 'manager':
        return { label: 'Manager', color: 'bg-blue-100 text-blue-800', icon: Users };
      case 'employee':
        return { label: 'Employé', color: 'bg-green-100 text-green-800', icon: Settings };
      case 'client':
        return { label: 'Client', color: 'bg-gray-100 text-gray-800', icon: Users };
      default:
        return { label: 'Inconnu', color: 'bg-gray-100 text-gray-800', icon: Users };
    }
  };

  const getRolePermissions = (role: string) => {
    switch (role) {
      case 'super_admin':
        return ['Accès complet', 'Gestion utilisateurs', 'Configuration système', 'Données sensibles'];
      case 'admin':
        return ['Gestion utilisateurs', 'Gestion contenu', 'Analytics', 'Facturation'];
      case 'manager':
        return ['Gestion équipe', 'Projets clients', 'Rapports', 'Support'];
      case 'employee':
        return ['Community management', 'Support client', 'Contenu basique'];
      case 'client':
        return ['Dashboard personnel', 'Consultation services', 'Support'];
      default:
        return [];
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rôles & Permissions</h1>
            <p className="text-gray-500 mt-2">
              Gérez les rôles utilisateur et leurs permissions
            </p>
          </div>
          
          <Dialog open={newRoleDialog} onOpenChange={setNewRoleDialog}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Assigner un rôle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assigner un nouveau rôle</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Utilisateur</label>
                  <Input 
                    placeholder="email@example.com"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Rôle</label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="employee">Employé</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    // Logique d'assignation
                    toast.success('Rôle assigné avec succès');
                    setNewRoleDialog(false);
                  }}
                >
                  Assigner le rôle
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats des rôles */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {['super_admin', 'admin', 'manager', 'employee', 'client'].map(role => {
            const count = userRoles.filter(ur => ur.role === role).length;
            const roleInfo = getRoleInfo(role);
            const RoleIcon = roleInfo.icon;
            
            return (
              <Card key={role}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{roleInfo.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{count}</p>
                    </div>
                    <RoleIcon className="w-6 h-6 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Liste des utilisateurs avec rôles */}
        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs et Rôles</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Chargement des rôles...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userRoles.map((userRole) => {
                  const roleInfo = getRoleInfo(userRole.role);
                  const permissions = getRolePermissions(userRole.role);
                  
                  return (
                    <div key={userRole.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {userRole.userName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{userRole.userName}</h3>
                            <p className="text-sm text-gray-600">{userRole.userEmail}</p>
                          </div>
                          <Badge className={roleInfo.color}>
                            {roleInfo.label}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingRole(userRole)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => removeUserRole(userRole.userId)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="ml-13">
                        <p className="text-xs text-gray-500 mb-2">
                          Assigné le {new Date(userRole.assignedAt).toLocaleDateString('fr-FR')} par {userRole.assignedBy}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {permissions.map(permission => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dialog d'édition de rôle */}
        <Dialog open={!!editingRole} onOpenChange={() => setEditingRole(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier le rôle de {editingRole?.userName}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nouveau rôle</label>
                <Select 
                  value={editingRole?.role} 
                  onValueChange={(value) => setEditingRole(prev => prev ? {...prev, role: value as any} : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="employee">Employé</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                className="w-full" 
                onClick={() => {
                  if (editingRole) {
                    updateUserRole(editingRole.userId, editingRole.role);
                    setEditingRole(null);
                  }
                }}
              >
                Mettre à jour le rôle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminAuthRolesPage;
