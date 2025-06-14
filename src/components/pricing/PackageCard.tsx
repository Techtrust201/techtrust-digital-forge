
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, Star, ShoppingCart, Crown } from 'lucide-react';
import { Package, Service } from '@/types/pricing';

interface PackageCardProps {
  pkg: Package;
  service: Service;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, service, index, isSelected, onSelect }) => {
  return (
    <Card 
      className={`relative h-full transition-all duration-500 hover:shadow-2xl group ${
        pkg.popular 
          ? `ring-2 ring-gradient-to-r ${service.bgGradient} transform shadow-xl hover:scale-105 ${service.lightBg} border-${service.color}-300` 
          : 'shadow-lg hover:scale-105 border-gray-200'
      } ${
        isSelected 
          ? `ring-4 ring-green-500 ${service.lightBg} shadow-2xl` 
          : ''
      } animate-fade-in rounded-3xl overflow-hidden border-2`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {pkg.popular && (
        <>
          {/* Coin décoratif en haut à droite */}
          <div className={`absolute -top-1 -right-1 w-16 h-16 bg-gradient-to-br ${service.bgGradient} rounded-bl-2xl flex items-start justify-end p-2`}>
            <Crown className="w-5 h-5 text-white rotate-12" />
          </div>
          
          {/* Texte "Populaire" intégré dans le header */}
          <div className={`absolute top-4 right-4 bg-gradient-to-r ${service.bgGradient} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
            <Star className="w-3 h-3 inline mr-1 fill-current" />
            POPULAIRE
          </div>
        </>
      )}
      
      <CardHeader className={`text-center pb-6 ${pkg.popular ? service.lightBg : 'bg-gradient-to-br from-white to-gray-50'}`}>
        <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
          {pkg.name}
        </CardTitle>
        <div className="space-y-2">
          <div className="flex items-baseline justify-center gap-1">
            <span className={`text-4xl lg:text-5xl font-bold ${pkg.popular ? service.darkColor : service.darkColor}`}>
              {typeof pkg.price === 'string' ? pkg.price : `${pkg.price.toLocaleString()}€`}
            </span>
          </div>
          <div className="text-gray-600 font-medium">{pkg.duration}</div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-6 p-6">
        <div className="space-y-4">
          {pkg.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-200">
              <div className={`flex-shrink-0 w-6 h-6 ${pkg.popular ? `bg-${service.color}-100` : 'bg-green-100'} rounded-full flex items-center justify-center mt-0.5`}>
                <Check className={`w-4 h-4 ${pkg.popular ? `text-${service.color}-600` : 'text-green-600'}`} />
              </div>
              <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
          {pkg.notIncluded && pkg.notIncluded.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 opacity-50">
              <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                <X className="w-4 h-4 text-red-500" />
              </div>
              <span className="text-gray-500 line-through text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={onSelect}
          className={`w-full h-14 text-lg font-bold transition-all duration-300 rounded-2xl ${
            isSelected
              ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg transform scale-105'
              : pkg.popular
              ? `bg-gradient-to-r ${service.bgGradient} hover:shadow-lg text-white transform hover:scale-105`
              : `bg-gray-900 hover:bg-gray-800 text-white hover:shadow-lg transform hover:scale-105`
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Sélectionné
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Choisir ce package
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
