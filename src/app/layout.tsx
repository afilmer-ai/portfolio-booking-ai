import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://bookin-ai.com"),
  title: "Bookin-AI | AIOps, Green-Tech, Voice SEO",
  description:
    "Bookin-AI is the authority partner for AIOps automation, Green-Tech performance engineering, and Voice SEO systems that convert intent into pipeline.",
  applicationName: "Bookin-AI",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bookin-AI | AIOps, Green-Tech, Voice SEO",
    description:
      "Bookin-AI engineers autonomous revenue systems through AIOps, Green-Tech performance, and Voice SEO architecture.",
    url: "https://bookin-ai.com/",
    siteName: "Bookin-AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bookin-AI | AIOps, Green-Tech, Voice SEO",
    description:
      "Bookin-AI engineers autonomous revenue systems through AIOps, Green-Tech performance, and Voice SEO architecture.",
  },
};

const structuredDataJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://bookin-ai.com/#org",
      name: "Bookin-AI",
      url: "https://bookin-ai.com/",
      logo: "https://bookin-ai.com/assets/bookin-ai-logo.png",
      description:
        "Premier AIOps and performance consultancy focused on autonomous revenue growth, green-tech optimization, and voice SEO.",
      slogan: "We Don't Build Websites. We Build Autonomous Revenue Engines.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://bookin-ai.com/#website",
      url: "https://bookin-ai.com/",
      name: "Bookin-AI",
      publisher: { "@id": "https://bookin-ai.com/#org" },
      inLanguage: "en",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://bookin-ai.com/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://bookin-ai.com/#service",
      name: "Bookin-AI Consulting",
      url: "https://bookin-ai.com/",
      serviceType: ["AIOps Consulting", "Web Performance Optimization", "Voice SEO Strategy"],
      areaServed: "Worldwide",
      provider: { "@id": "https://bookin-ai.com/#org" },
    },
    {
      "@type": "WebPage",
      "@id": "https://bookin-ai.com/#webpage",
      url: "https://bookin-ai.com/",
      name: "Bookin-AI Autonomous Revenue Engines",
      isPartOf: { "@id": "https://bookin-ai.com/#website" },
      about: { "@id": "https://bookin-ai.com/#service" },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "#health-check h2", "#cta h2"],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://bookin-ai.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does Bookin-AI optimize first?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bookin-AI prioritizes core performance bottlenecks and lead-capture friction to produce measurable revenue gains quickly.",
          },
        },
        {
          "@type": "Question",
          name: "How does Bookin-AI support voice search?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bookin-AI implements conversational schema, semantic content modeling, and query intent mapping for voice-first discovery.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataJsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
