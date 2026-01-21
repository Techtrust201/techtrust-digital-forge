import { 
  Code, 
  TrendingUp, 
  MessageSquare, 
  LineChart, 
  Users
} from 'lucide-react';

export const jobCategories = [
  {
    title: "Développeur Full Stack",
    icon: Code,
    color: "blue-600",
    description: "Rejoignez notre équipe technique pour développer nos outils IA révolutionnaires",
    requirements: "React, TypeScript, Node.js, IA/ML",
    salary: "30K - 70K€",
    types: ["Freelance", "CDI", "Stage"]
  },
  {
    title: "Growth Hacker IA",
    icon: TrendingUp,
    color: "purple-600", 
    description: "Concevez des stratégies d'acquisition avec nos outils IA propriétaires",
    requirements: "Growth hacking, automatisation, analytics",
    salary: "32K - 60K€",
    types: ["Freelance", "CDI", "Stage"]
  },
  {
    title: "Community Manager",
    icon: MessageSquare,
    color: "pink-600",
    description: "Gérez les communautés de nos clients avec nos outils d'IA",
    requirements: "Réseaux sociaux, création contenu, outils IA",
    salary: "28K - 45K€", 
    types: ["Freelance", "CDI", "Stage"]
  },
  {
    title: "Data Scientist IA",
    icon: LineChart,
    color: "green-600",
    description: "Développez nos algorithmes d'IA pour le growth hacking",
    requirements: "Python, ML, TensorFlow, Analytics",
    salary: "45K - 90K€",
    types: ["Freelance", "CDI"]
  },
  {
    title: "UX/UI Designer",
    icon: Users,
    color: "indigo-600",
    description: "Concevez des interfaces utilisateur pour nos outils IA",
    requirements: "Figma, Design System, UX Research",
    salary: "35K - 65K€",
    types: ["Freelance", "CDI", "Stage"]
  },
  {
    title: "Chef de Projet Tech",
    icon: Users,
    color: "orange-600",
    description: "Coordonnez le développement de nos solutions IA",
    requirements: "Gestion projet, méthodologies agiles",
    salary: "38K - 65K€",
    types: ["Freelance", "CDI"]
  }
];
