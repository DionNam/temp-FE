"use client";

import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer = React.memo(function Footer({ className }: FooterProps) {
  return (
    <footer className={`relative bg-gradient-to-b from-[#66afff00] to-[#0669ff00] pt-16 pb-12 px-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="text-[291px] font-semibold bg-gradient-to-b from-[#3395ff] to-[#0166ff] bg-clip-text text-transparent leading-none select-none pointer-events-none"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          ShowOnAI
        </div>
      </div>
    </footer>
  );
});

export default Footer;
