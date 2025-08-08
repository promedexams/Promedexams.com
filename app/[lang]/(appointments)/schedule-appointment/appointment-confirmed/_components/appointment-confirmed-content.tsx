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
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [appointmentTypeInfo, setAppointmentTypeInfo] = useState<any>(null);
  const [bookingLoading, setBookingLoading] = useState(true);

  useEffect(() => {
    params.then(({ lang }) => {
      getDictionary(lang).then(setDict);
    });
  }, [params]);

  useEffect(() => {
    setBookingLoading(true);
    const bookingId = searchParams.get("bookingId");
    const customerId = searchParams.get("customerId");
    const appointmentType = searchParams.get("appointmentType");
    const appointmentDate = searchParams.get("appointmentDate");
    const appointmentTime = searchParams.get("appointmentTime");
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName");
    const email = searchParams.get("email");
    const phoneNumber = searchParams.get("phoneNumber");

    if (bookingId && appointmentType && appointmentDate && appointmentTime && firstName && lastName && dict) {
      const details: BookingDetails = {
        bookingId,
        customerId: customerId || "",
        appointmentType,
        appointmentDate,
        appointmentTime,
        firstName,
        lastName,
        email: email || "",
        phoneNumber: phoneNumber || "",
      };

      setBookingDetails(details);
      setAppointmentTypeInfo(getAppointmentTypeInfo(appointmentType));
      setBookingLoading(false);
    } else {
      setBookingDetails(null);
      setAppointmentTypeInfo(null);
      setBookingLoading(false);
    }
  }, [searchParams, dict]);

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
    const appointmentInfo: Record<
      string,
      {
        title: string;
        description: string;
        reminders?: string[];
        servicePageUrl?: string;
      }
    > = {
      "DOT Physicals": {
        title: dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes.dot.title,
        description:
          dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes.dot
            .description,
        reminders:
          dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes.dot
            .remindersList,
        servicePageUrl: "/services/dot-physicals",
      },
      "FAA Physicals (2nd & 3rd Class)": {
        title: dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes.faa.title,
        description:
          dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes.faa
            .description,
        reminders:
          dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes.faa
            .remindersList,
        servicePageUrl: "/services/faa-physicals",
      },
      "School/Sports/Camp Physicals": {
        title:
          dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes
            .schoolSportsCamp.title,
        description:
          dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes
            .schoolSportsCamp.description,
        reminders:
          dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes
            .schoolSportsCamp.remindersList,
        servicePageUrl: "/services/school-sports-camp-physicals",
      },
      Consultation: {
        title:
          dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes.consultation
            .title,
        description:
          dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes.consultation
            .description,
        reminders:
          dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes.consultation
            .remindersList,
        servicePageUrl: "/services",
      },
    };

    // Return the matching appointment type or a default
    return (
      appointmentInfo[appointmentType] || {
        title:
          dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes.general.title,
        description:
          dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes.general
            .description,
        reminders:
          dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.serviceTypes.general
            .remindersList,
        servicePageUrl: "/services",
      }
    );
  };

  if (!dict || bookingLoading) {
    return (
      <div className="flex justify-center mb-8 items-center">
        <Loader2 className="w-24 h-24 animate-spin" />
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <AlertCircleIcon className="w-16 h-16 mx-auto text-red-400 mb-4" />
          <h1 className="text-3xl font-bold text-white mb-4">
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
              <MailPlusIcon className="w-5 h-5" />
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
      <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="flex flex-col items-center justify-center text-center gap-3 mb-3">
            <CheckCircleIcon className="w-10 h-10 text-green-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {dict.pages.scheduleAppointment.appointmentConfirmed.overviewSection.title}
            </h1>
          </div>
          <p className="text-center text-white/80 text-lg">
            {dict.pages.scheduleAppointment.appointmentConfirmed.overviewSection.subheader}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 items-stretch min-h-[420px]">
          {/* Left Side - Calendar + Confirmation Number */}
          <div className="flex flex-col gap-6 items-center sm:items-stretch w-full sm:max-w-[320px] mx-auto sm:mx-0">
            {/* Calendar Card */}
            <div className="w-full">
              <div className="bg-gradient-to-b from-slate-900/70 to-slate-900/50 rounded-2xl overflow-hidden shadow-2xl w-full flex flex-col">
                {/* Month/Year Header */}
                <div className="bg-gradient-to-r from-[#f1a208] to-[#d4900a] text-black p-4 text-center">
                  <h3 className="text-xl font-bold tracking-wide">{getMonthYear(bookingDetails.appointmentDate)}</h3>
                </div>
                {/* Date Display */}
                <div className="p-8 text-center">
                  <div className="text-[#f1a208] text-base font-bold tracking-widest mb-3">
                    {getDayName(bookingDetails.appointmentDate)}
                  </div>
                  <div className="relative inline-block">
                    <div className="text-7xl font-bold text-white leading-none">
                      {getDayNumber(bookingDetails.appointmentDate)}
                    </div>
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f1a208] to-transparent"></div>
                  </div>
                </div>
                {/* Time Display */}
                <div className="bg-gradient-to-r from-slate-900/0 via-slate-900/50 to-slate-900/0 mx-4 mb-6">
                  <div className="bg-slate-800/80 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-3">
                      <div className="bg-[#f1a208]/20 p-2 rounded-lg">
                        <ClockIcon className="w-6 h-6 text-[#f1a208]" />
                      </div>
                      <div className="text-left">
                        <p className="text-2xl font-bold text-white">{bookingDetails.appointmentTime}</p>
                        <p className="text-xs text-white/60 uppercase tracking-wide">
                          {dict.pages.scheduleAppointment.appointmentConfirmed.overviewSection.calendar.timezoneDisplay}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Confirmation Number Box */}
            <div className="bg-slate-900/50 p-4 rounded-xl text-center flex flex-col justify-center w-full flex-1">
              <span className="text-xs text-white/60 uppercase tracking-wider">
                {dict.pages.scheduleAppointment.appointmentConfirmed.overviewSection.confirmationNumber.title}
              </span>
              <p className="text-lg font-mono font-bold text-[#f1a208]">{bookingDetails.bookingId}</p>
            </div>
          </div>
          {/* Right Side - Info Cards */}
          <div className="flex flex-col gap-6 justify-between h-full flex-1">
            {/* Client Info Card */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/40 p-5 rounded-xl transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#f1a208]/20 p-2 rounded-lg">
                  <UserIcon className="w-5 h-5 text-[#f1a208]" />
                </div>
                <h3 className="font-bold text-white text-lg">
                  {dict.pages.scheduleAppointment.appointmentConfirmed.overviewSection.clientInfo.title}
                </h3>
              </div>
              <div className="pl-12 space-y-1">
                <p className="text-white text-lg font-medium">
                  {bookingDetails.firstName} {bookingDetails.lastName}
                </p>
                {bookingDetails.email && <p className="text-white/70 text-sm">{bookingDetails.email}</p>}
                {bookingDetails.phoneNumber && <p className="text-white/70 text-sm">{bookingDetails.phoneNumber}</p>}
              </div>
            </div>

            {/* Appointment Type Card */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/40 p-5 rounded-xl transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#f1a208]/20 p-2 rounded-lg">
                  <ClipboardIcon className="w-5 h-5 text-[#f1a208]" />
                </div>
                <h3 className="font-bold text-white text-lg">
                  {dict.pages.scheduleAppointment.appointmentConfirmed.overviewSection.appointmentType.title}
                </h3>
              </div>
              <div className="pl-12 space-y-1">
                <p className="text-white text-lg font-medium">
                  {appointmentTypeInfo?.title || bookingDetails.appointmentType}
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/40 p-5 rounded-xl transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#f1a208]/20 p-2 rounded-lg">
                  <MapPinIcon className="w-5 h-5 text-[#f1a208]" />
                </div>
                <h3 className="font-bold text-white text-lg">
                  {dict.pages.scheduleAppointment.appointmentConfirmed.overviewSection.location.title}
                </h3>
              </div>
              <div className="pl-12 space-y-1">
                <p className="text-white text-lg font-medium">{BusinessInfo.Name}</p>
                <p className="text-white/70 text-sm">{BusinessInfo.ContactInformation.addressLine1}</p>
                <p className="text-white/70 text-sm">{BusinessInfo.ContactInformation.addressLine2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What to Expect Section */}
      {appointmentTypeInfo && (
        <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-white/20 text-center">
            {dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.title}
          </h2>
          <div className="space-y-6">
            <div className="bg-slate-900/50 p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#f1a208]/20 p-2 rounded-lg">
                  <FileTextIcon className="w-5 h-5 text-[#f1a208]" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.about.title}
                </h3>
              </div>
              <p className="text-white/80 pl-12">{appointmentTypeInfo.description}</p>
            </div>

            {appointmentTypeInfo.reminders && appointmentTypeInfo.reminders.length > 0 && (
              <div className="bg-slate-900/50 p-5 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#f1a208]/20 p-2 rounded-lg">
                    <AlertTriangleIcon className="w-5 h-5 text-[#f1a208]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.reminders.title}
                  </h3>
                </div>
                <div className="pl-12">
                  <ul className="space-y-3">
                    {appointmentTypeInfo.reminders.map((reminder: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-white/80">
                        <span className="w-2 h-2 bg-[#f1a208] rounded-full mt-2 flex-shrink-0"></span>
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
                        <InfoIcon className="w-5 h-5" />
                        <span>Learn More About Your Appointment</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-slate-900/50 p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#f1a208]/20 p-2 rounded-lg">
                  <CalendarX2Icon className="w-5 h-5 text-[#f1a208]" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.cancellation.title}
                </h3>
              </div>
              <p className="text-white/80 pl-12">
                {dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.cancellation.text}
              </p>
            </div>

            <div className="bg-slate-900/50 p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#f1a208]/20 p-2 rounded-lg">
                  <PenSquareIcon className="w-5 h-5 text-[#f1a208]" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.changes.title}
                </h3>
              </div>
              <p className="text-white/80 pl-12">
                {dict.pages.scheduleAppointment.appointmentConfirmed.whatToExpectSection.changes.text}
              </p>
              <div className="pl-12 pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-lg border-2 border-[#f1a208] px-6 py-3 font-bold text-[#f1a208] transition-all duration-200 hover:scale-105 hover:bg-[#f1a208]/20"
                >
                  <MailPlusIcon className="w-5 h-5" />
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
