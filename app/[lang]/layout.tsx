import { DictionaryProvider } from "@/context/dictionary-context";
import { getDictionary } from "@/lib/utils/dictionaries";

export default async function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: "en" | "es" };
}) {
  const dictionary = await getDictionary(lang);

  return <DictionaryProvider dictionary={dictionary}>{children}</DictionaryProvider>;
}
