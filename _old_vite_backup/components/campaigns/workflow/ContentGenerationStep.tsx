
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
  DollarSign,
  Download,
  Play,
  Eye
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
  const [customDuration, setCustomDuration] = useState('10');
  const [model, setModel] = useState<'seedance-1-lite' | 'seedance-1-pro'>('seedance-1-lite');
  const [previewContent, setPreviewContent] = useState<any>(null);

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
      const duration = parseInt(customDuration);
      if (duration < 5 || duration > 120) {
        toast.error('La durée doit être entre 5 et 120 secondes');
        return;
      }
      result = await generateVideoClip(prompt, style, duration, model);
    } else {
      result = await generateImage(prompt, style);
    }

    if (result) {
      setPreviewContent({
        type: contentType,
        content: result,
        prompt,
        style
      });
      toast.success('Contenu généré ! Prévisualisez-le ci-dessous.');
    }
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      toast.success('Téléchargement démarré !');
    } catch (error) {
      toast.error('Erreur lors du téléchargement');
    }
  };

  const handleUseContent = () => {
    if (previewContent) {
      onComplete(previewContent);
    }
  };

  const calculateCost = () => {
    if (contentType === 'video') {
      const duration = parseInt(customDuration);
      const baseCost = model === 'seedance-1-pro' ? 0.60 : 0.40;
      // Coût supplémentaire pour les vidéos plus longues
      const extraCost = duration > 10 ? (duration - 10) * 0.05 : 0;
      return (baseCost + extraCost).toFixed(2);
    }
    return '0.003';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Étape 1: Génération du contenu IA
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
                ? "Ex: Un chat ninja LEGO qui fait du parkour sur des gratte-ciels la nuit, style stop-motion avec des effets de lumière dramatiques..."
                : "Ex: Portrait d'un astronaute futuriste sur Mars, style cyberpunk, éclairage néon rose et bleu, très détaillé..."
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
                  <Label htmlFor="duration">Durée personnalisée (5-120s)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="5"
                    max="120"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(e.target.value)}
                    placeholder="Ex: 30"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Vidéos longues = plusieurs clips cohérents assemblés
                  </p>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="model">Modèle Seedance</Label>
                  <Select value={model} onValueChange={(value) => setModel(value as 'seedance-1-lite' | 'seedance-1-pro')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seedance-1-lite">
                        Seedance 1 Lite - Rapide et économique
                      </SelectItem>
                      <SelectItem value="seedance-1-pro">
                        Seedance 1 Pro - Qualité supérieure
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
              Coût estimé: ${calculateCost()}
            </Badge>
            {contentType === 'video' && parseInt(customDuration) > 10 && (
              <Badge variant="outline" className="text-amber-700 border-amber-200">
                Vidéo longue: sera composée de clips cohérents
              </Badge>
            )}
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
                Génération en cours... (peut prendre quelques minutes)
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Générer {contentType === 'video' ? `vidéo ${customDuration}s` : 'image'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Preview Generated Content */}
      {previewContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-500" />
              Prévisualisation du contenu généré
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium">
                    {previewContent.type === 'video' ? 'Vidéo générée' : 'Image générée'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Style: {previewContent.style} • 
                    {previewContent.type === 'video' && ` Durée: ${previewContent.content.duration}s •`}
                    Coût: ${previewContent.content.cost}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(
                      previewContent.content.url, 
                      `${previewContent.type}_${Date.now()}.${previewContent.type === 'video' ? 'mp4' : 'jpg'}`
                    )}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Télécharger
                  </Button>
                </div>
              </div>

              {/* Media Preview */}
              <div className="bg-white rounded-lg p-4 mb-4">
                {previewContent.type === 'video' ? (
                  <div className="text-center">
                    <Video className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Vidéo prête • {previewContent.content.duration}s
                    </p>
                    <Button size="sm" variant="outline">
                      <Play className="w-3 h-3 mr-1" />
                      Voir l'aperçu
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-full max-w-md mx-auto bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Image générée • {previewContent.content.dimensions?.width}x{previewContent.content.dimensions?.height}
                    </p>
                  </div>
                )}
              </div>

              <div className="text-xs bg-white p-2 rounded italic">
                Prompt: "{previewContent.prompt}"
              </div>

              {/* Use Content Button */}
              <Button 
                onClick={handleUseContent}
                className="w-full mt-4 bg-green-600 hover:bg-green-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Utiliser ce contenu → Passer à la composition
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Generated Content */}
      {(videoClips.length > 0 || generatedImages.length > 0) && !previewContent && (
        <Card>
          <CardHeader>
            <CardTitle>Contenu généré récemment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contentType === 'video' ? (
                videoClips.slice(-3).map((clip, index) => (
                  <div key={clip.id} className="p-3 bg-blue-50 rounded border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Vidéo {index + 1}</p>
                        <p className="text-sm text-gray-600">{clip.style} • {clip.duration}s • ${clip.cost}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleDownload(clip.url, `video_${clip.id}.mp4`)}>
                          <Download className="w-3 h-3" />
                        </Button>
                        <Badge variant="outline" className="text-blue-700">Disponible</Badge>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                generatedImages.slice(-3).map((image, index) => (
                  <div key={image.id} className="p-3 bg-purple-50 rounded border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Image {index + 1}</p>
                        <p className="text-sm text-gray-600">{image.style} • ${image.cost}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleDownload(image.url, `image_${image.id}.jpg`)}>
                          <Download className="w-3 h-3" />
                        </Button>
                        <Badge variant="outline" className="text-purple-700">Disponible</Badge>
                      </div>
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
