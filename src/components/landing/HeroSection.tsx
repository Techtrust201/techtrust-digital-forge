
"use client"

import React from 'react';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50">
      {/* Arrière-plan animé simplifié */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#45C7FF]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Contenu textuel */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#45C7FF]/30 rounded-full px-4 py-2 text-sm font-medium text-[#45C7FF]">
              <Sparkles className="w-4 h-4" />
              Agence digitale #1 en France 2025
            </div>

            {/* Titre principal avec mots-clés SEO */}
            <h1 className="text-4xl lg:text-6xl font-bold text-[#374151] leading-tight">
              <span className="text-[#45C7FF]">Agence Web</span> &{' '}
              <span className="text-purple-600">Growth Hacking IA</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-[#45C7FF]">
                Solutions Digitales 2025
              </span>
            </h1>

            {/* Description optimisée SEO */}
            <p className="text-lg lg:text-xl text-[#374151] max-w-2xl">
              Transformez votre business avec nos <strong>outils IA de growth hacking + community management automatisés</strong>. 
              Remplacez un commercial + community manager par notre IA, ou bénéficiez de notre équipe d'experts.
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
                <Sparkles className="w-4 h-4 text-[#45C7FF]" />
                Création site web
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-[#45C7FF] to-purple-600 hover:from-purple-600 hover:to-[#45C7FF] text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <a href="/contact">
                  Démarrer mon projet 2025
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-[#45C7FF] text-[#45C7FF] hover:bg-[#45C7FF] hover:text-white bg-white/80 backdrop-blur-sm px-8 py-4 rounded-xl group"
              >
                <a href="/pricing">
                  Découvrir nos solutions
                </a>
              </Button>
            </div>

            {/* Social proof avec images d'exemple */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Ils nous font confiance :</p>
              <div className="flex items-center justify-center lg:justify-start gap-8 opacity-70">
                {/* Images d'exemple - à remplacer par vos vrais logos clients */}
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop&crop=center" 
                  alt="Logo Palais des Festivals de Cannes" 
                  className="h-12 w-24 object-contain grayscale hover:grayscale-0 transition-all"
                  title="⚠️ REMPLACEZ par le vrai logo du Palais des Festivals"
                />
                <img 
                  src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=120&h=60&fit=crop&crop=center" 
                  alt="Logo Groupe Chopard" 
                  className="h-12 w-24 object-contain grayscale hover:grayscale-0 transition-all"
                  title="⚠️ REMPLACEZ par le vrai logo Chopard"
                />
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=120&h=60&fit=crop&crop=center" 
                  alt="Logo Christina France" 
                  className="h-12 w-24 object-contain grayscale hover:grayscale-0 transition-all"
                  title="⚠️ REMPLACEZ par le vrai logo Christina France"
                />
              </div>
              <p className="text-xs text-[#45C7FF] mt-2 font-medium">
                ⚠️ <strong>À remplacer :</strong> Ajoutez ici les vrais logos de vos clients prestigieux
              </p>
            </div>
          </div>

          {/* Image/Animation côté droit */}
          <div className="relative">
            <div className="relative z-10">
              {/* Mockup principal avec image d'exemple */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center" 
                  alt="Dashboard IA Growth Hacking + Community Management Techtrust" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  title="⚠️ REMPLACEZ par une capture de vos vrais outils IA"
                />
                <div className="space-y-3">
                  <div className="h-3 bg-gradient-to-r from-[#45C7FF] to-purple-600 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>

              {/* Cards flottantes améliorées */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-[#45C7FF]/30 animate-bounce">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">+300% ROI clients 2025</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-purple-200 animate-bounce delay-1000">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-[#45C7FF] rounded-full animate-pulse"></div>
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
