import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface AdminStats {
  totalUsers: number;
  activeProjects: number;
  monthlyRevenue: number;
  conversionRate: number;
}

interface RecentUser {
  id: number;
  name: string;
  email: string;
  tier: string;
  status: string;
  joinDate: string;
  revenue: number;
}

interface SystemAlert {
  id: number;
  type: "warning" | "success" | "info";
  message: string;
  time: string;
}

export const useAdminData = () => {
  /* ---------- Stats agrégées ---------- */
  const statsQuery = useQuery<AdminStats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      // TODO: remplacer par de vraies requêtes agrégées
      const { count } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true });

      return {
        totalUsers: count ?? 0,
        activeProjects: 0,
        monthlyRevenue: 0,
        conversionRate: 0,
      };
    },
  });

  /* ---------- Nouveaux utilisateurs ---------- */
  const recentUsersQuery = useQuery<RecentUser[]>({
    queryKey: ["recent-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email, tier, status, created_at")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;

      return (
        data?.map((u, idx) => ({
          id: idx,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          name: (u as any).name ?? "N/A",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          email: (u as any).email ?? "N/A",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tier: (u as any).tier ?? "bronze",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          status: (u as any).status ?? "active",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          joinDate: (u as any).created_at ?? "",
          revenue: 0,
        })) || []
      );
    },
  });

  /* ---------- Alertes système ---------- */
  const alertsQuery = useQuery<SystemAlert[]>({
    queryKey: ["system-alerts"],
    queryFn: async () => {
      // Placeholder – pas encore de table
      return [];
    },
  });

  return {
    stats: statsQuery.data,
    statsLoading: statsQuery.isLoading,
    recentUsers: recentUsersQuery.data,
    usersLoading: recentUsersQuery.isLoading,
    alerts: alertsQuery.data,
    alertsLoading: alertsQuery.isLoading,
  };
};
