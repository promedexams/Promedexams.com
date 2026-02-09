import type { MetadataRoute } from "next";

import { DOMAIN_URL } from "@/lib/links";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = ["en", "es"];

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    {
      path: "/services/immigration-medical-exams",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/services/dot-physicals",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/services/faa-physicals",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/services/school-sports-camp-physicals",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    { path: "/team", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    {
      path: "/schedule-appointment",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
  ];

  // sitemap entries for each language
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const lang of languages) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${DOMAIN_URL}/${lang}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  return sitemapEntries;
}
