import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export const dynamic = 'force-static';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.contact' });
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/contact`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/contact',
        'en': 'https://www.tech-trust.fr/en/contact',
      },
    },
  };
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@tech-trust.fr",
    description: "Réponse sous 24h"
  },
  {
    icon: Phone,
    title: "Téléphone",
    value: "+33 6 99 48 66 29",
    description: "Lun-Ven 9h-18h"
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: "Paris, France",
    description: "Sur rendez-vous"
  },
  {
    icon: Clock,
    title: "Horaires",
    value: "9h - 18h",
    description: "Du lundi au vendredi"
  }
];

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Techtrust",
            "url": `https://www.tech-trust.fr/${locale}/contact`,
            "mainEntity": {
              "@type": "Organization",
              "name": "Techtrust",
              "email": "contact@tech-trust.fr",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Paris",
                "addressCountry": "FR"
              }
            }
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                <span className="text-custom-blue">Contactez</span>-nous
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une question ? Un projet ? Notre équipe est là pour vous accompagner. 
                Devis gratuit en 24h.
              </p>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                {/* Contact Info */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    Nos coordonnées
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {contactInfo.map((item) => (
                      <div key={item.title} className="bg-gray-50 rounded-xl p-6">
                        <div className="w-12 h-12 bg-custom-blue/10 rounded-lg flex items-center justify-center mb-4">
                          <item.icon className="w-6 h-6 text-custom-blue" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-900 font-medium">{item.value}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    Envoyez-nous un message
                  </h2>
                  <ContactForm />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
