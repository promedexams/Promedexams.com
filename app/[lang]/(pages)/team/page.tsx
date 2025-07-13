import Image from "next/image";
import Link from "next/link";
import { MailIcon } from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { BusinessInfo } from "@/lib/business-info";
import { getDictionary } from "@/lib/utils/dictionaries";

const TeamPage = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-8 flex-1 justify-center items-center p-4 z-10">
        <div className="text-white w-full max-w-7xl pt-8 md:p-8">
          <h1 className="text-5xl font-bold mb-12 text-center text-white">{dict.pages.team.title}</h1>
          <div className="space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center bg-slate-800/20 p-8 rounded-2xl shadow-xl">
              <div className="md:col-span-1 flex justify-center">
                <Image
                  src="https://placehold.co/400x400"
                  alt={`Picture of ${dict.pages.team.employee.jill.name}`}
                  width={400}
                  height={400}
                  unoptimized
                  className="rounded-full border-4 border-[#f1a208] shadow-lg w-54 h-54 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-cover"
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-4xl font-bold text-[#f1a208]">{dict.pages.team.employee.jill.name}</h2>
                <h3 className="text-xl text-white/90 font-semibold">{dict.pages.team.employee.jill.jobTitle}</h3>
                <div className="text-white/90 flex flex-col gap-4 max-w-prose">
                  {dict.pages.team.employee.jill.bioParagraphs.map((paragraph, i) => (
                    <p key={`jill-bio-${i}`}>{paragraph}</p>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <MailIcon className="w-6 h-6 text-[#f1a208]" />
                  <Link
                    href={`mailto:${BusinessInfo.Employees.Jill.Email}`}
                    className="hover-underline-animation text-lg"
                  >
                    {BusinessInfo.Employees.Jill.Email}
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center bg-slate-800/20 p-8 rounded-2xl shadow-xl">
              <div className="md:col-span-1 flex justify-center">
                <Image
                  src="https://placehold.co/400x400"
                  alt={`Picture of ${dict.pages.team.employee.trish.name}`}
                  width={400}
                  height={400}
                  unoptimized
                  className="rounded-full border-4 border-[#f1a208] shadow-lg w-54 h-54 sm:w-64 sm:h-64 lg:w-80 lg:h-80  object-cover"
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-4xl font-bold text-[#f1a208]">{dict.pages.team.employee.trish.name}</h2>
                <h3 className="text-xl text-white/90 font-semibold">{dict.pages.team.employee.trish.jobTitle}</h3>
                <div className="text-white/90 flex flex-col gap-4 max-w-prose">
                  {dict.pages.team.employee.trish.bioParagraphs.map((paragraph, i) => (
                    <p key={`trish-bio-${i}`}>{paragraph}</p>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <MailIcon className="w-6 h-6 text-[#f1a208]" />
                  <Link
                    href={`mailto:${BusinessInfo.Employees.Trish.Email}`}
                    className="hover-underline-animation text-lg"
                  >
                    {BusinessInfo.Employees.Trish.Email}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-white mb-10 bg-slate-800/20 p-12 rounded-2xl w-full max-w-5xl shadow-xl">
          <h2 className="text-4xl font-bold mb-4">{dict.pages.team.contactSubSection.header}</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto text-white/80">{dict.pages.team.contactSubSection.message}</p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-[#f1a208] hover:bg-[#f1a208]/90 text-black text-lg font-bold cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              {dict.pages.team.contactSubSection.buttonText}
            </Button>
          </Link>
        </div>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default TeamPage;
