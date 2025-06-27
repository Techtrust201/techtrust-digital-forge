
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Video, 
  Image as ImageIcon, 
  Wand2, 
  Calendar, 
  Send, 
  Save,
  Plus,
  Play,
  Pause,
  Download,
  Share2,
  Hash,
  Clock,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Repeat2,
  Settings,
  Smartphone,
  Monitor,
  Instagram,
  Twitter,
  Youtube,
  Facebook
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ContentCreation = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [contentType, setContentType] = useState('video');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Données simulées pour les contenus créés
  const createdContent = [
    {
      id: 1,
      type: 'video',
      title: 'Présentation Produit - Version TikTok',
      description: 'Découvrez notre nouveau produit révolutionnaire ! #innovation #tech #startup #nouveauté #business',
      duration: '00:45',
      status: 'published',
      platforms: ['tiktok', 'instagram', 'youtube'],
      scheduledDate: '2024-01-15 14:30',
      stats: { views: 12500, likes: 892, comments: 156, shares: 78 },
      thumbnail: '/placeholder.svg',
      createdAt: '2024-01-14'
    },
    {
      id: 2,
      type: 'image',
      title: 'Post Inspirationnel - Citation',
      description: 'La réussite commence par un premier pas 💪 #motivation #inspiration #success #entrepreneuriat #mindset',
      status: 'draft',
      platforms: ['instagram', 'facebook', 'twitter'],
      scheduledDate: null,
      stats: { views: 0, likes: 0, comments: 0, shares: 0 },
      thumbnail: '/placeholder.svg',
      createdAt: '2024-01-14'
    },
    {
      id: 3,
      type: 'video',
      title: 'Tutorial - Comment utiliser notre app',
      description: 'Tutoriel complet pour maîtriser notre application 📱 #tutorial #howto #app #guide #tips',
      duration: '01:32',
      status: 'scheduled',
      platforms: ['youtube', 'tiktok'],
      scheduledDate: '2024-01-16 18:00',
      stats: { views: 0, likes: 0, comments: 0, shares: 0 },
      thumbnail: '/placeholder.svg',
      createdAt: '2024-01-13'
    }
  ];

  const platformIcons = {
    tiktok: Smartphone,
    instagram: Instagram,
    youtube: Youtube,
    facebook: Facebook,
    twitter: Twitter
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Publié';
      case 'scheduled': return 'Programmé';
      case 'draft': return 'Brouillon';
      default: return status;
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulation de génération
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Wand2 className="w-8 h-8 text-purple-500" />
              Création de Contenu IA
            </h1>
            <p className="text-gray-600">
              Créez des vidéos et images avec l'IA pour vos réseaux sociaux
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-purple-100 text-purple-800">
              <Video className="w-3 h-3 mr-1" />
              {createdContent.length} contenus créés
            </Badge>
            <Button className="bg-purple-500 hover:bg-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau contenu
            </Button>
          </div>
        </div>

        {/* Onglets principaux */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="create">Créer</TabsTrigger>
            <TabsTrigger value="library">Bibliothèque</TabsTrigger>
            <TabsTrigger value="schedule">Programmation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Onglet Création */}
          <TabsContent value="create" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Sélection du type de contenu */}
                <Card>
                  <CardHeader>
                    <CardTitle>Type de contenu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant={contentType === 'video' ? 'default' : 'outline'}
                        className="h-20 flex flex-col gap-2"
                        onClick={() => setContentType('video')}
                      >
                        <Video className="w-6 h-6" />
                        Vidéo
                      </Button>
                      <Button
                        variant={contentType === 'image' ? 'default' : 'outline'}
                        className="h-20 flex flex-col gap-2"
                        onClick={() => setContentType('image')}
                      >
                        <ImageIcon className="w-6 h-6" />
                        Image
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Configuration du contenu */}
                <Card>
                  <CardHeader>
                    <CardTitle>Configuration {contentType === 'video' ? 'Vidéo' : 'Image'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Sujet/Thème</label>
                      <Input placeholder="Ex: Présentation produit, tutorial, motivation..." />
                    </div>
                    
                    {contentType === 'video' && (
                      <div>
                        <label className="text-sm font-medium">Durée souhaitée</label>
                        <select className="w-full p-2 border rounded-md">
                          <option value="15">15 secondes (Instagram Stories)</option>
                          <option value="30">30 secondes (TikTok court)</option>
                          <option value="60">1 minute (TikTok monétisable)</option>
                          <option value="90">1 minute 30 (YouTube Shorts)</option>
                          <option value="120">2 minutes (Format long)</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium">Style/Ton</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="professionnel">Professionnel</option>
                        <option value="decontracte">Décontracté</option>
                        <option value="motivant">Motivant</option>
                        <option value="educatif">Éducatif</option>
                        <option value="humoristique">Humoristique</option>
                        <option value="inspirant">Inspirant</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Mots-clés</label>
                      <Input placeholder="Séparez par des virgules" />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Instructions spéciales</label>
                      <Textarea 
                        placeholder="Ajoutez des instructions spécifiques pour l'IA..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Génération */}
                <Card>
                  <CardContent className="pt-6">
                    {!isGenerating ? (
                      <Button 
                        onClick={handleGenerate}
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 h-12"
                      >
                        <Wand2 className="w-5 h-5 mr-2" />
                        Générer avec l'IA
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="font-medium">Génération en cours...</p>
                          <p className="text-sm text-gray-600">L'IA crée votre contenu</p>
                        </div>
                        <Progress value={generationProgress} className="w-full" />
                        <div className="text-center text-sm text-gray-600">
                          {generationProgress}% terminé
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Plateformes */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Plateformes cibles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { id: 'tiktok', name: 'TikTok', icon: Smartphone, specs: '9:16, 15s-3min' },
                        { id: 'instagram', name: 'Instagram', icon: Instagram, specs: '1:1 ou 9:16' },
                        { id: 'youtube', name: 'YouTube', icon: Youtube, specs: '16:9, Shorts 9:16' },
                        { id: 'facebook', name: 'Facebook', icon: Facebook, specs: '16:9 ou 1:1' },
                        { id: 'twitter', name: 'Twitter/X', icon: Twitter, specs: '16:9, 2min20 max' }
                      ].map((platform) => {
                        const IconComponent = platform.icon;
                        return (
                          <div key={platform.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <IconComponent className="w-5 h-5" />
                              <div>
                                <div className="font-medium">{platform.name}</div>
                                <div className="text-xs text-gray-500">{platform.specs}</div>
                              </div>
                            </div>
                            <input type="checkbox" className="rounded" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Templates IA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        'Présentation produit',
                        'Tutorial étape par étape',
                        'Citation inspirante',
                        'Behind the scenes',
                        'FAQ rapide',
                        'Comparaison avant/après'
                      ].map((template, index) => (
                        <Button key={index} variant="outline" size="sm" className="w-full justify-start">
                          {template}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Onglet Bibliothèque */}
          <TabsContent value="library" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdContent.map((content) => (
                <Card key={content.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={content.thumbnail} 
                      alt={content.title}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    {content.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white bg-black bg-opacity-50 rounded-full p-3" />
                      </div>
                    )}
                    <Badge className={`absolute top-2 right-2 ${getStatusColor(content.status)}`}>
                      {getStatusLabel(content.status)}
                    </Badge>
                    {content.duration && (
                      <Badge className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white">
                        {content.duration}
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{content.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{content.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {content.platforms.map((platform) => {
                        const IconComponent = platformIcons[platform as keyof typeof platformIcons];
                        return (
                          <Badge key={platform} variant="outline" className="text-xs">
                            <IconComponent className="w-3 h-3 mr-1" />
                            {platform}
                          </Badge>
                        );
                      })}
                    </div>

                    {content.status === 'published' && (
                      <div className="grid grid-cols-4 gap-2 text-xs text-center mb-3">
                        <div>
                          <Eye className="w-4 h-4 mx-auto mb-1" />
                          {content.stats.views.toLocaleString()}
                        </div>
                        <div>
                          <Heart className="w-4 h-4 mx-auto mb-1" />
                          {content.stats.likes}
                        </div>
                        <div>
                          <MessageCircle className="w-4 h-4 mx-auto mb-1" />
                          {content.stats.comments}
                        </div>
                        <div>
                          <Repeat2 className="w-4 h-4 mx-auto mb-1" />
                          {content.stats.shares}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-4 h-4 mr-1" />
                        Modifier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Onglet Programmation */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publications programmées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {createdContent.filter(c => c.status === 'scheduled').map((content) => (
                    <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img 
                          src={content.thumbnail} 
                          alt={content.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium">{content.title}</h4>
                          <p className="text-sm text-gray-600 mb-1">{content.description.substring(0, 50)}...</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {content.scheduledDate}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {content.platforms.map((platform) => {
                          const IconComponent = platformIcons[platform as keyof typeof platformIcons];
                          return (
                            <IconComponent key={platform} className="w-4 h-4 text-gray-400" />
                          );
                        })}
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: 'Contenus créés', value: '23', icon: Video, color: 'text-blue-500' },
                { label: 'Vues totales', value: '45.2K', icon: Eye, color: 'text-green-500' },
                { label: 'Engagement moyen', value: '8.4%', icon: Heart, color: 'text-pink-500' },
                { label: 'Temps économisé', value: '15h', icon: Clock, color: 'text-purple-500' }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-8 h-8 ${stat.color}`} />
                        <div>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance des contenus</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { name: 'Sem 1', vues: 1200, engagement: 8.2 },
                    { name: 'Sem 2', vues: 1900, engagement: 9.1 },
                    { name: 'Sem 3', vues: 2800, engagement: 7.8 },
                    { name: 'Sem 4', vues: 3200, engagement: 8.9 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="vues" stroke="#8B5CF6" strokeWidth={2} name="Vues" />
                    <Line type="monotone" dataKey="engagement" stroke="#10B981" strokeWidth={2} name="Engagement %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ContentCreation;
