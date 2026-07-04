import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Patel Tent & Event Management",
  description:
    "Learn about how we use cookies and how you can manage your preferences on the Patel Tent & Event Management website in accordance with Indian Law.",
};

export default function CookiePolicy() {
  return (
    <main className="w-full min-h-screen bg-[#F8F6F2] pt-32 pb-20 px-6">
      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold text-[#0B3558] mb-4"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            Cookie Policy
          </h1>
          <p className="text-[#0B3558]/70 text-sm md:text-base font-medium tracking-wide">
            LAST UPDATED: {new Date().toLocaleDateString("en-IN")}
          </p>
        </header>

        <div className="prose prose-lg text-[#2E241C] max-w-none">
          <p>
            This Cookie Policy explains how Patel Tent & Event Management uses cookies and similar technologies 
            to recognize you when you visit our website (<code>pateltent.com</code>). It explains what these 
            technologies are, why we use them, and your rights to control our use of them.
          </p>
          <p>
            In accordance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, if any cookie 
            we use processes your digital personal data, we will only deploy it after obtaining your clear and informed consent.
          </p>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
              They are widely used by website owners in order to make their websites work, or to work more efficiently, 
              as well as to provide reporting information.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              2. Types of Cookies We Use
            </h2>
            <p>We classify cookies into the following categories:</p>
            <ul className="list-disc pl-5">
              <li>
                <strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our website. Because these cookies are strictly necessary to deliver the website to you, you cannot refuse them without impacting how our site functions. They do not process personal data.
              </li>
              <li>
                <strong>Functional Cookies:</strong> These cookies allow our website to remember choices you make (such as language preferences) and provide enhanced, more personal features.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> These cookies collect information that is used in aggregate form to help us understand how our website is being used. If these cookies process personal data (such as IP addresses), they will only be activated with your consent.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> These cookies are used to make advertising messages more relevant to you. We currently do not deploy marketing cookies.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              3. Current Cookies Used
            </h2>
            <p>
              At this time, our website primarily relies on <strong>Essential Cookies</strong> for security and performance (e.g., Next.js framework routing). 
              We may utilize third-party services like Google Analytics or Microsoft Clarity which deploy <strong>Analytics Cookies</strong>. 
              These third-party cookies will only be active if you opt-in via our cookie banner.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              4. How Can You Manage Cookies?
            </h2>
            <p>
              You have the right to decide whether to accept or reject non-essential cookies. You can exercise your cookie preferences by:
            </p>
            <ul className="list-disc pl-5">
              <li><strong>Cookie Banner:</strong> Selecting your preferences on our cookie consent banner upon your first visit.</li>
              <li><strong>Browser Settings:</strong> You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality may be restricted.</li>
            </ul>
            <p>
              To learn how to manage cookies on popular browsers, please visit the browser developer&apos;s help pages (e.g., Chrome, Safari, Firefox).
            </p>
          </section>

          <section className="mt-10 mb-8 p-6 bg-white border border-[#D7D7D7]/50 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-[#0B3558] mb-2">
              5. Contact Us
            </h2>
            <p className="mb-0">
              If you have any questions about our use of cookies or other technologies, please email us at [Insert Email Address] or call us at +91 98765 43210.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
