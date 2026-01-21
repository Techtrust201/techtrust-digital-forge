
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Cookie, Settings, Shield, BarChart3, Target, Eye } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface CookieBannerProps {
  onPreferencesChange: (preferences: CookiePreferences) => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onPreferencesChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Toujours activé
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    checkCookieConsent();
  }, []);

  const checkCookieConsent = () => {
    const consent = localStorage.getItem('techtrust_cookie_consent');
    const consentDate = localStorage.getItem('techtrust_cookie_consent_date');
    
    if (!consent || !consentDate) {
      setIsVisible(true);
      return;
    }

    // Vérifier si le consentement a plus de 12 mois
    const consentTimestamp = parseInt(consentDate);
    const twelveMonthsAgo = Date.now() - (12 * 30 * 24 * 60 * 60 * 1000);
    
    if (consentTimestamp < twelveMonthsAgo) {
      setIsVisible(true);
      return;
    }

    // Charger les préférences existantes
    try {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      onPreferencesChange(savedPreferences);
    } catch (error) {
      console.error('Erreur parsing préférences cookies:', error);
      setIsVisible(true);
    }
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('techtrust_cookie_consent', JSON.stringify(prefs));
    localStorage.setItem('techtrust_cookie_consent_date', Date.now().toString());
    setPreferences(prefs);
    onPreferencesChange(prefs);
    setIsVisible(false);
    setShowCustomization(false);
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    savePreferences(allAccepted);
  };

  const rejectAll = () => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    savePreferences(onlyEssential);
  };

  const handleCustomSave = () => {
    savePreferences(preferences);
  };

  const updatePreference = (category: keyof CookiePreferences, value: boolean) => {
    if (category === 'essential') return; // Ne peut pas être désactivé
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t-2 border-blue-500 shadow-2xl">
        <div className="max-w-6xl mx-auto">
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                  <Cookie className="w-6 h-6 text-blue-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    🍪 Gestion des cookies et de vos données
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Nous utilisons des cookies pour améliorer votre expérience de navigation, analyser l'utilisation du site et personnaliser le contenu. 
                    Vous pouvez choisir d'accepter ou de refuser les cookies non essentiels.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={acceptAll}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      aria-label="Accepter tous les cookies"
                    >
                      Accepter tout
                    </Button>
                    
                    <Button
                      onClick={rejectAll}
                      variant="outline"
                      className="border-gray-300"
                      aria-label="Refuser les cookies non essentiels"
                    >
                      Refuser tout
                    </Button>
                    
                    <Dialog open={showCustomization} onOpenChange={setShowCustomization}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          aria-label="Personnaliser les préférences de cookies"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Personnaliser
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-600" />
                            Préférences de cookies
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Cookies essentiels */}
                          <div className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold flex items-center gap-2">
                                <Shield className="w-4 h-4 text-green-600" />
                                Cookies essentiels
                              </h4>
                              <Badge className="bg-green-100 text-green-800">Obligatoires</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Nécessaires au fonctionnement du site (authentification, sécurité, préférences).
                            </p>
                            <p className="text-xs text-gray-500">Ces cookies ne peuvent pas être désactivés.</p>
                          </div>

                          {/* Cookies d'analyse */}
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-blue-600" />
                                Cookies d'analyse
                              </h4>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={preferences.analytics}
                                  onChange={(e) => updatePreference('analytics', e.target.checked)}
                                  className="sr-only peer"
                                  aria-label="Activer les cookies d'analyse"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                            <p className="text-sm text-gray-600">
                              Nous aident à comprendre comment les visiteurs utilisent le site (pages vues, temps passé, parcours).
                            </p>
                          </div>

                          {/* Cookies marketing */}
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold flex items-center gap-2">
                                <Target className="w-4 h-4 text-purple-600" />
                                Cookies marketing
                              </h4>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={preferences.marketing}
                                  onChange={(e) => updatePreference('marketing', e.target.checked)}
                                  className="sr-only peer"
                                  aria-label="Activer les cookies marketing"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                            <p className="text-sm text-gray-600">
                              Permettent de personnaliser les publicités et de mesurer l'efficacité des campagnes.
                            </p>
                          </div>

                          {/* Cookies fonctionnels */}
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold flex items-center gap-2">
                                <Eye className="w-4 h-4 text-orange-600" />
                                Cookies fonctionnels
                              </h4>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={preferences.functional}
                                  onChange={(e) => updatePreference('functional', e.target.checked)}
                                  className="sr-only peer"
                                  aria-label="Activer les cookies fonctionnels"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                            <p className="text-sm text-gray-600">
                              Améliorent l'expérience utilisateur (mémorisation des préférences, chat en ligne).
                            </p>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <Button
                              onClick={handleCustomSave}
                              className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                            >
                              Enregistrer mes préférences
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
      </div>
    </>
  );
};

export default CookieBanner;
