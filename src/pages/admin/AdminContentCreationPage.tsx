
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ContentCreation from '@/pages/dashboard/campaigns/ContentCreation';

const AdminContentCreationPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Création de Contenu IA</h1>
          <p className="text-gray-600 mt-2">
            Interface admin pour la création de contenu avec intelligence artificielle
          </p>
        </div>
        
        <ContentCreation />
      </div>
    </AdminLayout>
  );
};

export default AdminContentCreationPage;
