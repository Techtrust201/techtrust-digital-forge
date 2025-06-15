import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
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
  Diamond,
  ArrowLeftRight,
  Lock,
  BookOpen
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { useUserSubscriptions } from '@/hooks/useUserSubscriptions';
import { useBetterAuth } from '@/hooks/useBetterAuth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  
  const { user, signOut } = useBetterAuth();
  const { 
    subscriptions, 
    hasAnalyticsAccess, 
    hasCampaignsAccess, 
    hasAdvancedAnalytics,
    getActivePackages 
  } = useUserSubscriptions();

  // Déterminer l'onglet actif et le sous-menu actif basé sur l'URL
  useEffect(() => {
    const path = location.pathname;
    
    if (path.includes('/dashboard/analytics')) {
      setActiveTab('analytics');
      setOpenDropdown('analytics');
      if (path.includes('/dashboard/analytics/website')) setActiveSubMenu('/dashboard/analytics/website');
      else if (path.includes('/dashboard/analytics/social')) setActiveSubMenu('/dashboard/analytics/social');
      else if (path.includes('/dashboard/analytics/growth')) setActiveSubMenu('/dashboard/analytics/growth');
      else if (path.includes('/dashboard/analytics/community')) setActiveSubMenu('/dashboard/analytics/community');
      else setActiveSubMenu('/dashboard/analytics/website');
    } else if (path.includes('/dashboard/campaigns')) {
      setActiveTab('campaigns');
      setOpenDropdown('campaigns');
      if (path.includes('/dashboard/campaigns/email')) setActiveSubMenu('/dashboard/campaigns/email');
      else if (path.includes('/dashboard/campaigns/sms')) setActiveSubMenu('/dashboard/campaigns/sms');
      else if (path.includes('/dashboard/campaigns/leads')) setActiveSubMenu('/dashboard/campaigns/leads');
      else if (path.includes('/dashboard/campaigns/automation')) setActiveSubMenu('/dashboard/campaigns/automation');
      else setActiveSubMenu('/dashboard/campaigns/email');
    } else if (path.includes('/dashboard/account')) {
      setActiveTab('account');
      setOpenDropdown('account');
      if (path.includes('/dashboard/account/profile')) setActiveSubMenu('/dashboard/account/profile');
      else if (path.includes('/dashboard/account/plan')) setActiveSubMenu('/dashboard/account/plan');
      else if (path.includes('/dashboard/account/billing')) setActiveSubMenu('/dashboard/account/billing');
      else if (path.includes('/dashboard/account/security')) setActiveSubMenu('/dashboard/account/security');
      else setActiveSubMenu('/dashboard/account/profile');
    } else if (path.includes('/dashboard/help')) {
      setActiveTab('help');
      setOpenDropdown('help');
      if (path.includes('/dashboard/help/faq')) setActiveSubMenu('/dashboard/help/faq');
      else if (path.includes('/dashboard/help/support')) setActiveSubMenu('/dashboard/help/support');
      else if (path.includes('/dashboard/help/tutorials')) setActiveSubMenu('/dashboard/help/tutorials');
      else setActiveSubMenu('/dashboard/help/faq');
    } else if (path.includes('/dashboard')) {
      setActiveTab('dashboard');
      setOpenDropdown(null);
      setActiveSubMenu(null);
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/auth';
  };

  const handleSwitchToAdmin = () => {
    window.location.href = '/admin/dashboard';
  };

  const toggleDropdown = (dropdownId: string) => {
    if (openDropdown === dropdownId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownId);
    }
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

  // Utiliser les données utilisateur de Better-Auth
  const userData = user ? {
    name: user.name || user.email?.split('@')[0] || 'Utilisateur',
    email: user.email,
    role: 'client', // Par défaut, pourrait être récupéré via getUserRole
    tier: 'bronze'
  } : null;

  const tierInfo = userData ? getTierInfo(userData.tier) : { icon: Shield, name: 'Bronze', color: 'text-amber-600' };
  const TierIcon = tierInfo.icon;

  // Vérifier si l'utilisateur est un super admin
  const isSuperAdmin = userData && userData.role === 'admin';

  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Tableau de bord',
      icon: Home,
      href: '/dashboard',
      access: ['admin', 'client', 'manager', 'employee'],
      requiresSubscription: false
    },
    {
      id: 'blog',
      name: 'Blog',
      icon: BookOpen,
      href: '/dashboard/blog',
      access: ['admin', 'client', 'manager',  'employee'],
      requiresSubscription: false
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: BarChart3,
      href: '/dashboard/analytics',
      access: ['admin', 'client', 'manager'],
      requiresSubscription: true,
      hasAccess: hasAnalyticsAccess(),
      submenu: [
        { 
          name: 'Performance Site',
          href: '/dashboard/analytics/website',
          requiresAdvanced: false
        },
        { 
          name: 'Réseaux Sociaux', 
          href: '/dashboard/analytics/social',
          requiresAdvanced: true
        },
        { 
          name: 'Growth Hacking', 
          href: '/dashboard/analytics/growth',
          requiresAdvanced: true
        },
        { 
          name: 'Community Management', 
          href: '/dashboard/analytics/community',
          requiresAdvanced: true
        }
      ]
    },
    {
      id: 'campaigns',
      name: 'Campagnes', 
      icon: Zap,
      href: '/dashboard/campaigns',
      access: ['admin', 'client', 'manager'],
      requiresSubscription: true,
      hasAccess: hasCampaignsAccess(),
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
      requiresSubscription: false,
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
      requiresSubscription: false,
      submenu: [
        { name: 'FAQ', href: '/dashboard/help/faq' },
        { name: 'Support', href: '/dashboard/help/support' },
        { name: 'Tutoriels', href: '/dashboard/help/tutorials' }
      ]
    }
  ];

  // Filtrer selon les permissions et abonnements
  const filteredNavigation = navigationItems.filter(item => {
    const hasRoleAccess = userData ? item.access.includes(userData.role) : true;
    
    if (!hasRoleAccess) return false;
    
    // Si l'item nécessite un abonnement, vérifier l'accès
    if (item.requiresSubscription) {
      return item.hasAccess || userData?.role === 'admin';
    }
    
    return true;
  });

  const renderNavigationItem = (item: any) => {
    const ItemIcon = item.icon;
    const hasAccess = !item.requiresSubscription || item.hasAccess || userData?.role === 'admin';
    
    if (item.submenu) {
      return (
        <Collapsible 
          key={item.id} 
          open={openDropdown === item.id}
          onOpenChange={() => toggleDropdown(item.id)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-between hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors duration-200 group ${
                activeTab === item.id ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : ''
              } ${!hasAccess ? 'opacity-50' : ''}`}
              disabled={!hasAccess}
            >
              <div className="flex items-center gap-3">
                <ItemIcon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
                {!hasAccess && <Lock className="w-4 h-4 text-gray-400" />}
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                openDropdown === item.id ? 'rotate-180' : ''
              }`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1">
            <div className="ml-8 space-y-1">
              {item.submenu.map((subItem: any) => {
                const subHasAccess = !subItem.requiresAdvanced || hasAdvancedAnalytics() || userData?.role === 'admin';
                
                return (
                  <Button
                    key={subItem.href}
                    variant="ghost"
                    asChild={subHasAccess}
                    className={`w-full justify-start h-8 px-3 text-sm hover:bg-gray-100 rounded-md transition-colors duration-200 ${
                      activeSubMenu === subItem.href 
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium' 
                        : 'text-gray-600 hover:text-gray-900'
                    } ${!subHasAccess ? 'opacity-50' : ''}`}
                    disabled={!subHasAccess}
                  >
                    {subHasAccess ? (
                      <a href={subItem.href}>
                        <span className={`w-2 h-2 rounded-full mr-3 ${
                          activeSubMenu === subItem.href ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></span>
                        {subItem.name}
                      </a>
                    ) : (
                      <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full mr-3 bg-gray-300"></span>
                        {subItem.name}
                        <Lock className="w-3 h-3 ml-auto text-gray-400" />
                      </div>
                    )}
                  </Button>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>
      );
    } else {
      return (
        <Button
          key={item.id}
          variant="ghost"
          asChild={hasAccess}
          className={`w-full justify-start hover:bg-gray-100 transition-colors duration-200 ${
            activeTab === item.id ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : ''
          } ${!hasAccess ? 'opacity-50' : ''}`}
          disabled={!hasAccess}
        >
          {hasAccess ? (
            <a href={item.href} onClick={() => setActiveTab(item.id)}>
              <ItemIcon className="w-5 h-5 mr-3" />
              {item.name}
            </a>
          ) : (
            <div className="flex items-center">
              <ItemIcon className="w-5 h-5 mr-3" />
              {item.name}
              <Lock className="w-4 h-4 ml-auto text-gray-400" />
            </div>
          )}
        </Button>
      );
    }
  };

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
            <div className="flex items-center gap-2">
              <Badge className={`${tierInfo.color} bg-opacity-10 border-current`}>
                <TierIcon className="w-3 h-3 mr-1" />
                {tierInfo.name}
              </Badge>
              {getActivePackages().length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {getActivePackages().length} service{getActivePackages().length > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="w-full space-y-1">
            {filteredNavigation.map(renderNavigationItem)}
          </div>
        </nav>

        {/* Footer sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          {/* Bouton pour retourner à l'interface admin (seulement pour les super admins) */}
          {isSuperAdmin && (
            <Button
              variant="ghost"
              onClick={handleSwitchToAdmin}
              className="w-full justify-start mb-2 hover:bg-red-50 hover:text-red-600"
            >
              <ArrowLeftRight className="w-5 h-5 mr-3" />
              Interface Admin
            </Button>
          )}
          
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
      <div className="flex-1">
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
