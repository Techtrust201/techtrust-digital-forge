
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Folder, FileText } from 'lucide-react';
import { useBlogCategories, useBlogPosts, useBlogActions } from '@/hooks/useBlogData';
import { Skeleton } from '@/components/ui/skeleton';

const AdminBlogCategoriesPage = () => {
  const [newCategory, setNewCategory] = useState('');
  const { data: categories, isLoading: categoriesLoading } = useBlogCategories();
  const { data: blogPosts } = useBlogPosts();
  const { createCategory } = useBlogActions();

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      const slug = newCategory.toLowerCase().replace(/\s+/g, '-');
      await createCategory.mutateAsync({
        name: newCategory,
        slug,
        description: `Catégorie ${newCategory}`,
        color: 'blue',
      });
      setNewCategory('');
    }
  };

  const getCategoryArticleCount = (categoryName: string) => {
    return blogPosts?.filter(post => post.category === categoryName).length || 0;
  };

  if (categoriesLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  const totalArticles = blogPosts?.length || 0;
  const avgArticlesPerCategory = categories?.length ? Math.round(totalArticles / categories.length) : 0;

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
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Folder className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{categories?.length || 0}</p>
                  <p className="text-sm text-gray-500">Catégories totales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{totalArticles}</p>
                  <p className="text-sm text-gray-500">Articles totaux</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Edit className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{avgArticlesPerCategory}</p>
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
              <Button 
                onClick={handleAddCategory} 
                className="bg-red-500 hover:bg-red-600"
                disabled={createCategory.isPending || !newCategory.trim()}
              >
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
              {categories?.map((category) => {
                const articleCount = getCategoryArticleCount(category.name);
                return (
                  <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          {category.name}
                        </Badge>
                        <Badge variant="outline">
                          {articleCount} articles
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{category.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Slug: /{category.slug}</span>
                        <span>Créé le: {new Date(category.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="hover:bg-blue-50">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogCategoriesPage;
