import { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-static';

interface CareersPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CareersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  return {
    title: isEn ? 'Careers | Join Techtrust' : 'Carrières | Rejoignez Techtrust',
    description: isEn
      ? 'Join the Techtrust team! Discover our job offers in web development, growth hacking and digital.'
      : 'Rejoignez l\'équipe Techtrust ! Découvrez nos offres d\'emploi en développement web, growth hacking et digital.',
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/careers`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/careers',
        'en': 'https://www.tech-trust.fr/en/careers',
      },
    },
  };
}

const jobs = [
  {
    id: 1,
    title: "Développeur Full-Stack React/Node.js",
    type: "CDI",
    location: "Paris (Hybride)",
    description: "Rejoignez notre équipe technique pour développer des applications web innovantes."
  },
  {
    id: 2,
    title: "Growth Hacker Senior",
    type: "CDI",
    location: "Paris (Hybride)",
    description: "Pilotez nos stratégies d'acquisition et de croissance pour nos clients."
  },
  {
    id: 3,
    title: "UX/UI Designer",
    type: "CDI",
    location: "Remote",
    description: "Créez des expériences utilisateur exceptionnelles pour nos projets web."
  }
];

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
            "@type": "JobPosting",
            "hiringOrganization": {
              "@type": "Organization",
              "name": "Techtrust",
              "url": "https://www.tech-trust.fr"
            }
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Rejoignez <span className="text-custom-purple">Techtrust</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Construisons ensemble le futur du digital. Découvrez nos opportunités.
              </p>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Nos offres d'emploi
              </h2>
              
              <div className="max-w-4xl mx-auto space-y-6">
                {jobs.map((job) => (
                  <div 
                    key={job.id}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                        <p className="text-gray-600 mb-3">{job.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <Button asChild className="bg-custom-purple hover:bg-custom-purple/90">
                        <Link href={localizedHref('/contact')}>
                          Postuler
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-gray-600 mb-4">
                  Vous ne trouvez pas le poste qui vous correspond ?
                </p>
                <Button asChild variant="outline">
                  <Link href={localizedHref('/contact')}>
                    Candidature spontanée
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
