"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";
import { formatPhoneNumber } from "@/lib/utils/schedule-appointment";

const ScheduleAppointmentForm = ({ params }: SupportedLanguagesProps) => {
  const [dict, setDict] = useState<any>(null);

  // Form values
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    params.then(({ lang }) => {
      getDictionary(lang).then(setDict);
    });
  }, [params]);

  if (!dict) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="w-24 h-24 animate-spin" />
      </div>
    );
  }

  return (
    <form>
      <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-white pb-4 border-b">Personal Information</h2>
        <div className="flex flex-row w-full gap-4">
          <div className="flex-1">
            <label className="block text-white text-lg font-semibold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              maxLength={50}
              required
              className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none"
              placeholder="Enter your first name"
            />
          </div>
          <div className="basis-1/6">
            <label className="block text-white text-lg font-semibold mb-2" htmlFor="middleInitial">
              Middle Initial
            </label>
            <input
              id="middleInitial"
              name="middleInitial"
              type="text"
              maxLength={3}
              required
              className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none"
              placeholder="M.I."
            />
          </div>
          <div className="flex-1">
            <label className="block text-white text-lg font-semibold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              maxLength={50}
              required
              className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none"
              placeholder="Enter your last name"
            />
          </div>
        </div>
        <div className="flex flex-row w-full gap-4">
          <div className="flex-1">
            <label className="block text-white text-lg font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              maxLength={254}
              required
              className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex-1">
            <label className="block text-white text-lg font-semibold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none"
              placeholder="(###) ### - ####"
              maxLength={19}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-white pb-4 border-b">Appointment Information</h2>
        <div>
          <label className="block text-white text-lg font-semibold mb-2" htmlFor="appointmentType">
            What type of exam are you scheduling?
          </label>
          <select
            id="appointmentType"
            name="appointmentType"
            required
            className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>
              Select appointment type
            </option>
            <option value="consultation">Pre-Exam Consultation</option>
            <option value="immigration">USCIS Immigration Medical Exam</option>
            <option value="faa">FAA Pilot Physical (2nd & 3rd Class)</option>
            <option value="dot">DOT Driver Physical</option>
            <option value="school">School/Sports/Camp Physical</option>
          </select>
        </div>
        <div>
          <label className="block text-white text-lg font-semibold mb-2" htmlFor="newOrReturningCustomer">
            Are you a new or returning client?
          </label>
          <select
            id="newOrReturningCustomer"
            name="newOrReturningCustomer"
            required
            className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>
              Select patient type
            </option>
            <option value="new">New Patient</option>
            <option value="returning">Returning Patient</option>
          </select>
        </div>
        <div>
          <label className="block text-white text-lg font-semibold" htmlFor="hasQuestions">
            Do you have any questions/concerns to discuss with Dr. Quigley prior to your examination?
          </label>
          <p className="block text-white/80 text-base font-normal mb-2">
            Sometimes it is best to discuss potential issues <span className="underline">prior to</span> initiating the
            examination/certification process to improve the possibility of receiving certification as soon as possible.
          </p>
          <select
            id="hasQuestions"
            name="hasQuestions"
            required
            className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>
              Select option
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
      <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-white pb-4 border-b">Calendar Booking</h2>
        <button
          type="submit"
          className="w-full bg-[#f1a208] hover:bg-[#f1a208]/90 text-black text-lg font-bold py-3 rounded-lg transition-transform duration-200 hover:scale-105 cursor-pointer"
          disabled={true}
        >
          Schedule Appointment
        </button>
      </div>
    </form>
  );
};

export default ScheduleAppointmentForm;
