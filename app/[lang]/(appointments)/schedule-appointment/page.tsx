import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

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
          <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl">
            <form className="space-y-6">
              <h2 className="text-2xl font-bold mb-4 text-white pb-4 border-b">Personal Information</h2>
              <div className="flex flex-row w-full gap-4">
                <div className="flex-1">
                  <label className="block text-white text-lg font-semibold mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    maxLength={50}
                    required
                    className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-white text-lg font-semibold mb-2" htmlFor="middleInitial">
                    Middle Initial
                  </label>
                  <input
                    id="middleInitial"
                    name="middleInitial"
                    type="text"
                    maxLength={3}
                    required
                    className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none"
                    placeholder="Enter your middle initial"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-white text-lg font-semibold mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    maxLength={50}
                    required
                    className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white text-lg font-semibold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  maxLength={254}
                  required
                  className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-white text-lg font-semibold mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none"
                  placeholder="(###) - ### - ####"
                  maxLength={16}
                />
              </div>
              <div>
                <label className="block text-white text-lg font-semibold mb-2" htmlFor="appointmentType">
                  Appointment Type
                </label>
                <select
                  id="appointmentType"
                  name="appointmentType"
                  required
                  className="w-full p-3 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select appointment type
                  </option>
                  <option value="immigration">Immigration Medical Exams</option>
                  <option value="faa">FAA Physicals (2nd & 3rd Class)</option>
                  <option value="dot">DOT Physicals</option>
                  <option value="school">School/Sports/Camp Physicals</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[#f1a208] hover:bg-[#f1a208]/90 text-black text-lg font-bold py-3 rounded-lg transition-transform duration-200 hover:scale-105"
              >
                Schedule Appointment
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default ScheduleAppointmentPage;
