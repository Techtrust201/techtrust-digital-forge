
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl: string;
  structuredData?: Record<string, any>;
}

const SEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage = 'https://www.tech-trust.fr/og-image.jpg',
  canonicalUrl,
  structuredData,
}: SEOProps) => {
  return (
    <Helmet>
      {/* Balises meta primaires */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Techtrust" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@techtrust_agency" />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang */}
      <link rel="alternate" hrefLang="fr" href={`https://www.tech-trust.fr/fr${canonicalUrl.replace('https://www.tech-trust.fr', '')}`} />
      <link rel="alternate" hrefLang="en" href={`https://www.tech-trust.fr/en${canonicalUrl.replace('https://www.tech-trust.fr', '')}`} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Schema.org données structurées */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
