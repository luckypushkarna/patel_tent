"use client";

import { ContactHeader } from "./ContactHeader";
import { ContactInfo } from "./ContactInfo";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact Patel Tent & Event Management"
      className="w-full bg-[#F3EBE1] py-20 md:py-28 lg:py-36"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 xl:px-10">
        <ContactHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT — Business Info (40%) */}
          <div className="lg:col-span-5 lg:pt-4">
            <ContactInfo />
          </div>

          {/* RIGHT — Form (60%) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
