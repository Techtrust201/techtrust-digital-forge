
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  FileText, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X,
  Bell,
  ChevronDown,
  Shield,
  UserPlus,
  Database,
  Mail,
  Zap,
  CreditCard
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const user = localStorage.getItem('techtrust_user');
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('techtrust_user');
    window.location.href = '/auth';
  };

  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Dashboard Admin',
      icon: Home,
      href: '/admin/dashboard'
    },
    {
      id: 'users',
      name: 'Gestion Utilisateurs',
      icon: Users,
      href: '/admin/users',
      submenu: [
        { name: 'Tous les utilisateurs', href: '/admin/users/all' },
        { name: 'Nouveaux comptes', href: '/admin/users/new' },
        { name: 'Comptes suspendus', href: '/admin/users/suspended' },
        { name: 'Créer un compte', href: '/admin/users/create' }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics Global',
      icon: BarChart3,
      href: '/admin/analytics',
      submenu: [
        { name: 'Vue d\'ensemble', href: '/admin/analytics/overview' },
        { name: 'Revenus', href: '/admin/analytics/revenue' },
        { name: 'Performance', href: '/admin/analytics/performance' },
        { name: 'Utilisateurs', href: '/admin/analytics/users' }
      ]
    },
    {
      id: 'blog',
      name: 'Gestion Blog',
      icon: FileText,
      href: '/admin/blog',
      submenu: [
        { name: 'Articles', href: '/admin/blog/posts' },
        { name: 'Créer un article', href: '/admin/blog/create' },
        { name: 'Catégories', href: '/admin/blog/categories' },
        { name: 'Commentaires', href: '/admin/blog/comments' }
      ]
    },
    {
      id: 'campaigns',
      name: 'Campagnes Marketing',
      icon: Zap,
      href: '/admin/campaigns',
      submenu: [
        { name: 'Email Marketing', href: '/admin/campaigns/email' },
        { name: 'SMS Marketing', href: '/admin/campaigns/sms' },
        { name: 'Automatisation', href: '/admin/campaigns/automation' }
      ]
    },
    {
      id: 'billing',
      name: 'Facturation',
      icon: CreditCard,
      href: '/admin/billing',
      submenu: [
        { name: 'Factures', href: '/admin/billing/invoices' },
        { name: 'Paiements', href: '/admin/billing/payments' },
        { name: 'Abonnements', href: '/admin/billing/subscriptions' }
      ]
    },
    {
      id: 'system',
      name: 'Système',
      icon: Settings,
      href: '/admin/system',
      submenu: [
        { name: 'Configuration', href: '/admin/system/config' },
        { name: 'Logs', href: '/admin/system/logs' },
        { name: 'Sauvegrades', href: '/admin/system/backups' },
        { name: 'Sécurité', href: '/admin/system/security' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Header sidebar */}
        <div className="flex items-center justify-between h-16 px-6 border-b bg-gradient-to-r from-red-500 to-orange-500">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-500" />
            </div>
            <span className="font-bold text-xl text-white">Admin</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User info */}
        {userData && (
          <div className="p-6 border-b bg-red-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{userData.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 truncate">{userData.name}</h3>
                <p className="text-sm text-gray-500 truncate">{userData.email}</p>
              </div>
            </div>
            <Badge className="bg-red-100 text-red-800 border-red-200">
              <Shield className="w-3 h-3 mr-1" />
              Super Admin
            </Badge>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          {navigationItems.map((item) => {
            const ItemIcon = item.icon;
            return (
              <div key={item.id}>
                {item.submenu ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <ItemIcon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </div>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {item.submenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.href} asChild>
                          <a href={subItem.href} className="cursor-pointer">
                            {subItem.name}
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant="ghost"
                    asChild
                    className={`w-full justify-start hover:bg-gray-100 ${
                      activeTab === item.id ? 'bg-red-50 text-red-600' : ''
                    }`}
                  >
                    <a href={item.href} onClick={() => setActiveTab(item.id)}>
                      <ItemIcon className="w-5 h-5 mr-3" />
                      {item.name}
                    </a>
                  </Button>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Button
            variant="ghost"
            asChild
            className="w-full justify-start mb-2 hover:bg-blue-50 hover:text-blue-600"
          >
            <a href="/dashboard">
              <Home className="w-5 h-5 mr-3" />
              Retour client
            </a>
          </Button>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Se déconnecter
          </Button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <Badge className="bg-red-100 text-red-800">
              Mode Administrateur
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    5
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuItem className="p-4">
                  <div>
                    <h4 className="font-medium text-red-600">Alerte système</h4>
                    <p className="text-sm text-gray-500">Serveur de backup saturé</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-4">
                  <div>
                    <h4 className="font-medium">Nouveau client premium</h4>
                    <p className="text-sm text-gray-500">Marie Dubois - Gold</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              size="sm"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Nouveau client
            </Button>
          </div>
        </header>

        {/* Main content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Overlay pour mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
