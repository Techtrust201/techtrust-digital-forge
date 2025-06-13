
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TechTrust</h3>
            <p className="text-gray-400">
              Votre partenaire digital pour transformer votre business
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Création Web</a></li>
              <li><a href="#" className="hover:text-white">Growth Hacking</a></li>
              <li><a href="#" className="hover:text-white">Solutions Sur Mesure</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">À propos</a></li>
              <li><a href="#" className="hover:text-white">Équipe</a></li>
              <li><a href="#" className="hover:text-white">Carrières</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>contact@tech-trust.fr</li>
              <li>+33 X XX XX XX XX</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TechTrust. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
