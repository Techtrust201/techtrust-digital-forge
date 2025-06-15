import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { useBlogPosts, useBlogCategories, useBlogActions } from '@/hooks/useBlogData';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import AdminBlogEditHeader from './components/AdminBlogEditHeader';
import AdminBlogEditForm from './components/AdminBlogEditForm';
import AdminBlogEditSidebar from './components/AdminBlogEditSidebar';

const AdminBlogEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: blogPosts, isLoading: postsLoading } = useBlogPosts();
  const { data: categories } = useBlogCategories();
  const { updatePost, deletePost } = useBlogActions();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    status: 'draft' as 'draft' | 'published' | 'scheduled',
    author: '',
  });

  const post = blogPosts?.find(p => p.id === id);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        category: post.category || '',
        status: post.status || 'draft',
        author: post.author || '',
      });
    }
  }, [post]);

  if (postsLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  if (!post) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article introuvable</h1>
          <p className="text-gray-600 mb-6">L'article que vous cherchez n'existe pas.</p>
          <Button onClick={() => navigate('/admin/blog/posts')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux articles
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updatePost.mutateAsync({
        id: post.id,
        ...formData,
        updated_at: new Date().toISOString(),
      });
      
      toast({ title: 'Article mis à jour avec succès' });
      navigate('/admin/blog/posts');
    } catch (error: any) {
      toast({ 
        title: 'Erreur lors de la mise à jour', 
        description: error?.message, 
        variant: 'destructive' 
      });
    }
  };

  const handlePublish = async () => {
    try {
      await updatePost.mutateAsync({
        id: post.id,
        ...formData,
        status: 'published',
        publish_date: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      
      toast({ title: 'Article publié avec succès' });
      navigate('/admin/blog/posts');
    } catch (error: any) {
      toast({ 
        title: 'Erreur lors de la publication', 
        description: error?.message, 
        variant: 'destructive' 
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync(post.id);
      toast({ title: 'Article supprimé avec succès' });
      navigate('/admin/blog/posts');
    } catch (error: any) {
      toast({ 
        title: 'Erreur lors de la suppression', 
        description: error?.message, 
        variant: 'destructive' 
      });
    }
  };

  const handlePreview = () => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminBlogEditHeader
          post={post}
          onDelete={handleDelete}
          onPreview={handlePreview}
          isDeleting={deletePost.isPending}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AdminBlogEditForm
              formData={formData}
              onChange={handleFormChange}
            />
          </div>

          <AdminBlogEditSidebar
            formData={formData}
            categories={categories}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            onPublish={handlePublish}
            isUpdating={updatePost.isPending}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogEditPage;
