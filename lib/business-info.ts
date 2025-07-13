export const BusinessInfo = {
  Name: "ProMed Exams",
  Logo: "/branding/placeholder-logo.svg",
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
    PhoneNumber: "(123) 123-1234",
    FaxNumber: "(123) 123-1234",
  },
  Employees: {
    Jill: {
      Name: "Dr. Jill Quigley, MD",
      Email: "jquigley@promedexams.com",
    },
    Trish: {
      Name: "Trish Peery",
      Email: "tpeery@promedexams.com",
    },
  },
};
