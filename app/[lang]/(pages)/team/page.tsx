import Image from "next/image";
import Link from "next/link";
import { MailIcon } from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { Branding } from "@/lib/branding";
import { getDictionary } from "@/lib/dictionaries";

const TeamPage = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  const dict = await getDictionary((await params).lang);

  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-8 flex-1 justify-center items-center p-4 z-10">
        <div className="text-white p-8 w-full max-w-6xl">
          <h1 className="text-4xl font-bold mb-12 text-center text-white">{dict.pages.team.title}</h1>
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <Image
                  src="https://placehold.co/150x150"
                  alt={`Picture of ${dict.pages.team.employee.jill.name}`}
                  width={100}
                  height={100}
                  unoptimized
                  className="w-54 h-54 md:w-80 md:h-80 rounded-xl mb-4 border-4 border-white shadow-lg"
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-3xl font-bold">{dict.pages.team.employee.jill.name}</h2>
                <h3 className="text-lg text-white/80 font-bold">{dict.pages.team.employee.jill.jobTitle}</h3>
                <div className="text-white/90 flex flex-col gap-2">
                  {dict.pages.team.employee.jill.bioParagraphs.map((paragraph, i) => (
                    <p key={`paragraph-${i + 1}`}>{paragraph}</p>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon className="w-5 h-5" />
                  <Link href={`mailto:${Branding.Employees.Jill.Email}`} className="hover-underline-animation">
                    {Branding.Employees.Jill.Email}
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 md:order-1">
                <Image
                  src="https://placehold.co/150x150"
                  alt={`Picture of ${dict.pages.team.employee.trish.name}`}
                  width={100}
                  height={100}
                  unoptimized
                  className="w-54 h-54 md:w-80 md:h-80 rounded-xl mb-4 border-4 border-white shadow-lg"
                />
              </div>
              <div className="md:col-span-2 space-y-4 md:order-2">
                <h2 className="text-3xl font-bold">{dict.pages.team.employee.trish.name}</h2>
                <h3 className="text-lg text-white/80 font-bold">{dict.pages.team.employee.trish.jobTitle}</h3>
                <div className="text-white/90 flex flex-col gap-2">
                  {dict.pages.team.employee.trish.bioParagraphs.map((paragraph, i) => (
                    <p key={`paragraph-${i + 1}`}>{paragraph}</p>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon className="w-5 h-5" />
                  <Link href={`mailto:${Branding.Employees.Trish.Email}`} className="hover-underline-animation">
                    {Branding.Employees.Trish.Email}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-white mt-16">
          <h2 className="text-3xl font-bold mb-4">{dict.pages.team.contactSubSection.header}</h2>
          <p className="mb-8">{dict.pages.team.contactSubSection.message}</p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-[#f1a208] hover:bg-[#f1a208]/80 text-black text-lg font-bold cursor-pointer"
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
