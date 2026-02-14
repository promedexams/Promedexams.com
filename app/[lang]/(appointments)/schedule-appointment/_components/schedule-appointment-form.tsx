"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarSearchIcon, Check, ChevronRight, ClipboardClockIcon, Edit2, Loader2, UserIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import "react-datepicker/dist/react-datepicker.css";

import Link from "next/link";

import { ServiceTypeResponse } from "@/lib/types/api/services";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";
import { ErrorInfo, formatPhoneNumber, getErrorInfo } from "@/lib/utils/schedule-appointment";

const ScheduleAppointmentForm = ({ params }: SupportedLanguagesProps) => {
  const router = useRouter();
  const [dict, setDict] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const { executeRecaptcha } = useGoogleReCaptcha();

  // API Pulls
  const [appointmentTypes, setAppointmentTypes] = useState<ServiceTypeResponse[]>([]);

  // Form values
  // Personal Information
  const [firstName, setFirstName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Appointment Information
  const [selectedAppointmentType, setSelectedAppointmentType] = useState("");
  const [selectedAppointmentVariationVersion, setSelectedAppointmentVariationVersion] = useState<number | null>(null);
  const [newOrReturningClient, setNewOrReturningClients] = useState("");
  const [newHealthConditions, setNewHealthConditions] = useState("");
  const [newMedications, setNewMedications] = useState("");
  const [hasQuestions, setHasQuestions] = useState("");

  // Date and Time selection
  const [selectedBookingDate, setSelectedBookingDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableDays, setAvailableDays] = useState<Date[]>([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);

  // Booking Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ErrorInfo | null>(null);

  useEffect(() => {
    params.then(({ lang }) => {
      getDictionary(lang).then(setDict);
    });
  }, [params]);

  useEffect(() => {
    const fetchAppointmentTypes = async () => {
      try {
        const res = await fetch("/api/catalog/services");
        if (!res.ok) throw new Error("Failed to fetch appointment types");
        const data = await res.json();
        setAppointmentTypes(data);
      } catch {
        setError(getErrorInfo("NETWORK_ERROR"));
        setAppointmentTypes([]);
      }
    };
    fetchAppointmentTypes();
  }, []);

  useEffect(() => {
    if (!selectedAppointmentType) {
      setAvailableDays([]);
      return;
    }
    const fetchAvailableDays = async () => {
      try {
        const res = await fetch(`/api/appointments/available-days?serviceId=${selectedAppointmentType}`);
        if (!res.ok) throw new Error("Failed to fetch available days");
        const data = await res.json();
        setAvailableDays(
          data.map((dateStr: string) => {
            const [year, month, day] = dateStr.split("-").map(Number);
            return new Date(year, month - 1, day);
          })
        );
      } catch {
        setError(getErrorInfo("NETWORK_ERROR"));
        setAvailableDays([]);
      }
    };
    fetchAvailableDays();
  }, [selectedAppointmentType]);

  useEffect(() => {
    if (!selectedBookingDate || !selectedAppointmentType) {
      setAvailableTimes([]);
      setSelectedTime("");
      setIsLoadingTimes(false);
      return;
    }

    const fetchTimes = async () => {
      setIsLoadingTimes(true);
      setAvailableTimes([]);
      setSelectedTime("");

      try {
        const dateStr = selectedBookingDate.toISOString().split("T")[0];
        const res = await fetch(
          `/api/appointments/available-times?serviceId=${selectedAppointmentType}&date=${dateStr}`
        );
        if (!res.ok) throw new Error("Failed to fetch available times");
        const data = await res.json();
        setAvailableTimes(Array.isArray(data) ? data : []);
      } catch {
        setError(getErrorInfo("NETWORK_ERROR"));
        setAvailableTimes([]);
      } finally {
        setIsLoadingTimes(false); // Stop loading
      }
    };
    fetchTimes();
  }, [selectedBookingDate, selectedAppointmentType]);

  useEffect(() => {
    if (selectedBookingDate && !availableDays.some((d) => d.toDateString() === selectedBookingDate.toDateString())) {
      setSelectedBookingDate(null);
    }
  }, [availableDays, selectedBookingDate]);

  // Validation functions
  const validatePersonalInfo = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      birthday !== null &&
      email.trim() !== "" &&
      phoneNumber.trim() !== ""
    );
  };

  const validateAppointmentInfo = () => {
    const baseValidation =
      selectedAppointmentType !== "" &&
      selectedAppointmentVariationVersion !== null &&
      newOrReturningClient !== "" &&
      hasQuestions !== "";

    if (newOrReturningClient === "returning") {
      return baseValidation && newHealthConditions !== "" && newMedications !== "";
    }

    return baseValidation;
  };

  const validateCalendarBooking = () => {
    return selectedBookingDate !== null && selectedTime !== "";
  };

  const handleAppointmentTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedService = appointmentTypes.find((service) => service.id === selectedId);

    if (selectedService) {
      setSelectedAppointmentType(selectedService.id);
      setSelectedAppointmentVariationVersion(Number(selectedService.variationVersion));
      setSelectedBookingDate(null);
      setSelectedTime("");
      setAvailableTimes([]);
    }
  };

  const handleNextStep = (step: number) => {
    let isValid = false;

    switch (step) {
      case 1:
        isValid = validatePersonalInfo();
        break;
      case 2:
        isValid = validateAppointmentInfo();
        break;
      case 3:
        isValid = validateCalendarBooking();
        break;
      default:
        isValid = false;
    }

    if (isValid) {
      setError(null);
      setCompletedSteps((prev) => new Set([...prev, step]));
      setCurrentStep(step + 1);
    } else {
      setError(getErrorInfo("VALIDATION_ERROR"));
    }
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validatePersonalInfo() || !validateAppointmentInfo() || !validateCalendarBooking()) {
      setError(getErrorInfo("VALIDATION_ERROR"));
      return;
    }

    if (!executeRecaptcha) {
      console.error("Execute recaptcha not yet available");
      setError(getErrorInfo("NETWORK_ERROR"));
      return;
    }

    setIsSubmitting(true);

    try {
      const gRecaptchaToken = await executeRecaptcha("appointmentSubmit");

      const bookingData: {
        firstName: string;
        middleInitial?: string;
        lastName: string;
        birthday: string;
        email: string;
        phoneNumber: string;
        serviceId: string;
        serviceVariationVersion: number | null;
        newOrReturningClient: "new" | "returning";
        newHealthConditions?: "yes" | "no";
        newMedications?: "yes" | "no";
        hasQuestions: "yes" | "no";
        appointmentDate: string;
        appointmentTime: string;
        gRecaptchaToken: string;
      } = {
        // Personal Information
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        birthday: birthday!.toISOString().split("T")[0], // Convert to YYYY-MM-DD
        email: email.trim().toLowerCase(),
        phoneNumber: phoneNumber,

        // Appointment Information
        serviceId: selectedAppointmentType,
        serviceVariationVersion: selectedAppointmentVariationVersion,
        newOrReturningClient: newOrReturningClient as "new" | "returning",
        newHealthConditions: newHealthConditions as "yes" | "no" | undefined,
        newMedications: newMedications as "yes" | "no" | undefined,
        hasQuestions: hasQuestions as "yes" | "no",

        // Date/Time
        appointmentDate: selectedBookingDate!.toISOString().split("T")[0],
        appointmentTime: selectedTime,

        // Security
        gRecaptchaToken,
      };

      if (middleInitial.trim() !== "") {
        bookingData.middleInitial = middleInitial.trim();
      }

      const response = await fetch("/api/appointments/create-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (result.success) {
        const selectedService = appointmentTypes.find((service) => service.id === selectedAppointmentType);
        const appointmentTypeName = selectedService ? selectedService.name : "Unknown";

        const queryParams = new URLSearchParams({
          bookingId: result.bookingId,
          customerId: result.customerId,
          appointmentType: appointmentTypeName,
          appointmentDate: selectedBookingDate!.toISOString().split("T")[0],
          appointmentTime: selectedTime,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          phoneNumber: phoneNumber,
        });

        router.push(`/schedule-appointment/appointment-confirmed?${queryParams.toString()}`);
      } else {
        setError(getErrorInfo(result.code || "UNKNOWN_ERROR"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(getErrorInfo("NETWORK_ERROR"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!dict || appointmentTypes.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="w-24 h-24 animate-spin" />
      </div>
    );
  }

  const steps = [
    {
      number: 1,
      title: dict.pages.scheduleAppointment.scheduleForm.steps.personalInfoStep.title,
      isCompleted: completedSteps.has(1),
    },
    {
      number: 2,
      title: dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.title,
      isCompleted: completedSteps.has(2),
    },
    {
      number: 3,
      title: dict.pages.scheduleAppointment.scheduleForm.steps.calendarBookingStep.title,
      isCompleted: completedSteps.has(3),
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      {/* Error Display */}
      <Dialog
        open={!!error}
        onOpenChange={(open) => {
          if (!open) setError(null);
        }}
      >
        <DialogContent className="bg-red-900">
          <DialogHeader>
            <DialogTitle className={error?.severity === "error" ? "text-white" : "text-yellow-400"}>
              {error?.title}
            </DialogTitle>
            <DialogDescription>
              <div className="text-white mb-2">{error?.message}</div>
              {error?.action && <div className="text-sm text-white/90 mt-1">{error.action}</div>}
              <hr className="my-4 border-t border-white/30" />
              <div className="text-white">
                If the problem persists, please visit our{" "}
                <Link href="/contact" className="underline">
                  contact page
                </Link>{" "}
                and give us a call or send us an email.
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Progress Indicator */}
      <div className="w-full bg-slate-800/20 p-6 mb-8 rounded-2xl shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-center">
          {/* Mobile vertical stepper */}
          <div className="flex flex-col gap-0 sm:hidden relative justify-center h-full">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-start relative min-h-[64px] last:min-h-0">
                {/* Step circle */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      step.isCompleted
                        ? "bg-green-600 text-white shadow-lg"
                        : currentStep === step.number
                          ? "bg-[#f1a208] text-black shadow-lg"
                          : "bg-slate-600 text-white"
                    }`}
                  >
                    {step.isCompleted ? <Check className="w-6 h-6" /> : step.number}
                  </div>
                  {/* Vertical line below the circle, except for last step */}
                  {index < steps.length - 1 && (
                    <div
                      className={`w-1 flex-1 min-h-[48px] ${
                        steps[index].isCompleted ? "bg-green-600" : "bg-slate-600"
                      }`}
                      style={{ marginTop: 0 }}
                    />
                  )}
                </div>
                {/* Step text */}
                <div className="ml-4 flex flex-col justify-center min-h-[48px]">
                  <span
                    className={`font-medium text-base ${
                      step.isCompleted || currentStep === step.number ? "text-white" : "text-white/60"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop horizontal stepper */}
          <div className="hidden sm:flex flex-row items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col sm:flex-row items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      step.isCompleted
                        ? "bg-green-600 text-white shadow-lg"
                        : currentStep === step.number
                          ? "bg-[#f1a208] text-black shadow-lg"
                          : "bg-slate-600 text-white"
                    }`}
                  >
                    {step.isCompleted ? <Check className="w-6 h-6" /> : step.number}
                  </div>
                  <span
                    className={`mt-2 font-medium text-sm text-center max-w-24 ${
                      step.isCompleted || currentStep === step.number ? "text-white" : "text-white/60"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex items-center my-4 sm:my-0 sm:mx-8">
                    <div
                      className={`w-1 h-12 sm:w-24 sm:h-1 rounded-full transition-all duration-300 ${
                        step.isCompleted ? "bg-green-600" : "bg-slate-600"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step 1: Personal Information */}
      <div
        className={`w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl space-y-6 ${
          currentStep !== 1 && !completedSteps.has(1) ? "opacity-50" : ""
        }`}
      >
        <div className="flex gap-2 items-center justify-between">
          <div className="flex flex-row gap-2 items-center">
            <UserIcon className="hidden sm:flex" />
            <h2 className="text-2xl font-bold text-white">
              {dict.pages.scheduleAppointment.scheduleForm.steps.personalInfoStep.title}
            </h2>
          </div>
          {completedSteps.has(1) && currentStep !== 1 && (
            <button
              type="button"
              onClick={() => handleEditStep(1)}
              className="bg-transparent hover:bg-[#f1a208] border-2 border-[#f1a208] duration-200 font-bold text-lg whitespace-normal text-center px-2 py-1 rounded-lg flex items-center gap-2 text-[#f1a208] hover:text-black transition-colors cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
              {dict.pages.scheduleAppointment.scheduleForm.steps.editFormText}
            </button>
          )}
        </div>

        {(currentStep === 1 || completedSteps.has(1)) && (
          <>
            <div className="flex flex-col sm:flex-row w-full gap-4 sm:items-end">
              <div className="flex-1">
                <label className="block text-white text-lg font-semibold mb-2" htmlFor="firstName">
                  {dict.pages.scheduleAppointment.scheduleForm.steps.personalInfoStep.firstName.label}
                  <span className="font-bold text-[#f1a208] select-none"> *</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  maxLength={50}
                  required
                  disabled={completedSteps.has(1) && currentStep !== 1}
                  className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none disabled:opacity-50"
                  placeholder={
                    dict.pages.scheduleAppointment.scheduleForm.steps.personalInfoStep.firstName.placeholderText
                  }
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="sm:basis-1/6">
                <label className="block text-white text-lg font-semibold mb-2" htmlFor="middleInitial">
                  {dict.pages.scheduleAppointment.scheduleForm.steps.personalInfoStep.middleInitial.label}
                </label>
                <input
                  id="middleInitial"
                  name="middleInitial"
                  type="text"
                  maxLength={3}
                  disabled={completedSteps.has(1) && currentStep !== 1}
                  className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none disabled:opacity-50"
                  placeholder={
                    dict.pages.scheduleAppointment.scheduleForm.steps.personalInfoStep.middleInitial.placeholderText
                  }
                  value={middleInitial}
                  onChange={(e) => setMiddleInitial(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-white text-lg font-semibold mb-2" htmlFor="lastName">
                  {dict.pages.scheduleAppointment.scheduleForm.steps.personalInfoStep.lastName.label}
                  <span className="font-bold text-[#f1a208] select-none"> *</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  maxLength={50}
                  required
                  disabled={completedSteps.has(1) && currentStep !== 1}
                  className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none disabled:opacity-50"
                  placeholder={
                    dict.pages.scheduleAppointment.scheduleForm.steps.personalInfoStep.lastName.placeholderText
                  }
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-4 sm:items-end">
              <div className="flex-1">
                <label className="block text-white text-lg font-semibold mb-2" htmlFor="birthday">
                  {dict.pages.scheduleAppointment.scheduleForm.steps.personalInfoStep.dateOfBirth.label}
                  <span className="font-bold text-[#f1a208] select-none"> *</span>
                </label>
                <div className="w-full">
                  <DatePicker
                    selected={birthday}
                    onChange={(date) => setBirthday(date)}
                    maxDate={new Date()}
                    dropdownMode="select"
                    showYearDropdown
                    showMonthDropdown
                    disabled={completedSteps.has(1) && currentStep !== 1}
                    className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none disabled:opacity-50"
                    placeholderText="##/##/####"
                    dateFormat="MM/dd/yyyy"
                    wrapperClassName="w-full"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-white text-lg font-semibold mb-2" htmlFor="email">
                  {dict.pages.scheduleAppointment.scheduleForm.steps.personalInfoStep.email.label}
                  <span className="font-bold text-[#f1a208] select-none"> *</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  maxLength={254}
                  required
                  disabled={completedSteps.has(1) && currentStep !== 1}
                  className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none disabled:opacity-50"
                  placeholder={dict.pages.scheduleAppointment.scheduleForm.steps.personalInfoStep.email.placeholderText}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-white text-lg font-semibold mb-2" htmlFor="phone">
                  {dict.pages.scheduleAppointment.scheduleForm.steps.personalInfoStep.phoneNumber.label}
                  <span className="font-bold text-[#f1a208] select-none"> *</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  disabled={completedSteps.has(1) && currentStep !== 1}
                  className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none disabled:opacity-50"
                  placeholder="(###) ### - ####"
                  maxLength={19}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                />
              </div>
            </div>

            {currentStep === 1 && (
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => handleNextStep(1)}
                  disabled={!validatePersonalInfo()}
                  className="flex items-center gap-2 bg-[#f1a208] hover:bg-[#f1a208]/90 disabled:bg-slate-600 disabled:cursor-not-allowed text-black disabled:text-white text-lg font-bold px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  {dict.pages.scheduleAppointment.scheduleForm.steps.continueText}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Step 2: Appointment Information */}
      {(currentStep >= 2 || completedSteps.has(2)) && (
        <div
          className={`w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl space-y-6 ${
            currentStep !== 2 && !completedSteps.has(2) ? "opacity-50" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-row gap-2 items-center">
              <ClipboardClockIcon className="hidden sm:flex" />
              <h2 className="text-2xl font-bold text-white">
                {dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.title}
              </h2>
            </div>
            {completedSteps.has(2) && currentStep !== 2 && (
              <button
                type="button"
                onClick={() => handleEditStep(2)}
                className="bg-transparent hover:bg-[#f1a208] border-2 border-[#f1a208] duration-200 font-bold text-lg whitespace-normal text-center px-2 py-1 rounded-lg flex items-center gap-2 text-[#f1a208] hover:text-black transition-colors cursor-pointer"
              >
                <Edit2 className="w-4 h-4" />
                {dict.pages.scheduleAppointment.scheduleForm.steps.editFormText}
              </button>
            )}
          </div>

          {(currentStep === 2 || completedSteps.has(2)) && (
            <>
              <div>
                <label className="block text-white text-lg font-semibold mb-2" htmlFor="appointmentType">
                  {dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.typeOfExam.label}
                  <span className="font-bold text-[#f1a208] select-none"> *</span>
                </label>
                <select
                  id="appointmentType"
                  name="appointmentType"
                  required
                  disabled={completedSteps.has(2) && currentStep !== 2}
                  className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  value={selectedAppointmentType}
                  onChange={handleAppointmentTypeChange}
                >
                  <option value="" disabled>
                    {dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.typeOfExam.placeholderText}
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
                  {dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.newOrReturningClient.label}
                  <span className="font-bold text-[#f1a208] select-none"> *</span>
                </label>
                <select
                  id="newOrReturningClient"
                  name="newOrReturningClient"
                  required
                  disabled={completedSteps.has(2) && currentStep !== 2}
                  className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  value={newOrReturningClient}
                  onChange={(e) => setNewOrReturningClients(e.target.value)}
                >
                  <option value="" disabled>
                    {
                      dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.newOrReturningClient
                        .placeholderText
                    }
                  </option>
                  <option value="new">
                    {
                      dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.newOrReturningClient
                        .options[0]
                    }
                  </option>
                  <option value="returning">
                    {
                      dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.newOrReturningClient
                        .options[1]
                    }
                  </option>
                </select>
              </div>
              {newOrReturningClient === "returning" && (
                <>
                  <div>
                    <label className="block text-white text-lg font-semibold mb-2" htmlFor="newHeathConditions">
                      {
                        dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.healthIssuesSinceLastExam
                          .label
                      }
                      <span className="font-bold text-[#f1a208] select-none"> *</span>
                    </label>
                    <select
                      id="newHeathConditions"
                      name="newHeathConditions"
                      required
                      disabled={completedSteps.has(2) && currentStep !== 2}
                      className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      value={newHealthConditions}
                      onChange={(e) => setNewHealthConditions(e.target.value)}
                    >
                      <option value="" disabled>
                        {
                          dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep
                            .healthIssuesSinceLastExam.placeholderText
                        }
                      </option>
                      <option value="yes">
                        {
                          dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep
                            .healthIssuesSinceLastExam.options[0]
                        }
                      </option>
                      <option value="no">
                        {
                          dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep
                            .healthIssuesSinceLastExam.options[1]
                        }
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-white text-lg font-semibold mb-2"
                      htmlFor="newMedicationsOrSupplements"
                    >
                      {
                        dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.medicationsSinceLastExam
                          .label
                      }
                      <span className="font-bold text-[#f1a208] select-none"> *</span>
                    </label>
                    <select
                      id="newMedicationsOrSupplements"
                      name="newMedicationsOrSupplements"
                      required
                      disabled={completedSteps.has(2) && currentStep !== 2}
                      className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      value={newMedications}
                      onChange={(e) => setNewMedications(e.target.value)}
                    >
                      <option value="" disabled>
                        {
                          dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.medicationsSinceLastExam
                            .placeholderText
                        }
                      </option>
                      <option value="yes">
                        {
                          dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.medicationsSinceLastExam
                            .options[0]
                        }
                      </option>
                      <option value="no">
                        {
                          dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.medicationsSinceLastExam
                            .options[1]
                        }
                      </option>
                    </select>
                  </div>
                </>
              )}
              <div>
                <label className="block text-white text-lg font-semibold" htmlFor="hasQuestions">
                  {dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.questionsOrConcerns.label}
                  <span className="font-bold text-[#f1a208] select-none"> *</span>
                </label>
                <p className="block text-white/80 text-base font-normal mb-2">
                  {dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.questionsOrConcerns.detail}
                </p>
                <select
                  id="hasQuestions"
                  name="hasQuestions"
                  required
                  disabled={completedSteps.has(2) && currentStep !== 2}
                  className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  value={hasQuestions}
                  onChange={(e) => setHasQuestions(e.target.value)}
                >
                  <option value="" disabled>
                    {
                      dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.questionsOrConcerns
                        .placeholderText
                    }
                  </option>
                  <option value="yes">
                    {
                      dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.questionsOrConcerns
                        .options[0]
                    }
                  </option>
                  <option value="no">
                    {
                      dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.questionsOrConcerns
                        .options[1]
                    }
                  </option>
                </select>
                {hasQuestions === "yes" && (
                  <div className="mt-4 bg-blue-900/50 border-l-4 border-blue-400 p-4 rounded">
                    <h3 className="font-bold text-xl text-blue-300 mb-2">
                      {
                        dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.questionsOrConcerns
                          .noteBox.title
                      }
                    </h3>
                    <div className="flex flex-col items-start text-start gap-4">
                      {dict.pages.scheduleAppointment.scheduleForm.steps.appointmentInfoStep.questionsOrConcerns.noteBox.messageParagraphs.map(
                        (paragraph: string, idx: number) => (
                          <p key={idx} className="text-white text-base">
                            {paragraph}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              {currentStep === 2 && (
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => handleNextStep(2)}
                    disabled={!validateAppointmentInfo()}
                    className="flex items-center gap-2 bg-[#f1a208] hover:bg-[#f1a208]/90 disabled:bg-slate-600 disabled:cursor-not-allowed text-black disabled:text-white text-lg font-bold px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    {dict.pages.scheduleAppointment.scheduleForm.steps.continueText}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Step 3: Calendar Booking */}
      {(currentStep >= 3 || completedSteps.has(3)) && (
        <div
          className={`w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl space-y-6 ${
            currentStep !== 3 && !completedSteps.has(3) ? "opacity-50" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-row gap-2 items-center">
              <CalendarSearchIcon className="hidden sm:flex" />
              <h2 className="text-2xl font-bold text-white">
                {dict.pages.scheduleAppointment.scheduleForm.steps.calendarBookingStep.title}
              </h2>
            </div>
            {completedSteps.has(3) && currentStep !== 3 && (
              <button
                type="button"
                onClick={() => handleEditStep(3)}
                className="bg-transparent hover:bg-[#f1a208] border-2 border-[#f1a208] duration-200 font-bold text-lg whitespace-normal text-center px-2 py-1 rounded-lg flex items-center gap-2 text-[#f1a208] hover:text-black transition-colors cursor-pointer"
              >
                <Edit2 className="w-4 h-4" />
                {dict.pages.scheduleAppointment.scheduleForm.steps.editFormText}
              </button>
            )}
          </div>

          {(currentStep === 3 || completedSteps.has(3)) && (
            <>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-white text-lg font-semibold mb-2">
                    {dict.pages.scheduleAppointment.scheduleForm.steps.calendarBookingStep.selectDate.label}
                    <span className="font-bold text-[#f1a208] select-none"> *</span>
                  </label>
                  <div className="w-full">
                    <DatePicker
                      selected={selectedBookingDate}
                      onChange={(date) => setSelectedBookingDate(date)}
                      minDate={new Date()}
                      includeDates={availableDays}
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                      disabled={completedSteps.has(3) && currentStep !== 3}
                      className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none disabled:opacity-50"
                      placeholderText={
                        dict.pages.scheduleAppointment.scheduleForm.steps.calendarBookingStep.selectDate.placeholderText
                      }
                      dateFormat="MMMM d, yyyy"
                      wrapperClassName="w-full"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-white text-lg font-semibold mb-2">
                    {dict.pages.scheduleAppointment.scheduleForm.steps.calendarBookingStep.selectTime.label}
                    <span className="font-bold text-[#f1a208] select-none"> *</span>
                  </label>
                  <div className="relative">
                    {isLoadingTimes && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
                        <Loader2 className="w-5 h-5 animate-spin text-white/80" />
                      </span>
                    )}
                    <select
                      className={`w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none cursor-pointer transition-opacity duration-200 disabled:opacity-50 disabled:bg-slate-700 disabled:cursor-not-allowed ${isLoadingTimes ? "pl-10" : ""}`}
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      disabled={
                        !selectedBookingDate ||
                        isLoadingTimes ||
                        availableTimes.length === 0 ||
                        (completedSteps.has(3) && currentStep !== 3)
                      }
                    >
                      <option value="" disabled>
                        {!selectedBookingDate
                          ? dict.pages.scheduleAppointment.scheduleForm.steps.calendarBookingStep.selectTime
                              .nothingSelectedText
                          : isLoadingTimes
                            ? dict.pages.scheduleAppointment.scheduleForm.steps.calendarBookingStep.selectTime
                                .checkingAvailabilityText
                            : availableTimes.length === 0
                              ? dict.pages.scheduleAppointment.scheduleForm.steps.calendarBookingStep.selectTime
                                  .noAppointmentsText
                              : dict.pages.scheduleAppointment.scheduleForm.steps.calendarBookingStep.selectTime
                                  .selectTimeText}
                      </option>
                      {!isLoadingTimes &&
                        availableTimes.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              {currentStep === 3 && (
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => handleNextStep(3)}
                    disabled={!validateCalendarBooking()}
                    className="flex items-center gap-2 bg-[#f1a208] hover:bg-[#f1a208]/90 disabled:bg-slate-600 disabled:cursor-not-allowed text-black disabled:text-white text-lg font-bold px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    {dict.pages.scheduleAppointment.scheduleForm.steps.continueText}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Final Step - All completed */}
      {completedSteps.has(3) && currentStep === 4 && (
        <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl text-center">
          <div className="text-green-500 mb-4">
            <Check className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {dict.pages.scheduleAppointment.scheduleForm.steps.submissionStep.title}
          </h2>
          <p className="text-white/80 mb-6">
            {dict.pages.scheduleAppointment.scheduleForm.steps.submissionStep.description}
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#f1a208] hover:bg-[#f1a208]/90 disabled:bg-slate-600 disabled:cursor-not-allowed text-black disabled:text-white text-lg font-bold py-3 px-8 rounded-lg transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center gap-2 mx-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {dict.pages.scheduleAppointment.scheduleForm.steps.submissionStep.schedulingAppointmentButtonText}
              </>
            ) : (
              dict.pages.scheduleAppointment.scheduleForm.steps.submissionStep.scheduleAppointmentButtonText
            )}
          </button>
          <p className="text-white/60 text-sm text-center mt-4">
            This site is protected by reCAPTCHA and the Google{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f1a208] hover:underline"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f1a208] hover:underline"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      )}
    </form>
  );
};

export default ScheduleAppointmentForm;
