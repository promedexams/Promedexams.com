import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import HeroSection from "./_components/hero-section";

const MainPage = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-2 flex-1 justify-center items-center space-y-2 p-4 z-10 bg-[#4F759B]">
        <HeroSection />
      </main>
      <Footer params={params} />
    </div>
  );
};

export default MainPage;
