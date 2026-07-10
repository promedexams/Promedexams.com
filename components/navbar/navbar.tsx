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
    <nav className="relative z-40 flex h-full flex-row items-center justify-between border-b border-gray-200 bg-[#07001c] p-8">
      <CombinationMark params={params} />
      <div className="hidden flex-row items-center justify-center gap-4 text-lg text-white min-[980px]:flex">
        <Link href="/" className="hover-underline-animation font-bold">
          {dict.navbar.navlinks.home}
        </Link>
        •
        <Link href="/services" className="hover-underline-animation font-bold">
          {dict.navbar.navlinks.services}
        </Link>
        •
        <Link href="/team" className="hover-underline-animation font-bold">
          {dict.navbar.navlinks.team}
        </Link>
        •
        <Link href="/contact" className="hover-underline-animation font-bold">
          {dict.navbar.navlinks.contact}
        </Link>
        •
        <Link href="/schedule-appointment">
          <Button className="cursor-pointer bg-[#f1a208] text-base font-bold text-black duration-200 hover:scale-105 hover:bg-[#f1a208]/80">
            <CalendarDaysIcon className="h-4 w-4" /> {dict.navbar.navlinks.scheduleAppointment}
          </Button>
        </Link>
      </div>
      <MobileNavbar dict={dict} lang={lang} />
    </nav>
  );
};

export default Navbar;
