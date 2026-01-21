
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Zap, Clock, Target, Server, Wifi, Database, Monitor } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AdminAnalyticsPerformancePage = () => {
  const performanceMetrics = [
    { title: 'Temps de réponse', value: '1.2s', status: 'excellent', icon: Clock, color: 'text-green-500' },
    { title: 'Disponibilité', value: '99.9%', status: 'excellent', icon: Server, color: 'text-green-500' },
    { title: 'Débit réseau', value: '45 Mbps', status: 'bon', icon: Wifi, color: 'text-blue-500' },
    { title: 'Charge CPU', value: '23%', status: 'optimal', icon: Monitor, color: 'text-green-500' },
  ];

  const systemHealth = [
    { component: 'API Gateway', status: 'Opérationnel', uptime: '99.99%', response: '120ms', color: 'green' },
    { component: 'Base de données', status: 'Opérationnel', uptime: '99.95%', response: '45ms', color: 'green' },
    { component: 'Service Email', status: 'Dégradé', uptime: '98.2%', response: '2.3s', color: 'orange' },
    { component: 'CDN', status: 'Opérationnel', uptime: '100%', response: '25ms', color: 'green' },
  ];

  const pagePerformance = [
    { page: 'Page d\'accueil', loadTime: '0.8s', score: 95, mobile: 92 },
    { page: 'Solutions', loadTime: '1.1s', score: 88, mobile: 85 },
    { page: 'Pricing', loadTime: '0.9s', score: 93, mobile: 90 },
    { page: 'Dashboard', loadTime: '1.4s', score: 82, mobile: 78 },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'excellent':
      case 'optimal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'bon':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'dégradé':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getHealthColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'text-green-600 bg-green-50';
      case 'orange':
        return 'text-orange-600 bg-orange-50';
      case 'red':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Performance</h1>
          <p className="text-gray-500 mt-2">Monitoring en temps réel des performances système</p>
        </div>

        {/* Métriques de performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <Card key={metric.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`w-8 h-8 ${metric.color}`} />
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                    <p className="text-sm text-gray-600">{metric.title}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* État des composants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                État des composants système
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((component) => (
                  <div key={component.component} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{component.component}</h4>
                      <Badge className={getHealthColor(component.color)}>
                        {component.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Disponibilité:</span>
                        <span className="ml-1 font-medium">{component.uptime}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Réponse:</span>
                        <span className="ml-1 font-medium">{component.response}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance des pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-500" />
                Performance des pages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pagePerformance.map((page) => (
                <div key={page.page} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{page.page}</h4>
                    <span className="text-sm font-medium text-gray-600">{page.loadTime}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-500">Desktop</span>
                        <span className="text-sm font-medium">{page.score}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${page.score >= 90 ? 'bg-green-500' : page.score >= 70 ? 'bg-orange-500' : 'bg-red-500'}`}
                          style={{ width: `${page.score}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-500">Mobile</span>
                        <span className="text-sm font-medium">{page.mobile}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${page.mobile >= 90 ? 'bg-green-500' : page.mobile >= 70 ? 'bg-orange-500' : 'bg-red-500'}`}
                          style={{ width: `${page.mobile}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalyticsPerformancePage;
