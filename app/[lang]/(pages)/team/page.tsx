import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";

const TeamPage = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-2 flex-1 justify-center items-center space-y-2 p-4 z-10 bg-[#4F759B]">
        <h1>Team Page</h1>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default TeamPage;
