
"use client"

import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const blogPosts = [
  {
    title: "Growth Hacking : 10 stratégies qui fonctionnent en 2024",
    excerpt: "Découvrez les techniques de growth hacking les plus efficaces pour booster votre croissance digitale cette année.",
    date: "15 Jan 2024",
    category: "Growth Hacking"
  },
  {
    title: "Comment créer un site web qui convertit vos visiteurs",
    excerpt: "Les meilleures pratiques pour transformer votre site web en machine à convertir et augmenter vos ventes.",
    date: "12 Jan 2024",
    category: "Web Design"
  },
  {
    title: "IA et automatisation : l'avenir du marketing digital",
    excerpt: "Comment l'intelligence artificielle révolutionne le marketing digital et comment en tirer parti pour votre entreprise.",
    date: "10 Jan 2024",
    category: "IA & Tech"
  }
];

const BlogPreviewSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nos Derniers <span className="text-blue-600">Articles</span>
          </h2>
          <p className="text-lg text-gray-600">
            Restez à jour avec les dernières tendances du marketing digital et du développement web.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card key={post.title} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                  Lire la suite
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
            Voir tous les articles
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
