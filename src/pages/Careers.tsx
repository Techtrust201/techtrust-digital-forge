
import React, { useState } from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  TrendingUp, 
  MessageSquare, 
  LineChart, 
  Download, 
  ArrowRight, 
  Users,
  CheckCircle,
  Upload,
  X
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const jobCategories = [
  {
    title: "Développeur Full Stack",
    icon: Code,
    color: "blue-600",
    description: "Rejoignez notre équipe technique pour développer nos outils IA révolutionnaires",
    requirements: "React, TypeScript, Node.js, IA/ML",
    salary: "45K - 65K€",
    types: ["CDI", "Freelance"]
  },
  {
    title: "Growth Hacker IA",
    icon: TrendingUp,
    color: "purple-600", 
    description: "Concevez des stratégies d'acquisition avec nos outils IA propriétaires",
    requirements: "Growth hacking, automatisation, analytics",
    salary: "40K - 60K€",
    types: ["CDI", "Freelance"]
  },
  {
    title: "Community Manager",
    icon: MessageSquare,
    color: "pink-600",
    description: "Gérez les communautés de nos clients avec nos outils d'IA",
    requirements: "Réseaux sociaux, création contenu, outils IA",
    salary: "35K - 45K€", 
    types: ["CDI", "Stage", "Freelance"]
  },
  {
    title: "Data Scientist IA",
    icon: LineChart,
    color: "green-600",
    description: "Développez nos algorithmes d'IA pour le growth hacking",
    requirements: "Python, ML, TensorFlow, Analytics",
    salary: "50K - 70K€",
    types: ["CDI", "Freelance"]
  },
  {
    title: "UX/UI Designer",
    icon: Users,
    color: "indigo-600",
    description: "Concevez des interfaces utilisateur pour nos outils IA",
    requirements: "Figma, Design System, UX Research",
    salary: "40K - 55K€",
    types: ["CDI", "Freelance"]
  },
  {
    title: "Chef de Projet Tech",
    icon: Users,
    color: "orange-600",
    description: "Coordonnez le développement de nos solutions IA",
    requirements: "Gestion projet, méthodologies agiles",
    salary: "45K - 60K€",
    types: ["CDI", "Freelance"]
  }
];

