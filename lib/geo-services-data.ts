export interface GeoServiceConfig {
  slug: string;
  prefix: string;
  title: string;
  geoTitle: (city: string) => string;
  geoMetaTitle: (city: string) => string;
  geoMetaDescription: (city: string, region: string) => string;
  geoKeywords: (city: string) => string[];
  heroSubtitle: string;
  services: { iconName: string; title: string; description: string }[];
  whyTitle: (city: string) => string;
  whyText: (city: string) => string;
  ctaTitle: (city: string) => string;
  citiesTitle: string;
  cityLabel: (cityName: string) => string;
  schemaServiceType: string;
  schemaDescription: (city: string) => string;
}

export const geoServices: GeoServiceConfig[] = [
  {
    slug: 'agence-web',
    prefix: 'agence-web-',
    title: 'Agence Web',
    geoTitle: (city) => `Agence Web à ${city}`,
    geoMetaTitle: (city) => `Agence Web ${city} - Création Site Web & SEO | Techtrust`,
    geoMetaDescription: (city, region) =>
      `Agence web à ${city} (${region}). Création de sites web codés sur mesure de A à Z, SEO, growth hacking et solutions digitales. Devis gratuit en 24h.`,
    geoKeywords: (city) => [
      `agence web ${city.toLowerCase()}`,
      `création site web ${city.toLowerCase()}`,
      `seo ${city.toLowerCase()}`,
      `agence digitale ${city.toLowerCase()}`,
      `développeur web ${city.toLowerCase()}`,
      `site internet ${city.toLowerCase()}`,
    ],
    heroSubtitle: 'Création Site Web & SEO',
    services: [
      { iconName: 'Globe', title: 'Création de Sites Web', description: 'Sites vitrines, e-commerce et applications web sur mesure, optimisés pour la performance et le SEO local.' },
      { iconName: 'Target', title: 'SEO & Référencement Local', description: 'Optimisation pour les recherches locales, Google My Business et positionnement dans votre zone géographique.' },
      { iconName: 'Zap', title: 'Growth Hacking IA', description: "Automatisation de votre acquisition client avec nos outils d'intelligence artificielle propriétaires." },
    ],
    whyTitle: (city) => `Pourquoi choisir Techtrust comme votre agence web à ${city} ?`,
    whyText: (city) =>
      `Chez Techtrust, chaque site est codé de A à Z — zéro template, zéro WordPress, zéro Wix. Nous sommes le partenaire digital idéal pour les entreprises de ${city}. Nous combinons code sur mesure, connaissance du marché local et outils IA de pointe.`,
    ctaTitle: (city) => `Lancez votre projet digital à ${city}`,
    citiesTitle: 'Nos agences web dans toute la France',
    cityLabel: (cityName) => `Agence Web ${cityName}`,
    schemaServiceType: 'Développement Web',
    schemaDescription: (city) => `Agence web à ${city} spécialisée en création de sites web, SEO et growth hacking.`,
  },
  {
    slug: 'growth-hacking',
    prefix: 'growth-hacking-',
    title: 'Growth Hacking IA',
    geoTitle: (city) => `Growth Hacking IA à ${city}`,
    geoMetaTitle: (city) => `Growth Hacking IA ${city} - Acquisition Client Automatisée | Techtrust`,
    geoMetaDescription: (city, region) =>
      `Agence growth hacking IA à ${city} (${region}). Acquisition clients automatisée, marketing prédictif, lead generation par intelligence artificielle. +300% de croissance. Devis gratuit.`,
    geoKeywords: (city) => [
      `growth hacking ${city.toLowerCase()}`,
      `agence growth hacking ${city.toLowerCase()}`,
      `acquisition client ${city.toLowerCase()}`,
      `marketing automation ${city.toLowerCase()}`,
      `lead generation ${city.toLowerCase()}`,
      `prospection automatisée ${city.toLowerCase()}`,
    ],
    heroSubtitle: 'Acquisition Client Automatisée par IA',
    services: [
      { iconName: 'Brain', title: 'Prospection IA Automatisée', description: "Notre IA identifie et engage vos prospects idéaux sur LinkedIn, email et réseaux sociaux, 24h/24." },
      { iconName: 'BarChart3', title: 'Analytics & Marketing Prédictif', description: "Anticipez les comportements d'achat grâce à l'analyse prédictive et optimisez vos campagnes en temps réel." },
      { iconName: 'Bot', title: 'Chatbots & Automatisation', description: "Chatbots intelligents qui qualifient vos leads, répondent aux questions et prennent des rendez-vous automatiquement." },
    ],
    whyTitle: (city) => `Pourquoi choisir Techtrust pour votre growth hacking à ${city} ?`,
    whyText: (city) =>
      `Notre approche combine intelligence artificielle de pointe et connaissance du marché local de ${city}. Nous automatisons votre acquisition client pour générer des leads qualifiés en continu, avec un ROI mesurable dès les premières semaines.`,
    ctaTitle: (city) => `Boostez votre croissance à ${city}`,
    citiesTitle: 'Growth Hacking IA dans toute la France',
    cityLabel: (cityName) => `Growth Hacking ${cityName}`,
    schemaServiceType: 'Marketing Digital',
    schemaDescription: (city) => `Agence de growth hacking IA à ${city} spécialisée en acquisition client automatisée et marketing prédictif.`,
  },
  {
    slug: 'seo-referencement',
    prefix: 'seo-referencement-',
    title: 'SEO & Référencement',
    geoTitle: (city) => `SEO & Référencement à ${city}`,
    geoMetaTitle: (city) => `SEO ${city} - Référencement Google & Visibilité IA | Techtrust`,
    geoMetaDescription: (city, region) =>
      `Expert SEO à ${city} (${region}). Référencement naturel Google, Google Ads (SEA), optimisation Google My Business et visibilité IA (GEO). Audit gratuit, +500% trafic organique.`,
    geoKeywords: (city) => [
      `seo ${city.toLowerCase()}`,
      `référencement ${city.toLowerCase()}`,
      `agence seo ${city.toLowerCase()}`,
      `google ads ${city.toLowerCase()}`,
      `référencement google ${city.toLowerCase()}`,
      `seo local ${city.toLowerCase()}`,
    ],
    heroSubtitle: 'Visibilité Google & IA',
    services: [
      { iconName: 'Search', title: 'SEO - Référencement Naturel', description: "Audit technique, optimisation on-page, netlinking et stratégie de contenu pour dominer les résultats Google." },
      { iconName: 'Target', title: 'SEA - Google Ads', description: "Campagnes Google Ads optimisées par IA pour un ROI maximal. Shopping, Search, Display et YouTube Ads." },
      { iconName: 'Sparkles', title: 'GEO - Visibilité IA', description: "Optimisation pour être cité par ChatGPT, Perplexity et Gemini. Le nouveau levier de visibilité incontournable." },
    ],
    whyTitle: (city) => `Pourquoi choisir Techtrust comme agence SEO à ${city} ?`,
    whyText: (city) =>
      `Notre expertise SEO combine les trois piliers de la visibilité en ligne : le référencement naturel (SEO), la publicité Google (SEA) et l'optimisation pour les IA génératives (GEO). À ${city}, nous ciblons précisément votre marché local pour des résultats concrets et mesurables.`,
    ctaTitle: (city) => `Dominez Google à ${city}`,
    citiesTitle: 'SEO & Référencement dans toute la France',
    cityLabel: (cityName) => `SEO ${cityName}`,
    schemaServiceType: 'Référencement Web',
    schemaDescription: (city) => `Expert SEO à ${city} spécialisé en référencement naturel Google, Google Ads et optimisation pour les IA.`,
  },
  {
    slug: 'community-management',
    prefix: 'community-management-',
    title: 'Community Management',
    geoTitle: (city) => `Community Management à ${city}`,
    geoMetaTitle: (city) => `Community Management ${city} - Gestion Réseaux Sociaux | Techtrust`,
    geoMetaDescription: (city, region) =>
      `Community manager expert à ${city} (${region}). Gestion réseaux sociaux, création de contenu, engagement audience. Instagram, LinkedIn, TikTok, Facebook. +150% d'engagement garanti.`,
    geoKeywords: (city) => [
      `community management ${city.toLowerCase()}`,
      `community manager ${city.toLowerCase()}`,
      `réseaux sociaux ${city.toLowerCase()}`,
      `gestion instagram ${city.toLowerCase()}`,
      `social media ${city.toLowerCase()}`,
      `création contenu ${city.toLowerCase()}`,
    ],
    heroSubtitle: 'Gestion Réseaux Sociaux & Contenu',
    services: [
      { iconName: 'MessageSquare', title: 'Gestion Réseaux Sociaux', description: "Prise en charge complète de vos comptes Instagram, LinkedIn, TikTok et Facebook avec une stratégie adaptée à votre marché local." },
      { iconName: 'Sparkles', title: 'Création de Contenu IA', description: "Contenus engageants créés par notre IA et validés par nos experts : posts, stories, reels, vidéos courtes." },
      { iconName: 'TrendingUp', title: 'Stratégie & Analytics', description: "Planning éditorial, veille concurrentielle et reporting détaillé pour optimiser votre présence sociale en continu." },
    ],
    whyTitle: (city) => `Pourquoi choisir Techtrust comme community manager à ${city} ?`,
    whyText: (city) =>
      `Notre approche combine intelligence artificielle et expertise humaine pour gérer vos réseaux sociaux à ${city}. Nous créons du contenu engageant adapté à votre audience locale, avec un planning éditorial cohérent et des résultats mesurables.`,
    ctaTitle: (city) => `Boostez vos réseaux sociaux à ${city}`,
    citiesTitle: 'Community Management dans toute la France',
    cityLabel: (cityName) => `CM ${cityName}`,
    schemaServiceType: 'Community Management',
    schemaDescription: (city) => `Community management expert à ${city} spécialisé en gestion de réseaux sociaux et création de contenu.`,
  },
  {
    slug: 'consulting-digital',
    prefix: 'consulting-digital-',
    title: 'Consulting Digital',
    geoTitle: (city) => `Consulting Digital à ${city}`,
    geoMetaTitle: (city) => `Consulting Digital ${city} - Transformation Digitale | Techtrust`,
    geoMetaDescription: (city, region) =>
      `Consultant digital expert à ${city} (${region}). Transformation digitale, stratégie numérique, innovation technologique et accompagnement sur mesure pour votre entreprise.`,
    geoKeywords: (city) => [
      `consulting digital ${city.toLowerCase()}`,
      `consultant digital ${city.toLowerCase()}`,
      `transformation digitale ${city.toLowerCase()}`,
      `stratégie digitale ${city.toLowerCase()}`,
      `conseil numérique ${city.toLowerCase()}`,
      `innovation digitale ${city.toLowerCase()}`,
    ],
    heroSubtitle: 'Transformation Digitale & Innovation',
    services: [
      { iconName: 'Lightbulb', title: 'Audit & Stratégie Digitale', description: "Analyse complète de votre maturité numérique et définition d'une feuille de route digitale adaptée à votre marché." },
      { iconName: 'Target', title: 'Accompagnement Projet', description: "Pilotage de vos projets digitaux de A à Z : cahier des charges, choix technologiques, gestion de projet, mise en production." },
      { iconName: 'TrendingUp', title: 'Formation & Conduite du Changement', description: "Formation de vos équipes aux outils digitaux et accompagnement dans l'adoption des nouvelles pratiques." },
    ],
    whyTitle: (city) => `Pourquoi choisir Techtrust comme consultant digital à ${city} ?`,
    whyText: (city) =>
      `Notre expertise en transformation digitale s'appuie sur une connaissance fine du tissu économique de ${city}. Nous accompagnons les entreprises locales dans leur transition numérique avec une approche pragmatique et orientée résultats.`,
    ctaTitle: (city) => `Transformez votre entreprise à ${city}`,
    citiesTitle: 'Consulting Digital dans toute la France',
    cityLabel: (cityName) => `Consulting ${cityName}`,
    schemaServiceType: 'Consulting Digital',
    schemaDescription: (city) => `Consultant digital à ${city} spécialisé en transformation digitale et stratégie numérique.`,
  },
  {
    slug: 'digitales-sur-mesure',
    prefix: 'digitales-sur-mesure-',
    title: 'Solutions Sur Mesure',
    geoTitle: (city) => `Solutions Digitales Sur Mesure à ${city}`,
    geoMetaTitle: (city) => `Développement Sur Mesure ${city} - Applications & Logiciels | Techtrust`,
    geoMetaDescription: (city, region) =>
      `Développement logiciel sur mesure à ${city} (${region}). Applications web, mobiles, CRM, ERP et plateformes SaaS personnalisées. Code propriétaire, technologies modernes. Devis gratuit.`,
    geoKeywords: (city) => [
      `développement sur mesure ${city.toLowerCase()}`,
      `logiciel sur mesure ${city.toLowerCase()}`,
      `application web ${city.toLowerCase()}`,
      `développeur ${city.toLowerCase()}`,
      `agence développement ${city.toLowerCase()}`,
      `CRM sur mesure ${city.toLowerCase()}`,
    ],
    heroSubtitle: 'Applications & Logiciels Personnalisés',
    services: [
      { iconName: 'Code', title: 'Applications Web & Mobiles', description: "Développement d'applications performantes avec les technologies modernes : React, Next.js, React Native, TypeScript." },
      { iconName: 'Database', title: 'CRM, ERP & Logiciels Métier', description: "Solutions de gestion sur mesure adaptées à vos processus : CRM, ERP, outils de facturation, gestion de stocks." },
      { iconName: 'Layers', title: 'API & Intégrations', description: "Connexion de vos outils existants, développement d'API REST/GraphQL et intégrations avec vos partenaires." },
    ],
    whyTitle: (city) => `Pourquoi choisir Techtrust pour votre développement sur mesure à ${city} ?`,
    whyText: (city) =>
      `Notre équipe de développeurs seniors crée des solutions logicielles 100% sur mesure pour les entreprises de ${city}. Pas de templates, pas de low-code : du code propriétaire, maintenable et évolutif, conçu pour vos besoins spécifiques.`,
    ctaTitle: (city) => `Créez votre solution sur mesure à ${city}`,
    citiesTitle: 'Développement sur mesure dans toute la France',
    cityLabel: (cityName) => `Dev ${cityName}`,
    schemaServiceType: 'Développement Logiciel',
    schemaDescription: (city) => `Développement logiciel sur mesure à ${city} : applications web, mobiles, CRM, ERP et plateformes SaaS.`,
  },
];

export function findGeoService(villeParam: string): { service: GeoServiceConfig; citySlug: string } | null {
  for (const service of geoServices) {
    if (villeParam.startsWith(service.prefix)) {
      return {
        service,
        citySlug: villeParam.slice(service.prefix.length),
      };
    }
  }
  return null;
}

export function getAllGeoPrefixes(): string[] {
  return geoServices.map(s => s.prefix);
}
