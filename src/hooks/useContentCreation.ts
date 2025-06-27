
import { useState } from 'react';
import { toast } from 'sonner';

export interface ContentItem {
  id: string;
  type: 'video' | 'image';
  title: string;
  description: string;
  content?: string;
  duration?: string;
  status: 'draft' | 'scheduled' | 'published';
  platforms: string[];
  scheduledDate?: string;
  createdAt: string;
  thumbnail?: string;
  stats: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

export const useContentCreation = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const generateContent = async (contentData: {
    type: 'video' | 'image';
    subject: string;
    duration?: number;
    style: string;
    keywords: string[];
    instructions?: string;
    platforms: string[];
  }) => {
    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Simulation de génération progressive
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Simulation d'appel API IA
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      clearInterval(progressInterval);
      setGenerationProgress(100);

      // Sauvegarder le contenu généré
      const existingContent = JSON.parse(localStorage.getItem('created_content') || '[]');
      const newContent: ContentItem = {
        id: Math.random().toString(36).substr(2, 9),
        type: contentData.type,
        title: `${contentData.subject} - ${contentData.type === 'video' ? 'Vidéo' : 'Image'} IA`,
        description: `Contenu généré par IA sur le thème : ${contentData.subject}. Style ${contentData.style}. #${contentData.keywords.join(' #')}`,
        duration: contentData.type === 'video' ? `${Math.floor(contentData.duration! / 60)}:${(contentData.duration! % 60).toString().padStart(2, '0')}` : undefined,
        status: 'draft',
        platforms: contentData.platforms,
        createdAt: new Date().toISOString(),
        thumbnail: '/placeholder.svg',
        stats: { views: 0, likes: 0, comments: 0, shares: 0 }
      };

      const updatedContent = [...existingContent, newContent];
      localStorage.setItem('created_content', JSON.stringify(updatedContent));

      toast.success(`${contentData.type === 'video' ? 'Vidéo' : 'Image'} générée avec succès !`);
      return newContent;
    } catch (error) {
      toast.error('Erreur lors de la génération du contenu');
      throw error;
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  const scheduleContent = async (contentId: string, scheduledDate: string, platforms: string[]) => {
    try {
      const existingContent = JSON.parse(localStorage.getItem('created_content') || '[]');
      const updatedContent = existingContent.map((item: ContentItem) => 
        item.id === contentId 
          ? { ...item, status: 'scheduled', scheduledDate, platforms }
          : item
      );
      
      localStorage.setItem('created_content', JSON.stringify(updatedContent));
      toast.success('Contenu programmé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la programmation');
    }
  };

  const publishContent = async (contentId: string, platforms: string[]) => {
    try {
      const existingContent = JSON.parse(localStorage.getItem('created_content') || '[]');
      const updatedContent = existingContent.map((item: ContentItem) => 
        item.id === contentId 
          ? { 
              ...item, 
              status: 'published', 
              platforms,
              stats: {
                views: Math.floor(Math.random() * 10000) + 1000,
                likes: Math.floor(Math.random() * 500) + 50,
                comments: Math.floor(Math.random() * 100) + 10,
                shares: Math.floor(Math.random() * 50) + 5
              }
            }
          : item
      );
      
      localStorage.setItem('created_content', JSON.stringify(updatedContent));
      toast.success('Contenu publié avec succès');
    } catch (error) {
      toast.error('Erreur lors de la publication');
    }
  };

  const generateDescription = async (contentType: 'video' | 'image', subject: string, style: string, platforms: string[]) => {
    try {
      // Simulation de génération de description avec hashtags
      const baseDescriptions = {
        video: `Découvrez ${subject} dans cette vidéo ${style} ! 🎥`,
        image: `${subject} - Une image ${style} qui inspire ! 📸`
      };

      const platformHashtags = {
        tiktok: ['#fyp', '#viral', '#tiktok', '#trending'],
        instagram: ['#instagram', '#insta', '#reels', '#explore'],
        youtube: ['#youtube', '#shorts', '#video', '#content'],
        facebook: ['#facebook', '#social', '#share', '#community'],
        twitter: ['#twitter', '#tweet', '#viral', '#trending']
      };

      let hashtags: string[] = [];
      platforms.forEach(platform => {
        if (platformHashtags[platform as keyof typeof platformHashtags]) {
          hashtags = [...hashtags, ...platformHashtags[platform as keyof typeof platformHashtags]];
        }
      });

      // Ajouter des hashtags liés au sujet
      const subjectTags = subject.toLowerCase().split(' ').map(word => `#${word}`);
      hashtags = [...new Set([...hashtags, ...subjectTags])]; // Supprimer les doublons

      const description = `${baseDescriptions[contentType]} ${hashtags.slice(0, 10).join(' ')}`;
      
      toast.success('Description générée avec l\'IA');
      return description;
    } catch (error) {
      toast.error('Erreur lors de la génération de la description');
      return '';
    }
  };

  return {
    generateContent,
    scheduleContent,
    publishContent,
    generateDescription,
    isGenerating,
    generationProgress
  };
};
