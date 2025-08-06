import Image from "next/image";
import Link from "next/link";
import { PlaneIcon, TruckIcon } from "lucide-react";

import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";

const OurServicesSection = async ({ params }: SupportedLanguagesProps) => {
  const dict = await getDictionary((await params).lang);

  const Services = [
    // {
    //   icon: "globe",
    //   title: dict.pages.home.ourServicesSection.services.immigrationMedicalExams.title,
    //   description: dict.pages.home.ourServicesSection.services.immigrationMedicalExams.description,
    //   href: "/services/immigration-medical-exams",
    // },
    {
      icon: "plane",
      title: dict.pages.home.ourServicesSection.services.faaPhysicals.title,
      description: dict.pages.home.ourServicesSection.services.faaPhysicals.description,
      href: "/services/faa-physicals",
    },
    {
      icon: "truck",
      title: dict.pages.home.ourServicesSection.services.dotPhysicals.title,
      description: dict.pages.home.ourServicesSection.services.dotPhysicals.description,
      href: "/services/dot-physicals",
    },
    {
      icon: "school",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {Services.map((service, index) => (
            <Link href={service.href} key={index}>
              <div className="bg-gray-700/40 p-8 rounded-lg text-center h-full flex flex-col items-center hover:bg-gray-700/30 transition-all duration-200 transform hover:-translate-y-2">
                <div className="p-4 bg-[#f1a208] rounded-full inline-flex items-center justify-center mb-4 h-20 w-20">
                  {service.icon === "globe" && (
                    <Image
                      src="/icons/immigration.svg"
                      width={32}
                      height={32}
                      alt="Immigration Icon"
                      draggable={false}
                      unoptimized
                      className="w-12 h-12 select-none"
                      style={{ objectFit: "contain" }}
                    />
                  )}
                  {service.icon === "plane" && <PlaneIcon className="w-12 h-12 text-black" />}
                  {service.icon === "truck" && <TruckIcon className="w-12 h-12 text-black" />}
                  {service.icon === "school" && (
                    <Image
                      src="/icons/school-sports-camp.svg"
                      width={32}
                      height={32}
                      alt="School/Sports/Camp Icon"
                      draggable={false}
                      unoptimized
                      className="w-12 h-12 select-none"
                      style={{ objectFit: "contain" }}
                    />
                  )}
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
