
import React from 'react';
import { Code, Zap, Users } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: "Création de Sites Web",
    description: "Sites web modernes et responsives, e-commerce et applications sur mesure"
  },
  {
    icon: Zap,
    title: "Growth Hacking",
    description: "Stratégies de croissance digitale et acquisition de leads"
  },
  {
    icon: Users,
    title: "Solutions Sur Mesure", 
    description: "Développement de logiciels personnalisés et applications métier"
  }
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nos <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-lg text-gray-600">
            Des solutions digitales complètes pour faire grandir votre business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={service.title} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
