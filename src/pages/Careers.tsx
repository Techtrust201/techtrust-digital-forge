
import React from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Code, 
  TrendingUp, 
  MessageSquare, 
  LineChart, 
  Download, 
  ArrowRight, 
  Users,
  CheckCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const jobOpenings = [
  {
    title: "Développeur Full Stack",
    type: "CDI / Freelance",
    location: "Remote / Sur site",
    icon: Code,
    department: "tech",
    description: "Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe technique. Vous participerez au développement de sites web et applications sur mesure pour nos clients.",
    requirements: [
      "3+ ans d'expérience en développement web",
      "Maîtrise de React, TypeScript et Node.js",
      "Expérience avec les bases de données SQL et NoSQL",
      "Bonne connaissance des principes de sécurité web"
    ]
  },
  {
    title: "Growth Hacker",
    type: "CDI",
    location: "Remote / Sur site",
    icon: TrendingUp,
    department: "marketing",
    description: "En tant que Growth Hacker chez Techtrust, vous concevrez et mettrez en œuvre des stratégies d'acquisition innovantes pour nos clients en utilisant notre suite d'outils IA.",
    requirements: [
      "Expérience prouvée en growth hacking et acquisition client",
      "Maîtrise des outils d'automatisation marketing",
      "Connaissance des principes d'analyse de données",
      "Esprit créatif et orienté résultats"
    ]
  },
  {
    title: "Community Manager",
    type: "CDI / Stage",
    location: "Remote",
    icon: MessageSquare,
    department: "marketing",
    description: "Rejoignez notre équipe pour gérer la présence en ligne de nos clients et créer du contenu engageant sur les réseaux sociaux avec l'aide de nos outils d'IA.",
    requirements: [
      "Expérience en gestion de communautés sur les principaux réseaux sociaux",
      "Excellentes capacités rédactionnelles",
      "Connaissance des outils d'analyse de performance sociale",
      "Intérêt pour les nouvelles technologies et l'IA"
    ]
  },
  {
    title: "Consultant Digital",
    type: "CDI / Freelance",
    location: "Sur site",
    icon: LineChart,
    department: "consulting",
    description: "En tant que Consultant Digital, vous accompagnerez nos clients dans leur transformation numérique et les aiderez à optimiser leur stratégie digitale.",
    requirements: [
      "5+ ans d'expérience en consulting digital",
      "Expertise en transformation numérique et gestion de projet",
      "Excellentes compétences en communication",
      "Connaissance approfondie des tendances et technologies digitales"
    ]
  },
  {
    title: "Chef de Projet Web",
    type: "CDI",
    location: "Sur site",
    icon: Users,
    department: "project",
    description: "Nous recherchons un Chef de Projet Web pour coordonner nos projets de développement de sites web et applications, de la conception au déploiement.",
    requirements: [
      "3+ ans d'expérience en gestion de projets web",
      "Bonne compréhension des aspects techniques du développement web",
      "Excellentes compétences en communication et gestion d'équipe",
      "Maîtrise des méthodologies agiles"
    ]
  }
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Carrières chez Techtrust",
  "description": "Rejoignez notre équipe d'experts ou devenez apporteur d'affaires. Découvrez les opportunités de collaboration avec Techtrust.",
  "mainEntityOfPage": {
    "@type": "JobPosting",
    "title": "Opportunités d'emploi chez Techtrust",
    "description": "Rejoignez l'équipe Techtrust et participez à la transformation digitale de nos clients.",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Techtrust"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR"
      }
    }
  }
};

