
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Settings, 
  Database, 
  Shield, 
  Server, 
  Activity,
  HardDrive,
  Cpu,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Upload,
  RefreshCw,
  Lock
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminSystemPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/config')) return 'Configuration';
    if (path.includes('/logs')) return 'Logs Système';
    if (path.includes('/backups')) return 'Sauvegardes';
    if (path.includes('/security')) return 'Sécurité';
    return 'Système';
  };

  const systemStats = {
    cpu: 45,
    memory: 68,
    disk: 34,
    network: 78
  };

  const mockLogs = [
    {
      id: 1,
      level: 'info',
      message: 'Utilisateur connecté: marie.dubois@email.com',
      timestamp: '2024-01-20 14:32:15',
      source: 'auth'
    },
    {
      id: 2,
      level: 'warning',
      message: 'Tentative de connexion échouée pour admin@test.com',
      timestamp: '2024-01-20 14:28:42',
      source: 'auth'
    },
    {
      id: 3,
      level: 'error',
      message: 'Erreur de connexion à la base de données',
      timestamp: '2024-01-20 14:15:33',
      source: 'database'
    }
  ];

  const mockBackups = [
    {
      id: 1,
      name: 'backup-2024-01-20-full.sql',
      type: 'full',
      size: '2.4 GB',
      status: 'completed',
      created: '2024-01-20 02:00:00'
    },
    {
      id: 2,
      name: 'backup-2024-01-19-incremental.sql',
      type: 'incremental',
      size: '245 MB',
      status: 'completed',
      created: '2024-01-19 02:00:00'
    },
    {
      id: 3,
      name: 'backup-2024-01-18-incremental.sql',
      type: 'incremental',
      size: '189 MB',
      status: 'failed',
      created: '2024-01-18 02:00:00'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'running': return Clock;
      case 'failed': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
            <p className="text-gray-500 mt-2">Surveillance et configuration du système</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualiser
            </Button>
            <Button className="bg-red-500 hover:bg-red-600">
              <Download className="w-4 h-4 mr-2" />
              Exporter logs
            </Button>
          </div>
        </div>

        <Alert>
          <Shield className="h-4 w-4" />
          <AlertTitle>Système opérationnel</AlertTitle>
          <AlertDescription>
            Tous les services fonctionnent normalement. Dernière vérification: il y a 2 minutes.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU</CardTitle>
              <Cpu className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.cpu}%</div>
              <Progress value={systemStats.cpu} className="mt-2" />
              <p className="text-xs text-gray-600 mt-1">Utilisation normale</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mémoire</CardTitle>
              <HardDrive className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.memory}%</div>
              <Progress value={systemStats.memory} className="mt-2" />
              <p className="text-xs text-gray-600 mt-1">8.2 GB / 12 GB</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disque</CardTitle>
              <Database className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.disk}%</div>
              <Progress value={systemStats.disk} className="mt-2" />
              <p className="text-xs text-gray-600 mt-1">680 GB / 2 TB</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Réseau</CardTitle>
              <Wifi className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.network}%</div>
              <Progress value={systemStats.network} className="mt-2" />
              <p className="text-xs text-gray-600 mt-1">Bande passante</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Logs récents</CardTitle>
              <CardDescription>Activité système en temps réel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockLogs.map((log) => (
                  <div key={log.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Badge className={getLevelColor(log.level)}>
                      {log.level.toUpperCase()}
                    </Badge>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{log.message}</div>
                      <div className="text-xs text-gray-500">{log.timestamp} - {log.source}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Voir tous les logs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services système</CardTitle>
              <CardDescription>Statut des services critiques</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Base de données</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">En ligne</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Serveur web</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">En ligne</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Email service</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">En ligne</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">Backup service</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Attention</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sauvegardes</CardTitle>
            <CardDescription>Gestion des sauvegardes automatiques</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Rechercher une sauvegarde..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              <Button className="bg-red-500 hover:bg-red-600">
                <Upload className="w-4 h-4 mr-2" />
                Nouvelle sauvegarde
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du fichier</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Taille</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Créé le</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBackups.map((backup) => {
                  const StatusIcon = getStatusIcon(backup.status);
                  return (
                    <TableRow key={backup.id}>
                      <TableCell className="font-medium">{backup.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {backup.type === 'full' ? 'Complète' : 'Incrémentale'}
                        </Badge>
                      </TableCell>
                      <TableCell>{backup.size}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(backup.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {backup.status === 'completed' ? 'Terminée' : 
                           backup.status === 'failed' ? 'Échec' : 'En cours'}
                        </Badge>
                      </TableCell>
                      <TableCell>{backup.created}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Sécurité
              </CardTitle>
              <CardDescription>Paramètres de sécurité système</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Authentification 2FA</span>
                  <Badge className="bg-green-100 text-green-800">Activée</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Chiffrement SSL</span>
                  <Badge className="bg-green-100 text-green-800">Activé</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Firewall</span>
                  <Badge className="bg-green-100 text-green-800">Activé</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Monitoring intrusion</span>
                  <Badge className="bg-green-100 text-green-800">Activé</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Performances
              </CardTitle>
              <CardDescription>Métriques de performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Uptime</span>
                  <span className="text-green-600 font-bold">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Temps de réponse moyen</span>
                  <span className="font-bold">145ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Requêtes/minute</span>
                  <span className="font-bold">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Erreurs 5xx</span>
                  <span className="text-red-600 font-bold">0.02%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSystemPage;
