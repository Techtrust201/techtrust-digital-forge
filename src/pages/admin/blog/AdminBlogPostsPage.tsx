
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';
import { useBlogPosts, useBlogActions } from '@/hooks/useBlogData';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AdminBlogPostsPage = () => {
  const { data: blogPosts, isLoading } = useBlogPosts();
  const { deletePost, updatePost } = useBlogActions();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    // Redirige vers la vue publique de l'article
    navigate(`/blog/${id}`);
  };

  const handleEditPost = (id: string) => {
    // Redirige vers la page d’édition de l'article
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

        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{blogPosts?.length || 0}</p>
                  <p className="text-sm text-gray-500">Total articles</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Eye className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Vues totales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{scheduledPosts.length}</p>
                  <p className="text-sm text-gray-500">Programmés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Edit className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{draftPosts.length}</p>
                  <p className="text-sm text-gray-500">Brouillons</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des articles */}
        <Card>
          <CardHeader>
            <CardTitle>Tous les articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogPosts?.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                        onClick={() => handleViewPost(post.id)}
                      >
                        {post.title}
                      </h3>
                      <Badge className={getStatusColor(post.status)}>
                        {getStatusLabel(post.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {post.category}
                      </div>
                      {post.publish_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.publish_date).toLocaleDateString()}
                        </div>
                      )}
                      {post.status === 'published' && (
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views?.toLocaleString() || 0} vues
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-blue-50" onClick={() => handleViewPost(post.id)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-green-50" onClick={() => handleEditPost(post.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    {post.status === 'draft' && (
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handlePublishPost(post.id)}
                        disabled={updatePost.isPending}
                      >
                        {updatePost.isPending ? 'Publication...' : 'Publier'}
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" disabled={deletePost.isPending}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Supprimer l'article</AlertDialogTitle>
                          <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer "{post.title}" ? Cette action est irréversible.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeletePost(post.id)}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={deletePost.isPending}
                          >
                            {deletePost.isPending ? 'Suppression...' : 'Supprimer'}
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

