"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SiteSettings } from "@/lib/site-settings";
import { SupportedLanguages, SupportedLanguagesProps } from "@/lib/types/supported-languages";
import LanguageSwitcher from "./footer/_components/language-switcher";
import { Button } from "./ui/button";

const LanguagePopup = ({ params }: SupportedLanguagesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<SupportedLanguages>(SiteSettings.DefaultLocale as SupportedLanguages);

  useEffect(() => {
    const languageCookie = Cookies.get("SITE_LOCALE");
    if (!languageCookie) {
      setIsOpen(true);
    }
    params.then((result) => {
      setLang(result.lang);
    });
  }, [params]);

  const handleConfirmLanguage = () => {
    Cookies.set("SITE_LOCALE", lang, { path: "/", expires: 360 });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to the ProMed Exams Website!</DialogTitle>
          <DialogDescription>
            Please select your preferred language from the dropdown below. You can change the language this site uses
            from the footer at the bottom of the page at any time.
          </DialogDescription>
        </DialogHeader>
        <LanguageSwitcher params={params} />
        <Button
          size="lg"
          className="bg-[#07001C] hover:bg-[#07001C]/90 text-white cursor-pointer transition-colors duration-200"
          onClick={handleConfirmLanguage}
        >
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LanguagePopup;
