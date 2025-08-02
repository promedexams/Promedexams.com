import ContactCard from "@/components/contact-card/contact-card";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";

const ContactPage = async ({ params }: SupportedLanguagesProps) => {
  const dict = await getDictionary((await params).lang);

  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-8 flex-1 justify-center items-center p-4 z-10">
        <div className="text-white px-2 py-8 w-full max-w-6xl">
          <div className="w-full bg-slate-800/20 p-8 mb-8 rounded-2xl shadow-xl">
            <h1 className="text-5xl font-bold mb-4 text-center text-white pb-4 border-b">{dict.pages.contact.title}</h1>
            <p className="text-lg text-white/80">{dict.pages.contact.description}</p>
          </div>
          <ContactCard params={params} />
        </div>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default ContactPage;
