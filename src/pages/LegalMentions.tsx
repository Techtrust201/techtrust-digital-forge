
import React from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const LegalMentions = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mentions Légales Techtrust",
    "description": "Mentions légales de Techtrust - Agence digitale française",
    "url": "https://www.tech-trust.fr/legal-mentions"
  };

  return (
    <>
      <SEO
        title="Mentions Légales - Techtrust"
        description="Mentions légales de Techtrust, agence digitale française spécialisée en création de sites web et growth hacking."
        keywords="mentions légales techtrust, informations légales, agence digitale"
        canonicalUrl="https://www.tech-trust.fr/legal-mentions"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Mentions Légales</h1>
              
              <div className="prose prose-lg max-w-none text-gray-600">
                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Informations légales</h2>
                <p>
                  Le site web www.tech-trust.fr est édité par Techtrust, société immatriculée au RCS de [Ville] 
                  sous le numéro [Numéro SIRET].
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Siège social</h3>
                <p>
                  [Adresse complète]<br />
                  [Code postal] [Ville]<br />
                  France
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Contact</h3>
                <p>
                  Email : contact@tech-trust.fr<br />
                  Téléphone : +33 X XX XX XX XX
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Directeur de publication</h3>
                <p>[Nom du directeur de publication]</p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Hébergement</h3>
                <p>
                  Ce site est hébergé par [Nom de l'hébergeur]<br />
                  [Adresse de l'hébergeur]
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Propriété intellectuelle</h2>
                <p>
                  L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est protégé par le droit d'auteur. 
                  Toute reproduction, même partielle, est interdite sans l'autorisation écrite de Techtrust.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Limitation de responsabilité</h2>
                <p>
                  Techtrust s'efforce de fournir des informations exactes et à jour sur ce site web. 
                  Cependant, nous ne pouvons garantir l'exactitude, la complétude ou l'actualité de ces informations.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Droit applicable</h2>
                <p>
                  Les présentes mentions légales sont soumises au droit français. 
                  Tout litige relatif à l'utilisation de ce site sera de la compétence exclusive des tribunaux français.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LegalMentions;
