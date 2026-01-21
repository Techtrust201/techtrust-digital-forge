
import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  FileText, 
  DollarSign, 
  Users, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

const AdminBillingPage = () => {
  const location = useLocation();

  const getPageContent = () => {
    const path = location.pathname;

    if (path.includes('/invoices')) {
      return {
        title: "Facturation - Factures",
        description: "Gérer toutes les factures et devis",
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-sm text-gray-500">Factures totales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">134</p>
                      <p className="text-sm text-gray-500">Payées</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">18</p>
                      <p className="text-sm text-gray-500">En attente</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold">4</p>
                      <p className="text-sm text-gray-500">En retard</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Factures récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Facture #2024-001</h4>
                      <p className="text-sm text-gray-500">Client: Tech Corp</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">€2,500</p>
                      <Badge className="bg-green-100 text-green-800">Payée</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      };
    }
    
    if (path.includes('/payments')) {
      return {
        title: "Facturation - Paiements",
        description: "Suivi des paiements et transactions",
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">€45,230</p>
                      <p className="text-sm text-gray-500">Revenus ce mois</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">+23%</p>
                      <p className="text-sm text-gray-500">Croissance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">98%</p>
                      <p className="text-sm text-gray-500">Taux de succès</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">234</p>
                      <p className="text-sm text-gray-500">Transactions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      };
    }
    
    if (path.includes('/subscriptions')) {
      return {
        title: "Facturation - Abonnements",
        description: "Gérer les abonnements et récurrences",
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">89</p>
                      <p className="text-sm text-gray-500">Abonnements actifs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">€12,450</p>
                      <p className="text-sm text-gray-500">MRR</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">95%</p>
                      <p className="text-sm text-gray-500">Taux de rétention</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-gray-500">Échecs de paiement</p>
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
      title: "Facturation",
      description: "Vue d'ensemble de la facturation et des paiements",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">€45,230</p>
                    <p className="text-sm text-gray-500">Revenus mensuels</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-sm text-gray-500">Factures ce mois</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">89</p>
                    <p className="text-sm text-gray-500">Abonnements actifs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">+23%</p>
                    <p className="text-sm text-gray-500">Croissance</p>
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
            <FileText className="w-4 h-4 mr-2" />
            Nouvelle facture
          </Button>
        </div>

        {pageContent.content}
      </div>
    </AdminLayout>
  );
};

export default AdminBillingPage;
