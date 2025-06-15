
import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">Techtrust</span> Recrute 2025
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Rejoignez l'équipe qui révolutionne le digital avec l'IA ! 
            Nous recherchons les meilleurs talents tech pour développer les outils du futur.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-2">💼 Rejoindre notre équipe</h3>
              <p className="text-gray-600 text-sm">CDI, freelance, stages - Tous les profils tech sont les bienvenus</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-100">
              <h3 className="font-bold text-gray-900 mb-2">🤝 Devenir apporteur d'affaires</h3>
              <p className="text-gray-600 text-sm">Commissions jusqu'à 15% - Programme très attractif</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
