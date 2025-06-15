
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Folder, FileText } from 'lucide-react';

const AdminBlogCategoriesPage = () => {
  const [newCategory, setNewCategory] = useState('');
  
  const categories = [
    {
      id: 1,
      name: 'Growth Hacking',
      slug: 'growth-hacking',
      description: 'Techniques et stratégies de croissance rapide',
      articlesCount: 8,
      color: 'bg-blue-100 text-blue-800',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      name: 'SEO',
      slug: 'seo',
      description: 'Référencement naturel et optimisation',
      articlesCount: 12,
      color: 'bg-green-100 text-green-800',
      createdAt: '2024-01-08'
    },
    {
      id: 3,
      name: 'Community Management',
      slug: 'community-management',
      description: 'Gestion de communautés et réseaux sociaux',
      articlesCount: 6,
      color: 'bg-purple-100 text-purple-800',
      createdAt: '2024-01-05'
    },
    {
      id: 4,
      name: 'Marketing Digital',
      slug: 'marketing-digital',
      description: 'Stratégies marketing digitales',
      articlesCount: 15,
      color: 'bg-orange-100 text-orange-800',
      createdAt: '2024-01-03'
    },
    {
      id: 5,
      name: 'Développement Web',
      slug: 'developpement-web',
      description: 'Technologies et bonnes pratiques web',
      articlesCount: 4,
      color: 'bg-red-100 text-red-800',
      createdAt: '2024-01-01'
    }
  ];

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      console.log('Ajout de la catégorie:', newCategory);
      setNewCategory('');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Catégories de blog</h1>
            <p className="text-gray-500 mt-2">Organiser les articles par catégories</p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Folder className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{categories.length}</p>
                  <p className="text-sm text-gray-500">Catégories totales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{categories.reduce((sum, cat) => sum + cat.articlesCount, 0)}</p>
                  <p className="text-sm text-gray-500">Articles totaux</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Edit className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{Math.round(categories.reduce((sum, cat) => sum + cat.articlesCount, 0) / categories.length)}</p>
                  <p className="text-sm text-gray-500">Moyenne/catégorie</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ajouter une catégorie */}
        <Card>
          <CardHeader>
            <CardTitle>Ajouter une nouvelle catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nom de la catégorie..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <Button onClick={handleAddCategory} className="bg-red-500 hover:bg-red-600">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Liste des catégories */}
        <Card>
          <CardHeader>
            <CardTitle>Toutes les catégories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={category.color}>
                        {category.name}
                      </Badge>
                      <Badge variant="outline">
                        {category.articlesCount} articles
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{category.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Slug: /{category.slug}</span>
                      <span>Créé le: {category.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
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
};

export default AdminBlogCategoriesPage;
