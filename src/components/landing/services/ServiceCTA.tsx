
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServiceCTA: React.FC = () => {
  return (
    <div className="text-center mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-[#374151] mb-6">
          Découvrez nos solutions personnalisées !
        </p>
        <Button 
          asChild
          size="lg"
          className="bg-[#45C7FF] hover:bg-[#45C7FF]/90 text-white hover:shadow-lg transition-all duration-300"
        >
          <a href="/pricing">
            Voir nos solutions
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default ServiceCTA;
