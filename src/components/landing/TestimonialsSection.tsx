
"use client"

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: "Marie Dubois",
    role: "CEO, Startup Innovation",
    content: "Techtrust a transformé notre vision en réalité. Leur approche du growth hacking nous a permis d'acquérir 500+ leads qualifiés en 3 mois. Une équipe extraordinaire !",
    rating: 5
  },
  {
    name: "Thomas Martin", 
    role: "Directeur Marketing, TechCorp",
    content: "Le développement sur mesure de notre CRM a révolutionné notre productivité. +40% d'efficacité en 6 mois. Je recommande vivement leurs services !",
    rating: 5
  },
  {
    name: "Sophie Laurent",
    role: "Fondatrice, E-commerce Plus",
    content: "Site e-commerce livré en 2 semaines, design parfait et fonctionnalités avancées. Notre chiffre d'affaires a doublé en 4 mois grâce à leur expertise !",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ce que disent nos <span className="text-purple-600">Clients</span>
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez pourquoi +200 entreprises nous font confiance pour leur transformation digitale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.name} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <Quote className="w-10 h-10 text-purple-600/30 mb-4" />
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 text-yellow-400 fill-current" 
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
