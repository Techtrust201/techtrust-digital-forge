import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Video, 
  Image as ImageIcon, 
  Wand2, 
  Calendar, 
  Upload, 
  Play,
  Download,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Clock,
  Save,
  Trash2,
  Eye,
  Zap,
  TrendingUp,
  Users,
  DollarSign,
  Link,
  Sparkles,
  FilmIcon,
  Settings,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { useAdvancedContentCreation } from '@/hooks/useAdvancedContentCreation';

const ContentCreation = () => {
  const [contentType, setContentType] = useState<'video' | 'image'>('video');
  const [prompt, setPrompt] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [duration, setDuration] = useState('10');
  const [style, setStyle] = useState('realistic');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  
  // Nouvelles fonctionnalités
  const [selectedModel, setSelectedModel] = useState<'seedance-1-lite' | 'seedance-1-pro'>('seedance-1-lite');
  const [clipCount, setClipCount] = useState(6); // Pour vidéo de 1 minute
  const [currentTab, setCurrentTab] = useState('generate');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [customDuration, setCustomDuration] = useState(false);
  const [totalDuration, setTotalDuration] = useState(60); // Durée totale souhaitée en secondes

  const {
    generateVideoClip,
    generateImage,
    composeFullVideo,
    isGenerating,
    isComposing,
    videoClips,
    generatedImages,
    socialConnections,
    connectSocialPlatform,
    getPostingRecommendations,
    schedulePost,
    scheduledPosts,
    saveDraft,
    loadDrafts,
    drafts
  } = useAdvancedContentCreation();

  useEffect(() => {
    loadDrafts();
  }, [loadDrafts]);

  // Calculer automatiquement le nombre de clips nécessaires
  useEffect(() => {
    if (customDuration) {
      const clipDuration = parseInt(duration);
      const neededClips = Math.ceil(totalDuration / clipDuration);
      setClipCount(Math.min(Math.max(neededClips, 1), 12)); // Entre 1 et 12 clips max
    }
  }, [totalDuration, duration, customDuration]);

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

  const socialPlatforms = [
    { id: 'tiktok', name: 'TikTok', icon: Video, color: 'bg-pink-500' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'bg-black' },
    { id: 'youtube', name: 'YouTube', icon: Play, color: 'bg-red-600' }
  ];

  const handlePlatformToggle = (platformId: string) => {
    setPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const generateSingleContent = async () => {
    if (!prompt.trim()) {
      toast.error('Veuillez saisir une description pour votre contenu');
      return;
    }

    if (contentType === 'video') {
      const clip = await generateVideoClip(prompt, style, parseInt(duration), selectedModel);
      if (clip) {
        toast.success(`Vidéo ${duration}s générée avec succès !`);
      }
    } else {
      const image = await generateImage(prompt, style);
      if (image) {
        toast.success('Image générée avec succès !');
      }
    }
  };

  const generateMultipleClips = async () => {
    if (!prompt.trim()) {
      toast.error('Veuillez saisir une description pour vos vidéos');
      return;
    }

    const clips = [];
    const totalCost = clipCount * (selectedModel === 'seedance-1-pro' ? 0.60 : 0.40);
    
    if (!confirm(`Générer ${clipCount} clips de ${duration}s ? Coût estimé: $${totalCost.toFixed(2)}`)) {
      return;
    }

    for (let i = 0; i < clipCount; i++) {
      const clipPrompt = `${prompt} - Partie ${i + 1}/${clipCount}`;
      const clip = await generateVideoClip(clipPrompt, style, parseInt(duration), selectedModel);
      if (clip) {
        clips.push(clip);
      } else {
        toast.error(`Erreur lors de la génération du clip ${i + 1}`);
        break;
      }
    }

    if (clips.length === clipCount) {
      toast.success(`${clipCount} clips générés avec succès ! Prêt pour la composition.`);
    }
  };

  const handleComposeVideo = async () => {
    if (videoClips.length === 0) {
      toast.error('Aucun clip vidéo disponible pour la composition');
      return;
    }

    const renderId = await composeFullVideo(videoClips, {
      subtitles: description ? [{ text: description, start: 0, duration: videoClips.length * parseInt(duration) }] : undefined,
      music: { url: 'https://example.com/royalty-free-music.mp3', title: 'Background Music' }
    });

    if (renderId) {
      toast.success('Composition démarrée ! Vous recevrez le résultat sous peu.');
    }
  };

  const handleShowRecommendations = async () => {
    if (platforms.length === 0) {
      toast.error('Sélectionnez d\'abord des plateformes');
      return;
    }

    const recommendations = await getPostingRecommendations(platforms);
    setShowRecommendations(true);
    
    console.log('Recommandations:', recommendations);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Studio IA Avancé</h2>
          <p className="text-gray-500 mt-1">Génération d'images et vidéos avec Replicate + composition multi-plateformes</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <DollarSign className="w-3 h-3 mr-1" />
            Images: $0.003 • Vidéos: $0.40-0.60
          </Badge>
          <Button onClick={() => saveDraft({ prompt, description, hashtags, style, platforms, contentType, duration })} variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="generate">
            <Wand2 className="w-4 h-4 mr-2" />
            Générer
          </TabsTrigger>
          <TabsTrigger value="compose">
            <FilmIcon className="w-4 h-4 mr-2" />
            Composer
          </TabsTrigger>
          <TabsTrigger value="social">
            <Link className="w-4 h-4 mr-2" />
            Réseaux
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar className="w-4 h-4 mr-2" />
            Programmer
          </TabsTrigger>
          <TabsTrigger value="drafts">
            <Save className="w-4 h-4 mr-2" />
            Brouillons
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Génération IA
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Type de contenu */}
                  <div>
                    <Label>Type de contenu</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant={contentType === 'video' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setContentType('video')}
                        className="flex items-center gap-2"
                      >
                        <Video className="w-4 h-4" />
                        Vidéo
                      </Button>
                      <Button
                        variant={contentType === 'image' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setContentType('image')}
                        className="flex items-center gap-2"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Image
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="prompt">Prompt créatif *</Label>
                    <Textarea
                      id="prompt"
                      placeholder={contentType === 'video' 
                        ? "Ex: Un chat ninja LEGO qui fait du parkour sur des gratte-ciels la nuit, style stop-motion..."
                        : "Ex: Portrait d'un astronaute futuriste sur Mars, style cyberpunk, éclairage néon..."
                      }
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                      <div>
                        <Label htmlFor="model">Modèle Seedance</Label>
                        <Select value={selectedModel} onValueChange={(value) => setSelectedModel(value as 'seedance-1-lite' | 'seedance-1-pro')}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="seedance-1-lite">
                              Seedance 1 Lite ($0.40)
                            </SelectItem>
                            <SelectItem value="seedance-1-pro">
                              Seedance 1 Pro ($0.60)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {contentType === 'video' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="duration">Durée par clip</Label>
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

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="custom-duration"
                            checked={customDuration}
                            onCheckedChange={setCustomDuration}
                          />
                          <Label htmlFor="custom-duration">Durée personnalisée</Label>
                        </div>
                      </div>

                      {customDuration && (
                        <div>
                          <Label>Durée totale souhaitée: {totalDuration}s</Label>
                          <div className="flex items-center gap-4 mt-2">
                            <input
                              type="range"
                              min="5"
                              max="120"
                              step="5"
                              value={totalDuration}
                              onChange={(e) => setTotalDuration(parseInt(e.target.value))}
                              className="flex-1"
                            />
                            <Badge variant="outline">
                              {clipCount} clips × {duration}s = {clipCount * parseInt(duration)}s
                            </Badge>
                          </div>
                        </div>
                      )}

                      {!customDuration && (
                        <div>
                          <Label>Clips pour vidéo: {clipCount} × {duration}s</Label>
                          <div className="flex items-center gap-4 mt-2">
                            <input
                              type="range"
                              min="1"
                              max="12"
                              value={clipCount}
                              onChange={(e) => setClipCount(parseInt(e.target.value))}
                              className="flex-1"
                            />
                            <Badge variant="outline">
                              Coût: ${(clipCount * (selectedModel === 'seedance-1-pro' ? 0.60 : 0.40)).toFixed(2)}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      onClick={generateSingleContent} 
                      disabled={isGenerating || !prompt.trim()}
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                    >
                      {isGenerating ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                          Génération...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 mr-2" />
                          Générer {contentType === 'video' ? `vidéo ${duration}s` : 'image'}
                        </>
                      )}
                    </Button>

                    {contentType === 'video' && clipCount > 1 && (
                      <Button 
                        onClick={generateMultipleClips} 
                        disabled={isGenerating || !prompt.trim()}
                        variant="outline"
                        className="flex-1"
                      >
                        <FilmIcon className="w-4 h-4 mr-2" />
                        Générer {clipCount} clips
                      </Button>
                    )}
                  </div>

                  {isGenerating && (
                    <Progress value={contentType === 'video' ? (videoClips.length / clipCount) * 100 : 50} className="w-full" />
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {/* Contenu généré */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    {contentType === 'video' 
                      ? `Clips générés (${videoClips.length})` 
                      : `Images générées (${generatedImages?.length || 0})`
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {contentType === 'video' ? (
                    videoClips.length === 0 ? (
                      <p className="text-gray-500 text-sm">Aucun clip encore généré</p>
                    ) : (
                      <div className="space-y-2">
                        {videoClips.slice(-5).map((clip, index) => (
                          <div key={clip.id} className="p-2 bg-green-50 rounded border border-green-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Clip {index + 1}</p>
                                <p className="text-xs text-gray-500">{clip.style} • {clip.duration}s • ${clip.cost}</p>
                              </div>
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  ) : (
                    generatedImages?.length === 0 ? (
                      <p className="text-gray-500 text-sm">Aucune image encore générée</p>
                    ) : (
                      <div className="space-y-2">
                        {generatedImages?.slice(-5).map((image, index) => (
                          <div key={image.id} className="p-2 bg-blue-50 rounded border border-blue-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Image {index + 1}</p>
                                <p className="text-xs text-gray-500">{image.style} • ${image.cost}</p>
                              </div>
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )) || []}
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compose" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilmIcon className="w-5 h-5 text-blue-500" />
                Composition vidéo finale (Shotstack)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="description">Description pour sous-titres</Label>
                  <Textarea
                    id="description"
                    placeholder="Texte qui apparaîtra en sous-titres..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Options audio</Label>
                    <div className="space-y-2 mt-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">Musique de fond</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">Voix off (TTS)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">Effets sonores</span>
                      </label>
                    </div>
                  </div>

                  <Badge variant="outline" className="w-full justify-center">
                    Coût composition: $0.30/minute
                  </Badge>
                </div>
              </div>

              <Button 
                onClick={handleComposeVideo}
                disabled={isComposing || videoClips.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isComposing ? (
                  <>
                    <Settings className="w-4 h-4 mr-2 animate-spin" />
                    Composition en cours...
                  </>
                ) : (
                  <>
                    <FilmIcon className="w-4 h-4 mr-2" />
                    Composer vidéo finale ({videoClips.length} clips)
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        

        <TabsContent value="social" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="w-5 h-5 text-green-500" />
                  Connexions réseaux sociaux
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {socialConnections.map((connection) => {
                  const platform = socialPlatforms.find(p => p.id === connection.platform);
                  const Icon = platform?.icon || Link;
                  
                  return (
                    <div key={connection.platform} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded ${platform?.color || 'bg-gray-500'}`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{platform?.name}</p>
                          {connection.connected && (
                            <p className="text-sm text-green-600">@{connection.username}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {connection.connected ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Button 
                            size="sm"
                            onClick={() => connectSocialPlatform(connection.platform)}
                          >
                            Connecter
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  Recommandations IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {socialPlatforms.slice(0, 3).map((platform) => (
                    <div key={platform.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <platform.icon className="w-4 h-4" />
                        <span className="font-medium">{platform.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>🕐 Meilleur moment: 18h-20h</p>
                        <p>📅 Meilleurs jours: Mar, Jeu, Ven</p>
                        <p>📊 Engagement: +18% en soirée</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button onClick={handleShowRecommendations} variant="outline" className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyse personnalisée
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                Programmation intelligente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hashtags">Hashtags optimisés</Label>
                  <Textarea
                    id="hashtags"
                    placeholder="#viral #trending #ai #video #content..."
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-3">
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

              <div>
                <Label>Plateformes sélectionnées</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                  {socialPlatforms.map((platform) => (
                    <Button
                      key={platform.id}
                      variant={platforms.includes(platform.id) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePlatformToggle(platform.id)}
                      className="flex items-center gap-2"
                    >
                      <platform.icon className="w-3 h-3" />
                      {platform.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    const content = contentType === 'video' ? videoClips[0] : generatedImages?.[0];
                    if (content) {
                      schedulePost(content, {
                        description,
                        hashtags,
                        platforms,
                        scheduledDate,
                        scheduledTime
                      });
                    } else {
                      toast.error('Générez d\'abord du contenu');
                    }
                  }}
                  className="flex-1" 
                  variant="outline"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Programmer
                </Button>
                
                <Button className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Publier maintenant
                </Button>
              </div>
            </CardContent>
          </Card>

          {scheduledPosts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Publications programmées ({scheduledPosts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduledPosts.slice(-5).map((post) => (
                    <div key={post.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{post.scheduledDate} à {post.scheduledTime}</p>
                          <p className="text-sm text-gray-500">{post.platforms.join(', ')}</p>
                        </div>
                        <Badge variant={post.status === 'scheduled' ? 'secondary' : 'default'}>
                          {post.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brouillons sauvegardés ({drafts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {drafts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Aucun brouillon sauvegardé</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drafts.map((draft) => (
                    <div key={draft.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {draft.contentType === 'video' ? (
                              <Video className="w-4 h-4 text-purple-500" />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-blue-500" />
                            )}
                            <Badge variant="outline" className="text-xs">
                              {draft.contentType === 'video' ? 'Vidéo' : 'Image'}
                            </Badge>
                          </div>
                          <p className="font-medium truncate">{draft.prompt}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(draft.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600 mt-2">
                            Style: {draft.style} • Plateformes: {draft.platforms?.length || 0}
                            {draft.contentType === 'video' && ` • ${draft.duration}s`}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentCreation;
