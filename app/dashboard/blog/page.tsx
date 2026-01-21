"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Eye,
  Calendar,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function BlogDashboardPage() {
  const articles = [
    {
      id: 1,
      title: "Guide complet du Growth Hacking en 2025",
      excerpt: "Découvrez les meilleures stratégies de growth hacking pour accélérer votre croissance...",
      category: "Growth Hacking",
      date: "15 Jan 2025",
      views: 1234
    },
    {
      id: 2,
      title: "SEO et IA : Comment optimiser votre référencement",
      excerpt: "L'intelligence artificielle révolutionne le SEO. Voici comment en tirer parti...",
      category: "SEO",
      date: "12 Jan 2025",
      views: 856
    },
    {
      id: 3,
      title: "Community Management : les tendances 2025",
      excerpt: "Les réseaux sociaux évoluent rapidement. Restez à jour avec les dernières tendances...",
      category: "Community Management",
      date: "10 Jan 2025",
      views: 623
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
            <p className="text-gray-600">Articles et ressources pour votre business</p>
          </div>
          <Button asChild>
            <Link href="/fr/blog">
              Voir le blog
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Featured articles */}
        <div className="grid lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="w-4 h-4 mr-1" />
                    {article.views}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {article.date}
                  </div>
                  <Button variant="ghost" size="sm">
                    Lire <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resources section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Ressources recommandées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-1">Guide Growth IA</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Apprenez à utiliser l&apos;IA pour votre croissance
                </p>
                <Button variant="outline" size="sm">Télécharger</Button>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-1">Checklist SEO</h3>
                <p className="text-sm text-gray-600 mb-3">
                  100 points pour optimiser votre référencement
                </p>
                <Button variant="outline" size="sm">Télécharger</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
