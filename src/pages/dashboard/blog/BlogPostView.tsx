import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogData';
import { Skeleton } from '@/components/ui/skeleton';

const BlogPostView = () => {
  const { id } = useParams<{ id: string }>();
  const { data: posts, isLoading, error } = useBlogPosts();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="w-full h-80" />
          <Skeleton className="w-full h-40" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-red-800 mb-4">
            Erreur lors du chargement de l'article
          </h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <Button onClick={() => navigate("/dashboard/blog")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au blog
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const post = posts?.find((p) => p.id === id);

  if (!post) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-red-700 mb-4">
            Article introuvable
          </h1>
          <p className="text-gray-600 mb-6">
            L'article recherché n'existe pas ou a été supprimé.
          </p>
          <Button onClick={() => navigate("/dashboard/blog")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au blog
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard/blog")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>

        {/* Content */}
        <Card>
          <CardContent className="p-8">
            <article className="max-w-4xl mx-auto">
              <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center gap-4 mb-6">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-gray-600">
                    Par {post.author}
                  </span>
                  <span className="text-gray-600">
                    {new Date(post.publish_date || post.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                {post.excerpt && (
                  <p className="text-lg text-gray-700 italic border-l-4 border-blue-300 pl-4">
                    {post.excerpt}
                  </p>
                )}
              </header>
              
              <div className="prose prose-lg max-w-none">
                {post.content}
              </div>
            </article>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BlogPostView;
