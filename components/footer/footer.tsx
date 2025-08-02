import Link from "next/link";
import { toZonedTime } from "date-fns-tz";

import { BusinessInfo } from "@/lib/business-info";
import { SupportedLanguages } from "@/lib/types/supported-languages";
import { formatTime, isOfficeOpen } from "@/lib/utils/business-hours";
import { getDictionary } from "@/lib/utils/dictionaries";
import LanguagePopup from "../language-popup";
import CombinationMark from "../logos/combination-mark";
import LanguageSwitcher from "./_components/language-switcher";

const Footer = async ({ params }: SupportedLanguages) => {
  const dict = await getDictionary((await params).lang);

  const officeIsOpen = isOfficeOpen();

  const { hours, timezone } = BusinessInfo.ContactInformation.HoursOfOperation;
  const todayIndex = toZonedTime(new Date(), timezone).getDay();
  const todayHours = hours[todayIndex];

  return (
    <footer className="bg-[#07001c] text-white/70 p-8 border-t border-gray-200">
      <LanguagePopup params={params} />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <CombinationMark params={params} />
          <LanguageSwitcher params={params} handleSettingCookies />
        </div>
        <hr className="my-6 border-gray-600" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <h3 className="font-bold text-white mb-2">{dict.footer.navlinks.navigation.header}</h3>
            <Link href="#top" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.navigation.topOfPage}
            </Link>
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
            <Link href="/services/immigration-medical-exams" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.services.ImmigrationMedicalExams}
            </Link>
            <Link href="/services/faa-physicals" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.services.FAAPhysicals}
            </Link>
            <Link href="/services/dot-physicals" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.services.DOTPhysicals}
            </Link>
            <Link href="/services/school-sports-camp-physicals" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.services.schoolSportsCampPhysicals}
            </Link>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-white mb-2">{dict.footer.navlinks.appointments.header}</h3>
            <Link href="/schedule-appointment" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.appointments.scheduleAppointment}
            </Link>
            <Link href="/services" className="block hover:text-white transition-colors">
              {dict.footer.navlinks.appointments.whatToBring}
            </Link>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-white mb-2">{dict.footer.navlinks.legal.header}</h3>
            <Link
              href="/legal-documents/notice-of-privacy-policy-july-2025.pdf"
              target="_blank"
              className="block hover:text-white transition-colors"
            >
              {dict.footer.navlinks.legal.noticeOfPrivacyPolicy}
            </Link>
            <Link
              href="/legal-documents/pilot-bill-of-rights-july-2025.pdf"
              target="_blank"
              className="block hover:text-white transition-colors"
            >
              {dict.footer.navlinks.legal.pilotBillOfRights}
            </Link>
          </div>
        </div>
        <hr className="my-6 border-gray-600" />
        <div className="flex flex-col-reverse md:flex-row justify-between items-center text-center md:text-left gap-2">
          <p className="text-sm text-white/50">{BusinessInfo.CopyrightDisclaimer}</p>
          <div className="flex flex-row gap-2 items-center justify-center">
            {officeIsOpen && todayHours ? (
              <div className="text-white flex flex-row gap-2 justify-center items-center">
                <div className="relative flex items-center justify-center w-4 h-4">
                  <div className="absolute w-3 h-3 bg-green-500 rounded-full animate-ping" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                {dict.footer.officeStatus.open} {`(${formatTime(todayHours.open)} - ${formatTime(todayHours.close)})`}
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
