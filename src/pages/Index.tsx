
import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import ServicesSection from '@/components/landing/ServicesSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import StatsSection from '@/components/landing/StatsSection';
import CTASection from '@/components/landing/CTASection';
import BlogPreviewSection from '@/components/landing/BlogPreviewSection';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      {/* Schema.org pour la page d'accueil */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Techtrust - Agence Web & Growth Hacking",
            "description": "Agence digitale française spécialisée en création de sites web, growth hacking et solutions digitales sur mesure",
            "url": "https://www.tech-trust.fr",
            "mainEntity": {
              "@type": "Organization",
              "name": "Techtrust",
              "description": "Agence digitale qui accompagne les entreprises dans leur transformation numérique",
              "serviceType": ["Création de sites web", "Growth hacking", "Développement sur mesure"],
              "areaServed": "France"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Accueil",
                  "item": "https://www.tech-trust.fr"
                }
              ]
            }
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <header role="banner">
          <NavbarPublic />
        </header>

        <main role="main">
          <HeroSection />
          <ServicesSection />
          <FeaturesSection />
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
