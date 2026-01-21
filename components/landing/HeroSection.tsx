"use client"

import React from 'react';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50">
      {/* Arrière-plan animé simplifié */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-custom-blue/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Contenu textuel */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-custom-blue/30 rounded-full px-4 py-2 text-sm font-medium text-custom-blue">
              <Sparkles className="w-4 h-4" />
              Agence digitale #1 en France 2025
            </div>

            {/* Titre principal avec mots-clés SEO */}
            <h1 className="text-4xl lg:text-6xl font-bold text-[#374151] leading-tight">
              <span className="text-custom-blue">Agence Web</span> &{' '}
              <span className="text-purple-600">Growth Hacking IA</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-custom-blue">
                Solutions Digitales 2025
              </span>
            </h1>

            {/* Description optimisée SEO */}
            <p className="text-lg lg:text-xl text-[#374151] max-w-2xl">
              Transformez votre business avec nos <strong>outils IA de growth hacking + community management automatisés</strong>. 
              Remplacez un commercial + community manager par notre IA, ou bénéficiez de notre équipe d&apos;experts.
            </p>

            {/* Points clés SEO */}
            <div className="flex flex-wrap gap-4 text-sm text-[#374151]">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1">
                <Zap className="w-4 h-4 text-green-600" />
                IA Growth Hacking
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1">
                <Target className="w-4 h-4 text-purple-600" />
                Community Management IA
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1">
                <Sparkles className="w-4 h-4 text-custom-blue" />
                Création site web
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-custom-blue to-purple-600 hover:from-purple-600 hover:to-custom-blue text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link href="/contact">
                  Démarrer mon projet 2025
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-2 border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white bg-white/80 backdrop-blur-sm px-8 py-4 rounded-xl group"
              >
                <Link href="/pricing">
                  Découvrir nos solutions
                </Link>
              </Button>
            </div>
          </div>

          {/* Image/Animation côté droit */}
          <div className="relative">
            <div className="relative z-10">
              {/* Mockup principal */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-custom-blue/20 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-custom-blue font-medium">Dashboard IA Techtrust</span>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gradient-to-r from-custom-blue to-purple-600 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>

              {/* Cards flottantes améliorées */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-custom-blue/30 animate-bounce">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">+300% ROI clients 2025</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-purple-200 animate-bounce delay-1000">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-custom-blue rounded-full animate-pulse"></div>
                  <span className="font-medium">IA Community + Commercial</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
