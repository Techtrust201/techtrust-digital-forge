
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, 
  CheckCircle, 
  Clock,
  Hash,
  MessageSquare,
  Send,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import { useSocialOAuth } from '@/hooks/useSocialOAuth';

interface SocialPublishingStepProps {
  generatedContent: any;
  compositionData: any;
  onComplete: () => void;
}

const SocialPublishingStep: React.FC<SocialPublishingStepProps> = ({
  generatedContent,
  compositionData,
  onComplete
}) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [customDescription, setCustomDescription] = useState('');
  const [customHashtags, setCustomHashtags] = useState('');
  const [scheduleForLater, setScheduleForLater] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const { platforms, connectPlatform, publishToplatform } = useSocialOAuth();

  // Use AI-optimized content or fallback to defaults
  const aiDescription = generatedContent?.socialData?.description || '';
  const aiHashtags = generatedContent?.socialData?.hashtags?.join(' ') || '';

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handlePublishNow = async () => {
    if (selectedPlatforms.length === 0) {
      toast.error('Sélectionnez au moins une plateforme');
      return;
    }

    if (!generatedContent?.content?.url) {
      toast.error('Aucun contenu à publier');
      return;
    }

    setIsPublishing(true);

    try {
      const description = customDescription || aiDescription || 'Nouveau contenu créé avec IA';
      const hashtags = customHashtags || aiHashtags || '';
      
      const publishPromises = selectedPlatforms.map(async (platformId) => {
        return await publishToplatform(platformId, {
          type: generatedContent.type,
          url: generatedContent.content.url,
          description: `${description} ${hashtags}`,
          hashtags
        });
      });

      const results = await Promise.all(publishPromises);
      const successCount = results.filter(Boolean).length;
      
      if (successCount === selectedPlatforms.length) {
        toast.success(`🎉 Contenu publié sur ${successCount} plateforme(s) !`);
        onComplete();
      } else {
        toast.warning(`Publication partielle: ${successCount}/${selectedPlatforms.length} réussies`);
      }

    } catch (error) {
      console.error('Publishing error:', error);
      toast.error('Erreur lors de la publication');
    } finally {
      setIsPublishing(false);
    }
  };

  const connectedPlatforms = platforms.filter(p => p.connected);
  const disconnectedPlatforms = platforms.filter(p => !p.connected);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-500" />
            Publication sur les réseaux sociaux
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Platform Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              Sélectionner les plateformes ({connectedPlatforms.length} connectées)
            </Label>
            
            {connectedPlatforms.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {connectedPlatforms.map((platform) => (
                  <div
                    key={platform.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPlatforms.includes(platform.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handlePlatformToggle(platform.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{platform.name}</p>
                        <p className="text-xs text-gray-500">@{platform.username}</p>
                      </div>
                      {selectedPlatforms.includes(platform.id) && (
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Share2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-4">Aucune plateforme connectée</p>
                <p className="text-sm text-gray-500">
                  Connectez vos comptes depuis l'étape "Connexions sociales"
                </p>
              </div>
            )}
          </div>

          {/* Content Preview */}
          {aiDescription && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-green-600" />
                Description optimisée par IA
              </h4>
              <p className="text-sm text-green-800 mb-2">{aiDescription}</p>
              {aiHashtags && (
                <div className="flex flex-wrap gap-1">
                  {generatedContent.socialData.hashtags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-green-700 border-green-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Custom Content */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="custom-description">Description personnalisée (optionnel)</Label>
              <Textarea
                id="custom-description"
                placeholder="Remplacer la description IA ou ajouter votre propre texte..."
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="custom-hashtags">Hashtags personnalisés (optionnel)</Label>
              <Textarea
                id="custom-hashtags"
                placeholder="#hashtag1 #hashtag2 #hashtag3..."
                value={customHashtags}
                onChange={(e) => setCustomHashtags(e.target.value)}
                rows={2}
              />
            </div>
          </div>

          {/* Scheduling Option */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <Label htmlFor="schedule-later" className="font-medium">
                Programmer la publication
              </Label>
              <p className="text-sm text-gray-600">
                Publier plus tard (fonctionnalité à venir)
              </p>
            </div>
            <Switch
              id="schedule-later"
              checked={scheduleForLater}
              onCheckedChange={setScheduleForLater}
              disabled
            />
          </div>

          {/* Publish Button */}
          <Button
            onClick={handlePublishNow}
            disabled={isPublishing || selectedPlatforms.length === 0 || connectedPlatforms.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            {isPublishing ? (
              <>
                <Send className="w-4 h-4 mr-2 animate-pulse" />
                Publication en cours...
              </>
            ) : scheduleForLater ? (
              <>
                <Calendar className="w-4 h-4 mr-2" />
                Programmer la publication
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Publier maintenant sur {selectedPlatforms.length} plateforme(s)
              </>
            )}
          </Button>

          {/* Disconnected Platforms */}
          {disconnectedPlatforms.length > 0 && (
            <div className="border-t pt-4">
              <Label className="text-sm font-medium text-gray-600 mb-2 block">
                Plateformes non connectées
              </Label>
              <div className="flex flex-wrap gap-2">
                {disconnectedPlatforms.map((platform) => (
                  <Button
                    key={platform.id}
                    size="sm"
                    variant="outline"
                    onClick={() => connectPlatform(platform.id)}
                    className="text-xs"
                  >
                    Connecter {platform.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialPublishingStep;
