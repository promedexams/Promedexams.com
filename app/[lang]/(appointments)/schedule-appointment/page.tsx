import Link from "next/link";
import { InfoIcon, MailPlusIcon } from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { BusinessInfo } from "@/lib/business-info";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";
import ScheduleAppointmentForm from "./_components/schedule-appointment-form";

const ScheduleAppointmentPage = async ({ params }: SupportedLanguagesProps) => {
  const dict = await getDictionary((await params).lang);
  const officeEmail = BusinessInfo.ContactInformation.OfficeEmail;

  return (
    <div className="relative m-0 flex min-h-screen w-screen flex-col bg-[#4F759B] p-0">
      <Navbar params={params} />
      <main className="z-10 flex flex-1 flex-col items-center justify-center gap-8 p-4 md:relative">
        <div className="w-full max-w-4xl pt-8 text-white md:p-8">
          <div className="mb-8 w-full rounded-2xl bg-slate-800/20 p-8 shadow-xl">
            <h1 className="mb-4 border-b pb-4 text-center text-3xl font-bold text-white sm:text-5xl">
              {dict.pages.scheduleAppointment.title}
            </h1>
            <p className="text-lg text-white/80">{dict.pages.scheduleAppointment.description}</p>
            <ul className="mt-4 space-y-3 text-lg text-white/80">
              {dict.pages.scheduleAppointment.communicationsList.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#f1a208]"></span>
                  <span>
                    {item.split(officeEmail).flatMap((part, partIndex) =>
                      partIndex === 0
                        ? [part]
                        : [
                            <Link
                              key={partIndex}
                              href={`mailto:${officeEmail}`}
                              className="hover-underline-animation text-white/90"
                            >
                              {officeEmail}
                            </Link>,
                            part,
                          ]
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl bg-slate-900/50 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-[#f1a208]/20 p-2">
                  <InfoIcon className="h-5 w-5 text-[#f1a208]" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {dict.pages.scheduleAppointment.maintenanceWindow.header}
                </h3>
              </div>
              <div className="pl-12">
                <p className="text-white/80">{dict.pages.scheduleAppointment.maintenanceWindow.subheader}</p>
                <div className="pt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 rounded-lg border-2 border-[#f1a208] px-6 py-3 font-bold text-[#f1a208] transition-all duration-200 hover:scale-105 hover:bg-[#f1a208]/20"
                  >
                    <MailPlusIcon className="h-5 w-5" />
                    <span>{dict.pages.scheduleAppointment.maintenanceWindow.contactButtonText}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <ScheduleAppointmentForm params={params} />
        </div>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default ScheduleAppointmentPage;
