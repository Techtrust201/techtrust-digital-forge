"use client";

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Eye,
  Edit,
  Plus,
  Trash2
} from 'lucide-react';
import Link from 'next/link';

export default function AdminBlogPage() {
  const articles = [
    { 
      id: 1,
      title: 'Guide complet du Growth Hacking en 2025',
      category: 'Growth Hacking',
      status: 'published',
      views: 1234,
      date: '15 Jan 2025'
    },
    { 
      id: 2,
      title: 'SEO et IA : Comment optimiser votre référencement',
      category: 'SEO',
      status: 'published',
      views: 856,
      date: '12 Jan 2025'
    },
    { 
      id: 3,
      title: 'Community Management : les tendances 2025',
      category: 'Social Media',
      status: 'draft',
      views: 0,
      date: '10 Jan 2025'
    },
    { 
      id: 4,
      title: 'Comment créer une landing page qui convertit',
      category: 'Web Design',
      status: 'published',
      views: 623,
      date: '08 Jan 2025'
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Blog</h1>
            <p className="text-gray-400">Gérez les articles du blog</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nouvel article
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-white">{articles.length}</p>
              <p className="text-sm text-gray-400">Total articles</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-green-400">
                {articles.filter(a => a.status === 'published').length}
              </p>
              <p className="text-sm text-gray-400">Publiés</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-yellow-400">
                {articles.filter(a => a.status === 'draft').length}
              </p>
              <p className="text-sm text-gray-400">Brouillons</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-blue-400">
                {articles.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">Total vues</p>
            </CardContent>
          </Card>
        </div>

        {/* Articles list */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{article.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{article.category}</span>
                      <span>{article.date}</span>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {article.views}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={
                      article.status === 'published' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }>
                      {article.status === 'published' ? 'Publié' : 'Brouillon'}
                    </Badge>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
