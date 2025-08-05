import type React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface OnboardCardProps {
    children: React.ReactNode;
    title: React.ReactNode;
    subtitle: string;
}

export function OnboardCard({ children, title, subtitle }: OnboardCardProps) {
    return (
        <Card className="w-full max-w-2xl mx-auto md:py-12 py-9 md:px-9 px-6 bg-white backdrop-blur-sm border-0 rounded-3xl shadow-xl">
            <CardHeader className="text-start space-y-4 md:pb-6 pb-1 px-0">
                <div className="md:size-16 size-12 bg-primary-blue-100 rounded-2xl flex items-center justify-center">
                    <Image
                        width={24}
                        height={24}
                        className="md:w-9 md:h-9 w-6 h-6"
                        src="/onboarding.svg"
                        alt="Onboarding"
                    />
                </div>

                <div className="space-y-2">
                    <h1 className="md:text-4xl text-2xl font-bold text-neutral-900">
                        {title}
                    </h1>
                    <p className="text-neutral-400 md:text-2xl text-lg leading-relaxed">
                        {subtitle}
                    </p>
                </div>
            </CardHeader>

            <CardContent className="space-y-6 px-0">{children}</CardContent>
        </Card>
    );
}
