
"use client"

import React from 'react';
import { motion } from 'framer-motion';

const ServiceHeader: React.FC = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-[#45C7FF] px-4 py-2 rounded-full text-sm font-medium mb-4"
      >
        Notre Expertise 2025
      </motion.span>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-3xl lg:text-5xl font-bold text-[#374151] mb-6"
      >
        Nos <span className="text-[#45C7FF]">Solutions Digitales</span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-green-600">
          IA & Professionnelles
        </span>
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-lg text-[#374151]"
      >
        <strong>Vous avez le choix :</strong> Utilisez nos outils IA en autonomie pour automatiser votre growth hacking + community management, 
        ou bénéficiez de l'expertise de nos professionnels pour un accompagnement sur mesure.
      </motion.p>
    </div>
  );
};

export default ServiceHeader;
