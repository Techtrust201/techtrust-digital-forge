
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Techtrust</h3>
            <p className="text-gray-300 mb-6">
              Agence digitale française spécialisée en création de sites web, growth hacking et solutions digitales sur mesure pour booster votre croissance.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/techtrustagency" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/techtrust_agency" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/techtrust_agency" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/techtrust-agency" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/channel/UCX_vW6ah0txEFeMAMr3Si7A" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Nos Solutions</h3>
            <ul className="space-y-3">
              <li>
                <a href="/solutions/agence-web" className="text-gray-400 hover:text-custom-blue transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Création Site Web
                </a>
              </li>
              <li>
                <a href="/solutions/growth-hacking" className="text-gray-400 hover:text-custom-blue transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Growth Hacking
                </a>
              </li>
              <li>
                <a href="/solutions/digitales-sur-mesure" className="text-gray-400 hover:text-custom-blue transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Développement Sur Mesure
                </a>
              </li>
              <li>
                <a href="/solutions/community-management" className="text-gray-400 hover:text-custom-blue transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Community Management
                </a>
              </li>
              <li>
                <a href="/solutions/consulting-digital" className="text-gray-400 hover:text-custom-blue transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Consulting Digital
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Ressources</h3>
            <ul className="space-y-3">
              <li>
                <a href="/blog" className="text-gray-400 hover:text-custom-blue transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Blog & Actualités
                </a>
              </li>
              <li>
                <a href="/help" className="text-gray-400 hover:text-custom-blue transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Centre d'aide
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-gray-400 hover:text-custom-blue transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Tarifs & Plans
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-custom-blue transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Nous contacter
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-custom-blue transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Demander un devis
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-custom-blue mr-3 mt-1" />
                <a href="mailto:contact@tech-trust.fr" className="text-gray-400 hover:text-white transition-colors">contact@tech-trust.fr</a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-custom-blue mr-3 mt-1" />
                <a href="tel:+33XXXXXXXXXX" className="text-gray-400 hover:text-white transition-colors">+33 X XX XX XX XX</a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-custom-blue mr-3 mt-1" />
                <span className="text-gray-400">France</span>
              </li>
            </ul>

            <div className="mt-6">
              <a 
                href="/contact" 
                className="bg-custom-blue hover:bg-custom-blue/90 text-white px-6 py-3 rounded-lg inline-flex items-center transition-colors"
              >
                Contactez-nous
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* SEO Footer Links */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <h4 className="text-lg font-semibold mb-4 text-white">Nos expertises</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
            <a href="/solutions/agence-web" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">Création site internet</a>
            <a href="/solutions/agence-web" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">Site e-commerce</a>
            <a href="/solutions/agence-web" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">Site vitrine professionnel</a>
            <a href="/solutions/agence-web" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">Refonte site web</a>
            <a href="/solutions/growth-hacking" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">Growth hacking</a>
            <a href="/solutions/growth-hacking" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">Acquisition clients</a>
            <a href="/solutions/growth-hacking" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">Lead generation</a>
            <a href="/solutions/growth-hacking" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">Marketing automation</a>
            <a href="/solutions/digitales-sur-mesure" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">Logiciel sur mesure</a>
            <a href="/solutions/digitales-sur-mesure" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">Développement application</a>
            <a href="/solutions/digitales-sur-mesure" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">CRM personnalisé</a>
            <a href="/solutions/digitales-sur-mesure" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">Intégration API</a>
            <a href="/solutions/community-management" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">Community management</a>
            <a href="/solutions/community-management" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">Gestion réseaux sociaux</a>
            <a href="/solutions/community-management" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">Création de contenu</a>
            <a href="/solutions/consulting-digital" className="text-gray-400 hover:text-custom-blue text-sm transition-colors">Transformation digitale</a>
          </div>
        </div>

        {/* Partner References */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h4 className="text-lg font-semibold mb-4 text-white">Ils nous font confiance</h4>
          <div className="flex flex-wrap items-center gap-8">
            <span className="text-gray-400 text-sm">Palais des Festivals de Cannes</span>
            <span className="text-gray-400 text-sm">Groupe Chopard</span>
            <span className="text-gray-400 text-sm">Christina France</span>
            <span className="text-gray-400 text-sm">Monaco Business</span>
            <span className="text-gray-400 text-sm">Luxury Hotels Group</span>
            <span className="text-gray-400 text-sm">French Tech Riviera</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Techtrust. Tous droits réservés.
            </div>
            <div className="flex space-x-6">
              <a href="/legal-mentions" className="text-gray-400 hover:text-white text-sm transition-colors">Mentions légales</a>
              <a href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Politique de confidentialité</a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
