
import React, { useState } from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Search, Tag, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BlogPostForm from '@/components/blog/BlogPostForm';
import AdminAuth from '@/components/blog/AdminAuth';

// Articles de démonstration
const initialArticles = [
  {
    id: 1,
    title: "10 Tendances Web Design 2024",
    excerpt: "Découvrez les tendances qui vont dominer le web design cette année et comment les appliquer à votre site.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
    date: "15 Mars 2024",
    author: "Équipe Techtrust",
    image: "/placeholder.svg",
    tags: ["Design", "Tendances", "UX"]
  },
  {
    id: 2,
    title: "Growth Hacking : Guide Complet",
    excerpt: "Stratégies complètes pour exploser votre croissance grâce au growth hacking moderne.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
    date: "10 Mars 2024",
    author: "Équipe Techtrust",
    image: "/placeholder.svg",
    tags: ["Marketing", "Acquisition", "Stratégie"]
  },
  {
    id: 3,
    title: "SEO 2024 : Ce qui Change",
    excerpt: "Les nouvelles règles du référencement naturel et comment adapter votre stratégie SEO.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
    date: "5 Mars 2024",
    author: "Équipe Techtrust",
    image: "/placeholder.svg",
    tags: ["SEO", "Google", "Référencement"]
  }
];

// Catégories pour le filtrage
const categories = [
  "Toutes",
  "Web Design",
  "Growth Hacking",
  "SEO",
  "Development",
  "Digital Marketing",
  "AI"
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Blog Techtrust",
  "description": "Actualités et conseils digital, web et growth hacking par les experts Techtrust",
  "url": "https://www.tech-trust.fr/blog"
};

const Blog = () => {
  const [articles, setArticles] = useState(initialArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fonction pour ajouter un nouvel article
  const addArticle = (newArticle) => {
    const articleWithId = {
      ...newArticle,
      id: articles.length + 1,
      date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
    setArticles([articleWithId, ...articles]);
  };

  // Fonction pour filtrer les articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "Toutes" || 
                           article.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO
        title="Blog Digital | Actualités Web & Growth Hacking - Techtrust"
        description="📝 Blog expert en digital ! Actualités web, conseils growth hacking, tendances tech. Conseils d'experts pour réussir votre transformation digitale."
        keywords="blog digital, actualités web, conseils growth hacking, tendances tech, marketing digital, développement web, SEO, transformation digitale"
        canonicalUrl="https://www.tech-trust.fr/blog"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Blog <span className="text-blue-600">Digital</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Actualités, conseils et tendances du monde digital par nos experts. 
                  Restez à la pointe de l'innovation !
                </p>

                <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input 
                      type="text"
                      placeholder="Rechercher un article..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="relative">
                    <select
                      className="w-full md:w-48 border border-gray-300 rounded-md px-4 py-2 appearance-none bg-white pr-10"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Admin Controls (only visible if admin mode is activated) */}
          {isAdminMode && (
            <section className="py-6 bg-gray-100 border-y border-gray-200">
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Mode Administrateur</h2>
                  
                  {isAuthenticated ? (
                    <div className="flex items-center gap-4">
                      <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-600 rounded-full inline-block"></span>
                        Connecté
                      </span>
                      <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>
                        Se déconnecter
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">Nouvel Article</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Créer un Nouvel Article</DialogTitle>
                            <DialogDescription>
                              Remplissez le formulaire pour publier un nouvel article sur le blog.
                            </DialogDescription>
                          </DialogHeader>
                          <BlogPostForm onSubmit={addArticle} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">Se connecter</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Authentification Administrateur</DialogTitle>
                          <DialogDescription>
                            Veuillez vous connecter pour accéder au panneau d'administration.
                          </DialogDescription>
                        </DialogHeader>
                        <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Articles Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-20">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Aucun article trouvé</h3>
                  <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {filteredArticles.map((article) => (
                    <article key={article.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {article.author}
                          </div>
                        </div>
                        
                        <h2 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h2>
                        <p className="text-gray-600 mb-4 flex-1">{article.excerpt}</p>
                        
                        <div className="mb-4 flex flex-wrap gap-2">
                          {article.tags.map((tag, index) => (
                            <span key={index} className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                              <Tag className="mr-1 h-3 w-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700 self-start">
                          Lire la suite <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              <div className="text-center mt-12">
                {/* Admin button - shown to everyone but activates admin mode */}
                {!isAdminMode && (
                  <Button 
                    variant="outline" 
                    className="mx-auto" 
                    onClick={() => setIsAdminMode(true)}
                  >
                    Gérer le blog
                  </Button>
                )}
                
                {isAdminMode && !isAuthenticated && (
                  <Button 
                    variant="outline" 
                    className="mx-auto" 
                    onClick={() => setIsAdminMode(false)}
                  >
                    Quitter mode administrateur
                  </Button>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
