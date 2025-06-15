
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, ExternalLink, Calendar, User } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogData';
import { Skeleton } from '@/components/ui/skeleton';

const AdminBlogPreviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: blogPosts, isLoading } = useBlogPosts();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-80" />
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  const post = blogPosts?.find(p => p.id === id);

  if (!post) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article introuvable</h1>
          <p className="text-gray-600 mb-6">L'article que vous cherchez n'existe pas.</p>
          <Button onClick={() => navigate('/admin/blog/posts')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header avec actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/blog/posts')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la liste
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Prévisualisation</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={
                  post.status === 'published' ? 'bg-green-100 text-green-800' :
                  post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }>
                  {post.status === 'published' ? 'Publié' : 
                   post.status === 'scheduled' ? 'Programmé' : 'Brouillon'}
                </Badge>
                <span className="text-sm text-gray-500">
                  {post.views} vues
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Voir sur le site
            </Button>
            <Button 
              onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Éditer
            </Button>
          </div>
        </div>

        {/* Contenu de l'article */}
        <Card>
          <CardContent className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-5 flex flex-wrap gap-2">
                <Badge className="bg-red-50 text-red-700 border-red-200">
                  {post.category}
                </Badge>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
              
              <div className="flex gap-6 mb-8 text-sm text-gray-500 flex-wrap">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" /> {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> 
                  {new Date(post.publish_date || post.created_at).toLocaleDateString('fr-FR')}
                </span>
              </div>
              
              {post.excerpt && (
                <blockquote className="italic bg-gray-50 border-l-4 border-red-300 px-4 py-3 mb-8 text-gray-800 rounded">
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
    </AdminLayout>
  );
};

export default AdminBlogPreviewPage;
