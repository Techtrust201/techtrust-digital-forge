import { Metadata } from 'next';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';

interface LegalMentionsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LegalMentionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Mentions Légales | Techtrust',
    description: 'Mentions légales du site Techtrust - Agence digitale française.',
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/legal-mentions`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function LegalMentionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavbarPublic />
      
      <main className="flex-1 pt-20">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Mentions Légales</h1>
            
            <div className="bg-white rounded-xl p-8 shadow-sm prose prose-gray max-w-none">
              <h2>1. Éditeur du site</h2>
              <p>
                Le site www.tech-trust.fr est édité par la société Techtrust, société par actions simplifiée
                au capital de [Capital] euros, immatriculée au Registre du Commerce et des Sociétés de Paris
                sous le numéro [RCS].
              </p>
              <p>
                <strong>Siège social :</strong> [Adresse]<br />
                <strong>Téléphone :</strong> +33 1 XX XX XX XX<br />
                <strong>Email :</strong> contact@tech-trust.fr
              </p>
              <p>
                <strong>Directeur de la publication :</strong> [Nom du directeur]
              </p>

              <h2>2. Hébergement</h2>
              <p>
                Le site est hébergé par Vercel Inc., situé 340 S Lemon Ave #4133 Walnut, CA 91789, États-Unis.
              </p>

              <h2>3. Propriété intellectuelle</h2>
              <p>
                L'ensemble des contenus présents sur ce site (textes, images, vidéos, logos, etc.) sont la propriété
                exclusive de Techtrust ou de ses partenaires. Toute reproduction, représentation, modification,
                publication, adaptation de tout ou partie des éléments du site est interdite sans l'autorisation
                écrite préalable de Techtrust.
              </p>

              <h2>4. Données personnelles</h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez de droits
                concernant vos données personnelles. Pour plus d'informations, consultez notre Politique de
                Confidentialité.
              </p>

              <h2>5. Cookies</h2>
              <p>
                Ce site utilise des cookies pour améliorer l'expérience utilisateur. Vous pouvez gérer vos
                préférences de cookies à tout moment.
              </p>

              <h2>6. Limitation de responsabilité</h2>
              <p>
                Techtrust s'efforce d'assurer l'exactitude des informations diffusées sur ce site, mais ne peut
                être tenu responsable des erreurs ou omissions, ni des résultats obtenus par l'utilisation de ces
                informations.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
