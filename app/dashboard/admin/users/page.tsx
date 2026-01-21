"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search,
  Plus,
  MoreVertical,
  Mail,
  Shield,
  Ban
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { 
      id: 1,
      name: 'Jean Dupont', 
      email: 'jean@example.com', 
      tier: 'Gold', 
      status: 'active',
      role: 'client',
      packages: 3,
      created: '15 Jan 2025'
    },
    { 
      id: 2,
      name: 'Marie Martin', 
      email: 'marie@example.com', 
      tier: 'Silver', 
      status: 'active',
      role: 'client',
      packages: 2,
      created: '12 Jan 2025'
    },
    { 
      id: 3,
      name: 'Pierre Bernard', 
      email: 'pierre@example.com', 
      tier: 'Bronze', 
      status: 'pending',
      role: 'client',
      packages: 1,
      created: '10 Jan 2025'
    },
    { 
      id: 4,
      name: 'Sophie Petit', 
      email: 'sophie@example.com', 
      tier: 'Diamond', 
      status: 'active',
      role: 'manager',
      packages: 5,
      created: '08 Jan 2025'
    },
    { 
      id: 5,
      name: 'Luc Moreau', 
      email: 'luc@example.com', 
      tier: 'Silver', 
      status: 'suspended',
      role: 'client',
      packages: 2,
      created: '05 Jan 2025'
    },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'bronze': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'silver': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'gold': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'diamond': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'suspended': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Utilisateurs</h1>
            <p className="text-gray-400">Gérez tous les utilisateurs de la plateforme</p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/dashboard/admin/users/create">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel utilisateur
            </Link>
          </Button>
        </div>

        {/* Search */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom ou email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Tous les utilisateurs ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Utilisateur</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Tier</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Rôle</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Packages</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Statut</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Inscription</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-white">{user.name}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getTierColor(user.tier)}>
                          {user.tier}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-300 capitalize">{user.role}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-300">{user.packages}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(user.status)}>
                          {user.status === 'active' ? 'Actif' : 
                           user.status === 'pending' ? 'En attente' : 'Suspendu'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-400">{user.created}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                              <Mail className="w-4 h-4 mr-2" />
                              Envoyer un email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                              <Shield className="w-4 h-4 mr-2" />
                              Modifier le rôle
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem className="text-red-400 hover:bg-red-500/20">
                              <Ban className="w-4 h-4 mr-2" />
                              Suspendre
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
