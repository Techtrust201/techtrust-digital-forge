
import {
  Home,
  Users,
  BarChart3,
  Settings,
  FileText,
  Zap,
  CreditCard,
} from "lucide-react";
import { NavItem } from "@/types/admin";

export const navigationItems: NavItem[] = [
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
