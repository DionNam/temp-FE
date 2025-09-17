"use client";

import HeroSection from '@/components/hero/HeroSection';
import SocialProofSection from '@/components/social-proof/SocialProofSection';
import FeaturesSection from '@/components/features/FeaturesSection';
import FeaturesSectionGeoLab from '@/components/features/FeaturesSectionGeoLab';
import FeaturesSectionAiGapAudit from '@/components/features/FeaturesSectionAiGapAudit';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import FaqSection from '@/components/faq/FaqSection';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <FeaturesSectionGeoLab />
      <FeaturesSectionAiGapAudit />
      <TestimonialsSection />
      {/* <BlogSection /> */}
      <FaqSection />
      <Footer />
    </>
  );
}
