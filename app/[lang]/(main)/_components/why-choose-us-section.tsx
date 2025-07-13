import { Clock, HeartHandshake, ShieldCheck } from "lucide-react";

import { getDictionary } from "@/lib/utils/dictionaries";

const WhyChooseUsSection = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
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
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto text-center text-white">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4">{dict.pages.home.whyChooseUsSection.header}</h2>
        <p className="text-lg text-white/80 mb-12 max-w-3xl mx-auto">
          {dict.pages.home.whyChooseUsSection.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {reasons.map((reason, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-shrink-0">
                <reason.icon className="w-12 h-12 text-[#f1a208]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
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
