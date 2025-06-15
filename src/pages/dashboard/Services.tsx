
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Zap, MessageSquare, Wrench, Plus, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 'website',
      title: 'Création Site Web',
      description: 'Sites web professionnels et e-commerce performants',
      icon: Globe,
      color: 'bg-blue-100 text-blue-600',
      packages: [
        { name: 'Starter', price: '899€' },
        { name: 'Business', price: '1599€' },
        { name: 'Premium E-commerce', price: '2999€' }
      ]
    },
    {
      id: 'growth',
      title: 'Growth Hacking IA',
      description: 'Stratégies de croissance avec intelligence artificielle',
      icon: Zap,
      color: 'bg-green-100 text-green-600',
      packages: [
        { name: 'Easy', price: '299€/mois' },
        { name: 'Pro', price: '599€/mois' },
        { name: 'Enterprise', price: '1299€/mois' }
      ]
    },
    {
      id: 'community',
      title: 'Community Management',
      description: 'Gestion professionnelle de vos réseaux sociaux',
      icon: MessageSquare,
      color: 'bg-orange-100 text-orange-600',
      packages: [
        { name: 'Starter', price: '799€/mois' },
        { name: 'Growth', price: '1499€/mois' },
        { name: 'Premium', price: '2999€/mois' }
      ]
    },
    {
      id: 'custom',
      title: 'Solutions Sur Mesure',
      description: 'Développement personnalisé selon vos besoins',
      icon: Wrench,
      color: 'bg-purple-100 text-purple-600',
      packages: [
        { name: 'Audit & Conseil', price: '1500€' },
        { name: 'Application Sur Mesure', price: '15000€' },
        { name: 'Solution Enterprise', price: '50000€' }
      ]
    }
  ];

  const handleSelectService = (serviceId: string) => {
    console.log(`Service sélectionné: ${serviceId}`);
    // Redirection vers le formulaire de contact ou de commande
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nos Services</h1>
          <p className="text-gray-600">Découvrez toutes nos solutions pour développer votre business</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => {
            const ServiceIcon = service.icon;
            return (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${service.color}`}>
                      <ServiceIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Formules disponibles :</h4>
                    {service.packages.map((pkg, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{pkg.name}</span>
                        <Badge variant="outline">{pkg.price}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => handleSelectService(service.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Sélectionner ce service
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Besoin d'aide pour choisir ?
            </h3>
            <p className="text-gray-600 mb-4">
              Nos experts sont là pour vous conseiller sur la solution idéale
            </p>
            <Button>
              Prendre rendez-vous
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Services;
