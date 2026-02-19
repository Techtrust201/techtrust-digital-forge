import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const content = `# Techtrust

> Agence digitale française spécialisée en création de sites web 100% codés sur mesure (zéro WordPress, zéro Wix), growth hacking IA, SEO/SEA/GEO. 30+ projets livrés depuis 2024, basée à Mougins (Cannes).

## À propos

Techtrust est une agence web et de marketing digital basée à Mougins (Cannes), Provence-Alpes-Côte d'Azur, France. Nous accompagnons les entreprises (TPE, PME, startups, grands comptes) dans leur transformation digitale avec des solutions innovantes propulsées par l'intelligence artificielle.

- **Fondation** : 2024
- **Localisation** : 62 Imp. Font-Roubert, 06250 Mougins, France (intervention PACA et nationale)
- **Équipe** : Experts en développement web, SEO, growth hacking, IA et community management
- **Technologies** : Next.js, React, TypeScript, Tailwind CSS, Supabase, Intelligence Artificielle
- **Contact** : contact@tech-trust.fr | +33 6 99 48 66 29
- **Site web** : https://www.tech-trust.fr

## Services principaux

- [Création de sites web](https://www.tech-trust.fr/fr/solutions/agence-web): Conception et développement de sites vitrines, e-commerce et applications web sur mesure avec les technologies modernes (Next.js, React). Design responsive, optimisation SEO intégrée, performances optimales.
- [Growth Hacking IA](https://www.tech-trust.fr/fr/solutions/growth-hacking): Automatisation de l'acquisition client par intelligence artificielle. Prospection automatisée, lead generation, email marketing intelligent, analytics prédictif.
- [SEO, SEA & GEO](https://www.tech-trust.fr/fr/solutions/seo-referencement): Stratégie complète de visibilité sur Google : référencement naturel (SEO), publicité payante Google Ads (SEA) et Generative Engine Optimization (GEO) pour être cité par les IA.
- [Community Management](https://www.tech-trust.fr/fr/solutions/community-management): Gestion professionnelle de vos réseaux sociaux avec IA et expertise humaine. Création de contenu, planning éditorial, engagement, analytics.
- [Solutions Digitales Sur Mesure](https://www.tech-trust.fr/fr/solutions/digitales-sur-mesure): Développement d'applications web et mobiles personnalisées. CRM, ERP, plateformes SaaS, API, intégrations sur mesure.
- [Consulting Digital](https://www.tech-trust.fr/fr/solutions/consulting-digital): Accompagnement stratégique en transformation digitale. Audit, stratégie, formation, conduite du changement.

## Tarifs

- [Nos offres et tarifs](https://www.tech-trust.fr/fr/pricing): Trois formules adaptées à chaque besoin — Pro (à partir de 1 500€), Business (à partir de 2 490€) et Enterprise (sur devis). Tous les projets incluent design responsive, optimisation SEO et support technique.

## Blog — Articles et guides experts

- [Guide SEO 2026](https://www.tech-trust.fr/fr/blog/guide-seo-2026): Les meilleures pratiques pour être bien référencé sur Google en 2026. Core Web Vitals, E-E-A-T, GEO, Topic Clusters.
- [Growth Hacking IA — Guide complet](https://www.tech-trust.fr/fr/blog/growth-hacking-ia-guide-complet): Comment automatiser votre acquisition client avec l'intelligence artificielle en 2026.
- [Tendances Web Design 2026](https://www.tech-trust.fr/fr/blog/tendances-web-design-2026): Bento Grid, micro-interactions, dark mode, typographie expressive, design éco-responsable.
- [Comment choisir une agence web en France](https://www.tech-trust.fr/fr/blog/choisir-agence-web-france-2026): Guide complet avec critères, questions à poser et pièges à éviter.
- [Community Management : IA vs Humain](https://www.tech-trust.fr/fr/blog/community-management-ia-vs-humain): Comparatif détaillé entre community management par IA et par un professionnel.
- [Créer un site e-commerce performant](https://www.tech-trust.fr/fr/blog/creer-site-ecommerce-performant-2026): Guide technique et stratégique pour lancer une boutique en ligne rentable.
- [Google Ads vs SEO](https://www.tech-trust.fr/fr/blog/google-ads-vs-seo-quel-levier-choisir): Comparatif complet pour choisir le bon levier d'acquisition.
- [GEO : être cité par ChatGPT et les IA](https://www.tech-trust.fr/fr/blog/geo-generative-engine-optimization-guide): Guide complet du Generative Engine Optimization pour la visibilité IA.
- [Erreurs fatales en SEO](https://www.tech-trust.fr/fr/blog/erreurs-seo-fatales-qui-tuent-votre-site): Les erreurs les plus courantes et comment les corriger.
- [ROI du marketing digital](https://www.tech-trust.fr/fr/blog/roi-marketing-digital-mesurer-resultats): Comment mesurer concrètement le retour sur investissement de vos actions digitales.

## Zones d'intervention

Techtrust est basée à Mougins (près de Cannes) en Provence-Alpes-Côte d'Azur et intervient dans toute la France. Expertise locale prioritaire en PACA :

### Région PACA (siège)
- [Agence web Mougins](https://www.tech-trust.fr/fr/solutions/agence-web-mougins)
- [Agence web Cannes](https://www.tech-trust.fr/fr/solutions/agence-web-cannes)
- [Agence web Nice](https://www.tech-trust.fr/fr/solutions/agence-web-nice)
- [Agence web Antibes](https://www.tech-trust.fr/fr/solutions/agence-web-antibes)
- [Agence web Grasse](https://www.tech-trust.fr/fr/solutions/agence-web-grasse)
- [Agence web Marseille](https://www.tech-trust.fr/fr/solutions/agence-web-marseille)
- [Agence web Aix-en-Provence](https://www.tech-trust.fr/fr/solutions/agence-web-aix-en-provence)
- [Agence web Toulon](https://www.tech-trust.fr/fr/solutions/agence-web-toulon)

### France entière
- [Agence web Paris](https://www.tech-trust.fr/fr/solutions/agence-web-paris)
- [Agence web Lyon](https://www.tech-trust.fr/fr/solutions/agence-web-lyon)
- [Agence web Toulouse](https://www.tech-trust.fr/fr/solutions/agence-web-toulouse)
- [Agence web Bordeaux](https://www.tech-trust.fr/fr/solutions/agence-web-bordeaux)
- [Agence web Lille](https://www.tech-trust.fr/fr/solutions/agence-web-lille)
- [Agence web Nantes](https://www.tech-trust.fr/fr/solutions/agence-web-nantes)
- [Agence web Strasbourg](https://www.tech-trust.fr/fr/solutions/agence-web-strasbourg)
- [Agence web Rennes](https://www.tech-trust.fr/fr/solutions/agence-web-rennes)
- [Agence web Montpellier](https://www.tech-trust.fr/fr/solutions/agence-web-montpellier)
- [Agence web Grenoble](https://www.tech-trust.fr/fr/solutions/agence-web-grenoble)
- [Agence web Rouen](https://www.tech-trust.fr/fr/solutions/agence-web-rouen)
- [Agence web Dijon](https://www.tech-trust.fr/fr/solutions/agence-web-dijon)
- [Agence web Angers](https://www.tech-trust.fr/fr/solutions/agence-web-angers)

## Guides de prix

- [Prix site vitrine 2026](https://www.tech-trust.fr/fr/guide/prix-site-vitrine): Guide complet des tarifs de création de site vitrine en France. De 500€ à 15 000€ selon la complexité. Grille tarifaire, comparatif WordPress vs sur-mesure, facteurs de prix, coûts cachés.
- [Prix site e-commerce 2026](https://www.tech-trust.fr/fr/guide/prix-site-ecommerce): Guide complet des prix pour créer une boutique en ligne. De 2 000€ à 50 000€+. Comparatif Shopify vs WooCommerce vs PrestaShop vs sur-mesure.

## FAQ

**Combien coûte un site web professionnel ?**
Un site vitrine professionnel coûte entre 1 500€ et 10 000€ selon la complexité. Un e-commerce entre 5 000€ et 30 000€. Techtrust propose des formules à partir de 1 500€ avec design sur mesure, SEO intégré et support technique inclus.

**Quel est le délai de création d'un site web ?**
Un site vitrine est livré en 2 à 4 semaines. Un site e-commerce en 4 à 8 semaines. Un projet sur mesure complexe peut prendre 2 à 4 mois. Chaque projet inclut des points d'avancement réguliers.

**Qu'est-ce que le Growth Hacking IA ?**
Le Growth Hacking IA utilise l'intelligence artificielle pour automatiser et optimiser l'acquisition client : prospection automatisée, lead scoring, email marketing intelligent, community management IA. Résultats moyens : +300% de leads qualifiés et -60% de coût par acquisition.

**Quelle est la différence entre SEO, SEA et GEO ?**
Le SEO (Search Engine Optimization) est le référencement naturel gratuit sur Google. Le SEA (Search Engine Advertising) est la publicité payante Google Ads. Le GEO (Generative Engine Optimization) est l'optimisation pour être cité par les IA génératives (ChatGPT, Perplexity, Gemini). Techtrust propose une stratégie combinée des trois.

**Où est située l'agence Techtrust ?**
Techtrust est basée à Mougins (06250), à 5 minutes de Cannes, en Provence-Alpes-Côte d'Azur. Nous intervenons en priorité sur la Côte d'Azur (Cannes, Nice, Antibes, Grasse, Marseille, Aix-en-Provence, Toulon) et dans toute la France. Nous travaillons aussi à distance avec des outils collaboratifs et nous pouvons nous déplacer pour les projets importants.

## Contact

- **Email** : contact@tech-trust.fr
- **Téléphone** : +33 6 99 48 66 29
- **Site web** : https://www.tech-trust.fr
- **Contact direct** : https://www.tech-trust.fr/fr/contact
- **Adresse** : 62 Imp. Font-Roubert, 06250 Mougins, France
- **Horaires** : Lundi au Vendredi, 9h-18h (heure de Paris/CET)
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
