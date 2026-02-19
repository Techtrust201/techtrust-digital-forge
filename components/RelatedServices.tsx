import Link from 'next/link';
import { ArrowRight, Globe, TrendingUp, Code, MessageSquare, Target, Lightbulb } from 'lucide-react';

const allServices = [
  {
    slug: 'agence-web',
    title: 'Création Site Web',
    description: 'Sites professionnels, e-commerce et applications web sur mesure.',
    icon: Globe,
    color: '#45C7FF',
  },
  {
    slug: 'growth-hacking',
    title: 'Growth Hacking IA',
    description: 'Automatisation de votre acquisition client avec l\'intelligence artificielle.',
    icon: TrendingUp,
    color: '#8B5CF6',
  },
  {
    slug: 'seo-referencement',
    title: 'SEO, SEA & GEO',
    description: 'Stratégie complète de visibilité Google : SEO, Google Ads et Google My Business.',
    icon: Target,
    color: '#10B981',
  },
  {
    slug: 'community-management',
    title: 'Community Management',
    description: 'Gestion professionnelle de vos réseaux sociaux par IA ou par nos experts.',
    icon: MessageSquare,
    color: '#EC4899',
  },
  {
    slug: 'digitales-sur-mesure',
    title: 'Solutions Sur Mesure',
    description: 'Logiciels métier, CRM, ERP et applications personnalisées.',
    icon: Code,
    color: '#00CCC3',
  },
  {
    slug: 'consulting-digital',
    title: 'Consulting Digital',
    description: 'Accompagnement stratégique pour votre transformation digitale.',
    icon: Lightbulb,
    color: '#F59E0B',
  },
];

interface RelatedServicesProps {
  currentSlug: string;
  locale: string;
  maxItems?: number;
}

export default function RelatedServices({ currentSlug, locale, maxItems = 3 }: RelatedServicesProps) {
  const relatedServices = allServices
    .filter(s => s.slug !== currentSlug)
    .slice(0, maxItems);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 text-center">
          Services complémentaires
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Découvrez nos autres solutions pour booster votre business digital.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {relatedServices.map((service) => (
            <Link
              key={service.slug}
              href={`/${locale}/solutions/${service.slug}`}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${service.color}15` }}
              >
                <service.icon className="w-6 h-6" style={{ color: service.color }} aria-hidden="true" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-custom-blue transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{service.description}</p>
              <span className="text-custom-blue text-sm font-medium inline-flex items-center gap-1">
                En savoir plus
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
