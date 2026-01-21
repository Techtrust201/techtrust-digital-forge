
export interface InvitationData {
  id: string;
  email: string;
  name: string;
  company: string;
  phone?: string;
  position?: string;
  industry?: string;
  address?: any;
  selected_packages: string[];
  status: string;
  notes?: string;
  invitation_token: string;
  expires_at: string;
  created_at: string;
  created_by?: string;
  activated_at?: string;
  user_id?: string;
}
