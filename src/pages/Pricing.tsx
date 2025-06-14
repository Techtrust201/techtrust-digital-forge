
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import PricingHeader from '@/components/pricing/PricingHeader';
import ServiceTab from '@/components/pricing/ServiceTab';
import PackageCard from '@/components/pricing/PackageCard';
import CartSummary from '@/components/pricing/CartSummary';
import QuoteForm from '@/components/pricing/QuoteForm';
import { servicesData } from '@/data/servicesData';
import { FormData } from '@/types/pricing';

const Pricing = () => {
  const { t } = useTranslation();
  const [selectedPackages, setSelectedPackages] = useState<{[key: string]: any}>({});
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [activeTab, setActiveTab] = useState('website');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handlePackageSelect = (serviceId: string, packageData: any) => {
    const newSelected = { ...selectedPackages };
    newSelected[serviceId] = packageData;
    setSelectedPackages(newSelected);

    const existingCartItem = cartItems.find(item => item.serviceId === serviceId);
    if (existingCartItem) {
      setCartItems(cartItems.map(item => 
        item.serviceId === serviceId 
          ? { ...packageData, serviceId, serviceTitle: servicesData[serviceId].title }
          : item
      ));
    } else {
      setCartItems([...cartItems, { 
        ...packageData, 
        serviceId, 
        serviceTitle: servicesData[serviceId].title 
      }]);
    }
  };

  const removeFromCart = (serviceId: string) => {
    setCartItems(cartItems.filter(item => item.serviceId !== serviceId));
    const newSelected = { ...selectedPackages };
    delete newSelected[serviceId];
    setSelectedPackages(newSelected);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'string' ? 0 : item.price;
      return total + price;
    }, 0);
  };

  const handleQuoteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailBody = `
Nouvelle demande de devis Techtrust

Client: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Entreprise: ${formData.company}

Packages sélectionnés:
${cartItems.map(item => `- ${item.serviceTitle}: ${item.name} (${item.price}€${item.duration})`).join('\n')}

Total estimé: ${getTotalPrice()}€

Message:
${formData.message}
    `;

    const mailtoLink = `mailto:contact@techtrust.fr?subject=Demande de devis - ${formData.name}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    alert('✅ Votre demande de devis a été envoyée ! Nous vous répondrons sous 24h.');
  };

  return (
    <>
      <SEO
        title="Tarifs & Packages Techtrust 2025 | Création Site Web, Growth Hacking IA, Community Management"
        description="🚀 Découvrez nos tarifs transparents 2025 : Site web dès 899€, Growth Hacking IA dès 299€/mois, Community Management Pro. Devis gratuit en 24h !"
        keywords="tarifs techtrust, prix site web, growth hacking prix, community management tarifs, devis gratuit, packages digitaux"
        canonicalUrl="https://www.tech-trust.fr/pricing"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <NavbarPublic />
        
        <main className="pt-20">
          <PricingHeader />

          {/* Services Tabs avec animations et couleurs */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16 animate-fade-in">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Choisissez votre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Solution</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Découvrez nos 5 expertises pour accélérer votre croissance digitale
                </p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 max-w-6xl mx-auto mb-16 h-auto bg-white shadow-xl rounded-2xl p-2 border">
                  {Object.entries(servicesData).map(([key, service]) => (
                    <ServiceTab 
                      key={key}
                      serviceKey={key}
                      service={service}
                      isActive={activeTab === key}
                    />
                  ))}
                </TabsList>

                {Object.entries(servicesData).map(([serviceId, service]) => (
                  <TabsContent 
                    key={serviceId} 
                    value={serviceId}
                    className="animate-fade-in transition-all duration-500"
                  >
                    <div className={`text-center mb-12 p-8 rounded-3xl ${service.lightBg} border-2 border-${service.color}-200`}>
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.bgGradient} shadow-lg`}>
                          <service.icon className="w-12 h-12 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className={`text-3xl lg:text-4xl font-bold ${service.darkColor}`}>
                            {service.title}
                          </h3>
                          <p className={`text-lg font-medium ${service.darkColor} opacity-80`}>
                            {service.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto pt-16">
                      {service.packages.map((pkg, index) => (
                        <PackageCard
                          key={pkg.id}
                          pkg={pkg}
                          service={service}
                          index={index}
                          isSelected={selectedPackages[serviceId]?.id === pkg.id}
                          onSelect={() => handlePackageSelect(serviceId, pkg)}
                        />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>

          <CartSummary
            cartItems={cartItems}
            services={servicesData}
            onRemoveFromCart={removeFromCart}
            onRequestQuote={() => setShowQuoteForm(true)}
            getTotalPrice={getTotalPrice}
          />

          <QuoteForm
            isOpen={showQuoteForm}
            onClose={() => setShowQuoteForm(false)}
            formData={formData}
            setFormData={setFormData}
            cartItems={cartItems}
            services={servicesData}
            onSubmit={handleQuoteRequest}
            getTotalPrice={getTotalPrice}
          />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Pricing;
