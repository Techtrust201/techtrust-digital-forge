
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Shield, BarChart3, Target, Eye } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const CookiePreferencesLink: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    const saved = localStorage.getItem('techtrust_cookie_consent');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { essential: true, analytics: false, marketing: false, functional: false };
      }
    }
    return { essential: true, analytics: false, marketing: false, functional: false };
  });

  const updatePreference = (category: keyof CookiePreferences, value: boolean) => {
    if (category === 'essential') return;
    
    const newPreferences = {
      ...preferences,
      [category]: value
    };
    
    setPreferences(newPreferences);
    localStorage.setItem('techtrust_cookie_consent', JSON.stringify(newPreferences));
    localStorage.setItem('techtrust_cookie_consent_date', Date.now().toString());
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <button 
          className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
          aria-label="Gérer les préférences de cookies"
        >
          Préférences cookies
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            Gérer mes préférences de cookies
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
              <Badge className="bg-green-100 text-green-800">Toujours actifs</Badge>
            </div>
            <p className="text-sm text-gray-600">
              Nécessaires au fonctionnement du site (authentification, sécurité, préférences).
            </p>
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
              Nous aident à comprendre comment les visiteurs utilisent le site.
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
              Permettent de personnaliser les publicités et mesurer l'efficacité des campagnes.
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
              Améliorent l'expérience utilisateur (préférences, chat en ligne).
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 Vos préférences sont automatiquement sauvegardées et restent valides pendant 12 mois.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CookiePreferencesLink;
