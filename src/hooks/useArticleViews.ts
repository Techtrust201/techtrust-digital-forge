
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useArticleViews = () => {
  const [viewedArticles, setViewedArticles] = useState<Set<string>>(new Set());

  // Charger les articles déjà vus depuis le sessionStorage
  useEffect(() => {
    const viewedIds = sessionStorage.getItem('viewed_articles');
    if (viewedIds) {
      try {
        const parsedIds = JSON.parse(viewedIds);
        setViewedArticles(new Set(parsedIds));
      } catch (error) {
        console.error('Erreur parsing viewed articles:', error);
      }
    }
  }, []);

  const trackArticleView = async (articleId: string) => {
    // Vérifier si l'article a déjà été vu dans cette session
    if (viewedArticles.has(articleId)) {
      return; // Ne pas incrémenter si déjà vu
    }

    try {
      // Incrémenter le compteur de vues
      const { error } = await supabase.rpc('increment_article_views', {
        article_id: articleId
      });

      if (error) {
        console.error('Erreur incrémentation vues:', error);
        return;
      }

      // Marquer l'article comme vu dans cette session
      const newViewedArticles = new Set(viewedArticles);
      newViewedArticles.add(articleId);
      setViewedArticles(newViewedArticles);

      // Sauvegarder dans sessionStorage
      sessionStorage.setItem('viewed_articles', JSON.stringify([...newViewedArticles]));

      console.log(`Vue ajoutée pour l'article ${articleId}`);
    } catch (error) {
      console.error('Erreur tracking vue article:', error);
    }
  };

  return {
    trackArticleView,
    hasViewedArticle: (articleId: string) => viewedArticles.has(articleId)
  };
};
