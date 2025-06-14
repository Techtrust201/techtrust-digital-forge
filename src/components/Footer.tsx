
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-[#45C7FF] mb-4">Techtrust</h3>
            <p className="text-gray-300 mb-4">
              Agence digitale française spécialisée en création de sites web, growth hacking et solutions digitales sur mesure.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li><a href="/solutions/agence-web" className="text-gray-300 hover:text-white">Création Site Web</a></li>
              <li><a href="/solutions/growth-hacking" className="text-gray-300 hover:text-white">Growth Hacking</a></li>
              <li><a href="/solutions/digitales-sur-mesure" className="text-gray-300 hover:text-white">Solutions Sur Mesure</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><a href="/contact" className="text-gray-300 hover:text-white">Nous contacter</a></li>
              <li><a href="/pricing" className="text-gray-300 hover:text-white">Tarifs</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-white">Blog</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2025 Techtrust. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
