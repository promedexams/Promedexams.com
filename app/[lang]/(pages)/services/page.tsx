import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon, PlaneIcon, TruckIcon } from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";

const ServicesPage = async ({ params }: SupportedLanguagesProps) => {
  const dict = await getDictionary((await params).lang);

  const Services = [
    {
      icon: "globe",
      title: dict.pages.services.services.immigrationMedicalExams.title,
      description: dict.pages.services.services.immigrationMedicalExams.shortDescription,
      href: "/services/immigration-medical-exams",
    },
    {
      icon: "plane",
      title: dict.pages.services.services.faaPhysicals.title,
      description: dict.pages.services.services.faaPhysicals.shortDescription,
      href: "/services/faa-physicals",
    },
    {
      icon: "truck",
      title: dict.pages.services.services.dotPhysicals.title,
      description: dict.pages.services.services.dotPhysicals.shortDescription,
      href: "/services/dot-physicals",
    },
    {
      icon: "school",
      title: dict.pages.services.services.schoolSportsCampPhysicals.title,
      description: dict.pages.services.services.schoolSportsCampPhysicals.shortDescription,
      href: "/services/school-sports-camp-physicals",
    },
  ];

  return (
    <div className="relative m-0 flex min-h-screen w-screen flex-col bg-[#4F759B] p-0">
      <Navbar params={params} />
      <main className="z-10 flex flex-1 flex-col items-center justify-center gap-8 p-4 md:relative">
        <div className="w-full max-w-7xl pt-8 text-white md:p-8">
          <div className="mb-8 w-full rounded-2xl bg-slate-800/20 p-8 shadow-xl">
            <h1 className="mb-4 border-b pb-4 text-center text-5xl font-bold text-white">
              {dict.pages.services.title}
            </h1>
            <p className="text-lg text-white/80">{dict.pages.services.description}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {Services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-2xl bg-slate-800/20 p-8 text-center shadow-xl"
              >
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
                <h3 className="mb-2 text-2xl font-bold text-white">{service.title}</h3>
                <p className="mb-6 text-white/80">{service.description}</p>
                <Link href={service.href}>
                  <Button className="cursor-pointer rounded-lg border-2 border-[#f1a208] bg-transparent px-4 py-2 text-center text-lg font-bold whitespace-normal text-white transition-colors duration-200 hover:bg-[#f1a208] hover:text-black">
                    {dict.pages.services.services.moreInfoButton}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-10 w-full max-w-5xl rounded-2xl bg-slate-800/20 p-12 text-center text-white shadow-xl">
          <h2 className="mb-4 text-4xl font-bold">{dict.pages.services.contactSubSection.header}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
            {dict.pages.services.contactSubSection.message}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 align-middle sm:flex-row">
            <Link href="/schedule-appointment">
              <Button
                size="lg"
                className="my-2 cursor-pointer bg-[#f1a208] text-lg font-bold text-black transition-transform duration-200 hover:scale-105 hover:bg-[#f1a208]/90"
              >
                <CalendarDaysIcon className="mr-2 h-5 w-5" />
                {dict.pages.services.contactSubSection.scheduleAppointmentButtonText}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                className="cursor-pointer rounded-lg border-2 border-[#f1a208] bg-transparent px-2 py-1 text-center text-lg font-bold whitespace-normal text-white transition-colors duration-200 hover:bg-[#f1a208] hover:text-black"
              >
                {dict.pages.services.contactSubSection.contactButtonText}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default ServicesPage;
