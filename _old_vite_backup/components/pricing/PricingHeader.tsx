
import React from 'react';
import { Badge } from '@/components/ui/badge';

const PricingHeader = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Nos <span className="text-cyan-300">Tarifs</span> 2025
          </h1>
          <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Des solutions transparentes et personnalisées pour tous vos besoins digitaux
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Badge className="bg-green-500/20 border border-green-400 text-green-100 px-6 py-3 text-base font-semibold backdrop-blur-sm">
              ✅ Devis gratuit en 24h
            </Badge>
            <Badge className="bg-blue-500/20 border border-blue-400 text-blue-100 px-6 py-3 text-base font-semibold backdrop-blur-sm">
              🚀 Paiement en plusieurs fois
            </Badge>
            <Badge className="bg-purple-500/20 border border-purple-400 text-purple-100 px-6 py-3 text-base font-semibold backdrop-blur-sm">
              💎 Satisfaction garantie
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHeader;
