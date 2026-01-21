"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, 
  Key,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  Check,
  Monitor,
  Trash2
} from 'lucide-react';

export default function SecurityPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  const activeSessions = [
    { id: 1, device: 'Chrome - MacOS', location: 'Paris, France', lastActive: 'Actuellement actif', current: true },
    { id: 2, device: 'Safari - iPhone', location: 'Paris, France', lastActive: 'Il y a 2 heures', current: false },
    { id: 3, device: 'Firefox - Windows', location: 'Lyon, France', lastActive: 'Il y a 3 jours', current: false }
  ];

  const securityEvents = [
    { id: 1, event: 'Connexion réussie', date: '16 Jan 2024 14:32', ip: '192.168.1.1' },
    { id: 2, event: 'Mot de passe modifié', date: '10 Jan 2024 09:15', ip: '192.168.1.1' },
    { id: 3, event: 'Connexion réussie', date: '08 Jan 2024 18:45', ip: '82.45.123.45' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-500" />
            Sécurité
          </h1>
          <p className="text-gray-600">Protégez votre compte et gérez vos sessions</p>
        </div>

        {/* Score de sécurité */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Score de sécurité: 85/100</h2>
                <p className="text-gray-600">Votre compte est bien protégé</p>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-green-100 text-green-800">
                    <Check className="w-3 h-3 mr-1" />
                    Mot de passe fort
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    2FA non activé
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Changer le mot de passe */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-blue-500" />
              Changer le Mot de Passe
            </CardTitle>
            <CardDescription>Utilisez un mot de passe fort et unique</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Mot de passe actuel</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <Button>Mettre à jour le mot de passe</Button>
          </CardContent>
        </Card>

        {/* Authentification à deux facteurs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-blue-500" />
              Authentification à Deux Facteurs (2FA)
            </CardTitle>
            <CardDescription>Ajoutez une couche de sécurité supplémentaire</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${twoFAEnabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <Lock className={`w-6 h-6 ${twoFAEnabled ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {twoFAEnabled ? '2FA activé' : '2FA désactivé'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {twoFAEnabled ? 'Votre compte est protégé' : 'Activez pour plus de sécurité'}
                  </p>
                </div>
              </div>
              <Switch
                checked={twoFAEnabled}
                onCheckedChange={setTwoFAEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sessions actives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-blue-500" />
              Sessions Actives
            </CardTitle>
            <CardDescription>Appareils connectés à votre compte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Monitor className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">{session.device}</div>
                      <div className="text-sm text-gray-600">{session.location}</div>
                      <div className="text-xs text-gray-500">{session.lastActive}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {session.current ? (
                      <Badge className="bg-green-100 text-green-800">Session actuelle</Badge>
                    ) : (
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 text-red-600">
              Déconnecter toutes les autres sessions
            </Button>
          </CardContent>
        </Card>

        {/* Historique de sécurité */}
        <Card>
          <CardHeader>
            <CardTitle>Historique de Sécurité</CardTitle>
            <CardDescription>Activités récentes sur votre compte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border-b last:border-0">
                  <div>
                    <div className="font-medium text-gray-900">{event.event}</div>
                    <div className="text-sm text-gray-600">{event.date}</div>
                  </div>
                  <div className="text-sm text-gray-500">{event.ip}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
