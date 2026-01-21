"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Globe,
  TrendingUp,
  MessageSquare,
  Code,
  Search,
  Briefcase,
  ArrowRight,
  Check
} from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      id: 'website',
      name: 'Agence Web',
      description: 'Création de sites web professionnels',
      icon: Globe,
      color: 'blue',
      features: ['Sites vitrine', 'E-commerce', 'Applications web'],
      price: 'À partir de 990€'
    },
    {
      id: 'growth',
      name: 'Growth Hacking',
      description: 'Stratégies de croissance avec IA',
      icon: TrendingUp,
      color: 'purple',
      features: ['Acquisition clients', 'Automatisation', 'Analytics IA'],
      price: 'À partir de 490€/mois'
    },
    {
      id: 'community',
      name: 'Community Management',
      description: 'Gestion de vos réseaux sociaux',
      icon: MessageSquare,
      color: 'pink',
      features: ['Création contenu', 'Planification', 'Engagement'],
      price: 'À partir de 590€/mois'
    },
    {
      id: 'seo',
      name: 'SEO & Référencement',
      description: 'Optimisation pour les moteurs de recherche',
      icon: Search,
      color: 'green',
      features: ['Audit SEO', 'Optimisation technique', 'Contenu SEO'],
      price: 'À partir de 390€/mois'
    },
    {
      id: 'custom',
      name: 'Solutions Sur Mesure',
      description: 'Développement logiciel personnalisé',
      icon: Code,
      color: 'orange',
      features: ['Apps mobiles', 'Logiciels métier', 'Intégrations API'],
      price: 'Sur devis'
    },
    {
      id: 'consulting',
      name: 'Consulting Digital',
      description: 'Conseil et stratégie numérique',
      icon: Briefcase,
      color: 'indigo',
      features: ['Audit digital', 'Stratégie', 'Accompagnement'],
      price: 'À partir de 150€/h'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nos Services</h1>
          <p className="text-gray-600">Découvrez nos solutions pour votre business</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            const colors = getColorClasses(service.color);
            
            return (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="font-bold text-gray-900">{service.price}</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/fr/solutions/${service.id === 'website' ? 'agence-web' : service.id === 'growth' ? 'growth-hacking' : service.id === 'community' ? 'community-management' : service.id === 'seo' ? 'seo-referencement' : service.id === 'custom' ? 'digitales-sur-mesure' : 'consulting-digital'}`}>
                        En savoir plus
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Besoin d&apos;un conseil personnalisé ?
            </h2>
            <p className="mb-6 text-blue-100">
              Contactez-nous pour discuter de vos besoins et obtenir un devis gratuit
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/fr/contact">
                Demander un devis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
