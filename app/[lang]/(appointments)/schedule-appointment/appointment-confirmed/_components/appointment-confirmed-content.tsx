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
  MailPlusIcon,
  MapPinIcon,
  PenSquareIcon,
  UserIcon,
} from "lucide-react";

// interface AppointmentConfirmedContentProps {
//   dict: any;
// }

interface BookingDetails {
  bookingId: string;
  customerId: string;
  appointmentType: string;
  appointmentDate: string;
  appointmentTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const getAppointmentTypeInfo = (appointmentType: string) => {
  const appointmentInfo: Record<
    string,
    {
      title: string;
      description: string;
      duration: string;
      reminders?: string[];
      servicePageUrl?: string;
    }
  > = {
    "DOT Physicals": {
      title: "DOT Physical Examination",
      description:
        "A Department of Transportation (DOT) physical examination to ensure you meet the health standards required for commercial driving.",
      duration: "60 minutes",
      reminders: [
        "Make sure to bring: Medical Examination Report (MER) Form, Current state-issued driver’s license, Contacts/glasses (if applicable) – If you wear contacts, bring a contact case to remove contacts to check uncorrected vision, Hearing aids (if applicable), List of current medications with dosages and prescriber’s name, Special circumstances or exemption letters from your doctor(s) and/or pertinent medical or legal records (if applicable)",
        "Be sure to complete the driver information and health history sections on the first two pages of the Medical Examination Report Form (MCSA-5875) prior to your appointment.",
        "You do NOT need to be fasting for your appointment, but you will need to leave a urine sample at the beginning of your appointment.",
        "Please show up to your appointment 10-15 minutes early to check in, leave a urine sample, and be ready for your appointment on time.",
      ],
      servicePageUrl: "/services/dot-physicals",
    },
    "FAA Physicals (2nd & 3rd Class)": {
      title: "FAA Aviation Medical Examination (2nd & 3rd Class)",
      description:
        "Federal Aviation Administration medical certification examination for private and commercial pilots. We provide 2nd and 3rd class medical certificates.",
      duration: "60 minutes",
      reminders: [
        "Make sure to bring: Current photo ID (Driver’s license or Passport), Contacts/glasses (if applicable) – If you wear contacts, bring a contact case to remove contacts to check uncorrected vision, Hearing aids (if applicable), Pertinent medical or legal records (if applicable), MedXPress confirmation number",
        "Be sure to update your health history and current medications in MedXPress prior to your arrival.",
        "You do NOT need to be fasting for your appointment, but you will need to leave a urine sample at the beginning of your appointment.",
        "Please show up to your appointment 10-15 minutes early to check in, leave a urine sample, and be ready for your appointment on time.",
      ],
      servicePageUrl: "/services/faa-physicals",
    },
    "School/Sports/Camp Physicals": {
      title: "School, Sports & Camp Physical",
      description:
        "Comprehensive physical examination for school enrollment, sports participation, or camp attendance clearance.",
      duration: "60 minutes",
      reminders: [
        "Make sure to bring: Any forms provided by your school, sports program, or camp that need to be completed and/or signed by Dr. Quigley, Immunization records, List of allergies and current medications with dosages (prescription and over-the-counter), List of past injuries and surgeries and pertinent family history",
        "Be sure to complete any parts of participation forms that are to be completed by the client or their parent/guardian",
        "You do NOT need to be fasting for your appointment, but you will need to leave a urine sample at the beginning of your appointment if your participation form requires a urinalysis.",
        "Please show up to your appointment 10-15 minutes early to check in, leave a urine sample if necessary, and be ready for your appointment on time.",
      ],
      servicePageUrl: "/services/school-sports-camp-physicals",
    },
    "USCIS Medical Exam": {
      title: "USCIS Immigrant Medical Examination",
      description:
        "A medical examination required for immigrants applying for adjustment of status or an immigrant visa, in accordance with U.S. Citizenship and Immigration Services (USCIS) requirements.",
      duration: "60 minutes",
      reminders: [
        "Make sure to bring: Valid passport or other government-issued photo identification, Vaccination records, Form I-693 (Report of Medical Examination and Vaccination Record), List of current medications, Pertinent past medical or legal records (see promedexams.com for more information regarding what to bring to your appointment)",
        "Be sure to complete parts 1-4 on pages 1-3 of Form I-693 prior to your arrival.",
        "If necessary, please bring an interpreter to your appointment if possible. An interpretation device will be used if an interpreter is needed but not available.",
        "You do NOT need to be fasting for your appointment, but you may need to leave a urine sample and have blood drawn immediately after your appointment.",
        "Please show up to your appointment 10-15 minutes early to check in, get instructions for where to go for your lab draw after your appointment, and be ready for your appointment on time.",
      ],
    },
    "Pre-Exam Consultation": {
      title: "Pre-Examination Consultation",
      description:
        "A consultation appointment to discuss your upcoming medical examination, review medical history, and address any concerns or questions you may have.",
      duration: "60 minutes",
    },
  };

  // Return the matching appointment type or a default
  return (
    appointmentInfo[appointmentType] || {
      title: appointmentType || "General Appointment",
      description:
        "Your appointment has been confirmed. Please arrive 15 minutes early to complete any necessary paperwork.",
      duration: "Varies",
      reminders: [
        "Please bring a photo identification.",
        "Please bring your insurance information.",
        "Please bring a list of current medications.",
        "If you need to cancel or reschedule, please call at least 24 hours in advance",
      ],
    }
  );
};

// const AppointmentConfirmedContent = ({ dict }: AppointmentConfirmedContentProps) => {  const searchParams = useSearchParams();
const AppointmentConfirmedContent = () => {
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [appointmentTypeInfo, setAppointmentTypeInfo] = useState<any>(null);

  useEffect(() => {
    const bookingId = searchParams.get("bookingId");
    const customerId = searchParams.get("customerId");
    const appointmentType = searchParams.get("appointmentType");
    const appointmentDate = searchParams.get("appointmentDate");
    const appointmentTime = searchParams.get("appointmentTime");
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName");
    const email = searchParams.get("email");
    const phoneNumber = searchParams.get("phoneNumber");

    if (bookingId && appointmentType && appointmentDate && appointmentTime && firstName && lastName) {
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
    }
  }, [searchParams]);

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

  if (!bookingDetails) {
    return (
      <div className="w-full bg-slate-800/20 p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <AlertCircleIcon className="w-16 h-16 mx-auto text-red-400 mb-4" />
          <h1 className="text-3xl font-bold text-white mb-4">Booking Not Found</h1>
          <p className="text-white/80">
            We couldn't find your booking confirmation. Please contact our office if you believe this is an error.
          </p>
          <div className="mt-6 p-4 bg-slate-900/50 rounded-lg inline-block">
            <p className="text-white/60 text-sm mb-1">Call us at</p>
            <p className="text-white font-bold">(720) 517-3111</p>
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
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Appointment Confirmed</h1>
          </div>
          <p className="text-center text-white/80 text-lg">Your appointment has been successfully scheduled.</p>
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
                        <p className="text-xs text-white/60 uppercase tracking-wide">Mountain Time (MT)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Confirmation Number Box */}
            <div className="bg-slate-900/50 p-4 rounded-xl text-center flex flex-col justify-center w-full flex-1">
              <span className="text-xs text-white/60 uppercase tracking-wider">Confirmation Number</span>
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
                <h3 className="font-bold text-white text-lg">Client Information</h3>
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
                <h3 className="font-bold text-white text-lg">Appointment Type</h3>
              </div>
              <div className="pl-12 space-y-1">
                <p className="text-white text-lg font-medium">
                  {appointmentTypeInfo?.title || bookingDetails.appointmentType}
                </p>
                {appointmentTypeInfo?.duration && (
                  <p className="text-white/70 text-sm">Duration: {appointmentTypeInfo.duration}</p>
                )}
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/40 p-5 rounded-xl transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#f1a208]/20 p-2 rounded-lg">
                  <MapPinIcon className="w-5 h-5 text-[#f1a208]" />
                </div>
                <h3 className="font-bold text-white text-lg">Location</h3>
              </div>
              <div className="pl-12 space-y-1">
                <p className="text-white text-lg font-medium">ProMed Exams</p>
                <p className="text-white/70 text-sm">4 W Dry Creek Cir #135</p>
                <p className="text-white/70 text-sm">Littleton, CO 80120</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What to Expect Section */}
      {appointmentTypeInfo && (
        <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-white/20 text-center">
            What to Expect
          </h2>
          <div className="space-y-6">
            <div className="bg-slate-900/50 p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#f1a208]/20 p-2 rounded-lg">
                  <FileTextIcon className="w-5 h-5 text-[#f1a208]" />
                </div>
                <h3 className="text-lg font-semibold text-white">About Your Visit</h3>
              </div>
              <p className="text-white/80 pl-12">{appointmentTypeInfo.description}</p>
            </div>

            {appointmentTypeInfo.reminders && appointmentTypeInfo.reminders.length > 0 && (
              <div className="bg-slate-900/50 p-5 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#f1a208]/20 p-2 rounded-lg">
                    <AlertTriangleIcon className="w-5 h-5 text-[#f1a208]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Important Reminders</h3>
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
                <h3 className="text-lg font-semibold text-white">Cancellation Policy</h3>
              </div>
              <p className="text-white/80 pl-12">
                Appointments cancelled with less than 24 hours notice may be subject to a cancellation fee.
              </p>
            </div>

            <div className="bg-slate-900/50 p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#f1a208]/20 p-2 rounded-lg">
                  <PenSquareIcon className="w-5 h-5 text-[#f1a208]" />
                </div>
                <h3 className="text-lg font-semibold text-white">Changes to Your Appointment</h3>
              </div>
              <p className="text-white/80 pl-12">
                Please reach out to our office by either giving us a phone call or sending us an email to reschedule or
                make changes to your appointment.
              </p>
              <div className="pl-12 pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-lg border-2 border-[#f1a208] px-6 py-3 font-bold text-[#f1a208] transition-all duration-200 hover:scale-105 hover:bg-[#f1a208]/20"
                >
                  <MailPlusIcon className="w-5 h-5" />
                  <span>Contact Us</span>
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
