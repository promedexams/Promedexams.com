import { MapPinIcon } from "lucide-react";

import { Branding } from "@/lib/branding";

const FindUsSection = () => {
  return (
    <section className="bg-slate-800/20 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center text-white">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4">Find Us</h2>
        <p className="text-lg text-white/80 mb-12 max-w-3xl mx-auto">
          We are conveniently located in Littleton, CO. Visit us for your medical examination needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden h-full min-h-[450px] border border-gray-200 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3074.391588880582!2d-104.990050884625!3d39.61633597946654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c871a525117df%3A0x2bd64a7de5d2a849!2s4%20W%20Dry%20Creek%20Cir%20%23135%2C%20Littleton%2C%20CO%2080120%2C%20USA!5e0!3m2!1sen!2s!4v1628186153925!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="select-none"
            />
          </div>
          <div className="space-y-6 text-left bg-gray-700/30 p-8 rounded-lg">
            <h3 className="text-3xl font-bold text-[#f1a208]">Our Location</h3>
            <div className="flex items-start gap-4">
              <MapPinIcon className="w-8 h-8 text-[#f1a208] mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-xl mb-1">Address</h4>
                <p className="text-white/90 text-lg">{Branding.ContactInformation.Address}</p>
              </div>
            </div>
            <div className="text-white/80 italic">
              <p>We look forward to welcoming you to our office.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindUsSection;
