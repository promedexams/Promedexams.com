import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import AppointmentConfirmedContent from "./_components/appointment-confirmed-content";

const AppointmentConfirmedPage = async ({ params }: SupportedLanguagesProps) => {
  return (
    <div className="relative m-0 flex min-h-screen w-screen flex-col bg-[#4F759B] p-0">
      <Navbar params={params} />
      <main className="z-10 flex flex-1 flex-col items-center justify-center gap-8 p-4 md:relative">
        <div className="w-full max-w-4xl pt-8 text-white md:p-8">
          <AppointmentConfirmedContent params={params} />
        </div>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default AppointmentConfirmedPage;
