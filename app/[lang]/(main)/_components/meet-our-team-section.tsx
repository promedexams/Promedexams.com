import Image from "next/image";
import Link from "next/link";

const MeetOurTeamSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">Meet Our Team</h2>
        <p className="text-lg text-white/80 mb-12 max-w-3xl mx-auto">
          Our dedicated professionals are here to provide you with the best service.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="bg-slate-800/20 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center">
            <Image
              src="https://placehold.co/400x400"
              alt="Picture of Dr. Jill Quigley, MD"
              width={200}
              height={200}
              unoptimized
              className="rounded-full border-4 border-[#f1a208] shadow-lg mb-6"
            />
            <h3 className="text-3xl font-bold text-[#f1a208]">Dr. Jill Quigley, MD</h3>
            <h4 className="text-lg text-white/90 font-semibold mb-4">Lead Physician</h4>
            <p className="text-white/80">
              Dr. Quigley has been practicing medicine since 2008 and is board certified in Family Medicine. She is
              dedicated to providing exceptional care in a timely manner to every patient.
            </p>
          </div>
          <div className="bg-slate-800/20 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center">
            <Image
              src="https://placehold.co/400x400"
              alt="Picture of Trish Peery"
              width={200}
              height={200}
              unoptimized
              className="rounded-full border-4 border-[#f1a208] shadow-lg mb-6"
            />
            <h3 className="text-3xl font-bold text-[#f1a208]">Trish Peery</h3>
            <h4 className="text-lg text-white/90 font-semibold mb-4">Office Manager</h4>
            <p className="text-white/80">
              With a background in insurance and finance, Trish ensures that our office runs smoothly and that your
              experience is seamless from start to finish.
            </p>
          </div>
        </div>
        <div className="mt-12 flex justify-center w-full">
          <Link href="/services" className="inline-block">
            <button className="bg-transparent hover:bg-[#f1a208] text-white hover:text-black border-2 border-[#f1a208] transition-colors duration-200 font-bold text-lg cursor-pointer whitespace-normal text-center px-2 py-1 rounded-lg">
              Learn More About Our Team
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeamSection;
