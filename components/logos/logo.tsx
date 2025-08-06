import Image from "next/image";

import { BusinessInfo } from "@/lib/business-info";
import { cn } from "@/lib/utils/utils";

const Logo = ({
  variant = "Default",
  className,
}: {
  variant?: "Default" | "Icon" | "Wordmark";
  className?: string;
}) => {
  let logoPath;
  switch (variant) {
    case "Wordmark":
      logoPath = BusinessInfo.Logos.WordMark;
      break;

    case "Icon":
      logoPath = BusinessInfo.Logos.GlobeIcon;
      break;

    default:
      logoPath = BusinessInfo.Logos.Logo;
      break;
  }

  return (
    <Image
      src={logoPath}
      alt={`${BusinessInfo.Name}'s Logo`}
      width={1}
      height={1}
      unoptimized
      draggable={false}
      className={cn("w-10 h-10 select-none", className)}
    />
  );
};

export default Logo;
