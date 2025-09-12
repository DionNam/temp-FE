import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { getNonce } from "@/utils/nonce";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "ShowOnAI - 국내 AI 검색 최적화 솔루션 | GEO & SEO 전문",
    template: "%s | ShowOnAI",
  },
  description: "국내 시장의 AI 검색 최적화를 위한 단 하나의 솔루션. ChatGPT, Gemini에서 브랜드 노출을 극대화하는 GEO 전략과 SEO 컨설팅을 제공합니다. 무료 SEO 진단으로 시작하세요.",
  keywords: ["GEO", "SEO", "AI 검색 최적화", "브랜드 최적화", "ChatGPT 최적화", "생성형 AI", "검색엔진최적화", "국내 SEO"],
  authors: [{ name: "ShowOnAI" }],
  creator: "ShowOnAI",
  publisher: "ShowOnAI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://showonai.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Technology",
  
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://showonai.com",
    siteName: "ShowOnAI",
    title: "ShowOnAI - 국내 AI 검색 최적화 솔루션",
    description: "국내 시장의 AI 검색 최적화를 위한 단 하나의 솔루션. ChatGPT, Gemini에서 브랜드 노출을 극대화하는 GEO 전략과 SEO 컨설팅을 제공합니다. 무료 SEO 진단으로 시작하세요.",
    images: [
      {
        url: "https://showonai.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "ShowOnAI - AI 검색 최적화 솔루션",
        type: "image/webp",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@showonai",
    creator: "@showonai",
    title: "ShowOnAI - 국내 AI 검색 최적화 솔루션",
    description: "국내 시장의 AI 검색 최적화를 위한 단 하나의 솔루션. ChatGPT, Gemini에서 브랜드 노출을 극대화하는 GEO 전략과 SEO 컨설팅을 제공합니다.",
    images: ["https://showonai.com/og-image.webp"],
  },

  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL("https://showonai.com"),
  
  other: {
    "google-site-verification": "your-verification-code",
    "naver-site-verification": "your-naver-verification",
    "msvalidate.01": "your-bing-verification",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://showonai.com/#organization",
      name: "ShowOnAI",
      legalName: "ShowOnAI Inc.",
      url: "https://showonai.com",
      logo: {
        "@type": "ImageObject",
        url: "https://showonai.com/showonai-logo.png",
        width: 176,
        height: 48,
      },
      description: "국내 시장의 AI 검색 최적화를 위한 솔루션",
      foundingDate: "2024",
      founders: [{
        "@type": "Person",
        name: "ShowOnAI Team"
      }],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["Korean", "English"]
      },
      sameAs: [
        "https://blog.showonai.com",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://showonai.com/#website", 
      url: "https://showonai.com",
      name: "ShowOnAI",
      description: "국내 AI 검색 최적화 솔루션",
      publisher: {
        "@id": "https://showonai.com/#organization",
      },
      inLanguage: "ko-KR",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://showonai.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://showonai.com/#webpage",
      url: "https://showonai.com",
      name: "ShowOnAI - 국내 AI 검색 최적화 솔루션",
      isPartOf: {
        "@id": "https://showonai.com/#website"
      },
      about: {
        "@id": "https://showonai.com/#organization"
      },
      description: "국내 시장의 AI 검색 최적화를 위한 단 하나의 솔루션. GEO와 SEO 전문 컨설팅",
      inLanguage: "ko-KR",
      datePublished: "2024-01-01",
      dateModified: new Date().toISOString(),
    },
    {
      "@type": "Service",
      name: "GEO 최적화 서비스",
      description: "생성형 AI 검색 최적화 서비스",
      provider: {
        "@id": "https://showonai.com/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "South Korea"
      },
      serviceType: "SEO and GEO Optimization",
      audience: {
        "@type": "BusinessAudience",
        name: "Korean Businesses"
      },
      offers: [
        {
          "@type": "Offer",
          name: "Lite Plan",
          price: "99",
          priceCurrency: "USD",
          description: "Basic GEO optimization package",
          availability: "https://schema.org/InStock",
          validFrom: "2024-01-01",
          priceValidUntil: "2025-12-31",
        },
        {
          "@type": "Offer", 
          name: "Growth Plan",
          price: "199",
          priceCurrency: "USD",
          description: "Advanced GEO optimization with analytics",
          availability: "https://schema.org/InStock",
          validFrom: "2024-01-01",
          priceValidUntil: "2025-12-31",
        },
        {
          "@type": "Offer",
          name: "Enterprise Plan", 
          price: "299",
          priceCurrency: "USD",
          description: "Complete SEO and GEO solution with priority support",
          availability: "https://schema.org/InStock",
          validFrom: "2024-01-01",
          priceValidUntil: "2025-12-31",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://showonai.com"
        }
      ]
    }
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = await getNonce();
  
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        <meta name="description" content="국내 시장의 AI 검색 최적화를 위한 단 하나의 솔루션. ChatGPT, Gemini에서 브랜드 노출을 극대화하는 GEO 전략과 SEO 컨설팅을 제공합니다. 무료 SEO 진단으로 시작하세요." />
        <meta name="keywords" content="GEO, SEO, AI 검색 최적화, 브랜드 최적화, ChatGPT 최적화, 생성형 AI, 검색엔진최적화, 국내 SEO" />
        
        <meta httpEquiv="Content-Language" content="ko" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#2353DF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        <meta name="apple-mobile-web-app-title" content="ShowOnAI" />
        <meta name="application-name" content="ShowOnAI" />
      </head>
      <body className={`${manrope.variable} antialiased`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}