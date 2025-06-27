
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  CreditCard,
  ChevronLeft,
  ChevronRight,
  ArrowLeftRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { LucideIcon } from "lucide-react";

interface UserData {
  name: string;
  email: string;
  role?: string;
  tier?: string;
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavSubItem {
  name: string;
  href: string;
}

interface NavItem {
  id: string;
  name: string;
  icon: LucideIcon;
  href: string;
  submenu?: NavSubItem[];
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { t } = useTranslation();
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
      // Déterminer le sous-menu actif
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
    // Fermer tous les autres dropdowns et n'ouvrir que celui cliqué
    if (openDropdown === dropdownId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownId);
    }
  };

  const handleSwitchInterface = () => {
    // Basculer entre admin et client
    const currentPath = location.pathname;
    if (currentPath.startsWith("/admin")) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/admin/dashboard";
    }
  };

  const navigationItems: NavItem[] = [
    {
      id: "dashboard",
      name: "Dashboard Admin",
      icon: Home,
      href: "/admin/dashboard",
    },
    {
      id: "users",
      name: "Gestion Utilisateurs",
      icon: Users,
      href: "/admin/users",
      submenu: [
        { name: "Tous les utilisateurs", href: "/admin/users" },
        { name: "Nouveaux comptes", href: "/admin/users/new" },
        { name: "Comptes suspendus", href: "/admin/users/suspended" },
        { name: "Créer un compte", href: "/admin/users/create" },
      ],
    },
    {
      id: "analytics",
      name: "Analytics Global",
      icon: BarChart3,
      href: "/admin/analytics",
      submenu: [
        { name: "Vue d'ensemble", href: "/admin/analytics/overview" },
        { name: "Revenus", href: "/admin/analytics/revenue" },
        { name: "Performance", href: "/admin/analytics/performance" },
        { name: "Utilisateurs", href: "/admin/analytics/users" },
      ],
    },
    {
      id: "blog",
      name: "Gestion Blog",
      icon: FileText,
      href: "/admin/blog",
      submenu: [
        { name: "Articles", href: "/admin/blog/posts" },
        { name: "Créer un article", href: "/admin/blog/create" },
        { name: "Catégories", href: "/admin/blog/categories" },
        { name: "Commentaires", href: "/admin/blog/comments" },
      ],
    },
    {
      id: "campaigns",
      name: "Campagnes Marketing",
      icon: Zap,
      href: "/admin/campaigns",
      submenu: [
        { name: "Email Marketing", href: "/admin/campaigns/email" },
        { name: "SMS Marketing", href: "/admin/campaigns/sms" },
        { name: "Automatisation", href: "/admin/campaigns/automation" },
      ],
    },
    {
      id: "billing",
      name: "Facturation",
      icon: CreditCard,
      href: "/admin/billing",
      submenu: [
        { name: "Factures", href: "/admin/billing/invoices" },
        { name: "Paiements", href: "/admin/billing/payments" },
        { name: "Abonnements", href: "/admin/billing/subscriptions" },
      ],
    },
    {
      id: "system",
      name: "Système",
      icon: Settings,
      href: "/admin/system",
      submenu: [
        { name: "Configuration", href: "/admin/system/config" },
        { name: "Logs", href: "/admin/system/logs" },
        { name: "Sauvegrades", href: "/admin/system/backups" },
        { name: "Sécurité", href: "/admin/system/security" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - This is the ONLY sidebar that should be rendered */}
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
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Bouton de collapse/expand repositionné au milieu avec encastrement parfait */}
        <div className="hidden lg:block">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebarCollapse}
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
        {userData && !isSidebarCollapsed && (
          <div className="p-6 border-b bg-red-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {userData.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 truncate">
                  {userData.name}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {userData.email}
                </p>
              </div>
            </div>
            <Badge className="bg-red-100 text-red-800 border-red-200">
              <Shield className="w-3 h-3 mr-1" />
              Super Admin
            </Badge>
          </div>
        )}

        {/* User info collapsed */}
        {userData && isSidebarCollapsed && (
          <div className="p-2 border-b bg-red-50 flex justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {userData.name.charAt(0)}
              </span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          {!isSidebarCollapsed ? (
            <div className="w-full space-y-1">
              {navigationItems.map((item: NavItem) => {
                const ItemIcon = item.icon;

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
                            activeTab === item.id
                              ? "bg-red-50 text-red-600 hover:bg-red-100"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <ItemIcon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              openDropdown === item.id ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1 mt-1">
                        <div className="ml-8 space-y-1">
                          {item.submenu.map((subItem: NavSubItem) => (
                            <Button
                              key={subItem.href}
                              variant="ghost"
                              asChild
                              className={`w-full justify-start h-8 px-3 text-sm hover:bg-gray-100 rounded-md transition-colors duration-200 ${
                                activeSubMenu === subItem.href
                                  ? "bg-red-100 text-red-700 hover:bg-red-200 font-medium"
                                  : "text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              <Link to={subItem.href}>
                                <span
                                  className={`w-2 h-2 rounded-full mr-3 ${
                                    activeSubMenu === subItem.href
                                      ? "bg-red-500"
                                      : "bg-gray-300"
                                  }`}
                                ></span>
                                {subItem.name}
                              </Link>
                            </Button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                } else {
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      asChild
                      className={`w-full justify-start hover:bg-gray-100 transition-colors duration-200 ${
                        activeTab === item.id
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : ""
                      }`}
                    >
                      <Link to={item.href} onClick={() => setActiveTab(item.id)}>
                        <ItemIcon className="w-5 h-5 mr-3" />
                        {item.name}
                      </Link>
                    </Button>
                  );
                }
              })}
            </div>
          ) : (
            // Version collapsed avec tooltips
            <div className="space-y-2">
              {navigationItems.map((item: NavItem) => {
                const ItemIcon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    asChild
                    className={`w-full justify-center px-2 hover:bg-gray-100 ${
                      activeTab === item.id ? "bg-red-50 text-red-600" : ""
                    }`}
                    title={item.name}
                  >
                    <Link to={item.href} onClick={() => setActiveTab(item.id)}>
                      <ItemIcon className="w-5 h-5" />
                    </Link>
                  </Button>
                );
              })}
            </div>
          )}
        </nav>

        {/* Footer sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Button
            variant="ghost"
            onClick={handleSwitchInterface}
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
            onClick={handleLogout}
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

      {/* Content */}
      <div className={"flex-1 transition-all duration-300"}>
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
                    <p className="text-sm text-gray-500">
                      Serveur de backup saturé
                    </p>
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
          </div>
        </header>

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
