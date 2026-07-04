"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { CONTACT_INFO } from "./constants";
import {
  PhoneIcon,
  MailIcon,
  PinIcon,
  ClockIcon,
  InstagramIcon,
  FacebookIcon,
  WhatsappIcon,
} from "./icons";

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

const InfoRow = memo(function InfoRow({ icon, label, children }: InfoRowProps) {
  return (
    <div className="flex items-start gap-4">
      <div
        aria-hidden="true"
        className="
          flex-shrink-0 flex items-center justify-center
          w-10 h-10
          rounded-full
          bg-[#0B3558]/[0.04]
          text-[#0B3558]
        "
      >
        {icon}
      </div>
      <div className="flex flex-col pt-1">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#0B3558]/55 mb-1.5">
          {label}
        </span>
        <div className="text-[15px] text-[#0B3558] leading-[1.55]">
          {children}
        </div>
      </div>
    </div>
  );
});

function ContactInfoComponent() {
  const socials = [
    {
      href: CONTACT_INFO.social.instagram,
      label: "Instagram",
      icon: <InstagramIcon className="w-[18px] h-[18px]" />,
    },
    {
      href: CONTACT_INFO.social.facebook,
      label: "Facebook",
      icon: <FacebookIcon className="w-[18px] h-[18px]" />,
    },
    {
      href: CONTACT_INFO.social.whatsapp,
      label: "WhatsApp",
      icon: <WhatsappIcon className="w-[18px] h-[18px]" />,
    },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col gap-9"
      aria-label="Contact information"
    >
      <InfoRow icon={<PhoneIcon className="w-4 h-4" />} label="Phone">
        <a
          href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
          className="hover:text-[#C9A96A] transition-colors duration-300"
        >
          {CONTACT_INFO.phone}
        </a>
      </InfoRow>

      <InfoRow icon={<MailIcon className="w-4 h-4" />} label="Email">
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="hover:text-[#C9A96A] transition-colors duration-300"
        >
          {CONTACT_INFO.email}
        </a>
      </InfoRow>

      <InfoRow icon={<PinIcon className="w-4 h-4" />} label="Address">
        <div>
          <p>{CONTACT_INFO.address.line1}</p>
          <p>{CONTACT_INFO.address.line2}</p>
          <p>{CONTACT_INFO.address.line3}</p>
        </div>
      </InfoRow>

      <InfoRow icon={<ClockIcon className="w-4 h-4" />} label="Business Hours">
        <div>
          <p>{CONTACT_INFO.hours.days}</p>
          <p className="text-[#0B3558]/75">{CONTACT_INFO.hours.time}</p>
        </div>
      </InfoRow>

      {/* Divider */}
      <div className="w-full h-px bg-[#0B3558]/10 my-2" />

      {/* Social icons */}
      <div className="flex flex-col gap-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#0B3558]/55">
          Follow Us
        </span>
        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="
                inline-flex items-center justify-center
                w-11 h-11
                rounded-full
                border border-[#0B3558]/15
                text-[#0B3558]
                transition-all duration-[300ms] ease-out
                hover:border-[#C9A96A] hover:text-[#C9A96A]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96A]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EBE1]
              "
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}

export const ContactInfo = memo(ContactInfoComponent);
