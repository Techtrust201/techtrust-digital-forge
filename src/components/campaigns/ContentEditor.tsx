
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wand2, 
  Hash, 
  Calendar, 
  Clock, 
  Send, 
  Save, 
  Eye,
  Copy,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Smartphone,
  Settings
} from 'lucide-react';

interface ContentEditorProps {
  contentId?: string;
  contentType: 'video' | 'image';
  onSave?: (data: any) => void;
  onPublish?: (data: any) => void;
  onSchedule?: (data: any) => void;
}

const ContentEditor = ({ contentId, contentType, onSave, onPublish, onSchedule }: ContentEditorProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const platforms = [
    { id: 'tiktok', name: 'TikTok', icon: Smartphone, color: 'bg-black text-white' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'bg-red-500 text-white' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600 text-white' },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'bg-black text-white' }
  ];

  const generateDescription = async () => {
    // Simulation d'appel IA pour générer description + hashtags
    const aiDescription = `Découvrez ${title || 'notre contenu'} dans cette ${contentType === 'video' ? 'vidéo' : 'image'} captivante ! ✨`;
    const aiHashtags = '#innovation #digital #content #viral #trending #business #growth #success';
    
    setDescription(aiDescription);
    setHashtags(aiHashtags);
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSave = () => {
    const data = {
      title,
      description,
      hashtags: hashtags.split(' ').filter(h => h.startsWith('#')),
      platforms: selectedPlatforms,
      status: 'draft'
    };
    onSave?.(data);
  };

  const handleSchedule = () => {
    if (!scheduledDate || !scheduledTime) return;
    
    const data = {
      title,
      description,
      hashtags: hashtags.split(' ').filter(h => h.startsWith('#')),
      platforms: selectedPlatforms,
      scheduledDate: `${scheduledDate} ${scheduledTime}`,
      status: 'scheduled'
    };
    onSchedule?.(data);
  };

  const handlePublish = () => {
    const data = {
      title,
      description,
      hashtags: hashtags.split(' ').filter(h => h.startsWith('#')),
      platforms: selectedPlatforms,
      status: 'published'
    };
    onPublish?.(data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Édition {contentType === 'video' ? 'Vidéo' : 'Image'}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
          </Button>
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Aperçu
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contenu principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations du contenu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Titre</label>
                <Input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titre de votre contenu..."
                />
              </div>

              <div>
                <label className="text-sm font-medium flex items-center justify-between">
                  Description
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={generateDescription}
                  >
                    <Wand2 className="w-4 h-4 mr-1" />
                    Générer avec IA
                  </Button>
                </label>
                <Textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description de votre contenu..."
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Hashtags
                </label>
                <Textarea 
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  placeholder="#hashtag1 #hashtag2 #hashtag3..."
                  rows={2}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Séparez les hashtags par des espaces
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Programmation */}
          <Card>
            <CardHeader>
              <CardTitle>Programmation</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="now">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="now">Publier maintenant</TabsTrigger>
                  <TabsTrigger value="schedule">Programmer</TabsTrigger>
                </TabsList>
                
                <TabsContent value="now" className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Le contenu sera publié immédiatement sur les plateformes sélectionnées
                  </p>
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={handlePublish}
                    disabled={selectedPlatforms.length === 0}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Publier maintenant
                  </Button>
                </TabsContent>
                
                <TabsContent value="schedule" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Date</label>
                      <Input 
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Heure</label>
                      <Input 
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    onClick={handleSchedule}
                    disabled={selectedPlatforms.length === 0 || !scheduledDate || !scheduledTime}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Programmer la publication
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Plateformes */}
          <Card>
            <CardHeader>
              <CardTitle>Plateformes de publication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {platforms.map((platform) => {
                  const IconComponent = platform.icon;
                  const isSelected = selectedPlatforms.includes(platform.id);
                  
                  return (
                    <div 
                      key={platform.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        isSelected ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => togglePlatform(platform.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded ${platform.color}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">{platform.name}</div>
                            <div className="text-xs text-gray-500">
                              {platform.id === 'tiktok' && 'Optimal: 15s-3min, 9:16'}
                              {platform.id === 'instagram' && 'Stories/Reels: 9:16, Posts: 1:1'}
                              {platform.id === 'youtube' && 'Shorts: 9:16, Video: 16:9'}
                              {platform.id === 'facebook' && 'Video: 16:9, Image: 1.91:1'}
                              {platform.id === 'twitter' && 'Video: 16:9, 2min20 max'}
                            </div>
                          </div>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => togglePlatform(platform.id)}
                          className="rounded"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {selectedPlatforms.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">
                    {selectedPlatforms.length} plateforme{selectedPlatforms.length > 1 ? 's' : ''} sélectionnée{selectedPlatforms.length > 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Copy className="w-4 h-4 mr-2" />
                Dupliquer le contenu
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres avancés
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                Prévisualiser sur mobile
              </Button>
            </CardContent>
          </Card>

          {/* Conseils IA */}
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wand2 className="w-4 h-4 text-purple-500" />
                <span className="font-medium text-purple-700">Conseil IA</span>
              </div>
              <p className="text-sm text-purple-600">
                Pour maximiser l'engagement, publiez entre 18h-21h en semaine et 14h-16h le weekend.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
