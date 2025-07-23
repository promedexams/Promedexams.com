export const BusinessInfo = {
  Name: "ProMed Exams",
  Logos: {
    Logo: "/branding/logos/logo.svg",
    WordMark: "/branding/logos/wordmark.svg",
    GlobeIcon: "/branding/logos/globe-logo.svg",
  },
  CopyrightDisclaimer: `© ${new Date().getFullYear()}, ProMed Exams PC`,
  ContactInformation: {
    HoursOfOperation: {
      timezone: "America/Denver",
      hours: [
        null, // Sunday
        { open: "09:00", close: "17:00" }, // Monday
        { open: "09:00", close: "17:00" }, // Tuesday
        { open: "09:00", close: "17:00" }, // Wednesday
        { open: "09:00", close: "17:00" }, // Thursday
        { open: "09:00", close: "17:00" }, // Friday
        null, // Saturday
      ],
    },
    Address: "4 W Dry Creek Cir #135, Littleton, CO 80120",
    OfficeEmail: "office@promedexams.com",
    PhoneNumber: "(720) 517-3111",
    FaxNumber: "(303) 997-2147",
  },
  Employees: {
    Jill: {
      Name: "Dr. Jill Quigley, MD",
      Email: "jquigley@promedexams.com",
    },
    Trish: {
      Name: "Trish Peery",
      Email: "office@promedexams.com",
    },
  },
};
