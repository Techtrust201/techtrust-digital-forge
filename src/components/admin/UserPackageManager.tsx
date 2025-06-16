
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Crown,
  Zap,
  Globe,
  Users as UsersIcon,
  MessageSquare,
  BarChart3
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { servicesData } from '@/data/servicesData';
import { toast } from 'sonner';

interface UserPackageManagerProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
}

const UserPackageManager: React.FC<UserPackageManagerProps> = ({ user, isOpen, onClose }) => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [currentSubscriptions, setCurrentSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchUserSubscriptions();
    }
  }, [isOpen, user]);

  const fetchUserSubscriptions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      setCurrentSubscriptions(data || []);
      setSelectedPackages(data?.map(sub => sub.package_id) || []);
    } catch (error: any) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Erreur lors du chargement des souscriptions');
    } finally {
      setLoading(false);
    }
  };

  const getAllPackages = () => {
    const packages: any[] = [];
    Object.entries(servicesData).forEach(([categoryKey, service]) => {
      service.packages.forEach(pkg => {
        packages.push({
          ...pkg,
          categoryKey,
          categoryName: service.title
        });
      });
    });
    return packages;
  };

  const togglePackage = (packageId: string) => {
    setSelectedPackages(prev => {
      if (prev.includes(packageId)) {
        return prev.filter(id => id !== packageId);
      } else {
        return [...prev, packageId];
      }
    });
  };

  const savePackages = async () => {
    try {
      setSaving(true);

      // Supprimer les anciennes souscriptions
      const { error: deleteError } = await supabase
        .from('user_subscriptions')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      // Ajouter les nouvelles souscriptions
      if (selectedPackages.length > 0) {
        const allPackages = getAllPackages();
        const subscriptionsToInsert = selectedPackages.map(packageId => {
          const pkg = allPackages.find(p => p.id === packageId);
          return {
            user_id: user.id,
            package_id: packageId,
            package_name: pkg?.name || packageId,
            package_category: pkg?.categoryKey || 'unknown',
            status: 'active'
          };
        });

        const { error: insertError } = await supabase
          .from('user_subscriptions')
          .insert(subscriptionsToInsert);

        if (insertError) throw insertError;
      }

      toast.success('Packages mis à jour avec succès');
      onClose();
    } catch (error: any) {
      console.error('Error saving packages:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const getCategoryIcon = (categoryKey: string) => {
    switch (categoryKey) {
      case 'website': return Globe;
      case 'growth': return Zap;
      case 'community': return UsersIcon;
      case 'consulting': return MessageSquare;
      default: return Package;
    }
  };

  const getCategoryColor = (categoryKey: string) => {
    switch (categoryKey) {
      case 'website': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'growth': return 'bg-green-100 text-green-800 border-green-200';
      case 'community': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'consulting': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const groupedPackages = getAllPackages().reduce((acc, pkg) => {
    if (!acc[pkg.categoryKey]) {
      acc[pkg.categoryKey] = {
        name: pkg.categoryName,
        packages: []
      };
    }
    acc[pkg.categoryKey].packages.push(pkg);
    return acc;
  }, {} as Record<string, { name: string; packages: any[] }>);

  const calculateTotalPrice = () => {
    const allPackages = getAllPackages();
    return selectedPackages.reduce((total, packageId) => {
      const pkg = allPackages.find(p => p.id === packageId);
      return total + (pkg?.price || 0);
    }, 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-red-600" />
            Gérer les packages de {user.name}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Chargement...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Résumé utilisateur */}
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    {user.company && (
                      <p className="text-sm text-gray-500">{user.company}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Souscriptions actuelles</p>
                    <p className="font-bold text-lg">{currentSubscriptions.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sélection des packages */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Sélectionner les packages</h3>
              
              {Object.entries(groupedPackages).map(([categoryKey, category]) => {
                const CategoryIcon = getCategoryIcon(categoryKey);
                
                return (
                  <Card key={categoryKey} className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <CategoryIcon className="w-5 h-5" />
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {category.packages.map((pkg) => {
                          const isSelected = selectedPackages.includes(pkg.id);
                          
                          return (
                            <motion.div
                              key={pkg.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                isSelected
                                  ? `${getCategoryColor(categoryKey)} border-2`
                                  : 'border-gray-200 hover:border-gray-300 bg-white'
                              }`}
                              onClick={() => togglePackage(pkg.id)}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{pkg.name}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-lg">
                                    {pkg.price}€
                                  </span>
                                  {isSelected ? (
                                    <Check className="w-5 h-5 text-green-600" />
                                  ) : (
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                              <div className="space-y-1">
                                {pkg.features.slice(0, 3).map((feature: string, index: number) => (
                                  <p key={index} className="text-xs text-gray-500 flex items-center gap-1">
                                    <Check className="w-3 h-3 text-green-500" />
                                    {feature}
                                  </p>
                                ))}
                                {pkg.features.length > 3 && (
                                  <p className="text-xs text-gray-400">
                                    +{pkg.features.length - 3} autres fonctionnalités
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Résumé de la sélection */}
            {selectedPackages.length > 0 && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-blue-900">
                        Packages sélectionnés ({selectedPackages.length})
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedPackages.map(packageId => {
                          const pkg = getAllPackages().find(p => p.id === packageId);
                          return (
                            <Badge key={packageId} variant="outline" className="bg-white">
                              {pkg?.name}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-600">Total mensuel</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {calculateTotalPrice()}€
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Separator />

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button 
                onClick={savePackages}
                disabled={saving}
                className="bg-red-600 hover:bg-red-700"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sauvegarde...
                  </>
                ) : (
                  'Sauvegarder'
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserPackageManager;
