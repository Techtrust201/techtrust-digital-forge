
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
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPostView from "./pages/dashboard/blog/BlogPostView";
import Solutions from "./pages/Solutions";
import Help from "./pages/Help";
import LegalMentions from "./pages/LegalMentions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

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
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPostView />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/help" element={<Help />} />
              <Route path="/legal" element={<LegalMentions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
