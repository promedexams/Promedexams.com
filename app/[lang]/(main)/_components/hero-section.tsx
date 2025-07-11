import { Branding } from "@/lib/branding";

const HeroSection = () => {
  return (
    <section id="hero" className="flex flex-col items-center md:flex-row max-w-[60rem] p-10 gap-10">
      <div className="flex-1 flex-col min-w-0 space-y-2">
        <div className="flex flex-col gap-4 items-center text-4xl">
          <h1 className="text-white">{Branding.Name} Hero Section</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
