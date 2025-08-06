import type { Metadata } from "next";

import "./globals.css";

import BackToTopButton from "@/components/back-to-top-button";
import { BusinessInfo } from "@/lib/business-info";
import { DOMAIN_URL } from "@/lib/links";

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_URL),
  title: BusinessInfo.Name,
  description: `The official website for ${BusinessInfo.Name}.`,
  icons: {
    icon: [
      {
        url: BusinessInfo.Logos.GlobeIcon,
        href: BusinessInfo.Logos.GlobeIcon,
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
      <head />
      <body id="top" className="overflow-x-clip bg-[#07001c]">
        {children}
        <BackToTopButton />
      </body>
    </html>
  );
}
