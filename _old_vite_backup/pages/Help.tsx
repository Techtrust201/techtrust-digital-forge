
import React from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle, Phone, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Help = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Aide Techtrust",
    "description": "Questions fréquentes et support client Techtrust",
    "url": "https://www.tech-trust.fr/help",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Combien de temps pour créer un site web ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En moyenne 2-4 semaines selon la complexité. Site vitrine : 2 semaines, e-commerce : 3-4 semaines."
        }
      },
      {
        "@type": "Question",
        "name": "Proposez-vous la maintenance ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, nous proposons des contrats de maintenance incluant mises à jour, sauvegardes et support technique."
        }
      },
      {
        "@type": "Question",
        "name": "Travaillez-vous avec toutes les entreprises ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nous accompagnons TPE, PME et grandes entreprises dans tous les secteurs d'activité."
        }
      }
    ]
  };

  const faqs = [
    {
      question: "Combien de temps pour créer un site web ?",
      answer: "En moyenne 2-4 semaines selon la complexité. Site vitrine : 2 semaines, e-commerce : 3-4 semaines."
    },
    {
      question: "Proposez-vous la maintenance ?",
      answer: "Oui, nous proposons des contrats de maintenance incluant mises à jour, sauvegardes et support technique."
    },
    {
      question: "Travaillez-vous avec toutes les entreprises ?",
      answer: "Nous accompagnons TPE, PME et grandes entreprises dans tous les secteurs d'activité."
    },
    {
      question: "Vos sites sont-ils optimisés SEO ?",
      answer: "Tous nos sites incluent un SEO technique de base. Nous proposons aussi des prestations SEO avancées."
    },
    {
      question: "Comment fonctionne votre technologie IA ?",
      answer: "Notre IA utilise des algorithmes de pointe pour automatiser l'acquisition client, analyser les données et personnaliser les interactions. C'est comme avoir une équipe marketing et commerciale qui travaille 24h/24."
    },
    {
      question: "Quels sont vos délais d'intervention en cas de problème ?",
      answer: "Notre équipe de support est disponible 7j/7 avec un temps de réponse inférieur à 2 heures pour les problèmes critiques."
    },
    {
      question: "Avez-vous des références dans mon secteur ?",
      answer: "Avec plus de 200 clients dans divers secteurs (luxe, immobilier, e-commerce, services...), nous avons probablement déjà travaillé dans votre domaine. Contactez-nous pour des exemples spécifiques."
    },
    {
      question: "Comment débute un projet avec Techtrust ?",
      answer: "Tout commence par un audit gratuit où nous analysons vos besoins et objectifs. Nous vous proposons ensuite une stratégie personnalisée et un devis détaillé avant de lancer le projet."
    }
  ];

  const categories = [
    {
      title: "Création de sites web",
      topics: [
        "Design & Développement",
        "Fonctionnalités & Technologies",
        "Maintenance & Support",
        "Référencement (SEO)"
      ]
    },
    {
      title: "Growth Hacking & Marketing",
      topics: [
        "Solutions d'automatisation",
        "Acquisition client",
        "Email marketing",
        "Analytics & KPIs"
      ]
    },
    {
      title: "Solutions sur mesure",
      topics: [
        "Logiciels métier",
        "CRM & ERP",
        "Intégrations API",
        "Applications mobiles"
      ]
    },
    {
      title: "Community Management",
      topics: [
        "Gestion des réseaux sociaux",
        "Création de contenu",
        "Stratégie sociale",
        "Modération & Veille"
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Aide & Support | Questions Fréquentes - Techtrust"
        description="❓ Besoin d'aide ? Trouvez toutes les réponses à vos questions sur nos services digitaux. Support client réactif et FAQ complète."
        keywords="aide techtrust, support client, FAQ, questions fréquentes, assistance, help desk, support technique"
        canonicalUrl="https://www.tech-trust.fr/help"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-green-100/30 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <HelpCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Comment pouvons-nous <span className="text-green-600">vous aider</span> ?
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Trouvez rapidement les réponses à vos questions ou contactez notre équipe support.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                    <a href="#faq">
                      Questions fréquentes
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href="#contact">
                      Contacter le support
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Aide par Catégorie</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {categories.map((category, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h3>
                    <ul className="space-y-3">
                      {category.topics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Button asChild variant="ghost" className="p-0 h-auto text-green-600">
                        <a href="#faq" className="flex items-center">
                          Voir l'aide <ArrowRight className="ml-1 w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Questions Fréquentes</h2>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 pt-1 text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                <div className="text-center mt-8">
                  <p className="text-gray-600 mb-4">Vous n'avez pas trouvé de réponse à votre question ?</p>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <a href="#contact">Contacter notre support</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Documentation Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Documentation & Guides
                </h2>
                <p className="text-center text-gray-600 mb-12">
                  Explorez notre documentation et nos guides pour tirer le meilleur parti de nos services
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Guide d'utilisation Growth IA",
                      description: "Apprenez à configurer et optimiser nos outils d'IA marketing",
                      link: "#"
                    },
                    {
                      title: "Maintenance de votre site web",
                      description: "Comment gérer et mettre à jour votre site après livraison",
                      link: "#"
                    },
                    {
                      title: "Configuration Analytics",
                      description: "Guide complet pour configurer votre tableau de bord analytics",
                      link: "#"
                    },
                    {
                      title: "API & Intégrations",
                      description: "Documentation technique pour les intégrations avancées",
                      link: "#"
                    }
                  ].map((item, index) => (
                    <a 
                      href={item.link} 
                      key={index}
                      className="block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="flex items-center text-green-600 font-medium">
                        Consulter <ArrowRight className="ml-1 w-4 h-4" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Support Section */}
          <section id="contact" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Besoin d'aide supplémentaire ?</h2>
                <p className="text-xl text-gray-600 mb-12">
                  Notre équipe est là pour vous accompagner dans tous vos projets digitaux.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat en ligne</h3>
                    <p className="text-gray-600 mb-4">Discutez directement avec notre équipe</p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Démarrer le chat</Button>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Téléphone</h3>
                    <p className="text-gray-600 mb-4">+33 X XX XX XX XX</p>
                    <Button variant="outline" className="w-full">Appeler</Button>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600 mb-4">support@tech-trust.fr</p>
                    <Button 
                      asChild
                      variant="outline" 
                      className="w-full"
                    >
                      <a href="/contact">Envoyer un email</a>
                    </Button>
                  </div>
                </div>

                <div className="mt-12 bg-white rounded-xl shadow-md p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Heures de support</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-medium text-gray-900">Support standard</h4>
                      <p className="text-gray-600">Lundi - Vendredi : 9h - 18h</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Support Premium</h4>
                      <p className="text-gray-600">7j/7 : 8h - 22h</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">
                    Pour les urgences en dehors de ces horaires, utilisez notre formulaire d'urgence disponible dans votre espace client.
                  </p>
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

export default Help;
