"use client";

import { OnboardLayout } from "@/components/onboarding/OnboardLayout";
import OnboardingForm from "@/components/forms/OnboardingForm";
import { useSearchParams } from "next/navigation";

const OnboardingPage = () => {
    const searchParams = useSearchParams();
    const url = searchParams.get("url");

    return (
        <OnboardLayout>
            <OnboardingForm url={url || undefined} />
        </OnboardLayout>
    );
};

export default OnboardingPage;
