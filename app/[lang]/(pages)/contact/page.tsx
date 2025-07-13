import Link from "next/link";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, Printer } from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { BusinessInfo } from "@/lib/business-info";
import { getDictionary } from "@/lib/utils/dictionaries";

const ContactPage = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  const dict = await getDictionary((await params).lang);
  const days = dict.pages.contact.hoursOfOperation.daysOfTheWeek;

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-8 flex-1 justify-center items-center p-4 z-10">
        <div className="text-white px-2 py-8 w-full max-w-6xl">
          <h1 className="text-5xl font-bold mb-12 text-center text-white">{dict.pages.contact.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="rounded-lg overflow-hidden h-full min-h-[450px] border border-gray-200 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1537.5143543994302!2d-104.98988109010732!3d39.581503344351496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c8183d7a140e7%3A0x3d30b2473b33dbbd!2s4%20W%20Dry%20Creek%20Cir%20%23135%2C%20Littleton%2C%20CO%2080120!5e0!3m2!1sen!2sus!4v1752272249451!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="select-none"
              />
            </div>
            <div className="space-y-8 flex flex-col justify-center bg-slate-800/20 p-6 rounded-lg">
              <h2 className="text-3xl font-semibold text-white border-b pb-4 text-center md:text-start">
                {dict.pages.contact.contactInfoHeader}
              </h2>
              <div className="flex items-center gap-5">
                <ClockIcon className="w-9 h-9 mt-1 text-[#f1a208] shrink-0" />
                <div>
                  <h3 className="font-bold text-xl mb-1">{dict.pages.contact.hoursOfOperation.hoursOfOperation}</h3>
                  {BusinessInfo.ContactInformation.HoursOfOperation.hours.map((hours, index) => (
                    <p key={days[index]} className="text-white/90 text-lg">
                      <span className="font-semibold">{days[index]}:</span>{" "}
                      {hours
                        ? `${formatTime(hours.open)} - ${formatTime(hours.close)}`
                        : `${dict.pages.contact.hoursOfOperation.closed}`}
                    </p>
                  ))}
                  <p className="text-white/70 text-sm italic mt-2">
                    * {dict.pages.contact.hoursOfOperation.timezoneDisclaimer}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <MapPinIcon className="w-9 h-9 mt-1 text-[#f1a208] shrink-0" />
                <div>
                  <h3 className="font-bold text-xl mb-1">{dict.pages.contact.address}</h3>
                  <p className="text-white/90 text-lg">{BusinessInfo.ContactInformation.Address}</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <MailIcon className="w-9 h-9 mt-1 text-[#f1a208] shrink-0" />
                <div>
                  <h3 className="font-bold text-xl mb-1">{dict.pages.contact.email}</h3>
                  <Link
                    href={`mailto:${BusinessInfo.ContactInformation.OfficeEmail}`}
                    className="text-white/90 hover-underline-animation text-lg"
                  >
                    {BusinessInfo.ContactInformation.OfficeEmail}
                  </Link>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-start gap-5">
                <div className="flex items-center gap-5">
                  <PhoneIcon className="w-9 h-9 mt-1 text-[#f1a208] shrink-0" />
                  <div>
                    <h3 className="font-bold text-xl mb-1">{dict.pages.contact.phone}</h3>
                    <Link
                      href={`tel:${BusinessInfo.ContactInformation.PhoneNumber}`}
                      className="text-white/90 hover-underline-animation text-lg"
                    >
                      {BusinessInfo.ContactInformation.PhoneNumber}
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block w-px h-16 bg-white/50" />
                <div className="flex items-center gap-5">
                  <Printer className="w-9 h-9 mt-1 text-[#f1a208] shrink-0" />
                  <div>
                    <h3 className="font-bold text-xl mb-1">{dict.pages.contact.fax}</h3>
                    <p className="text-white/90 text-lg">{BusinessInfo.ContactInformation.FaxNumber}</p>
                  </div>
                </div>
              </div>
              <p className="text-md text-white/90 pt-6 border-t italic">{dict.pages.contact.contactBlurb}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default ContactPage;
