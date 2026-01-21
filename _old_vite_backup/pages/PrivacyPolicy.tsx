
import React from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const PrivacyPolicy = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Politique de Confidentialité Techtrust",
    "description": "Politique de confidentialité et protection des données personnelles Techtrust",
    "url": "https://www.tech-trust.fr/privacy-policy"
  };

  return (
    <>
      <SEO
        title="Politique de Confidentialité - Techtrust"
        description="Politique de confidentialité et protection des données personnelles de Techtrust, conforme au RGPD."
        keywords="politique confidentialité, RGPD, protection données, vie privée"
        canonicalUrl="https://www.tech-trust.fr/privacy-policy"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>
              
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="text-lg mb-6">
                  Dernière mise à jour : [Date]
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Collecte des données</h2>
                <p>
                  Nous collectons les données personnelles que vous nous fournissez volontairement lors de :
                </p>
                <ul className="list-disc ml-6 mb-4">
                  <li>La prise de contact via nos formulaires</li>
                  <li>L'inscription à notre newsletter</li>
                  <li>La demande de devis</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Utilisation des données</h2>
                <p>
                  Vos données personnelles sont utilisées pour :
                </p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Répondre à vos demandes de contact</li>
                  <li>Vous envoyer des informations sur nos services</li>
                  <li>Améliorer notre site web et nos services</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Cookies</h2>
                <p>
                  Notre site utilise des cookies pour améliorer votre expérience de navigation. 
                  Vous pouvez configurer votre navigateur pour refuser les cookies.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Vos droits</h2>
                <p>
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement</li>
                  <li>Droit à la portabilité</li>
                  <li>Droit d'opposition</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact</h2>
                <p>
                  Pour exercer vos droits ou pour toute question concernant cette politique de confidentialité, 
                  contactez-nous à : contact@tech-trust.fr
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

export default PrivacyPolicy;
