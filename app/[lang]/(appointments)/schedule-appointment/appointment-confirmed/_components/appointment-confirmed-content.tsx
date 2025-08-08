"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  ClipboardIcon,
  ClockIcon,
  CopyIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";

interface AppointmentConfirmedContentProps {
  dict: any;
}

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
      instructions: string[];
      additionalNotes?: string[];
    }
  > = {
    "DOT Physicals": {
      title: "DOT Physical Examination",
      description:
        "A Department of Transportation (DOT) physical examination to ensure you meet the health standards required for commercial driving.",
      duration: "45-60 minutes",
      instructions: [
        "Valid driver's license or state-issued ID",
        "List of current medications",
        "Glasses or contact lenses (if applicable)",
        "Medical history and any relevant medical records",
      ],
      additionalNotes: [
        "Please arrive 15 minutes early to complete paperwork",
        "Avoid caffeine before your appointment for accurate blood pressure reading",
        "Bring any medical exemption certificates if applicable",
      ],
    },
    "FAA Physicals (2nd & 3rd Class)": {
      title: "FAA Aviation Medical Examination (2nd & 3rd Class)",
      description:
        "Federal Aviation Administration medical certification examination for private and commercial pilots. We provide 2nd and 3rd class medical certificates.",
      duration: "60-90 minutes",
      instructions: [
        "Government-issued photo ID",
        "Current pilot certificate (if applicable)",
        "Prescription medications list",
        "Eyeglasses or contact lenses (if worn)",
      ],
      additionalNotes: [
        "Fast for 8-12 hours if bloodwork is required",
        "Bring medical records for any chronic conditions",
        "Complete MedXPress application before arrival",
      ],
    },
    "School/Sports/Camp Physicals": {
      title: "School, Sports & Camp Physical",
      description:
        "Comprehensive physical examination for school enrollment, sports participation, or camp attendance clearance.",
      duration: "30-45 minutes",
      instructions: [
        "Immunization records",
        "School, sports, or camp forms to be completed",
        "Insurance card",
        "List of any medications or allergies",
      ],
      additionalNotes: [
        "Student/camper should wear comfortable clothing",
        "Parent/guardian must accompany minors",
        "Bring any specialized forms from school, sports organization, or camp",
      ],
    },
    "Pre-Exam Consultation": {
      title: "Pre-Examination Consultation",
      description:
        "A consultation appointment to discuss your upcoming medical examination, review medical history, and address any concerns or questions you may have.",
      duration: "15-30 minutes",
      instructions: [
        "List of questions or concerns",
        "Current medications list",
        "Medical history documentation",
        "Any relevant medical records",
      ],
      additionalNotes: [
        "This is a consultation only - no physical examination will be performed",
        "Perfect for discussing complex medical histories before your actual exam",
        "Helps ensure you're fully prepared for your certification examination",
      ],
    },
  };

  // Return the matching appointment type or a default
  return (
    appointmentInfo[appointmentType] || {
      title: appointmentType || "General Appointment",
      description:
        "Your appointment has been confirmed. Please arrive 15 minutes early to complete any necessary paperwork.",
      duration: "Varies",
      instructions: [
        "Photo identification",
        "Insurance information",
        "List of current medications",
        "Any relevant medical records",
      ],
      additionalNotes: [
        "Please arrive 15 minutes early",
        "If you need to cancel or reschedule, please call at least 24 hours in advance",
      ],
    }
  );
};

const AppointmentConfirmedContent = ({ dict }: AppointmentConfirmedContentProps) => {
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [appointmentTypeInfo, setAppointmentTypeInfo] = useState<any>(null);
  const [copySuccess, setCopySuccess] = useState(false);

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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  };

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
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
          <div className="flex flex-col gap-6 h-full items-center sm:items-stretch w-full max-w-[320px] mx-auto sm:mx-0">
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
            <div className="bg-slate-900/50 p-4 rounded-xl text-center flex flex-col justify-center w-full h-full">
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
      {appointmentTypeInfo && appointmentTypeInfo.instructions && (
        <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-white/20">What to Expect</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">About Your Visit</h3>
              <p className="text-white/80">{appointmentTypeInfo.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">What to Bring</h3>
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <ul className="space-y-2">
                  {appointmentTypeInfo.instructions.map((instruction: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-white/80">
                      <span className="w-2 h-2 bg-[#f1a208] rounded-full mt-2 flex-shrink-0"></span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {appointmentTypeInfo.additionalNotes && appointmentTypeInfo.additionalNotes.length > 0 && (
              <div className="bg-blue-900/20 border border-blue-400/30 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircleIcon className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-400 mb-2">Important Reminders</h3>
                    <ul className="space-y-1">
                      {appointmentTypeInfo.additionalNotes.map((note: string, index: number) => (
                        <li key={index} className="text-white/80 text-sm">
                          • {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Need to Make Changes */}
      <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-white/20">Need to Make Changes?</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-white/80 mb-4">
              To reschedule or cancel your appointment, please contact us at least 24 hours in advance.
            </p>
            <div className="bg-slate-900/50 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-4 h-4 text-[#f1a208]" />
                <span className="text-white">(720) 517-3111</span>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon className="w-4 h-4 text-[#f1a208]" />
                <span className="text-white">office@promedexams.com</span>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="w-4 h-4 text-[#f1a208]" />
                <span className="text-white/80 text-sm">Mon-Thu: 7:30 AM - 4:30 PM</span>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-amber-900/20 border border-amber-400/30 p-4 rounded-lg">
              <h3 className="font-semibold text-amber-400 mb-2">Cancellation Policy</h3>
              <p className="text-white/80 text-sm">
                Appointments cancelled with less than 24 hours notice may be subject to a cancellation fee.
              </p>
            </div>
            <div className="mt-4 bg-slate-900/50 p-4 rounded-lg">
              <p className="text-white/60 text-sm mb-2">Office Hours</p>
              <p className="text-white text-sm">Monday - Thursday: 7:30 AM - 4:30 PM</p>
              <p className="text-white/60 text-sm mt-1">Closed Friday, Saturday, and Sunday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Your Confirmation */}
      <div className="w-full bg-slate-800/20 p-8 rounded-2xl shadow-xl text-center">
        <h3 className="text-xl font-semibold text-white mb-3">Save Your Confirmation</h3>
        <p className="text-white/80 mb-6">
          Keep this page bookmarked or copy the link to access your appointment details anytime.
        </p>
        <button
          onClick={handleCopyLink}
          className="bg-[#f1a208] hover:bg-[#f1a208]/90 text-black font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
        >
          <CopyIcon className="w-5 h-5" />
          {copySuccess ? "Link Copied!" : "Copy Confirmation Link"}
        </button>
      </div>
    </>
  );
};

export default AppointmentConfirmedContent;
