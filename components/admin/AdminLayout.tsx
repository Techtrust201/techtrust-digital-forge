"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  CreditCard,
  FileText,
  Zap,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Shield,
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
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const { signOut, user, profile, isAdmin } = useSupabaseAuth();

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/dashboard/auth";
  };

  const handleSwitchToClient = () => {
    window.location.href = "/dashboard";
  };

  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const navigationItems: NavItem[] = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: Home,
      href: "/dashboard/admin",
    },
    {
      id: "users",
      name: "Utilisateurs",
      icon: Users,
      href: "/dashboard/admin/users",
      submenu: [
        { name: "Tous les utilisateurs", href: "/dashboard/admin/users" },
        { name: "Nouveaux comptes", href: "/dashboard/admin/users/new" },
        { name: "Comptes suspendus", href: "/dashboard/admin/users/suspended" },
        { name: "Créer un compte", href: "/dashboard/admin/users/create" },
      ],
    },
    {
      id: "billing",
      name: "Facturation",
      icon: CreditCard,
      href: "/dashboard/admin/billing",
      submenu: [
        { name: "Vue d'ensemble", href: "/dashboard/admin/billing" },
        { name: "Factures", href: "/dashboard/admin/billing/invoices" },
        { name: "Paiements", href: "/dashboard/admin/billing/payments" },
      ],
    },
    {
      id: "blog",
      name: "Blog",
      icon: FileText,
      href: "/dashboard/admin/blog",
      submenu: [
        { name: "Articles", href: "/dashboard/admin/blog" },
        { name: "Catégories", href: "/dashboard/admin/blog/categories" },
        { name: "Commentaires", href: "/dashboard/admin/blog/comments" },
      ],
    },
    {
      id: "campaigns",
      name: "Campagnes",
      icon: Zap,
      href: "/dashboard/admin/campaigns",
    },
    {
      id: "system",
      name: "Système",
      icon: Settings,
      href: "/dashboard/admin/system",
    },
  ];

  const renderNavigationItem = (item: NavItem) => {
    const ItemIcon = item.icon;
    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

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
              className={`w-full justify-between hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors duration-200 ${
                isActive ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-300"
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
                  className={`w-full justify-start h-8 px-3 text-sm hover:bg-gray-700 rounded-md transition-colors duration-200 ${
                    pathname === subItem.href
                      ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 font-medium"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Link href={subItem.href}>
                    <span
                      className={`w-2 h-2 rounded-full mr-3 ${
                        pathname === subItem.href ? "bg-blue-400" : "bg-gray-600"
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
          className={`w-full justify-start hover:bg-gray-700 transition-colors duration-200 ${
            isActive ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-300"
          }`}
        >
          <Link href={item.href}>
            <ItemIcon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        </Button>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Header sidebar */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <Link href="/dashboard/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">Admin</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-400"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User info */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {profile?.name?.charAt(0) || user?.email?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-white truncate">
                {profile?.name || 'Administrateur'}
              </h3>
              <p className="text-sm text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <Shield className="w-3 h-3 mr-1" />
            Super Admin
          </Badge>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto">
          <div className="w-full space-y-1">
            {navigationItems.map(renderNavigationItem)}
          </div>
        </nav>

        {/* Footer sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <Button
            variant="ghost"
            onClick={handleSwitchToClient}
            className="w-full justify-start mb-2 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <ArrowLeftRight className="w-5 h-5 mr-3" />
            Interface Client
          </Button>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-red-400 hover:bg-red-500/20 hover:text-red-300"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Se déconnecter
          </Button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-gray-800 shadow-sm border-b border-gray-700 h-16 flex items-center justify-between px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-gray-400"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-4 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-gray-400">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    5
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-gray-800 border-gray-700">
                <DropdownMenuItem className="p-4 text-gray-300 hover:bg-gray-700">
                  <div>
                    <h4 className="font-medium">Nouveau utilisateur</h4>
                    <p className="text-sm text-gray-500">Jean Dupont vient de s&apos;inscrire</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="p-4 text-gray-300 hover:bg-gray-700">
                  <div>
                    <h4 className="font-medium">Paiement reçu</h4>
                    <p className="text-sm text-gray-500">990€ - Facture #1234</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <Settings className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                <DropdownMenuItem asChild className="text-gray-300 hover:bg-gray-700">
                  <Link href="/dashboard/admin/system">Paramètres système</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-red-500/20">
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content */}
        <main className="p-6 bg-gray-900 min-h-[calc(100vh-64px)]">{children}</main>
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
