import Link from "next/link";
import { CalendarDaysIcon, MailIcon, MapPinIcon, PhoneIcon, Printer } from "lucide-react";

import { BusinessInfo } from "@/lib/business-info";
import { GOOGLE_MAPS_URL } from "@/lib/links";
import { SupportedLanguages } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";
import { Button } from "../ui/button";

const ContactCard = async ({ params }: SupportedLanguages) => {
  const dict = await getDictionary((await params).lang);
  // const days = dict.contactCard.hoursOfOperation.daysOfTheWeek;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="rounded-lg overflow-hidden h-full min-h-[450px] border border-gray-200 shadow-lg">
        <iframe
          title="Google Maps Preview"
          src={GOOGLE_MAPS_URL}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="select-none"
        />
      </div>
      <div className="space-y-8 flex flex-col justify-center bg-slate-800/20 p-6 rounded-lg text-left">
        <h2 className="text-3xl font-semibold text-white border-b pb-4">{dict.pages.contact.contactInfoHeader}</h2>
        {/* <div className="flex items-center gap-5">
          <ClockIcon className="w-9 h-9 mt-1 text-[#f1a208] shrink-0" />
          <div>
            <h3 className="font-bold text-xl mb-1">{dict.contactCard.hoursOfOperation.hoursOfOperation}</h3>
            {BusinessInfo.ContactInformation.HoursOfOperation.hours.map((hours, index) => (
              <p key={days[index]} className="text-white/90 text-lg">
                <span className="font-semibold">{days[index]}:</span>{" "}
                {hours
                  ? `${formatTime(hours.open)} - ${formatTime(hours.close)}`
                  : `${dict.contactCard.hoursOfOperation.closed}`}
              </p>
            ))}
            <p className="text-white/70 text-sm italic mt-2">
              * {dict.contactCard.hoursOfOperation.timezoneDisclaimer}
            </p>
          </div>
        </div> */}
        <div className="flex items-center gap-5">
          <MapPinIcon className="w-9 h-9 mt-1 text-[#f1a208] shrink-0" />
          <div>
            <h3 className="font-bold text-xl mb-1">{dict.contactCard.address}</h3>
            <p className="text-white/90 text-lg">{BusinessInfo.ContactInformation.Address}</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <MailIcon className="w-9 h-9 mt-1 text-[#f1a208] shrink-0" />
          <div>
            <h3 className="font-bold text-xl mb-1">{dict.contactCard.email}</h3>
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
              <h3 className="font-bold text-xl mb-1">{dict.contactCard.phone}</h3>
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
              <h3 className="font-bold text-xl mb-1">{dict.contactCard.fax}</h3>
              <p className="text-white/90 text-lg">{BusinessInfo.ContactInformation.FaxNumber}</p>
            </div>
          </div>
        </div>
        <div className="text-white/90 pt-6 border-t">
          <Link href="/schedule-appointment">
            <Button
              size="lg"
              className="bg-[#f1a208] hover:bg-[#f1a208]/90 text-black text-lg font-bold cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <CalendarDaysIcon className="w-5 h-5 mr-2" />
              {dict.contactCard.scheduleAppointmentButtonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
