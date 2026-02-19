import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
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
import RelatedServices from '@/components/RelatedServices';
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
        'x-default': 'https://www.tech-trust.fr/fr/solutions/digitales-sur-mesure',
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
  { value: "30+", label: "Projets livrés" },
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
          <Breadcrumbs 
            locale={locale} 
            items={[
              { label: 'Solutions', href: `/${locale}/solutions` },
              { label: 'Solutions Sur Mesure' }
            ]} 
          />
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full px-4 py-2 text-sm font-medium text-green-600 mb-6">
                  <Code className="w-4 h-4" aria-hidden="true" />
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
                      <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
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
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" aria-hidden="true" />
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

          {/* Pourquoi le développement sur mesure Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <span className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    Expertise
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Pourquoi choisir le <span className="text-green-600">développement sur mesure</span> ?
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                  <p>
                    Dans un monde où les solutions SaaS se multiplient, le développement sur mesure reste un avantage compétitif majeur pour les entreprises 
                    qui veulent se démarquer. Un logiciel personnalisé s&apos;adapte parfaitement à vos processus métier, là où une solution standard vous force 
                    à adapter vos processus au logiciel. Chez Techtrust, nous développons des solutions qui <strong>évoluent avec votre entreprise</strong>.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">Solutions standard vs sur mesure : le comparatif</h3>
                  <p>
                    Les solutions SaaS présentent des avantages indéniables : déploiement rapide, coût initial faible et mises à jour automatiques. 
                    Cependant, elles atteignent rapidement leurs limites lorsque vos besoins deviennent spécifiques :
                  </p>
                  <ul className="space-y-3 list-disc pl-6">
                    <li><strong>Personnalisation limitée</strong> : les solutions standard ne couvrent généralement que 70-80% de vos besoins réels. Le développement sur mesure couvre 100% de vos exigences fonctionnelles.</li>
                    <li><strong>Intégration complexe</strong> : connecter une solution SaaS à votre système d&apos;information existant (ERP, CRM, outils internes) peut s&apos;avérer coûteux et complexe. Un logiciel sur mesure s&apos;intègre nativement.</li>
                    <li><strong>Dépendance éditeur</strong> : avec un SaaS, vous dépendez de la roadmap de l&apos;éditeur. Avec du sur mesure, vous êtes propriétaire de votre code et maître de vos évolutions.</li>
                    <li><strong>Coût à long terme</strong> : les licences SaaS mensuelles peuvent dépasser le coût d&apos;un développement sur mesure sur 3 à 5 ans, surtout avec l&apos;augmentation du nombre d&apos;utilisateurs.</li>
                    <li><strong>Avantage concurrentiel</strong> : un logiciel sur mesure est unique à votre entreprise. Il peut devenir un véritable avantage concurrentiel impossible à reproduire par vos concurrents.</li>
                  </ul>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">Notre expertise technique en 2026</h3>
                  <p>
                    L&apos;écosystème technologique évolue rapidement. Chez Techtrust, nous maintenons une veille constante pour utiliser les technologies 
                    les plus adaptées à chaque projet. Voici notre approche technique :
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mt-6">Architecture moderne et scalable</h4>
                  <p>
                    Nous concevons des architectures microservices ou serverless selon les besoins. Nos applications sont conçues pour supporter 
                    la croissance : de 10 utilisateurs à 10 millions, votre infrastructure s&apos;adapte automatiquement grâce au cloud computing 
                    (AWS, Google Cloud, Azure). Chaque composant est indépendant, testable et déployable séparément.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mt-6">Intelligence Artificielle intégrée</h4>
                  <p>
                    L&apos;IA n&apos;est plus un gadget – c&apos;est un outil de productivité essentiel. Nous intégrons des fonctionnalités d&apos;IA dans vos applications : 
                    analyse prédictive pour anticiper les tendances de votre marché, chatbots intelligents pour automatiser le support client, 
                    traitement automatique de documents (OCR, extraction de données), et systèmes de recommandation personnalisés. 
                    Nous utilisons les API d&apos;OpenAI, Google AI et des modèles open-source pour créer des solutions IA sur mesure et pertinentes.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mt-6">Sécurité et conformité RGPD</h4>
                  <p>
                    La sécurité est intégrée dès la conception (Security by Design). Nous appliquons les meilleures pratiques : chiffrement 
                    des données au repos et en transit, authentification multi-facteurs, gestion fine des droits d&apos;accès, audit logging complet, 
                    et tests de pénétration réguliers. Nos développements sont conformes au RGPD avec des fonctionnalités natives de gestion 
                    du consentement, de droit à l&apos;effacement et de portabilité des données.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">Types de projets que nous réalisons</h3>
                  <p>
                    Notre équipe a une expérience significative dans de nombreux domaines :
                  </p>
                  <ul className="space-y-2 list-disc pl-6">
                    <li><strong>Applications métier (ERP/CRM)</strong> : gestion commerciale, suivi de production, relation client</li>
                    <li><strong>Plateformes e-commerce</strong> : boutiques en ligne avec parcours d&apos;achat optimisé et gestion avancée des stocks</li>
                    <li><strong>Applications mobiles</strong> : iOS et Android avec React Native ou Flutter pour un déploiement cross-platform</li>
                    <li><strong>Portails clients et extranet</strong> : espaces sécurisés pour vos clients avec suivi de commandes et facturation</li>
                    <li><strong>Outils d&apos;automatisation</strong> : workflows automatisés, intégrations API, robots de traitement de données</li>
                    <li><strong>Tableaux de bord et analytics</strong> : visualisation de données en temps réel pour piloter votre activité</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <span className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    FAQ
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Questions <span className="text-green-600">fréquentes</span>
                  </h2>
                </div>

                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      "mainEntity": [
                        {
                          "@type": "Question",
                          "name": "Combien coûte le développement d'une application sur mesure ?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Le coût dépend de la complexité du projet. Un MVP (Minimum Viable Product) démarre à partir de 5 000€, tandis qu'une application complète peut varier entre 15 000€ et 100 000€+. Nous proposons toujours un devis détaillé après analyse de vos besoins."
                          }
                        },
                        {
                          "@type": "Question",
                          "name": "Combien de temps faut-il pour développer un logiciel sur mesure ?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Un MVP peut être livré en 4 à 8 semaines. Un projet complet prend généralement entre 3 et 6 mois. Nous travaillons en sprints agiles de 2 semaines avec des livrables réguliers pour vous permettre de suivre l'avancement."
                          }
                        },
                        {
                          "@type": "Question",
                          "name": "Suis-je propriétaire du code source ?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Oui, absolument. Vous êtes propriétaire à 100% du code source développé. Nous vous remettons l'intégralité du code, la documentation technique et les accès aux infrastructures à la fin du projet."
                          }
                        },
                        {
                          "@type": "Question",
                          "name": "Proposez-vous un service de maintenance après livraison ?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Oui, nous proposons des contrats de maintenance évolutive qui incluent : corrections de bugs, mises à jour de sécurité, évolutions fonctionnelles et support technique. Nos formules sont flexibles et adaptées à vos besoins."
                          }
                        },
                        {
                          "@type": "Question",
                          "name": "Quelles technologies utilisez-vous ?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Nous utilisons les technologies les plus modernes et robustes : React, Next.js et TypeScript pour le frontend, Node.js et Python pour le backend, PostgreSQL et MongoDB pour les bases de données, et AWS/GCP/Azure pour le cloud. Le choix technologique est adapté à chaque projet."
                          }
                        }
                      ]
                    })
                  }}
                />

                <div className="space-y-4">
                  {[
                    {
                      q: "Combien coûte le développement d'une application sur mesure ?",
                      a: "Le coût dépend de la complexité du projet. Un MVP (Minimum Viable Product) démarre à partir de 5 000€, tandis qu'une application complète peut varier entre 15 000€ et 100 000€+. Nous proposons toujours un devis détaillé après analyse de vos besoins."
                    },
                    {
                      q: "Combien de temps faut-il pour développer un logiciel sur mesure ?",
                      a: "Un MVP peut être livré en 4 à 8 semaines. Un projet complet prend généralement entre 3 et 6 mois. Nous travaillons en sprints agiles de 2 semaines avec des livrables réguliers pour vous permettre de suivre l'avancement."
                    },
                    {
                      q: "Suis-je propriétaire du code source ?",
                      a: "Oui, absolument. Vous êtes propriétaire à 100% du code source développé. Nous vous remettons l'intégralité du code, la documentation technique et les accès aux infrastructures à la fin du projet."
                    },
                    {
                      q: "Proposez-vous un service de maintenance après livraison ?",
                      a: "Oui, nous proposons des contrats de maintenance évolutive qui incluent : corrections de bugs, mises à jour de sécurité, évolutions fonctionnelles et support technique. Nos formules sont flexibles et adaptées à vos besoins."
                    },
                    {
                      q: "Quelles technologies utilisez-vous ?",
                      a: "Nous utilisons les technologies les plus modernes et robustes : React, Next.js et TypeScript pour le frontend, Node.js et Python pour le backend, PostgreSQL et MongoDB pour les bases de données, et AWS/GCP/Azure pour le cloud. Le choix technologique est adapté à chaque projet."
                    }
                  ].map((faq, index) => (
                    <details key={index} className="bg-white rounded-xl p-6 shadow-sm group">
                      <summary className="text-lg font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                        {faq.q}
                        <span className="ml-4 text-green-600 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
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
                      <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
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

          <RelatedServices currentSlug="digitales-sur-mesure" locale={locale} />
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
