
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUserDetails } from '@/hooks/useUserDetails';
import { usePackageUtils } from '@/hooks/usePackageUtils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  Package,
  DollarSign,
  Clock,
  Shield,
  Rocket,
  Crown,
  Diamond,
  Edit,
  Ban,
  MessageSquare
} from 'lucide-react';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  onEditUser?: (user: any) => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  userId,
  onEditUser
}) => {
  const { data: userDetails, isLoading } = useUserDetails(userId);
  const { getPackageById, getPackageColor } = usePackageUtils();

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'bronze': return Shield;
      case 'silver': return Rocket;
      case 'gold': return Crown;
      case 'diamond': return Diamond;
      default: return Shield;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'text-amber-600 bg-amber-50';
      case 'silver': return 'text-gray-600 bg-gray-50';
      case 'gold': return 'text-yellow-600 bg-yellow-50';
      case 'diamond': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chargement...</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!userDetails) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Utilisateur introuvable</DialogTitle>
          </DialogHeader>
          <p>Les détails de cet utilisateur ne peuvent pas être chargés.</p>
        </DialogContent>
      </Dialog>
    );
  }

  const TierIcon = getTierIcon(userDetails.tier);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {userDetails.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{userDetails.name}</h2>
                <p className="text-sm text-gray-500">{userDetails.email}</p>
              </div>
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Badge className={`${getTierColor(userDetails.tier)} border-0`}>
                <TierIcon className="w-4 h-4 mr-1" />
                {userDetails.tier?.charAt(0).toUpperCase() + userDetails.tier?.slice(1)}
              </Badge>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEditUser?.(userDetails)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Modifier
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Contacter
                </Button>
                <Button size="sm" variant="outline" className="text-red-600">
                  <Ban className="w-4 h-4 mr-1" />
                  Suspendre
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="billing">Facturation</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Informations personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{userDetails.email}</span>
                  </div>
                  {userDetails.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{userDetails.phone}</span>
                    </div>
                  )}
                  {userDetails.company && (
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-500" />
                      <span>{userDetails.company}</span>
                    </div>
                  )}
                  {userDetails.user_position && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{userDetails.user_position}</span>
                    </div>
                  )}
                  {userDetails.industry && (
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span>{userDetails.industry}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Informations du compte
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Créé le {new Date(userDetails.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                  {userDetails.last_sign_in_at && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>Dernière connexion : {new Date(userDetails.last_sign_in_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        userDetails.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {userDetails.status === 'active' ? 'Actif' : 'Suspendu'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {userDetails.address && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Adresse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {userDetails.address.street && <p>{userDetails.address.street}</p>}
                    {userDetails.address.city && (
                      <p>
                        {userDetails.address.zipCode} {userDetails.address.city}
                      </p>
                    )}
                    {userDetails.address.country && <p>{userDetails.address.country}</p>}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="packages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Packages actifs ({userDetails.subscription_count})</CardTitle>
                <CardDescription>
                  Revenus total généré : {userDetails.total_revenue}€
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userDetails.packages?.map((pkg: any) => {
                    const packageDetails = getPackageById(pkg.id);
                    return (
                      <div
                        key={pkg.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Package className="w-4 h-4 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">{pkg.name}</h4>
                            <p className="text-sm text-gray-500">{pkg.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              pkg.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }
                          >
                            {pkg.status}
                          </Badge>
                          {packageDetails && (
                            <span className="text-sm font-medium">
                              {packageDetails.price}€
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {(!userDetails.packages || userDetails.packages.length === 0) && (
                    <p className="text-gray-500 text-center py-4">
                      Aucun package actif
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Historique de facturation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">
                  Fonctionnalité en cours de développement
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Activité récente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">
                  Fonctionnalité en cours de développement
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
