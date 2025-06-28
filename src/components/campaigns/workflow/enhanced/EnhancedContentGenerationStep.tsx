import React, { useState, useEffect } from 'react';
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
  Eye,
  Bot,
  Lightbulb,
  Hash,
  MessageSquare,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { useAIOptimization } from '@/hooks/useAIOptimization';
import { useContentPersistence } from '@/hooks/useContentPersistence';
import VideoPreview from '../VideoPreview';
import ImagePreview from '../ImagePreview';

interface EnhancedContentGenerationStepProps {
  onComplete: (data: any) => void;
  generateVideoClip: (prompt: string, style: string, duration: number, model: 'seedance-1-lite' | 'seedance-1-pro') => Promise<any>;
  generateImage: (prompt: string, style: string) => Promise<any>;
  isGenerating: boolean;
  videoClips: any[];
  generatedImages: any[];
}

const EnhancedContentGenerationStep: React.FC<EnhancedContentGenerationStepProps> = ({
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
  const [aiOptimization, setAiOptimization] = useState<any>(null);
  const [showOptimization, setShowOptimization] = useState(false);

  const { optimizePrompt, isOptimizing } = useAIOptimization();
  const { persistedContent, saveContent, getRecentContent } = useContentPersistence();

  // Load recent content on mount
  useEffect(() => {
    const recent = getRecentContent();
    if (recent.length > 0 && !previewContent) {
      // Optionally restore the last generated content
      console.log('Recent content available:', recent.length);
    }
  }, []);

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

  const handleOptimizePrompt = async () => {
    if (!prompt.trim()) {
      toast.error('Saisissez d\'abord une description');
      return;
    }

    const optimization = await optimizePrompt(prompt, contentType, style);
    if (optimization) {
      setAiOptimization(optimization);
      setShowOptimization(true);
    }
  };

  const applyOptimization = () => {
    if (aiOptimization) {
      setPrompt(aiOptimization.optimizedPrompt);
      setShowOptimization(false);
      toast.success('🤖 Prompt optimisé appliqué !');
    }
  };

  const calculateCost = () => {
    if (contentType === 'video') {
      const duration = parseInt(customDuration);
      const baseCost = model === 'seedance-1-pro' ? 0.60 : 0.40;
      const extraCost = duration > 10 ? (duration - 10) * 0.05 : 0;
      return (baseCost + extraCost).toFixed(2);
    }
    return '0.003';
  };

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
      const contentData = {
        type: contentType,
        content: result,
        prompt,
        style,
        optimizedData: aiOptimization
      };

      setPreviewContent(contentData);
      
      // Save to persistence
      saveContent(contentData);
      
      toast.success('Contenu généré et sauvegardé !');
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
      onComplete({
        ...previewContent,
        socialData: aiOptimization // Include hashtags and description
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Génération IA avec optimisation automatique
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

          {/* Prompt with AI Optimization */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="prompt" className="text-base font-medium">
                Description créative *
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleOptimizePrompt}
                disabled={isOptimizing || !prompt.trim()}
                className="flex items-center gap-2"
              >
                <Bot className="w-3 h-3" />
                {isOptimizing ? 'Optimisation...' : 'Optimiser avec IA'}
              </Button>
            </div>
            <Textarea
              id="prompt"
              placeholder={contentType === 'video' 
                ? "Ex: défense de la nature..."
                : "Ex: portrait d'un astronaute futuriste..."
              }
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* AI Optimization Results */}
          {showOptimization && aiOptimization && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Bot className="w-4 h-4 text-blue-600" />
                  Optimisation IA suggérée
                  <Badge variant="outline" className="text-blue-700">
                    Confiance: {aiOptimization.confidence}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs font-medium text-blue-800">Prompt optimisé:</Label>
                  <p className="text-sm bg-white p-2 rounded border italic">
                    "{aiOptimization.optimizedPrompt}"
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-medium text-blue-800 flex items-center gap-1">
                      <Hash className="w-3 h-3" /> Hashtags suggérés:
                    </Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {aiOptimization.hashtags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs font-medium text-blue-800 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> Description:
                    </Label>
                    <p className="text-xs bg-white p-2 rounded border">
                      {aiOptimization.description}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-blue-800 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" /> Suggestions d'amélioration:
                  </Label>
                  <ul className="text-xs space-y-1 mt-1">
                    {aiOptimization.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-blue-600">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" onClick={applyOptimization} className="bg-blue-600 hover:bg-blue-700">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Appliquer l'optimisation
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setShowOptimization(false)}>
                    Ignorer
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

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
                Générer {contentType === 'video' ? `vidéo ${customDuration}s` : 'image'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Enhanced Preview with Real Media */}
      {previewContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-500" />
              Contenu généré avec données sociales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              {/* Media Preview */}
              <div className="mb-4">
                {previewContent.type === 'video' ? (
                  <VideoPreview
                    videoUrl={previewContent.content.url}
                    title={`Vidéo ${previewContent.content.duration}s`}
                    onDownload={() => handleDownload(
                      previewContent.content.url,
                      `video_${Date.now()}.mp4`
                    )}
                  />
                ) : (
                  <ImagePreview
                    imageUrl={previewContent.content.url}
                    alt="Image générée"
                    onDownload={() => handleDownload(
                      previewContent.content.url,
                      `image_${Date.now()}.jpg`
                    )}
                  />
                )}
              </div>

              {/* Social Media Data */}
              {aiOptimization && (
                <div className="bg-white p-3 rounded border space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Bot className="w-4 h-4 text-blue-500" />
                    Données pour réseaux sociaux
                  </h4>
                  
                  <div>
                    <Label className="text-xs font-medium">Hashtags optimisés:</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {aiOptimization.hashtags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs font-medium">Description engageante:</Label>
                    <p className="text-sm bg-gray-50 p-2 rounded mt-1">
                      {aiOptimization.description}
                    </p>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleUseContent}
                className="w-full mt-4 bg-green-600 hover:bg-green-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Utiliser ce contenu optimisé → Composition
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Generated Content */}
      {persistedContent.length > 0 && !previewContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Contenu récent (persistant)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {persistedContent.slice(0, 3).map((content, index) => (
                <div key={content.id} className="p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">
                        {content.type === 'video' ? 'Vidéo' : 'Image'} {index + 1}
                      </p>
                      <p className="text-xs text-gray-600 truncate max-w-xs">
                        {content.prompt}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(content.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setPreviewContent(content)}
                    >
                      Restaurer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedContentGenerationStep;
