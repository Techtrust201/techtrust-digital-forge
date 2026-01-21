import { Metadata } from 'next';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Conditions d\'Utilisation | Techtrust',
    description: 'Conditions générales d\'utilisation du site Techtrust.',
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/terms`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavbarPublic />
      
      <main className="flex-1 pt-20">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Conditions d'Utilisation</h1>
            
            <div className="bg-white rounded-xl p-8 shadow-sm prose prose-gray max-w-none">
              <p><em>Dernière mise à jour : Janvier 2025</em></p>

              <h2>1. Objet</h2>
              <p>
                Les présentes conditions générales d'utilisation (CGU) ont pour objet de définir les modalités
                d'accès et d'utilisation du site www.tech-trust.fr.
              </p>

              <h2>2. Acceptation des conditions</h2>
              <p>
                L'accès et l'utilisation du site impliquent l'acceptation sans réserve des présentes CGU.
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
              </p>

              <h2>3. Accès au site</h2>
              <p>
                Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet.
                Techtrust ne peut être tenu responsable des éventuels dysfonctionnements du réseau ou des
                serveurs.
              </p>

              <h2>4. Propriété intellectuelle</h2>
              <p>
                Tous les éléments du site (textes, images, logos, etc.) sont protégés par le droit de la
                propriété intellectuelle. Toute reproduction sans autorisation est interdite.
              </p>

              <h2>5. Responsabilité</h2>
              <p>
                Techtrust s'efforce de fournir des informations exactes et à jour. Cependant, nous ne
                pouvons garantir l'exactitude, l'exhaustivité ou l'actualité des informations diffusées.
              </p>

              <h2>6. Liens hypertextes</h2>
              <p>
                Le site peut contenir des liens vers des sites tiers. Techtrust n'exerce aucun contrôle
                sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>

              <h2>7. Modification des CGU</h2>
              <p>
                Techtrust se réserve le droit de modifier les présentes CGU à tout moment. Les modifications
                prennent effet dès leur publication sur le site.
              </p>

              <h2>8. Droit applicable</h2>
              <p>
                Les présentes CGU sont soumises au droit français. Tout litige sera de la compétence
                exclusive des tribunaux français.
              </p>

              <h2>9. Contact</h2>
              <p>
                Pour toute question relative aux présentes CGU, vous pouvez nous contacter à :
                contact@tech-trust.fr
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
