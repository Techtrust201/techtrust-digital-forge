
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie, Shield, Eye, BarChart3, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface CookieBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('techtrust_cookies_accepted');
    if (accepted === null) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const handleAccept = () => {
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    setIsVisible(false);
    onDecline();
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 z-50 lg:left-auto lg:right-4 lg:max-w-md">
        <Card className="border-2 border-red-200 shadow-2xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Cookie className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  🍪 Cookies & Analytics
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Nous utilisons des cookies pour améliorer votre expérience et analyser notre audience. 
                  Acceptez-vous nos cookies d'analyse ?
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={handleAccept}
                    className="bg-red-600 hover:bg-red-700 text-white flex-1"
                  >
                    Accepter
                  </Button>
                  <Button
                    onClick={handleDecline}
                    variant="outline"
                    className="flex-1"
                  >
                    Refuser
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        En savoir plus
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-red-600" />
                          Politique de Cookies & Analytics
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Eye className="w-4 h-4 text-blue-600" />
                            Que collectons-nous ?
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1 ml-6">
                            <li>• Pages visitées et temps passé</li>
                            <li>• Type d'appareil (mobile, desktop, tablette)</li>
                            <li>• Navigateur utilisé</li>
                            <li>• Localisation approximative (ville, pays)</li>
                            <li>• Résolution d'écran</li>
                            <li>• Langue du navigateur</li>
                            <li>• Source de trafic (référent)</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-green-600" />
                            À quoi ça sert ?
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1 ml-6">
                            <li>• <strong>Optimiser le contenu :</strong> Voir quels articles intéressent le plus</li>
                            <li>• <strong>Améliorer l'UX :</strong> Adapter le site selon les appareils utilisés</li>
                            <li>• <strong>Mesurer l'audience :</strong> Comprendre notre reach et engagement</li>
                            <li>• <strong>Personnaliser :</strong> Proposer du contenu adapté à votre région</li>
                            <li>• <strong>Performance :</strong> Identifier les pages lentes ou problématiques</li>
                            <li>• <strong>SEO & Marketing :</strong> Optimiser notre stratégie de contenu</li>
                          </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            🔒 Vos données sont protégées
                          </h4>
                          <p className="text-sm text-gray-600">
                            Aucune donnée personnelle identifiable n'est collectée. 
                            Toutes les données sont anonymisées et utilisées uniquement à des fins d'analyse.
                            Vous pouvez refuser sans impact sur votre navigation.
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={handleAccept}
                            className="bg-red-600 hover:bg-red-700 text-white flex-1"
                          >
                            Accepter les cookies
                          </Button>
                          <Button
                            onClick={handleDecline}
                            variant="outline"
                            className="flex-1"
                          >
                            Continuer sans cookies
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CookieBanner;
