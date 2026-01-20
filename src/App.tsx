import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import Dashboard from '@/pages/Dashboard';
import Auth from '@/pages/Auth';
import Index from '@/pages/Index';
import DashboardBlog from '@/pages/dashboard/Blog';
import DashboardAccount from '@/pages/dashboard/Account';
import DashboardHelp from '@/pages/dashboard/Help';
import DashboardServices from '@/pages/dashboard/Services';
import DashboardSupport from '@/pages/dashboard/Support';
import DashboardUpgradePlan from '@/pages/dashboard/UpgradePlan';
import DashboardAnalytics from '@/pages/dashboard/Analytics';
import DashboardCampaigns from '@/pages/dashboard/Campaigns';
import Careers from '@/pages/Careers';
import Pricing from '@/pages/Pricing';
import Contact from '@/pages/Contact';
import Terms from '@/pages/Terms';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import LegalMentions from '@/pages/LegalMentions';
import Solutions from '@/pages/Solutions';
import AgenceWeb from '@/pages/solutions/AgenceWeb';
import GrowthHacking from '@/pages/solutions/GrowthHacking';
import SolutionsDigitales from '@/pages/solutions/SolutionsDigitales';
import CommunityManagement from '@/pages/solutions/CommunityManagement';
import ConsultingDigital from '@/pages/solutions/ConsultingDigital';
import Help from '@/pages/Help';
import Blog from '@/pages/Blog';
import NotFound from '@/pages/NotFound';
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
import AdminContentCreationPage from '@/pages/admin/campaigns/AdminContentCreationPage';
import ActivateAccount from "@/pages/ActivateAccount";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Index />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/legal" element={<LegalMentions />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/agence-web" element={<AgenceWeb />} />
          <Route path="/solutions/growth-hacking" element={<GrowthHacking />} />
          <Route path="/solutions/digitales-sur-mesure" element={<SolutionsDigitales />} />
          <Route path="/solutions/community-management" element={<CommunityManagement />} />
          <Route path="/solutions/consulting-digital" element={<ConsultingDigital />} />
          <Route path="/help" element={<Help />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Routes protégées */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          
          {/* Routes Analytics utilisateur */}
          <Route path="/dashboard/analytics" element={<ProtectedRoute><DashboardAnalytics /></ProtectedRoute>} />
          <Route path="/dashboard/analytics/social" element={<ProtectedRoute><DashboardAnalytics /></ProtectedRoute>} />
          <Route path="/dashboard/analytics/growth" element={<ProtectedRoute><DashboardAnalytics /></ProtectedRoute>} />
          <Route path="/dashboard/analytics/community" element={<ProtectedRoute><DashboardAnalytics /></ProtectedRoute>} />
          
          {/* Routes Campagnes utilisateur */}
          <Route path="/dashboard/campaigns" element={<ProtectedRoute><DashboardCampaigns /></ProtectedRoute>} />
          <Route path="/dashboard/campaigns/email" element={<ProtectedRoute><DashboardCampaigns /></ProtectedRoute>} />
          <Route path="/dashboard/campaigns/sms" element={<ProtectedRoute><DashboardCampaigns /></ProtectedRoute>} />
          <Route path="/dashboard/campaigns/leads" element={<ProtectedRoute><DashboardCampaigns /></ProtectedRoute>} />
          <Route path="/dashboard/campaigns/automation" element={<ProtectedRoute><DashboardCampaigns /></ProtectedRoute>} />
          <Route path="/dashboard/campaigns/content" element={<ProtectedRoute><DashboardCampaigns /></ProtectedRoute>} />
          
          {/* Routes Blog utilisateur */}
          <Route path="/dashboard/blog" element={<ProtectedRoute><DashboardBlog /></ProtectedRoute>} />
          <Route path="/dashboard/blog/:postId" element={<ProtectedRoute><DashboardBlog /></ProtectedRoute>} />
          
          {/* Routes Account utilisateur */}
          <Route path="/dashboard/account" element={<ProtectedRoute><DashboardAccount /></ProtectedRoute>} />
          <Route path="/dashboard/account/profile" element={<ProtectedRoute><DashboardAccount /></ProtectedRoute>} />
          <Route path="/dashboard/account/plan" element={<ProtectedRoute><DashboardAccount /></ProtectedRoute>} />
          <Route path="/dashboard/account/billing" element={<ProtectedRoute><DashboardAccount /></ProtectedRoute>} />
          <Route path="/dashboard/account/security" element={<ProtectedRoute><DashboardAccount /></ProtectedRoute>} />
          
          {/* Routes Help utilisateur */}
          <Route path="/dashboard/help" element={<ProtectedRoute><DashboardHelp /></ProtectedRoute>} />
          <Route path="/dashboard/help/faq" element={<ProtectedRoute><DashboardHelp /></ProtectedRoute>} />
          <Route path="/dashboard/help/support" element={<ProtectedRoute><DashboardHelp /></ProtectedRoute>} />
          <Route path="/dashboard/help/tutorials" element={<ProtectedRoute><DashboardHelp /></ProtectedRoute>} />
          
          {/* Autres routes utilisateur */}
          <Route path="/dashboard/services" element={<ProtectedRoute><DashboardServices /></ProtectedRoute>} />
          <Route path="/dashboard/support" element={<ProtectedRoute><DashboardSupport /></ProtectedRoute>} />
          <Route path="/dashboard/upgrade-plan" element={<ProtectedRoute><DashboardUpgradePlan /></ProtectedRoute>} />

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

          {/* Blog */}
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
          <Route path="/admin/campaigns/content" element={<ProtectedRoute adminOnly={true}><AdminContentCreationPage /></ProtectedRoute>} />
          
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
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
