import React from "react";
import Head from "next/head";
import {
  Globe,
  TrendingUp,
  Code,
  Users,
  MessageSquare,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import NavbarPublic from "@/components/NavbarPublic";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const solutions = [
  {
    icon: Globe,
    title: "Agence Web",
    subtitle: "Sites professionnels & E-commerce",
    description:
      "Création de sites web modernes, optimisés SEO et adaptés à tous les appareils. De la vitrine e-commerce à l'application web complexe, nous développons votre présence digitale.",
    features: [
      "Design responsive",
      "Optimisation SEO",
      "E-commerce",
      "Web App",
      "Maintenance",
    ],
    color: "custom-blue",
    link: "/solutions/agence-web",
    clients: "Palais des Festivals, Chopard",
  },
  {
    icon: TrendingUp,
    title: "Growth Hacking",
    subtitle: "Acquisition & Croissance",
    description:
      "Stratégies de growth hacking pour multiplier vos leads et conversions. Prospection automatisée, email marketing et optimisation des tunnels de vente.",
    features: [
      "Lead generation",
      "Email marketing",
      "Automation",
      "Analytics",
      "A/B Testing",
    ],
    color: "custom-purple",
    link: "/solutions/growth-hacking",
    clients: "Monaco Business, French Tech",
  },
  {
    icon: Code,
    title: "Solutions Sur Mesure",
    subtitle: "Développement personnalisé",
    description:
      "Logiciels métier, CRM, ERP et applications sur mesure pour optimiser vos processus et booster votre productivité.",
    features: [
      "Audit métier",
      "Développement agile",
      "API",
      "Intégrations",
      "Support",
    ],
    color: "custom-green",
    link: "/solutions/digitales-sur-mesure",
    clients: "Christina France, Luxury Hotels",
  },
  {
    icon: MessageSquare,
    title: "Community Management",
    subtitle: "Réseaux sociaux & Contenu",
    description:
      "Gestion complète de vos réseaux sociaux, création de contenu engageant et stratégie d'influence pour développer votre communauté.",
    features: [
      "Stratégie sociale",
      "Création contenu",
      "Engagement",
      "Influence",
      "Analytics",
    ],
    color: "custom-pink",
    link: "/solutions/community-management",
    clients: "Marques de luxe, Startups",
  },
  {
    icon: Lightbulb,
    title: "Consulting Digital",
    subtitle: "Stratégie & Transformation",
    description:
      "Audit digital, stratégie de transformation numérique et accompagnement dans vos projets d'innovation technologique.",
    features: [
      "Audit digital",
      "Stratégie",
      "Innovation",
      "Formation",
      "Accompagnement",
    ],
    color: "custom-slate",
    link: "/solutions/consulting-digital",
    clients: "Grandes entreprises, PME",
  },
];

const Solutions = (props) => {
  return (
    <>
      <Head>
        <title>
          Solutions Digitales Sur Mesure | Agence Web, Growth Hacking, Community
          Management - Techtrust
        </title>
        <meta
          name="description"
          content="Découvrez nos solutions digitales complètes : création de sites web, growth hacking, développement sur mesure, community management et consulting digital. Un écosystème complet pour votre transformation numérique."
        />
        <meta
          name="keywords"
          content="solutions digitales sur mesure, agence web, growth hacking, développement logiciel personnalisé, community management, consulting digital, transformation numérique, site web, e-commerce, application métier, stratégie digitale"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tech-trust.fr/solutions" />
        <meta
          property="og:title"
          content="Solutions Digitales Complètes | Web, Growth, Logiciel, Social Media"
        />
        <meta
          property="og:description"
          content="De la création web au growth hacking en passant par le développement sur mesure et le community management. Découvrez l'écosystème digital complet de Techtrust."
        />
        <meta
          property="og:image"
          content="https://www.tech-trust.fr/solutions-og-image.jpg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.tech-trust.fr/solutions"
        />
        <meta
          property="twitter:title"
          content="Solutions Digitales Complètes | Web, Growth, Logiciel, Social Media"
        />
        <meta
          property="twitter:description"
          content="De la création web au growth hacking en passant par le développement sur mesure et le community management. Découvrez l'écosystème digital complet de Techtrust."
        />
        <meta
          property="twitter:image"
          content="https://www.tech-trust.fr/solutions-og-image.jpg"
        />

        {/* Canonical */}
        <link rel="canonical" href="https://www.tech-trust.fr/solutions" />

        {/* Hreflang */}
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://www.tech-trust.fr/fr/solutions"
        />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://www.tech-trust.fr/en/solutions"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.tech-trust.fr/solutions"
        />

        {/* Schema.org données structurées */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: solutions.map((solution, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Service",
                name: solution.title,
                description: solution.description,
                provider: {
                  "@type": "Organization",
                  name: "Techtrust",
                },
                url: `https://www.tech-trust.fr${solution.link}`,
              },
            })),
          })}
        </script>
      </Head>

      <div className="flex min-h-screen flex-col">
        <header>
          <NavbarPublic />
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
            {/* Éléments décoratifs */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-custom-blue/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-custom-purple/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-800 shadow-sm mb-6">
                  <Users className="w-4 h-4 text-custom-blue" />
                  Plus de 200 entreprises accompagnées
                </span>

                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8">
                  <span className="text-custom-blue">Solutions Digitales</span>{" "}
                  Sur Mesure
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-custom-purple to-custom-green">
                    Pour Votre Croissance
                  </span>
                </h1>

                <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                  De la <strong>création de site web</strong> au{" "}
                  <strong>growth hacking</strong> en passant par le{" "}
                  <strong>développement sur mesure</strong> et le{" "}
                  <strong>community management</strong>. Un écosystème digital
                  complet pour transformer votre business.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="bg-gradient-to-r from-custom-blue to-custom-purple text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Discuter de mon projet
                  </a>
                  <a
                    href="/pricing"
                    className="border-2 border-gray-300 bg-white px-8 py-4 rounded-xl font-semibold hover:border-custom-blue transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Voir nos tarifs
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Solutions Grid */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Notre <span className="text-custom-blue">Expertise</span>{" "}
                  Digitale
                </h2>
                <p className="text-lg text-gray-600">
                  Découvrez notre écosystème de solutions digitales pour
                  transformer votre entreprise et accélérer votre croissance.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map((solution, index) => (
                  <Card
                    key={solution.title}
                    className={`hover:shadow-2xl transition-all duration-300 border-0 shadow-lg h-full border-t-4 border-${solution.color}`}
                  >
                    <CardContent className="p-8 h-full flex flex-col">
                      {/* Icône */}
                      <div
                        className={`w-16 h-16 bg-${solution.color}/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <solution.icon
                          className={`w-8 h-8 text-${solution.color}`}
                        />
                      </div>

                      {/* Contenu */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {solution.title}
                        </h3>
                        <p
                          className={`text-${solution.color} font-medium mb-4`}
                        >
                          {solution.subtitle}
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {solution.description}
                        </p>

                        {/* Features */}
                        <ul className="space-y-2 mb-6">
                          {solution.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <div
                                className={`w-2 h-2 bg-${solution.color} rounded-full mr-3`}
                              ></div>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* Réalisations */}
                        <div className="mb-6">
                          <span className="text-sm text-gray-500">
                            Nos clients: {solution.clients}
                          </span>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button
                        asChild
                        className={`w-full bg-${solution.color} hover:bg-${solution.color}/90 text-white group`}
                      >
                        <a href={solution.link}>
                          En savoir plus
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Approche méthodologique */}
          <section className="py-20 bg-gradient-to-br from-gray-900 via-custom-blue/90 to-custom-purple/90 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                    Notre <span className="text-custom-green">Méthode</span>{" "}
                    d'Excellence
                  </h2>
                  <p className="text-lg text-gray-300">
                    Une approche structurée pour des résultats mesurables et
                    durables
                  </p>
                </div>

                <div className="space-y-12">
                  {[
                    {
                      number: "01",
                      title: "Audit & Stratégie",
                      description:
                        "Nous commençons par une analyse approfondie de votre activité, vos objectifs et votre marché pour définir une stratégie digitale sur mesure.",
                    },
                    {
                      number: "02",
                      title: "Conception & Développement",
                      description:
                        "Notre équipe d'experts conçoit et développe des solutions digitales innovantes, alliant esthétique et performances.",
                    },
                    {
                      number: "03",
                      title: "Déploiement & Optimisation",
                      description:
                        "Lancement de votre solution avec une méthodologie agile, permettant des ajustements rapides basés sur les résultats.",
                    },
                    {
                      number: "04",
                      title: "Croissance & Évolution",
                      description:
                        "Analyse continue des performances, optimisations régulières et implémentation de nouvelles fonctionnalités pour soutenir votre croissance.",
                    },
                  ].map((step) => (
                    <div key={step.number} className="flex gap-8">
                      <div className="w-20 h-20 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center text-3xl font-bold">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-300">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-16">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-custom-blue hover:bg-gray-100"
                  >
                    <a href="/contact">Commencer votre projet</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Questions <span className="text-custom-blue">Fréquentes</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Tout ce que vous devez savoir sur nos solutions digitales
                </p>
              </div>

              <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8">
                <div className="space-y-8">
                  {[
                    {
                      question:
                        "Comment choisir la solution digitale adaptée à mon entreprise ?",
                      answer:
                        "Nous réalisons un audit gratuit pour comprendre vos objectifs, votre marché et vos besoins spécifiques. Sur cette base, nous vous recommandons la solution la plus adaptée et élaborons une stratégie sur mesure.",
                    },
                    {
                      question:
                        "Quel est le délai de mise en œuvre d'un projet digital ?",
                      answer:
                        "Les délais varient selon la complexité du projet : un site vitrine peut être livré en 2 semaines, tandis qu'une application métier sur mesure nécessite généralement 2 à 3 mois. Nous définissons ensemble un calendrier précis dès le lancement du projet.",
                    },
                    {
                      question:
                        "Comment mesurer le retour sur investissement de mes projets digitaux ?",
                      answer:
                        "Nous mettons en place des tableaux de bord et des KPIs personnalisés pour suivre avec précision les performances de vos solutions digitales. Vous avez accès à ces métriques en temps réel via notre plateforme client.",
                    },
                    {
                      question:
                        "Quelle est votre approche en matière de sécurité des données ?",
                      answer:
                        "La sécurité est notre priorité absolue. Nous appliquons les meilleures pratiques en matière de protection des données, respectons scrupuleusement le RGPD et réalisons des audits de sécurité réguliers sur tous nos projets.",
                    },
                    {
                      question:
                        "Proposez-vous un accompagnement après la livraison du projet ?",
                      answer:
                        "Absolument. Tous nos projets incluent une période de support technique, et nous proposons des contrats de maintenance pour assurer la pérennité et l'évolution de vos solutions digitales.",
                    },
                  ].map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-6 last:border-0"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
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

export default Solutions;
