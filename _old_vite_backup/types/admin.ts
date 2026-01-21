
import { LucideIcon } from "lucide-react";

export interface UserData {
  name: string;
  email: string;
  role?: string;
  tier?: string;
}

export interface NavSubItem {
  name: string;
  href: string;
}

export interface NavItem {
  id: string;
  name: string;
  icon: LucideIcon;
  href: string;
  submenu?: NavSubItem[];
}

export interface AdminLayoutProps {
  children: React.ReactNode;
}
