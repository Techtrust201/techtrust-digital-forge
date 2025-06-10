
import React from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Création Site Web", href: "/solutions/agence-web" },
    { name: "Growth Hacking", href: "/solutions/growth-hacking" },
    { name: "Solutions Sur Mesure", href: "/solutions/digitales-sur-mesure" },
    { name: "Community Management", href: "/solutions/community-management" },
  ];

  const company = [
    { name: "À propos", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Carrières", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  const legal = [
    { name: "Mentions légales", href: "/legal-mentions" },
    { name: "Politique de confidentialité", href: "/privacy-policy" },
    { name: "Conditions d'utilisation", href: "/terms" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-custom-blue to-custom-purple rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold">Techtrust</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Agence digitale française spécialisée en création de sites web, growth hacking et solutions sur mesure.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-3 text-custom-blue" />
                <span>contact@tech-trust.fr</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3 text-custom-blue" />
                <span>+33 X XX XX XX XX</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-3 text-custom-blue" />
                <span>France</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos Solutions</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.href}
                    className="text-gray-400 hover:text-custom-blue transition-colors"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-gray-400 hover:text-custom-blue transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal et Réseaux */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Légal</h3>
            <ul className="space-y-2 mb-6">
              {legal.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-gray-400 hover:text-custom-blue transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Réseaux sociaux */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-300">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/techtrust_agency" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-custom-purple transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com/company/techtrust-agency" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-custom-blue transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://youtube.com/channel/UCX_vW6ah0txEFeMAMr3Si7A" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Techtrust. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-xs mt-2 md:mt-0">
              Fait avec ❤️ en France
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
