import Link from "next/link";

import { BusinessInfo } from "@/lib/business-info";
import { SupportedLanguages } from "@/lib/types/supported-languages";
import Logo from "./logo";

const CombinationMark = async ({ params }: SupportedLanguages) => {
  const { lang } = await params;

  return (
    <Link href={`/${lang}`} className="flex flex-row gap-4 items-center text-white select-none">
      <Logo variant="Icon" />
      {/* <Globe2Icon className="w-10 h-10" /> */}
      <p className="text-2xl font-bold">{BusinessInfo.Name}</p>
    </Link>
  );
};

export default CombinationMark;
