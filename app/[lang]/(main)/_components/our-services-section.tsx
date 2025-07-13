import Link from "next/link";
import { Globe2Icon, PlaneIcon, SchoolIcon, TruckIcon } from "lucide-react";

import { getDictionary } from "@/lib/utils/dictionaries";

const OurServicesSection = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  const dict = await getDictionary((await params).lang);

  const Services = [
    {
      icon: Globe2Icon,
      title: dict.pages.home.ourServicesSection.services.dotPhysicals.title,
      description: dict.pages.home.ourServicesSection.services.dotPhysicals.description,
      href: "/services/immigration-medical-exams",
    },
    {
      icon: PlaneIcon,
      title: dict.pages.home.ourServicesSection.services.faaPhysicals.title,
      description: dict.pages.home.ourServicesSection.services.faaPhysicals.description,
      href: "/services/faa-physicals",
    },
    {
      icon: TruckIcon,
      title: dict.pages.home.ourServicesSection.services.dotPhysicals.title,
      description: dict.pages.home.ourServicesSection.services.dotPhysicals.description,
      href: "/services/dot-physicals",
    },
    {
      icon: SchoolIcon,
      title: dict.pages.home.ourServicesSection.services.schoolSportsCampPhysicals.title,
      description: dict.pages.home.ourServicesSection.services.schoolSportsCampPhysicals.description,
      href: "/services/school-sports-camp-physicals",
    },
  ];

  return (
    <section className="bg-slate-800/20 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center text-white">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4">{dict.pages.home.ourServicesSection.header}</h2>
        <p className="text-lg text-white/80 mb-12 max-w-3xl mx-auto">
          {dict.pages.home.ourServicesSection.description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Services.map((service, index) => (
            <Link href={service.href} key={index}>
              <div className="bg-gray-700/40 p-8 rounded-lg text-center h-full flex flex-col items-center justify-center hover:bg-gray-700/30 transition-all duration-200 transform hover:-translate-y-2">
                <div className="p-4 bg-[#f1a208] rounded-full inline-block mb-4">
                  <service.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-white/80">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 flex justify-center w-full">
          <Link href="/services" className="inline-block">
            <button className="bg-transparent hover:bg-[#f1a208] text-white hover:text-black border-2 border-[#f1a208] transition-colors duration-200 font-bold text-lg cursor-pointer whitespace-normal text-center px-2 py-1 rounded-lg">
              {dict.pages.home.ourServicesSection.learnMoreButton}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
