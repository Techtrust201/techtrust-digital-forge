
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
        {/* Header moderne inspiré de l'image */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button 
                variant="default"
                className="bg-gray-800 hover:bg-gray-900 text-white rounded-full px-6 py-2 font-medium"
                onClick={() => navigate('/admin/blog/posts')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Modifier l'article</h1>
                <div className="flex items-center gap-4 text-sm">
                  <Badge className={
                    post.status === 'published' ? 'bg-green-500 text-white border-0' :
                    post.status === 'scheduled' ? 'bg-blue-500 text-white border-0' :
                    'bg-gray-500 text-white border-0'
                  }>
                    {post.status === 'published' ? 'Publié' : 
                     post.status === 'scheduled' ? 'Programmé' : 'Brouillon'}
                  </Badge>
                  <span className="text-gray-600">
                    {post.views} vues • Créé le {new Date(post.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="border-gray-300 hover:bg-gray-50"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Voir sur le site
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Éditer
              </Button>
            </div>
          </div>
        </div>

        {/* Contenu de l'article */}
        <Card className="shadow-sm border-gray-200">
          <CardContent className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-5 flex flex-wrap gap-2">
                {post.category && post.category.trim() !== '' && (
                  <Badge className="bg-red-50 text-red-700 border-red-200">
                    {post.category}
                  </Badge>
                )}
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
