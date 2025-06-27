
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface VideoClip {
  id: string;
  url: string;
  duration: number;
  style: string;
  prompt: string;
  cost: number;
}

export interface SocialConnection {
  platform: 'tiktok' | 'instagram' | 'facebook' | 'twitter' | 'youtube';
  connected: boolean;
  username?: string;
  accessToken?: string;
}

export interface PostingRecommendation {
  platform: string;
  bestTimes: string[];
  bestDays: string[];
  engagement_rate: number;
  reasoning: string;
}

export interface ScheduledPost {
  id: string;
  content: VideoClip;
  description: string;
  hashtags: string;
  platforms: string[];
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'posted' | 'failed';
  recommendations?: PostingRecommendation[];
}

export const useAdvancedContentCreation = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [videoClips, setVideoClips] = useState<VideoClip[]>([]);
  const [socialConnections, setSocialConnections] = useState<SocialConnection[]>([
    { platform: 'tiktok', connected: false },
    { platform: 'instagram', connected: false },
    { platform: 'facebook', connected: false },
    { platform: 'twitter', connected: false },
    { platform: 'youtube', connected: false },
  ]);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);

  const generateVideoClip = useCallback(async (
    prompt: string,
    style: string = 'realistic',
    duration: number = 10,
    model: 'seedance-1-lite' | 'seedance-1-pro' = 'seedance-1-lite'
  ): Promise<VideoClip | null> => {
    if (!prompt.trim()) {
      toast.error('Veuillez saisir une description pour votre vidéo');
      return null;
    }

    setIsGenerating(true);
    
    try {
      console.log('Generating video with Replicate/Seedance...');
      
      const { data, error } = await supabase.functions.invoke('generate-video', {
        body: { 
          prompt: prompt.trim(),
          style,
          duration,
          model
        }
      });

      if (error) throw error;

      const predictionId = data.prediction?.id;
      if (!predictionId) {
        throw new Error('No prediction ID received');
      }

      // Poll for completion
      let attempts = 0;
      const maxAttempts = 60; // 5 minutes max
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
        
        const { data: statusData, error: statusError } = await supabase.functions.invoke('generate-video', {
          body: { predictionId }
        });

        if (statusError) throw statusError;

        console.log(`Attempt ${attempts + 1}: Status = ${statusData.status}`);

        if (statusData.status === 'succeeded') {
          const videoClip: VideoClip = {
            id: predictionId,
            url: Array.isArray(statusData.output) ? statusData.output[0] : statusData.output,
            duration,
            style,
            prompt,
            cost: data.estimated_cost || (model === 'seedance-1-pro' ? 0.60 : 0.40)
          };

          setVideoClips(prev => [...prev, videoClip]);
          toast.success(`Vidéo ${duration}s générée avec succès ! Coût: $${videoClip.cost}`);
          return videoClip;
        }

        if (statusData.status === 'failed') {
          throw new Error(statusData.error || 'Generation failed');
        }

        attempts++;
      }

      throw new Error('Génération expirée après 5 minutes');

    } catch (error) {
      console.error('Error generating video:', error);
      toast.error(`Erreur lors de la génération: ${error.message}`);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const composeFullVideo = useCallback(async (
    clips: VideoClip[],
    options: {
      subtitles?: Array<{ text: string; start: number; duration: number }>;
      music?: { url: string; title: string };
      tts?: boolean;
    } = {}
  ) => {
    if (clips.length === 0) {
      toast.error('Aucun clip vidéo à composer');
      return null;
    }

    setIsComposing(true);

    try {
      console.log('Composing full video with Shotstack...');
      
      const { data, error } = await supabase.functions.invoke('compose-video', {
        body: {
          videoClips: clips,
          subtitles: options.subtitles,
          music: options.music,
          tts: options.tts
        }
      });

      if (error) throw error;

      toast.success(`Composition démarrée ! Coût estimé: $${data.estimated_cost}`);
      return data.renderId;

    } catch (error) {
      console.error('Error composing video:', error);
      toast.error(`Erreur lors de la composition: ${error.message}`);
      return null;
    } finally {
      setIsComposing(false);
    }
  }, []);

  const connectSocialPlatform = useCallback(async (platform: string) => {
    // Simulation de connexion OAuth - à implémenter avec les vraies APIs
    try {
      // Ici on implémenterait la vraie connexion OAuth pour chaque plateforme
      toast.success(`Connexion à ${platform} simulée avec succès`);
      
      setSocialConnections(prev => 
        prev.map(conn => 
          conn.platform === platform 
            ? { ...conn, connected: true, username: `user_${platform}` }
            : conn
        )
      );
    } catch (error) {
      toast.error(`Erreur de connexion à ${platform}`);
    }
  }, []);

  const getPostingRecommendations = useCallback(async (platforms: string[]): Promise<PostingRecommendation[]> => {
    // Recommandations basées sur les données d'engagement
    const recommendations: PostingRecommendation[] = platforms.map(platform => {
      switch (platform) {
        case 'tiktok':
          return {
            platform: 'TikTok',
            bestTimes: ['18:00-20:00', '21:00-23:00'],
            bestDays: ['Mardi', 'Jeudi', 'Vendredi'],
            engagement_rate: 0.18,
            reasoning: 'Pic d\'audience jeune en soirée, contenu viral optimal'
          };
        case 'instagram':
          return {
            platform: 'Instagram',
            bestTimes: ['11:00-13:00', '17:00-19:00'],
            bestDays: ['Mercredi', 'Vendredi', 'Dimanche'],
            engagement_rate: 0.12,
            reasoning: 'Pause déjeuner et fin de journée, visuels de qualité'
          };
        case 'facebook':
          return {
            platform: 'Facebook',
            bestTimes: ['13:00-15:00', '20:00-21:00'],
            bestDays: ['Mercredi', 'Jeudi', 'Samedi'],
            engagement_rate: 0.08,
            reasoning: 'Audience plus mature, contenu informatif privilégié'
          };
        case 'twitter':
          return {
            platform: 'Twitter',
            bestTimes: ['12:00-15:00', '17:00-18:00'],
            bestDays: ['Mardi', 'Mercredi', 'Jeudi'],
            engagement_rate: 0.045,
            reasoning: 'Heures de bureau, actualités et discussions'
          };
        default:
          return {
            platform: platform,
            bestTimes: ['12:00-14:00'],
            bestDays: ['Lundi', 'Mercredi', 'Vendredi'],
            engagement_rate: 0.06,
            reasoning: 'Recommandations génériques'
          };
      }
    });

    return recommendations;
  }, []);

  const schedulePost = useCallback(async (
    content: VideoClip,
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

    const recommendations = await getPostingRecommendations(postData.platforms);

    const scheduledPost: ScheduledPost = {
      id: Date.now().toString(),
      content,
      ...postData,
      status: 'scheduled',
      recommendations
    };

    setScheduledPosts(prev => [...prev, scheduledPost]);
    
    // Sauvegarder en localStorage
    const existingScheduled = JSON.parse(localStorage.getItem('advanced_scheduled_posts') || '[]');
    const updatedScheduled = [...existingScheduled, scheduledPost];
    localStorage.setItem('advanced_scheduled_posts', JSON.stringify(updatedScheduled));

    const scheduledDateTime = new Date(`${postData.scheduledDate}T${postData.scheduledTime}`);
    toast.success(
      `Publication programmée pour le ${scheduledDateTime.toLocaleDateString()} à ${scheduledDateTime.toLocaleTimeString()} sur ${postData.platforms.join(', ')}`
    );
    
    return true;
  }, [getPostingRecommendations]);

  const saveDraft = useCallback((draftData: any) => {
    const draft = {
      ...draftData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setDrafts(prev => [...prev, draft]);
    
    // Sauvegarder dans localStorage
    const existingDrafts = JSON.parse(localStorage.getItem('advanced_content_drafts') || '[]');
    const updatedDrafts = [...existingDrafts, draft];
    localStorage.setItem('advanced_content_drafts', JSON.stringify(updatedDrafts));
    
    toast.success('Brouillon sauvegardé avec les nouvelles fonctionnalités !');
    return draft.id;
  }, []);

  const loadDrafts = useCallback(() => {
    try {
      const savedDrafts = JSON.parse(localStorage.getItem('advanced_content_drafts') || '[]');
      setDrafts(savedDrafts);
      
      const savedScheduled = JSON.parse(localStorage.getItem('advanced_scheduled_posts') || '[]');
      setScheduledPosts(savedScheduled);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  }, []);

  return {
    // Génération vidéo
    generateVideoClip,
    composeFullVideo,
    isGenerating,
    isComposing,
    videoClips,
    
    // Réseaux sociaux
    socialConnections,
    connectSocialPlatform,
    
    // Recommandations
    getPostingRecommendations,
    
    // Programmation
    schedulePost,
    scheduledPosts,
    
    // Brouillons
    saveDraft,
    loadDrafts,
    drafts
  };
};
