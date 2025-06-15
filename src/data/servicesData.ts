
import { 
  Monitor,
  Zap,
  Crown,
  Users,
  Settings,
  Lightbulb
} from 'lucide-react';

export const servicesData = {
  website: {
    title: "Sites Web Pro",
    subtitle: "Sites professionnels & E-commerce",
    description: "Développement de sites web modernes 2025, optimisés SEO et adaptés à tous les appareils.",
    icon: Monitor,
    color: "blue",
    bgGradient: "from-blue-500 to-blue-600",
    lightBg: "bg-blue-50",
    darkColor: "text-blue-700",
    packages: [
      {
        id: "website-starter",
        name: "Starter",
        price: 990,
        duration: "Paiement unique",
        popular: false,
        features: [
          "Site vitrine 5 pages",
          "Design responsive",
          "Optimisation SEO de base",
          "Formulaire de contact",
          "Hébergement 1 an inclus",
          "SSL gratuit",
          "Support email"
        ],
        notIncluded: [
          "E-commerce",
          "Analytics avancées",
          "Maintenance premium"
        ]
      },
      {
        id: "website-business",
        name: "Business",
        price: 1599,
        duration: "Paiement unique",
        popular: true,
        features: [
          "Site web jusqu'à 15 pages",
          "Design sur mesure",
          "Optimisation SEO avancée",
          "Blog intégré",
          "Formulaires avancés",
          "Hébergement 2 ans inclus",
          "SSL & CDN inclus",
          "Analytics Google",
          "Support prioritaire"
        ],
        notIncluded: [
          "E-commerce complet",
          "Fonctionnalités avancées"
        ]
      },
      {
        id: "website-premium",
        name: "Premium E-commerce",
        price: 2999,
        duration: "Paiement unique",
        popular: false,
        features: [
          "Site e-commerce complet",
          "Nombre de pages illimité",
          "Design premium personnalisé",
          "SEO e-commerce avancé",
          "Système de paiement intégré",
          "Gestion stock automatisée",
          "Multi-devises & langues",
          "Analytics e-commerce",
          "Formation complète",
          "Support VIP 24/7"
        ],
        notIncluded: []
      }
    ]
  },
  growth: {
    title: "Growth Hacking",
    subtitle: "Acquisition & Croissance",
    description: "Stratégies de growth hacking pour multiplier vos leads et conversions. Prospection automatisée, email marketing et optimisation des tunnels de vente.",
    icon: Zap,
    color: "purple",
    bgGradient: "from-purple-500 to-purple-600",
    lightBg: "bg-purple-50",
    darkColor: "text-purple-700",
    packages: [
      {
        id: "growth-easy",
        name: "Easy",
        price: 499,
        duration: "/mois",
        popular: false,
        features: [
          "1000 prospects/mois",
          "500 emails automatisés",
          "Lead generation basique",
          "2 réseaux sociaux",
          "Analytics de base",
          "Support email"
        ],
        notIncluded: [
          "SMS marketing",
          "Lead scoring avancé",
          "Intégrations CRM"
        ]
      },
      {
        id: "growth-pro",
        name: "Pro",
        price: 899,
        duration: "/mois",
        popular: true,
        features: [
          "5000 prospects/mois",
          "2000 emails automatisés",
          "Automation avancée",
          "5 réseaux sociaux",
          "Lead scoring IA",
          "Analytics avancées",
          "Intégrations CRM",
          "A/B testing",
          "Support chat"
        ],
        notIncluded: [
          "White label",
          "API access"
        ]
      },
      {
        id: "growth-enterprise",
        name: "Enterprise",
        price: 1599,
        duration: "/mois",
        popular: false,
        features: [
          "Prospects illimités",
          "Emails illimités",
          "IA propriétaire complète",
          "Tous réseaux sociaux",
          "Lead scoring premium",
          "Analytics temps réel",
          "Toutes intégrations",
          "White label complet",
          "API access complet",
          "Account manager dédié",
          "Support VIP 24/7"
        ],
        notIncluded: []
      }
    ]
  },
  custom: {
    title: "Solutions Sur Mesure",
    subtitle: "Développement personnalisé",
    description: "Logiciels métier, CRM, ERP et applications sur mesure pour optimiser vos processus et booster votre productivité.",
    icon: Settings,
    color: "green",
    bgGradient: "from-green-500 to-green-600",
    lightBg: "bg-green-50",
    darkColor: "text-green-700",
    packages: [
      {
        id: "custom-audit",
        name: "Audit & Conseil",
        price: 1500,
        duration: "Paiement unique",
        popular: false,
        features: [
          "Audit complet de vos besoins",
          "Recommandations personnalisées",
          "Roadmap de développement",
          "Estimation détaillée",
          "Support conseil 30 jours"
        ],
        notIncluded: [
          "Développement inclus",
          "Maintenance"
        ]
      },
      {
        id: "custom-app",
        name: "Application Sur Mesure",
        price: "À partir de 15 000",
        duration: "Selon projet",
        popular: true,
        features: [
          "Développement complet",
          "Design UX/UI personnalisé",
          "Base de données optimisée",
          "Intégrations API",
          "Tests & déploiement",
          "Formation équipe",
          "Maintenance 6 mois",
          "Support technique"
        ],
        notIncluded: []
      },
      {
        id: "custom-enterprise",
        name: "Solution Enterprise",
        price: "À partir de 50 000",
        duration: "Selon projet",
        popular: false,
        features: [
          "Architecture enterprise",
          "Sécurité avancée",
          "Haute disponibilité",
          "Intégrations complexes",
          "Formation avancée",
          "Support 24/7",
          "SLA garantis",
          "Account manager dédié"
        ],
        notIncluded: []
      }
    ]
  },
  community: {
    title: "Community Management",
    subtitle: "Réseaux sociaux & Contenu",
    description: "Notre équipe de community managers experts gère vos réseaux avec stratégie personnalisée.",
    icon: Users,
    color: "pink",
    bgGradient: "from-pink-500 to-pink-600",
    lightBg: "bg-pink-50",
    darkColor: "text-pink-700",
    packages: [
      {
        id: "community-starter",
        name: "Starter",
        price: 799,
        duration: "/mois",
        popular: false,
        features: [
          "2 réseaux sociaux",
          "10 posts/mois",
          "Community manager junior",
          "Stratégie de base",
          "Reporting mensuel",
          "Support email"
        ],
        notIncluded: [
          "Vidéos premium",
          "Publicités payantes",
          "Stories quotidiennes"
        ]
      },
      {
        id: "community-growth",
        name: "Growth",
        price: 1499,
        duration: "/mois",
        popular: true,
        features: [
          "4 réseaux sociaux",
          "25 posts/mois",
          "Community manager senior",
          "Stratégie avancée",
          "Création contenu premium",
          "Stories quotidiennes",
          "Reporting détaillé",
          "Support prioritaire"
        ],
        notIncluded: [
          "Influenceurs",
          "Événements"
        ]
      },
      {
        id: "community-premium",
        name: "Premium",
        price: 2999,
        duration: "/mois",
        popular: false,
        features: [
          "Tous réseaux sociaux",
          "Posts illimités",
          "Équipe dédiée complète",
          "Stratégie sur mesure",
          "Contenu premium + vidéos",
          "Gestion influenceurs",
          "Événements communauté",
          "Analytics avancées",
          "Account manager",
          "Support VIP 24/7"
        ],
        notIncluded: []
      }
    ]
  },
  consulting: {
    title: "Consulting Digital",
    subtitle: "Expertise & accompagnement",
    description: "Audit, stratégie et accompagnement personnalisé pour votre transformation digitale.",
    icon: Lightbulb,
    color: "slate",
    bgGradient: "from-slate-500 to-slate-600",
    lightBg: "bg-slate-50",
    darkColor: "text-slate-700",
    packages: [
      {
        id: "consulting-audit",
        name: "Audit Digital",
        price: 2500,
        duration: "Paiement unique",
        popular: false,
        features: [
          "Audit complet digital",
          "Analyse concurrentielle",
          "Recommandations stratégiques",
          "Plan d'action détaillé",
          "Présentation exécutive",
          "Support 15 jours"
        ],
        notIncluded: [
          "Mise en œuvre",
          "Formation équipe"
        ]
      },
      {
        id: "consulting-strategy",
        name: "Stratégie & Accompagnement",
        price: 4500,
        duration: "/mois",
        popular: true,
        features: [
          "Stratégie digitale complète",
          "Accompagnement mensuel",
          "Sessions de coaching",
          "Suivi des KPIs",
          "Optimisations continues",
          "Reporting détaillé",
          "Formation équipe",
          "Support prioritaire"
        ],
        notIncluded: [
          "Développement technique"
        ]
      },
      {
        id: "consulting-premium",
        name: "Transformation Complète",
        price: "À partir de 15 000",
        duration: "Selon projet",
        popular: false,
        features: [
          "Transformation digitale 360°",
          "Accompagnement sur mesure",
          "Formation avancée équipe",
          "Mise en place process",
          "Outils & technologies",
          "Suivi performance",
          "Support dédié 6 mois",
          "Consultant dédié"
        ],
        notIncluded: []
      }
    ]
  }
};
