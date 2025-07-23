import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { AppointmentForm } from "./_components/appointment-form";

const ScheduleAppointmentPage = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-8 flex-1 justify-center items-center p-4 z-10">
        <div className="text-white w-full max-w-4xl pt-8 md:p-8 ">
          <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl">
            <h1 className="text-5xl font-bold mb-4 text-center text-white pb-4 border-b">Schedule Appointment</h1>
            <p className="text-lg text-white/80 text-center">
              Please fill out the form below to schedule your appointment. We will get back to you as soon as possible
              to confirm your appointment.
            </p>
          </div>
          <AppointmentForm />
        </div>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default ScheduleAppointmentPage;
