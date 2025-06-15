import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { QueryClient as TanStackQueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import Solutions from './pages/Solutions';
import AgenceWeb from './pages/solutions/AgenceWeb';
import GrowthHacking from './pages/solutions/GrowthHacking';
import CommunityManagement from './pages/solutions/CommunityManagement';
import ConsultingDigital from './pages/solutions/ConsultingDigital';
import SolutionsDigitales from './pages/solutions/SolutionsDigitales';
import Pricing from './pages/Pricing';
import PricingOptimized from './pages/PricingOptimized';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Auth from './pages/Auth';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LegalMentions from './pages/LegalMentions';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/dashboard/Analytics';
import WebsiteAnalytics from './pages/dashboard/analytics/WebsiteAnalytics';
import SocialAnalytics from './pages/dashboard/analytics/SocialAnalytics';
import GrowthAnalytics from './pages/dashboard/analytics/GrowthAnalytics';
import CommunityAnalytics from './pages/dashboard/analytics/CommunityAnalytics';
import Campaigns from './pages/dashboard/Campaigns';
import EmailCampaigns from './pages/dashboard/campaigns/EmailCampaigns';
import SMSCampaigns from './pages/dashboard/campaigns/SMSCampaigns';
import LeadCampaigns from './pages/dashboard/campaigns/LeadCampaigns';
import AutomationCampaigns from './pages/dashboard/campaigns/AutomationCampaigns';
import Services from './pages/dashboard/Services';
import Account from './pages/dashboard/Account';
import Support from './pages/dashboard/Support';
import DashboardHelp from './pages/dashboard/Help';
import UpgradePlan from './pages/dashboard/UpgradePlan';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminAnalyticsOverviewPage from './pages/admin/analytics/AdminAnalyticsOverviewPage';
import AdminAnalyticsRevenuePage from './pages/admin/analytics/AdminAnalyticsRevenuePage';
import AdminAnalyticsPerformancePage from './pages/admin/analytics/AdminAnalyticsPerformancePage';
import AdminAnalyticsUsersPage from './pages/admin/analytics/AdminAnalyticsUsersPage';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminBlogPostsPage from './pages/admin/blog/AdminBlogPostsPage';
import AdminBlogCreatePage from './pages/admin/blog/AdminBlogCreatePage';
import AdminBlogCategoriesPage from './pages/admin/blog/AdminBlogCategoriesPage';
import AdminBlogCommentsPage from './pages/admin/blog/AdminBlogCommentsPage';
import AdminCampaignsPage from './pages/admin/AdminCampaignsPage';
import AdminCampaignsEmailPage from './pages/admin/campaigns/AdminCampaignsEmailPage';
import AdminCampaignsSMSPage from './pages/admin/campaigns/AdminCampaignsSMSPage';
import AdminCampaignsAutomationPage from './pages/admin/campaigns/AdminCampaignsAutomationPage';
import AdminBillingPage from './pages/admin/AdminBillingPage';
import AdminBillingInvoicesPage from './pages/admin/billing/AdminBillingInvoicesPage';
import AdminBillingPaymentsPage from './pages/admin/billing/AdminBillingPaymentsPage';
import AdminBillingSubscriptionsPage from './pages/admin/billing/AdminBillingSubscriptionsPage';
import AdminSystemPage from './pages/admin/AdminSystemPage';
import NotFound from './pages/NotFound';
import './App.css';

const queryClient = new TanStackQueryClient();

const QueryClient = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

function App() {
  return (
    <QueryClient>
      <Router>
        <Helmet>
          <title>Techtrust - Solutions Digitales Innovantes</title>
          <meta name="description" content="Propulsez votre entreprise avec nos solutions digitales : développement web, growth hacking, community management et consulting personnalisé." />
        </Helmet>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Index />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/agence-web" element={<AgenceWeb />} />
          <Route path="/solutions/growth-hacking" element={<GrowthHacking />} />
          <Route path="/solutions/community-management" element={<CommunityManagement />} />
          <Route path="/solutions/consulting-digital" element={<ConsultingDigital />} />
          <Route path="/solutions/solutions-digitales" element={<SolutionsDigitales />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/pricing-optimized" element={<PricingOptimized />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/legal" element={<LegalMentions />} />

          {/* Routes dashboard client */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/analytics/website" element={<WebsiteAnalytics />} />
          <Route path="/dashboard/analytics/social" element={<SocialAnalytics />} />
          <Route path="/dashboard/analytics/growth" element={<GrowthAnalytics />} />
          <Route path="/dashboard/analytics/community" element={<CommunityAnalytics />} />
          <Route path="/dashboard/campaigns" element={<Campaigns />} />
          <Route path="/dashboard/campaigns/email" element={<EmailCampaigns />} />
          <Route path="/dashboard/campaigns/sms" element={<SMSCampaigns />} />
          <Route path="/dashboard/campaigns/lead" element={<LeadCampaigns />} />
          <Route path="/dashboard/campaigns/automation" element={<AutomationCampaigns />} />
          <Route path="/dashboard/services" element={<Services />} />
          <Route path="/dashboard/account" element={<Account />} />
          <Route path="/dashboard/support" element={<Support />} />
          <Route path="/dashboard/help" element={<DashboardHelp />} />
          <Route path="/dashboard/upgrade" element={<UpgradePlan />} />

          {/* Routes admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/users/all" element={<AdminUsersPage />} />
          <Route path="/admin/users/new" element={<AdminUsersPage />} />
          <Route path="/admin/users/suspended" element={<AdminUsersPage />} />
          <Route path="/admin/users/create" element={<AdminUsersPage />} />
          
          {/* Routes analytics admin */}
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/analytics/overview" element={<AdminAnalyticsOverviewPage />} />
          <Route path="/admin/analytics/revenue" element={<AdminAnalyticsRevenuePage />} />
          <Route path="/admin/analytics/performance" element={<AdminAnalyticsPerformancePage />} />
          <Route path="/admin/analytics/users" element={<AdminAnalyticsUsersPage />} />
          
          {/* Routes blog admin */}
          <Route path="/admin/blog" element={<AdminBlogPage />} />
          <Route path="/admin/blog/posts" element={<AdminBlogPostsPage />} />
          <Route path="/admin/blog/create" element={<AdminBlogCreatePage />} />
          <Route path="/admin/blog/categories" element={<AdminBlogCategoriesPage />} />
          <Route path="/admin/blog/comments" element={<AdminBlogCommentsPage />} />
          
          {/* Routes campagnes admin */}
          <Route path="/admin/campaigns" element={<AdminCampaignsPage />} />
          <Route path="/admin/campaigns/email" element={<AdminCampaignsEmailPage />} />
          <Route path="/admin/campaigns/sms" element={<AdminCampaignsSMSPage />} />
          <Route path="/admin/campaigns/automation" element={<AdminCampaignsAutomationPage />} />
          
          {/* Routes facturation admin */}
          <Route path="/admin/billing" element={<AdminBillingPage />} />
          <Route path="/admin/billing/invoices" element={<AdminBillingInvoicesPage />} />
          <Route path="/admin/billing/payments" element={<AdminBillingPaymentsPage />} />
          <Route path="/admin/billing/subscriptions" element={<AdminBillingSubscriptionsPage />} />
          
          {/* Route système admin */}
          <Route path="/admin/system" element={<AdminSystemPage />} />
          <Route path="/admin/system/config" element={<AdminSystemPage />} />
          <Route path="/admin/system/logs" element={<AdminSystemPage />} />
          <Route path="/admin/system/backups" element={<AdminSystemPage />} />
          <Route path="/admin/system/security" element={<AdminSystemPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClient>
  );
}

export default App;
