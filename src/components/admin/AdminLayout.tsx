import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useBetterAuth } from '@/hooks/useBetterAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  Shield,
  Activity,
  Database,
  Eye,
  UserCheck,
  Lock,
  FileBarChart,
  TrendingUp,
  Globe
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user, signOut, getUserRole } = useBetterAuth();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin',
      exact: true
    },
    {
      title: 'Gestion',
      icon: Users,
      items: [
        { title: 'Utilisateurs', href: '/admin/users', icon: Users },
        { title: 'Facturation', href: '/admin/billing', icon: FileText },
        { title: 'Campagnes', href: '/admin/campaigns', icon: TrendingUp }
      ]
    },
    {
      title: 'Contenu',
      icon: FileText,
      items: [
        { title: 'Articles', href: '/admin/blog', icon: FileText },
        { title: 'Créer un article', href: '/admin/blog/create', icon: FileText },
        { title: 'Commentaires', href: '/admin/blog/comments', icon: FileText },
        { title: 'Catégories', href: '/admin/blog/categories', icon: FileText }
      ]
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      items: [
        { title: 'Vue d\'ensemble', href: '/admin/analytics', icon: BarChart3 },
        { title: 'Performances', href: '/admin/analytics/performance', icon: Activity },
        { title: 'Revenus', href: '/admin/analytics/revenue', icon: FileBarChart },
        { title: 'Utilisateurs', href: '/admin/analytics/users', icon: Users }
      ]
    },
    {
      title: 'Authentification & Sécurité',
      icon: Shield,
      items: [
        { title: 'Sessions actives', href: '/admin/auth/sessions', icon: Activity },
        { title: 'Rôles & Permissions', href: '/admin/auth/roles', icon: UserCheck },
        { title: 'Logs de sécurité', href: '/admin/auth/logs', icon: Eye },
        { title: 'Configuration', href: '/admin/auth/config', icon: Lock }
      ]
    },
    {
      title: 'Tracking & Analytics',
      icon: Database,
      items: [
        { title: 'Données RGPD', href: '/admin/tracking/gdpr', icon: Shield },
        { title: 'Métriques système', href: '/admin/tracking/metrics', icon: BarChart3 },
        { title: 'Google Analytics', href: '/admin/tracking/google-analytics', icon: Globe },
        { title: 'Rapports exports', href: '/admin/tracking/reports', icon: FileBarChart }
      ]
    },
    {
      title: 'Système',
      icon: Settings,
      items: [
        { title: 'Configuration', href: '/admin/system', icon: Settings },
        { title: 'Monitoring', href: '/admin/system/monitoring', icon: Activity },
        { title: 'Alertes', href: '/admin/system/alerts', icon: Activity }
      ]
    }
  ];

  const isActiveRoute = (href: string, exact = false) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/auth';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Admin Techtrust</h1>
          {user && (
            <div className="mt-3">
              <p className="text-sm text-gray-600">{user.email}</p>
              <Badge className="mt-1 bg-red-50 text-red-700">
                {getUserRole()}
              </Badge>
            </div>
          )}
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.items ? (
                <div className="mb-4">
                  <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 mb-2">
                    <item.icon className="w-4 h-4" />
                    {item.title}
                  </div>
                  <div className="ml-4 space-y-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                          isActiveRoute(subItem.href)
                            ? 'bg-red-50 text-red-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <subItem.icon className="w-4 h-4" />
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                    isActiveRoute(item.href, item.exact)
                      ? 'bg-red-50 text-red-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Administration
                </h2>
                <p className="text-sm text-gray-500">
                  Gestion complète de la plateforme Techtrust
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
