import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut } from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

interface NavbarPublicProps {
  // Add any props here
}

const NavbarPublic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isAdmin, signOut } = useSupabaseAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-red-600">
              Techtrust
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/solutions" className="text-gray-700 hover:text-red-600 transition-colors">
              Solutions
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-red-600 transition-colors">
              Tarifs
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-red-600 transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-red-600 transition-colors">
              Contact
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-red-600 transition-colors"
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link 
                    to="/super-admin" 
                    className="text-purple-600 hover:text-purple-700 transition-colors font-medium"
                  >
                    Super Admin
                  </Link>
                )}
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth" className="text-gray-700 hover:text-red-600 transition-colors">
                  Connexion
                </Link>
                <Link to="/auth">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    Essai Gratuit
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-red-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/solutions"
              className="block px-3 py-2 text-gray-700 hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              Solutions
            </Link>
            <Link
              to="/pricing"
              className="block px-3 py-2 text-gray-700 hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              Tarifs
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 text-gray-700 hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-700 hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:text-red-600"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    to="/super-admin"
                    className="block px-3 py-2 text-purple-600 hover:text-purple-700 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Super Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="block px-3 py-2 text-gray-700 hover:text-red-600"
                  onClick={() => setIsOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  to="/auth"
                  className="block px-3 py-2 text-red-600 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Essai Gratuit
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarPublic;
