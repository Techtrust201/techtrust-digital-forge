
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserData } from '@/types/admin';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

export const useAdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const { signOut } = useSupabaseAuth();

  useEffect(() => {
    const user = localStorage.getItem("techtrust_user");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  // Déterminer l'onglet actif et le sous-menu actif basé sur l'URL
  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/admin/users")) {
      setActiveTab("users");
      setOpenDropdown("users");
      if (path.includes("/admin/users/all"))
        setActiveSubMenu("/admin/users/all");
      else if (path.includes("/admin/users/new"))
        setActiveSubMenu("/admin/users/new");
      else if (path.includes("/admin/users/suspended"))
        setActiveSubMenu("/admin/users/suspended");
      else if (path.includes("/admin/users/create"))
        setActiveSubMenu("/admin/users/create");
      else setActiveSubMenu("/admin/users");
    } else if (path.includes("/admin/analytics")) {
      setActiveTab("analytics");
      setOpenDropdown("analytics");
      if (path.includes("/admin/analytics/overview"))
        setActiveSubMenu("/admin/analytics/overview");
      else if (path.includes("/admin/analytics/revenue"))
        setActiveSubMenu("/admin/analytics/revenue");
      else if (path.includes("/admin/analytics/performance"))
        setActiveSubMenu("/admin/analytics/performance");
      else if (path.includes("/admin/analytics/users"))
        setActiveSubMenu("/admin/analytics/users");
      else setActiveSubMenu("/admin/analytics/overview");
    } else if (path.includes("/admin/blog")) {
      setActiveTab("blog");
      setOpenDropdown("blog");
      if (path.includes("/admin/blog/posts"))
        setActiveSubMenu("/admin/blog/posts");
      else if (path.includes("/admin/blog/create"))
        setActiveSubMenu("/admin/blog/create");
      else if (path.includes("/admin/blog/categories"))
        setActiveSubMenu("/admin/blog/categories");
      else if (path.includes("/admin/blog/comments"))
        setActiveSubMenu("/admin/blog/comments");
      else setActiveSubMenu("/admin/blog/posts");
    } else if (path.includes("/admin/campaigns")) {
      setActiveTab("campaigns");
      setOpenDropdown("campaigns");
      if (path.includes("/admin/campaigns/email"))
        setActiveSubMenu("/admin/campaigns/email");
      else if (path.includes("/admin/campaigns/sms"))
        setActiveSubMenu("/admin/campaigns/sms");
      else if (path.includes("/admin/campaigns/automation"))
        setActiveSubMenu("/admin/campaigns/automation");
      else setActiveSubMenu("/admin/campaigns/email");
    } else if (path.includes("/admin/billing")) {
      setActiveTab("billing");
      setOpenDropdown("billing");
      if (path.includes("/admin/billing/invoices"))
        setActiveSubMenu("/admin/billing/invoices");
      else if (path.includes("/admin/billing/payments"))
        setActiveSubMenu("/admin/billing/payments");
      else if (path.includes("/admin/billing/subscriptions"))
        setActiveSubMenu("/admin/billing/subscriptions");
      else setActiveSubMenu("/admin/billing/invoices");
    } else if (path.includes("/admin/system")) {
      setActiveTab("system");
      setOpenDropdown("system");
      if (path.includes("/admin/system/config"))
        setActiveSubMenu("/admin/system/config");
      else if (path.includes("/admin/system/logs"))
        setActiveSubMenu("/admin/system/logs");
      else if (path.includes("/admin/system/backups"))
        setActiveSubMenu("/admin/system/backups");
      else if (path.includes("/admin/system/security"))
        setActiveSubMenu("/admin/system/security");
      else setActiveSubMenu("/admin/system/config");
    } else if (path.includes("/admin/dashboard")) {
      setActiveTab("dashboard");
      setOpenDropdown(null);
      setActiveSubMenu(null);
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    await signOut();
    localStorage.removeItem("techtrust_user");
    window.location.href = "/auth";
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleDropdown = (dropdownId: string) => {
    if (openDropdown === dropdownId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownId);
    }
  };

  const handleSwitchInterface = () => {
    const currentPath = location.pathname;
    if (currentPath.startsWith("/admin")) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/admin/dashboard";
    }
  };

  return {
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
  };
};
