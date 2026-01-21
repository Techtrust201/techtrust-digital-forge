
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  alt?: string;
  onDownload?: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, alt, onDownload }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  return (
    <div className="relative bg-gray-100 rounded-lg overflow-hidden">
      <div className="flex justify-center items-center min-h-64 p-4">
        <img
          src={imageUrl}
          alt={alt || "Image générée"}
          className="max-w-full max-h-96 object-contain transition-transform duration-200"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`
          }}
        />
      </div>
      
      {/* Controls */}
      <div className="absolute top-2 right-2 flex gap-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleZoomOut}
          className="bg-black/50 text-white hover:bg-black/70"
        >
          <ZoomOut className="w-3 h-3" />
        </Button>
        
        <Button
          size="sm"
          variant="ghost"
          onClick={handleZoomIn}
          className="bg-black/50 text-white hover:bg-black/70"
        >
          <ZoomIn className="w-3 h-3" />
        </Button>
        
        <Button
          size="sm"
          variant="ghost"
          onClick={handleRotate}
          className="bg-black/50 text-white hover:bg-black/70"
        >
          <RotateCw className="w-3 h-3" />
        </Button>
        
        {onDownload && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onDownload}
            className="bg-black/50 text-white hover:bg-black/70"
          >
            <Download className="w-3 h-3" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
