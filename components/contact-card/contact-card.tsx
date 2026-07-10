import Link from "next/link";
import { CalendarDaysIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon, Printer } from "lucide-react";

import { BusinessInfo } from "@/lib/business-info";
import { GOOGLE_MAPS_URL } from "@/lib/links";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { formatTime } from "@/lib/utils/business-hours";
import { getDictionary } from "@/lib/utils/dictionaries";
import { Button } from "../ui/button";

const ContactCard = async ({ params }: SupportedLanguagesProps) => {
  const dict = await getDictionary((await params).lang);
  const days = dict.contactCard.hoursOfOperation.daysOfTheWeek;

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <div className="h-full min-h-[450px] overflow-hidden rounded-lg border border-gray-200 shadow-lg">
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
      <div className="flex flex-col justify-center space-y-8 rounded-lg bg-slate-800/20 p-6 text-left">
        <h2 className="border-b pb-4 text-3xl font-semibold text-white">{dict.pages.contact.contactInfoHeader}</h2>
        <div className="flex items-center gap-5">
          <ClockIcon className="mt-1 h-9 w-9 shrink-0 text-[#f1a208]" />
          <div>
            <h3 className="mb-1 text-xl font-bold">{dict.contactCard.hoursOfOperation.hoursOfOperation}</h3>
            {BusinessInfo.ContactInformation.HoursOfOperation.hours.map((hours, index) => (
              <p key={days[index]} className="text-lg text-white/90">
                <span className="font-semibold">{days[index]}:</span>{" "}
                {hours
                  ? `${formatTime(hours.open)} - ${formatTime(hours.close)}`
                  : `${dict.contactCard.hoursOfOperation.closed}`}
              </p>
            ))}
            <p className="mt-2 text-sm text-white/70 italic">
              * {dict.contactCard.hoursOfOperation.timezoneDisclaimer}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <MapPinIcon className="mt-1 h-9 w-9 shrink-0 text-[#f1a208]" />
          <div>
            <h3 className="mb-1 text-xl font-bold">{dict.contactCard.address}</h3>
            <p className="text-lg text-white/90">{BusinessInfo.ContactInformation.FullAddress}</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <MailIcon className="mt-1 h-9 w-9 shrink-0 text-[#f1a208]" />
          <div>
            <h3 className="mb-1 text-xl font-bold">{dict.contactCard.email}</h3>
            <Link
              href={`mailto:${BusinessInfo.ContactInformation.OfficeEmail}`}
              className="hover-underline-animation text-lg text-white/90"
            >
              {BusinessInfo.ContactInformation.OfficeEmail}
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5 md:flex-row md:items-start">
          <div className="flex items-center gap-5">
            <PhoneIcon className="mt-1 h-9 w-9 shrink-0 text-[#f1a208]" />
            <div>
              <h3 className="mb-1 text-xl font-bold">{dict.contactCard.phone}</h3>
              <Link
                href={`tel:${BusinessInfo.ContactInformation.PhoneNumber}`}
                className="hover-underline-animation text-lg text-white/90"
              >
                {BusinessInfo.ContactInformation.PhoneNumber}
              </Link>
            </div>
          </div>
          <div className="hidden h-16 w-px bg-white/50 md:block" />
          <div className="flex items-center gap-5">
            <Printer className="mt-1 h-9 w-9 shrink-0 text-[#f1a208]" />
            <div>
              <h3 className="mb-1 text-xl font-bold">{dict.contactCard.fax}</h3>
              <p className="text-lg text-white/90">{BusinessInfo.ContactInformation.FaxNumber}</p>
            </div>
          </div>
        </div>
        <div className="border-t pt-6 text-white/90">
          <Link href="/schedule-appointment">
            <Button
              size="lg"
              className="cursor-pointer bg-[#f1a208] text-lg font-bold text-black transition-transform duration-200 hover:scale-105 hover:bg-[#f1a208]/90"
            >
              <CalendarDaysIcon className="mr-2 h-5 w-5" />
              {dict.contactCard.scheduleAppointmentButtonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
