"use client";

import HeroSection from '@/components/hero/HeroSection';
import SocialProofSection from '@/components/social-proof/SocialProofSection';
import QuestionSection from '@/components/features/QuestionSection';
import DataVisualizationSection from '@/components/features/DataVisualizationSection';
import FeaturesSectionGeoLab from '@/components/features/FeaturesSectionGeoLab';
import FeaturesSectionAiGapAudit from '@/components/features/FeaturesSectionAiGapAudit';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import FaqSection from '@/components/faq/FaqSection';
import Footer from '@/components/layout/Footer';
import { BlogSection } from '@/components/blog';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <QuestionSection />
      <DataVisualizationSection />
      <FeaturesSectionAiGapAudit />
      <FeaturesSectionGeoLab />
      <TestimonialsSection />
      <BlogSection />
      <FaqSection />
      <Footer />
    </>
  );
}
