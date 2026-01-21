
import React from 'react';
import { TabsTrigger } from '@/components/ui/tabs';
import { Service } from '@/types/pricing';

interface ServiceTabProps {
  serviceKey: string;
  service: Service;
  isActive: boolean;
}

const ServiceTab: React.FC<ServiceTabProps> = ({ serviceKey, service, isActive }) => {
  return (
    <TabsTrigger 
      value={serviceKey}
      className={`flex flex-col items-center gap-2 text-xs lg:text-sm font-bold p-4 rounded-xl transition-all duration-500 ${
        isActive 
          ? `bg-gradient-to-br ${service.bgGradient} text-white shadow-lg transform scale-105` 
          : `hover:${service.lightBg} ${service.darkColor} hover:scale-105`
      }`}
    >
      <service.icon className={`w-6 h-6 ${isActive ? 'text-white' : `text-${service.color}-600`}`} />
      <span className={`hidden lg:inline font-bold ${isActive ? 'text-white' : ''}`}>{service.title}</span>
      <span className={`lg:hidden font-bold ${isActive ? 'text-white' : ''}`}>{service.title.split(' ')[0]}</span>
    </TabsTrigger>
  );
};

export default ServiceTab;
