
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import Dashboard from '@/pages/Dashboard';
import Auth from '@/pages/Auth';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminAnalyticsPage from '@/pages/admin/AdminAnalyticsPage';
import AdminBlogPage from '@/pages/admin/AdminBlogPage';
import AdminBlogPostsPage from '@/pages/admin/blog/AdminBlogPostsPage';
import AdminBlogCreatePage from '@/pages/admin/blog/AdminBlogCreatePage';
import AdminBlogCategoriesPage from '@/pages/admin/blog/AdminBlogCategoriesPage';
import AdminBlogCommentsPage from '@/pages/admin/blog/AdminBlogCommentsPage';
import AdminBlogEditPage from '@/pages/admin/blog/AdminBlogEditPage';
import AdminBlogPreviewPage from '@/pages/admin/blog/AdminBlogPreviewPage';
import AdminCampaignsPage from '@/pages/admin/AdminCampaignsPage';
import AdminBillingPage from '@/pages/admin/AdminBillingPage';
import AdminSystemPage from '@/pages/admin/AdminSystemPage';
import AdminContentCreationPage from '@/pages/admin/AdminContentCreationPage';
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
          
          {/* Routes pour les campagnes utilisateur */}
          <Route path="/dashboard/campaigns" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/campaigns/email" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/campaigns/sms" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/campaigns/leads" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/campaigns/automation" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          {/* Routes Admin */}
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
          
          {/* Gestion Utilisateurs */}
          <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUsersPage /></ProtectedRoute>} />
          <Route path="/admin/users/new" element={<ProtectedRoute adminOnly={true}><AdminUsersPage /></ProtectedRoute>} />
          <Route path="/admin/users/suspended" element={<ProtectedRoute adminOnly={true}><AdminUsersPage /></ProtectedRoute>} />
          <Route path="/admin/users/create" element={<ProtectedRoute adminOnly={true}><AdminUsersPage /></ProtectedRoute>} />

          {/* Analytics */}
          <Route path="/admin/analytics" element={<ProtectedRoute adminOnly={true}><AdminAnalyticsPage /></ProtectedRoute>} />
          <Route path="/admin/analytics/overview" element={<ProtectedRoute adminOnly={true}><AdminAnalyticsPage /></ProtectedRoute>} />
          <Route path="/admin/analytics/revenue" element={<ProtectedRoute adminOnly={true}><AdminAnalyticsPage /></ProtectedRoute>} />
          <Route path="/admin/analytics/performance" element={<ProtectedRoute adminOnly={true}><AdminAnalyticsPage /></ProtectedRoute>} />
          <Route path="/admin/analytics/users" element={<ProtectedRoute adminOnly={true}><AdminAnalyticsPage /></ProtectedRoute>} />

          {/* Blog - Routes mises à jour */}
          <Route path="/admin/blog" element={<ProtectedRoute adminOnly={true}><AdminBlogPage /></ProtectedRoute>} />
          <Route path="/admin/blog/posts" element={<ProtectedRoute adminOnly={true}><AdminBlogPostsPage /></ProtectedRoute>} />
          <Route path="/admin/blog/create" element={<ProtectedRoute adminOnly={true}><AdminBlogCreatePage /></ProtectedRoute>} />
          <Route path="/admin/blog/categories" element={<ProtectedRoute adminOnly={true}><AdminBlogCategoriesPage /></ProtectedRoute>} />
          <Route path="/admin/blog/comments" element={<ProtectedRoute adminOnly={true}><AdminBlogCommentsPage /></ProtectedRoute>} />
          <Route path="/admin/blog/edit/:id" element={<ProtectedRoute adminOnly={true}><AdminBlogEditPage /></ProtectedRoute>} />
          <Route path="/admin/blog/preview/:id" element={<ProtectedRoute adminOnly={true}><AdminBlogPreviewPage /></ProtectedRoute>} />

          {/* Campagnes */}
          <Route path="/admin/campaigns" element={<ProtectedRoute adminOnly={true}><AdminCampaignsPage /></ProtectedRoute>} />
          <Route path="/admin/campaigns/email" element={<ProtectedRoute adminOnly={true}><AdminCampaignsPage /></ProtectedRoute>} />
          <Route path="/admin/campaigns/sms" element={<ProtectedRoute adminOnly={true}><AdminCampaignsPage /></ProtectedRoute>} />
          <Route path="/admin/campaigns/automation" element={<ProtectedRoute adminOnly={true}><AdminCampaignsPage /></ProtectedRoute>} />
          
          {/* Création de Contenu IA - NOUVEAU */}
          <Route path="/admin/content-creation" element={<ProtectedRoute adminOnly={true}><AdminContentCreationPage /></ProtectedRoute>} />

          {/* Facturation */}
          <Route path="/admin/billing" element={<ProtectedRoute adminOnly={true}><AdminBillingPage /></ProtectedRoute>} />
          <Route path="/admin/billing/invoices" element={<ProtectedRoute adminOnly={true}><AdminBillingPage /></ProtectedRoute>} />
          <Route path="/admin/billing/payments" element={<ProtectedRoute adminOnly={true}><AdminBillingPage /></ProtectedRoute>} />
          <Route path="/admin/billing/subscriptions" element={<ProtectedRoute adminOnly={true}><AdminBillingPage /></ProtectedRoute>} />

          {/* Système */}
          <Route path="/admin/system" element={<ProtectedRoute adminOnly={true}><AdminSystemPage /></ProtectedRoute>} />
          <Route path="/admin/system/config" element={<ProtectedRoute adminOnly={true}><AdminSystemPage /></ProtectedRoute>} />
          <Route path="/admin/system/logs" element={<ProtectedRoute adminOnly={true}><AdminSystemPage /></ProtectedRoute>} />
          <Route path="/admin/system/backups" element={<ProtectedRoute adminOnly={true}><AdminSystemPage /></ProtectedRoute>} />
          <Route path="/admin/system/security" element={<ProtectedRoute adminOnly={true}><AdminSystemPage /></ProtectedRoute>} />

          {/* Activation de compte */}
          <Route path="/activate-account" element={<ActivateAccount />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
