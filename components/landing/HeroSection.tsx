
"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles, Zap, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Arrière-plan animé */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-custom-purple/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-custom-blue/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-custom-green/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Contenu textuel */}
          <motion.div 
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-custom-blue/20 rounded-full px-4 py-2 text-sm font-medium text-custom-blue shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Agence digitale #1 en France
            </motion.div>

            {/* Titre principal avec mots-clés SEO */}
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-custom-blue">Agence Web</span> &{' '}
              <span className="text-custom-purple">Growth Hacking</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-custom-green to-custom-blue">
                Solutions Digitales Sur Mesure
              </span>
            </motion.h1>

            {/* Description optimisée SEO */}
            <motion.p 
              className="text-lg lg:text-xl text-gray-600 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Transformez votre business avec nos <strong>solutions digitales sur mesure</strong>. 
              De la <strong>création de site web</strong> à l'<strong>acquisition de clients</strong>, 
              nous boostons la croissance de +200 entreprises en France.
            </motion.p>

            {/* Points clés SEO */}
            <motion.div 
              className="flex flex-wrap gap-4 text-sm text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1">
                <Zap className="w-4 h-4 text-custom-green" />
                Création site web
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1">
                <Target className="w-4 h-4 text-custom-purple" />
                Growth hacking
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1">
                <Sparkles className="w-4 h-4 text-custom-blue" />
                Logiciel sur mesure
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-custom-blue to-custom-purple hover:from-custom-purple hover:to-custom-blue text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link href="/contact">
                  Démarrer mon projet
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 hover:border-custom-blue bg-white/80 backdrop-blur-sm px-8 py-4 rounded-xl group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Voir nos réalisations
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div 
              className="pt-8 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-gray-500 mb-4">Ils nous font confiance :</p>
              <div className="flex items-center justify-center lg:justify-start gap-8 opacity-60">
                {/* Logos clients */}
                <div className="text-2xl font-bold text-gray-400">CLIENT 1</div>
                <div className="text-2xl font-bold text-gray-400">CLIENT 2</div>
                <div className="text-2xl font-bold text-gray-400">CLIENT 3</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Animation côté droit */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative z-10">
              {/* Mockup principal */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-custom-blue to-custom-purple rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-custom-green rounded w-20"></div>
                    <div className="h-8 bg-custom-purple rounded w-20"></div>
                  </div>
                </div>
              </div>

              {/* Cards flottantes */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-custom-blue/20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-custom-green rounded-full"></div>
                  <span className="font-medium">+300% croissance</span>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-custom-purple/20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-custom-purple rounded-full"></div>
                  <span className="font-medium">Site en 48h</span>
                </div>
              </motion.div>
            </div>

            {/* Éléments décoratifs */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-20 right-20 w-32 h-32 bg-custom-blue/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-20 left-20 w-40 h-40 bg-custom-purple/10 rounded-full blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}
