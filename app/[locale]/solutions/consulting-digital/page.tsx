import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, LineChart, Lightbulb, Target, Users, CheckCircle } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-static';

interface ConsultingDigitalPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ConsultingDigitalPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  return {
    title: isEn 
      ? 'Digital Consulting | Digital Strategy & Transformation'
      : 'Consulting Digital | Stratégie & Transformation Digitale',
    description: isEn
      ? 'Digital consulting to accelerate your digital transformation. Strategy, audit, roadmap and support.'
      : 'Conseil digital pour accélérer votre transformation numérique. Stratégie, audit, roadmap et accompagnement.',
    keywords: ['consulting digital', 'transformation digitale', 'stratégie digitale', 'audit digital'],
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/solutions/consulting-digital`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/solutions/consulting-digital',
        'en': 'https://www.tech-trust.fr/en/solutions/consulting-digital',
      },
    },
  };
}

export default async function ConsultingDigitalPage({ params }: ConsultingDigitalPageProps) {
  const { locale } = await params;
  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          <section className="py-20 lg:py-32 bg-gradient-to-br from-pink-50 to-rose-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 bg-pink-100 rounded-full px-4 py-2 text-sm font-medium text-pink-600 mb-6">
                  <LineChart className="w-4 h-4" />
                  Expertise stratégique
                </span>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  <span className="text-pink-600">Consulting</span> Digital
                </h1>
                
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Accélérez votre transformation numérique avec nos experts. 
                  Audit, stratégie et accompagnement personnalisé.
                </p>
                
                <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
                  <Link href={localizedHref('/contact')}>
                    Prendre rendez-vous
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="py-20 bg-pink-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Besoin d'un conseil expert ?
              </h2>
              <Button asChild size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                <Link href={localizedHref('/contact')}>
                  Réserver une consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
