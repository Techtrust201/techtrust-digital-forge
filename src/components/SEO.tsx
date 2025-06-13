import React from "react";
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl: string;
  structuredData?: Record<string, any>;
  additionalMeta?: Array<{ name: string; content: string }>;
  noIndex?: boolean;
}

const SEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage = "https://www.tech-trust.fr/og-techtrust-2025.jpg",
  canonicalUrl,
  structuredData,
  additionalMeta = [],
  noIndex = false,
}: SEOProps) => {
  const finalTitle = title.includes("Techtrust")
    ? title
    : `${title} | Techtrust`;

  return (
    <Head>
      {/* Balises meta essentielles */}
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      )}

      {/* Auteur et société */}
      <meta name="author" content="Techtrust" />
      <meta name="publisher" content="Techtrust" />
      <meta
        name="copyright"
        content="© 2025 Techtrust. Tous droits réservés."
      />

      {/* Géolocalisation */}
      <meta name="geo.region" content="FR" />
      <meta name="geo.country" content="France" />
      <meta name="geo.placename" content="France" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={ogTitle || finalTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:site_name"
        content="Techtrust - Agence Digitale 2025"
      />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={ogTitle || finalTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@techtrust_fr" />
      <meta name="twitter:site" content="@techtrust_fr" />

      {/* Canonical et hreflang */}
      <link rel="canonical" href={canonicalUrl} />
      <link
        rel="alternate"
        hrefLang="fr"
        href={`https://www.tech-trust.fr/fr${canonicalUrl.replace("https://www.tech-trust.fr", "")}`}
      />
      <link
        rel="alternate"
        hrefLang="en"
        href={`https://www.tech-trust.fr/en${canonicalUrl.replace("https://www.tech-trust.fr", "")}`}
      />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* DNS prefetch et preconnect pour la performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* Meta additionnelles */}
      {additionalMeta.map((meta, index) => (
        <meta key={index} name={meta.name} content={meta.content} />
      ))}

      {/* Schema.org données structurées */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Organisation Schema pour toutes les pages */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Techtrust",
          alternateName: "Techtrust Agence Digitale",
          url: "https://www.tech-trust.fr",
          logo: "https://www.tech-trust.fr/logo-techtrust-2025.png",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+33-1-23-45-67-89",
            contactType: "customer service",
            areaServed: "FR",
            availableLanguage: ["French", "English"],
          },
          address: {
            "@type": "PostalAddress",
            addressCountry: "FR",
            addressRegion: "Île-de-France",
            addressLocality: "Paris",
          },
          sameAs: [
            "https://www.linkedin.com/company/techtrust",
            "https://twitter.com/techtrust_fr",
            "https://www.facebook.com/techtrust.fr",
          ],
          foundingDate: "2024",
          description:
            "Agence digitale française spécialisée en growth hacking IA, création de sites web, community management et solutions sur mesure.",
          serviceArea: {
            "@type": "Country",
            name: "France",
          },
        })}
      </script>
    </Head>
  );
};

export default SEO;
