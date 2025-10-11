export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      account: {
        Row: {
          accessToken: string | null
          accountId: string
          createdAt: string
          expiresAt: string | null
          id: string
          idToken: string | null
          password: string | null
          providerId: string
          refreshToken: string | null
          updatedAt: string
          userId: string
        }
        Insert: {
          accessToken?: string | null
          accountId: string
          createdAt?: string
          expiresAt?: string | null
          id: string
          idToken?: string | null
          password?: string | null
          providerId: string
          refreshToken?: string | null
          updatedAt?: string
          userId: string
        }
        Update: {
          accessToken?: string | null
          accountId?: string
          createdAt?: string
          expiresAt?: string | null
          id?: string
          idToken?: string | null
          password?: string | null
          providerId?: string
          refreshToken?: string | null
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "account_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_data: {
        Row: {
          category: string | null
          created_at: string
          date: string
          id: string
          metadata: Json | null
          metric_name: string
          metric_value: number
        }
        Insert: {
          category?: string | null
          created_at?: string
          date?: string
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_value: number
        }
        Update: {
          category?: string | null
          created_at?: string
          date?: string
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_value?: number
        }
        Relationships: []
      }
      automation_campaigns: {
        Row: {
          conversion_rate: number | null
          created_at: string
          description: string | null
          id: string
          name: string
          status: string
          total_completed: number | null
          total_triggered: number | null
          trigger_type: string
        }
        Insert: {
          conversion_rate?: number | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          status?: string
          total_completed?: number | null
          total_triggered?: number | null
          trigger_type: string
        }
        Update: {
          conversion_rate?: number | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          status?: string
          total_completed?: number | null
          total_triggered?: number | null
          trigger_type?: string
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          author_email: string
          author_name: string
          content: string
          created_at: string
          id: string
          ip_address: unknown | null
          post_id: string | null
          status: string
        }
        Insert: {
          author_email: string
          author_name: string
          content: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          post_id?: string | null
          status?: string
        }
        Update: {
          author_email?: string
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          post_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string | null
          created_at: string
          excerpt: string | null
          id: string
          publish_date: string | null
          status: string
          title: string
          updated_at: string
          views: number | null
        }
        Insert: {
          author: string
          category: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          publish_date?: string | null
          status?: string
          title: string
          updated_at?: string
          views?: number | null
        }
        Update: {
          author?: string
          category?: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          publish_date?: string | null
          status?: string
          title?: string
          updated_at?: string
          views?: number | null
        }
        Relationships: []
      }
      email_campaigns: {
        Row: {
          click_rate: number | null
          content: string | null
          created_at: string
          id: string
          name: string
          open_rate: number | null
          recipients: number | null
          sent_date: string | null
          status: string
          subject: string
          type: string
        }
        Insert: {
          click_rate?: number | null
          content?: string | null
          created_at?: string
          id?: string
          name: string
          open_rate?: number | null
          recipients?: number | null
          sent_date?: string | null
          status?: string
          subject: string
          type?: string
        }
        Update: {
          click_rate?: number | null
          content?: string | null
          created_at?: string
          id?: string
          name?: string
          open_rate?: number | null
          recipients?: number | null
          sent_date?: string | null
          status?: string
          subject?: string
          type?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          client_email: string
          client_name: string
          created_at: string
          due_date: string
          id: string
          paid_date: string | null
          payment_method: string | null
          services: string[]
          status: string
        }
        Insert: {
          amount: number
          client_email: string
          client_name: string
          created_at?: string
          due_date: string
          id: string
          paid_date?: string | null
          payment_method?: string | null
          services: string[]
          status?: string
        }
        Update: {
          amount?: number
          client_email?: string
          client_name?: string
          created_at?: string
          due_date?: string
          id?: string
          paid_date?: string | null
          payment_method?: string | null
          services?: string[]
          status?: string
        }
        Relationships: []
      }
      packages: {
        Row: {
          category_key: string
          category_name: string
          created_at: string | null
          duration: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          name: string
          price: number
          tier: string
        }
        Insert: {
          category_key: string
          category_name: string
          created_at?: string | null
          duration?: string | null
          features?: Json | null
          id: string
          is_active?: boolean | null
          name: string
          price: number
          tier: string
        }
        Update: {
          category_key?: string
          category_name?: string
          created_at?: string | null
          duration?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          tier?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          fees: number | null
          id: string
          invoice_id: string | null
          payment_method: string
          processed_at: string | null
          status: string
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          fees?: number | null
          id?: string
          invoice_id?: string | null
          payment_method: string
          processed_at?: string | null
          status?: string
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          fees?: number | null
          id?: string
          invoice_id?: string | null
          payment_method?: string
          processed_at?: string | null
          status?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_metrics: {
        Row: {
          created_at: string
          date: string
          id: string
          metric_type: string
          page_path: string | null
          value: number
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          metric_type: string
          page_path?: string | null
          value: number
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          metric_type?: string
          page_path?: string | null
          value?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: Json | null
          company: string | null
          created_at: string | null
          id: string
          industry: string | null
          name: string | null
          notes: string | null
          phone: string | null
          position: string | null
          role: string
          status: string | null
          tier: string | null
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          company?: string | null
          created_at?: string | null
          id: string
          industry?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          position?: string | null
          role?: string
          status?: string | null
          tier?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          company?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          position?: string | null
          role?: string
          status?: string | null
          tier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      session: {
        Row: {
          createdAt: string
          expiresAt: string
          id: string
          ipAddress: string | null
          updatedAt: string
          userAgent: string | null
          userId: string
        }
        Insert: {
          createdAt?: string
          expiresAt: string
          id: string
          ipAddress?: string | null
          updatedAt?: string
          userAgent?: string | null
          userId: string
        }
        Update: {
          createdAt?: string
          expiresAt?: string
          id?: string
          ipAddress?: string | null
          updatedAt?: string
          userAgent?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_campaigns: {
        Row: {
          cost: number | null
          created_at: string
          delivered: number | null
          delivery_rate: number | null
          id: string
          message: string
          name: string
          recipients: number | null
          sent_date: string | null
          status: string
        }
        Insert: {
          cost?: number | null
          created_at?: string
          delivered?: number | null
          delivery_rate?: number | null
          id?: string
          message: string
          name: string
          recipients?: number | null
          sent_date?: string | null
          status?: string
        }
        Update: {
          cost?: number | null
          created_at?: string
          delivered?: number | null
          delivery_rate?: number | null
          id?: string
          message?: string
          name?: string
          recipients?: number | null
          sent_date?: string | null
          status?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          createdAt: string
          email: string
          emailVerified: boolean
          id: string
          image: string | null
          name: string | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          email: string
          emailVerified?: boolean
          id: string
          image?: string | null
          name?: string | null
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          email?: string
          emailVerified?: boolean
          id?: string
          image?: string | null
          name?: string | null
          updatedAt?: string
        }
        Relationships: []
      }
      user_analytics: {
        Row: {
          browser: string | null
          created_at: string
          device_type: string | null
          event_type: string
          id: string
          location: string | null
          page_url: string | null
          session_duration: number | null
          user_id: string
        }
        Insert: {
          browser?: string | null
          created_at?: string
          device_type?: string | null
          event_type: string
          id?: string
          location?: string | null
          page_url?: string | null
          session_duration?: number | null
          user_id: string
        }
        Update: {
          browser?: string | null
          created_at?: string
          device_type?: string | null
          event_type?: string
          id?: string
          location?: string | null
          page_url?: string | null
          session_duration?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_invitations: {
        Row: {
          activated_at: string | null
          address: Json | null
          company: string | null
          created_at: string
          created_by: string | null
          email: string
          expires_at: string
          id: string
          industry: string | null
          invitation_token: string
          name: string
          notes: string | null
          phone: string | null
          position: string | null
          selected_packages: Json
          status: string
          user_id: string | null
        }
        Insert: {
          activated_at?: string | null
          address?: Json | null
          company?: string | null
          created_at?: string
          created_by?: string | null
          email: string
          expires_at?: string
          id?: string
          industry?: string | null
          invitation_token: string
          name: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          selected_packages?: Json
          status?: string
          user_id?: string | null
        }
        Update: {
          activated_at?: string | null
          address?: Json | null
          company?: string | null
          created_at?: string
          created_by?: string | null
          email?: string
          expires_at?: string
          id?: string
          industry?: string | null
          invitation_token?: string
          name?: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          selected_packages?: Json
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          createdAt: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          userId: string
        }
        Update: {
          createdAt?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          package_category: string
          package_id: string
          package_name: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          package_category: string
          package_id: string
          package_name: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          package_category?: string
          package_id?: string
          package_name?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      verification: {
        Row: {
          createdAt: string
          expiresAt: string
          id: string
          identifier: string
          updatedAt: string
          value: string
        }
        Insert: {
          createdAt?: string
          expiresAt: string
          id: string
          identifier: string
          updatedAt?: string
          value: string
        }
        Update: {
          createdAt?: string
          expiresAt?: string
          id?: string
          identifier?: string
          updatedAt?: string
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_user_tier: {
        Args: { user_packages: string[] }
        Returns: string
      }
      cleanup_expired_invitations: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_invitation_token: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_complete_user_data: {
        Args: Record<PropertyKey, never>
        Returns: {
          address: Json
          company: string
          created_at: string
          email: string
          industry: string
          name: string
          packages: Json
          phone: string
          role: string
          status: string
          tier: string
          user_id: string
          user_position: string
        }[]
      }
      get_user_details: {
        Args: { target_user_id: string }
        Returns: {
          address: Json
          company: string
          created_at: string
          email: string
          industry: string
          last_sign_in_at: string
          name: string
          packages: Json
          phone: string
          role: string
          status: string
          subscription_count: number
          tier: string
          total_revenue: number
          user_id: string
          user_position: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_article_views: {
        Args: { article_id: string }
        Returns: undefined
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
      sync_user_subscriptions_from_invitation: {
        Args: { invitation_id: string; new_user_id: string }
        Returns: undefined
      }
      update_user_packages: {
        Args: { new_package_ids: string[]; target_user_id: string }
        Returns: undefined
      }
      update_user_role_by_email: {
        Args: { _email: string; _role: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "super_admin" | "admin" | "manager" | "employee" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "admin", "manager", "employee", "client"],
    },
  },
} as const
