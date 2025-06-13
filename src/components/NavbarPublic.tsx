
import React from 'react';
import { Button } from '@/components/ui/button';

const NavbarPublic = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">TechTrust</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-blue-600">Services</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">À propos</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Se connecter
            </Button>
            <Button size="sm">
              Commencer
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarPublic;
