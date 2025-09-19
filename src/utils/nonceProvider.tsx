"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface NonceContextType {
  nonce: string | null;
}

const NonceContext = createContext<NonceContextType>({ nonce: null });

export function NonceProvider({ children, nonce }: { children: React.ReactNode; nonce?: string }) {
  // Initialize with the nonce passed from server, or null if not available
  const [nonceState, setNonceState] = useState<string | null>(nonce || null);

  useEffect(() => {
    // Only try to get nonce from meta tag if we don't have one from server
    if (!nonceState && typeof window !== 'undefined') {
      const metaNonce = document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content');
      if (metaNonce) {
        setNonceState(metaNonce);
      }
    }
  }, [nonceState]);

  return (
    <NonceContext.Provider value={{ nonce: nonceState }}>
      {children}
    </NonceContext.Provider>
  );
}

export function useNonce() {
  const context = useContext(NonceContext);
  return context.nonce;
}
