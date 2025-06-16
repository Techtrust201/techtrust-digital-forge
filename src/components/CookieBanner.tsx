
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

const CookieBanner = () => {
  const { cookiesAccepted, acceptCookies, declineCookies, isInitialized } = useVisitorTracking();

  // Ne pas afficher si les cookies ont été acceptés/refusés ou si pas encore initialisé
  if (!isInitialized || cookiesAccepted !== null) {
    return null;
  }

  const savedChoice = localStorage.getItem('techtrust_cookies_accepted');
  if (savedChoice !== null) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto lg:left-auto lg:right-4 lg:mx-0">
      <Card className="border-orange-200 bg-white shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Cookie className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                Cookies et suivi analytique
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Nous utilisons des cookies pour analyser le trafic et améliorer votre expérience. 
                Acceptez-vous le suivi analytique ?
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={acceptCookies}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Accepter
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={declineCookies}
                >
                  Refuser
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieBanner;
