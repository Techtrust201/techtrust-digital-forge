
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const NavbarPublic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, profile, signOut, isLoading } = useSupabaseAuth();

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Tarifs', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const getUserInitials = () => {
    if (profile?.name) {
      return profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-red-600">Techtrust</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <Button asChild variant="outline">
                      <Link to="/dashboard">Dashboard</Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-red-100 text-red-600 text-sm">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="px-3 py-2">
                          <p className="text-sm font-medium">
                            {profile?.name || user?.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            {profile?.company || 'Client Techtrust'}
                          </p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/dashboard">
                            <User className="mr-2 h-4 w-4" />
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/dashboard/account">
                            <User className="mr-2 h-4 w-4" />
                            Mon profil
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                          <LogOut className="mr-2 h-4 w-4" />
                          Se déconnecter
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Button asChild variant="outline">
                      <Link to="/auth">Connexion</Link>
                    </Button>
                    <Button asChild className="bg-red-600 hover:bg-red-700">
                      <Link to="/auth">Démarrer gratuitement</Link>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded="false"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            <div className="border-t pt-4 mt-4">
              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="px-3 py-2">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarFallback className="bg-red-100 text-red-600 text-sm">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {profile?.name || user?.email}
                            </p>
                            <p className="text-xs text-gray-500">
                              {profile?.company || 'Client Techtrust'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                      >
                        Se déconnecter
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/auth"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
                      >
                        Connexion
                      </Link>
                      <Link
                        to="/auth"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 text-base font-medium bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Démarrer gratuitement
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarPublic;
