
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-custom-blue via-custom-purple to-custom-green relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Titre principal */}
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Prêt à <span className="text-yellow-300">Transformer</span>
            <br />
            votre Business ?
          </h2>

          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Rejoignez +200 entreprises qui ont boosté leur croissance avec nos solutions digitales sur mesure. 
            <strong className="text-white"> Devis gratuit en 24h !</strong>
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button asChild size="lg" className="bg-white text-custom-blue hover:bg-gray-100 px-8 py-6 rounded-xl font-semibold shadow-lg group">
              <a href="/contact">
                <Calendar className="mr-2 w-5 h-5" />
                Réserver un appel gratuit
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-custom-blue px-8 py-6 rounded-xl font-semibold">
              <a href="/pricing">
                Voir nos tarifs
              </a>
            </Button>
          </div>

          {/* Informations de contact */}
          <div className="grid md:grid-cols-3 gap-8 text-white">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <Phone className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
              <h3 className="font-semibold mb-1">Appelez-nous</h3>
              <p className="text-gray-200">+33 X XX XX XX XX</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <Mail className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
              <h3 className="font-semibold mb-1">Écrivez-nous</h3>
              <p className="text-gray-200">contact@tech-trust.fr</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <Calendar className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
              <h3 className="font-semibold mb-1">Réponse garantie</h3>
              <p className="text-gray-200">Sous 24h ouvrées</p>
            </motion.div>
          </div>

          {/* Garantie */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white"
          >
            <Star className="w-5 h-5 text-yellow-300" />
            Satisfaction garantie ou remboursé
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
