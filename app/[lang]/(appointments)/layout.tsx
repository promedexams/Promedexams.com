import { GoogleCaptchaProvider } from "@/components/google-captcha-provider";

export default function AppointmentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GoogleCaptchaProvider>{children}</GoogleCaptchaProvider>;
}
