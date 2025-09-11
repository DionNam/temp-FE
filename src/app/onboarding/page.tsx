'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import OnboardingForm from '@/components/onboarding/OnboardingForm';
import Footer from '@/components/layout/Footer';

function OnboardingContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <div className="min-h-screen flex flex-col">
      <OnboardingForm initialEmail={email} />
      <Footer />
    </div>
  );
}

const OnboardingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingContent />
    </Suspense>
  );
};

export default OnboardingPage;
