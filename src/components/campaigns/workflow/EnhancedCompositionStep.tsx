
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Music, 
  Type, 
  Layers,
  Play,
  Pause,
  Save,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import CompositionPreview from './CompositionPreview';
import MusicSelector from './MusicSelector';

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
  const [selectedMusic, setSelectedMusic] = useState<any>(null);
  const [subtitles, setSubtitles] = useState<Array<{ text: string; start: number; duration: number }>>([]);
  const [enableTTS, setEnableTTS] = useState(false);
  const [customSubtitle, setCustomSubtitle] = useState('');
  const [subtitleTiming, setSubtitleTiming] = useState({ start: 0, duration: 3 });

  // Auto-generate subtitles from social data
  React.useEffect(() => {
    if (generatedContent?.socialData?.description && subtitles.length === 0) {
      const description = generatedContent.socialData.description;
      const words = description.split(' ');
      const wordsPerSubtitle = 6;
      const duration = generatedContent.content.duration || 10;
      const subtitleDuration = duration / Math.ceil(words.length / wordsPerSubtitle);

      const autoSubtitles = [];
      for (let i = 0; i < words.length; i += wordsPerSubtitle) {
        const text = words.slice(i, i + wordsPerSubtitle).join(' ');
        const start = (i / wordsPerSubtitle) * subtitleDuration;
        
        autoSubtitles.push({
          text,
          start: Math.round(start * 10) / 10,
          duration: Math.round(subtitleDuration * 10) / 10
        });
      }
      
      setSubtitles(autoSubtitles);
      toast.success('🤖 Sous-titres générés automatiquement !');
    }
  }, [generatedContent]);

  const addSubtitle = () => {
    if (!customSubtitle.trim()) return;
    
    const newSubtitle = {
      text: customSubtitle,
      start: subtitleTiming.start,
      duration: subtitleTiming.duration
    };
    
    setSubtitles([...subtitles, newSubtitle]);
    setCustomSubtitle('');
    setSubtitleTiming({ start: subtitleTiming.start + subtitleTiming.duration, duration: 3 });
  };

  const removeSubtitle = (index: number) => {
    setSubtitles(subtitles.filter((_, i) => i !== index));
  };

  const handleCompose = async () => {
    if (!generatedContent) {
      toast.error('Aucun contenu à composer');
      return;
    }

    const clips = generatedContent.type === 'video' ? [generatedContent.content] : [];
    
    const options = {
      subtitles: subtitles.length > 0 ? subtitles : undefined,
      music: selectedMusic,
      tts: enableTTS
    };

    const result = await composeFullVideo(clips, options);
    if (result) {
      const compositionData = {
        renderId: result,
        subtitles,
        music: selectedMusic,
        tts: enableTTS,
        originalContent: generatedContent
      };
      
      onComplete(compositionData);
      toast.success('Composition terminée !');
    }
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
            <Layers className="w-5 h-5 text-blue-500" />
            Étape 2: Composition & Post-production
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Content Info */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-medium mb-2">Contenu à composer:</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {generatedContent.type === 'video' ? 'Vidéo' : 'Image'}
              </Badge>
              <Badge variant="outline">{generatedContent.style}</Badge>
              {generatedContent.content.duration && (
                <Badge variant="outline">{generatedContent.content.duration}s</Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2 italic">
              "{generatedContent.prompt}"
            </p>
          </div>

          {/* Music Selection */}
          <MusicSelector
            onMusicSelect={setSelectedMusic}
            selectedMusic={selectedMusic}
          />

          {/* Subtitles Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5 text-purple-500" />
                Sous-titres et texte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* TTS Option */}
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="tts">Synthèse vocale (Text-to-Speech)</Label>
                  <p className="text-sm text-gray-600">
                    Générer automatiquement la voix off à partir du texte
                  </p>
                </div>
                <Switch
                  id="tts"
                  checked={enableTTS}
                  onCheckedChange={setEnableTTS}
                />
              </div>

              {/* Auto-generated subtitles */}
              {subtitles.length > 0 && (
                <div>
                  <Label className="font-medium">Sous-titres automatiques:</Label>
                  <div className="space-y-2 mt-2 max-h-32 overflow-y-auto">
                    {subtitles.map((subtitle, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex-1">
                          <span className="text-sm font-medium">
                            {subtitle.start}s - {(subtitle.start + subtitle.duration).toFixed(1)}s:
                          </span>
                          <span className="text-sm ml-2">{subtitle.text}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeSubtitle(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add custom subtitle */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <Label htmlFor="subtitle-text">Ajouter un sous-titre</Label>
                  <Input
                    id="subtitle-text"
                    placeholder="Texte du sous-titre..."
                    value={customSubtitle}
                    onChange={(e) => setCustomSubtitle(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="start-time">Début (s)</Label>
                    <Input
                      id="start-time"
                      type="number"
                      min="0"
                      step="0.1"
                      value={subtitleTiming.start}
                      onChange={(e) => setSubtitleTiming({
                        ...subtitleTiming,
                        start: parseFloat(e.target.value) || 0
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Durée (s)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={subtitleTiming.duration}
                      onChange={(e) => setSubtitleTiming({
                        ...subtitleTiming,
                        duration: parseFloat(e.target.value) || 1
                      })}
                    />
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={addSubtitle}
                disabled={!customSubtitle.trim()}
                variant="outline"
                size="sm"
              >
                Ajouter sous-titre
              </Button>
            </CardContent>
          </Card>

          {/* Compose Button */}
          <Button 
            onClick={handleCompose}
            disabled={isComposing}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            {isComposing ? (
              <>
                <Music className="w-4 h-4 mr-2 animate-pulse" />
                Composition en cours...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Composer la vidéo finale
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <CompositionPreview
        videoUrl={generatedContent.type === 'video' ? generatedContent.content.url : undefined}
        imageUrl={generatedContent.type === 'image' ? generatedContent.content.url : undefined}
        subtitles={subtitles}
        musicUrl={selectedMusic?.url}
        onUpdate={(data) => console.log('Composition updated:', data)}
      />
    </div>
  );
};

export default EnhancedCompositionStep;
