"use client";

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Settings, 
  Server,
  Database,
  Shield,
  Bell,
  RefreshCw
} from 'lucide-react';

export default function AdminSystemPage() {
  const systemStatus = [
    { name: 'API Server', status: 'online', uptime: '99.99%' },
    { name: 'Database', status: 'online', uptime: '99.95%' },
    { name: 'Cache Server', status: 'online', uptime: '100%' },
    { name: 'Email Service', status: 'online', uptime: '99.8%' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Système</h1>
          <p className="text-gray-400">Configuration et monitoring du système</p>
        </div>

        {/* System status */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Server className="w-5 h-5" />
              État du système
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {systemStatus.map((service, index) => (
                <div key={index} className="p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{service.name}</span>
                    <Badge className="bg-green-500/20 text-green-400">
                      {service.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400">Uptime: {service.uptime}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Settings */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Paramètres généraux
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Mode maintenance</Label>
                  <p className="text-sm text-gray-400">Activer le mode maintenance</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Inscriptions</Label>
                  <p className="text-sm text-gray-400">Autoriser les nouvelles inscriptions</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Mode debug</Label>
                  <p className="text-sm text-gray-400">Activer les logs détaillés</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications admin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Nouveaux utilisateurs</Label>
                  <p className="text-sm text-gray-400">Notification par email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Paiements</Label>
                  <p className="text-sm text-gray-400">Alertes paiements</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Erreurs système</Label>
                  <p className="text-sm text-gray-400">Alertes critiques</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Sécurité
            </CardTitle>
            <CardDescription className="text-gray-400">
              Paramètres de sécurité de la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div>
                <p className="font-medium text-white">Forcer HTTPS</p>
                <p className="text-sm text-gray-400">Rediriger tout le trafic HTTP vers HTTPS</p>
              </div>
              <Badge className="bg-green-500/20 text-green-400">Actif</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div>
                <p className="font-medium text-white">Protection CSRF</p>
                <p className="text-sm text-gray-400">Protection contre les attaques CSRF</p>
              </div>
              <Badge className="bg-green-500/20 text-green-400">Actif</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div>
                <p className="font-medium text-white">Rate Limiting</p>
                <p className="text-sm text-gray-400">Limitation du nombre de requêtes</p>
              </div>
              <Badge className="bg-green-500/20 text-green-400">Actif</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Database className="w-5 h-5" />
              Actions système
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Vider le cache
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Database className="w-4 h-4 mr-2" />
              Optimiser la DB
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Server className="w-4 h-4 mr-2" />
              Redémarrer les services
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
