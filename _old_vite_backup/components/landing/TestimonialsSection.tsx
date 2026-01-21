
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: "Marie Dubois",
    role: "CEO, Startup Innovation",
    content: "Techtrust a transformé notre vision en réalité. Leur approche du growth hacking nous a permis d'acquérir 500+ leads qualifiés en 3 mois. Une équipe extraordinaire !",
    rating: 5,
    avatar: "/testimonials/marie.jpg"
  },
  {
    name: "Thomas Martin", 
    role: "Directeur Marketing, TechCorp",
    content: "Le développement sur mesure de notre CRM a révolutionné notre productivité. +40% d'efficacité en 6 mois. Je recommande vivement leurs services !",
    rating: 5,
    avatar: "/testimonials/thomas.jpg"
  },
  {
    name: "Sophie Laurent",
    role: "Fondatrice, E-commerce Plus",
    content: "Site e-commerce livré en 2 semaines, design parfait et fonctionnalités avancées. Notre chiffre d'affaires a doublé en 4 mois grâce à leur expertise !",
    rating: 5,
    avatar: "/testimonials/sophie.jpg"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-custom-purple/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-custom-blue/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ce que disent nos <span className="text-custom-purple">Clients</span>
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez pourquoi +200 entreprises nous font confiance pour leur transformation digitale.
          </p>
        </div>

        {/* Grille de témoignages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  {/* Quote icon */}
                  <Quote className="w-10 h-10 text-custom-purple/30 mb-4" />

                  {/* Contenu du témoignage */}
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed mb-6 italic">
                      "{testimonial.content}"
                    </p>

                    {/* Étoiles */}
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5 text-yellow-400 fill-current" 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Profil */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-custom-blue to-custom-purple rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Note moyenne */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-700 font-medium">4.9/5</span>
            <span className="text-gray-500 text-sm">• +200 avis clients</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
