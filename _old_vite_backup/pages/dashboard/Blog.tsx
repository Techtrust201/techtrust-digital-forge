
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Calendar, User, Eye, FileText, Shield, TrendingUp, Target } from 'lucide-react';
import { useBlogPosts, useBlogCategories } from '@/hooks/useBlogData';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DashboardBlog = () => {
  const { data: blogPosts, isLoading } = useBlogPosts();
  const { data: categories } = useBlogCategories();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userData, setUserData] = useState<any>(null);

  // Récupération des données utilisateur pour vérifier le rôle
  useEffect(() => {
    const user = localStorage.getItem('techtrust_user');
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  // Vérification si l'utilisateur est super admin
  const isSuperAdmin = userData?.role === 'super_admin' || userData?.email === 'contact@tech-trust.fr';

  const publishedPosts = blogPosts?.filter(post => post.status === 'published') || [];

  const filteredPosts = publishedPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Calculs dynamiques pour super admin
  const adminStats = isSuperAdmin ? {
    totalArticles: blogPosts?.length || 0,
    publishedArticles: publishedPosts.length,
    draftArticles: blogPosts?.filter(post => post.status === 'draft').length || 0,
    scheduledArticles: blogPosts?.filter(post => post.status === 'scheduled').length || 0,
    totalViews: blogPosts?.reduce((sum, post) => sum + (post.views || 0), 0) || 0,
    averageViews: blogPosts?.length ? Math.round((blogPosts.reduce((sum, post) => sum + (post.views || 0), 0) / blogPosts.length)) : 0,
    categoriesWithStats: categories?.map(cat => ({
      name: cat.name,
      count: publishedPosts.filter(post => post.category === cat.name).length,
      totalViews: publishedPosts.filter(post => post.category === cat.name).reduce((sum, post) => sum + (post.views || 0), 0)
    })) || [],
    topPerformingPosts: publishedPosts.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3),
    engagementRate: publishedPosts.length > 0 ? Math.round((publishedPosts.reduce((sum, post) => sum + (post.views || 0), 0) / publishedPosts.length) * 100) / 100 : 0
  } : null;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-500 mt-2">Découvrez nos derniers articles et conseils</p>
        </div>

        {/* Filtres */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Rechercher des articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Rechercher par titre, contenu ou auteur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques Super Admin - Section Confidentielle */}
        {isSuperAdmin && adminStats && (
          <div className="space-y-6">
            {/* Header confidentiel */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-red-600" />
                <div>
                  <h2 className="text-xl font-bold text-red-800">Statistiques Confidentielles - Super Admin</h2>
                  <p className="text-sm text-red-600">Ces données sont uniquement visibles par les super administrateurs</p>
                </div>
              </div>
            </div>

            {/* Stats principales */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-600 rounded-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-red-600 font-medium">Total Articles</p>
                      <p className="text-3xl font-bold text-red-800">{adminStats.totalArticles}</p>
                      <p className="text-xs text-red-500">
                        {adminStats.publishedArticles} publiés • {adminStats.draftArticles} brouillons
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-600 rounded-lg">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-green-600 font-medium">Vues Totales</p>
                      <p className="text-3xl font-bold text-green-800">{adminStats.totalViews.toLocaleString()}</p>
                      <p className="text-xs text-green-500">
                        Moyenne: {adminStats.averageViews} vues/article
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Taux d'Engagement</p>
                      <p className="text-3xl font-bold text-blue-800">{adminStats.engagementRate}%</p>
                      <p className="text-xs text-blue-500">
                        Basé sur les vues moyennes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-600 rounded-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Performance Catégories</p>
                      <p className="text-3xl font-bold text-purple-800">{categories?.length || 0}</p>
                      <p className="text-xs text-purple-500">
                        Catégories actives
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top des articles les plus performants */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top 3 Articles les Plus Performants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {adminStats.topPerformingPosts.map((post, index) => (
                    <div key={post.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 line-clamp-1">{post.title}</h4>
                          <p className="text-sm text-gray-500">{post.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-600">{post.views?.toLocaleString()} vues</p>
                        <p className="text-xs text-gray-500">{post.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance par catégorie */}
            <Card className="border-indigo-200 bg-indigo-50">
              <CardHeader>
                <CardTitle className="text-indigo-800">Performance par Catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {adminStats.categoriesWithStats.map((cat) => (
                    <div key={cat.name} className="p-4 bg-white rounded-lg border border-indigo-200">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900">{cat.name}</h4>
                        <Badge className="bg-indigo-100 text-indigo-800">
                          {cat.count} articles
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {cat.totalViews.toLocaleString()} vues totales
                      </p>
                      <p className="text-xs text-gray-500">
                        Moyenne: {cat.count > 0 ? Math.round(cat.totalViews / cat.count) : 0} vues/article
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stats publiques simplifiées */}
        {!isSuperAdmin && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Articles publiés</p>
                    <p className="text-2xl font-bold">{publishedPosts.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total des vues</p>
                    <p className="text-2xl font-bold">
                      {publishedPosts.reduce((sum, post) => sum + (post.views || 0), 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Search className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Résultats trouvés</p>
                    <p className="text-2xl font-bold">{filteredPosts.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Liste des articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-red-50 text-red-700 border-red-200">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Eye className="w-4 h-4" />
                      {post.views?.toLocaleString() || 0}
                    </div>
                  </div>
                  
                  <div>
                    <h3 
                      className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer"
                      onClick={() => navigate(`/dashboard/blog/${post.id}`)}
                    >
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publish_date || post.created_at).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/dashboard/blog/${post.id}`)}
                  >
                    Lire l'article
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article trouvé</h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== 'all' 
                  ? "Essayez de modifier vos critères de recherche"
                  : "Aucun article n'a encore été publié"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardBlog;
