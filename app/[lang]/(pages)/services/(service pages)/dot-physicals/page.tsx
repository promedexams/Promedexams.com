import Link from "next/link";
import {
  CalendarDaysIcon,
  FileTextIcon,
  GlassesIcon,
  PersonStandingIcon,
  PillBottleIcon,
  TruckIcon,
} from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";

const DOTPhysicalsPage = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  // const dict = await getDictionary((await params).lang);

  const whatToBring = [
    { text: "Current state-issued driver's license", icon: PersonStandingIcon },
    {
      text: "Contacts/glasses, hearing aids (if applicable) - If you wear contacts, bring a contact case to remove contacts to check uncorrected vision",
      icon: GlassesIcon,
    },
    { text: "List of current medications with dosages and prescriber's name", icon: PillBottleIcon },
    { text: "Any special circumstances or exemption letters from your doctor(s)", icon: FileTextIcon },
  ];

  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-12 flex-1 justify-center items-center p-4 z-10 text-white">
        <section className="w-full max-w-5xl text-center pt-8">
          <div className="bg-slate-800/20 p-8 rounded-2xl shadow-xl">
            <div className="p-4 bg-[#f1a208] rounded-full inline-block mb-4">
              <TruckIcon className="w-16 h-16 text-black" />
            </div>
            <h1 className="text-5xl font-bold mb-4">DOT Physicals</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              A DOT (Department of Transportation) physical is a medical examination mandated by the Federal Motor
              Carrier Safety Administration (FMCSA) for commercial motor vehicle drivers.
            </p>
          </div>
        </section>
        <section className="w-full max-w-5xl">
          <div className="bg-slate-800/20 p-8 rounded-2xl shadow-xl space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#f1a208] mb-4">Who Needs a DOT Physical?</h2>
              <p className="text-lg text-white/90">
                Passing the DOT physical is required to obtain and maintain a commercial driver's license (CDL). The
                FMCSA requires that DOT physicals be performed by a certified medical examiner (CME) that has undergone
                extensive training and is certified by the FMCSA to perform DOT physicals. At ProMed Exams, we offer
                prompt services to help get you on the road again as soon as possible, and we understand the importance
                of accuracy to avoid processing delays.
              </p>
            </div>
            <div className="w-full h-px bg-white/20" />
            <div>
              <h2 className="text-3xl font-bold text-[#f1a208] mb-4">What to Expect</h2>
              <div className="space-y-4 text-lg text-white/90">
                <p>
                  The exam ensures drivers are physically and mentally fit to operate commercial vehicles safely. Expect
                  a review of your medical history, mental health, and physical exam. Evaluation of blood pressure,
                  heart rate, height/weight, vision, hearing, and urinalysis are required for the exam.
                </p>
                <p>
                  Please come prepared to provide a urine sample. You can eat/drink before the exam. Upon completion of
                  the exam, your results will be reported electronically to the National Registry of Certified Medical
                  Examiners (NRCME). If you meet all FMCSA requirements, you will leave your appointment with your
                  medical examiner's certificate (DOT medical card).
                </p>
                <p>
                  If we find an issue that needs attention, you may need to see your primary care provider and/or a
                  specialist for further testing, treatment, or paperwork. You may still qualify for your medical
                  certificate, but only after taking care of the medical issue or obtaining necessary documentation. In
                  some cases, a health condition may disqualify you from receiving a medical certificate.
                </p>
                <p className="italic">
                  This examination is not a substitute for a full physical examination, consultation, diagnosis, or
                  treatment by your primary health care provider.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full max-w-5xl">
          <div className="bg-slate-800/20 p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-center text-[#f1a208] mb-8">What to Bring to Your Appointment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {whatToBring.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <item.icon className="w-8 h-8 text-[#f1a208] mt-1" />
                  </div>
                  <p className="text-lg text-white/90">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-900/50 border border-blue-400 p-6 rounded-lg mt-8">
              <h3 className="font-bold text-xl text-blue-300 mb-2">IMPORTANT NOTE</h3>
              <p className="text-white/90">
                Be sure to complete the driver information and health history sections on the Medical Examination Report
                Form prior to your appointment. As of 2023, CMV drivers with insulin-treated diabetes mellitus (type 1
                or type 2) and/or monocular vision must meet updated standards to be certified. Forms for these
                exemptions must be completed no more than 45 days before the DOT exam is performed and brought to the
                DOT exam.
              </p>
            </div>
          </div>
        </section>
        <section className="text-center text-white bg-slate-800/20 p-12 rounded-2xl w-full max-w-5xl shadow-xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Schedule Your Exam?</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto text-white/80">
            Contact us today to book your DOT physical. Our team is ready to assist you.
          </p>
          <Link href="/schedule-appointment">
            <Button
              size="lg"
              className="bg-[#f1a208] hover:bg-[#f1a208]/90 text-black text-lg font-bold cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <CalendarDaysIcon className="w-5 h-5 mr-2" />
              Schedule Appointment
            </Button>
          </Link>
        </section>
        <section className="text-center text-white bg-slate-800/20 mb-10 p-12 rounded-2xl w-full max-w-5xl shadow-xl">
          <h2 className="text-4xl font-bold mb-4">Not the Service You're Looking For?</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto text-white/80">
            We offer a range of other specialized medical examinations. Explore our other services to find the one
            that's right for you.
          </p>
          <div className="mt-12 flex justify-center w-full">
            <Link href="/services" className="inline-block">
              <button className="bg-transparent hover:bg-[#f1a208] text-white hover:text-black border-2 border-[#f1a208] transition-colors duration-200 font-bold text-lg cursor-pointer whitespace-normal text-center px-2 py-1 rounded-lg">
                View Other Services
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default DOTPhysicalsPage;
