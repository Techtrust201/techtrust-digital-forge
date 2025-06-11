
import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/landing/HeroSection';
import ServicesSection from '@/components/landing/ServicesSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PartnersSection from '@/components/landing/PartnersSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import StatsSection from '@/components/landing/StatsSection';
import CTASection from '@/components/landing/CTASection';
import BlogPreviewSection from '@/components/landing/BlogPreviewSection';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Techtrust - Agence Web & Growth Hacking | Solutions Digitales Sur Mesure</title>
        <meta name="description" content="Agence digitale française #1 en création de sites web, growth hacking et développement de solutions digitales sur mesure. Community management, lead generation, logiciels personnalisés. Transformez votre business avec nos experts !" />
        <meta name="keywords" content="agence web, agence digitale, growth hacking, solutions digitales sur mesure, création site web, développement web, community management, lead generation, prospection digitale, logiciel sur mesure, agence marketing digital, SEO, développement application web, e-commerce, startup growth, acquisition client, automatisation marketing, transformation digitale, agence web France, développeur web freelance" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tech-trust.fr/" />
        <meta property="og:title" content="Techtrust - L'agence qui transforme votre business digital" />
        <meta property="og:description" content="De la création de votre site web à l'acquisition de vos premiers clients. Découvrez comment nos solutions sur mesure boostent la croissance de +200 entreprises." />
        <meta property="og:image" content="https://www.tech-trust.fr/og-image.jpg" />
        <meta property="og:site_name" content="Techtrust" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.tech-trust.fr/" />
        <meta property="twitter:title" content="Techtrust - L'agence qui transforme votre business digital" />
        <meta property="twitter:description" content="De la création de votre site web à l'acquisition de vos premiers clients. Découvrez comment nos solutions sur mesure boostent la croissance de +200 entreprises." />
        <meta property="twitter:image" content="https://www.tech-trust.fr/og-image.jpg" />
        <meta property="twitter:creator" content="@techtrust_agency" />

        {/* Canonical */}
        <link rel="canonical" href="https://www.tech-trust.fr/" />
        
        {/* Hreflang */}
        <link rel="alternate" hrefLang="fr" href="https://www.tech-trust.fr/fr" />
        <link rel="alternate" hrefLang="en" href="https://www.tech-trust.fr/en" />
        <link rel="alternate" hrefLang="x-default" href="https://www.tech-trust.fr/" />

        {/* Schema.org données structurées */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Techtrust",
            "description": "Agence digitale française spécialisée en création de sites web, growth hacking et solutions digitales sur mesure",
            "url": "https://www.tech-trust.fr",
            "logo": "https://www.tech-trust.fr/logoTechtrust/logo-techtrust.svg",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+33-XX-XX-XX-XX",
              "contactType": "customer service",
              "availableLanguage": ["French", "English"]
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "FR",
              "addressLocality": "France"
            },
            "sameAs": [
              "https://linkedin.com/company/techtrust-agency",
              "https://instagram.com/techtrust_agency",
              "https://youtube.com/channel/UCX_vW6ah0txEFeMAMr3Si7A"
            ],
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock",
              "itemOffered": [
                {
                  "@type": "Service",
                  "name": "Création de site web",
                  "description": "Développement de sites web sur mesure, e-commerce et applications web"
                },
                {
                  "@type": "Service", 
                  "name": "Growth Hacking",
                  "description": "Stratégies de croissance digitale et acquisition de leads"
                },
                {
                  "@type": "Service",
                  "name": "Solutions digitales sur mesure",
                  "description": "Développement de logiciels personnalisés et applications métier"
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <header role="banner">
          <NavbarPublic />
        </header>

        <main role="main">
          <HeroSection />
          <ServicesSection />
          <FeaturesSection />
          <PartnersSection />
          <StatsSection />
          <TestimonialsSection />
          <BlogPreviewSection />
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
