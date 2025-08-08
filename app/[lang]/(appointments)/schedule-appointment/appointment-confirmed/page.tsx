import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import AppointmentConfirmedContent from "./_components/appointment-confirmed-content";

const AppointmentConfirmedPage = async ({ params }: SupportedLanguagesProps) => {
  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-8 flex-1 justify-center items-center p-4 z-10">
        <div className="text-white w-full max-w-4xl pt-8 md:p-8">
          <AppointmentConfirmedContent params={params} />
        </div>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default AppointmentConfirmedPage;
