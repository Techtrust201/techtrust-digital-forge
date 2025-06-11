
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
  link: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  subtitle,
  description,
  features,
  color,
  link,
  index
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white relative overflow-hidden h-full flex flex-col">
        <div 
          className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
          style={{ backgroundColor: `${color}10` }}
        />
        
        <CardContent className="p-8 relative z-10 flex flex-col h-full">
          {/* Icône */}
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" 
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-8 h-8" style={{ color }} />
          </div>

          {/* Contenu */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-[#374151] mb-2">{title}</h3>
            <p className="font-medium mb-4 text-sm" style={{ color }}>{subtitle}</p>
            <p className="text-[#374151] mb-6 leading-relaxed flex-1">{description}</p>

            {/* Features */}
            <ul className="space-y-3 mb-6">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-sm text-[#374151]">
                  <Check className="w-4 h-4 mr-2 flex-shrink-0" style={{ color }} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-auto">
            <Button 
              asChild
              className="w-full text-white group/btn transition-all duration-300"
              style={{ backgroundColor: color }}
            >
              <a href={link}>
                En savoir plus
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
