"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  HelpCircle, 
  Search,
  ChevronDown
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const faqCategories = [
    {
      category: 'Compte & Facturation',
      questions: [
        {
          question: 'Comment modifier mon plan d\'abonnement ?',
          answer: 'Rendez-vous dans "Mon Compte" > "Mon Plan" pour voir les options disponibles et changer de formule. Les changements sont effectifs immédiatement.'
        },
        {
          question: 'Comment télécharger mes factures ?',
          answer: 'Accédez à "Mon Compte" > "Facturation" pour consulter et télécharger toutes vos factures au format PDF.'
        },
        {
          question: 'Quels moyens de paiement acceptez-vous ?',
          answer: 'Nous acceptons les cartes Visa, Mastercard, American Express ainsi que les virements SEPA pour les entreprises.'
        }
      ]
    },
    {
      category: 'Analytics & Rapports',
      questions: [
        {
          question: 'À quelle fréquence les données sont-elles mises à jour ?',
          answer: 'Les données sont mises à jour en temps réel pour les métriques principales, et toutes les heures pour les analyses détaillées.'
        },
        {
          question: 'Comment exporter mes rapports ?',
          answer: 'Cliquez sur le bouton "Exporter" présent sur chaque page d\'analytics pour télécharger vos données en CSV ou PDF.'
        },
        {
          question: 'Puis-je créer des rapports personnalisés ?',
          answer: 'Oui, les plans Gold et Diamond permettent de créer des tableaux de bord personnalisés avec les métriques de votre choix.'
        }
      ]
    },
    {
      category: 'Campagnes Marketing',
      questions: [
        {
          question: 'Comment créer ma première campagne email ?',
          answer: 'Allez dans "Campagnes" > "Email Marketing" et cliquez sur "Nouvelle campagne". Suivez l\'assistant pour configurer votre envoi.'
        },
        {
          question: 'Combien de campagnes puis-je créer ?',
          answer: 'Le nombre de campagnes dépend de votre plan : Bronze (1/mois), Silver (5/mois), Gold et Diamond (illimité).'
        },
        {
          question: 'Comment fonctionne l\'automation ?',
          answer: 'L\'automation vous permet de créer des workflows déclenchés par des événements (inscription, achat, etc.). Configurez vos règles dans "Campagnes" > "Automation".'
        }
      ]
    },
    {
      category: 'Technique & Intégrations',
      questions: [
        {
          question: 'Comment connecter mon site web ?',
          answer: 'Copiez le code de tracking fourni dans votre dashboard et ajoutez-le dans le <head> de votre site ou utilisez notre plugin WordPress.'
        },
        {
          question: 'L\'API est-elle disponible ?',
          answer: 'Oui, l\'API REST est disponible pour les plans Silver et supérieurs. Documentation complète accessible dans votre espace développeur.'
        },
        {
          question: 'Quelles intégrations sont disponibles ?',
          answer: 'Nous proposons des intégrations natives avec Zapier, Slack, HubSpot, Salesforce, Google Analytics, et bien d\'autres.'
        }
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-blue-500" />
            Questions Fréquentes
          </h1>
          <p className="text-gray-600">Trouvez rapidement des réponses à vos questions</p>
        </div>

        {/* Barre de recherche */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher une question..."
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQ par catégorie */}
        {faqCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}

        {/* Contact support */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <HelpCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Vous n&apos;avez pas trouvé votre réponse ?
            </h3>
            <p className="text-gray-600 mb-4">
              Notre équipe support est là pour vous aider
            </p>
            <a 
              href="/dashboard/help/support" 
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Contacter le support
            </a>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
