import Link from "next/link";
import { CalendarDaysIcon, GlassesIcon, HashIcon, IdCardIcon, PlaneIcon, ToiletIcon } from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/utils/dictionaries";

const FAAPhysicalsPage = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  const dict = await getDictionary((await params).lang);

  const whatToBring = [
    { text: dict.pages.services.services.faaPhysicals.whatToBringSection.items[0], icon: IdCardIcon },
    {
      text: dict.pages.services.services.faaPhysicals.whatToBringSection.items[1],
      icon: HashIcon,
    },
    { text: dict.pages.services.services.faaPhysicals.whatToBringSection.items[2], icon: GlassesIcon },
    { text: dict.pages.services.services.faaPhysicals.whatToBringSection.items[3], icon: ToiletIcon },
  ];

  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-12 flex-1 justify-center items-center p-4 z-10 text-white">
        <section className="w-full max-w-5xl text-center pt-8">
          <div className="bg-slate-800/20 p-8 rounded-2xl shadow-xl">
            <div className="p-4 bg-[#f1a208] rounded-full inline-block mb-4">
              <PlaneIcon className="w-16 h-16 text-black" />
            </div>
            <h1 className="text-5xl font-bold mb-4">{dict.pages.services.services.faaPhysicals.title}</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              {dict.pages.services.services.faaPhysicals.shortDescription}
            </p>
          </div>
        </section>
        <section className="w-full max-w-5xl">
          <div className="bg-slate-800/20 p-8 rounded-2xl shadow-xl space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#f1a208] mb-4">
                {dict.pages.services.services.faaPhysicals.informationSection.whoApplies.header}
              </h2>
              <div className="space-y-4 text-lg text-white/90">
                {dict.pages.services.services.faaPhysicals.informationSection.whoApplies.description.map(
                  (paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  )
                )}
              </div>
            </div>
            <div className="w-full h-px bg-white/20" />
            <div>
              <h2 className="text-3xl font-bold text-[#f1a208] mb-4">
                {dict.pages.services.services.faaPhysicals.informationSection.whatToExpect.header}
              </h2>
              <div className="space-y-4 text-lg text-white/90">
                {dict.pages.services.services.faaPhysicals.informationSection.whatToExpect.description.map(
                  (paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  )
                )}
                <p className="italic">
                  {dict.pages.services.services.faaPhysicals.informationSection.whatToExpect.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full max-w-5xl">
          <div className="bg-slate-800/20 p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-center text-[#f1a208] mb-8">
              {dict.pages.services.services.faaPhysicals.whatToBringSection.header}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {whatToBring.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <item.icon className="w-8 h-8 text-[#f1a208] mt-1" />
                  </div>
                  <p className="text-lg text-white/90">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-900/50 border border-blue-400 p-6 rounded-lg mt-8">
              <h3 className="font-bold text-xl text-blue-300 mb-2">
                {dict.pages.services.services.faaPhysicals.whatToBringSection.messagePanel.title}
              </h3>
              <p className="text-white/90">
                {dict.pages.services.services.faaPhysicals.whatToBringSection.messagePanel.message
                  .split(/(\*[^*]+\*)/g)
                  .map((part, idx) =>
                    part.startsWith("*") && part.endsWith("*") ? (
                      <span key={idx} className="underline">
                        {part.slice(1, -1)}
                      </span>
                    ) : (
                      <span key={idx}>{part}</span>
                    )
                  )}
              </p>
              <Link href="https://medxpress.faa.gov/" target="_blank">
                <Button
                  size="lg"
                  className="bg-blue-300 hover:bg-blue-300/80 text-black font-bold cursor-pointer transition-colors duration-200 mt-4"
                >
                  {dict.pages.services.services.faaPhysicals.whatToBringSection.messagePanel.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="text-center text-white bg-slate-800/20 p-12 rounded-2xl w-full max-w-5xl shadow-xl">
          <h2 className="text-4xl font-bold mb-4">
            {dict.pages.services.services.specificServicePages.scheduleSection.header}
          </h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto text-white/80">
            {dict.pages.services.services.specificServicePages.scheduleSection.description}
          </p>
          <Link href="/schedule-appointment">
            <Button
              size="lg"
              className="bg-[#f1a208] hover:bg-[#f1a208]/90 text-black text-lg font-bold cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <CalendarDaysIcon className="w-5 h-5 mr-2" />
              {dict.pages.services.services.specificServicePages.scheduleSection.scheduleAppointmentButtonText}
            </Button>
          </Link>
        </section>
        <section className="text-center text-white bg-slate-800/20 mb-10 p-12 rounded-2xl w-full max-w-5xl shadow-xl">
          <h2 className="text-4xl font-bold mb-4">
            {dict.pages.services.services.specificServicePages.wrongServiceSection.header}
          </h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto text-white/80">
            {dict.pages.services.services.specificServicePages.wrongServiceSection.description}
          </p>
          <div className="mt-12 flex justify-center w-full">
            <Link href="/services" className="inline-block">
              <button className="bg-transparent hover:bg-[#f1a208] text-white hover:text-black border-2 border-[#f1a208] transition-colors duration-200 font-bold text-lg cursor-pointer whitespace-normal text-center px-2 py-1 rounded-lg">
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

export default FAAPhysicalsPage;
