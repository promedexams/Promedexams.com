import Image from "next/image";
import Link from "next/link";
import { PlaneIcon, TruckIcon } from "lucide-react";

import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";

const OurServicesSection = async ({ params }: SupportedLanguagesProps) => {
  const dict = await getDictionary((await params).lang);

  const Services = [
    {
      icon: "globe",
      title: dict.pages.home.ourServicesSection.services.immigrationMedicalExams.title,
      description: dict.pages.home.ourServicesSection.services.immigrationMedicalExams.description,
      href: "/services/immigration-medical-exams",
    },
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
    <section className="bg-slate-800/20 px-4 py-20">
      <div className="mx-auto max-w-7xl text-center text-white">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight">{dict.pages.home.ourServicesSection.header}</h2>
        <p className="mx-auto mb-12 max-w-3xl text-lg text-white/80">
          {dict.pages.home.ourServicesSection.description}
        </p>
        <div className="grid grid-cols-1 justify-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Services.map((service, index) => (
            <Link href={service.href} key={index}>
              <div className="flex h-full transform flex-col items-center rounded-lg bg-gray-700/40 p-8 text-center transition-all duration-200 hover:-translate-y-2 hover:bg-gray-700/30">
                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#f1a208] p-4">
                  {service.icon === "globe" && (
                    <Image
                      src="/icons/immigration.svg"
                      width={32}
                      height={32}
                      alt="Immigration Icon"
                      draggable={false}
                      unoptimized
                      className="h-12 w-12 select-none"
                      style={{ objectFit: "contain" }}
                    />
                  )}
                  {service.icon === "plane" && <PlaneIcon className="h-12 w-12 text-black" />}
                  {service.icon === "truck" && <TruckIcon className="h-12 w-12 text-black" />}
                  {service.icon === "school" && (
                    <Image
                      src="/icons/school-sports-camp.svg"
                      width={32}
                      height={32}
                      alt="School/Sports/Camp Icon"
                      draggable={false}
                      unoptimized
                      className="h-12 w-12 select-none"
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{service.title}</h3>
                <p className="text-white/80">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 flex w-full justify-center">
          <Link href="/services" className="inline-block">
            <button className="cursor-pointer rounded-lg border-2 border-[#f1a208] bg-transparent px-2 py-1 text-center text-lg font-bold whitespace-normal text-white transition-colors duration-200 hover:bg-[#f1a208] hover:text-black">
              {dict.pages.home.ourServicesSection.learnMoreButton}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
