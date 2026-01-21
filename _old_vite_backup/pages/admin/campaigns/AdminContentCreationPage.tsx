
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ContentCreationWorkflow from '@/components/campaigns/ContentCreationWorkflow';

const AdminContentCreationPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Studio IA - Création de Contenu</h1>
          <p className="text-gray-600 mt-2">
            Workflow complet de création : génération → composition → réseaux sociaux → planification
          </p>
        </div>
        
        <ContentCreationWorkflow />
      </div>
    </AdminLayout>
  );
};

export default AdminContentCreationPage;
