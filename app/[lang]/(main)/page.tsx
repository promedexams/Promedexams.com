import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import FindUsSection from "./_components/find-us-section";
import HeroSection from "./_components/hero-section";
import MeetOurTeamSection from "./_components/meet-our-team-section";
import OurServicesSection from "./_components/our-services-section";
import WhyChooseUsSection from "./_components/why-choose-us-section";

const MainPage = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="flex-1">
        <HeroSection params={params} />
        <OurServicesSection params={params} />
        <WhyChooseUsSection params={params} />
        <MeetOurTeamSection params={params} />
        <FindUsSection />
      </main>
      <Footer params={params} />
    </div>
  );
};

export default MainPage;
