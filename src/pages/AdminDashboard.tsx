import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CreateUserModal from "@/components/admin/CreateUserModal";
import { useAdminActions } from "@/hooks/useAdminActions";
import { useAdminData } from "@/hooks/useAdminData";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Shield,
  Rocket,
  Crown,
  Diamond,
  UserPlus,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

/* ---------- Loader plein écran ---------- */
const Loading = () => (
  <div className="flex min-h-screen items-center justify-center">
    <Skeleton className="w-[300px] h-[80px] rounded-md" />
  </div>
);

const AdminDashboard = () => {
  /* ---------- HOOKS TOUJOURS EN PREMIER ---------- */
  const { t } = useTranslation();
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const {
    user,
    profile,
    isLoading: authLoading,
    canAccessAdmin,
    isAdmin,
  } = useSupabaseAuth();

  const {
    createNewClient,
    generateReport,
    viewPerformances,
    viewAllUsers,
    isLoading,
  } = useAdminActions();

  const userData = useMemo(() => {
    return {
      name: profile?.name ?? user?.email?.split("@")[0] ?? "Admin",
      email: user?.email ?? "",
      role: isAdmin ? "admin" : "client",
      tier: (profile as { tier?: string })?.tier ?? "diamond",
    };
  }, [profile, user, isAdmin]);

  const isSuperAdmin =
    canAccessAdmin || user?.email === "contact@tech-trust.fr";

  const {
    stats,
    statsLoading,
    recentUsers,
    usersLoading,
    alerts,
    alertsLoading,
  } = useAdminData();

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case "bronze":
        return {
          icon: Shield,
          name: "Bronze",
          color: "text-amber-600",
          bgColor: "bg-amber-50",
        };
      case "silver":
        return {
          icon: Rocket,
          name: "Silver",
          color: "text-gray-600",
          bgColor: "bg-gray-50",
        };
      case "gold":
        return {
          icon: Crown,
          name: "Gold",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
        };
      case "diamond":
        return {
          icon: Diamond,
          name: "Diamond",
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        };
      default:
        return {
          icon: Shield,
          name: "Bronze",
          color: "text-amber-600",
          bgColor: "bg-amber-50",
        };
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "active":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bg: "bg-green-50",
          label: "Actif",
        };
      case "trial":
        return {
          icon: Activity,
          color: "text-blue-600",
          bg: "bg-blue-50",
          label: "Essai",
        };
      case "pending":
        return {
          icon: XCircle,
          color: "text-orange-600",
          bg: "bg-orange-50",
          label: "En attente",
        };
      default:
        return {
          icon: CheckCircle,
          color: "text-gray-600",
          bg: "bg-gray-50",
          label: "Inconnu",
        };
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return { icon: AlertTriangle, color: "text-orange-500" };
      case "success":
        return { icon: CheckCircle, color: "text-green-500" };
      case "info":
        return { icon: Activity, color: "text-blue-500" };
      default:
        return { icon: Activity, color: "text-gray-500" };
    }
  };

  /* ---------- REDIRECTIONS / LOADERS ---------- */
  if (authLoading) return <Loading />;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isSuperAdmin) return <Navigate to="/dashboard" replace />;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Tableau de bord Admin 🔧
            </h1>
            <p className="text-gray-600">
              Vue d'ensemble de la plateforme Techtrust
            </p>
          </div>
        </div>

        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-blue-500" />
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200"
                >
                  +12%
                </Badge>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  {statsLoading
                    ? "Loading..."
                    : stats?.totalUsers.toLocaleString()}
                </h3>
                <p className="text-sm text-gray-600">Utilisateurs total</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-green-500" />
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200"
                >
                  +8%
                </Badge>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  {statsLoading ? "Loading..." : stats?.activeProjects}
                </h3>
                <p className="text-sm text-gray-600">Projets actifs</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-yellow-500" />
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200"
                >
                  +15%
                </Badge>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  {statsLoading
                    ? "Loading..."
                    : stats?.monthlyRevenue.toLocaleString()}
                  €
                </h3>
                <p className="text-sm text-gray-600">Revenus mensuels</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-purple-500" />
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200"
                >
                  +2.1%
                </Badge>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  {statsLoading
                    ? "Loading..."
                    : stats?.conversionRate.toFixed(1)}
                  %
                </h3>
                <p className="text-sm text-gray-600">Taux de conversion</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Utilisateurs récents */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Nouveaux Utilisateurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {usersLoading
                    ? Array.from({ length: 5 }, (_, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <Skeleton className="w-6 h-6 rounded-full" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                <Skeleton className="w-20 h-4" />
                              </h4>
                              <p className="text-sm text-gray-600">
                                <Skeleton className="w-20 h-3" />
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className="text-gray-500 border-0 text-xs">
                                  <Skeleton className="w-4 h-3" />
                                </Badge>
                                <Badge className="text-gray-500 border-0 text-xs">
                                  <Skeleton className="w-4 h-3" />
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">
                              <Skeleton className="w-12 h-4" />
                            </p>
                            <p className="text-sm text-gray-500">
                              <Skeleton className="w-12 h-3" />
                            </p>
                          </div>
                        </div>
                      ))
                    : recentUsers?.map((user) => {
                        const tierInfo = getTierInfo(user.tier);
                        const statusInfo = getStatusInfo(user.status);
                        const TierIcon = tierInfo.icon;
                        const StatusIcon = statusInfo.icon;

                        return (
                          <div
                            key={user.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                  {user.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {user.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {user.email}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge
                                    className={`${tierInfo.color} ${tierInfo.bgColor} border-0 text-xs`}
                                  >
                                    <TierIcon className="w-3 h-3 mr-1" />
                                    {tierInfo.name}
                                  </Badge>
                                  <Badge
                                    className={`${statusInfo.color} ${statusInfo.bg} border-0 text-xs`}
                                  >
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {statusInfo.label}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">
                                {user.revenue}€/mois
                              </p>
                              <p className="text-sm text-gray-500">
                                {user.joinDate}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                </div>

                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={viewAllUsers}
                    disabled={isLoading}
                  >
                    Voir tous les utilisateurs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alertes système */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Alertes Système
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {alertsLoading
                  ? Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <Skeleton className="w-5 h-5 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            <Skeleton className="w-20 h-4" />
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            <Skeleton className="w-12 h-3" />
                          </p>
                        </div>
                      </div>
                    ))
                  : alerts?.map((alert) => {
                      const alertInfo = getAlertIcon(alert.type);
                      const AlertIcon = alertInfo.icon;

                      return (
                        <div
                          key={alert.id}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <AlertIcon
                            className={`w-5 h-5 mt-0.5 ${alertInfo.color}`}
                          />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              {alert.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Il y a {alert.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowCreateUserModal(true)}
                  disabled={isLoading}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Créer un compte client
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={generateReport}
                  disabled={isLoading}
                >
                  <Activity className="w-4 h-4 mr-2" />
                  {isLoading ? "Génération..." : "Générer un rapport"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={viewPerformances}
                  disabled={isLoading}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Voir les performances
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <CreateUserModal
        isOpen={showCreateUserModal}
        onClose={() => setShowCreateUserModal(false)}
      />
    </AdminLayout>
  );
};

export default AdminDashboard;
