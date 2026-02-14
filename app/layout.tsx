import type { Metadata } from "next";

import "./globals.css";

import BackToTopButton from "@/components/back-to-top-button";
import { StructuredData } from "@/components/structured-data";
import { BusinessInfo } from "@/lib/business-info";
import { DOMAIN_URL } from "@/lib/links";

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_URL),
  title: `${BusinessInfo.Name} - Medical Exams in Littleton, CO`,
  description:
    "Professional medical examination services in Littleton, Colorado. Immigration medical exams (I-693), DOT physicals, FAA medical exams, and school/sports physicals. USCIS-approved civil surgeon. Call (303) 798-1210 to schedule.",
  keywords: [
    "immigration medical exam",
    "I-693",
    "DOT physical",
    "FAA medical exam",
    "school physical",
    "sports physical",
    "Littleton CO",
    "civil surgeon",
    "medical exams Colorado",
  ],
  icons: {
    icon: [
      {
        url: BusinessInfo.Logos.GlobeIcon,
        href: BusinessInfo.Logos.GlobeIcon,
      },
    ],
  },
  openGraph: {
    type: "website",
    url: DOMAIN_URL,
    siteName: BusinessInfo.Name,
    title: `${BusinessInfo.Name} - Medical Exams in Littleton, CO`,
    description:
      "Professional medical examination services in Littleton, Colorado. Immigration medical exams (I-693), DOT physicals, FAA medical exams, and school/sports physicals.",
    locale: "en_US",
    images: [
      {
        url: BusinessInfo.SocialPreviewImage,
        alt: `${BusinessInfo.Name} - Professional medical examination services in Littleton, Colorado`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BusinessInfo.Name} - Medical Exams in Littleton, CO`,
    description:
      "Professional medical examination services in Littleton, Colorado. Immigration medical exams (I-693), DOT physicals, FAA medical exams, and school/sports physicals.",
    images: [
      {
        url: BusinessInfo.SocialPreviewImage,
        alt: `${BusinessInfo.Name} - Professional medical examination services in Littleton, Colorado`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body id="top" className="overflow-x-clip bg-[#07001c]">
        {children}
        <BackToTopButton />
      </body>
    </html>
  );
}
