
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
      <div className="flex min-h-screen flex-col bg-white">
        <NavbarPublic />
        <main>
          <div className="max-w-2xl mx-auto px-4 pt-12 pb-24">
            <Button
              size="sm"
              variant="outline"
              className="mb-8"
              onClick={() => navigate('/blog')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour au blog
            </Button>
            <div className="mb-5 flex flex-wrap gap-2">
              <Badge className="bg-red-50 text-red-700 border-red-200">
                {post.category}
              </Badge>
              <Badge variant="outline" className="text-gray-600">
                {post.views} vues
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex gap-6 mb-6 text-sm text-gray-500 flex-wrap">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {new Date(post.publish_date || post.created_at).toLocaleDateString('fr-FR')}
              </span>
            </div>
            {post.excerpt && (
              <blockquote className="italic bg-gray-50 border-l-4 border-red-300 px-4 py-3 mb-6 text-gray-800 rounded">
                {post.excerpt}
              </blockquote>
            )}
            <div className="prose prose-neutral max-w-none text-lg break-words whitespace-pre-line leading-relaxed">
              {post.content}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogPostPage;
