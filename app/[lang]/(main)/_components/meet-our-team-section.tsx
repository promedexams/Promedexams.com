import Image from "next/image";
import Link from "next/link";

import { BusinessInfo } from "@/lib/business-info";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";

const MeetOurTeamSection = async ({ params }: SupportedLanguagesProps) => {
  const dict = await getDictionary((await params).lang);

  return (
    <section className="bg-slate-800/20 px-4 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white">
          {dict.pages.home.meetOurTeamSection.header}
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-lg text-white/80">
          {dict.pages.home.meetOurTeamSection.description}
        </p>
        <div className="grid grid-cols-1 gap-12 text-left md:grid-cols-2">
          <div className="flex flex-col items-center rounded-2xl bg-slate-800/20 p-8 text-center shadow-xl">
            <Image
              src={BusinessInfo.Employees.Jill.Headshot}
              alt={`A picture of ${BusinessInfo.Employees.Jill.Name}`}
              width={200}
              height={200}
              unoptimized
              className="mb-6 rounded-full border-4 border-[#f1a208] drop-shadow-lg"
            />
            <h3 className="text-3xl font-bold text-[#f1a208]">
              {dict.pages.home.meetOurTeamSection.employee.jill.name}
            </h3>
            <h4 className="mb-4 text-lg font-semibold text-white/90">
              {dict.pages.home.meetOurTeamSection.employee.jill.jobTitle}
            </h4>
            <p className="text-white/80">{dict.pages.home.meetOurTeamSection.employee.jill.shortDescription}</p>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-slate-800/20 p-8 text-center shadow-xl">
            <Image
              src={BusinessInfo.Employees.Laura.Headshot}
              alt={`A picture of ${BusinessInfo.Employees.Laura.Name}`}
              width={200}
              height={200}
              unoptimized
              className="mb-6 rounded-full border-4 border-[#f1a208] drop-shadow-lg"
            />
            <h3 className="text-3xl font-bold text-[#f1a208]">
              {dict.pages.home.meetOurTeamSection.employee.laura.name}
            </h3>
            <h4 className="mb-4 text-lg font-semibold text-white/90">
              {dict.pages.home.meetOurTeamSection.employee.laura.jobTitle}
            </h4>
            <p className="text-white/80">{dict.pages.home.meetOurTeamSection.employee.laura.shortDescription}</p>
          </div>
        </div>
        <div className="mt-12 flex w-full justify-center">
          <Link href="/team" className="inline-block">
            <button className="cursor-pointer rounded-lg border-2 border-[#f1a208] bg-transparent px-2 py-1 text-center text-lg font-bold whitespace-normal text-white transition-colors duration-200 hover:bg-[#f1a208] hover:text-black">
              {dict.pages.home.meetOurTeamSection.learnMoreButton}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeamSection;
