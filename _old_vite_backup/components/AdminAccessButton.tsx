
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, ExternalLink } from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useNavigate } from 'react-router-dom';

const AdminAccessButton: React.FC = () => {
  const { canAccessAdmin } = useSupabaseAuth();
  const navigate = useNavigate();

  if (!canAccessAdmin) {
    return null;
  }

  const handleAdminAccess = () => {
    console.log('Navigating to admin interface');
    navigate('/admin/dashboard');
  };

  return (
    <Button
      onClick={handleAdminAccess}
      variant="outline"
      className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
    >
      <Shield className="w-4 h-4" />
      Interface Admin
      <ExternalLink className="w-4 h-4" />
    </Button>
  );
};

export default AdminAccessButton;
