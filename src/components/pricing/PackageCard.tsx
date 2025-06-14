import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, Star, ShoppingCart } from 'lucide-react';
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
    <div className={`relative ${pkg.popular ? 'pt-6' : ''}`}>
      {pkg.popular && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-xs font-semibold rounded-full border border-white shadow-lg">
            <Star className="w-3 h-3 mr-1 fill-current" />
            POPULAIRE
          </Badge>
        </div>
      )}
      
      <Card 
        className={`relative h-full transition-all duration-500 hover:shadow-2xl group ${
          pkg.popular 
            ? `ring-2 ring-blue-400 transform shadow-xl hover:scale-105` 
            : 'shadow-lg hover:scale-105'
        } ${
          isSelected 
            ? `ring-4 ring-green-500 ${service.lightBg} shadow-2xl` 
            : ''
        } animate-fade-in rounded-3xl overflow-hidden border-2`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardHeader className="text-center pb-6 bg-gradient-to-br from-white to-gray-50">
          <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
            {pkg.name}
          </CardTitle>
          <div className="space-y-2">
            <div className="flex items-baseline justify-center gap-1">
              <span className={`text-4xl lg:text-5xl font-bold ${service.darkColor}`}>
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
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
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
    </div>
  );
};

export default PackageCard;
