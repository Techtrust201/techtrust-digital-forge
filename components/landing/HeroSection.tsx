import React from 'react';
import { ArrowRight, Code, Zap, Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeroSectionProps {
  locale: string;
}

const HeroSection = ({ locale }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50">
      {/* Arriere-plan */}
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
              <Code className="w-4 h-4" aria-hidden="true" />
              100% code sur mesure — Mougins (Cannes)
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl lg:text-6xl font-bold text-[#374151] leading-tight">
              On code <span className="text-custom-blue">tout</span> de{' '}
              <span className="text-purple-600">A&nbsp;à&nbsp;Z</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-custom-blue">
                Zéro template. Zéro WordPress.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-[#374151] max-w-2xl">
              Chez Techtrust, <strong>chaque site est codé à la main</strong> avec Next.js, React et TypeScript. 
              Pas de Wix. Pas de WordPress. Pas de thèmes préfabriqués. Juste du code propre, performant et optimisé SEO.
            </p>

            {/* Points cles */}
            <div className="flex flex-wrap gap-3 text-sm text-[#374151]">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Code className="w-4 h-4 text-custom-blue" aria-hidden="true" />
                Code sur mesure de A à Z
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Zap className="w-4 h-4 text-green-600" aria-hidden="true" />
                SEO / SEA / GEO
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Shield className="w-4 h-4 text-purple-600" aria-hidden="true" />
                Growth Hacking IA
              </div>
            </div>

            {/* Anti-template */}
            <div className="flex flex-wrap gap-3 text-xs text-gray-400">
              <span className="inline-flex items-center gap-1 line-through"><X className="w-3 h-3" aria-hidden="true" />WordPress</span>
              <span className="inline-flex items-center gap-1 line-through"><X className="w-3 h-3" aria-hidden="true" />Wix</span>
              <span className="inline-flex items-center gap-1 line-through"><X className="w-3 h-3" aria-hidden="true" />Squarespace</span>
              <span className="inline-flex items-center gap-1 line-through"><X className="w-3 h-3" aria-hidden="true" />Templates</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-custom-blue to-purple-600 hover:from-purple-600 hover:to-custom-blue text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link href={`/${locale}/contact`}>
                  Démarrer mon projet
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-2 border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white bg-white/80 backdrop-blur-sm px-8 py-4 rounded-xl group"
              >
                <Link href={`/${locale}/pricing`}>
                  Voir nos tarifs
                </Link>
              </Button>
            </div>
          </div>

          {/* Cote droit — Code preview */}
          <div className="relative">
            <div className="relative z-10">
              {/* Terminal-style code preview */}
              <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-gray-400 text-xs ml-2 font-mono">votre-site.tsx — Techtrust</span>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <div><span className="text-purple-400">import</span> <span className="text-green-400">{'{'}NextPage{'}'}</span> <span className="text-purple-400">from</span> <span className="text-yellow-300">&apos;next&apos;</span></div>
                  <div className="mt-2"><span className="text-purple-400">export default function</span> <span className="text-custom-blue">VotreSite</span><span className="text-gray-400">() {'{'}</span></div>
                  <div className="pl-4 text-gray-500">{'// Code artisanal, 0 template'}</div>
                  <div className="pl-4"><span className="text-purple-400">return</span> <span className="text-gray-400">(</span></div>
                  <div className="pl-8"><span className="text-custom-blue">&lt;main</span> <span className="text-green-400">className</span>=<span className="text-yellow-300">&quot;perfection&quot;</span><span className="text-custom-blue">&gt;</span></div>
                  <div className="pl-12 text-green-400">{'{'}/* Votre succès commence ici */{'}'}
                  </div>
                  <div className="pl-8"><span className="text-custom-blue">&lt;/main&gt;</span></div>
                  <div className="pl-4"><span className="text-gray-400">)</span></div>
                  <div><span className="text-gray-400">{'}'}</span></div>
                </div>
              </div>

              {/* Cards flottantes */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-green-200 animate-bounce">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Performance 100/100</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-purple-200 animate-bounce delay-1000">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-custom-blue rounded-full animate-pulse"></div>
                  <span className="font-medium">30+ projets livrés</span>
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
