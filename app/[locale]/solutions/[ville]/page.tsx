import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight, CheckCircle, MapPin, Globe, Zap, Target, Star, Phone, Mail,
  Brain, BarChart3, Bot, Search, Sparkles, MessageSquare, TrendingUp,
  Lightbulb, Code, Database, Layers,
} from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import RelatedServices from '@/components/RelatedServices';
import { cities, getCityBySlug, getAllCitySlugs } from '@/lib/geo-data';
import { geoServices, findGeoService } from '@/lib/geo-services-data';
import type { LucideIcon } from 'lucide-react';

export const dynamic = 'force-static';

const iconMap: Record<string, LucideIcon> = {
  Globe, Zap, Target, Brain, BarChart3, Bot, Search, Sparkles,
  MessageSquare, TrendingUp, Lightbulb, Code, Database, Layers,
};

interface GeoPageProps {
  params: Promise<{ locale: string; ville: string }>;
}

export async function generateStaticParams() {
  const citySlugs = getAllCitySlugs();
  const locales = ['fr', 'en'];

  return locales.flatMap(locale =>
    geoServices.flatMap(service =>
      citySlugs.map(citySlug => ({
        locale,
        ville: `${service.prefix}${citySlug}`,
      }))
    )
  );
}

export async function generateMetadata({ params }: GeoPageProps): Promise<Metadata> {
  const { locale, ville } = await params;
  const match = findGeoService(ville);

  if (!match) return { title: 'Page non trouvée' };

  const city = getCityBySlug(match.citySlug);
  if (!city) return { title: 'Page non trouvée' };

  const { service } = match;
  const title = service.geoMetaTitle(city.name);
  const description = service.geoMetaDescription(city.name, city.region);

  return {
    title,
    description,
    keywords: service.geoKeywords(city.name),
    openGraph: {
      title,
      description,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/solutions/${ville}`,
      languages: {
        'fr': `https://www.tech-trust.fr/fr/solutions/${ville}`,
        'en': `https://www.tech-trust.fr/en/solutions/${ville}`,
        'x-default': `https://www.tech-trust.fr/fr/solutions/${ville}`,
      },
    },
  };
}

export default async function GeoLandingPage({ params }: GeoPageProps) {
  const { locale, ville } = await params;
  const localizedHref = (path: string) => `/${locale}${path}`;

  const match = findGeoService(ville);
  if (!match) notFound();

  const { service, citySlug } = match;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const otherCities = cities.filter(c => c.slug !== citySlug).slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": `Techtrust - ${service.title} ${city.name}`,
            "description": service.schemaDescription(city.name),
            "url": `https://www.tech-trust.fr/${locale}/solutions/${ville}`,
            "telephone": "+33699486629",
            "email": "contact@tech-trust.fr",
            "serviceType": service.schemaServiceType,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": city.name,
              "addressRegion": city.region,
              "addressCountry": "FR"
            },
            "areaServed": [
              { "@type": "City", "name": city.name },
              { "@type": "Country", "name": "France" }
            ],
            "priceRange": "€€-€€€"
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />

        <main className="flex-1 pt-20">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: 'Solutions', href: `/${locale}/solutions` },
              { label: service.title, href: `/${locale}/solutions/${service.slug}` },
              { label: city.name }
            ]}
          />

          {/* Hero */}
          <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-custom-blue/10 rounded-full blur-3xl"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/80 border border-custom-blue/30 rounded-full px-4 py-2 text-sm font-medium text-custom-blue mb-6">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  {city.name}, {city.region}
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  <span className="text-custom-blue">{service.title}</span> à {city.name}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-custom-purple to-custom-green">
                    {service.heroSubtitle}
                  </span>
                </h1>

                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  {city.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-custom-blue hover:bg-custom-blue/90 text-white">
                    <Link href={localizedHref('/contact')}>
                      Devis gratuit en 24h
                      <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white">
                    <Link href={localizedHref('/pricing')}>
                      Voir nos tarifs
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Nos Services à <span className="text-custom-blue">{city.name}</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Des solutions digitales complètes pour les entreprises de {city.name} et sa région {city.region}.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {service.services.map((svc) => {
                  const Icon = iconMap[svc.iconName] || Globe;
                  return (
                    <div key={svc.title} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                      <div className="w-16 h-16 bg-custom-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-custom-blue" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{svc.title}</h3>
                      <p className="text-gray-600">{svc.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {service.whyTitle(city.name)}
                  </h2>
                  <p className="text-gray-600 mb-8">
                    {service.whyText(city.name)}
                  </p>
                  <ul className="space-y-4">
                    {city.specificAdvantages.map((advantage, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-custom-green flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-700">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">100%</p>
                    <p className="text-gray-500">Code sur mesure, zéro template</p>
                  </div>

                  <div className="space-y-4 text-center">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-3xl font-bold text-custom-blue">30+</p>
                      <p className="text-gray-600 text-sm">Projets livrés</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-3xl font-bold text-custom-purple">300%</p>
                      <p className="text-gray-600 text-sm">Croissance moyenne du trafic</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-3xl font-bold text-custom-green">24h</p>
                      <p className="text-gray-600 text-sm">Réponse garantie à votre devis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-gradient-to-r from-custom-blue via-custom-purple to-custom-green text-white">
            <div className="container mx-auto px-4 text-center max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                {service.ctaTitle(city.name)}
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Contactez notre équipe pour un devis personnalisé gratuit. Nous répondons sous 24h.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <div className="flex items-center gap-2 text-gray-200">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  <span>+33 6 99 48 66 29</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                  <span>contact@tech-trust.fr</span>
                </div>
              </div>
              <Button asChild size="lg" className="bg-white text-custom-blue hover:bg-gray-100">
                <Link href={localizedHref('/contact')}>
                  Demander un devis gratuit
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </section>

          {/* Other Cities */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {service.citiesTitle}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
                {otherCities.map(otherCity => (
                  <Link
                    key={otherCity.slug}
                    href={localizedHref(`/solutions/${service.prefix}${otherCity.slug}`)}
                    className="bg-gray-50 rounded-xl p-4 text-center hover:bg-custom-blue/5 hover:border-custom-blue/30 border border-transparent transition-all"
                  >
                    <MapPin className="w-5 h-5 text-custom-blue mx-auto mb-2" aria-hidden="true" />
                    <span className="text-sm font-medium text-gray-900">
                      {service.cityLabel(otherCity.name)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <RelatedServices currentSlug={service.slug} locale={locale} />
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
