import Link from "next/link";
import { CalendarDaysIcon, Globe2Icon } from "lucide-react";

import { BusinessInfo } from "@/lib/business-info";
import { getDictionary } from "@/lib/utils/dictionaries";
import { Button } from "../ui/button";
import MobileNavbar from "./_components/mobile-navbar";

const Navbar = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <nav className="p-8 flex flex-row h-full relative border-b border-gray-200 justify-between items-center bg-[#07001c] z-40">
      <Link href={`/${lang}`} className="flex flex-row gap-4 items-center text-white">
        <Globe2Icon className="w-10 h-10" />
        <p className="text-2xl font-bold">{BusinessInfo.Name}</p>
      </Link>
      <div className="hidden min-[980px]:flex flex-row gap-4 justify-center items-center text-white text-lg">
        <Link href={`/${lang}`} className="font-bold hover-underline-animation">
          {dict.navbar.navlinks.home}
        </Link>
        •
        <Link href={`/${lang}/services`} className="font-bold hover-underline-animation">
          {dict.navbar.navlinks.services}
        </Link>
        •
        <Link href={`/${lang}/team`} className="font-bold hover-underline-animation">
          {dict.navbar.navlinks.team}
        </Link>
        •
        <Link href={`/${lang}/contact`} className="font-bold hover-underline-animation">
          {dict.navbar.navlinks.contact}
        </Link>
        •
        <Link href={`/${lang}/schedule-appointment`}>
          <Button className="bg-[#f1a208] hover:bg-[#f1a208]/80 cursor-pointer text-black text-base font-bold duration-200 hover:scale-105">
            <CalendarDaysIcon className="w-4 h-4" /> {dict.navbar.navlinks.scheduleAppointment}
          </Button>
        </Link>
      </div>
      <MobileNavbar dict={dict} lang={lang} />
    </nav>
  );
};

export default Navbar;
