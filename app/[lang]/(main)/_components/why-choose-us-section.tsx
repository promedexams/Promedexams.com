import { Clock, HeartHandshake, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: Clock,
    title: "Timely & Efficient",
    description:
      "We respect your time. Our processes are streamlined to ensure you are seen promptly and your results are delivered quickly.",
  },
  {
    icon: ShieldCheck,
    title: "Experienced & Certified",
    description:
      "Our team is certified and experienced in FAA, DOT, and USCIS medical examinations, ensuring accuracy and compliance.",
  },
  {
    icon: HeartHandshake,
    title: "Patient-Centered Care",
    description:
      "We believe in honest, clear communication and compassionate care. Your health and peace of mind are our top priorities.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto text-center text-white">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4">Why Choose ProMed Exams?</h2>
        <p className="text-lg text-white/80 mb-12 max-w-3xl mx-auto">
          Discover the benefits of choosing our practice for your medical examination needs.
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
