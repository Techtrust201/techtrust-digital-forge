
import { HomeIcon, Briefcase, Phone, Users, HelpCircle, Calculator, FileText, Shield, Gavel, Building2 } from "lucide-react";
import Index from "./pages/Index.tsx";
import Solutions from "./pages/Solutions.tsx";
import Contact from "./pages/Contact.tsx";
import Blog from "./pages/Blog.tsx";
import Help from "./pages/Help.tsx";
import Pricing from "./pages/Pricing.tsx";
import LegalMentions from "./pages/LegalMentions.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Terms from "./pages/Terms.tsx";
import Careers from "./pages/Careers.tsx";

export const navItems = [
  {
    title: "Accueil",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Solutions",
    to: "/solutions",
    icon: <Briefcase className="h-4 w-4" />,
    page: <Solutions />,
  },
  {
    title: "Contact",
    to: "/contact",
    icon: <Phone className="h-4 w-4" />,
    page: <Contact />,
  },
  {
    title: "Blog",
    to: "/blog",
    icon: <FileText className="h-4 w-4" />,
    page: <Blog />,
  },
  {
    title: "Aide",
    to: "/help",
    icon: <HelpCircle className="h-4 w-4" />,
    page: <Help />,
  },
  {
    title: "Tarifs",
    to: "/pricing",
    icon: <Calculator className="h-4 w-4" />,
    page: <Pricing />,
  },
  {
    title: "Mentions Légales",
    to: "/legal-mentions",
    icon: <Gavel className="h-4 w-4" />,
    page: <LegalMentions />,
  },
  {
    title: "Politique de Confidentialité",
    to: "/privacy-policy",
    icon: <Shield className="h-4 w-4" />,
    page: <PrivacyPolicy />,
  },
  {
    title: "Conditions d'Utilisation",
    to: "/terms",
    icon: <FileText className="h-4 w-4" />,
    page: <Terms />,
  },
  {
    title: "Carrières",
    to: "/careers",
    icon: <Building2 className="h-4 w-4" />,
    page: <Careers />,
  },
];
