
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
      
      // Common
      "button.learn_more": "En savoir plus",
      "button.contact": "Nous contacter",
      "button.get_quote": "Obtenir un devis"
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
      
      // Common
      "button.learn_more": "Learn more",
      "button.contact": "Contact us",
      "button.get_quote": "Get a quote"
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
    }
  });

export default i18n;
