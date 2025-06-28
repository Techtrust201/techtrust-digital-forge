
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Image as ImageIcon, 
  Wand2, 
  Sparkles,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';

interface ContentGenerationStepProps {
  onComplete: (data: any) => void;
  generateVideoClip: (prompt: string, style: string, duration: number, model: 'seedance-1-lite' | 'seedance-1-pro') => Promise<any>;
  generateImage: (prompt: string, style: string) => Promise<any>;
  isGenerating: boolean;
  videoClips: any[];
  generatedImages: any[];
}

const ContentGenerationStep: React.FC<ContentGenerationStepProps> = ({
  onComplete,
  generateVideoClip,
  generateImage,
  isGenerating,
  videoClips,
  generatedImages
}) => {
  const [contentType, setContentType] = useState<'video' | 'image'>('video');
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [duration, setDuration] = useState('10');
  const [model, setModel] = useState<'seedance-1-lite' | 'seedance-1-pro'>('seedance-1-lite');

  const videoStyles = [
    { value: 'realistic', label: 'Réaliste' },
    { value: 'lego', label: 'LEGO Stop-Motion' },
    { value: 'anime', label: 'Anime/Manga' },
    { value: 'cartoon', label: 'Cartoon 3D' },
    { value: 'cinematic', label: 'Cinématique' },
    { value: 'cyberpunk', label: 'Cyberpunk' },
    { value: 'vintage', label: 'Vintage/Retro' },
    { value: 'minimalist', label: 'Minimaliste' }
  ];

  const imageStyles = [
    { value: 'realistic', label: 'Photo réaliste' },
    { value: 'digital-art', label: 'Art numérique' },
    { value: 'illustration', label: 'Illustration' },
    { value: 'concept-art', label: 'Concept Art' },
    { value: 'anime', label: 'Style Anime' },
    { value: 'minimalist', label: 'Minimaliste' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'abstract', label: 'Abstrait' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Veuillez saisir une description pour votre contenu');
      return;
    }

    let result;
    if (contentType === 'video') {
      result = await generateVideoClip(prompt, style, parseInt(duration), model);
    } else {
      result = await generateImage(prompt, style);
    }

    if (result) {
      onComplete({
        type: contentType,
        content: result,
        prompt,
        style
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Étape 1: Génération du contenu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Type Selection */}
          <div>
            <Label className="text-base font-medium">Type de contenu</Label>
            <div className="flex gap-4 mt-2">
              <Button
                variant={contentType === 'video' ? 'default' : 'outline'}
                onClick={() => setContentType('video')}
                className="flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                Vidéo
              </Button>
              <Button
                variant={contentType === 'image' ? 'default' : 'outline'}
                onClick={() => setContentType('image')}
                className="flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                Image
              </Button>
            </div>
          </div>

          {/* Prompt */}
          <div>
            <Label htmlFor="prompt" className="text-base font-medium">
              Description créative *
            </Label>
            <Textarea
              id="prompt"
              placeholder={contentType === 'video' 
                ? "Ex: Un chat ninja LEGO qui fait du parkour sur des gratte-ciels la nuit, style stop-motion..."
                : "Ex: Portrait d'un astronaute futuriste sur Mars, style cyberpunk, éclairage néon..."
              }
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="style">Style visuel</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(contentType === 'video' ? videoStyles : imageStyles).map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {contentType === 'video' && (
              <>
                <div>
                  <Label htmlFor="duration">Durée</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 secondes</SelectItem>
                      <SelectItem value="10">10 secondes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="model">Modèle Seedance</Label>
                  <Select value={model} onValueChange={(value) => setModel(value as 'seedance-1-lite' | 'seedance-1-pro')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seedance-1-lite">
                        Seedance 1 Lite ($0.40) - Rapide
                      </SelectItem>
                      <SelectItem value="seedance-1-pro">
                        Seedance 1 Pro ($0.60) - Qualité supérieure
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>

          {/* Cost Badge */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <DollarSign className="w-3 h-3 mr-1" />
              Coût estimé: {contentType === 'video' 
                ? `$${model === 'seedance-1-pro' ? '0.60' : '0.40'}`
                : '$0.003'
              }
            </Badge>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Générer {contentType === 'video' ? `vidéo ${duration}s` : 'image'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Content Preview */}
      {(videoClips.length > 0 || generatedImages.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Contenu généré</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contentType === 'video' ? (
                videoClips.slice(-3).map((clip, index) => (
                  <div key={clip.id} className="p-3 bg-green-50 rounded border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Vidéo {index + 1}</p>
                        <p className="text-sm text-gray-600">{clip.style} • {clip.duration}s • ${clip.cost}</p>
                      </div>
                      <Badge variant="outline" className="text-green-700">Prêt</Badge>
                    </div>
                  </div>
                ))
              ) : (
                generatedImages.slice(-3).map((image, index) => (
                  <div key={image.id} className="p-3 bg-blue-50 rounded border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Image {index + 1}</p>
                        <p className="text-sm text-gray-600">{image.style} • ${image.cost}</p>
                      </div>
                      <Badge variant="outline" className="text-blue-700">Prêt</Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentGenerationStep;
