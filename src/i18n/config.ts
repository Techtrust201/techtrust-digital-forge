
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      // Navigation
      "nav.solutions": "Solutions",
      "nav.pricing": "Tarifs",
      "nav.careers": "Carrières",
      "nav.contact": "Contact",
      "nav.blog": "Blog",
      "nav.help": "Aide",
      
      // Hero Section
      "hero.badge": "Agence digitale #1 en France 2025",
      "hero.title.line1": "Agence Web & Growth Hacking IA",
      "hero.title.line2": "Solutions Digitales 2025",
      "hero.description": "Transformez votre business avec nos outils IA de growth hacking + community management automatisés. Remplacez un commercial + community manager par notre IA, ou bénéficiez de notre équipe d'experts.",
      "hero.cta.primary": "Démarrer mon projet 2025",
      "hero.cta.secondary": "Découvrir nos solutions",
      "hero.trust": "Ils nous font confiance :",
      
      // Services
      "services.title": "Nos Solutions Digitales",
      "services.subtitle": "IA & Professionnelles",
      "services.description": "Vous avez le choix : Utilisez nos outils IA en autonomie pour automatiser votre growth hacking + community management, ou bénéficiez de l'expertise de nos professionnels pour un accompagnement sur mesure.",
      
      // Pricing
      "pricing.title": "Tarifs 2025 Transparents",
      "pricing.subtitle": "Des solutions IA accessibles à tous",
      "pricing.website.title": "Création Site Web",
      "pricing.growth.title": "Growth Hacking IA",
      "pricing.community.title": "Community Management Pro",
      "pricing.solutions.title": "Solutions Sur Mesure",
      "pricing.consulting.title": "Consulting Digital",
      
      // Dashboard
      "dashboard.welcome": "Bienvenue sur votre dashboard",
      "dashboard.projects": "Projets actifs",
      "dashboard.performance": "Performances",
      "dashboard.savings": "Économies",
      "dashboard.quality": "Score qualité",
      
      // Auth
      "auth.login": "Se connecter",
      "auth.register": "S'inscrire",
      "auth.email": "Email",
      "auth.password": "Mot de passe",
      "auth.name": "Nom complet",
      "auth.forgot": "Mot de passe oublié ?",
      
      // Common
      "button.learn_more": "En savoir plus",
      "button.contact": "Nous contacter",
      "button.get_quote": "Obtenir un devis",
      "button.start_project": "Démarrer mon projet",
      "button.discover": "Découvrir",
      "button.select": "Choisir ce plan",
      "button.selected": "Sélectionné",
      "button.logout": "Se déconnecter",
      "button.dashboard": "Tableau de bord",
      "button.manage": "Gérer",
      
      // Status
      "status.active": "Actif",
      "status.trial": "Essai",
      "status.pending": "En attente",
      "status.completed": "Terminé",
      "status.running": "En cours",
      
      // Tiers
      "tier.bronze": "Bronze",
      "tier.silver": "Silver", 
      "tier.gold": "Gold",
      "tier.diamond": "Diamond",
      
      // Notifications
      "notif.new_report": "Nouveau rapport disponible",
      "notif.ai_update": "Mise à jour IA",
      "notif.new_features": "Nouvelles fonctionnalités"
    }
  },
  en: {
    translation: {
      // Navigation
      "nav.solutions": "Solutions",
      "nav.pricing": "Pricing",
      "nav.careers": "Careers",
      "nav.contact": "Contact",
      "nav.blog": "Blog",
      "nav.help": "Help",
      
      // Hero Section
      "hero.badge": "#1 Digital Agency in France 2025",
      "hero.title.line1": "Web Agency & AI Growth Hacking",
      "hero.title.line2": "Digital Solutions 2025",
      "hero.description": "Transform your business with our automated AI growth hacking + community management tools. Replace a salesperson + community manager with our AI, or benefit from our team of experts.",
      "hero.cta.primary": "Start my 2025 project",
      "hero.cta.secondary": "Discover our solutions",
      "hero.trust": "They trust us:",
      
      // Services
      "services.title": "Our Digital Solutions",
      "services.subtitle": "AI & Professional",
      "services.description": "You have the choice: Use our AI tools autonomously to automate your growth hacking + community management, or benefit from the expertise of our professionals for tailor-made support.",
      
      // Pricing
      "pricing.title": "Transparent 2025 Pricing",
      "pricing.subtitle": "AI solutions accessible to everyone",
      "pricing.website.title": "Website Creation",
      "pricing.growth.title": "AI Growth Hacking",
      "pricing.community.title": "Pro Community Management",
      "pricing.solutions.title": "Custom Solutions",
      "pricing.consulting.title": "Digital Consulting",
      
      // Dashboard
      "dashboard.welcome": "Welcome to your dashboard",
      "dashboard.projects": "Active projects",
      "dashboard.performance": "Performance",
      "dashboard.savings": "Savings",
      "dashboard.quality": "Quality score",
      
      // Auth
      "auth.login": "Sign in",
      "auth.register": "Sign up",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.name": "Full name",
      "auth.forgot": "Forgot password?",
      
      // Common
      "button.learn_more": "Learn more",
      "button.contact": "Contact us",
      "button.get_quote": "Get a quote",
      "button.start_project": "Start my project",
      "button.discover": "Discover",
      "button.select": "Choose this plan",
      "button.selected": "Selected",
      "button.logout": "Sign out",
      "button.dashboard": "Dashboard",
      "button.manage": "Manage",
      
      // Status
      "status.active": "Active",
      "status.trial": "Trial",
      "status.pending": "Pending",
      "status.completed": "Completed",
      "status.running": "Running",
      
      // Tiers
      "tier.bronze": "Bronze",
      "tier.silver": "Silver",
      "tier.gold": "Gold", 
      "tier.diamond": "Diamond",
      
      // Notifications
      "notif.new_report": "New report available",
      "notif.ai_update": "AI update",
      "notif.new_features": "New features"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // langue par défaut
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    },
    debug: false,
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie']
    }
  });

export default i18n;
