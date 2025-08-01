import Image from "next/image";
import Link from "next/link";
import { PlaneIcon, TruckIcon } from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/utils/dictionaries";

const ServicesPage = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
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
