import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon } from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { BusinessInfo } from "@/lib/business-info";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";

const TeamPage = async ({ params }: SupportedLanguagesProps) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-8 flex-1 justify-center items-center p-4 z-10">
        <div className="text-white w-full max-w-7xl pt-8 md:p-8">
          <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl">
            <h1 className="text-5xl font-bold mb-4 text-center text-white pb-4 border-b">{dict.pages.team.title}</h1>
            <p className="text-lg text-white/80">{dict.pages.team.description}</p>
          </div>
          <div className="space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center bg-slate-800/20 p-8 rounded-2xl shadow-xl">
              <div className="md:col-span-1 flex justify-center">
                <Image
                  src={BusinessInfo.Employees.Jill.Headshot}
                  alt={`Picture of ${dict.pages.team.employee.jill.name}`}
                  width={400}
                  height={400}
                  unoptimized
                  className="rounded-full border-4 border-[#f1a208] drop-shadow-lg w-54 h-54 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-cover"
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-4xl font-bold text-[#f1a208]">{dict.pages.team.employee.jill.name}</h2>
                <h3 className="text-xl text-white/90 font-semibold">{dict.pages.team.employee.jill.jobTitle}</h3>
                <div className="text-white/90 flex flex-col gap-4 max-w-prose">
                  {dict.pages.team.employee.jill.bioParagraphs.map((paragraph, i) => (
                    <p key={`jill-bio-${i}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center bg-slate-800/20 p-8 rounded-2xl shadow-xl">
              <div className="md:col-span-1 flex justify-center">
                <Image
                  src={BusinessInfo.Employees.Trish.Headshot}
                  alt={`Picture of ${dict.pages.team.employee.trish.name}`}
                  width={400}
                  height={400}
                  unoptimized
                  className="rounded-full border-4 border-[#f1a208] drop-shadow-lg w-54 h-54 sm:w-64 sm:h-64 lg:w-80 lg:h-80  object-cover"
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-4xl font-bold text-[#f1a208]">{dict.pages.team.employee.trish.name}</h2>
                <h3 className="text-xl text-white/90 font-semibold">{dict.pages.team.employee.trish.jobTitle}</h3>
                <div className="text-white/90 flex flex-col gap-4 max-w-prose">
                  {dict.pages.team.employee.trish.bioParagraphs.map((paragraph, i) => (
                    <p key={`trish-bio-${i}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-white mb-10 bg-slate-800/20 p-12 rounded-2xl w-full max-w-5xl shadow-xl">
          <h2 className="text-4xl font-bold mb-4">{dict.pages.team.contactSubSection.header}</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto text-white/80">{dict.pages.team.contactSubSection.message}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center align-middle">
            <Link href="/schedule-appointment">
              <Button
                size="lg"
                className="bg-[#f1a208] hover:bg-[#f1a208]/90 text-black text-lg font-bold cursor-pointer transition-transform duration-200 hover:scale-105 my-2"
              >
                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                {dict.pages.team.contactSubSection.scheduleAppointmentButtonText}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-transparent hover:bg-[#f1a208] text-white hover:text-black border-2 border-[#f1a208] transition-colors duration-200 font-bold text-lg cursor-pointer whitespace-normal text-center px-2 py-1 rounded-lg"
              >
                {dict.pages.team.contactSubSection.contactButtonText}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default TeamPage;
