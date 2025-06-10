
import React from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Techtrust",
    "description": "Actualités et conseils digital, web et growth hacking par les experts Techtrust",
    "url": "https://www.tech-trust.fr/blog"
  };

  const articles = [
    {
      title: "10 Tendances Web Design 2024",
      excerpt: "Découvrez les tendances qui vont dominer le web design cette année et comment les appliquer à votre site.",
      date: "15 Mars 2024",
      author: "Équipe Techtrust",
      image: "/placeholder.svg"
    },
    {
      title: "Growth Hacking : Guide Complet",
      excerpt: "Stratégies complètes pour exploser votre croissance grâce au growth hacking moderne.",
      date: "10 Mars 2024",
      author: "Équipe Techtrust",
      image: "/placeholder.svg"
    },
    {
      title: "SEO 2024 : Ce qui Change",
      excerpt: "Les nouvelles règles du référencement naturel et comment adapter votre stratégie SEO.",
      date: "5 Mars 2024",
      author: "Équipe Techtrust",
      image: "/placeholder.svg"
    }
  ];

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
              </div>
            </div>
          </section>

          {/* Articles Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {articles.map((article, index) => (
                  <article key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
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
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      
                      <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                        Lire la suite <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-gray-600 mb-4">Plus d'articles bientôt disponibles</p>
                <Button variant="outline">
                  <a href="/contact">Suggérer un sujet</a>
                </Button>
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
