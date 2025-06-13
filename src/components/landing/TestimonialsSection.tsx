
"use client"

import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Marie Dupont",
    role: "CEO, TechStart",
    content: "TechTrust a transformé notre présence digitale. En 3 mois, nous avons multiplié par 5 notre génération de leads !",
    rating: 5,
    avatar: "MD"
  },
  {
    name: "Pierre Martin",
    role: "Fondateur, EcoShop",
    content: "L'équipe est exceptionnelle. Ils ont créé notre e-commerce en temps record avec un design magnifique.",
    rating: 5,
    avatar: "PM"
  },
  {
    name: "Sophie Leroy",
    role: "Marketing Director, InnovateCorp",
    content: "Leur expertise en growth hacking nous a permis d'atteindre 50k utilisateurs en 6 mois. Résultats au-delà de nos attentes !",
    rating: 5,
    avatar: "SL"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ce que disent nos <span className="text-blue-600">Clients</span>
          </h2>
          <p className="text-lg text-gray-600">
            Plus de 200 entreprises nous font confiance pour leur transformation digitale
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.name} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-blue-600 mb-4" />
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
