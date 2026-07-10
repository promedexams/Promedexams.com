import Link from "next/link";
import { CalendarDaysIcon, ChevronsDownIcon } from "lucide-react";

import Logo from "@/components/logos/logo";
import { Button } from "@/components/ui/button";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";

const HeroSection = async ({ params }: SupportedLanguagesProps) => {
  const dict = await getDictionary((await params).lang);

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden text-center"
    >
      <video autoPlay loop muted playsInline className="absolute inset-0 z-0 h-full w-full object-cover">
        <source src="/videos/mountains-timelapse.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 z-10 bg-[#07001c]/50" />
      <div className="absolute top-10 left-10 z-20 hidden h-40 w-40 lg:block">
        <div className="absolute top-0 left-0 h-full w-2 rounded-b-full bg-[#f1a208]" />
        <div className="absolute top-0 left-0 h-2 w-full rounded-r-full bg-[#f1a208]" />
      </div>
      <div className="absolute right-10 bottom-10 z-20 hidden h-40 w-40 lg:block">
        <div className="absolute right-0 bottom-0 h-full w-2 rounded-t-full bg-[#f1a208]" />
        <div className="absolute right-0 bottom-0 h-2 w-full rounded-l-full bg-[#f1a208]" />
      </div>
      <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 p-10">
        <Logo className="h-70 w-80" variant="Wordmark" />
        <p className="text-xl text-white/90 md:text-2xl">
          {dict.pages.home.heroSection.descriptorWords.map((word, i, arr) => (
            <span key={word}>
              {word}
              {i !== arr.length - 1 && <span className="text-[#f1a208] select-none"> • </span>}
            </span>
          ))}
        </p>
        <p className="max-w-2xl text-lg text-white/80">
          {dict.pages.home.heroSection.description.split(/(\*[^*]+\*)/g).map((part, idx) =>
            part.startsWith("*") && part.endsWith("*") ? (
              <span key={idx} className="text-[#f1a208]">
                {part.slice(1, -1)}
              </span>
            ) : (
              <span key={idx}>{part}</span>
            )
          )}
        </p>
        <Link href="/schedule-appointment">
          <Button
            size="lg"
            className="my-2 cursor-pointer bg-[#f1a208] text-lg font-bold text-black transition-transform duration-200 hover:scale-105 hover:bg-[#f1a208]/90"
          >
            <CalendarDaysIcon className="mr-2 h-5 w-5" />
            {dict.pages.home.heroSection.scheduleAppointment}
          </Button>
        </Link>
        <div className="mb-10 flex flex-row items-center gap-4 select-none">
          <ChevronsDownIcon className="h-6 w-6 animate-pulse text-white/60" />
          <p className="animate-pulse text-lg text-white/60 italic">{dict.pages.home.heroSection.scrollDownText}</p>
          <ChevronsDownIcon className="h-6 w-6 animate-pulse text-white/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
