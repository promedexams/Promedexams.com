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
    <div className="relative m-0 flex min-h-screen w-screen flex-col bg-[#4F759B] p-0">
      <Navbar params={params} />
      <main className="z-10 flex flex-1 flex-col items-center justify-center gap-8 p-4 md:relative">
        <div className="w-full max-w-7xl pt-8 text-white md:p-8">
          <div className="mb-8 w-full rounded-2xl bg-slate-800/20 p-8 shadow-xl">
            <h1 className="mb-4 border-b pb-4 text-center text-5xl font-bold text-white">{dict.pages.team.title}</h1>
            <p className="text-lg text-white/80">{dict.pages.team.description}</p>
          </div>
          <div className="space-y-20">
            <div className="grid grid-cols-1 items-center gap-12 rounded-2xl bg-slate-800/20 p-8 shadow-xl md:grid-cols-3">
              <div className="flex justify-center md:col-span-1">
                <Image
                  src={BusinessInfo.Employees.Jill.Headshot}
                  alt={`Picture of ${dict.pages.team.employee.jill.name}`}
                  width={400}
                  height={400}
                  unoptimized
                  className="h-54 w-54 rounded-full border-4 border-[#f1a208] object-cover drop-shadow-lg sm:h-64 sm:w-64 lg:h-80 lg:w-80"
                />
              </div>
              <div className="space-y-4 md:col-span-2">
                <h2 className="text-4xl font-bold text-[#f1a208]">{dict.pages.team.employee.jill.name}</h2>
                <h3 className="text-xl font-semibold text-white/90">{dict.pages.team.employee.jill.jobTitle}</h3>
                <div className="flex max-w-prose flex-col gap-4 text-white/90">
                  {dict.pages.team.employee.jill.bioParagraphs.map((paragraph, i) => (
                    <p key={`jill-bio-${i}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 items-center gap-12 rounded-2xl bg-slate-800/20 p-8 shadow-xl md:grid-cols-3">
              <div className="flex justify-center md:col-span-1">
                <Image
                  src={BusinessInfo.Employees.Laura.Headshot}
                  alt={`Picture of ${dict.pages.team.employee.laura.name}`}
                  width={400}
                  height={400}
                  unoptimized
                  className="h-54 w-54 rounded-full border-4 border-[#f1a208] object-cover drop-shadow-lg sm:h-64 sm:w-64 lg:h-80 lg:w-80"
                />
              </div>
              <div className="space-y-4 md:col-span-2">
                <h2 className="text-4xl font-bold text-[#f1a208]">{dict.pages.team.employee.laura.name}</h2>
                <h3 className="text-xl font-semibold text-white/90">{dict.pages.team.employee.laura.jobTitle}</h3>
                <div className="flex max-w-prose flex-col gap-4 text-white/90">
                  {dict.pages.team.employee.laura.bioParagraphs.map((paragraph, i) => (
                    <p key={`laura-bio-${i}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10 w-full max-w-5xl rounded-2xl bg-slate-800/20 p-12 text-center text-white shadow-xl">
          <h2 className="mb-4 text-4xl font-bold">{dict.pages.team.contactSubSection.header}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">{dict.pages.team.contactSubSection.message}</p>
          <div className="flex flex-col items-center justify-center gap-4 align-middle sm:flex-row">
            <Link href="/schedule-appointment">
              <Button
                size="lg"
                className="my-2 cursor-pointer bg-[#f1a208] text-lg font-bold text-black transition-transform duration-200 hover:scale-105 hover:bg-[#f1a208]/90"
              >
                <CalendarDaysIcon className="mr-2 h-5 w-5" />
                {dict.pages.team.contactSubSection.scheduleAppointmentButtonText}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                className="cursor-pointer rounded-lg border-2 border-[#f1a208] bg-transparent px-2 py-1 text-center text-lg font-bold whitespace-normal text-white transition-colors duration-200 hover:bg-[#f1a208] hover:text-black"
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
