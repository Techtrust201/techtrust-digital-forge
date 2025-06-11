
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Menu,
  X,
  LayoutDashboard,
  Users,
  TrendingUp,
  Edit,
  Mail,
  DollarSign,
  Settings,
  LogOut,
  User,
  Shield,
  ChevronDown,
  ChevronRight,
  UserPlus,
  UserX,
  UserCheck,
  BarChart3,
  PieChart,
  Activity,
  FileText,
  Plus,
  MessageSquare,
  CreditCard,
  Receipt,
  Cog,
  Database,
  Lock
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['users', 'analytics']);
  const [currentUser] = useState(() => {
    const user = localStorage.getItem('techtrust_user');
    return user ? JSON.parse(user) : null;
  });

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('techtrust_user');
    window.location.href = '/auth';
  };

  const switchToClient = () => {
    // Passer en mode client tout en gardant les privilèges admin
    window.location.href = '/dashboard';
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      icon: LayoutDashboard,
      href: '/admin/dashboard'
    },
    {
      id: 'users',
      label: 'Gestion Utilisateurs',
      icon: Users,
      expandable: true,
      children: [
        { id: 'users-all', label: 'Tous les utilisateurs', icon: Users, href: '/admin/users/all' },
        { id: 'users-new', label: 'Nouveaux comptes', icon: UserPlus, href: '/admin/users/new' },
        { id: 'users-suspended', label: 'Comptes suspendus', icon: UserX, href: '/admin/users/suspended' },
        { id: 'users-create', label: 'Créer un compte', icon: UserCheck, href: '/admin/users/create' }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics Global',
      icon: TrendingUp,
      expandable: true,
      children: [
        { id: 'analytics-overview', label: 'Vue d\'ensemble', icon: BarChart3, href: '/admin/analytics/overview' },
        { id: 'analytics-revenue', label: 'Revenus', icon: DollarSign, href: '/admin/analytics/revenue' },
        { id: 'analytics-performance', label: 'Performance', icon: Activity, href: '/admin/analytics/performance' },
        { id: 'analytics-users', label: 'Utilisateurs', icon: PieChart, href: '/admin/analytics/users' }
      ]
    },
    {
      id: 'blog',
      label: 'Gestion Blog',
      icon: Edit,
      expandable: true,
      children: [
        { id: 'blog-posts', label: 'Tous les articles', icon: FileText, href: '/admin/blog/posts' },
        { id: 'blog-create', label: 'Créer un article', icon: Plus, href: '/admin/blog/create' },
        { id: 'blog-categories', label: 'Catégories', icon: Settings, href: '/admin/blog/categories' },
        { id: 'blog-comments', label: 'Commentaires', icon: MessageSquare, href: '/admin/blog/comments' }
      ]
    },
    {
      id: 'campaigns',
      label: 'Campagnes Marketing',
      icon: Mail,
      expandable: true,
      children: [
        { id: 'campaigns-email', label: 'Email Marketing', icon: Mail, href: '/admin/campaigns/email' },
        { id: 'campaigns-sms', label: 'SMS Marketing', icon: MessageSquare, href: '/admin/campaigns/sms' },
        { id: 'campaigns-automation', label: 'Automations', icon: Settings, href: '/admin/campaigns/automation' }
      ]
    },
    {
      id: 'billing',
      label: 'Facturation',
      icon: DollarSign,
      expandable: true,
      children: [
        { id: 'billing-invoices', label: 'Factures', icon: Receipt, href: '/admin/billing/invoices' },
        { id: 'billing-payments', label: 'Paiements', icon: CreditCard, href: '/admin/billing/payments' },
        { id: 'billing-subscriptions', label: 'Abonnements', icon: Users, href: '/admin/billing/subscriptions' }
      ]
    },
    {
      id: 'system',
      label: 'Système',
      icon: Settings,
      expandable: true,
      children: [
        { id: 'system-config', label: 'Configuration', icon: Cog, href: '/admin/system/config' },
        { id: 'system-logs', label: 'Logs système', icon: FileText, href: '/admin/system/logs' },
        { id: 'system-backups', label: 'Sauvegardes', icon: Database, href: '/admin/system/backups' },
        { id: 'system-security', label: 'Sécurité', icon: Lock, href: '/admin/system/security' }
      ]
    }
  ];

  const handleMenuClick = (item: any) => {
    if (item.expandable) {
      toggleMenu(item.id);
    } else {
      // Navigation vers la page correspondante
      const currentPath = window.location.pathname;
      if (item.href && currentPath !== item.href) {
        // Pour l'instant, on reste sur la même page car toutes les routes pointent vers AdminDashboard
        // Plus tard, vous pourrez implémenter la navigation réelle
        console.log(`Navigation vers: ${item.href}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-16'} flex flex-col`}>
        {/* Header Sidebar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
                <p className="text-sm text-gray-600">Gestion Techtrust</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Menu Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => {
              const ItemIcon = item.icon;
              const isExpanded = expandedMenus.includes(item.id);
              
              return (
                <div key={item.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start hover:bg-blue-50 hover:text-blue-600 ${
                      sidebarOpen ? 'px-3' : 'px-2'
                    }`}
                    onClick={() => handleMenuClick(item)}
                  >
                    <ItemIcon className={`${sidebarOpen ? 'w-5 h-5 mr-3' : 'w-5 h-5'}`} />
                    {sidebarOpen && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.expandable && (
                          <div className="ml-2">
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </Button>

                  {/* Sous-menu */}
                  {item.expandable && isExpanded && sidebarOpen && item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        return (
                          <Button
                            key={child.id}
                            variant="ghost"
                            className="w-full justify-start text-sm hover:bg-blue-50 hover:text-blue-600 px-3"
                            onClick={() => handleMenuClick(child)}
                          >
                            <ChildIcon className="w-4 h-4 mr-3" />
                            {child.label}
                          </Button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="border-t border-gray-200 p-4">
          {sidebarOpen && (
            <Card className="mb-3">
              <CardContent className="p-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{currentUser?.name?.charAt(0) || 'A'}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{currentUser?.name || 'Admin'}</p>
                    <p className="text-xs text-gray-600">{currentUser?.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-red-100 text-red-800 text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Super Admin
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            <Button
              variant="outline"
              className={`w-full ${sidebarOpen ? 'justify-start' : 'justify-center'} text-blue-600 hover:bg-blue-50`}
              onClick={switchToClient}
            >
              <User className="w-4 h-4 mr-2" />
              {sidebarOpen && 'Retour client'}
            </Button>
            <Button
              variant="ghost"
              className={`w-full ${sidebarOpen ? 'justify-start' : 'justify-center'} text-red-600 hover:bg-red-50`}
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {sidebarOpen && 'Déconnexion'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Administration Techtrust</h1>
              <Badge className="bg-red-100 text-red-800">
                Mode Administrateur
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{currentUser?.name?.charAt(0) || 'A'}</span>
                </div>
                <span className="font-medium text-gray-900">{currentUser?.name || 'Admin'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
