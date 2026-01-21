
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Music, 
  FileText, 
  Volume2,
  Settings,
  Wand2,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

interface CompositionStepProps {
  generatedContent: any;
  onComplete: (data: any) => void;
  composeFullVideo: (clips: any[], options: any) => Promise<any>;
  isComposing: boolean;
  videoClips: any[];
}

const CompositionStep: React.FC<CompositionStepProps> = ({
  generatedContent,
  onComplete,
  composeFullVideo,
  isComposing,
  videoClips
}) => {
  const [description, setDescription] = useState('');
  const [autoSubtitles, setAutoSubtitles] = useState(true);
  const [backgroundMusic, setBackgroundMusic] = useState(false);
  const [ttsVoice, setTtsVoice] = useState(false);
  const [soundEffects, setSoundEffects] = useState(false);

  // Auto-generate description based on generated content
  useEffect(() => {
    if (generatedContent && autoSubtitles) {
      const autoDescription = generateAutoDescription(generatedContent);
      setDescription(autoDescription);
    }
  }, [generatedContent, autoSubtitles]);

  const generateAutoDescription = (content: any) => {
    if (!content?.prompt) return '';
    
    const prompt = content.prompt.toLowerCase();
    const contentType = content.type || 'video';
    
    let description = '';
    let hashtags = [];
    
    // Analyze content type and style
    if (prompt.includes('lego')) {
      description = "🧱 Découvrez cette création LEGO incroyable ! Un monde miniature plein de détails et de surprises.";
      hashtags = ['#LEGO', '#StopMotion', '#Créativité', '#Miniature'];
    } else if (prompt.includes('anime') || prompt.includes('manga')) {
      description = "✨ Une aventure anime épique ! Plongez dans un univers coloré et fantastique.";
      hashtags = ['#Anime', '#Manga', '#Animation', '#Japan'];
    } else if (prompt.includes('cyberpunk') || prompt.includes('futur')) {
      description = "🌆 Bienvenu dans le futur ! Néons, technologie et atmosphère cyberpunk saisissante.";
      hashtags = ['#Cyberpunk', '#Futur', '#SciFi', '#Tech'];
    } else if (prompt.includes('nature') || prompt.includes('paysage')) {
      description = "🌿 La beauté de la nature capturée dans toute sa splendeur. Un moment de sérénité pure.";
      hashtags = ['#Nature', '#Paysage', '#Zen', '#Beautiful'];
    } else if (prompt.includes('cuisine') || prompt.includes('food') || prompt.includes('recette')) {
      description = "🍽️ Une création culinaire qui va vous faire saliver ! L'art de la gastronomie en action.";
      hashtags = ['#Cuisine', '#Food', '#Gastronomie', '#Delicious'];
    } else if (prompt.includes('sport') || prompt.includes('fitness')) {
      description = "💪 Performance et dépassement de soi ! L'esprit sportif dans toute sa grandeur.";
      hashtags = ['#Sport', '#Fitness', '#Motivation', '#Performance'];
    } else if (prompt.includes('art') || prompt.includes('artiste')) {
      description = "🎨 L'art prend vie sous vos yeux ! Une création artistique unique et inspirante.";
      hashtags = ['#Art', '#Créatif', '#Artistique', '#Inspiration'];
    } else {
      // Generic description based on content type
      if (contentType === 'video') {
        description = `🎬 ${content.prompt.charAt(0).toUpperCase() + content.prompt.slice(1)} - Une création vidéo unique générée par IA !`;
      } else {
        description = `🖼️ ${content.prompt.charAt(0).toUpperCase() + content.prompt.slice(1)} - Une image saisissante créée par IA !`;
      }
      hashtags = ['#IA', '#AIGenerated', '#Créatif', '#Innovation'];
    }
    
    // Add style-specific hashtags
    if (content.style) {
      switch (content.style) {
        case 'realistic':
          hashtags.push('#Realistic', '#Photoreal');
          break;
        case 'anime':
          hashtags.push('#AnimeStyle', '#Manga');
          break;
        case 'cyberpunk':
          hashtags.push('#CyberpunkStyle', '#Neon');
          break;
        case 'vintage':
          hashtags.push('#Vintage', '#Retro');
          break;
        case 'minimalist':
          hashtags.push('#Minimal', '#Clean');
          break;
      }
    }
    
    return `${description}\n\n${hashtags.join(' ')}`;
  };

  const handleRegenerateDescription = () => {
    if (generatedContent) {
      const newDescription = generateAutoDescription(generatedContent);
      setDescription(newDescription);
      toast.success('Description régénérée !');
    }
  };

  const handleCompose = async () => {
    if (generatedContent?.type === 'image') {
      // For images, just add metadata
      onComplete({
        ...generatedContent,
        subtitles: description,
        effects: {
          backgroundMusic,
          soundEffects
        }
      });
      toast.success('Composition terminée !');
      return;
    }

    // For videos, use composition service
    if (videoClips.length === 0) {
      toast.error('Aucune vidéo à composer');
      return;
    }

    const options = {
      subtitles: autoSubtitles ? [{ 
        text: description, 
        start: 0, 
        duration: videoClips.reduce((acc, clip) => acc + clip.duration, 0) 
      }] : undefined,
      music: backgroundMusic ? { 
        url: 'https://example.com/royalty-free-music.mp3', 
        title: 'Background Music' 
      } : undefined,
      tts: ttsVoice
    };

    const result = await composeFullVideo(videoClips, options);
    
    if (result) {
      onComplete({
        ...generatedContent,
        compositionId: result,
        subtitles: description,
        effects: options
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5 text-blue-500" />
            Étape 2: Composition & Post-production
            <Badge variant="outline" className="ml-auto">
              {generatedContent?.type === 'video' ? 'Vidéo' : 'Image'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!generatedContent && (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
              <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">En attente du contenu</h3>
              <p className="text-gray-500">
                Générez d'abord du contenu à l'étape 1 pour pouvoir le composer
              </p>
            </div>
          )}

          {generatedContent && (
            <>
              {/* Content Preview */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {generatedContent.type === 'video' ? (
                      <FileText className="w-5 h-5 text-blue-600" />
                    ) : (
                      <FileText className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">Contenu généré</h3>
                    <p className="text-sm text-gray-600">
                      {generatedContent.type === 'video' ? 'Vidéo' : 'Image'} • 
                      Style: {generatedContent.style}
                    </p>
                  </div>
                </div>
                <p className="text-sm bg-white/50 p-2 rounded italic">
                  "{generatedContent.prompt}"
                </p>
              </div>

              {/* Enhanced Description Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description" className="text-base font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    Description & Sous-titres intelligents
                  </Label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="auto-subtitles"
                        checked={autoSubtitles}
                        onCheckedChange={setAutoSubtitles}
                      />
                      <Label htmlFor="auto-subtitles" className="text-sm text-gray-600">
                        IA activée
                      </Label>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRegenerateDescription}
                      className="text-xs"
                    >
                      <Wand2 className="w-3 h-3 mr-1" />
                      Régénérer
                    </Button>
                  </div>
                </div>
                
                <Textarea
                  id="description"
                  placeholder="Description qui accompagnera votre contenu sur les réseaux sociaux..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                
                {autoSubtitles && description && (
                  <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                    ✨ Description générée automatiquement par IA basée sur votre contenu
                  </div>
                )}
              </div>

              {/* Audio & Effects Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="font-medium flex items-center gap-2 mb-4">
                    <Volume2 className="w-4 h-4 text-blue-500" />
                    Effets audio
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <Label htmlFor="bg-music" className="font-medium">Musique de fond</Label>
                        <p className="text-xs text-gray-500">Ajouter une ambiance musicale</p>
                      </div>
                      <Switch
                        id="bg-music"
                        checked={backgroundMusic}
                        onCheckedChange={setBackgroundMusic}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <Label htmlFor="tts" className="font-medium">Voix off (TTS)</Label>
                        <p className="text-xs text-gray-500">Narration automatique</p>
                      </div>
                      <Switch
                        id="tts"
                        checked={ttsVoice}
                        onCheckedChange={setTtsVoice}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <Label htmlFor="sfx" className="font-medium">Effets sonores</Label>
                        <p className="text-xs text-gray-500">Sons d'ambiance</p>
                      </div>
                      <Switch
                        id="sfx"
                        checked={soundEffects}
                        onCheckedChange={setSoundEffects}
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-medium mb-4">Coûts estimés</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Composition de base:</span>
                      <span className="font-medium">Gratuit</span>
                    </div>
                    {backgroundMusic && (
                      <div className="flex justify-between text-sm">
                        <span>• Musique de fond:</span>
                        <span className="text-green-600">$0.05</span>
                      </div>
                    )}
                    {ttsVoice && (
                      <div className="flex justify-between text-sm">
                        <span>• Voix off TTS:</span>
                        <span className="text-green-600">$0.10</span>
                      </div>
                    )}
                    {soundEffects && (
                      <div className="flex justify-between text-sm">
                        <span>• Effets sonores:</span>
                        <span className="text-green-600">$0.03</span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span className="text-blue-600">
                          ${(backgroundMusic ? 0.05 : 0) + (ttsVoice ? 0.10 : 0) + (soundEffects ? 0.03 : 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Compose Button */}
              <Button 
                onClick={handleCompose}
                disabled={isComposing || !description.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                {isComposing ? (
                  <>
                    <Settings className="w-4 h-4 mr-2 animate-spin" />
                    Composition en cours...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Finaliser la composition
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompositionStep;
