
import React from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Terms = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Conditions Générales d'Utilisation Techtrust",
    "description": "Conditions générales d'utilisation du site Techtrust",
    "url": "https://www.tech-trust.fr/terms"
  };

  return (
    <>
      <SEO
        title="Conditions Générales d'Utilisation - Techtrust"
        description="Conditions générales d'utilisation du site web Techtrust et de nos services digitaux."
        keywords="conditions générales, CGU, utilisation site web, conditions services"
        canonicalUrl="https://www.tech-trust.fr/terms"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Conditions Générales d'Utilisation</h1>
              
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="text-lg mb-6">
                  Dernière mise à jour : [Date]
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Objet</h2>
                <p>
                  Les présentes conditions générales d'utilisation (CGU) ont pour objet de définir les modalités 
                  et conditions d'utilisation du site www.tech-trust.fr ainsi que les services proposés.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Acceptation des conditions</h2>
                <p>
                  L'accès et l'utilisation du site impliquent l'acceptation pleine et entière des présentes CGU. 
                  Si vous n'acceptez pas ces conditions, nous vous invitons à ne pas utiliser notre site.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Services proposés</h2>
                <p>
                  Techtrust propose les services suivants :
                </p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Création de sites web</li>
                  <li>Growth hacking</li>
                  <li>Solutions digitales sur mesure</li>
                  <li>Community management</li>
                  <li>Consulting digital</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Obligations de l'utilisateur</h2>
                <p>
                  L'utilisateur s'engage à :
                </p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Utiliser le site conformément à sa destination</li>
                  <li>Ne pas porter atteinte aux droits de tiers</li>
                  <li>Respecter les lois et règlements en vigueur</li>
                  <li>Fournir des informations exactes lors des prises de contact</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Limitation de responsabilité</h2>
                <p>
                  Techtrust ne saurait être tenue responsable des dommages directs ou indirects résultant de 
                  l'utilisation du site ou de l'impossibilité d'y accéder.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Modification des CGU</h2>
                <p>
                  Techtrust se réserve le droit de modifier les présentes CGU à tout moment. 
                  Les nouvelles conditions seront applicables dès leur mise en ligne.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Droit applicable</h2>
                <p>
                  Les présentes CGU sont soumises au droit français. Tout litige sera de la compétence 
                  exclusive des tribunaux français.
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

export default Terms;
