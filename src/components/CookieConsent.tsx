"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent_v4");

    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (value: "accepted" | "rejected") => {
    localStorage.setItem("cookieConsent_v4", value);
    setVisible(false);
    
    if (value === "accepted") {
      window.dispatchEvent(new Event("show-confetti"));
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-auto md:max-w-sm
            rounded-xl
            border border-[#143A63]/10
            bg-[#F7F2E9]/95
            backdrop-blur-xl
            shadow-[0_8px_30px_rgba(0,0,0,.08)]
            p-4
          "
          style={{ zIndex: "var(--z-toast)" }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-start md:items-center gap-3">
              <Cookie className="h-5 w-5 text-[#143A63] shrink-0 mt-0.5 md:mt-0" strokeWidth={1.8} />
              <p className="text-[13px] leading-relaxed text-[#143A63]/80 m-0">
                We use cookies to improve your experience.{" "}
                <Link
                  href="/privacy-policy"
                  className="underline underline-offset-2 hover:text-[#C9A86A] transition-colors"
                >
                  Learn more
                </Link>.
              </p>
            </div>

            <div className="flex gap-2 w-full md:justify-end">
              <button
                onClick={() => saveConsent("rejected")}
                className="
                  flex-1 md:flex-none
                  rounded-full
                  border border-[#143A63]/15
                  bg-white
                  px-4 py-1.5
                  text-[12px] font-medium text-[#143A63]
                  transition-all duration-300
                  hover:bg-[#F3EEE5]
                "
              >
                Reject
              </button>
              <button
                onClick={() => saveConsent("accepted")}
                className="
                  flex-1 md:flex-none
                  rounded-full
                  bg-[#143A63]
                  px-4 py-1.5
                  text-[12px] font-medium text-[#F7F2E9]
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:bg-[#0E2E4E]
                "
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
