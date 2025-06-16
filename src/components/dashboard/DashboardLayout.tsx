import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  User, 
  Globe, 
  BarChart3, 
  Zap, 
  HelpCircle, 
  LogOut,
  Crown,
  Shield,
  Rocket,
  Diamond,
  Menu,
  X
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useSupabaseAuth();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      exact: true
    },
    {
      title: 'Services',
      icon: Globe,
      href: '/dashboard/services',
      exact: false
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      href: '/dashboard/analytics',
      exact: false
    },
    {
      title: 'Campagnes',
      icon: Zap,
      href: '/dashboard/campaigns',
      exact: false
    },
    {
      title: 'Support',
      icon: HelpCircle,
      href: '/dashboard/support',
      exact: false
    }
  ];

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return {
          icon: Shield,
          name: 'Bronze',
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          progress: 25,
          nextTier: 'Silver'
        };
      case 'silver':
        return {
          icon: Rocket,
          name: 'Silver', 
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          progress: 50,
          nextTier: 'Gold'
        };
      case 'gold':
        return {
          icon: Crown,
          name: 'Gold',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50', 
          progress: 75,
          nextTier: 'Diamond'
        };
      case 'diamond':
        return {
          icon: Diamond,
          name: 'Diamond',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          progress: 100,
          nextTier: null
        };
      default:
        return {
          icon: Shield,
          name: 'Bronze',
          color: 'text-amber-600', 
          bgColor: 'bg-amber-50',
          progress: 25,
          nextTier: 'Silver'
        };
    }
  };

  const isActiveRoute = (href: string, exact = false) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`w-64 bg-white shadow-lg fixed top-0 left-0 h-full z-20 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-gray-900">
              TechTrust
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
          {user && (
            <div className="mt-3">
              <p className="text-sm text-gray-600">{user.email}</p>
              {/* You can display the user's tier or role here */}
            </div>
          )}
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
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
      </aside>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-10 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main content */}
      <div className={`flex-1 flex flex-col lg:pl-64 transition-all duration-300 ease-in-out`}>
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Tableau de bord
                </h2>
                <p className="text-sm text-gray-500">
                  Vue d'ensemble de votre activité
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

export default DashboardLayout;