const getTypeVariant = (type: string) => {
  switch (type) {
    case 'CDI':
      return 'default';
    case 'Freelance':
      return 'secondary';
    case 'Stage':
      return 'outline';
    default:
      return 'secondary';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'CDI':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Freelance':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Stage':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<typeof jobCategories[0] | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    motivation: '',
    experience: ''
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Techtrust Recrute 2025 - Rejoignez l'Élite Tech IA",
    "description": "🚀 Techtrust recrute les meilleurs talents tech 2025 ! Développeurs, Growth Hackers IA, Data Scientists. Rejoignez l'équipe qui révolutionne le digital avec l'IA.",
    "url": "https://www.tech-trust.fr/careers"
  };

  const handleJobSelect = (job: typeof jobCategories[0]) => {
    setSelectedJob(job);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Candidature:', { ...formData, job: selectedJob?.title });
    // Logique de soumission
  };

  return (
    <>
      <SEO
        title="Techtrust Recrute 2025 | Emplois Tech IA, Growth Hacking - Techtrust"
        description="🔍 Rejoignez l'élite tech 2025 ! Techtrust recrute développeurs IA, growth hackers, data scientists. Salaires attractifs, projets innovants. Postulez maintenant !"
        keywords="techtrust recrute 2025, emploi tech ia, recrutement growth hacking, jobs développeur ia, carrières data scientist, apporteur affaires"
        canonicalUrl="https://www.tech-trust.fr/careers" 
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  <span className="text-blue-600">Techtrust</span> Recrute 2025
                </h1>
                <p className="text-xl text-gray-600 mb-10">
                  Rejoignez l'équipe qui révolutionne le digital avec l'IA ! 
                  Nous recherchons les meilleurs talents tech pour développer les outils du futur.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
                    <h3 className="font-bold text-gray-900 mb-2">💼 Rejoindre notre équipe</h3>
                    <p className="text-gray-600 text-sm">CDI, freelance, stages - Tous les profils tech sont les bienvenus</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-100">
                    <h3 className="font-bold text-gray-900 mb-2">🤝 Devenir apporteur d'affaires</h3>
                    <p className="text-gray-600 text-sm">Commissions jusqu'à 15% - Programme très attractif</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Jobs Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 text-center">
                  Nos <span className="text-blue-600">Métiers</span> Tech
                </h2>
                <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
                  Cliquez sur le métier qui vous intéresse pour découvrir le poste et postuler directement
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobCategories.map((job, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <div 
                          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all cursor-pointer group"
                          onClick={() => handleJobSelect(job)}
                        >
                          <div className={`w-12 h-12 bg-${job.color}/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <job.icon className={`w-6 h-6 text-${job.color}`} />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                          <p className="text-gray-600 mb-4 text-sm">{job.description}</p>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Salaire:</span>
                              <span className="font-medium">{job.salary}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500">Type:</span>
                              <div className="flex gap-1 flex-wrap">
                                {job.types.map((type, typeIndex) => (
                                  <span 
                                    key={typeIndex} 
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getTypeColor(type)}`}
                                  >
                                    {type}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button className={`w-full mt-4 bg-${job.color} hover:bg-${job.color}/90`}>
                            Postuler <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </DialogTrigger>
                      
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3">
                            <job.icon className={`w-6 h-6 text-${job.color}`} />
                            {job.title}
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Description du poste</h4>
                            <p className="text-gray-600">{job.description}</p>
                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Salaire:</span>
                                <span className="ml-2 font-medium">{job.salary}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500">Types:</span>
                                <div className="flex gap-1 flex-wrap">
                                  {job.types.map((type, typeIndex) => (
                                    <span 
                                      key={typeIndex} 
                                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getTypeColor(type)}`}
                                    >
                                      {type}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Compétences requises</h4>
                            <p className="text-gray-600">{job.requirements}</p>
                          </div>

                          <form onSubmit={handleSubmit} className="space-y-4">
                            <h4 className="font-semibold text-gray-900">Postuler maintenant</h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="name">Nom complet *</Label>
                                <Input
                                  id="name"
                                  value={formData.name}
                                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="phone">Téléphone</Label>
                              <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="experience">Expérience pertinente *</Label>
                              <Textarea
                                id="experience"
                                placeholder="Décrivez votre expérience en lien avec ce poste..."
                                value={formData.experience}
                                onChange={(e) => setFormData(prev => ({...prev, experience: e.target.value}))}
                                required
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="motivation">Motivation *</Label>
                              <Textarea
                                id="motivation"
                                placeholder="Pourquoi souhaitez-vous rejoindre Techtrust ?"
                                value={formData.motivation}
                                onChange={(e) => setFormData(prev => ({...prev, motivation: e.target.value}))}
                                required
                              />
                            </div>
                            
                            <div>
                              <Label>CV (PDF) *</Label>
                              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">Cliquez pour télécharger votre CV</p>
                              </div>
                            </div>
                            
                            <Button type="submit" className={`w-full bg-${job.color} hover:bg-${job.color}/90`}>
                              Envoyer ma candidature
                            </Button>
                          </form>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Business Partner Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  💰 Programme <span className="text-purple-600">Apporteur d'Affaires</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 text-center">
                  Profitez de rémunérations attractives en apportant des projets à Techtrust. 
                  Plus vous nous référez de clients, plus votre commission augmente !
                </p>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Rémunération par projet</h3>
                  
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-blue-50">
                          <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Nombre de projets</th>
                          <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Commission</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {projects: "1 projet", commission: "5% Commission"},
                          {projects: "2 projets", commission: "7.5% Commission"},
                          {projects: "3 projets", commission: "10% Commission"},
                          {projects: "4 projets", commission: "12.5% Commission"},
                          {projects: "5 projets et plus", commission: "15% Commission"}
                        ].map((row, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border border-gray-200 px-4 py-3">{row.projects}</td>
                            <td className="border border-gray-200 px-4 py-3 font-medium text-purple-600">{row.commission}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">📋 Conditions</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Remplissez et signez le modèle de contrat disponible ci-dessous</li>
                      <li>• Contactez-nous en cas de questions</li>
                      <li>• La validation de l'apport est conditionnée par la signature d'un devis comportant une clause mentionnant votre rôle dans la mise en relation</li>
                    </ul>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button className="bg-purple-600 hover:bg-purple-600/90 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Télécharger le contrat
                    </Button>
                    <Button variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                      <a href="/contact">Nous contacter</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Careers;
