"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDaysIcon, MenuIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const MobileNavbar = ({ dict }: { dict: any; lang: "en" | "es" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const navLinkClasses = "font-bold hover-underline-animation text-2xl";
  const buttonClasses =
    "bg-[#f1a208] hover:bg-[#f1a208]/80 cursor-pointer text-black text-lg font-bold hover:scale-105";

  return (
    <div className="flex min-[980px]:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="z-30 transition-transform duration-200 ease-in-out hover:scale-110 cursor-pointer"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <XIcon className="text-[#f1a208] w-10 h-10" /> : <MenuIcon className="text-[#f1a208] w-10 h-10" />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#07001c] text-white flex flex-col items-center pt-8 z-20">
          <div className="flex flex-col items-center gap-8">
            <Link href="/" className={navLinkClasses} onClick={closeMenu}>
              {dict.navbar.navlinks.home}
            </Link>
            <Link href="/services" className={navLinkClasses} onClick={closeMenu}>
              {dict.navbar.navlinks.services}
            </Link>
            <Link href="/team" className={navLinkClasses} onClick={closeMenu}>
              {dict.navbar.navlinks.team}
            </Link>
            <Link href="/contact" className={navLinkClasses} onClick={closeMenu}>
              {dict.navbar.navlinks.contact}
            </Link>
            <Link href="/schedule-appointment" onClick={closeMenu}>
              <Button className={buttonClasses}>
                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                {dict.navbar.navlinks.scheduleAppointment}
              </Button>
            </Link>
          </div>
          <div className="w-full h-px bg-gray-300 mt-8" />
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
