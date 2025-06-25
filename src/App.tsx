import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import Dashboard from '@/pages/Dashboard';
import Auth from '@/pages/Auth';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminInvoicesPage from '@/pages/admin/AdminInvoicesPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';
import AnalyticsDashboard from '@/pages/analytics/AnalyticsDashboard';
import ActivateAccount from "@/pages/ActivateAccount";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          {/* Routes Admin */}
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="users/create" element={<AdminUsersPage />} />
            <Route path="invoices" element={<AdminInvoicesPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Routes Analytics */}
          <Route path="/analytics" element={<ProtectedRoute><AnalyticsDashboard /></ProtectedRoute>} />
          
          {/* Nouvelle route pour l'activation de compte */}
          <Route path="/activate-account" element={<ActivateAccount />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
