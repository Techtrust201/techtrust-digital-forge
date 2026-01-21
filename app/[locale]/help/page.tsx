import { Metadata } from 'next';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import HelpContent from '@/components/help/HelpContent';

export const dynamic = 'force-static';

interface HelpPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HelpPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  return {
    title: isEn 
      ? 'Help & Support | Frequently Asked Questions - Techtrust'
      : 'Aide & Support | Questions Fréquentes - Techtrust',
    description: isEn
      ? 'Need help? Find all answers to your questions about our digital services. Responsive customer support and complete FAQ.'
      : 'Besoin d\'aide ? Trouvez toutes les réponses à vos questions sur nos services digitaux. Support client réactif et FAQ complète.',
    keywords: ['aide techtrust', 'support client', 'FAQ', 'questions fréquentes', 'assistance', 'help desk', 'support technique'],
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/help`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/help',
        'en': 'https://www.tech-trust.fr/en/help',
      },
    },
  };
}

export default async function HelpPage({ params }: HelpPageProps) {
  const { locale } = await params;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "name": "Aide Techtrust",
            "description": "Questions fréquentes et support client Techtrust",
            "url": "https://www.tech-trust.fr/help",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Combien de temps pour créer un site web ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "En moyenne 2-4 semaines selon la complexité. Site vitrine : 2 semaines, e-commerce : 3-4 semaines."
                }
              },
              {
                "@type": "Question",
                "name": "Proposez-vous la maintenance ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, nous proposons des contrats de maintenance incluant mises à jour, sauvegardes et support technique."
                }
              },
              {
                "@type": "Question",
                "name": "Travaillez-vous avec toutes les entreprises ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nous accompagnons TPE, PME et grandes entreprises dans tous les secteurs d'activité."
                }
              }
            ]
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          <HelpContent locale={locale} />
        </main>

        <Footer />
      </div>
    </>
  );
}
