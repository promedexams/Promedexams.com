import type { Metadata } from "next";

import "./globals.css";

import { Branding } from "@/lib/branding";
import { DomainURL } from "@/lib/links";

export const metadata: Metadata = {
  metadataBase: new URL(DomainURL),
  title: Branding.Name,
  description: `The official website for ${Branding.Name}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-white overflow-x-clip">{children}</body>
    </html>
  );
}
