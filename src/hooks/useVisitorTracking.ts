
import { useEffect, useState } from 'react';
import { useBetterAuth } from './useBetterAuth';

export const useVisitorTracking = () => {
  const { user } = useBetterAuth();
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    // Vérifier si les cookies ont été acceptés
    const cookieConsent = localStorage.getItem('cookieConsent');
    setCookiesAccepted(cookieConsent === 'accepted');
  }, []);

  useEffect(() => {
    // Tracking du visiteur
    const trackVisitor = async () => {
      if (!cookiesAccepted) return;
      
      try {
        const visitorData = {
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
          userId: user?.id || null,
          userAgent: navigator.userAgent,
          referrer: document.referrer
        };

        console.log('Visitor tracking:', visitorData);
        
        // Ici vous pourriez envoyer les données à votre API d'analytics
        // await fetch('/api/analytics/track', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(visitorData)
        // });
      } catch (error) {
        console.error('Visitor tracking error:', error);
      }
    };

    trackVisitor();
  }, [user, cookiesAccepted]);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setCookiesAccepted(true);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setCookiesAccepted(false);
  };

  const trackPageView = async (page: string, title?: string) => {
    if (!cookiesAccepted) return;
    
    try {
      console.log('Page view tracked:', { page, title, userId: user?.id });
    } catch (error) {
      console.error('Page view tracking error:', error);
    }
  };

  const trackBlogPostView = async (postId: string, title: string) => {
    if (!cookiesAccepted) return;
    
    try {
      console.log('Blog post view tracked:', { postId, title, userId: user?.id });
    } catch (error) {
      console.error('Blog post view tracking error:', error);
    }
  };

  return {
    cookiesAccepted,
    acceptCookies,
    declineCookies,
    trackPageView,
    trackBlogPostView
  };
};
