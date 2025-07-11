"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDaysIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import MenuToggle from "./menu-toggle";

const MobileNavbar = ({ dict }: { dict: any; lang: "en" | "es" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const navContainerRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    // Find the parent <nav> element once the component mounts
    if (buttonRef.current) {
      navContainerRef.current = buttonRef.current.closest("nav");
    }

    const handleResize = () => {
      if (window.innerWidth >= 980) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      // Close the menu if the click is outside the entire <nav> container
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const navLinkClasses = "font-bold hover-underline-animation text-2xl";
  const buttonClasses =
    "bg-[#f1a208] hover:bg-[#f1a208]/80 cursor-pointer text-black text-lg font-bold hover:scale-105";

  const menuVariants = {
    hidden: {
      opacity: 0,
      scaleY: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const,
      },
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="flex min-[980px]:hidden">
      <MenuToggle ref={buttonRef} toggle={toggleOpen} isOpen={isOpen} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="absolute top-full left-0 w-full bg-[#07001c] text-white z-20 origin-top"
          >
            <div className="flex flex-col items-center pt-8">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavbar;
