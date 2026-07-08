import Link from "next/link";
import { toZonedTime } from "date-fns-tz";

import { BusinessInfo } from "@/lib/business-info";
import { RavisionTechInfo } from "@/lib/ravision-tech-info";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { formatTime, isOfficeOpen } from "@/lib/utils/business-hours";
import { getDictionary } from "@/lib/utils/dictionaries";
import LanguagePopup from "../language-popup";
import CombinationMark from "../logos/combination-mark";
import LanguageSwitcher from "./_components/language-switcher";

const Footer = async ({ params }: SupportedLanguagesProps) => {
  const dict = await getDictionary((await params).lang);

  const officeIsOpen = isOfficeOpen();

  const { hours, timezone } = BusinessInfo.ContactInformation.HoursOfOperation;
  const todayIndex = toZonedTime(new Date(), timezone).getDay();
  const todayHours = hours[todayIndex];

  return (
    <footer className="border-t border-gray-200 bg-[#07001c] p-8 text-white/70">
      <LanguagePopup params={params} />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-8 sm:flex-row md:items-center">
          <CombinationMark params={params} />
          <LanguageSwitcher params={params} handleSettingCookies />
        </div>
        <hr className="my-6 border-gray-600" />
        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="mb-2 font-bold text-white">{dict.footer.navlinks.navigation.header}</h3>
            <Link href="#top" className="block transition-colors hover:text-white">
              {dict.footer.navlinks.navigation.topOfPage}
            </Link>
            <Link href="/" className="block transition-colors hover:text-white">
              {dict.footer.navlinks.navigation.home}
            </Link>
            <Link href="/services" className="block transition-colors hover:text-white">
              {dict.footer.navlinks.navigation.services}
            </Link>
            <Link href="/team" className="block transition-colors hover:text-white">
              {dict.footer.navlinks.navigation.team}
            </Link>
            <Link href="/contact" className="block transition-colors hover:text-white">
              {dict.footer.navlinks.navigation.contact}
            </Link>
          </div>
          <div className="space-y-3">
            <h3 className="mb-2 font-bold text-white">{dict.footer.navlinks.services.header}</h3>
            <Link href="/services/immigration-medical-exams" className="block transition-colors hover:text-white">
              {dict.footer.navlinks.services.ImmigrationMedicalExams}
            </Link>
            <Link href="/services/faa-physicals" className="block transition-colors hover:text-white">
              {dict.footer.navlinks.services.FAAPhysicals}
            </Link>
            <Link href="/services/dot-physicals" className="block transition-colors hover:text-white">
              {dict.footer.navlinks.services.DOTPhysicals}
            </Link>
            <Link href="/services/school-sports-camp-physicals" className="block transition-colors hover:text-white">
              {dict.footer.navlinks.services.schoolSportsCampPhysicals}
            </Link>
          </div>
          <div className="space-y-3">
            <h3 className="mb-2 font-bold text-white">{dict.footer.navlinks.appointments.header}</h3>
            <Link href="/schedule-appointment" className="block transition-colors hover:text-white">
              {dict.footer.navlinks.appointments.scheduleAppointment}
            </Link>
            <Link href="/services" className="block transition-colors hover:text-white">
              {dict.footer.navlinks.appointments.whatToBring}
            </Link>
          </div>
          <div className="space-y-3">
            <h3 className="mb-2 font-bold text-white">{dict.footer.navlinks.legal.header}</h3>
            <Link
              href="/legal-documents/notice-of-privacy-policy-july-2025.pdf"
              target="_blank"
              className="block transition-colors hover:text-white"
            >
              {dict.footer.navlinks.legal.noticeOfPrivacyPolicy}
            </Link>
            <Link
              href="/legal-documents/pilot-bill-of-rights-july-2025.pdf"
              target="_blank"
              className="block transition-colors hover:text-white"
            >
              {dict.footer.navlinks.legal.pilotBillOfRights}
            </Link>
          </div>
        </div>
        <hr className="my-6 border-gray-600" />
        <div className="flex flex-col-reverse items-center justify-between gap-2 text-center md:flex-row md:text-left">
          <div className="flex flex-col gap-2 sm:flex-row">
            <p className="text-sm text-white/50">{BusinessInfo.CopyrightDisclaimer}</p>
            <span className="hidden text-sm text-white/50 sm:flex">•</span>
            <p className="text-sm text-white/50">
              {dict.footer.websiteCredits.creditPrefix + " "}
              <Link
                href={RavisionTechInfo.WebsiteURL}
                target="_blank"
                className="underline transition-colors duration-200 hover:text-white"
              >
                {RavisionTechInfo.Name}
              </Link>
            </p>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            {officeIsOpen && todayHours ? (
              <div className="flex flex-row items-center justify-center gap-2 text-white">
                <div className="relative flex h-4 w-4 items-center justify-center">
                  <div className="absolute h-3 w-3 animate-ping rounded-full bg-green-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                {dict.footer.officeStatus.open} {`(${formatTime(todayHours.open)} - ${formatTime(todayHours.close)})`}
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center gap-2 text-white">
                <div className="relative flex h-4 w-4 items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
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
