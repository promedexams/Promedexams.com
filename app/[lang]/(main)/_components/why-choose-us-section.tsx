import { Clock, HeartHandshake, ShieldCheck } from "lucide-react";

import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";

const WhyChooseUsSection = async ({ params }: SupportedLanguagesProps) => {
  const dict = await getDictionary((await params).lang);

  const reasons = [
    {
      icon: Clock,
      title: dict.pages.home.whyChooseUsSection.reasons.timelyAndEfficient.title,
      description: dict.pages.home.whyChooseUsSection.reasons.timelyAndEfficient.description,
    },
    {
      icon: ShieldCheck,
      title: dict.pages.home.whyChooseUsSection.reasons.experiencedAndCertified.title,
      description: dict.pages.home.whyChooseUsSection.reasons.experiencedAndCertified.description,
    },
    {
      icon: HeartHandshake,
      title: dict.pages.home.whyChooseUsSection.reasons.patientCenteredCare.title,
      description: dict.pages.home.whyChooseUsSection.reasons.patientCenteredCare.description,
    },
  ];

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl text-center text-white">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight">{dict.pages.home.whyChooseUsSection.header}</h2>
        <p className="mx-auto mb-12 max-w-3xl text-lg text-white/80">
          {dict.pages.home.whyChooseUsSection.description}
        </p>
        <div className="grid grid-cols-1 gap-12 text-left md:grid-cols-3">
          {reasons.map((reason, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-shrink-0">
                <reason.icon className="h-12 w-12 text-[#f1a208]" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-white">{reason.title}</h3>
                <p className="text-white/80">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
