
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
  Wand2
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

  // Auto-generate subtitles based on content
  useEffect(() => {
    if (generatedContent?.prompt && autoSubtitles) {
      const autoDescription = generateAutoDescription(generatedContent.prompt);
      setDescription(autoDescription);
    }
  }, [generatedContent, autoSubtitles]);

  const generateAutoDescription = (prompt: string) => {
    // Simple AI-like subtitle generation based on prompt
    const cleanPrompt = prompt.toLowerCase();
    
    if (cleanPrompt.includes('lego')) {
      return "🧱 Découvrez cette création LEGO incroyable ! Un monde miniature plein de surprises vous attend. #LEGO #StopMotion #Créativité";
    } else if (cleanPrompt.includes('anime')) {
      return "✨ Une aventure anime épique vous attend ! Plongez dans un univers coloré et fantastique. #Anime #Manga #Animation";
    } else if (cleanPrompt.includes('cyberpunk')) {
      return "🌆 Bienvenue dans le futur cyberpunk ! Néons, technologie et atmosphère futuriste. #Cyberpunk #Futur #SciFi";
    } else {
      return `🎬 ${prompt.charAt(0).toUpperCase() + prompt.slice(1)} - Une création unique à découvrir ! #IA #Créatif #Unique`;
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
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!generatedContent && (
            <div className="text-center py-8">
              <p className="text-gray-500">Générez d'abord du contenu à l'étape 1</p>
            </div>
          )}

          {generatedContent && (
            <>
              {/* Content Preview */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Contenu à traiter:</h3>
                <p className="text-sm text-gray-600">
                  Type: {generatedContent.type === 'video' ? 'Vidéo' : 'Image'} • 
                  Style: {generatedContent.style} • 
                  Prompt: {generatedContent.prompt}
                </p>
              </div>

              {/* Subtitles/Description */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="description" className="text-base font-medium">
                    Description & Sous-titres
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto-subtitles"
                      checked={autoSubtitles}
                      onCheckedChange={setAutoSubtitles}
                    />
                    <Label htmlFor="auto-subtitles" className="text-sm">
                      Génération auto
                    </Label>
                  </div>
                </div>
                <Textarea
                  id="description"
                  placeholder="Description qui apparaîtra en sous-titres..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                {autoSubtitles && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDescription(generateAutoDescription(generatedContent.prompt))}
                    className="mt-2"
                  >
                    <Wand2 className="w-3 h-3 mr-1" />
                    Régénérer
                  </Button>
                )}
              </div>

              {/* Audio Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Options audio
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="bg-music">Musique de fond</Label>
                      <Switch
                        id="bg-music"
                        checked={backgroundMusic}
                        onCheckedChange={setBackgroundMusic}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="tts">Voix off (TTS)</Label>
                      <Switch
                        id="tts"
                        checked={ttsVoice}
                        onCheckedChange={setTtsVoice}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sfx">Effets sonores</Label>
                      <Switch
                        id="sfx"
                        checked={soundEffects}
                        onCheckedChange={setSoundEffects}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Coûts estimés</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Composition vidéo:</span>
                      <span>$0.30/min</span>
                    </div>
                    {backgroundMusic && (
                      <div className="flex justify-between text-sm">
                        <span>Musique:</span>
                        <span>$0.05</span>
                      </div>
                    )}
                    {ttsVoice && (
                      <div className="flex justify-between text-sm">
                        <span>Voix off:</span>
                        <span>$0.10</span>
                      </div>
                    )}
                  </div>
                  <Badge variant="outline" className="w-full justify-center">
                    Total: $0.30-0.45
                  </Badge>
                </div>
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
