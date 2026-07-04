import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Patel Tent & Event Management",
  description:
    "Terms and Conditions governing the use of Patel Tent & Event Management's website and services.",
};

export default function TermsConditions() {
  return (
    <main className="w-full min-h-screen bg-[#F8F6F2] pt-32 pb-20 px-6">
      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold text-[#0B3558] mb-4"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            Terms & Conditions
          </h1>
          <p className="text-[#0B3558]/70 text-sm md:text-base font-medium tracking-wide">
            LAST UPDATED: {new Date().toLocaleDateString("en-IN")}
          </p>
        </header>

        <div className="prose prose-lg text-[#2E241C] max-w-none">
          <p>
            Welcome to Patel Tent & Event Management. By accessing and using this website (<code>pateltent.com</code>) 
            or submitting an enquiry, you accept and agree to be bound by these Terms and Conditions. If you do not agree 
            with any part of these terms, you must not use our website.
          </p>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              1. Website Use & User Conduct
            </h2>
            <p>
              You agree to use our website only for lawful purposes. You must not use this website in any way that causes, 
              or may cause, damage to the website or impairment of the availability or accessibility of the website.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              2. Intellectual Property
            </h2>
            <p>
              Unless otherwise stated, Patel Tent & Event Management owns the intellectual property rights for all material on 
              this website, including but not limited to photographs, portfolio images, text, and logos. 
              <strong> You may not republish, sell, rent, or duplicate our images or content without express written consent.</strong>
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              3. Booking Enquiries & Service Guarantees
            </h2>
            <p>
              Submitting a contact form or booking enquiry through our website does not constitute a legally binding agreement 
              or a guarantee of service availability. All bookings are subject to availability and will only be considered finalized 
              upon the execution of a separate written contract and receipt of an agreed deposit.
            </p>
            <p>
              <strong>Pricing Disclaimer:</strong> Any pricing discussed via preliminary emails or forms is subject to change 
              based on final customization requirements, logistical constraints, and seasonal demand.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              4. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party web sites or services that are not owned or controlled by us. 
              We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any 
              third-party web sites or services.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              5. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable Indian law, Patel Tent & Event Management shall not be liable for 
              any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, 
              data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access 
              or use the website.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              6. Force Majeure
            </h2>
            <p>
              We shall not be held responsible for any failure to perform our obligations under these Terms if such failure 
              is caused by events beyond our reasonable control, including but not limited to acts of God, natural disasters, 
              strikes, or governmental restrictions.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              7. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India. Any disputes arising out of 
              or in connection with these Terms or your use of the website shall be subject to the exclusive jurisdiction of 
              the courts located in <strong>Udaipur, Rajasthan</strong>.
            </p>
          </section>

          <section className="mt-10 mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3558] mb-4 border-b border-[#D7D7D7] pb-2">
              8. Modifications
            </h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to 
              access or use our website after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
