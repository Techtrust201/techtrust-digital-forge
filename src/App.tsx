import { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import CookieBanner from "@/components/CookieBanner";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPostView from "./pages/dashboard/blog/BlogPostView";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminBlogPostsPage from "./pages/admin/blog/AdminBlogPostsPage";
import AdminBlogPostCreatePage from "./pages/admin/blog/AdminBlogPostCreatePage";
import AdminBlogPostEditPage from "./pages/admin/blog/AdminBlogPostEditPage";
import AdminBlogPostPreviewPage from "./pages/admin/blog/AdminBlogPostPreviewPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

const queryClient = new QueryClient();

const App = () => {
  const { trackPageView, isInitialized, cookiesAccepted } = useVisitorTracking();

  // Tracker les changements de page
  useEffect(() => {
    if (isInitialized && cookiesAccepted) {
      trackPageView(window.location.pathname);
    }
  }, [window.location.pathname, isInitialized, cookiesAccepted, trackPageView]);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CookieBanner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPostView />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/users/create" element={<AdminUsersPage />} />
              <Route path="/admin/blog" element={<AdminBlogPostsPage />} />
              <Route path="/admin/blog/create" element={<AdminBlogPostCreatePage />} />
              <Route path="/admin/blog/edit/:id" element={<AdminBlogPostEditPage />} />
              <Route path="/admin/blog/preview/:id" element={<AdminBlogPostPreviewPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
