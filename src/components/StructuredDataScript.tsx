'use client';

import { useEffect, useState } from 'react';

interface StructuredDataScriptProps {
  data: object;
  nonce?: string;
}

export function StructuredDataScript({ data, nonce }: StructuredDataScriptProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
