"use client";

import { createElement, useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { MX, US } from "country-flag-icons/react/3x2";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDictionary } from "@/context/dictionary-context";
import { cn } from "@/lib/utils/utils";

const languages = [
  { label: "English", value: "en", flag: US },
  { label: "Español", value: "es", flag: MX },
];

export const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("en");
  const dict = useDictionary();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang;
    if (lang) {
      setValue(lang);
    }
  }, [params.lang]);

  const handleSelect = (currentValue: string) => {
    if (currentValue !== value) {
      const newPath = pathname.replace(`/${value}`, `/${currentValue}`);
      document.cookie = `NEXT_LOCALE=${currentValue}; path=/; max-age=31536000`; // 1 year
      router.push(newPath);
    }
    setOpen(false);
  };

  if (!dict) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Switch Language"
          className="w-auto justify-start gap-2 border-0 bg-[#f1a208] hover:bg-[#f1a208]/80 text-black cursor-pointer"
        >
          {languages.find((language) => language.value === value)?.flag && (
            <span className="inline-block align-middle">
              {createElement(languages.find((language) => language.value === value)!.flag, {
                className: "inline h-4 w-6",
              })}
            </span>
          )}
          <span className="align-middle font-bold">
            {languages.find((language) => language.value === value)?.label}
          </span>
          <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end">
        <Command>
          <CommandInput placeholder={dict.footer.languageSwitcher.search} />
          <CommandList>
            <CommandEmpty>{dict.footer.languageSwitcher.notFound}</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => {
                const FlagIcon = language.flag;
                return (
                  <CommandItem
                    key={language.value}
                    value={language.value}
                    className="cursor-pointer"
                    onSelect={handleSelect}
                  >
                    <CheckIcon className={cn("mr-2 h-4 w-4", value === language.value ? "opacity-100" : "opacity-0")} />
                    {FlagIcon && <FlagIcon className="inline mr-2 h-4 w-6" />} {language.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
