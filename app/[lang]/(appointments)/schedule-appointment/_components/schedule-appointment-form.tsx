"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { AppointmentOption } from "@/lib/types/api/appointment-option";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";
import { formatPhoneNumber } from "@/lib/utils/schedule-appointment";

const ScheduleAppointmentForm = ({ params }: SupportedLanguagesProps) => {
  const [dict, setDict] = useState<any>(null);

  // API Pulls
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentOption[]>([]);

  // Form values
  // Personal Information
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Appointment Information
  const [selectedAppointmentType, setSelectedAppointmentType] = useState("");
  const [newOrReturningClient, setNewOrReturningClients] = useState("");
  const [hasQuestions, setHasQuestions] = useState("");

  // Date and Time selection
  const [selectedBookingDate, setSelectedBookingDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableDays, setAvailableDays] = useState<Date[]>([]);

  useEffect(() => {
    params.then(({ lang }) => {
      getDictionary(lang).then(setDict);
    });
  }, [params]);

  useEffect(() => {
    const fetchAppointmentTypes = async () => {
      const res = await fetch("/api/catalog/services");
      const data = await res.json();
      setAppointmentTypes(data);
    };
    fetchAppointmentTypes();
  }, []);

  useEffect(() => {
    if (!selectedAppointmentType) {
      setAvailableDays([]);
      return;
    }
    const fetchAvailableDays = async () => {
      const res = await fetch(`/api/appointments/available-days?serviceId=${selectedAppointmentType}`);
      const data = await res.json();

      try {
        setAvailableDays(
          data.map((dateStr: string) => {
            // Convert to local timezone
            const [year, month, day] = dateStr.split("-").map(Number);
            return new Date(year, month - 1, day);
          })
        );
      } catch {
        setAvailableDays([]);
      }
    };
    fetchAvailableDays();
  }, [selectedAppointmentType]);

  useEffect(() => {
    if (!selectedBookingDate || !selectedAppointmentType) {
      setAvailableTimes([]);
      setSelectedTime("");
      return;
    }

    const fetchTimes = async () => {
      const dateStr = selectedBookingDate.toISOString().split("T")[0];
      const res = await fetch(`/api/appointments/available-times?serviceId=${selectedAppointmentType}&date=${dateStr}`);
      const data = await res.json();
      setAvailableTimes(Array.isArray(data) ? data : []);
      setSelectedTime("");
    };
    fetchTimes();
  }, [selectedBookingDate, selectedAppointmentType]);

  useEffect(() => {
    if (selectedBookingDate && !availableDays.some((d) => d.toDateString() === selectedBookingDate.toDateString())) {
      setSelectedBookingDate(null);
    }
  }, [availableDays, selectedBookingDate]);

  if (!dict || appointmentTypes.length === 0) {
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
            <label className="block text-white text-lg font-semibold mb-2" htmlFor="birthday">
              Birthday
            </label>
            <DatePicker
              selected={birthday}
              onChange={(date) => setBirthday(date)}
              maxDate={new Date()}
              dropdownMode="select"
              showYearDropdown
              showMonthDropdown
              className="p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none"
              placeholderText="##/##/####"
              dateFormat="MM/dd/yyyy"
            />
          </div>
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
            value={selectedAppointmentType}
            onChange={(e) => setSelectedAppointmentType(e.target.value)}
          >
            <option value="" disabled>
              Select appointment type
            </option>
            {appointmentTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-white text-lg font-semibold mb-2" htmlFor="newOrReturningClient">
            Are you a new or returning client?
          </label>
          <select
            id="newOrReturningClient"
            name="newOrReturningClient"
            required
            className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none cursor-pointer"
            value={newOrReturningClient}
            onChange={(e) => setNewOrReturningClients(e.target.value)}
          >
            <option value="" disabled>
              Select client type
            </option>
            <option value="new">New Client</option>
            <option value="returning">Returning Client</option>
          </select>
        </div>
        {newOrReturningClient === "returning" && (
          <>
            <div>
              <label className="block text-white text-lg font-semibold mb-2" htmlFor="newHeathConditions">
                Do you have any new health issues since your last examination?
              </label>
              <select
                id="newHeathConditions"
                name="newHeathConditions"
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
            <div>
              <label className="block text-white text-lg font-semibold mb-2" htmlFor="newMedicationsOrSupplements">
                Are you taking any new medications/supplements (prescribed or over-the-counter) since your last
                examination?
              </label>
              <select
                id="newMedicationsOrSupplements"
                name="newMedicationsOrSupplements"
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
          </>
        )}
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
            value={hasQuestions}
            onChange={(e) => setHasQuestions(e.target.value)}
          >
            <option value="" disabled>
              Select option
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {hasQuestions === "yes" && (
            <div className="mt-4 bg-blue-900/50 border-l-4 border-blue-400 p-4 rounded">
              <h3 className="font-bold text-xl text-blue-300 mb-2">NOTE:</h3>
              <p className="text-white text-base">
                You can schedule a pre-exam consultation appointment with Dr. Quigley before scheduling your exam to
                discuss any potential issues, questions, or concerns with the goal of making the certification process
                as smooth as possible.
                <br />
                <br />
                Consultations will be billed by time spent during the consultation. Time spent by Dr. Quigley making
                phone calls on your behalf or reviewing your medical or legal records after a consultation or medical
                examination will also be billed.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-white pb-4 border-b">Calendar Booking</h2>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div>
            <label className="block text-white text-lg font-semibold mb-2">Select Date</label>
            <DatePicker
              selected={selectedBookingDate}
              onChange={(date) => setSelectedBookingDate(date)}
              minDate={new Date()}
              includeDates={availableDays}
              dropdownMode="select"
              showMonthDropdown
              showYearDropdown
              className="p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none"
              placeholderText="Choose a date"
              dateFormat="MMMM d, yyyy"
            />
          </div>
          <div className="flex-1">
            <label className="block text-white text-lg font-semibold mb-2">Select Time</label>
            <select
              className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none cursor-pointer transition-opacity duration-200 disabled:opacity-60 disabled:bg-slate-700 disabled:cursor-not-allowed"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              disabled={!selectedBookingDate || availableTimes.length === 0}
            >
              <option value="" disabled>
                {selectedBookingDate
                  ? availableTimes.length === 0
                    ? "No appointments available for this day"
                    : "Select a time"
                  : "Select a date first"}
              </option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
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
