"use client";

import { HeroSection } from '@/components/hero';
import { SocialProofSection } from '@/components/social-proof';
import { FeaturesSection, FeaturesSectionGeoLab, FeaturesSectionAiGapAudit } from '@/components/features';
import { FaqSection } from '@/components/faq';
import { BlogSection } from '@/components/blog';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <FeaturesSectionGeoLab />
      <FeaturesSectionAiGapAudit />
      <FaqSection />
      <BlogSection />
      <Footer />
    </>
  );
}
