"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarIcon, CheckCircleIcon, ClockIcon, InfoIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react";

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
    "Appointment Info": {
      title: "Appointment Type Title Goes Here",
      description: "Description of the appointment type goes here",
      duration: "Duration Goes Here",
      instructions: ["Instruction 1", "Instruction 2", "Instruction 3", "Instruction 4", "Etc..."],
      additionalNotes: [
        "Additional Notes 1",
        "Additional Notes 2",
        "Additional Notes 3",
        "Additional Notes 4",
        "Etc...",
      ],
    },
  };

  return appointmentInfo[0];
};

const AppointmentConfirmedContent = ({ dict }: AppointmentConfirmedContentProps) => {
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

  if (!bookingDetails) {
    return (
      <div className="w-full bg-slate-800/20 p-8 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Booking Not Found</h1>
        <p className="text-white/80">
          We couldn't find your booking confirmation. Please contact our office if you believe this is an error.
        </p>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Confirmation Header */}
      <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl text-center">
        <div className="text-green-500 mb-4">
          <CheckCircleIcon className="w-16 h-16 mx-auto" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-white">Appointment Confirmed!</h1>
        <p className="text-lg text-white/80 mb-4">Your appointment has been successfully scheduled.</p>
        <div className="bg-slate-900/50 p-4 rounded-lg">
          <p className="text-sm text-white/60">Booking ID:</p>
          <p className="text-lg font-mono text-white font-bold">{bookingDetails.bookingId}</p>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <CalendarIcon className="w-6 h-6" />
          Appointment Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg">
              <UserIcon className="w-5 h-5 text-[#f1a208]" />
              <div>
                <p className="text-sm text-white/60">Patient</p>
                <p className="text-white font-semibold">
                  {bookingDetails.firstName} {bookingDetails.lastName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg">
              <ClockIcon className="w-5 h-5 text-[#f1a208]" />
              <div>
                <p className="text-sm text-white/60">Date & Time</p>
                <p className="text-white font-semibold">{formatDate(bookingDetails.appointmentDate)}</p>
                <p className="text-white">{bookingDetails.appointmentTime}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg">
              <InfoIcon className="w-5 h-5 text-[#f1a208]" />
              <div>
                <p className="text-sm text-white/60">Appointment Type</p>
                <p className="text-white font-semibold">{appointmentTypeInfo?.title}</p>
                <p className="text-white/80 text-sm">{appointmentTypeInfo?.duration}</p>
              </div>
            </div>

            {bookingDetails.email && (
              <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg">
                <MailIcon className="w-5 h-5 text-[#f1a208]" />
                <div>
                  <p className="text-sm text-white/60">Email</p>
                  <p className="text-white font-semibold">{bookingDetails.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Information */}
      {appointmentTypeInfo && (
        <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">What to Expect</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">About Your Appointment</h3>
            <p className="text-white/80 mb-4">{appointmentTypeInfo.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">What to Bring:</h3>
            <ul className="space-y-2">
              {appointmentTypeInfo.instructions.map((instruction: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-white/80">
                  <span className="w-2 h-2 bg-[#f1a208] rounded-full mt-2 flex-shrink-0"></span>
                  {instruction}
                </li>
              ))}
            </ul>
          </div>

          {appointmentTypeInfo.additionalNotes && (
            <div className="bg-blue-900/30 border-l-4 border-blue-400 p-4 rounded">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Important Notes:</h3>
              <ul className="space-y-1">
                {appointmentTypeInfo.additionalNotes.map((note: string, index: number) => (
                  <li key={index} className="text-white/80 text-sm">
                    • {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Contact Information */}
      <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Need to Make Changes?</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-white/80">
              If you need to reschedule or cancel your appointment, please contact our office at least 24 hours in
              advance.
            </p>

            <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg">
              <PhoneIcon className="w-5 h-5 text-[#f1a208]" />
              <div>
                <p className="text-sm text-white/60">Office Phone</p>
                <p className="text-white font-semibold">(555) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-amber-900/30 border-l-4 border-amber-400 p-4 rounded">
              <h3 className="font-semibold text-amber-300 mb-2">Cancellation Policy:</h3>
              <p className="text-white/80 text-sm">
                Cancellations made less than 24 hours before your appointment may be subject to a cancellation fee.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Link */}
      <div className="w-full bg-slate-800/20 p-8 rounded-2xl shadow-xl text-center">
        <h3 className="text-lg font-semibold text-white mb-4">Save This Confirmation</h3>
        <p className="text-white/80 mb-4">
          Bookmark this page or copy the link below to access your appointment details anytime.
        </p>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
          }}
          className="bg-[#f1a208] hover:bg-[#f1a208]/90 text-black font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Copy Confirmation Link
        </button>
      </div>
    </>
  );
};

export default AppointmentConfirmedContent;
