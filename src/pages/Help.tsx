
import React from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';

const Help = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Aide Techtrust",
    "description": "Questions fréquentes et support client Techtrust",
    "url": "https://www.tech-trust.fr/help"
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
    }
  ];

  return (
    <>
      <SEO
        title="Aide & Support | Questions Fréquentes - Techtrust"
        description="❓ Besoin d'aide ? Trouvez toutes les réponses à vos questions sur nos services digitaux. Support client réactif et FAQ complète."
        keywords="aide techtrust, support client, FAQ, questions fréquentes, assistance, help desk"
        canonicalUrl="https://www.tech-trust.fr/help"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 lg:py-32 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <HelpCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Comment pouvons-nous <span className="text-green-600">vous aider</span> ?
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Trouvez rapidement les réponses à vos questions ou contactez notre équipe support.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Questions Fréquentes</h2>
                
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Support Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Besoin d'aide supplémentaire ?</h2>
                <p className="text-xl text-gray-600 mb-12">
                  Notre équipe est là pour vous accompagner dans tous vos projets digitaux.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat en ligne</h3>
                    <p className="text-gray-600 mb-4">Discutez directement avec notre équipe</p>
                    <Button>Démarrer le chat</Button>
                  </div>

                  <div className="text-center">
                    <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Téléphone</h3>
                    <p className="text-gray-600 mb-4">+33 X XX XX XX XX</p>
                    <Button variant="outline">Appeler</Button>
                  </div>

                  <div className="text-center">
                    <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600 mb-4">contact@tech-trust.fr</p>
                    <Button variant="outline">
                      <a href="/contact">Envoyer un email</a>
                    </Button>
                  </div>
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
