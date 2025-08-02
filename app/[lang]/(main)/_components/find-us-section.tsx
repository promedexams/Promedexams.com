import Link from "next/link";

import ContactCard from "@/components/contact-card/contact-card";
import { SupportedLanguages } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";

const FindUsSection = async ({ params }: SupportedLanguages) => {
  const dict = await getDictionary((await params).lang);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto text-center text-white">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4">{dict.pages.home.findUsSection.header}</h2>
        <p className="text-lg text-white/80 mb-12 max-w-3xl mx-auto">{dict.pages.home.findUsSection.description}</p>
        <ContactCard params={params} />
        <div className="mt-12 flex justify-center w-full">
          <Link href="/contact" className="inline-block">
            <button className="bg-transparent hover:bg-[#f1a208] text-white hover:text-black border-2 border-[#f1a208] transition-colors duration-200 font-bold text-lg cursor-pointer whitespace-normal text-center px-2 py-1 rounded-lg">
              {dict.pages.home.findUsSection.buttonText}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FindUsSection;
