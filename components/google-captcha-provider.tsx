"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export function GoogleCaptchaProvider({ children }: { children: React.ReactNode }) {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY;

  return <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey ?? ""}>{children}</GoogleReCaptchaProvider>;
}
