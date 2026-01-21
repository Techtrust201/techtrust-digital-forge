
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, RotateCw } from 'lucide-react';

interface CompositionPreviewProps {
  videoUrl?: string;
  imageUrl?: string;
  subtitles?: Array<{ text: string; start: number; duration: number }>;
  musicUrl?: string;
  onUpdate?: (compositionData: any) => void;
}

const CompositionPreview: React.FC<CompositionPreviewProps> = ({
  videoUrl,
  imageUrl,
  subtitles = [],
  musicUrl,
  onUpdate
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateTime = () => setCurrentTime(video.currentTime);
      const updateDuration = () => setDuration(video.duration);
      
      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('loadedmetadata', updateDuration);
      
      return () => {
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [videoUrl]);

  const togglePlay = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    
    if (isPlaying) {
      video?.pause();
      audio?.pause();
    } else {
      video?.play();
      audio?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (newTime: number[]) => {
    const time = newTime[0];
    const video = videoRef.current;
    const audio = audioRef.current;
    
    if (video) video.currentTime = time;
    if (audio) audio.currentTime = time;
    setCurrentTime(time);
  };

  const getCurrentSubtitle = () => {
    return subtitles.find(sub => 
      currentTime >= sub.start && currentTime <= sub.start + sub.duration
    );
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RotateCw className="w-5 h-5 text-blue-500" />
          Aperçu de la composition
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Media Preview */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-auto max-h-80"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="Composition preview"
              className="w-full h-auto max-h-80 object-contain"
            />
          ) : (
            <div className="w-full h-80 flex items-center justify-center text-gray-400">
              Aucun contenu à prévisualiser
            </div>
          )}
          
          {/* Subtitle Overlay */}
          {getCurrentSubtitle() && (
            <div className="absolute bottom-16 left-0 right-0 text-center">
              <div className="bg-black/80 text-white px-4 py-2 rounded mx-4">
                {getCurrentSubtitle()?.text}
              </div>
            </div>
          )}
          
          {/* Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="ghost"
                onClick={togglePlay}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              <div className="flex-1 flex items-center gap-2">
                <span className="text-white text-xs">
                  {formatTime(currentTime)}
                </span>
                
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={0.1}
                  className="flex-1"
                  onValueChange={handleSeek}
                />
                
                <span className="text-white text-xs">
                  {formatTime(duration)}
                </span>
              </div>
              
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Hidden Audio for Music */}
        {musicUrl && (
          <audio ref={audioRef} src={musicUrl} />
        )}

        {/* Subtitle Timeline */}
        {subtitles.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Sous-titres</h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {subtitles.map((subtitle, index) => (
                <div
                  key={index}
                  className={`p-2 text-sm rounded border ${
                    currentTime >= subtitle.start && currentTime <= subtitle.start + subtitle.duration
                      ? 'bg-blue-100 border-blue-300'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <span className="text-xs text-gray-500">
                    {formatTime(subtitle.start)} - {formatTime(subtitle.start + subtitle.duration)}
                  </span>
                  <p>{subtitle.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompositionPreview;
