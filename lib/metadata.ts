
import { Metadata } from 'next'

interface PageMetadata {
  title: string
  description: string
  keywords: string[]
  openGraph?: {
    title?: string
    description?: string
    images?: string[]
  }
}

const siteConfig = {
  name: "Techtrust",
  description: "Agence digitale française spécialisée en création de sites web, growth hacking et solutions digitales sur mesure. Boostez votre présence en ligne avec nos experts.",
  url: "https://www.tech-trust.fr",
  ogImage: "https://www.tech-trust.fr/og-image.jpg",
}

const pages: Record<string, PageMetadata> = {
  '/': {
    title: "Techtrust - Agence Web & Growth Hacking | Solutions Digitales Sur Mesure",
    description: "🚀 Agence digitale française #1 en création de sites web, growth hacking et développement de solutions digitales sur mesure. Community management, lead generation, logiciels personnalisés. Transformez votre business avec nos experts !",
    keywords: [
      "agence web",
      "agence digitale",
      "growth hacking",
      "solutions digitales sur mesure",
      "création site web",
      "développement web",
      "community management",
      "lead generation",
      "prospection digitale",
      "logiciel sur mesure",
      "agence marketing digital",
      "SEO",
      "développement application web",
      "e-commerce",
      "startup growth",
      "acquisition client",
      "automatisation marketing",
      "transformation digitale",
      "agence web France",
      "développeur web freelance"
    ],
    openGraph: {
      title: "Techtrust - L'agence qui transforme votre business digital",
      description: "De la création de votre site web à l'acquisition de vos premiers clients. Découvrez comment nos solutions sur mesure boostent la croissance de +200 entreprises.",
      images: [siteConfig.ogImage]
    }
  },
  '/solutions/agence-web': {
    title: "Création Site Web Professionnel | Agence Web Techtrust",
    description: "✨ Création de sites web professionnels, e-commerce et applications sur mesure. Design moderne, optimisation SEO, hébergement sécurisé. Devis gratuit sous 24h !",
    keywords: [
      "création site web",
      "agence web",
      "développement site internet",
      "site web professionnel",
      "e-commerce",
      "boutique en ligne",
      "site vitrine",
      "développeur web",
      "design web",
      "SEO",
      "responsive design",
      "CMS",
      "WordPress",
      "Shopify",
      "application web"
    ]
  },
  '/solutions/growth-hacking': {
    title: "Growth Hacking & Acquisition Clients | Stratégies de Croissance",
    description: "📈 Experts en growth hacking et acquisition de leads. Prospection automatisée, email marketing, SMS, réseaux sociaux. Multipliez vos ventes par 3 en 90 jours !",
    keywords: [
      "growth hacking",
      "acquisition client",
      "lead generation",
      "prospection digitale",
      "marketing automation",
      "email marketing",
      "SMS marketing",
      "growth marketing",
      "stratégie croissance",
      "conversion rate optimization",
      "funnel marketing",
      "social media marketing",
      "performance marketing"
    ]
  },
  '/solutions/digitales-sur-mesure': {
    title: "Développement Logiciel Sur Mesure | Solutions Digitales Custom",
    description: "⚡ Développement de logiciels et applications sur mesure. CRM, ERP, plateformes web, APIs. Solutions personnalisées pour optimiser vos processus métier.",
    keywords: [
      "développement logiciel sur mesure",
      "solutions digitales sur mesure",
      "logiciel personnalisé",
      "application métier",
      "CRM sur mesure",
      "ERP personnalisé",
      "développement custom",
      "plateforme web",
      "API development",
      "software development",
      "application web sur mesure",
      "système d'information"
    ]
  },
  '/pricing': {
    title: "Tarifs & Plans | Agence Digitale Techtrust - Devis Gratuit",
    description: "💰 Découvrez nos tarifs transparents pour création de sites web, growth hacking et développement sur mesure. Plans adaptés aux startups, PME et grandes entreprises.",
    keywords: [
      "tarif agence web",
      "prix création site web",
      "devis agence digitale",
      "coût développement web",
      "tarif growth hacking",
      "prix logiciel sur mesure"
    ]
  }
}

export function getServerMetadata(locale: string = 'fr', pathname: string = '/'): Metadata {
  const pageData = pages[pathname] || pages['/']
  
  const title = pageData.title
  const description = pageData.description
  
  return {
    title,
    description,
    keywords: pageData.keywords,
    authors: [{ name: "Techtrust" }],
    creator: "Techtrust",
    publisher: "Techtrust",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: `${siteConfig.url}/${locale}${pathname}`,
      languages: {
        'fr': `${siteConfig.url}/fr${pathname}`,
        'en': `${siteConfig.url}/en${pathname}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: `${siteConfig.url}/${locale}${pathname}`,
      title: pageData.openGraph?.title || title,
      description: pageData.openGraph?.description || description,
      siteName: siteConfig.name,
      images: [
        {
          url: pageData.openGraph?.images?.[0] || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.openGraph?.title || title,
      description: pageData.openGraph?.description || description,
      images: [pageData.openGraph?.images?.[0] || siteConfig.ogImage],
      creator: '@techtrust_agency',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'google-site-verification-code', // À remplacer par ton vrai code
    },
  }
}
