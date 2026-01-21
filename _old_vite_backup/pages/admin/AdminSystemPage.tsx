
import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Database, 
  Shield, 
  Activity, 
  Server,
  HardDrive,
  Cpu,
  Wifi,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const AdminSystemPage = () => {
  const location = useLocation();

  const getPageContent = () => {
    const path = location.pathname;

    if (path.includes('/config')) {
      return {
        title: "Système - Configuration",
        description: "Paramètres généraux du système",
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Server className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">99.9%</p>
                      <p className="text-sm text-gray-500">Uptime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">45%</p>
                      <p className="text-sm text-gray-500">CPU Usage</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <HardDrive className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">2.1TB</p>
                      <p className="text-sm text-gray-500">Stockage utilisé</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      };
    }
    
    if (path.includes('/logs')) {
      return {
        title: "Système - Logs",
        description: "Journaux système et activités",
        content: (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Logs récents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Connexion utilisateur</p>
                        <p className="text-sm text-gray-500">user@example.com - Il y a 5 minutes</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">SUCCESS</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="font-medium">Tentative de connexion échouée</p>
                        <p className="text-sm text-gray-500">IP: 192.168.1.100 - Il y a 15 minutes</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">WARNING</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      };
    }
    
    if (path.includes('/backups')) {
      return {
        title: "Système - Sauvegardes",
        description: "Gestion des sauvegardes et restaurations",
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Database className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-gray-500">Sauvegardes totales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">Il y a 6h</p>
                      <p className="text-sm text-gray-500">Dernière sauvegarde</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <HardDrive className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">45GB</p>
                      <p className="text-sm text-gray-500">Taille des sauvegardes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      };
    }
    
    if (path.includes('/security')) {
      return {
        title: "Système - Sécurité",
        description: "Paramètres de sécurité et monitoring",
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">Actif</p>
                      <p className="text-sm text-gray-500">Firewall</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Wifi className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">SSL</p>
                      <p className="text-sm text-gray-500">Certificat valide</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-gray-500">Alertes sécurité</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Activity className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">24/7</p>
                      <p className="text-sm text-gray-500">Monitoring</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      };
    }

    // Page overview par défaut
    return {
      title: "Système",
      description: "Administration générale du système",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Server className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">99.9%</p>
                    <p className="text-sm text-gray-500">Uptime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">Sécurisé</p>
                    <p className="text-sm text-gray-500">Statut sécurité</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Database className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-gray-500">Sauvegardes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Activity className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">Actif</p>
                    <p className="text-sm text-gray-500">Monitoring</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    };
  };

  const pageContent = getPageContent();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{pageContent.title}</h1>
            <p className="text-gray-500 mt-2">{pageContent.description}</p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600">
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </Button>
        </div>

        {pageContent.content}
      </div>
    </AdminLayout>
  );
};

export default AdminSystemPage;
