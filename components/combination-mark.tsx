import Image from "next/image";
import Link from "next/link";

import { BusinessInfo } from "@/lib/business-info";

const CombinationMark = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  const { lang } = await params;

  return (
    <Link href={`/${lang}`} className="flex flex-row gap-4 items-center text-white select-none">
      <Image
        src={BusinessInfo.Logos.GlobeIcon}
        alt={`${BusinessInfo.Name}'s Logo`}
        width={1}
        height={1}
        unoptimized
        draggable={false}
        className="w-10 h-10"
      />
      {/* <Globe2Icon className="w-10 h-10" /> */}
      <p className="text-2xl font-bold">{BusinessInfo.Name}</p>
    </Link>
  );
};

export default CombinationMark;
