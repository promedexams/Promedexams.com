import Link from "next/link";
import { CalendarDaysIcon, Globe2Icon, MenuIcon } from "lucide-react";

import { Branding } from "@/lib/branding";
import { getDictionary } from "@/lib/dictionaries";
import { Button } from "./ui/button";

const Navbar = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  const dict = await getDictionary((await params).lang);

  return (
    <nav className="p-8 flex flex-row h-full relative border-b border-gray-200 justify-between items-center bg-[#07001c]">
      <Link href="/" className="flex flex-row gap-4 items-center text-white">
        <Globe2Icon className="w-10 h-10" />
        <p className="text-2xl font-bold">{Branding.Name}</p>
      </Link>
      <div className="hidden min-[980px]:flex flex-row gap-4 justify-center items-center text-white text-lg">
        <Link href="/" className="font-bold hover:underline underline-offset-4">
          {dict.navbar.navlinks.home}
        </Link>
        •
        <Link href="/services" className="font-bold hover:underline underline-offset-4">
          {dict.navbar.navlinks.services}
        </Link>
        •
        <Link href="/team" className="font-bold hover:underline underline-offset-4">
          {dict.navbar.navlinks.team}
        </Link>
        •
        <Link href="/contact" className="font-bold hover:underline underline-offset-4">
          {dict.navbar.navlinks.contact}
        </Link>
        •
        <Link href="/schedule-appointment">
          <Button className="bg-[#f1a208] hover:bg-[#f1a208]/80 cursor-pointer text-black text-base font-bold hover:scale-105">
            <CalendarDaysIcon className="w-4 h-4" /> {dict.navbar.navlinks.scheduleAppointment}
          </Button>
        </Link>
      </div>
      <div className="flex min-[980px]:hidden flex-row">
        <MenuIcon className="text-[#f1a208] hover:text-[#f1a208]/80 w-10 h-10 transition-colors duration-300 cursor-pointer" />
      </div>
      <div className="absolute left-0 bottom-0 w-full h-px bg-gray-300" />
    </nav>
  );
};

export default Navbar;
