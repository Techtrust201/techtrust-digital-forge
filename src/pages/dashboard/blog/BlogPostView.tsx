
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowLeft, Eye, ExternalLink } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogData';
import { Skeleton } from '@/components/ui/skeleton';

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-red-100 text-red-700',
  'bg-green-100 text-green-700',
  'bg-yellow-100 text-yellow-800',
  'bg-purple-100 text-purple-800',
];

// Utilitaire simple pour l’avatar si tu n’as pas le champ photo dans post
function SimpleAvatar({ name }: { name: string }) {
  const initials = name.split(' ').map((n) => n[0] ?? '').join('').slice(0,2).toUpperCase();
  const color = AVATAR_COLORS[name.length % AVATAR_COLORS.length];
  return (
    <span className={`inline-flex justify-center items-center rounded-full h-10 w-10 ${color} font-bold shadow-sm ring-2 ring-white`}>
      {initials}
    </span>
  );
}

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
      <div className="flex flex-col items-center gap-7 py-8 px-2">
        {/* Header navigation */}
        <div className="flex w-full max-w-4xl justify-between items-center mb-4">
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

        <Card className="w-full max-w-3xl overflow-hidden border-none rounded-xl shadow-xl animate-fade-in">
          {/* Bandeau image de couverture (si dispo) */}
          {post.cover_image && (
            <div className="h-56 md:h-80 w-full bg-muted/30 overflow-hidden flex justify-center items-center">
              <img
                src={post.cover_image}
                alt={post.title}
                className="object-cover h-full w-full"
                loading="lazy"
              />
            </div>
          )}

          <CardContent className="p-6 md:p-10 bg-white/95">
            {/* Badges */}
            <div className="flex flex-wrap gap-3 items-center mb-6">
              <Badge className="bg-red-100 text-red-700 border-red-200 px-3 text-sm">
                {post.category}
              </Badge>
              <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50 px-3 text-sm">
                <Eye className="w-3 h-3 mr-1" />
                {post.views?.toLocaleString() || 0} vues
              </Badge>
            </div>

            {/* Titre */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight text-center">
              {post.title}
            </h1>

            {/* Citation/Extrait */}
            {post.excerpt && (
              <blockquote className="mx-auto max-w-xl italic relative text-lg text-blue-800 bg-blue-50 pl-6 pr-3 py-4 mb-7 border-l-4 border-blue-300 rounded">
                <span className="block">{post.excerpt}</span>
                <span className="absolute left-1 top-2 text-3xl text-blue-300 opacity-40 select-none">“</span>
              </blockquote>
            )}

            {/* Métadonnées auteur/date */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
                <SimpleAvatar name={post.author} />
                <span className="font-medium text-gray-800">{post.author}</span>
              </div>
              <span className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(post.publish_date || post.created_at).toLocaleDateString('fr-FR')}
              </span>
            </div>

            {/* Séparateur */}
            <div className="h-px w-full bg-gray-200 my-8" />

            {/* Contenu principal */}
            <div className="prose prose-lg max-w-none mx-auto text-gray-900 break-words whitespace-pre-line leading-relaxed" style={{ fontSize: '1.12rem' }}>
              {post.content}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BlogPostView;

