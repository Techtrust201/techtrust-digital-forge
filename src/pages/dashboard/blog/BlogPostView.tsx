
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogData';
import { useArticleViews } from '@/hooks/useArticleViews';
import { Skeleton } from '@/components/ui/skeleton';

const BlogPostView = () => {
  const { id } = useParams<{ id: string }>();
  const { data: posts, isLoading, error } = useBlogPosts();
  const { trackArticleView } = useArticleViews();
  const navigate = useNavigate();

  const post = posts?.find((p) => p.id === id);

  // Tracker la vue quand le post est chargé
  useEffect(() => {
    if (post?.id) {
      // Vérifier si les cookies analytics sont acceptés
      const cookieConsent = localStorage.getItem('techtrust_cookie_consent');
      if (cookieConsent) {
        try {
          const preferences = JSON.parse(cookieConsent);
          if (preferences.analytics) {
            trackArticleView(post.id);
          }
        } catch (error) {
          console.error('Erreur parsing cookie consent:', error);
        }
      }
    }
  }, [post?.id, trackArticleView]);

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
              
              <div 
                className="prose prose-lg prose-gray max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-em:text-gray-700 prose-em:italic
                  prose-ul:list-disc prose-ol:list-decimal
                  prose-li:text-gray-700 prose-li:mb-1
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-300 prose-blockquote:pl-4 prose-blockquote:italic
                  prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
                  prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800"
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
              />
            </article>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BlogPostView;
