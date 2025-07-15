import Link from "next/link";
import {
  CalendarDaysIcon,
  FileTextIcon,
  FingerprintIcon,
  Globe2Icon,
  HeartPulseIcon,
  HospitalIcon,
  PersonStandingIcon,
  PillBottleIcon,
  StethoscopeIcon,
  SyringeIcon,
  TriangleAlertIcon,
} from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/utils/dictionaries";

const ImmigrationMedicalExamsPage = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  const dict = await getDictionary((await params).lang);

  const whatToBring = [
    { text: "Valid passport or other government-issued photo identification", icon: FingerprintIcon },
    { text: "Vaccination records", icon: SyringeIcon },
    { text: "Form I-693, Report of Medical Examination and Vaccination Record", icon: FileTextIcon },
    { text: "List of current medications", icon: PillBottleIcon },
    {
      text: "Tuberculosis certificate from your doctor if you were diagnosed and properly treated in the past",
      icon: HeartPulseIcon,
    },
    {
      text: "Certificate of clearance if you have been diagnosed with syphilis and properly treated signed by a doctor or public health official",
      icon: StethoscopeIcon,
    },
    {
      text: "Report of the condition and any special education or supervision requirements if immigrating with learning disabilities",
      icon: PersonStandingIcon,
    },
    {
      text: "If you have a history of harmful or violent behavior resulting in injury to people or animals, information that will allow the doctor to determine whether the behavior was related to a psychiatric or medical problem, or to drug or alcohol use",
      icon: TriangleAlertIcon,
    },
    {
      text: "If you have been treated or hospitalized for psychiatric or mental illness, or alcohol or drug abuse, written certification including the diagnosis, length of treatment, and your prognosis",
      icon: HospitalIcon,
    },
  ];

  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-12 flex-1 justify-center items-center p-4 z-10 text-white">
        <section className="w-full max-w-5xl text-center pt-8">
          <div className="bg-slate-800/20 p-8 rounded-2xl shadow-xl">
            <div className="p-4 bg-[#f1a208] rounded-full inline-block mb-4">
              <Globe2Icon className="w-16 h-16 text-black" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Immigration Medical Exams</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Only doctors designated by the USCIS as civil surgeons can complete an immigration exam. The exam assesses
              your health to determine if you meet the requirements for immigration to the U.S.
            </p>
          </div>
        </section>
        <section className="w-full max-w-5xl">
          <div className="bg-slate-800/20 p-8 rounded-2xl shadow-xl space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#f1a208] mb-4">Who Needs an Immigration Medical Exam?</h2>
              <p className="text-lg text-white/90">
                Anyone filing Form I-485 to apply for a U.S. green card or adjusting their immigration status within the
                U.S. is required by the USCIS (U.S. Citizenship and Immigration Services) to have an immigration medical
                examination. Only doctors designated by the USCIS as civil surgeons can complete an immigration exam.
              </p>
            </div>
            <div className="w-full h-px bg-white/20" />
            <div>
              <h2 className="text-3xl font-bold text-[#f1a208] mb-4">What to Expect</h2>
              <div className="space-y-4 text-lg text-white/90">
                <p>
                  The exam assesses your health to determine if you meet the requirements for immigration to the U.S.
                  Expect a review of your medical history, mental health, and physical exam.
                </p>
                <p>
                  Blood and urine testing is required based on age to evaluate infectious diseases including
                  tuberculosis, syphilis, and gonorrhea. A chest x-ray is required if the tuberculosis blood test is
                  positive. Vaccinations are required if age-appropriate vaccinations per CDC (Centers for Disease
                  Control and Prevention) recommendation are not up-to-date. You can eat/drink before the exam.
                </p>
                <p>
                  Common medical conditions such as diabetes, high cholesterol, and high blood pressure that are not of
                  concern to public health do not interfere with the immigration process but are required to be listed
                  on USCIS Form I-693 (Report of Medical Examination and Vaccination Record). Upon completion of all
                  Form I-693 requirements, you will be given a completed signed and dated Form I-693 in a sealed
                  envelope. Do not open this envelope; it should be submitted in the sealed envelope to the USCIS as
                  part of the application process. An unsealed identical set of documents will also be provided to you.
                </p>
                <p className="italic">
                  This examination is not a substitute for a full physical examination, consultation, diagnosis, or
                  treatment by your primary health care provider.
                </p>
              </div>
            </div>
            {/* USCIS Update Box */}
            <div className="bg-blue-900/50 border border-blue-400 p-6 rounded-lg mt-8">
              <h3 className="font-bold text-xl text-blue-300 mb-2">UPDATE 12/2/2024</h3>
              <p className="text-white/90">
                USCIS announced that you are required to submit Form I-693 with your Form I-485. You may not opt to mail
                the medical exam results at a later date. If you do not submit Form I-693 as a part of your adjustment
                of status application package, USCIS may reject your entire application.
              </p>
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
          </div>
        </section>

        {/* Schedule Appointment Section */}
        <section className="text-center text-white bg-slate-800/20 p-12 rounded-2xl w-full max-w-5xl shadow-xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Schedule Your Exam?</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto text-white/80">
            Contact us today to book your immigration medical exam. Our team is ready to assist you.
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

export default ImmigrationMedicalExamsPage;
