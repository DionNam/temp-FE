"use client";

import { HeroSection } from '@/components/hero';
import { SocialProofSection } from '@/components/social-proof';
import { FeaturesSection } from '@/components/features';
import { FeaturesSectionGeoLab } from '@/components/features';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <FeaturesSectionGeoLab />
    </>
  );
}
