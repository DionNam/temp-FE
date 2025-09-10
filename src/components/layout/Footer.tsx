"use client";

import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer = React.memo(function Footer({ className }: FooterProps) {
  return (
    <footer className={`relative bg-gradient-to-b from-[#66afff00] to-[#0669ff00] pt-24 pb-24 px-0 overflow-hidden min-h-[400px] ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="text-[120px] sm:text-[180px] md:text-[220px] lg:text-[291px] font-semibold bg-gradient-to-b from-[#3395ff] to-[#0166ff] bg-clip-text text-transparent leading-none select-none pointer-events-none px-4 text-center"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          ShowOnAI
        </div>
      </div>
    </footer>
  );
});

export default Footer;
