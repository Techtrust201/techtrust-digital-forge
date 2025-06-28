
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Music, Upload, Search, Play, Pause, Volume2 } from 'lucide-react';

interface MusicSelectorProps {
  onMusicSelect: (music: { url: string; title: string; type: string }) => void;
  selectedMusic?: { url: string; title: string; type: string };
}

const MusicSelector: React.FC<MusicSelectorProps> = ({ onMusicSelect, selectedMusic }) => {
  const [customUrl, setCustomUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const predefinedMusic = [
    { title: 'Upbeat Corporate', url: '/music/upbeat-corporate.mp3', type: 'corporate', mood: 'Énergique' },
    { title: 'Chill Lo-Fi', url: '/music/chill-lofi.mp3', type: 'lofi', mood: 'Relaxant' },
    { title: 'Epic Cinematic', url: '/music/epic-cinematic.mp3', type: 'cinematic', mood: 'Dramatique' },
    { title: 'Tech Innovation', url: '/music/tech-innovation.mp3', type: 'tech', mood: 'Moderne' },
    { title: 'Acoustic Guitar', url: '/music/acoustic-guitar.mp3', type: 'acoustic', mood: 'Naturel' },
    { title: 'Electronic Beat', url: '/music/electronic-beat.mp3', type: 'electronic', mood: 'Dynamique' }
  ];

  const handlePredefinedSelect = (music: typeof predefinedMusic[0]) => {
    onMusicSelect({
      url: music.url,
      title: music.title,
      type: music.type
    });
  };

  const handleCustomUrlSubmit = () => {
    if (!customUrl.trim()) return;
    
    // Validate URL
    try {
      new URL(customUrl);
      onMusicSelect({
        url: customUrl,
        title: 'Musique personnalisée',
        type: 'custom'
      });
      setCustomUrl('');
    } catch {
      alert('URL invalide. Veuillez saisir une URL valide.');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      onMusicSelect({
        url,
        title: file.name,
        type: 'upload'
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="w-5 h-5 text-blue-500" />
          Sélection de musique
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="predefined" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="predefined">Musiques gratuites</TabsTrigger>
            <TabsTrigger value="upload">Importer</TabsTrigger>
            <TabsTrigger value="url">URL personnalisée</TabsTrigger>
          </TabsList>

          <TabsContent value="predefined" className="space-y-3">
            <p className="text-sm text-gray-600">
              Sélectionnez une musique libre de droits parfaite pour votre contenu
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {predefinedMusic.map((music, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedMusic?.url === music.url
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePredefinedSelect(music)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{music.title}</h4>
                      <Badge variant="outline" className="text-xs mt-1">
                        {music.mood}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Play className="w-3 h-3" />
                      </Button>
                      <Volume2 className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Importez votre propre fichier audio
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Formats supportés: MP3, WAV, M4A (max 10MB)
              </p>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
                id="music-upload"
              />
              <Label htmlFor="music-upload">
                <Button type="button" variant="outline" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Choisir un fichier
                </Button>
              </Label>
            </div>
          </TabsContent>

          <TabsContent value="url" className="space-y-4">
            <div>
              <Label htmlFor="custom-url">URL de la musique</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="custom-url"
                  placeholder="https://example.com/music.mp3"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                />
                <Button onClick={handleCustomUrlSubmit} disabled={!customUrl.trim()}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                URL directe vers un fichier audio (MP3, WAV, etc.)
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {selectedMusic && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm text-green-800">
                  Musique sélectionnée
                </p>
                <p className="text-sm text-green-600">{selectedMusic.title}</p>
              </div>
              <Badge variant="outline" className="text-green-700 border-green-300">
                {selectedMusic.type}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MusicSelector;
