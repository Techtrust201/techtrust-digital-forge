
import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CreateUserModal from "@/components/admin/CreateUserModal";
import SearchFilters from "@/components/admin/SearchFilters";
import UserStatsCards from "@/components/admin/users/UserStatsCards";
import UsersTable from "@/components/admin/users/UsersTable";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useUserData } from "@/hooks/useUserData";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  UserPlus,
  Shield,
  Crown,
  Diamond,
  Rocket,
} from "lucide-react";

const AdminUsersPage = () => {
  const { t } = useTranslation();
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");

  const {
    user,
    profile,
    isLoading: authLoading,
    canAccessAdmin,
  } = useSupabaseAuth();

  const { users, isLoading: usersLoading, error } = useUserData();

  const isSuperAdmin =
    canAccessAdmin || user?.email === "contact@tech-trust.fr";

  // Filtrage des utilisateurs
  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      const matchesTier = tierFilter === "all" || user.tier === tierFilter;

      return matchesSearch && matchesStatus && matchesTier;
    });
  }, [users, searchTerm, statusFilter, tierFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTierFilter("all");
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Skeleton className="w-[300px] h-[80px] rounded-md" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;
  if (!isSuperAdmin) return <Navigate to="/dashboard" replace />;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-500" />
              Tous les utilisateurs
            </h1>
            <p className="text-gray-600">
              Gérez tous vos utilisateurs et leurs accès
            </p>
          </div>
          <Button
            onClick={() => setShowCreateUserModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Créer un utilisateur
          </Button>
        </div>

        {/* Stats Cards */}
        <UserStatsCards users={users} />

        {/* Filtres de recherche */}
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          tierFilter={tierFilter}
          onTierFilterChange={setTierFilter}
          onClearFilters={clearFilters}
        />

        {/* Table des utilisateurs */}
        <UsersTable
          users={filteredUsers}
          isLoading={usersLoading}
          error={error}
        />
      </div>

      <CreateUserModal
        isOpen={showCreateUserModal}
        onClose={() => setShowCreateUserModal(false)}
      />
    </AdminLayout>
  );
};

export default AdminUsersPage;
