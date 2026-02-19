export interface CityData {
  slug: string;
  name: string;
  region: string;
  population: string;
  description: string;
  specificAdvantages: string[];
}

export const cities: CityData[] = [
  {
    slug: 'paris',
    name: 'Paris',
    region: 'Île-de-France',
    population: '2,1 millions',
    description: "Capitale de la France et centre névralgique du business digital, Paris concentre les plus grandes entreprises et startups du pays. Notre agence web à Paris accompagne les entreprises parisiennes dans leur transformation digitale avec une expertise locale inégalée.",
    specificAdvantages: [
      "Connaissance approfondie du marché parisien",
      "Réseau de partenaires locaux en Île-de-France",
      "Référencement local Google My Business Paris optimisé",
      "Expertise des secteurs d'activité prédominants à Paris"
    ]
  },
  {
    slug: 'lyon',
    name: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    population: '520 000',
    description: "Deuxième hub tech de France, Lyon est un pôle d'innovation majeur. Notre agence web à Lyon aide les entreprises lyonnaises à se démarquer en ligne grâce à des solutions digitales performantes et un référencement local ciblé.",
    specificAdvantages: [
      "Expertise du tissu économique lyonnais",
      "Optimisation pour les recherches locales Lyon et Rhône-Alpes",
      "Connaissance des événements tech lyonnais",
      "Partenariats avec l'écosystème startup de Lyon"
    ]
  },
  {
    slug: 'marseille',
    name: 'Marseille',
    region: 'Provence-Alpes-Côte d\'Azur',
    population: '870 000',
    description: "Marseille, ville dynamique et en pleine transformation digitale, regorge d'opportunités pour les entreprises. Notre agence web à Marseille vous aide à conquérir le marché local et à développer votre visibilité en ligne dans toute la région PACA.",
    specificAdvantages: [
      "Connaissance du marché méditerranéen",
      "Référencement local PACA et Bouches-du-Rhône",
      "Expertise e-commerce touristique et restauration",
      "Réseau de professionnels locaux à Marseille"
    ]
  },
  {
    slug: 'toulouse',
    name: 'Toulouse',
    region: 'Occitanie',
    population: '490 000',
    description: "Toulouse, capitale de l'aéronautique et ville d'innovation, accueille un écosystème tech florissant. Notre agence web à Toulouse accompagne les entreprises toulousaines avec des solutions digitales de pointe adaptées au marché local.",
    specificAdvantages: [
      "Expertise des secteurs aéronautique et spatial",
      "Optimisation pour les recherches locales Occitanie",
      "Connaissance de l'écosystème startup toulousain",
      "Partenariats avec les pôles de compétitivité locaux"
    ]
  },
  {
    slug: 'bordeaux',
    name: 'Bordeaux',
    region: 'Nouvelle-Aquitaine',
    population: '260 000',
    description: "Bordeaux, ville attractive et en pleine croissance digitale, séduit de plus en plus d'entreprises tech. Notre agence web à Bordeaux vous accompagne dans votre développement numérique avec une approche locale et personnalisée.",
    specificAdvantages: [
      "Expertise du marché bordelais et gironde",
      "Référencement local Nouvelle-Aquitaine",
      "Connaissance des secteurs vin, tourisme et tech",
      "Réseau d'entrepreneurs locaux à Bordeaux"
    ]
  },
  {
    slug: 'lille',
    name: 'Lille',
    region: 'Hauts-de-France',
    population: '235 000',
    description: "Lille, métropole dynamique aux portes de l'Europe, est un carrefour économique majeur. Notre agence web à Lille accompagne les entreprises des Hauts-de-France dans leur digitalisation avec une expertise transfrontalière unique.",
    specificAdvantages: [
      "Position stratégique Europe du Nord",
      "Référencement local Hauts-de-France et Belgique",
      "Connaissance du tissu industriel et commercial lillois",
      "Expertise e-commerce transfrontalier"
    ]
  },
  {
    slug: 'nantes',
    name: 'Nantes',
    region: 'Pays de la Loire',
    population: '320 000',
    description: "Nantes, élue ville la plus attractive de France, est un pôle numérique en plein essor. Notre agence web à Nantes aide les entreprises nantaises à rayonner sur le web avec des solutions digitales innovantes.",
    specificAdvantages: [
      "Connaissance de l'écosystème numérique nantais",
      "Optimisation pour les recherches locales Pays de la Loire",
      "Expertise des secteurs naval, agroalimentaire et tech",
      "Partenariats avec La Cantine numérique et Web2Day"
    ]
  },
  {
    slug: 'strasbourg',
    name: 'Strasbourg',
    region: 'Grand Est',
    population: '285 000',
    description: "Strasbourg, capitale européenne et ville d'innovation, offre un marché unique entre France et Allemagne. Notre agence web à Strasbourg vous aide à conquérir les marchés français et germanophone avec une expertise bilingue.",
    specificAdvantages: [
      "Expertise bilingue français-allemand",
      "Référencement local Grand Est et Alsace",
      "Connaissance du marché transfrontalier franco-allemand",
      "Positionnement institutionnel européen"
    ]
  },
  {
    slug: 'nice',
    name: 'Nice',
    region: "Provence-Alpes-Côte d'Azur",
    population: '340 000',
    description: "Nice, joyau de la Côte d'Azur et pôle technologique en plein essor, attire de plus en plus d'entreprises innovantes. Notre agence web à Nice accompagne les entreprises azuréennes avec des solutions digitales performantes, du tourisme de luxe aux startups tech.",
    specificAdvantages: [
      "Expertise du marché touristique Côte d'Azur",
      "Référencement local PACA et Alpes-Maritimes",
      "Connaissance du marché immobilier et hôtelier niçois",
      "Partenariats avec l'écosystème French Tech Côte d'Azur"
    ]
  },
  {
    slug: 'rennes',
    name: 'Rennes',
    region: 'Bretagne',
    population: '220 000',
    description: "Rennes, capitale bretonne et ville universitaire dynamique, est reconnue pour son écosystème numérique et ses pôles de recherche. Notre agence web à Rennes aide les entreprises bretonnes à se digitaliser avec des solutions innovantes.",
    specificAdvantages: [
      "Connaissance de l'écosystème numérique breton",
      "Référencement local Bretagne et Ille-et-Vilaine",
      "Expertise des secteurs agroalimentaire et cybersécurité",
      "Partenariats avec Rennes Atalante et Digital Bretagne"
    ]
  },
  {
    slug: 'montpellier',
    name: 'Montpellier',
    region: 'Occitanie',
    population: '295 000',
    description: "Montpellier, ville la plus dynamique du sud de la France avec une croissance démographique record, concentre un écosystème tech florissant. Notre agence web à Montpellier accompagne les entreprises héraultaises dans leur transformation digitale.",
    specificAdvantages: [
      "Expertise du marché méditerranéen et touristique",
      "Référencement local Occitanie et Hérault",
      "Connaissance des secteurs santé, biotech et jeux vidéo",
      "Partenariats avec le BIC de Montpellier et French Tech"
    ]
  },
  {
    slug: 'grenoble',
    name: 'Grenoble',
    region: 'Auvergne-Rhône-Alpes',
    population: '160 000',
    description: "Grenoble, capitale des Alpes et berceau de l'innovation technologique française, abrite des centres de recherche de renommée mondiale. Notre agence web à Grenoble accompagne les entreprises iséroises avec une expertise technique de pointe.",
    specificAdvantages: [
      "Expertise des secteurs deeptech et microélectronique",
      "Référencement local Auvergne-Rhône-Alpes et Isère",
      "Connaissance de l'écosystème CEA, CNRS et startups grenobloises",
      "Expertise e-commerce sport et montagne"
    ]
  },
  {
    slug: 'rouen',
    name: 'Rouen',
    region: 'Normandie',
    population: '115 000',
    description: "Rouen, capitale de la Normandie et ville d'histoire, est un pôle économique majeur du Grand Ouest. Notre agence web à Rouen aide les entreprises normandes à développer leur présence en ligne avec des solutions digitales modernes.",
    specificAdvantages: [
      "Expertise du tissu économique normand",
      "Référencement local Normandie et Seine-Maritime",
      "Connaissance des secteurs logistique, portuaire et agroalimentaire",
      "Proximité Paris-Rouen pour les projets bi-sites"
    ]
  },
  {
    slug: 'toulon',
    name: 'Toulon',
    region: "Provence-Alpes-Côte d'Azur",
    population: '180 000',
    description: "Toulon, ville méditerranéenne en pleine renaissance digitale, offre un potentiel économique croissant. Notre agence web à Toulon accompagne les entreprises varoise dans leur digitalisation avec des solutions performantes adaptées au marché local.",
    specificAdvantages: [
      "Expertise du marché naval et défense",
      "Référencement local Var et PACA",
      "Connaissance du secteur touristique méditerranéen",
      "Expertise e-commerce pour les commerces de centre-ville"
    ]
  },
  {
    slug: 'dijon',
    name: 'Dijon',
    region: 'Bourgogne-Franche-Comté',
    population: '160 000',
    description: "Dijon, capitale de la Bourgogne et ville French Tech, combine patrimoine gastronomique mondial et innovation numérique. Notre agence web à Dijon accompagne les entreprises bourguignonnes dans leur croissance digitale.",
    specificAdvantages: [
      "Expertise des secteurs viticole et gastronomique",
      "Référencement local Bourgogne-Franche-Comté et Côte-d'Or",
      "Connaissance de l'écosystème French Tech Dijon",
      "Expertise e-commerce vin et produits du terroir"
    ]
  },
  {
    slug: 'angers',
    name: 'Angers',
    region: 'Pays de la Loire',
    population: '155 000',
    description: "Angers, ville la plus verte de France et pôle d'excellence en électronique et végétal, attire de plus en plus d'entrepreneurs innovants. Notre agence web à Angers accompagne les entreprises angevines dans leur développement numérique.",
    specificAdvantages: [
      "Expertise des secteurs végétal, santé et électronique",
      "Référencement local Pays de la Loire et Maine-et-Loire",
      "Connaissance de l'écosystème Angers French Tech et Le Village by CA",
      "Expertise IoT et objets connectés"
    ]
  },
  {
    slug: 'mougins',
    name: 'Mougins',
    region: "Provence-Alpes-Côte d'Azur",
    population: '19 000',
    description: "Mougins, village d'art et de gastronomie niché au cœur des Alpes-Maritimes, est le siège de l'agence Techtrust. Située à 5 minutes de Cannes et 25 minutes de Nice, notre agence web à Mougins offre un accompagnement digital de proximité à toutes les entreprises de la Côte d'Azur. Expertise locale, réactivité et connaissance parfaite du tissu économique mouginois et cannois.",
    specificAdvantages: [
      "Siège de Techtrust — accompagnement de proximité immédiat",
      "Connaissance parfaite du marché Mougins-Cannes-Grasse",
      "Référencement local Alpes-Maritimes et Côte d'Azur",
      "Expertise des secteurs gastronomie, luxe, art et tourisme haut de gamme"
    ]
  },
  {
    slug: 'cannes',
    name: 'Cannes',
    region: "Provence-Alpes-Côte d'Azur",
    population: '75 000',
    description: "Cannes, ville mondialement célèbre pour son festival et ses événements internationaux, est un pôle économique majeur de la Côte d'Azur. Notre agence web à Cannes, située à seulement 5 minutes (Mougins), accompagne les entreprises cannoises dans leur transformation digitale : hôtellerie de luxe, événementiel, immobilier, commerce et services. Expertise locale et réactivité garantie.",
    specificAdvantages: [
      "À 5 minutes de notre siège à Mougins — réunions en personne faciles",
      "Expertise du marché événementiel, hôtelier et immobilier cannois",
      "Référencement local Cannes et Côte d'Azur",
      "Connaissance du tissu économique de la Croisette au Suquet"
    ]
  },
  {
    slug: 'antibes',
    name: 'Antibes',
    region: "Provence-Alpes-Côte d'Azur",
    population: '73 000',
    description: "Antibes et Sophia Antipolis forment le premier technopôle d'Europe, regroupant plus de 2 500 entreprises innovantes. Notre agence web à Antibes, basée à proximité à Mougins (15 min), accompagne les startups et entreprises tech de Sophia Antipolis ainsi que les commerces et acteurs touristiques du vieil Antibes et Juan-les-Pins.",
    specificAdvantages: [
      "Proximité immédiate avec Sophia Antipolis, 1er technopôle européen",
      "Expertise des secteurs tech, IoT, telecom et biotech",
      "Référencement local Antibes, Juan-les-Pins et Sophia Antipolis",
      "Connaissance du marché nautique et touristique antibois"
    ]
  },
  {
    slug: 'grasse',
    name: 'Grasse',
    region: "Provence-Alpes-Côte d'Azur",
    population: '51 000',
    description: "Grasse, capitale mondiale de la parfumerie et patrimoine UNESCO, est une ville en pleine mutation digitale. Notre agence web à Grasse, située à 10 minutes (Mougins), aide les parfumeries, artisans et entreprises grassoises à développer leur présence en ligne et leur e-commerce avec des solutions digitales haut de gamme.",
    specificAdvantages: [
      "À 10 minutes de notre siège à Mougins — interventions rapides",
      "Expertise du secteur parfumerie, cosmétique et artisanat de luxe",
      "Référencement local Grasse et Pays de Grasse",
      "Connaissance du marché touristique et patrimonial grassois"
    ]
  },
  {
    slug: 'aix-en-provence',
    name: 'Aix-en-Provence',
    region: "Provence-Alpes-Côte d'Azur",
    population: '145 000',
    description: "Aix-en-Provence, ville d'art et de culture au cœur de la Provence, est un pôle économique dynamique avec un tissu d'entreprises diversifié. Notre agence web à Aix-en-Provence accompagne les entrepreneurs aixois, des cabinets d'avocats aux commerces de la Rotonde, avec des solutions digitales sur mesure et un référencement local performant.",
    specificAdvantages: [
      "Connaissance approfondie du marché aixois et provençal",
      "Expertise des secteurs juridique, culturel et thermal",
      "Référencement local Aix-en-Provence et Bouches-du-Rhône",
      "Partenariats avec l'écosystème startup du Pays d'Aix"
    ]
  }
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find(city => city.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map(city => city.slug);
}
