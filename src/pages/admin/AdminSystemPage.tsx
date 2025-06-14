
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  Lock,
  Key,
  Monitor,
  FileText,
  Save
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

  const getPageDescription = () => {
    const path = location.pathname;
    if (path.includes('/config')) return 'Paramètres de configuration du système';
    if (path.includes('/logs')) return 'Journaux d\'activité et logs système';
    if (path.includes('/backups')) return 'Gestion des sauvegardes automatiques';
    if (path.includes('/security')) return 'Paramètres de sécurité et accès';
    return 'Surveillance et configuration du système';
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

  // Page Configuration
  if (location.pathname.includes('/config')) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-gray-500 mt-2">{getPageDescription()}</p>
            </div>
            <Button className="bg-red-500 hover:bg-red-600">
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  Configuration Générale
                </CardTitle>
                <CardDescription>Paramètres principaux du système</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nom du site</label>
                  <Input defaultValue="Konexio Admin" />
                </div>
                <div>
                  <label className="text-sm font-medium">URL de base</label>
                  <Input defaultValue="https://admin.konexio.com" />
                </div>
                <div>
                  <label className="text-sm font-medium">Timezone</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Europe/Paris</option>
                    <option>UTC</option>
                    <option>America/New_York</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Langue par défaut</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Français</option>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Configuration Email
                </CardTitle>
                <CardDescription>Paramètres SMTP et notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Serveur SMTP</label>
                  <Input defaultValue="smtp.gmail.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Port</label>
                    <Input defaultValue="587" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Sécurité</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>TLS</option>
                      <option>SSL</option>
                      <option>Aucune</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email expéditeur</label>
                  <Input defaultValue="noreply@konexio.com" />
                </div>
                <div>
                  <label className="text-sm font-medium">Nom expéditeur</label>
                  <Input defaultValue="Konexio Admin" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Base de Données
                </CardTitle>
                <CardDescription>Configuration de la base de données</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Hôte</label>
                  <Input defaultValue="localhost" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Port</label>
                    <Input defaultValue="5432" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Base</label>
                    <Input defaultValue="konexio_db" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Utilisateur</label>
                  <Input defaultValue="admin" />
                </div>
                <div>
                  <label className="text-sm font-medium">Pool de connexions</label>
                  <Input defaultValue="20" type="number" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Performance
                </CardTitle>
                <CardDescription>Paramètres de performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Cache Redis</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Activé</option>
                    <option>Désactivé</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">TTL Cache (secondes)</label>
                  <Input defaultValue="3600" type="number" />
                </div>
                <div>
                  <label className="text-sm font-medium">Limite requêtes/minute</label>
                  <Input defaultValue="1000" type="number" />
                </div>
                <div>
                  <label className="text-sm font-medium">Compression</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>gzip</option>
                    <option>brotli</option>
                    <option>Désactivée</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Page Logs
  if (location.pathname.includes('/logs')) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-gray-500 mt-2">{getPageDescription()}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
              <Button className="bg-red-500 hover:bg-red-600">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Logs aujourd'hui</CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,543</div>
                <p className="text-xs text-gray-600">+234 dernière heure</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Erreurs</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-gray-600">0.18% du total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avertissements</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-gray-600">1.24% du total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Informations</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,364</div>
                <p className="text-xs text-gray-600">98.58% du total</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Logs en temps réel</CardTitle>
                  <CardDescription>Journaux d'activité système</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <select className="p-2 border rounded-md">
                    <option>Tous les niveaux</option>
                    <option>Erreurs uniquement</option>
                    <option>Avertissements</option>
                    <option>Informations</option>
                  </select>
                  <select className="p-2 border rounded-md">
                    <option>Toutes les sources</option>
                    <option>Authentification</option>
                    <option>Base de données</option>
                    <option>API</option>
                  </select>
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-48"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {[...mockLogs, ...mockLogs, ...mockLogs].map((log, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
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
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  // Page Sécurité
  if (location.pathname.includes('/security')) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-gray-500 mt-2">{getPageDescription()}</p>
            </div>
            <Button className="bg-red-500 hover:bg-red-600">
              <Shield className="w-4 h-4 mr-2" />
              Audit de sécurité
            </Button>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Sécurité optimale</AlertTitle>
            <AlertDescription>
              Tous les paramètres de sécurité sont correctement configurés. Dernier audit: il y a 24h.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Authentification
                </CardTitle>
                <CardDescription>Paramètres d'authentification et accès</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Authentification 2FA</div>
                    <div className="text-sm text-gray-500">Obligatoire pour les admins</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Activée</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Durée de session</div>
                    <div className="text-sm text-gray-500">Expiration automatique</div>
                  </div>
                  <span className="text-sm font-medium">4 heures</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Tentatives de connexion</div>
                    <div className="text-sm text-gray-500">Limite avant blocage</div>
                  </div>
                  <span className="text-sm font-medium">5 tentatives</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Politique mots de passe</div>
                    <div className="text-sm text-gray-500">Complexité requise</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Forte</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Clés API
                </CardTitle>
                <CardDescription>Gestion des clés d'accès API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Clé principale</div>
                    <div className="text-sm text-gray-500">prod_••••••••••••4a2b</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Clé de développement</div>
                    <div className="text-sm text-gray-500">dev_••••••••••••8x9z</div>
                  </div>
                  <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                </div>
                <Button className="w-full" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Générer nouvelle clé
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Protection
                </CardTitle>
                <CardDescription>Systèmes de protection actifs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Firewall</span>
                  <Badge className="bg-green-100 text-green-800">Activé</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">DDoS Protection</span>
                  <Badge className="bg-green-100 text-green-800">Activé</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Chiffrement SSL</span>
                  <Badge className="bg-green-100 text-green-800">TLS 1.3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">WAF</span>
                  <Badge className="bg-green-100 text-green-800">Activé</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Détection d'intrusion</span>
                  <Badge className="bg-green-100 text-green-800">Activé</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Alertes de Sécurité
                </CardTitle>
                <CardDescription>Notifications récentes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Certificat SSL renouvelé</div>
                    <div className="text-xs text-gray-500">Il y a 2 jours</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Tentative de connexion suspecte</div>
                    <div className="text-xs text-gray-500">Il y a 3 jours</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Mise à jour de sécurité appliquée</div>
                    <div className="text-xs text-gray-500">Il y a 5 jours</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Page principale (avec backups intégrés)
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
