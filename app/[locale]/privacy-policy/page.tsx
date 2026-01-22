import { Metadata } from 'next';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';

interface PrivacyPolicyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Politique de Confidentialité | Techtrust',
    description: 'Politique de confidentialité de Techtrust - Comment nous protégeons vos données personnelles.',
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/privacy-policy`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavbarPublic />
      
      <main className="flex-1 pt-20">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>
            
            <div className="bg-white rounded-xl p-8 shadow-sm prose prose-gray max-w-none">
              <p><em>Dernière mise à jour : Janvier 2025</em></p>

              <h2>1. Introduction</h2>
              <p>
                Techtrust s'engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité
                explique comment nous collectons, utilisons et protégeons vos données personnelles.
              </p>

              <h2>2. Données collectées</h2>
              <p>Nous pouvons collecter les données suivantes :</p>
              <ul>
                <li>Données d'identification (nom, prénom, email)</li>
                <li>Données de contact (adresse, téléphone)</li>
                <li>Données de navigation (cookies, adresse IP)</li>
                <li>Données relatives à vos demandes et projets</li>
              </ul>

              <h2>3. Utilisation des données</h2>
              <p>Vos données sont utilisées pour :</p>
              <ul>
                <li>Répondre à vos demandes de contact</li>
                <li>Vous fournir nos services</li>
                <li>Améliorer notre site et nos services</li>
                <li>Vous envoyer des communications marketing (avec votre consentement)</li>
              </ul>

              <h2>4. Base légale du traitement</h2>
              <p>
                Le traitement de vos données repose sur votre consentement, l'exécution d'un contrat, ou notre
                intérêt légitime à améliorer nos services.
              </p>

              <h2>5. Durée de conservation</h2>
              <p>
                Vos données sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont
                été collectées, et en tout état de cause conformément aux durées légales de conservation.
              </p>

              <h2>6. Vos droits</h2>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul>
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d'opposition</li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous à : contact@tech-trust.fr
              </p>

              <h2>7. Sécurité</h2>
              <p>
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre
                tout accès non autorisé, modification, divulgation ou destruction.
              </p>

              <h2>8. Contact</h2>
              <p>
                Pour toute question concernant cette politique, contactez notre DPO à : contact@tech-trust.fr
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
