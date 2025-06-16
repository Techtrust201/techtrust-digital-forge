import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

// Pages
import Index from './pages/Index';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import SuperAdminSetup from './pages/SuperAdminSetup';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import Pricing from './pages/Pricing';
import Careers from './pages/Careers';
import Help from './pages/Help';
import Contact from './pages/Contact';
import Solutions from './pages/Solutions';

// Solution pages
import AgenceWeb from './pages/solutions/AgenceWeb';
import GrowthHacking from './pages/solutions/GrowthHacking';
import SolutionsDigitales from './pages/solutions/SolutionsDigitales';
import CommunityManagement from './pages/solutions/CommunityManagement';
import ConsultingDigital from './pages/solutions/ConsultingDigital';

// Admin pages
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminBillingPage from './pages/admin/AdminBillingPage';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminCampaignsPage from './pages/admin/AdminCampaignsPage';
import AdminSystemPage from './pages/admin/AdminSystemPage';
import AdminAuthRolesPage from './pages/admin/auth/AdminAuthRolesPage';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useSupabaseAuth();

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
  const { isAuthenticated, isAdmin, isLoading } = useSupabaseAuth();
  const [isAdminUser, setIsAdminUser] = React.useState(false);
  const [adminCheckLoading, setAdminCheckLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAdminStatus = async () => {
      if (isAuthenticated) {
        const adminStatus = await isAdmin();
        setIsAdminUser(adminStatus);
      }
      setAdminCheckLoading(false);
    };

    if (!isLoading) {
      checkAdminStatus();
    }
  }, [isAuthenticated, isAdmin, isLoading]);

  if (isLoading || adminCheckLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdminUser) {
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
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/super-admin-setup" element={<SuperAdminSetup />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/solutions" element={<Solutions />} />
            
            {/* Solution pages */}
            <Route path="/solutions/agence-web" element={<AgenceWeb />} />
            <Route path="/solutions/growth-hacking" element={<GrowthHacking />} />
            <Route path="/solutions/digitales-sur-mesure" element={<SolutionsDigitales />} />
            <Route path="/solutions/community-management" element={<CommunityManagement />} />
            <Route path="/solutions/consulting-digital" element={<ConsultingDigital />} />
            
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
            <Route path="/admin/auth/roles" element={
              <AdminRoute>
                <AdminAuthRolesPage />
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
