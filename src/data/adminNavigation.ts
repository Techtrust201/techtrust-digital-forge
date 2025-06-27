
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
    label: 'Tableau de bord',
    icon: LayoutDashboard,
    href: '/admin/dashboard',
    badge: null
  },
  {
    id: 'users',
    label: 'Utilisateurs',
    icon: Users,
    href: '/admin/users',
    badge: null,
    submenu: [
      { label: 'Tous les utilisateurs', href: '/admin/users' },
      { label: 'Utilisateurs suspendus', href: '/admin/users/suspended' },
      { label: 'Créer un utilisateur', href: '/admin/users/create' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    href: '/admin/analytics',
    badge: null,
    submenu: [
      { label: 'Vue d\'ensemble', href: '/admin/analytics/overview' },
      { label: 'Revenus', href: '/admin/analytics/revenue' },
      { label: 'Performance', href: '/admin/analytics/performance' },
      { label: 'Utilisateurs', href: '/admin/analytics/users' }
    ]
  },
  {
    id: 'blog',
    label: 'Blog',
    icon: FileText,
    href: '/admin/blog',
    badge: null,
    submenu: [
      { label: 'Articles', href: '/admin/blog/posts' },
      { label: 'Créer un article', href: '/admin/blog/create' },
      { label: 'Catégories', href: '/admin/blog/categories' },
      { label: 'Commentaires', href: '/admin/blog/comments' }
    ]
  },
  {
    id: 'campaigns',
    label: 'Campagnes',
    icon: Zap,
    href: '/admin/campaigns',
    badge: null,
    submenu: [
      { label: 'Email Marketing', href: '/admin/campaigns/email' },
      { label: 'SMS Marketing', href: '/admin/campaigns/sms' },
      { label: 'Automation', href: '/admin/campaigns/automation' }
    ]
  },
  {
    id: 'content-creation',
    label: 'Création de Contenu IA',
    icon: Wand2,
    href: '/admin/content-creation',
    badge: 'Nouveau'
  },
  {
    id: 'billing',
    label: 'Facturation',
    icon: CreditCard,
    href: '/admin/billing',
    badge: null,
    submenu: [
      { label: 'Factures', href: '/admin/billing/invoices' },
      { label: 'Paiements', href: '/admin/billing/payments' },
      { label: 'Abonnements', href: '/admin/billing/subscriptions' }
    ]
  },
  {
    id: 'system',
    label: 'Système',
    icon: Settings,
    href: '/admin/system',
    badge: null,
    submenu: [
      { label: 'Configuration', href: '/admin/system/config' },
      { label: 'Logs', href: '/admin/system/logs' },
      { label: 'Sauvegardes', href: '/admin/system/backups' },
      { label: 'Sécurité', href: '/admin/system/security' }
    ]
  }
];
