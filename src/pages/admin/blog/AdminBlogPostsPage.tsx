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
import BlogPostStatsCards from './components/BlogPostStatsCards';
import BlogPostListItem from './components/BlogPostListItem';

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
    // Redirige vers la prévisualisation admin au lieu de la page publique
    navigate(`/admin/blog/preview/${id}`);
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
        <BlogPostStatsCards
          totalPosts={blogPosts?.length || 0}
          totalViews={totalViews}
          scheduledCount={scheduledPosts.length}
          draftCount={draftPosts.length}
        />

        {/* Liste des articles */}
        <Card>
          <CardHeader>
            <CardTitle>Tous les articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogPosts?.map((post) => (
                <BlogPostListItem
                  key={post.id}
                  post={post}
                  getStatusColor={getStatusColor}
                  getStatusLabel={getStatusLabel}
                  handleViewPost={handleViewPost}
                  handleEditPost={handleEditPost}
                  handlePublishPost={handlePublishPost}
                  handleDeletePost={handleDeletePost}
                  isDeleting={deletePost.isPending}
                  isPublishing={updatePost.isPending}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogPostsPage;
