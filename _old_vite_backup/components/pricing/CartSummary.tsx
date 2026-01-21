
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Mail } from 'lucide-react';
import { CartItem } from '@/types/pricing';

interface CartSummaryProps {
  cartItems: CartItem[];
  services: any;
  onRemoveFromCart: (serviceId: string) => void;
  onRequestQuote: () => void;
  getTotalPrice: () => number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ 
  cartItems, 
  services, 
  onRemoveFromCart, 
  onRequestQuote,
  getTotalPrice 
}) => {
  if (cartItems.length === 0) return null;

  return (
    <section className="bg-white border-t-4 border-gradient-to-r from-blue-500 to-purple-500 sticky bottom-0 z-40 shadow-2xl animate-slide-in-right">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
              Votre sélection ({cartItems.length} package{cartItems.length > 1 ? 's' : ''})
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cartItems.map((item) => {
                const service = services[item.serviceId];
                return (
                  <div key={item.serviceId} className={`flex items-center justify-between ${service.lightBg} p-6 rounded-2xl border-2 border-${service.color}-200 shadow-md`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <service.icon className={`w-5 h-5 text-${service.color}-600`} />
                        <p className="font-bold text-gray-900">{item.serviceTitle}</p>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">{item.name}</p>
                      <p className={`text-xl font-bold ${service.darkColor}`}>
                        {typeof item.price === 'string' ? item.price : `${item.price.toLocaleString()}€`}
                        <span className="text-sm font-normal text-gray-600 ml-2">{item.duration}</span>
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveFromCart(item.serviceId)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="text-center lg:text-right bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl border-2 border-blue-200">
            <p className="text-3xl font-bold text-gray-900 mb-6">
              Total: {getTotalPrice().toLocaleString()}€
            </p>
            <Button
              onClick={onRequestQuote}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-10 py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-6 h-6 mr-3" />
              Demander un devis gratuit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSummary;
