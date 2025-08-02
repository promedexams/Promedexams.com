import Link from "next/link";
import { CalendarDaysIcon } from "lucide-react";

import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";
import CombinationMark from "../logos/combination-mark";
import { Button } from "../ui/button";
import MobileNavbar from "./_components/mobile-navbar";

const Navbar = async ({ params }: SupportedLanguagesProps) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <nav className="p-8 flex flex-row h-full relative border-b border-gray-200 justify-between items-center bg-[#07001c] z-40">
      <CombinationMark params={params} />
      <div className="hidden min-[980px]:flex flex-row gap-4 justify-center items-center text-white text-lg">
        <Link href="/" className="font-bold hover-underline-animation">
          {dict.navbar.navlinks.home}
        </Link>
        •
        <Link href="/services" className="font-bold hover-underline-animation">
          {dict.navbar.navlinks.services}
        </Link>
        •
        <Link href="/team" className="font-bold hover-underline-animation">
          {dict.navbar.navlinks.team}
        </Link>
        •
        <Link href="/contact" className="font-bold hover-underline-animation">
          {dict.navbar.navlinks.contact}
        </Link>
        •
        <Link href="/schedule-appointment">
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
