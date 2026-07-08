import Link from "next/link";

import ContactCard from "@/components/contact-card/contact-card";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";

const FindUsSection = async ({ params }: SupportedLanguagesProps) => {
  const dict = await getDictionary((await params).lang);

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl text-center text-white">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight">{dict.pages.home.findUsSection.header}</h2>
        <p className="mx-auto mb-12 max-w-3xl text-lg text-white/80">{dict.pages.home.findUsSection.description}</p>
        <ContactCard params={params} />
        <div className="mt-12 flex w-full justify-center">
          <Link href="/contact" className="inline-block">
            <button className="cursor-pointer rounded-lg border-2 border-[#f1a208] bg-transparent px-2 py-1 text-center text-lg font-bold whitespace-normal text-white transition-colors duration-200 hover:bg-[#f1a208] hover:text-black">
              {dict.pages.home.findUsSection.buttonText}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FindUsSection;
