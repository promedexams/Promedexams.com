import Link from "next/link";
import { Globe2Icon, PlaneIcon, SchoolIcon, TruckIcon } from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/utils/dictionaries";

const ServicesPage = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  const dict = await getDictionary((await params).lang);

  const Services = [
    {
      icon: Globe2Icon,
      title: dict.pages.services.services.immigrationMedicalExams.title,
      description: dict.pages.services.services.immigrationMedicalExams.shortDescription,
      href: "/services/immigration-medical-exams",
    },
    {
      icon: PlaneIcon,
      title: dict.pages.services.services.faaPhysicals.title,
      description: dict.pages.services.services.faaPhysicals.shortDescription,
      href: "/services/faa-physicals",
    },
    {
      icon: TruckIcon,
      title: dict.pages.services.services.dotPhysicals.title,
      description: dict.pages.services.services.dotPhysicals.shortDescription,
      href: "/services/dot-physicals",
    },
    {
      icon: SchoolIcon,
      title: dict.pages.services.services.schoolSportsCampPhysicals.title,
      description: dict.pages.services.services.schoolSportsCampPhysicals.shortDescription,
      href: "/services/school-sports-camp-physicals",
    },
  ];

  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-8 flex-1 justify-center items-center p-4 z-10">
        <div className="text-white w-full max-w-7xl pt-8 md:p-8 ">
          <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl">
            <h1 className="text-5xl font-bold mb-4 text-center text-white pb-4 border-b">
              {dict.pages.services.title}
            </h1>
            <p className="text-lg text-white/80">{dict.pages.services.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Services.map((service, index) => (
              <div
                key={index}
                className="bg-slate-800/20 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center"
              >
                <div className="p-4 bg-[#f1a208] rounded-full inline-block mb-4">
                  <service.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/80 mb-6">{service.description}</p>
                <Link href={service.href}>
                  <Button className="bg-transparent hover:bg-[#f1a208] text-white hover:text-black border-2 border-[#f1a208] transition-colors duration-200 font-bold text-lg cursor-pointer whitespace-normal text-center px-4 py-2 rounded-lg">
                    {dict.pages.services.services.moreInfoButton}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-white mb-10 bg-slate-800/20 p-12 rounded-2xl w-full max-w-5xl shadow-xl">
          <h2 className="text-4xl font-bold mb-4">{dict.pages.services.contactSubSection.header}</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto text-white/80">
            {dict.pages.services.contactSubSection.message}
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-[#f1a208] hover:bg-[#f1a208]/90 text-black text-lg font-bold cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              {dict.pages.services.contactSubSection.buttonText}
            </Button>
          </Link>
        </div>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default ServicesPage;
