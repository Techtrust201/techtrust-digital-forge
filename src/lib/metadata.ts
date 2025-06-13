
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
  description: "Agence digitale française spécialisée en création de sites web, growth hacking et solutions digitales sur mesure.",
  url: "https://www.tech-trust.fr",
  ogImage: "https://www.tech-trust.fr/og-image.jpg",
}

const pages: Record<string, PageMetadata> = {
  '/': {
    title: "Techtrust - Agence Web & Growth Hacking | Solutions Digitales Sur Mesure",
    description: "🚀 Agence digitale française #1 en création de sites web, growth hacking et développement de solutions digitales sur mesure.",
    keywords: [
      "agence web",
      "agence digitale", 
      "growth hacking",
      "solutions digitales sur mesure",
      "création site web"
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
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: 'website',
      locale: locale,
      url: `${siteConfig.url}/${locale}${pathname}`,
      title: pageData.openGraph?.title || title,
      description: pageData.openGraph?.description || description,
      siteName: siteConfig.name,
    },
  }
}
