
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowLeft, Eye, ExternalLink } from 'lucide-react';
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
          <Card>
            <CardContent className="p-8">
              <Skeleton className="h-12 w-4/5 mb-6" />
              <Skeleton className="w-full h-80" />
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-red-800 mb-6">Erreur lors du chargement</h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <Button onClick={() => navigate('/dashboard/blog')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour au blog
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const post = posts?.find(p => p.id === id && p.status === 'published');

  if (!post) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-3 text-gray-900">Article introuvable</h1>
          <p className="text-gray-600 mb-6">
            L'article recherché n'existe pas ou n'est pas encore publié.
          </p>
          <Button onClick={() => navigate('/dashboard/blog')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour au blog
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header avec navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/blog')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au blog
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate(`/blog/${post.id}`)}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Voir sur le site public
          </Button>
        </div>

        {/* Contenu de l'article */}
        <Card>
          <CardContent
            className="p-8 md:p-12 bg-white/90 rounded-2xl shadow-xl border border-gray-100 max-w-4xl mx-auto"
          >
            <div className="max-w-3xl mx-auto">
              <div className="mb-5 flex flex-wrap gap-2 items-center">
                <Badge className="bg-red-50 text-red-700 border-red-200">
                  {post.category}
                </Badge>
                <Badge variant="outline" className="text-gray-600">
                  <Eye className="w-3 h-3 mr-1" />
                  {post.views?.toLocaleString() || 0} vues
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              <div className="flex gap-6 mb-6 text-sm text-gray-500 flex-wrap">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" /> {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publish_date || post.created_at).toLocaleDateString('fr-FR')}
                </span>
              </div>

              {post.excerpt && (
                <blockquote className="italic bg-blue-50 border-l-4 border-blue-300 px-4 py-3 mb-6 text-gray-800 rounded">
                  {post.excerpt}
                </blockquote>
              )}

              <div className="prose prose-neutral max-w-none text-lg break-words whitespace-pre-line leading-relaxed">
                {post.content}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BlogPostView;
