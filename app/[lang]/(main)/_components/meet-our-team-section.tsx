import Image from "next/image";
import Link from "next/link";

import { BusinessInfo } from "@/lib/business-info";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";

const MeetOurTeamSection = async ({ params }: SupportedLanguagesProps) => {
  const dict = await getDictionary((await params).lang);

  return (
    <section className="py-20 px-4 bg-slate-800/20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">
          {dict.pages.home.meetOurTeamSection.header}
        </h2>
        <p className="text-lg text-white/80 mb-12 max-w-3xl mx-auto">
          {dict.pages.home.meetOurTeamSection.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="bg-slate-800/20 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center">
            <Image
              src={BusinessInfo.Employees.Jill.Headshot}
              alt={`A picture of ${BusinessInfo.Employees.Jill.Name}`}
              width={200}
              height={200}
              unoptimized
              className="rounded-full border-4 border-[#f1a208] drop-shadow-lg mb-6"
            />
            <h3 className="text-3xl font-bold text-[#f1a208]">
              {dict.pages.home.meetOurTeamSection.employee.jill.name}
            </h3>
            <h4 className="text-lg text-white/90 font-semibold mb-4">
              {dict.pages.home.meetOurTeamSection.employee.jill.jobTitle}
            </h4>
            <p className="text-white/80">{dict.pages.home.meetOurTeamSection.employee.jill.shortDescription}</p>
          </div>
          <div className="bg-slate-800/20 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center">
            <Image
              src={BusinessInfo.Employees.Trish.Headshot}
              alt={`A picture of ${BusinessInfo.Employees.Trish.Name}`}
              width={200}
              height={200}
              unoptimized
              className="rounded-full border-4 border-[#f1a208] drop-shadow-lg mb-6"
            />
            <h3 className="text-3xl font-bold text-[#f1a208]">
              {dict.pages.home.meetOurTeamSection.employee.trish.name}
            </h3>
            <h4 className="text-lg text-white/90 font-semibold mb-4">
              {dict.pages.home.meetOurTeamSection.employee.trish.jobTitle}
            </h4>
            <p className="text-white/80">{dict.pages.home.meetOurTeamSection.employee.trish.shortDescription}</p>
          </div>
        </div>
        <div className="mt-12 flex justify-center w-full">
          <Link href="/team" className="inline-block">
            <button className="bg-transparent hover:bg-[#f1a208] text-white hover:text-black border-2 border-[#f1a208] transition-colors duration-200 font-bold text-lg cursor-pointer whitespace-normal text-center px-2 py-1 rounded-lg">
              {dict.pages.home.meetOurTeamSection.learnMoreButton}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeamSection;
