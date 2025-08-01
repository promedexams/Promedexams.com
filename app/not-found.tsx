import Link from "next/link";
import Cookies from "js-cookie";
import { HomeIcon } from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { SiteSettings } from "@/lib/site-settings";
import { getDictionary } from "@/lib/utils/dictionaries";

const NotFoundPage = async () => {
  const lang = (Cookies.get("NEXT_SITE") || SiteSettings.DefaultLocale) as "en" | "es";
  const dict = await getDictionary(lang);

  const params = Promise.resolve({ lang });

  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="flex-1 flex flex-col justify-center items-center text-white text-center p-4">
        <section className="my-8 p-10 bg-slate-800/20 rounded-lg">
          <h1 className="text-9xl font-bold">404</h1>
          <p className="text-2xl font-semibold mt-4">{dict.pages.notFound.title}</p>
          <p className="mt-2">{dict.pages.notFound.message}</p>
          <Link href="/">
            <Button
              size="lg"
              className="bg-[#f1a208] hover:bg-[#f1a208]/90 text-black text-lg font-bold cursor-pointer transition-transform duration-200 hover:scale-105 mt-4"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              {dict.pages.notFound.goHomeButton}
            </Button>
          </Link>
        </section>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default NotFoundPage;
