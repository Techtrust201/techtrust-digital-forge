"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

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
];

const NavbarPublic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<"fr" | "en">("fr");

  // Auth state
  const { isAuthenticated, profile } = useSupabaseAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
    if (dropdownOpen === name) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(name);
    }
  };

  const changeLanguage = (language: "fr" | "en") => {
    setCurrentLanguage(language);
    // Ici, vous intégrerez plus tard la logique de changement de langue
  };

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <span
              className={`font-bold text-2xl ${
                scrolled ? "text-custom-blue" : "text-custom-blue"
              }`}
            >
              Techtrust
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Solutions Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center space-x-1 ${
                  scrolled ? "text-gray-800" : "text-gray-800"
                } hover:text-custom-blue transition-colors`}
                onClick={() => toggleDropdown("solutions")}
              >
                <span>Solutions</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                <div className="p-4 grid gap-2">
                  {solutions.map((solution) => (
                    <a
                      key={solution.name}
                      href={solution.href}
                      className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="font-medium text-gray-900">
                        {solution.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {solution.description}
                      </div>
                    </a>
                  ))}
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <a
                      href="/solutions"
                      className="flex items-center p-3 text-sm font-medium text-custom-blue hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Voir toutes nos solutions
                      <ChevronDown className="w-4 h-4 ml-1 rotate-270" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="/pricing"
              className={`${
                scrolled ? "text-gray-800" : "text-gray-800"
              } hover:text-custom-blue transition-colors`}
            >
              Tarifs
            </a>

            <a
              href="/blog"
              className={`${
                scrolled ? "text-gray-800" : "text-gray-800"
              } hover:text-custom-blue transition-colors`}
            >
              Blog
            </a>

            <a
              href="/careers"
              className={`${
                scrolled ? "text-gray-800" : "text-gray-800"
              } hover:text-custom-blue transition-colors`}
            >
              Carrières
            </a>

            <a
              href="/help"
              className={`${
                scrolled ? "text-gray-800" : "text-gray-800"
              } hover:text-custom-blue transition-colors`}
            >
              Aide
            </a>
          </div>

          {/* Right side - Contact / Sign In / Language */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              asChild
              variant="outline"
              className="border-2 border-gray-300 hover:border-custom-blue"
            >
              <a href="/contact">Nous contacter</a>
            </Button>

            {/* Bouton Connexion ou Dashboard selon l'état d'authentification */}
            {isAuthenticated ? (
              <Button
                asChild
                className="bg-custom-blue hover:bg-custom-blue/90"
              >
                <a
                  href={
                    profile?.role === "super_admin"
                      ? "/admin/dashboard"
                      : "/dashboard"
                  }
                >
                  Dashboard
                </a>
              </Button>
            ) : (
              <Button
                asChild
                className="bg-custom-blue hover:bg-custom-blue/90"
              >
                <a href="/auth">Connexion</a>
              </Button>
            )}

            {/* Language switch */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <span className="ml-1 text-sm font-medium">
                    {currentLanguage === "fr" ? "FR" : "EN"}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() => changeLanguage("fr")}
                  className="flex items-center"
                >
                  <img
                    src="/flags/fr.svg"
                    alt="Français"
                    className="w-5 h-5 mr-2"
                  />
                  <span>Français</span>
                  {currentLanguage === "fr" && (
                    <Check className="w-4 h-4 ml-auto" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => changeLanguage("en")}
                  className="flex items-center"
                >
                  <img
                    src="/flags/en.svg"
                    alt="English"
                    className="w-5 h-5 mr-2"
                  />
                  <span>English</span>
                  {currentLanguage === "en" && (
                    <Check className="w-4 h-4 ml-auto" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                      dropdownOpen === "solutions" ? "transform rotate-180" : ""
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
                        <a
                          key={solution.name}
                          href={solution.href}
                          className="block p-2 text-gray-700 hover:text-custom-blue hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div>{solution.name}</div>
                          <div className="text-xs text-gray-500">
                            {solution.description}
                          </div>
                        </a>
                      ))}
                      <a
                        href="/solutions"
                        className="flex items-center p-2 text-sm font-medium text-custom-blue hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Voir toutes nos solutions
                        <ChevronDown className="w-4 h-4 ml-1 rotate-270" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="/pricing"
                className="block p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Tarifs
              </a>

              <a
                href="/blog"
                className="block p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Blog
              </a>

              <a
                href="/careers"
                className="block p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Carrières
              </a>

              <a
                href="/help"
                className="block p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Aide
              </a>

              <div className="border-t border-gray-100 pt-4 flex flex-col space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-center"
                >
                  <a href="/contact">Nous contacter</a>
                </Button>

                {/* Bouton Connexion ou Dashboard selon l'état d'authentification */}
                {isAuthenticated ? (
                  <Button
                    asChild
                    className="w-full justify-center bg-custom-blue"
                  >
                    <a
                      href={
                        profile?.role === "super_admin"
                          ? "/admin/dashboard"
                          : "/dashboard"
                      }
                    >
                      Dashboard
                    </a>
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="w-full justify-center bg-custom-blue"
                  >
                    <a href="/auth">Connexion</a>
                  </Button>
                )}

                <div className="flex justify-center gap-4 pt-2">
                  <button
                    className={`p-2 rounded-full transition-colors flex items-center ${
                      currentLanguage === "fr" ? "bg-gray-100" : ""
                    }`}
                    onClick={() => changeLanguage("fr")}
                  >
                    <img
                      src="/flags/fr.svg"
                      alt="Français"
                      className="w-5 h-5"
                    />
                    <span className="ml-1 text-sm font-medium">FR</span>
                  </button>
                  <button
                    className={`p-2 rounded-full transition-colors flex items-center ${
                      currentLanguage === "en" ? "bg-gray-100" : ""
                    }`}
                    onClick={() => changeLanguage("en")}
                  >
                    <img
                      src="/flags/en.svg"
                      alt="English"
                      className="w-5 h-5"
                    />
                    <span className="ml-1 text-sm font-medium">EN</span>
                  </button>
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
