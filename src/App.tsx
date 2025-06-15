
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Index from '@/pages/Index';
import Pricing from '@/pages/Pricing';
import PricingOptimized from '@/pages/PricingOptimized';
import Contact from '@/pages/Contact';
import Help from '@/pages/Help';
import Blog from '@/pages/Blog';
import Careers from '@/pages/Careers';
import Solutions from '@/pages/Solutions';
import AgenceWeb from '@/pages/solutions/AgenceWeb';
import GrowthHacking from '@/pages/solutions/GrowthHacking';
import CommunityManagement from '@/pages/solutions/CommunityManagement';
import ConsultingDigital from '@/pages/solutions/ConsultingDigital';
import SolutionsDigitales from '@/pages/solutions/SolutionsDigitales';
import LegalMentions from '@/pages/LegalMentions';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Terms from '@/pages/Terms';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Services from '@/pages/dashboard/Services';
import Campaigns from '@/pages/dashboard/Campaigns';
import EmailCampaigns from '@/pages/dashboard/campaigns/EmailCampaigns';
import SMSCampaigns from '@/pages/dashboard/campaigns/SMSCampaigns';
import LeadCampaigns from '@/pages/dashboard/campaigns/LeadCampaigns';
import AutomationCampaigns from '@/pages/dashboard/campaigns/AutomationCampaigns';
import Analytics from '@/pages/dashboard/Analytics';
import WebsiteAnalytics from '@/pages/dashboard/analytics/WebsiteAnalytics';
import SocialAnalytics from '@/pages/dashboard/analytics/SocialAnalytics';
import GrowthAnalytics from '@/pages/dashboard/analytics/GrowthAnalytics';
import CommunityAnalytics from '@/pages/dashboard/analytics/CommunityAnalytics';
import Account from '@/pages/dashboard/Account';
import Support from '@/pages/dashboard/Support';
import DashboardHelp from '@/pages/dashboard/Help';
import UpgradePlan from '@/pages/dashboard/UpgradePlan';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminAnalyticsPage from '@/pages/admin/AdminAnalyticsPage';
import AdminAnalyticsOverviewPage from '@/pages/admin/analytics/AdminAnalyticsOverviewPage';
import AdminAnalyticsUsersPage from '@/pages/admin/analytics/AdminAnalyticsUsersPage';
import AdminAnalyticsRevenuePage from '@/pages/admin/analytics/AdminAnalyticsRevenuePage';
import AdminAnalyticsPerformancePage from '@/pages/admin/analytics/AdminAnalyticsPerformancePage';
import AdminBillingPage from '@/pages/admin/AdminBillingPage';
import AdminBillingSubscriptionsPage from '@/pages/admin/billing/AdminBillingSubscriptionsPage';
import AdminBillingInvoicesPage from '@/pages/admin/billing/AdminBillingInvoicesPage';
import AdminBillingPaymentsPage from '@/pages/admin/billing/AdminBillingPaymentsPage';
import AdminCampaignsPage from '@/pages/admin/AdminCampaignsPage';
import AdminCampaignsEmailPage from '@/pages/admin/campaigns/AdminCampaignsEmailPage';
import AdminCampaignsSMSPage from '@/pages/admin/campaigns/AdminCampaignsSMSPage';
import AdminCampaignsAutomationPage from '@/pages/admin/campaigns/AdminCampaignsAutomationPage';
import AdminBlogPage from '@/pages/admin/AdminBlogPage';
import AdminBlogCreatePage from '@/pages/admin/blog/AdminBlogCreatePage';
import AdminBlogPostsPage from '@/pages/admin/blog/AdminBlogPostsPage';
import AdminBlogCategoriesPage from '@/pages/admin/blog/AdminBlogCategoriesPage';
import AdminBlogCommentsPage from '@/pages/admin/blog/AdminBlogCommentsPage';
import AdminSystemPage from '@/pages/admin/AdminSystemPage';
import NotFound from '@/pages/NotFound';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useIsHydrating } from '@/hooks/useIsHydrating';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster } from '@/components/ui/toaster';

