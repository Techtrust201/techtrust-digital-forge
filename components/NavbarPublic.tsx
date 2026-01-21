"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const solutions = [
  {
    name: "Agence Web",
    href: "/solutions/agence-web",
    description:
      "Création de sites web professionnels, e-commerce et applications web",
  },
  {
    name: "Growth Hacking",
    href: "/solutions/growth-hacking",
    description: "Stratégies de croissance et acquisition clients via l'IA",
  },
  {
    name: "Solutions Sur Mesure",
    href: "/solutions/digitales-sur-mesure",
    description: "Développement logiciel personnalisé pour votre entreprise",
  },
  {
    name: "Community Management",
    href: "/solutions/community-management",
    description: "Gestion professionnelle de vos réseaux sociaux",
  },
  {
    name: "Consulting Digital",
    href: "/solutions/consulting-digital",
    description: "Conseil et stratégie pour votre transformation numérique",
  },
  {
    name: "SEO & Référencement",
    href: "/solutions/seo-referencement",
    description: "Optimisation pour les moteurs de recherche",
  },
];

const NavbarPublic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) || 'fr';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled
      ? "bg-white/95 backdrop-blur-md shadow-md py-2"
      : "bg-transparent py-4"
  }`;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (dropdownOpen) setDropdownOpen(null);
  };

  const toggleDropdown = (name: string) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={localizedHref('/')} className="flex items-center space-x-3">
            <span className="font-bold text-2xl text-custom-blue">
              Techtrust
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Solutions Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-800 hover:text-custom-blue transition-colors"
                onClick={() => toggleDropdown("solutions")}
              >
                <span>Solutions</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                <div className="p-4 grid gap-2">
                  {solutions.map((solution) => (
                    <Link
                      key={solution.name}
                      href={localizedHref(solution.href)}
                      className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="font-medium text-gray-900">
                        {solution.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {solution.description}
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <Link
                      href={localizedHref('/solutions')}
                      className="flex items-center p-3 text-sm font-medium text-custom-blue hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Voir toutes nos solutions
                      <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href={localizedHref('/pricing')}
              className="text-gray-800 hover:text-custom-blue transition-colors"
            >
              Tarifs
            </Link>

            <Link
              href={localizedHref('/blog')}
              className="text-gray-800 hover:text-custom-blue transition-colors"
            >
              Blog
            </Link>

            <Link
              href={localizedHref('/careers')}
              className="text-gray-800 hover:text-custom-blue transition-colors"
            >
              Carrières
            </Link>

            <Link
              href={localizedHref('/help')}
              className="text-gray-800 hover:text-custom-blue transition-colors"
            >
              Aide
            </Link>
          </div>

          {/* Right side - Contact / Sign In / Language */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              asChild
              variant="outline"
              className="border-2 border-gray-300 hover:border-custom-blue"
            >
              <Link href={localizedHref('/contact')}>Nous contacter</Link>
            </Button>

            <Button
              asChild
              className="bg-custom-blue hover:bg-custom-blue/90"
            >
              <Link href="/dashboard/auth">Connexion</Link>
            </Button>

            {/* Language switch */}
            <div className="flex items-center space-x-2">
              <Link
                href={switchLocale('fr')}
                className={`p-2 rounded-full transition-colors flex items-center ${
                  locale === 'fr' ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-sm font-medium">FR</span>
              </Link>
              <Link
                href={switchLocale('en')}
                className={`p-2 rounded-full transition-colors flex items-center ${
                  locale === 'en' ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-sm font-medium">EN</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div>
                <button
                  onClick={() => toggleDropdown("solutions")}
                  className="flex items-center justify-between w-full p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      dropdownOpen === "solutions" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen === "solutions" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 ml-4 space-y-2"
                    >
                      {solutions.map((solution) => (
                        <Link
                          key={solution.name}
                          href={localizedHref(solution.href)}
                          className="block p-2 text-gray-700 hover:text-custom-blue hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div>{solution.name}</div>
                          <div className="text-xs text-gray-500">
                            {solution.description}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href={localizedHref('/pricing')}
                className="block p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Tarifs
              </Link>

              <Link
                href={localizedHref('/blog')}
                className="block p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Blog
              </Link>

              <Link
                href={localizedHref('/careers')}
                className="block p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Carrières
              </Link>

              <Link
                href={localizedHref('/help')}
                className="block p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Aide
              </Link>

              <div className="border-t border-gray-100 pt-4 flex flex-col space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-center"
                >
                  <Link href={localizedHref('/contact')}>Nous contacter</Link>
                </Button>

                <Button
                  asChild
                  className="w-full justify-center bg-custom-blue"
                >
                  <Link href="/dashboard/auth">Connexion</Link>
                </Button>

                <div className="flex justify-center gap-4 pt-2">
                  <Link
                    href={switchLocale('fr')}
                    className={`p-2 rounded-full transition-colors flex items-center ${
                      locale === 'fr' ? 'bg-gray-100' : ''
                    }`}
                  >
                    <span className="text-sm font-medium">FR</span>
                  </Link>
                  <Link
                    href={switchLocale('en')}
                    className={`p-2 rounded-full transition-colors flex items-center ${
                      locale === 'en' ? 'bg-gray-100' : ''
                    }`}
                  >
                    <span className="text-sm font-medium">EN</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavbarPublic;
