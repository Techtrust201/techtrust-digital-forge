
import React from "react";
import { useTranslation } from "react-i18next";
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useAdminLayout } from '@/hooks/useAdminLayout';
import { navigationItems } from '@/data/adminNavigation';
import { AdminLayoutProps } from '@/types/admin';

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { t } = useTranslation();
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    isSidebarCollapsed,
    userData,
    activeTab,
    setActiveTab,
    openDropdown,
    activeSubMenu,
    handleLogout,
    toggleSidebarCollapse,
    toggleDropdown,
    handleSwitchInterface
  } = useAdminLayout();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        isSidebarCollapsed={isSidebarCollapsed}
        userData={userData}
        navigationItems={navigationItems}
        activeTab={activeTab}
        openDropdown={openDropdown}
        activeSubMenu={activeSubMenu}
        onSidebarClose={() => setIsSidebarOpen(false)}
        onSidebarToggle={toggleSidebarCollapse}
        onTabChange={setActiveTab}
        onDropdownToggle={toggleDropdown}
        onSwitchInterface={handleSwitchInterface}
        onLogout={handleLogout}
      />

      {/* Content */}
      <div className={"flex-1 transition-all duration-300"}>
        <AdminHeader onSidebarToggle={() => setIsSidebarOpen(true)} />
        
        {/* Main content */}
        <main className="p-6">{children}</main>
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
