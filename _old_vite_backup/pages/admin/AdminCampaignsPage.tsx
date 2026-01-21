
import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MessageSquare, 
  Zap, 
  Users, 
  TrendingUp,
  Send,
  Clock,
  CheckCircle
} from 'lucide-react';

const AdminCampaignsPage = () => {
  const location = useLocation();

  const getPageContent = () => {
    const path = location.pathname;

    if (path.includes('/email')) {
      return {
        title: "Campagnes - Email Marketing",
        description: "Gérer vos campagnes d'email marketing",
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-sm text-gray-500">Emails envoyés</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">68%</p>
                      <p className="text-sm text-gray-500">Taux d'ouverture</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">23%</p>
                      <p className="text-sm text-gray-500">Taux de clic</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">1,234</p>
                      <p className="text-sm text-gray-500">Abonnés</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Campagnes récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Newsletter Janvier 2024</h4>
                      <p className="text-sm text-gray-500">Envoyé il y a 2 jours</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Envoyé</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      };
    }
    
    if (path.includes('/sms')) {
      return {
        title: "Campagnes - SMS Marketing",
        description: "Gérer vos campagnes SMS",
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">89</p>
                      <p className="text-sm text-gray-500">SMS envoyés</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">92%</p>
                      <p className="text-sm text-gray-500">Taux de livraison</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">45%</p>
                      <p className="text-sm text-gray-500">Taux de réponse</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">456</p>
                      <p className="text-sm text-gray-500">Contacts SMS</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      };
    }
    
    if (path.includes('/automation')) {
      return {
        title: "Campagnes - Automatisation",
        description: "Gérer vos campagnes automatisées",
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Zap className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-gray-500">Séquences actives</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">234</p>
                      <p className="text-sm text-gray-500">En attente</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Send className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">1,567</p>
                      <p className="text-sm text-gray-500">Messages automatiques</p>
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
      title: "Campagnes Marketing",
      description: "Vue d'ensemble de toutes vos campagnes marketing",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-500 text-white">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Marketing</h3>
                    <p className="text-sm text-gray-500">156 emails envoyés ce mois</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-500 text-white">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">SMS Marketing</h3>
                    <p className="text-sm text-gray-500">89 SMS envoyés ce mois</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500 text-white">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Automatisation</h3>
                    <p className="text-sm text-gray-500">12 séquences actives</p>
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
            <Zap className="w-4 h-4 mr-2" />
            Nouvelle campagne
          </Button>
        </div>

        {pageContent.content}
      </div>
    </AdminLayout>
  );
};

export default AdminCampaignsPage;
