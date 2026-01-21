import { Metadata } from 'next';
import Link from 'next/link';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import HeroSection from '@/components/careers/HeroSection';
import JobsSection from '@/components/careers/JobsSection';
import BusinessPartnerProgram from '@/components/careers/BusinessPartnerProgram';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-static';

interface CareersPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CareersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  return {
    title: isEn 
      ? 'Techtrust Recrute 2025 | Tech IA Jobs, Growth Hacking - Techtrust'
      : 'Techtrust Recrute 2025 | Emplois Tech IA, Growth Hacking - Techtrust',
    description: isEn
      ? 'Join the elite tech 2025! Techtrust recruits IA developers, growth hackers, data scientists. Attractive salaries, innovative projects. Apply now!'
      : 'Rejoignez l\'élite tech 2025 ! Techtrust recrute développeurs IA, growth hackers, data scientists. Salaires attractifs, projets innovants. Postulez maintenant !',
    keywords: ['techtrust recrute 2025', 'emploi tech ia', 'recrutement growth hacking', 'jobs développeur ia', 'carrières data scientist', 'apporteur affaires'],
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/careers`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/careers',
        'en': 'https://www.tech-trust.fr/en/careers',
      },
    },
  };
}

export default async function CareersPage({ params }: CareersPageProps) {
  const { locale } = await params;
  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Techtrust Recrute 2025 - Rejoignez l'Élite Tech IA",
            "description": "Techtrust recrute les meilleurs talents tech 2025 ! Développeurs, Growth Hackers IA, Data Scientists. Rejoignez l'équipe qui révolutionne le digital avec l'IA.",
            "url": "https://www.tech-trust.fr/careers",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "JobPosting",
                  "title": "Développeur Full Stack",
                  "description": "Rejoignez notre équipe technique pour développer nos outils IA révolutionnaires",
                  "baseSalary": {
                    "@type": "MonetaryAmount",
                    "currency": "EUR",
                    "value": {
                      "@type": "QuantitativeValue",
                      "minValue": 30000,
                      "maxValue": 70000
                    }
                  }
                },
                {
                  "@type": "JobPosting",
                  "title": "Growth Hacker IA",
                  "description": "Concevez des stratégies d'acquisition avec nos outils IA propriétaires"
                },
                {
                  "@type": "JobPosting",
                  "title": "Community Manager",
                  "description": "Gérez les communautés de nos clients avec nos outils d'IA"
                },
                {
                  "@type": "JobPosting",
                  "title": "Data Scientist IA",
                  "description": "Développez nos algorithmes d'IA pour le growth hacking"
                },
                {
                  "@type": "JobPosting",
                  "title": "UX/UI Designer",
                  "description": "Concevez des interfaces utilisateur pour nos outils IA"
                },
                {
                  "@type": "JobPosting",
                  "title": "Chef de Projet Tech",
                  "description": "Coordonnez le développement de nos solutions IA"
                }
              ]
            }
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          <HeroSection />
          <JobsSection />
          <BusinessPartnerProgram />
        </main>

        <Footer />
      </div>
    </>
  );
}
