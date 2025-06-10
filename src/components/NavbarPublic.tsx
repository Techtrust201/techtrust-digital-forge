
"use client"

import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavbarPublic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const services = [
    { name: "Agence Web", href: "/solutions/agence-web", description: "Sites professionnels & E-commerce" },
    { name: "Growth Hacking", href: "/solutions/growth-hacking", description: "Acquisition & Lead Generation" },
    { name: "Solutions Sur Mesure", href: "/solutions/digitales-sur-mesure", description: "Développement personnalisé" },
    { name: "Community Management", href: "/solutions/community-management", description: "Gestion réseaux sociaux" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-custom-blue to-custom-purple rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Techtrust</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Services Dropdown */}
              <div className="relative group">
                <button
                  className="text-gray-700 hover:text-custom-blue px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  Solutions
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {/* Dropdown Menu */}
                <div
                  className={`absolute left-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                    isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="py-1">
                    {services.map((service) => (
                      <a
                        key={service.name}
                        href={service.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-custom-blue"
                      >
                        <div className="font-medium">{service.name}</div>
                        <div className="text-xs text-gray-500">{service.description}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <a href="/pricing" className="text-gray-700 hover:text-custom-blue px-3 py-2 rounded-md text-sm font-medium">
                Tarifs
              </a>
              <a href="/blog" className="text-gray-700 hover:text-custom-blue px-3 py-2 rounded-md text-sm font-medium">
                Blog
              </a>
              <a href="/contact" className="text-gray-700 hover:text-custom-blue px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild className="bg-gradient-to-r from-custom-blue to-custom-purple text-white">
              <a href="/contact">
                Démarrer mon projet
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-custom-blue hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <div className="space-y-1">
              <div className="text-gray-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide">
                Solutions
              </div>
              {services.map((service) => (
                <a
                  key={service.name}
                  href={service.href}
                  className="block px-3 py-2 text-sm text-gray-700 hover:text-custom-blue hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  {service.name}
                </a>
              ))}
            </div>
            <a
              href="/pricing"
              className="block px-3 py-2 text-sm text-gray-700 hover:text-custom-blue hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Tarifs
            </a>
            <a
              href="/blog"
              className="block px-3 py-2 text-sm text-gray-700 hover:text-custom-blue hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 text-sm text-gray-700 hover:text-custom-blue hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <div className="px-3 py-2">
              <Button asChild className="w-full bg-gradient-to-r from-custom-blue to-custom-purple text-white">
                <a href="/contact" onClick={() => setIsOpen(false)}>
                  Démarrer mon projet
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarPublic;
