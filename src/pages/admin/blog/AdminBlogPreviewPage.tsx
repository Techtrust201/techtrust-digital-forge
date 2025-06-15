
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, ExternalLink, Calendar, User } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogData';
import { Skeleton } from '@/components/ui/skeleton';

const statusStyle = (status: string) =>
  status === 'published'
    ? 'bg-green-100 text-green-800'
    : status === 'scheduled'
    ? 'bg-blue-100 text-blue-800'
    : 'bg-gray-100 text-gray-800';

const statusLabel = (status: string) =>
  status === 'published'
    ? 'Publié'
    : status === 'scheduled'
    ? 'Programmé'
    : 'Brouillon';

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

  // ----------- Nouvel header stylé -----------
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Nouveau Header ergonomique modernisé */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 rounded-2xl bg-gradient-to-tr from-white via-blue-50 to-blue-100 border border-blue-100 px-6 py-5 shadow-md animate-fade-in mb-2"
          style={{ minHeight: 70 }}
        >
          {/* Bouton retour façon "pill" foncé */}
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/admin/blog/posts')}
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition-colors duration-150 active:scale-95 text-base"
            style={{boxShadow: '0 2px 10px 0 rgba(34,41,47,0.08)'}}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Retour</span>
          </Button>
          {/* Bloc titre, status & infos */}
          <div className="flex flex-col md:flex-row md:items-center w-full min-w-0 gap-3 md:gap-6 justify-between">
            {/* Infos principales */}
            <div className="flex items-center gap-3 min-w-0">
              <span>
                <Badge className={'rounded-full text-xs font-semibold px-3 py-1 border-0 shadow ' + statusStyle(post.status)}>
                  {statusLabel(post.status)}
                </Badge>
              </span>
              <h1 className="font-extrabold text-2xl md:text-3xl text-gray-900 tracking-tight truncate ml-2">
                Modifier l&apos;article
              </h1>
            </div>
            {/* Infos additionnelles */}
            <div className="flex flex-wrap gap-3 items-center mt-1 md:mt-0 text-sm text-gray-500 font-medium">
              <span>
                {typeof post.views === 'number' ? `${post.views} vue${post.views > 1 ? 's' : ''}` : '0 vue'}
              </span>
              <span className="hidden md:inline text-gray-400">&#8226;</span>
              <span>
                Créé le{" "}
                {new Date(post.created_at).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
        </div>

        {/* Header actions */}
        <div className="flex items-center justify-end mb-2 gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/blog/${post.id}`)}
            className="font-medium"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Voir sur le site
          </Button>
          <Button 
            onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
            className="font-medium"
          >
            <Edit className="w-4 h-4 mr-2" />
            Éditer
          </Button>
        </div>

        {/* Contenu de l'article */}
        <Card>
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
