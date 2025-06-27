
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  FileText, 
  Zap, 
  CreditCard, 
  Settings,
  Wand2
} from 'lucide-react';

export const adminNavigationItems = [
  {
    id: 'dashboard',
    name: 'Tableau de bord',
    icon: LayoutDashboard,
    href: '/admin/dashboard',
    badge: null
  },
  {
    id: 'users',
    name: 'Utilisateurs',
    icon: Users,
    href: '/admin/users',
    badge: null,
    submenu: [
      { name: 'Tous les utilisateurs', href: '/admin/users' },
      { name: 'Utilisateurs suspendus', href: '/admin/users/suspended' },
      { name: 'Créer un utilisateur', href: '/admin/users/create' }
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart3,
    href: '/admin/analytics',
    badge: null,
    submenu: [
      { name: 'Vue d\'ensemble', href: '/admin/analytics/overview' },
      { name: 'Revenus', href: '/admin/analytics/revenue' },
      { name: 'Performance', href: '/admin/analytics/performance' },
      { name: 'Utilisateurs', href: '/admin/analytics/users' }
    ]
  },
  {
    id: 'blog',
    name: 'Blog',
    icon: FileText,
    href: '/admin/blog',
    badge: null,
    submenu: [
      { name: 'Articles', href: '/admin/blog/posts' },
      { name: 'Créer un article', href: '/admin/blog/create' },
      { name: 'Catégories', href: '/admin/blog/categories' },
      { name: 'Commentaires', href: '/admin/blog/comments' }
    ]
  },
  {
    id: 'campaigns',
    name: 'Campagnes',
    icon: Zap,
    href: '/admin/campaigns',
    badge: null,
    submenu: [
      { name: 'Email Marketing', href: '/admin/campaigns/email' },
      { name: 'SMS Marketing', href: '/admin/campaigns/sms' },
      { name: 'Automation', href: '/admin/campaigns/automation' }
    ]
  },
  {
    id: 'content-creation',
    name: 'Création de Contenu IA',
    icon: Wand2,
    href: '/admin/content-creation',
    badge: 'Nouveau'
  },
  {
    id: 'billing',
    name: 'Facturation',
    icon: CreditCard,
    href: '/admin/billing',
    badge: null,
    submenu: [
      { name: 'Factures', href: '/admin/billing/invoices' },
      { name: 'Paiements', href: '/admin/billing/payments' },
      { name: 'Abonnements', href: '/admin/billing/subscriptions' }
    ]
  },
  {
    id: 'system',
    name: 'Système',
    icon: Settings,
    href: '/admin/system',
    badge: null,
    submenu: [
      { name: 'Configuration', href: '/admin/system/config' },
      { name: 'Logs', href: '/admin/system/logs' },
      { name: 'Sauvegardes', href: '/admin/system/backups' },
      { name: 'Sécurité', href: '/admin/system/security' }
    ]
  }
];
