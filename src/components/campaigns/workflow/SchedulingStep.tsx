
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Send,
  TrendingUp,
  Users,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

interface SchedulingStepProps {
  generatedContent: any;
  compositionData: any;
  onComplete: () => void;
  schedulePost: (content: any, postData: any) => Promise<boolean>;
  socialConnections: any[];
}

const SchedulingStep: React.FC<SchedulingStepProps> = ({
  generatedContent,
  compositionData,
  onComplete,
  schedulePost,
  socialConnections
}) => {
  const [description, setDescription] = useState(compositionData?.subtitles || '');
  const [hashtags, setHashtags] = useState('#viral #ai #content #trending');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const platforms = [
    { id: 'tiktok', name: 'TikTok', color: 'bg-pink-500' },
    { id: 'instagram', name: 'Instagram', color: 'bg-purple-500' },
    { id: 'facebook', name: 'Facebook', color: 'bg-blue-600' },
    { id: 'twitter', name: 'Twitter/X', color: 'bg-black' },
    { id: 'youtube', name: 'YouTube', color: 'bg-red-600' }
  ];

  const recommendations = [
    {
      platform: 'TikTok',
      bestTimes: ['18:00-20:00', '21:00-23:00'],
      bestDays: ['Mardi', 'Jeudi', 'Vendredi'],
      engagement: '+18%',
      tip: 'Publiez en soirée pour maximiser la visibilité'
    },
    {
      platform: 'Instagram',
      bestTimes: ['11:00-13:00', '17:00-19:00'],
      bestDays: ['Mercredi', 'Vendredi', 'Dimanche'],
      engagement: '+12%',
      tip: 'Pause déjeuner et fin de journée sont optimales'
    },
    {
      platform: 'Facebook',
      bestTimes: ['13:00-15:00', '20:00-21:00'],
      bestDays: ['Mercredi', 'Jeudi', 'Samedi'],
      engagement: '+8%',
      tip: 'Audience plus mature, privilégiez le contenu informatif'
    }
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSchedule = async () => {
    if (selectedPlatforms.length === 0) {
      toast.error('Sélectionnez au moins une plateforme');
      return;
    }

    const postData = {
      description,
      hashtags,
      platforms: selectedPlatforms,
      scheduledDate,
      scheduledTime
    };

    const success = await schedulePost(generatedContent, postData);
    if (success) {
      onComplete();
    }
  };

  const handlePublishNow = () => {
    if (selectedPlatforms.length === 0) {
      toast.error('Sélectionnez au moins une plateforme');
      return;
    }

    toast.success(`Publication immédiate sur ${selectedPlatforms.join(', ')} !`);
    onComplete();
  };

  const connectedPlatforms = socialConnections.filter(conn => conn.connected);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            Étape 4: Planification & Publication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!generatedContent && (
            <div className="text-center py-8">
              <p className="text-gray-500">Générez et composez d'abord votre contenu</p>
            </div>
          )}

          {generatedContent && (
            <>
              {/* Content Preview */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Contenu à publier:</h3>
                <p className="text-sm text-gray-600">
                  {generatedContent.type === 'video' ? '🎥' : '🖼️'} {generatedContent.prompt}
                </p>
                {compositionData?.subtitles && (
                  <p className="text-sm text-blue-600 mt-1">
                    Avec sous-titres et effets
                  </p>
                )}
              </div>

              {/* Post Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description">Description de la publication</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez votre contenu..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="hashtags">Hashtags</Label>
                    <Textarea
                      id="hashtags"
                      placeholder="#viral #ai #content..."
                      value={hashtags}
                      onChange={(e) => setHashtags(e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="date">Date de publication</Label>
                    <Input
                      id="date"
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="time">Heure optimale</Label>
                    <Input
                      id="time"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Platform Selection */}
              <div>
                <Label className="text-base font-medium">Plateformes cibles</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                  {platforms.map((platform) => {
                    const isConnected = connectedPlatforms.some(conn => conn.platform === platform.id);
                    const isSelected = selectedPlatforms.includes(platform.id);
                    
                    return (
                      <Button
                        key={platform.id}
                        variant={isSelected ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePlatformToggle(platform.id)}
                        disabled={!isConnected}
                        className="flex flex-col gap-1 h-auto py-3"
                      >
                        <span className="font-medium">{platform.name}</span>
                        {!isConnected && (
                          <span className="text-xs text-red-500">Non connecté</span>
                        )}
                      </Button>
                    );
                  })}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {selectedPlatforms.length} plateforme{selectedPlatforms.length > 1 ? 's' : ''} sélectionnée{selectedPlatforms.length > 1 ? 's' : ''}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button 
                  onClick={handleSchedule}
                  variant="outline"
                  className="flex-1"
                  disabled={selectedPlatforms.length === 0}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Programmer
                </Button>
                
                <Button 
                  onClick={handlePublishNow}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={selectedPlatforms.length === 0}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publier maintenant
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            Recommandations IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.slice(0, 3).map((rec, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  {rec.platform}
                </h3>
                <div className="space-y-1 text-sm">
                  <p><strong>🕐 Heures:</strong> {rec.bestTimes.join(', ')}</p>
                  <p><strong>📅 Jours:</strong> {rec.bestDays.join(', ')}</p>
                  <p><strong>📊 Engagement:</strong> <span className="text-green-600">{rec.engagement}</span></p>
                  <p className="text-gray-600 italic">{rec.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchedulingStep;
