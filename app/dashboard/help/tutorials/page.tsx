"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Video, 
  Play,
  Clock,
  BookOpen,
  Star,
  Filter
} from 'lucide-react';

export default function TutorialsPage() {
  const tutorials = [
    {
      id: 1,
      title: 'Premiers pas avec Techtrust',
      description: 'Apprenez les bases de la plateforme en 10 minutes',
      duration: '10 min',
      level: 'Débutant',
      category: 'Getting Started',
      thumbnail: '/tutorials/getting-started.jpg',
      views: 1234
    },
    {
      id: 2,
      title: 'Créer votre première campagne email',
      description: 'Guide complet pour lancer une campagne email efficace',
      duration: '15 min',
      level: 'Débutant',
      category: 'Campagnes',
      thumbnail: '/tutorials/email-campaign.jpg',
      views: 892
    },
    {
      id: 3,
      title: 'Comprendre les analytics',
      description: 'Analysez vos données pour prendre de meilleures décisions',
      duration: '20 min',
      level: 'Intermédiaire',
      category: 'Analytics',
      thumbnail: '/tutorials/analytics.jpg',
      views: 756
    },
    {
      id: 4,
      title: 'Automatisation avancée',
      description: 'Créez des workflows d\'automatisation puissants',
      duration: '25 min',
      level: 'Avancé',
      category: 'Automation',
      thumbnail: '/tutorials/automation.jpg',
      views: 543
    },
    {
      id: 5,
      title: 'Lead scoring avec l\'IA',
      description: 'Utilisez l\'IA pour qualifier vos leads automatiquement',
      duration: '18 min',
      level: 'Avancé',
      category: 'IA',
      thumbnail: '/tutorials/ai-scoring.jpg',
      views: 421
    },
    {
      id: 6,
      title: 'Intégrations API',
      description: 'Connectez Techtrust à vos outils existants',
      duration: '30 min',
      level: 'Expert',
      category: 'Technique',
      thumbnail: '/tutorials/api.jpg',
      views: 312
    }
  ];

  const categories = ['Tous', 'Getting Started', 'Campagnes', 'Analytics', 'Automation', 'IA', 'Technique'];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-blue-100 text-blue-800';
      case 'Avancé': return 'bg-purple-100 text-purple-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Video className="w-8 h-8 text-blue-500" />
              Tutoriels Vidéo
            </h1>
            <p className="text-gray-600">Apprenez à maîtriser Techtrust avec nos guides vidéo</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
          </div>
        </div>

        {/* Catégories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === 'Tous' ? 'default' : 'outline'}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Tutoriel mis en avant */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <Badge className="bg-white/20 text-white mb-4">Recommandé</Badge>
                <h2 className="text-2xl font-bold mb-2">Masterclass Growth Hacking</h2>
                <p className="text-white/80 mb-4">
                  Formation complète de 2h pour maîtriser toutes les techniques de growth hacking avec Techtrust
                </p>
                <div className="flex items-center gap-4 text-sm text-white/80 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    2h 15min
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    4.9/5
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    12 chapitres
                  </div>
                </div>
                <Button className="bg-white text-blue-600 hover:bg-white/90">
                  <Play className="w-4 h-4 mr-2" />
                  Commencer
                </Button>
              </div>
              <div className="w-full md:w-64 h-40 bg-white/10 rounded-lg flex items-center justify-center">
                <Play className="w-16 h-16 text-white/50" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des tutoriels */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center relative">
                <Play className="w-12 h-12 text-gray-400" />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {tutorial.duration}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getLevelColor(tutorial.level)}>{tutorial.level}</Badge>
                  <Badge variant="outline">{tutorial.category}</Badge>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{tutorial.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{tutorial.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{tutorial.views.toLocaleString()} vues</span>
                  <Button variant="ghost" size="sm">
                    <Play className="w-4 h-4 mr-1" />
                    Regarder
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section documentation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium text-gray-900 mb-2">Guide de démarrage</h4>
                <p className="text-sm text-gray-600">Configuration initiale et premiers pas</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium text-gray-900 mb-2">Documentation API</h4>
                <p className="text-sm text-gray-600">Référence complète de l&apos;API REST</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium text-gray-900 mb-2">Best practices</h4>
                <p className="text-sm text-gray-600">Conseils pour optimiser vos résultats</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
