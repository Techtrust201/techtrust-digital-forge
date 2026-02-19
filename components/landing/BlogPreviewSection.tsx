import React from 'react';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const blogPosts = [
  {
    title: "Comment choisir la meilleure agence web en 2024 ?",
    excerpt: "Guide complet pour sélectionner l'agence web parfaite pour votre projet. Critères essentiels, questions à poser et pièges à éviter.",
    date: "15 Mars 2024",
    readTime: "5 min",
    category: "Agence Web",
    image: "/blog/agence-web-2024.jpg",
    slug: "choisir-meilleure-agence-web-2024"
  },
  {
    title: "Growth Hacking : 10 stratégies qui fonctionnent vraiment",
    excerpt: "Découvrez les techniques de growth hacking les plus efficaces pour booster votre acquisition client et multiplier votre croissance.",
    date: "12 Mars 2024", 
    readTime: "8 min",
    category: "Growth Hacking",
    image: "/blog/growth-hacking-strategies.jpg",
    slug: "growth-hacking-10-strategies-efficaces"
  },
  {
    title: "Développement sur mesure vs SaaS : que choisir ?",
    excerpt: "Analyse complète pour vous aider à décider entre une solution SaaS existante et le développement d'un logiciel sur mesure.",
    date: "10 Mars 2024",
    readTime: "6 min", 
    category: "Développement",
    image: "/blog/custom-vs-saas.jpg",
    slug: "developpement-sur-mesure-vs-saas"
  }
];

interface BlogPreviewSectionProps {
  locale: string;
}

const BlogPreviewSection = ({ locale }: BlogPreviewSectionProps) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-custom-green/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Derniers <span className="text-custom-green">Articles</span> du Blog
          </h2>
          <p className="text-lg text-gray-600">
            Conseils d&apos;experts, guides pratiques et actualités du digital pour faire grandir votre business.
          </p>
        </div>

        {/* Grille d'articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article key={post.slug}>
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white h-full overflow-hidden">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-custom-blue/20 to-custom-purple/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-custom-blue px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col h-full">
                  {/* Métadonnées */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      {post.readTime}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-custom-blue transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link 
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center text-custom-blue font-medium group/link hover:text-custom-purple transition-colors"
                  >
                    Lire l&apos;article
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>

        {/* CTA vers le blog */}
        <div className="text-center">
          <Button 
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-custom-green text-custom-green hover:bg-custom-green hover:text-white"
          >
            <Link href={`/${locale}/blog`}>
              Voir tous les articles
              <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
