
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Link, 
  CheckCircle,
  AlertCircle,
  Facebook,
  Instagram,
  Twitter,
  Play,
  Video,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

interface SocialConnectionStepProps {
  onComplete: () => void;
  socialConnections: any[];
}

const SocialConnectionStep: React.FC<SocialConnectionStepProps> = ({
  onComplete,
  socialConnections
}) => {
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);

  const platforms = [
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      icon: Video, 
      color: 'bg-gradient-to-r from-pink-500 to-red-500',
      description: 'Parfait pour les vidéos courtes et virales',
      audience: '1B+ utilisateurs',
      bestFor: 'Vidéos créatives, trends'
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: Instagram, 
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      description: 'Idéal pour le contenu visuel et les stories',
      audience: '2B+ utilisateurs', 
      bestFor: 'Photos, stories, reels'
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: Facebook, 
      color: 'bg-blue-600',
      description: 'Large audience, tous types de contenu',
      audience: '3B+ utilisateurs',
      bestFor: 'Contenu varié, communautés'
    },
    { 
      id: 'twitter', 
      name: 'Twitter/X', 
      icon: Twitter, 
      color: 'bg-black',
      description: 'Parfait pour les discussions et tendances',
      audience: '450M+ utilisateurs',
      bestFor: 'Actualités, discussions'
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: Play, 
      color: 'bg-red-600',
      description: 'Plateforme de référence pour les vidéos',
      audience: '2.7B+ utilisateurs',
      bestFor: 'Vidéos longues, tutoriels' 
    }
  ];

  const handleConnect = async (platformId: string) => {
    setConnectingPlatform(platformId);
    const platformName = platforms.find(p => p.id === platformId)?.name;
    
    try {
      // Simulate OAuth connection process
      toast.info(`Ouverture de la connexion ${platformName}...`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, this would:
      // 1. Open OAuth popup
      // 2. Handle OAuth callback
      // 3. Store access tokens securely
      // 4. Update connection status
      
      toast.success(`✅ Connexion à ${platformName} réussie !`);
      
      // Mock successful connection
      setTimeout(() => {
        if (connectedCount + 1 >= 1) {
          onComplete();
        }
      }, 1000);
      
    } catch (error) {
      toast.error(`❌ Erreur de connexion à ${platformName}`);
    } finally {
      setConnectingPlatform(null);
    }
  };

  const handleDisconnect = async (platformId: string) => {
    const platformName = platforms.find(p => p.id === platformId)?.name;
    toast.success(`Déconnexion de ${platformName} réussie`);
  };

  const connectedCount = socialConnections.filter(conn => conn.connected).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5 text-green-500" />
            Étape 3: Connexions aux réseaux sociaux
            <Badge variant="outline" className="ml-auto">
              {connectedCount}/5 connectés
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Overview */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              {connectedCount === 0 ? (
                <AlertCircle className="w-5 h-5 text-orange-500" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              <div>
                <h3 className="font-medium">
                  {connectedCount === 0 
                    ? 'Aucune connexion active' 
                    : `${connectedCount} réseau${connectedCount > 1 ? 'x' : ''} connecté${connectedCount > 1 ? 's' : ''}`
                  }
                </h3>
                <p className="text-sm text-gray-600">
                  {connectedCount === 0 
                    ? 'Connectez au moins un réseau social pour continuer'
                    : 'Vous pouvez maintenant publier sur vos réseaux connectés'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Platforms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {platforms.map((platform) => {
              const connection = socialConnections.find(conn => conn.platform === platform.id);
              const isConnected = connection?.connected || false;
              const isConnecting = connectingPlatform === platform.id;
              const PlatformIcon = platform.icon;
              
              return (
                <Card key={platform.id} className={`p-4 transition-all hover:shadow-md ${isConnected ? 'border-green-200 bg-green-50' : 'hover:border-gray-300'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg ${platform.color} flex-shrink-0`}>
                      <PlatformIcon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium truncate">{platform.name}</h3>
                        {isConnected ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <Badge variant="outline" className="text-green-700 border-green-200 text-xs">
                              Connecté
                            </Badge>
                          </div>
                        ) : (
                          <Button 
                            size="sm"
                            onClick={() => handleConnect(platform.id)}
                            disabled={isConnecting}
                            className="text-xs flex-shrink-0"
                          >
                            {isConnecting ? (
                              <>
                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                                Connexion...
                              </>
                            ) : (
                              <>
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Connecter
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{platform.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{platform.audience}</span>
                        <span className="font-medium">{platform.bestFor}</span>
                      </div>
                      
                      {isConnected && (
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-sm text-green-600">
                            @{connection.username || `user_${platform.id}`}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnect(platform.id)}
                            className="text-xs text-red-600 hover:text-red-700"
                          >
                            Déconnecter
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Continue Button */}
          {connectedCount > 0 && (
            <div className="text-center py-4">
              <Button 
                onClick={onComplete}
                className="bg-green-600 hover:bg-green-700 px-8"
                size="lg"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Continuer vers la planification
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialConnectionStep;
