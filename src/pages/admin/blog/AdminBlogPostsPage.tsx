
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Edit, Trash2, Eye, Calendar, User, Shield, TrendingUp } from 'lucide-react';
import { useBlogPosts, useBlogActions } from '@/hooks/useBlogData';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import BlogPostStatsCards from './components/BlogPostStatsCards';
import BlogPostListItem from './components/BlogPostListItem';

const AdminBlogPostsPage = () => {
  const { data: blogPosts, isLoading } = useBlogPosts();
  const { deletePost, updatePost } = useBlogActions();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Récupération des données utilisateur pour vérifier le rôle
  useEffect(() => {
    const user = localStorage.getItem('techtrust_user');
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  // Vérification si l'utilisateur est super admin
  const isSuperAdmin = userData?.role === 'super_admin' || userData?.email === 'admin@techtrust.fr';

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publié';
      case 'draft':
        return 'Brouillon';
      case 'scheduled':
        return 'Programmé';
      default:
        return status;
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await deletePost.mutateAsync(id);
      toast({ title: 'Article supprimé avec succès' });
    } catch (error: any) {
      toast({ title: 'Erreur lors de la suppression', description: error?.message, variant: 'destructive' });
    }
    setSelectedPost(null);
  };

  const handlePublishPost = async (id: string) => {
    try {
      await updatePost.mutateAsync({
        id,
        status: 'published',
        publish_date: new Date().toISOString(),
      });
      toast({ title: 'Article publié avec succès' });
    } catch (error: any) {
      toast({ title: 'Erreur lors de la publication', description: error?.message, variant: 'destructive' });
    }
  };

  const handleViewPost = (id: string) => {
    navigate(`/admin/blog/preview/${id}`);
  };

  const handleEditPost = (id: string) => {
    navigate(`/admin/blog/edit/${id}`);
  };

  const publishedPosts = blogPosts?.filter(post => post.status === 'published') || [];
  const draftPosts = blogPosts?.filter(post => post.status === 'draft') || [];
  const scheduledPosts = blogPosts?.filter(post => post.status === 'scheduled') || [];
  const totalViews = blogPosts?.reduce((sum, post) => sum + (post.views || 0), 0) || 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Articles de blog</h1>
            <p className="text-gray-500 mt-2">Gérer tous les articles de blog</p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600" onClick={() => navigate('/admin/blog/create')}>
            <Plus className="w-4 h-4 mr-2" />
            Nouvel article
          </Button>
        </div>

        {/* Stats rapides avec vues (uniquement super admin) */}
        {isSuperAdmin ? (
          <div className="space-y-4">
            {/* Header confidentiel */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-red-600" />
                <div>
                  <h2 className="text-xl font-bold text-red-800">Statistiques Super Admin - Données Confidentielles</h2>
                  <p className="text-sm text-red-600">Ces statistiques de vues ne sont visibles que par les super administrateurs</p>
                </div>
              </div>
            </div>

            {/* Stats avec vues */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Total Articles</p>
                      <p className="text-3xl font-bold text-blue-800">{blogPosts?.length || 0}</p>
                      <p className="text-xs text-blue-500">
                        {publishedPosts.length} publiés • {draftPosts.length} brouillons
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
                      <p className="text-3xl font-bold text-green-800">{totalViews.toLocaleString()}</p>
                      <p className="text-xs text-green-500">
                        Moyenne: {publishedPosts.length > 0 ? Math.round(totalViews / publishedPosts.length) : 0} vues/article
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-600 rounded-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Programmés</p>
                      <p className="text-3xl font-bold text-purple-800">{scheduledPosts.length}</p>
                      <p className="text-xs text-purple-500">Articles à venir</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-600 rounded-lg">
                      <Edit className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-orange-600 font-medium">Brouillons</p>
                      <p className="text-3xl font-bold text-orange-800">{draftPosts.length}</p>
                      <p className="text-xs text-orange-500">En cours d'écriture</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top des articles les plus vus */}
            {publishedPosts.length > 0 && (
              <Card className="border-indigo-200 bg-indigo-50">
                <CardHeader>
                  <CardTitle className="text-indigo-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Articles les Plus Vus (Top 5)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {publishedPosts
                      .sort((a, b) => (b.views || 0) - (a.views || 0))
                      .slice(0, 5)
                      .map((post, index) => (
                        <div key={post.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-indigo-200">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-indigo-600'} text-white rounded-full flex items-center justify-center font-bold text-sm`}>
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 line-clamp-1">{post.title}</h4>
                              <p className="text-sm text-gray-500">{post.category} • {post.author}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-indigo-600">{(post.views || 0).toLocaleString()} vues</p>
                            <p className="text-xs text-gray-500">{new Date(post.publish_date || post.created_at).toLocaleDateString('fr-FR')}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          // Stats normales sans vues pour les non-super-admin
          <BlogPostStatsCards
            totalPosts={blogPosts?.length || 0}
            totalViews={0} // Masqué pour les non-super-admin
            scheduledCount={scheduledPosts.length}
            draftCount={draftPosts.length}
          />
        )}

        {/* Liste des articles */}
        <Card>
          <CardHeader>
            <CardTitle>Tous les articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogPosts?.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      <Badge className={getStatusColor(post.status)}>
                        {getStatusLabel(post.status)}
                      </Badge>
                      {isSuperAdmin && (
                        <Badge variant="outline" className="text-gray-600">
                          <Eye className="w-3 h-3 mr-1" />
                          {(post.views || 0).toLocaleString()} vues
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.created_at).toLocaleDateString('fr-FR')}
                      </span>
                      <span>{post.category}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewPost(post.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPost(post.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    {post.status === 'draft' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePublishPost(post.id)}
                        disabled={updatePost.isPending}
                      >
                        Publier
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => setSelectedPost(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Supprimer l'article</AlertDialogTitle>
                          <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer cet article ? Cette action ne peut pas être annulée.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setSelectedPost(null)}>
                            Annuler
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => selectedPost && handleDeletePost(selectedPost)}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={deletePost.isPending}
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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

export default AdminBlogPostsPage;
