
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogData';
import { Skeleton } from '@/components/ui/skeleton';
import BlogPostSEO from '@/components/blog/BlogPostSEO';

// Utilitaire avatar couleur
const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-red-100 text-red-700',
  'bg-green-100 text-green-700',
  'bg-yellow-100 text-yellow-800',
  'bg-purple-100 text-purple-800',
];
function SimpleAvatar({ name }: { name: string }) {
  const initials = name.split(' ').map((n) => n[0] ?? '').join('').slice(0,2).toUpperCase();
  const color = AVATAR_COLORS[name.length % AVATAR_COLORS.length];
  return (
    <span className={`inline-flex justify-center items-center rounded-full h-11 w-11 ${color} font-bold shadow ring-2 ring-white`}>
      {initials}
    </span>
  );
}

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=900&q=80';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: posts, isLoading, error } = useBlogPosts();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <>
        <NavbarPublic />
        <main>
          <div className="container mx-auto px-4 py-16">
            <Skeleton className="h-12 w-4/5 max-w-2xl mb-8" />
            <Skeleton className="w-full h-80 mb-8" />
            <Skeleton className="w-full h-40" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavbarPublic />
        <main>
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-semibold text-red-800 mb-6">Erreur lors du chargement de l'article</h2>
            <p className="text-gray-600">{error.message}</p>
            <Button className="mt-6" onClick={() => navigate('/blog')}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour au blog
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const post = posts?.find(p => p.id === id);

  if (!post) {
    return (
      <>
        <NavbarPublic />
        <main>
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold mb-3 text-red-700">Article introuvable</h1>
            <p className="text-gray-600 mb-6">
              L'article recherché n'existe pas ou a été supprimé.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => navigate('/blog')}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour au blog
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <BlogPostSEO post={post} />
      <div className="min-h-screen flex flex-col bg-white/95">
        <NavbarPublic />
        <main className="flex-grow">
          <div className="max-w-3xl mx-auto px-2 pt-10 pb-20 flex flex-col gap-7 items-center">
            {/* Cover image */}
            <div className="w-full h-56 md:h-80 overflow-hidden rounded-3xl shadow-lg bg-gray-100 flex items-center justify-center mb-2">
              <img
                src={DEFAULT_COVER}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ objectPosition: 'center', objectFit: 'cover' }}
              />
            </div>
            {/* Card content */}
            <section className="w-full bg-white rounded-2xl shadow-xl px-4 py-8 md:px-10 flex flex-col gap-7 relative z-10 animate-fade-in">
              {/* Catégorie + vues */}
              <div className="flex gap-3 items-center flex-wrap mb-3">
                <Badge className="bg-red-100 text-red-800 border-red-200 px-3 text-sm">{post.category}</Badge>
                <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50 px-3 text-sm">
                  {post.views?.toLocaleString() || 0} vues
                </Badge>
              </div>
              {/* Titre */}
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight text-center">{post.title}</h1>
              {/* Metadonnées */}
              <div className="flex flex-wrap justify-center items-center gap-5 mb-3">
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
                  <SimpleAvatar name={post.author} />
                  <span className="font-medium text-gray-800">{post.author}</span>
                </div>
                <span className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publish_date ?? post.created_at).toLocaleDateString('fr-FR')}
                </span>
              </div>
              {/* Blockquote/extrait si disponible */}
              {post.excerpt && (
                <blockquote className="mx-auto max-w-xl italic relative text-lg text-blue-800 bg-blue-50 pl-6 pr-3 py-4 mb-3 border-l-4 border-blue-300 rounded overflow-hidden">
                  <span className="block">{post.excerpt}</span>
                  <span className="absolute left-1 top-2 text-3xl text-blue-300 opacity-40 select-none">“</span>
                </blockquote>
              )}
              {/* Contenu principal */}
              <div className="prose prose-lg max-w-none mx-auto text-gray-900 break-words whitespace-pre-line leading-relaxed" style={{ fontSize: '1.12rem' }}>
                {post.content}
              </div>
              <div className="flex justify-start mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate('/blog')}
                  className="bg-gray-50 hover:bg-gray-100 border-gray-200 font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour au blog
                </Button>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogPostPage;
