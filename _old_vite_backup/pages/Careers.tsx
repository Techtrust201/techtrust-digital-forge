
import React from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import HeroSection from '@/components/careers/HeroSection';
import JobsSection from '@/components/careers/JobsSection';
import BusinessPartnerProgram from '@/components/careers/BusinessPartnerProgram';

const Careers = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Techtrust Recrute 2025 - Rejoignez l'Élite Tech IA",
    "description": "🚀 Techtrust recrute les meilleurs talents tech 2025 ! Développeurs, Growth Hackers IA, Data Scientists. Rejoignez l'équipe qui révolutionne le digital avec l'IA.",
    "url": "https://www.tech-trust.fr/careers"
  };

  return (
    <>
      <SEO
        title="Techtrust Recrute 2025 | Emplois Tech IA, Growth Hacking - Techtrust"
        description="🔍 Rejoignez l'élite tech 2025 ! Techtrust recrute développeurs IA, growth hackers, data scientists. Salaires attractifs, projets innovants. Postulez maintenant !"
        keywords="techtrust recrute 2025, emploi tech ia, recrutement growth hacking, jobs développeur ia, carrières data scientist, apporteur affaires"
        canonicalUrl="https://www.tech-trust.fr/careers" 
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          <HeroSection />
          <JobsSection />
          <BusinessPartnerProgram />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Careers;
