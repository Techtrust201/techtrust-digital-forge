
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Solutions from "./pages/Solutions";
import AgenceWeb from "./pages/solutions/AgenceWeb";
import GrowthHacking from "./pages/solutions/GrowthHacking";
import SolutionsDigitales from "./pages/solutions/SolutionsDigitales";
import CommunityManagement from "./pages/solutions/CommunityManagement";
import ConsultingDigital from "./pages/solutions/ConsultingDigital";
import Pricing from "./pages/Pricing";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Help from "./pages/Help";
import LegalMentions from "./pages/LegalMentions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/dashboard/Analytics";
import Campaigns from "./pages/dashboard/Campaigns";
import Account from "./pages/dashboard/Account";
import DashboardHelp from "./pages/dashboard/Help";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminBlogPage from "./pages/admin/AdminBlogPage";
import AdminCampaignsPage from "./pages/admin/AdminCampaignsPage";
import AdminBillingPage from "./pages/admin/AdminBillingPage";
import AdminSystemPage from "./pages/admin/AdminSystemPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/agence-web" element={<AgenceWeb />} />
          <Route path="/solutions/growth-hacking" element={<GrowthHacking />} />
          <Route path="/solutions/digitales-sur-mesure" element={<SolutionsDigitales />} />
          <Route path="/solutions/community-management" element={<CommunityManagement />} />
          <Route path="/solutions/consulting-digital" element={<ConsultingDigital />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/help" element={<Help />} />
          <Route path="/legal-mentions" element={<LegalMentions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/signin" element={<Auth />} />
          
          {/* Routes Dashboard Client */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/analytics/website" element={<Analytics />} />
          <Route path="/dashboard/analytics/social" element={<Analytics />} />
          <Route path="/dashboard/analytics/growth" element={<Analytics />} />
          <Route path="/dashboard/analytics/community" element={<Analytics />} />
          <Route path="/dashboard/campaigns" element={<Campaigns />} />
          <Route path="/dashboard/campaigns/email" element={<Campaigns />} />
          <Route path="/dashboard/campaigns/sms" element={<Campaigns />} />
          <Route path="/dashboard/campaigns/leads" element={<Campaigns />} />
          <Route path="/dashboard/campaigns/automation" element={<Campaigns />} />
          <Route path="/dashboard/account" element={<Account />} />
          <Route path="/dashboard/account/profile" element={<Account />} />
          <Route path="/dashboard/account/plan" element={<Account />} />
          <Route path="/dashboard/account/billing" element={<Account />} />
          <Route path="/dashboard/account/security" element={<Account />} />
          <Route path="/dashboard/help" element={<DashboardHelp />} />
          <Route path="/dashboard/help/faq" element={<DashboardHelp />} />
          <Route path="/dashboard/help/support" element={<DashboardHelp />} />
          <Route path="/dashboard/help/tutorials" element={<DashboardHelp />} />
          
          {/* Routes Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/users/all" element={<AdminUsersPage />} />
          <Route path="/admin/users/new" element={<AdminUsersPage />} />
          <Route path="/admin/users/suspended" element={<AdminUsersPage />} />
          <Route path="/admin/users/create" element={<AdminUsersPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/analytics/overview" element={<AdminAnalyticsPage />} />
          <Route path="/admin/analytics/revenue" element={<AdminAnalyticsPage />} />
          <Route path="/admin/analytics/performance" element={<AdminAnalyticsPage />} />
          <Route path="/admin/analytics/users" element={<AdminAnalyticsPage />} />
          <Route path="/admin/blog" element={<AdminBlogPage />} />
          <Route path="/admin/blog/posts" element={<AdminBlogPage />} />
          <Route path="/admin/blog/create" element={<AdminBlogPage />} />
          <Route path="/admin/blog/categories" element={<AdminBlogPage />} />
          <Route path="/admin/blog/comments" element={<AdminBlogPage />} />
          <Route path="/admin/campaigns" element={<AdminCampaignsPage />} />
          <Route path="/admin/campaigns/email" element={<AdminCampaignsPage />} />
          <Route path="/admin/campaigns/sms" element={<AdminCampaignsPage />} />
          <Route path="/admin/campaigns/automation" element={<AdminCampaignsPage />} />
          <Route path="/admin/billing" element={<AdminBillingPage />} />
          <Route path="/admin/billing/invoices" element={<AdminBillingPage />} />
          <Route path="/admin/billing/payments" element={<AdminBillingPage />} />
          <Route path="/admin/billing/subscriptions" element={<AdminBillingPage />} />
          <Route path="/admin/system" element={<AdminSystemPage />} />
          <Route path="/admin/system/config" element={<AdminSystemPage />} />
          <Route path="/admin/system/logs" element={<AdminSystemPage />} />
          <Route path="/admin/system/backups" element={<AdminSystemPage />} />
          <Route path="/admin/system/security" element={<AdminSystemPage />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
