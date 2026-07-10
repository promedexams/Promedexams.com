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
        { open: "07:30", close: "15:00" }, // Monday
        { open: "07:30", close: "15:00" }, // Tuesday
        { open: "07:30", close: "15:00" }, // Wednesday
        { open: "07:30", close: "15:00" }, // Thursday
        null, // Friday
        null, // Saturday
      ],
    },
    addressLine1: "4 W Dry Creek Cir #135,",
    addressLine2: "Littleton, CO 80120",
    FullAddress: "4 W Dry Creek Cir #135, Littleton, CO 80120",
    OfficeEmail: "office@promedexams.com",
    PhoneNumber: "(303) 798-1210",
    FaxNumber: "(303) 484-5687",
  },
  Employees: {
    Jill: {
      Name: "Dr. Jill Quigley, MD",
      Headshot: "/headshots/jill-quigley-square.jpg",
      Email: "jquigley@promedexams.com",
    },
    Laura: {
      Name: "Laura Wyse",
      Headshot: "/headshots/placeholder.jpg",
      Email: "office@promedexams.com",
    },
  },
};
