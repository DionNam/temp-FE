"use client";

import React from "react";
import Link from "next/link";

interface FloatingActionButtonProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export function FloatingActionButton({
  href,
  label,
  icon,
}: FloatingActionButtonProps) {
  return (
    <div className="sticky top-4 right-0 z-50 float-right">
      <Link
        href={href}
        className="md:hidden w-14 h-14 bg-primary-blue-600 text-white rounded-full shadow-lg hover:bg-primary-blue-700 transition-all duration-200 flex items-center justify-center hover:scale-110"
        aria-label={label}
      >
        {icon}
      </Link>
    </div>
  );
}
