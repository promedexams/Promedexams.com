import Link from "next/link";
import { Globe2Icon } from "lucide-react";

import { Branding } from "@/lib/branding";
import { getDictionary } from "@/lib/dictionaries";
import LanguageSwitcher from "./_components/language-switcher";

const Footer = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const officeIsOpen = true;

  return (
    <footer className="bg-[#07001c] text-white/70 p-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <Link href="/" className="flex flex-row gap-4 items-center text-white">
            <Globe2Icon className="w-10 h-10" />
            <p className="text-2xl font-bold">{Branding.Name}</p>
          </Link>
          <LanguageSwitcher params={params} />
        </div>
        <hr className="my-6 border-gray-600" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <h3 className="font-bold text-white mb-2">{dict.footer.navlinks.navigation.header}</h3>
            <Link href="/" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.navigation.home}
            </Link>
            <Link href="/services" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.navigation.services}
            </Link>
            <Link href="/team" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.navigation.team}
            </Link>
            <Link href="/contact" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.navigation.contact}
            </Link>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-white mb-2">{dict.footer.navlinks.services.header}</h3>
            <Link href="/" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.services.ImmigrationMedicalExams}
            </Link>
            <Link href="/" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.services.FAAPhysicals}
            </Link>
            <Link href="/" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.services.DOTPhysicals}
            </Link>
            <Link href="/" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.services.schoolSportsCampPhysicals}
            </Link>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-white mb-2">{dict.footer.navlinks.appointments.header}</h3>
            <Link href="/schedule-appointment" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.appointments.scheduleAppointment}
            </Link>
            <Link href="/" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.appointments.whatToBring}
            </Link>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-white mb-2">{dict.footer.navlinks.legal.header}</h3>
            <Link href="/" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.legal.noticeOfPrivacyPractices}
            </Link>
            <Link href="/" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.legal.termsOfUse}
            </Link>
            <Link href="/" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.legal.informedConsentInfo}
            </Link>
            <Link href="/" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.legal.specificDisclaimersForMedicalExams}
            </Link>
            <Link href="/" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.legal.privacyPolicy}
            </Link>
          </div>
        </div>
        <hr className="my-6 border-gray-600" />
        <div className="flex flex-col-reverse md:flex-row justify-between items-center text-center md:text-left gap-2">
          <p className="text-sm text-white/50">{Branding.CopyrightDisclaimer}</p>
          <div className="flex flex-row gap-2 items-center justify-center">
            {officeIsOpen ? (
              <div className="text-white flex flex-row gap-2 justify-center items-center">
                <div className="relative flex items-center justify-center w-4 h-4">
                  <div className="absolute w-3 h-3 bg-green-500 rounded-full animate-ping" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                {dict.footer.officeStatus.open} (9am - 5pm MST)
              </div>
            ) : (
              <div className="text-white flex flex-row gap-2 justify-center items-center">
                <div className="relative flex items-center justify-center w-4 h-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                </div>
                {dict.footer.officeStatus.closed}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
