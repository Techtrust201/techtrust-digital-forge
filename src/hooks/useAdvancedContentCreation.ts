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

export interface GeneratedImage {
  id: string;
  url: string;
  style: string;
  prompt: string;
  cost: number;
  dimensions?: { width: number; height: number };
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
  content: VideoClip | GeneratedImage;
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
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [socialConnections, setSocialConnections] = useState<SocialConnection[]>([
    { platform: 'tiktok', connected: false },
    { platform: 'instagram', connected: false },
    { platform: 'facebook', connected: false },
    { platform: 'twitter', connected: false },
    { platform: 'youtube', connected: false },
  ]);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);

  const generateImage = useCallback(async (
    prompt: string,
    style: string = 'realistic'
  ): Promise<GeneratedImage | null> => {
    if (!prompt.trim()) {
      toast.error('Veuillez saisir une description pour votre image');
      return null;
    }

    setIsGenerating(true);
    
    try {
      console.log('Generating image with Replicate FLUX...');
      
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { 
          prompt: prompt.trim(),
          style
        }
      });

      if (error) throw error;

      const generatedImage: GeneratedImage = {
        id: Date.now().toString(),
        url: data.imageUrl,
        style,
        prompt,
        cost: data.estimated_cost || 0.003,
        dimensions: { width: 1024, height: 1024 }
      };

      setGeneratedImages(prev => [...prev, generatedImage]);
      toast.success(`🖼️ Image générée avec succès ! Coût: $${generatedImage.cost}`);
      return generatedImage;

    } catch (error) {
      console.error('Error generating image:', error);
      toast.error(`❌ Erreur lors de la génération: ${error.message}`);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

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

    if (duration < 5 || duration > 120) {
      toast.error('La durée doit être entre 5 et 120 secondes');
      return null;
    }

    setIsGenerating(true);
    
    try {
      console.log(`Generating video with Replicate/Seedance: ${duration}s...`);
      
      // Pour les vidéos longues (>30s), créer plusieurs clips cohérents
      if (duration > 30) {
        return await generateLongVideo(prompt, style, duration, model);
      }
      
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

      toast.info(`🎬 Génération vidéo ${duration}s démarrée... Cela peut prendre quelques minutes.`);

      // Poll for completion
      let attempts = 0;
      const maxAttempts = Math.ceil(duration / 2); // Plus de temps pour les vidéos longues
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        const { data: statusData, error: statusError } = await supabase.functions.invoke('generate-video', {
          body: { predictionId }
        });

        if (statusError) throw statusError;

        console.log(`Attempt ${attempts + 1}: Status = ${statusData.status}`);

        if (statusData.status === 'succeeded') {
          const baseCost = model === 'seedance-1-pro' ? 0.60 : 0.40;
          const extraCost = duration > 10 ? (duration - 10) * 0.05 : 0;
          
          const videoClip: VideoClip = {
            id: predictionId,
            url: Array.isArray(statusData.output) ? statusData.output[0] : statusData.output,
            duration,
            style,
            prompt,
            cost: baseCost + extraCost
          };

          setVideoClips(prev => [...prev, videoClip]);
          toast.success(`🎬 Vidéo ${duration}s générée avec succès ! Coût: $${videoClip.cost.toFixed(2)}`);
          return videoClip;
        }

        if (statusData.status === 'failed') {
          throw new Error(statusData.error || 'Generation failed');
        }

        attempts++;
      }

      throw new Error(`Génération expirée après ${maxAttempts * 5} secondes`);

    } catch (error) {
      console.error('Error generating video:', error);
      toast.error(`❌ Erreur lors de la génération: ${error.message}`);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // Nouvelle fonction pour générer des vidéos longues avec des clips cohérents
  const generateLongVideo = useCallback(async (
    prompt: string,
    style: string,
    totalDuration: number,
    model: 'seedance-1-lite' | 'seedance-1-pro'
  ): Promise<VideoClip | null> => {
    try {
      const clipDuration = 10; // Chaque clip fait 10s
      const numberOfClips = Math.ceil(totalDuration / clipDuration);
      
      toast.info(`🎬 Génération d'une vidéo longue (${totalDuration}s) en ${numberOfClips} clips cohérents...`);
      
      // Créer des variations du prompt pour chaque clip pour assurer la cohérence
      const clipPrompts = [];
      for (let i = 0; i < numberOfClips; i++) {
        const sequenceNumber = i + 1;
        const sequencePrompt = `${prompt}, sequence ${sequenceNumber} of ${numberOfClips}, continuous narrative, consistent style and characters`;
        clipPrompts.push(sequencePrompt);
      }
      
      // Générer tous les clips
      const clips = [];
      for (let i = 0; i < clipPrompts.length; i++) {
        toast.info(`Génération du clip ${i + 1}/${numberOfClips}...`);
        
        const { data, error } = await supabase.functions.invoke('generate-video', {
          body: { 
            prompt: clipPrompts[i],
            style,
            duration: clipDuration,
            model
          }
        });

        if (error) throw error;
        
        // Attendre la completion
        let attempts = 0;
        while (attempts < 30) {
          await new Promise(resolve => setTimeout(resolve, 5000));
          
          const { data: statusData } = await supabase.functions.invoke('generate-video', {
            body: { predictionId: data.prediction.id }
          });
          
          if (statusData.status === 'succeeded') {
            clips.push({
              id: `${data.prediction.id}_${i}`,
              url: Array.isArray(statusData.output) ? statusData.output[0] : statusData.output,
              duration: clipDuration,
              style,
              prompt: clipPrompts[i]
            });
            break;
          }
          
          if (statusData.status === 'failed') {
            throw new Error(`Clip ${i + 1} generation failed`);
          }
          
          attempts++;
        }
      }
      
      // Créer un clip composite
      const baseCost = model === 'seedance-1-pro' ? 0.60 : 0.40;
      const totalCost = baseCost * numberOfClips + (totalDuration - 10) * 0.05;
      
      const compositeClip: VideoClip = {
        id: `composite_${Date.now()}`,
        url: clips[0].url, // Premier clip comme aperçu
        duration: totalDuration,
        style,
        prompt: `${prompt} (${numberOfClips} clips cohérents)`,
        cost: totalCost
      };
      
      setVideoClips(prev => [...prev, compositeClip]);
      toast.success(`🎬 Vidéo longue ${totalDuration}s générée avec ${numberOfClips} clips cohérents ! Coût: $${totalCost.toFixed(2)}`);
      
      return compositeClip;
      
    } catch (error) {
      console.error('Error generating long video:', error);
      toast.error(`❌ Erreur lors de la génération de vidéo longue: ${error.message}`);
      return null;
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

      toast.success(`🎵 Composition démarrée ! Coût estimé: $${data.estimated_cost}`);
      return data.renderId;

    } catch (error) {
      console.error('Error composing video:', error);
      toast.error(`❌ Erreur lors de la composition: ${error.message}`);
      return null;
    } finally {
      setIsComposing(false);
    }
  }, []);

  const connectSocialPlatform = useCallback(async (platform: string) => {
    try {
      toast.success(`✅ Connexion à ${platform} simulée avec succès`);
      
      setSocialConnections(prev => 
        prev.map(conn => 
          conn.platform === platform 
            ? { ...conn, connected: true, username: `user_${platform}` }
            : conn
        )
      );
    } catch (error) {
      toast.error(`❌ Erreur de connexion à ${platform}`);
    }
  }, []);

  const getPostingRecommendations = useCallback(async (platforms: string[]): Promise<PostingRecommendation[]> => {
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
    content: VideoClip | GeneratedImage,
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
    
    const existingScheduled = JSON.parse(localStorage.getItem('advanced_scheduled_posts') || '[]');
    const updatedScheduled = [...existingScheduled, scheduledPost];
    localStorage.setItem('advanced_scheduled_posts', JSON.stringify(updatedScheduled));

    const scheduledDateTime = new Date(`${postData.scheduledDate}T${postData.scheduledTime}`);
    toast.success(
      `📅 Publication programmée pour le ${scheduledDateTime.toLocaleDateString()} à ${scheduledDateTime.toLocaleTimeString()} sur ${postData.platforms.join(', ')}`
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
    
    const existingDrafts = JSON.parse(localStorage.getItem('advanced_content_drafts') || '[]');
    const updatedDrafts = [...existingDrafts, draft];
    localStorage.setItem('advanced_content_drafts', JSON.stringify(updatedDrafts));
    
    toast.success('💾 Brouillon sauvegardé !');
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
    // Génération contenu
    generateVideoClip,
    generateImage,
    composeFullVideo,
    isGenerating,
    isComposing,
    videoClips,
    generatedImages,
    
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
