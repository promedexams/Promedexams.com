import Image from "next/image";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import { Branding } from "@/lib/branding";

const MainPage = () => {
  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar />
      <main className="md:relative flex flex-col gap-2 flex-1 justify-center items-center space-y-2 p-4 z-10 bg-[#4F759B]">
        <div className="flex flex-col items-center md:flex-row max-w-[60rem] frosted-glass-card p-10 gap-10">
          <div className="flex-1 flex-col min-w-0 space-y-2">
            <div className="flex flex-col gap-4 items-center text-4xl">
              <Image
                src={Branding.Logo}
                alt={`The logo of ${Branding.Name}`}
                width={100}
                height={100}
                unoptimized
                className="w-60 h-60"
              />
              <h1>{Branding.Name}</h1>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
