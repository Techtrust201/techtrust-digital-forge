
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Palette, 
  Type, 
  Music, 
  Volume2, 
  VolumeX, 
  Filter,
  Layers,
  Sparkles,
  Download,
  RefreshCw
} from 'lucide-react';

interface ContentEditorProps {
  contentType: 'video' | 'image';
  onContentChange?: (content: any) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ contentType, onContentChange }) => {
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [saturation, setSaturation] = useState([100]);
  const [textOverlay, setTextOverlay] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState([24]);
  const [backgroundMusic, setBackgroundMusic] = useState(false);
  const [musicUrl, setMusicUrl] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const availableFilters = [
    { id: 'vintage', name: 'Vintage', preview: '🎞️' },
    { id: 'noir', name: 'Noir & Blanc', preview: '⚫' },
    { id: 'sepia', name: 'Sépia', preview: '🟤' },
    { id: 'vibrant', name: 'Vibrant', preview: '🌈' },
    { id: 'soft', name: 'Doux', preview: '☁️' },
    { id: 'dramatic', name: 'Dramatique', preview: '⚡' }
  ];

  const toggleFilter = (filterId: string) => {
    setFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const uploadBackgroundMusic = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setMusicUrl(URL.createObjectURL(file));
      setBackgroundMusic(true);
    }
  };

  const resetSettings = () => {
    setBrightness([100]);
    setContrast([100]);
    setSaturation([100]);
    setTextOverlay('');
    setTextColor('#ffffff');
    setFontSize([24]);
    setBackgroundMusic(false);
    setMusicUrl('');
    setFilters([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Éditeur avancé</h3>
        <Button onClick={resetSettings} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Réinitialiser
        </Button>
      </div>

      {/* Filtres visuels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Filter className="w-4 h-4" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {availableFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={filters.includes(filter.id) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleFilter(filter.id)}
                className="flex flex-col items-center p-2 h-auto"
              >
                <span className="text-lg mb-1">{filter.preview}</span>
                <span className="text-xs">{filter.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ajustements couleur */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Palette className="w-4 h-4" />
            Couleurs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm">Luminosité: {brightness[0]}%</Label>
            <Slider
              value={brightness}
              onValueChange={setBrightness}
              max={200}
              min={0}
              step={1}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label className="text-sm">Contraste: {contrast[0]}%</Label>
            <Slider
              value={contrast}
              onValueChange={setContrast}
              max={200}
              min={0}
              step={1}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label className="text-sm">Saturation: {saturation[0]}%</Label>
            <Slider
              value={saturation}
              onValueChange={setSaturation}
              max={200}
              min={0}
              step={1}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Texte overlay */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Type className="w-4 h-4" />
            Texte sur {contentType === 'video' ? 'vidéo' : 'image'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="textOverlay">Texte</Label>
            <Textarea
              id="textOverlay"
              placeholder="Ajoutez du texte sur votre contenu..."
              value={textOverlay}
              onChange={(e) => setTextOverlay(e.target.value)}
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="textColor">Couleur</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="textColor"
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-12 h-8 p-1 rounded"
                />
                <Input
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  placeholder="#ffffff"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-sm">Taille: {fontSize[0]}px</Label>
              <Slider
                value={fontSize}
                onValueChange={setFontSize}
                max={72}
                min={12}
                step={2}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio pour vidéos */}
      {contentType === 'video' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Music className="w-4 h-4" />
              Audio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="backgroundMusic">Musique de fond</Label>
              <Switch
                id="backgroundMusic"
                checked={backgroundMusic}
                onCheckedChange={setBackgroundMusic}
              />
            </div>
            
            {backgroundMusic && (
              <div className="space-y-3">
                <Button onClick={uploadBackgroundMusic} variant="outline" className="w-full">
                  <Music className="w-4 h-4 mr-2" />
                  Choisir un fichier audio
                </Button>
                
                {musicUrl && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-800">
                        Musique chargée ✓
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Volume2 className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <VolumeX className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Aperçu des effets appliqués */}
      {(filters.length > 0 || textOverlay || backgroundMusic) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="w-4 h-4" />
              Effets appliqués
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {filters.map((filterId) => {
                const filter = availableFilters.find(f => f.id === filterId);
                return filter ? (
                  <Badge key={filterId} variant="secondary">
                    {filter.preview} {filter.name}
                  </Badge>
                ) : null;
              })}
              
              {textOverlay && (
                <Badge variant="secondary">
                  <Type className="w-3 h-3 mr-1" />
                  Texte overlay
                </Badge>
              )}
              
              {backgroundMusic && (
                <Badge variant="secondary">
                  <Music className="w-3 h-3 mr-1" />
                  Musique de fond
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentEditor;
