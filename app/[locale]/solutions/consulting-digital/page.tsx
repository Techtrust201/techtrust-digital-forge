import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { 
  ArrowRight, 
  LineChart, 
  Lightbulb, 
  Target, 
  Users, 
  CheckCircle, 
  Award, 
  TrendingUp,
  Building,
  Gem,
  Sparkles,
  Shield,
  Briefcase,
  Settings,
  Clock,
  BarChart3
} from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import RelatedServices from '@/components/RelatedServices';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const dynamic = 'force-static';

interface ConsultingDigitalPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ConsultingDigitalPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  return {
    title: isEn 
      ? 'Premium Digital Consulting | Digital Transformation VIP - Techtrust'
      : 'Consulting Digital Premium | Transformation Digitale VIP - Techtrust',
    description: isEn
      ? 'Premium digital consulting for major accounts. Digital transformation, technology innovation, large-scale projects. 15M€+ in projects delivered, 50+ major clients.'
      : 'Consulting digital premium pour grands comptes. Transformation digitale, innovation technologique, projets d\'envergure. 15M€+ de projets livrés, 50+ grands comptes.',
    keywords: ['consulting digital', 'transformation digitale', 'grands comptes', 'stratégie digitale', 'innovation technologique', 'projets d\'envergure'],
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/solutions/consulting-digital`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/solutions/consulting-digital',
        'en': 'https://www.tech-trust.fr/en/solutions/consulting-digital',
        'x-default': 'https://www.tech-trust.fr/fr/solutions/consulting-digital',
      },
    },
  };
}

const projects = [
  {
    title: "Palais des Festivals de Cannes",
    description: "Digitalisation complète du système d'accréditation et de billetterie pour le Festival de Cannes. Gestion de 40 000+ accréditations annuelles.",
    stats: "40K+ accréditations",
    tags: ["Événementiel", "Billetterie", "CRM"],
    icon: Building
  },
  {
    title: "Groupe Chopard",
    description: "Plateforme digitale multi-marchés pour la maison de joaillerie suisse. Expériences immersives, configurateur de montres, e-commerce premium.",
    stats: "15+ marchés",
    tags: ["Luxe", "E-commerce", "Multi-marchés"],
    icon: Gem
  },
  {
    title: "Christina France",
    description: "Refonte complète de l'écosystème digital : e-commerce, CRM, automatisation marketing et intégration ERP pour ce leader de la joaillerie.",
    stats: "+45% CA online",
    tags: ["Joaillerie", "E-commerce", "ERP"],
    icon: Sparkles
  }
];

const services = [
  {
    icon: Lightbulb,
    title: "Stratégie Digitale",
    description: "Définition de votre vision digitale et de votre roadmap technologique à 3-5 ans."
  },
  {
    icon: Settings,
    title: "Architecture Technique",
    description: "Conception de systèmes scalables, sécurisés et performants pour vos besoins spécifiques."
  },
  {
    icon: Shield,
    title: "Audit & Sécurité",
    description: "Analyse de votre infrastructure, détection des vulnérabilités et mise en conformité RGPD."
  },
  {
    icon: Users,
    title: "Conduite du Changement",
    description: "Accompagnement de vos équipes dans l'adoption des nouvelles technologies et processus."
  },
  {
    icon: TrendingUp,
    title: "Innovation & R&D",
    description: "Veille technologique, proof of concepts et intégration des dernières innovations (IA, blockchain...)."
  },
  {
    icon: Briefcase,
    title: "Direction de Projet",
    description: "Pilotage de vos projets digitaux avec méthodologie agile et reporting exécutif."
  }
];

const methodology = [
  {
    step: "01",
    title: "Diagnostic 360°",
    description: "Immersion dans votre entreprise : analyse de l'existant, interviews parties prenantes, benchmark concurrentiel, identification des opportunités.",
    duration: "2-4 semaines"
  },
  {
    step: "02",
    title: "Vision Stratégique",
    description: "Co-construction de votre vision digitale, définition des objectifs SMART, priorisation des chantiers, validation du budget et planning.",
    duration: "2-3 semaines"
  },
  {
    step: "03",
    title: "Pilotage Transformation",
    description: "Direction des équipes, coordination des partenaires, suivi des KPIs, gestion des risques, comités de pilotage réguliers.",
    duration: "Selon projet"
  },
  {
    step: "04",
    title: "Transfert & Pérennisation",
    description: "Documentation, formation des équipes internes, mise en place des outils de suivi, définition de la gouvernance digitale.",
    duration: "2-4 semaines"
  }
];

const stats = [
  { value: "15M€+", label: "Projets livrés" },
  { value: "50+", label: "Grands comptes" },
  { value: "100%", label: "Taux de réussite" },
  { value: "12+", label: "Années d'expertise" }
];

export default async function ConsultingDigitalPage({ params }: ConsultingDigitalPageProps) {
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
            "name": "Consulting Digital Premium",
            "serviceType": "Digital Consulting",
            "provider": {
              "@type": "Organization",
              "name": "Techtrust",
              "url": "https://www.tech-trust.fr"
            },
            "description": "Consulting digital premium pour grands comptes et projets d'envergure. Transformation digitale, innovation technologique.",
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
              { label: 'Consulting Digital' }
            ]} 
          />
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-amber-200 rounded-full blur-3xl opacity-40"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-flex items-center gap-2 bg-amber-100 rounded-full px-4 py-2 text-sm font-medium text-amber-700 mb-6">
                    <Award className="w-4 h-4" aria-hidden="true" />
                    Expertise Grands Comptes
                  </span>
                  
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                    <span className="text-amber-600">Consulting</span> Digital
                    <br />
                    <span className="text-amber-600">Premium</span>
                  </h1>
                  
                  <p className="text-lg text-gray-600 mb-8">
                    Accompagnement stratégique VIP pour vos projets de transformation digitale d&apos;envergure. 
                    Comme le Palais des Festivals de Cannes, confiez-nous la digitalisation de votre organisation.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
                      <Link href={localizedHref('/contact')}>
                        Demander une consultation
                        <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" size="lg" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50">
                      <Link href="#projects">
                        Voir nos réalisations
                      </Link>
                    </Button>
                  </div>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                      <p className="text-3xl lg:text-4xl font-bold text-amber-600 mb-2">{stat.value}</p>
                      <p className="text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Références Prestigieuses
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Nos <span className="text-amber-600">Réalisations</span> d&apos;Envergure
                </h2>
                <p className="text-lg text-gray-600">
                  Découvrez quelques-uns des projets de transformation digitale que nous avons menés avec succès
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <Card key={project.title} className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center group-hover:from-amber-200 group-hover:to-orange-200 transition-colors">
                      <project.icon className="w-24 h-24 text-amber-600/50" />
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-amber-600">{project.stats}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Expertise Premium
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Nos <span className="text-amber-600">Domaines</span> d&apos;Intervention
                </h2>
                <p className="text-lg text-gray-600">
                  Un accompagnement complet pour réussir votre transformation digitale
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div key={service.title} className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Methodology Section */}
          <section className="py-20 bg-gradient-to-br from-gray-900 via-amber-900 to-orange-900 text-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Notre <span className="text-amber-300">Méthodologie</span> Premium
                </h2>
                <p className="text-lg text-amber-100">
                  Un accompagnement structuré et personnalisé pour garantir le succès de votre transformation
                </p>
              </div>

              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {methodology.map((step) => (
                    <div key={step.step} className="relative">
                      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 h-full hover:bg-white/15 transition-colors">
                        <span className="text-5xl font-bold text-amber-400/50">{step.step}</span>
                        <h3 className="text-xl font-bold mt-2 mb-3">{step.title}</h3>
                        <p className="text-amber-100 text-sm mb-4">{step.description}</p>
                        <div className="flex items-center gap-2 text-amber-300 text-sm">
                          <Clock className="w-4 h-4" aria-hidden="true" />
                          {step.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    Pourquoi nous choisir
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Un <span className="text-amber-600">Partenaire</span> de Confiance
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Notre équipe de consultants seniors combine expertise technique, vision stratégique 
                    et connaissance métier pour vous accompagner dans vos projets les plus ambitieux.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      "Équipe de consultants seniors (10+ ans d'expérience)",
                      "Méthodologies éprouvées et adaptées à votre contexte",
                      "Approche sur mesure et accompagnement personnalisé",
                      "Engagement de résultats et transparence totale",
                      "Réseau de partenaires technologiques de premier plan"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 lg:p-12">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                      <BarChart3 className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                      <p className="text-2xl font-bold text-gray-900">+200%</p>
                      <p className="text-sm text-gray-600">ROI moyen</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                      <Target className="w-10 h-10 text-amber-600 mx-auto mb-3" aria-hidden="true" />
                      <p className="text-2xl font-bold text-gray-900">100%</p>
                      <p className="text-sm text-gray-600">Projets livrés</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                      <Users className="w-10 h-10 text-amber-600 mx-auto mb-3" aria-hidden="true" />
                      <p className="text-2xl font-bold text-gray-900">50+</p>
                      <p className="text-sm text-gray-600">Grands comptes</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                      <Award className="w-10 h-10 text-amber-600 mx-auto mb-3" aria-hidden="true" />
                      <p className="text-2xl font-bold text-gray-900">12+</p>
                      <p className="text-sm text-gray-600">Années</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Expertise approfondie Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <span className="inline-block bg-amber-100 text-amber-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    Expertise
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Le consulting digital : un <span className="text-amber-600">investissement stratégique</span>
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                  <p>
                    La transformation digitale n&apos;est plus une option – c&apos;est une nécessité pour rester compétitif en 2026. 
                    Pourtant, <strong>70% des projets de transformation digitale échouent</strong> en raison d&apos;un manque de vision stratégique, 
                    d&apos;une résistance au changement mal gérée ou d&apos;un choix technologique inadapté. C&apos;est là qu&apos;intervient notre 
                    expertise en consulting digital.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">Notre approche du consulting digital</h3>
                  <p>
                    Chez Techtrust, le consulting digital n&apos;est pas un exercice théorique. Nous combinons une vision stratégique avec une expertise 
                    technique opérationnelle pour vous accompagner de la réflexion à l&apos;implémentation. Notre méthode repose sur trois piliers :
                  </p>
                  <ul className="space-y-3 list-disc pl-6">
                    <li><strong>Diagnostic approfondi</strong> : audit complet de votre maturité digitale, analyse de vos processus, benchmark concurrentiel et identification des opportunités à fort ROI.</li>
                    <li><strong>Roadmap stratégique</strong> : définition d&apos;une feuille de route claire avec des jalons mesurables, des priorités hiérarchisées et un budget prévisionnel réaliste.</li>
                    <li><strong>Accompagnement opérationnel</strong> : nous ne nous contentons pas de recommander – nous vous accompagnons dans la mise en œuvre, le pilotage et l&apos;optimisation continue.</li>
                  </ul>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">Les domaines d&apos;intervention de notre consulting</h3>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mt-6">Stratégie digitale et positionnement</h4>
                  <p>
                    Nous vous aidons à définir votre stratégie digitale globale : positionnement en ligne, choix des canaux d&apos;acquisition, 
                    stratégie de contenu, parcours client digital et indicateurs de performance. Chaque recommandation est alignée sur 
                    vos objectifs business et votre budget.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mt-6">Transformation des processus internes</h4>
                  <p>
                    La digitalisation de vos processus internes peut générer des gains de productivité considérables. Nous analysons vos workflows, 
                    identifions les goulots d&apos;étranglement et proposons des solutions d&apos;automatisation : dématérialisation des documents, 
                    automatisation des workflows d&apos;approbation, mise en place de CRM/ERP adaptés, et création de tableaux de bord décisionnels.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mt-6">Data & Intelligence Artificielle</h4>
                  <p>
                    Vos données sont un actif stratégique sous-exploité. Nous vous accompagnons dans la structuration de votre data strategy : 
                    collecte et centralisation des données, mise en conformité RGPD, création de dashboards analytiques, et intégration de 
                    solutions d&apos;IA pour automatiser les tâches répétitives et prédire les tendances de votre marché.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mt-6">Conduite du changement</h4>
                  <p>
                    La technologie n&apos;est rien sans l&apos;adhésion de vos équipes. Notre approche de conduite du changement inclut : 
                    formation des collaborateurs, communication interne, identification des ambassadeurs du changement, et mise en place 
                    de feedbacks continus. Nous transformons la résistance au changement en enthousiasme pour l&apos;innovation.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">Le ROI du consulting digital</h3>
                  <p>
                    Un accompagnement stratégique professionnel représente un investissement qui se rentabilise rapidement. 
                    Nos clients constatent en moyenne :
                  </p>
                  <ul className="space-y-2 list-disc pl-6">
                    <li><strong>-30% de coûts opérationnels</strong> grâce à l&apos;automatisation des processus</li>
                    <li><strong>+40% de productivité</strong> via l&apos;optimisation des outils et des workflows</li>
                    <li><strong>+25% de satisfaction client</strong> par l&apos;amélioration des parcours digitaux</li>
                    <li><strong>ROI positif sous 6 mois</strong> sur les projets de transformation accompagnés</li>
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
                  <span className="inline-block bg-amber-100 text-amber-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    FAQ
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Questions <span className="text-amber-600">fréquentes</span>
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
                          "name": "Qu'est-ce que le consulting digital ?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Le consulting digital est un accompagnement stratégique qui aide les entreprises à tirer parti du numérique. Il couvre la stratégie digitale, l'optimisation des processus, la sélection d'outils, la formation des équipes et la conduite du changement."
                          }
                        },
                        {
                          "@type": "Question",
                          "name": "Combien coûte une mission de consulting digital ?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Nos missions de consulting démarrent à partir de 2 000€ pour un audit stratégique. Les missions d'accompagnement continu se situent entre 3 000€ et 10 000€/mois selon le périmètre. Chaque devis est personnalisé selon vos besoins spécifiques."
                          }
                        },
                        {
                          "@type": "Question",
                          "name": "À qui s'adresse le consulting digital ?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Le consulting digital s'adresse à toutes les entreprises souhaitant accélérer leur transformation numérique : PME en croissance, ETI en transformation, startups cherchant à scaler, et grands groupes modernisant leurs processus."
                          }
                        },
                        {
                          "@type": "Question",
                          "name": "Quelle est la durée d'une mission de consulting ?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Un audit stratégique se réalise en 2 à 4 semaines. Les missions d'accompagnement durent généralement de 3 à 12 mois, avec des points d'étape réguliers pour ajuster la stratégie en fonction des résultats."
                          }
                        },
                        {
                          "@type": "Question",
                          "name": "Comment mesurez-vous le succès d'une mission ?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Nous définissons des KPIs précis dès le début de la mission : réduction des coûts, gain de productivité, augmentation du chiffre d'affaires digital, satisfaction client, taux d'adoption des outils. Un reporting mensuel vous donne une visibilité totale sur l'avancement."
                          }
                        }
                      ]
                    })
                  }}
                />

                <div className="space-y-4">
                  {[
                    {
                      q: "Qu'est-ce que le consulting digital ?",
                      a: "Le consulting digital est un accompagnement stratégique qui aide les entreprises à tirer parti du numérique. Il couvre la stratégie digitale, l'optimisation des processus, la sélection d'outils, la formation des équipes et la conduite du changement."
                    },
                    {
                      q: "Combien coûte une mission de consulting digital ?",
                      a: "Nos missions de consulting démarrent à partir de 2 000€ pour un audit stratégique. Les missions d'accompagnement continu se situent entre 3 000€ et 10 000€/mois selon le périmètre. Chaque devis est personnalisé selon vos besoins spécifiques."
                    },
                    {
                      q: "À qui s'adresse le consulting digital ?",
                      a: "Le consulting digital s'adresse à toutes les entreprises souhaitant accélérer leur transformation numérique : PME en croissance, ETI en transformation, startups cherchant à scaler, et grands groupes modernisant leurs processus."
                    },
                    {
                      q: "Quelle est la durée d'une mission de consulting ?",
                      a: "Un audit stratégique se réalise en 2 à 4 semaines. Les missions d'accompagnement durent généralement de 3 à 12 mois, avec des points d'étape réguliers pour ajuster la stratégie en fonction des résultats."
                    },
                    {
                      q: "Comment mesurez-vous le succès d'une mission ?",
                      a: "Nous définissons des KPIs précis dès le début de la mission : réduction des coûts, gain de productivité, augmentation du chiffre d'affaires digital, satisfaction client, taux d'adoption des outils. Un reporting mensuel vous donne une visibilité totale sur l'avancement."
                    }
                  ].map((faq, index) => (
                    <details key={index} className="bg-white rounded-xl p-6 shadow-sm group">
                      <summary className="text-lg font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                        {faq.q}
                        <span className="ml-4 text-amber-600 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Prêt à transformer votre entreprise ?
                </h2>
                <p className="text-xl text-amber-100 mb-8">
                  Discutons de votre projet de transformation digitale lors d&apos;un premier échange stratégique gratuit.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-amber-700 hover:bg-amber-50">
                    <Link href={localizedHref('/contact')}>
                      Réserver une consultation
                      <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="border-2 border-white text-white bg-transparent hover:bg-white/10">
                    <Link href={`tel:+33123456789`}>
                      Appeler un expert
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <RelatedServices currentSlug="consulting-digital" locale={locale} />
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
