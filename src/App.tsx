
import "./App.css";
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SEO from "./components/SEO";
import CookieBanner from "./components/CookieBanner";

// Lazy loading des composants pour optimiser les performances
const Index = lazy(() => import("./pages/Index"));
const Solutions = lazy(() => import("./pages/Solutions"));
const SolutionsDigitales = lazy(() => import("./pages/solutions/SolutionsDigitales"));
const AgenceWeb = lazy(() => import("./pages/solutions/AgenceWeb"));
const CommunityManagement = lazy(() => import("./pages/solutions/CommunityManagement"));
const ConsultingDigital = lazy(() => import("./pages/solutions/ConsultingDigital"));
const GrowthHacking = lazy(() => import("./pages/solutions/GrowthHacking"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PricingOptimized = lazy(() => import("./pages/PricingOptimized"));
const Contact = lazy(() => import("./pages/Contact"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./pages/blog/BlogPostPage"));
const Help = lazy(() => import("./pages/Help"));
const LegalMentions = lazy(() => import("./pages/LegalMentions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ActivateAccount = lazy(() => import("./pages/ActivateAccount"));
const Careers = lazy(() => import("./pages/Careers"));

// Dashboard pages
const Account = lazy(() => import("./pages/dashboard/Account"));
const Services = lazy(() => import("./pages/dashboard/Services"));
const Analytics = lazy(() => import("./pages/dashboard/Analytics"));
const WebsiteAnalytics = lazy(() => import("./pages/dashboard/analytics/WebsiteAnalytics"));
const SocialAnalytics = lazy(() => import("./pages/dashboard/analytics/SocialAnalytics"));
const CommunityAnalytics = lazy(() => import("./pages/dashboard/analytics/CommunityAnalytics"));
const GrowthAnalytics = lazy(() => import("./pages/dashboard/analytics/GrowthAnalytics"));
const Campaigns = lazy(() => import("./pages/dashboard/Campaigns"));
const DashboardBlog = lazy(() => import("./pages/dashboard/Blog"));
const BlogPostView = lazy(() => import("./pages/dashboard/blog/BlogPostView"));
const Support = lazy(() => import("./pages/dashboard/Support"));
const DashboardHelp = lazy(() => import("./pages/dashboard/Help"));
const UpgradePlan = lazy(() => import("./pages/dashboard/UpgradePlan"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminUsersPage = lazy(() => import("./pages/admin/AdminUsersPage"));
const AdminAnalyticsPage = lazy(() => import("./pages/admin/AdminAnalyticsPage"));
const AdminAnalyticsOverviewPage = lazy(() => import("./pages/admin/analytics/AdminAnalyticsOverviewPage"));
const AdminAnalyticsUsersPage = lazy(() => import("./pages/admin/analytics/AdminAnalyticsUsersPage"));
const AdminAnalyticsRevenuePage = lazy(() => import("./pages/admin/analytics/AdminAnalyticsRevenuePage"));
const AdminAnalyticsPerformancePage = lazy(() => import("./pages/admin/analytics/AdminAnalyticsPerformancePage"));
const AdminBillingPage = lazy(() => import("./pages/admin/AdminBillingPage"));
const AdminBillingSubscriptionsPage = lazy(() => import("./pages/admin/billing/AdminBillingSubscriptionsPage"));
const AdminBillingInvoicesPage = lazy(() => import("./pages/admin/billing/AdminBillingInvoicesPage"));
const AdminBillingPaymentsPage = lazy(() => import("./pages/admin/billing/AdminBillingPaymentsPage"));
const AdminSystemPage = lazy(() => import("./pages/admin/AdminSystemPage"));
const AdminBlogPage = lazy(() => import("./pages/admin/AdminBlogPage"));
const AdminBlogPostsPage = lazy(() => import("./pages/admin/blog/AdminBlogPostsPage"));
const AdminBlogCreatePage = lazy(() => import("./pages/admin/blog/AdminBlogCreatePage"));
const AdminBlogEditPage = lazy(() => import("./pages/admin/blog/AdminBlogEditPage"));
const AdminBlogPreviewPage = lazy(() => import("./pages/admin/blog/AdminBlogPreviewPage"));
const AdminBlogCategoriesPage = lazy(() => import("./pages/admin/blog/AdminBlogCategoriesPage"));
const AdminBlogCommentsPage = lazy(() => import("./pages/admin/blog/AdminBlogCommentsPage"));
const AdminCampaignsPage = lazy(() => import("./pages/admin/AdminCampaignsPage"));
const AdminCampaignsEmailPage = lazy(() => import("./pages/admin/campaigns/AdminCampaignsEmailPage"));
const AdminCampaignsSMSPage = lazy(() => import("./pages/admin/campaigns/AdminCampaignsSMSPage"));
const AdminCampaignsAutomationPage = lazy(() => import("./pages/admin/campaigns/AdminCampaignsAutomationPage"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <SEO />
        <div className="min-h-screen bg-background font-sans antialiased">
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
          </div>}>
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<Index />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/solutions/solutions-digitales" element={<SolutionsDigitales />} />
              <Route path="/solutions/agence-web" element={<AgenceWeb />} />
              <Route path="/solutions/community-management" element={<CommunityManagement />} />
              <Route path="/solutions/consulting-digital" element={<ConsultingDigital />} />
              <Route path="/solutions/growth-hacking" element={<GrowthHacking />} />
              <Route path="/tarifs" element={<Pricing />} />
              <Route path="/pricing-optimized" element={<PricingOptimized />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/aide" element={<Help />} />
              <Route path="/mentions-legales" element={<LegalMentions />} />
              <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
              <Route path="/conditions-utilisation" element={<Terms />} />
              <Route path="/activate-account" element={<ActivateAccount />} />
              <Route path="/carrieres" element={<Careers />} />

              {/* Routes du dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/account" element={<Account />} />
              <Route path="/dashboard/services" element={<Services />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
              <Route path="/dashboard/analytics/website" element={<WebsiteAnalytics />} />
              <Route path="/dashboard/analytics/social" element={<SocialAnalytics />} />
              <Route path="/dashboard/analytics/community" element={<CommunityAnalytics />} />
              <Route path="/dashboard/analytics/growth" element={<GrowthAnalytics />} />
              <Route path="/dashboard/campaigns" element={<Campaigns />} />
              <Route path="/dashboard/campaigns/email" element={<Campaigns />} />
              <Route path="/dashboard/campaigns/sms" element={<Campaigns />} />
              <Route path="/dashboard/campaigns/leads" element={<Campaigns />} />
              <Route path="/dashboard/campaigns/automation" element={<Campaigns />} />
              <Route path="/dashboard/campaigns/content" element={<Campaigns />} />
              <Route path="/dashboard/blog" element={<DashboardBlog />} />
              <Route path="/dashboard/blog/:id" element={<BlogPostView />} />
              <Route path="/dashboard/support" element={<Support />} />
              <Route path="/dashboard/help" element={<DashboardHelp />} />
              <Route path="/dashboard/upgrade" element={<UpgradePlan />} />

              {/* Routes admin */}
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
              <Route path="/admin/system" element={<AdminSystemPage />} />
              <Route path="/admin/blog" element={<AdminBlogPage />} />
              <Route path="/admin/blog/posts" element={<AdminBlogPostsPage />} />
              <Route path="/admin/blog/create" element={<AdminBlogCreatePage />} />
              <Route path="/admin/blog/edit/:id" element={<AdminBlogEditPage />} />
              <Route path="/admin/blog/preview/:id" element={<AdminBlogPreviewPage />} />
              <Route path="/admin/blog/categories" element={<AdminBlogCategoriesPage />} />
              <Route path="/admin/blog/comments" element={<AdminBlogCommentsPage />} />
              <Route path="/admin/campaigns" element={<AdminCampaignsPage />} />
              <Route path="/admin/campaigns/email" element={<AdminCampaignsEmailPage />} />
              <Route path="/admin/campaigns/sms" element={<AdminCampaignsSMSPage />} />
              <Route path="/admin/campaigns/automation" element={<AdminCampaignsAutomationPage />} />

              {/* Page 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster />
          <CookieBanner />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
