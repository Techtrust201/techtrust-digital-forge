
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
  Lightbulb,
  Hash,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { useAIOptimization } from '@/hooks/useAIOptimization';
import { useContentPersistence } from '@/hooks/useContentPersistence';

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
  const { optimizePrompt, isOptimizing } = useAIOptimization();
  const { workflowState, updateWorkflowState, getRecentContent } = useContentPersistence();
  
  const [optimizedContent, setOptimizedContent] = useState<any>(null);

  // Load state from persistence
  const [contentType, setContentType] = useState<'video' | 'image'>(workflowState.contentType);
  const [prompt, setPrompt] = useState(workflowState.prompt);
  const [style, setStyle] = useState(workflowState.style);
  const [customDuration, setCustomDuration] = useState(workflowState.customDuration);
  const [model, setModel] = useState<'seedance-1-lite' | 'seedance-1-pro'>(workflowState.model as any);
  const [previewContent, setPreviewContent] = useState(workflowState.previewContent);

  // Update workflow state when values change
  useEffect(() => {
    updateWorkflowState({
      contentType,
      prompt,
      style,
      customDuration,
      model,
      previewContent
    });
  }, [contentType, prompt, style, customDuration, model, previewContent, updateWorkflowState]);

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
      toast.error('Veuillez saisir un prompt à optimiser');
      return;
    }

    const result = await optimizePrompt(prompt, contentType, style);
    if (result) {
      setOptimizedContent(result);
      toast.success('🤖 Prompt optimisé par l\'IA !');
    }
  };

  const handleUseOptimizedPrompt = () => {
    if (optimizedContent?.optimizedPrompt) {
      setPrompt(optimizedContent.optimizedPrompt);
      toast.success('Prompt optimisé appliqué !');
    }
  };

  const handleGenerate = async () => {
    const finalPrompt = optimizedContent?.optimizedPrompt || prompt;
    
    if (!finalPrompt.trim()) {
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
      result = await generateVideoClip(finalPrompt, style, duration, model);
    } else {
      result = await generateImage(finalPrompt, style);
    }

    if (result) {
      const contentWithSocial = {
        type: contentType,
        content: result,
        prompt: finalPrompt,
        style,
        socialData: optimizedContent ? {
          description: optimizedContent.description,
          hashtags: optimizedContent.hashtags,
          suggestions: optimizedContent.suggestions
        } : null
      };
      
      setPreviewContent(contentWithSocial);
      toast.success('Contenu généré ! Prévisualisez-le ci-dessous.');
    }
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      // Create a proper download with CORS handling
      const proxyUrl = `/api/download?url=${encodeURIComponent(url)}`;
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Try direct download first
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Téléchargement démarré !');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Erreur lors du téléchargement. Essayez de faire un clic droit > Enregistrer sous...');
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
      const extraCost = duration > 10 ? (duration - 10) * 0.05 : 0;
      return (baseCost + extraCost).toFixed(2);
    }
    return '0.003';
  };

  const recentContent = getRecentContent();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Génération de contenu IA avancée
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
            <Label htmlFor="prompt" className="text-base font-medium">
              Description créative *
            </Label>
            <Textarea
              id="prompt"
              placeholder={contentType === 'video' 
                ? "Ex: défense des animaux, protection de la nature..."  
                : "Ex: fleur unique, paysage mystérieux..."
              }
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <div className="flex gap-2 mt-2">
              <Button
                onClick={handleOptimizePrompt}
                disabled={isOptimizing || !prompt.trim()}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <Lightbulb className="w-3 h-3" />
                {isOptimizing ? 'Optimisation...' : 'Optimiser avec IA'}
              </Button>
              {optimizedContent && (
                <Button
                  onClick={handleUseOptimizedPrompt}
                  size="sm"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <Wand2 className="w-3 h-3" />
                  Utiliser le prompt optimisé
                </Button>
              )}
            </div>
          </div>

          {/* AI Optimization Results */}
          {optimizedContent && (
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  Optimisations IA (Confiance: {optimizedContent.confidence}%)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1">Prompt optimisé:</h4>
                  <p className="text-sm bg-white p-2 rounded border">{optimizedContent.optimizedPrompt}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    Hashtags suggérés:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {optimizedContent.hashtags.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-green-700 border-green-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    Description pour réseaux sociaux:
                  </h4>
                  <p className="text-sm bg-white p-2 rounded border">{optimizedContent.description}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-1">Suggestions d'amélioration:</h4>
                  <ul className="text-sm space-y-1">
                    {optimizedContent.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
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
                  <Label htmlFor="duration">Durée (5-120s)</Label>
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
                  <Select value={model} onValueChange={(value) => setModel(value as any)}>
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

      {/* Preview Generated Content */}
      {previewContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-500" />
              Contenu généré avec optimisations IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Media Preview */}
            <div className="bg-white rounded-lg p-4 border">
              {previewContent.type === 'video' ? (
                <div className="text-center">
                  <Video className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Vidéo prête • {previewContent.content.duration}s
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline">
                      <Play className="w-3 h-3 mr-1" />
                      Aperçu
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(
                        previewContent.content.url, 
                        `video_${Date.now()}.mp4`
                      )}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  {previewContent.content.url ? (
                    <img 
                      src={previewContent.content.url} 
                      alt="Image générée"
                      className="max-w-full max-h-64 mx-auto rounded-lg"
                      onError={(e) => {
                        console.error('Image load error');
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full max-w-md mx-auto bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <div className="flex gap-2 justify-center mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(
                        previewContent.content.url, 
                        `image_${Date.now()}.jpg`
                      )}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Social Content Preview */}
            {previewContent.socialData && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium mb-2">Contenu optimisé pour les réseaux sociaux:</h4>
                <p className="text-sm mb-2">{previewContent.socialData.description}</p>
                <div className="flex flex-wrap gap-1">
                  {previewContent.socialData.hashtags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-blue-700 border-blue-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Use Content Button */}
            <Button 
              onClick={handleUseContent}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Utiliser ce contenu → Étape suivante
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recent Content */}
      {recentContent.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Contenu récent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentContent.map((content) => (
                <div key={content.id} className="p-3 bg-gray-50 rounded border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{content.type === 'video' ? 'Vidéo' : 'Image'}</p>
                      <p className="text-sm text-gray-600">{content.prompt}</p>
                      <p className="text-xs text-gray-500">{content.style}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          const contentWithSocial = {
                            type: content.type,
                            content: content.content,
                            prompt: content.prompt,
                            style: content.style,
                            socialData: content.optimizedData
                          };
                          setPreviewContent(contentWithSocial);
                        }}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDownload(
                          content.content.url, 
                          `${content.type}_${content.id}.${content.type === 'video' ? 'mp4' : 'jpg'}`
                        )}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
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
