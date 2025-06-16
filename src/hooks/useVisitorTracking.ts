
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VisitorData {
  sessionId: string;
  deviceType: string;
  browser: string;
  location: string;
  referrer: string;
  userAgent: string;
  screenResolution: string;
  language: string;
  timezone: string;
  visitedPages: string[];
  sessionStart: string;
  lastActivity: string;
}

export const useVisitorTracking = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Vérifier si les cookies ont été acceptés
  useEffect(() => {
    const accepted = localStorage.getItem('techtrust_cookies_accepted');
    const cookieStatus = accepted === 'true';
    setCookiesAccepted(cookieStatus);
    
    if (cookieStatus) {
      initializeTracking();
    }
    setIsInitialized(true);
  }, []);

  const acceptCookies = async () => {
    localStorage.setItem('techtrust_cookies_accepted', 'true');
    setCookiesAccepted(true);
    await initializeTracking();
  };

  const declineCookies = () => {
    localStorage.setItem('techtrust_cookies_accepted', 'false');
    setCookiesAccepted(false);
    // Nettoyer les données existantes
    sessionStorage.removeItem('techtrust_session_id');
    setVisitorData(null);
  };

  const initializeTracking = async () => {
    try {
      const sessionId = getOrCreateSessionId();
      const data = await collectVisitorData(sessionId);
      setVisitorData(data);
      
      // Sauvegarder les données initiales
      await saveVisitorData(data);
    } catch (error) {
      console.error('Erreur initialisation tracking:', error);
    }
  };

  const getOrCreateSessionId = (): string => {
    let sessionId = sessionStorage.getItem('techtrust_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('techtrust_session_id', sessionId);
    }
    return sessionId;
  };

  const detectDeviceType = (): string => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone/.test(userAgent)) {
      return 'mobile';
    }
    if (/tablet|ipad/.test(userAgent)) {
      return 'tablet';
    }
    return 'desktop';
  };

  const detectBrowser = (): string => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
    if (userAgent.includes('Edg')) return 'Edge';
    return 'Other';
  };

  const getApproximateLocation = async (): Promise<string> => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('Location API failed');
      const data = await response.json();
      return `${data.city || 'Unknown'}, ${data.country_name || 'Unknown'}`;
    } catch {
      return 'Unknown';
    }
  };

  const collectVisitorData = async (sessionId: string): Promise<VisitorData> => {
    const location = await getApproximateLocation();
    
    return {
      sessionId,
      deviceType: detectDeviceType(),
      browser: detectBrowser(),
      location,
      referrer: document.referrer || 'Direct',
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      visitedPages: [window.location.pathname],
      sessionStart: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
    };
  };

  const trackPageView = async (pagePath: string, pageTitle?: string) => {
    if (!cookiesAccepted || !visitorData || !isInitialized) {
      console.log('Tracking non autorisé ou non initialisé');
      return;
    }

    try {
      // Mettre à jour les pages visitées
      const updatedVisitorData = {
        ...visitorData,
        visitedPages: [...new Set([...visitorData.visitedPages, pagePath])],
        lastActivity: new Date().toISOString(),
      };
      setVisitorData(updatedVisitorData);

      // Sauvegarder l'événement de page vue
      const { error } = await supabase.from('user_analytics').insert({
        user_id: visitorData.sessionId,
        event_type: 'page_view',
        page_url: pagePath,
        device_type: visitorData.deviceType,
        browser: visitorData.browser,
        location: visitorData.location,
        session_duration: Math.floor((Date.now() - new Date(visitorData.sessionStart).getTime()) / 1000),
      });

      if (error) {
        console.error('Erreur sauvegarde page vue:', error);
      } else {
        console.log(`Page vue trackée: ${pagePath}`);
      }
    } catch (error) {
      console.error('Erreur tracking page vue:', error);
    }
  };

  const trackBlogPostView = async (postId: string, postTitle: string) => {
    if (!cookiesAccepted || !isInitialized) {
      console.log('Tracking blog non autorisé');
      return;
    }

    try {
      // Vérifier si on a déjà vu cet article dans cette session
      const viewedKey = `blog_viewed_${postId}`;
      const alreadyViewed = sessionStorage.getItem(viewedKey);
      
      if (alreadyViewed) {
        console.log('Article déjà vu dans cette session');
        return;
      }

      // Marquer comme vu dans cette session
      sessionStorage.setItem(viewedKey, 'true');

      // Incrémenter les vues dans la base de données
      const { data: currentPost, error: fetchError } = await supabase
        .from('blog_posts')
        .select('views')
        .eq('id', postId)
        .single();

      if (fetchError) {
        console.error('Erreur récupération article:', fetchError);
        return;
      }

      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ views: (currentPost?.views || 0) + 1 })
        .eq('id', postId);

      if (updateError) {
        console.error('Erreur incrémentation vues:', updateError);
        return;
      }

      // Tracker l'événement
      await trackPageView(`/blog/${postId}`, postTitle);

      console.log(`Vue article trackée: ${postTitle} (nouvelles vues: ${(currentPost?.views || 0) + 1})`);
    } catch (error) {
      console.error('Erreur tracking article:', error);
    }
  };

  const saveVisitorData = async (data: VisitorData) => {
    try {
      const { error } = await supabase.from('user_analytics').insert({
        user_id: data.sessionId,
        event_type: 'session_start',
        device_type: data.deviceType,
        browser: data.browser,
        location: data.location,
        session_duration: 0,
      });

      if (error) {
        console.error('Erreur sauvegarde données visiteur:', error);
      }
    } catch (error) {
      console.error('Erreur sauvegarde données visiteur:', error);
    }
  };

  return {
    cookiesAccepted,
    visitorData,
    isInitialized,
    acceptCookies,
    declineCookies,
    trackPageView,
    trackBlogPostView,
  };
};
