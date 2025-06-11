
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BarChart3, 
  User, 
  HelpCircle, 
  Zap, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Settings,
  ChevronDown,
  TrendingUp,
  Globe,
  Mail,
  MessageSquare,
  CreditCard,
  Shield,
  Rocket,
  Crown,
  Diamond
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
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

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return { icon: Shield, name: 'Bronze', color: 'text-amber-600' };
      case 'silver':
        return { icon: Rocket, name: 'Silver', color: 'text-gray-600' };
      case 'gold':
        return { icon: Crown, name: 'Gold', color: 'text-yellow-600' };
      case 'diamond':
        return { icon: Diamond, name: 'Diamond', color: 'text-purple-600' };
      default:
        return { icon: Shield, name: 'Bronze', color: 'text-amber-600' };
    }
  };

  const tierInfo = userData ? getTierInfo(userData.tier) : { icon: Shield, name: 'Bronze', color: 'text-amber-600' };
  const TierIcon = tierInfo.icon;

  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Tableau de bord',
      icon: Home,
      href: '/dashboard',
      access: ['admin', 'client', 'manager', 'employee']
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: BarChart3,
      href: '/dashboard/analytics',
      access: ['admin', 'client', 'manager'],
      submenu: [
        { name: 'Performance Site', href: '/dashboard/analytics/website' },
        { name: 'Réseaux Sociaux', href: '/dashboard/analytics/social' },
        { name: 'Growth Hacking', href: '/dashboard/analytics/growth' },
        { name: 'Community Management', href: '/dashboard/analytics/community' }
      ]
    },
    {
      id: 'campaigns',
      name: 'Campagnes', 
      icon: Zap,
      href: '/dashboard/campaigns',
      access: ['admin', 'client', 'manager'],
      submenu: [
        { name: 'Email Marketing', href: '/dashboard/campaigns/email' },
        { name: 'SMS Marketing', href: '/dashboard/campaigns/sms' },
        { name: 'Lead Generation', href: '/dashboard/campaigns/leads' },
        { name: 'Automation', href: '/dashboard/campaigns/automation' }
      ]
    },
    {
      id: 'account',
      name: 'Mon Compte',
      icon: User,
      href: '/dashboard/account',
      access: ['admin', 'client', 'manager', 'employee'],
      submenu: [
        { name: 'Informations', href: '/dashboard/account/profile' },
        { name: 'Mon Plan', href: '/dashboard/account/plan' },
        { name: 'Facturation', href: '/dashboard/account/billing' },
        { name: 'Sécurité', href: '/dashboard/account/security' }
      ]
    },
    {
      id: 'help',
      name: 'Aide',
      icon: HelpCircle,
      href: '/dashboard/help',
      access: ['admin', 'client', 'manager', 'employee'],
      submenu: [
        { name: 'FAQ', href: '/dashboard/help/faq' },
        { name: 'Support', href: '/dashboard/help/support' },
        { name: 'Tutoriels', href: '/dashboard/help/tutorials' }
      ]
    }
  ];

  // Filtrer selon les permissions
  const filteredNavigation = navigationItems.filter(item => 
    userData ? item.access.includes(userData.role) : true
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Header sidebar */}
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Techtrust</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User info */}
        {userData && (
          <div className="p-6 border-b">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{userData.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 truncate">{userData.name}</h3>
                <p className="text-sm text-gray-500 truncate">{userData.email}</p>
              </div>
            </div>
            <Badge className={`${tierInfo.color} bg-opacity-10 border-current`}>
              <TierIcon className="w-3 h-3 mr-1" />
              {tierInfo.name}
            </Badge>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {filteredNavigation.map((item) => {
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
                      activeTab === item.id ? 'bg-blue-50 text-blue-600' : ''
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuItem className="p-4">
                  <div>
                    <h4 className="font-medium">Nouveau rapport disponible</h4>
                    <p className="text-sm text-gray-500">Vos performances du mois</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-4">
                  <div>
                    <h4 className="font-medium">Mise à jour IA</h4>
                    <p className="text-sm text-gray-500">Nouvelles fonctionnalités</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <a href="/dashboard/account/profile">Mon profil</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/dashboard/account/settings">Paramètres</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

export default DashboardLayout;
