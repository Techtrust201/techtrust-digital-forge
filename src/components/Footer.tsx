
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Techtrust</h3>
            <p className="text-gray-300 mb-4">
              Agence digitale française spécialisée en création de sites web, 
              growth hacking et solutions digitales sur mesure.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li><Link href="/solutions/agence-web" className="text-gray-300 hover:text-white">Sites Web</Link></li>
              <li><Link href="/solutions/growth-hacking" className="text-gray-300 hover:text-white">Growth Hacking</Link></li>
              <li><Link href="/solutions/community-management" className="text-gray-300 hover:text-white">Community Management</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link href="/careers" className="text-gray-300 hover:text-white">Carrières</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2025 Techtrust. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
