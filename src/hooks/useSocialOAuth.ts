
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface SocialPlatform {
  id: string;
  name: string;
  connected: boolean;
  username?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
}

export const useSocialOAuth = () => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    { id: 'tiktok', name: 'TikTok', connected: false },
    { id: 'instagram', name: 'Instagram', connected: false },
    { id: 'facebook', name: 'Facebook', connected: false },
    { id: 'twitter', name: 'Twitter/X', connected: false },
    { id: 'youtube', name: 'YouTube', connected: false },
  ]);

  const connectPlatform = useCallback(async (platformId: string) => {
    try {
      console.log(`Starting OAuth for ${platformId}`);
      
      // OAuth URLs for each platform
      const oauthUrls = {
        tiktok: 'https://www.tiktok.com/v2/auth/authorize/',
        instagram: 'https://api.instagram.com/oauth/authorize',
        facebook: 'https://www.facebook.com/v18.0/dialog/oauth',
        twitter: 'https://twitter.com/i/oauth2/authorize',
        youtube: 'https://accounts.google.com/oauth2/auth'
      };

      const clientIds = {
        tiktok: process.env.REACT_APP_TIKTOK_CLIENT_ID,
        instagram: process.env.REACT_APP_INSTAGRAM_CLIENT_ID,
        facebook: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
        twitter: process.env.REACT_APP_TWITTER_CLIENT_ID,
        youtube: process.env.REACT_APP_YOUTUBE_CLIENT_ID
      };

      const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
      
      // Build OAuth URL
      const baseUrl = oauthUrls[platformId as keyof typeof oauthUrls];
      const clientId = clientIds[platformId as keyof typeof clientIds];
      
      if (!clientId) {
        toast.error(`Configuration OAuth manquante pour ${platformId}`);
        return;
      }

      let oauthUrl = '';
      
      switch (platformId) {
        case 'tiktok':
          oauthUrl = `${baseUrl}?client_key=${clientId}&response_type=code&scope=user.info.basic,video.list,video.upload&redirect_uri=${redirectUri}&state=${platformId}`;
          break;
        case 'instagram':
          oauthUrl = `${baseUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code&state=${platformId}`;
          break;
        case 'facebook':
          oauthUrl = `${baseUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=pages_manage_posts,pages_read_engagement&response_type=code&state=${platformId}`;
          break;
        case 'twitter':
          oauthUrl = `${baseUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=tweet.read tweet.write users.read&state=${platformId}`;
          break;
        case 'youtube':
          oauthUrl = `${baseUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=https://www.googleapis.com/auth/youtube.upload&response_type=code&access_type=offline&state=${platformId}`;
          break;
      }

      // Open OAuth popup
      const popup = window.open(
        oauthUrl,
        `oauth_${platformId}`,
        'width=600,height=700,scrollbars=yes,resizable=yes'
      );

      // Listen for OAuth callback
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'OAUTH_SUCCESS' && event.data.platform === platformId) {
          const { code, state } = event.data;
          
          // Exchange code for access token
          exchangeCodeForToken(platformId, code)
            .then((tokenData) => {
              setPlatforms(prev => 
                prev.map(p => 
                  p.id === platformId 
                    ? { 
                        ...p, 
                        connected: true, 
                        username: tokenData.username,
                        accessToken: tokenData.accessToken,
                        refreshToken: tokenData.refreshToken,
                        expiresAt: tokenData.expiresAt
                      }
                    : p
                )
              );
              
              toast.success(`✅ Connexion à ${p.name} réussie !`);
              popup?.close();
            })
            .catch((error) => {
              console.error('Token exchange failed:', error);
              toast.error(`❌ Erreur lors de la connexion à ${platformId}`);
              popup?.close();
            });
        }
      };

      window.addEventListener('message', handleMessage);
      
      // Cleanup listener when popup closes
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
        }
      }, 1000);

    } catch (error) {
      console.error(`OAuth error for ${platformId}:`, error);
      toast.error(`❌ Erreur lors de la connexion à ${platformId}`);
    }
  }, []);

  const exchangeCodeForToken = async (platform: string, code: string) => {
    // This would typically be done via a secure backend endpoint
    // For demo purposes, we'll simulate the exchange
    
    // In production, this should call your backend API that handles the OAuth token exchange
    const response = await fetch('/api/oauth/exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform, code })
    });

    if (!response.ok) {
      throw new Error('Token exchange failed');
    }

    return await response.json();
  };

  const disconnectPlatform = useCallback((platformId: string) => {
    setPlatforms(prev => 
      prev.map(p => 
        p.id === platformId 
          ? { ...p, connected: false, username: undefined, accessToken: undefined }
          : p
      )
    );
    
    const platform = platforms.find(p => p.id === platformId);
    toast.success(`Déconnexion de ${platform?.name} réussie`);
  }, [platforms]);

  const publishToplatform = useCallback(async (
    platformId: string, 
    content: { 
      type: 'video' | 'image';
      url: string;
      description: string;
      hashtags: string;
    }
  ) => {
    const platform = platforms.find(p => p.id === platformId);
    
    if (!platform?.connected || !platform.accessToken) {
      toast.error(`Pas de connexion active pour ${platform?.name}`);
      return false;
    }

    try {
      console.log(`Publishing to ${platformId}:`, content);
      
      // This would make actual API calls to each platform
      // For now, we'll simulate the publishing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`✅ Contenu publié sur ${platform.name} !`);
      return true;
      
    } catch (error) {
      console.error(`Publishing error for ${platformId}:`, error);
      toast.error(`❌ Erreur lors de la publication sur ${platform.name}`);
      return false;
    }
  }, [platforms]);

  return {
    platforms,
    connectPlatform,
    disconnectPlatform,
    publishToplatform
  };
};
