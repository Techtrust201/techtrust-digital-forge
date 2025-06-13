
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PartnersSection from "@/components/landing/PartnersSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import StatsSection from "@/components/landing/StatsSection";
import CTASection from "@/components/landing/CTASection";
import BlogPreviewSection from "@/components/landing/BlogPreviewSection";
import NavbarPublic from "@/components/NavbarPublic";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header role="banner">
        <NavbarPublic />
      </header>

      <main role="main">
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <PartnersSection />
        <StatsSection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
