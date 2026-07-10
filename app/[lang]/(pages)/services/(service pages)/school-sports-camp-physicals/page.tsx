import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon, FileTextIcon, HeartPulseIcon, PillBottleIcon, SyringeIcon } from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";

const SchoolSportsCampPhysicalsPage = async ({ params }: SupportedLanguagesProps) => {
  const dict = await getDictionary((await params).lang);

  const whatToBring = [
    {
      text: dict.pages.services.services.schoolSportsCampPhysicals.whatToBringSection.items[0],
      icon: PillBottleIcon,
    },
    { text: dict.pages.services.services.schoolSportsCampPhysicals.whatToBringSection.items[1], icon: HeartPulseIcon },
    {
      text: dict.pages.services.services.schoolSportsCampPhysicals.whatToBringSection.items[2],
      icon: FileTextIcon,
    },
    { text: dict.pages.services.services.schoolSportsCampPhysicals.whatToBringSection.items[3], icon: SyringeIcon },
  ];

  return (
    <div className="relative m-0 flex min-h-screen w-screen flex-col bg-[#4F759B] p-0">
      <Navbar params={params} />
      <main className="z-10 flex flex-1 flex-col items-center justify-center gap-12 p-4 text-white md:relative">
        <section className="w-full max-w-5xl pt-8 text-center">
          <div className="rounded-2xl bg-slate-800/20 p-8 shadow-xl">
            <div className="mb-4 inline-block rounded-full bg-[#f1a208] p-4">
              <Image
                src="/icons/school-sports-camp.svg"
                width={1}
                height={1}
                alt="School/Sports/Camp Icon"
                draggable={false}
                unoptimized
                className="h-16 w-16 select-none"
              />
            </div>
            <h1 className="mb-4 text-center text-2xl font-bold sm:text-5xl">
              {dict.pages.services.services.schoolSportsCampPhysicals.title}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/80">
              {dict.pages.services.services.schoolSportsCampPhysicals.shortDescription}
            </p>
          </div>
        </section>
        <section className="w-full max-w-5xl">
          <div className="space-y-8 rounded-2xl bg-slate-800/20 p-8 shadow-xl">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-[#f1a208]">
                {dict.pages.services.services.schoolSportsCampPhysicals.informationSection.whoApplies.header}
              </h2>
              <div className="space-y-4 text-lg text-white/90">
                {dict.pages.services.services.schoolSportsCampPhysicals.informationSection.whoApplies.description.map(
                  (paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  )
                )}
              </div>
            </div>
            <div className="h-px w-full bg-white/20" />
            <div>
              <h2 className="mb-4 text-3xl font-bold text-[#f1a208]">
                {dict.pages.services.services.schoolSportsCampPhysicals.informationSection.whatToExpect.header}
              </h2>
              <div className="space-y-4 text-lg text-white/90">
                {dict.pages.services.services.schoolSportsCampPhysicals.informationSection.whatToExpect.description.map(
                  (paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  )
                )}
                <p className="italic">
                  {dict.pages.services.services.schoolSportsCampPhysicals.informationSection.whatToExpect.disclaimer}
                </p>
              </div>
              <div className="mt-8 rounded-lg border border-blue-400 bg-blue-900/50 p-6">
                <h3 className="mb-2 text-xl font-bold text-blue-300">
                  {
                    dict.pages.services.services.schoolSportsCampPhysicals.informationSection.whatToExpect.messagePanel
                      .title
                  }
                </h3>
                <p className="text-white/90">
                  {
                    dict.pages.services.services.schoolSportsCampPhysicals.informationSection.whatToExpect.messagePanel
                      .message
                  }
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full max-w-5xl">
          <div className="rounded-2xl bg-slate-800/20 p-8 shadow-xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#f1a208]">
              {dict.pages.services.services.schoolSportsCampPhysicals.whatToBringSection.header}
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
              {whatToBring.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <item.icon className="mt-1 h-8 w-8 text-[#f1a208]" />
                  </div>
                  <p className="text-lg text-white/90">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full max-w-5xl rounded-2xl bg-slate-800/20 p-12 text-center text-white shadow-xl">
          <h2 className="mb-4 text-4xl font-bold">
            {dict.pages.services.services.specificServicePages.scheduleSection.header}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
            {dict.pages.services.services.specificServicePages.scheduleSection.description}
          </p>
          <Link href="/schedule-appointment">
            <Button
              size="lg"
              className="cursor-pointer bg-[#f1a208] text-lg font-bold text-black transition-transform duration-200 hover:scale-105 hover:bg-[#f1a208]/90"
            >
              <CalendarDaysIcon className="mr-2 h-5 w-5" />
              {dict.pages.services.services.specificServicePages.scheduleSection.scheduleAppointmentButtonText}
            </Button>
          </Link>
        </section>
        <section className="mb-10 w-full max-w-5xl rounded-2xl bg-slate-800/20 p-12 text-center text-white shadow-xl">
          <h2 className="mb-4 text-4xl font-bold">
            {dict.pages.services.services.specificServicePages.wrongServiceSection.header}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
            {dict.pages.services.services.specificServicePages.wrongServiceSection.description}
          </p>
          <div className="mt-12 flex w-full justify-center">
            <Link href="/services" className="inline-block">
              <button className="cursor-pointer rounded-lg border-2 border-[#f1a208] bg-transparent px-2 py-1 text-center text-lg font-bold whitespace-normal text-white transition-colors duration-200 hover:bg-[#f1a208] hover:text-black">
                {dict.pages.services.services.specificServicePages.wrongServiceSection.otherServicesButtonText}
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default SchoolSportsCampPhysicalsPage;
