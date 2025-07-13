import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

const NotFound = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="flex-1">
        <h1>404</h1>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default NotFound;
