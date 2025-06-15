import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useBetterAuth } from '@/hooks/useBetterAuth';

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
  const { session, user } = useBetterAuth();

  // Vérifier si les cookies ont été acceptés
  useEffect(() => {
    const accepted = localStorage.getItem('techtrust_cookies_accepted');
    if (accepted === 'true') {
      setCookiesAccepted(true);
      initializeTracking();
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('techtrust_cookies_accepted', 'true');
    setCookiesAccepted(true);
    initializeTracking();
  };

  const declineCookies = () => {
    localStorage.setItem('techtrust_cookies_accepted', 'false');
    setCookiesAccepted(false);
  };

  const initializeTracking = async () => {
    const sessionId = getOrCreateSessionId();
    const data = await collectVisitorData(sessionId);
    setVisitorData(data);
    
    // Sauvegarder les données initiales
    await saveVisitorData(data);
  };

  const getOrCreateSessionId = (): string => {
    // Utiliser session Better-Auth si disponible, sinon générer un ID temporaire
    if (session?.session?.id) {
      return session.session.id;
    }
    
    let sessionId = sessionStorage.getItem('techtrust_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('techtrust_session_id', sessionId);
    }
    return sessionId;
  };

  const detectDeviceType = (): string => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|tablet/.test(userAgent)) {
      return /tablet|ipad/.test(userAgent) ? 'tablet' : 'mobile';
    }
    return 'desktop';
  };

  const detectBrowser = (): string => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Other';
  };

  const getApproximateLocation = async (): Promise<string> => {
    try {
      // Utiliser une API gratuite pour obtenir la localisation approximative
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return `${data.city}, ${data.country_name}` || 'Unknown';
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
    if (!cookiesAccepted || !visitorData) return;

    try {
      // Mettre à jour les pages visitées
      const updatedVisitorData = {
        ...visitorData,
        visitedPages: [...new Set([...visitorData.visitedPages, pagePath])],
        lastActivity: new Date().toISOString(),
      };
      setVisitorData(updatedVisitorData);

      // Utiliser l'ID utilisateur si connecté, sinon l'ID de session
      const trackingId = user?.id || visitorData.sessionId;

      // Sauvegarder l'événement de page vue
      await supabase.from('user_analytics').insert({
        user_id: trackingId,
        event_type: 'page_view',
        page_url: pagePath,
        device_type: visitorData.deviceType,
        browser: visitorData.browser,
        location: visitorData.location,
        session_duration: Math.floor((Date.now() - new Date(visitorData.sessionStart).getTime()) / 1000),
      });

      console.log(`Page vue trackée: ${pagePath} (User: ${trackingId})`);
    } catch (error) {
      console.error('Erreur tracking page vue:', error);
    }
  };

  const trackBlogPostView = async (postId: string, postTitle: string) => {
    if (!cookiesAccepted) return;

    try {
      // Incrémenter les vues dans la base de données
      const { data: currentPost } = await supabase
        .from('blog_posts')
        .select('views')
        .eq('id', postId)
        .single();

      if (currentPost) {
        await supabase
          .from('blog_posts')
          .update({ views: (currentPost.views || 0) + 1 })
          .eq('id', postId);
      }

      // Tracker l'événement
      await trackPageView(`/blog/${postId}`, postTitle);

      console.log(`Vue article trackée: ${postTitle}`);
    } catch (error) {
      console.error('Erreur tracking article:', error);
    }
  };

  const saveVisitorData = async (data: VisitorData) => {
    try {
      const trackingId = user?.id || data.sessionId;
      
      await supabase.from('user_analytics').insert({
        user_id: trackingId,
        event_type: 'session_start',
        device_type: data.deviceType,
        browser: data.browser,
        location: data.location,
        session_duration: 0,
      });
    } catch (error) {
      console.error('Erreur sauvegarde données visiteur:', error);
    }
  };

  return {
    cookiesAccepted,
    visitorData,
    acceptCookies,
    declineCookies,
    trackPageView,
    trackBlogPostView,
  };
};
