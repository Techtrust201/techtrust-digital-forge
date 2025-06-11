
"use client"

import React from 'react';
import ServiceHeader from './services/ServiceHeader';
import ServiceDistinction from './services/ServiceDistinction';
import ServiceCard from './services/ServiceCard';
import ServiceCTA from './services/ServiceCTA';
import { services } from './services/ServicesData';

const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="services">
      <div className="container mx-auto px-4 relative z-10">
        <ServiceHeader />
        <ServiceDistinction />
        
        {/* Grille de services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              index={index}
            />
          ))}
        </div>

        <ServiceCTA />
      </div>
    </section>
  );
};

export default ServicesSection;
