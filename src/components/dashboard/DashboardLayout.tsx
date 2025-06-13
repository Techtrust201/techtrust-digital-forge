
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Menu,
  X,
  LayoutDashboard,
  BarChart3,
  Mail,
  User,
  HelpCircle,
  LogOut,
  Shield,
  ChevronDown,
  ChevronRight,
  Globe,
  Instagram,
  TrendingUp,
  MessageSquare,
  Target,
  Settings,
  CreditCard,
  FileText,
  Crown,
  Rocket,
  Diamond
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
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

  const getUserServices = () => {
    switch(currentUser?.tier) {
      case 'bronze':
        return ['site-web'];
      case 'silver':
        return ['site-web', 'community-management'];
      case 'gold':
        return ['site-web', 'growth-hacking', 'community-management'];
      case 'diamond':
        return ['site-web', 'growth-hacking', 'community-management', 'consulting'];
      default:
        return [];
    }
  };

  const getTierInfo = () => {
    switch(currentUser?.tier) {
      case 'diamond':
        return { name: 'Diamond', icon: Diamond, color: 'text-purple-600' };
      case 'gold':
        return { name: 'Gold', icon: Crown, color: 'text-yellow-600' };
      case 'silver':
        return { name: 'Silver', icon: Rocket, color: 'text-gray-600' };
      default:
        return { name: 'Bronze', icon: Shield, color: 'text-amber-600' };
    }
  };

  const userServices = getUserServices();
  const tierInfo = getTierInfo();
  const TierIcon = tierInfo.icon;

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      icon: LayoutDashboard,
      href: '/dashboard',
      available: true
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      expandable: true,
      available: userServices.length > 0,
      children: [
        { 
          id: 'analytics-website', 
          label: 'Site Web', 
          icon: Globe, 
          href: '/dashboard/analytics/website',
          available: userServices.includes('site-web')
        },
        { 
          id: 'analytics-social', 
          label: 'Réseaux Sociaux', 
          icon: Instagram, 
          href: '/dashboard/analytics/social',
          available: userServices.includes('community-management')
        },
        { 
          id: 'analytics-growth', 
          label: 'Growth Hacking', 
          icon: TrendingUp, 
          href: '/dashboard/analytics/growth',
          available: userServices.includes('growth-hacking')
        }
      ]
    },
    {
      id: 'campaigns',
      label: 'Campagnes',
      icon: Mail,
      expandable: true,
      available: userServices.includes('growth-hacking') || userServices.includes('community-management'),
      children: [
        { 
          id: 'campaigns-email', 
          label: 'Email Marketing', 
          icon: Mail, 
          href: '/dashboard/campaigns/email',
          available: userServices.includes('growth-hacking')
        },
        { 
          id: 'campaigns-sms', 
          label: 'SMS Marketing', 
          icon: MessageSquare, 
          href: '/dashboard/campaigns/sms',
          available: userServices.includes('growth-hacking')
        },
        { 
          id: 'campaigns-leads', 
          label: 'Génération Leads', 
          icon: Target, 
          href: '/dashboard/campaigns/leads',
          available: userServices.includes('growth-hacking')
        },
        { 
          id: 'campaigns-automation', 
          label: 'Automations', 
          icon: Settings, 
          href: '/dashboard/campaigns/automation',
          available: userServices.includes('growth-hacking')
        }
      ]
    },
    {
      id: 'account',
      label: 'Mon Compte',
      icon: User,
      expandable: true,
      available: true,
      children: [
        { id: 'account-profile', label: 'Profil', icon: User, href: '/dashboard/account/profile', available: true },
        { id: 'account-plan', label: 'Mon Plan', icon: Crown, href: '/dashboard/account/plan', available: true },
        { id: 'account-billing', label: 'Facturation', icon: CreditCard, href: '/dashboard/account/billing', available: true },
        { id: 'account-security', label: 'Sécurité', icon: Shield, href: '/dashboard/account/security', available: true }
      ]
    },
    {
      id: 'help',
      label: 'Aide',
      icon: HelpCircle,
      expandable: true,
      available: true,
      children: [
        { id: 'help-faq', label: 'FAQ', icon: FileText, href: '/dashboard/help/faq', available: true },
        { id: 'help-support', label: 'Support', icon: MessageSquare, href: '/dashboard/help/support', available: true },
        { id: 'help-tutorials', label: 'Tutoriels', icon: BarChart3, href: '/dashboard/help/tutorials', available: true }
      ]
    }
  ];

  const handleMenuClick = (item: any) => {
    if (!item.available) {
      alert('⚠️ Cette fonctionnalité nécessite un plan supérieur. Contactez-nous pour upgrader !');
      return;
    }

    if (item.expandable) {
      toggleMenu(item.id);
    } else {
      const currentPath = window.location.pathname;
      
      // Navigation intelligente
      if (item.id === 'dashboard') {
        window.location.href = '/dashboard';
      } else if (item.id.startsWith('analytics')) {
        if (item.href) {
          // Navigation vers un sous-menu analytics spécifique
          window.location.href = '/dashboard/analytics';
        } else {
          window.location.href = '/dashboard/analytics';
        }
      } else if (item.id.startsWith('campaigns')) {
        if (item.href) {
          window.location.href = '/dashboard/campaigns';
        } else {
          window.location.href = '/dashboard/campaigns';
        }
      } else if (item.id.startsWith('account')) {
        if (item.href) {
          window.location.href = '/dashboard/account';
        } else {
          window.location.href = '/dashboard/account';
        }
      } else if (item.id.startsWith('help')) {
        if (item.href) {
          window.location.href = '/dashboard/help';
        } else {
          window.location.href = '/dashboard/help';
        }
      } else if (item.href) {
        window.location.href = item.href;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-16'} flex flex-col`}>
        {/* Header Sidebar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h2 className="text-xl font-bold text-gray-900">Techtrust</h2>
                <p className="text-sm text-gray-600">Dashboard Client</p>
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
              
              if (!item.available && item.id !== 'analytics' && item.id !== 'campaigns') {
                return null;
              }
              
              return (
                <div key={item.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start hover:bg-blue-50 hover:text-blue-600 ${
                      sidebarOpen ? 'px-3' : 'px-2'
                    } ${!item.available ? 'opacity-50' : ''}`}
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
                      {item.children.filter((child: any) => child.available).map((child: any) => {
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
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{currentUser?.name?.charAt(0) || 'U'}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{currentUser?.name || 'Utilisateur'}</p>
                    <p className="text-xs text-gray-600">{currentUser?.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className={`${tierInfo.color} text-xs`}>
                    <TierIcon className="w-3 h-3 mr-1" />
                    {tierInfo.name}
                  </Badge>
                  <span className="text-xs text-gray-500">{userServices.length} service{userServices.length > 1 ? 's' : ''}</span>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            {currentUser?.role === 'admin' && (
              <Button
                variant="outline"
                className={`w-full ${sidebarOpen ? 'justify-start' : 'justify-center'} text-red-600 hover:bg-red-50`}
                onClick={() => window.location.href = '/admin/dashboard'}
              >
                <Shield className="w-4 h-4 mr-2" />
                {sidebarOpen && 'Mode Admin'}
              </Button>
            )}
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
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Techtrust</h1>
              <Badge className={`${tierInfo.color}`}>
                <TierIcon className="w-4 h-4 mr-1" />
                Plan {tierInfo.name}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/pricing'}>
                <Crown className="w-4 h-4 mr-2" />
                Upgrader
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{currentUser?.name?.charAt(0) || 'U'}</span>
                </div>
                <span className="font-medium text-gray-900">{currentUser?.name || 'Utilisateur'}</span>
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

export default DashboardLayout;
