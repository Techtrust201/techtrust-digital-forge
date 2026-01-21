export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
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
        Relationships: []
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
        Relationships: []
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_complete_user_data: {
        Args: Record<string, never>
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
      is_admin: { 
        Args: { _user_id: string }
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

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
