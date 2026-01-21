
import React, { useState, useEffect } from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import CookieBanner from '@/components/CookieBanner';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useBlogPosts, useBlogCategories } from '@/hooks/useBlogData';
import { useArticleViews } from '@/hooks/useArticleViews';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const Blog = () => {
  const { data: blogPosts, isLoading: postsLoading } = useBlogPosts();
  const { data: categories, isLoading: categoriesLoading } = useBlogCategories();
  const { trackArticleView } = useArticleViews();
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  // Filtrer les articles publiés
  const publishedPosts = blogPosts?.filter(post => post.status === 'published') || [];
  const filteredPosts = selectedCategory 
    ? publishedPosts.filter(post => post.category === selectedCategory)
    : publishedPosts;

  const handlePostClick = async (post: any) => {
    setSelectedPost(post);
    
    // Tracker la vue uniquement si les cookies analytics sont acceptés
    if (cookiePreferences.analytics) {
      await trackArticleView(post.id);
    }
  };

  const handleCookiePreferences = (preferences: CookiePreferences) => {
    setCookiePreferences(preferences);
  };

  if (postsLoading || categoriesLoading) {
    return (
      <>
        <NavbarPublic />
        <main>
          <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <Skeleton className="h-16 w-96 mx-auto mb-6" />
                <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
              </div>
            </div>
          </section>
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-96" />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <CookieBanner onPreferencesChange={handleCookiePreferences} />
      </>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Techtrust 2025 - Growth Hacking IA & SEO",
    "description": "Blog expert en growth hacking IA, community management automatisé, SEO 2025. Guides exclusifs, cas clients, stratégies d'acquisition avec l'IA.",
    "url": "https://www.tech-trust.fr/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Techtrust",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.tech-trust.fr/logo-techtrust-2025.png"
      }
    },
    "blogPost": filteredPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.publish_date || post.created_at,
      "dateModified": post.updated_at,
      "url": `https://www.tech-trust.fr/blog/${post.id}`,
      "articleSection": post.category
    }))
  };

  return (
    <>
      <SEO
        title="Blog Techtrust 2025 | Growth Hacking IA, SEO, Community Management"
        description={`📚 Blog expert 2025 ! ${filteredPosts.length} guides exclusifs growth hacking IA, community management automatisé, SEO Google. Cas clients, stratégies d'acquisition, outils IA révolutionnaires.`}
        keywords="blog techtrust 2025, growth hacking ia, community management automatisé, seo ia, prospection automatique, outils ia marketing"
        canonicalUrl="https://www.tech-trust.fr/blog"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Blog <span className="text-blue-600">Techtrust</span> 2025
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Découvrez nos {filteredPosts.length} guides exclusifs, cas clients et stratégies avancées pour dominer votre marché avec l'IA et le growth hacking.
                </p>
              </div>
            </div>
          </section>

          {/* Filtres de catégories */}
          <section className="py-8 bg-white border-b">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  variant={selectedCategory === '' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('')}
                  className={selectedCategory === '' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                >
                  Tous ({publishedPosts.length})
                </Button>
                {categories?.map(category => {
                  const count = publishedPosts.filter(post => post.category === category.name).length;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.name ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category.name)}
                      className={selectedCategory === category.name ? 'bg-blue-600 hover:bg-blue-700' : ''}
                    >
                      {category.name} ({count})
                    </Button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Blog Posts */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Aucun article trouvé</h2>
                  <p className="text-gray-600">
                    {selectedCategory 
                      ? `Aucun article dans la catégorie "${selectedCategory}"`
                      : "Aucun article publié pour le moment"
                    }
                  </p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {filteredPosts.map((post) => (
                    <article key={post.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                      <div className="relative">
                        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center">
                          <div className="text-center">
                            <Tag className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">{post.category}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                            {post.category}
                          </Badge>
                        </div>
                        
                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {post.title}
                        </h2>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt || post.content?.substring(0, 150) + '...'}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publish_date || post.created_at).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:text-white group/btn"
                              onClick={() => handlePostClick(post)}
                            >
                              Lire l'article
                              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold leading-tight">
                                {selectedPost?.title}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  {selectedPost?.author}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  {selectedPost && new Date(selectedPost.publish_date || selectedPost.created_at).toLocaleDateString('fr-FR')}
                                </div>
                                <Badge className="bg-blue-50 text-blue-700">
                                  {selectedPost?.category}
                                </Badge>
                              </div>
                              
                              {selectedPost?.excerpt && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-lg text-gray-700 italic">{selectedPost.excerpt}</p>
                                </div>
                              )}
                              
                              <div 
                                className="prose prose-lg prose-gray max-w-none
                                  prose-headings:text-gray-900 prose-headings:font-bold
                                  prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                                  prose-p:text-gray-700 prose-p:leading-relaxed
                                  prose-strong:text-gray-900 prose-strong:font-semibold
                                  prose-em:text-gray-700 prose-em:italic
                                  prose-ul:list-disc prose-ol:list-decimal
                                  prose-li:text-gray-700 prose-li:mb-1
                                  prose-blockquote:border-l-4 prose-blockquote:border-blue-300 prose-blockquote:pl-4 prose-blockquote:italic
                                  prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
                                  prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800"
                                dangerouslySetInnerHTML={{ __html: selectedPost?.content || '' }}
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
        <CookieBanner onPreferencesChange={handleCookiePreferences} />
      </div>
    </>
  );
};

export default Blog;
