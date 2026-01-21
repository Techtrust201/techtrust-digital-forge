
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Eye, 
  Trash2,
  Video,
  Image as ImageIcon,
  Calendar
} from 'lucide-react';

interface DraftsStepProps {
  drafts: any[];
  saveDraft: (data: any) => void;
  loadDrafts: () => void;
}

const DraftsStep: React.FC<DraftsStepProps> = ({
  drafts,
  saveDraft,
  loadDrafts
}) => {
  React.useEffect(() => {
    loadDrafts();
  }, [loadDrafts]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save className="w-5 h-5 text-gray-600" />
            Étape 5: Gestion des brouillons
            <Badge variant="outline">{drafts.length} brouillons</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {drafts.length === 0 ? (
            <div className="text-center py-12">
              <Save className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun brouillon</h3>
              <p className="text-gray-500">
                Vos contenus sauvegardés apparaîtront ici. Créez du contenu et sauvegardez-le pour le retrouver plus tard.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drafts.map((draft) => (
                <div key={draft.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {draft.contentType === 'video' ? (
                        <Video className="w-4 h-4 text-purple-500" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-blue-500" />
                      )}
                      <Badge variant="outline" className="text-xs">
                        {draft.contentType === 'video' ? 'Vidéo' : 'Image'}
                      </Badge>
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
                  
                  <h3 className="font-medium truncate mb-2">{draft.prompt}</h3>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Style:</strong> {draft.style}</p>
                    {draft.contentType === 'video' && (
                      <p><strong>Durée:</strong> {draft.duration}s</p>
                    )}
                    <p><strong>Plateformes:</strong> {draft.platforms?.length || 0}</p>
                    <div className="flex items-center gap-1 text-xs">
                      <Calendar className="w-3 h-3" />
                      {new Date(draft.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <Button className="w-full mt-3" size="sm">
                    Reprendre l'édition
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DraftsStep;
