import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Branding } from "@/lib/branding";

const ContactPage = async ({ params }: { params: Promise<{ lang: "en" | "es" }> }) => {
  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-[#4F759B]">
      <Navbar params={params} />
      <main className="md:relative flex flex-col gap-8 flex-1 justify-center items-center p-4 z-10">
        <div className="text-white p-8 w-full max-w-6xl">
          <h1 className="text-4xl font-bold mb-12 text-center text-white">Contact & Location</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="rounded-lg overflow-hidden h-full min-h-[450px] border border-gray-200 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1320.3555113776606!2d-104.98988109010732!3d39.581503344351496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c8183d7a140e7%3A0x3d30b2473b33dbbd!2s4%20W%20Dry%20Creek%20Cir%20%23135%2C%20Littleton%2C%20CO%2080120!5e1!3m2!1sen!2sus!4v1752263613495!5m2!1sen!2sus"
                width="600"
                height="450"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="space-y-8 flex flex-col justify-center">
              <h2 className="text-3xl font-semibold text-white border-b pb-4">Our Office</h2>
              <div className="flex items-start gap-5">
                <MapPinIcon className="w-9 h-9 mt-1 text-[#f1a208] shrink-0" />
                <div>
                  <h3 className="font-bold text-xl mb-1">Address</h3>
                  <p className="text-white/90 text-lg">{Branding.ContactInformation.Address}</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <MailIcon className="w-9 h-9 mt-1 text-[#f1a208] shrink-0" />
                <div>
                  <h3 className="font-bold text-xl mb-1">Email</h3>
                  <a
                    href={`mailto:${Branding.ContactInformation.OfficeEmail}`}
                    className="text-white/90 hover-underline-animation text-lg"
                  >
                    {Branding.ContactInformation.OfficeEmail}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <PhoneIcon className="w-9 h-9 mt-1 text-[#f1a208] shrink-0" />
                <div>
                  <h3 className="font-bold text-xl mb-1">Phone</h3>
                  <a
                    href={`tel:${Branding.ContactInformation.PhoneNumber}`}
                    className="text-white/90 hover-underline-animation text-lg"
                  >
                    {Branding.ContactInformation.PhoneNumber}
                  </a>
                </div>
              </div>
              <p className="text-md text-white/90 pt-6 italic">
                We are conveniently located and ready to assist you. Please feel free to stop by during our business
                hours or send us an email.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer params={params} />
    </div>
  );
};

export default ContactPage;