const Careers = () => {
  return (
    <>
      <SEO
        title="Carrières | Rejoindre Techtrust, Emplois Tech & Digital - Techtrust"
        description="🔍 Rejoignez l'élite du digital ! Offres d'emploi dev, growth hacking, design, consulting. Devenez apporteur d'affaires et bénéficiez de commissions attractives."
        keywords="carrières techtrust, emploi tech, recrutement digital, jobs développeur, apporteur affaires, commissions, freelance digital"
        canonicalUrl="https://www.tech-trust.fr/careers"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-gray-50 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-custom-blue/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-custom-purple/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Rejoignez <span className="text-custom-blue">L'Aventure</span> Techtrust
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                  Faites partie de l'équipe qui révolutionne le digital. Plusieurs façons de collaborer avec nous, 
                  choisissez celle qui vous correspond le mieux.
                </p>

                <Tabs defaultValue="jobs" className="max-w-3xl mx-auto">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="jobs" className="text-lg py-3">Offres d'Emploi</TabsTrigger>
                    <TabsTrigger value="business" className="text-lg py-3">Devenir Apporteur d'Affaires</TabsTrigger>
                  </TabsList>
                
                  <TabsContent value="jobs">
                    <div className="grid md:grid-cols-2 gap-6">
                      <a href="#job-listings" className="flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <Briefcase className="w-12 h-12 text-custom-blue mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Rejoindre notre équipe</h3>
                        <p className="text-gray-600 text-center">Consultez nos offres d'emploi et intégrez une équipe passionnée et innovante</p>
                      </a>

                      <a href="mailto:careers@tech-trust.fr" className="flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <Code className="w-12 h-12 text-custom-purple mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Candidature spontanée</h3>
                        <p className="text-gray-600 text-center">Vous ne trouvez pas le poste idéal ? Envoyez-nous votre CV, nous sommes toujours à la recherche de talents</p>
                      </a>
                    </div>
                  </TabsContent>
                
                  <TabsContent value="business">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Programme d'Apporteur d'Affaires</h3>
                      <p className="text-gray-600 mb-6 text-center">
                        Profitez de rémunérations attractives en apportant des projets à Techtrust. 
                        Plus vous nous référez de clients, plus votre commission augmente !
                      </p>

                      <div className="overflow-x-auto mb-6">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-custom-blue/10">
                              <th className="border border-gray-200 px-4 py-3 text-left">Nombre de projets</th>
                              <th className="border border-gray-200 px-4 py-3 text-left">Commission</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-200 px-4 py-3">1 projet</td>
                              <td className="border border-gray-200 px-4 py-3 font-medium">5% Commission</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-200 px-4 py-3">2 projets</td>
                              <td className="border border-gray-200 px-4 py-3 font-medium">7.5% Commission</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-200 px-4 py-3">3 projets</td>
                              <td className="border border-gray-200 px-4 py-3 font-medium">10% Commission</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-200 px-4 py-3">4 projets</td>
                              <td className="border border-gray-200 px-4 py-3 font-medium">12.5% Commission</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-200 px-4 py-3">5 projets et plus</td>
                              <td className="border border-gray-200 px-4 py-3 font-medium">15% Commission</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Conditions</h4>
                        <p className="text-gray-600 text-sm">
                          Remplissez et signez le modèle de contrat disponible ci-dessous pour devenir apporteur d'affaires. 
                          La validation de l'apport est conditionnée par la signature d'un devis comportant une clause mentionnant 
                          votre rôle dans la mise en relation.
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <Button className="bg-custom-blue hover:bg-custom-blue/90 flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Télécharger le contrat
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </section>
          
          {/* Current Openings Section */}
          <section id="job-listings" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 text-center">
                  Nos <span className="text-custom-blue">Offres</span> d'Emploi
                </h2>
                <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
                  Explorez nos opportunités et trouvez le poste qui correspond à vos compétences et aspirations
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {jobOpenings.map((job, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-custom-blue/10 rounded-xl p-3">
                            <job.icon className="w-6 h-6 text-custom-blue" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                            <div className="flex flex-wrap gap-3 mb-4">
                              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                                {job.type}
                              </span>
                              <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                {job.location}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-4">{job.description}</p>
                            
                            <h4 className="font-medium text-gray-900 mb-2">Compétences requises:</h4>
                            <ul className="space-y-1 mb-6">
                              {job.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-custom-green mt-1 flex-shrink-0" />
                                  <span className="text-sm text-gray-600">{req}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <Button asChild className="bg-custom-blue hover:bg-custom-blue/90 w-full">
                              <a href="/contact?job=application">
                                Postuler <ArrowRight className="ml-2 w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <p className="text-lg text-gray-600 mb-6">
                    Vous ne trouvez pas le poste qui vous correspond ? 
                    Envoyez-nous votre candidature spontanée !
                  </p>
                  <Button asChild size="lg" variant="outline">
                    <a href="/contact?job=spontaneous">Candidature spontanée</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Why Join Us Section */}
          <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 text-center">
                  Pourquoi <span className="text-custom-blue">Nous Rejoindre</span> ?
                </h2>
                <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
                  Techtrust est bien plus qu'une agence digitale, c'est un environnement où chacun peut s'épanouir et développer son plein potentiel
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Innovation",
                      description: "Travaillez avec les technologies les plus récentes et participez à la création de solutions innovantes."
                    },
                    {
                      title: "Flexibilité",
                      description: "Nous favorisons l'équilibre vie professionnelle/vie personnelle avec des horaires flexibles et le télétravail."
                    },
                    {
                      title: "Croissance",
                      description: "Développez vos compétences grâce à des formations continues et des projets variés et stimulants."
                    },
                    {
                      title: "Impact",
                      description: "Participez à des projets qui ont un impact réel sur le succès de nos clients et la transformation digitale."
                    },
                    {
                      title: "Collaboration",
                      description: "Rejoignez une équipe passionnée et collaborative où chaque idée est valorisée."
                    },
                    {
                      title: "Perspective",
                      description: "Bénéficiez d'opportunités d'évolution de carrière dans une entreprise en pleine croissance."
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-custom-blue">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center text-white">
                <h2 className="text-3xl font-bold mb-6">Prêt à nous rejoindre ?</h2>
                <p className="text-xl mb-8 text-blue-100">
                  Que vous soyez à la recherche d'un nouveau défi professionnel ou que vous souhaitiez devenir apporteur d'affaires,
                  nous serions ravis d'échanger avec vous !
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-custom-blue hover:bg-gray-100">
                    <a href="/contact">Nous contacter</a>
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-custom-blue/80">
                    <a href="#job-listings">Voir les offres</a>
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
};

export default Careers;
