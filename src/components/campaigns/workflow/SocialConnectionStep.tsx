
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Link, 
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
  Play,
  Video
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
  const platforms = [
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      icon: Video, 
      color: 'bg-pink-500',
      description: 'Parfait pour les vidéos courtes et virales'
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: Instagram, 
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      description: 'Idéal pour le contenu visuel et les stories'
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: Facebook, 
      color: 'bg-blue-600',
      description: 'Large audience, tous types de contenu'
    },
    { 
      id: 'twitter', 
      name: 'Twitter/X', 
      icon: Twitter, 
      color: 'bg-black',
      description: 'Parfait pour les discussions et tendances'
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: Play, 
      color: 'bg-red-600',
      description: 'Plateforme de référence pour les vidéos'
    }
  ];

  const handleConnect = async (platformId: string) => {
    // Simulate connection process
    toast.success(`Connexion à ${platforms.find(p => p.id === platformId)?.name} simulée`);
    
    // In real app, this would open OAuth flow
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const connectedCount = socialConnections.filter(conn => conn.connected).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5 text-green-500" />
            Étape 3: Connexions aux réseaux sociaux
            <Badge variant="outline">{connectedCount}/5 connectés</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {platforms.map((platform) => {
              const connection = socialConnections.find(conn => conn.platform === platform.id);
              const isConnected = connection?.connected || false;
              const PlatformIcon = platform.icon;
              
              return (
                <div key={platform.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg ${platform.color}`}>
                      <PlatformIcon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{platform.name}</h3>
                        {isConnected ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <Badge variant="outline" className="text-green-700 border-green-200">
                              Connecté
                            </Badge>
                          </div>
                        ) : (
                          <Button 
                            size="sm"
                            onClick={() => handleConnect(platform.id)}
                            className="text-xs"
                          >
                            Connecter
                          </Button>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600">{platform.description}</p>
                      
                      {isConnected && (
                        <p className="text-sm text-green-600 mt-1">
                          @{connection.username || `user_${platform.id}`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {connectedCount === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">Connectez au moins un réseau social pour continuer</p>
              <Badge variant="outline" className="text-orange-600">
                Aucune connexion active
              </Badge>
            </div>
          )}

          {connectedCount > 0 && (
            <div className="text-center py-4">
              <Badge variant="outline" className="text-green-600">
                ✅ {connectedCount} réseau{connectedCount > 1 ? 'x' : ''} connecté{connectedCount > 1 ? 's' : ''}
              </Badge>
              <Button 
                onClick={onComplete}
                className="ml-4 bg-green-600 hover:bg-green-700"
              >
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
