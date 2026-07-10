import ContactCard from "@/components/contact-card/contact-card";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { SupportedLanguagesProps } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";

const ContactPage = async ({ params }: SupportedLanguagesProps) => {
  const dict = await getDictionary((await params).lang);

  return (
    <div className="relative m-0 flex min-h-screen w-screen flex-col bg-[#4F759B] p-0">
      <Navbar params={params} />
      <main className="z-10 flex flex-1 flex-col items-center justify-center gap-8 p-4 md:relative">
        <div className="w-full max-w-6xl px-2 py-8 text-white">
          <div className="mb-8 w-full rounded-2xl bg-slate-800/20 p-8 shadow-xl">
            <h1 className="mb-4 border-b pb-4 text-center text-5xl font-bold text-white">{dict.pages.contact.title}</h1>
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
