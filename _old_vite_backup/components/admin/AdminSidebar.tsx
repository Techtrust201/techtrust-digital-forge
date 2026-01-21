
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, X, ChevronLeft, ArrowLeftRight, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import AdminUserInfo from './AdminUserInfo';
import AdminNavigation from './AdminNavigation';
import { UserData, NavItem } from '@/types/admin';

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  userData: UserData | null;
  navigationItems: NavItem[];
  activeTab: string;
  openDropdown: string | null;
  activeSubMenu: string | null;
  onSidebarClose: () => void;
  onSidebarToggle: () => void;
  onTabChange: (tabId: string) => void;
  onDropdownToggle: (dropdownId: string) => void;
  onSwitchInterface: () => void;
  onLogout: () => void;
}

const AdminSidebar = ({
  isSidebarOpen,
  isSidebarCollapsed,
  userData,
  navigationItems,
  activeTab,
  openDropdown,
  activeSubMenu,
  onSidebarClose,
  onSidebarToggle,
  onTabChange,
  onDropdownToggle,
  onSwitchInterface,
  onLogout
}: AdminSidebarProps) => {
  return (
    <aside
      className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} ${
        isSidebarCollapsed ? "w-16" : "w-64"
      } fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 relative`}
    >
      {/* Header sidebar */}
      <div className="flex items-center justify-between h-16 px-6 border-b bg-gradient-to-r from-red-500 to-orange-500 relative">
        <div
          className={`flex items-center gap-3 ${
            isSidebarCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-500" />
          </div>
          {!isSidebarCollapsed && (
            <span className="font-bold text-xl text-white">Admin</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSidebarClose}
            className="lg:hidden text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Bouton de collapse/expand */}
      <div className="hidden lg:block">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          className="absolute top-1/2 -translate-y-1/2 -right-4 z-30 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 border border-gray-200 shadow-md hover:shadow-lg rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110 group"
          title={
            isSidebarCollapsed
              ? "Ouvrir la barre latérale"
              : "Fermer la barre latérale"
          }
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform duration-200 ${
              isSidebarCollapsed ? "rotate-180" : ""
            } group-hover:scale-110`}
          />
        </Button>
      </div>

      {/* User info */}
      <AdminUserInfo 
        userData={userData} 
        isSidebarCollapsed={isSidebarCollapsed} 
      />

      {/* Navigation */}
      <nav className="p-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        <AdminNavigation
          navigationItems={navigationItems}
          isSidebarCollapsed={isSidebarCollapsed}
          activeTab={activeTab}
          openDropdown={openDropdown}
          activeSubMenu={activeSubMenu}
          onTabChange={onTabChange}
          onDropdownToggle={onDropdownToggle}
        />
      </nav>

      {/* Footer sidebar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
        <Button
          variant="ghost"
          onClick={onSwitchInterface}
          className={`w-full ${
            isSidebarCollapsed ? "justify-center px-2" : "justify-start"
          } mb-2 hover:bg-blue-50 hover:text-blue-600`}
          title={isSidebarCollapsed ? "Interface client" : undefined}
        >
          <ArrowLeftRight
            className={`w-5 h-5 ${!isSidebarCollapsed ? "mr-3" : ""}`}
          />
          {!isSidebarCollapsed && "Interface client"}
        </Button>
        <Button
          variant="ghost"
          onClick={onLogout}
          className={`w-full ${
            isSidebarCollapsed ? "justify-center px-2" : "justify-start"
          } text-red-600 hover:bg-red-50 hover:text-red-700`}
          title={isSidebarCollapsed ? "Se déconnecter" : undefined}
        >
          <LogOut
            className={`w-5 h-5 ${!isSidebarCollapsed ? "mr-3" : ""}`}
          />
          {!isSidebarCollapsed && "Se déconnecter"}
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
