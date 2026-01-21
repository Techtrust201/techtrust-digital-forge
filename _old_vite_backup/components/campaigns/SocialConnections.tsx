
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Facebook,
  Instagram,
  Twitter,
  Video,
  Play,
  CheckCircle,
  AlertCircle,
  Settings,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

interface SocialConnection {
  platform: string;
  connected: boolean;
  username?: string;
  followers?: number;
  engagement_rate?: number;
  last_post?: string;
}

const SocialConnections = () => {
  const [connections, setConnections] = useState<SocialConnection[]>([
    {
      platform: 'TikTok',
      connected: false,
      username: '',
      followers: 0,
      engagement_rate: 0
    },
    {
      platform: 'Instagram',
      connected: false,
      username: '',
      followers: 0,
      engagement_rate: 0
    },
    {
      platform: 'Facebook',
      connected: false,
      username: '',
      followers: 0,
      engagement_rate: 0
    },
    {
      platform: 'Twitter',
      connected: false,
      username: '',
      followers: 0,
      engagement_rate: 0
    },
    {
      platform: 'YouTube',
      connected: false,
      username: '',
      followers: 0,
      engagement_rate: 0
    }
  ]);

  const platformIcons = {
    'TikTok': { icon: Video, color: 'bg-pink-500' },
    'Instagram': { icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    'Facebook': { icon: Facebook, color: 'bg-blue-600' },
    'Twitter': { icon: Twitter, color: 'bg-black' },
    'YouTube': { icon: Play, color: 'bg-red-600' }
  };

  const connectPlatform = async (platform: string) => {
    try {
      // Simulation de connexion OAuth
      toast.loading(`Connexion à ${platform}...`);
      
      // Ici on implémenterait la vraie connexion OAuth
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setConnections(prev => prev.map(conn => 
        conn.platform === platform 
          ? { 
              ...conn, 
              connected: true, 
              username: `user_${platform.toLowerCase()}`,
              followers: Math.floor(Math.random() * 10000),
              engagement_rate: Math.random() * 0.15
            }
          : conn
      ));
      
      toast.success(`Connecté à ${platform} avec succès !`);
    } catch (error) {
      toast.error(`Erreur de connexion à ${platform}`);
    }
  };

  const disconnectPlatform = (platform: string) => {
    setConnections(prev => prev.map(conn => 
      conn.platform === platform 
        ? { ...conn, connected: false, username: '', followers: 0, engagement_rate: 0 }
        : conn
    ));
    toast.success(`Déconnecté de ${platform}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Connexions réseaux sociaux</h3>
          <p className="text-gray-500 text-sm">Connectez vos comptes pour publier automatiquement</p>
        </div>
        <Badge variant="outline">
          {connections.filter(c => c.connected).length}/{connections.length} connectés
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {connections.map((connection) => {
          const platformInfo = platformIcons[connection.platform as keyof typeof platformIcons];
          const Icon = platformInfo?.icon || Settings;
          
          return (
            <Card key={connection.platform} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${platformInfo?.color || 'bg-gray-500'}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{connection.platform}</CardTitle>
                      {connection.connected && connection.username && (
                        <p className="text-sm text-gray-500">@{connection.username}</p>
                      )}
                    </div>
                  </div>
                  
                  {connection.connected ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {connection.connected ? (
                  <>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Abonnés</p>
                        <p className="font-medium">{connection.followers?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Engagement</p>
                        <p className="font-medium">{((connection.engagement_rate || 0) * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => disconnectPlatform(connection.platform)}
                      >
                        Déconnecter
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-500">
                      Connectez votre compte {connection.platform} pour publier automatiquement vos contenus.
                    </p>
                    
                    <Button 
                      onClick={() => connectPlatform(connection.platform)}
                      className="w-full"
                      size="sm"
                    >
                      Connecter {connection.platform}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Conseils de connexion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p>• <strong>TikTok:</strong> Nécessite un compte Business pour l'API</p>
          <p>• <strong>Instagram:</strong> Connectez via Facebook Business</p>
          <p>• <strong>YouTube:</strong> Authentification Google requise</p>
          <p>• <strong>Twitter:</strong> API v2 avec authentification OAuth 2.0</p>
          <p>• <strong>Facebook:</strong> Pages Business uniquement</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialConnections;
