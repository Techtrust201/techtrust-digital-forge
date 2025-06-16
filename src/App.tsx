
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from '@/components/ProtectedRoute';
import Index from '@/pages/Index';
import Pricing from '@/pages/Pricing';
import PricingOptimized from '@/pages/PricingOptimized';
import Contact from '@/pages/Contact';
import Help from '@/pages/Help';
import Blog from '@/pages/Blog';
import BlogPostPage from '@/pages/blog/BlogPostPage';
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
import DashboardBlog from '@/pages/dashboard/Blog';
import BlogPostView from '@/pages/dashboard/blog/BlogPostView';
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
import AdminBlogEditPage from '@/pages/admin/blog/AdminBlogEditPage';
import AdminBlogPreviewPage from '@/pages/admin/blog/AdminBlogPreviewPage';
import AdminBlogCategoriesPage from '@/pages/admin/blog/AdminBlogCategoriesPage';
import AdminBlogCommentsPage from '@/pages/admin/blog/AdminBlogCommentsPage';
import AdminSystemPage from '@/pages/admin/AdminSystemPage';
import NotFound from '@/pages/NotFound';
import { useToast } from '@/hooks/use-toast';
import { useIsHydrating } from '@/hooks/useIsHydrating';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster } from '@/components/ui/toaster';
import CookieBanner from '@/components/CookieBanner';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

// Composant interne pour gérer la logique avec useLocation
function AppContent() {
  const { toast } = useToast();
  const location = useLocation();
  const isHydrating = useIsHydrating();
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    if (location.pathname === '/dashboard' || location.pathname === '/admin') {
      toast({
        title: 'Bienvenue !',
        description: 'Vous êtes connecté.',
      });
    }
  }, [location.pathname, toast]);

  const handleCookiePreferences = (preferences: CookiePreferences) => {
    setCookiePreferences(preferences);
    console.log('Préférences cookies mises à jour:', preferences);
  };

  if (isHydrating) {
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
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/pricing-optimized" element={<PricingOptimized />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
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
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
        <Route path="/dashboard/blog" element={<ProtectedRoute><DashboardBlog /></ProtectedRoute>} />
        <Route path="/dashboard/blog/:id" element={<ProtectedRoute><BlogPostView /></ProtectedRoute>} />
        <Route path="/dashboard/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
        <Route path="/dashboard/campaigns/email" element={<ProtectedRoute><EmailCampaigns /></ProtectedRoute>} />
        <Route path="/dashboard/campaigns/sms" element={<ProtectedRoute><SMSCampaigns /></ProtectedRoute>} />
        <Route path="/dashboard/campaigns/lead" element={<ProtectedRoute><LeadCampaigns /></ProtectedRoute>} />
        <Route path="/dashboard/campaigns/automation" element={<ProtectedRoute><AutomationCampaigns /></ProtectedRoute>} />
        <Route path="/dashboard/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/dashboard/analytics/website" element={<ProtectedRoute><WebsiteAnalytics /></ProtectedRoute>} />
        <Route path="/dashboard/analytics/social" element={<ProtectedRoute><SocialAnalytics /></ProtectedRoute>} />
        <Route path="/dashboard/analytics/growth" element={<ProtectedRoute><GrowthAnalytics /></ProtectedRoute>} />
        <Route path="/dashboard/analytics/community" element={<ProtectedRoute><CommunityAnalytics /></ProtectedRoute>} />
        <Route path="/dashboard/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/dashboard/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
        <Route path="/dashboard/help" element={<ProtectedRoute><DashboardHelp /></ProtectedRoute>} />
        <Route path="/dashboard/upgrade-plan" element={<ProtectedRoute><UpgradePlan /></ProtectedRoute>} />

        {/* Admin routes - protected with adminOnly */}
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsersPage /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute adminOnly><AdminAnalyticsPage /></ProtectedRoute>} />
        <Route path="/admin/analytics/overview" element={<ProtectedRoute adminOnly><AdminAnalyticsOverviewPage /></ProtectedRoute>} />
        <Route path="/admin/analytics/users" element={<ProtectedRoute adminOnly><AdminAnalyticsUsersPage /></ProtectedRoute>} />
        <Route path="/admin/analytics/revenue" element={<ProtectedRoute adminOnly><AdminAnalyticsRevenuePage /></ProtectedRoute>} />
        <Route path="/admin/analytics/performance" element={<ProtectedRoute adminOnly><AdminAnalyticsPerformancePage /></ProtectedRoute>} />
        <Route path="/admin/billing" element={<ProtectedRoute adminOnly><AdminBillingPage /></ProtectedRoute>} />
        <Route path="/admin/billing/subscriptions" element={<ProtectedRoute adminOnly><AdminBillingSubscriptionsPage /></ProtectedRoute>} />
        <Route path="/admin/billing/invoices" element={<ProtectedRoute adminOnly><AdminBillingInvoicesPage /></ProtectedRoute>} />
        <Route path="/admin/billing/payments" element={<ProtectedRoute adminOnly><AdminBillingPaymentsPage /></ProtectedRoute>} />
        <Route path="/admin/campaigns" element={<ProtectedRoute adminOnly><AdminCampaignsPage /></ProtectedRoute>} />
        <Route path="/admin/campaigns/email" element={<ProtectedRoute adminOnly><AdminCampaignsEmailPage /></ProtectedRoute>} />
        <Route path="/admin/campaigns/sms" element={<ProtectedRoute adminOnly><AdminCampaignsSMSPage /></ProtectedRoute>} />
        <Route path="/admin/campaigns/automation" element={<ProtectedRoute adminOnly><AdminCampaignsAutomationPage /></ProtectedRoute>} />
        <Route path="/admin/blog" element={<ProtectedRoute adminOnly><AdminBlogPage /></ProtectedRoute>} />
        <Route path="/admin/blog/create" element={<ProtectedRoute adminOnly><AdminBlogCreatePage /></ProtectedRoute>} />
        <Route path="/admin/blog/posts" element={<ProtectedRoute adminOnly><AdminBlogPostsPage /></ProtectedRoute>} />
        <Route path="/admin/blog/edit/:id" element={<ProtectedRoute adminOnly><AdminBlogEditPage /></ProtectedRoute>} />
        <Route path="/admin/blog/preview/:id" element={<ProtectedRoute adminOnly><AdminBlogPreviewPage /></ProtectedRoute>} />
        <Route path="/admin/blog/categories" element={<ProtectedRoute adminOnly><AdminBlogCategoriesPage /></ProtectedRoute>} />
        <Route path="/admin/blog/comments" element={<ProtectedRoute adminOnly><AdminBlogCommentsPage /></ProtectedRoute>} />
        <Route path="/admin/system" element={<ProtectedRoute adminOnly><AdminSystemPage /></ProtectedRoute>} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Bannière cookies globale */}
      <CookieBanner onPreferencesChange={handleCookiePreferences} />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
