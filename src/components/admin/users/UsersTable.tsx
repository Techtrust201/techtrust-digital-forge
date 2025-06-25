
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MoreHorizontal, Edit, Mail, Ban, Clock, X, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserInvitations } from '@/hooks/useUserInvitations';
import UserDetailsModal from './UserDetailsModal';
import { toast } from 'sonner';

interface User {
  id: number | string;
  name: string;
  email: string;
  role: string;
  packages: string[];
  status: string;
  created: string;
  lastLogin: string;
  type?: 'user' | 'invitation';
}

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  error: any;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  getPageDescription: () => string;
  getPackageById: (packageId: string) => any;
  getPackageColor: (categoryKey: string) => string;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
  onEditUser: (user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  isLoading,
  error,
  searchTerm,
  onSearchChange,
  getPageDescription,
  getPackageById,
  getPackageColor,
  getStatusColor,
  getStatusLabel,
  onEditUser
}) => {
  const { cancelInvitation } = useUserInvitations();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleCancelInvitation = async (userId: string) => {
    if (userId.startsWith('invitation_')) {
      const invitationId = userId.replace('invitation_', '');
      const result = await cancelInvitation(invitationId);
      if (result.success) {
        window.location.reload();
      }
    }
  };

  const handleViewDetails = (userId: string) => {
    setSelectedUserId(userId);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs</CardTitle>
          <CardDescription>Chargement...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-8">
            <div className="text-gray-500">Chargement des utilisateurs...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs</CardTitle>
          <CardDescription>Erreur lors du chargement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-8">
            <div className="text-red-500">Erreur: {error.message || 'Une erreur est survenue'}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Liste des utilisateurs ({users.length})</CardTitle>
              <CardDescription>{getPageDescription()}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher un utilisateur..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
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
                <TableHead>Type</TableHead>
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
                    <Badge className={user.type === 'invitation' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                      {user.type === 'invitation' ? (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Invitation
                        </div>
                      ) : (
                        'Compte actif'
                      )}
                    </Badge>
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
                        {user.type === 'user' ? (
                          <>
                            <DropdownMenuItem onClick={() => handleViewDetails(user.id.toString())}>
                              <Eye className="w-4 h-4 mr-2" />
                              Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEditUser(user)}>
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
                          </>
                        ) : (
                          <>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Renvoyer l'invitation
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleCancelInvitation(user.id.toString())}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Annuler l'invitation
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <UserDetailsModal
        isOpen={!!selectedUserId}
        onClose={() => setSelectedUserId(null)}
        userId={selectedUserId}
        onEditUser={onEditUser}
      />
    </>
  );
};

export default UsersTable;
