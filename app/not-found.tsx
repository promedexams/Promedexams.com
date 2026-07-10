import Link from "next/link";
import Cookies from "js-cookie";
import { HomeIcon } from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { SiteSettings } from "@/lib/site-settings";
import { SupportedLanguages } from "@/lib/types/supported-languages";
import { getDictionary } from "@/lib/utils/dictionaries";

const NotFoundPage = async () => {
  const lang = (Cookies.get("NEXT_SITE") || SiteSettings.DefaultLocale) as SupportedLanguages;
  const dict = await getDictionary(lang);

  const params = Promise.resolve({ lang });

  return (
    <div className="relative m-0 flex min-h-screen w-screen flex-col bg-[#4F759B] p-0">
      <Navbar params={params} />
      <main className="flex flex-1 flex-col items-center justify-center p-4 text-center text-white">
        <section className="my-8 rounded-lg bg-slate-800/20 p-10">
          <h1 className="text-9xl font-bold">404</h1>
          <p className="mt-4 text-2xl font-semibold">{dict.pages.notFound.title}</p>
          <p className="mt-2">{dict.pages.notFound.message}</p>
          <Link href="/">
            <Button
              size="lg"
              className="mt-4 cursor-pointer bg-[#f1a208] text-lg font-bold text-black transition-transform duration-200 hover:scale-105 hover:bg-[#f1a208]/90"
            >
              <HomeIcon className="mr-2 h-5 w-5" />
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
