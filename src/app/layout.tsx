import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://showonai.com'),
  title: {
    default: "ShowOnAI - AI Search Optimization for Maximum Brand Visibility | GEO & SEO Expert",
    template: "%s | ShowOnAI",
  },
  description: "Maximize your brand exposure in generative AI platforms like ChatGPT, Gemini, and Perplexity. Achieve top rankings in AI search results with GEO (Generative Engine Optimization) strategy and expand customer touchpoints.",
  keywords: [
    "GEO", "Generative Engine Optimization", "AI search optimization", "ChatGPT optimization", 
    "Gemini search", "Perplexity optimization", "generative AI SEO", "brand visibility", 
    "AI marketing", "content optimization", "digital marketing", "search engine optimization", 
    "SEO", "marketing", "AI search strategy", "artificial intelligence", "machine learning SEO",
    "AI content marketing", "generative AI marketing", "AI brand optimization", "digital presence",
    "online visibility", "search marketing", "AI powered SEO", "intelligent search optimization",
    "AI search engine marketing", "automated SEO", "smart content optimization"
  ],
  authors: [{ name: "ShowOnAI", url: "https://showonai.com" }],
  creator: "ShowOnAI",
  publisher: "ShowOnAI",
  applicationName: "ShowOnAI",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://showonai.com",
    languages: {
      'en-US': 'https://showonai.com',
      'x-default': 'https://showonai.com',
    },
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      "naver-site-verification": "your-naver-verification-code",
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  category: "Technology",
  classification: "Business Software",
  
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ko_KR"],
    url: "https://showonai.com",
    siteName: "ShowOnAI",
    title: "ShowOnAI - AI Search Optimization for Maximum Brand Visibility",
    description: "Maximize your brand exposure in generative AI platforms like ChatGPT, Gemini, and Perplexity. Achieve top rankings in AI search results with GEO strategy and expand customer touchpoints.",
    images: [
      {
        url: "https://showonai.com/og-image-main.jpg",
        width: 1200,
        height: 630,
        alt: "ShowOnAI - AI Search Optimization Solution for Maximum Brand Visibility",
        type: "image/jpeg",
      },
      {
        url: "https://showonai.com/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "ShowOnAI - GEO and AI Search Optimization Expert",
        type: "image/jpeg",
      },
    ],
    videos: [
      {
        url: "https://showonai.com/intro-video.mp4",
        width: 1280,
        height: 720,
        type: "video/mp4",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@showonai",
    creator: "@showonai",
    title: "ShowOnAI - AI Search Optimization for Maximum Brand Visibility",
    description: "Maximize your brand exposure in generative AI platforms like ChatGPT, Gemini, and Perplexity. Achieve top rankings in AI search results with GEO strategy.",
    images: {
      url: "https://showonai.com/og-image-main.jpg",
      alt: "ShowOnAI - AI Search Optimization Solution",
    },
  },

  appleWebApp: {
    capable: true,
    title: "ShowOnAI",
    statusBarStyle: "default",
    startupImage: [
      "/apple-touch-startup-image-768x1004.png",
      {
        url: "/apple-touch-startup-image-1536x2008.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },

  formatDetection: {
    telephone: false,
  },
  
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-touch-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-touch-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-touch-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-touch-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-touch-icon-180x180.png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#2353DF",
      },
    ],
  },

  manifest: "/site.webmanifest",

  other: {
    "google-site-verification": "your-verification-code",
    "naver-site-verification": "your-naver-verification",
    "msvalidate.01": "your-bing-verification",
    "facebook-domain-verification": "your-facebook-verification",
    "p:domain_verify": "your-pinterest-verification",
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
      description: "A specialized generative AI search optimization (GEO) company that provides solutions to maximize brand visibility in ChatGPT, Gemini, Perplexity, and other AI platforms.",
      foundingDate: "2024",
      founders: [{
        "@type": "Person",
        name: "ShowOnAI Team"
      }],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["English", "Korean"]
      },
      sameAs: [
        "https://blog.showonai.com",
        "https://linkedin.com/company/showonai",
        "https://twitter.com/showonai",
        "https://github.com/showonai"
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
        addressLocality: "San Francisco",
        addressRegion: "CA"
      },
      telephone: "+1-800-SHOWONAI",
      email: "contact@showonai.com"
    },
    {
      "@type": "WebSite",
      "@id": "https://showonai.com/#website", 
      url: "https://showonai.com",
      name: "ShowOnAI",
      description: "Generative AI Search Optimization (GEO) Solution",
      publisher: {
        "@id": "https://showonai.com/#organization",
      },
      inLanguage: "en-US",
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
      name: "ShowOnAI - AI Search Optimization for Maximum Brand Visibility",
      isPartOf: {
        "@id": "https://showonai.com/#website"
      },
      about: {
        "@id": "https://showonai.com/#organization"
      },
      description: "Maximize your brand exposure in generative AI platforms like ChatGPT, Gemini, and Perplexity. Achieve top rankings in AI search results with GEO strategy and expand customer touchpoints.",
      inLanguage: "en-US",
      datePublished: "2024-01-01",
      dateModified: new Date().toISOString(),
    },
    {
      "@type": "Service",
      name: "GEO Optimization Service",
      description: "Generative AI search optimization service that improves brand visibility in ChatGPT, Gemini, Perplexity, and other AI platforms.",
      provider: {
        "@id": "https://showonai.com/#organization",
      },
      areaServed: [
        {
          "@type": "Country",
          name: "South Korea"
        },
        {
          "@type": "Country", 
          name: "United States"
        }
      ],
      serviceType: "SEO and GEO Optimization",
      category: "Digital Marketing",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "ShowOnAI Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Search Audit",
              description: "Comprehensive analysis of your current AI search visibility"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service", 
              name: "GEO Strategy Development",
              description: "Custom generative engine optimization strategy for your brand"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Content Optimization",
              description: "AI-focused content optimization for maximum visibility"
            }
          }
        ]
      },
      audience: {
        "@type": "BusinessAudience",
        name: "Global Businesses"
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
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is GEO (Generative Engine Optimization)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GEO (Generative Engine Optimization) is the practice of optimizing content to appear prominently in AI-powered search platforms like ChatGPT, Gemini, and Perplexity. It focuses on making your brand visible in generative AI responses."
          }
        },
        {
          "@type": "Question",
          name: "How does ShowOnAI improve AI search visibility?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ShowOnAI uses advanced SEO and GEO techniques to optimize your content for AI platforms. We analyze AI search patterns, optimize content structure, and implement strategies that increase your brand's chances of being mentioned in AI responses."
          }
        },
        {
          "@type": "Question",
          name: "What AI platforms does ShowOnAI optimize for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ShowOnAI optimizes for major AI platforms including ChatGPT, Google Gemini, Perplexity AI, Claude, and other generative AI search engines that are becoming increasingly important for brand discovery."
          }
        },
        {
          "@type": "Question",
          name: "How long does it take to see results from GEO optimization?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GEO optimization results typically begin showing within 2-4 weeks, with significant improvements in AI search visibility usually achieved within 2-3 months of consistent optimization efforts."
          }
        }
      ]
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Maximize your brand exposure in generative AI platforms like ChatGPT, Gemini, and Perplexity. Achieve top rankings in AI search results with GEO strategy and expand customer touchpoints. Start with free AI visibility audit." />
        <meta name="keywords" content="GEO, SEO, AI search optimization, brand optimization, ChatGPT optimization, generative AI, search engine optimization, AI visibility, Perplexity AI, Gemini AI" />
        
        {/* Enhanced SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
        <meta name="bingbot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
        
        {/* Geo Targeting */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="San Francisco" />
        <meta name="geo.position" content="37.7749;-122.4194" />
        <meta name="ICBM" content="37.7749, -122.4194" />
        
        {/* Business Info */}
        <meta name="business.name" content="ShowOnAI" />
        <meta name="business.type" content="Digital Marketing Agency" />
        <meta name="business.hours" content="Mo-Fr 09:00-18:00" />
        
        {/* Content Classification */}
        <meta name="classification" content="Business Software" />
        <meta name="category" content="Technology" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#2353DF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Canonical and Alternate Links */}
        <link rel="canonical" href="https://showonai.com" />
        <link rel="alternate" hrefLang="en" href="https://showonai.com" />
        <link rel="alternate" hrefLang="x-default" href="https://showonai.com" />
        
        {/* Preload Critical Resources */}
        <link rel="preload" href="/brand-sov.webp" as="image" />
        <link rel="preload" href="/showonai-logo.png" as="image" />
        
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        <meta name="apple-mobile-web-app-title" content="ShowOnAI" />
        <meta name="application-name" content="ShowOnAI" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${manrope.variable} antialiased`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}