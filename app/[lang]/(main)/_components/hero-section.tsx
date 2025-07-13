import Link from "next/link";
import { CalendarDaysIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Branding } from "@/lib/branding";
import { getDictionary } from "@/lib/dictionaries";

const HeroSection = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  const dict = await getDictionary((await params).lang);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center w-full min-h-[90vh] text-center overflow-hidden"
    >
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/videos/mountains-timelapse.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-[#07001c]/50 z-10" />
      <div className="absolute top-10 left-10 z-20 h-40 w-40 hidden lg:block">
        <div className="absolute top-0 left-0 h-full w-2 bg-[#f1a208] rounded-b-full" />
        <div className="absolute top-0 left-0 h-2 w-full bg-[#f1a208] rounded-r-full" />
      </div>
      <div className="absolute bottom-10 right-10 z-20 h-40 w-40 hidden lg:block">
        <div className="absolute bottom-0 right-0 h-full w-2 bg-[#f1a208] rounded-t-full" />
        <div className="absolute bottom-0 right-0 h-2 w-full bg-[#f1a208] rounded-l-full" />
      </div>
      <div className="relative z-20 flex flex-col items-center justify-center gap-6 p-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">{Branding.Name}</h1>
        <p className="text-xl md:text-2xl text-white/90">
          {dict.pages.home.heroSection.descriptorWords.map((word, i, arr) => (
            <span key={word}>
              {word}
              {i !== arr.length - 1 && <span className="select-none text-[#f1a208]"> • </span>}
            </span>
          ))}
        </p>
        <p className="text-lg text-white/80 max-w-2xl">{dict.pages.home.heroSection.description}</p>
        <Link href="/schedule-appointment">
          <Button
            size="lg"
            className="bg-[#f1a208] hover:bg-[#f1a208]/90 text-black text-lg font-bold cursor-pointer transition-transform duration-200 hover:scale-105 mt-4"
          >
            <CalendarDaysIcon className="w-5 h-5 mr-2" />
            {dict.pages.home.heroSection.scheduleAppointment}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
