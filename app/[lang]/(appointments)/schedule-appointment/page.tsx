import Link from "next/link";
import { InfoIcon, MailPlusIcon } from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";
import ScheduleAppointmentForm from "./_components/schedule-appointment-form";

const ScheduleAppointmentPage = async ({ params }: SupportedLanguagesProps) => {
  const dict = await getDictionary((await params).lang);

  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-8 flex-1 justify-center items-center p-4 z-10">
        <div className="text-white w-full max-w-4xl pt-8 md:p-8 ">
          <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-center text-white pb-4 border-b">
              {dict.pages.scheduleAppointment.title}
            </h1>
            <p className="text-lg text-white/80 text-center">{dict.pages.scheduleAppointment.description}</p>
          </div>
          <div className="w-full mb-6">
            <div className="bg-slate-900/50 p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#f1a208]/20 p-2 rounded-lg">
                  <InfoIcon className="w-5 h-5 text-[#f1a208]" />
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
                    <MailPlusIcon className="w-5 h-5" />
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
