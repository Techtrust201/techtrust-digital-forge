
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { useBetterAuthIndependent } from '@/hooks/useBetterAuthIndependent';

// Pages
import Index from './pages/Index';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import NotFound from './pages/NotFound';

// Admin pages
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminBillingPage from './pages/admin/AdminBillingPage';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminCampaignsPage from './pages/admin/AdminCampaignsPage';
import AdminSystemPage from './pages/admin/AdminSystemPage';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useBetterAuthIndependent();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, userRole, isLoading } = useBetterAuthIndependent();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (userRole !== 'admin' && userRole !== 'super_admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>  
            } />

            {/* Admin routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/users" element={
              <AdminRoute>
                <AdminUsersPage />
              </AdminRoute>
            } />
            <Route path="/admin/users/create" element={
              <AdminRoute>
                <AdminUsersPage />
              </AdminRoute>
            } />
            <Route path="/admin/analytics" element={
              <AdminRoute>
                <AdminAnalyticsPage />
              </AdminRoute>
            } />
            <Route path="/admin/billing" element={
              <AdminRoute>
                <AdminBillingPage />
              </AdminRoute>
            } />
            <Route path="/admin/blog" element={
              <AdminRoute>
                <AdminBlogPage />
              </AdminRoute>
            } />
            <Route path="/admin/campaigns" element={
              <AdminRoute>
                <AdminCampaignsPage />
              </AdminRoute>
            } />
            <Route path="/admin/system" element={
              <AdminRoute>
                <AdminSystemPage />
              </AdminRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
