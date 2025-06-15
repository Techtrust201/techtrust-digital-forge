
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MoreHorizontal, Edit, Mail, Ban } from 'lucide-react';
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

interface User {
  id: string; // Changed from number to string to match the system
  name?: string;
  email?: string;
  role?: string;
  packages?: string[];
  status: string;
  created: string;
  lastLogin?: string;
  tier: string;
}

interface UsersTableProps {
  users: User[];
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
  searchTerm,
  onSearchChange,
  getPageDescription,
  getPackageById,
  getPackageColor,
  getStatusColor,
  getStatusLabel,
  onEditUser
}) => {
  return (
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
                      <span className="text-white font-medium text-sm">{user.name?.charAt(0) || 'U'}</span>
                    </div>
                    <div>
                      <div className="font-medium">{user.name || 'Utilisateur'}</div>
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
                    {user.packages?.map((packageId: string) => {
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
                <TableCell>{user.lastLogin || 'Récemment'}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
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
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UsersTable;
