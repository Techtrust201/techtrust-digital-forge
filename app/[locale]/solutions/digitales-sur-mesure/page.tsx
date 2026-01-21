import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, 
  Code, 
  Database, 
  Cog, 
  Cloud, 
  Shield, 
  Zap, 
  CheckCircle,
  Smartphone,
  Cpu,
  Settings,
  Rocket,
  Star
} from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const dynamic = 'force-static';

interface SolutionsSurMesurePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: SolutionsSurMesurePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  return {
    title: isEn 
      ? 'Custom Software Development | Digital Solutions - Techtrust'
      : 'Solutions Digitales Sur Mesure | Développement Logiciel - Techtrust',
    description: isEn
      ? 'Custom digital solutions: web applications, mobile apps, business software. Personalized development for your company. Free quote!'
      : 'Solutions digitales sur mesure : applications web, mobiles, logiciels métier. Développement personnalisé pour votre entreprise. Devis gratuit !',
    keywords: ['développement sur mesure', 'logiciel personnalisé', 'CRM', 'ERP', 'application métier', 'API', 'application web', 'application mobile', 'logiciel métier', 'transformation digitale'],
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/solutions/digitales-sur-mesure`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/solutions/digitales-sur-mesure',
        'en': 'https://www.tech-trust.fr/en/solutions/digitales-sur-mesure',
      },
    },
  };
}

const services = [
  {
    icon: Code,
    title: "Applications Web",
    description: "Applications web sur mesure avec les dernières technologies modernes : React, Next.js, Node.js, TypeScript.",
    features: ["Architecture moderne", "UX/UI optimisée", "Performance garantie", "Scalabilité"]
  },
  {
    icon: Smartphone,
    title: "Apps Mobiles",
    description: "Applications mobiles natives et hybrides pour iOS et Android. Expériences utilisateur fluides et performantes.",
    features: ["React Native", "iOS & Android", "Notifications push", "Mode hors-ligne"]
  },
  {
    icon: Database,
    title: "Logiciels Métier",
    description: "Logiciels personnalisés pour optimiser vos processus internes : CRM, ERP, outils de gestion sur mesure.",
    features: ["Analyse besoins", "Intégration SI", "Formation incluse", "Support continu"]
  },
  {
    icon: Cloud,
    title: "Solutions Cloud",
    description: "Architecture cloud scalable et sécurisée pour vos applications. AWS, GCP, Azure ou infrastructure dédiée.",
    features: ["Haute disponibilité", "Auto-scaling", "Monitoring 24/7", "Backup automatique"]
  },
  {
    icon: Shield,
    title: "Sécurité Avancée",
    description: "Protection maximale avec les meilleures pratiques de sécurité : audits, tests de pénétration, conformité RGPD.",
    features: ["Audit sécurité", "Tests intrusion", "Chiffrement", "Conformité RGPD"]
  },
  {
    icon: Cpu,
    title: "IA & Automatisation",
    description: "Intégration d'intelligence artificielle et automatisation des tâches répétitives pour gagner en productivité.",
    features: ["Machine Learning", "Chatbots IA", "RPA", "Analyse prédictive"]
  }
];

const process = [
  {
    step: "01",
    title: "Analyse & Conception",
    description: "Compréhension approfondie de vos besoins, analyse fonctionnelle et conception de l'architecture technique."
  },
  {
    step: "02",
    title: "Développement Agile",
    description: "Développement itératif avec des sprints de 2 semaines. Vous validez chaque fonctionnalité au fur et à mesure."
  },
  {
    step: "03",
    title: "Tests & Qualité",
    description: "Tests unitaires, d'intégration et end-to-end. Validation par nos QA et recette utilisateur."
  },
  {
    step: "04",
    title: "Déploiement & Support",
    description: "Mise en production, formation de vos équipes et maintenance évolutive continue."
  }
];

const stats = [
  { value: "150+", label: "Projets livrés" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "50+", label: "Technologies maîtrisées" },
  { value: "24/7", label: "Support disponible" }
];

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "React Native", category: "Mobile" },
  { name: "TensorFlow", category: "IA" }
];

const testimonials = [
  {
    name: "Pierre Martin",
    role: "DSI, IndustrieGroup",
    content: "La solution développée par Techtrust a révolutionné nos processus de production. ROI atteint en 6 mois.",
    rating: 5
  },
  {
    name: "Anne Leroy",
    role: "CEO, LogiTech",
    content: "Une équipe technique exceptionnelle. Notre ERP sur mesure est devenu indispensable à notre croissance.",
    rating: 5
  },
  {
    name: "Marc Dubois",
    role: "CTO, FinanceApp",
    content: "Qualité de code irréprochable et respect des délais. Notre application mobile a été un succès immédiat.",
    rating: 5
  }
];

export default async function SolutionsSurMesurePage({ params }: SolutionsSurMesurePageProps) {
  const { locale } = await params;
  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Solutions Digitales Sur Mesure",
            "serviceType": "Développement Logiciel",
            "provider": {
              "@type": "Organization",
              "name": "Techtrust",
              "url": "https://www.tech-trust.fr"
            },
            "description": "Développement de logiciels et applications sur mesure.",
            "areaServed": "France"
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full px-4 py-2 text-sm font-medium text-green-600 mb-6">
                  <Code className="w-4 h-4" />
                  Solutions 100% personnalisées
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Solutions Digitales
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Sur Mesure</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Développement de solutions digitales personnalisées pour répondre exactement à vos besoins métier. 
                  De l&apos;application web au logiciel complexe, nous créons votre outil parfait.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                    <Link href={localizedHref('/contact')}>
                      Discuter de mon projet
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50">
                    <Link href="#services">
                      Voir nos solutions
                    </Link>
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-2xl lg:text-3xl font-bold text-green-600">{stat.value}</div>
                      <div className="text-gray-600 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Nos Solutions
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Nos <span className="text-green-600">Solutions</span> Digitales
                </h2>
                <p className="text-lg text-gray-600">
                  Des solutions adaptées à chaque besoin métier, développées avec les technologies les plus modernes
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <Card key={service.title} className="h-full hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Notre <span className="text-green-300">Méthodologie</span>
                </h2>
                <p className="text-lg text-green-100">
                  Un processus de développement agile et transparent pour garantir le succès de votre projet
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {process.map((step) => (
                  <div key={step.step} className="bg-white/10 backdrop-blur rounded-2xl p-6 hover:bg-white/15 transition-colors">
                    <span className="text-5xl font-bold text-green-400/50">{step.step}</span>
                    <h3 className="text-xl font-bold mt-2 mb-3">{step.title}</h3>
                    <p className="text-green-100 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Technologies Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Stack Technique
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Technologies <span className="text-green-600">Maîtrisées</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Nous utilisons les technologies les plus adaptées à chaque projet
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {technologies.map((tech) => (
                  <div key={tech.name} className="bg-white rounded-lg px-6 py-3 shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-medium text-gray-900">{tech.name}</span>
                    <span className="text-xs text-gray-500 ml-2">{tech.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Témoignages
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Ce que disent nos <span className="text-green-600">clients</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.name} className="h-full">
                    <CardContent className="p-8">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 italic">&quot;{testimonial.content}&quot;</p>
                      <div>
                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Un projet sur mesure ?
                </h2>
                <p className="text-xl text-green-100 mb-8">
                  Discutons de vos besoins et trouvons ensemble la solution idéale pour votre entreprise.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50">
                    <Link href={localizedHref('/contact')}>
                      Demander un devis
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="border-2 border-white text-white bg-transparent hover:bg-white/10">
                    <Link href={localizedHref('/pricing')}>
                      Voir nos formules
                    </Link>
                  </Button>
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
