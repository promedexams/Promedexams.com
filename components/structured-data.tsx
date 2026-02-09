import Script from "next/script";

import { BusinessInfo } from "@/lib/business-info";
import { DOMAIN_URL } from "@/lib/links";

export function StructuredData() {
  // converts hours of operation to schema.org format
  const getOpeningHours = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const openingHours: string[] = [];

    BusinessInfo.ContactInformation.HoursOfOperation.hours.forEach((hours, index) => {
      if (hours) {
        openingHours.push(`${days[index]} ${hours.open}-${hours.close}`);
      }
    });

    return openingHours;
  };

  // local business schema for SEO improvements
  const medicalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${DOMAIN_URL}/#medicalbusiness`,
    name: BusinessInfo.Name,
    description:
      "Professional medical examination services including immigration medical exams, DOT physicals, FAA physicals, and school/sports physicals in Littleton, Colorado.",
    url: DOMAIN_URL,
    logo: `${DOMAIN_URL}${BusinessInfo.Logos.Logo}`,
    image: `${DOMAIN_URL}${BusinessInfo.SocialPreviewImage}`,
    telephone: BusinessInfo.ContactInformation.PhoneNumber,
    faxNumber: BusinessInfo.ContactInformation.FaxNumber,
    email: BusinessInfo.ContactInformation.OfficeEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: BusinessInfo.ContactInformation.addressLine1.replace(",", ""),
      addressLocality: "Littleton",
      addressRegion: "CO",
      postalCode: "80120",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.619199979,
      longitude: -104.992257684,
    },
    openingHoursSpecification: getOpeningHours().map((hours) => {
      const [day, time] = hours.split(" ");
      const [open, close] = time.split("-");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: day,
        opens: open,
        closes: close,
      };
    }),
    priceRange: "$$",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 39.581607,
        longitude: -104.9891764,
      },
      geoRadius: "50000", // 50km radius
    },
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    hasMap: "https://www.google.com/maps?cid=12162016876054202772",
  };

  // physician schema for Dr. Jill Quigley
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${DOMAIN_URL}/#physician`,
    name: BusinessInfo.Employees.Jill.Name,
    image: `${DOMAIN_URL}${BusinessInfo.Employees.Jill.Headshot}`,
    email: BusinessInfo.Employees.Jill.Email,
    worksFor: {
      "@id": `${DOMAIN_URL}/#medicalbusiness`,
    },
    jobTitle: "Medical Doctor",
    medicalSpecialty: "Occupational Medicine",
  };

  // medical services offered
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "MedicalProcedure",
        name: "Immigration Medical Exams (Form I-693)",
        description:
          "USCIS-approved civil surgeon providing comprehensive immigration medical examinations for visa and green card applicants.",
        provider: {
          "@id": `${DOMAIN_URL}/#medicalbusiness`,
        },
      },
      {
        "@type": "MedicalProcedure",
        name: "DOT Physical Examinations",
        description:
          "Department of Transportation physical examinations for commercial driver's license certification.",
        provider: {
          "@id": `${DOMAIN_URL}/#medicalbusiness`,
        },
      },
      {
        "@type": "MedicalProcedure",
        name: "FAA Medical Examinations",
        description: "Federal Aviation Administration medical exams for pilot certification and aviation personnel.",
        provider: {
          "@id": `${DOMAIN_URL}/#medicalbusiness`,
        },
      },
      {
        "@type": "MedicalProcedure",
        name: "School, Sports & Camp Physicals",
        description: "Physical examinations for school enrollment, sports participation, and summer camp attendance.",
        provider: {
          "@id": `${DOMAIN_URL}/#medicalbusiness`,
        },
      },
    ],
  };

  // organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${DOMAIN_URL}/#organization`,
    name: BusinessInfo.Name,
    url: DOMAIN_URL,
    logo: `${DOMAIN_URL}${BusinessInfo.Logos.Logo}`,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BusinessInfo.ContactInformation.PhoneNumber,
      contactType: "customer service",
      email: BusinessInfo.ContactInformation.OfficeEmail,
      areaServed: "US",
      availableLanguage: ["English", "Spanish"],
    },
  };

  return (
    <>
      <Script
        id="medical-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalBusinessSchema),
        }}
      />
      <Script
        id="physician-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(physicianSchema),
        }}
      />
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesSchema),
        }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </>
  );
}
