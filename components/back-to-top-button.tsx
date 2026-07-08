"use client";

import { useEffect, useState } from "react";
import { ChevronUpIcon } from "lucide-react";

import { Button } from "./ui/button";

const pageOffsetPixels = 70;

const BackToTopButton = () => {
  const [show, setShow] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 100);

      const isMobile = window.innerWidth < 640;

      if (isMobile) {
        setBottomOffset(24);
        return;
      }

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const distanceFromBottom = docHeight - (scrollY + windowHeight);
      if (distanceFromBottom < pageOffsetPixels) {
        setBottomOffset(pageOffsetPixels - distanceFromBottom + 24);
      } else {
        setBottomOffset(24);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <Button
      aria-label="Back to top"
      onClick={scrollToTop}
      size="icon"
      style={{ bottom: bottomOffset, right: 24, position: "fixed", zIndex: 50 }}
      className="h-12 w-12 cursor-pointer rounded-full border-2 border-[#f1a208] bg-[#07001C] p-2 text-white shadow-lg transition-colors duration-200 hover:bg-[#f1a208] hover:text-[#07001C]"
    >
      <ChevronUpIcon className="h-8 w-8" />
    </Button>
  );
};

export default BackToTopButton;
