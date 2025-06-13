
"use client"

import React from 'react';
import { ArrowRight, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Prêt à <span className="text-yellow-300">Transformer</span>
            <br />
            votre Business ?
          </h2>

          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Rejoignez +200 entreprises qui ont boosté leur croissance avec nos solutions digitales sur mesure. 
            <strong className="text-white"> Devis gratuit en 24h !</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold shadow-lg group">
              <Calendar className="mr-2 w-5 h-5" />
              Réserver un appel gratuit
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold">
              Voir nos tarifs
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
              <h3 className="font-semibold mb-1">Appelez-nous</h3>
              <p className="text-gray-200">+33 X XX XX XX XX</p>
            </div>

            <div className="text-center">
              <Mail className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
              <h3 className="font-semibold mb-1">Écrivez-nous</h3>
              <p className="text-gray-200">contact@tech-trust.fr</p>
            </div>

            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
              <h3 className="font-semibold mb-1">Réponse garantie</h3>
              <p className="text-gray-200">Sous 24h ouvrées</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
