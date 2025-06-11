
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={i18n.language === 'fr' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => changeLanguage('fr')}
        className="flex items-center gap-2"
      >
        <img src="/flags/fr.svg" alt="Français" className="w-4 h-3" />
        FR
      </Button>
      <Button
        variant={i18n.language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => changeLanguage('en')}
        className="flex items-center gap-2"
      >
        <img src="/flags/en.svg" alt="English" className="w-4 h-3" />
        EN
      </Button>
    </div>
  );
};

export default LanguageSelector;
