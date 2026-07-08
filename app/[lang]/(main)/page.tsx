import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import FindUsSection from "./_components/find-us-section";
import HeroSection from "./_components/hero-section";
import MeetOurTeamSection from "./_components/meet-our-team-section";
import OurServicesSection from "./_components/our-services-section";
import WhyChooseUsSection from "./_components/why-choose-us-section";

const MainPage = async ({ params }: SupportedLanguagesProps) => {
  return (
    <div className="relative m-0 flex min-h-screen w-screen flex-col bg-[#4F759B] p-0">
      <Navbar params={params} />
      <main className="flex-1">
        <HeroSection params={params} />
        <OurServicesSection params={params} />
        <WhyChooseUsSection params={params} />
        <MeetOurTeamSection params={params} />
        <FindUsSection params={params} />
      </main>
      <Footer params={params} />
    </div>
  );
};

export default MainPage;
