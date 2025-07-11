import { Branding } from "@/lib/branding";
import LanguageSwitcher from "./_components/language-switcher";

const Footer = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  return (
    <footer className="text-white/70 flex flex-row items-start p-8 bg-[#07001c] justify-between">
      <p>{Branding.CopyrightDisclaimer}</p>
      <LanguageSwitcher params={params} />
    </footer>
  );
};

export default Footer;
