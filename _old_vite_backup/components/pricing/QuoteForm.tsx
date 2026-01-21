
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, X } from 'lucide-react';
import { FormData, CartItem } from '@/types/pricing';

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  cartItems: CartItem[];
  services: any;
  onSubmit: (e: React.FormEvent) => void;
  getTotalPrice: () => number;
}

const QuoteForm: React.FC<QuoteFormProps> = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  cartItems,
  services,
  onSubmit,
  getTotalPrice
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Mail className="w-8 h-8 text-blue-600" />
              Demande de devis personnalisé
            </h3>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-lg font-semibold text-gray-700">Nom complet *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-2 h-12 rounded-xl border-2 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-lg font-semibold text-gray-700">Email professionnel *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-2 h-12 rounded-xl border-2 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone" className="text-lg font-semibold text-gray-700">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="mt-2 h-12 rounded-xl border-2 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="company" className="text-lg font-semibold text-gray-700">Entreprise</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="mt-2 h-12 rounded-xl border-2 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="message" className="text-lg font-semibold text-gray-700">Message (besoins spécifiques, délais...)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="mt-2 rounded-xl border-2 focus:border-blue-500"
                rows={4}
                placeholder="Décrivez vos besoins spécifiques, vos délais, ou toute information utile..."
              />
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border-2 border-blue-200">
              <h4 className="font-bold text-gray-900 mb-4 text-xl">Récapitulatif de votre sélection:</h4>
              {cartItems.map((item) => {
                const service = services[item.serviceId];
                return (
                  <div key={item.serviceId} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                    <div className="flex items-center gap-3">
                      <service.icon className={`w-5 h-5 text-${service.color}-600`} />
                      <span className="font-medium">{item.serviceTitle} - {item.name}</span>
                    </div>
                    <span className="font-bold text-lg">
                      {typeof item.price === 'string' ? item.price : `${item.price.toLocaleString()}€`}
                      <span className="text-sm font-normal text-gray-500 ml-1">{item.duration}</span>
                    </span>
                  </div>
                );
              })}
              <div className="border-t-2 border-blue-300 pt-4 mt-4">
                <div className="flex justify-between items-center font-bold text-2xl">
                  <span>Total estimé:</span>
                  <span className="text-blue-600">{getTotalPrice().toLocaleString()}€</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-6 h-6 mr-3" />
              Envoyer ma demande de devis
            </Button>

            <p className="text-sm text-gray-600 text-center bg-blue-50 p-4 rounded-xl">
              * Nous vous répondrons sous 24h avec un devis détaillé et personnalisé 🚀
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
