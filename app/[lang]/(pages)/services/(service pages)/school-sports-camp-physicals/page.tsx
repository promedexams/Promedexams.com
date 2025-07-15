import Link from "next/link";
import { CalendarDaysIcon, FileTextIcon, HeartPulseIcon, PillBottleIcon, SchoolIcon, SyringeIcon } from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/utils/dictionaries";

const SchoolSportsCampPhysicalsPage = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  const dict = await getDictionary((await params).lang);

  const whatToBring = [
    {
      text: "Any forms provided by your school, sports program, or camp that need to be completed and/or signed by Dr. Quigley",
      icon: FileTextIcon,
    },
    { text: "Immunization records", icon: SyringeIcon },
    {
      text: "List of allergies and current medications with dosages (prescription and over-the-counter)",
      icon: PillBottleIcon,
    },
    { text: "List of past injuries and surgeries, pertinent family history", icon: HeartPulseIcon },
  ];

  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-12 flex-1 justify-center items-center p-4 z-10 text-white">
        <section className="w-full max-w-5xl text-center pt-8">
          <div className="bg-slate-800/20 p-8 rounded-2xl shadow-xl">
            <div className="p-4 bg-[#f1a208] rounded-full inline-block mb-4">
              <SchoolIcon className="w-16 h-16 text-black" />
            </div>
            <h1 className="text-5xl font-bold mb-4">{dict.pages.services.services.schoolSportsCampPhysicals.title}</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              {dict.pages.services.services.schoolSportsCampPhysicals.shortDescription}
            </p>
          </div>
        </section>
        <section className="w-full max-w-5xl">
          <div className="bg-slate-800/20 p-8 rounded-2xl shadow-xl space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#f1a208] mb-4">
                Who Needs a School, Sports, and/or Camp Physical?
              </h2>
              <p className="text-lg text-white/90">
                Many schools, sports organizations, and camps require these physicals as a prerequisite for
                participation to assess a person's overall health and fitness.
              </p>
            </div>
            <div className="w-full h-px bg-white/20" />
            <div>
              <h2 className="text-3xl font-bold text-[#f1a208] mb-4">What to Expect</h2>
              <div className="space-y-4 text-lg text-white/90">
                <p>
                  These exams help identify potential medical issues, such as heart, lung, neurologic, or
                  musculoskeletal problems, that could affect an individual's ability to safely engage in activities and
                  ensure that all necessary vaccinations are up-to-date. Requirements of these exams can vary by state,
                  sport, and organization. Be sure to check with the program administrator about the necessary
                  requirements to be cleared to participate.
                </p>
                <p>
                  Expect a review of your medical history and physical exam including blood pressure, heart rate, and
                  height/weight. Typically, a urinalysis is required, as well as vision testing. An ECG may be necessary
                  if indicated. Vaccinations may be required if age-appropriate vaccinations are not up-to-date. You can
                  eat/drink before the exam.
                </p>
                <p>
                  Upon completion of the exam, in most cases (unless concerns arise requiring further evaluation), you
                  will leave your appointment with your forms completed and signed.
                </p>
                <p className="italic">
                  This examination is not a substitute for a full physical examination, consultation, diagnosis, or
                  treatment by your primary health care provider.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full max-w-5xl">
          <div className="bg-slate-800/20 p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-center text-[#f1a208] mb-8">What to Bring to Your Appointment</h2>
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

export default SchoolSportsCampPhysicalsPage;
