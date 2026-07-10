"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CalendarX2Icon,
  CheckCircleIcon,
  ClipboardIcon,
  ClockIcon,
  FileTextIcon,
  InfoIcon,
  Loader2,
  MailPlusIcon,
  MapPinIcon,
  PenSquareIcon,
  UserIcon,
} from "lucide-react";

import { BusinessInfo } from "@/lib/business-info";
import { BookingDetails } from "@/lib/types/api/booking";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";

const AppointmentConfirmedContent = ({ params }: SupportedLanguagesProps) => {
  const [dict, setDict] = useState<any>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    params.then(({ lang }) => {
      getDictionary(lang).then(setDict);
    });
  }, [params]);

  const getMonthYear = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  const getDayNumber = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.getUTCDate();
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date
      .toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: "UTC",
      })
      .toUpperCase();
  };

  const getAppointmentTypeInfo = (appointmentType: string) => {
    // Configuration array similar to service-reminders.ts
    const appointmentTypeConfigs = [
      {
        pattern: /DOT/i,
        dictionaryKey: "dot",
        servicePageUrl: "/services/dot-physicals",
      },
      {
        pattern: /FAA/i,
        dictionaryKey: "faa",
        servicePageUrl: "/services/faa-physicals",
      },
      {
        pattern: /School|Sports|Camp/i,
        dictionaryKey: "schoolSportsCamp",
        servicePageUrl: "/services/school-sports-camp-physicals",
      },
      {
        pattern: /Immigration/i,
        dictionaryKey: "immigration",
        servicePageUrl: "/services/immigration-medical-exams",
      },
      {
        pattern: /Consultation/i,
        dictionaryKey: "consultation",
        servicePageUrl: "/services",
      },
    ];

    // Try to find a matching pattern
    for (const config of appointmentTypeConfigs) {
      if (config.pattern.test(appointmentType)) {
        const serviceData =
          dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes[
            config.dictionaryKey
          ];
        return {
          title: serviceData.title,
          description: serviceData.description,
          reminders: serviceData.remindersList,
          servicePageUrl: config.servicePageUrl,
        };
      }
    }

    // Default fallback
    return {
      title:
        dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes.general.title,
      description:
        dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes.general
          .description,
      reminders:
        dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes.general
          .remindersList,
      servicePageUrl: "/services",
    };
  };

  // Booking details are derived directly from the URL search params during render.
  const bookingId = searchParams.get("bookingId");
  const customerId = searchParams.get("customerId");
  const appointmentType = searchParams.get("appointmentType");
  const appointmentDate = searchParams.get("appointmentDate");
  const appointmentTime = searchParams.get("appointmentTime");
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  const email = searchParams.get("email");
  const phoneNumber = searchParams.get("phoneNumber");

  const bookingDetails: BookingDetails | null =
    bookingId && appointmentType && appointmentDate && appointmentTime && firstName && lastName
      ? {
          bookingId,
          customerId: customerId || "",
          appointmentType,
          appointmentDate,
          appointmentTime,
          firstName,
          lastName,
          email: email || "",
          phoneNumber: phoneNumber || "",
        }
      : null;

  const appointmentTypeInfo = bookingDetails && dict ? getAppointmentTypeInfo(bookingDetails.appointmentType) : null;

  if (!dict) {
    return (
      <div className="mb-8 flex items-center justify-center">
        <Loader2 className="h-24 w-24 animate-spin" />
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="mb-8 w-full rounded-2xl bg-slate-800/20 p-8 shadow-xl">
        <div className="text-center">
          <AlertCircleIcon className="mx-auto mb-4 h-16 w-16 text-red-400" />
          <h1 className="mb-4 text-3xl font-bold text-white">
            {dict.pages.scheduleAppointment.appointmentConfirmed.appointmentNotFound.title}
          </h1>
          <p className="text-white/80">
            {dict.pages.scheduleAppointment.appointmentConfirmed.appointmentNotFound.description}
          </p>
          <div className="pt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-lg border-2 border-[#f1a208] px-6 py-3 font-bold text-[#f1a208] transition-all duration-200 hover:scale-105 hover:bg-[#f1a208]/20"
            >
              <MailPlusIcon className="h-5 w-5" />
              <span>{dict.pages.scheduleAppointment.appointmentConfirmed.appointmentNotFound.contactButtonText}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Appointment Info - Enhanced Horizontal Layout */}
      <div className="mb-8 w-full rounded-2xl bg-slate-800/20 p-8 shadow-xl">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-3 flex flex-col items-center justify-center gap-3 text-center">
            <CheckCircleIcon className="h-10 w-10 text-green-400" />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {dict.pages.scheduleAppointment.appointmentConfirmed.overviewSection.title}
            </h1>
          </div>
          <p className="text-center text-lg text-white/80">
            {dict.pages.scheduleAppointment.appointmentConfirmed.overviewSection.subheader}
          </p>
        </div>
        <div className="flex min-h-[420px] flex-col items-stretch gap-6 sm:flex-row">
          {/* Left Side - Calendar + Confirmation Number */}
          <div className="mx-auto flex w-full flex-col items-center gap-6 sm:mx-0 sm:max-w-[320px] sm:items-stretch">
            {/* Calendar Card */}
            <div className="w-full">
              <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-900/50 shadow-2xl">
                {/* Month/Year Header */}
                <div className="bg-gradient-to-r from-[#f1a208] to-[#d4900a] p-4 text-center text-black">
                  <h3 className="text-xl font-bold tracking-wide">{getMonthYear(bookingDetails.appointmentDate)}</h3>
                </div>
                {/* Date Display */}
                <div className="p-8 text-center">
                  <div className="mb-3 text-base font-bold tracking-widest text-[#f1a208]">
                    {getDayName(bookingDetails.appointmentDate)}
                  </div>
                  <div className="relative inline-block">
                    <div className="text-7xl leading-none font-bold text-white">
                      {getDayNumber(bookingDetails.appointmentDate)}
                    </div>
                    <div className="absolute right-0 -bottom-2 left-0 h-1 bg-gradient-to-r from-transparent via-[#f1a208] to-transparent"></div>
                  </div>
                </div>
                {/* Time Display */}
                <div className="mx-4 mb-6 bg-gradient-to-r from-slate-900/0 via-slate-900/50 to-slate-900/0">
                  <div className="rounded-xl bg-slate-800/80 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-3">
                      <div className="rounded-lg bg-[#f1a208]/20 p-2">
                        <ClockIcon className="h-6 w-6 text-[#f1a208]" />
                      </div>
                      <div className="text-left">
                        <p className="text-2xl font-bold text-white">{bookingDetails.appointmentTime}</p>
                        <p className="text-xs tracking-wide text-white/60 uppercase">
                          {dict.pages.scheduleAppointment.appointmentConfirmed.overviewSection.calendar.timezoneDisplay}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Confirmation Number Box */}
            <div className="flex w-full flex-1 flex-col justify-center rounded-xl bg-slate-900/50 p-4 text-center">
              <span className="text-xs tracking-wider text-white/60 uppercase">
                {dict.pages.scheduleAppointment.appointmentConfirmed.overviewSection.confirmationNumber.title}
              </span>
              <p className="font-mono text-lg font-bold text-[#f1a208]">{bookingDetails.bookingId}</p>
            </div>
          </div>
          {/* Right Side - Info Cards */}
          <div className="flex h-full flex-1 flex-col justify-between gap-6">
            {/* Client Info Card */}
            <div className="rounded-xl bg-gradient-to-br from-slate-900/60 to-slate-900/40 p-5 transition-all">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-[#f1a208]/20 p-2">
                  <UserIcon className="h-5 w-5 text-[#f1a208]" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {dict.pages.scheduleAppointment.appointmentConfirmed.overviewSection.clientInfo.title}
                </h3>
              </div>
              <div className="space-y-1 pl-12">
                <p className="text-lg font-medium text-white">
                  {bookingDetails.firstName} {bookingDetails.lastName}
                </p>
                {bookingDetails.email && <p className="text-sm text-white/70">{bookingDetails.email}</p>}
                {bookingDetails.phoneNumber && <p className="text-sm text-white/70">{bookingDetails.phoneNumber}</p>}
              </div>
            </div>

            {/* Appointment Type Card */}
            <div className="rounded-xl bg-gradient-to-br from-slate-900/60 to-slate-900/40 p-5 transition-all">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-[#f1a208]/20 p-2">
                  <ClipboardIcon className="h-5 w-5 text-[#f1a208]" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {dict.pages.scheduleAppointment.appointmentConfirmed.overviewSection.appointmentType.title}
                </h3>
              </div>
              <div className="space-y-1 pl-12">
                <p className="text-lg font-medium text-white">
                  {appointmentTypeInfo?.title || bookingDetails.appointmentType}
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="rounded-xl bg-gradient-to-br from-slate-900/60 to-slate-900/40 p-5 transition-all">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-[#f1a208]/20 p-2">
                  <MapPinIcon className="h-5 w-5 text-[#f1a208]" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {dict.pages.scheduleAppointment.appointmentConfirmed.overviewSection.location.title}
                </h3>
              </div>
              <div className="space-y-1 pl-12">
                <p className="text-lg font-medium text-white">{BusinessInfo.Name}</p>
                <p className="text-sm text-white/70">{BusinessInfo.ContactInformation.addressLine1}</p>
                <p className="text-sm text-white/70">{BusinessInfo.ContactInformation.addressLine2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What to Expect Section */}
      {appointmentTypeInfo && (
        <div className="mb-8 w-full rounded-2xl bg-slate-800/20 p-8 shadow-xl">
          <h2 className="mb-6 border-b border-white/20 pb-4 text-center text-2xl font-bold text-white">
            {dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.title}
          </h2>
          <div className="space-y-6">
            <div className="rounded-xl bg-slate-900/50 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-[#f1a208]/20 p-2">
                  <FileTextIcon className="h-5 w-5 text-[#f1a208]" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.about.title}
                </h3>
              </div>
              <p className="pl-12 text-white/80">{appointmentTypeInfo.description}</p>
            </div>

            {appointmentTypeInfo.reminders && appointmentTypeInfo.reminders.length > 0 && (
              <div className="rounded-xl bg-slate-900/50 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-[#f1a208]/20 p-2">
                    <AlertTriangleIcon className="h-5 w-5 text-[#f1a208]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.title}
                  </h3>
                </div>
                <div className="pl-12">
                  <ul className="space-y-3">
                    {appointmentTypeInfo.reminders.map((reminder: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-white/80">
                        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#f1a208]"></span>
                        <span>{reminder}</span>
                      </li>
                    ))}
                  </ul>
                  {appointmentTypeInfo.servicePageUrl && (
                    <div className="pt-6">
                      <Link
                        href={appointmentTypeInfo.servicePageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 rounded-lg border-2 border-[#f1a208] px-6 py-3 font-bold text-[#f1a208] transition-all duration-200 hover:scale-105 hover:bg-[#f1a208]/20"
                      >
                        <InfoIcon className="h-5 w-5" />
                        <span>Learn More About Your Appointment</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="rounded-xl bg-slate-900/50 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-[#f1a208]/20 p-2">
                  <CalendarX2Icon className="h-5 w-5 text-[#f1a208]" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.cancellation.title}
                </h3>
              </div>
              <p className="pl-12 text-white/80">
                {dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.cancellation.text}
              </p>
            </div>

            <div className="rounded-xl bg-slate-900/50 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-[#f1a208]/20 p-2">
                  <PenSquareIcon className="h-5 w-5 text-[#f1a208]" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.changes.title}
                </h3>
              </div>
              <p className="pl-12 text-white/80">
                {dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.changes.text}
              </p>
              <div className="pt-6 pl-12">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-lg border-2 border-[#f1a208] px-6 py-3 font-bold text-[#f1a208] transition-all duration-200 hover:scale-105 hover:bg-[#f1a208]/20"
                >
                  <MailPlusIcon className="h-5 w-5" />
                  <span>
                    {dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.changes.contactButtonText}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentConfirmedContent;
