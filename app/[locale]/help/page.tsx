import { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, Book, MessageCircle, Mail } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-static';

interface HelpPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HelpPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  return {
    title: isEn ? 'Help Center | Techtrust' : 'Centre d\'aide | Techtrust',
    description: isEn
      ? 'Need help? Find answers to your questions and contact our support team.'
      : 'Besoin d\'aide ? Trouvez les réponses à vos questions et contactez notre support.',
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/help`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/help',
        'en': 'https://www.tech-trust.fr/en/help',
      },
    },
  };
}

const faqs = [
  {
    question: "Comment démarrer un projet avec Techtrust ?",
    answer: "Contactez-nous via notre formulaire ou par email. Nous vous recontacterons sous 24h pour discuter de votre projet et vous fournir un devis gratuit."
  },
  {
    question: "Quels sont vos délais de livraison ?",
    answer: "Les délais varient selon la complexité du projet. Un site vitrine est généralement livré en 2-4 semaines, un e-commerce en 4-8 semaines."
  },
  {
    question: "Proposez-vous de la maintenance ?",
    answer: "Oui, nous proposons des contrats de maintenance incluant les mises à jour, la sécurité et le support technique."
  },
  {
    question: "Comment fonctionne le support ?",
    answer: "Notre support est disponible par email et téléphone du lundi au vendredi, 9h-18h. Les clients avec contrat de maintenance bénéficient d'un support prioritaire."
  }
];

export default async function HelpPage({ params }: HelpPageProps) {
  const { locale } = await params;
  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Centre d'<span className="text-custom-blue">Aide</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Trouvez rapidement les réponses à vos questions.
              </p>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Questions fréquentes
              </h2>
              
              <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((faq, idx) => (
                  <div 
                    key={idx}
                    className="bg-gray-50 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start gap-3">
                      <HelpCircle className="w-6 h-6 text-custom-blue flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 ml-9">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-gray-600 mb-4">
                  Vous n'avez pas trouvé votre réponse ?
                </p>
                <Button asChild className="bg-custom-blue hover:bg-custom-blue/90">
                  <Link href={localizedHref('/contact')}>
                    <Mail className="mr-2 w-4 h-4" />
                    Contactez-nous
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
