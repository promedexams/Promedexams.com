import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Cookies from "js-cookie";
import Negotiator from "negotiator";

import { SiteSettings } from "./lib/site-settings";

const locales = SiteSettings.SupportedLocales;
const defaultLocale = SiteSettings.DefaultLocale;

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // Check for locale in cookies first
  const cookieLocale = Cookies.get("SITE_LOCALE");
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip locale prefix for static assets in public/
  const staticAssetPrefixes = [
    "/_next/",
    "/robots.txt",
    "/sitemap.xml",
    "/headshots/",
    "/videos/",
    "/images/",
    "/branding/",
    "/fonts/",
    "/legal-documents/",
    "/icons/",
  ];
  if (staticAssetPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return;
  }

  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(request.nextUrl);

  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
  ],
};
