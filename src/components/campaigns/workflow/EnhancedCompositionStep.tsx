
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Music, 
  Subtitles, 
  Wand2,
  Play,
  Download,
  Eye,
  Volume2
} from 'lucide-react';
import { toast } from 'sonner';
import CompositionPreview from './CompositionPreview';

interface EnhancedCompositionStepProps {
  generatedContent: any;
  onComplete: (data: any) => void;
  composeFullVideo: (clips: any[], options: any) => Promise<any>;
  isComposing: boolean;
  videoClips: any[];
}

const EnhancedCompositionStep: React.FC<EnhancedCompositionStepProps> = ({
  generatedContent,
  onComplete,
  composeFullVideo,
  isComposing,
  videoClips
}) => {
  const [subtitles, setSubtitles] = useState<Array<{ text: string; start: number; duration: number }>>([]);
  const [subtitleText, setSubtitleText] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [musicVolume, setMusicVolume] = useState([50]);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [compositionData, setCompositionData] = useState<any>(null);

  // Auto-generate subtitles based on content
  useEffect(() => {
    if (generatedContent?.prompt && subtitles.length === 0) {
      generateAutoSubtitles(generatedContent.prompt);
    }
  }, [generatedContent]);

  const generateAutoSubtitles = async (prompt: string) => {
    try {
      // Simulate AI subtitle generation
      const words = prompt.split(' ');
      const autoSubtitles = [];
      let currentTime = 0;
      
      // Create subtitle segments (3-5 words per subtitle)
      for (let i = 0; i < words.length; i += 4) {
        const segment = words.slice(i, i + 4).join(' ');
        autoSubtitles.push({
          text: segment,
          start: currentTime,
          duration: 2.5
        });
        currentTime += 3;
      }
      
      setSubtitles(autoSubtitles);
      toast.success('Sous-titres générés automatiquement !');
    } catch (error) {
      console.error('Auto subtitle generation error:', error);
    }
  };

  const addSubtitle = () => {
    if (subtitleText.trim()) {
      const newSubtitle = {
        text: subtitleText,
        start: subtitles.length > 0 ? subtitles[subtitles.length - 1].start + subtitles[subtitles.length - 1].duration : 0,
        duration: 3
      };
      setSubtitles([...subtitles, newSubtitle]);
      setSubtitleText('');
    }
  };

  const removeSubtitle = (index: number) => {
    setSubtitles(subtitles.filter((_, i) => i !== index));
  };

  const handleCompose = async () => {
    if (!generatedContent) {
      toast.error('Aucun contenu à composer');
      return;
    }

    const options = {
      subtitles: subtitles,
      music: musicUrl ? { url: musicUrl, volume: musicVolume[0] / 100 } : undefined,
      tts: ttsEnabled
    };

    const clips = generatedContent.type === 'video' ? [generatedContent.content] : [];
    const result = await composeFullVideo(clips, options);

    if (result) {
      const composition = {
        originalContent: generatedContent,
        subtitles,
        music: musicUrl,
        musicVolume: musicVolume[0],
        tts: ttsEnabled,
        composedVideoId: result
      };
      
      setCompositionData(composition);
      toast.success('Composition terminée !');
    }
  };

  const handleSaveAndContinue = () => {
    const finalData = {
      originalContent: generatedContent,
      subtitles,
      music: musicUrl,
      musicVolume: musicVolume[0],
      tts: ttsEnabled,
      compositionData
    };
    
    onComplete(finalData);
  };

  if (!generatedContent) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">Générez d'abord du contenu à l'étape précédente</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5 text-blue-500" />
            Étape 2: Composition & Post-production avancée
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Live Preview */}
          <CompositionPreview
            videoUrl={generatedContent.type === 'video' ? generatedContent.content.url : undefined}
            imageUrl={generatedContent.type === 'image' ? generatedContent.content.url : undefined}
            subtitles={subtitles}
            musicUrl={musicUrl}
            onUpdate={setCompositionData}
          />

          {/* Subtitle Management */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Sous-titres intelligents</Label>
              <Badge variant="outline" className="text-green-600">
                {subtitles.length} segments
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <Textarea
                placeholder="Ajouter un sous-titre..."
                value={subtitleText}
                onChange={(e) => setSubtitleText(e.target.value)}
                rows={2}
                className="flex-1"
              />
              <Button onClick={addSubtitle} className="self-end">
                <Subtitles className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </div>

            {subtitles.length > 0 && (
              <div className="max-h-40 overflow-y-auto space-y-2">
                {subtitles.map((subtitle, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <div className="flex-1">
                      <p className="text-sm">{subtitle.text}</p>
                      <p className="text-xs text-gray-500">
                        {subtitle.start}s - {subtitle.start + subtitle.duration}s
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeSubtitle(index)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Music Controls */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Musique de fond</Label>
            <div className="flex gap-2">
              <Input
                placeholder="URL de la musique de fond..."
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline">
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
            
            {musicUrl && (
              <div className="space-y-2">
                <Label className="text-sm">Volume: {musicVolume[0]}%</Label>
                <Slider
                  value={musicVolume}
                  onValueChange={setMusicVolume}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Compose Button */}
          <Button 
            onClick={handleCompose}
            disabled={isComposing}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            {isComposing ? (
              <>
                <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                Composition en cours...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Composer la vidéo finale
              </>
            )}
          </Button>

          {/* Continue Button */}
          {(subtitles.length > 0 || musicUrl) && (
            <Button 
              onClick={handleSaveAndContinue}
              className="w-full"
              variant="outline"
            >
              <Eye className="w-4 h-4 mr-2" />
              Sauvegarder et continuer
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedCompositionStep;
