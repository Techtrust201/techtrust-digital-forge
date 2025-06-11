
"use client"

import React from 'react';
import { Bot, Users } from 'lucide-react';

const ServiceDistinction: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="text-center">
          <Bot className="w-12 h-12 text-[#45C7FF] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#374151] mb-2">Outils IA Automatisés</h3>
          <p className="text-[#374151]">
            Parfait si vous voulez garder le contrôle et économiser. Nos IA remplacent un commercial + community manager.
          </p>
          <div className="mt-4 text-sm text-[#45C7FF] font-medium">Solutions accessibles</div>
        </div>
        
        <div className="text-center">
          <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#374151] mb-2">Équipe Professionnelle</h3>
          <p className="text-[#374151]">
            Idéal si vous préférez déléguer à des experts. Notre équipe gère tout avec une stratégie personnalisée.
          </p>
          <div className="mt-4 text-sm text-purple-700 font-medium">Sur mesure</div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDistinction;
