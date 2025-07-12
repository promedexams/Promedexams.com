import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Branding } from "@/lib/branding";

const HeroSection = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  const { lang } = await params;

  return (
    <section id="hero" className="relative flex flex-col md:flex-row items-center w-full gap-12 overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/videos/mountains-timelapse.mp4" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-[#07001c]/40 z-10" />
      <div className="flex-shrink-0 z-20">
        <Image
          src={Branding.Logo}
          alt={`${Branding.Name} Logo`}
          width={250}
          height={250}
          unoptimized
          className="drop-shadow-2xl"
        />
      </div>
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 z-20">
        <h1 className="text-5xl font-extrabold text-white tracking-tight">{Branding.Name}</h1>
        <p className="text-2xl text-white/90">
          <span className="text-[#f1a208] font-bold text-4xl">"</span> {Branding.Motto}{" "}
          <span className="text-[#f1a208] font-bold text-4xl">"</span>
        </p>
        <Link href={`/${lang}/schedule-appointment`}>
          <Button
            size="lg"
            className="bg-[#f1a208] hover:bg-[#f1a208]/90 text-black text-lg font-bold cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            <CalendarDaysIcon className="w-5 h-5 mr-2" />
            Schedule Appointment
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
