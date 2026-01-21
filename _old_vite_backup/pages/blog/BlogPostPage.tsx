import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogData';
import { Skeleton } from '@/components/ui/skeleton';
import BlogPostSEO from '@/components/blog/BlogPostSEO';
import BlogPostHero from '@/components/blog/BlogPostHero';

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
            <h2 className="text-2xl font-semibold text-red-800 mb-6">
              Erreur lors du chargement de l'article
            </h2>
            <p className="text-gray-600">{error.message}</p>
            <Button className="mt-6" onClick={() => navigate("/blog")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour au blog
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const post = posts?.find((p) => p.id === id);

  if (!post) {
    return (
      <>
        <NavbarPublic />
        <main>
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold mb-3 text-red-700">
              Article introuvable
            </h1>
            <p className="text-gray-600 mb-6">
              L'article recherché n'existe pas ou a été supprimé.
            </p>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => navigate("/blog")}
            >
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
        <main className="flex-grow flex items-center justify-center py-10 md:py-16 bg-white/95">
          <div className="w-full max-w-3xl mx-auto">
            <BlogPostHero
              title={post.title}
              author={post.author}
              category={post.category}
              views={post.views}
              date={new Date(post.publish_date ?? post.created_at).toLocaleDateString("fr-FR")}
              excerpt={post.excerpt}
            />
            <div
              className="prose prose-lg max-w-none mx-auto px-2 sm:px-4 md:px-8 pb-12 text-gray-900 bg-white/95 rounded-2xl shadow-2xl border border-gray-200 animate-fade-in"
              style={{
                fontSize: "1.12rem",
                lineHeight: "1.7",
                letterSpacing: "0.01em",
                minHeight: 180,
              }}
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
            <div className="flex justify-start mt-8 mx-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate("/blog")}
                className="bg-gray-50 hover:bg-gray-100 border-gray-200 font-medium transition-all shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au blog
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogPostPage;
