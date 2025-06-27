
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
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
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

const ContentCreation = () => {
  const [contentType, setContentType] = useState<'video' | 'image'>('video');
  const [prompt, setPrompt] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [duration, setDuration] = useState('30');
  const [style, setStyle] = useState('modern');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<any[]>([]);

  const videoStyles = [
    { value: 'modern', label: 'Moderne' },
    { value: 'cinematic', label: 'Cinématique' },
    { value: 'cartoon', label: 'Cartoon' },
    { value: 'realistic', label: 'Réaliste' },
    { value: 'artistic', label: 'Artistique' }
  ];

  const imageStyles = [
    { value: 'photo', label: 'Photo réaliste' },
    { value: 'illustration', label: 'Illustration' },
    { value: 'digital-art', label: 'Art numérique' },
    { value: 'minimalist', label: 'Minimaliste' },
    { value: 'vintage', label: 'Vintage' }
  ];

  const socialPlatforms = [
    { id: 'tiktok', name: 'TikTok', icon: Video },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'twitter', name: 'Twitter', icon: Twitter }
  ];

  const handlePlatformToggle = (platformId: string) => {
    setPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast.error('Veuillez saisir une description pour votre contenu');
      return;
    }

    setIsGenerating(true);
    try {
      // Simulation de génération IA
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (contentType === 'video') {
        setGeneratedContent('video_generated_' + Date.now() + '.mp4');
      } else {
        setGeneratedContent('image_generated_' + Date.now() + '.jpg');
      }
      
      toast.success(`${contentType === 'video' ? 'Vidéo' : 'Image'} générée avec succès !`);
    } catch (error) {
      toast.error('Erreur lors de la génération');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateDescription = async () => {
    if (!prompt.trim()) {
      toast.error('Veuillez d\'abord saisir une description du contenu');
      return;
    }

    try {
      // Simulation de génération IA de description
      const generatedDesc = `Découvrez ${prompt.toLowerCase()} ! Une expérience unique qui va vous surprendre. Ne manquez pas cette opportunité incroyable de découvrir quelque chose d'exceptionnel.`;
      const generatedTags = '#viral #trending #amazing #discover #unique #content #video #creative #inspiration #motivation';
      
      setDescription(generatedDesc);
      setHashtags(generatedTags);
      
      toast.success('Description et hashtags générés !');
    } catch (error) {
      toast.error('Erreur lors de la génération de la description');
    }
  };

  const saveDraft = () => {
    const draft = {
      id: Date.now(),
      type: contentType,
      prompt,
      description,
      hashtags,
      duration,
      style,
      platforms,
      createdAt: new Date().toISOString()
    };
    
    setDrafts(prev => [...prev, draft]);
    toast.success('Brouillon sauvegardé !');
  };

  const schedulePost = () => {
    if (!generatedContent) {
      toast.error('Veuillez d\'abord générer le contenu');
      return;
    }
    
    if (platforms.length === 0) {
      toast.error('Veuillez sélectionner au moins une plateforme');
      return;
    }

    if (!scheduledDate || !scheduledTime) {
      toast.error('Veuillez définir une date et heure de publication');
      return;
    }

    toast.success(`Publication programmée pour le ${scheduledDate} à ${scheduledTime} sur ${platforms.join(', ')}`);
  };

  const publishNow = () => {
    if (!generatedContent) {
      toast.error('Veuillez d\'abord générer le contenu');
      return;
    }
    
    if (platforms.length === 0) {
      toast.error('Veuillez sélectionner au moins une plateforme');
      return;
    }

    toast.success(`Contenu publié immédiatement sur ${platforms.join(', ')} !`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Création de Contenu IA</h2>
          <p className="text-gray-500 mt-1">Créez des vidéos et images avec l'intelligence artificielle</p>
        </div>
        <Button onClick={saveDraft} variant="outline">
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panneau de création principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {contentType === 'video' ? <Video className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                Paramètres de création
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  variant={contentType === 'video' ? 'default' : 'outline'}
                  onClick={() => setContentType('video')}
                  className="flex-1"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Vidéo
                </Button>
                <Button 
                  variant={contentType === 'image' ? 'default' : 'outline'}
                  onClick={() => setContentType('image')}
                  className="flex-1"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Image
                </Button>
              </div>

              <div>
                <Label htmlFor="prompt">Description du contenu *</Label>
                <Textarea
                  id="prompt"
                  placeholder={`Décrivez votre ${contentType === 'video' ? 'vidéo' : 'image'}... Par exemple: "Une vidéo sur les bienfaits du sport"`}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                />
              </div>

              {contentType === 'video' && (
                <div>
                  <Label htmlFor="duration">Durée (secondes)</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 secondes</SelectItem>
                      <SelectItem value="30">30 secondes</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="90">1 minute 30</SelectItem>
                      <SelectItem value="120">2 minutes</SelectItem>
                      <SelectItem value="180">3 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="style">Style</Label>
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

              <Button 
                onClick={generateContent} 
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                {isGenerating ? 'Génération en cours...' : `Générer ${contentType === 'video' ? 'la vidéo' : 'l\'image'}`}
              </Button>

              {generatedContent && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {contentType === 'video' ? <Video className="w-5 h-5 text-green-600" /> : <ImageIcon className="w-5 h-5 text-green-600" />}
                      <span className="text-green-800 font-medium">
                        {contentType === 'video' ? 'Vidéo générée' : 'Image générée'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Description et Hashtags
                <Button onClick={generateDescription} size="sm" variant="outline">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Générer IA
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Description qui accompagnera votre publication..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="hashtags">Hashtags</Label>
                <Textarea
                  id="hashtags"
                  placeholder="#hashtag1 #hashtag2 #hashtag3..."
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panneau latéral */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plateformes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {socialPlatforms.map((platform) => (
                <div key={platform.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <platform.icon className="w-5 h-5" />
                    <span>{platform.name}</span>
                  </div>
                  <Switch
                    checked={platforms.includes(platform.id)}
                    onCheckedChange={() => handlePlatformToggle(platform.id)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Programmation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="time">Heure</Label>
                <Input
                  id="time"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={schedulePost} className="flex-1" variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  Programmer
                </Button>
                <Button onClick={publishNow} className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Publier
                </Button>
              </div>
            </CardContent>
          </Card>

          {drafts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Brouillons ({drafts.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {drafts.slice(-3).map((draft) => (
                  <div key={draft.id} className="p-2 bg-gray-50 rounded flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium truncate">{draft.prompt}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(draft.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCreation;
