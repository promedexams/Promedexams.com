export const BusinessInfo = {
  Name: "ProMed Exams",
  Logos: {
    Logo: "/branding/logos/logo.svg",
    WordMark: "/branding/logos/wordmark.svg",
    GlobeIcon: "/branding/logos/globe-logo.svg",
  },
  SocialPreviewImage: "/images/meta-images/promed-exams-social-preview-image.png",
  CopyrightDisclaimer: `© ${new Date().getFullYear()}, ProMed Exams PC`,
  ContactInformation: {
    HoursOfOperation: {
      timezone: "America/Denver",
      hours: [
        null, // Sunday
        { open: "07:30", close: "16:30" }, // Monday
        null, // Tuesday
        null, // Wednesday
        null, // Thursday
        { open: "07:30", close: "16:30" }, // Friday
        null, // Saturday
      ],
    },
    addressLine1: "4 W Dry Creek Cir #135,",
    addressLine2: "Littleton, CO 80120",
    FullAddress: "4 W Dry Creek Cir #135, Littleton, CO 80120",
    OfficeEmail: "office@promedexams.com",
    PhoneNumber: "(720) 517-3111",
    FaxNumber: "(303) 997-2147",
  },
  Employees: {
    Jill: {
      Name: "Dr. Jill Quigley, MD",
      Headshot: "/headshots/jill-quigley-square.jpg",
      Email: "jquigley@promedexams.com",
    },
    Trish: {
      Name: "Trish Peery",
      Headshot: "/headshots/trish-peery-square.jpg",
      Email: "office@promedexams.com",
    },
  },
};
