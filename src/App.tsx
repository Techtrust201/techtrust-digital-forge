
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import Dashboard from '@/pages/Dashboard';
import Auth from '@/pages/Auth';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
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

          {/* Routes Admin - retirer AdminLayout car il est déjà dans AdminUsersPage */}
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminUsersPage /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminUsersPage /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUsersPage /></ProtectedRoute>} />
          <Route path="/admin/users/create" element={<ProtectedRoute adminOnly={true}><AdminUsersPage /></ProtectedRoute>} />

          {/* Nouvelle route pour l'activation de compte */}
          <Route path="/activate-account" element={<ActivateAccount />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
