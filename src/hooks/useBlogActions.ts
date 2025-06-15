
import { useState } from 'react';
import { toast } from 'sonner';

export const useBlogActions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createArticle = async (articleData: any) => {
    setIsLoading(true);
    try {
      const existingArticles = JSON.parse(localStorage.getItem('blog_articles') || '[]');
      const newArticle = {
        id: Math.random().toString(36).substr(2, 9),
        ...articleData,
        status: 'draft',
        author: 'Admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        comments: []
      };

      const updatedArticles = [...existingArticles, newArticle];
      localStorage.setItem('blog_articles', JSON.stringify(updatedArticles));
      
      toast.success('Article créé avec succès');
      return newArticle;
    } catch (error) {
      toast.error('Erreur lors de la création de l\'article');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const publishArticle = async (articleId: string) => {
    setIsLoading(true);
    try {
      const articles = JSON.parse(localStorage.getItem('blog_articles') || '[]');
      const updatedArticles = articles.map((article: any) => 
        article.id === articleId 
          ? { ...article, status: 'published', publishedAt: new Date().toISOString() }
          : article
      );
      
      localStorage.setItem('blog_articles', JSON.stringify(updatedArticles));
      toast.success('Article publié avec succès');
    } catch (error) {
      toast.error('Erreur lors de la publication');
    } finally {
      setIsLoading(false);
    }
  };

  const saveDraft = async (articleData: any) => {
    setIsLoading(true);
    try {
      const articles = JSON.parse(localStorage.getItem('blog_articles') || '[]');
      const updatedArticles = articles.map((article: any) => 
        article.id === articleData.id 
          ? { ...articleData, updatedAt: new Date().toISOString() }
          : article
      );
      
      localStorage.setItem('blog_articles', JSON.stringify(updatedArticles));
      toast.success('Brouillon sauvegardé');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (articleId: string) => {
    setIsLoading(true);
    try {
      const articles = JSON.parse(localStorage.getItem('blog_articles') || '[]');
      const updatedArticles = articles.filter((article: any) => article.id !== articleId);
      
      localStorage.setItem('blog_articles', JSON.stringify(updatedArticles));
      toast.success('Article supprimé');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createArticle,
    publishArticle,
    saveDraft,
    deleteArticle,
    isLoading
  };
};