// Composant interne pour gérer la logique avec useLocation
function AppContent() {
  const { isLoading } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const isHydrating = useIsHydrating();

  useEffect(() => {
    if (location.pathname === '/dashboard' || location.pathname === '/admin') {
      toast({
        title: 'Bienvenue !',
        description: 'Vous êtes connecté.',
      });
    }
  }, [location.pathname, toast]);

  if (isLoading || isHydrating) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="space-y-3">
          <Skeleton className="w-[300px] h-[80px] rounded-md" />
          <Skeleton className="w-[200px] h-[40px] rounded-md" />
          <Skeleton className="w-[400px] h-[20px] rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/pricing-optimized" element={<PricingOptimized />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/help" element={<Help />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route path="/solutions/agence-web" element={<AgenceWeb />} />
      <Route path="/solutions/growth-hacking" element={<GrowthHacking />} />
      <Route path="/solutions/community-management" element={<CommunityManagement />} />
      <Route path="/solutions/consulting-digital" element={<ConsultingDigital />} />
      <Route path="/solutions/solutions-digitales" element={<SolutionsDigitales />} />
      <Route path="/legal-mentions" element={<LegalMentions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/auth" element={<Auth />} />

      {/* Protected dashboard routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/services" element={<Services />} />
      <Route path="/dashboard/campaigns" element={<Campaigns />} />
      <Route path="/dashboard/campaigns/email" element={<EmailCampaigns />} />
      <Route path="/dashboard/campaigns/sms" element={<SMSCampaigns />} />
      <Route path="/dashboard/campaigns/lead" element={<LeadCampaigns />} />
      <Route path="/dashboard/campaigns/automation" element={<AutomationCampaigns />} />
      <Route path="/dashboard/analytics" element={<Analytics />} />
      <Route path="/dashboard/analytics/website" element={<WebsiteAnalytics />} />
      <Route path="/dashboard/analytics/social" element={<SocialAnalytics />} />
      <Route path="/dashboard/analytics/growth" element={<GrowthAnalytics />} />
      <Route path="/dashboard/analytics/community" element={<CommunityAnalytics />} />
      <Route path="/dashboard/account" element={<Account />} />
      <Route path="/dashboard/support" element={<Support />} />
      <Route path="/dashboard/help" element={<DashboardHelp />} />
      <Route path="/dashboard/upgrade-plan" element={<UpgradePlan />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
      <Route path="/admin/analytics/overview" element={<AdminAnalyticsOverviewPage />} />
      <Route path="/admin/analytics/users" element={<AdminAnalyticsUsersPage />} />
      <Route path="/admin/analytics/revenue" element={<AdminAnalyticsRevenuePage />} />
      <Route path="/admin/analytics/performance" element={<AdminAnalyticsPerformancePage />} />
      <Route path="/admin/billing" element={<AdminBillingPage />} />
      <Route path="/admin/billing/subscriptions" element={<AdminBillingSubscriptionsPage />} />
      <Route path="/admin/billing/invoices" element={<AdminBillingInvoicesPage />} />
      <Route path="/admin/billing/payments" element={<AdminBillingPaymentsPage />} />
      <Route path="/admin/campaigns" element={<AdminCampaignsPage />} />
      <Route path="/admin/campaigns/email" element={<AdminCampaignsEmailPage />} />
      <Route path="/admin/campaigns/sms" element={<AdminCampaignsSMSPage />} />
      <Route path="/admin/campaigns/automation" element={<AdminCampaignsAutomationPage />} />
      <Route path="/admin/blog" element={<AdminBlogPage />} />
      <Route path="/admin/blog/create" element={<AdminBlogCreatePage />} />
      <Route path="/admin/blog/posts" element={<AdminBlogPostsPage />} />
      <Route path="/admin/blog/categories" element={<AdminBlogCategoriesPage />} />
      <Route path="/admin/blog/comments" element={<AdminBlogCommentsPage />} />
      <Route path="/admin/system" element={<AdminSystemPage />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
