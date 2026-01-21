
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface ContentDraft {
  id: number;
  type: 'video' | 'image';
  prompt: string;
  description: string;
  hashtags: string;
  duration?: string;
  style: string;
  platforms: string[];
  scheduledDate?: string;
  scheduledTime?: string;
  generatedContent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedContent {
  url: string;
  type: 'video' | 'image';
  filename: string;
  duration?: number;
  dimensions?: { width: number; height: number };
}

export const useContentCreation = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [drafts, setDrafts] = useState<ContentDraft[]>([]);
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([]);

  const generateContent = useCallback(async (
    type: 'video' | 'image',
    prompt: string,
    options: {
      duration?: string;
      style: string;
    }
  ): Promise<GeneratedContent | null> => {
    if (!prompt.trim()) {
      toast.error('Veuillez saisir une description pour votre contenu');
      return null;
    }

    setIsGenerating(true);
    
    try {
      // Simulation d'appel API pour génération IA
      const delay = type === 'video' ? 5000 : 3000; // Vidéo prend plus de temps
      await new Promise(resolve => setTimeout(resolve, delay));
      
      const timestamp = Date.now();
      const generatedContent: GeneratedContent = {
        url: `https://example.com/generated/${type}_${timestamp}.${type === 'video' ? 'mp4' : 'jpg'}`,
        type,
        filename: `${type}_${timestamp}.${type === 'video' ? 'mp4' : 'jpg'}`,
        ...(type === 'video' && { duration: parseInt(options.duration || '30') }),
        ...(type === 'image' && { dimensions: { width: 1080, height: 1080 } })
      };
      
      toast.success(`${type === 'video' ? 'Vidéo' : 'Image'} générée avec succès !`);
      return generatedContent;
    } catch (error) {
      toast.error('Erreur lors de la génération du contenu');
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const generateDescription = useCallback(async (prompt: string, contentType: 'video' | 'image') => {
    if (!prompt.trim()) {
      toast.error('Veuillez d\'abord saisir une description du contenu');
      return { description: '', hashtags: '' };
    }

    try {
      // Simulation d'appel API pour génération de description et hashtags
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const descriptions = {
        video: `🎥 Découvrez ${prompt.toLowerCase()} dans cette vidéo captivante ! Une expérience visuelle qui va vous marquer. À ne pas manquer !`,
        image: `📸 ${prompt} - Une image qui en dit long ! Laissez-vous inspirer par cette création unique.`
      };

      const commonHashtags = ['#viral', '#trending', '#amazing', '#discover', '#unique', '#content'];
      const typeSpecificHashtags = {
        video: ['#video', '#reels', '#tiktok', '#youtube', '#watch'],
        image: ['#photo', '#art', '#design', '#visual', '#instagram']
      };

      const allHashtags = [...commonHashtags, ...typeSpecificHashtags[contentType]];
      const selectedHashtags = allHashtags.slice(0, 8).join(' ');
      
      toast.success('Description et hashtags générés !');
      return {
        description: descriptions[contentType],
        hashtags: selectedHashtags
      };
    } catch (error) {
      toast.error('Erreur lors de la génération de la description');
      return { description: '', hashtags: '' };
    }
  }, []);

  const saveDraft = useCallback((draftData: Omit<ContentDraft, 'id' | 'createdAt' | 'updatedAt'>) => {
    const draft: ContentDraft = {
      ...draftData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setDrafts(prev => [...prev, draft]);
    
    // Sauvegarder dans localStorage
    const existingDrafts = JSON.parse(localStorage.getItem('content_drafts') || '[]');
    const updatedDrafts = [...existingDrafts, draft];
    localStorage.setItem('content_drafts', JSON.stringify(updatedDrafts));
    
    toast.success('Brouillon sauvegardé !');
    return draft.id;
  }, []);

  const loadDrafts = useCallback(() => {
    try {
      const savedDrafts = JSON.parse(localStorage.getItem('content_drafts') || '[]');
      setDrafts(savedDrafts);
    } catch (error) {
      console.error('Erreur lors du chargement des brouillons:', error);
    }
  }, []);

  const deleteDraft = useCallback((draftId: number) => {
    setDrafts(prev => prev.filter(draft => draft.id !== draftId));
    
    const existingDrafts = JSON.parse(localStorage.getItem('content_drafts') || '[]');
    const updatedDrafts = existingDrafts.filter((draft: ContentDraft) => draft.id !== draftId);
    localStorage.setItem('content_drafts', JSON.stringify(updatedDrafts));
    
    toast.success('Brouillon supprimé');
  }, []);

  const schedulePost = useCallback((
    content: GeneratedContent,
    postData: {
      description: string;
      hashtags: string;
      platforms: string[];
      scheduledDate: string;
      scheduledTime: string;
    }
  ) => {
    if (!postData.scheduledDate || !postData.scheduledTime) {
      toast.error('Veuillez définir une date et heure de publication');
      return false;
    }

    if (postData.platforms.length === 0) {
      toast.error('Veuillez sélectionner au moins une plateforme');
      return false;
    }

    const scheduledPost = {
      id: Date.now(),
      content,
      ...postData,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    setScheduledPosts(prev => [...prev, scheduledPost]);
    
    const existingScheduled = JSON.parse(localStorage.getItem('scheduled_posts') || '[]');
    const updatedScheduled = [...existingScheduled, scheduledPost];
    localStorage.setItem('scheduled_posts', JSON.stringify(updatedScheduled));

    const scheduledDateTime = new Date(`${postData.scheduledDate}T${postData.scheduledTime}`);
    toast.success(
      `Publication programmée pour le ${scheduledDateTime.toLocaleDateString()} à ${scheduledDateTime.toLocaleTimeString()} sur ${postData.platforms.join(', ')}`
    );
    
    return true;
  }, []);

  const publishNow = useCallback((
    content: GeneratedContent,
    postData: {
      description: string;
      hashtags: string;
      platforms: string[];
    }
  ) => {
    if (postData.platforms.length === 0) {
      toast.error('Veuillez sélectionner au moins une plateforme');
      return false;
    }

    // Simulation de publication
    toast.success(`Contenu publié immédiatement sur ${postData.platforms.join(', ')} !`);
    
    const publishedPost = {
      id: Date.now(),
      content,
      ...postData,
      status: 'published',
      publishedAt: new Date().toISOString()
    };

    // Sauvegarder l'historique de publication
    const existingPublished = JSON.parse(localStorage.getItem('published_posts') || '[]');
    const updatedPublished = [...existingPublished, publishedPost];
    localStorage.setItem('published_posts', JSON.stringify(updatedPublished));
    
    return true;
  }, []);

  return {
    generateContent,
    generateDescription,
    saveDraft,
    loadDrafts,
    deleteDraft,
    schedulePost,
    publishNow,
    isGenerating,
    drafts,
    scheduledPosts
  };
};
